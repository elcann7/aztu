import { useEffect, useRef, useState } from 'react';
import type { MathLesson } from '../../data/mathLessons';
import './MathLearning.css';

type ChatMessage = { role: 'user' | 'model'; text: string };

const readChat = (key: string): ChatMessage[] => {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(key) || '[]') as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is ChatMessage =>
      typeof item === 'object' && item !== null &&
      (item.role === 'user' || item.role === 'model') && typeof item.text === 'string'
    ).slice(-20);
  } catch { return []; }
};

export const MathTutorChat = ({ lesson, userId }: { lesson: MathLesson; userId?: string }) => {
  const storageKey = `aztu_math_chat_v1_${userId || 'guest'}_${lesson.id}`;
  const [messages, setMessages] = useState<ChatMessage[]>(() => readChat(storageKey));
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-20))); } catch { /* Storage may be disabled. */ }
  }, [messages, storageKey]);

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const message = draft.trim();
    if (!message || busy) return;
    const prior = messages.slice(-4).map((item) => ({ ...item, text: item.text.slice(0, 1000) }));
    setMessages((current) => [...current, { role: 'user', text: message }]);
    setDraft('');
    setBusy(true);
    setError('');
    controller.current = new AbortController();
    try {
      const response = await fetch('/api/lecture-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, message, history: prior }),
        signal: controller.current.signal,
      });
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('AI xidməti bu lokal serverdə aktiv deyil. Vercel API serverini qoşun.');
      }
      const data = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || 'AI cavab verə bilmədi.');
      setMessages((current) => [...current, { role: 'model', text: data.reply! }]);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') return;
      setError(cause instanceof Error ? cause.message : 'Bağlantı xətası baş verdi.');
    } finally {
      setBusy(false);
      controller.current = null;
    }
  };

  return <section className="math-tutor" aria-labelledby={`tutor-${lesson.id}`}>
    <div className="math-section-heading"><div><span className="math-eyebrow">AI köməkçi</span>
      <h3 id={`tutor-${lesson.id}`}>Bu mühazirə haqqında soruş</h3></div>
      <div className="math-tutor-actions"><span className="math-tutor-model">Gemini 3.1 Flash-Lite</span>
        {messages.length > 0 && <button type="button" className="math-secondary-button" onClick={() => setMessages([])}>Söhbəti təmizlə</button>}</div></div>
    <p className="math-muted">Söhbət yalnız “{lesson.title}” mövzusuna aiddir. Sualını və ya ilişdiyin isbat addımını yaz.</p>
    <div className="math-chat-messages" aria-live="polite">
      {messages.length === 0 && <p className="math-chat-empty">Məsələn: “{lesson.questions[0].prompt}” sualının məntiqini addım-addım izah et.</p>}
      {messages.map((item, index) => <div key={index} className={`math-chat-bubble ${item.role}`}>
        <span>{item.role === 'user' ? 'Sən' : 'AI müəllim'}</span><p>{item.text}</p>
      </div>)}
      {busy && <p className="math-muted" role="status">Cavab hazırlanır...</p>}
    </div>
    <form onSubmit={send} className="math-chat-form">
      <label htmlFor={`math-chat-${lesson.id}`} className="sr-only">Bu mühazirə üzrə sual</label>
      <textarea id={`math-chat-${lesson.id}`} rows={2} maxLength={600} value={draft}
        onChange={(event) => setDraft(event.target.value)} placeholder="Bu qaydanın niyə doğru olduğunu izah et..." />
      <button type="submit" className="math-primary-button" disabled={busy || !draft.trim()}>Göndər</button>
    </form>
    {error && <p className="math-chat-error" role="alert">{error}</p>}
  </section>;
};
