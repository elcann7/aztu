// ============================================================================
// AzTU 6326A2 — Qaib Limit, Giriş Balı və 30 ECTS GPA Hesablama Xidməti
// ============================================================================

export type GradingForm = 'Forma-1' | 'Forma-2';

export interface CourseAcademicConfig {
  id: string;
  koicaId?: string;
  code: string;
  name: string;
  shortName: string;
  slug: string;
  credits: number;
  gpaWeightPercent: number;
  form: GradingForm;
  totalHours: number; // KOICA rəsmi saatı: 75, 45 və ya 30
  weeklyHours: number; // Həftəlik dərs saatı: 5, 3 və ya 2
  koicaTotalClasses: number; // KOICA LMS-dəki rəsmi dərs sayı (38, 23, 15)
  koicaAttendedClasses: number; // KOICA LMS-də qeydə alınmış iştirak sayı
  lecturer: string;
  warningNote?: string;
  defaultSeminar: number;
  defaultLab: number;
  defaultIndependent: number;
  defaultExam: number;
}

export interface StudentCourseRecord {
  courseId: string;
  totalHours: number;
  absences: number; // 1 qaib = 2 akademik saat (1 dərs cütü)
  seminarScore: number; // Forma-1: 0-30, Forma-2: 0-20
  labScore: number; // Forma-2: 0-10, Forma-1: 0
  independentScore: number; // 0-10 (Sərbəst iş)
  expectedExamScore: number; // 0-50 (İmtahan hədəfi)
}

export interface ComputedCourseMetrics {
  totalClasses: number; // Math.ceil(totalHours / 2) -> 38, 23, 15
  maxAbsences: number; // 25% limit (dərs cütü ilə: 9, 5, 3)
  remainingAbsences: number;
  absencePercent: number;
  isLimitExceeded: boolean;
  isDangerZone: boolean; // 1 qaib haqqı qalıbsa
  attendanceScore: number; // 0 - 10 bal
  entryScore: number; // 0 - 50 bal (Giriş balı)
  totalScore: number; // 0 - 100 bal (Yekun bal)
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  gradeLabel: string;
  neededFor51: number | null; // E (Keçid)
  neededFor71: number | null; // C (Təqaüd baza)
  neededFor81: number | null; // B (Yüksək)
  neededFor91: number | null; // A (Əlaçı)
}

export const AZTU_6326A2_COURSES: CourseAcademicConfig[] = [
  {
    id: 'prog',
    koicaId: '5041',
    code: 'İf-61125y',
    name: 'Proqramlaşdırmanın əsasları-1',
    shortName: 'Proqramlaşdırma-1',
    slug: 'programming',
    credits: 8,
    gpaWeightPercent: 26.7,
    form: 'Forma-2',
    totalHours: 75,
    weeklyHours: 5,
    koicaTotalClasses: 38,
    koicaAttendedClasses: 2,
    lecturer: 'Dos. Fizuli Əzimov / Müəl. Ayxan Həsənov / Müəl. Şəbnəm İsgəndərli',
    defaultSeminar: 19,
    defaultLab: 10,
    defaultIndependent: 10,
    defaultExam: 45,
  },
  {
    id: 'math',
    koicaId: '5039',
    code: 'İf-61115y',
    name: 'Riyazi analiz - 1',
    shortName: 'Riyazi analiz-1',
    slug: 'math-analysis',
    credits: 7,
    gpaWeightPercent: 23.3,
    form: 'Forma-1',
    totalHours: 75,
    weeklyHours: 5,
    koicaTotalClasses: 38,
    koicaAttendedClasses: 3,
    lecturer: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    defaultSeminar: 26,
    defaultLab: 0,
    defaultIndependent: 9,
    defaultExam: 40,
  },
  {
    id: 'algebra',
    koicaId: '5040',
    code: 'İf-61119y',
    name: 'Xətti cəbr',
    shortName: 'Xətti cəbr',
    slug: 'linear-algebra',
    credits: 4,
    gpaWeightPercent: 13.3,
    form: 'Forma-1',
    totalHours: 45,
    weeklyHours: 3,
    koicaTotalClasses: 23,
    koicaAttendedClasses: 2,
    lecturer: 'Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov',
    defaultSeminar: 26,
    defaultLab: 0,
    defaultIndependent: 10,
    defaultExam: 41,
  },
  {
    id: 'aze',
    koicaId: '5042',
    code: 'Üf-71706y',
    name: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    shortName: 'ADİAK (Azərb. dili)',
    slug: 'azerbaijani',
    credits: 4,
    gpaWeightPercent: 13.3,
    form: 'Forma-1',
    totalHours: 45,
    weeklyHours: 3,
    koicaTotalClasses: 23,
    koicaAttendedClasses: 0,
    lecturer: 'Müəl. Nərminə İsayeva',
    defaultSeminar: 28,
    defaultLab: 0,
    defaultIndependent: 10,
    defaultExam: 45,
  },
  {
    id: 'eng',
    code: 'Üf-71705y',
    name: 'Xarici dildə işgüzar və akademik kommunikasiya - 1',
    shortName: 'XDİAK (İngilis dili)',
    slug: 'english',
    credits: 4,
    gpaWeightPercent: 13.3,
    form: 'Forma-1',
    totalHours: 45,
    weeklyHours: 3,
    koicaTotalClasses: 23,
    koicaAttendedClasses: 0,
    lecturer: 'Müəl. Dilarə Həmidova',
    warningNote: 'Fənn hələ KOICA LMS-ə əlavə edilməyib (müəllim qaibləri kağız jurnala yazır və sonradan sistemə vurulur).',
    defaultSeminar: 27,
    defaultLab: 0,
    defaultIndependent: 10,
    defaultExam: 44,
  },
  {
    id: 'phys',
    koicaId: '5038',
    code: 'İf-20403y',
    name: 'Fizika',
    shortName: 'Fizika',
    slug: 'physics',
    credits: 3,
    gpaWeightPercent: 10.0,
    form: 'Forma-2',
    totalHours: 30,
    weeklyHours: 2,
    koicaTotalClasses: 15,
    koicaAttendedClasses: 0,
    lecturer: 'Dos. Sürəyya Məmmədova',
    warningNote: '30 saatlıq fəndir (həftədə 2 saat, cəmi 15 dərs): yalnız 3 dərs (6 saat) qaib haqqı var, 4-cü qaibdə kəsilir!',
    defaultSeminar: 17,
    defaultLab: 9,
    defaultIndependent: 9,
    defaultExam: 38,
  },
];

