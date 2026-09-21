import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  avatarInitials: string;
  createdAt: string;
}

interface StoredAccount {
  user: User;
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SALT = '6326A2_WORKSPACE_SECURE_SALT_v1';
const USERS_STORAGE_KEY = 'aztu_6326a2_users';
const SESSION_STORAGE_KEY = 'aztu_6326a2_session';

// SHA-256 password hash using standard Web Crypto API (never store plain-text passwords)
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

  // Initialize storage & seed default user
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        let accounts: StoredAccount[] = [];

        if (storedUsersRaw) {
          try {
            accounts = JSON.parse(storedUsersRaw);
          } catch {
            accounts = [];
          }
        }

        // Seed default 6326A2 student account if empty
        if (accounts.length === 0) {
          const defaultPasswordHash = await hashPassword('123456');
          const defaultStudent: StoredAccount = {
            user: {
              id: 'usr_6326a2_hesen',
              firstName: 'Həsən',
              lastName: 'Məmmədov',
              email: 'hesen.m@aztu.edu.az',
              group: '6326A2',
              avatarInitials: 'HM',
              createdAt: '2026-09-01T00:00:00Z',
            },
            passwordHash: defaultPasswordHash,
          };
          accounts = [defaultStudent];
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
        }

        // Restore active session
        const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
        if (sessionRaw) {
          try {
            const sessionUser = JSON.parse(sessionRaw);
            setUser(sessionUser);
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

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const cleanFirst = firstName.trim();
      const cleanLast = lastName.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanFirst || !cleanLast) {
        return { success: false, error: 'Ad və soyad daxil edilməlidir.' };
      }
      if (!cleanEmail || !cleanEmail.includes('@')) {
        return { success: false, error: 'Düzgün e-poçt ünvanı daxil edin.' };
      }
      if (!password || password.length < 6) {
        return { success: false, error: 'Şifrə minimum 6 simvoldan ibarət olmalıdır.' };
      }

      try {
        const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
        const accounts: StoredAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

        const exists = accounts.some((acc) => acc.user.email.toLowerCase() === cleanEmail);
        if (exists) {
          return { success: false, error: 'Bu e-poçt ünvanı ilə artıq hesab mövcuddur.' };
        }

        const passwordHash = await hashPassword(password);
        const initials = `${cleanFirst.charAt(0)}${cleanLast.charAt(0)}`.toUpperCase();

        const newUser: User = {
          id: `usr_${Date.now()}`,
          firstName: cleanFirst,
          lastName: cleanLast,
          email: cleanEmail,
          group: '6326A2',
          avatarInitials: initials,
          createdAt: new Date().toISOString(),
        };

        const newAccount: StoredAccount = {
          user: newUser,
          passwordHash,
        };

        accounts.push(newAccount);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));

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

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
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
