import React from 'react';
import './TopBar.css';
import { Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  title: string;
  onToggleMobileMenu?: () => void;
  onOpenProfile?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onToggleMobileMenu, onOpenProfile }) => {
  const { user } = useAuth();

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

        {/* User Profile Avatar Trigger */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="topbar-profile-btn"
          title="Tələbə Profilini aç"
          aria-label="Profil"
        >
          {user?.avatarUrl ? (
            user.avatarUrl.startsWith('data:') || user.avatarUrl.startsWith('http') ? (
              <img src={user.avatarUrl} alt={user.firstName} className="topbar-avatar-img" />
            ) : (
              <span>{user.avatarUrl}</span>
            )
          ) : (
            <span>{user?.avatarInitials || 'TL'}</span>
          )}
        </button>
      </div>
    </header>
  );
};
