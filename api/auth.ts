import { createClient } from '@supabase/supabase-js';

type AuthBody = Record<string, unknown>;

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const publicKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const secretKey = process.env.SUPABASE_SECRET_KEY || '';
const groupCode = process.env.AZTU_GROUP_SECURITY_CODE || '';
const allowedEmails = new Set((process.env.AZTU_ALLOWED_EMAILS || '').toLowerCase().split(/[,;\s]+/).filter(Boolean));
const admin = url && secretKey ? createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
const authClient = url && publicKey ? createClient(url, publicKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;

const reply = (body: Record<string, unknown>, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' },
});

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const codeMatches = (value: unknown) => groupCode.length > 0 && clean(value, 30).toUpperCase() === groupCode.toUpperCase();
const isAllowed = (email: string) => allowedEmails.has(email);
const quotaError = '6326A2 qrupunda 30 nəfərlik kvota tamamlanmışdır.';

async function emailConfirmationEnabled() {
  const response = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: publicKey } });
  if (!response.ok) return false;
  const settings = await response.json() as { mailer_autoconfirm?: boolean };
  return settings.mailer_autoconfirm === false;
}

async function getCount() {
  if (!admin) throw new Error('Supabase server bağlantısı qurulmayıb.');
  const { count, error } = await admin.from('profiles').select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}

async function profileByEmail(email: string) {
  if (!admin) throw new Error('Supabase server bağlantısı qurulmayıb.');
  const { data, error } = await admin.from('profiles').select('id, email, auth_user_id, auth_provider').eq('email', email).maybeSingle();
  if (error) throw error;
  return data;
}

export async function GET() {
  try {
    return reply({ count: await getCount(), maxLimit: 30 });
  } catch {
    return reply({ error: 'Qrup məlumatı hazırda əlçatan deyil.' }, 503);
  }
}

