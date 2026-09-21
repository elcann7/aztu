import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ProfileModal.css';
import { useAuth } from '../../../context/AuthContext';
import {
  X,
  Lock,
  Camera,
  Trash2,
  Save,
  Check,
  GraduationCap,
  Send,
  Globe,
  Phone,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_PRESETS = [
  '👨‍💻',
  '👩‍💻',
  '🧑‍🎓',
  '🚀',
  '⚡',
  '🎓',
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [studentIdNumber, setStudentIdNumber] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [github, setGithub] = useState<string>('');

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatarUrl || '');
      setBio(user.bio || '');
      setStudentIdNumber(user.studentIdNumber || '');
      setSpecialty(user.specialty || 'Kompüter Mühəndisliyi');
      setTelegram(user.telegram || '');
      setPhone(user.phone || '');
      setGithub(user.github || '');
      setSaveSuccess(false);
      setError(null);
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Şəkil ölçüsü maksimum 2MB ola bilər.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const res = await updateProfile({
      avatarUrl,
      bio,
      studentIdNumber,
      specialty,
      telegram,
      phone,
      github,
    });

    setIsSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      setError(res.error || 'Profil saxlanılarkən xəta baş verdi.');
    }
  };

  return createPortal(
    <div className="profile-backdrop-layer" onClick={onClose} aria-modal="true" role="dialog">
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="profile-modal-header">
          <div className="profile-header-info">
            <div className="profile-header-icon">
              <GraduationCap size={20} />
            </div>
            <div className="profile-header-titles">
              <h2>Tələbə Profili</h2>
              <p>AzTU • 6326A2 Qrup Vahid İş Sahəsi</p>
            </div>
          </div>
          <button
            type="button"
            className="google-modal-close"
            onClick={onClose}
            aria-label="Bağla"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form with pinned footer */}
        <form onSubmit={handleSave} className="profile-modal-form">
          <div className="profile-modal-scrollable-body">
          {error && (
            <div className="auth-error-box" role="alert">
              <span>{error}</span>
            </div>
          )}

          {/* 1. Avatar Photo Section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-display">
              {avatarUrl ? (
                avatarUrl.startsWith('data:') || avatarUrl.startsWith('http') ? (
                  <img src={avatarUrl} alt={user.firstName} className="profile-avatar-img" />
                ) : (
                  <span>{avatarUrl}</span>
                )
              ) : (
                <span>{user.avatarInitials}</span>
              )}
            </div>

            <div className="profile-avatar-actions">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="avatar-upload-input"
              />
              <div className="avatar-btn-row">
                <label htmlFor="avatar-upload-input" className="btn-upload-photo">
                  <Camera size={14} />
                  <span>Şəkil Yüklə</span>
                </label>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="btn-remove-photo"
                    title="Şəkli sil"
                  >
                    <Trash2 size={13} />
                    <span>Sil</span>
                  </button>
                )}
              </div>

              {/* Fast preset avatars */}
              <div className="avatar-presets-label">və ya hazır avatar seçin:</div>
              <div className="avatar-presets-list">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="preset-avatar-btn"
                    onClick={() => setAvatarUrl(preset)}
                    title="Avatar seç"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Locked Identity Information */}
          <div className="profile-form-section">
            <div className="section-title-badge">
              <span>Təsdiqlənmiş Tələbə İdentikliyi</span>
              <span className="locked-indicator">
                <Lock size={11} />
                Dəyişdirilə bilməz
              </span>
            </div>

            <div className="profile-grid-2">
              <div className="form-group">
                <label className="form-label">Ad və Soyad</label>
                <div className="locked-input-wrapper">
                  <input
                    type="text"
                    value={`${user.firstName} ${user.lastName}`}
                    disabled
                    className="form-input locked-input"
                  />
                  <Lock size={14} className="lock-badge-icon" />
                </div>
                <span className="field-lock-hint">Universitet qeydiyyatı ilə təsdiqlənib</span>
              </div>

              <div className="form-group">
                <label className="form-label">Akademik Qrup</label>
                <div className="locked-input-wrapper">
                  <input
                    type="text"
                    value={`AzTU • ${user.group}`}
                    disabled
                    className="form-input locked-input"
                  />
                  <Lock size={14} className="lock-badge-icon" />
                </div>
                <span className="field-lock-hint">6326A2 Qrup portalı</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">E-poçt ünvanı</label>
              <div className="locked-input-wrapper">
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="form-input locked-input"
                />
                <Lock size={14} className="lock-badge-icon" />
              </div>
            </div>
          </div>

          {/* 3. Customizable Student Information */}
          <div className="profile-form-section">
            <div className="section-title-badge">
              <span>Tələbə Məlumatları & İxtisas</span>
            </div>

            <div className="profile-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="student-id-input">
                  Tələbə Bilet / Kart №
                </label>
                <input
                  id="student-id-input"
                  type="text"
                  value={studentIdNumber}
                  onChange={(e) => setStudentIdNumber(e.target.value)}
                  placeholder="Məsələn: 2306326..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="specialty-input">
                  İxtisas
                </label>
                <input
                  id="specialty-input"
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Kompüter Mühəndisliyi"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bio-input">
                Status / Qısa Məlumat
              </label>
              <input
                id="bio-input"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Məsələn: Python, Web və Alqoritmlər üzərində işləyirəm 🚀"
                className="form-input"
              />
            </div>
          </div>

          {/* 4. Contact & Social Links */}
          <div className="profile-form-section">
            <div className="section-title-badge">
              <span>Qrup Yoldaşları üçün Əlaqə</span>
            </div>

            <div className="profile-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="telegram-input">
                  Telegram
                </label>
                <div className="input-with-icon">
                  <Send size={15} className="input-icon-left" />
                  <input
                    id="telegram-input"
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="@istifadeci"
                    className="form-input pl-input-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone-input">
                  WhatsApp / Əlaqə
                </label>
                <div className="input-with-icon">
                  <Phone size={15} className="input-icon-left" />
                  <input
                    id="phone-input"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+994 50 123 45 67"
                    className="form-input pl-input-icon"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="github-input">
                GitHub / Portfolio
              </label>
              <div className="input-with-icon">
                <Globe size={15} className="input-icon-left" />
                <input
                  id="github-input"
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="form-input pl-input-icon"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="profile-modal-footer">
            <div>
              {saveSuccess && (
                <div className="save-status-msg">
                  <Check size={16} />
                  <span>Dəyişikliklər uğurla saxlanıldı!</span>
                </div>
              )}
            </div>

            <div className="profile-footer-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
              >
                Bağla
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-profile-save"
              >
                <Save size={14} />
                <span>{isSaving ? 'Yadda saxlanılır...' : 'Yadda saxla'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
