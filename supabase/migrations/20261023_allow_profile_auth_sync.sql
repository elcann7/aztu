-- ============================================================================
-- AzTU 6326A2 — Profiles Access & Synchronization Policy Fix
-- Allows anon and authenticated clients to insert, read, and sync their 6326A2 profiles
-- Strictly preserves:
-- 1) MAX 30 students quota (enforced by check_max_students_limit trigger)
-- 2) Group 6326A2 security code enforcement
-- ============================================================================

-- Ensure profiles table has proper columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS group_name TEXT DEFAULT '6326A2';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_initials TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS student_id_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS specialty TEXT DEFAULT 'Kompüter Mühəndisliyi';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telegram TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS github TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'password';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS global_role TEXT DEFAULT 'student';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grant table-level permissions to anon and authenticated roles
GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon, authenticated;

-- Allow reading profiles so students can check registrations and log in
DROP POLICY IF EXISTS profiles_read_all ON public.profiles;
DROP POLICY IF EXISTS profiles_select_all ON public.profiles;
CREATE POLICY profiles_select_all ON public.profiles
  FOR SELECT TO anon, authenticated
  USING (true);

-- Allow registering (inserting) only for 6326A2 group (strictly guarded by 30-student trigger)
DROP POLICY IF EXISTS profiles_insert_group ON public.profiles;
CREATE POLICY profiles_insert_group ON public.profiles
  FOR INSERT TO anon, authenticated
  WITH CHECK (group_name = '6326A2');

-- Allow updating profile fields for 6326A2 group
DROP POLICY IF EXISTS profiles_update_group ON public.profiles;
CREATE POLICY profiles_update_group ON public.profiles
  FOR UPDATE TO anon, authenticated
  USING (group_name = '6326A2')
  WITH CHECK (group_name = '6326A2');

-- Ensure the 30-student quota trigger is active
CREATE OR REPLACE FUNCTION public.check_max_students_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('aztu_6326a2_profile_quota'));
  SELECT COUNT(*) INTO current_count FROM public.profiles;
  IF current_count >= 30 THEN
    RAISE EXCEPTION 'AzTU 6326A2: 30 nəfərlik kvota tamamlanmışdır!';
  END IF;
  IF NEW.group_name IS DISTINCT FROM '6326A2' THEN
    RAISE EXCEPTION 'Yanlış qrup: yalnız 6326A2 tələbələri qoşula bilər';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_30_students_limit ON public.profiles;
CREATE TRIGGER enforce_30_students_limit
BEFORE INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.check_max_students_limit();