export async function POST(request: Request) {
  if (!admin || !authClient || !groupCode) return reply({ error: 'Giriş xidməti konfiqurasiya edilməyib.' }, 503);
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'JSON sorğusu tələb olunur.' }, 415);
  if (Number(request.headers.get('content-length') || 0) > 4096) return reply({ error: 'Sorğu çox böyükdür.' }, 413);
  let body: AuthBody;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return reply({ error: 'Sorğu çox böyükdür.' }, 413);
    body = JSON.parse(raw) as AuthBody;
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply({ error: 'Yanlış sorğu.' }, 400);
  } catch {
    return reply({ error: 'Sorğu oxuna bilmədi.' }, 400);
  }

  try {
    if (body.action === 'register') {
      const firstName = clean(body.firstName, 80);
      const lastName = clean(body.lastName, 80);
      const email = clean(body.email, 254).toLowerCase();
      const password = typeof body.password === 'string' ? body.password : '';
      if (!firstName || !lastName || !validEmail(email) || password.length < 8 || password.length > 128) {
        return reply({ error: 'Ad, soyad, düzgün e-poçt və ən az 8 simvollu şifrə tələb olunur.' }, 400);
      }
      if (!codeMatches(body.groupCode)) return reply({ error: 'Qrup təsdiq kodu yanlışdır.' }, 403);
      if (!isAllowed(email)) return reply({ error: 'Bu e-poçt qrup siyahısında deyil.' }, 403);
      if (!await emailConfirmationEnabled()) return reply({ error: 'E-poçt təsdiqi aktiv deyil; qeydiyyat müvəqqəti bağlıdır.' }, 503);
      if (await getCount() >= 30) return reply({ error: quotaError }, 409);
      const existing = await profileByEmail(email);
      if (existing?.auth_user_id) return reply({ error: 'Bu e-poçt ilə hesab artıq mövcuddur.' }, 409);
      const { data, error } = await authClient.auth.signUp({
        email, password,
        options: { data: { first_name: firstName, last_name: lastName } },
      });
      if (error || !data.user) return reply({ error: 'Təsdiq e-poçtu göndərilə bilmədi.' }, 409);
      if (data.session) return reply({ error: 'Supabase-də e-poçt təsdiqi aktiv edilməlidir.' }, 503);
      return reply({ success: true, pendingVerification: true }, 202);
    }

    if (body.action === 'enroll-password' || body.action === 'enroll-google') {
      const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
      if (!token) return reply({ error: 'Google sessiyası tapılmadı.' }, 401);
      const { data: verified, error: verifyError } = await admin.auth.getUser(token);
      const authUser = verified.user;
      const provider = body.action === 'enroll-google' ? 'google' : 'email';
      if (verifyError || !authUser?.email || !authUser.identities?.some((identity) => identity.provider === provider)) return reply({ error: 'Hesab təsdiqlənmədi.' }, 401);
      if (!authUser.email_confirmed_at) return reply({ error: 'Əvvəlcə e-poçt ünvanınızı təsdiqləyin.' }, 403);
      if (provider === 'email' && !await emailConfirmationEnabled()) return reply({ error: 'E-poçt təsdiqi aktiv deyil.' }, 503);
      if (provider === 'email' && (!authUser.confirmation_sent_at ||
        Date.parse(authUser.email_confirmed_at) < Date.parse(authUser.confirmation_sent_at))) {
        return reply({ error: 'E-poçt təsdiqi etibarlı deyil.' }, 403);
      }
      const { data: linked, error: linkedError } = await admin.from('profiles').select('id').eq('auth_user_id', authUser.id).maybeSingle();
      if (linkedError) throw linkedError;
      if (linked) return reply({ success: true });
      const email = authUser.email.toLowerCase();
      if (!codeMatches(body.groupCode)) return reply({ error: 'Qrup təsdiq kodu tələb olunur.', requiresGroupCode: true }, 403);
      if (!isAllowed(email)) return reply({ error: 'Bu e-poçt qrup siyahısında deyil.' }, 403);
      const existing = await profileByEmail(email);
      if (existing) {
        if (existing.auth_user_id || existing.auth_provider !== (provider === 'google' ? 'google' : 'password')) return reply({ error: 'Bu e-poçt başqa giriş üsulu ilə bağlıdır.' }, 409);
        const { data: bound, error: bindError } = await admin.from('profiles').update({ auth_user_id: authUser.id }).eq('id', existing.id).is('auth_user_id', null).select('id').maybeSingle();
        if (bindError || !bound) return reply({ error: 'Hesab bağlana bilmədi.' }, 409);
        return reply({ success: true });
      }
      if (await getCount() >= 30) return reply({ error: quotaError }, 409);
      const fullName = provider === 'google'
        ? clean(authUser.user_metadata?.full_name || authUser.user_metadata?.name, 160) || 'Tələbə AzTU'
        : `${clean(authUser.user_metadata?.first_name, 80)} ${clean(authUser.user_metadata?.last_name, 80)}`.trim();
      const parts = fullName.split(/\s+/);
      const firstName = parts.shift() || 'Tələbə';
      const lastName = parts.join(' ') || 'AzTU';
      const { error: insertError } = await admin.from('profiles').insert({
        id: authUser.id,
        auth_user_id: authUser.id,
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        email,
        group_name: '6326A2',
        avatar_initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
        avatar_url: provider === 'google' && typeof authUser.user_metadata?.avatar_url === 'string' ? authUser.user_metadata.avatar_url : null,
        auth_provider: provider === 'google' ? 'google' : 'password',
        global_role: 'student',
      });
      if (insertError) return reply({ error: insertError.message.includes('30') ? quotaError : 'Qeydiyyat tamamlanmadı.' }, 409);
      return reply({ success: true }, 201);
    }
    return reply({ error: 'Yanlış əməliyyat.' }, 400);
  } catch (error) {
    console.error('Auth API error:', error);
    return reply({ error: 'Giriş xidməti müvəqqəti əlçatan deyil.' }, 503);
  }
}
