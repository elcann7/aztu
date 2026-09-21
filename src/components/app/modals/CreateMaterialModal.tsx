import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useDatabase } from '../../../context/DatabaseContext';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface CreateMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export const CreateMaterialModal: React.FC<CreateMaterialModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const { courses, createMaterial } = useDatabase();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || 'math');
  const [type, setType] = useState<'file' | 'link'>('file');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await createMaterial({
      title,
      courseId,
      type,
      description: description || undefined,
      file: type === 'file' ? file || undefined : undefined,
      linkUrl: type === 'link' ? linkUrl || undefined : undefined,
    });

    setIsSubmitting(false);

    if (res.success) {
      setTitle('');
      setDescription('');
      setFile(null);
      setLinkUrl('');
      onClose();
    } else {
      setError(res.error || 'Xəta baş verdi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni material əlavə et">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error-alert">{error}</div>}

        <div className="form-group">
          <label className="form-label">Başlıq *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Məsələn: Mühazirə 04 — Qeyri-müəyyən inteqral"
            required
            autoFocus
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fənn *</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="form-input"
            required
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Material tipi *</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setType('file')}
              className={`view-pill ${type === 'file' ? 'active' : ''}`}
              style={{ padding: '0.4rem 0.8rem' }}
            >
              <Upload size={13} />
              <span>Fayl yüklə</span>
            </button>
            <button
              type="button"
              onClick={() => setType('link')}
              className={`view-pill ${type === 'link' ? 'active' : ''}`}
              style={{ padding: '0.4rem 0.8rem' }}
            >
              <LinkIcon size={13} />
              <span>Link (URL)</span>
            </button>
          </div>
        </div>

        {type === 'file' ? (
          <div className="form-group">
            <label className="form-label">Fayl seçin * (Maks. 25 MB)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="form-input"
              style={{ fontSize: '0.75rem' }}
            />
            {file && (
              <span style={{ fontSize: '0.7rem', color: '#166534' }}>
                Seçildi: {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </span>
            )}
          </div>
        ) : (
          <div className="form-group">
            <label className="form-label">Link (URL) *</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              required
              className="form-input"
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Qısa açıqlama (İstəyə görə)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Material haqqında qısa qeyd..."
            rows={2}
            className="form-input"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="modal-form-actions">
          <button type="button" onClick={onClose} className="btn-ghost" disabled={isSubmitting}>
            Ləğv et
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saxlanılır...' : 'Materialı paylaş'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
