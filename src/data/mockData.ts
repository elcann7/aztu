export interface Course {
  id: string;
  code: string;
  name: string;
  slug?: string;
  lecturer: string;
  department: string;
  credits: number;
}

export interface SharedMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'link' | 'code';
  sizeOrSource: string;
  authorOrContext: string;
  date: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  courseName: string;
  number: string;
  title: string;
  date: string;
  room: string;
  teacherRemark: string;
  summary: string;
  materials: SharedMaterial[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  deadline: string;
  daysRemaining: string;
  priority: 'urgent' | 'high' | 'normal';
  points: number;
  status: 'pending' | 'in_progress' | 'submitted';
}

export interface QuestionAnswer {
  id: string;
  course: string;
  question: string;
  author: string;
  totalAnswers: number;
  acceptedAnswer: string;
  verifiedBy: string;
  timeAgo: string;
}

export interface GroupPoll {
  id: string;
  question: string;
  course: string;
  totalVotes: number;
  options: { text: string; votes: number; percent: number; isLeading?: boolean }[];
  status: 'active' | 'closed';
  timeNotice: string;
}

export interface GroupRemark {
  id: string;
  course: string;
  courseId: string;
  quote: string;
  author: string;
  date: string;
  tag: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Bazar ertəsi' | 'Çərşənbə axşamı' | 'Çərşənbə' | 'Cümə axşamı' | 'Cümə';
  dayIndex: number; // 1: Bazar ertəsi, 2: Çərşənbə axşamı, ..., 5: Cümə
  time: string;
  subject: string;
  courseId: string;
  type: 'Mühazirə' | 'Seminar' | 'Laboratoriya';
  typeCode: 'M' | 'S' | 'L';
  lecturer: string;
  room: string;
  subgroup?: string;
}

export interface SyllabusWeek {
  week: number;
  dates: string;
  title: string;
  type: 'lecture' | 'seminar' | 'colloquium' | 'exam';
  status: 'completed' | 'in_progress' | 'upcoming';
  description?: string;
}

// ----------------------------------------------------------------------------
// Semestr Təqvimi və Hesablama Konfiqurasiyası (2026/2027 Payız - 1-ci Semestr)
// ----------------------------------------------------------------------------
export const SEMESTER_CONFIG = {
  semester: '2026/2027 Payız Semestri (1-ci Semestr)',
  startDate: '2026-09-15',
  endDate: '2026-12-26',
  examSessionStart: '2027-01-05',
  examSessionEnd: '2027-01-31',
  totalWeeks: 15,
  currentWeek: 2,
  todayDayIndex: 2, // 2 = Çərşənbə axşamı
  todayName: 'Çərşənbə axşamı',
  daysToExam: 105,
  weeksToExam: 14,
  colloquium1Week: 6,
  colloquium1Date: '20-24 Oktyabr 2026',
  colloquium2Week: 11,
  colloquium2Date: '24-28 Noyabr 2026',
  colloquium3Week: 14,
  colloquium3Date: '15-19 Dekabr 2026',
};

// ----------------------------------------------------------------------------
// AzTU 6326A2 — 6 Əsas Fənn (Rəsmi Cədvələ Uyğun)
// ----------------------------------------------------------------------------
export const COURSES: Course[] = [
  {
    id: 'math',
    code: 'MATH-101',
    name: 'Riyazi analiz-1',
    slug: 'math-analysis',
    lecturer: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    department: 'Ali Riyaziyyat kafedrası',
    credits: 7,
  },
  {
    id: 'algebra',
    code: 'MATH-102',
    name: 'Xətti cəbr',
    slug: 'linear-algebra',
    lecturer: 'Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov',
    department: 'Ali Riyaziyyat kafedrası',
    credits: 4,
  },
  {
    id: 'phys',
    code: 'İF-20403y',
    name: 'Fizika',
    slug: 'physics',
    lecturer: 'Dos. Sürəyya Məmmədova',
    department: 'Mühəndislik fizikası və elektronika kafedrası',
    credits: 3,
  },
  {
    id: 'prog',
    code: 'CS-101',
    name: 'Proqramlaşdırmanın əsasları-1',
    slug: 'programming',
    lecturer: 'Dos. Füzuli Əzimov / Müəl. Ayxan Həsənov / Müəl. Şəbnəm İsgəndərli',
    department: 'Kompüter Mühəndisliyi kafedrası',
    credits: 8,
  },
  {
    id: 'eng',
    code: 'ENG-101',
    name: 'Xarici dildə işgüzar və akademik kommunikasiya -1',
    slug: 'english',
    lecturer: 'Müəl. Dilarə Həmidova',
    department: 'Xarici dillər kafedrası',
    credits: 4,
  },
  {
    id: 'aze',
    code: 'AZE-101',
    name: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    slug: 'azerbaijani',
    lecturer: 'Müəl. Nərminə İsayeva',
    department: 'Azərbaycan dili və pedaqogika kafedrası',
    credits: 4,
  },
];

