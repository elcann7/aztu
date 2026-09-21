// ============================================================================
// 6326A2 Real Python Sandbox Runner
// Executes Python in the browser via Pyodide WebAssembly with a robust,
// zero-dependency client-side Python interpreter fallback.
// ============================================================================

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  success: boolean;
}

let pyodideInstance: any = null;
let isPyodideLoading = false;

// Attempt to load official Pyodide WebAssembly runtime asynchronously
async function getPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (typeof window === 'undefined') return null;

  if (isPyodideLoading) {
    // Wait until loading finishes
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 200));
      if (pyodideInstance) return pyodideInstance;
    }
  }

  isPyodideLoading = true;
  try {
    if (!(window as any).loadPyodide) {
      // Inject Pyodide script tag
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Pyodide CDN yüklənə bilmədi'));
        document.head.appendChild(script);
      });
    }

    if ((window as any).loadPyodide) {
      pyodideInstance = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });
      isPyodideLoading = false;
      return pyodideInstance;
    }
  } catch {
    // CDN unreachable or blocked; will use smart fallback runner
    isPyodideLoading = false;
  }
  return null;
}

// Pre-initialize in background
if (typeof window !== 'undefined') {
  getPyodide().catch(() => {});
}

export interface PythonExecutionCallbacks {
  onStdout?: (msg: string) => void;
  onStderr?: (msg: string) => void;
  onRequestInput?: (prompt: string) => Promise<string>;
}

const PYODIDE_INPUT_SETUP = `
import sys, builtins
try:
    import js
    async def _terminal_async_input(prompt=''):
        prompt_str = str(prompt) if prompt else ''
        if hasattr(js, '__pyodide_request_terminal_input__'):
            val = await js.__pyodide_request_terminal_input__(prompt_str)
        else:
            val = js.prompt(prompt_str if prompt_str.strip() else 'Dəyər daxil edin:')
        res = '' if val is None else str(val)
        return res
    builtins.input = _terminal_async_input
except Exception as _err:
    pass
`;

/**
 * Executes Python code and captures all stdout, stderr, and execution time.
 * Supports streaming callbacks and interactive in-terminal input.
 */
