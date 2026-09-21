import React, { useState, useEffect } from 'react';
import './Header.css';
import { Bookmark } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container container">
        {/* Left: 6326A2 Logo */}
        <a href="#" className="header-brand">
          <div className="brand-mark">
            <Bookmark size={14} strokeWidth={2.5} />
          </div>
          <span className="brand-name">6326A2</span>
        </a>

        {/* Center: Simplified Landing Navigation */}
        <nav className="header-nav" aria-label="Əsas naviqasiya">
          <a href="#workspace" className="nav-link">
            Məhsul
          </a>
          <a href="#features" className="nav-link">
            İmkanlar
          </a>
          <a href="#about" className="nav-link">
            Haqqında
          </a>
        </nav>

        {/* Right: Clean Auth Buttons */}
        <div className="header-actions">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="btn-ghost auth-btn-login"
            title="Daxil ol"
          >
            Daxil ol
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="btn-primary auth-btn-start"
            title="Başla"
          >
            Başla
          </button>
        </div>
      </div>
    </header>
  );
};
