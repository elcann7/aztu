import React from 'react';
import './TopBar.css';
import { Search, Menu } from 'lucide-react';

interface TopBarProps {
  title: string;
  onToggleMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onToggleMobileMenu }) => {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        {onToggleMobileMenu && (
          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={onToggleMobileMenu}
            aria-label="Menyunu aç"
          >
            <Menu size={16} />
          </button>
        )}
        <h1 className="topbar-page-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {/* Global Search Visual UI */}
        <div className="topbar-search-box">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Axtarış... (Mühazirə, tapşırıq, qeyd)"
            className="search-input"
            readOnly
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>
      </div>
    </header>
  );
};
