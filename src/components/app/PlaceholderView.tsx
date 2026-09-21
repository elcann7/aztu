import React from 'react';
import './CourseShellView.css';
import { Layers } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  subtitle: string;
  routePath: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, subtitle, routePath }) => {
  return (
    <div className="course-shell-flow">
      <div className="course-header-card">
        <h2 className="course-main-title">{title}</h2>
        <p className="welcome-subline">{subtitle}</p>
      </div>

      <div className="course-content-placeholder">
        <div className="placeholder-inner-box">
          <div className="placeholder-icon-circle">
            <Layers size={20} />
          </div>
          <h3 className="placeholder-heading">{title} — Qrup Bölməsi</h3>
          <p className="placeholder-desc">
            Bu bölmənin genişlənmiş funksiyaları (axtarış, süzgəc və yeni məzmun əlavə edilməsi) növbəti mərhələdə aktivləşdiriləcəkdir.
          </p>
          <div className="placeholder-meta-note">
            <span>Route strukturu: <code>{routePath}</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
