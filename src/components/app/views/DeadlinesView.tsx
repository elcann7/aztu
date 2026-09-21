import React, { useState, useMemo } from 'react';
import './ViewsCommon.css';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { CreateDeadlineModal } from '../modals/CreateDeadlineModal';
import { computeDeadlineStatus } from '../../../services/db';
import { Calendar, Plus, Trash2, Check, Clock, Filter, AlertCircle } from 'lucide-react';

export const DeadlinesView: React.FC = () => {
  const { deadlines, courses, toggleDeadline, deleteDeadline } = useDatabase();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((d) => {
      if (selectedCourse !== 'all' && d.courseId !== selectedCourse) return false;
      if (filterStatus === 'active' && d.isCompleted) return false;
      if (filterStatus === 'completed' && !d.isCompleted) return false;
      return true;
    });
  }, [deadlines, selectedCourse, filterStatus]);

  // Group by Time Schedule: This Week, Next Week / Later, Completed
  const groupedSchedule = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // End of this week (next Sunday)
    const dayOfWeek = today.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
    endOfWeek.setHours(23, 59, 59, 999);

    const thisWeek: typeof filteredDeadlines = [];
    const later: typeof filteredDeadlines = [];
    const completed: typeof filteredDeadlines = [];

    // Sort by dueDate ascending
    const sorted = [...filteredDeadlines].sort((a, b) => {
      return new Date(`${a.dueDate}T${a.dueTime || '23:59'}`).getTime() - new Date(`${b.dueDate}T${b.dueTime || '23:59'}`).getTime();
    });

    sorted.forEach((item) => {
      if (item.isCompleted) {
        completed.push(item);
      } else {
        const itemDate = new Date(`${item.dueDate}T${item.dueTime || '23:59'}`);
        if (itemDate <= endOfWeek) {
          thisWeek.push(item);
        } else {
          later.push(item);
        }
      }
    });

    return { thisWeek, later, completed };
  }, [filteredDeadlines]);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`"${title}" tapşırığını silmək istədiyinizə əminsiniz?`)) {
      deleteDeadline(id);
    }
  };

  return (
    <div className="view-content-flow">
      {/* 1. View Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Deadline-lar və Təqvim</h1>
            <span className="count-badge">{filteredDeadlines.length} tapşırıq</span>
          </div>
          <p className="view-sub-title">
            Fərdi laboratoriya işləri, esse təhvilləri və yaxınlaşan kollokvium tarixləri.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn-create-primary"
        >
          <Plus size={15} />
          <span>Tapşırıq əlavə et</span>
        </button>
      </div>

      {/* 2. Schedule Filter Bar (Status Pills + Course Filter) */}
      <div className="deadlines-controls-bar">
        <div className="deadlines-status-pills">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`dl-status-pill ${filterStatus === 'all' ? 'is-active' : ''}`}
          >
            Bütün tapşırıqlar
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('active')}
            className={`dl-status-pill ${filterStatus === 'active' ? 'is-active' : ''}`}
          >
            Yalnız aktivlər
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('completed')}
            className={`dl-status-pill ${filterStatus === 'completed' ? 'is-active' : ''}`}
          >
            Tamamlanmışlar
          </button>
        </div>

        <div className="deadlines-course-filter">
          <Filter size={13} className="filter-icon-dim" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="deadlines-select"
          >
            <option value="all">Bütün fənlər</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Grouped Schedule Feed */}
      {filteredDeadlines.length === 0 ? (
        <div className="view-compact-empty">
          <div className="compact-empty-icon">
            <Calendar size={20} />
          </div>
          <div className="compact-empty-content">
            <p className="compact-empty-title">
              {selectedCourse !== 'all' || filterStatus !== 'all'
                ? 'Filtirə uyğun tapşırıq tapılmadı.'
                : 'Yaxınlaşan aktiv deadline yoxdur.'}
            </p>
            <p className="compact-empty-desc">
              Kollokvium və ya laboratoriya işi üçün təqvimə yeni deadline qeyd edin.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-compact-action"
          >
            <Plus size={13} />
            <span>Tapşırıq əlavə et</span>
          </button>
        </div>
      ) : (
        <div className="schedule-groups-wrap">
          {/* Section: Bu Həftə */}
          {groupedSchedule.thisWeek.length > 0 && (
            <div className="schedule-section">
              <div className="schedule-section-header">
                <div className="schedule-header-left">
                  <span className="schedule-section-title">BU HƏFTƏ</span>
                  <span className="schedule-counter-tag">{groupedSchedule.thisWeek.length}</span>
                </div>
                <span className="schedule-section-line" />
              </div>

              <div className="schedule-items-card">
                {groupedSchedule.thisWeek.map((dl) => (
                  <DeadlineItemRow
                    key={dl.id}
                    dl={dl}
                    courses={courses}
                    toggleDeadline={toggleDeadline}
                    handleDelete={handleDelete}
                    userId={user?.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section: Gələn Həftə və ya Daha Sonra */}
          {groupedSchedule.later.length > 0 && (
            <div className="schedule-section">
              <div className="schedule-section-header">
                <div className="schedule-header-left">
                  <span className="schedule-section-title">GƏLƏN HƏFTƏ VƏ YA DAHA SONRA</span>
                  <span className="schedule-counter-tag">{groupedSchedule.later.length}</span>
                </div>
                <span className="schedule-section-line" />
              </div>

              <div className="schedule-items-card">
                {groupedSchedule.later.map((dl) => (
                  <DeadlineItemRow
                    key={dl.id}
                    dl={dl}
                    courses={courses}
                    toggleDeadline={toggleDeadline}
                    handleDelete={handleDelete}
                    userId={user?.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section: Tamamlanmışlar */}
          {groupedSchedule.completed.length > 0 && (
            <div className="schedule-section is-completed-section">
              <div className="schedule-section-header">
                <div className="schedule-header-left">
                  <span className="schedule-section-title">TAMAMLANMIŞLAR</span>
                  <span className="schedule-counter-tag">{groupedSchedule.completed.length}</span>
                </div>
                <span className="schedule-section-line" />
              </div>

              <div className="schedule-items-card">
                {groupedSchedule.completed.map((dl) => (
                  <DeadlineItemRow
                    key={dl.id}
                    dl={dl}
                    courses={courses}
                    toggleDeadline={toggleDeadline}
                    handleDelete={handleDelete}
                    userId={user?.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <CreateDeadlineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

interface DeadlineItemRowProps {
  dl: any;
  courses: any[];
  toggleDeadline: (id: string) => void;
  handleDelete: (id: string, title: string) => void;
  userId?: string;
}

const DeadlineItemRow: React.FC<DeadlineItemRowProps> = ({
  dl,
  courses,
  toggleDeadline,
  handleDelete,
  userId,
}) => {
  const course = courses.find((c) => c.id === dl.courseId);
  const status = computeDeadlineStatus(dl.dueDate, dl.dueTime);
  const isOwner = userId === dl.authorId;

  return (
    <div className={`schedule-item-row ${dl.isCompleted ? 'is-completed' : ''}`}>
      <button
        type="button"
        onClick={() => toggleDeadline(dl.id)}
        className={`schedule-check-box ${dl.isCompleted ? 'checked' : ''}`}
        title={dl.isCompleted ? 'Tamamlanmamış et' : 'Tamamlandı kimi qeyd et'}
      >
        {dl.isCompleted && <Check size={11} color="#ffffff" />}
      </button>

      <div className="schedule-main-info">
        <div className="schedule-tags-row">
          <span className="subject-chip">{course?.name || dl.courseId}</span>
          <span className="schedule-date-tag">
            <Clock size={11} />
            {new Date(`${dl.dueDate}T12:00:00`).toLocaleDateString('az-AZ', {
              day: 'numeric',
              month: 'short',
            })}
            {dl.dueTime && ` • ${dl.dueTime}`}
          </span>
        </div>

        <span className={`schedule-task-title ${dl.isCompleted ? 'is-done' : ''}`}>
          {dl.title}
        </span>
      </div>

      <div className="schedule-right-meta">
        {!dl.isCompleted && (
          <span className={`schedule-urgency-badge ${status.isOverdue || status.isUrgent ? 'is-urgent' : ''}`}>
            {status.isOverdue && <AlertCircle size={11} />}
            {status.label}
          </span>
        )}

        {isOwner && (
          <button
            type="button"
            onClick={() => handleDelete(dl.id, dl.title)}
            className="schedule-del-btn"
            title="Tapşırığı sil"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
    </div>
  );
};
