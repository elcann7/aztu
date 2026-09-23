import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FileText, FlaskConical } from 'lucide-react';
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
    <div className="physics-mode-nav" aria-label="Fizika bölmələri">
      <button type="button" className={mode === 'topics' ? 'active' : ''} onClick={() => changeMode('topics')}>
        <BookOpen size={16} aria-hidden="true" /> Mühazirələr ({PHYSICS_TOPICS.length})
      </button>
      <button type="button" className={mode === 'labs' ? 'active' : ''} onClick={() => changeMode('labs')}>
        <FlaskConical size={16} aria-hidden="true" /> Laboratoriyalar ({PHYSICS_LABS.length})
      </button>
    </div>

    {selectedId && <button type="button" className="physics-back" onClick={() => select(null)}>
      <ArrowLeft size={15} aria-hidden="true" /> {mode === 'topics' ? 'Bütün mövzular' : 'Bütün laboratoriyalar'}
    </button>}

    {mode === 'topics' && (!topic ? <div className="physics-list">
      {PHYSICS_TOPICS.map((item, index) => <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
        <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="physics-list-main"><strong>{item.title}</strong></span><ArrowRight size={18} aria-hidden="true" />
      </button>)}
    </div> : <TopicDetail key={topic.id} topic={topic} />)}

    {mode === 'labs' && (!lab ? <>
      <div className="physics-list">
        {PHYSICS_LABS.map((item, index) => <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
          <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="physics-list-main"><strong>{item.title}</strong>{!item.sourceFile && <small>Təlimat gözlənilir</small>}</span><ArrowRight size={18} aria-hidden="true" />
        </button>)}
      </div>
      <details className="physics-extra"><summary>Əlavə müəllim təlimatı</summary><p>Nixrom məftilin xüsusi müqaviməti. Bu iş hazırkı LMS siyahısında görünmür.</p>
        <button type="button" onClick={() => select(PHYSICS_EXTRA_LAB.id)}>Xülasəyə bax <ArrowRight size={14} aria-hidden="true" /></button>
      </details>
    </> : <LabDetail lab={lab} extra={lab.id === PHYSICS_EXTRA_LAB.id} />)}
  </div>;
};

const TopicDetail = ({ topic }: { topic: PhysicsTopic }) => {
  const number = PHYSICS_TOPICS.indexOf(topic) + 1;
  const [openSection, setOpenSection] = useState(0);
  return <article className="physics-detail">
    <header><span className="physics-eyebrow">LMS mövzusu {number} / {PHYSICS_TOPICS.length}</span><h2>{topic.title}</h2>
      <p>{topic.sourceFile ? 'Müəllimin təqdimatı əsasında geniş konspekt. Hissələri bir-bir açıb oxuya bilərsən.' : 'Bu mövzu LMS siyahısından götürülüb; ona aid müəllim təqdimatı hələ verilməyib.'}</p></header>
    {topic.pdfUrl && <PdfDocument url={topic.pdfUrl} title={`${topic.title} — müəllimin təqdimatı`} />}
    {topic.explanations && <section><h3>Mövzu izahı · {topic.explanations.length} hissə</h3><div className="physics-explanations">
      {topic.explanations.map((part, index) => <div key={part.title} className={openSection === index ? 'is-open' : ''}>
        <button type="button" aria-expanded={openSection === index} onClick={() => setOpenSection(openSection === index ? -1 : index)}>{part.title}<span>{openSection === index ? '−' : '+'}</span></button>
        {openSection === index && <div className="physics-explanation-body"><p>{part.text}</p>{part.formula && <code>{part.formula}</code>}</div>}
      </div>)}
    </div></section>}
    <details className="physics-detail-more"><summary>Mövzunun tam planı</summary><ul>{topic.outline.map((part) => <li key={part}>{part}</li>)}</ul></details>
    {topic.checkQuestions && <section><h3>Özünü yoxla</h3><ol>{topic.checkQuestions.map((question) => <li key={question}>{question}</li>)}</ol></section>}
    <details className="physics-detail-more"><summary>Mənbə haqqında</summary>{topic.sourceFile ? <p>Müəllimin təqdimatı: {topic.sourceFile}. Təqdimatda “Mühazirə {topic.presentationNumber}” yazılıb.
      {topic.presentationNumber !== number && ' LMS mövzu nömrəsi ilə təqdimatın nömrəsi fərqlidir; məzmun mövzu adına görə uyğunlaşdırılıb.'}</p>
      : <p>Mənbə: LMS mövzu siyahısı. Ayrıca təqdimat verilməyib.</p>}</details>
  </article>;
};

const LabDetail = ({ lab, extra }: { lab: PhysicsLab; extra: boolean }) => {
  const number = PHYSICS_LABS.indexOf(lab) + 1;
  return <article className="physics-detail">
    <header><span className="physics-eyebrow">{extra ? 'Əlavə müəllim faylı' : `LMS laboratoriyası ${number} / ${PHYSICS_LABS.length}`}</span>
      <h2>{lab.title}</h2><p>{lab.sourceFile ? 'Müəllimin laboratoriya təlimatından hazırlanmış qısa iş bələdçisi.' : 'Bu iş LMS siyahısında var, lakin verilən fayllarda ayrıca təlimatı yoxdur.'}</p></header>
    {lab.pdfUrl && <PdfDocument url={lab.pdfUrl} title={`${lab.title} — laboratoriya təlimatı`} />}
    {lab.objective ? <section><h3>İşin məqsədi</h3><p>{lab.objective}</p></section>
      : <section><h3>Mövcud məlumat</h3><p>İmpulsun saxlanması mövzusu birinci mühazirə təqdimatında izah olunur. Təcrübənin qurğusu, ölçmə addımları və təhvil tələbi haqqında ayrıca müəllim təlimatı paylaşılmayıb.</p></section>}
    {lab.equipment && <section><h3>Ləvazimat</h3><p>{lab.equipment}</p></section>}
    {lab.steps && <section><h3>Təlimatda göstərilən iş ardıcıllığı</h3><ol>{lab.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>}
    {lab.result && <section><h3>Hesabatda göstərəcəklərin</h3><p>{lab.result}</p></section>}
    <details className="physics-detail-more"><summary>Mənbə haqqında</summary><p>{lab.sourceFile ? `Müəllimin ${lab.sourceFile} təlimatı.` : 'LMS laboratoriya siyahısı; ayrıca təlimat verilməyib.'}</p></details>
  </article>;
};

const PdfDocument = ({ url, title }: { url: string; title: string }) => <details className="physics-pdf-panel">
  <summary><FileText size={18} aria-hidden="true" /> Müəllimin PDF-ini burada oxu <span aria-hidden="true">⌄</span></summary>
  <div className="physics-pdf-content">
    <iframe src={url} title={title} loading="lazy" />
    <a href={url} target="_blank" rel="noopener noreferrer">PDF-i ayrıca pəncərədə aç <ArrowRight size={15} aria-hidden="true" /></a>
  </div>
</details>;
