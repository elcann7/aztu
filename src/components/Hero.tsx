import React from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* 21st.dev / Remotion Ambient Lighting & Dot Grid */}
      <div className="ambient-glow-mesh" aria-hidden="true" />
      <div className="ambient-bg-grid" aria-hidden="true" />

      <div className="container-narrow hero-container">
        {/* Subtle pill tag with live semester indicator */}
        <div className="hero-badge reveal-up">
          <span className="badge-live-pulse" />
          <span className="badge-uni">AzTU</span>
          <span className="badge-dot" />
          <span className="badge-group">Qrup 6326A2</span>
        </div>

        {/* Hero Headline (Specified exactly by user) */}
        <h1 className="hero-title reveal-up reveal-stagger-1">
          Qrupunuz üçün bir iş sahəsi.
        </h1>

        {/* Supporting text (Specified exactly by user) */}
        <p className="hero-subtitle reveal-up reveal-stagger-2">
          Mühazirələr, tapşırıqlar, qeydlər və materiallar — bir yerdə.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions reveal-up reveal-stagger-3">
          <a href="#workspace" className="btn-primary hero-btn-primary">
            <span>İş sahəsinə baxış</span>
            <ArrowRight size={14} />
          </a>
          <a href="#features" className="btn-secondary hero-btn-secondary">
            <span>İmkanlar</span>
          </a>
        </div>
      </div>
    </section>
  );
};
