import React, { useState } from 'react';
import './RegisterPage.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from '../../context/RouterContext';
import {
  Bookmark,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  Users,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, loginWithGoogle, registeredCount, maxLimit, isRegistrationLocked } = useAuth();
  const { navigate } = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleGroupCode, setGoogleGroupCode] = useState('');
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Şifrələr bir-biri ilə uyğun gəlmir.');
      return;
    }

    if (password.length < 6) {
      setError('Şifrə minimum 6 simvoldan ibarət olmalıdır.');
      return;
    }

    if (!groupCode.trim()) {
      setError('Qeydiyyatdan keçmək üçün 6326A2 qrup təsdiq kodunu daxil edin.');
      return;
    }

    setIsSubmitting(true);
    const res = await register(firstName, lastName, email, password, groupCode);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/app');
    } else {
      setError(res.error || 'Qeydiyyat zamanı xəta baş verdi.');
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
      setGoogleError(res.error || 'Google ilə qeydiyyat zamanı xəta baş verdi.');
    }
  };

  const remainingSlots = Math.max(0, maxLimit - registeredCount);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-top-nav">
        <Link to="/" className="auth-back-link">
          <ArrowLeft size={14} />
          <span>Əsas səhifəyə qayıt</span>
        </Link>
      </div>

      <div className="auth-card-container register-card-container">
        {/* Brand Header */}
        <div className="auth-header">
          <Link to="/" className="auth-brand">
            <div className="auth-brand-mark">
              <Bookmark size={16} strokeWidth={2.5} />
            </div>
            <span className="auth-brand-name">6326A2</span>
          </Link>
          <h1 className="auth-title">Qeydiyyatdan keçin</h1>
          <p className="auth-subtitle">6326A2 qrup iş sahəsinə qoşulun</p>
        </div>

        {/* Quota Indicator Badge */}
        <div className={`quota-status-pill ${isRegistrationLocked ? 'quota-locked' : ''}`}>
          <div className="quota-pill-left">
            <Users size={14} />
            <span>Qrup kvotası: <strong>{registeredCount} / {maxLimit} tələbə</strong></span>
          </div>
          <span className="quota-pill-slots">
            {isRegistrationLocked ? 'Limit dolub' : `${remainingSlots} yer qalıb`}
          </span>
        </div>

        {/* Locked view if 30 students limit reached */}
        {isRegistrationLocked ? (
          <div className="registration-locked-box">
            <div className="locked-icon-wrapper">
              <Lock size={28} />
            </div>
            <h3>Qeydiyyat Qapalıdır</h3>
            <p>
              6326A2 qrupu üçün nəzərdə tutulmuş <strong>{maxLimit} nəfərlik</strong> qeydiyyat limiti tamamlanmışdır.
              Təhlükəsizlik və məxfilik səbəbilə kənar şəxslərin daxil olmasına icazə verilmir.
            </p>
            <Link to="/login" className="btn-primary locked-login-btn">
              <span>Mövcud Hesabla Daxil Ol</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            {/* Error alert */}
            {error && (
              <div className="auth-error-box" role="alert">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={() => {
                setGoogleError(null);
                setShowGoogleModal(true);
              }}
              className="google-auth-btn"
              id="google-register-btn"
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
              <span>Google ilə qeydiyyatdan keç</span>
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>və ya form ilə</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="reg-first-name" className="form-label">
                    Ad
                  </label>
                  <input
                    id="reg-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Məsələn: Əli"
                    required
                    autoFocus
                    className="form-input"
                    autoComplete="given-name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reg-last-name" className="form-label">
                    Soyad
                  </label>
                  <input
                    id="reg-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Məsələn: Əliyev"
                    required
                    className="form-input"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-email" className="form-label">
                  E-poçt
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ad.soyad@aztu.edu.az"
                  required
                  className="form-input"
                  autoComplete="email"
                />
              </div>

              {/* Group Security Code Field */}
              <div className="form-group">
                <label htmlFor="reg-group-code" className="form-label">
                  Qrup Təsdiq Kodu
                </label>
                <div className="input-with-icon">
                  <ShieldCheck size={16} className="input-icon-left" />
                  <input
                    id="reg-group-code"
                    type="text"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    placeholder="Qrup kodunu daxil edin (məsələn: 6326A2)"
                    required
                    className="form-input pl-input-icon"
                  />
                </div>
                <span className="input-hint">Kənar şəxslərin daxil olmaması üçün tələb olunur</span>
              </div>

              <div className="form-group">
                <label htmlFor="reg-password" className="form-label">
                  Şifrə
                </label>
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 simvol"
                  required
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm-password" className="form-label">
                  Şifrəni təsdiqlə
                </label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifrəni təkrar daxil edin"
                  required
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary auth-submit-btn"
              >
                <span>{isSubmitting ? 'Qeydiyyat edilir...' : 'Qeydiyyatdan keç'}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}

        {/* Footer Link */}
        <div className="auth-footer">
          <span>Artıq hesabın var?</span>{' '}
          <Link to="/login" className="auth-switch-link">
            Daxil ol
          </Link>
        </div>
      </div>

      {/* Google Sign In / Registration Modal */}
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
                  <h3>Google ilə qeydiyyat</h3>
                  <p>6326A2 Qrup Portalına qoşulun</p>
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
                <label className="form-label" htmlFor="google-reg-email">
                  Google və ya AzTU E-poçt
                </label>
                <input
                  id="google-reg-email"
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
                <label className="form-label" htmlFor="google-reg-name">
                  Ad və Soyad
                </label>
                <input
                  id="google-reg-name"
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
                <label className="form-label" htmlFor="google-reg-code">
                  6326A2 Qrup Təsdiq Kodu
                </label>
                <div className="input-with-icon">
                  <ShieldCheck size={16} className="input-icon-left" />
                  <input
                    id="google-reg-code"
                    type="text"
                    value={googleGroupCode}
                    onChange={(e) => setGoogleGroupCode(e.target.value)}
                    placeholder="Məsələn: 6326A2"
                    required
                    className="form-input pl-input-icon"
                  />
                </div>
                <span className="input-hint">Kənar şəxslərin qeydiyyatını əngəlləmək üçün tələb olunur</span>
              </div>

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
                  {isGoogleSubmitting ? 'Qeydiyyat edilir...' : 'Təsdiqlə və Daxil Ol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
