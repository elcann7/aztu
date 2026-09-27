import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, FlaskConical, MessageCircle } from 'lucide-react';
import { MATH_LESSONS } from '../../data/mathLessons';
import { useAuth } from '../../context/AuthContext';
import { MathPractice } from './MathPractice';
import { MathTutorChat } from './MathTutorChat';
import { MathProofChallenge } from './MathProofChallenge';
import { MathLessonLab } from './MathLabs';
import { PhysicsPdfViewer } from './PhysicsPdfViewer';
import { StudyNotesList } from './StudyNoteCard';
import './MathLearning.css';

type LessonSection = 'rules' | 'practice' | 'lab' | 'chat';

const sections = [
  { id: 'rules', label: '0-dan Qaydalar & PDF', icon: BookOpen },
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

  if (!lesson)
    return (
      <div className="math-learning" ref={topRef}>
        <div className="math-learning-intro">
          <span className="math-eyebrow">Riyazi analiz - 1 · 0-dan Öyrənən Tələbə Üçün Ali Riyaziyyat</span>
          <h2>Universitet Proqramı — Sadə Dillə Məntiq, İşarələrin İzahı, Addımlar və Nümunələr</h2>
          <p>
            Mövzunu ilk dəfə görən tələbə üçün hər bir teorem və düstur 0-dan izah olunub: əvvəlcə sadə məntiq, sonra
            düsturdakı hər bir simvolun (∀, ∃, sup, inf, ε, δ, N) mənası, həll alqoritmi və nümunə.
          </p>
          <small>
            Müəllimlər: Dos. Nizami Şıxəliyev (mühazirə) · Müəl. Şamil Talıblı (məşğələ) · AzTU 6326A2 qrupu üçün universitet proqramına uyğun tərtib edilmişdir.
          </small>
        </div>
        <div className="math-lesson-list" aria-label="Riyazi analiz mühazirələri">
          {MATH_LESSONS.map((item, index) => (
            <button key={item.id} type="button" className="math-lesson-card" onClick={() => openLesson(item.id)}>
              <span className="math-lesson-card-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="math-lesson-card-content">
                <span className="math-lesson-card-kicker">
                  Mühazirə {index + 1} · {item.duration} · {item.rules.length} hissə
                </span>
                <strong>{item.title}</strong>
                <span className="math-lesson-card-summary">{item.subtitle}</span>
                <span className="math-lesson-card-tools">
                  0-dan İzah <span>·</span> İşarələr Lüğəti <span>·</span> Daxili PDF <span>·</span> Test & İsbat
                </span>
              </span>
              <ArrowRight className="math-lesson-card-arrow" size={19} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    );

  const studySections = lesson.rules.map((rule) => ({
    heading: rule.title,
    intuition: rule.intuition,
    body: rule.explanation,
    formulaOrCode: rule.formula,
    symbols: rule.symbols,
    steps: rule.steps,
    example: rule.example,
    warning: rule.warning,
  }));

  return (
    <div className="math-learning" ref={topRef}>
      <button type="button" className="math-back-button" onClick={showLessonList}>
        <ArrowLeft size={15} aria-hidden="true" /> Bütün mühazirələr
      </button>
      <div className="math-lesson-detail-header">
        <span className="math-eyebrow">
          Mühazirə {lessonIndex + 1} · {lesson.duration} · 0-dan Öyrədən Bələdçi
        </span>
        <h2>{lesson.title}</h2>
        <p>{lesson.subtitle}</p>
        <div className="math-goals">
          {lesson.goals.map((goal) => (
            <span key={goal}>✓ {goal}</span>
          ))}
        </div>
      </div>
      <nav className="math-section-nav" aria-label="Mühazirə bölmələri" ref={sectionRef}>
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={section === item.id ? 'active' : ''}
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => openSection(item.id)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="math-lesson-panel" key={lesson.id}>
        <div className="math-lesson" style={{ display: section === 'rules' ? undefined : 'none' }}>
          <section aria-labelledby={`rules-${lesson.id}`}>
            <div className="math-section-heading" style={{ marginBottom: '0.85rem' }}>
              <div>
                <span className="math-eyebrow">0-dan Öyrənən Tələbə Üçün</span>
                <h3 id={`rules-${lesson.id}`}>Mövzunun Addım-Addım İzahı, Düsturlar və Nümunələr</h3>
              </div>
            </div>
            <StudyNotesList sections={studySections} materialTitle={lesson.title} />
          </section>
          <section className="math-worked" aria-labelledby={`worked-${lesson.id}`}>
            <span className="math-eyebrow">Birlikdə Həll Edək</span>
            <h3 id={`worked-${lesson.id}`}>Addım-addım işlənmiş yekun məsələ</h3>
            <p className="math-worked-prompt">{lesson.workedExample.prompt}</p>
            <ol>
              {lesson.workedExample.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="math-conclusion">{lesson.workedExample.conclusion}</p>
          </section>
          <aside className="math-mistake">
            <strong>⚠️ Kollokviumda ən çox edilən səhv</strong>
            <p>{lesson.commonMistake}</p>
          </aside>
          {lesson.pdfUrl && (
            <section style={{ marginTop: 18 }}>
              <PhysicsPdfViewer url={lesson.pdfUrl} title={`${lesson.title} — PDF Konspekt`} />
            </section>
          )}
          <button type="button" className="math-primary-button math-next-step" onClick={() => openSection('practice')}>
            Praktikaya keç <ArrowRight size={15} aria-hidden="true" />
          </button>
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
        <div style={{ display: section === 'chat' ? undefined : 'none' }}>
          <MathTutorChat lesson={lesson} userId={user?.id} />
        </div>
      </div>
      <div className="math-lesson-footer">
        <button type="button" className="math-back-button" onClick={showLessonList}>
          Bütün mühazirələrə qayıt
        </button>
        {MATH_LESSONS[lessonIndex + 1] && (
          <button
            type="button"
            className="math-back-button"
            onClick={() => openLesson(MATH_LESSONS[lessonIndex + 1].id)}
          >
            Növbəti mühazirə <ArrowRight size={15} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
