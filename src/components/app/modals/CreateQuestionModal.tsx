import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useDatabase } from '../../../context/DatabaseContext';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const { courses, createQuestion } = useDatabase();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || 'math');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await createQuestion({
      title,
      courseId,
      details: details || undefined,
    });
    setIsSubmitting(false);

    if (res.success) {
      setTitle('');
      setDetails('');
      onClose();
    } else {
      setError(res.error || 'Sual verilərkən xəta baş verdi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Qrupa yeni sual ver">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error-alert">{error}</div>}

        <div className="form-group">
          <label className="form-label">Sualınız *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Məsələn: Supremum ilə maksimumun əsas fərqi nədir?"
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
          <label className="form-label">Əlavə izah və ya kontekst (İstəyə görə)</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Sualı daha aydın etmək üçün misal və ya mühazirə səhifəsini qeyd edin..."
            rows={3}
            className="form-input"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="modal-form-actions">
          <button type="button" onClick={onClose} className="btn-ghost">
            Ləğv et
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Göndərilir...' : 'Sualı paylaş'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
