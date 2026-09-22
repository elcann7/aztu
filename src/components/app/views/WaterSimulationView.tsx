import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CloudRain, Download, Droplets, Eraser, Minus, MousePointer2,
  Pause, Play, RotateCcw, Waves,
} from 'lucide-react';
import { WaterSimulation } from '../../../services/waterSimulation';
import './WaterSimulationView.css';

type Tool = 'drop' | 'wall' | 'erase';
type Preset = 'calm' | 'rain' | 'storm';
type Settings = { speed: number; damping: number; radius: number; rain: number };

const PRESETS: Record<Preset, Settings> = {
  calm: { speed: 0.45, damping: 0.45, radius: 0.38, rain: 0 },
  rain: { speed: 0.56, damping: 0.34, radius: 0.28, rain: 47 },
  storm: { speed: 0.82, damping: 0.18, radius: 0.47, rain: 88 },
};

const toolOptions = [
  { id: 'drop' as const, label: 'Damla', icon: Droplets, help: 'Dokun veya sürükle' },
  { id: 'wall' as const, label: 'Engel', icon: Minus, help: 'Dalga bariyeri çiz' },
  { id: 'erase' as const, label: 'Silgi', icon: Eraser, help: 'Engeli kaldır' },
];

export const WaterSimulationView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<WaterSimulation | null>(null);
  const settingsRef = useRef<Settings>(PRESETS.calm);
  const pausedRef = useRef(false);
  const pointerRef = useRef<{ active: boolean; x: number; y: number; lastDrop: number }>({ active: false, x: 0, y: 0, lastDrop: 0 });
  const toolRef = useRef<Tool>('drop');
  const [tool, setTool] = useState<Tool>('drop');
  const [preset, setPreset] = useState<Preset>('calm');
  const [settings, setSettings] = useState<Settings>(PRESETS.calm);
  const [paused, setPaused] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => { settingsRef.current = settings; }, [settings]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { toolRef.current = tool; }, [tool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    let animationFrame = 0;
    let previous = performance.now();
    let accumulator = 0;
    let rainAccumulator = 0;
    let visualTime = 0;
    let frames = 0;
    let fpsTime = previous;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      const gridWidth = Math.min(330, Math.max(160, Math.round(rect.width / 2.7)));
      const gridHeight = Math.max(96, Math.round(gridWidth * rect.height / Math.max(rect.width, 1)));
      engineRef.current = new WaterSimulation(gridWidth, gridHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const frame = (now: number) => {
      const delta = Math.min(50, now - previous);
      previous = now;
      const engine = engineRef.current;
      if (engine) {
        if (!pausedRef.current) {
          visualTime += delta;
          accumulator += delta;
          rainAccumulator += delta * settingsRef.current.rain / 100 * 0.009;
          while (rainAccumulator >= 1) {
            rainAccumulator -= 1;
            engine.drop(0.04 + Math.random() * 0.92, 0.05 + Math.random() * 0.9, 0.008 + Math.random() * 0.014, 0.45 + Math.random() * 0.55);
          }
          let steps = 0;
          while (accumulator >= 16.67 && steps < 3) {
            engine.step(settingsRef.current.speed, settingsRef.current.damping);
            accumulator -= 16.67;
            steps++;
          }
          if (steps === 3) accumulator = 0;
        }
        engine.render(visualTime);
        context.imageSmoothingEnabled = true;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(engine.surface, 0, 0, canvas.width, canvas.height);
      }
      frames++;
      if (now - fpsTime > 1000) {
        setFps(Math.round(frames * 1000 / (now - fpsTime)));
        frames = 0;
        fpsTime = now;
      }
      animationFrame = requestAnimationFrame(frame);
    };
    animationFrame = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const actAt = useCallback((x: number, y: number, force = 1) => {
    const engine = engineRef.current;
    if (!engine) return;
    const radius = settingsRef.current.radius;
    if (toolRef.current === 'wall') engine.paintWall(x, y, 0.008 + radius * 0.032, true);
    else if (toolRef.current === 'erase') engine.paintWall(x, y, 0.013 + radius * 0.052, false);
    else engine.drop(x, y, 0.012 + radius * 0.058, force);
  }, []);

  const coordinates = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = coordinates(event);
    pointerRef.current = { active: true, ...point, lastDrop: performance.now() };
    actAt(point.x, point.y, 2.4);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const pointer = pointerRef.current;
    if (!pointer.active) return;
    const point = coordinates(event);
    const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
    const spacing = toolRef.current === 'drop' ? 0.012 : 0.006;
    const count = Math.min(60, Math.max(1, Math.ceil(distance / spacing)));
    for (let index = 1; index <= count; index++) {
      const t = index / count;
      const x = pointer.x + (point.x - pointer.x) * t;
      const y = pointer.y + (point.y - pointer.y) * t;
      if (toolRef.current !== 'drop' || performance.now() - pointer.lastDrop > 24) {
        actAt(x, y, toolRef.current === 'drop' ? 0.18 : 1);
        pointer.lastDrop = performance.now();
      }
    }
    pointer.x = point.x;
    pointer.y = point.y;
  };

  const selectPreset = (next: Preset) => {
    setPreset(next);
    setSettings(PRESETS[next]);
    if (next === 'storm') {
      for (let i = 0; i < 5; i++) engineRef.current?.drop(Math.random(), Math.random(), 0.035, 1.2);
    }
  };

  const updateSetting = (key: keyof Settings, value: number) => {
    setSettings(current => ({ ...current, [key]: value }));
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'su-simulasyonu.png';
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  };

  return (
    <div className="water-lab">
      <div className="water-lab-heading">
        <div>
          <div className="water-eyebrow"><span className="water-live-dot" /> ETKİLEŞİMLİ FİZİK LABORATUVARI <span className="water-heading-index">/ 01</span></div>
          <h1>Su simülasyonu<span>.</span></h1>
          <p>Bir damla bırak. Dalgaların yayılışını izle. Akışı sen şekillendir.</p>
        </div>
        <div className="water-heading-mark" aria-hidden="true"><Waves size={26} strokeWidth={1.5} /></div>
      </div>

      <div className="water-workspace">
        <section className="water-stage" aria-label="Etkileşimli su yüzeyi">
          <div className="water-stage-toolbar">
            <div className="water-stage-title"><span className="water-stage-pulse" /> CANLI YÜZEY <span>·</span> 2D DALGA MODELİ</div>
            <div className="water-stage-state">{paused ? 'DURAKLATILDI' : `${fps} FPS`} <span className="water-stage-state-dot" /></div>
          </div>
          <div className="water-canvas-wrap">
            <canvas
              ref={canvasRef}
              className={`water-canvas water-cursor-${tool}`}
              aria-label="Dalga oluşturmak veya engel çizmek için etkileşim alanı"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={() => { pointerRef.current.active = false; }}
              onPointerCancel={() => { pointerRef.current.active = false; }}
            />
            <div className="water-surface-label"><span className="water-crosshair">✳</span> DOKUN VE DALGA OLUŞTUR</div>
            <div className="water-coordinates" aria-hidden="true">H₂O <span> / </span> GERÇEK ZAMANLI</div>
          </div>
          <div className="water-stage-bottom">
            <div className="water-stage-hint"><MousePointer2 size={14} /> {toolOptions.find(option => option.id === tool)?.help}</div>
            <div className="water-stage-actions">
              <button type="button" onClick={() => setPaused(value => !value)} title={paused ? 'Devam et' : 'Duraklat'} aria-label={paused ? 'Devam et' : 'Duraklat'}>{paused ? <Play size={15} /> : <Pause size={15} />}<span>{paused ? 'Devam et' : 'Duraklat'}</span></button>
              <button type="button" onClick={() => engineRef.current?.clear()} title="Yüzeyi sıfırla" aria-label="Yüzeyi sıfırla"><RotateCcw size={15} /><span>Sıfırla</span></button>
              <button type="button" onClick={saveImage} title="Görseli indir" aria-label="Görseli indir"><Download size={15} /><span>Kaydet</span></button>
            </div>
          </div>
        </section>

        <aside className="water-controls" aria-label="Simülasyon ayarları">
          <div className="water-controls-header"><span>KONTROL PANELİ</span><span className="water-controls-count">01—03</span></div>
          <div className="water-control-section">
            <div className="water-control-label"><span>01</span> ORTAM</div>
            <div className="water-preset-grid">
              <button type="button" className={preset === 'calm' ? 'selected' : ''} onClick={() => selectPreset('calm')}><Waves size={17} /><span>Durgun</span></button>
              <button type="button" className={preset === 'rain' ? 'selected' : ''} onClick={() => selectPreset('rain')}><CloudRain size={17} /><span>Yağmur</span></button>
              <button type="button" className={preset === 'storm' ? 'selected' : ''} onClick={() => selectPreset('storm')}><Droplets size={17} /><span>Fırtına</span></button>
            </div>
          </div>
          <div className="water-control-section">
            <div className="water-control-label"><span>02</span> ARAÇLAR</div>
            <div className="water-tool-list">
              {toolOptions.map(option => {
                const Icon = option.icon;
                return <button type="button" key={option.id} className={tool === option.id ? 'selected' : ''} onClick={() => setTool(option.id)}><span className="water-tool-icon"><Icon size={17} /></span><span><strong>{option.label}</strong><small>{option.help}</small></span><span className="water-tool-check">{tool === option.id ? '●' : '○'}</span></button>;
              })}
            </div>
          </div>
          <div className="water-control-section water-sliders">
            <div className="water-control-label"><span>03</span> FİZİK PARAMETRELERİ</div>
            {([
              ['speed', 'Dalga hızı', 'Yayılma hızı'],
              ['damping', 'Sönümleme', 'Enerji kaybı'],
              ['radius', 'Fırça boyutu', 'Etki alanı'],
              ['rain', 'Yağış yoğunluğu', 'Otomatik damlalar'],
            ] as const).map(([key, label, description]) => (
              <label className="water-slider" key={key}>
                <span className="water-slider-heading"><span>{label}<small>{description}</small></span><strong>{Math.round(settings[key] * (key === 'rain' ? 1 : 100))}%</strong></span>
                <input type="range" min="0" max={key === 'rain' ? '100' : '1'} step={key === 'rain' ? '1' : '0.01'} value={settings[key]} onChange={event => updateSetting(key, Number(event.target.value))} style={{ '--fill': `${key === 'rain' ? settings[key] : settings[key] * 100}%` } as React.CSSProperties} />
              </label>
            ))}
          </div>
          <div className="water-controls-note"><span>✦</span><p>Dalgalar engellerden yansır ve zamanla enerjisini kaybeder. Farklı düzenler çizerek hareketi keşfet.</p></div>
        </aside>
      </div>
      <div className="water-footer-note"><span>AZTU · FİZİK LAB</span><span>YÜZEY DALGALARI / SİMÜLASYON 001</span></div>
    </div>
  );
};
