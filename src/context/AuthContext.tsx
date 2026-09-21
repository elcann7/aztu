import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  avatarInitials: string;
  createdAt: string;
  authProvider?: 'password' | 'google';
}

interface StoredAccount {
  user: User;
  passwordHash?: string;
}

export const MAX_STUDENTS_LIMIT = 30;
export const GROUP_SECURITY_CODE = '6326A2';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registeredCount: number;
  maxLimit: number;
  isRegistrationLocked: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email: string, fullName: string, groupCode?: string) => Promise<{ success: boolean; error?: string; requiresGroupCode?: boolean }>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    groupCode: string
  ) => Promise<{ success: boolean; error?: string }>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredCount, setRegisteredCount] = useState<number>(0);

  // Initialize storage & cleanup legacy test accounts
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        let accounts: StoredAccount[] = [];

        if (storedUsersRaw) {
          try {
            accounts = JSON.parse(storedUsersRaw);
            // Clean up any legacy demo test user (hesen.m@aztu.edu.az)
            accounts = accounts.filter(
              (acc) => acc.user.id !== 'usr_6326a2_hesen' && acc.user.email !== 'hesen.m@aztu.edu.az'
            );
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
          } catch {
            accounts = [];
          }
        }

        setRegisteredCount(accounts.length);

        // Restore active session
        const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (sessionRaw) {
          try {
            const sessionUser = JSON.parse(sessionRaw);
            // If session was old demo user, clear it
            if (sessionUser.email === 'hesen.m@aztu.edu.az' || sessionUser.id === 'usr_6326a2_hesen') {
              localStorage.removeItem(SESSION_STORAGE_KEY);
              setUser(null);
            } else {
              setUser(sessionUser);
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
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const account = accounts.find((acc) => acc.user.email.toLowerCase() === normalizedEmail);

      if (!account) {
        return { success: false, error: 'Bu e-poçt ilə qeydiyyatdan keçmiş hesab tapılmadı.' };
      }

      if (account.user.authProvider === 'google' && !account.passwordHash) {
        return {
          success: false,
          error: 'Bu hesab Google ilə qeydiyyatdan keçib. Zəhmət olmasa "Google ilə daxil ol" düyməsindən istifadə edin.',
        };
      }

      const inputHash = await hashPassword(password);
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
      groupCode?: string
    ): Promise<{ success: boolean; error?: string; requiresGroupCode?: boolean }> => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim() || 'Tələbə';

      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Düzgün Google e-poçt ünvanı daxil edilməlidir.' };
      }

      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const existing = accounts.find((acc) => acc.user.email.toLowerCase() === cleanEmail);

        if (existing) {
          // Existing user, sign in directly
          setUser(existing.user);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(existing.user));
          return { success: true };
        }

        // New student registration via Google: Check group limit
        if (accounts.length >= MAX_STUDENTS_LIMIT) {
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
          id: `usr_g_${Date.now()}`,
          firstName,
          lastName,
          email: cleanEmail,
          group: '6326A2',
          avatarInitials: initials,
          createdAt: new Date().toISOString(),
          authProvider: 'google',
        };

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

        // Security check: Max 30 students quota
        if (accounts.length >= MAX_STUDENTS_LIMIT) {
          return {
            success: false,
            error: `6326A2 qrupu üçün ayrılmış ${MAX_STUDENTS_LIMIT} nəfərlik qeydiyyat limiti tamamlanmışdır. Kənar şəxslərin qeydiyyatına icazə verilmir.`,
          };
        }

        const exists = accounts.some((acc) => acc.user.email.toLowerCase() === cleanEmail);
        if (exists) {
          return { success: false, error: 'Bu e-poçt ünvanı ilə artıq hesab mövcuddur.' };
        }

        const passwordHash = await hashPassword(password);
        const initials = `${cleanFirst.charAt(0)}${cleanLast.charAt(0)}`.toUpperCase();

        const newUser: User = {
          id: `usr_${Date.now()}`,
          firstName,
          lastName,
          email: cleanEmail,
          group: '6326A2',
          avatarInitials: initials,
          createdAt: new Date().toISOString(),
          authProvider: 'password',
        };

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
      logout,
    }),
    [user, isLoading, registeredCount, isRegistrationLocked, login, loginWithGoogle, register, logout]
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
