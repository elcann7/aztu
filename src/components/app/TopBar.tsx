import React from 'react';
import './TopBar.css';
import { Search, Menu, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  title: string;
  onToggleMobileMenu?: () => void;
  onOpenProfile?: () => void;
  onOpenSearch?: () => void;
  onOpenQuickShare?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onToggleMobileMenu, onOpenProfile, onOpenSearch, onOpenQuickShare }) => {
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
        <button type="button" className="topbar-search-box" onClick={onOpenSearch} aria-label="Qrupda axtar">
          <Search size={14} className="search-icon" />
          <span className="search-input">Qeyd, sual və material axtar...</span>
          <kbd className="search-shortcut">Ctrl K</kbd>
        </button>
        <button type="button" className="topbar-share-btn" onClick={onOpenQuickShare} aria-label="Qrupla paylaş">
          <Plus size={15} />
          <span>Paylaş</span>
        </button>

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
