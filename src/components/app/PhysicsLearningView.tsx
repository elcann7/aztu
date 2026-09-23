import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical } from 'lucide-react';
import { PHYSICS_EXTRA_LAB, PHYSICS_LABS, PHYSICS_TOPICS } from '../../data/physicsContent';
import type { PhysicsLab, PhysicsTopic } from '../../data/physicsContent';
import './PhysicsLearning.css';

type Mode = 'topics' | 'labs';

export const PhysicsLearningView = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('topics');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const topic = mode === 'topics' ? PHYSICS_TOPICS.find((item) => item.id === selectedId) : undefined;
  const lab = mode === 'labs' ? [...PHYSICS_LABS, PHYSICS_EXTRA_LAB].find((item) => item.id === selectedId) : undefined;

  const scrollToStart = () => requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  const select = (id: string | null) => { setSelectedId(id); scrollToStart(); };
  const changeMode = (next: Mode) => { setMode(next); setSelectedId(null); scrollToStart(); };

  return <div className="physics-learning" ref={topRef}>
    {!selectedId && <div className="physics-intro">
      <span className="physics-eyebrow">Fizika · 2026 Payız</span>
      <h2>Mövzular və laboratoriyalar</h2>
      <p>Mövzu sırası LMS-də göstərilən plana əsaslanır. Ətraflı izahlar müəllimin paylaşdığı təqdimat və laboratoriya təlimatlarından qısa xülasədir.</p>
      <div className="physics-facts"><span>3 kredit</span><span>30 saat</span><span>Mühazirə müəllimi: Sürəyya Məmmədova</span></div>
      <small>Seminar və laboratoriya müəllimi LMS-də hələ təyin edilməyib. Fənn qrupunun identifikatoru: 6326a2_if-20403y_fizika.</small>
    </div>}

    <div className="physics-mode-nav" aria-label="Fizika bölmələri">
      <button type="button" className={mode === 'topics' ? 'active' : ''} onClick={() => changeMode('topics')}>
        <BookOpen size={16} aria-hidden="true" /> Mühazirə mövzuları ({PHYSICS_TOPICS.length})
      </button>
      <button type="button" className={mode === 'labs' ? 'active' : ''} onClick={() => changeMode('labs')}>
        <FlaskConical size={16} aria-hidden="true" /> Laboratoriya işləri ({PHYSICS_LABS.length})
      </button>
    </div>

    {selectedId && <button type="button" className="physics-back" onClick={() => select(null)}>
      <ArrowLeft size={15} aria-hidden="true" /> {mode === 'topics' ? 'Bütün mövzular' : 'Bütün laboratoriyalar'}
    </button>}

    {mode === 'topics' && (!topic ? <div className="physics-list">
      {PHYSICS_TOPICS.map((item, index) => <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
        <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="physics-list-main"><span className="physics-eyebrow">Mövzu {index + 1}</span><strong>{item.title}</strong>
          <span>{item.outline.slice(0, 2).join(' · ')}</span>
          <em>{item.sourceFile ? 'Müəllimin təqdimatı əsasında izah var' : 'LMS mövzu planı'}</em>
        </span><ArrowRight size={18} aria-hidden="true" />
      </button>)}
    </div> : <TopicDetail topic={topic} />)}

    {mode === 'labs' && (!lab ? <>
      <div className="physics-list">
        {PHYSICS_LABS.map((item, index) => <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
          <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="physics-list-main"><span className="physics-eyebrow">Laboratoriya {index + 1}</span><strong>{item.title}</strong>
            <em>{item.sourceFile ? 'Müəllimin təlimatı əsasında xülasə' : 'Ayrıca təlimat faylı verilməyib'}</em>
          </span><ArrowRight size={18} aria-hidden="true" />
        </button>)}
      </div>
      <div className="physics-extra"><strong>Əlavə müəllim faylı</strong><p>Nixrom məftilin xüsusi müqavimətinin təyini təlimatı da verilib. Bu iş hazırkı LMS-in 7 laboratoriyalıq siyahısında görünmür.</p>
        <button type="button" onClick={() => select(PHYSICS_EXTRA_LAB.id)}>Təlimatın xülasəsinə bax <ArrowRight size={14} aria-hidden="true" /></button>
      </div>
    </> : <LabDetail lab={lab} extra={lab.id === PHYSICS_EXTRA_LAB.id} />)}
  </div>;
};

