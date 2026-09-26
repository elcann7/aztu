import React, { useEffect, useState, useMemo } from 'react';
import './ViewsCommon.css';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { formatAzDate } from '../../../services/db';
import { CreateMaterialModal } from '../modals/CreateMaterialModal';
import { PhysicsPdfViewer } from '../PhysicsPdfViewer';
import { useBookmarks } from '../../../hooks/useBookmarks';
import { useSearchFocus } from '../../../hooks/useSearchFocus';
import {
  FileText,
  Link2,
  Download,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  FolderOpen,
  Filter,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  BookOpen,
  Bookmark,
} from 'lucide-react';

export const MaterialsView: React.FC = () => {
  const { materials, courses, deleteMaterial, downloadMaterialFile } = useDatabase();
  const { user } = useAuth();
  const bookmarks = useBookmarks(user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openReaderId, setOpenReaderId] = useState<string | null>(null);
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      if (selectedCourse !== 'all' && m.courseId !== selectedCourse) return false;
      if (selectedType !== 'all' && m.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description?.toLowerCase().includes(q);
        const matchAuthor = m.authorName.toLowerCase().includes(q);
        const course = courses.find(c => c.id === m.courseId);
        const matchCourse = course?.name.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchAuthor || matchCourse;
      }
      return true;
    });
  }, [materials, courses, selectedCourse, selectedType, searchQuery]);
  const materialIds = useMemo(() => filteredMaterials.map((item) => item.id), [filteredMaterials]);
  useSearchFocus('material', materialIds);

  useEffect(() => {
    const clearFilters = () => {
      const raw = sessionStorage.getItem('aztu_search_focus');
      if (!raw) return;
      try {
        if ((JSON.parse(raw) as { kind: string }).kind !== 'material') return;
        setSelectedCourse('all');
        setSelectedType('all');
        setSearchQuery('');
      } catch { /* Invalid focus data is cleared by useSearchFocus. */ }
    };
    window.addEventListener('aztu-search-focus', clearFilters);
    clearFilters();
    return () => window.removeEventListener('aztu-search-focus', clearFilters);
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`"${title}" materialını silmək istədiyinizə əminsiniz?`)) {
      await deleteMaterial(id);
    }
  };

  const getFileIcon = (title: string, type: string, fileName?: string) => {
    if (type === 'link') return <Link2 size={15} color="#2563eb" />;
    const ext = (fileName || title).split('.').pop()?.toLowerCase();
    if (ext === 'py' || ext === 'js' || ext === 'ts' || ext === 'html' || ext === 'css') {
      return <FileCode size={15} color="#0891b2" />;
    }
    if (ext === 'zip' || ext === 'rar' || ext === '7z' || ext === 'tar') {
      return <FileArchive size={15} color="#ea580c" />;
    }
    if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
      return <FileSpreadsheet size={15} color="#16a34a" />;
    }
    return <FileText size={15} color="#64748b" />;
  };

  return (
    <div className="view-content-flow">
      {/* 1. View Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Materiallar və PDF Baza</h1>
            <span className="count-badge">{filteredMaterials.length} resurs</span>
          </div>
          <p className="view-sub-title">
            6326A2 qrupunun 6 fənni üzrə mühazirə PDF-ləri, laboratoriya təlimatları, kod paketləri və konspektlər.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-create-primary"
        >
          <Plus size={15} />
          <span>Material əlavə et</span>
        </button>
      </div>

      {/* 2. File Browser Toolbar (Search, Type Filter Pills & Course Filter) */}
      <div className="materials-toolbar-bar">
        <div className="materials-search-box">
          <Search size={14} className="filter-icon-dim" />
          <input
            type="text"
            placeholder="Mühazirə, laboratoriya PDF-i, konspekt və ya fənn axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="materials-search-input"
          />
        </div>

        <div className="materials-type-pills">
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`mat-type-pill ${selectedType === 'all' ? 'is-active' : ''}`}
          >
            Hamısı
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('file')}
            className={`mat-type-pill ${selectedType === 'file' ? 'is-active' : ''}`}
          >
            Fayllar & PDF
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('link')}
            className={`mat-type-pill ${selectedType === 'link' ? 'is-active' : ''}`}
          >
            Keçidlər
          </button>
        </div>

        <div className="materials-course-filter">
          <Filter size={13} className="filter-icon-dim" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="materials-select"
          >
            <option value="all">Bütün fənlər (6 fənn)</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Resource / File Browser Table */}
      {filteredMaterials.length === 0 ? (
        <div className="view-compact-empty">
          <div className="compact-empty-icon">
            <FolderOpen size={20} />
          </div>
          <div className="compact-empty-content">
            <p className="compact-empty-title">
              {searchQuery || selectedCourse !== 'all' || selectedType !== 'all'
                ? 'Filtirə uyğun material tapılmadı.'
                : 'Hələ heç bir tədris materialı paylaşılmayıb.'}
            </p>
            <p className="compact-empty-desc">
              Mühazirə slaydlarını və ya laboratoriya fayllarını yükləyərək bazaya əlavə edin.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-compact-action"
          >
            <Plus size={13} />
            <span>Fayl yüklə</span>
          </button>
        </div>
      ) : (
        <div className="materials-browser-card">
          <div className="materials-table-header">
            <div className="mat-th mat-col-name">Ad və Təsvir</div>
            <div className="mat-th mat-col-course">Fənn</div>
            <div className="mat-th mat-col-type">Format</div>
            <div className="mat-th mat-col-author">Müəllim / Mənbə</div>
            <div className="mat-th mat-col-date">Tarix</div>
            <div className="mat-th mat-col-actions">Əməliyyat</div>
          </div>

          <div className="materials-table-body">
            {filteredMaterials.map((mat) => {
              const course = courses.find(c => c.id === mat.courseId);
              const isOwner = user?.id === mat.authorId && !mat.isBuiltIn;
              const isPdfReadable = Boolean(mat.linkUrl && mat.linkUrl.toLowerCase().endsWith('.pdf'));
              const isNotesReadable = Boolean(mat.studyNotes && mat.studyNotes.length > 0);
              const canReadInline = isPdfReadable || isNotesReadable;
              const isReaderOpen = openReaderId === mat.id;
              const formattedDate = formatAzDate(mat.createdAt, 'short');

              return (
                <React.Fragment key={mat.id}>
                <div id={`search-material-${mat.id}`} className="materials-table-row">
                  <div className="mat-td mat-col-name">
                    <div className="mat-icon-wrapper">
                      {getFileIcon(mat.title, mat.type, mat.fileName)}
                    </div>
                    <div className="mat-name-info">
                      <span
                        className="mat-title-text"
                        style={{ cursor: canReadInline ? 'pointer' : 'default' }}
                        onClick={() => {
                          if (canReadInline) {
                            setOpenReaderId(isReaderOpen ? null : mat.id);
                          }
                        }}
                      >
                        {mat.title}
                      </span>
                      {mat.description && (
                        <span className="mat-desc-text">{mat.description}</span>
                      )}
                    </div>
                  </div>

                  <div className="mat-td mat-col-course">
                    <span className="subject-chip">{course?.name || mat.courseId}</span>
                  </div>

                  <div className="mat-td mat-col-type">
                    <span className={`mat-format-badge ${mat.type}`}>
                      {mat.type === 'file' ? (mat.fileName?.split('.').pop()?.toUpperCase() || 'FAYL') : 'KEÇİD'}
                    </span>
                  </div>

                  <div className="mat-td mat-col-author">
                    <span className="mat-author-text">{mat.authorName}</span>
                  </div>

                  <div className="mat-td mat-col-date">
                    <span className="mat-date-text">{formattedDate}</span>
                  </div>

                  <div className="mat-td mat-col-actions">
                    <button type="button" className="mat-action-btn" title={bookmarks.isSaved('material', mat.id) ? 'Yadda saxlanılanlardan çıxar' : 'Yadda saxla'}
                      aria-label={bookmarks.isSaved('material', mat.id) ? 'Yadda saxlanılanlardan çıxar' : 'Yadda saxla'}
                      aria-pressed={bookmarks.isSaved('material', mat.id)} onClick={() => bookmarks.toggle('material', mat.id)}>
                      <Bookmark size={13} fill={bookmarks.isSaved('material', mat.id) ? 'currentColor' : 'none'} />
                    </button>

                    {canReadInline && (
                      <button
                        type="button"
                        className={`mat-action-btn read-inline ${isReaderOpen ? 'is-active' : ''}`}
                        title="Səhifədən çıxmadan burada oxu"
                        aria-expanded={isReaderOpen}
                        onClick={() => setOpenReaderId(isReaderOpen ? null : mat.id)}
                      >
                        <BookOpen size={13} />
                        <span>{isReaderOpen ? 'Bağla' : 'Oxu'}</span>
                      </button>
                    )}

                    {mat.type === 'file' ? (
                      <button
                        type="button"
                        onClick={() => downloadMaterialFile(mat)}
                        className="mat-action-btn download"
                        title="Faylı endir və ya aç"
                      >
                        <Download size={13} />
                        <span>Endir</span>
                      </button>
                    ) : (
                      <a
                        href={mat.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mat-action-btn open-link"
                        title="Keçidi aç"
                      >
                        <ExternalLink size={13} />
                        <span>Aç</span>
                      </a>
                    )}

                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => handleDelete(mat.id, mat.title)}
                        className="mat-action-btn delete"
                        title="Sil"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {isReaderOpen && canReadInline && (
                  <div className="mat-inline-reader">
                    <div className="mat-inline-reader-header">
                      <span className="mat-inline-reader-title">
                        {mat.title} ({mat.authorName})
                      </span>
                      <button
                        type="button"
                        className="mat-action-btn"
                        onClick={() => setOpenReaderId(null)}
                      >
                        Bağla ✕
                      </button>
                    </div>

                    {isPdfReadable && mat.linkUrl && (
                      <PhysicsPdfViewer url={mat.linkUrl} title={mat.title} />
                    )}

                    {isNotesReadable && mat.studyNotes && (
                      <div className="mat-study-sections">
                        {mat.studyNotes.map((sec) => (
                          <div key={sec.heading} className="mat-study-section-card">
                            <h4>{sec.heading}</h4>
                            <p>{sec.body}</p>
                            {sec.formulaOrCode && (
                              <pre className="mat-study-code">{sec.formulaOrCode}</pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      <CreateMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
