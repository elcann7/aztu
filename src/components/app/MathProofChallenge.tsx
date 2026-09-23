import { useState } from 'react';
import type { MathLesson } from '../../data/mathLessons';
import './MathLearning.css';

export const MathProofChallenge = ({ lesson }: { lesson: MathLesson }) => {
  const [attempt, setAttempt] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  return <section className="math-proof" aria-labelledby={`proof-${lesson.id}`}>
    <div className="math-section-heading"><div><span className="math-eyebrow">İsbat məşqi</span>
      <h3 id={`proof-${lesson.id}`}>Öz arqumentini qur</h3></div></div>
    <p>{lesson.proofTask.prompt}</p>
    <label htmlFor={`proof-attempt-${lesson.id}`}>Həll cəhdin</label>
    <textarea id={`proof-attempt-${lesson.id}`} value={attempt} rows={4}
      onChange={(event) => setAttempt(event.target.value)} placeholder="İlk addımı, istifadə etdiyin tərifi və nəticəni yaz..." />
    <div className="math-proof-actions">
      <button type="button" className="math-secondary-button" onClick={() => setShowHint((value) => !value)}>{showHint ? 'İpucunu gizlət' : 'İpucu göstər'}</button>
      <button type="button" className="math-secondary-button" disabled={attempt.trim().length < 10} onClick={() => setShowSolution(true)}>Həll ilə müqayisə et</button>
    </div>
    {showHint && <p className="math-hint">{lesson.proofTask.hint}</p>}
    {showSolution && <div className="math-proof-solution"><strong>Nümunə həll</strong><ol>{lesson.proofTask.solution.map((step) => <li key={step}>{step}</li>)}</ol>
      <p>İsbatının fərqli yolu varsa, aşağıdakı AI köməkçidən məhz bu mühazirə daxilində yoxlamasını istəyə bilərsən.</p></div>}
  </section>;
};