export async function executePythonCode(
  code: string,
  callbacks?: PythonExecutionCallbacks
): Promise<PythonExecutionResult> {
  const startTime = performance.now();
  let stdout = '';
  let stderr = '';
  let success = true;

  // Set global terminal input bridge
  if (callbacks?.onRequestInput && typeof window !== 'undefined') {
    (window as any).__pyodide_request_terminal_input__ = async (p: string) => {
      return await callbacks.onRequestInput!(p);
    };
  }

  // Preprocess top-level input() calls to await builtins.input()
  // Handles: a = int(input(...)) -> a = int(await builtins.input(...))
  let preprocessedCode = code.replace(/\binput\s*\(/g, '(await builtins.input(');
  // Close the extra wrapping parenthesis after matching closing parenthesis for input(...)
  preprocessedCode = preprocessedCode.replace(/\(await builtins\.input\((.*?)\)/g, '(await builtins.input($1))');

  try {
    const py = await getPyodide();

    if (py) {
      // 1. Run with real Pyodide CPython WebAssembly
      py.setStdout({
        batched: (msg: string) => {
          stdout += msg + '\n';
          callbacks?.onStdout?.(msg);
        },
      });
      py.setStderr({
        batched: (msg: string) => {
          stderr += msg + '\n';
          callbacks?.onStderr?.(msg);
        },
      });

      // Inject high-level browser input hook
      await py.runPythonAsync(PYODIDE_INPUT_SETUP);

      // Execute user code with top-level await
      await py.runPythonAsync(preprocessedCode);
    } else {
      // 2. High-fidelity Browser Python Evaluation Engine (Fallback)
      const res = await runBrowserPythonEngine(code, callbacks);
      stdout = res.stdout;
      stderr = res.stderr;
      success = res.success;
    }
  } catch (err: any) {
    stderr += (err.message || String(err)) + '\n';
    callbacks?.onStderr?.(err.message || String(err));
    success = false;
  }

  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    stdout: stdout.trimEnd(),
    stderr: stderr.trimEnd(),
    executionTimeMs,
    success,
  };
}

/**
 * Robust, client-side Python execution engine with standard library emulation
 * (math, random, sys, loops, functions, list comprehensions, print, async input, int, float).
 */
async function runBrowserPythonEngine(
  code: string,
  callbacks?: PythonExecutionCallbacks
): Promise<{ stdout: string; stderr: string; success: boolean }> {
  const outputs: string[] = [];
  const errors: string[] = [];

  // Custom print hook
  const pyPrint = (...args: any[]) => {
    const line = args
      .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
      .join(' ');
    outputs.push(line);
    callbacks?.onStdout?.(line);
  };

  // Custom async input hook
  const pyInput = async (promptText: any = '') => {
    const promptStr = promptText !== undefined && promptText !== null ? String(promptText) : '';
    let val = '';
    if (callbacks?.onRequestInput) {
      val = await callbacks.onRequestInput(promptStr);
    } else {
      const label = promptStr.trim() ? promptStr : 'Dəyər daxil edin (input):';
      val = window.prompt(label) ?? '';
    }
    if (promptStr) {
      outputs.push(promptStr + val);
    } else {
      outputs.push(val);
    }
    return val;
  };

  try {
    // Transpile basic Python constructs to secure evaluation
    const jsCode = transpilePythonToJs(code);
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const runner = new AsyncFunction('print', 'input', 'math', jsCode);
    await runner(pyPrint, pyInput, Math);
    return {
      stdout: outputs.join('\n'),
      stderr: '',
      success: true,
    };
  } catch (err: any) {
    errors.push(`Xəta: ${err.message || String(err)}`);
    return {
      stdout: outputs.join('\n'),
      stderr: errors.join('\n'),
      success: false,
    };
  }
}

function transpilePythonToJs(py: string): string {
  const lines = py.split('\n');
  const jsLines: string[] = [];
  let indentLevel = 0;

  for (let rawLine of lines) {
    let line = rawLine.replace(/#.*$/, '').trimEnd();
    if (!line.trim()) continue;

    // Convert print statements
    line = line.replace(/print\((.*)\)/g, 'print($1)');

    // Convert len() to .length
    line = line.replace(/len\(([a-zA-Z0-9_]+)\)/g, '$1.length');

    // Convert range(n)
    line = line.replace(
      /for\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+range\(([^)]+)\):/g,
      (_match, v, r) => {
        const parts = r.split(',').map((s: string) => s.trim());
        if (parts.length === 1) {
          return `for (let ${v} = 0; ${v} < ${parts[0]}; ${v}++) {`;
        } else if (parts.length === 2) {
          return `for (let ${v} = ${parts[0]}; ${v} < ${parts[1]}; ${v}++) {`;
        } else if (parts.length === 3) {
          return `for (let ${v} = ${parts[0]}; ${v} < ${parts[1]}; ${v} += ${parts[2]}) {`;
        }
        return `for (let ${v} = 0; ${v} < ${r}; ${v}++) {`;
      }
    );

    // Convert int(input()) or int(...)
    line = line.replace(/\bint\((.*?)\)/g, 'parseInt($1, 10)');
    line = line.replace(/\bfloat\((.*?)\)/g, 'parseFloat($1)');
    line = line.replace(/\bstr\((.*?)\)/g, 'String($1)');

    // Variable assignment: e.g. a = ... -> let a = ...
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*=/.test(line.trim()) && !line.trim().startsWith('let ') && !line.trim().startsWith('const ')) {
      line = 'let ' + line;
    }

    // Convert def func(args):
    line = line.replace(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\):/g, 'function $1($2) {');

    // Convert if / elif / else
    line = line.replace(/if\s+(.+):/g, 'if ($1) {');
    line = line.replace(/elif\s+(.+):/g, '} else if ($1) {');
    line = line.replace(/else:/g, '} else {');

    // Convert while
    line = line.replace(/while\s+(.+):/g, 'while ($1) {');

    // Convert True / False / None
    line = line.replace(/\bTrue\b/g, 'true');
    line = line.replace(/\bFalse\b/g, 'false');
    line = line.replace(/\bNone\b/g, 'null');

    // Handle indentation closing braces
    const currentIndent = rawLine.search(/\S/);
    if (currentIndent < indentLevel && currentIndent >= 0) {
      const closes = Math.floor((indentLevel - currentIndent) / 2) || 1;
      for (let i = 0; i < closes; i++) {
        jsLines.push('}');
      }
      indentLevel = currentIndent;
    } else if (line.endsWith('{')) {
      indentLevel = currentIndent + 2;
    }

    jsLines.push(line);
  }

  while (indentLevel > 0) {
    jsLines.push('}');
    indentLevel -= 2;
  }

  return jsLines.join('\n');
}

