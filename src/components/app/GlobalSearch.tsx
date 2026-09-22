import React, { useMemo, useState } from 'react';
import { Modal } from '../common/Modal';
import { useDatabase } from '../../context/DatabaseContext';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { parseRevision } from '../../services/discussion';
import './GlobalSearch.css';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = { id: string; kind: string; title: string; detail: string; path: string; createdAt: string };

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const { courses, materials, notes, questions, getDiscussionComments } = useDatabase();
  const { navigate } = useRouter();
  const { user } = useAuth();
  const { isSaved } = useBookmarks(user?.id);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [onlySaved, setOnlySaved] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('az-AZ');
    if (!q && !onlySaved) return [];
    const courseName = (id: string) => courses.find((course) => course.id === id)?.name || id;
    const all: SearchResult[] = [
      ...materials.map((item) => ({
        id: item.id, kind: 'material', title: item.title,
        detail: `${courseName(item.courseId)} · ${item.description || item.fileName || item.authorName}`,
        path: '/app/materials',
        createdAt: item.createdAt,
      })),
      ...notes.map((item) => {
        const revisions = getDiscussionComments('note', item.id)
          .map((comment) => parseRevision(comment.content)).filter((revision) => revision !== null);
        return {
          id: item.id, kind: 'qeyd', title: revisions.at(-1)?.content || item.content,
          detail: `${courseName(item.courseId)} · ${item.authorName}`,
          path: '/app/notes', createdAt: item.createdAt,
        };
      }),
      ...questions.filter((item) => !item.details?.startsWith('__aztu_discussion__:')).map((item) => ({
        id: item.id, kind: 'sual', title: item.title,
        detail: `${courseName(item.courseId)} · ${item.details || item.authorName}`,
        path: '/app/qa',
        createdAt: item.createdAt,
      })),
    ];
    return all.filter((item) =>
      (type === 'all' || item.kind === type) &&
      (!onlySaved || isSaved(item.kind === 'qeyd' ? 'note' : item.kind === 'sual' ? 'question' : 'material', item.id)) &&
      (!q || `${item.title} ${item.detail}`.toLocaleLowerCase('az-AZ').includes(q))
    ).sort((a, b) => {
      const aTitleMatch = q && a.title.toLocaleLowerCase('az-AZ').includes(q) ? 1 : 0;
      const bTitleMatch = q && b.title.toLocaleLowerCase('az-AZ').includes(q) ? 1 : 0;
      return bTitleMatch - aTitleMatch || b.createdAt.localeCompare(a.createdAt);
    }).slice(0, 30);
  }, [query, type, onlySaved, courses, materials, notes, questions, getDiscussionComments, isSaved]);

  const openResult = (result: SearchResult) => {
    sessionStorage.setItem('aztu_search_focus', JSON.stringify({
      kind: result.kind === 'qeyd' ? 'note' : result.kind === 'sual' ? 'question' : 'material', id: result.id,
    }));
    navigate(result.path);
    onClose();
    window.setTimeout(() => window.dispatchEvent(new Event('aztu-search-focus')), 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Qrupda axtar" maxWidth="650px">
      <div className="global-search">
        <label htmlFor="global-search-input" className="form-label">Nə axtarırsınız?</label>
        <input
          id="global-search-input" autoFocus type="search" className="form-input"
          placeholder="Fənn, material, qeyd və ya sual yazın"
          value={query} onChange={(event) => setQuery(event.target.value)}
        />
        <div className="global-search-filters" aria-label="Nəticə növü">
          {[
            ['all', 'Hamısı'], ['material', 'Materiallar'], ['qeyd', 'Qeydlər'], ['sual', 'Suallar'],
          ].map(([value, label]) => (
            <button key={value} type="button" className={type === value ? 'is-active' : ''}
              onClick={() => setType(value)} aria-pressed={type === value}>{label}</button>
          ))}
        </div>
        <label className="global-search-saved"><input type="checkbox" checked={onlySaved}
          onChange={(event) => setOnlySaved(event.target.checked)} /> Yadda saxladıqlarım</label>
        <div className="global-search-results" aria-live="polite">
          {!query.trim() && !onlySaved ? <p>Axtarış üçün söz yazın və ya yadda saxladıqlarınızı açın.</p> : results.length === 0 ? <p>Uyğun paylaşım tapılmadı.</p> :
            results.map((result) => (
              <button key={`${result.kind}-${result.id}`} type="button" onClick={() => openResult(result)}>
                <span className="global-search-kind">{result.kind}</span>
                <strong>{result.title}</strong>
                <small>{result.detail}</small>
              </button>
            ))}
        </div>
      </div>
    </Modal>
  );
};
