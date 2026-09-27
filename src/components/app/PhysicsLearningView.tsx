import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FileText, FlaskConical } from 'lucide-react';
import { PHYSICS_LABS, PHYSICS_TOPICS } from '../../data/physicsContent';
import type { PhysicsLab, PhysicsTopic } from '../../data/physicsContent';
import { PhysicsPdfViewer } from './PhysicsPdfViewer';
import { StudyNotesList } from './StudyNoteCard';
import './PhysicsLearning.css';

type Mode = 'topics' | 'labs';

export const PhysicsLearningView = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('topics');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const topic = mode === 'topics' ? PHYSICS_TOPICS.find((item) => item.id === selectedId) : undefined;
  const lab = mode === 'labs' ? PHYSICS_LABS.find((item) => item.id === selectedId) : undefined;

  const scrollToStart = () =>
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  const select = (id: string | null) => {
    setSelectedId(id);
    scrollToStart();
  };
  const changeMode = (next: Mode) => {
    setMode(next);
    setSelectedId(null);
    scrollToStart();
  };

  return (
    <div className="physics-learning" ref={topRef}>
      <div className="physics-mode-nav" aria-label="Fizika bölmələri">
        <button type="button" className={mode === 'topics' ? 'active' : ''} onClick={() => changeMode('topics')}>
          <BookOpen size={16} aria-hidden="true" /> Mühazirələr ({PHYSICS_TOPICS.length})
        </button>
        <button type="button" className={mode === 'labs' ? 'active' : ''} onClick={() => changeMode('labs')}>
          <FlaskConical size={16} aria-hidden="true" /> Laboratoriyalar ({PHYSICS_LABS.length})
        </button>
      </div>

      {selectedId && (
        <button type="button" className="physics-back" onClick={() => select(null)}>
          <ArrowLeft size={15} aria-hidden="true" /> {mode === 'topics' ? 'Bütün mövzular' : 'Bütün laboratoriyalar'}
        </button>
      )}

      {mode === 'topics' &&
        (!topic ? (
          <div className="physics-list">
            {PHYSICS_TOPICS.map((item, index) => (
              <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
                <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="physics-list-main">
                  <strong>{item.title}</strong>
                  <small>0-dan öyrədən izah · {item.studyNotes.length} hissə · Daxili PDF</small>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <TopicDetail key={topic.id} topic={topic} />
        ))}

      {mode === 'labs' &&
        (!lab ? (
          <div className="physics-list">
            {PHYSICS_LABS.map((item, index) => (
              <button type="button" className="physics-list-card" key={item.id} onClick={() => select(item.id)}>
                <span className="physics-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="physics-list-main">
                  <strong>{item.title}</strong>
                  <small>
                    {item.pdfUrl
                      ? '0-dan izah · Ölçmə addımları · Düstur və nümunə · Daxili PDF'
                      : '0-dan izah · Ölçmə addımları · Düstur və nümunə'}
                  </small>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <LabDetail key={lab.id} lab={lab} />
        ))}
    </div>
  );
};

const TopicDetail = ({ topic }: { topic: PhysicsTopic }) => {
  const number = PHYSICS_TOPICS.indexOf(topic) + 1;
  return (
    <article className="physics-detail">
      <header>
        <span className="physics-eyebrow">
          LMS Mövzusu {number} / {PHYSICS_TOPICS.length} · 0-dan Öyrənən Tələbə Üçün
        </span>
        <h2>{topic.title}</h2>
        <p>
          Hər bir hissədə əvvəlcə mövzunun sadə dillə məntiqi, sonra əsas nəzəriyyə, düstur, düsturdakı hərflərin mənası,
          məsələ həlli addımları, rəqəmlərlə həll olunmuş nümunə və imtahan xəbərdarlığı verilib.
        </p>
      </header>

      <details className="physics-detail-more">
        <summary>Mövzunun əhatə etdiyi alt-başlıqlar ({topic.outline.length})</summary>
        <ul>
          {topic.outline.map((part) => (
            <li key={part}>{part}</li>
          ))}
        </ul>
      </details>

      <section>
        <h3>0-dan Addım-Addım Mövzu İzahı ({topic.studyNotes.length} hissə)</h3>
        <StudyNotesList sections={topic.studyNotes} materialTitle={topic.title} />
      </section>

      {topic.checkQuestions && (
        <section>
          <h3>Özünü yoxla (Kollokvium və İmtahan Sualları)</h3>
          <ol>
            {topic.checkQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>
      )}

      {topic.pdfUrl && <PdfDocument url={topic.pdfUrl} title={`${topic.title} — müəllimin təqdimatı`} />}
    </article>
  );
};

const LabDetail = ({ lab }: { lab: PhysicsLab }) => {
  const number = PHYSICS_LABS.indexOf(lab) + 1;
  return (
    <article className="physics-detail">
      <header>
        <span className="physics-eyebrow">
          LMS Laboratoriyası {number} / {PHYSICS_LABS.length} · 0-dan Təcrübə Bələdçisi
        </span>
        <h2>{lab.title}</h2>
        <p>
          Laboratoriya işinin məqsədi, fiziki mahiyyəti, işçi düsturdakı hərflərin mənası, ölçmə ardıcıllığı və nümunəvi
          hesablama qaydası aşağıda addım-addım izah olunub.
        </p>
      </header>

      {lab.objective && (
        <section>
          <h3>İşin məqsədi</h3>
          <p>{lab.objective}</p>
        </section>
      )}

      {lab.equipment && (
        <section>
          <h3>Lazım olan cihazlar və ləvazimat</h3>
          <p>{lab.equipment}</p>
        </section>
      )}

      <section>
        <h3>İşi 0-dan Başa Düşmək və Hesablamaq Üçün Bələdçi</h3>
        <StudyNotesList sections={lab.studyNotes} materialTitle={lab.title} />
      </section>

      {lab.result && (
        <section>
          <h3>Hesabat dəftərində təhvil verəcəklərin</h3>
          <p>{lab.result}</p>
        </section>
      )}

      {lab.pdfUrl && <PdfDocument url={lab.pdfUrl} title={`${lab.title} — laboratoriya təlimatı`} />}
    </article>
  );
};

const PdfDocument = ({ url, title }: { url: string; title: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <details className="physics-pdf-panel" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <FileText size={18} aria-hidden="true" /> Müəllimin R2 PDF faylını burada oxu <span aria-hidden="true">⌄</span>
      </summary>
      {open && (
        <div className="physics-pdf-content">
          <PhysicsPdfViewer url={url} title={title} />
          <a href={url} target="_blank" rel="noopener noreferrer">
            PDF-i ayrıca pəncərədə aç <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      )}
    </details>
  );
};
