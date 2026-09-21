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

const LAB_TEMPLATES = [
  {
    id: 'intro',
    title: 'Giriş: print() və input()',
    code: `# AzTU 6326A2 — Proqramlaşdırmanın əsasları-1
# Mövzu: Standart daxiletmə və çıxış
ad = input("Adınızı daxil edin: ")
yas = int(input("Yaşınızı daxil edin: "))

print(f"Salam, {ad}!")
print(f"5 ildən sonra yaşınız: {yas + 5}")
`,
  },
  {
    id: 'lab1',
    title: 'Lab 1: Riyazi Əməllər və math Modulu',
    code: `# AzTU CS-101 — Laboratoriya 1: Dairənin Sahəsi və Həcmi
import math

print("=== Dairə və Sferanın Hesablanması ===")
radius = float(input("Radiusu daxil edin (sm): "))

sahe = math.pi * (radius ** 2)
uzunluq = 2 * math.pi * radius
hecm = (4/3) * math.pi * (radius ** 3)

print(f"Dairənin sahəsi: {sahe:.2f} kv.sm")
print(f"Çevrənin uzunluğu: {uzunluq:.2f} sm")
print(f"Sferanın həcmi: {hecm:.2f} kub.sm")
`,
  },
  {
    id: 'lab2',
    title: 'Lab 2: Budaqlanma (if/elif/else) & Kvadrat Tənlik',
    code: `# AzTU CS-101 — Laboratoriya 2: Kvadrat Tənliyin Həlli (ax^2 + bx + c = 0)
import math

print("=== Kvadrat Tənlik Kalkulyatoru ===")
a = float(input("a əmsalını daxil edin: "))
b = float(input("b əmsalını daxil edin: "))
c = float(input("c əmsalını daxil edin: "))

if a == 0:
    if b == 0:
        print("Tənliyin həlli yoxdur və ya sonsuz sayda həll var.")
    else:
        x = -c / b
        print(f"Xətti tənlik: x = {x:.2f}")
else:
    D = b**2 - 4*a*c
    print(f"Diskriminant: D = {D:.2f}")
    if D > 0:
        x1 = (-b + math.sqrt(D)) / (2*a)
        x2 = (-b - math.sqrt(D)) / (2*a)
        print(f"İki həqiqi kök: x1 = {x1:.2f}, x2 = {x2:.2f}")
    elif D == 0:
        x = -b / (2*a)
        print(f"Bərabər iki kök: x = {x:.2f}")
    else:
        print("Həqiqi köklər yoxdur (kompleks köklər var).")
`,
  },
  {
    id: 'lab3',
    title: 'Lab 3: Dövrlər (for/while) və Faktorial',
    code: `# AzTU CS-101 — Laboratoriya 3: Faktorial və Rəqəmlərin Cəmi
n = int(input("Müsbət tam ədəd daxil edin: "))

# for dövrü ilə faktorial
faktorial = 1
for i in range(1, n + 1):
    faktorial *= i

# while dövrü ilə rəqəmlərin cəmi
reqem_cemi = 0
temp = n
while temp > 0:
    reqem_cemi += temp % 10
    temp //= 10

print(f"{n}! = {faktorial}")
print(f"{n} ədədinin rəqəmlərinin cəmi = {reqem_cemi}")
`,
  },
  {
    id: 'lab4',
    title: 'Lab 4: Siyahılar (Lists) və Xətti Axtarış',
    code: `# AzTU CS-101 — Laboratoriya 4: Tələbə Balları və Axtarış
ballar = [78, 92, 65, 88, 100, 54, 82, 91]
print("6326A2 qrupunun nümunəvi balları:", ballar)

orta = sum(ballar) / len(ballar)
maks = max(ballar)
minimum = min(ballar)

print(f"Tələbə sayı: {len(ballar)}")
print(f"Orta bal: {orta:.1f}")
print(f"Ən yüksək bal: {maks}")
print(f"Ən aşağı bal: {minimum}")

axtarilan = int(input("Axtarmaq istədiyiniz balı daxil edin: "))
if axtarilan in ballar:
    idx = ballar.index(axtarilan)
    print(f"Tapıldı! {axtarilan} balı siyahıda {idx + 1}-ci yerdədir.")
else:
    print(f"{axtarilan} balı siyahıda tapılmadı.")
`,
  },
  {
    id: 'lab5',
    title: 'Lab 5: Funksiyalar (def) və Fibonaççi',
    code: `# AzTU CS-101 — Laboratoriya 5: İstifadəçi Funksiyaları
def fibonacci(limit):
    """Verilmiş saya qədər Fibonaççi ardıcıllığını hesablayır"""
    ardicilliq = []
    a, b = 0, 1
    while len(ardicilliq) < limit:
        ardicilliq.append(a)
        a, b = b, a + b
    return ardicilliq

say = int(input("Neçə Fibonaççi ədədi hesablansın? "))
neticeler = fibonacci(say)
print(f"İlk {say} Fibonaççi ədədi:", neticeler)
`,
  },
];

export const PythonSandboxView: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('intro');
  const [code, setCode] = useState<string>(LAB_TEMPLATES[0].code);
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

  const handleSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedTemplateId(id);
    const found = LAB_TEMPLATES.find((t) => t.id === id);
    if (found) {
      setCode(found.code);
      setTerminalOutput('');
      setResult(null);
      setActivePrompt(null);
    }
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0f172a', fontSize: '0.8125rem', fontWeight: 600 }}>
              <Cpu size={14} color="#6366f1" />
              <span>Python 3.12 (AzTU CS-101)</span>
            </div>

            <div className="sandbox-template-selector">
              <label htmlFor="lab-select" className="sandbox-select-label">Lab Şablonu:</label>
              <select
                id="lab-select"
                className="sandbox-select-input"
                value={selectedTemplateId}
                onChange={handleSelectTemplate}
              >
                {LAB_TEMPLATES.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.title}
                  </option>
                ))}
              </select>
            </div>
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
