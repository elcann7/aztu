import type { Material, Deadline } from '../services/db';

const PHYSICS_PDF_BASE = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/physics';

// ============================================================================
// KOICA LMS (lms.aztu.edu.az / api-lms.aztu.edu.az) RƏSMİ MATERİALLARI VƏ QAYDALAR
// Qrup: 6326A2 · 2026 Payız Semestri
// Müəllimlərin rəsmi PPTX / DOCX / PDF faylları oxunaraq çıxarılmış qaydalar
// ============================================================================
export const BUILT_IN_MATERIALS: Material[] = [
  // ==========================================================================
  // 1. FİZİKA (LMS ID: 5038 · 6326a2_if-20403y_fizika) — 11 Rəsmi Material
  // Müəllim: Dos. Sürəyya Məmmədova
  // ==========================================================================
  {
    id: 'koica_phys_3824',
    title: 'Mühazirə-1: İrəliləmə və fırlanma hərəkətinin dinamikası (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #3824 · Orijinal fayl: YENİ-qr.6326 a1,a2-1-İRƏLİLƏMƏ və FIRLANMA HƏRƏKƏTİ..pptx (33 slaydın universitet səviyyəli vektorial/diferensial qaydaları və R2 PDF-i)',
    fileName: 'koica-muh1-dinamika.pdf',
    fileSize: '3.6 MB · PDF + Ali Fizika Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh1-dinamika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:03.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Kinematikanın Vektorial-Diferensial Aparatı və Əyrilxətli Hərəkət (Slayd 2–7)',
        body: 'Maddi nöqtənin fəzada vəziyyəti r(t) = x(t)i + y(t)j + z(t)k radius-vektoru ilə təyin olunur. Ani sürət vektoru radius-vektorun zamana görə birinci tərtib törəməsi olub trayektoriyaya toxunan istiqamətdə yönəlir. Tam təcil vektoru toxunan (tangensial — sürətin modulca dəyişməsini xarakterizə edən) və normal (mərkəzəqaçma — sürətin istiqamətcə dəyişməsini xarakterizə edən) toplananların həndəsi cəmidir.',
        formulaOrCode:
          'v(t) = dr/dt = (dx/dt)i + (dy/dt)j + (dz/dt)k,   ds = |v(t)|dt\na(t) = dv/dt = d²r/dt² = a_τ · τ + a_n · n\na_τ = dv/dt,   a_n = v² / R,   |a| = √(a_τ² + a_n²)\nFırlanma kinematikası: ω = dφ/dt,  ε = dω/dt = d²φ/dt²,  v = [ω × r],  a_τ = ε·R,  a_n = ω²·R',
      },
      {
        heading: '2. İnersial Sistemlər, Qaliley Çevirmələri və Nyuton Dinamikasının Diferensial Tənlikləri (Slayd 8–14)',
        body: 'Klassik mexanikada zaman mütləqdir (t = t′). V₀ sabit sürəti ilə hərəkət edən K′ sisteminə keçid Qaliley çevirmələri ilə verilir: r = r′ + V₀t, v = v′ + V₀, a = a′. Nyutonun II qanununun ümumi diferensial forması impulsun (p = mv) zamana görə törəməsi ilə ifadə olunur (dəyişən kütləli hərəkətdə Meşerski tənliyinə gətirir). Qapalı sistemdə (ΣF_xarici = 0) Kütlə Mərkəzi (r_c = Σm_i r_i / Σm_i) sabit sürətlə hərəkət edir və sistemin tam impulsu saxlanılır.',
        formulaOrCode:
          'p = m·v,   dp/dt = F_yekun   ⇒   m·(d²r/dt²) = Σ F_i   (m = const olduqda)\n∫(t₁..t₂) F(t) dt = p₂ - p₁ = Δp   (Qüvvə impulsu teoremi)\nΣ F_xarici = 0  ⇒  P = Σ m_i·v_i = const   (İmpulsun saxlanması qanunu)',
      },
      {
        heading: '3. Konservativ Sahələr, Qüvvənin İşi, Potensial Enerji və Qradient Əlaqəsi (Slayd 15–22)',
        body: 'Dəyişən F(r) qüvvəsinin əyrilxətli L yolu üzrə gördüyü iş xətti inteqralla hesablanır. Qapalı kontur üzrə işi sıfır olan (∮ F·dr = 0) qüvvələr konservativ (potensial) qüvvələr adlanır. Konservativ sahədə qüvvə vektoru potensial enerjinin əks işarəli qradientinə bərabərdir. Yalnız konservativ qüvvələr təsir etdikdə tam mexaniki enerji E = E_k + E_p sabit qalır.',
        formulaOrCode:
          'dA = F · dr = F_s ds,   A₁₂ = ∫(L) F · dr = E_k2 - E_k1   (Kinetik enerji teoremi)\nF = -grad(E_p) = -(∂E_p/∂x · i + ∂E_p/∂y · j + ∂E_p/∂z · k)\nElastik deformasiya: σ = F/S = E_Yunq · (Δl/l),   E_p(elastik) = ∫ kx dx = k·x² / 2\nMərkəzi qravitasiya sahəsi: E_p(r) = -G·M·m / r',
      },
      {
        heading: '4. Bərk Cismin Fırlanma Dinamikası, Ətalət Momenti İnteqralı və Şteyner Teoremi (Slayd 23–33)',
        body: 'Maddi nöqtənin O nöqtəsinə nəzərən impuls momenti L = [r × p], qüvvə momenti isə M = [r × F] vektorial hasili ilə təyin edilir. Bərk cismin fırlanma oxuna nəzərən ətalət momenti kütlə paylanmasından asılı olan inteqral kəmiyyətdir. Kütlə mərkəzindən keçən oxa paralel və ondan d məsafədə yerləşən ixtiyari oxa nəzərən ətalət momenti Hüygens–Şteyner teoremi ilə tapılır.',
        formulaOrCode:
          'M = [r × F],   L = [r × p],   dL/dt = M_xarici\nI_z = Σ m_i·r_i² = ∫ r² dm,   M_z = I_z · ε = I_z · (d²φ/dt²)\nHüygens–Şteyner teoremi: I = I_c + m · d²\nXüsusi hallar: Halqa/Nazik silindr: I = mR² ; Bütöv disk/silindr: I = (1/2)mR² ; Kürə: I = (2/5)mR² ; Çubuq (mərkəzdən): I = (1/12)ml²\nYekun kinetik enerji (diyirlənmə): E_k = m·v_c² / 2 + I_c·ω² / 2',
      },
    ],
  },
  {
    id: 'koica_phys_3825',
    title: 'Mühazirə-2: Molekulyar Fizika və Termodinamikanın əsasları (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #3825 · Orijinal fayl: YENİ-qr.6326a1,a2 - 2-Molekulyar Fizika və Termodinamikanın əsasları.pptx (29 slaydın statistik fizika və termodinamika qaydaları və R2 PDF-i)',
    fileName: 'koica-muh2-termodinamika.pdf',
    fileSize: '1.9 MB · PDF + Ali Fizika Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh2-termodinamika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:49.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Statistik Fizika: Maksvell və Bolsman Paylanma Funksiyaları, Barometrik Düstur (Slayd 2–12)',
        body: 'Termodinamik tarazlıqda olan ideal qaz molekullarının sürətlərinin modullarına görə paylanması Maksvell funksiyası f(v) ilə, xarici potensial sahədə koordinata görə paylanması isə Bolsman paylanması ilə təsvir olunur. Maksvell paylanmasının ekstremum və inteqral momentlərindən üç xarakterik sürət alınır.',
        formulaOrCode:
          'MKN əsas tənliyi: p = (1/3) n m₀ <v²> = (2/3) n <ε_ir> = n k T,   pV = (m/M)RT\nMaksvell paylanması: dN(v) = 4π N (m₀ / (2πkT))^(3/2) · v² · exp(-m₀v² / (2kT)) dv\nv_eht = √(2RT/M)  <  <v> = √(8RT/(πM))  <  v_kv = √(3RT/M)\nBarometrik düstur: p(h) = p₀ · exp(-Mgh / (RT)) ⇒ n(E_p) = n₀ · exp(-E_p / (kT))',
      },
      {
        heading: '2. Enerjinin Sərbəstlik Dərəcələrinə Görə Bərabər Paylanması (Bolsman Teoremi) və Mayer Düsturu (Slayd 13–18)',
        body: 'Klassik statistik fizikada istilik tarazlığında olan sistemin hər bir irəliləmə və fırlanma sərbəstlik dərəcəsinə orta hesabla (1/2)kT, hər bir rəqsi sərbəstlik dərəcəsinə isə 2×(1/2)kT = kT enerji düşür. Sərt molekul üçün i = i_ir + i_fır (biratomlu: i=3, ikiatomlu: i=5, çoxatomlu qeyri-xətti: i=6). Daxili enerji hal funksiyasıdır (tam diferensialdır: ∮ dU = 0).',
        formulaOrCode:
          'U = (i/2) · (m/M) · R · T,   dU = ν · C_V · dT\nC_V = (∂U/∂T)_V = (i/2)R,   C_P = C_V + R = ((i+2)/2)R   (Mayer tənliyi)\nAdiabat göstəricisi (Puasson əmsalı): γ = C_P / C_V = (i + 2) / i',
      },
      {
        heading: '3. Termodinamikanın I Qanununun Diferensial Forması, İzoproseslər və Puasson Tənliyi (Slayd 19–23)',
        body: 'δQ elementar istilik miqdarı və δA = p dV elementar işi prosesdən asılı olduğu halda (tam diferensial deyil), dU tam diferensialdır. Adiabatik prosesdə (δQ = 0) C_V dT + p dV = 0 diferensial tənliyinin inteqrallanmasından Puasson tənliyi çıxarılır.',
        formulaOrCode:
          'δQ = dU + δA = ν C_V dT + p dV\n• İzoxor (V=const): δA = 0,  Q = ΔU = (i/2)νRΔT\n• İzobar (p=const): A = p(V₂ - V₁) = νRΔT,  Q = ((i+2)/2)νRΔT\n• İzotermik (T=const): dU = 0,  Q = A = ∫(V₁..V₂) (νRT/V) dV = νRT · ln(V₂/V₁)\n• Adiabatik (δQ=0): p·V^γ = const,  T·V^(γ-1) = const,  A = -ΔU = (p₁V₁ - p₂V₂) / (γ - 1)',
      },
      {
        heading: '4. Dairəvi Proseslər (Karno Tsikli), Termodinamikanın II Qanunu və Entropiya (Slayd 24–29)',
        body: 'İki izoterm və iki adiabatdan ibarət dönən Karno tsiklinin FİƏ-si yalnız qızdırıcı (T₁) və soyuducunun (T₂) mütləq temperaturlarından asılıdır. Entropiya (S) sistemin hal funksiyasıdır; Klauzius bərabərsizliyinə görə təcrid olunmuş sistemdə öz-özünə gedən dönməyən proseslərdə entropiya artır (dS ≥ 0) və Bolsman düsturu ilə termodinamik ehtimalla (W) əlaqələnir.',
        formulaOrCode:
          'η = (Q₁ - Q₂) / Q₁ = 1 - Q₂/Q₁,   η_Karno = 1 - T₂ / T₁\nEntropiyanın diferensialı: dS ≥ δQ / T,   ΔS₁₂ = ∫(1→2) δQ_dönən / T\nBolsman entropiya düsturu: S = k · ln(W)',
      },
    ],
  },
  {
    id: 'koica_phys_3826',
    title: 'Mühazirə-3: Elektrostatika (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3826 · Orijinal fayl: YENİ-qr.6326a1,a2-3--ELEKTROSTATİKA.pptx (40 slaydın universitet səviyyəli vektorial/inteqral qaydaları və R2 PDF-i)',
    fileName: 'koica-muh3-elektrostatika.pdf',
    fileSize: '5.0 MB · PDF + Ali Fizika Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh3-elektrostatika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:30:56.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Kulon Qanununun Vektorial Forması, Yük Sıxlıqları və Superpozisiya Prinsipi (Slayd 2–12)',
        body: 'Elektrostatik sahənin intensivliyi E(r) superpozisiya prinsipinə tabe olur. Kəsilməz paylanmış yüklər üçün sahə intensivliyi xətti (λ = dq/dl), səthi (σ = dq/dS) və ya həcmi (ρ = dq/dV) yük sıxlığı üzrə inteqrallamaqla tapılır. Elektrik dipolu (p_e = q·l) xarici sahədə M = [p_e × E] fırladıcı momentə məruz qalır.',
        formulaOrCode:
          'F₁₂ = (1 / (4πε₀ε)) · (q₁q₂ / r³) · r,   ε₀ = 8.85×10⁻¹² F/m\nE = F / q₀ = ∫ (1 / (4πε₀ε)) · (dq / r³) · r\nDipol momenti: p_e = q · l,   M = [p_e × E],   W_p = -(p_e · E)',
      },
      {
        heading: '2. Ostroqradski–Qauss Teoremi və Xüsusi Simmetrik Sahələrin Hesablanması (Slayd 13–23)',
        body: 'Vakuumda və dielektrik mühitdə elektrostatik sahə üçün Qauss teoremi Maksvellin birinci tənliyinin inteqral (∮ D·dS = Σq_sərbəst) və diferensial (div D = ρ) formalarını verir. Polyarizasiya vektoru P ilə elektrik sürüşmə vektoru D = ε₀E + P = ε₀εE kimi əlaqələnir.',
        formulaOrCode:
          'Φ_E = ∮(S) E · dS = (1 / ε₀) Σ q_i,   div E = ρ / ε₀\n• Sonsuz müstəvi (σ): E = σ / (2ε₀ε) ; İki əks yüklü lövhə arası: E = σ / (ε₀ε)\n• Sonsuz yüklü tel/silindr (λ): E(r) = λ / (2πε₀ε·r)\n• Yüklü kürə səthi (R): r < R üçün E = 0 ; r ≥ R üçün E = q / (4πε₀ε·r²)',
      },
      {
        heading: '3. Elektrostatik Sahənin Potensiallığı, Sirkulyasiya Teoremi və E = -grad(φ) (Slayd 24–32)',
        body: 'Elektrostatik sahədə intensivlik vektorunun istənilən qapalı kontur üzrə sirkulyasiyası sıfıra bərabərdir (∮ E·dl = 0 ⇔ rot E = 0). Buradan sahənin potensial xarakterli olması və intensivliklə potensial arasındakı qradient əlaqəsi çıxır.',
        formulaOrCode:
          '∮(L) E · dl = 0,   φ₁ - φ₂ = ∫(1→2) E · dl\nE = -grad(φ) = -(∂φ/∂x · i + ∂φ/∂y · j + ∂φ/∂z · k)\nNöqtəvi yük sisteminin potensialı: φ = Σ (1 / (4πε₀ε)) · (q_i / r_i)',
      },
      {
        heading: '4. Elektrik Tutumu, Kondensatorlar və Elektrostatik Sahənin Həcmi Enerji Sıxlığı (Slayd 33–40)',
        body: 'Təklənmiş naqilin tutumu C = q/φ, kürə üçün C = 4πε₀εR-dir. Kondensatorların ardıcıl və paralel birləşməsi, həmçinin fəzada paylanmış elektrostatik sahənin tam enerjisi W və həcmi enerji sıxlığı w_e = dW/dV düsturları:',
        formulaOrCode:
          'C_müstəvi = ε₀εS / d,   C_kürəvi = 4πε₀ε R₁R₂ / (R₂ - R₁),   C_silindrik = 2πε₀εl / ln(R₂/R₁)\nW = q²/(2C) = C·U²/2 = q·U/2\nElektrostatik sahənin enerji sıxlığı: w_e = dW/dV = (1/2) ε₀ε E² = (E · D) / 2',
      },
    ],
  },
  {
    id: 'koica_phys_3827',
    title: 'Mühazirə-4: Sabit elektrik cərəyanı (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3827 · Orijinal fayl: YENİ-qr.6326 a1,a2 -4--SABİT ELEKTRİK CƏRƏYANI.pptx (31 slaydın diferensial Om/Coul-Lens qanunları, klassik elektron nəzəriyyəsi və R2 PDF-i)',
    fileName: 'koica-muh4-sabit-cereyan.pdf',
    fileSize: '4.3 MB · PDF + Ali Fizika Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh4-sabit-cereyan.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:31:45.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Cərəyan Şiddəti, Cərəyan Sıxlığı Vektoru və Kənar Qüvvələr (Slayd 2–12)',
        body: 'İxtiyari S səthindən keçən cərəyan şiddəti j cərəyan sıxlığı vektorunun həmin səthdən keçən selinə bərabərdir. Qapalı dövrədə stasionar cərəyanın davam etməsi üçün qeyri-elektrostatik təbiətli kənar qüvvələr (E_kən) təsir etməlidir.',
        formulaOrCode:
          'I = dq/dt = ∫(S) j · dS,   j = n · e · <v_nizamlı>\nEHQ: ε₁₂ = ∫(1→2) E_kən · dl,   Gərginlik: U₁₂ = φ₁ - φ₂ + ε₁₂',
      },
      {
        heading: '2. Om və Coul–Lens Qanunlarının İnteqral və Diferensial Formaları (Slayd 13–22)',
        body: 'Diferensial formada Om qanunu naqilin verilmiş nöqtəsindəki cərəyan sıxlığı vektorunu həmin nöqtədəki yekun sahə intensivliyi ilə əlaqələndirir (γ = 1/ρ — xüsusi elektrik keçiriciliyidir). Coul–Lens qanununun diferensial forması vahid zamanda vahid həcmdə ayrılan istilik gücünü (w_ist) təyin edir.',
        formulaOrCode:
          'İnteqral Om qanunu: I = U/R (bircins hissə),  I = (φ₁ - φ₂ + ε₁₂)/R_tam (qeyri-bircins hissə),  I = ε/(R + r)\nDiferensial Om qanunu: j = γ · (E + E_kən) = (1/ρ) · (E + E_kən)\nDiferensial Coul–Lens qanunu: w_ist = dP/dV = j · E = γ · E² = ρ · j²',
      },
      {
        heading: '3. Budaqlanmış Dövrələr üçün Kirxhof Qaydaları və Klassik Elektron Nəzəriyyəsi (Drude–Lorens) (Slayd 23–31)',
        body: 'Kirxhofun I qaydası yükün saxlanması qanunundan, II qaydası isə elektrostatik sahənin potensiallığından çıxır. Drude–Lorens klassik elektron nəzəriyyəsi sərbəst elektronların kristal qəfəs ionları ilə toqquşmasını nəzərə alaraq Om və Coul–Lens qanunlarını mikroskopik olaraq çıxarır, lakin metalların istilik tutumu və ifratkeçiricilik hadisələrini yalnız kvant nəzəriyyəsi izah edir.',
        formulaOrCode:
          'Kirxhofun I qaydası (düyün): Σ I_k = 0\nKirxhofun II qaydası (kontur): Σ (I_k · R_k) = Σ ε_k\nDrude–Lorens düsturu: γ = (n · e² · <λ>) / (2 · m_e · <u_istilik>)',
      },
    ],
  },
  {
    id: 'koica_phys_muh5_8',
    title: 'Mühazirə 5–8: Elektromaqnetizm, Rəqslər, Dalğa Optikası, Kvant və Nüvə Fizikası (Ali Fizika Konspekti)',
    courseId: 'phys',
    type: 'file',
    description:
      'Semestrin II yarısı və Yekun İmtahan Mövzuları · Bio–Savar–Laplas, Maksvell tənlikləri, Sönən rəqslərin diferensial tənliyi, İnterferensiya/Difraksiya, Şrödinger tənliyi və Atom/Nüvə fizikası (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    fileSize: '0.1 MB · PDF + Ali Fizika Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-20T12:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Mühazirə 5: Bio–Savar–Laplas, Tam Cərəyan Qanunu, Elektromaqnit İnduksiyası və Rəqslər',
        body: 'İstənilən konfiqurasiyalı cərəyanlı naqilin yaratdığı maqnit induksiyası Bio–Savar–Laplas qanununun vektorial inteqrallanması ilə tapılır. Sərbəst harmonik və müqavimətli mühitdəki (və ya RLC konturundakı) sönən rəqslər ikitərtibli bircins xətti diferensial tənliklərlə təsvir olunur.',
        formulaOrCode:
          'dB = (μ₀μ / 4π) · [I dl × r] / r³,   ∮(L) B · dl = μ₀μ Σ I_k,   ∮(S) B · dS = 0\nFaradey–Maksvell: ε_i = -dΦ/dt,   W_maq = L·I²/2,   w_m = B² / (2μ₀μ)\nHarmonik rəqs: d²x/dt² + ω₀²x = 0  (yaylı: ω₀ = √(k/m), riyazi: ω₀ = √(g/l), fiziki: ω₀ = √(mgd/I), Tomson: ω₀ = 1/√(LC))\nSönən rəqs: d²x/dt² + 2β(dx/dt) + ω₀²x = 0 ⇒ x(t) = A₀ e^(-βt) cos(ωt + φ₀),  ω = √(ω₀² - β²),  λ = β·T',
      },
      {
        heading: 'Mühazirə 6: Dalğa Optikası — İnterferensiya, Nyuton Halqaları, Difraksiya və Polyarizasiya',
        body: 'Koherent elektromaqnit dalğalarının toplanması zamanı intensivlik paylanması optik yollar fərqi Δ = n₂L₂ - n₁L₁ (fazalar fərqi δ = 2πΔ/λ) ilə müəyyən olunur. Hüygens–Frenel prinsipinə əsaslanan Frenel zonaları və Fraunhoffer difraksiyası, həmçinin təbii işığın polyarlaşması (Malyus və Brüster qanunları):',
        formulaOrCode:
          'I = I₁ + I₂ + 2√(I₁I₂) cos(δ),   δ = (2π/λ)·Δ\nMaksimum: Δ = ±m·λ ;   Minimum: Δ = ±(2m + 1)·(λ/2)\nNyuton halqaları (əks olunan işıqda): r_m(qaranlıq) = √(m·λ·R),   r_m(işıqlı) = √((m - 1/2)·λ·R)\nDifraksiya qəfəsi: d · sin(φ) = ±m · λ  |  Malyus: I = I₀ cos²α  |  Brüster: tg(i_B) = n₂₁',
      },
      {
        heading: 'Mühazirə 7: Kvant Optikasının Qanunları, De-Broyl Dalğaları və Şrödinger Tənliyi',
        body: 'Mütləq qara cismin şüalanması (Stefan–Bolsman, Vin və Plank düsturları), xarici fotoeffekt üçün Eynşteyn tənliyi, Kompton səpilməsi, mikrozərrəciklərin korpuskul-dalğa dualizmi (De-Broyl hipotezi), Heyzenberqin qeyri-müəyyənlik münasibətləri və kvant mexanikasının əsas tənliyi — Şrödinger tənliyi:',
        formulaOrCode:
          'Stefan–Bolsman: R_e = σ·T⁴ ;   Vin: λ_max · T = b ;   Plank: ε = h·ν = ℏ·ω\nFotoeffekt: h·ν = A_çıxış + m·v_max²/2 = A_çıxış + e·U_s\nKompton effekti: Δλ = λ′ - λ = (h / (m₀c))·(1 - cos θ) = 2 Λ_C sin²(θ/2)\nDe-Broyl: λ = h / p ;   Heyzenberq: Δx·Δp_x ≥ ℏ/2,  ΔE·Δt ≥ ℏ/2\nStasionar Şrödinger tənliyi: -(ℏ² / (2m)) ∇²ψ + U(r)ψ = Eψ',
      },
      {
        heading: 'Mühazirə 8: Bor Postulatları, Hidrogen Spektri və Atom Nüvəsi Fizikası',
        body: 'Borun kvantlanma qaydasına (L_n = mvr_n = nℏ) əsasən hidrogenəbənzər atomlarda enerji səviyyələri diskretdir. Atom nüvəsinin kütlə defekti Δm, xüsusi rabitə enerjisi və eksponensial radioaktiv parçalanma qanunu:',
        formulaOrCode:
          'Bor-Ridberq düsturu: 1/λ = R · (1/n² - 1/m²),   E_n = -13.6 eV / n²\nKütlə defekti və rabitə enerjisi: Δm = Z·m_p + (A - Z)·m_n - M_nüvə,   E_rab = Δm · c² (≈ Δm · 931.5 MeV)\nRadioaktiv parçalanma: dN/dt = -λN  ⇒  N(t) = N₀ · e^(-λt),   T_(1/2) = ln(2) / λ,   A(t) = λ·N(t)',
      },
    ],
  },
  {
    id: 'koica_phys_4798',
    title: 'Lab N 1. Diskin və həlqənin ətalət momentinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Cari Laboratoriya · KOICA LMS #4798 · Orijinal fayl: DİSKİN ƏTALƏT MOMENTİNİN TƏYİNİ.docx (Rəsmi KOICA PDF + Tam Çıxarılış)',
    fileName: 'koica-lab1-disk-etalet.pdf',
    fileSize: '0.4 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab1-disk-etalet.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:27:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №1: Nəzəri Çıxarılış və Təcrübi Hesablama Düsturları',
        body: 'Fırlanma hərəkəti sensoruna bərkidilmiş r radiuslu şkivə sarınmış ipin ucundan m kütləli yük asılır. Nyutonun II qanununa görə m·g - T = m·a, fırlanma dinamikasının əsas tənliyinə görə isə M = T·r = I·α. Burada a = α·r əlaqəsini nəzərə aldıqda T = m(g - αr) və təcrübi ətalət momenti düsturu çıxarılır. Alınan təcrübi qiymət həndəsi ölçülərdən tapılan nəzəri inteqral qiymətlə müqayisə olunur.',
        formulaOrCode:
          'Dinamika tənlikləri: m·g - T = m·(α·r)  və  T·r = I·α\nTəcrübi ətalət momenti:  I_təcrübi = m · r · (g - r·α) / α\nDiskin nəzəri ətalət momenti:   I_disk = ∫(0..R) r² dm = (1/2) · M_disk · R²\nHəlqənin nəzəri ətalət momenti: I_həlqə = (1/2) · M_həlqə · (R₁² + R₂²)',
      },
    ],
  },
  {
    id: 'koica_phys_4799',
    title: 'Lab. N 2. “Qazların molyar istilik tutumları nisbətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4799 · Orijinal fayl: QAZIN İSTİLİK TUTUMLARI.docx (Rəsmi KOICA PDF + Adiabatik Rəqs Çıxarılışı)',
    fileName: 'koica-lab2-qaz-istilik.pdf',
    fileSize: '0.5 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab2-qaz-istilik.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:28:39.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №2: Puasson Tənliyinin Diferensiallanması və Adiabat Göstəricisi (γ)',
        body: 'Silindrik boruda m kütləli porşen tarazlıq vəziyyətindən kiçik x qədər sürüşdürüldükdə qaz adiabatik sıxılır: P·V^γ = const. Hər iki tərəfi diferensialladıqda dP·V^γ + γ·P·V^(γ-1)dV = 0 ⇒ dP = -γ(P/V)S·x. Qaytarıcı qüvvə F = S·dP = -(γPS²/V)x şəklində olduğundan porşen ω = 2π/T = √(γPS²/(mV)) tezliyi ilə harmonik rəqs edir.',
        formulaOrCode:
          'P·V^γ = const  ⇒  F_qaytarıcı = -(γ · P · S² / V) · x\nRəqs periodu: T = 2π · √(m·V / (γ·P·S²))\nİşçi hesablama düsturu: γ = C_P / C_V = (4·π² · m · V) / (S² · P · T²)   (Hava üçün γ_nəzəri = 7/5 = 1.40)',
      },
    ],
  },
  {
    id: 'koica_phys_4801',
    title: 'Lab. N3. “Naqillərin xüsusi müqavimətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4801 · Orijinal fayl: NİXROM MƏFTİLİN XÜSUSİ.docx (Rəsmi KOICA PDF + Qaydalar)',
    fileName: 'koica-lab3-nixrom-muqavimet.pdf',
    fileSize: '0.2 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab3-nixrom-muqavimet.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:29:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №3: Om Qanunu, Xüsusi Müqavimət və Xəta Hesablaması',
        body: 'Silindrik nixrom naqilin müqaviməti R = ρ·l/S və en kəsiyi sahəsi S = πd²/4 ifadələrindən xüsusi elektrik müqaviməti ρ təyin edilir.',
        formulaOrCode:
          'S = π·d² / 4,   R = U / I\nρ = R · S / l = (π · d² · U) / (4 · l · I)\nNisbi xəta: ε_ρ = ΔU/U + ΔI/I + Δl/l + 2·(Δd/d)',
      },
    ],
  },
  {
    id: 'koica_phys_4802',
    title: 'Lab №4. Yerin maqnit sahəsinin induksiyasının üfüqi, şaquli toplananlarının və tam qiymətinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4802 · Orijinal fayl: YERİN MAQNİT SAHƏSİNİN İNDUKSİYASININ ÜFÜQİ,.docx (Rəsmi KOICA PDF + Qaydalar)',
    fileName: 'koica-lab4-yer-maqnit.pdf',
    fileSize: '0.4 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab4-yer-maqnit.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:32:33.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №4: Maqnit Meyl Bucağı və İnduksiya Vektorunun Dekart Toplananları',
        body: 'Yerin maqnit sahəsinin tam induksiya vektoru B_tam üfüqi müstəvi ilə θ maqnit meyl bucağı əmələ gətirir. fırlanma sensoru və maqnit sahəsi datçiki ilə üfüqi və şaquli proyeksiyalar ölçülür.',
        formulaOrCode:
          'B_üfüqi = B_tam · cos(θ),   B_şaquli = B_tam · sin(θ)\nθ = arccos(B_üfüqi / B_tam),   B_tam = √(B_üfüqi² + B_şaquli²)',
      },
    ],
  },
  {
    id: 'koica_phys_4804',
    title: 'Lab№5 Sönən elektromaqnit rəqslərinin öyrənilməsi.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4804 · Orijinal fayl: RƏQS KONTURUNDA SÖNƏN ELEKTROMAQNİT RƏQSLƏRİNİN tədqiqi.docx (Rəsmi KOICA PDF + Qaydalar)',
    fileName: 'koica-lab5-sonen-reqsler.pdf',
    fileSize: '0.6 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab5-sonen-reqsler.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:33:46.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №5: RLC Konturunun Diferensial Tənliyi, Loqarifmik Dekrement və Keyfiyyətlilik',
        body: 'Ardıcıl RLC konturunda yükün dəyişməsi d²q/dt² + (R/L)(dq/dt) + (1/LC)q = 0 diferensial tənliyi ilə təsvir olunur. Sönmə əmsalı β = R/(2L), məxsusi tezlik ω₀ = 1/√(LC). Böhran müqavimətində (β = ω₀) rəqs aperiodik boşalmaya keçir.',
        formulaOrCode:
          'd²q/dt² + 2β(dq/dt) + ω₀²q = 0,   β = R / (2L),   ω = √(1/(LC) - R²/(4L²))\nLoqarifmik dekrement: δ = β·T = (1/n) · ln(U_k / U_{k+n})\nKonturun keyfiyyətliliyi: Q = π / δ = (1/R)·√(L/C)  |  Böhran müqaviməti: R_böh = 2·√(L/C)',
      },
    ],
  },
  {
    id: 'koica_phys_4805',
    title: 'Lab. N6. İşığın interferensiyası. Nyuton halqaları vasitəsilə işığın dalğa uzunluğunun təyini',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4805 · Orijinal fayl: İşıgın interferensiyası.Nyuton halqaları vasitəsilə işıgın dalfa uzunlugunun təyini..docx (Rəsmi KOICA PDF + Qaydalar)',
    fileName: 'koica-lab6-nyuton-halqalari.pdf',
    fileSize: '0.7 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab6-nyuton-halqalari.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:39:10.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №6: Bərabər Qalınlıqlı İnterferensiya Zolaqları və Nyuton Halqalarının Çıxarılışı',
        body: 'Əyrilik radiusu R olan linza ilə müstəvi şüşə lövhə arasındakı hava qatının r məsafəsindəki qalınlığı d ≈ r²/(2R)-dir. Optik sıxlığı böyük olan mühitdən əks olunma zamanı yarımdalğa itkisi (λ/2) yarandığından optik yollar fərqi Δ = 2d + λ/2 = r²/R + λ/2 olur.',
        formulaOrCode:
          'Optik yollar fərqi: Δ = 2d + λ/2 = r²/R + λ/2\nMinimum (qaranlıq halqalar): Δ = (2k + 1)λ/2  ⇒  r_k = √(k · λ · R)\nİşığın dalğa uzunluğu: λ = (r_m² - r_k²) / ((m - k) · R) = (D_m² - D_k²) / (4(m - k)R)',
      },
    ],
  },
  {
    id: 'koica_phys_4806',
    title: 'Lab. N8. Atom spektrinin öyrənilməsi',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4806 · Orijinal fayl: ATOM SPEKTİRLƏRİNİN OYRƏNİLMƏSİ.docx (Rəsmi KOICA PDF + Qaydalar)',
    fileName: 'koica-lab8-atom-spektri.pdf',
    fileSize: '0.9 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab8-atom-spektri.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:40:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №8: Borun Kvant Postulatları, Balmer Seriyası və Ridberq Sabiti',
        body: 'Hidrogen atomunun görünən oblastdakı xətti spektrində Balmer seriyası (m = 3, 4, 5, 6 səviyyələrindən n = 2 səviyyəsinə kvant keçidləri: H_α, H_β, H_γ, H_δ) monoxromator-spektrometrlə tədqiq olunur, Ridberq sabiti və Plank sabiti təyin edilir.',
        formulaOrCode:
          'Borun tezliklər qaydası: h·ν = E_m - E_n\nÜmumiləşmiş Balmer–Ridberq düsturu: 1/λ = R · (1/n² - 1/m²)   (Balmer seriyası üçün n = 2, m = 3, 4, 5...)\nRidberq sabiti: R = 4·m² / (λ · (m² - 4)) ≈ 1.097 × 10⁷ m⁻¹',
      },
    ],
  },

  // ==========================================================================
  // 2. PROQRAMLAŞDIRMANIN ƏSASLARI-1 (LMS ID: 5041 · 6326a2_if-61125y) — 14 Rəsmi PDF Material
  // Müəllim: Dos. Fizuli Əzimov (Cloudflare R2 PDF + Slaydlardan çıxarılmış qaydalar)
  // ==========================================================================
  {
    id: 'koica_prog_6677',
    title: 'Əsas dərslik — F.M.Əzimov: Pythonda proqramlaşdırmanın əsasları',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #6677 · Orijinal fayl: F.M.Əzimov Pythonda proqramlaşdırmanın əsasları.pdf · Bütün semestr üzrə əsas dərslik',
    fileName: 'prog-derslik-ezimov.pdf',
    fileSize: '2.2 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/prog-derslik-ezimov.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-22T23:04:50.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Dərsliyin struktur icmalı və Python-un fundamental qaydaları',
        body: 'Dos. Fizuli Əzimovun müəllifi olduğu bu dərslik AzTU-da “Proqramlaşdırmanın əsasları-1” fənninin bütün 15 mühazirəsini (M-1 .. M-15) əhatə edir. Python-da kod blokları fiqurlu mötərizə ilə deyil, 4 boşluq (indentation) ilə ayrılır. Dəyişənlərin tipi əvvəlcədən elan olunmur (dinamik tipizasiya) və ilk mənimsəmə zamanı avtomatik müəyyən edilir.',
        formulaOrCode:
          '# Python-da əsas verilənlər tipləri:\nx = 15              # int (tam ədəd)\ny = 3.14            # float (həqiqi ədəd)\nz = complex(3, 5)   # complex (3+5j)\ns = "AzTU 6326A2"   # str (dəyişməz sətir)\nb = True            # bool (məntiqi tip)\narr = [1, 2, 3]     # list (dəyişdirilə bilən siyahı)\ntup = (1, 2, 3)     # tuple (dəyişməz kortej)\nst = {1, 2, 3}      # set (təkrarsız çoxluq)\nd = {"qrup": 6326}  # dict (açar:qiymət lüğəti)',
      },
      {
        heading: '1–2-ci həftələrdə keçilən bölmələr (I Kollokvium təməli)',
        body: 'Hazırkı həftələr üzrə M-1 (Proqramlaşdırmaya giriş, alqoritm, kompilyator vs interpretator, IDLE rejimləri) və M-2,3 (Ədədi və məntiqi tiplər, 7 hesab əməli, mürəkkəb mənimsəmə, standart riyazi funksiyalar, say sistemləri və bit əməliyyatları) keçirilir. Aşağıdakı M-1 .. M-15 materiallarında həm qaydalar, həm də R2-dəki PDF təqdimatlar birbaşa saytın içində açılır.',
      },
    ],
  },
  {
    id: 'koica_prog_8403',
    title: 'M-1. Proqramlaşdırmaya giriş. Alqoritm anlayışı. Python proqramlaşdırma dili ilə tanışlıq.',
    courseId: 'prog',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #8403 · Orijinal fayl: M1.pptx (21 slaydın tam qaydaları və PDF-i)',
    fileName: 'm1.pdf',
    fileSize: '1.6 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m1.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:10:46.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Proqramlaşdırma dillərinin 4 mərhələli təkamülü (Slayd 4–6)',
        body: '1) Maşın kodları (ikilik 0 və 1-lər — prosessor birbaşa başa düşür, lakin yazılması və sazlanması çox çətindir). 2) Assembler dili (maşın komandalarının simvolik mnemonikaları — konkret prosessor arxitekturasından asılıdır). 3) Yüksək səviyyəli dillər (Fortran, Cobol, Pascal, Basic, C — kompüterin tipindən asılı deyil, translyator tələb edir). 4) Obyekt-yönümlü və müasir dillər (C++, Java, C#, Python).',
      },
      {
        heading: 'Qayda 2: Kompilyator və İnterpretator arasındakı fərq (Slayd 6)',
        body: 'Yüksək səviyyəli dildə yazılmış proqramı maşın koduna çevirən proqramlar translyator adlanır və 2 yerə bölünür:\n• Kompilyator (C, C++, Pascal): proqramın mətnini bütövlükdə oxuyub maşın koduna çevirir və müstəqil icra olunan fayl (.exe) yaradır.\n• İnterpretator (Python, PHP, Perl): proqramı sətir-sətir (komanda-komanda) oxuyub dərhal icra edir.',
      },
      {
        heading: 'Qayda 3: Python dilinin yaranma tarixi və 11 üstünlüyü (Slayd 3, 7–9)',
        body: 'Python 1990-cı illərin əvvəlində Niderlandın CWI institutunda Qvido van Rossum (Guido van Rossum) tərəfindən yaradılıb (ABC, Modula-3, C/C++ və Unix shell təsiri ilə) və adını “Monty Python’s Flying Circus” şousundan alıb.\nƏsas üstünlükləri: 1) Sadə və aydın sintaksis; 2) Yüksək oxunaqlılıq; 3) Avtomatik yaddaş idarəetməsi; 4) Dinamik tipizasiya; 5) Çoxпараdiqmalı (obyekt-yönümlü, struktur, funksional); 6) Zəngin standart kitabxana; 7) Krossplatformalıq (Windows, Linux, macOS, Android); 8) Veb (Django), Elm, Süni İntellekt və Oyun sahələrində tətbiq; 9) C/C++ ilə inteqrasiya; 10) Pulsuz və açıq mənbəli (Open Source); 11) İnteraktiv rejim dəstəyi.',
      },
      {
        heading: 'Qayda 4: Python IDLE mühitinin 2 iş rejimi (Slayd 13–20)',
        body: '1) İnteraktiv (Komanda) rejimi: ekranda >>> dəvəti görünür. Daxil edilən hər komanda və ya hesab ifadəsi Enter basılan kimi dərhal hesablanır.\n2) Proqram (Redaktor) rejimi: IDLE-də File -> New (Ctrl+N) seçilir, çoxsətirli proqram yazılıb .py genişlənməsi ilə yadda saxlanılır (Ctrl+S) və F5 (Run -> Run Module) ilə icra edilir.',
        formulaOrCode:
          '>>> 2 + 3 * 2\n8\n>>> (2 + 3) * 2\n10\n>>> print("Salam, Dünya!")\nSalam, Dünya!',
      },
      {
        heading: 'Mühazirə 1 — Özünü Yoxlama Sualları (Slayd 21)',
        body: '1. Hansı proqramlaşdırma dillərini tanıyırsınız?\n2. Yüksək səviyyəli dillərin maşın kodlarından və assemblerlərdən üstünlüyü nədir?\n3. Kompilyator və interpretator bir-birindən nə ilə fərqlənir?\n4. Python dilinin əsas üstünlükləri hansılardır?\n5. İnteraktiv rejim proqram rejimindən nə ilə fərqlənir?',
      },
    ],
  },
  {
    id: 'koica_prog_8404',
    title: 'M-2,3. Ədədi və məntiqi tipli verilənlər və onlar üzərində əməllər. Məntiqi operatorlar. Ədədi tipli verilənlər üçün riyazi funksiyalar.',
    courseId: 'prog',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #8404 · Orijinal fayl: M2-3.pptx (26 slaydın tam qaydaları və PDF-i)',
    fileName: 'm2-3.pdf',
    fileSize: '2.1 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m2-3.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:12:32.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Ədədi tiplər — Tam (int), Həqiqi (float) və Kompleks (complex) (Slayd 3–7, 15)',
        body: '• Tam ədədlər (int): kəsr hissəsi olmayan müsbət, mənfi ədədlər və sıfır.\n• Həqiqi ədədlər (float): kəsr hissəsi nöqtə (.) ilə ayrılır. Sabit nöqtəli (78.23) və ya sürüşkən nöqtəli eksponensial formada (1.2e3 = 1200.0, 1.2e-3 = 0.0012) yazılır.\n• Kompleks ədədlər (complex): z = complex(a, b) şəklində (a + bj) verilir; z.real həqiqi hissəni, z.imag xəyali hissəni, z.conjugate() isə qoşma kompleks ədədi (a - bj) qaytarır.',
        formulaOrCode:
          '>>> 1.2e3, 1.2e-3\n(1200.0, 0.0012)\n>>> z = complex(3, 5)   # (3+5j)\n>>> z.real, z.imag, z.conjugate()\n(3.0, 5.0, (3-5j))',
      },
      {
        heading: 'Qayda 2: Ədədlər üzərində 7 riyazi əməl və Mürəkkəb mənimsəmə (Slayd 8–10)',
        body: 'Adi bölmə (/) həmişə float qaytarır. Tam bölmə (//) bölmədən alınan tam hissəni (aşağı yuvarlaqlaşdırma ilə), % isə bölmədən alınan qalığı qaytarır. Mənfi ədədlərin tam bölünməsinə və qalığına xüsusi diqqət yetirin!',
        formulaOrCode:
          '# 7 Əsas Hesab Əməli:\nx + y   # Toplama\nx - y   # Çıxma\nx * y   # Vurma\nx / y   # Bölmə (7 / 2 -> 3.5)\nx ** y  # Qüvvətə yüksəltmə (2 ** 3 -> 8)\nx // y  # Tam hissə: 7 // 2 -> 3;  -7 // 2 -> -4\nx % y   # Qalıq:     10 % 3 -> 1;  -9 % 4 -> 3;  9 % -4 -> -3\n\n# Mürəkkəb mənimsəmə operatorları:\nx += y;  x -= y;  x *= y;  x /= y;  x %= y;  x **= y;  x //= y',
      },
      {
        heading: 'Qayda 3: Standart riyazi funksiyalar və Say sistemləri (Slayd 11–14)',
        body: 'Standart funksiyalar heç bir modul qoşulmadan birbaşa işləyir: abs(x), round(x[,n]), divmod(x,y) -> (x//y, x%y), pow(a,n[,b]) -> (a**n)%b, max(), min(), sum(). Say sistemləri üçün: bin(x) -> 0b..., oct(x) -> 0o..., hex(x) -> 0x... və int(s, əsas) istifadə olunur.',
        formulaOrCode:
          '>>> divmod(10, 3)\n(3, 1)\n>>> pow(2, 4, 3)   # (2**4) % 3 = 16 % 3\n1\n>>> round(2.567, 2)\n2.57\n>>> bin(19), oct(19), hex(19)\n(\'0b10011\', \'0o23\', \'0x13\')\n>>> int(\'10011\', 2), int(\'0x13\', 16)\n(19, 19)',
      },
      {
        heading: 'Qayda 4: Məntiqi tip (bool), Müqayisə və Məntiqi operatorlar (Slayd 16–20)',
        body: 'bool tipi yalnız True (1) və False (0) qiymətləri alır. Müqayisə operatorları: <, <=, >, >=, == (bərabərdir), != (fərqlidir). Məntiqi operatorlar: and (konyunksiya — hər ikisi True olduqda True), or (dizyunksiya — ən azı biri True olduqda True), not (inkar — unar operator). Prioritet: not -> and -> or.',
        formulaOrCode:
          '>>> a, b = True, False\n>>> a and b, a or b, not a\n(False, True, False)\n>>> bool(0), bool(""), bool([]), bool(None)   # Yalan (False) olanlar\n(False, False, False, False)\n>>> bool(5), bool(-1), bool("0")              # Doğru (True) olanlar\n(True, True, True)',
      },
      {
        heading: 'Qayda 5: Bit əməliyyatları (Slayd 21–25)',
        body: 'Tam ədədlərin ikilik bitləri üzərində işləyir: ~x (bitin inkarı: -(x+1)), x & y (bitlər üzrə VƏ), x | y (bitlər üzrə VƏ YA), x ^ y (bitlər üzrə istisnalı VƏ YA — XOR), x << k (k bit sola sürüşdürmə = x * 2^k), x >> k (k bit sağa sürüşdürmə = x // 2^k).',
        formulaOrCode:
          '>>> ~19          # -(19 + 1)\n-20\n>>> 19 & 11      # 10011 & 01011 = 00011\n3\n>>> 19 | 11      # 10011 | 01011 = 11011\n27\n>>> 19 ^ 11      # 10011 ^ 01011 = 11000\n24\n>>> 11 << 2      # 11 * (2**2) = 44\n44\n>>> 51 >> 2      # 51 // (2**2) = 12\n12',
      },
      {
        heading: 'Mühazirə 2–3 — Özünü Yoxlama Sualları (Slayd 26)',
        body: '1. Tam və həqiqi ədədlər necə təsvir olunur?\n2. Mənfi ədədlərin tam bölünməsi (//) və bölünmədən alınan qalıq (%) necə yerinə yetirilir?\n3. Ədədi tiplər üzərində hansı standart funksiyalardan istifadə olunur?\n4. Məntiqi tip hansı qiymətlər alır və hansı məntiqi əməllər var?\n5. Say sistemləri ilə işləmək üçün hansı funksiyalar var?\n6. Hansı bit əməliyyatları var və necə yerinə yetirilir?',
      },
    ],
  },
  {
    id: 'koica_prog_8405',
    title: 'M4. Sətir tipli verilənlər və onlar üzərində əməllər. Sətirlər üçün funksiya və metodlar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8405 · Orijinal fayl: M4.pptx (27 slaydın tam qaydaları və PDF-i)',
    fileName: 'm4.pdf',
    fileSize: '2.4 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m4.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:13:32.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Sətir (str) Yaddaş Modeli (Immutability), Unicode Kodlaşdırması və İndeksləmə (Slayd 2–7)',
        body: 'Python 3-də sətirlər (str) Unicode (UTF-8) simvollar ardıcıllığıdır və dəyişməz (immutable) obyektlərdir: yaddaşda yaradılmış sətir obyektinin ayrı-ayrı ünvanlarına mənimsəmə (s[i] = "x") TypeError istisnası yaradır; hər bir modifikasiya yeni yaddaş ünvanında yeni str obyekti ayırır. Simvolların kod cədvəlindəki mövqeyi ord(c) → int və chr(kod) → str funksiyaları ilə çevrilir.',
        formulaOrCode:
          's = "AzTU_6326a2"\nlen(s)                # 11 (O(1) mürəkkəbliklə uzunluq)\ns[0], s[-1]           # (\'A\', \'2\') — düz (0..n-1) və tərs (-1..-n) indeksləmə\nord("A"), chr(65)     # (65, \'A\')\n"Az" + "TU", "Hi"*3   # ("AzTU", "HiHiHi")',
      },
      {
        heading: '2. Kəsiklər (Slicing Algebra — S[start:stop:step]) və Yaddaş Köçürməsi (Slayd 8–10)',
        body: 'S[X:Y:Z] kəsik operatoru [X, Y) yarımintervalında Z addımı ilə yeni alt-sətir qaytarır. İndekslər sərhədi aşdıqda IndexError vermir, mövcud sərhədlə kəsilir. Z < 0 olduqda iterasiya sağdan sola aparılır.',
        formulaOrCode:
          's = "Proqramlaşdırma"\ns[0:7]      # "Proqram" (indeks 0..6)\ns[::2]      # "Pormadr" (cüt indeksli simvollar)\ns[::-1]     # "amrıdşalmarqorP" (sətrin O(n) zamanla inversiyası)',
      },
      {
        heading: '3. Alt-sətir Axtarışı, Leksikoqrafik Müqayisə və Bütün Sətir Metodları (Slayd 11–27)',
        body: 'Sətirlərin müqayisəsi (==, <, >) simvolların Unicode kodlarına görə leksikoqrafik aparılır.\n• Axtarış və Sayma: s.find(sub[, start[, end]]), s.rfind(sub) (tapılmasa -1); s.index(sub), s.rindex(sub) (tapılmasa ValueError); s.count(sub).\n• Parçalama və Birləşdirmə: s.split([sep[, maxsplit]]), s.rsplit(), s.splitlines(), sep.join(iterable), s.partition(sep), s.rpartition(sep).\n• Registr və Formatlama: s.upper(), s.lower(), s.capitalize(), s.title(), s.swapcase(), s.strip([chars]), s.lstrip(), s.rstrip(), s.center(w[, fill]), s.ljust(w), s.rjust(w), s.zfill(w), s.replace(old, new[, count]).\n• Predikat (bool) metodları: s.isdigit(), s.isalpha(), s.isalnum(), s.islower(), s.isupper(), s.istitle(), s.isspace(), s.startswith(prefix), s.endswith(suffix).',
        formulaOrCode:
          's = "  aztu kompüter mühəndisliyi  "\nclean = s.strip().title()              # "Aztu Kompüter Mühəndisliyi"\nsözlər = clean.split()                 # ["Aztu", "Kompüter", "Mühəndisliyi"]\nprint(" | ".join(sözlər))              # "Aztu | Kompüter | Mühəndisliyi"\nprint("abrakadabra".replace("a", "A", 2))  # "AbrAkadabra"',
      },
    ],
  },
  {
    id: 'koica_prog_8407',
    title: 'M-5,6. Siyahılar(list), kortejlər(tuple) və onlar üçün funksiya və metodlar. Lüğətlər(dict), çoxluqlar(set) və onlar üçün funksiya və metodlar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8407 · Orijinal fayl: M5-6.pptx (26 slaydın dinamik massiv, heş-cədvəl qaydaları və PDF-i)',
    fileName: 'm5-6.pdf',
    fileSize: '2.0 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m5-6.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:16:58.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Dinamik Massivlər — Siyahılar (list), Yaddaş İstinadları və List Comprehension (Slayd 2–13)',
        body: 'CPython-da list obyektlərə göstəricilərdən (pointers) ibarət dinamik massivdir (mutable). İndeksə görə müraciət A[i] və sona əlavə append(x) amortizasiya olunmuş O(1), araya əlavə insert(i, x) və silmə pop(i) / remove(x) isə elementlərin sürüşdürülməsi səbəbindən O(n), Timsort alqoritmi ilə sort() isə O(n log n) zaman mürəkkəbliyinə malikdir. Diqqət: B = A yeni siyahı yaratmır (eyni yaddaş ünvanına istinad edir); müstəqil surət üçün A.copy() və ya A[:] istifadə edilməlidir.',
        formulaOrCode:
          'A = [i**2 for i in range(1, 11) if i % 2 == 0]   # [4, 16, 36, 64, 100]\nA.append(144);  A.extend([196, 256]);  A.insert(0, 0)\nx = A.pop(2)          # 2-ci indeksdəki elementi silir və qaytarır\nA.remove(144)         # İlk rast gəlinən 144 qiymətini silir\nA.sort(reverse=True)  # Yerindəcə (in-place) azalan sıra ilə çeşidləyir\nB = sorted(A)         # A-nı dəyişmədən yeni çeşidlənmiş siyahı qaytarır',
      },
      {
        heading: '2. Kortejlər (tuple) və Heş-Cədvəl Əsaslı Çoxluqlar (set, frozenset) (Slayd 14–21)',
        body: '• Kortej (tuple): dəyişməz (immutable) ardıcıllıqdır. Sabit ölçülü olduğu üçün list-dən daha az yaddaş tutur və heşlənə bildiyi (hashable) üçün dict açarı və ya set elementi ola bilir. Tək elementli kortejdə vergül zəruridir: t = (5,).\n• Çoxluq (set): heş-cədvəl (hash table) üzərində qurulmuş unikal və nizamsız elementlər kolleksiyasıdır. Elementin axtarışı (x in S) orta hesabla O(1) vaxt aparır. Metodları: add(x), remove(x) (yoxdursa KeyError), discard(x) (yoxdursa xəta vermir), pop(), clear(), union (|), intersection (&), difference (-), symmetric_difference (^), issubset (<=), issuperset (>=).',
        formulaOrCode:
          'A = {1, 2, 3, 4};   B = {3, 4, 5, 6}\nprint(A | B)   # Birləşmə: {1, 2, 3, 4, 5, 6}\nprint(A & B)   # Kəsişmə:  {3, 4}\nprint(A - B)   # Fərq:     {1, 2}\nprint(A ^ B)   # Simmetrik fərq: {1, 2, 5, 6}',
      },
      {
        heading: '3. Assosiativ Massivlər — Lüğətlər (dict) və Metodları (Slayd 22–26)',
        body: 'Lüğət (dict) {açar: qiymət} cütlərini saxlayan heş-cədvəldir (O(1) axtarış və mənimsəmə). Açarlar mütləq dəyişməz (immutable / hashable: int, float, str, tuple) olmalıdır. Əsas metodları: d.get(key[, default]), d.setdefault(key[, default]), d.keys(), d.values(), d.items(), d.pop(key[, default]), d.popitem(), d.update(other), dict.fromkeys(seq[, val]).',
        formulaOrCode:
          'telebe = {"ad": "Elcan", "qrup": "6326a2", "bal": 98}\nfor acar, qiymet in telebe.items():\n    print(f"{acar}: {qiymet}")\nkv_dict = {x: x**3 for x in range(1, 5)}   # {1: 1, 2: 8, 3: 27, 4: 64}',
      },
    ],
  },
  {
    id: 'koica_prog_8408',
    title: 'M-7. Tarix-zaman tipli verilənlər. Verilənlərin tiplərinin çevrilməsi.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8408 · Orijinal fayl: M7.pptx (28 slaydın tam qaydaları və PDF-i)',
    fileName: 'm7.pdf',
    fileSize: '1.9 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m7.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:17:34.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. datetime, time və calendar Modulları, Format Kodları (strftime / strptime) (Slayd 2–20)',
        body: 'datetime modulu tarix və zamanın idarə olunması üçün 4 əsas sinif təqdim edir: date(year, month, day), time(hour, minute, second, microsecond), datetime(...) və iki tarix arasındakı fərqi ifadə edən timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0). Həftənin günü weekday() (Bazar ertəsi = 0 .. Bazar = 6) və ya isoweekday() (1..7) ilə tapılır.\nƏsas format direktivləri: %Y (4 rəqəmli il), %y (2 rəqəmli il), %m (ay: 01..12), %d (gün: 01..31), %H (saat: 00..23), %I (saat: 01..12), %M (dəqiqə), %S (saniyə), %A (həftənin tam adı), %B (ayın tam adı).',
        formulaOrCode:
          'from datetime import date, time, datetime, timedelta\nindi = datetime.now()\ngelecek = indi + timedelta(days=14, hours=3)\nformatli = indi.strftime("%d.%m.%Y %H:%M:%S")\nkechmish = datetime.strptime("15.09.2026", "%d.%m.%Y")\nferq = (indi - kechmish).days   # keçən günlərin tam sayı',
      },
      {
        heading: '2. Qeyri-aşkar (Implicit) və Açıq (Explicit) Tip Çevrilmələri, Tip Yoxlaması (Slayd 21–28)',
        body: '• Qeyri-aşkar çevrilmə (Coercion): qarışıq tipli riyazi ifadələrdə interpretator məlumat itkisinin qarşısını almaq üçün dar tipi geniş tipə çevirir (bool → int → float → complex).\n• Açıq çevrilmə (Casting): konstruktor funksiyaları vasitəsilə aparılır: int(x[, base]), float(x), complex(re[, im]), str(x), bool(x), list(iterable), tuple(iterable), set(iterable), dict(mapping).\n• Tipin identifikasiyası: type(x) obyektin birbaşa sinfini, isinstance(x, (tip1, tip2)) isə irsiyyəti də nəzərə alaraq tipə mənsubiyyəti (True/False) yoxlayır.',
        formulaOrCode:
          'x = int("10110", 2)              # 22 (ikilik say sistemindən onluğa)\ny = float("3.14159")             # 3.14159\nisinstance(True, int)            # True (Python-da bool sinfi int-dən törəyib!)\ntype(3.5) is float               # True',
      },
    ],
  },
  {
    id: 'koica_prog_8410',
    title: 'M-8. Mənimsəmə və şərh komandaları. Giriş-çıxış komandaları. Mövqeli formatlaşdırma üsulları.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8410 · Orijinal fayl: M8.pptx (23 slaydın tam qaydaları və PDF-i)',
    fileName: 'm8.pdf',
    fileSize: '1.6 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m8.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:19:25.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mənimsəmə Mexanizmi, Kortej Açılışı (Unpacking) və Giriş-Çıxış Axınları (Slayd 2–14)',
        body: 'Python-da dəyişən yaddaş qutusu deyil, obyektə bağlanmış addır (reference binding). id(x) funksiyası obyektin operativ yaddaşdakı ünvanını qaytarır.\n• Kaskad mənimsəmə: a = b = c = 0.\n• Pozision və ulduzlu açılış (Unpacking): a, b = b, a (kortej vasitəsilə əlavə dəyişənsiz yerdəyişmə); ilk, *orta, son = [1, 2, 3, 4, 5].\n• Standart giriş-çıxış: input([prompt]) standart giriş axınından (stdin) sətri oxuyub sondakı \\n simvolunu ataraq str qaytarır. print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False) obyektləri sətirə çevirib çıxış axınına yazır.',
        formulaOrCode:
          'a, b, c = map(int, input("3 tam ədəd: ").split())\nilk, *orta, son = [10, 20, 30, 40, 50]   # ilk=10, orta=[20, 30, 40], son=50\nprint(ilk, son, sep=" <=> ", end="\\n")',
      },
      {
        heading: '2. Formatlaşdırılmış Çıxış: %-Operatoru, str.format() və f-Sətirlər (Slayd 15–23)',
        body: 'Format spesifikasiyası: {[indeks/ad]:[doldurucu][düzləndirmə < > ^][işarə + -][en][,/.dəqiqlik][tip]}.\n• Tiplər: d (onluq tam), b (ikilik), o (səkkizlik), x/X (onaltılıq), f (sabit nöqtəli həqiqi), e/E (eksponensial), g (ümumi), % (faiz), s (sətir).',
        formulaOrCode:
          'x = 12345.6789\nprint("Qiymət: %10.2f AZN" % x)           # "Qiymət:   12345.68 AZN"\nprint("Qiymət: {:>12,.2f}".format(x))     # "Qiymət:    12,345.68"\nprint(f"İkilik: {42:08b}, Hex: {42:#x}")  # "İkilik: 00101010, Hex: 0x2a"',
      },
    ],
  },
  {
    id: 'koica_prog_8412',
    title: 'M-9. Şərt komandası.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8412 · Orijinal fayl: M9.pptx (14 slaydın tam qaydaları və PDF-i)',
    fileName: 'm9.pdf',
    fileSize: '0.9 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m9.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:20:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Budaqlanma Alqoritmləri (if / elif / else), Qısa-Qapanma (Short-Circuit) və Ternar İfadə (Slayd 2–14)',
        body: '• Tam və natamam budaqlanma: if şərt1: blok1 elif şərt2: blok2 ... else: blokN. İlk doğru (True) olan şərtin bloku icra olunur və qalan elif/else budaqları yoxlanılmır.\n• Məntiqi operatorlarda qısa-qapanma (short-circuit evaluation): A and B ifadəsində A yalandırsa, B hesablanmır; A or B ifadəsində A doğrudursa, B hesablanmır. Zəncirvari müqayisələr (a < x <= b) eyni zamanda a < x and x <= b kimi hesablanır.\n• Ternar şərt ifadəsi: Y_doğru if Şərt else Z_yalan.',
        formulaOrCode:
          '# Kvadrat tənliyin (ax² + bx + c = 0) həqiqi köklərinin təhlili:\nimport math\na, b, c = map(float, input("a b c: ").split())\nd = b**2 - 4*a*c\nif d > 0:\n    x1 = (-b - math.sqrt(d)) / (2*a)\n    x2 = (-b + math.sqrt(d)) / (2*a)\n    print(f"İki fərqli həqiqi kök: x1={x1:.3f}, x2={x2:.3f}")\nelif d == 0:\n    print(f"İki bərabər kök: x = {-b / (2*a):.3f}")\nelse:\n    print("Həqiqi kök yoxdur (kompleks köklər).")',
      },
    ],
  },
  {
    id: 'koica_prog_8413',
    title: 'M-10. Pythonda istisnaların işlənilməsi.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8413 · Orijinal fayl: M10.pptx (13 slaydın tam qaydaları və PDF-i)',
    fileName: 'm10.pdf',
    fileSize: '0.9 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m10.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:21:35.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. İstisnalar İyerarxiyası (BaseException → Exception), try / except / else / finally və raise (Slayd 2–13)',
        body: 'Sintaksis xətalarından (SyntaxError — translyasiya mərhələsində tutulur) fərqli olaraq istisnalar (Exceptions) proqramın icrası zamanı (runtime) yaranır:\n• Əsas standart istisnalar: ZeroDivisionError, ValueError, TypeError, IndexError, KeyError, NameError, AttributeError, FileNotFoundError, OverflowError.\n• Tam konstruksiya: try (təhlükəli kod) → except <Tip> as e (xəta baş verdikdə) → else (heç bir xəta baş vermədikdə) → finally (xəta olub-olmamasından və hətta return-dən asılı olmayaraq mütləq icra olunan təmizləmə bloku).\n• Proqramçı tərəfindən süni istisna yaratmaq üçün raise ValueError("Mesaj") və ya assert şərt, "Mesaj" işlədilir.',
        formulaOrCode:
          'def bolme(a: float, b: float) -> float:\n    if b == 0:\n        raise ZeroDivisionError("Məxrəc sıfır ola bilməz!")\n    return a / b\n\ntry:\n    x = float(input("Surət: "))\n    y = float(input("Məxrəc: "))\n    qismet = bolme(x, y)\nexcept ValueError as err:\n    print("Tip çevirmə xətası:", err)\nexcept ZeroDivisionError as err:\n    print("Riyazi xəta:", err)\nelse:\n    print(f"Cavab: {qismet:.4f}")\nfinally:\n    print("Resurslar azad edildi.")',
      },
    ],
  },
  {
    id: 'koica_prog_8416',
    title: 'M-11. Pythonda FOR dövr operatoru. Range funksiyası',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8416 · Orijinal fayl: M11.pptx (14 slaydın tam qaydaları və PDF-i)',
    fileName: 'm11.pdf',
    fileSize: '1.0 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m11.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:22:59.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. İterator Protokolu, range(start, stop, step), enumerate() və zip() ilə Dövr Təşkili (Slayd 2–14)',
        body: 'Python-da for dövrü ixtiyari iterable (siyahı, sətir, kortej, çoxluq, lüğət, fayl və ya range obyekti) üzərində iterasiya aparır. range(start, stop, step) bütün ədədləri yaddaşda saxlamır, O(1) yaddaşla tənbəl (lazy) hesablayır.\n• break: dövrü vaxtından əvvəl dayandırır (bu halda dövrün else bloku İCRA OLUNMUR).\n• continue: cari iterasiyanın qalan komandalarını ötürüb növbəti addıma keçir.\n• İç-içə dövrlərdə (məs. n×m matris emalı) zaman mürəkkəbliyi O(n·m) tərtibindədir.',
        formulaOrCode:
          '# Sadə ədədin yoxlanması (for ... else konstruksiyası ilə):\nn = int(input("n = "))\nfor d in range(2, int(n**0.5) + 1):\n    if n % d == 0:\n        print(f"{n} mürəkkəb ədəddir (böləni: {d})")\n        break\nelse:\n    print(f"{n} sadə ədəddir!" if n > 1 else "1 nə sadə, nə mürəkkəbdir")',
      },
    ],
  },
  {
    id: 'koica_prog_8418',
    title: 'M-12. Pythonda WHILE dövr operatoru.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8418 · Orijinal fayl: M12.pptx (12 slaydın tam qaydaları və PDF-i)',
    fileName: 'm12.pdf',
    fileSize: '0.7 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m12.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:40:24.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Önşərtli Dövr (while), Dövr İnvariantı, Evklid ƏBOB Alqoritmi və Rəqəm Analizi (Slayd 2–12)',
        body: 'İterasiya sayı əvvəlcədən məlum olmadıqda (məsələn, xəta ε həddinə çatana qədər sıranın cəmlənməsi, ədədin mərtəbələrinə ayrılması və ya Evklid alqoritmi) while şərt: dövründən istifadə olunur. Dövrün sonlu olması üçün hər iterasiyada variant kəmiyyəti ciddi azalmalı və ya terminasiya şərtinə yaxınlaşmalıdır.',
        formulaOrCode:
          '# 1) Evklid alqoritmi ilə ƏBOB(a, b) tapılması — O(log(min(a,b))):\na, b = 1071, 462\nwhile b != 0:\n    a, b = b, a % b\nprint("ƏBOB =", a)   # 21\n\n# 2) Tam ədədin tərsinə çevrilməsi və rəqəmləri cəmi:\nn = int(input("Ədəd: "))\nters, cem = 0, 0\nwhile n > 0:\n    reqem = n % 10\n    cem += reqem\n    ters = ters * 10 + reqem\n    n //= 10',
      },
    ],
  },
  {
    id: 'koica_prog_8419',
    title: 'M-13. Pythonda proseduralar və funksiyalar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8419 · Orijinal fayl: M13.pptx (16 slaydın tam qaydaları və PDF-i)',
    fileName: 'm13.pdf',
    fileSize: '1.1 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m13.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:41:50.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Altproqramlar (def), Parametr Ötürmə Mexanizmi, LEGB Görünmə Sahəsi və Rekursiya (Slayd 2–16)',
        body: '• Formal və faktiki parametrlər: pozision arqumentlər, açar sözlü (keyword) arqumentlər, susmaya görə (default) qiymətlər, *args (dəyişən sayda pozision arqumentləri tuple kimi yığır) və **kwargs (açar sözlü arqumentləri dict kimi yığır).\n• Görünmə sahəsi (LEGB qaydası): Local → Enclosing → Global → Built-in. Qlobal dəyişəni funksiya daxilində dəyişmək üçün global, əhatə edən funksiyanın dəyişənini dəyişmək üçün nonlocal açar sözü yazılır.\n• Rekursiya və Yüksək tərtibli funksiyalar: bazis şərti (base case) və rekursiv addım; lambda x: ifadə anonim funksiyaları və map(), filter(), reduce() ilə funksional proqramlaşdırma.',
        formulaOrCode:
          'def statistika(*ededler, yuvarlaq=2):\n    if not ededler:\n        return 0.0, 0.0\n    cem = sum(ededler)\n    orta = round(cem / len(ededler), yuvarlaq)\n    return cem, orta   # tuple şəklində 2 qiymət qaytarır\n\n# Yüksək tərtibli funksiyalar və lambda:\narr = [1, 2, 3, 4, 5, 6]\ncut_kvadratlar = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, arr)))  # [4, 16, 36]',
      },
    ],
  },
  {
    id: 'koica_prog_8420',
    title: 'M-14. Pythonda modullar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8420 · Orijinal fayl: M14.pptx (25 slaydın tam qaydaları və PDF-i)',
    fileName: 'm14.pdf',
    fileSize: '1.7 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m14.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:43:20.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Modul Arxitekturası, Ad Fəzası (__name__ == "__main__") və Standart Kitabxana (Slayd 2–25)',
        body: 'Hər bir .py faylı müstəqil ad fəzasına (namespace) malik moduldur. Fayl birbaşa icra edildikdə __name__ xüsusi dəyişəni "__main__", başqa fayldan import edildikdə isə modulun adına bərabər olur.\n• math modulu: sqrt(x), pow(x,y), exp(x), log(x[, base]), log10(x), sin(x), cos(x), tan(x), asin(x), degrees(x), radians(x), ceil(x), floor(x), trunc(x), factorial(n), gcd(a,b), pi, e.\n• random modulu: random() ∈ [0.0, 1.0), uniform(a,b), randint(a,b), randrange(start,stop,step), choice(seq), sample(seq, k), shuffle(list).\n• os, sys və platform modulları: os.getcwd(), os.listdir(), os.mkdir(), os.path.exists(), sys.argv, sys.path.',
        formulaOrCode:
          'import math\nimport random\n\nif __name__ == "__main__":\n    r = 5.0\n    sahe = math.pi * math.pow(r, 2)\n    secim = random.sample(range(1, 50), k=6)\n    print(f"Dairənin sahəsi: {sahe:.3f}, Təsadüfi 6 ədəd: {secim}")',
      },
    ],
  },
  {
    id: 'koica_prog_8421',
    title: 'M-15. Pythonda fayllara işlərin təşkili.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8421 · Orijinal fayl: M15.pptx (21 slaydın tam qaydaları və PDF-i)',
    fileName: 'm15.pdf',
    fileSize: '1.6 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m15.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:44:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Fayl Deskrıptorları, Kontekst Meneceri (with), Kursor İdarəetməsi (seek/tell) və JSON/EXE (Slayd 2–21)',
        body: '• Açılma rejimləri: "r" (oxuma), "w" (yenidən yazma), "a" (sona əlavə), "x" (eksklüziv yaratma), "r+" (oxuma və yazma), "b" (binary), "t" (mətn).\n• Oxuma/yazma metodları: f.read([size]), f.readline(), f.readlines(), f.write(str), f.writelines(seq), f.tell() (cari bayt mövqeyi), f.seek(offset[, whence]).\n• Strukturlaşdırılmış verilənlərin seriyalaşdırılması: json.dump(obj, f, ensure_ascii=False, indent=2) və json.load(f).\n• Müstəqil icra faylının (.exe) yaradılması: pip install pyinstaller → pyinstaller -F -w main.py.',
        formulaOrCode:
          'import json\n\ndata = {"qrup": "6326a2", "telebeler": ["Elcan"], "aktiv": True}\nwith open("qrup.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\nwith open("qrup.json", "r", encoding="utf-8") as f:\n    oxunan = json.load(f)\n    print(oxunan["qrup"])',
      },
    ],
  },

  // ==========================================================================
  // 3. XƏTTİ CƏBR VƏ ANALİTİK HƏNDƏSƏ (LMS ID: 5040 · 6326a2_if-61119y)
  // Müəllim: Sevda İsgəndərova / Dos. Rəna Əmirova (Cloudflare R2 PDF + Universitet Səviyyəli Qaydalar)
  // ==========================================================================
  {
    id: 'koica_alg_4234',
    title: 'Xətti cəbr (Mühazirə 1): Matris cəbri, növləri və matris əməliyyatları (Ali Riyaziyyat)',
    courseId: 'algebra',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #4234 · Orijinal fayl: dərs Müh1.pptx (21 slaydın tam qaydaları, AI nümunəsi və R2 PDF-i)',
    fileName: 'muhazire-01.pdf',
    fileSize: '4.5 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-01.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova / Rəna Əmirova',
    createdAt: '2026-09-18T14:08:38.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. K^(m×n) Matrislər Fəzası, Xüsusi Matrislər və Matrisin İzi (Trace) (Slayd 3–7)',
        body: 'P meydanı (ℝ və ya ℂ) üzərində m sətir və n sütundan ibarət A = (a_ij) cədvəli m×n ölçülü matris adlanır. m = n olduqda n-tərtibli kvadrat matris alınır. Baş diaqonal elementlərinin cəminə kvadrat matrisin izi deyilir: Tr(A) = Σ(i=1..n) a_ii.\n• Simmetrik matris: A^T = A (a_ij = a_ji). Çəp-simmetrik (antissimmetrik) matris: A^T = -A (a_ij = -a_ji, a_ii = 0). İxtiyari kvadrat matris simmetrik və çəp-simmetrik matrislərin yeganə cəmi şəklində göstərilir: A = (A + A^T)/2 + (A - A^T)/2.\n• Ortoqonal matris: Q^T · Q = Q · Q^T = E (Q⁻¹ = Q^T). İdempotent matris: A² = A. Nilpotent matris: A^k = O.',
        formulaOrCode:
          'A = (a_ij)_{m×n},   Tr(A) = a₁₁ + a₂₂ + ... + a_nn\nTr(αA + βB) = α·Tr(A) + β·Tr(B),   Tr(A·B) = Tr(B·A)\nSimmetrik ayrılış: A = S + K,   S = (A + A^T)/2 (simmetrik),   K = (A - A^T)/2 (çəp-simmetrik)',
      },
      {
        heading: '2. Xətti Əməllər və Matrislərin Vurulmasının Qeyri-Kommutativ Halqası (Slayd 8–18)',
        body: 'Eyni ölçülü matrislərin toplanması və skalyara vurulması m×n ölçülü xətti vektor fəzası əmələ gətirir. A_(m×n) və B_(n×p) matrislərinin C = A·B hasilində c_ij = Σ(k=1..n) a_ik b_kj (i-ci sətir ilə j-ci sütunun skalyar hasili). Matris vurulması assosiativ və distributivdir, lakin kommutativ DEYİL: AB - BA = [A, B] kommutatoru ümumi halda sıfırdan fərqlidir və sıfır bölənlər mövcuddur (A ≠ O, B ≠ O olduğu halda A·B = O ola bilər).',
        formulaOrCode:
          'c_ij = Σ(k=1..n) a_ik · b_kj,   (A · B) · C = A · (B · C)\n(A · B)^T = B^T · A^T,   (A₁ · A₂ · ... · A_k)^T = A_k^T · ... · A₂^T · A₁^T',
      },
      {
        heading: '3. Mühazirədən Tətbiq: Neyron Şəbəkə Qatında Xətti Reqressiya (Z = X·W + b) (Slayd 19–21)',
        body: '3 tələbənin 3 əlamətindən ibarət X_(3×3) obyekti-əlamət matrisi çəki vektoru W_(3×1) = [0.3, 0.4, 0.5]^T və sürüşmə vektoru b_(3×1) = [5, 5, 5]^T ilə vurularaq proqnoz vektoru Z hesablanır:',
        formulaOrCode:
          'X = [90 80 85; 70 60 75; 50 40 55],   W = [0.3; 0.4; 0.5],   b = [5; 5; 5]\nZ = X·W + b = [106.5; 87.5; 63.5]',
      },
    ],
  },
  {
    id: 'koica_alg_4236',
    title: 'Xətti cəbr müh2 (Mühazirə 2): n-Tərtibli Determinantlar, Permutasiyalar və Xassələr',
    courseId: 'algebra',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #4236 · Orijinal fayl: dərs Müh2.pptx (8 slaydın tam qaydaları, İqtisadiyyat, Kriptoqrafiya və R2 PDF-i)',
    fileName: 'muhazire-02.pdf',
    fileSize: '2.2 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-02.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova / Rəna Əmirova',
    createdAt: '2026-09-18T14:11:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Simmetrik Qrup (S_n), İnversiyalar, Transpozisiya və Determinantın Kombinator Tərifi (Slayd 1–3)',
        body: '{1, 2, ..., n} çoxluğunun bütün n! sayda biyektiv yerdəyişmələri (permutasiyaları) S_n simmetrik qrupunu təşkil edir. İki elementin yerini dəyişən hər bir transpozisiya inversiyalar sayının (inv(σ)) cütlüyünü (sgn(σ) = (-1)^inv(σ)) əksinə dəyişir. n-tərtibli kvadrat A matrisinin determinantı hər sətir və hər sütundan yalnız bir element götürməklə düzəldilmiş n! sayda həddin işarəli cəmidir.',
        formulaOrCode:
          'det(A) = Σ_{σ ∈ S_n} (-1)^{inv(σ)} · a_{1,σ(1)} · a_{2,σ(2)} · ... · a_{n,σ(n)}\n2-tərtibli: |a₁₁ a₁₂; a₂₁ a₂₂| = a₁₁a₂₂ - a₁₂a₂₁\n3-tərtibli (Sarrus): Δ = a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂ - a₁₃a₂₂a₃₁ - a₁₁a₂₃a₃₂ - a₁₂a₂₁a₃₃',
      },
      {
        heading: '2. Determinantın Çoxxətlilik, Çəp-Simmetriklik və Multiplikativlik (Bine–Koşi) Xassələri (Slayd 4–8)',
        body: '1) det(A^T) = det(A).\n2) Çəp-simmetriklik: İki sətrin (sütunun) yerdəyişməsi determinantın işarəsini dəyişir; iki bərabər və ya mütənasib sətri olan matrisin determinantı sıfırdır.\n3) Çoxxətlilik: Hər hansı sətir iki vektorun xətti kombinasiyasıdırsa, determinant uyğun determinantların xətti kombinasiyasına ayrılır. Buradan det(k·A) = k^n · det(A).\n4) Elementar çevirməyə nəzərən invariantlıq: Bir sətrə digər sətrin skalyara hasilini əlavə etdikdə determinant dəyişmir (Qauss üsulu ilə üçbucaq şəklə gətirmənin əsası).\n5) Multiplikativlik teoremi: det(A · B) = det(A) · det(B).',
        formulaOrCode:
          'det(A^T) = det(A)  |  det(k·A_{n×n}) = k^n · det(A)  |  det(A · B) = det(A) · det(B)\nÜçbucaq matris üçün: det(A) = a₁₁ · a₂₂ · ... · a_{nn}',
      },
    ],
  },
  {
    id: 'uni_alg_m3_m6',
    title: 'Xətti cəbr (Mühazirə 3–6): Minor, Cəbri Tamamlayıcı, Laplas Teoremi, Tərs Matris və Matrisin Ranqı',
    courseId: 'algebra',
    type: 'file',
    description:
      'I Kollokvium və Semestr Mövzuları (Mühazirə 3–6) · Laplasın ayrılış teoremi, Birləşmiş matris və A⁻¹, Matris tənlikləri (AX=B, XA=B), Xətti fəza və Matrisin ranqı (Cloudflare R2 PDF + Universitet Qaydaları)',
    fileName: 'muhazire-03-06-laplas-ters-matris-ranq.pdf',
    fileSize: '0.1 MB · PDF + Ali Cəbr Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-03-06-laplas-ters-matris-ranq.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova',
    createdAt: '2026-09-21T10:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mühazirə 3: Minorlar (M_ij), Cəbri Tamamlayıcılar (A_ij) və Laplas Teoremi',
        body: 'n-tərtibli A matrisində i-ci sətri və j-ci sütunu sildikdə qalan (n-1)-tərtibli determinant a_ij elementinin minoru (M_ij), A_ij = (-1)^(i+j)·M_ij isə onun cəbri tamamlayıcısı (kofaktoru) adlanır.\n• Laplas ayrılışı: Determinant hər hansı sətir (və ya sütun) elementlərinin öz cəbri tamamlayıcıları ilə hasilləri cəminə bərabərdir.\n• Yalançı ayrılış teoremi: Bir sətrin elementlərinin BAŞQA sətrin uyğun cəbri tamamlayıcıları ilə hasilləri cəmi həmişə sıfıra bərabərdir.',
        formulaOrCode:
          'A_ij = (-1)^(i+j) · M_ij\nΣ(j=1..n) a_ij · A_kj = δ_ik · det(A) = { det(A), əgər i = k ;  0, əgər i ≠ k }\nVandermond determinantı: V(x₁, ..., x_n) = Π(1 ≤ j < i ≤ n) (x_i - x_j)',
      },
      {
        heading: '2. Mühazirə 4: Qeyri-məxsusi Matrislər, Tərs Matris (A⁻¹) Teoremi və Matris Tənlikləri',
        body: 'Kvadrat A matrisinin tərs A⁻¹ matrisinin (A·A⁻¹ = A⁻¹·A = E) varlığı üçün zəruri və kafi şərt A-nın qeyri-məxsusi (cırlaşmayan: det(A) ≠ 0) olmasıdır. Bu halda A⁻¹ yeganədir və transponirə olunmuş cəbri tamamlayıcılar (birləşmiş / adjugate) matrisi vasitəsilə və ya Qauss–Jordan [A | E] → [E | A⁻¹] üsulu ilə tapılır.',
        formulaOrCode:
          'A⁻¹ = (1 / det(A)) · adj(A),   burada adj(A) = A* = (A_ji)^T,   det(A⁻¹) = 1 / det(A)\n(A · B)⁻¹ = B⁻¹ · A⁻¹,   (A^T)⁻¹ = (A⁻¹)^T\nMatris tənlikləri (det A ≠ 0, det B ≠ 0):\n1) A·X = B  ⇒  X = A⁻¹ · B\n2) X·A = B  ⇒  X = B · A⁻¹   (Diqqət: A⁻¹ sağdan vurulur!)\n3) A·X·B = C ⇒ X = A⁻¹ · C · B⁻¹',
      },
      {
        heading: '3. Mühazirə 5–6: Vektor Fəzası, Xətti Asılılıq, Matrisin Ranqı və Bazis Minoru Teoremi',
        body: 'A_(m×n) matrisinin sıfırdan fərqli ən yüksək tərtibli minorunun tərtibinə matrisin ranqı — r(A) = rank(A) deyilir (0 ≤ rank(A) ≤ min(m, n)).\n• Bazis minoru haqqında teorem: Matrisin ranqı r-dirsə, onun xətti müstəqil sətirlərinin (eləcə də xətti müstəqil sütunlarının) maksimal sayı r-ə bərabərdir. Bazis minoruna daxil olmayan hər bir sətir (sütun) bazis sətirlərinin (sütunlarının) xətti kombinasiyasıdır.\n• Elementar sətir/sütun çevirmələri matrisin ranqını dəyişmir (pilləvari şəkildə sıfırdan fərqli sətirlərin sayı ranqa bərabərdir).',
        formulaOrCode:
          'A ~ B (elementar çevirmələr)  ⇒  rank(A) = rank(B)\nrank(A^T) = rank(A),   rank(A + B) ≤ rank(A) + rank(B)\nSilvestr bərabərsizliyi: rank(A) + rank(B) - n ≤ rank(A·B) ≤ min(rank(A), rank(B))',
      },
    ],
  },
  {
    id: 'uni_alg_m7_m14',
    title: 'Xətti cəbr (Mühazirə 7–14): XCTS (Kramer, Qauss, Kroneker–Kapelli), Məxsusi Ədədlər və Analitik Həndəsə',
    courseId: 'algebra',
    type: 'file',
    description:
      'Semestr və İmtahan Mövzuları (Mühazirə 7–14) · Kroneker–Kapelli teoremi, Kramer və Qauss üsulları, Fundamental Həllər Sistemi (FHS), Məxsusi ədəd/vektorlar, Kvadratik formalar və Vektor/Analitik Həndəsə (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'muhazire-07-14-xcts-kramer-qauss-mexsusi.pdf',
    fileSize: '0.1 MB · PDF + Ali Cəbr Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-07-14-xcts-kramer-qauss-mexsusi.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova',
    createdAt: '2026-09-22T10:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mühazirə 7–8: Xətti Cəbri Tənliklər Sistemi (XCTS) — Kroneker–Kapelli, Kramer və Qauss Üsulları',
        body: 'm tənlikli və n məchullu A·X = B xətti sisteminin əmsallar matrisi A və genişlənmiş matrisi Ā = (A | B) üçün:\n• Kroneker–Kapelli Teoremi: Sistemin uyuşan (ən azı bir həllinin olması) üçün zəruri və kafi şərt əmsallar matrisinin ranqının genişlənmiş matrisin ranqına bərabər olmasıdır: rank(A) = rank(A | B) = r.\n1) Əgər rank(A) ≠ rank(A | B) olarsa, sistem uyuşmayandır (həlli yoxdur: ∅).\n2) Əgər rank(A) = rank(A | B) = n olarsa, sistem müəyyəndir (yeganə həlli var). m = n olduqda Kramer düsturları: x_j = Δ_j / Δ.\n3) Əgər rank(A) = rank(A | B) = r < n olarsa, sistem qeyri-müəyyəndir (n - r sayda sərbəst dəyişəndən asılı sonsuz sayda həlli var).',
        formulaOrCode:
          'Kroneker–Kapelli: A·X = B uyuşandır ⇔ rank(A) = rank(A | B) = r\nKramer qaydası (m = n, Δ = det(A) ≠ 0): x₁ = Δ₁/Δ,  x₂ = Δ₂/Δ, ..., x_n = Δ_n/Δ',
      },
      {
        heading: '2. Mühazirə 9: Bircins Sistemlər (A·X = 0) və Fundamental Həllər Sistemi (FHS)',
        body: 'A·X = 0 bircins sistemi həmişə uyuşandır (X = 0 trivial həlldir). Qeyri-trivial (sıfırdan fərqli) həllin varlığı üçün zəruri və kafi şərt rank(A) = r < n (kvadrat sistemdə det(A) = 0) olmasıdır. Həllər çoxluğu ℝ^n-in k = n - r ölçülü alt-fəzasını (nüvə — Ker(A)) əmələ gətirir. Bu alt-fəzanın ixtiyari Φ₁, Φ₂, ..., Φ_{n-r} bazisi Fundamental Həllər Sistemi (FHS) adlanır.',
        formulaOrCode:
          'dim(Ker A) = n - rank(A) = n - r\nBircins sistemin ümumi həlli: X_0 = C₁·Φ₁ + C₂·Φ₂ + ... + C_{n-r}·Φ_{n-r}\nQeyri-bircins sistemin ümumi həlli: X_ümumi = X_xüsusi + C₁·Φ₁ + ... + C_{n-r}·Φ_{n-r}',
      },
      {
        heading: '3. Mühazirə 10–11: Xətti Operatorun Məxsusi Ədədləri, Məxsusi Vektorları və Silvestr Meyarı',
        body: 'A kvadrat matrisi üçün A·x = λ·x (x ≠ 0) tənliyini ödəyən λ skalyarına məxsusi ədəd, x-ə isə məxsusi vektor deyilir. Məxsusi ədədlər det(A - λE) = 0 xarakteristik tənliyinin kökləridir.\n• Kvadratik formalar: Q(x₁, ..., x_n) = X^T·A·X (A^T = A). Silvestr meyarı: Kvadratik formanın müsbət müəyyən (∀X ≠ 0 : Q(X) > 0) olması üçün zəruri və kafi şərt bütün baş künc minorlarının müsbət olmasıdır (Δ₁ > 0, Δ₂ > 0, ..., Δ_n > 0); mənfi müəyyən olması üçün isə işarələrin növbələşməsidir (Δ₁ < 0, Δ₂ > 0, Δ₃ < 0, ...).',
        formulaOrCode:
          'Xarakteristik çoxhədli: P(λ) = det(A - λE) = 0\nΣ(i=1..n) λ_i = Tr(A),   Π(i=1..n) λ_i = det(A)\nKeli–Hamilton teoremi: P(A) = O (hər bir kvadrat matris öz xarakteristik tənliyini ödəyir)',
      },
      {
        heading: '4. Mühazirə 12–14: Vektor Cəbri, Fəzada Düz Xətt və Müstəvi, İkitərtibli Əyrilər',
        body: '• Vektorların skalyar (a·b), vektorial (a×b) və qarışıq ((a,b,c) = (a×b)·c) hasilləri: komplanarlıq şərti (a,b,c) = 0, paralelopipedin həcmi V = |(a,b,c)|, piramidanın həcmi V = (1/6)|(a,b,c)|.\n• Fəzada müstəvi (Ax + By + Cz + D = 0, normal n = (A,B,C)) və düz xəttin kanonik tənliyi ((x-x₀)/m = (y-y₀)/n = (z-z₀)/p, yönəldici s = (m,n,p)).',
        formulaOrCode:
          'a · b = |a||b|cos φ = a_x b_x + a_y b_y + a_z b_z  |  S_üçbucaq = (1/2)|a × b|\nNöqtədən müstəviyə məsafə: d(M₀, π) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)\nEllips: x²/a² + y²/b² = 1 (e = c/a < 1) ; Hiperbola: x²/a² - y²/b² = 1 (e > 1) ; Parabola: y² = 2px',
      },
    ],
  },

  // ==========================================================================
  // 4. RİYAZİ ANALİZ - 1 (LMS ID: 5039 · 6326a2_if-61115y_riyazi analiz - 1)
  // Müəllim: Sevda İsgəndərova (Cloudflare R2 PDF + Universitet Səviyyəli Real Analiz Qaydaları)
  // ==========================================================================
  {
    id: 'uni_math_m1_m5',
    title: 'Riyazi analiz - 1 (Mühazirə 1–5): Çoxluqlar, Supremum, Ardıcıllıq və Funksiya Limiti, Kəsilməzlik',
    courseId: 'math',
    type: 'file',
    description:
      '✓ Keçildi (1–3-cü həftələr) və I Kollokvium Bazası · Supremum/İnfimum, Koşi və Heyne limit tərifləri, Veyyerştrass teoremi, Görkəmli limitlər, Landau simvolları (O, o) və Kəsilməz funksiyaların qlobal teoremləri (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'riyazi-analiz-m1-m5-kollokvium1.pdf',
    fileSize: '0.1 MB · PDF + Ali Analiz Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m1-m5-kollokvium1.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova',
    createdAt: '2026-09-18T09:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Həqiqi Ədədlər Meydanının Tamlıq Aksiomu, Supremum və İnfimumun Analitik ε-Meyarı',
        body: 'ℝ tam nizamlanmış Arximed meydanıdır. Boş olmayan və yuxarıdan məhdud hər bir E ⊂ ℝ çoxluğunun ℝ-də ən kiçik yuxarı sərhədi — supremumu (sup E = M), aşağıdan məhdud çoxluğun isə ən böyük aşağı sərhədi — infimumu (inf E = m) var. Kantorun daxil olmuş parçalar prinsipinə görə uzunluqları sıfıra yaxınlaşan [a_n, b_n] parçalar sisteminin kəsişməsi yeganə nöqtədən ibarətdir.',
        formulaOrCode:
          'M = sup E  ⇔  (1) ∀x ∈ E : x ≤ M   və   (2) ∀ε > 0, ∃x_ε ∈ E : x_ε > M - ε\nm = inf E  ⇔  (1) ∀x ∈ E : x ≥ m   və   (2) ∀ε > 0, ∃x_ε ∈ E : x_ε < m + ε\nÜçbucaq bərabərsizliyi: ||a| - |b|| ≤ |a ± b| ≤ |a| + |b|',
      },
      {
        heading: '2. Ədədi Ardıcıllığın Limiti (ε–N), Veyyerştrass Teoremi, Eyler Ədədi (e) və Koşi Meyarı',
        body: '• Koşi tərifi: lim(n→∞) x_n = a ⇔ ∀ε > 0, ∃N(ε) ∈ ℕ : ∀n > N(ε) ⇒ |x_n - a| < ε.\n• Yığılan ardıcıllıq məhduddur və limiti yeganədir. Sıxılmış ardıcıllıq (iki polis) teoremi: x_n ≤ y_n ≤ z_n və lim x_n = lim z_n = a ⇒ lim y_n = a.\n• Veyyerştrass teoremi: Monoton və məhdud ardıcıllıq həmişə sonlu limitə yığılır. Xüsusi halda x_n = (1 + 1/n)^n ciddi artır və 2 ≤ x_n < 3 olduğundan lim(1 + 1/n)^n = e.\n• Koşi kriteriyası: Ardıcıllığın ℝ-də yığılması üçün zəruri və kafi şərt onun fundamental olmasıdır (|x_{n+p} - x_n| < ε).',
        formulaOrCode:
          'lim(n→∞) (1 + 1/n)^n = e ≈ 2.718281828...\nBolsano–Veyyerştrass: Hər bir məhdud ardıcıllıqdan yığılan alt-ardıcıllıq ayırmaq olar.\nŞtolts teoremi (y_n ciddi artan və y_n → +∞): lim (x_n / y_n) = lim ((x_n - x_{n-1}) / (y_n - y_{n-1}))',
      },
      {
        heading: '3. Funksiyanın Limiti (Koşi ε–δ və Heyne), Görkəmli Limitlər və Landau Asimptotikası (o, ~)',
        body: 'Funksiyanın x → x₀ nöqtəsində limitinin Koşi (ətraf dilində ε–δ) və Heyne (ardıcıllıq dilində) tərifləri ekvivalentdir. x → 0 olduqda sonsuz kiçilənlərin ekvivalentlik cədvəli hasil və nisbət altında limitlərin sürətli hesablanmasını təmin edir (cəm və fərqdə baş hədlər islah olunduqda Teylor açılışı işlədilir).',
        formulaOrCode:
          'I Görkəmli Limit: lim(x→0) (sin x)/x = 1   |   II Görkəmli Limit: lim(x→0) (1 + x)^(1/x) = e\nx → 0 olduqda ekvivalent sonsuz kiçilənlər (α(x) ~ β(x) ⇔ lim α/β = 1):\nsin x ~ x,  tg x ~ x,  arcsin x ~ x,  arctg x ~ x,  1 - cos x ~ x²/2\nln(1 + x) ~ x,  e^x - 1 ~ x,  a^x - 1 ~ x·ln a,  (1 + x)^μ - 1 ~ μ·x',
      },
      {
        heading: '4. Funksiyanın Kəsilməzliyi, Kəsilmə Nöqtələrinin Təsnifatı və Parçada Qlobal Teoremlər',
        body: 'f(x) funksiyası x₀ nöqtəsində kəsilməzdir ⇔ lim(x→x₀-0) f(x) = lim(x→x₀+0) f(x) = f(x₀).\n• I növ kəsilmə: sonlu f(x₀-0) və f(x₀+0) limitləri var (bərabərdirsə — aradan qaldırıla bilən, fərqlidirsə — sonlu sıçrayışlı). II növ kəsilmə: birtərəfli limitlərdən heç olmasa biri yoxdur və ya sonsuzdur.\n• Parçada kəsilməz funksiyalar (f ∈ C[a,b]): Bolsano–Koşi (sıfırlar və aralıq qiymətlər haqqında), Veyyerştrass (məhdudluq və dəqiq sərhədlərə çatma) və Kantor (müntəzəm kəsilməzlik) teoremləri.',
        formulaOrCode:
          'Bolsano–Koşi: f ∈ C[a,b] və f(a)·f(b) < 0  ⇒  ∃c ∈ (a,b) : f(c) = 0\nVeyyerştrass: f ∈ C[a,b]  ⇒  ∃x_min, x_max ∈ [a,b] : f(x_min) = inf f,  f(x_max) = sup f',
      },
    ],
  },
  {
    id: 'uni_math_m6_m15',
    title: 'Riyazi analiz - 1 (Mühazirə 6–15): Törəmə, Diferensial, Laqranj/Lopital, Teylor Düsturu və İnteqral',
    courseId: 'math',
    type: 'file',
    description:
      'Semestr və Yekun İmtahan Mövzuları (Mühazirə 6–15) · Diferensiallanma, Leybnis düsturu, Ferma/Roll/Laqranj/Koşi teoremləri, Lopital qaydası, Peano və Laqranj qalıqlı Teylor–Makloren düsturu və İnteqral hesabı (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'riyazi-analiz-m6-m15-toreme-inteqral.pdf',
    fileSize: '0.1 MB · PDF + Ali Analiz Qaydaları',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m6-m15-toreme-inteqral.pdf',
    authorId: 'system_aztu',
    authorName: 'Sevda İsgəndərova',
    createdAt: '2026-09-20T09:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Törəmə, Birinci Diferensialın Formasının İnvariantlığı və Yüksək Tərtibli Törəmələr (Leybnis)',
        body: 'f funksiyasının x₀ nöqtəsində diferensiallanan olması (Δy = f′(x₀)Δx + o(Δx)) onun həmin nöqtədə sonlu törəməsinin varlığı ilə ekvivalentdir. Birinci tərtib diferensial dy = f′(x)dx arqumentin müstəqil dəyişən və ya başqa dəyişənin funksiyası olmasından asılı olmayaraq öz formasını saxlayır (invariantlıq). Hasilin n-ci tərtib törəməsi Nyuton binomuna bənzər Leybnis düsturu ilə tapılır.',
        formulaOrCode:
          'dy = f′(x)dx,   d²y = f″(x)dx² (yalnız x müstəqil olduqda!)\nParametrik: y′_x = y′_t / x′_t,   y″_{xx} = (x′_t y″_{tt} - y′_t x″_{tt}) / (x′_t)³\nLeybnis düsturu: (u · v)^(n) = Σ(k=0..n) C(n, k) · u^(n-k) · v^(k)',
      },
      {
        heading: '2. Diferensial Hesabının Orta Qiymət Teoremləri (Ferma, Roll, Laqranj, Koşi) və Lopital Qaydası',
        body: '• Ferma: Daxili ekstremum nöqtəsində törəmə varsa, f′(x₀) = 0.\n• Roll: f ∈ C[a,b], f ∈ D(a,b) və f(a) = f(b) ⇒ ∃c ∈ (a,b) : f′(c) = 0.\n• Laqranj (Sonlu artımlar): f(b) - f(a) = f′(c)(b - a).\n• Koşi: [f(b) - f(a)] / [g(b) - g(a)] = f′(c) / g′(c).\n• Bernulli–Lopital qaydası: 0/0 və ya ∞/∞ qeyri-müəyyənliklərində lim(f/g) = lim(f′/g′) (sağdakı limit mövcuddursa).',
        formulaOrCode:
          'Laqranj: f(x₀ + Δx) - f(x₀) = f′(x₀ + θ·Δx)·Δx,   0 < θ < 1\nLopital qaydası: lim(x→a) f(x)/g(x) = [0/0 və ya ∞/∞] = lim(x→a) f′(x)/g′(x)',
      },
      {
        heading: '3. Peano və Laqranj Qalıq Hədli Teylor–Makloren Düsturları və Funksiyanın Tədqiqi',
        body: 'Teylor düsturu n dəfə diferensiallanan funksiyanı n-dərəcəli çoxhədli və qalıq həddi R_n(x) ilə approksimasiya edir. Lokal limit və ekstremum məsələlərində Peano qalığı o((x-x₀)^n), təqribi hesablamaların xətasını qiymətləndirmək üçün isə Laqranj qalığı işlədilir.',
        formulaOrCode:
          'f(x) = Σ(k=0..n) [f^(k)(x₀) / k!]·(x - x₀)^k + R_n(x)\ne^x = 1 + x + x²/2! + x³/3! + ... + x^n/n! + o(x^n)\nsin x = x - x³/3! + x⁵/5! - ... + (-1)^m x^(2m+1)/(2m+1)! + o(x^(2m+2))\ncos x = 1 - x²/2! + x⁴/4! - ... + (-1)^m x^(2m)/(2m)! + o(x^(2m+1))\nln(1+x) = x - x²/2 + x³/3 - ... + (-1)^(n-1) x^n/n + o(x^n)\n(1+x)^α = 1 + αx + α(α-1)x²/2! + ... + o(x^n)',
      },
      {
        heading: '4. Qeyri-müəyyən və Müəyyən İnteqral (Riman Cəmləri, Darbu Teoremi və Nyuton–Leybnis)',
        body: 'İbtidai funksiya F′(x) = f(x) və qeyri-müəyyən inteqralın əsas üsulları (dəyişəni əvəzetmə, hissə-hissə inteqrallama ∫udv = uv - ∫vdu, rasional kəsrlərin sadə kəsrlərə ayrılması). Parçada kəsilməz və ya sonlu sayda kəsilmə nöqtəsi olan məhdud funksiya Riman mənada inteqrallanandır.',
        formulaOrCode:
          '∫ u dv = u · v - ∫ v du\nYuxarı sərhədi dəyişən inteqralın törəməsi: (d/dx) ∫(a..x) f(t) dt = f(x)\nNyuton–Leybnis düsturu: ∫(a..b) f(x) dx = F(b) - F(a)',
      },
    ],
  },

  // ==========================================================================
  // 5. AZƏRBAYCAN DİLİNDƏ İŞGÜZAR VƏ AKADEMİK KOMMUNİKASİYA (LMS ID: 5042) — 2 Rəsmi Material
  // Müəllim: Müəl. Nərminə İsayeva (Cloudflare R2 PDF + Vəsaitdən çıxarılmış qaydalar)
  // ==========================================================================
  {
    id: 'koica_aze_4932',
    title: 'Dərs vəsaiti — Azərbaycan dilində işgüzar və akademik kommunikasiya',
    courseId: 'aze',
    type: 'file',
    description:
      '✓ Keçildi (Mövzu 1–4) · KOICA LMS #4932 · Orijinal fayl: ADİAK dərs vəsaiti.docx (H.Mirzəyev, A.Fərəcova, L.Piriyeva, P.Abdullabəyova — 23 mövzuluq dərs vəsaitinin qaydaları və PDF-i)',
    fileName: 'adiak-ders-vesaiti.pdf',
    fileSize: '2.3 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/aze/adiak-ders-vesaiti.pdf',
    authorId: 'system_aztu',
    authorName: 'Nərminə İsayeva',
    createdAt: '2026-09-20T10:28:29.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Mövzu 1 Qaydası: Kommunikasiya anlayışı və Ünsiyyətin 3 əsas tərəfi',
        body: '“Kommunikasiya” termini latın dilindəki “communicatio” (ümumiləşdirmə, əlaqələndirmə, ünsiyyət) sözündən yaranmışdır. İşgüzar kommunikasiya ortaq fəaliyyət prosesində insanların qarşılıqlı anlaşmasını və məlumat mübadiləsini təmin edir. Ünsiyyətin 3 ayrılmaz tərəfi var:\n1) Kommunikativ tərəf — tərəflər arasında informasiya mübadiləsi;\n2) İnteraktiv tərəf — qarşılıqlı fəaliyyət və davranışların tənzimlənməsi;\n3) Perseptiv tərəf — tərəfdaşların bir-birini qavraması, anlaması və empatiya.',
      },
      {
        heading: 'Mövzu 1 Qaydası: Nitqdə statistik rəqəmlərdən istifadənin 5 qaydası və 3 əsas sual',
        body: 'Dərs vəsaitinə əsasən hər hansı işgüzar danışıqdan əvvəl natiq özünə 3 sual verməlidir: 1) KİM İLƏ danışmalı? 2) NƏ danışmalı? 3) NECƏ danışmalı?\nNitqdə statistik məlumatlardan istifadə qaydaları:\n• Statistik rəqəmləri nitqə yalnız zəruri olduqda və məhdud sayda daxil etmək;\n• Böyük rəqəmləri yuvarlaqlaşdıraraq (“təxminən”, “təqribən” sözləri ilə) səsləndirmək;\n• Rəqəmləri dinləyiciyə tanış olan real ölçülərlə müqayisəli şəkildə təqdim etmək;\n• Çoxrəqəmli cədvəlləri şifahi oxumaq əvəzinə vizual slayd/diaqramda göstərmək.',
      },
      {
        heading: 'Mövzu 2 Qaydası: Rəsmi-işgüzar üslubun xüsusiyyətləri və 3 alt üslubu',
        body: 'Rəsmi-işgüzar üslub dövlət idarəçiliyi, qanunvericilik, diplomatiya və kargüzarlıq dilidir. Əsas əlamətləri: standartlıq (şablon ifadələr), dəqiqlik (ikimənalılığın olmaması), yığcamlıq, obyektivlik və emosionallıqdan uzaqlıq.\nRəsmi-işgüzar üslub 3 alt üsluba bölünür:\n1) Xüsusi rəsmi (qanunvericilik) alt üslub — Konstitusiya, qanunlar, fərmanlar, sərəncamlar;\n2) Diplomatik alt üslub — beynəlxalq müqavilələr, notalar, bəyanatlar, memorandumlar;\n3) Gündəlik işgüzar (dəftərxana / kargüzarlıq) alt üslub — ərizə, tərcümeyi-hal, arayış, akt, protokol.',
      },
      {
        heading: 'Mövzu 2 Qaydası: Rəsmi və İşgüzar sənədlərin fərqi və 6 tərtib qaydası',
        body: '• Rəsmi sənədlər dövlət və ya hökumət orqanları tərəfindən tərtib olunur, yüksək hüquqi qüvvəyə malikdir (Qanun, Fərman, Sərəncam, Əmr, Nazirlər Kabinetinin qərarı).\n• İşgüzar sənədlər isə ayrı-ayrı vətəndaşlar və ya idarədaxili əməkdaşlar tərəfindən konkret praktiki məsələ üçün yazılır (Ərizə, Tərcümeyi-hal, İzahat, Arayış, Elan, Bildiriş, Reklam, Vəkalətnamə).\nSənəd tərtibinin 6 qaydası: 1) Adresat (kimə ünvanlandığı) dəqiq yazılmalı; 2) Sənədin adı mərkəzdə göstərilməli; 3) Məzmun faktlara əsaslanmalı və qısa olmalı; 4) Ədəbi dilin orfoqrafik və qrammatik normaları gözlənilməli; 5) Tarix və imza sonda yerləşdirilməli; 6) Lazımi rekvizitlər (möhür, ştamp, qeydiyyat nömrəsi) tam olmalıdır.',
      },
      {
        heading: 'Mövzu 3 Qaydası: İşgüzar kommunikasiyada müzakirə mədəniyyətinin 6 qaydası',
        body: '1) Müzakirənin predmetini və məqsədini əvvəlcədən dəqiq müəyyənləşdirmək;\n2) Qarşı tərəfin sözünü kəsmədən axıra qədər dinləmək (aktiv dinləmə);\n3) Şəxsiyyəti deyil, yalnız irəli sürülən fikri və arqumenti tənqid etmək;\n4) Faktlara və məntiqi dəlillərə əsaslanmaq, emosional təzyiqdən qaçmaq;\n5) Ortaq məxrəcə (konsensusa) gəlməyə yönəlmiş konstruktiv mövqe tutmaq;\n6) Danışıqlarda nitq etiketi və subordinasiya normalarına riayət etmək.',
      },
      {
        heading: 'Mövzu 4 Qaydası: Özünütəsdiq təqdimatı və müsbət imic yaratmağın 6 qaydası',
        body: 'İşgüzar görüşdə ilk 30–60 saniyə ərzində yaranan ilkin təəssürat həlledicidir. Dərs vəsaitində müsbət təəssürat yaratmağın 6 qaydası:\n1) Səmimi təbəssüm və açıq baxış (vizual kontakt);\n2) Məkan və situasiyaya uyğun səliqəli işgüzar geyim (dress-kod);\n3) Düz qamət, təmkinli jestlər və bədən dilinə nəzarət;\n4) Aydın diksiya, sakit və inamlı səs tembri;\n5) Həmsöhbətin adına müraciət etmək və ona diqqət göstərmək;\n6) Öz peşəkar bacarıqlarını şişirtmədən, konkret uğur və faktlarla təqdim etmək.',
      },
      {
        heading: 'Mövzu 5–23: Akademik Yazı Struktur Qaydaları, Elmi Üslub, İstinad (APA/IEEE) və Natiqlik',
        body: 'Elmi-akademik üslubun əsas göstəriciləri: terminoloji dəqiqlik, mücərrədlik, məntiqi ardıcıllıq, səbəb-nəticə bağlayıcıları (“beləliklə”, “nəticə etibarilə”, “tədqiqat göstərir ki”) və şəxssiz/məchul növ cümlə modelləri. Elmi məqalə və tezislərin beynəlxalq IMRaD (Giriş, Metodologiya, Nəticələr və Müzakirə) strukturuna uyğun tərtibi, xülasə (annotasiya) və açar sözlərin seçilməsi, sitatgətirmə və antiplagiat etikası.',
      },
    ],
  },
  {
    id: 'koica_aze_4933',
    title: 'Sərbəst işlərin mövzuları (Bütün 44 rəsmi mövzu)',
    courseId: 'aze',
    type: 'file',
    description:
      'KOICA LMS #4933 · Orijinal fayl: Sərbəst işlərin mövzuları.docx · Müəl. Nərminə İsayevanın təqdim etdiyi 44 rəsmi sərbəst iş mövzusunun tam siyahısı və PDF-i',
    fileName: 'serbest-isler-movzulari.pdf',
    fileSize: '76 KB · PDF + 44 Mövzu',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/aze/serbest-isler-movzulari.pdf',
    authorId: 'system_aztu',
    authorName: 'Nərminə İsayeva',
    createdAt: '2026-09-20T10:29:39.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Sərbəst İş Mövzuları (1 – 15)',
        body: 'KOICA LMS-dəki “Sərbəst işlərin mövzuları.docx” faylından birbaşa çıxarılmış rəsmi siyahı (I hissə):',
        formulaOrCode:
          '1. Azərbaycan dilində işgüzar və akademik kommunikasiya fənninin məqsəd və vəzifələri.\n2. Kommunikasiya anlayışı, növləri və formaları.\n3. İşgüzar üslubun mahiyyəti və əsas xüsusiyyətləri.\n4. İşgüzar ünsiyyət və onun əsas prinsipləri.\n5. İşgüzar ünsiyyətdə özünütəsdiq təqdimatı və imic.\n6. Şifahi işgüzar kommunikasiya: dialoq və monoloji janrlar.\n7. İşgüzar danışıqların aparılması mərhələləri və qaydaları.\n8. Qeyri-verbal (sözsüz) kommunikasiya: bədən dili, mimika və jestlər.\n9. İşgüzar ünsiyyət etikası və psixologiyası.\n10. Subordinasiya qaydaları və işgüzar etiket.\n11. Layihə fəaliyyətinin təqdimatı və kütlə qarşısında çıxış.\n12. Peşə etikası və işgüzar karyeranın idarə edilməsi.\n13. Şifahi işgüzar ünsiyyətin mədəniyyətlərarası aspektləri.\n14. Yazılı işgüzar kommunikasiya və onun əsas tələbləri.\n15. Şəxsi sənədlərin növləri və tərtibi qaydaları (ərizə, tərcümeyi-hal, CV, izahat).',
      },
      {
        heading: 'Sərbəst İş Mövzuları (16 – 30)',
        body: 'KOICA LMS-dəki “Sərbəst işlərin mövzuları.docx” faylından birbaşa çıxarılmış rəsmi siyahı (II hissə):',
        formulaOrCode:
          '16. Təşkilati və inzibati sənədlər (əmr, sərəncam, qərar, nizamnamə).\n17. Elektron sənəd dövriyyəsi və onun üstünlükləri.\n18. İstinad və analitik sənədlərin tərtibi (arayış, akt, protokol, hesabat).\n19. İşgüzar məktubların növləri və yazılma qaydaları.\n20. Biznes sahəsində işgüzar ünsiyyət və kommersiya yazışmaları.\n21. İşgüzar elektron poçt (e-mail) yazışma etiketi.\n22. Sosial şəbəkələrdə işgüzar kommunikasiya qaydaları.\n23. Ticarət yazışmaları (sorğu, təklif, iddia və cavab məktubları).\n24. Qeyri-kommersiya məktubları (dəvətnamə, təbrik, təşəkkür, zəmanət məktubu).\n25. Yazılı işgüzar ünsiyyətdə reklam və elan mətnlərinin hazırlanması.\n26. Reklam biznes əlaqələrinin üzvi hissəsi kimi.\n27. Dil mediası və reklam mətnlərinin dil-üslub xüsusiyyətləri.\n28. Akademik kommunikasiya anlayışı və elmi üslubun xüsusiyyətləri.\n29. Elmi işlərin (tezis, məqalə, referat, kurs işi) yazılma qaydaları.\n30. Akademik yazı strukturunda giriş, əsas hissə, nəticə və ədəbiyyat siyahısı.',
      },
      {
        heading: 'Sərbəst İş Mövzuları (31 – 44)',
        body: 'KOICA LMS-dəki “Sərbəst işlərin mövzuları.docx” faylından birbaşa çıxarılmış rəsmi siyahı (III hissə):',
        formulaOrCode:
          '31. Elmi mətnlərdə sitatgətirmə, istinad qaydaları və plagiat problemi.\n32. Annotasiya, xülasə (abstract) və açar sözlərin tərtibi qaydaları.\n33. Elmi-tədqiqat mövzusu üzrə icmal məqalələrin hazırlanması.\n34. Akademik və işgüzar təqdimatların (prezentasiyaların) hazırlanma qaydaları.\n35. Azərbaycan ədəbi dilinin normaları (fonetik, leksik, qrammatik) və işgüzar nitq.\n36. Natamam və tam rəsmi sənəd formalarının müqayisəli təhlili.\n37. Müasir informasiya texnologiyaları dövründə akademik kommunikasiya.\n38. İşgüzar mübahisə, polemika və debat aparmaq mədəniyyəti.\n39. Telefon danışıqları və onlayn video-konfrans etiketi.\n40. Mühəndis fəaliyyətində texniki sənədləşmə və akademik yazı.\n41. Dövlət dili haqqında Azərbaycan Respublikasının Qanunu və rəsmi yazışma.\n42. İşgüzar kommunikasiyada nitq maneələri (kommunikativ baryerlər) və onların aradan qaldırılması.\n43. Müsahibəyə (işə qəbul) hazırlıq və özünü təqdimetmə texnikası.\n44. Akademik natiqlikdə arqumentasiya və dinləyici auditoriyasının idarə olunması.',
      },
    ],
  },

  // ==========================================================================
  // 6. XARİCİ DİLDƏ İŞGÜZAR VƏ AKADEMİK KOMMUNİKASİYA (LMS ID: 5043 · XDİAK)
  // Müəllim: Vahidə Nuriyeva (Cloudflare R2 PDF + Universitet Səviyyəli Akademik İngilis Dili Qaydaları)
  // ==========================================================================
  {
    id: 'uni_eng_xdiak',
    title: 'XDİAK — Academic & Technical Communication in English for Computer Engineering',
    courseId: 'eng',
    type: 'file',
    description:
      'Universitet Səviyyəli Akademik və İşgüzar İngilis Dili Konspekti · Nominalization, Hedging, IMRaD Research Paper Structure (IEEE/ACM), Quantitative Data Analysis və Formal Correspondence (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'xdiak-academic-english-cs.pdf',
    fileSize: '0.1 MB · PDF + Academic English Rules',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/eng/xdiak-academic-english-cs.pdf',
    authorId: 'system_aztu',
    authorName: 'Vahidə Nuriyeva',
    createdAt: '2026-09-20T11:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Academic Register, Nominalization, Epistemic Hedging & Objective Passive Constructions',
        body: 'Universitet səviyyəli elmi-texniki ingilis dilində (EAP — English for Academic Purposes) danışıq leksikası, qısaldılmış formalar (don\'t, can\'t) və iki-sözlü feillər (phrasal verbs: find out → determine, look into → investigate, set up → configure) rəsmi akademik ekvivalentlərlə əvəz olunur.\n• Nominalization (İsimləşmə): Hərəkəti feil əvəzinə isim birləşməsi ilə ifadə etməklə informasiya sıxlığı artırılır.\n• Hedging (Elmi ehtiyatlılıq): Mütləq iddialardan qaçmaq üçün modal feillər (may, might, could), ehtimal feilləri (suggest, indicate, appear to) və zərflər (plausibly, predominantly) işlədilir.',
        formulaOrCode:
          'Informal:  "We looked into why the server crashed and found out it ran out of memory."\nAcademic:  "An empirical investigation into the server failure revealed memory exhaustion as the primary cause."\nHedging:   "The experimental findings indicate that the proposed O(n log n) heuristic may significantly reduce latency."',
      },
      {
        heading: '2. IMRaD Architecture for IEEE / ACM Papers & Swales’s CARS Model for Introductions',
        body: 'Beynəlxalq mühəndislik məqalələri (IEEE, ACM, Springer) ciddi IMRaD (Introduction, Methodology, Results, and Discussion) strukturuna tabe olur:\n• Abstract (150–250 söz): Background → Problem Statement → Proposed Methodology → Quantitative Results → Conclusion.\n• Introduction (CARS Model): Move 1 (Establishing a territory — Present Perfect) → Move 2 (Establishing a niche / research gap: "However, prior approaches suffer from...") → Move 3 (Occupying the niche: "In this paper, we propose...").\n• Methodology: Obyektiv təkrarlanabilirlik üçün Past Passive ("The dataset was partitioned...", "Parameters were optimized via...").',
        formulaOrCode:
          'Abstract Template:\n"In recent years, [Domain] has attracted considerable attention. However, existing algorithms suffer from [Limitation].\nThis paper proposes a novel [Method/Architecture] that addresses [Problem] by integrating [Mechanism].\nExperimental evaluations on [Benchmark] demonstrate that our approach outperforms state-of-the-art baselines by [X]%."',
      },
      {
        heading: '3. Describing Quantitative Data, Algorithmic Complexity, Graphs & Formal Correspondence',
        body: 'Elmi qrafiklərin, cədvəllərin və asimptotik mürəkkəbliyin təsviri zamanı dəqiq akademik leksika və zaman uzlaşması tələb olunur:\n• Artım: surge, escalate, exhibit exponential / superlinear growth, scale proportionally with.\n• Azalma və Sabitləşmə: plummet, decay exponentially, diminish, plateau, converge asymptotically to.\n• Rəsmi Akademik Yazışma: Salutation ("Dear Professor [Surname],") → Opening ("I am writing in reference to...") → Core Request → Call to Action → Formal Sign-off ("Sincerely," / "Respectfully,").',
        formulaOrCode:
          'Data Commentary:\n"As illustrated in Figure 3, the inference throughput increases linearly up to a batch size of 64, beyond which it plateaus due to GPU memory bandwidth saturation."',
      },
    ],
  },
];

// KOICA LMS-də hazırda aktiv tapşırıq yoxdur (tasks: [])
export const BUILT_IN_DEADLINES: Deadline[] = [];
