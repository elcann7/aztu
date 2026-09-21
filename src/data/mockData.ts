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
  type: 'pdf' | 'link' | 'code';
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
    credits: 6,
  },
  {
    id: 'algebra',
    code: 'MATH-102',
    name: 'Xətti cəbr',
    slug: 'linear-algebra',
    lecturer: 'Dos. Rəna Əmirova',
    department: 'Ali Riyaziyyat kafedrası',
    credits: 5,
  },
  {
    id: 'phys',
    code: 'PHYS-101',
    name: 'Fizika',
    slug: 'physics',
    lecturer: 'Dos. Sürəyya Məmmədova',
    department: 'Mühəndislik fizikası və elektronika kafedrası',
    credits: 5,
  },
  {
    id: 'prog',
    code: 'CS-101',
    name: 'Proqramlaşdırmanın əsasları-1',
    slug: 'programming',
    lecturer: 'Dos. Fizuli Əzimov / Müəl. Şəbnəm İsgəndərli / Müəl. Ayxan Həsənov',
    department: 'Kompüter Mühəndisliyi kafedrası',
    credits: 6,
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
    lecturer: 'Müəl. Nərmin İsayeva',
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
    { week: 2, dates: '22-26 Sen', title: 'Ədədi ardıcıllıqlar və onların limiti. Yığılma əlamətləri', type: 'lecture', status: 'in_progress', description: 'Hazırda keçirilir (Aud. 1-506)' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'Monoton ardıcıllıqlar. Veyerştras teoremi. e ədədi', type: 'lecture', status: 'upcoming' },
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
  phys: [
    { week: 1, dates: '15-19 Sen', title: 'Maddi nöqtə kinematikası, sürət və təcil. (Lab: Ölçmə xətaları)', type: 'lecture', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: 'Nyuton qanunları və dinamika. (Lab: Sərbəstdüşmə təcilinin təyini)', type: 'lecture', status: 'in_progress', description: 'Lab 5-205 / Mühazirə 5-312' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'İmpuls və impulsun saxlanması qanunu. Reaktiv hərəkət', type: 'lecture', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'İş, güc, kinetik və potensial enerji. Enerjinin saxlanması', type: 'lecture', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'Bərk cismin fırlanma hərəkəti, inersiya momenti, Şteyner teoremi', type: 'lecture', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM & Qravitasiya sahəsi, Kepler qanunları', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: '27-31 Okt', title: 'Mexaniki rəqslər, harmonik və sönən rəqslər', type: 'lecture', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'Mexaniki dalğalar, dalğa tənliyi və səs dalğaları', type: 'lecture', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Molekulyar fizika, ideal qazın əsas kinetik tənliyi', type: 'lecture', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'Termodinamikanın I və II qanunları, Karno dövrü və entropiya', type: 'lecture', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & Elektrostatika, Kulon qanunu, sahə intensivliyi', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: '01-05 Dek', title: 'Qauss teoremi, elektrik potensialı və kondensatorlar', type: 'lecture', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'Sabit cərəyan qanunları: Om və Kirxhof qaydaları', type: 'lecture', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM & Maqnit sahəsi, Bio-Savar-Laplas və Amper qanunu', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Elektromaqnit induksiyası, Faradey qanunu və Laboratoriya yekunu', type: 'lecture', status: 'upcoming' },
  ],
  prog: [
    { week: 1, dates: '15-19 Sen', title: 'C++ proqramının arxitekturası, tiplər və standart I/O (cin, cout)', type: 'lecture', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: 'Budaqlanan alqoritmlər: if, else if, switch-case məntiqi', type: 'lecture', status: 'in_progress', description: 'Lab 6-504 / Mühazirə 6-408' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'Dövri strukturlar: for, while, do-while və iç-içə dövrlər', type: 'lecture', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'Birlölçülü massivlər, xətti və binar axtarış, sıralama alqoritmləri', type: 'lecture', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'İkiölçülü massivlər (matrislər) və C-string simvol sətirləri', type: 'lecture', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM (Kodlaşdırma testi) & Funksiyalar, parametr ötürülməsi', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: '27-31 Okt', title: 'Rekursiya alqoritmləri və funksiyaların həddən artıq yüklənməsi (Overloading)', type: 'lecture', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'Göstəricilər (Pointers), ünvan anlayışı və dinamik yaddaş (new / delete)', type: 'lecture', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Göstərici arifmetikası, massiv və göstərici qarşılıqlı əlaqəsi', type: 'lecture', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'İstifadəçi tipləri: struct, union və enum strukturları', type: 'lecture', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & Fayllarla iş (fstream): Mətn və binar fayllar', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: '01-05 Dek', title: 'OOP Əsasları: Sinif (Class), Obyekt və İnkapsulyasiya (Access specifiers)', type: 'lecture', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'Konstruktor və Destruktorlar, kopyalama konstruktoru', type: 'lecture', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM / SƏRBƏST İŞ KODU & İrsiyyət (Inheritance) əsasları', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Polimorfizm, Virtual funksiyalar və Bütün Laboratoriyaların Müdafiəsi', type: 'lecture', status: 'upcoming' },
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
    { week: 1, dates: '15-19 Sen', title: 'Azərbaycan ədəbi dilinin normaları və akademik üslubun əsasları', type: 'lecture', status: 'completed' },
    { week: 2, dates: '22-26 Sen', title: 'İşgüzar sənədləşmə: Ərizə, tərcümeyi-hal (CV) və izahat yazılışı', type: 'lecture', status: 'in_progress', description: 'Aud. 1-422 / 6-512' },
    { week: 3, dates: '29 Sen - 03 Okt', title: 'Rəsmi-işgüzar üslub: Arayış, akt, bildiriş və protokol tərtibi', type: 'lecture', status: 'upcoming' },
    { week: 4, dates: '06-10 Okt', title: 'Akademik kommunikasiyada nitq mədəniyyəti və terminologiya qaydaları', type: 'lecture', status: 'upcoming' },
    { week: 5, dates: '13-17 Okt', title: 'Elmi mətnlərin linqvistik xüsusiyyətləri və mühəndislik terminləri', type: 'lecture', status: 'upcoming' },
    { week: 6, dates: '20-24 Okt', title: '1-Cİ KOLLOQVİUM (İşgüzar yazı və orfoepiya normaları)', type: 'colloquium', status: 'upcoming' },
    { week: 7, dates: '27-31 Okt', title: 'Akademik yazı: Referat, kurs işi və elmi məqalənin strukturu', type: 'lecture', status: 'upcoming' },
    { week: 8, dates: '03-07 Noy', title: 'İstinad və biblioqrafik siyahının tərtib edilməsi standartları (APA)', type: 'lecture', status: 'upcoming' },
    { week: 9, dates: '10-14 Noy', title: 'Natiqlik sənəti: Akademik auditoriya qarşısında çıxış qaydaları', type: 'lecture', status: 'upcoming' },
    { week: 10, dates: '17-21 Noy', title: 'İşgüzar danışıqlar, mübahisə və elmi diskussiyaların idarə edilməsi', type: 'lecture', status: 'upcoming' },
    { week: 11, dates: '24-28 Noy', title: '2-Cİ KOLLOQVİUM & Məruzə və təqdimatların müdafiəsi', type: 'colloquium', status: 'upcoming' },
    { week: 12, dates: '01-05 Dek', title: 'Akademik dürüstlük (plagiat anlayışı və onun qarşısının alınması)', type: 'lecture', status: 'upcoming' },
    { week: 13, dates: '08-12 Dek', title: 'İşgüzar yazışmalar və rəsmi elektron məktubların tərtibi', type: 'lecture', status: 'upcoming' },
    { week: 14, dates: '15-19 Dek', title: '3-CÜ KOLLOQVİUM / SƏRBƏST İŞ & Seminar təqdimatlarının yekunu', type: 'colloquium', status: 'upcoming' },
    { week: 15, dates: '22-26 Dek', title: 'Semestr Təkrarı və Yekun İmtahana Hazırlıq', type: 'lecture', status: 'upcoming' },
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
      'Dos. Nizami Şıxəliyev: Veyerştras teoreminin isbatı və ardıcıllığın monotonluq şərtləri 1-ci kolloqviuma daxil ediləcək.',
    summary:
      'Ədədi ardıcıllıq anlayışı, ardıcıllığın limiti, yığılan və dağılan ardıcıllıqlar, limitin əsas xassələri.',
    materials: [
      {
        id: 'mat-math-1',
        name: 'Mühazirə_02_Ardıcıllıqlar.pdf',
        type: 'pdf',
        sizeOrSource: '2.1 MB',
        authorOrContext: 'Dos. Nizami Şıxəliyev',
        date: '22 Sen',
      },
    ],
  },
  prog: {
    id: 'prog-lec-01',
    courseId: 'prog',
    courseName: 'Proqramlaşdırmanın əsasları-1',
    number: 'Mühazirə 02 / Lab 02',
    title: 'Budaqlanan alqoritmlər və if-else operatorları',
    date: '22 Sentyabr',
    room: 'Lab. 6-504 / Aud. 6-408',
    teacherRemark:
      'Dos. Fizuli Əzimov: switch-case operatorunda break yazılmadıqda fall-through baş verir, laboratoriya hesabatında buna diqqət yetirin.',
    summary:
      'Şərti keçid operatorları (if, else if, else), switch-case strukturu və ternary operator (? :) istifadəsi.',
    materials: [
      {
        id: 'mat-cs-1',
        name: 'CS101_Mühazirə_02_Budaqlanma.pdf',
        type: 'pdf',
        sizeOrSource: '1.9 MB',
        authorOrContext: 'Dos. Fizuli Əzimov',
        date: '22 Sen',
      },
    ],
  },
  phys: {
    id: 'phys-lec-01',
    courseId: 'phys',
    courseName: 'Fizika',
    number: 'Mühazirə 02 / Lab 02',
    title: 'Nyuton qanunları və dinamikanın əsasları',
    date: '22 Sentyabr',
    room: 'Aud. 5-312 / Lab. 5-205',
    teacherRemark:
      'Dos. Sürəyya Məmmədova: 2-ci laboratoriya işini növbəti bazar ertəsinə qədər laboratoriya dəftərində milimetrlik qrafiklə təhvil verin.',
    summary:
      'İnersial hesablama sistemləri, Nyutonun 1-ci, 2-ci və 3-cü qanunları. Sürtünmə qüvvəsi və elastiklik qüvvələri.',
    materials: [
      {
        id: 'mat-phys-1',
        name: 'Fizika_Mühazirə_02_Dinamika.pdf',
        type: 'pdf',
        sizeOrSource: '3.4 MB',
        authorOrContext: 'Dos. Sürəyya Məmmədova',
        date: '22 Sen',
      },
    ],
  },
  algebra: {
    id: 'alg-lec-01',
    courseId: 'algebra',
    courseName: 'Xətti cəbr',
    number: 'Mühazirə 02',
    title: 'Determinantlar və onların xassələri',
    date: '24 Sentyabr',
    room: 'Aud. 3-308',
    teacherRemark:
      'Dos. Rəna Əmirova: Sarrus qaydası yalnız 3-cü tərtib üçün keçərlidir, 4 və daha yüksək tərtibli determinantları sətir elementar çevrilmələri ilə üçbucaqlı şəklə gətirərək hesablayın.',
    summary:
      '2-ci və 3-cü tərtib determinantlar, determinantların əsas xassələri (sətirlərin xətti kombinasiyası, transponirə).',
    materials: [
      {
        id: 'mat-alg-1',
        name: 'Xətti_Cəbr_Mühazirə_02.pdf',
        type: 'pdf',
        sizeOrSource: '1.6 MB',
        authorOrContext: 'Dos. Rəna Əmirova',
        date: '20 Sen',
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
      'Müəl. Dilarə Həmidova: Unit 1 üzrə terminoloji lüğət testini cümə günü auditoriyada yazacağıq.',
    summary:
      'Technical vocabulary: CPU, RAM, ALU, bus architecture, compiler vs interpreter text analysis.',
    materials: [
      {
        id: 'mat-eng-1',
        name: 'Unit_01_Academic_Vocabulary.pdf',
        type: 'pdf',
        sizeOrSource: '2.8 MB',
        authorOrContext: 'Müəl. Dilarə Həmidova',
        date: '22 Sen',
      },
    ],
  },
  aze: {
    id: 'aze-lec-01',
    courseId: 'aze',
    courseName: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    number: 'Mühazirə 02',
    title: 'İşgüzar sənədləşmə: Ərizə və Tərcümeyi-hal',
    date: '24 Sentyabr',
    room: 'Aud. 6-512',
    teacherRemark:
      'Müəl. Nərmin İsayeva: Rəsmi ərizə nümunəsini standart A4 formatında tərtib edib növbəti seminara gətirin.',
    summary:
      'Rəsmi-işgüzar üslubun normaları, ərizənin rekvizitləri, rezyume (CV) və izahat vərəqəsi standartları.',
    materials: [
      {
        id: 'mat-aze-1',
        name: 'İşgüzar_Sənədlər_Nümunələri.pdf',
        type: 'pdf',
        sizeOrSource: '1.2 MB',
        authorOrContext: 'Müəl. Nərmin İsayeva',
        date: '21 Sen',
      },
    ],
  },
};

export const SHARED_MATERIALS: SharedMaterial[] = [
  {
    id: 'sm-1',
    name: 'Riyazi Analiz — Ədədi Ardıcıllıqlar.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 2.1 MB',
    authorOrContext: 'Dos. Nizami Şıxəliyev',
    date: '22 Sen',
  },
  {
    id: 'sm-2',
    name: 'CS101 — Laboratoriya İşi №1 İzahı.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 1.8 MB',
    authorOrContext: 'Müəl. Şəbnəm İsgəndərli',
    date: 'Dünən',
  },
  {
    id: 'sm-3',
    name: 'Xətti Cəbr — Determinantlar və Matrislər.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 2.6 MB',
    authorOrContext: 'Dos. Rəna Əmirova',
    date: '20 Sen',
  },
  {
    id: 'sm-4',
    name: 'Fizika — 2-ci Laboratoriya Təlimatı.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 3.1 MB',
    authorOrContext: 'Dos. Sürəyya Məmmədova',
    date: '19 Sen',
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Laboratoriya işi №1: C++ Budaqlanma',
    course: 'Proqramlaşdırmanın əsasları-1',
    deadline: '29 sentyabr',
    daysRemaining: '7 gün qalıb',
    priority: 'high',
    points: 10,
    status: 'in_progress',
  },
  {
    id: 'asg-2',
    title: 'Laboratoriya işi №2: Sərbəstdüşmə təcili',
    course: 'Fizika',
    deadline: '28 sentyabr',
    daysRemaining: '6 gün qalıb',
    priority: 'high',
    points: 10,
    status: 'pending',
  },
  {
    id: 'asg-3',
    title: 'Fərdi Tapşırıq: 3-cü tərtib determinantlar',
    course: 'Xətti cəbr',
    deadline: '2 oktyabr',
    daysRemaining: '10 gün qalıb',
    priority: 'normal',
    points: 5,
    status: 'pending',
  },
];

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
  question: 'Proqramlaşdırma laboratoriyasını hansı mühitdə yazaq?',
  course: 'Proqramlaşdırmanın əsasları-1',
  totalVotes: 18,
  status: 'active',
  timeNotice: '18 səs toplandı',
  options: [
    { text: 'VS Code + MinGW GCC', votes: 11, percent: 61, isLeading: true },
    { text: 'Visual Studio 2022', votes: 5, percent: 28 },
    { text: 'CLion / PlatformIO', votes: 2, percent: 11 },
  ],
};

export const GROUP_REMARKS: GroupRemark[] = [
  {
    id: 'rem-1',
    course: 'Riyazi analiz-1',
    courseId: 'math',
    quote: 'Veyerştras teoreminin isbatı və ardıcıllığın monotonluq şərtləri 1-ci kolloqviuma daxil ediləcək.',
    author: 'Dos. Nizami Şıxəliyev',
    date: '22 Sentyabr',
    tag: '1-ci Kolloqvium',
  },
  {
    id: 'rem-2',
    course: 'Fizika',
    courseId: 'phys',
    quote: 'Laboratoriya hesabatlarını yalnız laboratoriya dəftərində milimetrlik qrafiklə qəbul edirəm.',
    author: 'Dos. Sürəyya Məmmədova',
    date: '22 Sentyabr',
    tag: 'Laboratoriya Tələbi',
  },
  {
    id: 'rem-3',
    course: 'Proqramlaşdırmanın əsasları-1',
    courseId: 'prog',
    quote: 'switch-case operatorunda break yazılmadıqda fall-through baş verir, laboratoriyada buna diqqət yetirin.',
    author: 'Dos. Fizuli Əzimov',
    date: '22 Sentyabr',
    tag: 'Kod Tələbi',
  },
  {
    id: 'rem-4',
    course: 'Xətti cəbr',
    courseId: 'algebra',
    quote: 'Sarrus qaydası yalnız 3-cü tərtib üçün keçərlidir, 4 və yuxarı tərtibləri üçbucaqlı şəklə gətirərək hesablayın.',
    author: 'Dos. Rəna Əmirova',
    date: '20 Sentyabr',
    tag: 'Determinant Qaydası',
  },
];
