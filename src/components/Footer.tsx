import React from 'react';
import './Footer.css';
import { Bookmark, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="about">
      <div className="container footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-mark">
                <Bookmark size={14} strokeWidth={2.5} />
              </div>
              <span className="footer-name">6326A2</span>
            </div>
            <p className="footer-desc">
              Azərbaycan Texniki Universiteti 6326A2 akademik qrupu üçün vahid iş sahəsi. 
              Mühazirələr, tapşırıqlar, materiallar və qrup qeydləri — bir yerdə.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-col">
              <span className="col-title">NAVİQASİYA</span>
              <a href="#workspace">Məhsul</a>
              <a href="#features">İmkanlar</a>
              <a href="#about">Haqqında</a>
            </div>

            <div className="footer-links-col">
              <span className="col-title">İMKANLAR</span>
              <a href="#materials">Materiallar</a>
              <a href="#deadlines">Deadline-lar</a>
              <a href="#qa">Sual-Cavab</a>
              <a href="#polls">Sorğular</a>
              <a href="#notes">Qrup qeydləri</a>
            </div>

            <div className="footer-links-col">
              <span className="col-title">FƏNLƏR</span>
              <a href="#workspace">Riyazi analiz</a>
              <a href="#workspace">Fizika</a>
              <a href="#workspace">Proqramlaşdırma</a>
              <a href="#workspace">İngilis dili</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© 2026 Qrup 6326A2</span>
            <span className="sep">•</span>
            <span className="aztu-ref">
              <GraduationCap size={13} />
              Azərbaycan Texniki Universiteti (AzTU)
            </span>
          </div>

          <div className="footer-status-indicator">
            <span className="status-ping" />
            <span>2026–2027 Payız Semestri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
