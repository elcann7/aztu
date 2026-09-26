import React, { useState, useEffect } from 'react';
import './CalculatorView.css';
import { useAuth } from '../../../context/AuthContext';
import {
  Calculator,
  RotateCcw,
  Award,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  AZTU_6326A2_COURSES,
  type StudentCourseRecord,
  getDefaultRecords,
  loadStudentRecords,
  saveStudentRecords,
  computeCourseMetrics,
  computeSemesterSummary,
} from '../../../services/academicTracker';

export const CalculatorView: React.FC = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<Record<string, StudentCourseRecord>>(() =>
    loadStudentRecords(user?.id)
  );

  // Quick 10-point Colloquium converter state
  const [kol1, setKol1] = useState<number>(9);
  const [kol2, setKol2] = useState<number>(9);
  const [kol3, setKol3] = useState<number>(9);
  const [semAvg, setSemAvg] = useState<number>(9);

  useEffect(() => {
    setRecords(loadStudentRecords(user?.id));
  }, [user?.id]);

  const updateRecord = (courseId: string, patch: Partial<StudentCourseRecord>) => {
    setRecords((prev) => {
      const current = prev[courseId] || getDefaultRecords()[courseId];
      const next = {
        ...prev,
        [courseId]: {
          ...current,
          ...patch,
        },
      };
      saveStudentRecords(next, user?.id);
      return next;
    });
  };

  const applyTarget88Preset = () => {
    const defaults = getDefaultRecords();
    setRecords(defaults);
    saveStudentRecords(defaults, user?.id);
  };

  const applyTarget91Preset = () => {
    const base = getDefaultRecords();
    const next: Record<string, StudentCourseRecord> = {};
    for (const c of AZTU_6326A2_COURSES) {
      next[c.id] = {
        ...base[c.id],
        absences: 0,
        seminarScore: c.form === 'Forma-1' ? 29 : 19,
        labScore: c.form === 'Forma-2' ? 10 : 0,
        independentScore: 10,
        expectedExamScore: 45,
      };
    }
    setRecords(next);
    saveStudentRecords(next, user?.id);
  };

  const resetAbsencesOnly = () => {
    setRecords((prev) => {
      const next: Record<string, StudentCourseRecord> = {};
      for (const key of Object.keys(prev)) {
        next[key] = { ...prev[key], absences: 0 };
      }
      saveStudentRecords(next, user?.id);
      return next;
    });
  };

  const summary = computeSemesterSummary(records);

  const avg10 =
    (Math.min(10, Math.max(0, kol1)) +
      Math.min(10, Math.max(0, kol2)) +
      Math.min(10, Math.max(0, kol3)) +
      Math.min(10, Math.max(0, semAvg))) /
    4;
  const forma1Result = Math.round(avg10 * 3 * 10) / 10;
  const forma2Result = Math.round(avg10 * 2 * 10) / 10;

  return (
    <div className="calc-view-flow">
      {/* 1. Top Summary Card */}
      <div className="calc-summary-banner">
        <div className="calc-banner-top">
          <div>
            <div className="calc-banner-badge-row">
              <span className="calc-group-pill">
                <Calculator size={12} />
                6326A2 · Rəsmi Bologna Hesablayıcısı
              </span>
              <span className="calc-bologna-pill">
                6 Fənn · Tam 30 ECTS Kredit · Forma-1 & Forma-2
              </span>
            </div>
            <h2 className="calc-banner-title">
              Qaib Limit, İmtahan Giriş Balı və GPA Kalkulyatoru
            </h2>
            <p className="calc-banner-subtitle">
              Hər fənn üzrə qaiblərinizi (1 dərs = 2 saat) və cari ballarınızı qeyd edin — qalan qaib haqqınız, giriş balınız və 30 kreditlik çəkili GPA avtomatik hesablanır.
            </p>
          </div>

          <div className="calc-preset-actions">
            <button
              type="button"
              onClick={applyTarget88Preset}
              className="calc-preset-btn"
              title="88.8 GPA Təqaüd Strategiyasını yüklə"
            >
              <Sparkles size={13} />
              <span>88+ GPA Ssenarisi</span>
            </button>
            <button
              type="button"
              onClick={applyTarget91Preset}
              className="calc-preset-btn is-primary"
              title="91+ Əlaçı (A) hədəfini yüklə"
            >
              <Award size={13} />
              <span>91+ Əlaçı Hədəfi</span>
            </button>
            <button
              type="button"
              onClick={resetAbsencesOnly}
              className="calc-preset-btn"
              title="Bütün qaibləri sıfırla"
            >
              <RotateCcw size={13} />
              <span>Qaibləri Sıfırla</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="calc-kpi-grid">
          <div
            className={`calc-kpi-card ${
              summary.failedByAbsenceCount > 0
                ? 'status-danger'
                : summary.weightedGpa >= 81
                ? 'status-good'
                : 'status-warn'
            }`}
          >
            <span className="calc-kpi-label">Çəkili Semestr GPA (30 Kredit)</span>
            <span className="calc-kpi-value">{summary.weightedGpa.toFixed(2)}</span>
            <span className="calc-kpi-sub">{summary.scholarshipStatus}</span>
          </div>

          <div className="calc-kpi-card">
            <span className="calc-kpi-label">Orta Giriş Balı (Max 50)</span>
            <span className="calc-kpi-value">{summary.averageEntryScore} / 50</span>
            <span className="calc-kpi-sub">6 fənnin imtahanöncəsi ortalaması</span>
          </div>

          <div
            className={`calc-kpi-card ${
              summary.failedByAbsenceCount > 0
                ? 'status-danger'
                : summary.dangerCoursesCount > 0
                ? 'status-warn'
                : 'status-good'
            }`}
          >
            <span className="calc-kpi-label">Ümumi Qaib Statusu</span>
            <span className="calc-kpi-value">
              {summary.totalAbsences} dərs ({summary.totalAbsences * 2} s.)
            </span>
            <span className="calc-kpi-sub">
              {summary.failedByAbsenceCount > 0
                ? `${summary.failedByAbsenceCount} fəndən limit aşılıb!`
                : summary.dangerCoursesCount > 0
                ? `${summary.dangerCoursesCount} fənn limit sərhədindədir`
                : 'Bütün fənlərdə təhlükəsiz zona'}
            </span>
          </div>

          <div className="calc-kpi-card">
            <span className="calc-kpi-label">Strateji baza (16 Kredit)</span>
            <span className="calc-kpi-value">53.3%</span>
            <span className="calc-kpi-sub">Proqramlaşdırma (8) + ADİAK (4) + XDİAK (4)</span>
          </div>
        </div>
      </div>

      {/* 2. Quick 10-Point Colloquium & Seminar Converter */}
      <div className="calc-converter-bar">
        <div className="calc-conv-left">
          <span className="calc-conv-title">
            Kollokvium və Seminar Çeviricisi (10 ballıq şkaladan → 30 və 20 bala)
          </span>
          <span className="calc-conv-desc">
            KOICA/LMS-dəki 10 ballıq qiymətlərinizi yazın, Forma-1 (30 bal) və Forma-2 (20 bal) qarşılığını dərhal görün:
          </span>
        </div>

        <div className="calc-conv-inputs">
          <label className="calc-conv-field">
            <span>I Kol:</span>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={kol1}
              onChange={(e) => setKol1(Number(e.target.value))}
            />
          </label>
          <label className="calc-conv-field">
            <span>II Kol:</span>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={kol2}
              onChange={(e) => setKol2(Number(e.target.value))}
            />
          </label>
          <label className="calc-conv-field">
            <span>III Kol:</span>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={kol3}
              onChange={(e) => setKol3(Number(e.target.value))}
            />
          </label>
          <label className="calc-conv-field">
            <span>Seminar:</span>
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={semAvg}
              onChange={(e) => setSemAvg(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="calc-conv-results">
          <span className="calc-conv-badge">
            Forma-1: {forma1Result} / 30 bal
          </span>
          <span className="calc-conv-badge">
            Forma-2: {forma2Result} / 20 bal
          </span>
        </div>
      </div>

      {/* 3. 6 Official Courses Grid */}
      <div className="calc-courses-grid">
        {AZTU_6326A2_COURSES.map((course) => {
          const rec = records[course.id] || getDefaultRecords()[course.id];
          const metrics = computeCourseMetrics(course, rec);
          const maxSem = course.form === 'Forma-1' ? 30 : 20;
          const barWidth = Math.min(
            100,
            Math.round((rec.absences / Math.max(1, metrics.maxAbsences)) * 100)
          );

          return (
            <div
              key={course.id}
              className={`calc-course-card ${
                metrics.isLimitExceeded
                  ? 'is-danger'
                  : metrics.isDangerZone
                  ? 'is-warn'
                  : ''
              }`}
            >
              {/* Header */}
              <div className="calc-course-header">
                <div>
                  <div className="calc-course-meta-top">
                    <span className="calc-code-tag">{course.code}</span>
                    <span className="calc-credit-tag">
                      {course.credits} Kredit ({course.gpaWeightPercent}%)
                    </span>
                    <span className="calc-form-tag">{course.form}</span>
                  </div>
                  <h3 className="calc-course-name">{course.name}</h3>
                  <p className="calc-course-lecturer">{course.lecturer}</p>
                </div>

                <div className={`calc-grade-badge grade-${metrics.letterGrade}`}>
                  <span className="calc-grade-score">{metrics.totalScore} bal</span>
                  <span className="calc-grade-letter">{metrics.gradeLabel}</span>
                </div>
              </div>

              {course.warningNote && (
                <div className="calc-course-note">{course.warningNote}</div>
              )}

              {/* Absence Tracker */}
              <div className="calc-absence-box">
                <div className="calc-absence-top">
                  <div className="calc-absence-info">
                    <span className="calc-absence-title">
                      Qaib İzləyicisi (Limit: max {metrics.maxAbsences} dərs / {metrics.maxAbsences * 2} saat)
                    </span>
                    <span className="calc-absence-sub">
                      Cəmi {rec.totalHours} saat ({metrics.totalClasses} dərs cütü) · 25% kəsilmə həddi
                    </span>
                  </div>

                  <div className="calc-absence-controls">
                    <select
                      className="calc-hours-select"
                      value={rec.totalHours}
                      onChange={(e) =>
                        updateRecord(course.id, { totalHours: Number(e.target.value) })
                      }
                      title="Fənnin ümumi saatı"
                    >
                      <option value={30}>30 saat</option>
                      <option value={45}>45 saat</option>
                      <option value={60}>60 saat</option>
                      <option value={75}>75 saat</option>
                      <option value={90}>90 saat</option>
                    </select>

                    <div className="calc-stepper">
                      <button
                        type="button"
                        className="calc-step-btn"
                        disabled={rec.absences <= 0}
                        onClick={() =>
                          updateRecord(course.id, {
                            absences: Math.max(0, rec.absences - 1),
                          })
                        }
                        aria-label="Qaibi azalt"
                      >
                        −
                      </button>
                      <span className="calc-step-val">{rec.absences} qaib</span>
                      <button
                        type="button"
                        className="calc-step-btn"
                        onClick={() =>
                          updateRecord(course.id, { absences: rec.absences + 1 })
                        }
                        aria-label="Qaib əlavə et"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="calc-absence-bar-bg">
                  <div
                    className={`calc-absence-bar-fill ${
                      metrics.isLimitExceeded
                        ? 'is-danger'
                        : metrics.isDangerZone
                        ? 'is-warn'
                        : ''
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <div className="calc-absence-status-row">
                  {metrics.isLimitExceeded ? (
                    <span className="calc-status-danger">
                      <AlertTriangle size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Qaib limiti aşılıb! İmtahana buraxılmır ({rec.absences * 2} saat buraxılıb)
                    </span>
                  ) : metrics.isDangerZone ? (
                    <span className="calc-status-warn">
                      Diqqət: Cəmi {metrics.remainingAbsences} dərs ({metrics.remainingAbsences * 2} saat) qaib haqqın qalıb!
                    </span>
                  ) : (
                    <span className="calc-status-ok">
                      <CheckCircle2 size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {metrics.remainingAbsences} dərs ({metrics.remainingAbsences * 2} saat) qaib haqqın qalıb
                    </span>
                  )}

                  <span>Davamiyyət balı: {metrics.attendanceScore} / 10</span>
                </div>
              </div>

              {/* Pre-Exam & Exam Score Inputs */}
              <div className="calc-inputs-grid">
                <div className="calc-input-item">
                  <div className="calc-input-top">
                    <span>Seminar + Kollokvium</span>
                    <span className="calc-input-max">max {maxSem}</span>
                  </div>
                  <div className="calc-input-row">
                    <input
                      type="range"
                      min={0}
                      max={maxSem}
                      step={0.5}
                      value={rec.seminarScore}
                      onChange={(e) =>
                        updateRecord(course.id, { seminarScore: Number(e.target.value) })
                      }
                    />
                    <input
                      type="number"
                      className="calc-num-input"
                      min={0}
                      max={maxSem}
                      step={0.5}
                      value={rec.seminarScore}
                      onChange={(e) =>
                        updateRecord(course.id, { seminarScore: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>

                {course.form === 'Forma-2' && (
                  <div className="calc-input-item">
                    <div className="calc-input-top">
                      <span>Laboratoriya işi</span>
                      <span className="calc-input-max">max 10</span>
                    </div>
                    <div className="calc-input-row">
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.5}
                        value={rec.labScore}
                        onChange={(e) =>
                          updateRecord(course.id, { labScore: Number(e.target.value) })
                        }
                      />
                      <input
                        type="number"
                        className="calc-num-input"
                        min={0}
                        max={10}
                        step={0.5}
                        value={rec.labScore}
                        onChange={(e) =>
                          updateRecord(course.id, { labScore: Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="calc-input-item">
                  <div className="calc-input-top">
                    <span>Sərbəst iş</span>
                    <span className="calc-input-max">max 10</span>
                  </div>
                  <div className="calc-input-row">
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={rec.independentScore}
                      onChange={(e) =>
                        updateRecord(course.id, {
                          independentScore: Number(e.target.value),
                        })
                      }
                    />
                    <input
                      type="number"
                      className="calc-num-input"
                      min={0}
                      max={10}
                      step={0.5}
                      value={rec.independentScore}
                      onChange={(e) =>
                        updateRecord(course.id, {
                          independentScore: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="calc-input-item">
                  <div className="calc-input-top">
                    <span>Gözlənilən İmtahan</span>
                    <span className="calc-input-max">max 50 (min 17)</span>
                  </div>
                  <div className="calc-input-row">
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={1}
                      value={rec.expectedExamScore}
                      onChange={(e) =>
                        updateRecord(course.id, {
                          expectedExamScore: Number(e.target.value),
                        })
                      }
                    />
                    <input
                      type="number"
                      className="calc-num-input"
                      min={0}
                      max={50}
                      step={1}
                      value={rec.expectedExamScore}
                      onChange={(e) =>
                        updateRecord(course.id, {
                          expectedExamScore: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Footer: Entry Score & Needed Exam Points */}
              <div className="calc-needed-footer">
                <div className="calc-entry-summary-row">
                  <span>İmtahan Giriş Balı: {metrics.entryScore} / 50 bal</span>
                  <span>
                    Yekun: {metrics.entryScore} + {rec.expectedExamScore} = {metrics.totalScore}
                  </span>
                </div>

                <div className="calc-needed-pills">
                  <div className="calc-target-pill">
                    <span className="calc-target-name">51 (Keçid E)</span>
                    <span className="calc-target-val">
                      {metrics.neededFor51 !== null ? `${metrics.neededFor51} bal` : '—'}
                    </span>
                  </div>
                  <div className="calc-target-pill">
                    <span className="calc-target-name">71 (Təqaüd C)</span>
                    <span className="calc-target-val">
                      {metrics.neededFor71 !== null ? `${metrics.neededFor71} bal` : 'Mümkün deyil'}
                    </span>
                  </div>
                  <div className="calc-target-pill">
                    <span className="calc-target-name">81 (Yüksək B)</span>
                    <span className="calc-target-val">
                      {metrics.neededFor81 !== null ? `${metrics.neededFor81} bal` : 'Mümkün deyil'}
                    </span>
                  </div>
                  <div className="calc-target-pill">
                    <span className="calc-target-name">91 (Əlaçı A)</span>
                    <span className="calc-target-val">
                      {metrics.neededFor91 !== null ? `${metrics.neededFor91} bal` : 'Mümkün deyil'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
