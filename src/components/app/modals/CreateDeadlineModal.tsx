import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useDatabase } from '../../../context/DatabaseContext';

interface CreateDeadlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export const CreateDeadlineModal: React.FC<CreateDeadlineModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const { courses, createDeadline } = useDatabase();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || 'math');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('23:59');
  const [points, setPoints] = useState<number | ''>(5);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = createDeadline({
      title,
      courseId,
      description: description || undefined,
      dueDate,
      dueTime: dueTime || '23:59',
      points: points ? Number(points) : undefined,
    });

    if (res.success) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPoints(5);
      onClose();
    } else {
      setError(res.error || 'Tapşırıq əlavə edilərkən xəta baş verdi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni tapşırıq / deadline əlavə et">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error-alert">{error}</div>}

        <div className="form-group">
          <label className="form-label">Başlıq *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Məsələn: Fərdi iş №2: Ekstremum məsələləri"
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Son tarix *</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Son saat (İstəyə görə)</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Bal dəyəri (İstəyə görə)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={points}
            onChange={(e) => setPoints(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="5"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Açıqlama və tələblər (İstəyə görə)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tapşırığın şərtləri, variant bölgüsü və təhvil formatı..."
            rows={2}
            className="form-input"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="modal-form-actions">
          <button type="button" onClick={onClose} className="btn-ghost">
            Ləğv et
          </button>
          <button type="submit" className="btn-primary">
            Tapşırığı əlavə et
          </button>
        </div>
      </form>
    </Modal>
  );
};
