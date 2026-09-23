import { useState } from 'react';
import { MATH_LESSONS } from '../../data/mathLessons';
import { useAuth } from '../../context/AuthContext';
import { MathPractice } from './MathPractice';
import { MathTutorChat } from './MathTutorChat';
import { MathProofChallenge } from './MathProofChallenge';
import { MathLabs } from './MathLabs';
import './MathLearning.css';

export const MathLearningView = ({ mode }: { mode: 'lessons' | 'labs' }) => {
  const [activeId, setActiveId] = useState(MATH_LESSONS[0].id);
  const { user } = useAuth();
  const lesson = MATH_LESSONS.find((item) => item.id === activeId) || MATH_LESSONS[0];
  if (mode === 'labs') return <MathLabs />;

  return <div className="math-learning">
    <div className="math-learning-intro">
      <span className="math-eyebrow">Riyazi analiz · başlanğıc mövzular</span>
      <h2>Mühazirə qaydaları və praktika</h2>
      <p>Çoxluqlar və həqiqi ədədlər üzrə universitet səviyyəsində təriflər, işlənmiş nümunələr və özünü yoxlama.</p>
      <small>Bu, tələbənin bildirdiyi mövzulara əsaslanan köməkçi xülasədir; müəllimin rəsmi konspekti deyil.</small>
    </div>
    <div className="math-lesson-nav" role="tablist" aria-label="Riyaziyyat mühazirələri">
      {MATH_LESSONS.map((item, index) => <button key={item.id} type="button" role="tab"
        aria-selected={item.id === lesson.id} className={item.id === lesson.id ? 'active' : ''}
        onClick={() => setActiveId(item.id)}>
        <span>Mühazirə {index + 1} · {item.duration}</span><strong>{item.title}</strong>
      </button>)}
    </div>
    <article className="math-lesson" role="tabpanel" aria-label={lesson.title} key={lesson.id}>
      <header className="math-lesson-header"><span className="math-eyebrow">{lesson.subtitle}</span><h2>{lesson.title}</h2>
        <div className="math-goals">{lesson.goals.map((goal) => <span key={goal}>✓ {goal}</span>)}</div></header>
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
      <MathPractice key={lesson.id} lesson={lesson} userId={user?.id} />
      <MathProofChallenge key={`proof-${lesson.id}`} lesson={lesson} />
      <MathTutorChat key={`chat-${lesson.id}`} lesson={lesson} userId={user?.id} />
      <p className="math-source">Əlavə oxu: <a href="https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/pages/lecture-notes-and-readings/" target="_blank" rel="noopener noreferrer">MIT OpenCourseWare · Real Analysis mühazirələri</a></p>
    </article>
  </div>;
};
