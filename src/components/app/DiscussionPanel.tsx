import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { SUGGESTION_PREFIX } from '../../services/discussion';
import { parseRevision } from '../../services/discussion';
import { useAuth } from '../../context/AuthContext';
import type { Answer } from '../../services/db';
import './DiscussionPanel.css';

interface DiscussionPanelProps {
  targetType: 'note' | 'material';
  targetId: string;
  targetTitle: string;
  courseId: string;
  ownerId: string;
  ownerName: string;
}

const Comment: React.FC<{ answer: Answer; canAccept: boolean; onAccept: (answer: Answer) => void; accepted: boolean; busy: boolean }> = ({ answer, canAccept, onAccept, accepted, busy }) => {
  const isSuggestion = answer.content.startsWith(SUGGESTION_PREFIX);
  const revision = parseRevision(answer.content);
  return <div className={`discussion-comment ${isSuggestion ? 'is-suggestion' : ''}`}>
    <div className="discussion-comment-meta">
      <strong>{answer.authorName}</strong>
      <time dateTime={answer.createdAt}>{new Date(answer.createdAt).toLocaleString('az-AZ')}</time>
      {isSuggestion && <span>Düzəliş təklifi</span>}
      {revision && <span>Qəbul edilmiş düzəliş</span>}
    </div>
    <p>{isSuggestion ? answer.content.slice(SUGGESTION_PREFIX.length) : revision ? revision.content : answer.content}</p>
    {isSuggestion && canAccept && !accepted && <button type="button" className="discussion-accept" disabled={busy}
      onClick={() => onAccept(answer)}>Düzəlişi qəbul et</button>}
  </div>;
};

export const DiscussionPanel: React.FC<DiscussionPanelProps> = (props) => {
  const { getDiscussionComments, createDiscussionComment } = useDatabase();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [kind, setKind] = useState<'comment' | 'suggestion'>('comment');
  const [busy, setBusy] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const comments = getDiscussionComments(props.targetType, props.targetId);
  const acceptedIds = new Set(comments.map((item) => parseRevision(item.content)?.suggestionId).filter(Boolean));

  const accept = async (answer: Answer) => {
    if (acceptingId) return;
    if (!window.confirm('Bu düzəlişi konspektin yeni məzmunu kimi qəbul etmək istəyirsiniz?')) return;
    setError(null);
    setAcceptingId(answer.id);
    const result = await createDiscussionComment({ ...props, kind: 'revision', relatedId: answer.id,
      content: answer.content.slice(SUGGESTION_PREFIX.length) });
    setAcceptingId(null);
    if (!result.success) setError(result.error || 'Düzəliş qəbul edilə bilmədi.');
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim() || busy) return;
    setBusy(true);
    setError(null);
    const result = await createDiscussionComment({ ...props, content, kind });
    setBusy(false);
    if (result.success) {
      setContent('');
      setKind('comment');
    } else {
      setError(result.error || 'Göndərilə bilmədi.');
    }
  };

  return <section className="discussion-panel" aria-label="Paylaşımın müzakirəsi">
    <h3>Müzakirə · {comments.length}</h3>
    {comments.length === 0 ? <p className="discussion-empty">Hələ fikir yazılmayıb. İlk siz yazın.</p> :
      <div className="discussion-list">{comments.map((answer) => <Comment key={answer.id} answer={answer}
        canAccept={props.targetType === 'note' && user?.id === props.ownerId}
        onAccept={accept} accepted={acceptedIds.has(answer.id)} busy={acceptingId !== null} />)}</div>}
    <form onSubmit={submit}>
      {props.targetType === 'note' && <label className="discussion-kind">
        <span>Yazı növü</span>
        <select value={kind} onChange={(event) => setKind(event.target.value as 'comment' | 'suggestion')}>
          <option value="comment">Rəy və ya sual</option>
          <option value="suggestion">Konspektə düzəliş təklifi</option>
        </select>
      </label>}
      <label htmlFor={`discussion-input-${props.targetId}`}>Fikrinizi yazın</label>
      <textarea id={`discussion-input-${props.targetId}`} value={content}
        onChange={(event) => setContent(event.target.value)} rows={3}
        placeholder={kind === 'suggestion' ? 'Təklif etdiyiniz düzgün mətn...' : 'Sualınızı və ya fikrinizi yazın...'}
        required maxLength={3000} />
      {error && <p className="discussion-error" role="alert">{error}</p>}
      <button type="submit" className="btn-primary" disabled={busy || !content.trim()}>
        {busy ? 'Göndərilir...' : 'Göndər'}
      </button>
    </form>
  </section>;
};
