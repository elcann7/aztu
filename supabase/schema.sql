-- ============================================================================
-- AzTU 6326A2 — Canlı Supabase Verilənlər Bazası Tam Miqrasiyası
-- ============================================================================

-- 1. courses cədvəlinə əlavə sütunlar
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lecturer TEXT DEFAULT 'Kafedra Müəllimi';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 6;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'Kompüter Mühəndisliyi';

UPDATE courses SET lecturer = 'Prof. Əliyev V.', credits = 6 WHERE code = 'ADİAK';
UPDATE courses SET lecturer = 'Dos. Həsənova M.', credits = 6 WHERE code = 'XDİAK';
UPDATE courses SET lecturer = 'Prof. Qasımov E.', credits = 6 WHERE code = 'RAN';
UPDATE courses SET lecturer = 'Müəl. Məmmədov T.', credits = 6 WHERE code = 'PE';

-- 2. profiles cədvəlinə əlavə tələbə məlumat sütunları
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS group_name TEXT DEFAULT '6326A2';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS student_id_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS specialty TEXT DEFAULT 'Kompüter Mühəndisliyi';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS telegram TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS github TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_initials TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'password';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. notes cədvəli (Qrup qeydləri)
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('teacher_said', 'exam_colloquium', 'seminar', 'general')),
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_course ON notes(course_id);
CREATE INDEX IF NOT EXISTS idx_notes_created ON notes(created_at DESC);

-- 4. questions və answers cədvəlləri (Sual-Cavab Forumu)
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  details TEXT,
  course_id TEXT NOT NULL,
  accepted_answer_id TEXT,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_course ON questions(course_id);
CREATE INDEX IF NOT EXISTS idx_questions_created ON questions(created_at DESC);

CREATE TABLE IF NOT EXISTS answers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);

-- 5. polls, poll_options, poll_votes cədvəlləri (Qrup Sorğuları)
CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  course_id TEXT,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_polls_course ON polls(course_id);

CREATE TABLE IF NOT EXISTS poll_options (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_poll_options_poll ON poll_options(poll_id);

CREATE TABLE IF NOT EXISTS poll_votes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id TEXT NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_vote UNIQUE (poll_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON poll_votes(poll_id);

-- 6. materials cədvəli (Akademik Materiallar)
CREATE TABLE IF NOT EXISTS materials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('file', 'link')),
  description TEXT,
  file_name TEXT,
  file_size TEXT,
  file_mime TEXT,
  link_url TEXT,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_materials_course ON materials(course_id);

-- 7. deadlines cədvəli (Deadline və Tapşırıqlar)
CREATE TABLE IF NOT EXISTS deadlines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL,
  description TEXT,
  due_date TEXT NOT NULL,
  due_time TEXT,
  points INTEGER DEFAULT 10,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deadlines_course ON deadlines(course_id);
CREATE INDEX IF NOT EXISTS idx_deadlines_date ON deadlines(due_date);

-- ============================================================================
-- 8. TƏHLÜKƏSİZLİK: 30 TƏLƏBƏ KVOTASI TRIGGERİ
-- ============================================================================
CREATE OR REPLACE FUNCTION check_max_students_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('aztu_6326a2_profile_quota'));
  SELECT COUNT(*) INTO current_count FROM profiles;
  IF current_count >= 30 THEN
    RAISE EXCEPTION 'AzTU 6326A2 XƏTASI: Qrupda maksimum 30 nəfərlik kvota dolmuşdur!';
  END IF;
  IF NEW.group_name IS DISTINCT FROM '6326A2' THEN
    RAISE EXCEPTION 'Yanlış qrup';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_30_students_limit ON profiles;
CREATE TRIGGER enforce_30_students_limit
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION check_max_students_limit();

-- Access policies are managed by supabase/migrations/20260928152552_secure_group_access.sql.
-- Do not recreate the old anon policies here: a fresh database remains closed until the migration runs.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'courses','profiles','notes','questions','answers','polls','poll_options',
    'poll_votes','materials','deadlines'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
  END LOOP;
END $$;
-- ============================================================================
-- 10. REALTIME YAYIMI AKTİVLƏŞDİRMƏK
-- ============================================================================
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE notes, questions, answers, polls, poll_options, poll_votes, materials, deadlines;
  EXCEPTION
    WHEN duplicate_object THEN
      NULL;
  END;
END $$;
