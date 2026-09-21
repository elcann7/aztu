import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Code2, 
  Clock, 
  CheckCircle2, 
  Cpu,
  CornerDownLeft
} from 'lucide-react';
import { 
  executePythonCode, 
  type PythonExecutionResult 
} from '../../../services/pythonRunner';
import './PythonSandboxView.css';

const DEFAULT_CODE = `# 6326A2 İnteraktiv Python Nümunəsi
ad = input("Adınızı daxil edin: ")
yas = int(input("Yaşınızı daxil edin: "))

print(f"Xoş gəldin, {ad}!")
print(f"5 ildən sonra yaşınız: {yas + 5}")
`;

export const PythonSandboxView: React.FC = () => {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [activePrompt, setActivePrompt] = useState<{
    prompt: string;
    resolve: (val: string) => void;
  } | null>(null);
  const [currentInput, setCurrentInput] = useState<string>('');

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalOutput, activePrompt, result]);

  useEffect(() => {
    if (activePrompt && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activePrompt]);

  const handleRun = async () => {
    if (!code.trim() || isRunning) return;
    setIsRunning(true);
    setResult(null);
    setTerminalOutput('');
    setActivePrompt(null);
    setCurrentInput('');

    try {
      const res = await executePythonCode(code, {
        onRequestInput: (promptStr: string) => {
          return new Promise<string>((resolve) => {
            setActivePrompt({ prompt: promptStr, resolve });
          });
        },
        onStdout: (msg: string) => {
          setTerminalOutput((prev) => prev + msg);
        },
        onStderr: (msg: string) => {
          setTerminalOutput((prev) => prev + msg);
        },
      });

      setResult(res);
      // Fallback if stdout wasn't streamed
      if (res.stdout) {
        setTerminalOutput(res.stdout);
      }
    } catch (err: any) {
      setTerminalOutput((prev) => prev + '\n[Xəta]: ' + (err.message || String(err)));
    } finally {
      setIsRunning(false);
      setActivePrompt(null);
    }
  };

  const handleTerminalInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePrompt) return;

    const val = currentInput;
    const promptText = activePrompt.prompt;
    const resolver = activePrompt.resolve;

    setTerminalOutput((prev) => prev + (promptText ? promptText : '') + val + '\n');
    setCurrentInput('');
    setActivePrompt(null);
    resolver(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
    // Handle tab key indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const updated = code.substring(0, start) + '    ' + code.substring(end);
      setCode(updated);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
    setTerminalOutput('');
    setActivePrompt(null);
    setCurrentInput('');
  };

  return (
    <div className="sandbox-view-flow">
      {/* View Header */}
      <div className="view-header-strip">
        <div className="view-header-meta">
          <div className="view-title-row">
            <h1 className="view-main-title">Python Sandbox</h1>
            <span className="count-badge" style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}>
              WebAssembly CPython
            </span>
          </div>
          <p className="view-sub-title">
            6326A2 tələbələri üçün brauzerdə real çalışan Python mühiti. Birbaşa daxili terminaldan <code style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>input()</code> qəbul edir.
          </p>
        </div>
      </div>

      {/* Main Studio Card */}
      <div className="sandbox-studio-card">
        {/* Toolbar */}
        <div className="sandbox-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.8125rem', fontWeight: 500 }}>
            <Cpu size={14} color="#6366f1" />
            <span>Python 3.12 Interaktiv Terminalı</span>
          </div>

          <div className="sandbox-actions-row">
            <button
              type="button"
              onClick={handleClear}
              className="btn-sandbox-clear"
              title="Kodu və terminalı təmizlə"
            >
              <RotateCcw size={13} />
              <span>Təmizlə</span>
            </button>

            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning && !activePrompt}
              className="btn-sandbox-run"
            >
              <Play size={13} />
              <span>{isRunning ? (activePrompt ? 'Gözlənilir (Input)...' : 'İcra olunur...') : 'İcra et (Ctrl+Enter)'}</span>
            </button>
          </div>
        </div>

        {/* Split Editor and Terminal */}
        <div className="sandbox-split-grid">
          {/* Left: Code Editor */}
          <div className="sandbox-editor-pane">
            <div className="editor-header-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code2 size={13} />
                <span>main.py</span>
              </div>
              <span>Python 3.12</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="# Python kodunuzu bura yazın...&#10;ad = input('Adınız: ')&#10;print('Salam, ' + ad)"
              className="sandbox-code-textarea"
              spellCheck={false}
            />
          </div>

          {/* Right: Terminal Output */}
          <div className="sandbox-terminal-pane">
            <div className="terminal-header-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={13} />
                <span>Terminal (stdout / stdin)</span>
              </div>
              {result && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8' }}>
                  <Clock size={11} />
                  <span>{result.executionTimeMs} ms</span>
                </div>
              )}
            </div>

            <div className="terminal-output-body" ref={terminalBodyRef}>
              {!terminalOutput && !isRunning && !result && !activePrompt && (
                <div className="terminal-empty-text">
                  Kodu yazdıqdan sonra "İcra et" düyməsinə və ya [Ctrl + Enter] qısayoluna basaraq nəticəni burada görə bilərsiniz.
                </div>
              )}

              {terminalOutput && (
                <pre className="terminal-stdout-text">{terminalOutput}</pre>
              )}

              {result?.stderr && (
                <pre className="terminal-stderr-text">{result.stderr}</pre>
              )}

              {/* Direct In-Terminal Prompt Input */}
              {activePrompt && (
                <form onSubmit={handleTerminalInputSubmit} className="terminal-interactive-input-line">
                  {activePrompt.prompt && (
                    <span className="terminal-prompt-label">{activePrompt.prompt}</span>
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    className="terminal-inline-input"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="yazın və Enter basın..."
                  />
                  <button type="submit" className="terminal-input-enter-btn" title="Göndər (Enter)">
                    <CornerDownLeft size={11} />
                  </button>
                </form>
              )}

              {isRunning && !activePrompt && !terminalOutput && (
                <div className="terminal-running-spinner">
                  <span className="terminal-cursor-blink">█</span>
                  <span>Python mühərriki işə salınır və kod icra olunur...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="sandbox-footer-status">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={13} color="#166534" />
            <span>Brauzerdə birbaşa terminal daxilində real Python icrası</span>
          </div>
          <span>6326A2 Qrupu • AzTU</span>
        </div>
      </div>
    </div>
  );
};
