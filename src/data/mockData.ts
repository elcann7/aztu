export interface Course {
  id: string;
  code: string;
  name: string;
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

export const COURSES: Course[] = [
  {
    id: 'math',
    code: 'MATH-101',
    name: 'Riyazi analiz',
    lecturer: 'Dos. Əlövsət Məmmədov',
    department: 'Ali Riyaziyyat',
    credits: 6,
  },
  {
    id: 'phys',
    code: 'PHYS-102',
    name: 'Fizika',
    lecturer: 'Prof. Şakir Rüstəmov',
    department: 'Ümumi və Tətbiqi Fizika',
    credits: 5,
  },
  {
    id: 'prog',
    code: 'CS-101',
    name: 'Proqramlaşdırma',
    lecturer: 'B/müəl. Rəşad Qasımov',
    department: 'Kompüter Mühəndisliyi',
    credits: 6,
  },
  {
    id: 'eng',
    code: 'ENG-101',
    name: 'İngilis dili',
    lecturer: 'B/müəl. Leyla Həsənova',
    department: 'Xarici Dillər',
    credits: 3,
  },
];

export const FEATURED_LECTURES: Record<string, Lecture> = {
  math: {
    id: 'math-lec-01',
    courseId: 'math',
    courseName: 'Riyazi analiz',
    number: 'Mühazirə 03',
    title: 'Çoxluqlar, məhdudluq və sərhədlər',
    date: '18 Sentyabr',
    room: 'Aud. 314',
    teacherRemark:
      'Müəllim dedi ki, Veyerştras teoreminin isbatı kollokviuma daxil olacaq.',
    summary:
      'Həqiqi ədədlər çoxluğu ℝ və onun alt çoxluqlarının sərhədlilik xassələri. Dəqiq yuxarı və aşağı sərhəd (sup E, inf E) aksiomları.',
    materials: [
      {
        id: 'mat-1',
        name: 'Mühazirə 03 — Çoxluqlar.pdf',
        type: 'pdf',
        sizeOrSource: '2.4 MB',
        authorOrContext: 'Konspekt',
        date: '18 Sen',
      },
    ],
  },
  phys: {
    id: 'phys-lec-01',
    courseId: 'phys',
    courseName: 'Fizika',
    number: 'Mühazirə 02',
    title: 'Maddi nöqtə kinematikası və trayektoriyalar',
    date: '19 Sentyabr',
    room: 'Aud. 204',
    teacherRemark:
      'Laboratoriya hesabatlarını yalnız laboratoriya dəftərində təqdim edin. Qrafikləri milimetrlik vərəqdə çəkin.',
    summary:
      'Maddi nöqtənin fəzada hərəkətinin vektor təsviri: radius-vektor, sürət və toxunan/normal təcil komponentləri.',
    materials: [
      {
        id: 'mat-phys-1',
        name: 'Fizika_Mühazirə_02_Kinematika.pdf',
        type: 'pdf',
        sizeOrSource: '3.1 MB',
        authorOrContext: 'Mühazirəçi slaydları',
        date: '19 Sen',
      },
    ],
  },
  prog: {
    id: 'prog-lec-01',
    courseId: 'prog',
    courseName: 'Proqramlaşdırma',
    number: 'Mühazirə 01',
    title: 'C++ dilində yaddaş modeli və göstəricilər',
    date: '21 Sentyabr',
    room: 'Lab 402',
    teacherRemark:
      '1-ci laboratoriyada std::vector istifadəsi qadağandır. Xam new[] və delete[] ilə dinamik yaddaş ayrılmalıdır.',
    summary:
      'Stack və Heap yaddaş seqmentləri. Ünvan operatoru (&), göstəricilər (type*), massiv və göstərici əlaqəsi.',
    materials: [
      {
        id: 'mat-cs-1',
        name: 'CS101_Mühazirə_01_Pointers.pdf',
        type: 'pdf',
        sizeOrSource: '1.8 MB',
        authorOrContext: 'Dərs konspekti',
        date: '21 Sen',
      },
    ],
  },
  eng: {
    id: 'eng-lec-01',
    courseId: 'eng',
    courseName: 'İngilis dili',
    number: 'Mühazirə 01',
    title: 'Academic Writing & Technical Terminology',
    date: '22 Sentyabr',
    room: 'Aud. 410',
    teacherRemark:
      'Təqdimat mövzuları 27 sentyabra qədər seçilməlidir. Hər komanda 2 tələbədən ibarət olacaq.',
    summary:
      'Mühəndislik terminologiyası, elmi hesabat strukturu (IMRaD) və formal akademik üslub.',
    materials: [
      {
        id: 'mat-eng-1',
        name: 'Academic_English_Unit_01.pdf',
        type: 'pdf',
        sizeOrSource: '4.2 MB',
        authorOrContext: 'Cambridge Material',
        date: '22 Sen',
      },
    ],
  },
};

export const SHARED_MATERIALS: SharedMaterial[] = [
  {
    id: 'sm-1',
    name: 'Mühazirə 03 — Çoxluqlar.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 2.4 MB',
    authorOrContext: 'Mühazirə konspekti',
    date: '18 Sen',
  },
  {
    id: 'sm-2',
    name: 'Seminar qeydləri — Aysel.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 1.1 MB',
    authorOrContext: 'Aysel K.',
    date: 'Dünən',
  },
  {
    id: 'sm-3',
    name: 'Limit mövzusu üçün əlavə izah',
    type: 'link',
    sizeOrSource: 'YouTube linki',
    authorOrContext: 'Video izah',
    date: '2 gün əvvəl',
  },
  {
    id: 'sm-4',
    name: 'Müəllimin göndərdiyi tapşırıqlar.pdf',
    type: 'pdf',
    sizeOrSource: 'PDF · 840 KB',
    authorOrContext: 'Dos. Ə. Məmmədov',
    date: '3 gün əvvəl',
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Supremum və infimum',
    course: 'Riyazi analiz',
    deadline: '27 sentyabr',
    daysRemaining: '6 gün qalıb',
    priority: 'high',
    points: 5,
    status: 'in_progress',
  },
  {
    id: 'asg-2',
    title: 'Laboratoriya işi №2',
    course: 'Fizika',
    deadline: '30 sentyabr',
    daysRemaining: '9 gün qalıb',
    priority: 'normal',
    points: 10,
    status: 'pending',
  },
  {
    id: 'asg-3',
    title: 'Assignment 01',
    course: 'Proqramlaşdırma',
    deadline: '2 oktyabr',
    daysRemaining: '11 gün qalıb',
    priority: 'normal',
    points: 10,
    status: 'pending',
  },
];

export const QUESTION_ANSWER: QuestionAnswer = {
  id: 'qa-supremum',
  course: 'Riyazi analiz',
  question: 'Supremum ilə maksimum arasındakı əsas fərq nədir?',
  author: 'Kenan M.',
  totalAnswers: 2,
  acceptedAnswer:
    'Maksimum çoxluğun daxilində olmalıdır (x ∈ E), lakin supremum çoxluğa daxil olmaya da bilər (məsələn: (0, 1) intervalında sup E = 1, amma maksimum mövcud deyil).',
  verifiedBy: 'Müəllim tərəfindən təsdiqlənib',
  timeAgo: 'Dünən',
};

export const GROUP_POLL: GroupPoll = {
  id: 'poll-presentation',
  question: 'Seminar təqdimatını hansı gün edək?',
  course: 'Riyazi analiz',
  totalVotes: 13,
  status: 'active',
  timeNotice: '13 səs',
  options: [
    { text: 'Bazar ertəsi', votes: 7, percent: 55, isLeading: true },
    { text: 'Çərşənbə', votes: 4, percent: 30 },
    { text: 'Cümə', votes: 2, percent: 15 },
  ],
};

export const GROUP_REMARKS: GroupRemark[] = [
  {
    id: 'rem-1',
    course: 'Riyazi analiz',
    courseId: 'math',
    quote: 'Müəllim dedi ki, Veyerştras teoreminin isbatı kollokviuma daxil olacaq.',
    author: 'Dos. Əlövsət Məmmədov',
    date: '18 Sentyabr',
    tag: '1-ci Kollokvium',
  },
  {
    id: 'rem-2',
    course: 'Fizika',
    courseId: 'phys',
    quote: 'Laboratoriya hesabatlarını yalnız laboratoriya dəftərində təqdim edin. Qrafikləri milimetrlik vərəqdə çəkin.',
    author: 'Prof. Şakir Rüstəmov',
    date: '19 Sentyabr',
    tag: 'Laboratoriya Qaydası',
  },
  {
    id: 'rem-3',
    course: 'Proqramlaşdırma',
    courseId: 'prog',
    quote: '1-ci laboratoriyada std::vector istifadəsi qadağandır. Xam new[] və delete[] ilə dinamik yaddaş ayrılmalıdır.',
    author: 'B/müəl. Rəşad Qasımov',
    date: '21 Sentyabr',
    tag: 'Praktika Tələbi',
  },
];