const STORAGE_PREFIX = 'aztu_6326a2_academic_tracker_v2';

export function getDefaultRecords(): Record<string, StudentCourseRecord> {
  const map: Record<string, StudentCourseRecord> = {};
  for (const c of AZTU_6326A2_COURSES) {
    map[c.id] = {
      courseId: c.id,
      totalHours: c.totalHours,
      absences: 0,
      seminarScore: c.defaultSeminar,
      labScore: c.defaultLab,
      independentScore: c.defaultIndependent,
      expectedExamScore: c.defaultExam,
    };
  }
  return map;
}

export function loadStudentRecords(userId?: string): Record<string, StudentCourseRecord> {
  const key = `${STORAGE_PREFIX}_${userId || 'guest'}`;
  const defaults = getDefaultRecords();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    const merged: Record<string, StudentCourseRecord> = { ...defaults };
    for (const c of AZTU_6326A2_COURSES) {
      if (parsed[c.id]) {
        merged[c.id] = {
          ...defaults[c.id],
          ...parsed[c.id],
          totalHours: c.totalHours, // Rəsmi KOICA saatı həmişə sabit qalır
        };
      }
    }
    return merged;
  } catch {
    return defaults;
  }
}

export function saveStudentRecords(
  records: Record<string, StudentCourseRecord>,
  userId?: string
): void {
  const key = `${STORAGE_PREFIX}_${userId || 'guest'}`;
  try {
    localStorage.setItem(key, JSON.stringify(records));
  } catch {
    // Ignore storage quota errors
  }
}

