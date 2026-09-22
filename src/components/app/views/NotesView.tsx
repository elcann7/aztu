import React, { useEffect, useState, useMemo } from 'react';
import './ViewsCommon.css';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { CreateNoteModal } from '../modals/CreateNoteModal';
import { DiscussionPanel } from '../DiscussionPanel';
import { useBookmarks } from '../../../hooks/useBookmarks';
import { parseRevision } from '../../../services/discussion';
import { useSearchFocus } from '../../../hooks/useSearchFocus';
import { MessageSquareQuote, Plus, Trash2, Clock, User, Filter, MessageCircle, Bookmark } from 'lucide-react';

export const NotesView: React.FC = () => {
  const { notes, courses, deleteNote, getDiscussionComments } = useDatabase();
  const { user } = useAuth();
  const bookmarks = useBookmarks(user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openDiscussionId, setOpenDiscussionId] = useState<string | null>(null);
  const filteredNotes = useMemo(() => {
    return [...notes]
      .filter((n) => {
        if (selectedCourse !== 'all' && n.courseId !== selectedCourse) return false;
        if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notes, selectedCourse, selectedCategory]);
  const noteIds = useMemo(() => filteredNotes.map((note) => note.id), [filteredNotes]);
  useSearchFocus('note', noteIds);

  useEffect(() => {
    const clearFilters = () => {
      const raw = sessionStorage.getItem('aztu_search_focus');
      if (!raw) return;
      try {
        if ((JSON.parse(raw) as { kind: string }).kind !== 'note') return;
        setSelectedCourse('all');
        setSelectedCategory('all');
      } catch { /* Invalid focus data is cleared by useSearchFocus. */ }
    };
    window.addEventListener('aztu-search-focus', clearFilters);
    clearFilters();
    return () => window.removeEventListener('aztu-search-focus', clearFilters);
  }, []);

  const categories = [
    { id: 'all', label: 'Bütün qeydlər' },
    { id: 'teacher_said', label: 'Müəllim dedi' },
    { id: 'exam_colloquium', label: 'İmtahan / Kollokvium' },
    { id: 'seminar', label: 'Seminar' },
    { id: 'general', label: 'Ümumi' },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'teacher_said': return 'Müəllim dedi';
      case 'exam_colloquium': return 'İmtahan / Kollokvium';
      case 'seminar': return 'Seminar';
      default: return 'Ümumi';
    }
  };

  // Group notes by relative date (Bugün, Dünən, Tarix)
  const groupedNotes = useMemo(() => {
    const groups: { [key: string]: typeof filteredNotes } = {};
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    filteredNotes.forEach((note) => {
      const noteDate = new Date(note.createdAt);
      const noteDateStr = noteDate.toISOString().split('T')[0];

      let label = '';
      if (noteDateStr === todayStr) {
        label = 'BUGÜN';
      } else if (noteDateStr === yesterdayStr) {
        label = 'DÜNƏN';
      } else {
        label = noteDate.toLocaleDateString('az-AZ', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).toUpperCase();
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(note);
    });

    return groups;
  }, [filteredNotes]);

  const handleDelete = (id: string) => {
    if (window.confirm('Bu qeydi silmək istədiyinizə əminsiniz?')) {
      deleteNote(id);
    }
  };

  return (
    <div className="view-content-flow">
      {/* 1. View Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Qrup qeydləri</h1>
            <span className="count-badge">{filteredNotes.length} qeyd</span>
          </div>
          <p className="view-sub-title">
            Dərsdə müəllimlərin vurğuladığı vacib qeydlər, şifahi tapşırıqlar və mühazirə timeline-ı.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-create-primary"
        >
          <Plus size={15} />
          <span>Qeyd əlavə et</span>
        </button>
      </div>

      {/* 2. Filter Controls (Pills + Course dropdown) */}
      <div className="notes-controls-bar">
        <div className="notes-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`notes-cat-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="notes-course-filter">
          <Filter size={13} className="filter-icon-dim" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="notes-select"
          >
            <option value="all">Bütün fənlər</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Timeline / Knowledge Feed */}
      {filteredNotes.length === 0 ? (
        <div className="view-compact-empty">
          <div className="compact-empty-icon">
            <MessageSquareQuote size={20} />
          </div>
          <div className="compact-empty-content">
            <p className="compact-empty-title">
              {selectedCourse !== 'all' || selectedCategory !== 'all'
                ? 'Filtirə uyğun qeyd tapılmadı.'
                : 'Qrupda hələ heç bir mühazirə qeydi paylaşılmayıb.'}
            </p>
            <p className="compact-empty-desc">
              Dərsdə müəllimin dediyi vacib məqamı və ya kollokvium ipucunu qrupunuzla bölüşün.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-compact-action"
          >
            <Plus size={13} />
            <span>Qeyd yaz</span>
          </button>
        </div>
      ) : (
        <div className="timeline-feed-wrap">
          {Object.entries(groupedNotes).map(([dateLabel, groupNotes]) => (
            <div key={dateLabel} className="timeline-date-section">
              <div className="timeline-date-header">
                <span className="timeline-date-badge">{dateLabel}</span>
                <span className="timeline-date-line" />
              </div>

              <div className="timeline-items-column">
                {groupNotes.map((note) => {
                  const course = courses.find((c) => c.id === note.courseId);
                  const isOwner = user?.id === note.authorId;
                  const revisions = getDiscussionComments('note', note.id)
                    .map((item) => parseRevision(item.content)).filter((item) => item !== null);
                  const currentContent = revisions.at(-1)?.content || note.content;
                  const timeFormatted = new Date(note.createdAt).toLocaleTimeString('az-AZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div key={note.id} id={`search-note-${note.id}`} className="timeline-note-card">
                      <div className={`note-indicator-bar ${note.category}`} />
                      
                      <div className="note-card-inner">
                        <div className="note-meta-top">
                          <span className="note-subject-pill">{course?.name || note.courseId}</span>
                          <span className={`note-type-pill ${note.category}`}>
                            {getCategoryLabel(note.category)}
                          </span>
                          
                          <div className="note-meta-right">
                            <button type="button" className="note-delete-btn" title={bookmarks.isSaved('note', note.id) ? 'Yadda saxlanılanlardan çıxar' : 'Yadda saxla'}
                              aria-label={bookmarks.isSaved('note', note.id) ? 'Yadda saxlanılanlardan çıxar' : 'Yadda saxla'}
                              aria-pressed={bookmarks.isSaved('note', note.id)} onClick={() => bookmarks.toggle('note', note.id)}>
                              <Bookmark size={12} fill={bookmarks.isSaved('note', note.id) ? 'currentColor' : 'none'} />
                            </button>
                            <span className="note-time-text">
                              <Clock size={11} />
                              {timeFormatted}
                            </span>
                            {isOwner && (
                              <button
                                type="button"
                                onClick={() => handleDelete(note.id)}
                                className="note-delete-btn"
                                title="Qeydi sil"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>

                        <blockquote className="note-quote-content">
                          "{currentContent}"
                        </blockquote>

                        {revisions.length > 0 && <details className="note-history">
                          <summary>{revisions.length} qəbul edilmiş düzəliş · İlkin mətni göstər</summary>
                          <p>{note.content}</p>
                        </details>}

                        <div className="note-footer-meta">
                          <span className="note-author-name">
                            <User size={11} />
                            {note.authorName}
                          </span>
                          <button type="button" className="discussion-toggle" aria-expanded={openDiscussionId === note.id}
                            onClick={() => setOpenDiscussionId(openDiscussionId === note.id ? null : note.id)}>
                            <MessageCircle size={13} /> Müzakirə
                          </button>
                        </div>
                      </div>
                      {openDiscussionId === note.id && <DiscussionPanel targetType="note" targetId={note.id}
                        targetTitle={note.content.slice(0, 65)} courseId={note.courseId}
                        ownerId={note.authorId} ownerName={note.authorName} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
