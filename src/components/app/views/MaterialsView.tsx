import React, { useState, useMemo } from 'react';
import './ViewsCommon.css';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { CreateMaterialModal } from '../modals/CreateMaterialModal';
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
  FileSpreadsheet
} from 'lucide-react';

export const MaterialsView: React.FC = () => {
  const { materials, courses, deleteMaterial, downloadMaterialFile } = useDatabase();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`"${title}" materialını silmək istədiyinizə əminsiniz?`)) {
      await deleteMaterial(id);
    }
  };

  const getFileIcon = (title: string, type: string) => {
    if (type === 'link') return <Link2 size={15} color="#2563eb" />;
    const ext = title.split('.').pop()?.toLowerCase();
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
            <h1 className="view-main-title">Materiallar</h1>
            <span className="count-badge">{filteredMaterials.length} resurs</span>
          </div>
          <p className="view-sub-title">
            Mühazirə konspektləri, laboratoriya təlimatları, kod nümunələri və faydalı keçidlər.
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
            placeholder="Material və ya fayl axtar..."
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
            Fayllar
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
            <option value="all">Bütün fənlər</option>
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
              Mühazirə slaydlarını və ya laboratoriya fayllarını yükləyərək qrupunuzla bölüşün.
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
            <div className="mat-th mat-col-author">Yükləyən</div>
            <div className="mat-th mat-col-date">Tarix</div>
            <div className="mat-th mat-col-actions">Əməliyyat</div>
          </div>

          <div className="materials-table-body">
            {filteredMaterials.map((mat) => {
              const course = courses.find(c => c.id === mat.courseId);
              const isOwner = user?.id === mat.authorId;
              const formattedDate = new Date(mat.createdAt).toLocaleDateString('az-AZ', {
                day: 'numeric',
                month: 'short',
              });

              return (
                <div key={mat.id} className="materials-table-row">
                  <div className="mat-td mat-col-name">
                    <div className="mat-icon-wrapper">
                      {getFileIcon(mat.title, mat.type)}
                    </div>
                    <div className="mat-name-info">
                      <span className="mat-title-text">{mat.title}</span>
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
                    {mat.type === 'file' ? (
                      <button
                        type="button"
                        onClick={() => downloadMaterialFile(mat)}
                        className="mat-action-btn download"
                        title="Faylı endir"
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
