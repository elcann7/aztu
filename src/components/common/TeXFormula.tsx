import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Copy, Check } from 'lucide-react';
import './TeXFormula.css';

/**
 * Checks if a string is Python or programming source code
 */
export function isPythonCode(code: string): boolean {
  if (!code) return false;
  const trimmed = code.trim();
  return (
    trimmed.startsWith('def ') ||
    trimmed.startsWith('class ') ||
    trimmed.startsWith('import ') ||
    trimmed.startsWith('from ') ||
    trimmed.includes('def ') ||
    trimmed.includes('import ') ||
    trimmed.includes('print(') ||
    trimmed.includes('return ') ||
    trimmed.includes('elif ') ||
    trimmed.includes('lambda ') ||
    trimmed.includes('strftime(') ||
    trimmed.includes('timedelta(') ||
    trimmed.includes('for item in ') ||
    trimmed.includes('while ') ||
    (trimmed.includes('(') && trimmed.includes('):') && trimmed.includes('\n'))
  );
}

/**
 * Normalizes pseudo-math and ASCII representations into valid KaTeX expressions
 */
export function toTeX(input: string): string {
  if (!input) return '';
  let s = input.trim();

  // Convert limit syntax: lim(x \to x_0^-) or lim(x->x0) or lim(n->\infty)
  s = s.replace(/lim\s*\(([^)]+)\)/g, (_match, inner) => {
    return `\\lim_{${toTeXInline(inner)}}`;
  });

  // Convert roots: √(something) -> \sqrt{something}
  s = s.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
  s = s.replace(/√([a-zA-Z0-9]+)/g, '\\sqrt{$1}');

  return toTeXInline(s);
}

/**
 * Helper to normalize inline symbols and Unicode math characters
 */
export function toTeXInline(input: string): string {
  if (!input) return '';
  let s = input;

  // Unicode math symbols
  s = s
    .replace(/∈/g, ' \\in ')
    .replace(/∉/g, ' \\notin ')
    .replace(/⊆/g, ' \\subseteq ')
    .replace(/⊂/g, ' \\subset ')
    .replace(/∪/g, ' \\cup ')
    .replace(/∩/g, ' \\cap ')
    .replace(/∅/g, ' \\emptyset ')
    .replace(/∀/g, ' \\forall ')
    .replace(/∃/g, ' \\exists ')
    .replace(/⇔|<=>/g, ' \\iff ')
    .replace(/⇒|=>/g, ' \\implies ')
    .replace(/→|->/g, ' \\to ')
    .replace(/±/g, ' \\pm ')
    .replace(/∓/g, ' \\mp ')
    .replace(/≠/g, ' \\neq ')
    .replace(/≤|<=/g, ' \\le ')
    .replace(/≥|>=/g, ' \\ge ')
    .replace(/≈/g, ' \\approx ')
    .replace(/∼/g, ' \\sim ')
    .replace(/·/g, ' \\cdot ')
    .replace(/×/g, ' \\times ')
    .replace(/∞/g, ' \\infty ')
    .replace(/Δ/g, ' \\Delta ')
    .replace(/Σ/g, ' \\sum ')
    .replace(/ε/g, ' \\varepsilon ')
    .replace(/α/g, ' \\alpha ')
    .replace(/β/g, ' \\beta ')
    .replace(/γ/g, ' \\gamma ')
    .replace(/ω/g, ' \\omega ')
    .replace(/λ/g, ' \\lambda ')
    .replace(/π/g, ' \\pi ')
    .replace(/θ/g, ' \\theta ')
    .replace(/₀/g, '_0')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/₄/g, '_4')
    .replace(/₅/g, '_5')
    .replace(/₆/g, '_6')
    .replace(/₇/g, '_7')
    .replace(/₈/g, '_8')
    .replace(/₉/g, '_9')
    .replace(/ₙ/g, '_n')
    .replace(/ᵢ/g, '_i')
    .replace(/ₖ/g, '_k')
    .replace(/₊/g, '_+')
    .replace(/₋/g, '_-')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/ⁿ/g, '^n')
    .replace(/−/g, '-');

  // Fix common ascii patterns: x0 -> x_0, L1 -> L_1, L2 -> L_2, x_0-0 -> x_0^-
  s = s.replace(/\b([a-zA-Z])([0-9])\b/g, '$1_$2');
  s = s.replace(/x_0-0\b/g, 'x_0^-');
  s = s.replace(/x_0\+0\b/g, 'x_0^+');

  return s;
}

interface TeXFormulaProps {
  formula?: string;
  tex?: string; // alias for formula
  displayMode?: boolean;
  className?: string;
}

/**
 * Standard KaTeX Formula Renderer (Display or Inline)
 */
