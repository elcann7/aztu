import React, { useState } from 'react';
import './Sidebar.css';
import { useRouter, Link } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bookmark,
  Home,
  Terminal,
  Waves,
  MessageSquareQuote,
  HelpCircle,
  Vote,
  FolderOpen,
  Calendar,
  ChevronDown,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenProfile }) => {
  const { currentPath, navigate } = useRouter();
  const { user, logout } = useAuth();
  const [toolsMenuState, setToolsMenuState] = useState<{ path: string; open: boolean } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const courses = [
    { name: 'Riyazi analiz-1', path: '/app/courses/math-analysis', code: 'MATH-101' },
    { name: 'Xətti cəbr', path: '/app/courses/linear-algebra', code: 'MATH-102' },
    { name: 'Fizika', path: '/app/courses/physics', code: 'İF-20403y' },
    { name: 'Proqramlaşdırma-1', path: '/app/courses/programming', code: 'CS-101' },
    { name: 'Xarici dildə işgüzar kom. -1', path: '/app/courses/english', code: 'ENG-101' },
    { name: 'Azərbaycan dildə işgüzar kom.', path: '/app/courses/azerbaijani', code: 'AZE-101' },
  ];

  const navSections = [
    { name: 'Qrup qeydləri', path: '/app/notes', icon: MessageSquareQuote },
    { name: 'Sual-Cavab', path: '/app/qa', icon: HelpCircle },
    { name: 'Sorğular', path: '/app/polls', icon: Vote },
    { name: 'Materiallar', path: '/app/materials', icon: FolderOpen },
    { name: 'Deadline-lar', path: '/app/deadlines', icon: Calendar },
  ];
  const toolsActive = ['/app/sandbox', '/app/water', ...navSections.map((section) => section.path)].includes(currentPath);
  const showTools = toolsMenuState?.path === currentPath ? toolsMenuState.open : toolsActive;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside className={`app-sidebar ${isOpen ? 'is-open' : ''}`}>
        {/* Brand & Workspace Identity */}
        <div className="sidebar-top">
          <Link to="/app" className="sidebar-brand-box" onClick={onClose}>
            <div className="brand-symbol">
              <Bookmark size={15} strokeWidth={2.5} />
            </div>
            <div className="brand-meta">
              <span className="brand-title">6326A2</span>
              <span className="brand-subtitle">AzTU · Kompüter Müh.</span>
            </div>
          </Link>

          {onClose && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              aria-label="Menyunu bağla"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation Flow */}
        <nav className="sidebar-nav" aria-label="Tətbiq naviqasiyası">
          {/* 1. Main Home Link */}
          <Link
            to="/app"
            className={`nav-entry ${currentPath === '/app' ? 'is-active' : ''}`}
            onClick={onClose}
          >
            <Home size={15} className="nav-icon" />
            <span className="nav-label">Əsas</span>
          </Link>

          <div className="nav-divider" />

          {/* 2. Courses Group */}
          <div className="nav-group">
            <span className="nav-group-header">FƏNLƏR</span>
            <div className="nav-group-items">
              {courses.map((c) => {
                const isActive = currentPath === c.path;
                return (
                  <Link
                    key={c.path}
                    to={c.path}
                    className={`nav-entry nav-course-entry ${isActive ? 'is-active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="course-dot" />
                    <span className="nav-label">{c.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="nav-divider" />

          {/* 3. Secondary tools stay available behind one disclosure. */}
          <div className={`sidebar-tools ${showTools ? 'is-open' : ''}`}>
            <button type="button" className="sidebar-tools-toggle" aria-expanded={showTools} onClick={() => setToolsMenuState({ path: currentPath, open: !showTools })}>
              <span>Qrup və alətlər</span><ChevronDown size={15} aria-hidden="true" />
            </button>
            {showTools && <div className="nav-group-items">
              <Link to="/app/sandbox" className={`nav-entry ${currentPath === '/app/sandbox' ? 'is-active' : ''}`} onClick={onClose}>
                <Terminal size={15} className="nav-icon" /><span className="nav-label">Python Sandbox</span>
              </Link>
              <Link to="/app/water" className={`nav-entry ${currentPath === '/app/water' ? 'is-active' : ''}`} onClick={onClose}>
                <Waves size={15} className="nav-icon" /><span className="nav-label">Su simulyasiyası</span>
              </Link>
              {navSections.map((sec) => {
                const isActive = currentPath === sec.path;
                const Icon = sec.icon;
                return (
                  <Link
                    key={sec.path}
                    to={sec.path}
                    className={`nav-entry ${isActive ? 'is-active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon size={15} className="nav-icon" />
                    <span className="nav-label">{sec.name}</span>
                  </Link>
                );
              })}
            </div>}
          </div>
        </nav>

        {/* User Profile & Logout Bottom Bar */}
        <div className="sidebar-footer">
          <div
            className="user-profile-badge"
            onClick={onOpenProfile}
            role="button"
            tabIndex={0}
            title="Tələbə profilini aç"
          >
            <div className="user-avatar-circle">
              {user?.avatarUrl ? (
                user.avatarUrl.startsWith('data:') || user.avatarUrl.startsWith('http') ? (
                  <img src={user.avatarUrl} alt={user.firstName} className="sidebar-avatar-img" />
                ) : (
                  <span>{user.avatarUrl}</span>
                )
              ) : (
                <span>{user?.avatarInitials || 'TL'}</span>
              )}
            </div>
            <div className="user-text-col">
              <span className="user-full-name">
                {user ? `${user.firstName} ${user.lastName}` : 'Tələbə'}
              </span>
              <span className="user-group-tag">Qrup {user?.group || '6326A2'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-logout-btn"
            title="Sistemdən çıxış"
            aria-label="Çıxış"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  );
};
