import React, { useState } from 'react';
import './WorkspacePreview.css';
import {
  COURSES,
  FEATURED_LECTURES,
} from '../data/mockData';
import {
  Search,
  Plus,
  Star,
  MoreHorizontal,
  Link2,
  ChevronDown,
  FileText,
  Clock,
  Sparkles,
  Download,
  MapPin,
  Award,
  ShieldCheck,
  Check,
  Activity,
  Calendar,
  FolderOpen,
} from 'lucide-react';

export const WorkspacePreview: React.FC = () => {
  const [activeCourseId, setActiveCourseId] = useState<string>('math');
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'tasks'>('details');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];
  const lecture = FEATURED_LECTURES[activeCourseId] || FEATURED_LECTURES['math'];

  const handleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="workspace-section" id="workspace">
      <div className="container">
        {/* Outer Perspective Wrapper */}
        <div className="workspace-mockup-wrapper">
          {/* Main Desktop Window */}
          <div className="workspace-window reveal-window">
            {/* 1. Linear Header Chrome */}
            <div className="window-topbar">
              <div className="window-topbar-left">
                <div className="window-app-brand">
                  <div className="window-brand-dot" />
                  <span className="window-brand-title">6326A2</span>
                  <ChevronDown size={11} className="window-brand-arrow" />
                </div>
                <div className="window-topbar-divider" />
                <button type="button" className="window-icon-btn" title="Axtarış (⌘K)">
                  <Search size={13} />
                </button>
                <button type="button" className="window-icon-btn" title="Yeni Qeyd və ya Tapşırıq">
                  <Plus size={13} />
                </button>
              </div>

              {/* Center Issue Breadcrumb */}
              <div className="window-topbar-center">
                <span className="issue-status-dot amber" title="Aktiv Kolloqvium Hazırlığı" />
                <span className="issue-id-badge">MAT-101</span>
                <span className="issue-topbar-title">I Kolloqvium: Veyerştras Teoremi və Limitlər</span>
                <button type="button" className="window-icon-btn star-btn" title="Seçilmişlərə əlavə et">
                  <Star size={12} />
                </button>
                <button type="button" className="window-icon-btn" title="Daha çox">
                  <MoreHorizontal size={12} />
                </button>
              </div>

              {/* Right Window Controls */}
              <div className="window-topbar-right">
                <span className="window-counter-badge">1 / 84</span>
                <div className="window-topbar-divider" />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="window-icon-btn"
                  title="Linki kopyala"
                >
                  {isCopied ? <Check size={12} color="#5e6ad2" /> : <Link2 size={12} />}
                </button>
                <div className="window-traffic-dots">
                  <span className="window-subtle-dot" />
                  <span className="window-subtle-dot" />
                  <span className="window-subtle-dot" />
                </div>
              </div>
            </div>

            {/* 2. Window 3-Column Body */}
            <div className="window-body-grid">
              {/* SÜTUN 1: LINEAR SOL SIDEBAR */}
              <aside className="linear-sidebar">
                {/* Workspace Identifier */}
                <div className="linear-workspace-pill">
                  <div className="workspace-avatar">63</div>
                  <div className="workspace-names">
                    <span className="workspace-main-name">AzTU · 6326A2</span>
                    <span className="workspace-sub-name">Kompüter Mühəndisliyi</span>
                  </div>
                </div>

                {/* Primary Nav Items */}
                <div className="linear-nav-group">
                  <div className="linear-nav-item active">
                    <Activity size={13} className="nav-icon" />
                    <span>Pulse (Fəaliyyət)</span>
                  </div>
                  <div className="linear-nav-item">
                    <Calendar size={13} className="nav-icon" />
                    <span>Cədvəl & Auditoriyalar</span>
                  </div>
                  <div className="linear-nav-item">
                    <FolderOpen size={13} className="nav-icon" />
                    <span>Cloudflare R2 Arxiv</span>
                  </div>
                </div>

                {/* Fənlər Listəsi */}
                <div className="linear-nav-group">
                  <div className="linear-nav-header">FƏNLƏR</div>
                  <div className="linear-course-list">
                    {COURSES.map((course) => {
                      const isSelected = course.id === activeCourseId;
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => setActiveCourseId(course.id)}
                          className={`linear-course-row ${isSelected ? 'is-selected' : ''}`}
                        >
                          <span className={`course-row-dot ${isSelected ? 'active-dot' : ''}`} />
                          <span className="course-row-name">{course.name}</span>
                          <span className="course-row-code">{course.code}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom System Meta */}
                <div className="linear-sidebar-bottom">
                  <div className="linear-semester-tag">
                    <Sparkles size={11} className="semester-sparkle" />
                    <span>Payız Semestri 2026/27</span>
                  </div>
                </div>
              </aside>

              {/* SÜTUN 2: MƏRKƏZİ LINEAR ISSUE SAHƏSİ */}
              <main className="linear-issue-main">
                {/* Issue Header */}
                <div className="issue-main-header">
                  <div className="issue-meta-row">
                    <span className="issue-chip-id">MAT-101</span>
                    <span className="issue-chip-sep">/</span>
                    <span className="issue-chip-course">{activeCourse.name}</span>
                    <span className="issue-chip-badge">Kolloqvium Hazırlığı</span>
                  </div>

                  <h1 className="issue-main-title">
                    {activeCourseId === 'math'
                      ? 'I Kolloqvium: Veyerştras Teoremi, Monotonluq və Görkəmli Limitlər'
                      : `${activeCourse.name}: ${lecture.title}`}
                  </h1>
                </div>

                {/* Sub-nav Tabs */}
                <div className="issue-tab-bar">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className={`issue-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  >
                    <span>İzahat & Tələblər</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('materials')}
                    className={`issue-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                  >
                    <span>Mühazirə Materialı</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tasks')}
                    className={`issue-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                  >
                    <span>Tapşırıq</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="issue-content-body">
                  {/* LaTeX / Math Code Block (Linear Code Frame) */}
                  <div className="linear-code-frame">
                    <div className="code-frame-header">
                      <span className="code-lang">formula.tex</span>
                      <span className="code-copy-tag">LaTeX</span>
                    </div>
                    <pre className="code-frame-content">
                      <code>{`\\lim_{x \\to 0} \\frac{\\sin(5x)}{x} = 5 \\quad \\text{və} \\quad x_1 \\le x_2 \\le \\dots \\le x_n \\le M`}</code>
                    </pre>
                  </div>

                  {/* Editorial Description */}
                  <div className="issue-markdown-content">
                    <p>
                      {activeCourseId === 'math'
                        ? 'Veyerştras teoreminə əsasən, monoton artan və yuxarıdan məhdud olan istənilən ədədi ardıcıllığın sonlu limiti var. Bu teorem və 1-ci görkəmli limitin isbatı I Kolloqviumun nəzəri suallar siyahısına daxil edilmişdir.'
                        : lecture.summary}
                    </p>
                  </div>

                  {/* Attachment Pill (Linear File Asset) */}
                  <div className="linear-attachment-card">
                    <div className="attachment-left">
                      <div className="attachment-icon-box">
                        <FileText size={15} />
                      </div>
                      <div className="attachment-details">
                        <span className="attachment-name">
                          {activeCourseId === 'math' ? 'Mühazirə 03 — Çoxluqlar və Limitlər.pdf' : `${lecture.title}.pdf`}
                        </span>
                        <span className="attachment-meta">2.4 MB · Rəsmi Təsdiqlənmiş Vəsait</span>
                      </div>
                    </div>
                    <button type="button" className="attachment-action-btn" title="Vəsaiti Endir">
                      <Download size={13} />
                      <span>Endir</span>
                    </button>
                  </div>

                  {/* Activity History Timeline (Linear signature) */}
                  <div className="linear-activity-stream">
                    <div className="activity-section-title">Fəaliyyət Tarixçəsi</div>

                    <div className="activity-row">
                      <div className="activity-avatar-linear">NŞ</div>
                      <div className="activity-text-col">
                        <span className="activity-author">Dos. Nizami Şıxəliyev</span>
                        <span className="activity-action">rəsmi mühazirə vəsaitini əlavə etdi</span>
                        <span className="activity-time">2 saat əvvəl</span>
                      </div>
                    </div>

                    <div className="activity-row">
                      <div className="activity-avatar-system">
                        <Sparkles size={11} />
                      </div>
                      <div className="activity-text-col">
                        <span className="activity-author">Sistem Botu</span>
                        <span className="activity-action">1-ci Kolloqvium sınaq suallarını sinxronlaşdırdı</span>
                        <span className="activity-time">4 saat əvvəl</span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* SÜTUN 3: LINEAR SAĞ PROPERTIES PANELİ (Signature Linear Look) */}
              <aside className="linear-properties-panel">
                <div className="properties-title">Xassələr & Parametrlər</div>

                <div className="properties-list">
                  {/* Status */}
                  <div className="property-item">
                    <span className="property-label">Vəziyyət</span>
                    <div className="property-value-pill">
                      <span className="prop-status-dot amber" />
                      <span>Aktiv Hazırlıq</span>
                    </div>
                  </div>

                  {/* Prioritet */}
                  <div className="property-item">
                    <span className="property-label">Prioritet</span>
                    <div className="property-value-pill">
                      <div className="priority-bars-linear">
                        <span className="bar filled" />
                        <span className="bar filled" />
                        <span className="bar filled" />
                      </div>
                      <span>Kolloqvium (Yüksək)</span>
                    </div>
                  </div>

                  {/* Müəllim */}
                  <div className="property-item">
                    <span className="property-label">Müəllim</span>
                    <div className="property-value-pill">
                      <div className="property-teacher-avatar">NŞ</div>
                      <span>Dos. N.Şıxəliyev</span>
                    </div>
                  </div>

                  {/* Auditoriya */}
                  <div className="property-item">
                    <span className="property-label">Auditoriya</span>
                    <div className="property-value-pill">
                      <MapPin size={12} className="prop-icon" />
                      <span>Otaq 1-506 / 6-408</span>
                    </div>
                  </div>

                  {/* Kolloqvium Balı */}
                  <div className="property-item">
                    <span className="property-label">Forma-1 Balı</span>
                    <div className="property-value-pill highlight-score">
                      <Award size={12} className="prop-icon" />
                      <span>10 Bal (1-ci Kolloqvium)</span>
                    </div>
                  </div>

                  {/* Qaib Vəziyyəti */}
                  <div className="property-item">
                    <span className="property-label">Qaib Limiti</span>
                    <div className="property-value-pill safe-attendance">
                      <ShieldCheck size={12} className="prop-icon" />
                      <span>2 / 15 saat (Təhlükəsiz)</span>
                    </div>
                  </div>

                  {/* Fənn Kodu */}
                  <div className="property-item">
                    <span className="property-label">Fənn Kodu</span>
                    <div className="property-value-code">
                      <span>{activeCourse.code}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card: Kolloqvium Countdown */}
                <div className="properties-callout-card">
                  <div className="callout-clock-row">
                    <Clock size={12} className="callout-icon" />
                    <span>Kolloqviuma Qalan Vaxt</span>
                  </div>
                  <div className="callout-days-big">4 gün 16 saat</div>
                  <span className="callout-date-sub">24 Oktyabr 2026 · Saat 09:00</span>
                </div>
              </aside>
            </div>
          </div>

          {/* 3. Linear Signature Perspective Pedestal & Floor Glow */}
          <div className="workspace-pedestal-light" aria-hidden="true" />
          <div className="workspace-pedestal-surface" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
