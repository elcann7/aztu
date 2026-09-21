import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useDatabase } from '../../../context/DatabaseContext';
import { Plus, Trash2 } from 'lucide-react';

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export const CreatePollModal: React.FC<CreatePollModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
}) => {
  const { courses, createPoll } = useDatabase();

  const [question, setQuestion] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || '');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (index: number, val: string) => {
    const next = [...options];
    next[index] = val;
    setOptions(next);
  };

  const handleAddOption = () => {
    if (options.length < 8) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, idx) => idx !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = createPoll({
      question,
      courseId: courseId || undefined,
      options,
    });

    if (res.success) {
      setQuestion('');
      setOptions(['', '']);
      onClose();
    } else {
      setError(res.error || 'Sorğu yaradılarkən xəta baş verdi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni qrup sorğusu yarat">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <div className="modal-error-alert">{error}</div>}

        <div className="form-group">
          <label className="form-label">Sorğu sualı *</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Məsələn: Seminar təqdimatını hansı gün edək?"
            required
            autoFocus
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Aid olduğu fənn (İstəyə görə)</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="form-input"
          >
            <option value="">Ümumi qrup sorğusu</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Variantlar * (Minimum 2)</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {options.map((opt, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Variant ${idx + 1}`}
                  required
                  className="form-input"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="sidebar-logout-btn"
                    style={{ flexShrink: 0 }}
                    title="Variantı sil"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 8 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="view-pill"
              style={{ alignSelf: 'flex-start', marginTop: '6px', cursor: 'pointer' }}
            >
              <Plus size={12} />
              <span>Variant əlavə et</span>
            </button>
          )}
        </div>

        <div className="modal-form-actions">
          <button type="button" onClick={onClose} className="btn-ghost">
            Ləğv et
          </button>
          <button type="submit" className="btn-primary">
            Sorğunu başlat
          </button>
        </div>
      </form>
    </Modal>
  );
};
