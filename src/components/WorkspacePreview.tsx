import React, { useState } from 'react';
import './WorkspacePreview.css';
import {
  COURSES,
  FEATURED_LECTURES,
  ASSIGNMENTS,
  QUESTION_ANSWER,
  GROUP_REMARKS,
} from '../data/mockData';
import {
  FileText,
  Clock,
  MessageSquareQuote,
  HelpCircle,
  Paperclip,
  CheckCircle2,
  FolderOpen,
  Vote,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  Sparkles,
} from 'lucide-react';

export const WorkspacePreview: React.FC = () => {
  const [activeCourseId, setActiveCourseId] = useState<string>('math');
  const [activeNavFilter, setActiveNavFilter] = useState<string>('all');
  const [isAnswerExpanded, setIsAnswerExpanded] = useState<boolean>(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);

  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];
  const lecture = FEATURED_LECTURES[activeCourseId] || FEATURED_LECTURES['math'];
  const courseAssignment = ASSIGNMENTS.find((a) => a.course === activeCourse.name);
  const courseRemark = GROUP_REMARKS.find((r) => r.courseId === activeCourseId) || GROUP_REMARKS[0];

  return (
    <section className="workspace-section" id="workspace">
      <div className="container">
        {/* Main Product Workspace Desktop Preview */}
        <div className="workspace-window reveal-window">
          {/* Top Window Chrome with 21st.dev Top Border Sheen */}
          <div className="window-topbar">
            <div className="window-dots">
              <span className="window-dot dot-close" />
              <span className="window-dot dot-minimize" />
              <span className="window-dot dot-maximize" />
            </div>

            <div className="window-breadcrumbs">
              <span className="bc-brand">6326A2</span>
              <span className="bc-sep">/</span>
              <span className="bc-current">{activeCourse.name}</span>
            </div>

            <div className="window-status-indicator">
              <span className="sync-pulse" />
              <span className="sync-text">Sinxronlaşdırılıb</span>
            </div>
          </div>

          {/* Window Interior: Sidebar + Main Content */}
          <div className="window-body">
            {/* SOL SIDEBAR */}
            <aside className="workspace-sidebar">
              {/* Group Workspace Header */}
              <div className="sidebar-brand-row">
                <div className="brand-badge-square">
                  <span className="brand-code">63</span>
                </div>
                <div className="brand-text-col">
                  <span className="brand-name">Qrup 6326A2</span>
                  <span className="brand-sub">AzTU · Kompüter Müh.</span>
                </div>
              </div>

              {/* FƏNLƏR */}
              <div className="sidebar-group-block">
                <div className="sidebar-label">FƏNLƏR</div>
                <div className="sidebar-course-list">
                  {COURSES.map((course) => {
                    const isSelected = course.id === activeCourseId;
                    return (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => {
                          setActiveCourseId(course.id);
                          setActiveNavFilter('all');
                        }}
                        className={`sidebar-course-btn ${isSelected ? 'is-selected' : ''}`}
                      >
                        <span className="sidebar-bullet" />
                        <span className="course-btn-title">{course.name}</span>
                        <span className="course-code-pill">{course.code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ƏLAVƏ NAVİQASİYA */}
              <div className="sidebar-group-block">
                <div className="sidebar-label">ƏLAVƏ NAVİQASİYA</div>
                <div className="sidebar-nav-list">
                  <button
                    type="button"
                    onClick={() => setActiveNavFilter(activeNavFilter === 'notes' ? 'all' : 'notes')}
                    className={`sidebar-nav-btn ${activeNavFilter === 'notes' ? 'is-active-filter' : ''}`}
                  >
                    <MessageSquareQuote size={14} className="nav-btn-icon" />
                    <span>Qrup qeydləri</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter(activeNavFilter === 'qa' ? 'all' : 'qa')}
                    className={`sidebar-nav-btn ${activeNavFilter === 'qa' ? 'is-active-filter' : ''}`}
                  >
                    <HelpCircle size={14} className="nav-btn-icon" />
                    <span>Sual-Cavab</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter(activeNavFilter === 'materials' ? 'all' : 'materials')}
                    className={`sidebar-nav-btn ${activeNavFilter === 'materials' ? 'is-active-filter' : ''}`}
                  >
                    <FolderOpen size={14} className="nav-btn-icon" />
                    <span>Materiallar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter(activeNavFilter === 'deadlines' ? 'all' : 'deadlines')}
                    className={`sidebar-nav-btn ${activeNavFilter === 'deadlines' ? 'is-active-filter' : ''}`}
                  >
                    <Calendar size={14} className="nav-btn-icon" />
                    <span>Deadline-lar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter(activeNavFilter === 'polls' ? 'all' : 'polls')}
                    className={`sidebar-nav-btn ${activeNavFilter === 'polls' ? 'is-active-filter' : ''}`}
                  >
                    <Vote size={14} className="nav-btn-icon" />
                    <span>Sorğular</span>
                  </button>
                </div>
              </div>

              {/* Bottom Mini Status */}
              <div className="sidebar-footer-note">
                <div className="semester-pill">
                  <Sparkles size={11} className="semester-icon" />
                  <span>2026/27 Payız Semestri</span>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="workspace-main">
              {/* Workspace Main Header */}
              <div className="workspace-content-header">
                <div className="header-title-block">
                  <h2 className="workspace-view-title">{activeCourse.name}</h2>
                  <p className="workspace-view-subtitle">Son fəaliyyət və qrup materialları</p>
                </div>

                {/* 21st.dev Style Interactive Filter Tabs */}
                <div className="header-view-pills">
                  <button
                    type="button"
                    onClick={() => setActiveNavFilter('all')}
                    className={`view-pill ${activeNavFilter === 'all' ? 'active' : ''}`}
                  >
                    <Layers size={13} />
                    <span>Hamısı</span>
                    <span className="pill-counter">4</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter('materials')}
                    className={`view-pill ${activeNavFilter === 'materials' ? 'active' : ''}`}
                  >
                    <FileText size={13} />
                    <span>Mühazirə</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter('deadlines')}
                    className={`view-pill ${activeNavFilter === 'deadlines' ? 'active' : ''}`}
                  >
                    <Clock size={13} />
                    <span>Tapşırıq</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter('notes')}
                    className={`view-pill ${activeNavFilter === 'notes' ? 'active' : ''}`}
                  >
                    <MessageSquareQuote size={13} />
                    <span>Qeyd</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNavFilter('qa')}
                    className={`view-pill ${activeNavFilter === 'qa' ? 'active' : ''}`}
                  >
                    <HelpCircle size={13} />
                    <span>Sual</span>
                  </button>
                </div>
              </div>

              {/* SPACIOUS, BREATHABLE, HIGH-CRAFT FEED */}
              <div
                key={`${activeCourseId}-${activeNavFilter}`}
                className="workspace-feed-list"
              >
                {/* 1. MÜHAZİRƏ ITEM */}
                {(activeNavFilter === 'all' || activeNavFilter === 'materials') && (
                  <article className="feed-item lecture-feed-card interactive-card">
                    <div className="feed-item-header">
                      <div className="item-badge-pill badge-lecture">
                        <FileText size={13} />
                        <span>Mühazirə</span>
                      </div>
                      <div className="feed-meta-chips">
                        <span className="meta-chip-time">{lecture.date}</span>
                        <span className="meta-chip-sep">•</span>
                        <span className="meta-chip-room">{lecture.room}</span>
                      </div>
                    </div>

                    <div className="feed-body-row">
                      <h3 className="feed-item-title">{lecture.title}</h3>
                      <p className="feed-item-desc">{lecture.summary}</p>
                    </div>

                    <div className="feed-footer-attachment">
                      <div className="pdf-chip">
                        <div className="pdf-chip-icon-box">
                          <Paperclip size={13} />
                        </div>
                        <div className="pdf-chip-content">
                          <span className="pdf-chip-label">{activeCourseId === 'phys' ? 'Müəllim təqdimatının xülasəsi:' : 'Əlavə olunmuş material:'}</span>
                          <span className="pdf-chip-name">{lecture.materials[0]?.name || 'Mühazirə 03 — Çoxluqlar.pdf'}</span>
                        </div>
                        <span className="pdf-chip-size">{lecture.materials[0]?.sizeOrSource || '2.4 MB'}</span>
                        {activeCourseId === 'phys' ? (
                          <a href="/app/courses/physics" className="pdf-chip-action" title="Fizika mövzularına bax">
                            <span>Bax</span>
                          </a>
                        ) : (
                          <button type="button" className="pdf-chip-action" title="Materialı yüklə">
                            <Download size={13} />
                            <span>Yüklə</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                )}

                {/* 2. TAPŞIRIQ ITEM */}
                {(activeNavFilter === 'all' || activeNavFilter === 'deadlines') && courseAssignment && (
                  <article className={`feed-item task-feed-card interactive-card ${isTaskCompleted ? 'is-completed' : ''}`}>
                    <div className="feed-item-header">
                      <div className="item-badge-pill badge-task">
                        <Clock size={13} />
                        <span>Tapşırıq</span>
                      </div>
                      <div className="feed-header-right">
                        <span className={`status-pill ${isTaskCompleted ? 'status-pill-success' : 'status-pill-warning'}`}>
                          {isTaskCompleted ? 'Təhvil verildi' : courseAssignment.daysRemaining}
                        </span>
                      </div>
                    </div>

                    <div className="feed-body-row">
                      <h3 className="feed-item-title">{courseAssignment.title}</h3>
                      <div className="task-deadline-bar">
                        <div className="deadline-date-chip">
                          <Calendar size={13} className="chip-icon" />
                          <span>Son təhvil: {courseAssignment.deadline}, 23:59</span>
                        </div>
                        <div className="task-points-badge">
                          +{courseAssignment.points} bal
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsTaskCompleted(!isTaskCompleted)}
                          className={`task-action-toggle ${isTaskCompleted ? 'is-done' : ''}`}
                          title="Tapşırığı təhvil verilmiş kimi işarələ"
                        >
                          <Check size={13} />
                          <span>{isTaskCompleted ? 'Tamamlandı' : 'Təhvil ver'}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                )}
                {activeNavFilter === 'deadlines' && activeCourseId === 'phys' && !courseAssignment && (
                  <div className="feed-item">Fizika üzrə təsdiqlənmiş təhvil tarixi hələ paylaşılmayıb.</div>
                )}

                {/* 3. QRUP QEYDİ ITEM */}
                {(activeNavFilter === 'all' || activeNavFilter === 'notes') && (
                  <article className="feed-item remark-feed-card interactive-card">
                    <div className="feed-item-header">
                      <div className="item-badge-pill badge-remark">
                        <MessageSquareQuote size={13} />
                        <span>Qrup qeydi</span>
                      </div>
                      <span className="badge badge-neutral">{courseRemark.tag}</span>
                    </div>

                    <div className="remark-highlight-box">
                      <p className="remark-quote-content">
                        {courseRemark.quote}
                      </p>
                      <div className="remark-author-meta">
                        <span className="remark-author-name">{courseRemark.author}</span>
                        <span className="meta-sep">•</span>
                        <span className="remark-date-text">{courseRemark.date}</span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 4. SUAL ITEM */}
                {(activeNavFilter === 'all' || activeNavFilter === 'qa') && (
                  <article className="feed-item question-feed-card interactive-card">
                    <div className="feed-item-header">
                      <div className="item-badge-pill badge-question">
                        <HelpCircle size={13} />
                        <span>Sual</span>
                      </div>
                      <div className="qa-verified-badge">
                        <CheckCircle2 size={13} />
                        <span>1 təsdiqlənmiş cavab</span>
                      </div>
                    </div>

                    <div className="feed-body-row">
                      <h3 className="feed-item-title">{QUESTION_ANSWER.question}</h3>
                      <div className="qa-meta-bar">
                        <span className="qa-author-tag">{QUESTION_ANSWER.author}</span>
                        <span className="meta-sep">•</span>
                        <span className="qa-time-tag">{QUESTION_ANSWER.timeAgo}</span>
                        <span className="meta-sep">•</span>
                        <span className="qa-answers-count">2 cavab</span>
                        <button
                          type="button"
                          onClick={() => setIsAnswerExpanded(!isAnswerExpanded)}
                          className="qa-expand-btn"
                        >
                          <span>{isAnswerExpanded ? 'Həlli gizlə' : 'Təsdiqlənmiş həlli oxu'}</span>
                          {isAnswerExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>
                    </div>

                    {/* Interactive Expandable Verified Answer Box (21st.dev style) */}
                    {isAnswerExpanded && (
                      <div className="qa-expanded-solution">
                        <div className="solution-header-row">
                          <CheckCircle2 size={14} className="solution-check-icon" />
                          <span className="solution-title">Təsdiqlənmiş elmi cavab</span>
                          <span className="solution-verified-by">({QUESTION_ANSWER.verifiedBy} tərəfindən)</span>
                        </div>
                        <p className="solution-body-text">
                          {QUESTION_ANSWER.acceptedAnswer}
                        </p>
                      </div>
                    )}
                  </article>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};
