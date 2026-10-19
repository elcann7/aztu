import React from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Linear Ambient Star & Radial Glow Horizon */}
      <div className="ambient-glow-mesh" aria-hidden="true" />
      <div className="hero-top-horizon" aria-hidden="true" />

      <div className="container hero-container">
        {/* Linear Style Announcement Badge */}
        <div className="hero-badge reveal-up">
          <span className="badge-live-pulse" />
          <span className="badge-text">AzTU 6326A2 · Payız Semestri 2026</span>
          <span className="badge-arrow">Yeniliklər →</span>
        </div>

        {/* Linear Two-Tone Editorial Headline */}
        <h1 className="hero-title reveal-up reveal-stagger-1">
          Universitet təhsili üçün vahid sistem.
        </h1>

        {/* Supporting Editorial Paragraph */}
        <p className="hero-subtitle reveal-up reveal-stagger-2">
          AzTU 6326A2 qrupunun bütün mühazirələri, laboratoriyaları, tapşırıqları və kolloqvium hazırlığı — mühəndislik dəqiqliyi ilə bir məkanda.
        </p>

        {/* Linear Actions */}
        <div className="hero-actions reveal-up reveal-stagger-3">
          <a href="#workspace" className="hero-btn-pill-primary">
            <span>İş sahəsinə keçid</span>
            <ArrowRight size={13} />
          </a>
          <a href="#schematics" className="hero-btn-link-secondary">
            <span>Arxitektura ilə tanış olun →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
