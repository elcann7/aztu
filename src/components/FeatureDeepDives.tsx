import React, { useState } from 'react';
import './FeatureDeepDives.css';
import {
  ArrowRight,
  Download,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { TeXFormula } from './common/TeXFormula';

interface VaultMaterial {
  id: string;
  name: string;
  course: string;
  code: string;
  type: string;
  size: string;
  author: string;
  date: string;
}

const VAULT_MATERIALS: VaultMaterial[] = [
  {
    id: 'vm-1',
    name: 'Mühazirə 03 — Çoxluqlar, Limitlər və Ardıcıllıqlar',
    course: 'Riyazi analiz - 1',
    code: 'MAT-03',
    type: 'PDF',
    size: '2.4 MB',
    author: 'Dos. Nizami Şıxəliyev',
    date: '22 Sentyabr',
  },
  {
    id: 'vm-2',
    name: 'F.M.Əzimov — Pythonda proqramlaşdırmanın əsasları (Dərslik)',
    course: 'Proqramlaşdırma',
    code: 'PRG-01',
    type: 'PDF',
    size: '8.4 MB',
    author: 'Dos. Fizuli Əzimov',
    date: '22 Sentyabr',
  },
  {
    id: 'vm-3',
    name: 'Xətti Cəbr — Dərs Müh1 və Müh2 Matris və Determinantlar',
    course: 'Xətti cəbr',
    code: 'CEB-02',
    type: 'PPTX',
    size: '5.6 MB',
    author: 'Dos. Rəna Əmirova',
    date: '18 Sentyabr',
  },
  {
    id: 'vm-4',
    name: 'Fizika — Nyuton Qanunları və Fırlanma Dinamikası',
    course: 'Fizika',
    code: 'FIZ-01',
    type: 'PDF',
    size: '4.1 MB',
    author: 'Dos. Sürəyya Məmmədova',
    date: '17 Sentyabr',
  },
  {
    id: 'vm-5',
    name: 'ADİAK Məşğələ 1–23 Tam Təqdimat Paketi',
    course: 'Azərbaycan dili',
    code: 'AZE-01',
    type: 'PDF',
    size: '14.2 MB',
    author: 'Müəl. Nərminə İsayeva',
    date: '29 Sentyabr',
  },
];

export const FeatureDeepDives: React.FC = () => {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadVault = (name: string) => {
    setDownloadToast(`"${name}" Cloudflare R2 arxivindən açılır...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  return (
    <>
      {/* 1. LINEAR FACULTY & INSTITUTIONAL RIBBON */}
      <section className="linear-ribbon-section">
        <div className="container">
          <div className="ribbon-eyebrow">
            AZƏRBAYCAN TEXNİKİ UNİVERSİTETİ · İNFORMASİYA TEXNOLOGİYALARI VƏ İDARƏETMƏ FAKÜLTƏSİ
          </div>
          <div className="ribbon-logos-row">
            <div className="ribbon-badge-item">
              <span className="badge-abbr">AzTU</span>
              <span className="badge-name">Texniki Universitet</span>
            </div>
            <div className="ribbon-badge-item">
              <span className="badge-abbr">6326A2</span>
              <span className="badge-name">Kompüter Mühəndisliyi</span>
            </div>
            <div className="ribbon-badge-item">
              <span className="badge-abbr">ECTS</span>
              <span className="badge-name">Boloniya Sistemi</span>
            </div>
            <div className="ribbon-badge-item">
              <span className="badge-abbr">R2</span>
              <span className="badge-name">Cloudflare Arxiv</span>
            </div>
            <div className="ribbon-badge-item">
              <span className="badge-abbr">KOICA</span>
              <span className="badge-name">LMS Portal</span>
            </div>
            <div className="ribbon-badge-item">
              <span className="badge-abbr">PY-3</span>
              <span className="badge-name">Python Sandbox</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LINEAR SCHEMATICS (FIG 0.1, FIG 0.2, FIG 0.3) */}
      <section className="linear-schematics-section" id="schematics">
        <div className="container">
          <div className="schematics-header-block reveal-up">
            <h2 className="schematics-headline">
              <span className="headline-lead">Yeni nəsil akademik iş mühiti.</span>{' '}
              <span className="headline-trail">
                Tələbələrin gündəlik dərslərini, mühazirələrini və kolloqvium hazırlıqlarını mühəndislik intizamı ilə birləşdirən vahid sistem.
              </span>
            </h2>
          </div>

          <div className="schematics-grid">
            {/* FIG 0.1 */}
            <div className="schematic-col">
              <div className="schematic-art-box">
                <svg viewBox="0 0 320 200" fill="none" className="schematic-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160 30 L290 95 L160 160 L30 95 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.01)"/>
                  <path d="M160 10 L270 65 L160 120 L50 65 Z" stroke="rgba(94, 106, 210, 0.4)" strokeWidth="1.2" strokeDasharray="3 3" fill="rgba(94,106,210,0.03)"/>
                  <path d="M160 70 L200 90 L200 130 L160 150 L120 130 L120 90 Z" stroke="#f7f8f8" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
                  <path d="M160 70 L160 110 M160 110 L200 130 M160 110 L120 130" stroke="#8a8f98" strokeWidth="1"/>
                  <line x1="80" y1="80" x2="160" y2="110" stroke="#5e6ad2" strokeWidth="1.2"/>
                  <circle cx="80" cy="80" r="3" fill="#5e6ad2"/>
                  <line x1="240" y1="80" x2="160" y2="110" stroke="#5e6ad2" strokeWidth="1.2"/>
                  <circle cx="240" cy="80" r="3" fill="#5e6ad2"/>
                  <circle cx="160" cy="110" r="4" fill="#f7f8f8"/>
                </svg>
              </div>
              <div className="schematic-meta-row">
                <span className="schematic-fig-id">FIG 0.1</span>
                <span className="schematic-fig-title">Sinxron R2 Arxiv Şəbəkəsi</span>
              </div>
              <p className="schematic-fig-desc">
                WhatsApp qruplarında itib-batan slaydlar əvəzinə Cloudflare R2 infrastrukturunda saxlanılan 33 rəsmi vəsait.
              </p>
            </div>

            {/* FIG 0.2 */}
            <div className="schematic-col">
              <div className="schematic-art-box">
                <svg viewBox="0 0 320 200" fill="none" className="schematic-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M160 30 L290 95 L160 160 L30 95 Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  <path d="M100 100 L130 85 L130 125 L100 140 Z" stroke="#8a8f98" strokeWidth="1" fill="rgba(255,255,255,0.03)"/>
                  <path d="M130 85 L150 75 L150 115 L130 125 Z" stroke="#62666d" strokeWidth="1"/>
                  <path d="M100 100 L120 90 L150 75 L130 85 Z" stroke="#d0d6e0" strokeWidth="1"/>
                  <path d="M150 80 L180 65 L180 120 L150 135 Z" stroke="#5e6ad2" strokeWidth="1.2" fill="rgba(94,106,210,0.08)"/>
                  <path d="M180 65 L200 55 L200 110 L180 120 Z" stroke="#5e6ad2" strokeWidth="1"/>
                  <path d="M150 80 L170 70 L200 55 L180 65 Z" stroke="#8a8f98" strokeWidth="1"/>
                  <line x1="60" y1="120" x2="260" y2="60" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 4"/>
                  <circle cx="175" cy="85" r="3" fill="#f59e0b"/>
                </svg>
              </div>
              <div className="schematic-meta-row">
                <span className="schematic-fig-id">FIG 0.2</span>
                <span className="schematic-fig-title">Boloniya Davamiyyət Prosessoru</span>
              </div>
              <p className="schematic-fig-desc">
                25% həddi aşılmadan real-vaxt xəbərdarlıq və Forma-1 balının hər qaibdə avtomatik yenilənməsi.
              </p>
            </div>

            {/* FIG 0.3 */}
            <div className="schematic-col">
              <div className="schematic-art-box">
                <svg viewBox="0 0 320 200" fill="none" className="schematic-svg" xmlns="http://www.w3.org/2000/svg">
                  <path d="M110 35 L230 75 L170 165 L50 125 Z" stroke="#f7f8f8" strokeWidth="1.2" fill="rgba(255,255,255,0.03)"/>
                  <line x1="80" y1="80" x2="160" y2="105" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                  <line x1="90" y1="95" x2="180" y2="125" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                  <line x1="100" y1="110" x2="150" y2="126" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                  <circle cx="190" cy="90" r="16" stroke="#10b981" strokeWidth="1.5" fill="rgba(16, 185, 129, 0.1)"/>
                  <path d="M184 90 L188 94 L196 86" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="schematic-meta-row">
                <span className="schematic-fig-id">FIG 0.3</span>
                <span className="schematic-fig-title">Kolloqvium İntuisiyası & Sınaq</span>
              </div>
              <p className="schematic-fig-desc">
                Əzbərçilikdən uzaq, interaktiv addım-addım riyazi isbatlar və ani qiymətləndirmə mexanizmi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LINEAR FEATURE SPOTLIGHT 1: SEMESTR PLANI VƏ CƏDVƏL (CYCLES) */}
      <section className="linear-spotlight-section" id="schedule">
        <div className="container">
          <div className="spotlight-header-row">
            <div className="spotlight-title-col">
              <span className="spotlight-eyebrow">TƏDRİS DÖVRÜ & CƏDVƏL</span>
              <h2 className="spotlight-heading">Semestr Planı və Dərs Axını.</h2>
            </div>
            <div className="spotlight-desc-col">
              <p className="spotlight-paragraph">
                Hər bir dərs, mühazirə və laboratoriya semestr təqviminə uyğun sinxronlaşdırılır.
                WhatsApp qruplarındakı xaos əvəzinə tək baxışla bütün axını və auditoriyaları izləyin.
              </p>
            </div>
          </div>

          {/* Linear Cycle Window */}
          <div className="linear-feature-window">
            <div className="feature-window-header">
              <div className="cycle-header-left">
                <span className="cycle-live-dot" />
                <span className="cycle-name">Payız Semestri 2026/27 · 5-ci Tədris Həftəsi</span>
              </div>
              <div className="cycle-header-right">
                <span className="cycle-progress-text">32% Tamamlandı (Həftə 5 / 15)</span>
              </div>
            </div>

            {/* Cycle Bar */}
            <div className="cycle-progress-track">
              <div className="cycle-progress-fill" style={{ width: '32%' }} />
            </div>

            {/* Linear Issue Rows for Schedule */}
            <div className="linear-issue-rows-list">
              <div className="linear-schedule-row">
                <div className="row-left-status">
                  <span className="row-status-dot done" />
                  <span className="row-time">09:00 - 10:20</span>
                </div>
                <div className="row-center-info">
                  <span className="row-code mat">MAT-101</span>
                  <span className="row-title">Riyazi analiz-1 — Ədədi ardıcıllıqlar və onların limiti</span>
                </div>
                <div className="row-right-meta">
                  <span className="row-room">Aud. 1-506</span>
                  <span className="row-teacher">Dos. Nizami Şıxəliyev</span>
                  <span className="row-type-pill">Mühazirə</span>
                </div>
              </div>

              <div className="linear-schedule-row active-now">
                <div className="row-left-status">
                  <span className="row-status-dot active" />
                  <span className="row-time">10:30 - 11:50</span>
                </div>
                <div className="row-center-info">
                  <span className="row-code prog">PRG-201</span>
                  <span className="row-title">Proqramlaşdırmanın əsasları-1 — Python Matrislər & Slicing</span>
                </div>
                <div className="row-right-meta">
                  <span className="row-room">Aud. 6-508</span>
                  <span className="row-teacher">Müəl. Ayxan Həsənov</span>
                  <span className="row-type-pill active">İndi Davam Edir</span>
                </div>
              </div>

              <div className="linear-schedule-row">
                <div className="row-left-status">
                  <span className="row-status-dot pending" />
                  <span className="row-time">12:00 - 13:20</span>
                </div>
                <div className="row-center-info">
                  <span className="row-code xar">XAR-301</span>
                  <span className="row-title">Xarici dildə işgüzar və akademik kommunikasiya</span>
                </div>
                <div className="row-right-meta">
                  <span className="row-room">Aud. 6-506</span>
                  <span className="row-teacher">Müəl. Dilarə Həmidova</span>
                  <span className="row-type-pill">Seminar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LINEAR FEATURE SPOTLIGHT 2: KOLLOQVİUM İNTUİSİYASI & İSBATLAR */}
      <section className="linear-spotlight-section" id="colloquium">
        <div className="container">
          <div className="spotlight-header-row">
            <div className="spotlight-title-col">
              <span className="spotlight-eyebrow">AKADEMİK DƏRİNLİK</span>
              <h2 className="spotlight-heading">Kolloqvium İntuisiyası & İsbatlar.</h2>
            </div>
            <div className="spotlight-desc-col">
              <p className="spotlight-paragraph">
                Əzbərçilik yox, təmiz mühəndislik yanaşması. Hər bir riyazi teorem addım-addım isbatı,
                məntiqi izahı və sınaq tapşırıqları ilə təqdim olunur.
              </p>
            </div>
          </div>

          {/* Linear Theorem Proof Card */}
          <div className="linear-feature-window">
            <div className="feature-window-header">
              <div className="cycle-header-left">
                <span className="code-lang-tag">teorem_veyerstras.tex</span>
                <span className="cycle-name">Riyazi analiz-1 · 1-ci Kolloqvium Rəsmi Sillabus</span>
              </div>
              <div className="cycle-header-right">
                <span className="verified-badge">
                  <ShieldCheck size={13} />
                  <span>Dos. N.Şıxəliyev Təsdiqi</span>
                </span>
              </div>
            </div>

            <div className="theorem-content-body">
              {/* LaTeX Rendered Math Box */}
              <div className="theorem-code-box">
                <TeXFormula
                  formula={`\\lim_{x \\to 0} \\frac{\\sin(5x)}{x} = 5 \\quad \\text{və} \\quad \\forall n \\in \\mathbb{N}: \\, x_n \\le x_{n+1} \\le M \\implies \\exists \\lim_{n \\to \\infty} x_n = \\sup X`}
                  displayMode
                />
              </div>

              {/* 3 Step Cards */}
              <div className="theorem-steps-grid">
                <div className="step-card">
                  <div className="step-num">01</div>
                  <div className="step-title">Ardıcıllığın Monotonluğu</div>
                  <p className="step-desc">
                    Hər sonrakı hədd əvvəlkindən kiçik deyil (xₙ₊₁ ≥ xₙ). Ardıcıllıq sola qayıtmadan yalnız bir istiqamətdə böyüyür.
                  </p>
                </div>

                <div className="step-card">
                  <div className="step-num">02</div>
                  <div className="step-title">Yuxarıdan Məhdudluq</div>
                  <p className="step-desc">
                    Elə sonlu $M$ ədədi mövcuddur ki, bütün hədlər $x_n \le M$ şərtini ödəyir və sonsuzluğa dağılmır.
                  </p>
                </div>

                <div className="step-card">
                  <div className="step-num">03</div>
                  <div className="step-title">Veyerştras Teoremi</div>
                  <p className="step-desc">
                    Hər iki şərt ödəndikdə ardıcıllığın sonlu limiti var və bu limit onun dəqiq yuxarı sərhəddinə ($\sup X$) bərabərdir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LINEAR FEATURE SPOTLIGHT 3: 25% QAİB MÜHƏRRİKİ & DAVAMİYYƏT */}
      <section className="linear-spotlight-section" id="attendance">
        <div className="container">
          <div className="spotlight-header-row">
            <div className="spotlight-title-col">
              <span className="spotlight-eyebrow">BOLONİYA İNTİZAMI</span>
              <h2 className="spotlight-heading">Ağıllı Davamiyyət & Forma-1 Monitoru.</h2>
            </div>
            <div className="spotlight-desc-col">
              <p className="spotlight-paragraph">
                25% qaib limiti riskinə girmədən, Forma-1 giriş balınızı maksimum (10/10) səviyyədə qoruyun.
                Hər bir saat avtomatik hesablanır və kəsr təhlükəsi öncədən bildirişlə xəbərdar edilir.
              </p>
            </div>
          </div>

          {/* Linear 3-Pillar Analytics Card */}
          <div className="linear-feature-window">
            <div className="analytics-pillars-grid">
              <div className="analytics-pillar">
                <span className="pillar-label">QALAN İCAZƏLİ SAAT</span>
                <div className="pillar-value-big">13 saat</div>
                <div className="pillar-sub-text">15 saatlıq 25% limitindən cəmi 2 saat qaib qeydə alınıb</div>
                <div className="pillar-status-chip safe">
                  <span className="status-dot-green" />
                  <span>Təhlükəsiz Zona (97% Davamiyyət)</span>
                </div>
              </div>

              <div className="analytics-pillar">
                <span className="pillar-label">FORMA-1 DAVAMİYYƏT BALI</span>
                <div className="pillar-value-big">10 / 10</div>
                <div className="pillar-sub-text">Maksimum Forma-1 imtahan öncəsi balı tam qorunur</div>
                <div className="pillar-status-chip safe">
                  <span className="status-dot-green" />
                  <span>Maksimum Bal Qüvvədədir</span>
                </div>
              </div>

              <div className="analytics-pillar">
                <span className="pillar-label">İMTAHANA GİRİŞ HÜQUQU</span>
                <div className="pillar-value-big">Uyğundur</div>
                <div className="pillar-sub-text">Boloniya qaydası üzrə kəsr riski mövcud deyil</div>
                <div className="pillar-status-chip neutral">
                  <span className="status-dot-blue" />
                  <span>Sistem Tərəfindən Təsdiqlənib</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LINEAR FEATURE SPOTLIGHT 4: CLOUDFLARE R2 AKADEMİK ARXİV */}
      <section className="linear-spotlight-section" id="vault">
        <div className="container">
          <div className="spotlight-header-row">
            <div className="spotlight-title-col">
              <span className="spotlight-eyebrow">RƏSMİ RESURSLAR</span>
              <h2 className="spotlight-heading">Sinxron R2 Arxiv Şəbəkəsi.</h2>
            </div>
            <div className="spotlight-desc-col">
              <p className="spotlight-paragraph">
                AzTU müəllimlərinin təsdiqlədiyi bütün 33 rəsmi mühazirə, dərslik və laboratoriya vəsaiti
                Cloudflare R2 buludunda saxlanılır və saniyənin onda birində açılır.
              </p>
            </div>
          </div>

          {/* Linear Issue Table */}
          <div className="linear-feature-window">
            <div className="feature-window-header">
              <div className="cycle-header-left">
                <span className="cycle-name">Cloudflare R2 Akademik Repozitoriyası (33 Fayl)</span>
              </div>
              <div className="cycle-header-right">
                <span className="cycle-progress-text">Bütün Fənlər Təsdiqlənib</span>
              </div>
            </div>

            <div className="vault-table-wrapper">
              <div className="vault-table-header">
                <span className="col-code">KOD</span>
                <span className="col-name">VƏSAİTİN ADI</span>
                <span className="col-author">MÜƏLLİM</span>
                <span className="col-size">HƏCM</span>
                <span className="col-action">ƏMƏLİYYAT</span>
              </div>

              <div className="vault-table-rows">
                {VAULT_MATERIALS.map((m) => (
                  <div key={m.id} className="vault-row">
                    <span className="col-code">{m.code}</span>
                    <div className="col-name-box">
                      <FileText size={14} className="file-icon" />
                      <span className="file-title">{m.name}</span>
                    </div>
                    <span className="col-author">{m.author}</span>
                    <span className="col-size">{m.size}</span>
                    <div className="col-action">
                      <button
                        type="button"
                        onClick={() => handleDownloadVault(m.name)}
                        className="vault-open-btn"
                        title="Vəsaiti aç"
                      >
                        <Download size={12} />
                        <span>Aç</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {downloadToast && (
              <div className="vault-toast-msg">{downloadToast}</div>
            )}
          </div>
        </div>
      </section>

      {/* 7. LINEAR PRE-FOOTER CALLOUT */}
      <section className="linear-prefooter-section">
        <div className="container">
          <div className="linear-prefooter-card">
            <h2 className="prefooter-title">AzTU 6326A2 üçün quruldu. Bu gün daxil olun.</h2>
            <p className="prefooter-desc">
              30 nəfərlik qrup kvotası, Cloudflare R2 sinxronizasiyası və rəsmi AzTU
              müəllimlərinin təsdiqlədiyi vahid iş sahəsi.
            </p>
            <div className="prefooter-actions">
              <a href="#workspace" className="btn-pill-white">
                <span>İş Sahəsinə Keç</span>
                <ArrowRight size={13} />
              </a>
              <a href="/login" className="btn-link-ghost">
                <span>Hesaba Daxil Ol →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
