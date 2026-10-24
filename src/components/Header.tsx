import React, { useState, useEffect } from 'react';
import './Header.css';
import { useRouter } from '../context/RouterContext';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container container">
        {/* Left: Linear-style Geometric Mark + 6326A2 */}
        <a href="#" className="header-brand" onClick={handleNavClick}>
          <div className="brand-mark-linear">
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM14.6447 50C14.6447 30.4738 30.4738 14.6447 50 14.6447C60.334 14.6447 69.6453 19.0664 76.126 26.1557L26.1557 76.126C19.0664 69.6453 14.6447 60.334 14.6447 50ZM50 85.3553C39.666 85.3553 30.3547 80.9336 23.874 73.8443L73.8443 23.874C80.9336 30.3547 85.3553 39.666 85.3553 50C85.3553 69.5262 69.5262 85.3553 50 85.3553Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="brand-name">6326A2</span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="header-nav" aria-label="Əsas naviqasiya">
          <a href="#workspace" className="nav-link">
            İş sahəsi
          </a>
          <a href="#schematics" className="nav-link">
            Arxitektura
          </a>
          <a href="#features" className="nav-link">
            İmkanlar
          </a>
          <a href="#schedule" className="nav-link">
            Cədvəl
          </a>
          <a href="#vault" className="nav-link">
            Arxiv
          </a>
        </nav>

        {/* Right: Auth Actions & Mobile Hamburger */}
        <div className="header-actions">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="auth-link-login header-desktop-only"
            title="Daxil ol"
          >
            Daxil ol
          </button>

          <span className="nav-vertical-divider header-desktop-only" aria-hidden="true" />

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="auth-btn-pill header-desktop-only"
            title="Qeydiyyat"
          >
            Başla
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="header-mobile-drawer">
          <nav className="header-mobile-nav" aria-label="Mobil naviqasiya">
            <a href="#workspace" className="mobile-nav-link" onClick={handleNavClick}>
              İş sahəsi
            </a>
            <a href="#schematics" className="mobile-nav-link" onClick={handleNavClick}>
              Arxitektura
            </a>
            <a href="#features" className="mobile-nav-link" onClick={handleNavClick}>
              İmkanlar
            </a>
            <a href="#schedule" className="mobile-nav-link" onClick={handleNavClick}>
              Cədvəl
            </a>
            <a href="#vault" className="mobile-nav-link" onClick={handleNavClick}>
              Arxiv
            </a>
          </nav>
          <div className="header-mobile-actions">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="mobile-auth-login"
            >
              Daxil ol
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/register');
              }}
              className="mobile-auth-register"
            >
              Qeydiyyatdan keç (Başla)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
