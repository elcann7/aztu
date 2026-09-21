import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { isSupabaseConfigured, supabase } from '../services/supabase';

export interface User {
  id: string;
  firstName: string; // LOCKED: Cannot be changed by student
  lastName: string;  // LOCKED: Cannot be changed by student
  email: string;
  group: string;     // LOCKED: 6326A2
  avatarInitials: string;
  avatarUrl?: string; // Profile photo (upload or Google avatar)
  bio?: string;       // Custom student status or bio
  studentIdNumber?: string; // Tələbə bilet nömrəsi
  specialty?: string; // İxtisas
  telegram?: string;  // Telegram username
  phone?: string;     // Əlaqə nömrəsi
  github?: string;    // GitHub linki
  createdAt: string;
  authProvider?: 'password' | 'google';
}

interface StoredAccount {
  user: User;
  passwordHash?: string;
}

export const MAX_STUDENTS_LIMIT = 30;
export const GROUP_SECURITY_CODE = '6326A2';

export interface ProfileUpdateData {
  avatarUrl?: string;
  bio?: string;
  studentIdNumber?: string;
  specialty?: string;
  telegram?: string;
  phone?: string;
  github?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registeredCount: number;
  maxLimit: number;
  isRegistrationLocked: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email: string, fullName: string, groupCode?: string, pictureUrl?: string) => Promise<{ success: boolean; error?: string; requiresGroupCode?: boolean }>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    groupCode: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SALT = '6326A2_WORKSPACE_SECURE_SALT_v1';
const USERS_STORAGE_KEY = 'aztu_6326a2_users';
const SESSION_STORAGE_KEY = 'aztu_6326a2_session';

