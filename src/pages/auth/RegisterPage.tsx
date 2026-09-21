import React, { useState } from 'react';
import './RegisterPage.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from '../../context/RouterContext';
import { Bookmark, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { navigate } = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    const res = await register(firstName, lastName, email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/app');
    } else {
      setError(res.error || 'Qeydiyyat zamanı xəta baş verdi.');
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

        {/* Error alert */}
        {error && (
          <div className="auth-error-box" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

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
            />
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

        {/* Footer Link */}
        <div className="auth-footer">
          <span>Artıq hesabın var?</span>{' '}
          <Link to="/login" className="auth-switch-link">
            Daxil ol
          </Link>
        </div>
      </div>
    </div>
  );
};
