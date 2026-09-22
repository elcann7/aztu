import React, { useState, useEffect, useRef } from 'react';
import './LoginPage.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from '../../context/RouterContext';
import { Bookmark, ArrowRight, AlertCircle, ArrowLeft, X, ShieldCheck, Key } from 'lucide-react';
import { parseGoogleJwt, GOOGLE_CLIENT_ID } from '../../services/googleAuth';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, isRegistrationLocked } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google GIS & Modal State
  const [customClientId, setCustomClientId] = useState<string>(() => {
    return localStorage.getItem('aztu_google_client_id') || GOOGLE_CLIENT_ID || '';
  });
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showClientIdConfig, setShowClientIdConfig] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleGroupCode, setGoogleGroupCode] = useState('6326A2');
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  // Initialize official Google Identity Services if client ID exists
  useEffect(() => {
    const activeClientId = customClientId.trim();
    if (!activeClientId) return;

    const initGsi = () => {
      if (!window.google?.accounts?.id) return;

      try {
        window.google.accounts.id.initialize({
          client_id: activeClientId,
          callback: async (response: { credential: string }) => {
            const payload = parseGoogleJwt(response.credential);
            if (!payload) {
              setError('Google məlumatları oxunmadı.');
              return;
            }

            const res = await loginWithGoogle(payload.email, payload.name, undefined, payload.picture);
            if (res.success) {
              navigate('/app');
            } else if (res.requiresGroupCode) {
              setGoogleEmail(payload.email);
              setGoogleName(payload.name);
              setShowGoogleModal(true);
            } else {
              setError(res.error || 'Google ilə daxil olmaq mümkün olmadı.');
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleBtnContainerRef.current) {
          googleBtnContainerRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: '350',
            logo_alignment: 'left',
          });
        }
      } catch (err) {
        console.error('GIS initialization error:', err);
      }
    };

    // Wait if GIS script is still loading
    if (window.google?.accounts?.id) {
      initGsi();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          initGsi();
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, [customClientId, loginWithGoogle, navigate]);

  const handleGoogleBtnClick = () => {
    const activeId = customClientId.trim();
    if (!activeId) {
      setShowClientIdConfig(true);
      return;
    }

    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setShowGoogleModal(true);
    }
  };

  const saveClientId = (id: string) => {
    const cleanId = id.trim();
    setCustomClientId(cleanId);
    if (cleanId) {
      localStorage.setItem('aztu_google_client_id', cleanId);
    } else {
      localStorage.removeItem('aztu_google_client_id');
    }
    setShowClientIdConfig(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/app');
    } else {
      setError(res.error || 'Daxil olmaq mümkün olmadı.');
    }
  };

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError(null);
    setIsGoogleSubmitting(true);

    const res = await loginWithGoogle(googleEmail, googleName, googleGroupCode);
    setIsGoogleSubmitting(false);

    if (res.success) {
      setShowGoogleModal(false);
      navigate('/app');
    } else {
      setGoogleError(res.error || 'Google ilə daxil olmaq mümkün olmadı.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-top-nav">
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={14} />
          <span>Əsas səhifəyə qayıt</span>
        </Link>
      </div>

      <div className="auth-card-container">
        {/* Brand Header */}
        <div className="auth-header">
          <Link to="/" className="auth-brand">
            <div className="auth-brand-mark">
              <Bookmark size={16} strokeWidth={2.5} />
            </div>
            <span className="auth-brand-name">6326A2</span>
          </Link>
          <h1 className="auth-title">İş sahəsinə daxil olun</h1>
          <p className="auth-subtitle">Universitet qrupunuzun vahid resursları və dərsləri</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="auth-error-box" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {/* Real Google GIS Button or Custom Trigger */}
        <div className="google-auth-container">
          <div
            ref={googleBtnContainerRef}
            className="google-gis-rendered"
            style={{ display: customClientId ? 'flex' : 'none', justifyContent: 'center' }}
          />
          {!customClientId && (
            <button
              type="button"
              onClick={handleGoogleBtnClick}
              className="google-auth-btn"
              id="google-login-btn"
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google ilə daxil ol</span>
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span>və ya e-poçt ilə</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              E-poçt
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ad.soyad@aztu.edu.az"
              required
              autoFocus
              className="form-input"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Şifrə
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-input"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary auth-submit-btn"
          >
            <span>{isSubmitting ? 'Yoxlanılır...' : 'Daxil ol'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="auth-footer">
          <span>Hesabın yoxdur?</span>{' '}
          <Link to="/register" className="auth-switch-link">
            Qeydiyyatdan keç
          </Link>
        </div>
      </div>

      {/* Google Sign In Modal */}
      {showGoogleModal && (
        <div className="google-modal-backdrop" onClick={() => setShowGoogleModal(false)}>
          <div className="google-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="google-modal-header">
              <div className="google-modal-brand">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <div className="google-modal-titles">
                  <h3>Google ilə daxil olun</h3>
                  <p>6326A2 Qrup Portalına keçid</p>
                </div>
              </div>
              <button
                type="button"
                className="google-modal-close"
                onClick={() => setShowGoogleModal(false)}
                aria-label="Bağla"
              >
                <X size={18} />
              </button>
            </div>

            {googleError && (
              <div className="auth-error-box" style={{ margin: '0.75rem 0' }}>
                <AlertCircle size={14} />
                <span>{googleError}</span>
              </div>
            )}

            <form onSubmit={handleGoogleSubmit} className="google-modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="google-email-input">
                  Google və ya AzTU E-poçt
                </label>
                <input
                  id="google-email-input"
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="ad.soyad@aztu.edu.az və ya @gmail.com"
                  required
                  autoFocus
                  className="form-input"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="google-name-input">
                  Ad və Soyad
                </label>
                <input
                  id="google-name-input"
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Məsələn: Əli Əliyev"
                  required
                  className="form-input"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label" htmlFor="google-group-code">
                    6326A2 Qrup Kodu <span className="label-badge-optional">(İlk qeydiyyat üçün)</span>
                  </label>
                </div>
                <div className="input-with-icon">
                  <ShieldCheck size={16} className="input-icon-left" />
                  <input
                    id="google-group-code"
                    type="text"
                    value={googleGroupCode}
                    onChange={(e) => setGoogleGroupCode(e.target.value)}
                    placeholder="Məsələn: 6326A2"
                    className="form-input pl-input-icon"
                  />
                </div>
                <span className="input-hint">Kənar şəxslərin girişini əngəlləmək üçün tələb olunur</span>
              </div>

              {isRegistrationLocked && (
                <div className="quota-warning-banner">
                  <AlertCircle size={14} />
                  <span>30 nəfərlik qeydiyyat limiti tamamlanıb. Yalnız əvvəl qeydiyyatdan keçmiş tələbələr daxil ola bilər.</span>
                </div>
              )}

              <div className="google-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowGoogleModal(false)}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={isGoogleSubmitting}
                  className="btn-google-confirm"
                >
                  {isGoogleSubmitting ? 'Yoxlanılır...' : 'Daxil ol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showClientIdConfig && (
        <div className="google-modal-backdrop" onClick={() => setShowClientIdConfig(false)}>
          <div className="google-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="google-modal-header">
              <div className="google-modal-brand">
                <Key size={22} color="#1a73e8" />
                <div className="google-modal-titles">
                  <h3>Google OAuth Client ID</h3>
                  <p>Rəsmi Google pəncərəsi üçün tələb olunur</p>
                </div>
              </div>
              <button
                type="button"
                className="google-modal-close"
                onClick={() => setShowClientIdConfig(false)}
                aria-label="Bağla"
              >
                <X size={18} />
              </button>
            </div>
            <p className="input-hint" style={{ fontSize: '0.78rem', marginBottom: '0.85rem', lineHeight: 1.5 }}>
              Birbaşa Google-un öz rəsmi pəncərəsi ilə tələbə hesabını seçmək üçün Google Cloud Console-dan aldığınız <strong>Client ID</strong>-ni bura daxil edin.
            </p>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={customClientId}
                onChange={(e) => setCustomClientId(e.target.value)}
                placeholder="məsələn: 123456...apps.googleusercontent.com"
                className="form-input"
              />
            </div>
            <div className="google-modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setShowClientIdConfig(false);
                  setShowGoogleModal(true);
                }}
              >
                Sürətli Giriş
              </button>
              <button
                type="button"
                className="btn-google-confirm"
                onClick={() => saveClientId(customClientId)}
              >
                Yadda saxla və Qoş
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
