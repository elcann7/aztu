import React from 'react';
import type { MaterialStudySection } from '../../services/db';
import './StudyNoteCard.css';

interface StudyNotesListProps {
  sections: MaterialStudySection[];
  materialTitle?: string;
}

function splitSymbolEntry(entry: string): { key: string; desc: string } {
  const dashMatch = entry.match(/^([^—–:]+?)\s*[—–:]\s*(.+)$/);
  if (dashMatch) {
    return { key: dashMatch[1].trim(), desc: dashMatch[2].trim() };
  }
  return { key: '•', desc: entry };
}

export const StudyNotesList: React.FC<StudyNotesListProps> = ({ sections }) => {
  return (
    <div className="study-notes-container">
      <div className="study-notes-intro-banner">
        <div className="study-notes-intro-text">
          <span className="study-notes-intro-eyebrow">0-dan Öyrədən Universitet Bələdçisi</span>
          <h4 className="study-notes-intro-title">
            Bu mövzunu heç bilməyən biri üçün addım-addım izah, düstur lüğəti və həll nümunələri
          </h4>
          <p className="study-notes-intro-sub">
            Əvvəlcə «Sadə dillə məntiq» hissəsini oxu, sonra düsturdakı hər bir işarənin mənasına bax və ən sonda rəqəmlərlə həll olunmuş nümunəni izlə.
          </p>
        </div>
      </div>

      {sections.map((sec, idx) => {
        const cleanHeading = sec.heading.replace(/^\d+\.\s*/, '');
        return (
          <article key={sec.heading} className="study-note-card">
            <header className="study-note-card-header">
              <span className="study-note-step-badge">
                HİSSƏ {String(idx + 1).padStart(2, '0')}
              </span>
              <h4 className="study-note-heading">{cleanHeading}</h4>
            </header>

            {sec.intuition && (
              <div className="study-note-intuition-box">
                <span className="study-note-block-label">
                  💡 Sadə dillə məntiq (0-dan izah — bu nədir və niyə lazımdır?)
                </span>
                <p className="study-note-intuition-text">{sec.intuition}</p>
              </div>
            )}

            <div className="study-note-body-section">
              <span className="study-note-block-label">
                📘 Əsas Nəzəriyyə və Qayda
              </span>
              <p className="study-note-body-text">{sec.body}</p>
            </div>

            {sec.formulaOrCode && (
              <div className="study-note-formula-wrapper">
                <span className="study-note-block-label">
                  📐 Əsas Düstur / Qayda / Sintaksis
                </span>
                <pre className="study-note-formula-pre">{sec.formulaOrCode}</pre>
              </div>
            )}

            {sec.symbols && sec.symbols.length > 0 && (
              <div className="study-note-symbols-box">
                <span className="study-note-block-label">
                  🔤 Düsturdakı Hərflərin və İşarələrin Mənası (Necə oxuyaq?)
                </span>
                <ul className="study-note-symbols-list">
                  {sec.symbols.map((sym) => {
                    const { key, desc } = splitSymbolEntry(sym);
                    return (
                      <li key={sym} className="study-note-symbol-item">
                        <code className="study-note-symbol-key">{key}</code>
                        <span className="study-note-symbol-desc">{desc}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {sec.steps && sec.steps.length > 0 && (
              <div className="study-note-steps-box">
                <span className="study-note-block-label">
                  🪜 Məsələni Addım-Addım Necə Həll Edirik?
                </span>
                <ol className="study-note-steps-list">
                  {sec.steps.map((step, sIdx) => (
                    <li key={step} className="study-note-step-item">
                      <span className="study-note-step-num">{sIdx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {sec.example && (
              <div className="study-note-example-box">
                <span className="study-note-block-label">
                  ✏️ Sıfırdan Həll Olunmuş Nümunə (Rəqəmlərlə / Kodla)
                </span>
                <pre className="study-note-example-content">{sec.example}</pre>
              </div>
            )}

            {sec.warning && (
              <div className="study-note-warning-box">
                <span className="study-note-block-label">
                  ⚠️ İmtahanda və Kollokviumda Diqqət Et!
                </span>
                <p className="study-note-warning-text">{sec.warning}</p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};
