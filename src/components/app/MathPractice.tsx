import { useState } from 'react';
import type { MathLesson } from '../../data/mathLessons';
import './MathLearning.css';

interface MathPracticeProps {
  lesson: MathLesson;
  userId?: string;
}

const readBest = (key: string) => {
  try {
    return Number(localStorage.getItem(key) || 0);
  } catch {
    return 0;
  }
};

export const MathPractice = ({ lesson, userId }: MathPracticeProps) => {
  const storageKey = `aztu_math_best_v1_${userId || 'guest'}_${lesson.id}`;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [best, setBest] = useState(() => readBest(storageKey));
  const score = lesson.questions.filter((question) => answers[question.id] === question.correct).length;
  const allAnswered = lesson.questions.every((question) => answers[question.id] !== undefined);

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    if (score > best) {
      setBest(score);
      try { localStorage.setItem(storageKey, String(score)); } catch { /* Browsers can block storage. */ }
    }
  };

  return <section className="math-practice" aria-labelledby={`practice-${lesson.id}`}>
    <div className="math-section-heading">
      <div><span className="math-eyebrow">Özünü yoxla</span><h3 id={`practice-${lesson.id}`}>Mövzu praktikası</h3></div>
      <span className="math-score-chip">Ən yaxşı nəticə: {best}/{lesson.questions.length}</span>
    </div>
    <p className="math-muted">Cavabları seç, sonra nəticəni və hər sualın izahını gör.</p>
    <div className="math-question-list">
      {lesson.questions.map((question, index) => <fieldset className="math-question" key={question.id}>
        <legend>{index + 1}. {question.prompt}</legend>
        <div className="math-choices">
          {question.choices.map((choice, choiceIndex) => <label key={choiceIndex}
            className={`math-choice ${submitted && choiceIndex === question.correct ? 'correct' : ''} ${submitted && answers[question.id] === choiceIndex && choiceIndex !== question.correct ? 'incorrect' : ''}`}>
            <input type="radio" name={`${lesson.id}-${question.id}`} checked={answers[question.id] === choiceIndex}
              disabled={submitted} onChange={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))} />
            <span>{choice}</span>
          </label>)}
        </div>
        {submitted && <p className="math-answer-note">{answers[question.id] === question.correct ? '✓ Doğru. ' : 'Düzgün cavab: ' + question.choices[question.correct] + '. '}{question.explanation}</p>}
      </fieldset>)}
    </div>
    <div className="math-practice-footer">
      {submitted ? <>
        <strong role="status">Nəticə: {score}/{lesson.questions.length}</strong>
        <button type="button" className="math-secondary-button" onClick={() => { setAnswers({}); setSubmitted(false); }}>Yenidən yoxla</button>
      </> : <button type="button" className="math-primary-button" disabled={!allAnswered} onClick={submit}>
        Cavabları yoxla ({Object.keys(answers).length}/{lesson.questions.length})
      </button>}
    </div>
  </section>;
};
