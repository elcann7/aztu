import { useState } from 'react';
import './MathLearning.css';

type Operation = 'union' | 'intersection' | 'difference' | 'complement';
type Preset = 'open' | 'closed' | 'sequence';

const universe = [1, 2, 3, 4, 5, 6, 7, 8];
const initialA = [1, 2, 4, 6];
const initialB = [2, 3, 6, 8];

const formatSet = (items: number[]) => items.length ? `{${items.join(', ')}}` : '∅';

const VennLab = () => {
  const [setA, setSetA] = useState(initialA);
  const [setB, setSetB] = useState(initialB);
  const [operation, setOperation] = useState<Operation>('intersection');
  const toggle = (value: number, target: 'A' | 'B') => {
    const current = target === 'A' ? setA : setB;
    const setter = target === 'A' ? setSetA : setSetB;
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value].sort((a, b) => a - b));
  };
  const result = universe.filter((value) => {
    const inA = setA.includes(value);
    const inB = setB.includes(value);
    return operation === 'union' ? inA || inB : operation === 'intersection' ? inA && inB
      : operation === 'difference' ? inA && !inB : !inA;
  });
  const onlyA = setA.filter((value) => !setB.includes(value));
  const both = setA.filter((value) => setB.includes(value));
  const onlyB = setB.filter((value) => !setA.includes(value));
  const neither = universe.filter((value) => !setA.includes(value) && !setB.includes(value));
  const symbols: Record<Operation, string> = { union: 'A ∪ B', intersection: 'A ∩ B', difference: 'A ∖ B', complement: 'Aᶜ' };

  return <section className="math-lab-card">
    <div className="math-section-heading"><div><span className="math-eyebrow">Laboratoriya 01</span><h3>Çoxluq emalatxanası</h3></div></div>
    <p>U={formatSet(universe)}. Hər ədədin A və B-yə daxil olmasını dəyiş, əməliyyatın nəticəsini izlə.</p>
    <div className="math-lab-controls"><label>Əməliyyat <select value={operation} onChange={(event) => setOperation(event.target.value as Operation)}>
      <option value="union">A ∪ B — birləşmə</option><option value="intersection">A ∩ B — kəsişmə</option>
      <option value="difference">A ∖ B — fərq</option><option value="complement">Aᶜ — tamamlayıcı</option>
    </select></label></div>
    <div className="math-venn-layout">
      <svg viewBox="0 0 400 210" role="img" aria-label={`Ven diaqramı: yalnız A ${formatSet(onlyA)}, hər ikisi ${formatSet(both)}, yalnız B ${formatSet(onlyB)}, kənarda ${formatSet(neither)}`}>
        <rect x="1" y="1" width="398" height="208" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <circle cx="153" cy="103" r="75" fill="#bfdbfe" fillOpacity=".72" stroke="#2563eb" strokeWidth="2" />
        <circle cx="237" cy="103" r="75" fill="#bbf7d0" fillOpacity=".62" stroke="#16a34a" strokeWidth="2" />
        <text x="112" y="36" className="math-venn-label">A</text><text x="267" y="36" className="math-venn-label">B</text>
        <text x="127" y="110" className="math-venn-items">{onlyA.join(', ') || '∅'}</text>
        <text x="195" y="110" className="math-venn-items">{both.join(', ') || '∅'}</text>
        <text x="262" y="110" className="math-venn-items">{onlyB.join(', ') || '∅'}</text>
        <text x="348" y="175" className="math-venn-items">{neither.join(', ') || '∅'}</text>
      </svg>
      <div className="math-membership"><div className="math-membership-head"><span>Element</span><span>A</span><span>B</span></div>
        {universe.map((value) => <div className="math-membership-row" key={value}><strong>{value}</strong>
          <label><input type="checkbox" checked={setA.includes(value)} onChange={() => toggle(value, 'A')} aria-label={`${value} A çoxluğundadır`} /></label>
          <label><input type="checkbox" checked={setB.includes(value)} onChange={() => toggle(value, 'B')} aria-label={`${value} B çoxluğundadır`} /></label>
        </div>)}</div>
    </div>
    <div className="math-lab-result" role="status"><strong>{symbols[operation]} = {formatSet(result)}</strong>
      <span>A={formatSet(setA)} · B={formatSet(setB)}</span></div>
  </section>;
};

