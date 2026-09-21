import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useDatabase } from '../../../context/DatabaseContext';
import type { NoteCategory } from '../../../services/db';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const { courses, createNote } = useDatabase();

  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || 'math');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoteCategory>('teacher_said');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = createNote({
      courseId,
      content,
      category,
    });

    if (res.success) {
      setContent('');
      onClose();
    } else {
      setError(res.error || 'Qeyd əlavə edilərkən xəta baş verdi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni qrup qeydi əlavə et">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error-alert">{error}</div>}

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
          <label className="form-label">Kateqoriya *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as NoteCategory)}
            className="form-input"
            required
          >
            <option value="teacher_said">Müəllim dedi (Dərsdə xüsusi vurğulanan)</option>
            <option value="exam_colloquium">İmtahan / Kollokvium</option>
            <option value="seminar">Seminar / Təqdimat</option>
            <option value="general">Ümumi qrup qeydi</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Qeyd mətni *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Məsələn: Müəllim dedi ki, gələn dərsdə 3-cü mövzudan soruşacaq və isbat kollokviuma daxildir."
            rows={4}
            required
            autoFocus
            className="form-input"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="modal-form-actions">
          <button type="button" onClick={onClose} className="btn-ghost">
            Ləğv et
          </button>
          <button type="submit" className="btn-primary">
            Qeydi paylaş
          </button>
        </div>
      </form>
    </Modal>
  );
};