const TopicDetail = ({ topic }: { topic: PhysicsTopic }) => {
  const number = PHYSICS_TOPICS.indexOf(topic) + 1;
  return <article className="physics-detail">
    <header><span className="physics-eyebrow">LMS mövzusu {number} / {PHYSICS_TOPICS.length}</span><h2>{topic.title}</h2>
      <p>{topic.sourceFile ? 'Müəllimin təqdimatındakı plan və izahların qısa xülasəsi.' : 'Bu mövzu LMS siyahısından götürülüb; ona aid müəllim təqdimatı hələ verilməyib.'}</p></header>
    <section><h3>Mövzunun əhatəsi</h3><ul>{topic.outline.map((part) => <li key={part}>{part}</li>)}</ul></section>
    {topic.explanations && <section><h3>Müəllimin təqdimatından izahlar</h3><div className="physics-explanations">
      {topic.explanations.map((part) => <div key={part.title}><h4>{part.title}</h4><p>{part.text}</p>{part.formula && <code>{part.formula}</code>}</div>)}
    </div></section>}
    {topic.checkQuestions && <section><h3>Özünü yoxla</h3><ol>{topic.checkQuestions.map((question) => <li key={question}>{question}</li>)}</ol></section>}
    {topic.sourceFile ? <p className="physics-source">Mənbə: Sürəyya Məmmədovanın təqdimatı — {topic.sourceFile}. Təqdimatda “Mühazirə {topic.presentationNumber}” yazılıb.
      {topic.presentationNumber !== number && ' LMS mövzu nömrəsi ilə təqdimatın nömrəsi fərqlidir; məzmun mövzu adına görə uyğunlaşdırılıb.'}</p>
      : <p className="physics-source">Mənbə: tələbənin paylaşdığı LMS mövzu siyahısı. Bu mövzu üçün ayrıca təqdimat verilməyib.</p>}
  </article>;
};

const LabDetail = ({ lab, extra }: { lab: PhysicsLab; extra: boolean }) => {
  const number = PHYSICS_LABS.indexOf(lab) + 1;
  return <article className="physics-detail">
    <header><span className="physics-eyebrow">{extra ? 'Əlavə müəllim faylı' : `LMS laboratoriyası ${number} / ${PHYSICS_LABS.length}`}</span>
      <h2>{lab.title}</h2><p>{lab.sourceFile ? 'Müəllimin laboratoriya təlimatından hazırlanmış qısa iş bələdçisi.' : 'Bu iş LMS siyahısında var, lakin verilən fayllarda ayrıca təlimatı yoxdur.'}</p></header>
    {lab.objective ? <section><h3>İşin məqsədi</h3><p>{lab.objective}</p></section>
      : <section><h3>Mövcud məlumat</h3><p>İmpulsun saxlanması mövzusu birinci mühazirə təqdimatında izah olunur. Təcrübənin qurğusu, ölçmə addımları və təhvil tələbi haqqında ayrıca müəllim təlimatı paylaşılmayıb.</p></section>}
    {lab.equipment && <section><h3>Ləvazimat</h3><p>{lab.equipment}</p></section>}
    {lab.steps && <section><h3>Təlimatda göstərilən iş ardıcıllığı</h3><ol>{lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>}
    {lab.result && <section><h3>Hesabatda göstərəcəklərin</h3><p>{lab.result}</p></section>}
    <p className="physics-source">Mənbə: {lab.sourceFile ? `müəllimin ${lab.sourceFile} təlimatı` : 'tələbənin paylaşdığı LMS laboratoriya siyahısı'}.</p>
  </article>;
};
