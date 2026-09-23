import React, { useState } from 'react';
import './CourseShellView.css';
import './views/ViewsCommon.css';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import { computeDeadlineStatus } from '../../services/db';
import {
  FolderOpen,
  Clock,
  MessageSquareQuote,
  HelpCircle,
  User,
  GraduationCap,
  Layers,
  Plus,
  FileText,
  Link2,
  Download,
  Trash2,
  CheckCircle2,
  Send,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calendar,
  MapPin,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { COURSE_SYLLABUS, WEEKLY_SCHEDULE, SEMESTER_CONFIG } from '../../data/mockData';
import { CreateMaterialModal } from './modals/CreateMaterialModal';
import { CreateNoteModal } from './modals/CreateNoteModal';
import { CreateDeadlineModal } from './modals/CreateDeadlineModal';
import { CreateQuestionModal } from './modals/CreateQuestionModal';
import { MathLearningView } from './MathLearningView';
import { PhysicsLearningView } from './PhysicsLearningView';

interface CourseShellViewProps {
  courseSlug: string;
}

export const CourseShellView: React.FC<CourseShellViewProps> = ({ courseSlug }) => {
  const { 
    courses, 
    materials, 
    notes, 
    deadlines, 
    questions, 
    deleteMaterial, 
    downloadMaterialFile,
    deleteNote,
    toggleDeadline,
    deleteDeadline,
    deleteQuestion,
    createAnswer,
    toggleAcceptedAnswer,
    deleteAnswer,
    getAnswersForQuestion
  } = useDatabase();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'lessons' | 'physics-content' | 'materials' | 'notes' | 'assignments' | 'qa'>(
    courseSlug === 'math-analysis' ? 'lessons' : courseSlug === 'physics' ? 'physics-content' : 'overview',
  );
  const [modalType, setModalType] = useState<'material' | 'note' | 'deadline' | 'question' | null>(null);

  // QA expanded & answer state
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [submittingAnsId, setSubmittingAnsId] = useState<string | null>(null);

  const slugMap: Record<string, string> = {
    'math-analysis': 'math',
    'linear-algebra': 'algebra',
    physics: 'phys',
    programming: 'prog',
    english: 'eng',
    azerbaijani: 'aze',
  };

  const targetId = slugMap[courseSlug] || courseSlug;
  const course = courses.find((c) => c.id === targetId || c.slug === courseSlug) || courses[0];

  if (!course) {
    return (
      <div className="course-shell-flow">
        <div className="honest-empty-state">
          <p>Fənn tapılmadı.</p>
        </div>
      </div>
    );
  }

  // Filtered items for this specific course
  const courseMaterials = materials.filter((m) => m.courseId === course.id);
  const courseNotes = notes.filter((n) => n.courseId === course.id);
  const courseDeadlines = deadlines.filter((d) => d.courseId === course.id);
  const courseQuestions = questions.filter((q) => q.courseId === course.id);
  const courseSchedule = WEEKLY_SCHEDULE.filter(s => s.courseId === targetId || s.courseId === course.id);
  const courseSyllabus = COURSE_SYLLABUS[targetId] || COURSE_SYLLABUS[course.id] || [];

  const tabs = [
    ...(course.id === 'math' ? [{ id: 'lessons', label: 'Dərslər', icon: BookOpen }] : []),
    ...(course.id === 'phys' ? [{ id: 'physics-content', label: 'Mövzular və lablar', icon: BookOpen }] : []),
    { id: 'overview', label: course.id === 'math' || course.id === 'phys' ? 'Fənn haqqında' : 'Ümumi', icon: Layers },
    ...(course.id === 'math' || course.id === 'phys' ? [] : [{ id: 'syllabus', label: '15 Həftəlik Plan', icon: BookOpen }]),
    { id: 'materials', label: `Materiallar (${courseMaterials.length})`, icon: FolderOpen },
    { id: 'notes', label: `Qrup qeydləri (${courseNotes.length})`, icon: MessageSquareQuote },
    { id: 'assignments', label: `Tapşırıqlar (${courseDeadlines.length})`, icon: Clock },
    { id: 'qa', label: `Sual-Cavab (${courseQuestions.length})`, icon: HelpCircle },
  ] as const;

  const handleToggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddAnswer = async (qId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = (answerInputs[qId] || '').trim();
    if (!text) return;

    try {
      setSubmittingAnsId(qId);
      const result = await createAnswer(qId, text);
      if (!result.success) throw new Error(result.error || 'Cavab göndərilə bilmədi.');
      setAnswerInputs(prev => ({ ...prev, [qId]: '' }));
      setExpandedQuestions(prev => ({ ...prev, [qId]: true }));
    } catch (err: any) {
      alert(err.message || 'Xəta baş verdi');
    } finally {
      setSubmittingAnsId(null);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'teacher_said': return 'Müəllim dedi';
      case 'exam_colloquium': return 'İmtahan/Kollokvium';
      case 'seminar': return 'Seminar';
      default: return 'Ümumi';
    }
  };

  return (
    <div className="course-shell-flow">
      {/* Course Header */}
      <div className="course-header-card">
        <div className="course-meta-top">
          <span className="course-code-badge">{course.code}</span>
          <span className="course-credits-badge">{course.credits} Kredit</span>
          <span className="course-group-tag">6326A2 Qrupu</span>
        </div>

        <h2 className="course-main-title">{course.name}</h2>

        <div className="course-instructor-row">
          <div className="instructor-item">
            <User size={13} className="instructor-icon" />
            <span>{course.lecturer}</span>
          </div>
          <span className="sep">•</span>
          <div className="instructor-item">
            <GraduationCap size={13} className="instructor-icon" />
            <span>{course.department}</span>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="course-subtabs-bar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`course-subtab-btn ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          TAB 1: ÜMUMİ (OVERVIEW)
          ======================================================== */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Metrics Bar */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '0.75rem' 
          }}>
            <div 
              className="dash-poll-box" 
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('materials')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Materiallar</span>
                <FolderOpen size={14} color="var(--text-muted)" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{courseMaterials.length}</span>
            </div>

            <div 
              className="dash-poll-box" 
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('notes')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Qrup qeydləri</span>
                <MessageSquareQuote size={14} color="var(--text-muted)" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{courseNotes.length}</span>
            </div>

            <div 
              className="dash-poll-box" 
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('assignments')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Tapşırıqlar</span>
                <Clock size={14} color="var(--text-muted)" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{courseDeadlines.length}</span>
            </div>

            <div 
              className="dash-poll-box" 
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTab('qa')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Suallar</span>
                <HelpCircle size={14} color="var(--text-muted)" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{courseQuestions.length}</span>
            </div>
          </div>

          {/* Fənn Dərs Cədvəli və Auditoriyalar */}
          <div className="view-table-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} color="var(--text-muted)" />
                <span style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                  Rəsmi Dərs Cədvəli & Auditoriyalar
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>6326A2 Qrupu</span>
            </div>

            {courseSchedule.length === 0 ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Bu fənn üçün təyin edilmiş dərs cədvəli tapılmadı.
              </div>
            ) : (
              <div className="course-schedule-grid">
                {courseSchedule.map((cs) => (
                  <div key={cs.id} className="course-schedule-slot-card">
                    <div className="slot-day-time">
                      <span className="slot-day-name">{cs.day}</span>
                      <span className="slot-time-text">{cs.time}</span>
                    </div>
                    <div className="slot-type-lecturer">
                      <div className="slot-type-row">
                        <span className={`dash-lesson-type-badge ${cs.typeCode}`}>{cs.typeCode}</span>
                        <span className="slot-type-name">{cs.type}</span>
                        {cs.subgroup && <span className="dash-subgroup-pill">{cs.subgroup}</span>}
                      </div>
                      <span className="slot-lecturer-name">{cs.lecturer}</span>
                    </div>
                    <div className="slot-room-badge">
                      <MapPin size={12} />
                      <span>Aud. {cs.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Yalnız proqramı məlum olan fənlərdə həftəlik planı göstər. */}
          {course.id !== 'math' && course.id !== 'phys' && <div className="view-table-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={14} color="var(--text-muted)" />
                <span style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                  15 Həftəlik Tədris Planı (Cari: 2-ci Həftə)
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveTab('syllabus')}
                className="row-action-btn"
              >
                <span>Bütün 15 həftəyə bax</span>
                <ArrowRight size={11} />
              </button>
            </div>

            <div className="course-syllabus-list">
              {courseSyllabus.slice(0, 4).map((week) => {
                const isCompleted = week.status === 'completed';
                const isInProgress = week.status === 'in_progress';
                const isColloquium = week.type === 'colloquium';

                return (
                  <div 
                    key={week.week} 
                    className={`syllabus-week-row ${isInProgress ? 'is-current' : ''}`}
                  >
                    <div className="syllabus-week-meta">
                      <span className="syllabus-week-num">{week.week}-ci həftə</span>
                      <span className="syllabus-week-dates">{week.dates}</span>
                    </div>

                    <div className="syllabus-week-content">
                      <div className="syllabus-week-title-row">
                        <span className="syllabus-week-title">{week.title}</span>
                        {isCompleted && <span className="syllabus-status-pill completed">✓ Keçildi</span>}
                        {isInProgress && <span className="syllabus-status-pill current">● Cari həftə</span>}
                        {isColloquium && <span className="syllabus-status-pill colloquium">★ Kollokvium</span>}
                      </div>
                      {week.description && (
                        <p className="syllabus-week-desc">{week.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>}

          {/* Active Deadlines Section */}
          <div className="view-table-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Yaxınlaşan Tapşırıqlar
              </span>
              <button 
                className="row-action-btn"
                onClick={() => setModalType('deadline')}
              >
                <Plus size={12} />
                <span>Tapşırıq əlavə et</span>
              </button>
            </div>

            {courseDeadlines.length === 0 ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Bu fənn üzrə hələ heç bir tapşırıq əlavə edilməyib.
              </div>
            ) : (
              <div>
                {courseDeadlines.slice(0, 3).map(dl => {
                  const status = computeDeadlineStatus(dl.dueDate, dl.dueTime);
                  return (
                    <div key={dl.id} className="deadline-card-row">
                      <button
                        className={`deadline-checkbox-btn ${dl.isCompleted ? 'checked' : ''}`}
                        onClick={() => toggleDeadline(dl.id)}
                      >
                        {dl.isCompleted && <CheckCircle2 size={13} />}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 500, textDecoration: dl.isCompleted ? 'line-through' : 'none' }}>
                          {dl.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {new Date(`${dl.dueDate}T12:00:00`).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long' })}
                          {dl.dueTime ? `, ${dl.dueTime}` : ''}
                        </div>
                      </div>
                      <span className={`status-pill ${status.isOverdue ? 'status-pill-warning' : status.isUrgent ? 'status-pill-warning' : 'status-pill-neutral'}`}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Materials Section */}
          <div className="view-table-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Son Materiallar
              </span>
              <button 
                className="row-action-btn"
                onClick={() => setModalType('material')}
              >
                <Plus size={12} />
                <span>Material əlavə et</span>
              </button>
            </div>

            {courseMaterials.length === 0 ? (
              <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Bu fənn üzrə hələ material paylaşılmayıb.
              </div>
            ) : (
              <div>
                {courseMaterials.slice(0, 3).map(mat => (
                  <div key={mat.id} className="material-card-row">
                    <div className={`format-badge-box ${mat.type === 'file' ? 'is-file' : 'is-link'}`}>
                      {mat.type === 'file' ? <FileText size={15} /> : <Link2 size={15} />}
                    </div>
                    <div className="material-detail-col">
                      <span className="material-item-name">{mat.title}</span>
                      <span className="material-author-line">
                        {mat.authorName} · {new Date(mat.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    {mat.type === 'file' ? (
                      <button 
                        className="row-action-btn primary-action"
                        onClick={() => downloadMaterialFile(mat.id)}
                      >
                        <Download size={13} />
                        <span>Yüklə</span>
                      </button>
                    ) : (
                      <a 
                        href={mat.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="row-action-btn primary-action"
                      >
                        <ArrowRight size={13} />
                        <span>Aç</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: 15 HƏFTƏLİK PLAN VƏ SİLLABUS
          ======================================================== */}
      {activeTab === 'syllabus' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Syllabus Banner */}
          <div className="dash-semester-card">
            <div className="dash-sem-top">
              <div>
                <div className="dash-sem-badge-row">
                  <span className="dash-sem-badge">
                    <Sparkles size={12} />
                    {course.code} Tədris Planı
                  </span>
                  <span className="dash-sem-date-note">
                    15 Sentyabr – 26 Dekabr · <strong>Hazırda: 2-ci Həftə</strong>
                  </span>
                </div>
                <h3 className="dash-sem-title">Semestr İmtahanına Qədər Həftəlik Mövzu Bölgüsü</h3>
              </div>
              <div className="dash-sem-countdown-pill">
                <Clock size={14} />
                <span>İmtahan sessiyası: <strong>5 Yanvar 2027</strong></span>
              </div>
            </div>

            <div className="syllabus-milestones-summary">
              <div className="syllabus-milestone-box">
                <span className="milestone-box-tag">1–5-ci Mövzular</span>
                <span className="milestone-box-name">I Kollokvium</span>
                <span className="milestone-box-date">{SEMESTER_CONFIG.colloquium1Date}</span>
              </div>
              <div className="syllabus-milestone-box">
                <span className="milestone-box-tag">6–10-cu Mövzular</span>
                <span className="milestone-box-name">II Kollokvium</span>
                <span className="milestone-box-date">{SEMESTER_CONFIG.colloquium2Date}</span>
              </div>
              <div className="syllabus-milestone-box">
                <span className="milestone-box-tag">11–15-ci Mövzular</span>
                <span className="milestone-box-name">III Kol. & Yekun</span>
                <span className="milestone-box-date">{SEMESTER_CONFIG.colloquium3Date}</span>
              </div>
              <div className="syllabus-milestone-box exam">
                <span className="milestone-box-tag">Semestr İmtahanı</span>
                <span className="milestone-box-name">Qış Sessiyası</span>
                <span className="milestone-box-date">5–31 Yanvar 2027</span>
              </div>
            </div>
          </div>

          {/* All 15 Weeks List */}
          <div className="view-table-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Bütün 15 Həftənin Mövzuları və Tarixləri
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Ümumi: {courseSyllabus.length} həftəlik proqram
              </span>
            </div>

            <div className="course-syllabus-list">
              {courseSyllabus.map((week) => {
                const isCompleted = week.status === 'completed';
                const isInProgress = week.status === 'in_progress';
                const isColloquium = week.type === 'colloquium';
                const isExam = week.type === 'exam';

                return (
                  <div 
                    key={week.week} 
                    className={`syllabus-week-row ${isInProgress ? 'is-current' : ''} ${isColloquium ? 'is-colloquium' : ''} ${isExam ? 'is-exam' : ''}`}
                  >
                    <div className="syllabus-week-meta">
                      <span className="syllabus-week-num">{week.week}-ci həftə</span>
                      <span className="syllabus-week-dates">{week.dates}</span>
                    </div>

                    <div className="syllabus-week-content">
                      <div className="syllabus-week-title-row">
                        <span className="syllabus-week-title">{week.title}</span>
                        {isCompleted && <span className="syllabus-status-pill completed">✓ Keçildi</span>}
                        {isInProgress && <span className="syllabus-status-pill current">● Cari həftə</span>}
                        {isColloquium && <span className="syllabus-status-pill colloquium">★ Kollokvium</span>}
                        {isExam && <span className="syllabus-status-pill exam">🏁 İmtahan</span>}
                      </div>
                      {week.description && (
                        <p className="syllabus-week-desc">{week.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {course.id === 'math' && activeTab === 'lessons' && <MathLearningView />}
      {course.id === 'phys' && activeTab === 'physics-content' && <PhysicsLearningView />}

      {/* ========================================================
          TAB 2: MATERİALLAR
          ======================================================== */}
      {activeTab === 'materials' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button 
              className="btn-create-primary"
              onClick={() => setModalType('material')}
            >
              <Plus size={15} />
              <span>Material əlavə et</span>
            </button>
          </div>

          {courseMaterials.length === 0 ? (
            <div className="honest-empty-state">
              <div className="empty-icon-bubble">
                <FolderOpen size={24} />
              </div>
              <h3 className="empty-state-title">Hələ material paylaşılmayıb</h3>
              <p className="empty-state-lead">
                Bu fənn üzrə mühazirə slaydları, dərs vəsaitləri və ya faydalı keçidləri ilk siz paylaşın.
              </p>
              <button 
                className="btn-create-primary"
                onClick={() => setModalType('material')}
              >
                <Plus size={15} />
                <span>İlk materialı paylaş</span>
              </button>
            </div>
          ) : (
            <div className="view-table-card">
              {courseMaterials.map(mat => {
                const isAuthor = user?.id === mat.authorId;
                return (
                  <div key={mat.id} className="material-card-row">
                    <div className={`format-badge-box ${mat.type === 'file' ? 'is-file' : 'is-link'}`}>
                      {mat.type === 'file' ? <FileText size={16} /> : <Link2 size={16} />}
                    </div>

                    <div className="material-detail-col">
                      <div className="material-row-top">
                        <span className="material-type-indicator">
                          {mat.type === 'file' ? `Fayl (${mat.fileName || 'PDF'})` : 'Veb Keçid'}
                        </span>
                        {mat.fileSize && (
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            • {mat.fileSize}
                          </span>
                        )}
                      </div>

                      <h3 className="material-item-name">{mat.title}</h3>
                      {mat.description && (
                        <p className="material-item-desc">{mat.description}</p>
                      )}

                      <div className="material-author-line">
                        <span>{mat.authorName} tərəfindən</span>
                        <span className="dot-sep">•</span>
                        <span>
                          {new Date(mat.createdAt).toLocaleDateString('az-AZ', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="material-actions-col">
                      {mat.type === 'file' ? (
                        <button
                          className="row-action-btn primary-action"
                          onClick={() => downloadMaterialFile(mat.id)}
                          title="Faylı endir"
                        >
                          <Download size={13} />
                          <span>Yüklə</span>
                        </button>
                      ) : (
                        <a
                          href={mat.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="row-action-btn primary-action"
                          title="Keçidi aç"
                        >
                          <ArrowRight size={13} />
                          <span>Aç</span>
                        </a>
                      )}

                      {isAuthor && (
                        <button
                          className="row-action-delete"
                          onClick={() => {
                            if (window.confirm('Bu materialı silmək istədiyinizə əminsiniz?')) {
                              deleteMaterial(mat.id);
                            }
                          }}
                          title="Materialı sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 3: QRUP QEYDLƏRİ
          ======================================================== */}
      {activeTab === 'notes' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button 
              className="btn-create-primary"
              onClick={() => setModalType('note')}
            >
              <Plus size={15} />
              <span>Qeyd əlavə et</span>
            </button>
          </div>

          {courseNotes.length === 0 ? (
            <div className="honest-empty-state">
              <div className="empty-icon-bubble">
                <MessageSquareQuote size={24} />
              </div>
              <h3 className="empty-state-title">Hələ heç bir qeyd yoxdur</h3>
              <p className="empty-state-lead">
                Müəllimin dərsdə vurğuladığı imtahan sualları və ya vacib tapşırıqları qeyd edin.
              </p>
              <button 
                className="btn-create-primary"
                onClick={() => setModalType('note')}
              >
                <Plus size={15} />
                <span>İlk qeydi əlavə et</span>
              </button>
            </div>
          ) : (
            <div className="view-table-card">
              {courseNotes.map(note => {
                const isAuthor = user?.id === note.authorId;
                return (
                  <div key={note.id} className="note-card-item">
                    <div className="note-left-bar" />
                    <div className="note-body-col">
                      <div className="note-header-line">
                        <span className="note-tag-pill">{getCategoryLabel(note.category)}</span>
                        <span className="note-time-chip">
                          {new Date(note.createdAt).toLocaleDateString('az-AZ', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="note-main-quote">{note.content}</p>

                      <div className="note-footer-meta">
                        <span>{note.authorName} tərəfindən</span>
                        {isAuthor && (
                          <button
                            className="row-action-delete"
                            onClick={() => {
                              if (window.confirm('Bu qeydi silmək istədiyinizə əminsiniz?')) {
                                deleteNote(note.id);
                              }
                            }}
                            title="Qeydi sil"
                            style={{ marginLeft: 'auto' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 4: TAPŞIRIQLAR
          ======================================================== */}
      {activeTab === 'assignments' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button 
              className="btn-create-primary"
              onClick={() => setModalType('deadline')}
            >
              <Plus size={15} />
              <span>Tapşırıq əlavə et</span>
            </button>
          </div>

          {courseDeadlines.length === 0 ? (
            <div className="honest-empty-state">
              <div className="empty-icon-bubble">
                <Clock size={24} />
              </div>
              <h3 className="empty-state-title">Aktiv tapşırıq yoxdur</h3>
              <p className="empty-state-lead">
                Bu fənn üçün laboratoriya işi, fərdi tapşırıq və ya kollokvium tarixi təyin edin.
              </p>
              <button 
                className="btn-create-primary"
                onClick={() => setModalType('deadline')}
              >
                <Plus size={15} />
                <span>Tapşırıq əlavə et</span>
              </button>
            </div>
          ) : (
            <div className="view-table-card">
              {courseDeadlines.map(dl => {
                const isAuthor = user?.id === dl.authorId;
                const status = computeDeadlineStatus(dl.dueDate, dl.dueTime);

                return (
                  <div key={dl.id} className={`deadline-card-row ${dl.isCompleted ? 'is-done' : ''}`}>
                    <button
                      className={`deadline-checkbox-btn ${dl.isCompleted ? 'checked' : ''}`}
                      onClick={() => toggleDeadline(dl.id)}
                      title={dl.isCompleted ? 'Tamamlanmamış et' : 'Tamamlandı kimi işarələ'}
                    >
                      {dl.isCompleted && <CheckCircle2 size={13} />}
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ 
                          fontSize: '0.84rem', 
                          fontWeight: 500,
                          textDecoration: dl.isCompleted ? 'line-through' : 'none',
                          color: dl.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)'
                        }}>
                          {dl.title}
                        </span>
                        {dl.points && <span className="score-pill">+{dl.points} bal</span>}
                      </div>

                      {dl.description && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                          {dl.description}
                        </p>
                      )}

                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        Son tarix: {new Date(`${dl.dueDate}T12:00:00`).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long' })}
                        {dl.dueTime ? `, saat ${dl.dueTime}` : ''}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`status-pill ${status.isOverdue ? 'status-pill-warning' : status.isUrgent ? 'status-pill-warning' : 'status-pill-neutral'}`}>
                        {status.label}
                      </span>

                      {isAuthor && (
                        <button
                          className="row-action-delete"
                          onClick={() => {
                            if (window.confirm('Bu tapşırığı silmək istədiyinizə əminsiniz?')) {
                              deleteDeadline(dl.id);
                            }
                          }}
                          title="Tapşırığı sil"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 5: SUAL-CAVAB
          ======================================================== */}
      {activeTab === 'qa' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button 
              className="btn-create-primary"
              onClick={() => setModalType('question')}
            >
              <Plus size={15} />
              <span>Sual ver</span>
            </button>
          </div>

          {courseQuestions.length === 0 ? (
            <div className="honest-empty-state">
              <div className="empty-icon-bubble">
                <HelpCircle size={24} />
              </div>
              <h3 className="empty-state-title">Hələ sual verilməyib</h3>
              <p className="empty-state-lead">
                Bu fənn üzrə çətinlik çəkdiyiniz məqamları qrup yoldaşlarınıza ünvanlayın.
              </p>
              <button 
                className="btn-create-primary"
                onClick={() => setModalType('question')}
              >
                <Plus size={15} />
                <span>İlk sualı ver</span>
              </button>
            </div>
          ) : (
            <div className="view-table-card">
              {courseQuestions.map(q => {
                const isQuestionAuthor = user?.id === q.authorId;
                const answers = getAnswersForQuestion(q.id);
                const isExpanded = expandedQuestions[q.id] ?? (answers.length > 0);
                const acceptedAnswer = answers.find(a => a.isAccepted);

                return (
                  <div key={q.id} className="qa-card-item">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          {acceptedAnswer && (
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.25rem', 
                              fontSize: '0.68rem', 
                              color: '#15803d', 
                              background: '#dcfce7', 
                              padding: '0.1rem 0.45rem', 
                              borderRadius: '4px',
                              fontWeight: 500
                            }}>
                              <CheckCircle2 size={11} />
                              Həll olundu
                            </span>
                          )}
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {q.authorName} tərəfindən • {new Date(q.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>

                        <h3 className="qa-title-heading">{q.title}</h3>
                        {q.details && <p className="qa-details-text">{q.details}</p>}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                        <button
                          className="row-action-btn primary-action"
                          onClick={() => handleToggleQuestion(q.id)}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', gap: '0.3rem' }}
                        >
                          <HelpCircle size={13} />
                          <span>{answers.length} cavab</span>
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>

                        {isQuestionAuthor && (
                          <button
                            className="row-action-delete"
                            onClick={() => {
                              if (window.confirm('Bu sualı silmək istədiyinizə əminsiniz?')) {
                                deleteQuestion(q.id);
                              }
                            }}
                            title="Sualı sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="qa-answers-drawer">
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Cavablar ({answers.length})
                        </div>

                        {answers.length === 0 ? (
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Hələ cavab verilməyib. İlk cavabı yaza bilərsiniz.
                          </p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {answers.map(ans => {
                              const isAnsAuthor = user?.id === ans.authorId;

                              return (
                                <div key={ans.id} className={`qa-single-answer-item ${ans.isAccepted ? 'is-accepted' : ''}`}>
                                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                                    <p className="qa-answer-text">{ans.content}</p>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                                      {isQuestionAuthor && (
                                        <button
                                          type="button"
                                          onClick={() => toggleAcceptedAnswer(ans.id)}
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.2rem',
                                            fontSize: '0.68rem',
                                            padding: '0.15rem 0.4rem',
                                            borderRadius: '4px',
                                            border: '1px solid',
                                            borderColor: ans.isAccepted ? '#86efac' : 'var(--border-default)',
                                            background: ans.isAccepted ? '#dcfce7' : '#ffffff',
                                            color: ans.isAccepted ? '#166534' : 'var(--text-muted)',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          <CheckCircle2 size={11} />
                                          <span>{ans.isAccepted ? 'Təsdiqləndi' : 'Təsdiqlə'}</span>
                                        </button>
                                      )}

                                      {isAnsAuthor && (
                                        <button
                                          className="row-action-delete"
                                          onClick={() => deleteAnswer(ans.id)}
                                          title="Cavabı sil"
                                          style={{ width: '22px', height: '22px' }}
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="qa-answer-meta-row">
                                    <span>{ans.authorName}</span>
                                    <span>
                                      {new Date(ans.createdAt).toLocaleDateString('az-AZ', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <form 
                          onSubmit={(e) => handleAddAnswer(q.id, e)}
                          style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}
                        >
                          <input
                            type="text"
                            placeholder="Cavabınızı bura yazın..."
                            value={answerInputs[q.id] || ''}
                            onChange={(e) => setAnswerInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                            className="modal-form-input"
                            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', background: '#ffffff' }}
                          />
                          <button
                            type="submit"
                            disabled={submittingAnsId === q.id || !answerInputs[q.id]?.trim()}
                            className="btn-create-primary"
                            style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                          >
                            <Send size={13} />
                            <span>Göndər</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Contextual creation modals prefilled with course.id */}
      <CreateMaterialModal
        isOpen={modalType === 'material'}
        onClose={() => setModalType(null)}
        defaultCourseId={course.id}
      />
      <CreateNoteModal
        isOpen={modalType === 'note'}
        onClose={() => setModalType(null)}
        defaultCourseId={course.id}
      />
      <CreateDeadlineModal
        isOpen={modalType === 'deadline'}
        onClose={() => setModalType(null)}
        defaultCourseId={course.id}
      />
      <CreateQuestionModal
        isOpen={modalType === 'question'}
        onClose={() => setModalType(null)}
        defaultCourseId={course.id}
      />
    </div>
  );
};
