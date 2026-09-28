import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  avatarInitials: string;
  avatarUrl?: string;
  bio?: string;
  studentIdNumber?: string;
  specialty?: string;
  telegram?: string;
  phone?: string;
  github?: string;
  createdAt: string;
  authProvider?: 'password' | 'google';
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
  login: (email: string, password: string, groupCode?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (credential: string, groupCode?: string) => Promise<{ success: boolean; error?: string; requiresGroupCode?: boolean }>;
  register: (firstName: string, lastName: string, email: string, password: string, groupCode: string) => Promise<{ success: boolean; error?: string; pendingVerification?: boolean }>;
  updateProfile: (updates: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const PROFILE_FIELDS = 'id,first_name,last_name,email,group_name,avatar_initials,avatar_url,bio,student_id_number,specialty,telegram,phone,github,created_at,auth_provider';

async function apiRequest(body: Record<string, unknown>, token?: string) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
  const result = await response.json() as { success?: boolean; error?: string; requiresGroupCode?: boolean; pendingVerification?: boolean };
  return { ...result, success: response.ok && result.success === true };
}

async function verifiedProfile(): Promise<User | null> {
  if (!supabase) return null;
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth.user) return null;
  const { data: profile, error } = await supabase.from('profiles').select(PROFILE_FIELDS).eq('auth_user_id', auth.user.id).maybeSingle();
  if (error || !profile || profile.group_name !== GROUP_SECURITY_CODE) return null;
  return {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    group: profile.group_name,
    avatarInitials: profile.avatar_initials || 'AZ',
    avatarUrl: profile.avatar_url || undefined,
    bio: profile.bio || undefined,
    studentIdNumber: profile.student_id_number || undefined,
    specialty: profile.specialty || undefined,
    telegram: profile.telegram || undefined,
    phone: profile.phone || undefined,
    github: profile.github || undefined,
    createdAt: profile.created_at,
    authProvider: profile.auth_provider === 'google' ? 'google' : 'password',
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredCount, setRegisteredCount] = useState(0);

  const refreshCount = useCallback(async () => {
    try {
      const response = await fetch('/api/auth', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json() as { count?: number };
      if (typeof data.count === 'number') setRegisteredCount(data.count);
    } catch { /* Enrollment API fails closed if unavailable. */ }
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const profile = await verifiedProfile();
        if (active) setUser(profile);
        await refreshCount();
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    const subscription = supabase?.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setUser(null);
      if (event === 'TOKEN_REFRESHED') {
        setTimeout(() => {
          void verifiedProfile()
            .then((profile) => { if (active) setUser(profile); })
            .catch(() => { if (active) setUser(null); });
        }, 0);
      }
    });
    return () => { active = false; subscription?.data.subscription.unsubscribe(); };
  }, [refreshCount]);

  const login = useCallback(async (email: string, password: string, groupCode?: string) => {
    if (!supabase) return { success: false, error: 'Təhlükəsiz giriş xidməti konfiqurasiya edilməyib.' };
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) return { success: false, error: 'E-poçt və şifrə daxil edilməlidir.' };
    try {
      const signedIn = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (signedIn.error) return { success: false, error: 'Giriş məlumatları yanlışdır.' };
      let profile = await verifiedProfile();
      if (!profile && signedIn.data.session) {
        const enrolled = await apiRequest({ action: 'enroll-password', groupCode }, signedIn.data.session.access_token);
        if (!enrolled.success) { await supabase.auth.signOut(); return { success: false, error: enrolled.error || 'Qrup təsdiqi tələb olunur.' }; }
        profile = await verifiedProfile();
      }
      if (!profile) { await supabase.auth.signOut(); return { success: false, error: 'Bu hesab 6326A2 qrupuna təsdiqlənməyib.' }; }
      setUser(profile);
      return { success: true };
    } catch {
      await supabase.auth.signOut();
      return { success: false, error: 'Giriş xidməti əlçatan deyil.' };
    }
  }, []);

  const loginWithGoogle = useCallback(async (credential: string, groupCode?: string) => {
    if (!supabase) return { success: false, error: 'Təhlükəsiz giriş xidməti konfiqurasiya edilməyib.' };
    if (!credential) return { success: false, error: 'Google təsdiq məlumatı tapılmadı.' };
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: credential });
      if (error || !data.session) return { success: false, error: 'Google hesabı təsdiqlənmədi.' };
      const enrolled = await apiRequest({ action: 'enroll-google', groupCode }, data.session.access_token);
      if (!enrolled.success) {
        await supabase.auth.signOut();
        return { success: false, error: enrolled.error || 'Qeydiyyat tamamlanmadı.', requiresGroupCode: enrolled.requiresGroupCode };
      }
      const profile = await verifiedProfile();
      if (!profile) { await supabase.auth.signOut(); return { success: false, error: 'Qrup profili tapılmadı.' }; }
      setUser(profile);
      await refreshCount();
      return { success: true };
    } catch {
      await supabase.auth.signOut();
      return { success: false, error: 'Google ilə giriş xidməti əlçatan deyil.' };
    }
  }, [refreshCount]);

  const register = useCallback(async (firstName: string, lastName: string, email: string, password: string, groupCode: string) => {
    if (!supabase) return { success: false, error: 'Təhlükəsiz qeydiyyat xidməti konfiqurasiya edilməyib.' };
    if (groupCode.trim().toUpperCase() !== GROUP_SECURITY_CODE) return { success: false, error: 'Qrup təsdiq kodu yanlışdır.' };
    try {
      const result = await apiRequest({ action: 'register', firstName, lastName, email, password, groupCode });
      if (!result.success) return { success: false, error: result.error || 'Qeydiyyat alınmadı.' };
      await refreshCount();
      return { success: true, pendingVerification: true };
    } catch {
      return { success: false, error: 'Qeydiyyat xidməti əlçatan deyil.' };
    }
  }, [refreshCount]);

  const updateProfile = useCallback(async (updates: ProfileUpdateData) => {
    if (!user || !supabase) return { success: false, error: 'İstifadəçi daxil olmayıb.' };
    const patch = {
      avatar_url: updates.avatarUrl ?? user.avatarUrl ?? null,
      bio: updates.bio ?? user.bio ?? null,
      student_id_number: updates.studentIdNumber ?? user.studentIdNumber ?? null,
      specialty: updates.specialty ?? user.specialty ?? null,
      telegram: updates.telegram ?? user.telegram ?? null,
      phone: updates.phone ?? user.phone ?? null,
      github: updates.github ?? user.github ?? null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
    if (error) return { success: false, error: 'Profil məlumatlarını yeniləmək mümkün olmadı.' };
    setUser({ ...user, avatarUrl: patch.avatar_url || undefined, bio: patch.bio || undefined, studentIdNumber: patch.student_id_number || undefined, specialty: patch.specialty || undefined, telegram: patch.telegram || undefined, phone: patch.phone || undefined, github: patch.github || undefined });
    return { success: true };
  }, [user]);

  const logout = useCallback(() => { setUser(null); void supabase?.auth.signOut(); }, []);
  const isRegistrationLocked = registeredCount >= MAX_STUDENTS_LIMIT;
  const value = useMemo(() => ({ user, isAuthenticated: !!user, isLoading, registeredCount, maxLimit: MAX_STUDENTS_LIMIT, isRegistrationLocked, login, loginWithGoogle, register, updateProfile, logout }), [user, isLoading, registeredCount, isRegistrationLocked, login, loginWithGoogle, register, updateProfile, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