// ----------------------------------------------------------------------------
// Həftəlik Rəsmi Dərs Cədvəli (Auditoriyalar və Müəllimlər ilə)
// ----------------------------------------------------------------------------
export const WEEKLY_SCHEDULE: ScheduleItem[] = [
  // Bazar ertəsi (Day 1)
  {
    id: 'mon-1a',
    day: 'Bazar ertəsi',
    dayIndex: 1,
    time: '09:00 - 10:20',
    subject: 'Fizika',
    courseId: 'phys',
    type: 'Laboratoriya',
    typeCode: 'L',
    lecturer: 'Dos. Sürəyya Məmmədova',
    room: '5-205',
    subgroup: '1-ci yarımqrup',
  },
  {
    id: 'mon-1b',
    day: 'Bazar ertəsi',
    dayIndex: 1,
    time: '09:00 - 10:20',
    subject: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Müəl. Ayxan Həsənov',
    room: '6-508',
    subgroup: '2-ci yarımqrup',
  },
  {
    id: 'mon-2',
    day: 'Bazar ertəsi',
    dayIndex: 1,
    time: '10:30 - 11:50',
    subject: 'Xarici dildə işgüzar və akademik kommunikasiya -1',
    courseId: 'eng',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Müəl. Dilarə Həmidova',
    room: '6-506',
  },
  {
    id: 'mon-3',
    day: 'Bazar ertəsi',
    dayIndex: 1,
    time: '12:00 - 13:20',
    subject: 'Riyazi analiz-1',
    courseId: 'math',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Dos. Nizami Şıxəliyev',
    room: '1-506',
  },

  // Çərşənbə axşamı (Day 2 - BUGÜN)
  {
    id: 'tue-2',
    day: 'Çərşənbə axşamı',
    dayIndex: 2,
    time: '10:30 - 11:50',
    subject: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    type: 'Laboratoriya',
    typeCode: 'L',
    lecturer: 'Müəl. Şəbnəm İsgəndərli',
    room: '6-504',
  },
  {
    id: 'tue-3a',
    day: 'Çərşənbə axşamı',
    dayIndex: 2,
    time: '12:00 - 13:20',
    subject: 'Riyazi analiz-1',
    courseId: 'math',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Dos. Nizami Şıxəliyev',
    room: '6-408',
    subgroup: 'Tək həftələr',
  },
  {
    id: 'tue-3b',
    day: 'Çərşənbə axşamı',
    dayIndex: 2,
    time: '12:00 - 13:20',
    subject: 'Fizika',
    courseId: 'phys',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Dos. Sürəyya Məmmədova',
    room: '5-312',
    subgroup: 'Cüt həftələr',
  },

  // Çərşənbə (Day 3)
  {
    id: 'wed-2a',
    day: 'Çərşənbə',
    dayIndex: 3,
    time: '10:30 - 11:50',
    subject: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    courseId: 'aze',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Müəl. Nərmin İsayeva',
    room: '1-422',
  },
  {
    id: 'wed-2b',
    day: 'Çərşənbə',
    dayIndex: 3,
    time: '10:30 - 11:50',
    subject: 'Xətti cəbr',
    courseId: 'algebra',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Dos. Rəna Əmirova',
    room: '1-422',
  },
  {
    id: 'wed-3',
    day: 'Çərşənbə',
    dayIndex: 3,
    time: '12:00 - 13:20',
    subject: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Dos. Fizuli Əzimov',
    room: '6-408',
  },

  // Cümə axşamı (Day 4)
  {
    id: 'thu-2',
    day: 'Cümə axşamı',
    dayIndex: 4,
    time: '10:30 - 11:50',
    subject: 'Xətti cəbr',
    courseId: 'algebra',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Dos. Rəna Əmirova',
    room: '3-308',
  },
  {
    id: 'thu-3',
    day: 'Cümə axşamı',
    dayIndex: 4,
    time: '12:00 - 13:20',
    subject: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    courseId: 'aze',
    type: 'Mühazirə',
    typeCode: 'M',
    lecturer: 'Müəl. Nərmin İsayeva',
    room: '6-512',
  },

  // Cümə (Day 5)
  {
    id: 'fri-2',
    day: 'Cümə',
    dayIndex: 5,
    time: '10:30 - 11:50',
    subject: 'Xarici dildə işgüzar və akademik kommunikasiya -1',
    courseId: 'eng',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Müəl. Dilarə Həmidova',
    room: '6-506',
  },
  {
    id: 'fri-3',
    day: 'Cümə',
    dayIndex: 5,
    time: '12:00 - 13:20',
    subject: 'Riyazi analiz-1',
    courseId: 'math',
    type: 'Seminar',
    typeCode: 'S',
    lecturer: 'Müəl. Şamil Talıblı',
    room: '6-408',
  },
];

