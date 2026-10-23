import React, { useState, useEffect, useRef, useMemo } from 'react';
import './ColloquiumDrawView.css';
import { TeXFormula } from '../../common/TeXFormula';
import {
  Sparkles,
  Timer,
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Zap,
  RotateCcw,
} from 'lucide-react';
import type { ColloquiumQuestion, ColloquiumTicket } from '../../../data/colloquiumQuestions';
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

const DRUM_ITEM_HEIGHT = 54;
const TOTAL_DRUM_STEPS = 18;

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

  // Drum items arrays for mechanical spinning
  const [drum1Items, setDrum1Items] = useState<string[]>([]);
  const [drum2Items, setDrum2Items] = useState<string[]>([]);
  const [drum3Items, setDrum3Items] = useState<string[]>([]);

  // Drum offsets
  const [drum1Offset, setDrum1Offset] = useState<number>(0);
  const [drum2Offset, setDrum2Offset] = useState<number>(0);
  const [drum3Offset, setDrum3Offset] = useState<number>(0);

  // Transition durations
  const [drum1Duration, setDrum1Duration] = useState<number>(0);
  const [drum2Duration, setDrum2Duration] = useState<number>(0);
  const [drum3Duration, setDrum3Duration] = useState<number>(0);

  // Reel locked states
  const [reel1Locked, setReel1Locked] = useState(false);
  const [reel2Locked, setReel2Locked] = useState(false);
  const [reel3Locked, setReel3Locked] = useState(false);

  // 45-min Real Exam Timer
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const tickIntervalRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Pools for current course
  const courseQuestions = useMemo<ColloquiumQuestion[]>(() => {
    return COLLOQUIUM_QUESTIONS.filter((q: ColloquiumQuestion) => q.courseSlug === selectedCourse);
  }, [selectedCourse]);

  const theoryTopics = useMemo<string[]>(() => {
    return courseQuestions.filter((q: ColloquiumQuestion) => q.type === 'open_theory').map((q: ColloquiumQuestion) => q.topic);
  }, [courseQuestions]);

  const problemTopics = useMemo<string[]>(() => {
    return courseQuestions.filter((q: ColloquiumQuestion) => q.type === 'practical_problem').map((q: ColloquiumQuestion) => q.topic);
  }, [courseQuestions]);

  // Initialize drums when course changes
  useEffect(() => {
    const d1 = theoryTopics.length > 0 ? theoryTopics[0] : 'Veyerştras Teoremi';
    const d2 = problemTopics.length > 0 ? problemTopics[0] : 'Triqonometrik Limit';
    const d3 = problemTopics.length > 1 ? problemTopics[1] : (problemTopics[0] || 'İkinci Görkəmli Limit');

    setDrum1Items([d1]);
    setDrum2Items([d2]);
    setDrum3Items([d3]);
    setDrum1Offset(0);
    setDrum2Offset(0);
    setDrum3Offset(0);
    setDrum1Duration(0);
    setDrum2Duration(0);
    setDrum3Duration(0);
    setReel1Locked(false);
    setReel2Locked(false);
    setReel3Locked(false);
  }, [selectedCourse, theoryTopics, problemTopics]);

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

  const clearTimers = () => {
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Start Spin / Roulette Draw Animation (True mechanical unprompted.cool style)
  const handleStartSpin = () => {
    clearTimers();
    setStage('spinning');
    setReel1Locked(false);
    setReel2Locked(false);
    setReel3Locked(false);

    // 1. Pick destination ticket
    const drawn = drawColloquiumTicket(selectedCourse);
    setTicket(drawn);
    setTheoryAnswer('');
    setProb1Answer('');
    setProb2Answer('');

    // 2. Generate randomized ribbon strips with 18 distinct items ending at target
    const target1 = drawn.theoryQuestion.topic;
    const target2 = drawn.problem1.topic;
    const target3 = drawn.problem2.topic;

    const buildStrip = (pool: string[], finalItem: string) => {
      const strip: string[] = [];
      const safePool = pool.length > 0 ? pool : [finalItem];
      for (let i = 0; i < TOTAL_DRUM_STEPS - 1; i++) {
        const item = safePool[i % safePool.length] || safePool[0];
        strip.push(item);
      }
      strip.push(finalItem);
      return strip;
    };

    const strip1 = buildStrip(theoryTopics, target1);
    const strip2 = buildStrip(problemTopics, target2);
    const strip3 = buildStrip(problemTopics, target3);

    // Reset offsets without animation first
    setDrum1Duration(0);
    setDrum2Duration(0);
    setDrum3Duration(0);
    setDrum1Offset(0);
    setDrum2Offset(0);
    setDrum3Offset(0);
    setDrum1Items(strip1);
    setDrum2Items(strip2);
    setDrum3Items(strip3);

    // Audio ticking loop
    let tickCount = 0;
    tickIntervalRef.current = window.setInterval(() => {
      tickCount++;
      playTickSound(1.0 + (tickCount % 5) * 0.05);
      if (tickCount > 24) {
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      }
    }, 70);

    // Trigger smooth physics roll on next animation frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const finalPixel = (TOTAL_DRUM_STEPS - 1) * DRUM_ITEM_HEIGHT;

        // Reel 1: 1.0s duration
        setDrum1Duration(1.0);
        setDrum1Offset(finalPixel);

        // Reel 2: 1.4s duration
        setDrum2Duration(1.4);
        setDrum2Offset(finalPixel);

        // Reel 3: 1.8s duration
        setDrum3Duration(1.8);
        setDrum3Offset(finalPixel);
      });
    });

    // Sequence mechanical locks with realistic clacks
    // 1. Reel 1 lands at 1.0s
    const t1 = window.setTimeout(() => {
      setReel1Locked(true);
      playReelLockSound();
    }, 1000);

    // 2. Reel 2 lands at 1.4s
    const t2 = window.setTimeout(() => {
      setReel2Locked(true);
      playReelLockSound();
    }, 1400);

    // 3. Reel 3 lands at 1.8s
    const t3 = window.setTimeout(() => {
      setReel3Locked(true);
      playTicketCompleteSound();
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    }, 1800);

    // 4. Smoothly transition to solving view at 2.15s (only 350ms pause, zero lag!)
    const t4 = window.setTimeout(() => {
      setStage('solving');
      if (examMode === 'real') {
        setTimeLeft(45 * 60);
        setIsTimerRunning(true);
      }
    }, 2150);

    timeoutsRef.current = [t1, t2, t3, t4];
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
            unprompted.cool mexaniki çarxı ilə 3 təsadüfi sual (1 açıq nəzəriyyə + 2 misal) çəkin,
            özünüzü sınaqdan keçirin və rəsmi meyarlarla yoxlayın.
          </p>
        </div>

        <div className="header-controls-col">
          {/* Exam Mode Toggle */}
          <div className="exam-mode-pills" role="radiogroup" aria-label="İmtahan rejimi">
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
      {/* 3. CENTRAL STAGE (MECHANICAL SLOT MACHINE DRUM) */}
      {/* ========================================================================= */}
      {(stage === 'idle' || stage === 'spinning') && (
        <div className="draw-stage-container">
          <div className="stage-atmosphere" aria-hidden="true" />

          <div className="stage-status-badge">
            {stage === 'spinning' ? (
              <span className="badge-drawing">PÜŞK ATILIR... MEXANİKİ ÇIXQILTI İLƏ BİLET SEÇİLİR</span>
            ) : (
              <span className="badge-ready">PÜŞKATMAYA HAZIRDIR · 3 SUALLIQ RƏSMİ BİLET (10 BAL)</span>
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
                <div className="slot-drum-viewport">
                  <div
                    className="slot-drum-strip"
                    style={{
                      transform: `translateY(-${drum1Offset}px)`,
                      transition: drum1Duration > 0 ? `transform ${drum1Duration}s cubic-bezier(0.12, 0.85, 0.25, 1)` : 'none',
                    }}
                  >
                    {drum1Items.map((item, idx) => (
                      <div key={idx} className="slot-drum-item" title={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
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
                <div className="slot-drum-viewport">
                  <div
                    className="slot-drum-strip"
                    style={{
                      transform: `translateY(-${drum2Offset}px)`,
                      transition: drum2Duration > 0 ? `transform ${drum2Duration}s cubic-bezier(0.12, 0.85, 0.25, 1)` : 'none',
                    }}
                  >
                    {drum2Items.map((item, idx) => (
                      <div key={idx} className="slot-drum-item" title={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
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
                <div className="slot-drum-viewport">
                  <div
                    className="slot-drum-strip"
                    style={{
                      transform: `translateY(-${drum3Offset}px)`,
                      transition: drum3Duration > 0 ? `transform ${drum3Duration}s cubic-bezier(0.12, 0.85, 0.25, 1)` : 'none',
                    }}
                  >
                    {drum3Items.map((item, idx) => (
                      <div key={idx} className="slot-drum-item" title={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
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
              <span>{stage === 'spinning' ? 'Püşk Atılır...' : 'Bilet Çək (Püşk At)'}</span>
            </button>
            <p className="spin-hint-text">
              Düyməni sıxdıqda unprompted.cool mexaniki səsləri ilə 1 açıq nəzəriyyə və 2 misal avtomatik təsadüfi püşklənəcək.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ACTIVE SOLVING OR REVIEW STAGE */}
      {/* ========================================================================= */}
      {(stage === 'solving' || stage === 'reviewed') && ticket && (
        <div className="active-ticket-wrapper">
          {/* Ticket Header Banner */}
          <div className="ticket-top-banner">
            <div className="ticket-meta-left">
              <span className="ticket-badge-pill">{ticket.ticketNumber} · RƏSMİ BİLET</span>
              <h2 className="ticket-course-title">{ticket.courseName} Kolloqvium İmtahanı</h2>
              <span className="ticket-time-drawn">Püşk atılma vaxtı: {ticket.drawnAt}</span>
            </div>

            <div className="ticket-meta-right">
              {examMode === 'real' && (
                <div className={`live-timer-chip ${timeLeft < 300 ? 'is-warning' : ''}`}>
                  <Timer size={16} />
                  <span>Qalan Vaxt: {formatTimer(timeLeft)}</span>
                </div>
              )}

              <button
                type="button"
                className="btn-spin-again"
                onClick={handleStartSpin}
                title="Bileti dəyişdir"
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
                  <TeXFormula tex={ticket.theoryQuestion.formulaTeX} />
                </div>
              )}

              {/* Rubric Mini Box */}
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
            </div>

            {/* Official Solution Card (Visible in Review Stage) */}
            {stage === 'reviewed' && (
              <div className="official-review-block">
                <button
                  type="button"
                  className="toggle-solution-btn"
                  onClick={() => toggleSolution('theory')}
                >
                  <span>Rəsmi Dərslik İzahı və Meyar Rubrikası</span>
                  {expandedSolutions.theory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expandedSolutions.theory && (
                  <div className="solution-inner-body">
                    <h4 className="solution-title">{ticket.theoryQuestion.officialSolution.title}</h4>
                    <ol className="solution-steps-list">
                      {ticket.theoryQuestion.officialSolution.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                    <div className="solution-takeaway">
                      <strong>Əsas Qızıl Qayda:</strong> {ticket.theoryQuestion.officialSolution.keyTakeaway}
                    </div>

                    {/* Self Score Selector */}
                    <div className="self-score-picker">
                      <span className="picker-label">Bu sual üzrə balınızı seçin (0 - 4 bal):</span>
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
                <span className="q-number-tag">SUAL 2 · PRAKTİKİ MİSAL 1</span>
                <span className="q-score-tag">3.0 Bal</span>
              </div>
              <h3 className="q-title">{ticket.problem1.title}</h3>
              <p className="q-desc-text">{ticket.problem1.question}</p>

              {ticket.problem1.formulaTeX && (
                <div className="formula-preview-box">
                  <span className="formula-label">HƏLL TƏLƏB OLUNAN İFADƏ:</span>
                  <TeXFormula tex={ticket.problem1.formulaTeX} />
                </div>
              )}

              <div className="rubric-mini-box">
                <span className="rubric-header">
                  <Award size={13} />
                  Qiymətləndirmə Meyarları:
                </span>
                <ul className="rubric-list">
                  {ticket.problem1.rubric.map((r, i) => (
                    <li key={i}>
                      <span>{r.criterion}</span>
                      <strong className="r-pts">+{r.points} bal</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="q-answer-area">
              <label htmlFor="prob1-input" className="input-label">
                <FileText size={14} />
                Misalın Addım-Addım Həlli və Yekun Nəticəsi:
              </label>
              <textarea
                id="prob1-input"
                className="student-textarea"
                rows={5}
                value={prob1Answer}
                onChange={(e) => setProb1Answer(e.target.value)}
                placeholder={ticket.problem1.inputPlaceholder}
                disabled={stage === 'reviewed'}
              />
            </div>

            {stage === 'reviewed' && (
              <div className="official-review-block">
                <button
                  type="button"
                  className="toggle-solution-btn"
                  onClick={() => toggleSolution('prob1')}
                >
                  <span>Düzgün Həll Yolu və Yekun Cavab</span>
                  {expandedSolutions.prob1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expandedSolutions.prob1 && (
                  <div className="solution-inner-body">
                    <h4 className="solution-title">{ticket.problem1.officialSolution.title}</h4>
                    <ol className="solution-steps-list">
                      {ticket.problem1.officialSolution.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                    {ticket.problem1.officialSolution.finalAnswer && (
                      <div className="final-answer-chip">
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
                <span className="q-number-tag">SUAL 3 · PRAKTİKİ MİSAL 2</span>
                <span className="q-score-tag">3.0 Bal</span>
              </div>
              <h3 className="q-title">{ticket.problem2.title}</h3>
              <p className="q-desc-text">{ticket.problem2.question}</p>

              {ticket.problem2.formulaTeX && (
                <div className="formula-preview-box">
                  <span className="formula-label">HƏLL TƏLƏB OLUNAN İFADƏ:</span>
                  <TeXFormula tex={ticket.problem2.formulaTeX} />
                </div>
              )}

              <div className="rubric-mini-box">
                <span className="rubric-header">
                  <Award size={13} />
                  Qiymətləndirmə Meyarları:
                </span>
                <ul className="rubric-list">
                  {ticket.problem2.rubric.map((r, i) => (
                    <li key={i}>
                      <span>{r.criterion}</span>
                      <strong className="r-pts">+{r.points} bal</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="q-answer-area">
              <label htmlFor="prob2-input" className="input-label">
                <FileText size={14} />
                Misalın Addım-Addım Həlli və Yekun Nəticəsi:
              </label>
              <textarea
                id="prob2-input"
                className="student-textarea"
                rows={5}
                value={prob2Answer}
                onChange={(e) => setProb2Answer(e.target.value)}
                placeholder={ticket.problem2.inputPlaceholder}
                disabled={stage === 'reviewed'}
              />
            </div>

            {stage === 'reviewed' && (
              <div className="official-review-block">
                <button
                  type="button"
                  className="toggle-solution-btn"
                  onClick={() => toggleSolution('prob2')}
                >
                  <span>Düzgün Həll Yolu və Yekun Cavab</span>
                  {expandedSolutions.prob2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expandedSolutions.prob2 && (
                  <div className="solution-inner-body">
                    <h4 className="solution-title">{ticket.problem2.officialSolution.title}</h4>
                    <ol className="solution-steps-list">
                      {ticket.problem2.officialSolution.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                    {ticket.problem2.officialSolution.finalAnswer && (
                      <div className="final-answer-chip">
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
