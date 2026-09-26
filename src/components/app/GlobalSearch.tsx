import React, { useMemo, useState } from 'react';
import { Modal } from '../common/Modal';
import { useDatabase } from '../../context/DatabaseContext';
import { useRouter } from '../../context/RouterContext';
import './GlobalSearch.css';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: string;
  kind: 'fənn' | 'alət' | 'material' | 'deadline';
  title: string;
  detail: string;
  path: string;
};

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const { courses, materials, deadlines } = useDatabase();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const staticItems: SearchResult[] = useMemo(() => {
    const courseItems: SearchResult[] = courses.map((c) => ({
      id: `course-${c.id}`,
      kind: 'fənn',
      title: `${c.name} (${c.code})`,
      detail: `${c.credits} Kredit · ${c.lecturer}`,
      path: `/app/courses/${c.slug}`,
    }));

    const toolItems: SearchResult[] = [
      {
        id: 'tool-calc',
        kind: 'alət',
        title: '6326A2 Qaib Limit, Giriş Balı və GPA Kalkulyatoru',
        detail: '25% qaib həddi, Forma-1 / Forma-2 giriş balı və 30 ECTS GPA hesablayıcısı',
        path: '/app/calculator',
      },
      {
        id: 'tool-python',
        kind: 'alət',
        title: 'Python 3.12 + Pandas Sandbox (CS-101 Laboratoriya)',
        detail: 'Ayxan m. və Şəbnəm m. hazır seminar və laboratoriya kod şablonları',
        path: '/app/sandbox',
      },
      {
        id: 'tool-water',
        kind: 'alət',
        title: 'Fizika 2D Dalğa və Su Simulyasiyası',
        detail: 'Sönümlü dalğa tənliyi, maneələr və interferensiya laboratoriyası',
        path: '/app/water',
      },
    ];

    return [...toolItems, ...courseItems];
  }, [courses]);

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('az-AZ');
    const courseName = (id: string) => courses.find((course) => course.id === id)?.name || id;

    const all: SearchResult[] = [
      ...staticItems,
      ...materials.map((item) => ({
        id: item.id,
        kind: 'material' as const,
        title: item.title,
        detail: `${courseName(item.courseId)} · ${item.description || item.fileName || item.authorName}`,
        path: '/app/materials',
      })),
      ...deadlines.map((item) => ({
        id: item.id,
        kind: 'deadline' as const,
        title: item.title,
        detail: `${courseName(item.courseId)} · Son tarix: ${item.dueDate}`,
        path: '/app/deadlines',
      })),
    ];

    return all
      .filter(
        (item) =>
          (type === 'all' || item.kind === type) &&
          (!q || `${item.title} ${item.detail}`.toLocaleLowerCase('az-AZ').includes(q))
      )
      .slice(0, 25);
  }, [query, type, courses, materials, deadlines, staticItems]);

  const openResult = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Platformada axtar" maxWidth="650px">
      <div className="global-search">
        <label htmlFor="global-search-input" className="form-label">
          Nə axtarırsınız?
        </label>
        <input
          id="global-search-input"
          autoFocus
          type="search"
          className="form-input"
          placeholder="Fənn, qaib kalkulyatoru, Python lab, PDF material və ya deadline..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="global-search-filters" aria-label="Nəticə növü">
          {[
            ['all', 'Hamısı'],
            ['alət', 'Alətlər & Lab'],
            ['fənn', 'Fənlər'],
            ['material', 'Materiallar'],
            ['deadline', 'Deadline-lar'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={type === value ? 'is-active' : ''}
              onClick={() => setType(value)}
              aria-pressed={type === value}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="global-search-results" aria-live="polite">
          {results.length === 0 ? (
            <p>Uyğun nəticə tapılmadı.</p>
          ) : (
            results.map((result) => (
              <button
                key={`${result.kind}-${result.id}`}
                type="button"
                onClick={() => openResult(result)}
              >
                <span className="global-search-kind">{result.kind}</span>
                <strong>{result.title}</strong>
                <small>{result.detail}</small>
              </button>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
