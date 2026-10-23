import React, { useState, useEffect, useRef } from 'react';
import './ColloquiumDrawView.css';
import {
  Sparkles,
  Timer,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Zap,
} from 'lucide-react';
import type { ColloquiumTicket } from '../../../data/colloquiumQuestions';
import {
  COLLOQUIUM_QUESTIONS,
  COURSE_NAMES,
  drawColloquiumTicket,
} from '../../../data/colloquiumQuestions';
import {
  playTickSound,
  playReelLockSound,
  playTicketCompleteSound,
  playSubmitFanfare,
  setSfxMuted,
  getSfxMuted,
} from '../../../services/soundEffects';

type ExamMode = 'real' | 'practice';
type StageState = 'idle' | 'spinning' | 'solving' | 'reviewed';

export const ColloquiumDrawView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('math-analysis');
  const [examMode, setExamMode] = useState<ExamMode>('practice');
  const [stage, setStage] = useState<StageState>('idle');
  const [muted, setMuted] = useState<boolean>(() => getSfxMuted());

  // Active Ticket Data
  const [ticket, setTicket] = useState<ColloquiumTicket | null>(null);

  // Student Responses
  const [theoryAnswer, setTheoryAnswer] = useState('');
  const [prob1Answer, setProb1Answer] = useState('');
  const [prob2Answer, setProb2Answer] = useState('');

  // Self Evaluation Points
  const [theorySelfScore, setTheorySelfScore] = useState<number>(4);
  const [prob1SelfScore, setProb1SelfScore] = useState<number>(3);
  const [prob2SelfScore, setProb2SelfScore] = useState<number>(3);

  // Expanded explanations in review
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({
    theory: true,
    prob1: true,
    prob2: true,
  });

  // Reel Titles during spinning animation
  const [reel1Text, setReel1Text] = useState('Nəzəri Mövzu');
  const [reel2Text, setReel2Text] = useState('Praktiki Misal 1');
  const [reel3Text, setReel3Text] = useState('Praktiki Misal 2');

  // Reel locked states
  const [reel1Locked, setReel1Locked] = useState(false);
  const [reel2Locked, setReel2Locked] = useState(false);
  const [reel3Locked, setReel3Locked] = useState(false);

  // 45-min Real Exam Timer
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const spinIntervalsRef = useRef<number[]>([]);

  // Timer Effect
  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && examMode === 'real' && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, examMode, timeLeft]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setSfxMuted(next);
  };

  const clearAllIntervals = () => {
    spinIntervalsRef.current.forEach(clearInterval);
    spinIntervalsRef.current = [];
  };

  // Start Spin / Roulette Draw Animation (unprompted.cool style)
  const handleStartSpin = () => {
    clearAllIntervals();
    setStage('spinning');
    setReel1Locked(false);
    setReel2Locked(false);
    setReel3Locked(false);

    // Generate destination ticket
    const drawn = drawColloquiumTicket(selectedCourse);
    setTicket(drawn);
    setTheoryAnswer('');
    setProb1Answer('');
    setProb2Answer('');

    const courseQuestions = COLLOQUIUM_QUESTIONS.filter((q) => q.courseSlug === selectedCourse);
    const theoryTopics = courseQuestions.filter((q) => q.type === 'open_theory').map((q) => q.topic);
    const problemTopics = courseQuestions.filter((q) => q.type === 'practical_problem').map((q) => q.topic);

    let tickCount = 0;

    // Reel 1 Cycle
    const int1 = window.setInterval(() => {
      const randomTopic = theoryTopics[Math.floor(Math.random() * theoryTopics.length)] || 'Nəzəri Teorem';
      setReel1Text(randomTopic);
      tickCount++;
      if (tickCount % 2 === 0) playTickSound(1.1);
    }, 70);

    // Reel 2 Cycle
    const int2 = window.setInterval(() => {
      const randomTopic = problemTopics[Math.floor(Math.random() * problemTopics.length)] || 'Misal Hesablama';
      setReel2Text(randomTopic);
    }, 70);

    // Reel 3 Cycle
    const int3 = window.setInterval(() => {
      const randomTopic = problemTopics[Math.floor(Math.random() * problemTopics.length)] || 'Tətbiqi Məsələ';
      setReel3Text(randomTopic);
    }, 70);

    spinIntervalsRef.current = [int1, int2, int3];

    // Sequence reel stops
    // 1. Reel 1 stops after 1.2s
    window.setTimeout(() => {
      clearInterval(int1);
      setReel1Text(drawn.theoryQuestion.topic);
      setReel1Locked(true);
      playReelLockSound();
    }, 1300);

    // 2. Reel 2 stops after 2.1s
    window.setTimeout(() => {
      clearInterval(int2);
      setReel2Text(drawn.problem1.topic);
      setReel2Locked(true);
      playReelLockSound();
    }, 2200);

    // 3. Reel 3 stops after 3.0s
    window.setTimeout(() => {
      clearInterval(int3);
      setReel3Text(drawn.problem2.topic);
      setReel3Locked(true);
      playTicketCompleteSound();

      // Transition to solving stage
      window.setTimeout(() => {
        setStage('solving');
        if (examMode === 'real') {
          setTimeLeft(45 * 60);
          setIsTimerRunning(true);
        }
      }, 700);
    }, 3100);
  };

  const handleFinishAndReview = () => {
    setIsTimerRunning(false);
    playSubmitFanfare();
    setStage('reviewed');
    const contentBody = document.querySelector('.workspace-content-body');
    if (contentBody) {
      contentBody.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSolution = (key: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalCalculatedSelfScore = theorySelfScore + prob1SelfScore + prob2SelfScore;

  return (
    <div className="colloquium-draw-container">
      {/* 1. Header Bar: Title & Global Controls */}
      <div className="draw-header-card">
        <div className="header-meta-col">
          <div className="header-eyebrow">
            <span className="eyebrow-dot" />
            <span>Kolloqvium İmtahan Mühərriki · 6326A2</span>
          </div>
          <h1 className="header-main-title">Kolloqvium Püşkatma və Sınaq Mərkəzi</h1>
          <p className="header-subtitle">
            unprompted.cool mexaniki çıqqıltılı püşkatma çarxı ilə 3 təsadüfi sual (1 açıq nəzəriyyə + 2 misal) çəkin,
            özünüzü sınaqdan keçirin və rəsmi meyarlarla yoxlayın.
          </p>
        </div>

        {/* Course & Mode Selectors */}
        <div className="header-controls-col">
          {/* Mode Selector */}
          <div className="mode-toggle-pill" role="radiogroup" aria-label="İmtahan rejimi">
            <button
              type="button"
              className={`mode-btn ${examMode === 'practice' ? 'active' : ''}`}
              onClick={() => {
                if (stage !== 'spinning') setExamMode('practice');
              }}
              title="Limitsiz vaxt, sərbəst öyrənmə rejimi"
            >
              <Zap size={14} />
              <span>Sərbəst Məşq</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${examMode === 'real' ? 'active' : ''}`}
              onClick={() => {
                if (stage !== 'spinning') setExamMode('real');
              }}
              title="45 dəqiqəlik canlı auditoriya taymeri"
            >
              <Timer size={14} />
              <span>Real 45 Dəq</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            className={`sfx-mute-btn ${muted ? 'is-muted' : ''}`}
            onClick={toggleMute}
            title={muted ? 'Səsi yandır' : 'Səsi söndür'}
            aria-label="Səs düyməsi"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{muted ? 'Səssiz' : 'SFX Aktiv'}</span>
          </button>
        </div>
      </div>

      {/* 2. Course Tabs Navigation */}
      <div className="course-tabs-bar">
        {Object.entries(COURSE_NAMES).map(([slug, name]) => {
          const isSelected = selectedCourse === slug;
          return (
            <button
              key={slug}
              type="button"
              className={`course-tab-item ${isSelected ? 'is-selected' : ''}`}
              onClick={() => {
                if (stage !== 'spinning') {
                  setSelectedCourse(slug);
                  if (stage !== 'idle') {
                    setStage('idle');
                    setTicket(null);
                  }
                }
              }}
              disabled={stage === 'spinning'}
            >
              <BookOpen size={14} className="tab-icon" />
              <span className="tab-name">{name}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL STAGE (ROULETTE / SLOT MACHINE) */}
      {/* ========================================================================= */}
      {(stage === 'idle' || stage === 'spinning') && (
        <div className="draw-stage-container">
          <div className="stage-atmosphere" aria-hidden="true" />

          <div className="stage-status-badge">
            {stage === 'spinning' ? (
              <span className="badge-drawing">PÜŞK ATILIR... MEXANİKİ ÇIXQILTI İLƏ BİLƏT SEÇİLİR</span>
            ) : (
              <span className="badge-ready">PÜŞKATMAYA HAZIRDIR · 3 SUALLIQ RƏSMİ BİLET</span>
            )}
          </div>

          {/* 3-Slot Reel Display */}
          <div className="slots-roulette-grid">
            {/* Slot 1: Açıq Nəzəri Mövzu */}
            <div className={`slot-reel-card ${reel1Locked ? 'is-locked' : ''} ${stage === 'spinning' && !reel1Locked ? 'is-spinning' : ''}`}>
              <div className="slot-reel-header">
                <span className="slot-number">SLOT 01</span>
                <span className="slot-badge theory">Açıq Nəzəriyyə (4 Bal)</span>
              </div>
              <div className="slot-reel-content">
                <div className="reel-topic-text">{reel1Text}</div>
                <div className="reel-sub-caption">
                  {reel1Locked ? '✓ Nəzəri mövzu təyin edildi' : 'Teorem, tərif və sözlə isbat'}
                </div>
              </div>
            </div>

            {/* Slot 2: Praktiki Misal 1 */}
            <div className={`slot-reel-card ${reel2Locked ? 'is-locked' : ''} ${stage === 'spinning' && !reel2Locked ? 'is-spinning' : ''}`}>
              <div className="slot-reel-header">
                <span className="slot-number">SLOT 02</span>
                <span className="slot-badge problem">Misal / Məsələ 1 (3 Bal)</span>
              </div>
              <div className="slot-reel-content">
                <div className="reel-topic-text">{reel2Text}</div>
                <div className="reel-sub-caption">
                  {reel2Locked ? '✓ 1-ci misal təsdiqləndi' : 'Hesablama və addım-addım həll'}
                </div>
              </div>
            </div>

            {/* Slot 3: Praktiki Misal 2 */}
            <div className={`slot-reel-card ${reel3Locked ? 'is-locked' : ''} ${stage === 'spinning' && !reel3Locked ? 'is-spinning' : ''}`}>
              <div className="slot-reel-header">
                <span className="slot-number">SLOT 03</span>
                <span className="slot-badge problem">Misal / Məsələ 2 (3 Bal)</span>
              </div>
              <div className="slot-reel-content">
                <div className="reel-topic-text">{reel3Text}</div>
                <div className="reel-sub-caption">
                  {reel3Locked ? '✓ 2-ci misal təsdiqləndi' : 'Tətbiqi riyazi alqoritm'}
                </div>
              </div>
            </div>
          </div>

          {/* Central Spin Button (unprompted.cool style) */}
          <div className="stage-action-area">
            <button
              type="button"
              className={`unprompted-spin-btn ${stage === 'spinning' ? 'is-spinning' : ''}`}
              onClick={handleStartSpin}
              disabled={stage === 'spinning'}
            >
              <Sparkles size={18} className="btn-icon" />
              <span>{stage === 'spinning' ? 'Fırlanır...' : 'Bilet Çək (Püşk At)'}</span>
            </button>
            <p className="spin-hint-text">
              Düyməni sıxdıqda unprompted.cool mexaniki səsləri ilə 1 açıq nəzəriyyə və 2 misal avtomatik təsadüfi püşklənəcək.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ACTIVE TICKET SOLVING STAGE */}
      {/* ========================================================================= */}
      {(stage === 'solving' || stage === 'reviewed') && ticket && (
        <div className="active-ticket-wrapper">
          {/* Ticket Header Banner */}
          <div className="ticket-top-banner">
            <div className="ticket-meta-left">
              <span className="ticket-badge-pill">{ticket.ticketNumber}</span>
              <h2 className="ticket-course-title">{ticket.courseName} · Kolloqvium Bileti</h2>
              <span className="ticket-time-drawn">Püşk vaxtı: {ticket.drawnAt} · Maksimum: 10 Bal</span>
            </div>

            <div className="ticket-meta-right">
              {examMode === 'real' && (
                <div className={`live-timer-chip ${timeLeft < 300 ? 'timer-danger' : ''}`}>
                  <Clock size={16} />
                  <span className="timer-digits">{formatTimer(timeLeft)}</span>
                </div>
              )}

              <button
                type="button"
                className="re-draw-ticket-btn"
                onClick={handleStartSpin}
                title="Yeni bilet püşklə"
              >
                <RotateCcw size={14} />
                <span>Yenidən Püşk At</span>
              </button>
            </div>
          </div>

          {/* Sual 1: Açıq Nəzəriyyə (4 Bal) */}
          <section className="ticket-question-card theory-card">
            <div className="q-card-header">
              <div className="q-badge-row">
                <span className="q-number-tag">SUAL 1 · AÇIQ MÖVZU İZAHI</span>
                <span className="q-score-tag">4.0 Bal</span>
              </div>
              <h3 className="q-title">{ticket.theoryQuestion.title}</h3>
              <p className="q-desc-text">{ticket.theoryQuestion.question}</p>

              {ticket.theoryQuestion.formulaTeX && (
                <div className="formula-preview-box">
                  <span className="formula-label">ƏSAS RİYAZİ İFADƏ:</span>
                  <code className="tex-code-snippet">{ticket.theoryQuestion.formulaTeX}</code>
                </div>
              )}

              {/* Rubric Peek */}
              <div className="rubric-mini-box">
                <span className="rubric-header">
                  <Award size={13} />
                  Müəllim Qiymətləndirmə Meyarları:
                </span>
                <ul className="rubric-list">
                  {ticket.theoryQuestion.rubric.map((r, i) => (
                    <li key={i}>
                      <span>{r.criterion}</span>
                      <strong className="r-pts">+{r.points} bal</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="q-answer-area">
              <label htmlFor="theory-input" className="input-label">
                <FileText size={14} />
                Sizin Nəzəri İzahınız və İsbat Addımlarınız:
              </label>
              <textarea
                id="theory-input"
                className="student-textarea"
                rows={6}
                value={theoryAnswer}
                onChange={(e) => setTheoryAnswer(e.target.value)}
                placeholder={ticket.theoryQuestion.inputPlaceholder}
                disabled={stage === 'reviewed'}
              />
              <span className="char-count">{theoryAnswer.length} simvol daxil edildi</span>
            </div>

            {/* If in Review Mode: Show Official Solution */}
            {stage === 'reviewed' && (
              <div className="official-solution-panel">
                <div
                  className="solution-accordion-header"
                  onClick={() => toggleSolution('theory')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="sol-title-left">
                    <CheckCircle2 size={16} className="sol-check-icon" />
                    <span className="sol-heading">Rəsmi Dərslik İzahı və Meyarlar</span>
                  </div>
                  {expandedSolutions.theory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {expandedSolutions.theory && (
                  <div className="solution-accordion-body">
                    <p className="sol-meta-title">{ticket.theoryQuestion.officialSolution.title}:</p>
                    <ol className="sol-steps-list">
                      {ticket.theoryQuestion.officialSolution.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>
                    <div className="sol-takeaway-box">
                      <strong>Açar Qayda:</strong> {ticket.theoryQuestion.officialSolution.keyTakeaway}
                    </div>

                    {/* Self score picker */}
                    <div className="self-score-picker">
                      <span className="picker-label">Öz cavabınızı meyarlara əsasən qiymətləndirin (0 - 4 bal):</span>
                      <div className="pts-buttons-row">
                        {[0, 1, 2, 3, 4].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            className={`pt-select-btn ${theorySelfScore === pts ? 'active' : ''}`}
                            onClick={() => setTheorySelfScore(pts)}
                          >
                            {pts} Bal
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Sual 2: Praktiki Misal 1 (3 Bal) */}
          <section className="ticket-question-card problem-card">
            <div className="q-card-header">
              <div className="q-badge-row">
                <span className="q-number-tag">SUAL 2 · PRAKTİKİ MİSAL</span>
                <span className="q-score-tag">3.0 Bal</span>
              </div>
              <h3 className="q-title">{ticket.problem1.title}</h3>
              <p className="q-desc-text">{ticket.problem1.question}</p>

              {ticket.problem1.formulaTeX && (
                <div className="formula-preview-box">
                  <span className="formula-label">VERİLƏN HESABLAMA ŞƏRTİ:</span>
                  <code className="tex-code-snippet">{ticket.problem1.formulaTeX}</code>
                </div>
              )}
            </div>

            <div className="q-answer-area">
              <label htmlFor="prob1-input" className="input-label">
                <FileText size={14} />
                Sizin Həll Addımlarınız və Nəticəniz:
              </label>
              <textarea
                id="prob1-input"
                className="student-textarea"
                rows={4}
                value={prob1Answer}
                onChange={(e) => setProb1Answer(e.target.value)}
                placeholder={ticket.problem1.inputPlaceholder}
                disabled={stage === 'reviewed'}
              />
            </div>

            {/* Review Mode Solution */}
            {stage === 'reviewed' && (
              <div className="official-solution-panel">
                <div
                  className="solution-accordion-header"
                  onClick={() => toggleSolution('prob1')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="sol-title-left">
                    <CheckCircle2 size={16} className="sol-check-icon" />
                    <span className="sol-heading">Addım-Addım Rəsmi Həll və Doğru Cavab</span>
                  </div>
                  {expandedSolutions.prob1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {expandedSolutions.prob1 && (
                  <div className="solution-accordion-body">
                    <ol className="sol-steps-list">
                      {ticket.problem1.officialSolution.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>
                    {ticket.problem1.officialSolution.finalAnswer && (
                      <div className="final-answer-badge">
                        <span>DOĞRU NƏTİCƏ:</span>
                        <code>{ticket.problem1.officialSolution.finalAnswer}</code>
                      </div>
                    )}

                    <div className="self-score-picker">
                      <span className="picker-label">Bu misal üzrə balınızı seçin (0 - 3 bal):</span>
                      <div className="pts-buttons-row">
                        {[0, 1, 2, 3].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            className={`pt-select-btn ${prob1SelfScore === pts ? 'active' : ''}`}
                            onClick={() => setProb1SelfScore(pts)}
                          >
                            {pts} Bal
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Sual 3: Praktiki Misal 2 (3 Bal) */}
          <section className="ticket-question-card problem-card">
            <div className="q-card-header">
              <div className="q-badge-row">
                <span className="q-number-tag">SUAL 3 · PRAKTİKİ MİSAL</span>
                <span className="q-score-tag">3.0 Bal</span>
              </div>
              <h3 className="q-title">{ticket.problem2.title}</h3>
              <p className="q-desc-text">{ticket.problem2.question}</p>

              {ticket.problem2.formulaTeX && (
                <div className="formula-preview-box">
                  <span className="formula-label">VERİLƏN HESABLAMA ŞƏRTİ:</span>
                  <code className="tex-code-snippet">{ticket.problem2.formulaTeX}</code>
                </div>
              )}
            </div>

            <div className="q-answer-area">
              <label htmlFor="prob2-input" className="input-label">
                <FileText size={14} />
                Sizin Həll Addımlarınız və Nəticəniz:
              </label>
              <textarea
                id="prob2-input"
                className="student-textarea"
                rows={4}
                value={prob2Answer}
                onChange={(e) => setProb2Answer(e.target.value)}
                placeholder={ticket.problem2.inputPlaceholder}
                disabled={stage === 'reviewed'}
              />
            </div>

            {/* Review Mode Solution */}
            {stage === 'reviewed' && (
              <div className="official-solution-panel">
                <div
                  className="solution-accordion-header"
                  onClick={() => toggleSolution('prob2')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="sol-title-left">
                    <CheckCircle2 size={16} className="sol-check-icon" />
                    <span className="sol-heading">Addım-Addım Rəsmi Həll və Doğru Cavab</span>
                  </div>
                  {expandedSolutions.prob2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {expandedSolutions.prob2 && (
                  <div className="solution-accordion-body">
                    <ol className="sol-steps-list">
                      {ticket.problem2.officialSolution.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>
                    {ticket.problem2.officialSolution.finalAnswer && (
                      <div className="final-answer-badge">
                        <span>DOĞRU NƏTİCƏ:</span>
                        <code>{ticket.problem2.officialSolution.finalAnswer}</code>
                      </div>
                    )}

                    <div className="self-score-picker">
                      <span className="picker-label">Bu misal üzrə balınızı seçin (0 - 3 bal):</span>
                      <div className="pts-buttons-row">
                        {[0, 1, 2, 3].map((pts) => (
                          <button
                            key={pts}
                            type="button"
                            className={`pt-select-btn ${prob2SelfScore === pts ? 'active' : ''}`}
                            onClick={() => setProb2SelfScore(pts)}
                          >
                            {pts} Bal
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Bottom Action Footer */}
          <div className="ticket-bottom-bar">
            {stage === 'solving' ? (
              <button
                type="button"
                className="submit-ticket-btn"
                onClick={handleFinishAndReview}
              >
                <Send size={16} />
                <span>Bileti Tamamla və Rəsmi Meyarları Gör</span>
              </button>
            ) : (
              <div className="review-summary-box">
                <div className="summary-score-col">
                  <span className="sum-label">BİLET ÜZRƏ YEKUN NƏTİCƏNİZ:</span>
                  <div className="sum-score-display">
                    <span className="score-num">{totalCalculatedSelfScore}</span>
                    <span className="score-max">/ 10 Bal</span>
                    <span className="score-badge">
                      {totalCalculatedSelfScore >= 8
                        ? 'Əla Nəticə (A)'
                        : totalCalculatedSelfScore >= 6
                        ? 'Yaxşı (B/C)'
                        : 'Təkrar Məşq Tövsiyə Edilir'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="next-spin-btn"
                  onClick={handleStartSpin}
                >
                  <Sparkles size={16} />
                  <span>Növbəti Bilet Çək (Püşk At)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
