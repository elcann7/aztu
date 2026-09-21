-- ============================================================================
-- AzTU 6326A2 — Vahid Akademik Platforma üçün Supabase PostgreSQL Sxemi
-- Bu skript bütün cədvəlləri, 30 nəfərlik kvota tətikçisini (trigger),
-- indeksləri və Realtime yayımını qurur.
-- ============================================================================

-- 1. Fənlər Cədvəli (Courses)
CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  lecturer TEXT NOT NULL,
  department TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 6
);

-- İlkin 4 fənnin daxil edilməsi
INSERT INTO courses (id, code, name, slug, lecturer, department, credits)
VALUES 
  ('math-analysis', 'MATH-101', 'Riyazi analiz', 'math-analysis', 'Prof. Əliyev V.', 'Ali Riyaziyyat', 6),
  ('physics', 'PHYS-102', 'Fizika', 'physics', 'Dos. Həsənova M.', 'Ümumi Fizika', 6),
  ('programming', 'CS-101', 'Proqramlaşdırma', 'programming', 'Müəl. Qasımov E.', 'Kompüter Mühəndisliyi', 6),
  ('english', 'ENG-101', 'İngilis dili', 'english', 'Müəl. Məmmədova S.', 'Xarici Dillər', 4)
ON CONFLICT (id) DO NOTHING;

-- 2. Tələbə Profilləri Cədvəli (users_profiles)
CREATE TABLE IF NOT EXISTS users_profiles (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,          -- LOCKED: Universitet qeydiyyatı ilə təsdiqlənir
  last_name TEXT NOT NULL,           -- LOCKED: Universitet qeydiyyatı ilə təsdiqlənir
  email TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL DEFAULT '6326A2', -- LOCKED: Həmişə 6326A2
  avatar_initials TEXT,
  avatar_url TEXT,
  bio TEXT,
  student_id_number TEXT,
  specialty TEXT DEFAULT 'Kompüter Mühəndisliyi',
  telegram TEXT,
  phone TEXT,
  github TEXT,
  auth_provider TEXT DEFAULT 'password',
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Qrup Qeydləri Cədvəli (notes)
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('teacher_said', 'exam_colloquium', 'seminar', 'general')),
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_course ON notes(course_id);
CREATE INDEX IF NOT EXISTS idx_notes_created ON notes(created_at DESC);

-- 4. Sual-Cavab Forumu (questions & answers)
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  details TEXT,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  accepted_answer_id TEXT,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- 5. Qrup Sorğuları (polls, poll_options, poll_votes)
CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  question TEXT NOT NULL,
  course_id TEXT REFERENCES courses(id) ON DELETE SET NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS poll_options (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id TEXT NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_vote UNIQUE (poll_id, user_id)
);

-- 6. Akademik Dərs Materialları (materials)
CREATE TABLE IF NOT EXISTS materials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
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

-- 7. Tapşırıqlar və Deadline-lar (deadlines)
CREATE TABLE IF NOT EXISTS deadlines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
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
-- 8. TƏHLÜKƏSİZLİK: MAKSİMUM 30 TƏLƏBƏ KVOTASI TƏTİKÇİSİ (TRIGGER)
-- ============================================================================
CREATE OR REPLACE FUNCTION check_max_students_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO current_count FROM users_profiles;
  IF current_count >= 30 THEN
    RAISE EXCEPTION 'AzTU 6326A2 XƏTASI: Qrupda maksimum 30 nəfərlik kvota dolmuşdur! Kənar qeydiyyat qadağandır.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_30_students_limit ON users_profiles;
CREATE TRIGGER enforce_30_students_limit
BEFORE INSERT ON users_profiles
FOR EACH ROW
EXECUTE FUNCTION check_max_students_limit();

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) TƏNZİMLƏNMƏSİ
-- ============================================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;

-- 6326A2 Vahid platforma oxuma və yazma qaydaları (Public client anon / authenticated)
CREATE POLICY "Public read courses" ON courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read profiles" ON users_profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert profiles" ON users_profiles FOR INSERT TO anon, authenticated WITH CHECK (group_name = '6326A2');
CREATE POLICY "Public update profiles" ON users_profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (group_name = '6326A2');

CREATE POLICY "Public read notes" ON notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert notes" ON notes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public delete notes" ON notes FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Public read questions" ON questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert questions" ON questions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update questions" ON questions FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Public read answers" ON answers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert answers" ON answers FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read polls" ON polls FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert polls" ON polls FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read poll_options" ON poll_options FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert poll_options" ON poll_options FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read poll_votes" ON poll_votes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert poll_votes" ON poll_votes FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read materials" ON materials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert materials" ON materials FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public read deadlines" ON deadlines FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert deadlines" ON deadlines FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update deadlines" ON deadlines FOR UPDATE TO anon, authenticated USING (true);

-- ============================================================================
-- 10. REALTIME YAYIMI AKTİVLƏŞDİRMƏK
-- ============================================================================
-- 30 tələbənin ekranında dərhal görünməsi üçün cədvəllər Realtime yayımına əlavə edilir
ALTER PUBLICATION supabase_realtime ADD TABLE notes;
ALTER PUBLICATION supabase_realtime ADD TABLE questions;
ALTER PUBLICATION supabase_realtime ADD TABLE answers;
ALTER PUBLICATION supabase_realtime ADD TABLE polls;
ALTER PUBLICATION supabase_realtime ADD TABLE poll_votes;
ALTER PUBLICATION supabase_realtime ADD TABLE materials;
ALTER PUBLICATION supabase_realtime ADD TABLE deadlines;
