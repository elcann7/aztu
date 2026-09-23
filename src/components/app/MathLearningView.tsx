import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, FlaskConical, MessageCircle } from 'lucide-react';
import { MATH_LESSONS } from '../../data/mathLessons';
import { useAuth } from '../../context/AuthContext';
import { MathPractice } from './MathPractice';
import { MathTutorChat } from './MathTutorChat';
import { MathProofChallenge } from './MathProofChallenge';
import { MathLessonLab } from './MathLabs';
import './MathLearning.css';

type LessonSection = 'rules' | 'practice' | 'lab' | 'chat';

const sections = [
  { id: 'rules', label: 'Qaydalar', icon: BookOpen },
  { id: 'practice', label: 'Praktika', icon: ClipboardCheck },
  { id: 'lab', label: 'Laboratoriya', icon: FlaskConical },
  { id: 'chat', label: 'AI köməkçi', icon: MessageCircle },
] as const;

export const MathLearningView = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [section, setSection] = useState<LessonSection>('rules');
  const { user } = useAuth();
  const lessonIndex = MATH_LESSONS.findIndex((item) => item.id === activeId);
  const lesson = lessonIndex >= 0 ? MATH_LESSONS[lessonIndex] : null;
  const scrollTo = (getElement: () => HTMLElement | null) => {
    requestAnimationFrame(() => getElement()?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const openLesson = (id: string) => {
    setActiveId(id);
    setSection('rules');
    scrollTo(() => topRef.current);
  };
  const showLessonList = () => {
    setActiveId(null);
    scrollTo(() => topRef.current);
  };
  const openSection = (next: LessonSection) => {
    setSection(next);
    scrollTo(() => sectionRef.current);
  };

  if (!lesson) return <div className="math-learning" ref={topRef}>
    <div className="math-learning-intro">
      <span className="math-eyebrow">Riyazi analiz · dərslər</span>
      <h2>Mühazirəni seç</h2>
      <p>Mövzunu seç; qaydalar, test, laboratoriya və AI köməkçi bir yerdədir.</p>
      <small>Mövzular qrupdan bildirilən məlumata əsaslanır, müəllimin rəsmi konspekti deyil. Yeni dərslər keçildikcə əlavə olunacaq.</small>
    </div>
    <div className="math-lesson-list" aria-label="Riyazi analiz mühazirələri">
      {MATH_LESSONS.map((item, index) => <button key={item.id} type="button" className="math-lesson-card" onClick={() => openLesson(item.id)}>
        <span className="math-lesson-card-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="math-lesson-card-content">
          <span className="math-lesson-card-kicker">Mühazirə {index + 1} · {item.duration}</span>
          <strong>{item.title}</strong>
          <span className="math-lesson-card-summary">{item.subtitle}</span>
          <span className="math-lesson-card-tools">Qaydalar <span>·</span> Test <span>·</span> Laboratoriya <span>·</span> AI</span>
        </span>
        <ArrowRight className="math-lesson-card-arrow" size={19} aria-hidden="true" />
      </button>)}
    </div>
  </div>;

  return <div className="math-learning" ref={topRef}>
    <button type="button" className="math-back-button" onClick={showLessonList}>
      <ArrowLeft size={15} aria-hidden="true" /> Bütün mühazirələr
    </button>
    <div className="math-lesson-detail-header">
      <span className="math-eyebrow">Mühazirə {lessonIndex + 1} · {lesson.duration}</span>
      <h2>{lesson.title}</h2>
      <p>{lesson.subtitle}</p>
      <div className="math-goals">{lesson.goals.map((goal) => <span key={goal}>✓ {goal}</span>)}</div>
    </div>
    <nav className="math-section-nav" aria-label="Mühazirə bölmələri" ref={sectionRef}>
      {sections.map((item) => {
        const Icon = item.icon;
        return <button key={item.id} type="button" className={section === item.id ? 'active' : ''}
          aria-current={section === item.id ? 'page' : undefined} onClick={() => openSection(item.id)}>
          <Icon size={16} aria-hidden="true" /><span>{item.label}</span>
        </button>;
      })}
    </nav>
    <div className="math-lesson-panel" key={lesson.id}>
      <div className="math-lesson" style={{ display: section === 'rules' ? undefined : 'none' }}>
        <section aria-labelledby={`rules-${lesson.id}`}>
          <div className="math-section-heading"><div><span className="math-eyebrow">Qaydalar</span><h3 id={`rules-${lesson.id}`}>Bilməli olduğun əsaslar</h3></div></div>
          <div className="math-rule-list">{lesson.rules.map((rule, index) => <div className="math-rule" key={rule.title}>
            <span className="math-rule-index">{String(index + 1).padStart(2, '0')}</span>
            <div><h4>{rule.title}</h4><p>{rule.explanation}</p>
              {rule.formula && <div className="math-formula">{rule.formula}</div>}
              {rule.example && <p className="math-rule-example"><strong>Nümunə:</strong> {rule.example}</p>}</div>
          </div>)}</div>
        </section>
        <section className="math-worked" aria-labelledby={`worked-${lesson.id}`}>
          <span className="math-eyebrow">Addım-addım</span><h3 id={`worked-${lesson.id}`}>İşlənmiş nümunə</h3>
          <p className="math-worked-prompt">{lesson.workedExample.prompt}</p>
          <ol>{lesson.workedExample.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="math-conclusion">{lesson.workedExample.conclusion}</p>
        </section>
        <aside className="math-mistake"><strong>Diqqət ediləsi səhv</strong><p>{lesson.commonMistake}</p></aside>
        <button type="button" className="math-primary-button math-next-step" onClick={() => openSection('practice')}>
          Praktikaya keç <ArrowRight size={15} aria-hidden="true" />
        </button>
        <p className="math-source">Əlavə oxu: <a href="https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/pages/lecture-notes-and-readings/" target="_blank" rel="noopener noreferrer">MIT OpenCourseWare · Real Analysis mühazirələri</a></p>
      </div>
      <div className="math-lesson" style={{ display: section === 'practice' ? undefined : 'none' }}>
        <MathPractice lesson={lesson} userId={user?.id} />
        <MathProofChallenge lesson={lesson} />
        <button type="button" className="math-primary-button math-next-step" onClick={() => openSection('lab')}>
          Laboratoriyaya keç <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      <div className="math-lesson" style={{ display: section === 'lab' ? undefined : 'none' }}>
        <MathLessonLab lessonId={lesson.id} />
        <button type="button" className="math-primary-button math-next-step" onClick={() => openSection('chat')}>
          AI köməkçiyə keç <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      <div style={{ display: section === 'chat' ? undefined : 'none' }}><MathTutorChat lesson={lesson} userId={user?.id} /></div>
    </div>
    <div className="math-lesson-footer">
      <button type="button" className="math-back-button" onClick={showLessonList}>Bütün mühazirələrə qayıt</button>
      {MATH_LESSONS[lessonIndex + 1] && <button type="button" className="math-back-button" onClick={() => openLesson(MATH_LESSONS[lessonIndex + 1].id)}>
        Növbəti mühazirə <ArrowRight size={15} aria-hidden="true" />
      </button>}
    </div>
  </div>;
};