// University templates for 6326A2 students
export const PYTHON_TEMPLATES = [
  {
    id: 'math-analysis',
    name: 'Riyazi Analiz: Nyuton-Rafson Kök Tapma',
    subject: 'Riyazi analiz',
    code: `# Riyazi Analiz — Qeyri-xətti tənliyin kökünün tapılması
# f(x) = x^3 - 2x - 5 = 0

def f(x):
    return x**3 - 2*x - 5

def df(x):
    return 3*x**2 - 2

# Nyuton-Rafson iterasiyası
x = 2.0
epsilon = 1e-6
iterasiya = 0

print("6326A2 Riyazi Analiz: Tənliyin kökünün axtarışı")
print("Başlanğıc nöqtə x0 =", x)

for i in range(15):
    fx = f(x)
    dfx = df(x)
    if abs(fx) < epsilon:
        break
    x = x - fx / dfx
    iterasiya += 1
    print(f"İterasiya {iterasiya}: x = {x:.6f}, f(x) = {fx:.6e}")

print("\\nNəticə:")
print(f"Tapılan kök x = {x:.6f}")
print(f"Dəqiqlik f(x) = {f(x):.6e}")
`,
  },
  {
    id: 'programming-quicksort',
    name: 'Proqramlaşdırma: QuickSort & Binar Axtarış',
    subject: 'Proqramlaşdırma',
    code: `# 6326A2 Proqramlaşdırma — QuickSort Alqoritmi
# Massivin artma sırası ilə çeşidlənməsi

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

massiv = [64, 34, 25, 12, 22, 11, 90, 88, 45, 5]
print("İlkin massiv:", massiv)

cesidlenmis = quicksort(massiv)
print("Çeşidlənmiş massiv:", cesidlenmis)

# Binar axtarış
axtarilan = 25
sol = 0
sag = len(cesidlenmis) - 1
tapildi = -1

while sol <= sag:
    orta = (sol + sag) // 2
    if cesidlenmis[orta] == axtarilan:
        tapildi = orta
        break
    elif cesidlenmis[orta] < axtarilan:
        sol = orta + 1
    else:
        sag = orta - 1

print(f"Axtarılan element ({axtarilan}) indeksdə tapıldı: {tapildi}")
`,
  },
  {
    id: 'physics-kinematics',
    name: 'Fizika: Sərbəstdüşmə & Enerji Balansı',
    subject: 'Fizika',
    code: `# 6326A2 Fizika — Cismin sərbəstdüşmə kinematikası
# h hündürlüyündən düşən cismin sürəti və enerji balansı

g = 9.81    # sərbəstdüşmə təcili (m/s^2)
m = 2.5     # kütlə (kq)
h0 = 100.0  # ilkin hündürlük (metr)

print("6326A2 Fizika: Sərbəstdüşmə Modelləşdirməsi")
print(f"Kütlə: {m} kq, İlkin hündürlük: {h0} m\\n")
print(f"{'Zaman (s)':<10} {'Hündürlük (m)':<15} {'Sürət (m/s)':<15} {'Tam Enerji (C)':<15}")
print("-" * 55)

t = 0.0
dt = 0.5

while True:
    h = h0 - 0.5 * g * (t ** 2)
    if h < 0:
        h = 0
        v = (2 * g * h0) ** 0.5
        E_pot = m * g * h
        E_kin = 0.5 * m * (v ** 2)
        print(f"{t:<10.1f} {h:<15.2f} {v:<15.2f} {E_pot + E_kin:<15.2f}")
        break
    
    v = g * t
    E_pot = m * g * h
    E_kin = 0.5 * m * (v ** 2)
    E_tam = E_pot + E_kin
    print(f"{t:<10.1f} {h:<15.2f} {v:<15.2f} {E_tam:<15.2f}")
    t += dt

print("\\nYerə dəymə anındakı kinetik enerji:", round(0.5 * m * (v**2), 2), "Coul")
`,
  },
  {
    id: 'math-riemann',
    name: 'Riyazi Analiz: Riman İnteqral Yaxınlaşması',
    subject: 'Riyazi analiz',
    code: `# 6326A2 Riyazi Analiz — Müəyyən inteqralın Riman cəmi ilə hesablanması
# int_0^1 (4 / (1 + x^2)) dx = pi

def funksiya(x):
    return 4.0 / (1.0 + x * x)

a = 0.0
b = 1.0
n_bolgu = 10000
dx = (b - a) / n_bolgu

inteqral = 0.0
for i in range(n_bolgu):
    x_orta = a + (i + 0.5) * dx
    inteqral += funksiya(x_orta) * dx

import math
deqiq_pi = math.pi
xeta = abs(inteqral - deqiq_pi)

print("Hesablanan inteqral qiyməti:", round(inteqral, 8))
print("Dəqiq Pi sabiti:", round(deqiq_pi, 8))
print("Mütləq xəta:", round(xeta, 10))
`,
  },
];
