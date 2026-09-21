import React, { useState } from 'react';
import './DashboardView.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { computeDeadlineStatus } from '../../services/db';
import {
  Calendar,
  FileText,
  Link2,
  Download,
  MessageSquareQuote,
  HelpCircle,
  CheckCircle2,
  Vote,
  ArrowRight,
  Plus,
  Terminal,
  ExternalLink,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SEMESTER_CONFIG, WEEKLY_SCHEDULE } from '../../data/mockData';
import { CreateDeadlineModal } from './modals/CreateDeadlineModal';
import { CreateNoteModal } from './modals/CreateNoteModal';
import { CreateMaterialModal } from './modals/CreateMaterialModal';
import { CreatePollModal } from './modals/CreatePollModal';
import { CreateQuestionModal } from './modals/CreateQuestionModal';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const { 
    courses,
    deadlines, 
    notes, 
    materials, 
    polls, 
    questions, 
    toggleDeadline,
    voteInPoll, 
    hasUserVotedInPoll,
    getVotesForPoll,
    downloadMaterialFile,
    getAnswersForQuestion,
  } = useDatabase();

  // Modals state
  const [modalType, setModalType] = useState<'deadline' | 'note' | 'material' | 'poll' | 'question' | null>(null);

  // Timetable selected day (defaults to today: 2 = Çərşənbə axşamı)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(SEMESTER_CONFIG.todayDayIndex);

  const weekDays = [
    { index: 1, name: 'B.e.', fullName: 'Bazar ertəsi' },
    { index: 2, name: 'Ç.a.', fullName: 'Çərşənbə axşamı', isToday: true },
    { index: 3, name: 'Çərş.', fullName: 'Çərşənbə' },
    { index: 4, name: 'C.a.', fullName: 'Cümə axşamı' },
    { index: 5, name: 'Cümə', fullName: 'Cümə' },
  ];

  const filteredSchedule = WEEKLY_SCHEDULE.filter(s => s.dayIndex === selectedDayIndex);
  const currentProgressPercent = Math.round((SEMESTER_CONFIG.currentWeek / SEMESTER_CONFIG.totalWeeks) * 100);

  // Top 3 upcoming non-completed deadlines (sorted by nearest dueDate)
  const activeDeadlines = [...deadlines]
    .filter(d => !d.isCompleted)
    .sort((a, b) => new Date(`${a.dueDate}T${a.dueTime || '23:59'}`).getTime() - new Date(`${b.dueDate}T${b.dueTime || '23:59'}`).getTime())
    .slice(0, 3);

  // Latest 2 notes
  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  // Latest 3 materials
  const recentMaterials = [...materials]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Active poll (first from list)
  const activePoll = polls[0] || null;

  // Latest 2 questions
  const recentQuestions = [...questions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  const handleVote = async (pollId: string, optionId: string) => {
    try {
      voteInPoll(pollId, optionId);
    } catch (err: any) {
      alert(err.message || 'Səs verərkən xəta baş verdi');
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
    <div className="dashboard-content-flow">
      {/* 1. Welcome Greeting Header */}
      <div className="dashboard-welcome-header">
        <div>
          <h2 className="welcome-headline">Xoş gəldin, {user?.firstName || 'Tələbə'}</h2>
          <p className="welcome-subline">6326A2 · Kompüter Mühəndisliyi · Payız Semestri</p>
        </div>

        <div className="welcome-actions-row">
          <button
            type="button"
            onClick={() => setModalType('deadline')}
            className="btn-dash-primary"
          >
            <Plus size={14} />
            <span>Tapşırıq əlavə et</span>
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
                15 Sentyabr başlayıb · <strong>{SEMESTER_CONFIG.currentWeek}-ci Həftə, 2-ci Gün (Çərşənbə axşamı)</strong>
              </span>
            </div>
            <h3 className="dash-sem-title">Semestr İrəliləyişi və İmtahan Hədəfi</h3>
          </div>
          <div className="dash-sem-countdown-pill">
            <Clock size={14} />
            <span>İmtahanlara <strong>{SEMESTER_CONFIG.daysToExam} gün</strong> qaldı</span>
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
            <span className="dash-sem-current-step">Hazırda: Həftə {SEMESTER_CONFIG.currentWeek} ({currentProgressPercent}%)</span>
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
            {weekDays.map(d => (
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
            filteredSchedule.map(item => {
              const matchedCourse = courses.find(c => c.id === item.courseId || c.slug === item.courseId);
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
                        <span>Materiallar</span>
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

      {/* 4. Academic Courses Grid (Clean 21st.dev Style) */}
      <div className="dash-courses-section">
        <div className="dash-section-meta-row">
          <h3 className="dash-section-heading">Fənlər və Tədris Sahələri</h3>
          <span className="dash-heading-link" onClick={() => navigate('/app/courses/math-analysis')}>
            Bütün fənlər →
          </span>
        </div>

        <div className="dash-courses-grid">
          {courses.map((c) => {
            const courseMaterials = materials.filter(m => m.courseId === c.id);
            const courseDeadlines = deadlines.filter(d => d.courseId === c.id);

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

      {/* 3. Bento Grid: 2-Column Academic Workspace Feed */}
      <div className="dash-bento-grid">
        {/* Left Column: Deadlines & Group Notes */}
        <div className="bento-column">
          {/* Card: Yaxın Deadline-lar */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <Calendar size={15} color="#0f172a" />
                <h3 className="bento-card-title">Yaxınlaşan Deadline-lar</h3>
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
                <p>Yaxınlaşan deadline yoxdur.</p>
                <button
                  type="button"
                  onClick={() => setModalType('deadline')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Əlavə et</span>
                </button>
              </div>
            ) : (
              <div className="bento-items-list">
                {activeDeadlines.map((dl) => {
                  const course = courses.find(c => c.id === dl.courseId);
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
                          <span className="bento-subject-badge">{course?.name || dl.courseId}</span>
                          <span className="bento-date-badge">
                            {new Date(`${dl.dueDate}T12:00:00`).toLocaleDateString('az-AZ', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                        <span className="bento-row-name">{dl.title}</span>
                      </div>
                      <div className="bento-row-status">
                        <span className={`bento-urgency-pill ${status.isUrgent || status.isOverdue ? 'is-urgent' : ''}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card: Son Qrup Qeydləri */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <MessageSquareQuote size={15} color="#0f172a" />
                <h3 className="bento-card-title">Son Qrup Qeydləri</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/notes')}
                className="bento-view-all-link"
              >
                <span>Bütün qeydlər ({notes.length})</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {recentNotes.length === 0 ? (
              <div className="bento-compact-empty">
                <p>Qrupda hələ qeyd paylaşılmayıb.</p>
                <button
                  type="button"
                  onClick={() => setModalType('note')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Qeyd yaz</span>
                </button>
              </div>
            ) : (
              <div className="bento-items-list">
                {recentNotes.map((note) => {
                  const course = courses.find(c => c.id === note.courseId);
                  return (
                    <div key={note.id} className="bento-note-item">
                      <div className={`bento-note-accent ${note.category}`} />
                      <div className="bento-note-body">
                        <div className="bento-note-top">
                          <span className="bento-subject-badge">{course?.name || note.courseId}</span>
                          <span className="bento-note-cat">{getCategoryLabel(note.category)}</span>
                          <span className="bento-time-text">
                            {new Date(note.createdAt).toLocaleDateString('az-AZ', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                        <p className="bento-quote-text">"{note.content}"</p>
                        <span className="bento-author-text">{note.authorName} tərəfindən</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Poll, Q&A & Materials */}
        <div className="bento-column">
          {/* Card: Aktiv Sorğu */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <Vote size={15} color="#0f172a" />
                <h3 className="bento-card-title">Aktiv Qrup Sorğusu</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/polls')}
                className="bento-view-all-link"
              >
                <span>Sorğular ({polls.length})</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {!activePoll ? (
              <div className="bento-compact-empty">
                <p>Hazırda aktiv sorğu yoxdur.</p>
                <button
                  type="button"
                  onClick={() => setModalType('poll')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Yeni sorğu</span>
                </button>
              </div>
            ) : (
              <div className="bento-poll-content">
                <h4 className="bento-poll-title">{activePoll.question}</h4>
                <div className="bento-poll-meta">
                  <span>{activePoll.authorName} tərəfindən</span>
                  <span>•</span>
                  <span>{getVotesForPoll(activePoll.id).length} səs</span>
                </div>

                <div className="bento-poll-options">
                  {activePoll.options.map((opt) => {
                    const votes = getVotesForPoll(activePoll.id);
                    const totalVotes = votes.length;
                    const optVotes = votes.filter(v => v.optionId === opt.id).length;
                    const pct = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
                    const isVoted = hasUserVotedInPoll(activePoll.id) && votes.some(v => v.userId === user?.id && v.optionId === opt.id);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleVote(activePoll.id, opt.id)}
                        className={`bento-poll-opt-btn ${isVoted ? 'is-voted' : ''}`}
                      >
                        <div className="bento-opt-text-row">
                          <span>{opt.text}</span>
                          <span className="bento-pct-text">{pct}%</span>
                        </div>
                        <div className="bento-poll-progress-bg">
                          <div
                            className="bento-poll-progress-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Card: Son Sual-Cavab */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <HelpCircle size={15} color="#0f172a" />
                <h3 className="bento-card-title">Sual-Cavab</h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/qa')}
                className="bento-view-all-link"
              >
                <span>Hamısı ({questions.length})</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {recentQuestions.length === 0 ? (
              <div className="bento-compact-empty">
                <p>Hələ sual verilməyib.</p>
                <button
                  type="button"
                  onClick={() => setModalType('question')}
                  className="bento-empty-btn"
                >
                  <Plus size={12} />
                  <span>Sual ver</span>
                </button>
              </div>
            ) : (
              <div className="bento-items-list">
                {recentQuestions.map((q) => {
                  const course = courses.find(c => c.id === q.courseId);
                  const answers = getAnswersForQuestion(q.id);
                  const hasAccepted = answers.some(a => a.isAccepted);

                  return (
                    <div
                      key={q.id}
                      className="bento-qa-row"
                      onClick={() => navigate('/app/qa')}
                    >
                      <div className="bento-qa-main">
                        <div className="bento-row-tags">
                          <span className="bento-subject-badge">{course?.name || q.courseId}</span>
                          {hasAccepted && (
                            <span className="bento-resolved-badge">
                              <CheckCircle2 size={10} />
                              Həll olundu
                            </span>
                          )}
                        </div>
                        <span className="bento-row-name">{q.title}</span>
                      </div>
                      <span className="bento-answers-count">
                        {answers.length} cavab
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card: Son Materiallar */}
          <div className="bento-card">
            <div className="bento-card-header">
              <div className="bento-title-wrap">
                <FileText size={15} color="#0f172a" />
                <h3 className="bento-card-title">Son Materiallar</h3>
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
                <p>Hələ material paylaşılmayıb.</p>
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
                  const course = courses.find(c => c.id === mat.courseId);
                  return (
                    <div key={mat.id} className="bento-material-row">
                      <div className={`bento-mat-icon ${mat.type === 'file' ? 'is-file' : 'is-link'}`}>
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
      <CreateNoteModal
        isOpen={modalType === 'note'}
        onClose={() => setModalType(null)}
      />
      <CreateMaterialModal
        isOpen={modalType === 'material'}
        onClose={() => setModalType(null)}
      />
      <CreatePollModal
        isOpen={modalType === 'poll'}
        onClose={() => setModalType(null)}
      />
      <CreateQuestionModal
        isOpen={modalType === 'question'}
        onClose={() => setModalType(null)}
      />
    </div>
  );
};
