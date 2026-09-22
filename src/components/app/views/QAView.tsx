import React, { useEffect, useMemo, useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  MessageSquare, 
  Search,
  Filter,
  Send,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  Bookmark,
  Code2,
} from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { useAuth } from '../../../context/AuthContext';
import { CreateQuestionModal } from '../modals/CreateQuestionModal';
import './ViewsCommon.css';
import { useBookmarks } from '../../../hooks/useBookmarks';
import { useRouter } from '../../../context/RouterContext';
import { useSearchFocus } from '../../../hooks/useSearchFocus';

export const QAView: React.FC = () => {
  const { 
    questions, 
    courses, 
    deleteQuestion, 
    createAnswer, 
    toggleAcceptedAnswer, 
    deleteAnswer,
    getAnswersForQuestion
  } = useDatabase();
  const { user } = useAuth();
  const bookmarks = useBookmarks(user?.id);
  const { navigate } = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Expanded questions state: questionId -> boolean
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  // Form input state: questionId -> string
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const filteredQuestions = useMemo(() => questions.filter(q => {
    if (q.details?.startsWith('__aztu_discussion__:')) return false;
    if (selectedCourse !== 'all' && q.courseId !== selectedCourse) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(query);
      const matchDetails = q.details?.toLowerCase().includes(query) || false;
      const course = courses.find(c => c.id === q.courseId);
      const matchCourse = course?.name.toLowerCase().includes(query) || false;
      if (!matchTitle && !matchDetails && !matchCourse) return false;
    }
    return true;
  }), [questions, selectedCourse, searchQuery, courses]);
  const questionIds = useMemo(() => filteredQuestions.map((item) => item.id), [filteredQuestions]);
  useSearchFocus('question', questionIds);

  useEffect(() => {
    const clearFilters = () => {
      const raw = sessionStorage.getItem('aztu_search_focus');
      if (!raw) return;
      try {
        if ((JSON.parse(raw) as { kind: string }).kind !== 'question') return;
        setSelectedCourse('all');
        setSearchQuery('');
      } catch { /* Invalid focus data is cleared by useSearchFocus. */ }
    };
    window.addEventListener('aztu-search-focus', clearFilters);
    clearFilters();
    return () => window.removeEventListener('aztu-search-focus', clearFilters);
  }, []);

  const toggleExpand = (questionId: string) => {
    setExpandedIds(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleAddAnswer = async (questionId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = (answerInputs[questionId] || '').trim();
    if (!text) return;

    try {
      setSubmittingId(questionId);
      const result = await createAnswer(questionId, text);
      if (!result.success) throw new Error(result.error || 'Cavab göndərilə bilmədi.');
      setAnswerInputs(prev => ({ ...prev, [questionId]: '' }));
      setExpandedIds(prev => ({ ...prev, [questionId]: true }));
    } catch (err: any) {
      alert(err.message || 'Cavab göndərilərkən xəta baş verdi');
    } finally {
      setSubmittingId(null);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Bu sualı və ona aid bütün cavabları silmək istədiyinizə əminsiniz?')) {
      try {
        await deleteQuestion(questionId);
      } catch (err: any) {
        alert(err.message || 'Silinərkən xəta baş verdi');
      }
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (window.confirm('Cavabı silmək istədiyinizə əminsiniz?')) {
      try {
        await deleteAnswer(answerId);
      } catch (err: any) {
        alert(err.message || 'Silinərkən xəta baş verdi');
      }
    }
  };

  const handleToggleVerify = async (answerId: string) => {
    try {
      await toggleAcceptedAnswer(answerId);
    } catch (err: any) {
      alert(err.message || 'Təsdiqləmə zamanı xəta baş verdi');
    }
  };

  return (
    <div className="view-content-flow">
      {/* 1. Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Sual-Cavab</h1>
            <span className="count-badge">{filteredQuestions.length} sual</span>
          </div>
          <p className="view-sub-title">
            Dərslər və laboratoriyalarla bağlı çətinlikləri soruşun və qrup yoldaşlarınızla müzakirə edin.
          </p>
        </div>

        <button 
          className="btn-create-primary"
          onClick={() => setIsCreateOpen(true)}
          id="btn-create-question"
        >
          <Plus size={15} />
          <span>Sual ver</span>
        </button>
      </div>

      {/* 2. Compact Search & Filter Toolbar */}
      <div className="qa-toolbar-bar">
        <div className="qa-search-box">
          <Search size={14} className="filter-icon-dim" />
          <input
            type="text"
            placeholder="Suallarda və fənlərdə axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="qa-search-input"
          />
        </div>

        <div className="qa-course-select-wrap">
          <Filter size={13} className="filter-icon-dim" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="qa-select"
          >
            <option value="all">Bütün fənlər</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Question Board Feed or Compact Empty */}
      {filteredQuestions.length === 0 ? (
        <div className="view-compact-empty">
          <div className="compact-empty-icon">
            <HelpCircle size={20} />
          </div>
          <div className="compact-empty-content">
            <p className="compact-empty-title">
              {searchQuery || selectedCourse !== 'all'
                ? 'Axtarışa uyğun sual tapılmadı.'
                : 'Hələ heç bir sual ünvanlanmayıb.'}
            </p>
            <p className="compact-empty-desc">
              Mühazirə və ya tapşırıqlarda aydın olmayan məqamı ilk olaraq siz soruşun.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="btn-compact-action"
          >
            <Plus size={13} />
            <span>Sual ver</span>
          </button>
        </div>
      ) : (
        <div className="qa-board-list">
          {filteredQuestions.map(q => {
            const course = courses.find(c => c.id === q.courseId);
            const answers = getAnswersForQuestion(q.id);
            const isQuestionAuthor = user?.id === q.authorId;
            const isExpanded = expandedIds[q.id] ?? false;
            const hasAccepted = answers.some(a => a.isAccepted);
            const formattedDate = new Date(q.createdAt).toLocaleDateString('az-AZ', {
              day: 'numeric',
              month: 'short',
            });

            return (
              <div key={q.id} id={`search-question-${q.id}`} className="qa-board-card">
                {/* Question Row */}
                <div className="qa-board-row">
                  {/* Status Indicator Column */}
                  <div className="qa-stats-col">
                    <div className={`qa-count-box ${answers.length > 0 ? 'has-answers' : ''} ${hasAccepted ? 'is-accepted' : ''}`}>
                      <span className="qa-count-number">{answers.length}</span>
                      <span className="qa-count-label">cavab</span>
                    </div>
                  </div>

                  {/* Main Question Content */}
                  <div className="qa-board-main">
                    <div className="qa-board-tags">
                      <span className="subject-chip">{course?.name || q.courseId}</span>
                      {hasAccepted && (
                        <span className="qa-status-pill accepted">
                          <CheckCircle2 size={11} />
                          Həll olundu
                        </span>
                      )}
                      <span className="qa-date-text">
                        <Clock size={11} />
                        {formattedDate}
                      </span>
                    </div>

                    <h3 
                      className="qa-board-title"
                      onClick={() => toggleExpand(q.id)}
                    >
                      {q.title}
                    </h3>

                    {q.details && (
                      <p className="qa-board-preview">{q.details}</p>
                    )}

                    <div className="qa-board-footer">
                      <span className="qa-author-tag">
                        <User size={11} />
                        {q.authorName}
                      </span>

                      <div className="qa-footer-actions">
                        <button type="button" className="qa-btn-toggle" title={bookmarks.isSaved('question', q.id) ? 'Yadda saxlanılanlardan çıxar' : 'Yadda saxla'}
                          aria-pressed={bookmarks.isSaved('question', q.id)} onClick={() => bookmarks.toggle('question', q.id)}>
                          <Bookmark size={12} fill={bookmarks.isSaved('question', q.id) ? 'currentColor' : 'none'} />
                          <span>Yadda saxla</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleExpand(q.id)}
                          className="qa-btn-toggle"
                        >
                          <MessageSquare size={12} />
                          <span>{isExpanded ? 'Gizlət' : (answers.length > 0 ? `Cavablar (${answers.length})` : 'Cavabla')}</span>
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>

                        {isQuestionAuthor && (
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="qa-btn-del"
                            title="Sualı sil"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Answers Section */}
                {isExpanded && (
                  <div className="qa-answers-tray">
                    <div className="qa-tray-header">
                      <span>{answers.length} Cavab</span>
                    </div>

                    {answers.length === 0 ? (
                      <p className="qa-tray-empty-text">Bu suala hələ cavab yazılmayıb. İlk cavabı siz yazın.</p>
                    ) : (
                      <div className="qa-answers-list">
                        {answers.map(ans => {
                          const isAnswerAuthor = user?.id === ans.authorId;
                          const ansDate = new Date(ans.createdAt).toLocaleDateString('az-AZ', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          });

                          return (
                            <div key={ans.id} className={`qa-answer-bubble ${ans.isAccepted ? 'is-verified-solution' : ''}`}>
                              <div className="qa-ans-header">
                                <div className="qa-ans-user">
                                  <span className="qa-ans-author">{ans.authorName}</span>
                                  <span className="qa-ans-time">{ansDate}</span>
                                </div>

                                <div className="qa-ans-actions">
                                  {/* Verified Badge or Toggle button */}
                                  {isQuestionAuthor ? (
                                    <button
                                      type="button"
                                      onClick={() => handleToggleVerify(ans.id)}
                                      className={`qa-verify-btn ${ans.isAccepted ? 'is-verified' : ''}`}
                                      title={ans.isAccepted ? 'Təsdiqi geri götür' : 'Düzgün cavab kimi qəbul et'}
                                    >
                                      <CheckCircle2 size={12} />
                                      <span>{ans.isAccepted ? 'Qəbul edilmiş cavab' : 'Düzgün cavab kimi işarələ'}</span>
                                    </button>
                                  ) : ans.isAccepted ? (
                                    <span className="qa-verified-badge">
                                      <CheckCircle2 size={12} />
                                      <span>Qəbul edilmiş cavab</span>
                                    </span>
                                  ) : null}

                                  {isAnswerAuthor && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteAnswer(ans.id)}
                                      className="qa-btn-del-sm"
                                      title="Cavabı sil"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="qa-ans-body">
                                {(() => {
                                  const match = ans.content.match(/```(?:python|py)?\s*\n([\s\S]*?)```/i);
                                  if (!match) return ans.content;
                                  return <>
                                    {ans.content.slice(0, match.index)}
                                    <pre className="qa-code-snippet"><code>{match[1]}</code></pre>
                                    <button type="button" className="qa-open-code" onClick={() => {
                                      sessionStorage.setItem('aztu_sandbox_shared_code', match[1]);
                                      navigate('/app/sandbox');
                                    }}><Code2 size={12} /> Sandbox-da aç</button>
                                    {ans.content.slice((match.index || 0) + match[0].length)}
                                  </>;
                                })()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Inline Answer Input Box */}
                    <form onSubmit={(e) => handleAddAnswer(q.id, e)} className="qa-answer-form">
                      <textarea
                        rows={3}
                        placeholder="Cavabınızı yazın. Python kodu üçün aşağıdakı düymədən istifadə edin..."
                        value={answerInputs[q.id] || ''}
                        onChange={(e) => setAnswerInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                        className="qa-answer-input"
                      />
                      <button type="button" className="qa-code-template" onClick={() => setAnswerInputs(prev => ({
                        ...prev, [q.id]: `${prev[q.id] || ''}${prev[q.id] ? '\n' : ''}\`\`\`python\n\n\`\`\``,
                      }))}><Code2 size={12} /> Kod əlavə et</button>
                      <button
                        type="submit"
                        disabled={submittingId === q.id || !(answerInputs[q.id] || '').trim()}
                        className="qa-answer-send-btn"
                      >
                        <Send size={12} />
                        <span>Cavabla</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <CreateQuestionModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
