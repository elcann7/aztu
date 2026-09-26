import React from 'react';
import './FeatureDeepDives.css';
import {
  SHARED_MATERIALS,
  ASSIGNMENTS,
  GROUP_POLL,
  QUESTION_ANSWER,
  GROUP_REMARKS,
} from '../data/mockData';
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  Download,
  Clock,
  Vote,
  ArrowRight,
  Pin,
} from 'lucide-react';

export const FeatureDeepDives: React.FC = () => {
  return (
    <div className="features-wrapper" id="features">
      {/* ==================================================================
          1. MATERİALLAR SECTION (Mətn sol / UI preview sağ)
          ================================================================== */}
      <section className="feature-block" id="materials">
        <div className="container">
          <div className="feature-split-layout">
            <div className="feature-text-side reveal-up">
              <span className="section-tag">Materiallar</span>
              <h2 className="section-title">Konspektlər, PDF-lər və mühazirə slaydları</h2>
              <p className="section-desc">
                WhatsApp çatlarında itib-batan faylları axtarmağa son. Mühazirə PDF-ləri,
                tələbələrin seminar qeydləri və müəllimin göndərdiyi əlavə tapşırıqlar hər fənn üzrə
                səliqəli siyahıda saxlanılır.
              </p>
            </div>

            <div className="feature-demo-side reveal-up reveal-stagger-1">
              <div className="feature-mockup-card reveal-card interactive-card">
                {/* Header: Riyazi analiz / Materiallar */}
                <div className="mockup-card-header">
                  <div className="mockup-breadcrumb-line">
                    <span className="mockup-course-title">Riyazi analiz</span>
                    <span className="mockup-sep">/</span>
                    <span className="mockup-section-title">Materiallar</span>
                  </div>
                  <span className="badge badge-neutral">4 fayl</span>
                </div>

                {/* Compact file rows */}
                <div className="compact-rows-stack reveal-rows">
                  {SHARED_MATERIALS.map((mat) => (
                    <div key={mat.id} className="file-row-item row-item">
                      <div className="file-icon-box">
                        {mat.type === 'link' ? (
                          <ExternalLink size={13} className="file-icon-link" />
                        ) : (
                          <FileText size={13} className="file-icon-pdf" />
                        )}
                      </div>
                      <div className="file-info-col">
                        <div className="file-name-text">{mat.name}</div>
                        <div className="file-meta-sub">
                          <span className="file-size-tag">{mat.sizeOrSource}</span>
                          <span className="file-meta-sep">•</span>
                          <span className="file-author-tag">{mat.authorOrContext}</span>
                        </div>
                      </div>
                      <button type="button" className="file-action-btn" title="Endir">
                        <Download size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. DEADLINE-LAR SECTION (UI preview sol / Mətn sağ)
          ================================================================== */}
      <section className="feature-block alt-bg" id="deadlines">
        <div className="container">
          <div className="feature-split-layout reverse-layout">
            <div className="feature-text-side reveal-up">
              <span className="section-tag">Deadline-lar</span>
              <h2 className="section-title">Laboratoriya və kollokvium cədvəli</h2>
              <p className="section-desc">
                Bütün fərdi işlərin, laboratoriya hesabatlarının və aralıq imtahanlarının təhvil tarixləri
                vahid vaxt cədvəlində. Qalan gün sayğacı ilə vaxtınızı dəqiq planlaşdırın.
              </p>
            </div>

            <div className="feature-demo-side reveal-up reveal-stagger-1">
              <div className="feature-mockup-card reveal-card interactive-card">
                {/* Header: Yaxınlaşan tapşırıqlar */}
                <div className="mockup-card-header">
                  <div className="mockup-breadcrumb-line">
                    <Clock size={13} className="header-icon-clock" />
                    <span className="mockup-section-title">Yaxınlaşan tapşırıqlar</span>
                  </div>
                  <span className="badge badge-neutral">{ASSIGNMENTS.length} aktiv iş</span>
                </div>

                {/* Real deadline UI rows */}
                <div className="compact-rows-stack reveal-rows">
                  {ASSIGNMENTS.length === 0 ? (
                    <div className="deadline-row-item row-item">
                      <div className="deadline-info-col">
                        <div className="deadline-title-text">
                          KOICA LMS üzrə hazırda aktiv tapşırıq yoxdur
                        </div>
                        <div className="deadline-meta-sub">
                          <span className="deadline-course-name">Bütün 5 LMS fənni (#5038–#5042)</span>
                          <span className="file-meta-sep">•</span>
                          <span className="deadline-date-val">I Kollokvium: 20–24 Oktyabr 2026</span>
                        </div>
                      </div>
                      <div className="deadline-status-col">
                        <span className="badge badge-neutral">0 tapşırıq</span>
                      </div>
                    </div>
                  ) : (
                    ASSIGNMENTS.map((asg) => (
                      <div key={asg.id} className="deadline-row-item row-item">
                        <div className="deadline-info-col">
                          <div className="deadline-title-text">{asg.title}</div>
                          <div className="deadline-meta-sub">
                            <span className="deadline-course-name">{asg.course}</span>
                            <span className="file-meta-sep">•</span>
                            <span className="deadline-date-val">{asg.deadline}</span>
                          </div>
                        </div>
                        <div className="deadline-status-col">
                          <span
                            className={`badge ${
                              asg.priority === 'high' ? 'badge-warning' : 'badge-neutral'
                            }`}
                          >
                            {asg.daysRemaining}
                          </span>
                          <span className="deadline-score-pill">+{asg.points} bal</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. SUAL-CAVAB SECTION (Mətn sol / UI preview sağ)
          ================================================================== */}
      <section className="feature-block" id="qa">
        <div className="container">
          <div className="feature-split-layout">
            <div className="feature-text-side reveal-up">
              <span className="section-tag">Sual-Cavab</span>
              <h2 className="section-title">Akademik müzakirələr və təsdiqlənmiş cavablar</h2>
              <p className="section-desc">
                Kollokvium və ya mühazirə mövzusunda qaranlıq qalan məqamlar burada cavablandırılır.
                Müəllimin auditoriyada təsdiqlədiyi həllər hamı üçün arxivləşdirilir.
              </p>
            </div>

            <div className="feature-demo-side reveal-up reveal-stagger-1">
              <div className="feature-mockup-card qa-card-box reveal-card interactive-card">
                {/* Header: Riyazi analiz / Sual-Cavab */}
                <div className="mockup-card-header">
                  <div className="mockup-breadcrumb-line">
                    <span className="mockup-course-title">Riyazi analiz</span>
                    <span className="mockup-sep">/</span>
                    <span className="mockup-section-title">Sual-Cavab</span>
                  </div>
                  <span className="badge badge-neutral">Dünən</span>
                </div>

                {/* Sual başlığı */}
                <h3 className="qa-card-question">
                  “{QUESTION_ANSWER.question}”
                </h3>

                {/* Sualı verən və cavab sayı */}
                <div className="qa-meta-bar">
                  <span className="qa-author-label">{QUESTION_ANSWER.author}</span>
                  <span className="file-meta-sep">•</span>
                  <span>{QUESTION_ANSWER.totalAnswers} cavab</span>
                  <span className="file-meta-sep">•</span>
                  <span className="qa-badge-verified">
                    <CheckCircle2 size={12} />
                    Təsdiqlənmiş cavab
                  </span>
                </div>

                {/* Təsdiqlənmiş cavab qutusu */}
                <div className="qa-solution-box">
                  <div className="solution-head">
                    <CheckCircle2 size={13} className="check-verified-icon" />
                    <span className="solution-title">Təsdiqlənmiş cavab:</span>
                  </div>
                  <p className="solution-text">
                    “{QUESTION_ANSWER.acceptedAnswer}”
                  </p>
                  <div className="solution-author-note">
                    {QUESTION_ANSWER.verifiedBy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. SORĞULAR / SƏSVERMƏ SECTION (UI preview sol / Mətn sağ)
          ================================================================== */}
      <section className="feature-block alt-bg" id="polls">
        <div className="container">
          <div className="feature-split-layout reverse-layout">
            <div className="feature-text-side reveal-up">
              <span className="section-tag">Sorğular</span>
              <h2 className="section-title">Qrup qərarları üçün anında səsvermə</h2>
              <p className="section-desc">
                Seminar təqdimatı, laboratoriya vaxtı və dərsin təxirə salınması kimi ortaq qərarları
                uzun-uzadı çat yazışmaları olmadan, şəffaf səsvermə ilə təyin edin.
              </p>
            </div>

            <div className="feature-demo-side reveal-up reveal-stagger-1">
              <div className="feature-mockup-card poll-card-box reveal-card interactive-card">
                <div className="mockup-card-header">
                  <div className="mockup-breadcrumb-line">
                    <Vote size={13} className="header-icon-vote" />
                    <span className="mockup-course-title">Riyazi analiz</span>
                    <span className="mockup-sep">/</span>
                    <span className="mockup-section-title">Sorğu</span>
                  </div>
                  <span className="poll-count-tag">{GROUP_POLL.totalVotes} səs</span>
                </div>

                <h3 className="poll-headline-question">
                  “{GROUP_POLL.question}”
                </h3>

                {/* Real poll vote rows with neutral bars */}
                <div className="poll-options-stack">
                  {GROUP_POLL.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`poll-option-row ${opt.isLeading ? 'is-winner' : ''}`}
                    >
                      <div className="poll-row-top">
                        <span className="poll-bullet">
                          {opt.isLeading ? '●' : '○'}
                        </span>
                        <span className="poll-opt-name">{opt.text}</span>
                        <span className="poll-opt-percent">
                          {opt.percent}%
                          <span className="poll-opt-votes"> ({opt.votes} səs)</span>
                        </span>
                      </div>
                      <div className="poll-progress-track">
                        <div
                          className="poll-bar-fill"
                          style={
                            {
                              width: `${opt.percent}%`,
                              '--target-width': `${opt.percent}%`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. QRUP QEYDLƏRİ / MÜƏLLİMİN DEDİKLƏRİ SECTION (Mətn sol / UI preview sağ)
          ================================================================== */}
      <section className="feature-block" id="notes">
        <div className="container">
          <div className="feature-split-layout">
            <div className="feature-text-side reveal-up">
              <span className="section-tag">Qrup Qeydləri</span>
              <h2 className="section-title">Müəllimin dərsdə dediyi vacib qeydlər</h2>
              <p className="section-desc">
                Dərslikdə və ya slaydda olmayan, amma müəllimin mühazirədə xüsusi vurğuladığı məqamlar:
                kollokviuma düşəcək nəzəri isbatlar, laboratoriya qaydaları və imtahan tələbləri.
              </p>
            </div>

            <div className="feature-demo-side reveal-up reveal-stagger-1">
              <div className="feature-mockup-card teacher-remarks-card reveal-card interactive-card">
                <div className="mockup-card-header">
                  <div className="mockup-breadcrumb-line">
                    <Pin size={13} className="header-icon-pin" />
                    <span className="mockup-section-title">Müəllimin dedikləri</span>
                  </div>
                  <span className="badge badge-neutral">3 vacib qeyd</span>
                </div>

                <div className="remarks-stack">
                  {GROUP_REMARKS.map((rem) => (
                    <div key={rem.id} className="remark-snippet-item">
                      <div className="remark-meta-header">
                        <span className="remark-course-badge">{rem.course}</span>
                        <span className="remark-tag-pill">{rem.tag}</span>
                      </div>
                      <p className="remark-quote-line">
                        “{rem.quote}”
                      </p>
                      <div className="remark-source-row">
                        <span className="remark-author-name">{rem.author}</span>
                        <span className="file-meta-sep">•</span>
                        <span className="remark-date-tag">{rem.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. FINAL CTA BLOCK
          ================================================================== */}
      <section className="feature-cta-block">
        <div className="container-narrow">
          <div className="cta-inner-card reveal-card interactive-card">
            <div className="cta-badge-line">
              <span className="badge badge-neutral">Qrup 6326A2</span>
            </div>
            <h2 className="cta-headline">
              Qrupunuz üçün bir iş sahəsi.
            </h2>
            <p className="cta-description">
              Mühazirələr, tapşırıqlar, qeydlər və materiallar — bir yerdə.
            </p>
            <div className="cta-actions">
              <a href="#workspace" className="btn-primary">
                <span>İş sahəsinə baxış</span>
                <ArrowRight size={14} />
              </a>
              <a href="#materials" className="btn-secondary">
                <span>Materialları araşdır</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