// SHA-256 password hash using standard Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateUserId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredCount, setRegisteredCount] = useState<number>(0);

  // Initialize storage & sync with Supabase profiles
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        let accounts: StoredAccount[] = [];

        if (storedUsersRaw) {
          try {
            accounts = JSON.parse(storedUsersRaw);
            accounts = accounts.filter(
              (acc) => acc.user.id !== 'usr_6326a2_hesen' && acc.user.email !== 'hesen.m@aztu.edu.az'
            );
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
          } catch {
            accounts = [];
          }
        }

        let totalCount = accounts.length;

        // Sync count with Supabase cloud database
        if (isSupabaseConfigured() && supabase) {
          try {
            const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
            if (!error && typeof count === 'number') {
              totalCount = Math.max(totalCount, count);
            }
          } catch (err) {
            console.warn('Could not query Supabase profiles count:', err);
          }
        }

        setRegisteredCount(totalCount);

        // Restore active session
        const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (sessionRaw) {
          try {
            const sessionUser: User = JSON.parse(sessionRaw);
            if (sessionUser.email === 'hesen.m@aztu.edu.az' || sessionUser.id === 'usr_6326a2_hesen') {
              localStorage.removeItem(SESSION_STORAGE_KEY);
              setUser(null);
            } else {
              setUser(sessionUser);

              // Background refresh from Supabase to sync latest profile changes
              if (isSupabaseConfigured() && supabase) {
                Promise.resolve(
                  supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', sessionUser.id)
                    .maybeSingle()
                )
                  .then(({ data: p }) => {
                    if (p) {
                      const refreshed: User = {
                        ...sessionUser,
                        avatarUrl: p.avatar_url || sessionUser.avatarUrl,
                        bio: p.bio || sessionUser.bio,
                        studentIdNumber: p.student_id_number || sessionUser.studentIdNumber,
                        specialty: p.specialty || sessionUser.specialty,
                        telegram: p.telegram || sessionUser.telegram,
                        phone: p.phone || sessionUser.phone,
                        github: p.github || sessionUser.github,
                      };
                      setUser(refreshed);
                      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(refreshed));
                    }
                  })
                  .catch(() => {});
              }
            }
          } catch {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.error('Failed to initialize auth storage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { success: false, error: 'E-poçt və şifrə daxil edilməlidir.' };
    }

    try {
      const inputHash = await hashPassword(password);

      // Check local storage first
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      let account = accounts.find((acc) => acc.user.email.toLowerCase() === normalizedEmail);

      // If not in local storage and Supabase is configured, check Supabase
      if (!account && isSupabaseConfigured() && supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', normalizedEmail)
          .maybeSingle();

        if (profile) {
          if (profile.auth_provider === 'google' && !profile.password_hash) {
            return {
              success: false,
              error: 'Bu hesab Google ilə qeydiyyatdan keçib. Zəhmət olmasa "Google ilə daxil ol" düyməsindən istifadə edin.',
            };
          }

          if (profile.password_hash && inputHash !== profile.password_hash) {
            return { success: false, error: 'Daxil edilən şifrə yanlışdır.' };
          }

          const nameParts = (profile.full_name || '').split(' ');
          const userFromCloud: User = {
            id: profile.id,
            firstName: profile.first_name || nameParts[0] || 'Tələbə',
            lastName: profile.last_name || nameParts.slice(1).join(' ') || 'AzTU',
            email: profile.email || normalizedEmail,
            group: profile.group_name || '6326A2',
            avatarInitials: profile.avatar_initials || 'AZ',
            avatarUrl: profile.avatar_url || undefined,
            bio: profile.bio || undefined,
            studentIdNumber: profile.student_id_number || undefined,
            specialty: profile.specialty || 'Kompüter Mühəndisliyi',
            telegram: profile.telegram || undefined,
            phone: profile.phone || undefined,
            github: profile.github || undefined,
            createdAt: profile.created_at || new Date().toISOString(),
            authProvider: profile.auth_provider || 'password',
          };

          // Cache locally
          accounts.push({ user: userFromCloud, passwordHash: profile.password_hash });
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));

          setUser(userFromCloud);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userFromCloud));
          return { success: true };
        }
      }

      if (!account) {
        return { success: false, error: 'Bu e-poçt ilə qeydiyyatdan keçmiş hesab tapılmadı.' };
      }

      if (account.user.authProvider === 'google' && !account.passwordHash) {
        return {
          success: false,
          error: 'Bu hesab Google ilə qeydiyyatdan keçib. Zəhmət olmasa "Google ilə daxil ol" düyməsindən istifadə edin.',
        };
      }

      if (inputHash !== account.passwordHash) {
        return { success: false, error: 'Daxil edilən şifrə yanlışdır.' };
      }

      setUser(account.user);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(account.user));
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Sistem xətası baş verdi. Yenidən cəhd edin.' };
    }
  }, []);

  const loginWithGoogle = useCallback(
    async (
      email: string,
      fullName: string,
      groupCode?: string,
      pictureUrl?: string
    ): Promise<{ success: boolean; error?: string; requiresGroupCode?: boolean }> => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim() || 'Tələbə';

      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Düzgün Google e-poçt ünvanı daxil edilməlidir.' };
      }

      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const existingIndex = accounts.findIndex((acc) => acc.user.email.toLowerCase() === cleanEmail);

        if (existingIndex !== -1) {
          const existing = accounts[existingIndex];
          if (pictureUrl && !existing.user.avatarUrl) {
            existing.user.avatarUrl = pictureUrl;
            accounts[existingIndex] = existing;
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
          }
          setUser(existing.user);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existing.user));
          return { success: true };
        }

        // Check if student exists in Supabase
        if (isSupabaseConfigured() && supabase) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', cleanEmail)
            .maybeSingle();

          if (profile) {
            const nameParts = (profile.full_name || cleanName).split(' ');
            const existingCloudUser: User = {
              id: profile.id,
              firstName: profile.first_name || nameParts[0] || 'Tələbə',
              lastName: profile.last_name || nameParts.slice(1).join(' ') || 'AzTU',
              email: profile.email || cleanEmail,
              group: profile.group_name || '6326A2',
              avatarInitials: profile.avatar_initials || `${nameParts[0]?.[0] || 'A'}${nameParts[1]?.[0] || 'Z'}`.toUpperCase(),
              avatarUrl: pictureUrl || profile.avatar_url || undefined,
              bio: profile.bio || undefined,
              studentIdNumber: profile.student_id_number || undefined,
              specialty: profile.specialty || 'Kompüter Mühəndisliyi',
              telegram: profile.telegram || undefined,
              phone: profile.phone || undefined,
              github: profile.github || undefined,
              createdAt: profile.created_at || new Date().toISOString(),
              authProvider: 'google',
            };

            accounts.push({ user: existingCloudUser });
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));

            setUser(existingCloudUser);
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existingCloudUser));
            return { success: true };
          }
        }

        // New student registration via Google: Check group limit
        let currentCount = accounts.length;
        if (isSupabaseConfigured() && supabase) {
          const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
          if (typeof count === 'number') currentCount = Math.max(currentCount, count);
        }

        if (currentCount >= MAX_STUDENTS_LIMIT) {
          return {
            success: false,
            error: `6326A2 qrupu üçün ayrılmış ${MAX_STUDENTS_LIMIT} nəfərlik qeydiyyat limiti tamamlanmışdır. Kənar şəxslərin daxil olmasına icazə verilmir.`,
          };
        }

        // Check group security code for new registrations
        const normalizedCode = (groupCode || '').trim().toUpperCase();
        if (normalizedCode !== GROUP_SECURITY_CODE) {
          return {
            success: false,
            requiresGroupCode: true,
            error: 'Qrupa ilk dəfə qoşulmaq üçün 6326A2 qrup təsdiq kodunu daxil edin.',
          };
        }

        const nameParts = cleanName.split(' ');
        const firstName = nameParts[0] || 'Tələbə';
        const lastName = nameParts.slice(1).join(' ') || 'AzTU';
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

        const newUser: User = {
          id: generateUserId(),
          firstName,
          lastName,
          email: cleanEmail,
          group: '6326A2',
          avatarInitials: initials,
          avatarUrl: pictureUrl || undefined,
          createdAt: new Date().toISOString(),
          authProvider: 'google',
        };

        // Persist to Supabase
        if (isSupabaseConfigured() && supabase) {
          const { error: insErr } = await supabase.from('profiles').insert({
            id: newUser.id,
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            full_name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            group_name: '6326A2',
            avatar_url: newUser.avatarUrl,
            avatar_initials: newUser.avatarInitials,
            auth_provider: 'google',
            global_role: 'student',
          });
          if (insErr) {
            console.error('Failed to insert google user to Supabase:', insErr);
          }
        }

        accounts.push({ user: newUser });
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
        setRegisteredCount(accounts.length);

        setUser(newUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
        return { success: true };
      } catch (err) {
        console.error('Google login error:', err);
        return { success: false, error: 'Google ilə daxil olma zamanı xəta baş verdi.' };
      }
    },
    []
  );

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      groupCode: string
    ): Promise<{ success: boolean; error?: string }> => {
      const cleanFirst = firstName.trim();
      const cleanLast = lastName.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanCode = groupCode.trim().toUpperCase();

      if (!cleanFirst || !cleanLast) {
        return { success: false, error: 'Ad və soyad daxil edilməlidir.' };
      }
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Düzgün e-poçt ünvanı daxil edin.' };
      }
      if (!password || password.length < 6) {
        return { success: false, error: 'Şifrə minimum 6 simvoldan ibarət olmalıdır.' };
      }

      // Security check: Only 6326A2 group members with code
      if (cleanCode !== GROUP_SECURITY_CODE) {
        return {
          success: false,
          error: 'Qrup təsdiq kodu yanlışdır! Yalnız 6326A2 qrup tələbələri qeydiyyatdan keçə bilər.',
        };
      }

      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

        // Security check: Max 30 students quota (checks both local and live cloud database)
        let currentCount = accounts.length;
        if (isSupabaseConfigured() && supabase) {
          const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
          if (typeof count === 'number') currentCount = Math.max(currentCount, count);
        }

        if (currentCount >= MAX_STUDENTS_LIMIT) {
          return {
            success: false,
            error: `6326A2 qrupu üçün ayrılmış ${MAX_STUDENTS_LIMIT} nəfərlik qeydiyyat limiti tamamlanmışdır. Kənar şəxslərin qeydiyyatına icazə verilmir.`,
          };
        }

        const exists = accounts.some((acc) => acc.user.email.toLowerCase() === cleanEmail);
        if (exists) {
          return { success: false, error: 'Bu e-poçt ünvanı ilə artıq hesab mövcuddur.' };
        }

        // Also check Supabase for existing email
        if (isSupabaseConfigured() && supabase) {
          const { data: cloudExisting } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', cleanEmail)
            .maybeSingle();
          if (cloudExisting) {
            return { success: false, error: 'Bu e-poçt ünvanı ilə artıq qeydiyyatdan keçilib.' };
          }
        }

        const passwordHash = await hashPassword(password);
        const initials = `${cleanFirst.charAt(0)}${cleanLast.charAt(0)}`.toUpperCase();

        const newUser: User = {
          id: generateUserId(),
          firstName: cleanFirst,
          lastName: cleanLast,
          email: cleanEmail,
          group: '6326A2',
          avatarInitials: initials,
          createdAt: new Date().toISOString(),
          authProvider: 'password',
        };

        // Persist to Supabase cloud database
        if (isSupabaseConfigured() && supabase) {
          const { error: insErr } = await supabase.from('profiles').insert({
            id: newUser.id,
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            full_name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            group_name: '6326A2',
            avatar_initials: newUser.avatarInitials,
            password_hash: passwordHash,
            auth_provider: 'password',
            global_role: 'student',
          });
          if (insErr) {
            console.error('Supabase profile registration error:', insErr);
            if (insErr.message?.includes('30')) {
              return { success: false, error: '6326A2 qrupunda 30 nəfərlik kvota tamamlanmışdır!' };
            }
          }
        }

        const newAccount: StoredAccount = {
          user: newUser,
          passwordHash,
        };

        accounts.push(newAccount);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
        setRegisteredCount(accounts.length);

        // Auto login newly registered student
        setUser(newUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));

        return { success: true };
      } catch (err) {
        console.error('Register error:', err);
        return { success: false, error: 'Qeydiyyat zamanı xəta baş verdi.' };
      }
    },
    []
  );

  const updateProfile = useCallback(
    async (updates: ProfileUpdateData): Promise<{ success: boolean; error?: string }> => {
      if (!user) {
        return { success: false, error: 'İstifadəçi daxil olmayıb.' };
      }

      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const accountIndex = accounts.findIndex((acc) => acc.user.id === user.id);

        // Preserve strictly locked fields (firstName, lastName, group)
        const updatedUser: User = {
          ...user,
          avatarUrl: updates.avatarUrl !== undefined ? updates.avatarUrl : user.avatarUrl,
          bio: updates.bio !== undefined ? updates.bio : user.bio,
          studentIdNumber: updates.studentIdNumber !== undefined ? updates.studentIdNumber : user.studentIdNumber,
          specialty: updates.specialty !== undefined ? updates.specialty : user.specialty,
          telegram: updates.telegram !== undefined ? updates.telegram : user.telegram,
          phone: updates.phone !== undefined ? updates.phone : user.phone,
          github: updates.github !== undefined ? updates.github : user.github,
        };

        if (accountIndex !== -1) {
          accounts[accountIndex].user = updatedUser;
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
        }

        setUser(updatedUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));

        // Sync updates to Supabase
        if (isSupabaseConfigured() && supabase) {
          supabase
            .from('profiles')
            .update({
              avatar_url: updatedUser.avatarUrl,
              bio: updatedUser.bio,
              student_id_number: updatedUser.studentIdNumber,
              specialty: updatedUser.specialty,
              telegram: updatedUser.telegram,
              phone: updatedUser.phone,
              github: updatedUser.github,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .then(({ error }) => {
              if (error) console.error('Supabase profile update error:', error);
            });
        }

        return { success: true };
      } catch (err) {
        console.error('Update profile error:', err);
        return { success: false, error: 'Profil məlumatlarını yeniləmək mümkün olmadı.' };
      }
    },
    [user]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const isRegistrationLocked = registeredCount >= MAX_STUDENTS_LIMIT;

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      registeredCount,
      maxLimit: MAX_STUDENTS_LIMIT,
      isRegistrationLocked,
      login,
      loginWithGoogle,
      register,
      updateProfile,
      logout,
    }),
    [user, isLoading, registeredCount, isRegistrationLocked, login, loginWithGoogle, register, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