const BoundLab = () => {
  const [preset, setPreset] = useState<Preset>('open');
  const [candidate, setCandidate] = useState(0.75);
  const [epsilon, setEpsilon] = useState(0.2);
  const names: Record<Preset, string> = { open: '(0,1)', closed: '[0,1]', sequence: '{1−1/n : n≥1}' };
  const upper = candidate >= 1;
  const lower = candidate <= 0;
  const witness = preset === 'sequence'
    ? 1 - 1 / Math.max(2, Math.ceil(1 / Math.max(0.001, 1 - candidate)) + 1)
    : (Math.max(0, candidate) + 1) / 2;
  const n = Math.floor(1 / epsilon) + 1;

  return <section className="math-lab-card">
    <div className="math-section-heading"><div><span className="math-eyebrow">Laboratoriya 02</span><h3>Sərhədi tap</h3></div></div>
    <p>Fərqli çoxluqlarda eyni sup/inf dəyərlərinin maksimum/minimumla necə fərqləndiyini araşdır.</p>
    <div className="math-lab-controls"><label>Çoxluq <select value={preset} onChange={(event) => setPreset(event.target.value as Preset)}>
      <option value="open">A=(0,1)</option><option value="closed">A=[0,1]</option><option value="sequence">A={'{1−1/n : n≥1}'}</option>
    </select></label><label>Namizəd sərhəd: {candidate.toFixed(2)}
      <input type="range" min="-0.5" max="1.5" step="0.05" value={candidate} onChange={(event) => setCandidate(Number(event.target.value))} />
    </label></div>
    <div className="math-number-line"><div className="math-number-axis" />
      <span className="math-line-mark zero">0</span><span className="math-line-mark one">1</span>
      <div className="math-line-range" /><div className={`math-endpoint zero ${preset === 'open' ? 'open' : ''}`} />
      <div className={`math-endpoint one ${preset === 'closed' ? '' : 'open'}`} />
      <div className="math-candidate-mark" style={{ left: `${((candidate + 0.5) / 2) * 100}%` }}><span>{candidate.toFixed(2)}</span></div>
    </div>
    <div className="math-lab-result" role="status"><strong>A={names[preset]} üçün sup A=1, inf A=0</strong>
      <span>{upper ? 'Bu namizəd yuxarı sərhəddir.' : `Yuxarı sərhəd deyil: məsələn, ${witness.toFixed(3)} ∈ A və ${witness.toFixed(3)} > ${candidate.toFixed(2)}.`}</span>
      <span>{lower ? 'Bu namizəd aşağı sərhəddir.' : 'Bu namizəd aşağı sərhəd deyil; 0 və ya 0-a yaxın elementlər ondan kiçikdir.'}</span>
      <span>{preset === 'closed' ? 'max A=1 və min A=0.' : preset === 'open' ? 'Nə maksimum, nə də minimum var.' : 'min A=0, maksimum yoxdur.'}</span>
    </div>
    {preset === 'sequence' && <div className="math-epsilon-demo"><label>ε = {epsilon.toFixed(2)}
      <input type="range" min="0.05" max="0.4" step="0.05" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} />
    </label><p>n={n} seç: 1−1/n={(1 - 1 / n).toFixed(3)} &gt; 1−ε={(1 - epsilon).toFixed(2)}. Bu, sup A=1 üçün ε meyarını göstərir.</p></div>}
  </section>;
};

const RealLineLab = () => {
  const [center, setCenter] = useState(0.5);
  const [epsilon, setEpsilon] = useState(0.5);
  const [point, setPoint] = useState(0.75);
  const distance = Math.abs(point - center);
  const inside = distance < epsilon;
  const rational = Math.round((center + epsilon / 2) * 100) / 100;

  return <section className="math-lab-card">
    <div className="math-section-heading"><div><span className="math-eyebrow">Laboratoriya 03</span><h3>Həqiqi ədəd oxu və ε-qonşuluğu</h3></div></div>
    <p>Mərkəzi, ε radiusunu və y nöqtəsini dəyiş. Modul bərabərsizliyinin intervala necə çevrildiyini gör.</p>
    <div className="math-lab-controls math-three-sliders">
      <label>Mərkəz a = {center.toFixed(2)}<input type="range" min="-2" max="2" step="0.05" value={center} onChange={(event) => setCenter(Number(event.target.value))} /></label>
      <label>Radius ε = {epsilon.toFixed(2)}<input type="range" min="0.1" max="1" step="0.05" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} /></label>
      <label>Nöqtə y = {point.toFixed(2)}<input type="range" min="-3" max="3" step="0.05" value={point} onChange={(event) => setPoint(Number(event.target.value))} /></label>
    </div>
    <div className="math-real-axis"><div className="math-real-line" />
      <div className="math-neighborhood" style={{ left: `${((center - epsilon + 3) / 6) * 100}%`, width: `${(2 * epsilon / 6) * 100}%` }} />
      <div className="math-real-point center" style={{ left: `${((center + 3) / 6) * 100}%` }}><span>a</span></div>
      <div className={`math-real-point sample ${inside ? 'inside' : 'outside'}`} style={{ left: `${((point + 3) / 6) * 100}%` }}><span>y</span></div>
    </div>
    <div className="math-lab-result" role="status"><strong>(a−ε, a+ε)=({(center - epsilon).toFixed(2)}, {(center + epsilon).toFixed(2)})</strong>
      <span>|y−a|={distance.toFixed(2)} {inside ? '<' : '≥'} ε={epsilon.toFixed(2)} — y {inside ? 'qonşuluqdadır' : 'qonşuluqda deyil'}.</span>
      <span>{rational.toFixed(2)}= {Math.round(rational * 100)}/100 bu açıq intervalda yerləşən rasional ədədə nümunədir.</span>
    </div>
  </section>;
};

export const MathLabs = () => <div className="math-learning">
  <div className="math-learning-intro"><span className="math-eyebrow">İnteraktiv laboratoriyalar</span><h2>Qaydanı hərəkətdə gör</h2>
    <p>Çoxluqları dəyiş, sərhədləri sına və ε-qonşuluğunu ədəd oxunda araşdır. Nəticələr dərhal yenilənir.</p></div>
  <VennLab /><BoundLab /><RealLineLab />
</div>;