export const TeXFormula: React.FC<TeXFormulaProps> = ({
  formula,
  tex,
  displayMode = true,
  className = '',
}) => {
  const rawInput = formula || tex || '';

  const html = useMemo(() => {
    if (!rawInput.trim()) return null;
    try {
      const converted = toTeX(rawInput);
      return katex.renderToString(converted, {
        throwOnError: false,
        displayMode,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [rawInput, displayMode]);

  if (!rawInput.trim()) return null;

  if (!html) {
    return <code className={`tex-fallback-code ${className}`}>{rawInput}</code>;
  }

  return (
    <div
      className={`tex-rendered-math ${displayMode ? 'is-display' : 'is-inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Inline KaTeX Math Renderer (Ideal for symbol table keys and inline vars)
 */
export const TeXInline: React.FC<{ math?: string; className?: string }> = ({
  math,
  className = '',
}) => {
  if (!math) return null;

  const html = useMemo(() => {
    try {
      const converted = toTeX(math);
      return katex.renderToString(converted, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });
    } catch {
      return null;
    }
  }, [math]);

  if (!html) {
    return <code className={`tex-inline-fallback ${className}`}>{math}</code>;
  }

  return (
    <span
      className={`tex-inline-math ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Helper to split a formula line into label, math, and trailing comment
 */
function parseFormulaLine(rawLine: string): {
  label: string;
  formula: string;
  comment: string;
  isHeaderOnly: boolean;
} {
  const line = rawLine.trim();
  if (!line) return { label: '', formula: '', comment: '', isHeaderOnly: false };

  // Detect pure section headers, e.g. "Qayda 1 (...):" or "Standart cisimlərin ...:"
  if (/^([A-Za-z0-9ƏəIıÖöÜüÇçŞşĞğ\s\(\)\/–—]+:)$/.test(line)) {
    return { label: line, formula: '', comment: '', isHeaderOnly: true };
  }

  // Detect label prefix, e.g. "Altçoxluq: ...", "• Halqa: ...", "Ardıcıl: ..."
  let label = '';
  let rest = line;
  const labelMatch = line.match(/^((?:•\s*)?[A-Za-z0-9ƏəIıÖöÜüÇçŞşĞğ\s\(\)\/\-–]{2,40}:)\s*(.+)$/);
  if (labelMatch) {
    label = labelMatch[1].trim();
    rest = labelMatch[2].trim();
  }

  // Detect trailing comment in parentheses, e.g. "(qüvvə momenti, N·m)" or "(Heyne)"
  let comment = '';
  const commentMatch = rest.match(/^(.*?)\s*(\([A-Za-z0-9ƏəIıÖöÜüÇçŞşĞğ\s,·\/\-–]{2,50}\))$/);
  if (commentMatch) {
    rest = commentMatch[1].trim();
    comment = commentMatch[2].trim();
  }

  return { label, formula: rest, comment, isHeaderOnly: false };
}

/**
 * Formula block for study notes: handles multi-line math formulas or Python code snippets
 */
export const TeXFormulaBlock: React.FC<{ content: string; className?: string }> = ({
  content,
  className = '',
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If code snippet, render as syntax box
  if (isPythonCode(content)) {
    return (
      <div className={`tex-code-block-container ${className}`}>
        <div className="tex-code-block-header">
          <span className="tex-code-lang-tag">Python 3 / Alqoritm</span>
          <button
            type="button"
            className="tex-copy-btn"
            onClick={handleCopy}
            title="Kodu kopyala"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
          </button>
        </div>
        <pre className="tex-code-pre">
          <code>{content}</code>
        </pre>
      </div>
    );
  }

  // Math formula lines
  const lines = content.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div className={`tex-formula-block-card ${className}`}>
      <div className="tex-formula-block-header">
        <span className="tex-formula-lang-tag">Riyazi İfadə & Teorem</span>
        <button
          type="button"
          className="tex-copy-btn"
          onClick={handleCopy}
          title="Düsturu kopyala"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
        </button>
      </div>

      <div className="tex-formula-lines-list">
        {lines.map((rawLine, idx) => {
          const parsed = parseFormulaLine(rawLine);

          if (parsed.isHeaderOnly) {
            return (
              <div key={idx} className="tex-formula-section-heading">
                {parsed.label}
              </div>
            );
          }

          return (
            <div key={idx} className="tex-formula-line-row">
              {parsed.label && (
                <span className="tex-formula-line-label">{parsed.label}</span>
              )}
              {parsed.formula && (
                <div className="tex-formula-line-math">
                  <TeXFormula formula={parsed.formula} displayMode={false} />
                </div>
              )}
              {parsed.comment && (
                <span className="tex-formula-line-comment">{parsed.comment}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Text renderer that smartly highlights inline math formulas, dollar signs $...$, or TeX variables
 */
export const TeXMathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  if (!text) return null;

  // Split on $...$ LaTeX delimiters if present
  if (text.includes('$')) {
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
      <span className={`tex-math-text-container ${className}`}>
        {parts.map((part, i) => {
          if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
            const math = part.slice(1, -1);
            return <TeXInline key={i} math={math} />;
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  }

  // Look for standalone math expressions like L_1 = f(x_0 - 0), \Delta x = ..., f(x_0)
  const mathRegex = /(\b[Lfx]\s*[_=][^,.;()]+|\b\\?[A-Za-z]+[_^][a-zA-Z0-9+\-]+)/g;
  const match = text.search(mathRegex);

  if (match === -1) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(mathRegex);
  return (
    <span className={`tex-math-text-container ${className}`}>
      {parts.map((part, i) => {
        if (part && mathRegex.test(part)) {
          return <TeXInline key={i} math={part} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};
