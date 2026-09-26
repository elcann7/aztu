import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

export const PhysicsPdfViewer = ({ url, title }: { url: string; title: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageWrapRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const [message, setMessage] = useState('PDF yüklənir...');

  useEffect(() => {
    let active = true;
    let task: PDFDocumentLoadingTask | undefined;
    setDocument(null);
    setPageNumber(1);
    setMessage('PDF yüklənir...');
    const load = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
        if (!active) return;
        task = pdfjs.getDocument({ url });
        const loaded = await task.promise;
        if (!active) return;
        setDocument(loaded);
        setMessage('');
      } catch {
        if (active) setMessage('PDF yüklənmədi. Yuxarıdakı düymə ilə ayrıca aça bilərsiniz.');
      }
    };
    void load();
    return () => { active = false; void task?.destroy(); };
  }, [url]);

  useEffect(() => {
    const wrap = pageWrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(() => setWidth(wrap.clientWidth));
    observer.observe(wrap);
    setWidth(wrap.clientWidth);
    return () => observer.disconnect();
  }, [document]);

  useEffect(() => {
    if (!document || !width || !canvasRef.current) return;
    let active = true;
    let renderTask: RenderTask | undefined;
    const render = async () => {
      try {
        setMessage('Səhifə yüklənir...');
        const page = await document.getPage(pageNumber);
        if (!active || !canvasRef.current) return;
        const base = page.getViewport({ scale: 1 });
        const displayWidth = Math.min(width, Math.max(base.width, 860));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const scale = (displayWidth / base.width) * dpr;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${viewport.height / dpr}px`;
        renderTask = page.render({ canvas, viewport });
        await renderTask.promise;
        if (active) setMessage('');
      } catch (error) {
        if (active && !(error instanceof Error && error.name === 'RenderingCancelledException')) {
          setMessage('Səhifə göstərilmədi. PDF-i ayrıca aç.');
        }
      }
    };
    void render();
    return () => { active = false; renderTask?.cancel(); };
  }, [document, pageNumber, width]);

  return <div className="physics-pdf-viewer">
    {document && <div className="physics-pdf-toolbar" aria-label="PDF səhifələri">
      <button type="button" disabled={pageNumber === 1} onClick={() => setPageNumber((value) => value - 1)}>← Əvvəlki səhifə</button>
      <span>Səhifə {pageNumber} / {document.numPages}</span>
      <button type="button" disabled={pageNumber === document.numPages} onClick={() => setPageNumber((value) => value + 1)}>Növbəti səhifə →</button>
    </div>}
    <div className="physics-pdf-page" ref={pageWrapRef}>
      {message && <p role="status">{message}</p>}
      {document && <canvas ref={canvasRef} role="img" aria-label={`${title}, səhifə ${pageNumber}`} />}
    </div>
  </div>;
};