// ----------------------------------------------------------------------------
// Hər Fənn üzrə 15 Həftəlik Mövzu Planı (Semestr İmtahanına kimi)
// ----------------------------------------------------------------------------
export const COURSE_SYLLABUS: Record<string, SyllabusWeek[]> = {
  math: [
    { week: 1, dates: '15-19 Sen', title: 'Həqiqi ədədlər çoxluğu. Dəqiq aşağı və yuxarı sərhədlər (inf, sup)', type: 'lecture', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: 'Çoxluqlar və həqiqi ədədlər: sərhədlər, supremum və infimum', type: 'lecture', status: 'in_progress', description: 'Bu günə qədər bildirilən mövzular; növbəti mövzular müəllimdən dəqiqləşdiriləcək' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'Ədədi ardıcıllıqlar və onların limiti. Monotonluq', type: 'lecture', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'Funksiyanın limiti (Koşi və Heyne tərifləri). Görkəmli limitlər', type: 'lecture', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'Funksiyanın kəsilməzliyi və kəsilmə nöqtələrinin növləri', type: 'lecture', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM (İlk 5 mövzu) & Funksiyanın törəməsi', type: 'colloquium', status: 'upcoming', description: '20 bal dəyərində' },
    { week: 7, dates: '27-31 Okt', title: 'Diferensiallama qaydaları. Mürəkkəb funksiyanın törəməsi', type: 'lecture', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'Yüksək tərtibli törəmələr və Leybnits düsturu', type: 'lecture', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Diferensial hesabının əsas teoremləri (Roll, Laqranj, Koşi)', type: 'lecture', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'Lopital qaydası ilə qeyri-müəyyənliklərin açılması', type: 'lecture', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & Teylor və Makloren düsturları', type: 'colloquium', status: 'upcoming', description: '20 bal dəyərində' },
    { week: 12, dates: '01-05 Dek', title: 'Funksiyanın ekstremumları, qabarıqlıq və əyilmə nöqtələri', type: 'lecture', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'Funksiyanın asimptotları və tam sxem üzrə qrafikin qurulması', type: 'lecture', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM / SƏRBƏST İŞ & Qeyri-müəyyən inteqral', type: 'colloquium', status: 'upcoming', description: '10 bal sərbəst iş təhvili' },
    { week: 15, dates: '22-26 Dek', title: 'Müəyyən inteqral (Nyuton-Leybnits düsturu) və Semestr Təkrarı', type: 'lecture', status: 'upcoming' },
  ],
  algebra: [
    { week: 1, dates: '15-19 Sen', title: 'Matris anlayışı və matrislər üzərində xətti əməllər', type: 'lecture', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: '2-ci və 3-cü tərtib determinantlar və onların xassələri', type: 'lecture', status: 'in_progress', description: 'Hazırda keçirilir (Aud. 3-308)' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'n-tərtibli determinantlar, minorlar və cəbri tamamlayıcılar', type: 'lecture', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'Tərs matris və onun tapılma üsulları', type: 'lecture', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'Matrisin ranqı və elementar sətir/sütun çevrilmələri', type: 'lecture', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM & Xətti cəbri tənliklər sistemi (XCTS), Kramer qaydası', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: '27-31 Okt', title: 'XCTS-in Qauss və Qauss-Jordan üsulları ilə həlli', type: 'lecture', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'Kroneker-Kapelli teoremi. Bircins XCTS və fundamental həllər sistemi', type: 'lecture', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Xətti fəzalar, vektorların xətti asılılığı və asılı olmaması', type: 'lecture', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'Xətti fəzanın bazisi, koordinatları və ölçüsü', type: 'lecture', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & Evklid fəzaları, skalyar hasil və Qram-Şmidt ortoqonallaşdırması', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: '01-05 Dek', title: 'Xətti operatorlar və onların müxtəlif bazislərdə matrisləri', type: 'lecture', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'Xətti operatorun məxsusi ədədləri və məxsusi vektorları', type: 'lecture', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM & Kvadratik formalar və kanonik şəklə gətirilməsi', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Silvestr meyarı və Semestr Yekun İmtahana Hazırlıq', type: 'lecture', status: 'upcoming' },
  ],
  prog: [
    { week: 1, dates: '15-19 Sen', title: 'M-1. Proqramlaşdırmaya giriş. Alqoritm anlayışı. Python proqramlaşdırma dili ilə tanışlıq.', type: 'lecture', status: 'completed', description: 'KOICA LMS #8403 · M1.pptx (Fizuli Əzimov)' },
    { week: 2, dates: '22-26 Sen', title: 'M-2,3. Ədədi və məntiqi tipli verilənlər və onlar üzərində əməllər. Məntiqi operatorlar. Ədədi tipli verilənlər üçün riyazi funksiyalar.', type: 'lecture', status: 'in_progress', description: 'KOICA LMS #8404 · M2-3.pptx (Fizuli Əzimov / Ayxan Həsənov)' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'M4. Sətir tipli verilənlər və onlar üzərində əməllər. Sətirlər üçün funksiya və metodlar.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8405 · M4.pptx' },
    { week: 4, dates: '06-10 Okt', title: 'M-5,6. Siyahılar (list), kortejlər (tuple), lüğətlər (dict), çoxluqlar (set) və onlar üçün funksiya və metodlar.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8407 · M5-6.pptx' },
    { week: 5, dates: '13-17 Okt', title: 'M-7. Tarix-zaman tipli verilənlər. Verilənlərin tiplərinin çevrilməsi.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8408 · M7.pptx' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM & M-8. Mənimsəmə və şərh komandaları. Giriş-çıxış komandaları. Mövqeli formatlaşdırma üsulları.', type: 'colloquium', status: 'upcoming', description: 'KOICA LMS #8410 · M8.pptx' },
    { week: 7, dates: '27-31 Okt', title: 'M-9. Şərt komandası.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8412 · M9.pptx' },
    { week: 8, dates: '03-07 Noy', title: 'M-10. Pythonda istisnaların işlənilməsi.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8413 · M10.pptx' },
    { week: 9, dates: '10-14 Noy', title: 'M-11. Pythonda FOR dövr operatoru. Range funksiyası.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8416 · M11.pptx' },
    { week: 10, dates: '17-21 Noy', title: 'M-12. Pythonda WHILE dövr operatoru.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8418 · M12.pptx' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & M-13. Pythonda proseduralar və funksiyalar.', type: 'colloquium', status: 'upcoming', description: 'KOICA LMS #8419 · M13.pptx' },
    { week: 12, dates: '01-05 Dek', title: 'M-14. Pythonda modullar.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8420 · M14.pptx' },
    { week: 13, dates: '08-12 Dek', title: 'M-15. Pythonda fayllara işlərin təşkili.', type: 'lecture', status: 'upcoming', description: 'KOICA LMS #8421 · M15.pptx' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM / SƏRBƏST İŞ & Laboratoriya işlərinin təhvili', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Semestr Yekun Təkrarı və İmtahana Hazırlıq (F.M.Əzimov əsas dərsliyi üzrə)', type: 'lecture', status: 'upcoming' },
  ],
  eng: [
    { week: 1, dates: '15-19 Sen', title: 'Engineering Foundations: Technical Terminology & Diagnostic Test', type: 'seminar', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: 'Academic Vocabulary & Computer Hardware/Software Architecture Texts', type: 'seminar', status: 'in_progress', description: 'Seminar Aud. 6-506' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'Data Structures & Algorithms terminology in English', type: 'seminar', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'Reading comprehension: Modern AI & Cloud Computing articles', type: 'seminar', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'Professional Email Writing & Academic Communication Etiquette', type: 'seminar', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1ST COLLOQUIUM (Reading, Vocabulary & Grammar Assessment)', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: '27-31 Okt', title: 'Describing Charts, Graphs and Statistical Data in Engineering', type: 'seminar', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'Writing Technical Summaries and Abstracts (IMRaD Format)', type: 'seminar', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Listening comprehension: MIT/Stanford OpenCourseWare lectures', type: 'seminar', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'Presentation Skills: Structure, Slide Design & Body Language', type: 'seminar', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2ND COLLOQUIUM & Individual Technical Presentations', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: '01-05 Dek', title: 'Group Discussions: Debates on Ethics in AI & Cybersecurity', type: 'seminar', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'Technical Documentation & Writing Software User Guides', type: 'seminar', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3RD COLLOQUIUM & Term Project Presentations', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Final Semester Review & Exam Preparation Guidelines', type: 'seminar', status: 'upcoming' },
  ],
  aze: [
    { week: 1, dates: 'Mövzu 1–2', title: 'Fənnin mövzusu, məqsəd və vəzifələri. Kommunikasiya anlayışı. İşgüzar üslubun mahiyyəti və xüsusiyyətləri.', type: 'seminar', status: 'completed', description: 'KOICA LMS #5042 · Mətn: Azərbaycan Texniki Universiteti (Nərminə İsayeva)' },
    { week: 2, dates: 'Mövzu 3–4', title: 'İşgüzar ünsiyyət və onun əsas prinsipləri. İşgüzar ünsiyyətdə özünütəsdiq təqdimatı.', type: 'seminar', status: 'in_progress', description: 'KOICA LMS #5042 · Aud. 1-422 / 6-512' },
    { week: 3, dates: 'Mövzu 5–6', title: 'İşgüzar ünsiyyətdə dialoq və monoloji janrlar üzərində praktik işlər.', type: 'seminar', status: 'upcoming' },
    { week: 4, dates: 'Mövzu 7–8', title: 'Sözsüz bağlantı: bədən dili, mimika və jestlər. İşgüzar ünsiyyət etikası, psixologiyası və subordinasiya qaydaları.', type: 'seminar', status: 'upcoming' },
    { week: 5, dates: 'Mövzu 9–10', title: 'Layihə fəaliyyətinin logistik dəstəklənməsi və təqdimatı. Peşə etikası və işgüzar karyeranın idarə edilməsi.', type: 'seminar', status: 'upcoming' },
    { week: 6, dates: 'Mövzu 11–12', title: '1-Cİ KOLLOQVİUM & Şifahi işgüzar ünsiyyətin mədəniyyətlərarası aspektləri. Yazılı işgüzar kommunikasiya.', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: 'Mövzu 13–14', title: 'Şəxsi sənədlərin növləri və tərtibi qaydaları. Təşkilati və inzibati sənədlər, elektron sənəd dövriyyəsi.', type: 'seminar', status: 'upcoming' },
    { week: 8, dates: 'Mövzu 15–16', title: 'İstinad və analitik sənədlərin tərtibi. Məktubların növləri və yazılma qaydaları.', type: 'seminar', status: 'upcoming' },
    { week: 9, dates: 'Mövzu 17', title: 'Biznes sahəsində işgüzar ünsiyyət, kommersiya yazışmaları, işgüzar e-mail və sosial şəbəkə qaydaları.', type: 'seminar', status: 'upcoming' },
    { week: 10, dates: 'Mövzu 18', title: 'Yazılı mesajların əsas növləri; ticarət yazışmaları və qeyri-kommersiya məktubları.', type: 'seminar', status: 'upcoming' },
    { week: 11, dates: 'Mövzu 19', title: '2-Cİ KOLLOQVİUM & Elektron işgüzar rabitə, poçt yazışmaları və yazılı işgüzar ünsiyyətdə reklam.', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: 'Mövzu 20', title: 'Reklam biznes əlaqələrinin üzvi hissəsi kimi. Dil mediası və reklam mətnlərinin hazırlanması.', type: 'seminar', status: 'upcoming' },
    { week: 13, dates: 'Mövzu 21', title: 'Akademik məqsədlər üçün dil: elmi iş (referat, tezis, məqalə, kurs işi, dissertasiya) yazmaq qaydaları.', type: 'seminar', status: 'upcoming' },
    { week: 14, dates: 'Mövzu 22', title: '3-CÜ KOLLOQVİUM / SƏRBƏST İŞ & Elmi-tədqiqat mövzusu üzrə icmal məqalələrin və prezentasiyaların hazırlanması.', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: 'Mövzu 23', title: 'Fənn üzrə keçirilən proqram materiallarının təkrarı və yekunlaşdırılması.', type: 'seminar', status: 'upcoming' },
  ],
};

export const FEATURED_LECTURES: Record<string, Lecture> = {
  math: {
    id: 'math-lec-01',
    courseId: 'math',
    courseName: 'Riyazi analiz-1',
    number: 'Mühazirə 02',
    title: 'Ədədi ardıcıllıqlar və onların limiti',
    date: '22 Sentyabr',
    room: 'Aud. 6-408 / 1-506',
    teacherRemark:
      'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı: KOICA LMS (#5039) üzrə 38 dərsdən 3-də iştirak qeydə alınıb (100% davamiyyət, 0 qaib).',
    summary:
      'Ədədi ardıcıllıq anlayışı, ardıcıllığın limiti, yığılan və dağılan ardıcıllıqlar, limitin əsas xassələri.',
    materials: [],
  },
  prog: {
    id: 'prog-lec-01',
    courseId: 'prog',
    courseName: 'Proqramlaşdırmanın əsasları-1',
    number: 'M-1 .. M-15',
    title: 'Python Proqramlaşdırma Dili — 15 Mühazirə Paketi və Əsas Dərslik',
    date: '25 Sentyabr',
    room: 'KOICA LMS #5041',
    teacherRemark:
      'Dos. Fizuli Əzimov KOICA LMS-ə bütün 15 mühazirənin təqdimatını (M1.pptx – M15.pptx) və əsas Python dərsliyini (PDF) yükləyib.',
    summary:
      'Alqoritm anlayışı, verilənlər tipləri, sətirlər, siyahılar/kortejlər/lüğətlər/çoxluqlar, şərt və dövr operatorları, funksiyalar, modullar və fayllarla iş.',
    materials: [
      {
        id: 'mat-cs-1',
        name: 'F.M.Əzimov Pythonda proqramlaşdırmanın əsasları.pdf',
        type: 'pdf',
        sizeOrSource: 'KOICA LMS #6677',
        authorOrContext: 'Fizuli Əzimov',
        date: '22 Sent',
      },
    ],
  },
  phys: {
    id: 'phys-lec-01',
    courseId: 'phys',
    courseName: 'Fizika',
    number: 'Mühazirə 1–4 & Lab 1–8',
    title: 'İrəliləmə və fırlanma hərəkətinin dinamikası',
    date: '2026 Payız',
    room: 'KOICA LMS #5038',
    teacherRemark:
      'Dos. Sürəyya Məmmədova KOICA LMS-ə 4 mühazirə təqdimatı və 7 laboratoriya təlimatı yükləyib.',
    summary:
      'LMS-in ilk mövzusu: Nyuton qanunları, impulsun saxlanması, fırlanma dinamikası və mexaniki enerjinin saxlanması.',
    materials: [
      {
        id: 'mat-phys-1',
        name: 'Fizika mühazirə 1 təqdimatı',
        type: 'pptx',
        sizeOrSource: 'Müəllim təqdimatı',
        authorOrContext: 'Sürəyya Məmmədova',
        date: '17 Sent',
      },
    ],
  },
  algebra: {
    id: 'alg-lec-01',
    courseId: 'algebra',
    courseName: 'Xətti cəbr',
    number: 'Mühazirə 1–2',
    title: 'Xətti cəbr — Mühazirə 1 və Mühazirə 2 təqdimatları',
    date: '18 Sentyabr',
    room: 'KOICA LMS #5040',
    teacherRemark:
      'Dos. Rəna Əmirova KOICA LMS-ə "dərs Müh1.pptx" (#4234) və "dərs Müh2.pptx" (#4236) təqdimatlarını yükləyib.',
    summary:
      'Matris anlayışı, matrislər üzərində əməllər, 2-ci və 3-cü tərtib determinantlar və onların əsas xassələri.',
    materials: [
      {
        id: 'mat-alg-1',
        name: 'dərs Müh1.pptx & dərs Müh2.pptx',
        type: 'pptx',
        sizeOrSource: 'KOICA LMS #4234 / #4236',
        authorOrContext: 'Rəna Əmirova',
        date: '18 Sent',
      },
    ],
  },
  eng: {
    id: 'eng-lec-01',
    courseId: 'eng',
    courseName: 'Xarici dildə işgüzar və akademik kommunikasiya -1',
    number: 'Seminar 02',
    title: 'Academic Vocabulary & Computer Architecture',
    date: '22 Sentyabr',
    room: 'Aud. 6-506',
    teacherRemark:
      'Müəl. Dilarə Həmidova: Fənn hələ KOICA LMS-ə əlavə edilməyib, dərslər auditoriya 6-506-da keçirilir.',
    summary:
      'Technical vocabulary: CPU, RAM, ALU, bus architecture, compiler vs interpreter text analysis.',
    materials: [],
  },
  aze: {
    id: 'aze-lec-01',
    courseId: 'aze',
    courseName: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    number: 'Mövzu 1–23',
    title: 'ADİAK Dərs Vəsaiti və Sərbəst İşlərin Mövzuları',
    date: '20 Sentyabr',
    room: 'KOICA LMS #5042',
    teacherRemark:
      'Müəl. Nərminə İsayeva KOICA LMS-ə "ADİAK dərs vəsaiti.docx" (#4932), "Sərbəst işlərin mövzuları.docx" (#4933) və 23 seminar mövzusunu əlavə edib.',
    summary:
      'Kommunikasiya haqqında anlayış, işgüzar üslubun mahiyyəti və xüsusiyyətləri, şifahi və yazılı işgüzar ünsiyyət.',
    materials: [
      {
        id: 'mat-aze-1',
        name: 'ADİAK dərs vəsaiti.docx & Sərbəst işlərin mövzuları.docx',
        type: 'docx',
        sizeOrSource: 'KOICA LMS #4932 / #4933',
        authorOrContext: 'Nərminə İsayeva',
        date: '20 Sent',
      },
    ],
  },
};

export const SHARED_MATERIALS: SharedMaterial[] = [
  {
    id: 'sm-1',
    name: 'F.M.Əzimov — Pythonda proqramlaşdırmanın əsasları.pdf',
    type: 'pdf',
    sizeOrSource: 'KOICA LMS #6677',
    authorOrContext: 'Fizuli Əzimov',
    date: '22 Sent',
  },
  {
    id: 'sm-2',
    name: 'Python M-1 .. M-15 Mühazirə Təqdimatları (M1.pptx – M15.pptx)',
    type: 'pptx',
    sizeOrSource: 'KOICA LMS #8403–#8421',
    authorOrContext: 'Fizuli Əzimov',
    date: '25 Sent',
  },
  {
    id: 'sm-3',
    name: 'Xətti Cəbr — dərs Müh1.pptx & dərs Müh2.pptx',
    type: 'pptx',
    sizeOrSource: 'KOICA LMS #4234–#4236',
    authorOrContext: 'Rəna Əmirova',
    date: '18 Sent',
  },
  {
    id: 'sm-4',
    name: 'ADİAK dərs vəsaiti.docx & Sərbəst işlərin mövzuları.docx',
    type: 'docx',
    sizeOrSource: 'KOICA LMS #4932–#4933',
    authorOrContext: 'Nərminə İsayeva',
    date: '20 Sent',
  },
];

export const ASSIGNMENTS: Assignment[] = [];

export const QUESTION_ANSWER: QuestionAnswer = {
  id: 'qa-supremum',
  course: 'Riyazi analiz-1',
  question: 'Limitin tapılmasında Veyerştras teoremi nə vaxt tətbiq olunur?',
  author: 'Elcan S.',
  totalAnswers: 3,
  acceptedAnswer:
    'Hər bir monoton artan və yuxarıdan məhdud ardıcıllığın sonlu limiti var. Əgər ardıcıllıq monoton azalan və aşağıdan məhduddursa, onun da sonlu limiti mövcuddur.',
  verifiedBy: 'Dos. Nizami Şıxəliyev tərəfindən təsdiqlənib',
  timeAgo: 'Dünən',
};

export const GROUP_POLL: GroupPoll = {
  id: 'poll-presentation',
  question: 'Python laboratoriyalarını hansı mühitdə yazaq?',
  course: 'Proqramlaşdırmanın əsasları-1',
  totalVotes: 19,
  status: 'active',
  timeNotice: '19 səs toplandı',
  options: [
    { text: 'VS Code + Python 3.12 (venv)', votes: 12, percent: 63, isLeading: true },
    { text: 'PyCharm Community Edition', votes: 5, percent: 26 },
    { text: 'Jupyter Notebook / Google Colab', votes: 2, percent: 11 },
  ],
};

export const GROUP_REMARKS: GroupRemark[] = [
  {
    id: 'rem-1',
    course: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    quote: 'Semestrin ikinci yarısında mütləq Pandas keçəcəyik (Series, DataFrame və CSV cədvəllərinin analizi). İndidən Python təməlini möhkəmləndirin.',
    author: 'Müəl. Şəbnəm İsgəndərli',
    date: '22 Sentyabr',
    tag: 'Laboratoriya & Pandas',
  },
  {
    id: 'rem-2',
    course: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    quote: 'Dünənki seminarda keçdiyimiz int, float, str tip çevrilmələri və input() ilə daxil edilən sətirlərin int()-ə çevrilməsi praktiki məsələlərin təməlidir.',
    author: 'Müəl. Ayxan Həsənov',
    date: 'Dünən',
    tag: 'Seminar & Tiplər',
  },
  {
    id: 'rem-3',
    course: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    quote: 'Python-da kod blokları 4 boşluq (indentation) ilə təyin edilir. Şərtlərdə and, or, not məntiqi operatorlarının prioritetinə diqqət yetirin.',
    author: 'Dos. Fizuli Əzimov',
    date: '22 Sentyabr',
    tag: 'Mühazirə Qaydası',
  },
  {
    id: 'rem-4',
    course: 'Riyazi analiz-1',
    courseId: 'math',
    quote: 'Veyerştras teoreminin isbatı və ardıcıllığın monotonluq şərtləri 1-ci kolloqviuma daxil ediləcək.',
    author: 'Dos. Nizami Şıxəliyev',
    date: '22 Sentyabr',
    tag: '1-ci Kolloqvium',
  },
  {
    id: 'rem-5',
    course: 'Fizika',
    courseId: 'phys',
    quote: 'Cismin impulsu cismin kütləsi ilə onun sürətinin hasilinə bərabərdir.',
    author: 'Sürəyya Məmmədova · Mühazirə 1',
    date: 'Müəllim təqdimatı',
    tag: 'Mühazirə izahı',
  },
  {
    id: 'rem-6',
    course: 'Xətti cəbr',
    courseId: 'algebra',
    quote: 'Sarrus qaydası yalnız 3-cü tərtib üçün keçərlidir, 4 və yuxarı tərtibləri üçbucaqlı şəklə gətirərək hesablayın.',
    author: 'Dos. Rəna Əmirova',
    date: '20 Sentyabr',
    tag: 'Determinant Qaydası',
  },
];