export function computeCourseMetrics(
  config: CourseAcademicConfig,
  record: StudentCourseRecord
): ComputedCourseMetrics {
  const totalHours = config.totalHours;
  const totalClasses = config.koicaTotalClasses || Math.ceil(totalHours / 2);
  // AzTU 25% qaib limiti (dərs cütü ilə: 75s -> 9 qaib, 45s -> 5 qaib, 30s -> 3 qaib)
  const maxAbsences = Math.floor((totalHours * 0.25) / 2);
  const absences = Math.max(0, record.absences);
  const remainingAbsences = Math.max(0, maxAbsences - absences);
  const missedHours = absences * 2;
  const absencePercent = Math.min(100, Math.round((missedHours / totalHours) * 100));
  const isLimitExceeded = absences > maxAbsences;
  const isDangerZone = !isLimitExceeded && remainingAbsences <= 1;

  // AzTU 10 ballıq davamiyyət şkalası
  let attendanceScore = 10;
  if (isLimitExceeded) {
    attendanceScore = 0;
  } else if (absences === 0) {
    attendanceScore = 10;
  } else {
    const ratio = absences / Math.max(1, maxAbsences);
    if (ratio <= 0.34) {
      attendanceScore = 9;
    } else if (ratio <= 0.67) {
      attendanceScore = 8;
    } else {
      attendanceScore = 7;
    }
  }

  const maxSem = config.form === 'Forma-1' ? 30 : 20;
  const sem = Math.min(maxSem, Math.max(0, Number(record.seminarScore) || 0));
  const lab = config.form === 'Forma-2' ? Math.min(10, Math.max(0, Number(record.labScore) || 0)) : 0;
  const ind = Math.min(10, Math.max(0, Number(record.independentScore) || 0));

  const entryScore = Math.round((sem + lab + ind + attendanceScore) * 10) / 10;
  const exam = Math.min(50, Math.max(0, Number(record.expectedExamScore) || 0));
  const rawTotal = Math.round(entryScore + exam);

  // İmtahanda minimum 17 bal şərti və qaib limiti şərti
  const isExamFailed = exam < 17;
  const totalScore = isLimitExceeded ? entryScore : rawTotal;

  let letterGrade: ComputedCourseMetrics['letterGrade'] = 'F';
  let gradeLabel = 'F (Kəsildi)';

  if (!isLimitExceeded && !isExamFailed && totalScore >= 51) {
    if (totalScore >= 91) {
      letterGrade = 'A';
      gradeLabel = 'A (Əla)';
    } else if (totalScore >= 81) {
      letterGrade = 'B';
      gradeLabel = 'B (Çox yaxşı)';
    } else if (totalScore >= 71) {
      letterGrade = 'C';
      gradeLabel = 'C (Yaxşı)';
    } else if (totalScore >= 61) {
      letterGrade = 'D';
      gradeLabel = 'D (Kafi)';
    } else {
      letterGrade = 'E';
      gradeLabel = 'E (Qənaətbəxş)';
    }
  }

  const calcNeeded = (target: number): number | null => {
    if (isLimitExceeded) return null;
    const diff = Math.ceil(target - entryScore);
    const req = Math.max(17, diff);
    return req <= 50 ? req : null;
  };

  return {
    totalClasses,
    maxAbsences,
    remainingAbsences,
    absencePercent,
    isLimitExceeded,
    isDangerZone,
    attendanceScore,
    entryScore,
    totalScore,
    letterGrade,
    gradeLabel,
    neededFor51: calcNeeded(51),
    neededFor71: calcNeeded(71),
    neededFor81: calcNeeded(81),
    neededFor91: calcNeeded(91),
  };
}

export interface SemesterGpaSummary {
  weightedGpa: number;
  totalCredits: number;
  totalAbsences: number;
  dangerCoursesCount: number;
  failedByAbsenceCount: number;
  averageEntryScore: number;
  scholarshipStatus: string;
}

export function computeSemesterSummary(
  records: Record<string, StudentCourseRecord>
): SemesterGpaSummary {
  let weightedSum = 0;
  let totalCredits = 0;
  let totalAbsences = 0;
  let dangerCoursesCount = 0;
  let failedByAbsenceCount = 0;
  let entrySum = 0;

  for (const course of AZTU_6326A2_COURSES) {
    const rec = records[course.id] || getDefaultRecords()[course.id];
    const metrics = computeCourseMetrics(course, rec);

    weightedSum += metrics.totalScore * course.credits;
    totalCredits += course.credits;
    totalAbsences += rec.absences;
    entrySum += metrics.entryScore;

    if (metrics.isLimitExceeded) {
      failedByAbsenceCount += 1;
    } else if (metrics.isDangerZone) {
      dangerCoursesCount += 1;
    }
  }

  const weightedGpa = totalCredits > 0 ? Math.round((weightedSum / totalCredits) * 100) / 100 : 0;
  const averageEntryScore = Math.round((entrySum / AZTU_6326A2_COURSES.length) * 10) / 10;

  let scholarshipStatus = 'Adi Təqaüd Hədəfi (71+)';
  if (failedByAbsenceCount > 0) {
    scholarshipStatus = 'Diqqət: Qaib limiti aşılıb (Təqaüd riski)';
  } else if (weightedGpa >= 91) {
    scholarshipStatus = 'Əlaçı Təqaüdü Zəmanətli (A · 91+)';
  } else if (weightedGpa >= 81) {
    scholarshipStatus = 'Yüksək Təqaüd Zonası (B/A · 81–100)';
  } else if (weightedGpa >= 71) {
    scholarshipStatus = 'Adi Təqaüd Zonası (C/B · 71–80)';
  } else {
    scholarshipStatus = 'Kritik Zona (71-dən aşağı)';
  }

  return {
    weightedGpa,
    totalCredits,
    totalAbsences,
    dangerCoursesCount,
    failedByAbsenceCount,
    averageEntryScore,
    scholarshipStatus,
  };
}
