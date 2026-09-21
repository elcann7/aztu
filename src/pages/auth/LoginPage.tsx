import React, { useState } from 'react';
import './LoginPage.css';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from '../../context/RouterContext';
import { Bookmark, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleQuickDemo = () => {
    setEmail('hesen.m@aztu.edu.az');
    setPassword('123456');
    setError(null);
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

        {/* Demo Credentials Quick Pill */}
        <div className="auth-demo-banner" onClick={handleQuickDemo} role="button" tabIndex={0}>
          <div className="demo-banner-content">
            <span className="demo-pill-tag">Sınaq tələbə hesabı</span>
            <span className="demo-credentials">hesen.m@aztu.edu.az · 123456</span>
          </div>
          <span className="demo-fill-action">Doldur</span>
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
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              E-poçt
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hesen.m@aztu.edu.az"
              required
              autoFocus
              className="form-input"
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
    </div>
  );
};
