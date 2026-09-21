import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Users,
  Vote,
  Filter,
  Check
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { CreatePollModal } from '../modals/CreatePollModal';
import './ViewsCommon.css';

export const PollsView: React.FC = () => {
  const { polls, courses, voteInPoll, deletePoll, hasUserVotedInPoll, getVotesForPoll } = useDatabase();
  const { user } = useAuth();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const filteredPolls = useMemo(() => {
    return polls.filter(poll => {
      if (selectedCourse !== 'all' && poll.courseId !== selectedCourse) return false;
      const isClosed = poll.isClosed ?? false;
      if (activeTab === 'active' && isClosed) return false;
      if (activeTab === 'closed' && !isClosed) return false;
      return true;
    });
  }, [polls, selectedCourse, activeTab]);

  const activeCount = useMemo(() => polls.filter(p => !p.isClosed).length, [polls]);
  const closedCount = useMemo(() => polls.filter(p => p.isClosed).length, [polls]);

  const handleVote = async (pollId: string, optionId: string) => {
    try {
      voteInPoll(pollId, optionId);
    } catch (err: any) {
      alert(err.message || 'Səs verərkən xəta baş verdi');
    }
  };

  const handleDelete = async (pollId: string) => {
    if (window.confirm('Bu sorğunu silmək istədiyinizə əminsiniz?')) {
      try {
        deletePoll(pollId);
      } catch (err: any) {
        alert(err.message || 'Silinərkən xəta baş verdi');
      }
    }
  };

  return (
    <div className="view-content-flow">
      {/* 1. View Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Qrup Sorğuları</h1>
            <span className="count-badge">{filteredPolls.length} sorğu</span>
          </div>
          <p className="view-sub-title">
            Dərs saatları, kollokvium tarixləri və qrup qərarlarını kollektiv şəkildə səsvermə ilə həll edin.
          </p>
        </div>

        <button 
          className="btn-create-primary"
          onClick={() => setIsCreateOpen(true)}
          id="btn-create-poll"
        >
          <Plus size={15} />
          <span>Yeni sorğu</span>
        </button>
      </div>

      {/* 2. Poll Tabs & Course Filter (No heavy search bar) */}
      <div className="polls-controls-bar">
        <div className="polls-status-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`poll-tab-btn ${activeTab === 'active' ? 'is-active' : ''}`}
          >
            <span>Aktiv Sorğular</span>
            <span className="poll-tab-badge">{activeCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('closed')}
            className={`poll-tab-btn ${activeTab === 'closed' ? 'is-active' : ''}`}
          >
            <span>Bitmiş</span>
            <span className="poll-tab-badge">{closedCount}</span>
          </button>
        </div>

        <div className="polls-course-filter">
          <Filter size={13} className="filter-icon-dim" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="polls-select"
          >
            <option value="all">Bütün fənlər</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Poll Board Feed or Compact Empty */}
      {filteredPolls.length === 0 ? (
        <div className="view-compact-empty">
          <div className="compact-empty-icon">
            <Vote size={20} />
          </div>
          <div className="compact-empty-content">
            <p className="compact-empty-title">
              {activeTab === 'active'
                ? 'Hazırda aktiv qrup sorğusu yoxdur.'
                : 'Hələ bitmiş sorğu mövcud deyil.'}
            </p>
            <p className="compact-empty-desc">
              Kollokvium tarixi və ya tələbə qərarları barədə qrup fikrini öyrənmək üçün sorğu başladın.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="btn-compact-action"
          >
            <Plus size={13} />
            <span>Sorğu yarat</span>
          </button>
        </div>
      ) : (
        <div className="polls-board-grid">
          {filteredPolls.map(poll => {
            const course = courses.find(c => c.id === poll.courseId);
            const votes = getVotesForPoll(poll.id);
            const totalVotes = votes.length;
            const isOwner = user?.id === poll.authorId;
            const userVoted = hasUserVotedInPoll(poll.id);
            const userVote = votes.find(v => v.userId === user?.id);

            return (
              <div key={poll.id} className="poll-board-card">
                <div className="poll-card-top">
                  <div className="poll-tag-wrap">
                    <span className="subject-chip">{course?.name || poll.courseId}</span>
                    <span className="poll-author-text">{poll.authorName} tərəfindən</span>
                  </div>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => handleDelete(poll.id)}
                      className="poll-delete-btn"
                      title="Sorğunu sil"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>

                <h3 className="poll-question-text">{poll.question}</h3>

                <div className="poll-options-list">
                  {poll.options.map(option => {
                    const optVotes = votes.filter(v => v.optionId === option.id).length;
                    const pct = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
                    const isSelected = userVote?.optionId === option.id;

                    return (
                      <div
                        key={option.id}
                        onClick={() => !poll.isClosed && handleVote(poll.id, option.id)}
                        className={`poll-option-row ${isSelected ? 'is-selected' : ''} ${poll.isClosed ? 'is-disabled' : ''}`}
                      >
                        <div
                          className="poll-option-progress-fill"
                          style={{ width: `${pct}%` }}
                        />
                        <div className="poll-option-content">
                          <div className="poll-option-label-wrap">
                            <span className={`poll-radio-indicator ${isSelected ? 'checked' : ''}`}>
                              {isSelected && <Check size={10} color="#ffffff" />}
                            </span>
                            <span className="poll-option-text">{option.text}</span>
                          </div>
                          <div className="poll-option-stats">
                            <span className="poll-vote-count">{optVotes} səs</span>
                            <span className="poll-vote-pct">{pct}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="poll-card-footer">
                  <div className="poll-footer-left">
                    <Users size={12} />
                    <span>{totalVotes} nəfər səs verdi</span>
                  </div>
                  {userVoted && (
                    <span className="poll-voted-pill">
                      <CheckCircle2 size={11} />
                      Səs verdiniz
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <CreatePollModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
