import React, { useState, useEffect } from 'react';
import './DashboardView.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { computeDeadlineStatus, formatAzDate } from '../../services/db';
import {
  Calendar,
  FileText,
  Link2,
  Download,
  Calculator,
  BookOpen,
  ArrowRight,
  Plus,
  Terminal,
  ExternalLink,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SEMESTER_CONFIG, WEEKLY_SCHEDULE } from '../../data/mockData';
import {
  AZTU_6326A2_COURSES,
  type StudentCourseRecord,
  getDefaultRecords,
  loadStudentRecords,
  saveStudentRecords,
  computeCourseMetrics,
  computeSemesterSummary,
} from '../../services/academicTracker';
import { CreateDeadlineModal } from './modals/CreateDeadlineModal';
import { CreateMaterialModal } from './modals/CreateMaterialModal';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const {
    courses,
    deadlines,
    materials,
    toggleDeadline,
    downloadMaterialFile,
  } = useDatabase();

  // Modals state
  const [modalType, setModalType] = useState<'deadline' | 'material' | null>(null);

  // Live Qaib & GPA tracker records
  const [records, setRecords] = useState<Record<string, StudentCourseRecord>>(() =>
    loadStudentRecords(user?.id)
  );

  useEffect(() => {
    setRecords(loadStudentRecords(user?.id));
  }, [user?.id]);

  const adjustAbsence = (courseId: string, delta: number) => {
    setRecords((prev) => {
      const current = prev[courseId] || getDefaultRecords()[courseId];
      const nextAbs = Math.max(0, current.absences + delta);
      const next = {
        ...prev,
        [courseId]: {
          ...current,
          absences: nextAbs,
        },
      };
      saveStudentRecords(next, user?.id);
      return next;
    });
  };

  const gpaSummary = computeSemesterSummary(records);

  // Timetable selected day (defaults to today: 2 = Çərşənbə axşamı)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(SEMESTER_CONFIG.todayDayIndex);

  const weekDays = [
    { index: 1, name: 'B.e.', fullName: 'Bazar ertəsi' },
    { index: 2, name: 'Ç.a.', fullName: 'Çərşənbə axşamı', isToday: true },
    { index: 3, name: 'Çərş.', fullName: 'Çərşənbə' },
    { index: 4, name: 'C.a.', fullName: 'Cümə axşamı' },
    { index: 5, name: 'Cümə', fullName: 'Cümə' },
  ];

  const filteredSchedule = WEEKLY_SCHEDULE.filter((s) => s.dayIndex === selectedDayIndex);
  const currentProgressPercent = Math.round(
    (SEMESTER_CONFIG.currentWeek / SEMESTER_CONFIG.totalWeeks) * 100
  );

  // Top 3 upcoming non-completed deadlines (sorted by nearest dueDate)
  const activeDeadlines = [...deadlines]
    .filter((d) => !d.isCompleted)
    .sort(
      (a, b) =>
        new Date(`${a.dueDate}T${a.dueTime || '23:59'}`).getTime() -
        new Date(`${b.dueDate}T${b.dueTime || '23:59'}`).getTime()
    )
    .slice(0, 4);

  // Latest 4 materials
  const recentMaterials = [...materials]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="dashboard-content-flow">
      {/* 1. Welcome Greeting Header */}
      <div className="dashboard-welcome-header">
        <div>
          <h2 className="welcome-headline">Xoş gəldin, {user?.firstName || 'Tələbə'}</h2>
          <p className="welcome-subline">6326A2 · Kompüter Mühəndisliyi · Payız Semestri (30 ECTS)</p>
        </div>

        <div className="welcome-actions-row">
          <button
            type="button"
            onClick={() => navigate('/app/calculator')}
            className="btn-dash-primary"
          >
            <Calculator size={14} />
            <span>Qaib və Bal Hesabla</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/app/sandbox')}
            className="btn-dash-secondary"
          >
            <Terminal size={14} />
            <span>Python Sandbox</span>
          </button>
        </div>
      </div>

      {/* 2. Semestr İrəliləyişi və İmtahan Hədəfi */}
      <div className="dash-semester-card">
        <div className="dash-sem-top">
          <div className="dash-sem-info">
            <div className="dash-sem-badge-row">
              <span className="dash-sem-badge">
                <Sparkles size={12} />
                I Semestr (2026/2027)
              </span>
              <span className="dash-sem-date-note">
                15 Sentyabr başlayıb ·{' '}
                <strong>{SEMESTER_CONFIG.currentWeek}-ci Həftə, 2-ci Gün (Çərşənbə axşamı)</strong>
              </span>
            </div>
            <h3 className="dash-sem-title">Semestr İrəliləyişi və İmtahan Hədəfi</h3>
          </div>
          <div className="dash-sem-countdown-pill">
            <Clock size={14} />
            <span>
              İmtahanlara <strong>{SEMESTER_CONFIG.daysToExam} gün</strong> qaldı
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="dash-sem-progress-wrap">
          <div className="dash-sem-progress-bar-bg">
            <div
              className="dash-sem-progress-bar-fill"
              style={{ width: `${currentProgressPercent}%` }}
            />
          </div>
          <div className="dash-sem-progress-labels">
            <span>Həftə 1 (15 Sent)</span>
            <span className="dash-sem-current-step">
              Hazırda: Həftə {SEMESTER_CONFIG.currentWeek} ({currentProgressPercent}%)
            </span>
            <span>Həftə 15 (26 Dek) · İmtahan: 5 Yanvar</span>
          </div>
        </div>

        {/* 4 Milestones */}
        <div className="dash-sem-milestones-grid">
          <div className="dash-sem-milestone-card active">
            <div className="dash-milestone-header">
              <span className="milestone-status-dot pulse" />
              <span className="milestone-tag">Cari Mərhələ</span>
            </div>
            <h4 className="milestone-name">2-ci Həftə Tədrisi</h4>
            <p className="milestone-detail">Mühazirə və laboratoriya dərsləri davam edir.</p>
            <span className="milestone-timeline">15 - 26 Sentyabr</span>
          </div>

          <div className="dash-sem-milestone-card">
            <div className="dash-milestone-header">
              <span className="milestone-status-dot upcoming" />
              <span className="milestone-tag">6-cı Həftə</span>
            </div>
            <h4 className="milestone-name">I Kollokvium</h4>
            <p className="milestone-detail">Bütün fənlər üzrə 1–5-ci mövzuların qiymətləndirilməsi.</p>
            <span className="milestone-timeline">{SEMESTER_CONFIG.colloquium1Date}</span>
          </div>

          <div className="dash-sem-milestone-card">
            <div className="dash-milestone-header">
              <span className="milestone-status-dot upcoming" />
              <span className="milestone-tag">11-ci Həftə</span>
            </div>
            <h4 className="milestone-name">II Kollokvium</h4>
            <p className="milestone-detail">6–10-cu mövzular üzrə aralıq yoxlama.</p>
            <span className="milestone-timeline">{SEMESTER_CONFIG.colloquium2Date}</span>
          </div>

          <div className="dash-sem-milestone-card">
            <div className="dash-milestone-header">
              <span className="milestone-status-dot exam" />
              <span className="milestone-tag">14-cü Həftə & İmtahan</span>
            </div>
            <h4 className="milestone-name">III Kol. & Qış İmtahanı</h4>
            <p className="milestone-detail">11–15-ci mövzular, giriş balları və sessiya.</p>
            <span className="milestone-timeline">15 Dek – 31 Yanvar</span>
          </div>
        </div>
      </div>

      {/* 3. Həftəlik Rəsmi Dərs Cədvəli (Auditoriyalar və Dərslər) */}
      <div className="dash-schedule-section">
        <div className="dash-schedule-header">
          <div>
            <div className="dash-schedule-badge-row">
              <span className="dash-schedule-badge">AzTU 6326A2</span>
              <span className="dash-schedule-sub">Rəsmi Dərs Cədvəli</span>
            </div>
            <h3 className="dash-section-heading">Həftəlik Dərs Cədvəli və Auditoriyalar</h3>
          </div>

          {/* Days Tabs */}
          <div className="dash-schedule-days-tabs">
            {weekDays.map((d) => (
              <button
                key={d.index}
                type="button"
                className={`dash-day-tab ${selectedDayIndex === d.index ? 'is-active' : ''}`}
                onClick={() => setSelectedDayIndex(d.index)}
              >
                <span>{d.name}</span>
                {d.isToday && <span className="dash-today-pill">Bugün</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Timetable List */}
        <div className="dash-schedule-cards-list">
          {filteredSchedule.length === 0 ? (
            <div className="dash-schedule-empty">
              <p>Bu gün üçün cədvəldə dərs yoxdur (Sərbəst hazırlıq günü).</p>
            </div>
          ) : (
            filteredSchedule.map((item) => {
              const matchedCourse = courses.find(
                (c) => c.id === item.courseId || c.slug === item.courseId
              );
              return (
                <div key={item.id} className="dash-schedule-card">
                  <div className="dash-sched-time-col">
                    <Clock size={13} className="dash-sched-clock-icon" />
                    <span className="dash-sched-time">{item.time}</span>
                  </div>

                  <div className="dash-sched-type-badge-col">
                    <span className={`dash-lesson-type-badge ${item.typeCode}`}>
                      {item.typeCode}
                    </span>
                    <span className="dash-lesson-type-name">{item.type}</span>
                  </div>

                  <div className="dash-sched-main-col">
                    <div className="dash-sched-title-row">
                      <h4 className="dash-sched-subject">{item.subject}</h4>
                      {item.subgroup && (
                        <span className="dash-subgroup-pill">{item.subgroup}</span>
                      )}
                    </div>
                    <div className="dash-sched-teacher-row">
                      <span className="dash-sched-teacher">{item.lecturer}</span>
                    </div>
                  </div>

                  <div className="dash-sched-room-col">
                    <div className="dash-room-badge">
                      <MapPin size={12} />
                      <span>Aud. {item.room}</span>
                    </div>
                    {matchedCourse && (
                      <button
                        type="button"
                        onClick={() => navigate(`/app/courses/${matchedCourse.slug}`)}
                        className="dash-sched-goto-btn"
                        title="Fənnə keç"
                      >
                        <span>Dərsə keç</span>
                        <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. Academic Courses Grid (6 Fənn · 30 ECTS) */}
      <div className="dash-courses-section">
        <div className="dash-section-meta-row">
          <h3 className="dash-section-heading">Fənlər və Tədris Sahələri (Tam 30 ECTS)</h3>
          <span className="dash-heading-link" onClick={() => navigate('/app/calculator')}>
            Qaib və GPA hesabla →
          </span>
        </div>

        <div className="dash-courses-grid">
          {courses.map((c) => {
            const courseMaterials = materials.filter((m) => m.courseId === c.id);
            const courseDeadlines = deadlines.filter((d) => d.courseId === c.id);

            return (
              <div
                key={c.id}
                className="dash-course-card"
                onClick={() => navigate(`/app/courses/${c.slug}`)}
              >
                <div className="course-card-top-row">
                  <span className="course-code-pill">{c.code}</span>
                  <span className="course-credits-pill">{c.credits} Kredit</span>
                </div>

                <div className="course-card-center">
                  <h4 className="course-title-text">{c.name}</h4>
                  <p className="course-lecturer-text">{c.lecturer}</p>
                </div>

                <div className="course-card-bottom-stats">
                  <span>{courseMaterials.length} material</span>
                  <span className="stat-dot">•</span>
                  <span>{courseDeadlines.length} tapşırıq</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bento Grid: Always-Full 6326A2 Single-Player Tools & Academic Feed */}
      <div className="dash-bento-grid">
        {/* Left Column: Live Qaib & GPA Tracker + Deadlines */}
        <div className="bento-column">
          {/* Card 1: 6326A2 Qaib Limit və GPA İzləyicisi */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <Calculator size={15} color="#0f172a" />
                <h3 className="bento-card-title">6326A2 Qaib Limit və GPA İzləyicisi</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/calculator')}
                className="bento-view-all-link"
              >
                <span>Tam Kalkulyator</span>
                <ArrowRight size={11} />
              </button>
            </div>

            <div className="bento-qaib-summary-bar">
              <div className="bento-qaib-stat">
                <span className="bento-qaib-stat-label">Çəkili GPA (30 kr)</span>
                <span
                  className={`bento-qaib-stat-val ${
                    gpaSummary.failedByAbsenceCount > 0 ? 'is-danger' : 'is-good'
                  }`}
                >
                  {gpaSummary.weightedGpa.toFixed(2)} GPA
                </span>
              </div>
              <div className="bento-qaib-stat">
                <span className="bento-qaib-stat-label">Orta Giriş Balı</span>
                <span className="bento-qaib-stat-val">{gpaSummary.averageEntryScore} / 50</span>
              </div>
              <div className="bento-qaib-stat">
                <span className="bento-qaib-stat-label">Cəmi Qaib</span>
                <span
                  className={`bento-qaib-stat-val ${
                    gpaSummary.failedByAbsenceCount > 0 ? 'is-danger' : ''
                  }`}
                >
                  {gpaSummary.totalAbsences} dərs ({gpaSummary.totalAbsences * 2} s.)
                </span>
              </div>
            </div>

            <div className="bento-qaib-list">
              {AZTU_6326A2_COURSES.map((c) => {
                const rec = records[c.id] || getDefaultRecords()[c.id];
                const m = computeCourseMetrics(c, rec);
                return (
                  <div key={c.id} className="bento-qaib-row">
                    <div className="bento-qaib-course-info">
                      <span className="bento-qaib-course-name">
                        {c.shortName} ({c.credits} kr · {c.totalHours} saat)
                      </span>
                      <span
                        className={`bento-qaib-course-sub ${
                          m.isLimitExceeded
                            ? 'is-danger'
                            : m.isDangerZone
                            ? 'is-warn'
                            : ''
                        }`}
                      >
                        {m.isLimitExceeded
                          ? `Limit aşılıb! (Max ${m.maxAbsences} qaib / ${m.maxAbsences * 2} s.)`
                          : `${m.remainingAbsences} qaib haqqı qalıb (Limit: ${m.maxAbsences}) · Giriş: ${m.entryScore}`}
                      </span>
                    </div>

                    <div className="bento-qaib-controls">
                      <button
                        type="button"
                        className="bento-qaib-btn"
                        disabled={rec.absences <= 0}
                        onClick={() => adjustAbsence(c.id, -1)}
                        aria-label="Qaib azalt"
                      >
                        −
                      </button>
                      <span className="bento-qaib-count">{rec.absences} qaib</span>
                      <button
                        type="button"
                        className="bento-qaib-btn"
                        onClick={() => adjustAbsence(c.id, 1)}
                        aria-label="Qaib artır"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Yaxınlaşan Deadline-lar */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <Calendar size={15} color="#0f172a" />
                <h3 className="bento-card-title">Yaxınlaşan Kollokvium və Tapşırıqlar</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/deadlines')}
                className="bento-view-all-link"
              >
                <span>Hamısı ({deadlines.length})</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {activeDeadlines.length === 0 ? (
              <div className="bento-compact-empty">
                <p>Yaxınlaşan aktiv tapşırıq yoxdur.</p>
                <button
                  type="button"
                  onClick={() => setModalType('deadline')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Tapşırıq əlavə et</span>
                </button>
              </div>
            ) : (
              <div className="bento-items-list">
                {activeDeadlines.map((dl) => {
                  const course = courses.find((c) => c.id === dl.courseId);
                  const status = computeDeadlineStatus(dl.dueDate, dl.dueTime);

                  return (
                    <div key={dl.id} className="bento-deadline-row">
                      <button
                        type="button"
                        onClick={() => toggleDeadline(dl.id)}
                        className={`bento-check-btn ${dl.isCompleted ? 'checked' : ''}`}
                        title="Tamamlandı kimi işarələ"
                      />
                      <div className="bento-row-main">
                        <div className="bento-row-tags">
                          <span className="bento-subject-badge">
                            {course?.name || dl.courseId}
                          </span>
                          <span className="bento-date-badge">
                            {formatAzDate(dl.dueDate, 'short')}
                          </span>
                        </div>
                        <span className="bento-row-name">{dl.title}</span>
                      </div>
                      <div className="bento-row-status">
                        <span
                          className={`bento-urgency-pill ${
                            status.isUrgent || status.isOverdue ? 'is-urgent' : ''
                          }`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Labs & Materials */}
        <div className="bento-column">
          {/* Card 3: İnteraktiv Laboratoriyalar və Dərs Bələdçiləri */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <Terminal size={15} color="#0f172a" />
                <h3 className="bento-card-title">İnteraktiv Laboratoriya və Hazırlıq Mərkəzi</h3>
              </div>
            </div>

            <div className="bento-lab-list">
              <div
                className="bento-lab-item"
                onClick={() => navigate('/app/sandbox')}
              >
                <div className="bento-lab-main">
                  <span className="bento-lab-title">
                    İf-61125y · Python 3.12 + Pandas Brauzer Sandbox-u
                  </span>
                  <span className="bento-lab-desc">
                    Müəl. Ayxan Həsənov və Müəl. Şəbnəm İsgəndərlinin dərsləri üzrə hazır seminar və laboratoriya şablonları.
                  </span>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </div>

              <div
                className="bento-lab-item"
                onClick={() => navigate('/app/courses/math-analysis')}
              >
                <div className="bento-lab-main">
                  <span className="bento-lab-title">
                    İf-61115y · Riyazi Analiz Mühazirələr, Test və ε-Ətrafı Lab
                  </span>
                  <span className="bento-lab-desc">
                    Çoxluqlar, həqiqi ədədlər, supremum/infimum simulyatoru, özünü yoxlama testləri və AI köməkçi.
                  </span>
                </div>
                <ArrowRight size={14} color="#64748b" />
              </div>

              <div
                className="bento-lab-item"
                onClick={() => navigate('/app/courses/physics')}
              >
                <div className="bento-lab-main">
                  <span className="bento-lab-title">
                    İf-20403y · Fizika 8 Mühazirə + 7 Laboratoriya PDF Bələdçisi
                  </span>
                  <span className="bento-lab-desc">
                    Dos. Sürəyya Məmmədovanın təqdimatları, laboratoriya hesablamaları və daxili PDF oxuyucu.
                  </span>
                </div>
                <BookOpen size={14} color="#64748b" />
              </div>
            </div>
          </div>

          {/* Card 4: Son Materiallar */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <FileText size={15} color="#0f172a" />
                <h3 className="bento-card-title">Akademik Materiallar və Dərsliklər</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/materials')}
                className="bento-view-all-link"
              >
                <span>Bütün resurslar ({materials.length})</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {recentMaterials.length === 0 ? (
              <div className="bento-compact-empty">
                <p>Hələ əlavə fayl yüklənməyib.</p>
                <button
                  type="button"
                  onClick={() => setModalType('material')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Fayl yüklə</span>
                </button>
              </div>
            ) : (
              <div className="bento-items-list">
                {recentMaterials.map((mat) => {
                  const course = courses.find((c) => c.id === mat.courseId);
                  return (
                    <div key={mat.id} className="bento-material-row">
                      <div
                        className={`bento-mat-icon ${
                          mat.type === 'file' ? 'is-file' : 'is-link'
                        }`}
                      >
                        {mat.type === 'file' ? <FileText size={13} /> : <Link2 size={13} />}
                      </div>
                      <div className="bento-row-main">
                        <span className="bento-row-name">{mat.title}</span>
                        <span className="bento-mat-sub">
                          {course?.name} · {mat.authorName}
                        </span>
                      </div>
                      {mat.type === 'file' ? (
                        <button
                          type="button"
                          onClick={() => downloadMaterialFile(mat)}
                          className="bento-mat-action-btn"
                          title="Faylı yüklə"
                        >
                          <Download size={12} />
                        </button>
                      ) : (
                        <a
                          href={mat.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bento-mat-action-btn"
                          title="Keçid et"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateDeadlineModal
        isOpen={modalType === 'deadline'}
        onClose={() => setModalType(null)}
      />
      <CreateMaterialModal
        isOpen={modalType === 'material'}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
