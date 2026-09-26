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
    title: 'Mühazirə-1: İrəliləmə və fırlanma hərəkətinin dinamikası',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #3824 · Orijinal fayl: YENİ-qr.6326 a1,a2-1-İRƏLİLƏMƏ və FIRLANMA HƏRƏKƏTİ..pptx',
    fileName: 'muhazire-01.pdf',
    fileSize: '7.0 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-01.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:03.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: İnersial hesablama sistemi və Nyutonun 3 qanunu',
        body: 'Sükunətdə olan və ya düzxətli bərabərsürətli hərəkət edən sistem inersial hesablama sistemi adlanır (Qalileyin nisbilik prinsipi). I qanun: xarici qüvvə təsir etmədikdə cisim sükunət və ya düzxətli bərabərsürətli hərəkət halını saxlayır. II qanun: əvəzləyici qüvvə kütlə ilə təcilin hasilinə bərabərdir. III qanun: iki cismin qarşılıqlı təsir qüvvələri qiymətcə bərabər, istiqamətcə əksdir.',
        formulaOrCode:
          'ΣF = m·a   (Nyutonun II qanunu)\nF₁₂ = -F₂₁  (Nyutonun III qanunu)\nF_ağırlıq = m·g,   F_elastik = -k·x',
      },
      {
        heading: 'Qayda 2: İmpuls və İmpulsun saxlanması qanunu',
        body: 'Cismin impulsu onun kütləsi ilə sürətinin hasilinə bərabər olan vektorial kəmiyyətdir və sürət istiqamətində yönəlir. Qapalı sistemdə (xarici qüvvələrin yekun impulsu sıfır olduqda) sistemin tam impulsu sabit qalır.',
        formulaOrCode:
          'p = m·v\ndp/dt = ΣF_xarici\nΣp_əvvəl = Σp_sonra   (qapalı sistemdə: m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′)',
      },
      {
        heading: 'Qayda 3: Fırlanma hərəkətinin dinamikası, Qüvvə və Ətalət momenti',
        body: 'Sabit ox ətrafında fırlanmada xətti kəmiyyətlər bucaq kəmiyyətləri ilə əlaqələnir. Qüvvənin fırladıcı təsiri qüvvə momenti (M), cismin fırlanmaya qarşı ətalətliliyi isə ətalət momenti (I) ilə ölçülür. Paralel oxa keçid Hüygens–Şteyner teoremi ilə hesablanır.',
        formulaOrCode:
          'v = ω·r,   a_t = α·r,   a_n = ω²·r\nM = r·F·sin(φ) = F·d   (Qüvvə momenti)\nI = Σ m_i·r_i²         (Ətalət momenti)\nI = I_mərkəz + m·d²    (Hüygens–Şteyner teoremi)\nΣM = I·α,   L = I·ω = const (xarici moment yoxdursa)',
      },
      {
        heading: 'Qayda 4: Mexaniki iş, Güc və Tam mexaniki enerjinin saxlanması',
        body: 'Yalnız konservativ qüvvələr (ağırlıq, elastiklik) təsir etdikdə sistemin tam mexaniki enerjisi (kinetik + potensial) sabit qalır. Həm irəliləmə, həm də fırlanma hərəkəti edən bərk cismin tam kinetik enerjisi bu iki enerjinin cəminə bərabərdir.',
        formulaOrCode:
          'A = F·s·cos(φ),   P = dA/dt = F·v\nE_k(irəliləmə) = m·v² / 2,   E_k(fırlanma) = I·ω² / 2\nE_p(ağırlıq) = m·g·h,        E_p(yay) = k·x² / 2\nE_k1 + E_p1 = E_k2 + E_p2 = const',
      },
    ],
  },
  {
    id: 'koica_phys_3825',
    title: 'Mühazirə-2: Molekulyar Fizika və Termodinamikanın əsasları',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #3825 · Orijinal fayl: YENİ-qr.6326a1,a2 - 2-Molekulyar Fizika və Termodinamikanın əsasları.pptx',
    fileName: 'muhazire-02.pdf',
    fileSize: '2.2 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-02.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:49.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: MKN-in əsas tənliyi və İdeal qazın hal tənliyi (Mendeleyev-Klapeyron)',
        body: 'Qazın qabın divarlarına göstərdiyi təzyiq molekulların chaotik istilik hərəkəti zamanı divarla toqquşmasından yaranır. Temperatur (Kelvinlə) molekulların orta kinetik enerjisinin ölçüsüdür.',
        formulaOrCode:
          'p = (1/3)·n·m₀·v_kv² = n·k·T\np·V = (m/M)·R·T = ν·R·T\nk = 1.38×10⁻²³ C/K (Bolsman sabiti),  R = 8.31 C/(mol·K)',
      },
      {
        heading: 'Qayda 2: Maksvell və Bolsman paylanmaları, Barometrik düstur',
        body: 'Maksvell paylanması molekulların sürətlərə görə paylanmasını, Barometrik düstur isə ağırlıq sahəsində atmosfer təzyiqinin hündürlükdən asılı olaraq eksponensial azalmasını ifadə edir.',
        formulaOrCode:
          'v_ən_ehtimallı = √(2RT/M) < v_orta = √(8RT/πM) < v_ort_kv = √(3RT/M)\np(h) = p₀·exp(-M·g·h / (R·T))   (Barometrik düstur)\nn(h) = n₀·exp(-E_p / (k·T))     (Bolsman paylanması)',
      },
      {
        heading: 'Qayda 3: Sərbəstlik dərəcəsi (i), Daxili enerji və İstilik tutumları',
        body: 'Hər bir sərbəstlik dərəcəsinə orta hesabla (1/2)kT enerji düşür. Biratomlu qaz üçün i=3, ikiatomlu sərt molekul üçün i=5, çoxatomlu qaz üçün i=6 götürülür. Sabit təzyiqdəki və sabit həcmdəki molyar istilik tutumları Mayer tənliyi ilə bağlıdır.',
        formulaOrCode:
          'U = (i/2)·ν·R·T\nC_V = (i/2)·R,   C_P = ((i+2)/2)·R\nC_P - C_V = R   (Mayer düsturu),   γ = C_P / C_V = (i+2) / i',
      },
      {
        heading: 'Qayda 4: Termodinamikanın I qanunu, İzoproseslər və Adiabatik proses',
        body: 'Sistemə verilən istilik miqdarı (Q) onun daxili enerjisinin dəyişməsinə (ΔU) və sistemin xarici qüvvələrə qarşı gördüyü işə (A) sərf olunur. Adiabatik prosesdə mühitlə istilik mübadiləsi olmur (Q = 0).',
        formulaOrCode:
          'Q = ΔU + A\n• İzoxor (V = const): A = 0,  Q = ΔU = ν·C_V·ΔT\n• İzotermik (T = const): ΔU = 0,  Q = A = ν·R·T·ln(V₂/V₁)\n• İzobar (p = const): A = p·ΔV = ν·R·ΔT,  Q = ν·C_P·ΔT\n• Adiabatik (Q = 0): A = -ΔU,  p·V^γ = const  (Puasson tənliyi)',
      },
    ],
  },
  {
    id: 'koica_phys_3826',
    title: 'Mühazirə-3: Elektrostatika',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3826 · Orijinal fayl: YENİ-qr.6326a1,a2-3--ELEKTROSTATİKA.pptx (Slaydları təqdim etmək)',
    fileName: 'muhazire-03-elektrostatika.pdf',
    fileSize: '13.8 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-03-elektrostatika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:30:56.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Elektrik yükünün saxlanması, Kulon qanunu və İntensivlik',
        body: 'Qapalı sistemdə elektrik yüklərinin cəbri cəmi sabitdir. İki nöqtəvi yük arasındakı qüvvə Kulon qanunu ilə, sahənin qüvvə xarakteristikası isə E intensivlik vektoru ilə təyin olunur (superpozisiya prinsipi).',
        formulaOrCode:
          'F = (1 / (4π·ε₀·ε)) · (|q₁·q₂| / r²)\nE = F / q₀,   E_yekun = Σ E_i',
      },
      {
        heading: 'Qayda 2: Qauss teoremi, Potensial və Elektrik tutumu',
        body: 'İxtiyari qapalı səthdən keçən E vektoru seli həmin səthin daxilindəki yüklərin cəbri cəminin ε₀-a nisbətinə bərabərdir. Sahənin enerji xarakteristikası φ potensialıdır.',
        formulaOrCode:
          '∮ E·dS = Σq_daxili / ε₀   (Qauss teoremi)\nA₁₂ = q·(φ₁ - φ₂) = q·U,   E = -grad(φ)\nC = q / U,   C_müstəvi = ε₀·ε·S / d,   W = C·U² / 2',
      },
    ],
  },
  {
    id: 'koica_phys_3827',
    title: 'Mühazirə-4: Sabit elektrik cərəyanı',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3827 · Orijinal fayl: YENİ-qr.6326 a1,a2 -4--SABİT ELEKTRİK CƏRƏYANI.pptx (Slaydları təqdim etmək)',
    fileName: 'muhazire-04.pdf',
    fileSize: '6.3 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-04.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:31:45.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Sabit cərəyan, Om və Coul-Lens qanunları, Kirxhof qaydaları',
        body: 'Cərəyan şiddəti vahid zamanda naqilin en kəsiyindən keçən yük miqdarıdır. Budaqlanmış dövrələr Kirxhofun düyün (I) və kontur (II) qaydaları ilə həll edilir.',
        formulaOrCode:
          'I = dq/dt,   j = I/S,   R = ρ·l / S\nI = U / R  (dövrə hissəsi),   I = ε / (R + r)  (tam dövrə)\nQ = I²·R·t  (Coul-Lens),   ΣI_düyün = 0,   Σ(I·R) = Σε',
      },
      {
        heading: 'Qayda 2: Maqnit sahəsi, Amper və Lorens qüvvələri, Faradey induksiyası',
        body: 'Maqnit sahəsi cərəyanlı naqilə Amper qüvvəsi ilə, hərəkət edən yükə isə Lorens qüvvəsi ilə təsir edir. Maqnit seli dəyişdikdə konturda elektromaqnit induksiya EHQ-si yaranır.',
        formulaOrCode:
          'F_Amper = I·B·l·sin(α),   F_Lorens = q·v·B·sin(α)\nΦ = B·S·cos(α),   ε_i = -dΦ/dt,   ε_öz = -L·(dI/dt)',
      },
    ],
  },
  {
    id: 'koica_phys_4798',
    title: 'Lab N 1. Diskin və həlqənin ətalət momentinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Cari Laboratoriya · KOICA LMS #4798 · Orijinal fayl: DİSKİN ƏTALƏT MOMENTİNİN TƏYİNİ.docx',
    fileName: 'laboratoriya-02.pdf',
    fileSize: '1.1 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-02.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:27:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №1)',
        body: 'İşin məqsədi: fırlanma hərəkəti sensoru vasitəsilə disk və həlqənin təcrübi ətalət momentini təyin edib nəzəri qiymətlə müqayisə etməkdir. Asılmış m kütləli yükün yaratdığı gərilmə qüvvəsi şkivi (r radiuslu) fırladır; bucaq sürəti qrafikinin meylindən α bucaq təcili tapılır.',
        formulaOrCode:
          'Təcrübi ətalət momenti:  I_təcrübi = m · r · (g - r·α) / α\nDiskin nəzəri ətalət momenti:   I_disk = (1/2) · M_disk · R²\nHəlqənin nəzəri ətalət momenti: I_həlqə = (1/2) · M_həlqə · (R₁² + R₂²)',
      },
    ],
  },
  {
    id: 'koica_phys_4799',
    title: 'Lab. N 2. “Qazların molyar istilik tutumları nisbətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4799 · Orijinal fayl: QAZIN İSTİLİK TUTUMLARI.docx (Laboratoriya işlərini yerinə yetirmək)',
    fileName: 'laboratoriya-03.pdf',
    fileSize: '261 KB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-03.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:28:39.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №2)',
        body: 'İşin məqsədi: adiabatik sıxılma/genişlənmə rəqsləri üsulu ilə hava üçün adiabat göstəricisini (γ = C_P / C_V) təyin etməkdir. Porşenin müxtəlif h hündürlüklərində rəqs periodu T ölçülür.',
        formulaOrCode:
          'γ = C_P / C_V = (4·π² · m · V) / (S² · P · T²)\nİdeal ikiatomlu qaz (hava) üçün nəzəri qiymət: γ ≈ 1.40',
      },
    ],
  },
  {
    id: 'koica_phys_4801',
    title: 'Lab. N3. “Naqillərin xüsusi müqavimətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4801 · Orijinal fayl: NİXROM MƏFTİLİN XÜSUSİ.docx (Laboratoriya işlərini yerinə yetirmək)',
    fileName: 'elave-nixrom.pdf',
    fileSize: '69 KB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/elave-nixrom.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:29:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №3)',
        body: 'İşin məqsədi: Om qanununa əsasən nixrom məftilin müqavimətini (R = U/I), mikrometrlə d diametrini və xətkeşlə l uzunluğunu ölçərək xüsusi müqaviməti (ρ) hesablamaqdır.',
        formulaOrCode:
          'S = π·d² / 4\nR = U / I\nρ = R · S / l = (π · d² · U) / (4 · l · I)',
      },
    ],
  },
  {
    id: 'koica_phys_4802',
    title: 'Lab №4. Yerin maqnit sahəsinin induksiyasının üfüqi, şaquli toplananlarının və tam qiymətinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4802 · Orijinal fayl: YERİN MAQNİT SAHƏSİNİN İNDUKSİYASININ ÜFÜQİ,.docx (Laboratoriya işlərini yerinə yetirmək)',
    fileName: 'laboratoriya-04.pdf',
    fileSize: '279 KB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-04.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:32:33.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №4)',
        body: 'Maqnit sahəsi sensoru üfüqi və şaquli müstəvilərdə döndərilərək Yerin maqnit induksiyasının üfüqi toplananı (B_üf) və tam qiyməti (B_tam) ölçülür, meyl bucağı hesablanır.',
        formulaOrCode:
          'cos(θ) = B_üfüqi / B_tam\nB_şaquli = B_tam · sin(θ) = √(B_tam² - B_üfüqi²)',
      },
    ],
  },
  {
    id: 'koica_phys_4804',
    title: 'Lab№5 Sönən elektromaqnit rəqslərinin öyrənilməsi.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4804 · Orijinal fayl: RƏQS KONTURUNDA SÖNƏN ELEKTROMAQNİT RƏQSLƏRİNİN tədqiqi.docx (Laboratoriya işlərini yerinə yetirmək)',
    fileName: 'laboratoriya-05.pdf',
    fileSize: '1.5 MB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-05.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:33:46.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №5)',
        body: 'RLC rəqs konturunda sönən elektromaqnit rəqslərinin qonşu amplitudları ossilloqrafda ölçülərək sönmənin loqarifmik dekrementi (δ) və konturun keyfiyyətliliyi (Q) tapılır.',
        formulaOrCode:
          'δ = (1/n) · ln(U_k / U_{k+n})   (Loqarifmik dekrement)\nQ = π / δ                       (Konturun keyfiyyətliliyi)\nR_böhran = 2 · √(L / C)         (Aperiodik boşalma həddi)',
      },
    ],
  },
  {
    id: 'koica_phys_4805',
    title: 'Lab. N6. İşığın interferensiyası. Nyuton halqaları vasitəsilə işığın dalğa uzunluğunun təyini',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4805 · Orijinal fayl: İşıgın interferensiyası.Nyuton halqaları vasitəsilə işıgın dalfa uzunlugunun təyini..docx',
    fileName: 'laboratoriya-06.pdf',
    fileSize: '345 KB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-06.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:39:10.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №6)',
        body: 'Müstəvi-qabarıq linza ilə şüşə lövhə arasındakı hava qatından əks olunan işığın interferensiyası nəticəsində yaranan qaranlıq Nyuton halqalarının radiusları ölçülür.',
        formulaOrCode:
          'r_k = √(k · λ · R)   (k-cı qaranlıq halqanın radiusu)\nλ = (r_m² - r_k²) / ((m - k) · R)',
      },
    ],
  },
  {
    id: 'koica_phys_4806',
    title: 'Lab. N8. Atom spektrinin öyrənilməsi',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4806 · Orijinal fayl: ATOM SPEKTİRLƏRİNİN OYRƏNİLMƏSİ.docx (Laboratoriya işlərini yerinə yetirmək)',
    fileName: 'laboratoriya-07.pdf',
    fileSize: '703 KB · PDF + Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-07.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:40:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya Qaydası və Hesablama Düsturları (Lab №8)',
        body: 'Hidrogen atomunun görünən spektrindəki Balmer seriyası xətlərinin (n = 2 səviyyəsinə keçidlər: k = 3, 4, 5, 6) dalğa uzunluqları ölçülərək Ridberq sabiti (R) təyin edilir.',
        formulaOrCode:
          '1 / λ = R · (1/2² - 1/k²),   k = 3, 4, 5, 6\nR = 4·k² / (λ · (k² - 4)) ≈ 1.097 × 10⁷ m⁻¹',
      },
    ],
  },

  // ==========================================================================
  // 2. PROQRAMLAŞDIRMANIN ƏSASLARI-1 (LMS ID: 5041 · 6326a2_if-61125y) — 15 Rəsmi Material
  // Müəllim: Dos. Fizuli Əzimov (Slaydların tam mətni əsasında qaydalar)
  // ==========================================================================
  {
    id: 'koica_prog_6677',
    title: 'Əsas dərslik — F.M.Əzimov: Pythonda proqramlaşdırmanın əsasları',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #6677 · Orijinal fayl: F.M.Əzimov Pythonda proqramlaşdırmanın əsasları.pdf · Bütün semestr üzrə əsas dərslik',
    fileName: 'F.M.Əzimov Pythonda proqramlaşdırmanın əsasları.pdf',
    fileSize: 'KOICA LMS · PDF + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/6677',
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
        body: 'Hazırkı həftələr üzrə M-1 (Proqramlaşdırmaya giriş, alqoritm, kompilyator vs interpretator, IDLE rejimləri) və M-2,3 (Ədədi və məntiqi tiplər, 7 hesab əməli, mürəkkəb mənimsəmə, standart riyazi funksiyalar, say sistemləri və bit əməliyyatları) keçirilir. Aşağıdakı M-1 .. M-15 materiallarında hər təqdimatın qaydaları slayd-slayd çıxarılıb.',
      },
    ],
  },
  {
    id: 'koica_prog_6991',
    title: '6326 a1,a2 (M) 23.09.26 — Microsoft Teams Mühazirə Keçidi',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #6991 · Orijinal fayl: Link 6326 a1,a2 (M) 23.09.26.docx · Microsoft Teams onlayn dərs keçidi',
    fileName: 'Link 6326 a1,a2 (M) 23.09.26.docx',
    fileSize: 'MS Teams',
    linkUrl: 'https://teams.microsoft.com/meet/46213542171245?p=O2y4jqizH5XaB5nwUO',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-23T11:56:21.000Z',
    isBuiltIn: true,
  },
  {
    id: 'koica_prog_8403',
    title: 'M-1. Proqramlaşdırmaya giriş. Alqoritm anlayışı. Python proqramlaşdırma dili ilə tanışlıq.',
    courseId: 'prog',
    type: 'link',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #8403 · Orijinal fayl: M1.pptx (21 slaydın tam qaydaları)',
    fileName: 'M1.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8403',
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
    type: 'link',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #8404 · Orijinal fayl: M2-3.pptx (26 slaydın tam qaydaları)',
    fileName: 'M2-3.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8404',
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
    type: 'link',
    description:
      'KOICA LMS #8405 · Orijinal fayl: M4.pptx (27 slaydın tam qaydaları)',
    fileName: 'M4.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8405',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:13:32.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Sətirlərin (str) təsviri, Birləşdirmə (+), Təkrarlama (*) və İndeksləmə (Slayd 2–7)',
        body: 'Sətir tək (\'...\'), cüt ("...") və ya üçqat (\'\'\'...\'\'\') dırnaq arasında yazılan simvollar ardıcıllığıdır. Sətir dəyişilməz (immutable) tipdir — s[1] = "b" yazmaq xəta verir! Soldan sağa indekslər 0..n-1, sağdan sola isə -1..-n kimidir.',
        formulaOrCode:
          's = "Python"\nlen(s)       # 6 (sətrin uzunluğu)\ns[0], s[-1]  # (\'P\', \'n\')\n"Az" + "TU"  # "AzTU" (konkatenasiya)\n"Ha" * 3     # "HaHaHa" (təkrarlama)',
      },
      {
        heading: 'Qayda 2: Sətirlərdə Kəsiklər — S[X:Y:Z] (Slayd 8–10)',
        body: 'S[X:Y:Z] kəsiyində X başlanğıc indeks (daxildir), Y son indeks (daxil deyil!), Z isə addımdır (susmaya görə 1). S[::-1] sətri tərsinə çevirir.',
        formulaOrCode:
          's = "Proqram"\ns[1:4]     # "roq" (1, 2, 3-cü indekslər)\ns[:4]      # "Proq"\ns[::2]     # "Porm" (2 addımla)\ns[::-1]    # "marqorP" (tərsinə sətir)',
      },
      {
        heading: 'Qayda 3: Sətirlərin əsas metodları (Slayd 11–26)',
        body: '• Axtarış: s.find(alt), s.rfind(alt) (tapılmasa -1 qaytarır); s.index(alt) (tapılmasa ValueError verir); s.count(alt).\n• Əvəzləmə və Bölmə: s.replace(köhnə, yeni[, say]), s.split(ayırıcı), ayırıcı.join(siyahı), s.partition(sep).\n• Registr və Təmizləmə: s.upper(), s.lower(), s.capitalize(), s.title(), s.swapcase(), s.strip(), s.lstrip(), s.rstrip(), s.zfill(en).\n• Yoxlama (True/False): s.isdigit(), s.isalpha(), s.isalnum(), s.islower(), s.isupper(), s.isspace(), s.startswith(), s.endswith().',
        formulaOrCode:
          '>>> "salam dünya".title()\n\'Salam Dünya\'\n>>> "abrakadabra".replace("a", "A", 2)\n\'AbrAkadabra\'\n>>> "-".join(["2026", "09", "26"])\n\'2026-09-26\'\n>>> "12345".isdigit(), "Python3".isalnum()\n(True, True)',
      },
    ],
  },
  {
    id: 'koica_prog_8407',
    title: 'M-5,6. Siyahılar(list), kortejlər(tuple) və onlar üçün funksiya və metodlar. Lüğətlər(dict), çoxluqlar(set) və onlar üçün funksiya və metodlar.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8407 · Orijinal fayl: M5-6.pptx (26 slaydın tam qaydaları)',
    fileName: 'M5-6.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8407',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:16:58.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Siyahılar (list) və Siyahı Generasiyası (Slayd 2–13)',
        body: 'Siyahı [...] kvadrat mötərizədə yazılan, dəyişdirilə bilən (mutable) nizamlı kolleksiyadır. Əsas metodları: append(x) (sona əlavə), extend(L) (genişləndirmə), insert(i, x) (indeksə əlavə), remove(x) (dəyərə görə silmə), pop([i]) (indeksə görə silib qaytarma), index(x), count(x), sort([reverse=True]), reverse(), copy(), clear().',
        formulaOrCode:
          'kvadratlar = [i * i for i in range(1, 6)]   # [1, 4, 9, 16, 25]\na = [3, 1, 4]\na.append(2)       # [3, 1, 4, 2]\na.sort()          # [1, 2, 3, 4]\nson = a.pop()     # son = 4, a = [1, 2, 3]',
      },
      {
        heading: 'Qayda 2: Kortejlər (tuple) və Çoxluqlar (set, frozenset) (Slayd 14–21)',
        body: '• Kortej (...): dəyişdirilməz (immutable) siyahıdır, yaddaşda az yer tutur və lüğət açarı ola bilir. Tək elementli kortejdə vergül mütləqdir: (5,).\n• Çoxluq (set): {...} içində təkrarsız, nizamsız elementlər toplusudur. Boş çoxluq yalnız set() ilə yaradılır ({} boş lüğətdir!). frozenset dəyişməz çoxluqdur.',
        formulaOrCode:
          'A = {1, 2, 3};  B = {3, 4, 5}\nA | B   # Birləşmə (union): {1, 2, 3, 4, 5}\nA & B   # Kəsişmə (intersection): {3}\nA - B   # Fərq (difference): {1, 2}\nA ^ B   # Simmetrik fərq: {1, 2, 4, 5}',
      },
      {
        heading: 'Qayda 3: Lüğətlər — dict (Slayd 22–26)',
        body: 'Lüğət {açar: qiymət} cütlərindən ibarətdir. Açarlar unikal və dəyişməz tipdə (int, str, tuple) olmalıdır. Əsas metodları: d.keys(), d.values(), d.items(), d.get(k[, default]), d.pop(k), d.update(d2), dict.fromkeys(seq, val).',
        formulaOrCode:
          'telebe = {"ad": "Elcan", "qrup": "6326A2", "bal": 50}\ntelebe.get("bal", 0)       # 50\ntelebe["kafedra"] = "KM"   # yeni açar-qiymət əlavə edir\nlist(telebe.keys())        # [\'ad\', \'qrup\', \'bal\', \'kafedra\']',
      },
    ],
  },
  {
    id: 'koica_prog_8408',
    title: 'M-7. Tarix-zaman tipli verilənlər. Verilənlərin tiplərinin çevrilməsi.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8408 · Orijinal fayl: M7.pptx (28 slaydın tam qaydaları)',
    fileName: 'M7.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8408',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:17:34.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: datetime modulu (date, time, datetime, timedelta) (Slayd 2–20)',
        body: 'Tarix və zamanla işləmək üçün standart datetime modulunun siniflərindən istifadə olunur: date(year, month, day), time(hour, minute, second), datetime.now(), timedelta(days, seconds...). Tarixi sətirə çevirmək üçün strftime(), sətri tarixə çevirmək üçün strptime() işlədilir.',
        formulaOrCode:
          'from datetime import date, datetime, timedelta\nbugun = date.today()\nindi = datetime.now()\nyarin = bugun + timedelta(days=1)\nprint(indi.strftime("%d.%m.%Y %H:%M:%S"))',
      },
      {
        heading: 'Qayda 2: Verilənlərin tiplərinin çevrilməsi (Slayd 21–28)',
        body: '• Qeyri-açıq (avtomatik) çevrilmə: məsələn, int + float əməlində int avtomatik float-a çevrilir.\n• Açıq (explicit) çevrilmə: int(x), float(x), str(x), bool(x), list(x), tuple(x), set(x) funksiyaları ilə proqramçı tərəfindən aparılır. type(x) və isinstance(x, tip) obyektin tipini yoxlayır.',
        formulaOrCode:
          'x = int("42")        # 42\ny = float("3.14")    # 3.14\ns = str(2026)        # "2026"\nisinstance(42, int)  # True',
      },
    ],
  },
  {
    id: 'koica_prog_8410',
    title: 'M-8. Mənimsəmə və şərh komandaları. Giriş-çıxış komandaları. Mövqeli formatlaşdırma üsulları.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8410 · Orijinal fayl: M8.pptx (23 slaydın tam qaydaları)',
    fileName: 'M8.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8410',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:19:25.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Mənimsəmə üsulları, Şərhlər (#) və Giriş-Çıxış (input, print) (Slayd 2–14)',
        body: '• Kaskad mənimsəmə: a = b = c = 0. Çoxdəyişənli mənimsəmə: x, y = 10, 20 və dəyişənlərin yerini dəyişmə: x, y = y, x.\n• input() klaviaturadan daxil edilən qiyməti həmişə str (sətir) kimi qaytarır; ədəd lazımdırsa int(input()) və ya float(input()) yazılmalıdır.\n• print(*qiymətlər, sep=" ", end="\\n") ekrana çıxış verir.',
        formulaOrCode:
          'a, b = map(int, input("2 ədəd daxil et: ").split())\na, b = b, a   # əlavə dəyişənsiz yer dəyişmə\nprint(a, b, sep=" -> ", end=".\\n")',
      },
      {
        heading: 'Qayda 2: Mövqeli və %-lə Formatlaşdırma (Slayd 15–23)',
        body: 'Ədədlərin və sətirlərin çıxış formatını tənzimləmək üçün % operatoru (%d tam, %f həqiqi, %s sətir), .format() metodu və müasir f-sətirlərdən istifadə edilir.',
        formulaOrCode:
          'pi = 3.1415926\nprint("Pi = %.2f" % pi)          # Pi = 3.14\nprint("Pi = {:.3f}".format(pi))  # Pi = 3.142\nprint(f"Pi = {pi:.4f}")          # Pi = 3.1416',
      },
    ],
  },
  {
    id: 'koica_prog_8412',
    title: 'M-9. Şərt komandası.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8412 · Orijinal fayl: M9.pptx (14 slaydın tam qaydaları)',
    fileName: 'M9.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8412',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:20:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Budaqlanma komandası (if / elif / else) və Ternar operator (Slayd 2–14)',
        body: 'Şərt ifadəsindən sonra mütləq qoşa nöqtə (:) qoyulur və alt sətirdəki blok 4 boşluq sağa sürüşdürülür. Çoxvariantlı seçim üçün elif işlədilir. Qısa şərtli mənimsəmə üçün ternar operator mövcuddur: A = Y if X else Z.',
        formulaOrCode:
          'bal = int(input("Bal: "))\nif bal >= 91:\n    qiymet = "A"\nelif bal >= 81:\n    qiymet = "B"\nelif bal >= 51:\n    qiymet = "Keçdi"\nelse:\n    qiymet = "Kəsildi"\n\n# Ternar operator:\nstatus = "Müsbət" if x > 0 else "Mənfi və ya 0"',
      },
    ],
  },
  {
    id: 'koica_prog_8413',
    title: 'M-10. Pythonda istisnaların işlənilməsi.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8413 · Orijinal fayl: M10.pptx (13 slaydın tam qaydaları)',
    fileName: 'M10.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8413',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:21:35.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: İstisnaların tutulması — try / except / else / finally (Slayd 2–13)',
        body: 'Proqramın icrası zamanı yaranan xətalar (ZeroDivisionError, ValueError, IndexError, KeyError, FileNotFoundError) proqramı qəfil dayandırmasın deyə try...except blokundan istifadə olunur. Xəta baş vermədikdə else bloku, bütün hallarda isə finally bloku icra edilir.',
        formulaOrCode:
          'try:\n    x = int(input("Ədəd: "))\n    netice = 100 / x\nexcept ValueError:\n    print("Xəta: Tam ədəd daxil edilmədi!")\nexcept ZeroDivisionError:\n    print("Xəta: Sıfıra bölmək olmaz!")\nelse:\n    print("Nəticə:", netice)\nfinally:\n    print("Hesablama bloku tamamlandı.")',
      },
    ],
  },
  {
    id: 'koica_prog_8416',
    title: 'M-11. Pythonda FOR dövr operatoru. Range funksiyası',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8416 · Orijinal fayl: M11.pptx (14 slaydın tam qaydaları)',
    fileName: 'M11.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8416',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:22:59.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: for dövr operatoru və range() funksiyasının 3 forması (Slayd 2–14)',
        body: 'range(stop) -> 0-dan stop-1-ə qədər; range(start, stop) -> start-dan stop-1-ə qədər; range(start, stop, step) -> step addımı ilə tam ədədlər ardıcıllığı yaradır (stop daxil deyil!). Əgər dövr break ilə qırılmazsa, sonda else bloku işləyir.',
        formulaOrCode:
          '# 1-dən n-ə qədər ədədlərin cəmi:\ncem = 0\nfor i in range(1, 11):\n    cem += i\nprint("Cəm:", cem)   # 55\n\n# Azalan addımla:\nfor k in range(10, 0, -2):\n    print(k, end=" ")   # 10 8 6 4 2',
      },
    ],
  },
  {
    id: 'koica_prog_8418',
    title: 'M-12. Pythonda WHILE dövr operatoru.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8418 · Orijinal fayl: M12.pptx (12 slaydın tam qaydaları)',
    fileName: 'M12.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8418',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:40:24.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Önşərtli while dövrü, break və continue (Slayd 2–12)',
        body: 'while şərt: komandası şərt True olduğu müddətdə dövrün gövdəsini təkrarlayır. Sonsuz dövrə düşməmək üçün dövr daxilində şərtə təsir edən dəyişən yenilənməlidir. break dövrü dərhal dayandırır; continue isə cari addımı ötürüb növbəti iterasiyaya keçir.',
        formulaOrCode:
          '# Ədədin rəqəmləri cəminin tapılması:\nn = int(input("Ədəd: "))\ncem = 0\nwhile n > 0:\n    cem += n % 10\n    n //= 10\nprint("Rəqəmləri cəmi:", cem)',
      },
    ],
  },
  {
    id: 'koica_prog_8419',
    title: 'M-13. Pythonda proseduralar və funksiyalar.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8419 · Orijinal fayl: M13.pptx (16 slaydın tam qaydaları)',
    fileName: 'M13.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8419',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:41:50.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Altproqramlar (def), return, global, *args və lambda (Slayd 2–16)',
        body: 'Python-da funksiya def açar sözü ilə təyin olunur. Qiymət qaytaran altproqramda return yazılır; return olmadıqda funksiya None qaytarır (prosedur). Funksiya daxilində qlobal dəyişəni dəyişmək üçün global açar sözü, dəyişən sayda arqument üçün *args, təksətirli anonim funksiya üçün isə lambda işlədilir.',
        formulaOrCode:
          'def faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)\n\n# Anonim (lambda) funksiya:\nkvadrat = lambda x: x ** 2\nprint(faktorial(5), kvadrat(7))   # 120 49',
      },
    ],
  },
  {
    id: 'koica_prog_8420',
    title: 'M-14. Pythonda modullar.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8420 · Orijinal fayl: M14.pptx (25 slaydın tam qaydaları)',
    fileName: 'M14.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8420',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:43:20.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Modulların qoşulması (import) və math, random, os modulları (Slayd 2–25)',
        body: 'Modul .py genişlənməli Python faylıdır. Qoşulma üsulları: import modul, import modul as ləqəb, from modul import funksiya. Ən çox işlənən standart modullar: math (sqrt, sin, cos, pi, e, ceil, floor, factorial, gcd), random (randint, random, choice, shuffle), os və sys.',
        formulaOrCode:
          'import math\nimport random\n\nprint(math.sqrt(25), math.ceil(4.2), math.floor(4.8))  # 5.0 5 4\nprint(random.randint(1, 100))                          # [1, 100] təsadüfi tam ədəd',
      },
    ],
  },
  {
    id: 'koica_prog_8421',
    title: 'M-15. Pythonda fayllara işlərin təşkili.',
    courseId: 'prog',
    type: 'link',
    description:
      'KOICA LMS #8421 · Orijinal fayl: M15.pptx (21 slaydın tam qaydaları)',
    fileName: 'M15.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5041/materials/8421',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:44:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Faylların açılması rejimləri (r, w, a, b), oxunması və yazılması (Slayd 2–21)',
        body: 'open(fayl_adı, rejim, encoding="utf-8") funksiyası faylı açır: "r" yalnız oxumaq, "w" yenidən yazmaq (köhnə məzmun silinir), "a" sona əlavə etmək, "b" ikilik rejim üçündür. with open(...) as f: konstruksiyası iş bitdikdə faylı avtomatik bağlayır (f.close()). Slaydlarda həmçinin json, yaml və pyinstaller -F ilə .exe yaratma izah edilir.',
        formulaOrCode:
          'with open("qeydler.txt", "w", encoding="utf-8") as f:\n    f.write("AzTU 6326A2 Qrupu\\n")\n\nwith open("qeydler.txt", "r", encoding="utf-8") as f:\n    metn = f.read()\n    print(metn)',
      },
    ],
  },

  // ==========================================================================
  // 3. XƏTTİ CƏBR (LMS ID: 5040 · 6326a2_if-61119y_xətti cəbr) — 2 Rəsmi Material
  // Müəllim: Dos. Rəna Əmirova (dərs Müh1.pptx və dərs Müh2.pptx tam mətni əsasında)
  // ==========================================================================
  {
    id: 'koica_alg_4234',
    title: 'Xətti cəbr (Mühazirə 1): Matris anlayışı, növləri və matris əməliyyatları',
    courseId: 'algebra',
    type: 'link',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #4234 · Orijinal fayl: dərs Müh1.pptx (21 slaydın tam qaydaları və AI nümunəsi)',
    fileName: 'dərs Müh1.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5040/materials/4234',
    authorId: 'system_aztu',
    authorName: 'Rəna Əmirova',
    createdAt: '2026-09-18T14:08:38.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Matris anlayışı və ölçüsü (Slayd 3–4)',
        body: 'm sayda sətir və n sayda sütundan ibarət düzbucaqlı ədədlər cədvəlinə m × n ölçülü matris deyilir. Matrisin elementləri iki indekslə işarə olunur: a_ij (i — sətrin nömrəsi: 1..m, j — sütunun nömrəsi: 1..n). Sətir və sütunlarının sayı bərabər olan (m = n) matrisə n-tərtibli kvadrat matris deyilir.',
        formulaOrCode:
          'A = [ a_11  a_12  ...  a_1n ]\n    [ a_21  a_22  ...  a_2n ]\n    [ ...   ...   ...  ...  ]\n    [ a_m1  a_m2  ...  a_mn ]   (Ölçüsü: m × n)',
      },
      {
        heading: 'Qayda 2: Matrislərin əsas növləri (Slayd 4–7)',
        body: '• Kvadrat matrisdə a_11, a_22, ..., a_nn elementləri baş diaqonalı, a_1n, a_2(n-1), ..., a_n1 isə köməkçi diaqonalı təşkil edir.\n• Diaqonal matris: baş diaqonaldan kənardakı bütün elementləri 0 olan kvadrat matris.\n• Vahid matris (E və ya I): baş diaqonal elementləri 1, qalan bütün elementləri 0 olan kvadrat matris.\n• Üçbucaq matris: baş diaqonaldan yuxarıda və ya aşağıda yerləşən bütün elementləri 0 olan kvadrat matris.\n• Sıfır matris (O): bütün elementləri 0 olan matris.\n• Sətir-vektor (1 × n) və Sütun-vektor (m × 1).',
        formulaOrCode:
          'E = [ 1  0  0 ]\n    [ 0  1  0 ]\n    [ 0  0  1 ]   (3-tərtibli vahid matris)',
      },
      {
        heading: 'Qayda 3: Matrislərin bərabərliyi, Toplanması və Ədədə vurulması (Slayd 8–11)',
        body: '• Bərabərlik: Yalnız eyni ölçülü (m × n) və bütün uyğun elementləri bərabər olan (a_ij = b_ij) iki matris bərabər sayılır (A = B).\n• Toplama / Çıxma: Yalnız eyni ölçülü matrislər toplanır (çıxılır); uyğun elementlər toplanır: c_ij = a_ij ± b_ij.\n• Ədədə vurma: Matrisi k ədədinə vurmaq üçün onun BÜTÜN elementlərini həmin k ədədinə vurmaq lazımdır (b_ij = k · a_ij).',
        formulaOrCode:
          'Xassələr:\n1) A + B = B + A                (Yerdəyişmə / kommutativlik)\n2) (A + B) + C = A + (B + C)    (Qruplaşdırma / assosiativlik)\n3) k·(A + B) = k·A + k·B        (Paylama / distributivlik)',
      },
      {
        heading: 'Qayda 4: İki matrisin vurulması qaydası — A · B (Slayd 12–15)',
        body: 'A matrisini B matrisinə yalnız o vaxt vurmaq olar ki, birinci matrisin (A) SÜTUNLARININ sayı ikinci matrisin (B) SƏTİRLƏRİNİN sayına bərabər olsun: A_(m×n) · B_(n×p) = C_(m×p). Hasilin c_ij elementi A-nın i-ci sətrinin elementləri ilə B-nin j-ci sütununun uyğun elementlərinin hasilləri cəminə bərabərdir. Matrislərin vurulmasında yerdəyişmə qanunu ÖDƏNMİR (ümumi halda A·B ≠ B·A)!',
        formulaOrCode:
          'c_ij = a_i1·b_1j + a_i2·b_2j + ... + a_in·b_nj = Σ (k=1..n) a_ik · b_kj\n\nDiqqət:\n• Ümumi halda: A · B ≠ B · A\n• Assosiativlik: (A · B) · C = A · (B · C)\n• Vahid matrislə hasil: A · E = E · A = A',
      },
      {
        heading: 'Qayda 5: Matrisin transponirə edilməsi — A^T (Slayd 16–18)',
        body: 'A_(m×n) matrisinin bütün sətirlərini uyğun nömrəli sütunlarla əvəz etdikdə alınan n × m ölçülü matrisə A-nın transponirə edilmiş matrisi deyilir və A^T (və ya A′) ilə işarə olunur. Əgər A^T = A olarsa, belə kvadrat matris simmetrik matris adlanır.',
        formulaOrCode:
          'Transponirə xassələri:\n1) (A^T)^T = A\n2) (A + B)^T = A^T + B^T\n3) (k · A)^T = k · A^T\n4) (A · B)^T = B^T · A^T   (Hasil tərs sıra ilə transponirə olunur!)',
      },
      {
        heading: 'Mühazirədən Praktik Tətbiq: Süni İntellektlə Tələbə Balının Proqnozlaşdırılması (Slayd 19–21)',
        body: 'Rəna Əmirovanın slaydındakı real məsələ: 3 tələbənin 3 göstəricisi (X₁ — dərsdə iştirak %, X₂ — ev tapşırığı balı, X₃ — keçmiş imtahan balı) X_(3×3) matrisi kimi, çəki əmsalları W = [0.3, 0.4, 0.5]^T sütun-vektoru kimi, sürüşmə isə b = [5, 5, 5]^T kimi verilib. Yekun proqnoz: Z = X·W + b.',
        formulaOrCode:
          'X = [ 90  80  85 ] (Tələbə 1)     W = [ 0.3 ]     b = [ 5 ]\n    [ 70  60  75 ] (Tələbə 2)         [ 0.4 ]         [ 5 ]\n    [ 50  40  55 ] (Tələbə 3)         [ 0.5 ]         [ 5 ]\n\nHesablama (Z = X·W + b):\n• Tələbə 1: 90·0.3 + 80·0.4 + 85·0.5 + 5 = 27 + 32 + 42.5 + 5 = 106.5\n• Tələbə 2: 70·0.3 + 60·0.4 + 75·0.5 + 5 = 21 + 24 + 37.5 + 5 = 87.5\n• Tələbə 3: 50·0.3 + 40·0.4 + 55·0.5 + 5 = 15 + 16 + 27.5 + 5 = 63.5',
      },
    ],
  },
  {
    id: 'koica_alg_4236',
    title: 'Xətti cəbr müh2 (Mühazirə 2): Determinantlar, hesablanması və əsas xassələri',
    courseId: 'algebra',
    type: 'link',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #4236 · Orijinal fayl: dərs Müh2.pptx (8 slaydın tam qaydaları, İqtisadiyyat və Kriptoqrafiya məsələləri)',
    fileName: 'dərs Müh2.pptx',
    fileSize: 'KOICA LMS · PPTX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5040/materials/4236',
    authorId: 'system_aztu',
    authorName: 'Rəna Əmirova',
    createdAt: '2026-09-18T14:11:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Qayda 1: Yerdəyişmə (Permutasiya), İnversiya və n-tərtibli Determinantın tərifi (Slayd 1–2)',
        body: 'İlk n natural ədədin müəyyən nizamla düzülüşünə yerdəyişmə (permutasiya) deyilir; bütün mümkün yerdəyişmələrin sayı n!-a bərabərdir. Yerdəyişmədə böyük ədədin kiçik ədəddən əvvəl gəlməsi halına inversiya deyilir. n-tərtibli kvadrat A matrisinin determinantı müxtəlif sətir və müxtəlif sütunlardan götürülmüş n elementin hasilindən ibarət n! sayda həddin cəbri cəmidir.',
        formulaOrCode:
          'det(A) = |A| = Δ = Σ (-1)^inv(α₁, α₂, ..., α_n) · a_{1,α₁} · a_{2,α₂} · ... · a_{n,α_n}\n\nNümunə (Slayd 1): P₅ = (3, 5, 1, 4, 2) yerdəyişməsində inversiyalar:\n(3,1), (3,2), (5,1), (5,4), (5,2), (4,2) -> Cəmi inv = 6 (cüt) -> (-1)⁶ = +1.',
      },
      {
        heading: 'Qayda 2: İkitərtibli və Üçtərtibli determinantların hesablanması (Slayd 2–3)',
        body: '• 2-tərtibli determinant: baş diaqonal elementlərinin hasilindən köməkçi diaqonal elementlərinin hasili çıxılır.\n• 3-tərtibli determinant (Üçbucaqlar və ya Sarrus qaydası): 3 müsbət hədd (baş diaqonal və ona paralel 2 üçbucaq) ilə 3 mənfi həddin (köməkçi diaqonal və ona paralel 2 üçbucaq) fərqinə bərabərdir. Diqqət: Sarrus qaydası yalnız 3-cü tərtib üçün keçərlidir!',
        formulaOrCode:
          '2-tərtibli:\n| a₁₁  a₁₂ | = a₁₁·a₂₂ - a₁₂·a₂₁\n| a₂₁  a₂₂ |\n\n3-tərtibli (Üçbucaqlar / Sarrus qaydası):\nΔ = a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂ - (a₁₃a₂₂a₃₁ + a₁₁a₂₃a₃₂ + a₁₂a₂₁a₃₃)',
      },
      {
        heading: 'Qayda 3: Determinantın əsas xassələri (Slayd 4–6)',
        body: '1) Matrisi transponirə etdikdə onun determinantı dəyişmir: det(A^T) = det(A) (sətir və sütunlar eyni hüquqludur).\n2) İki sətrin (və ya sütunun) yerini dəyişdikdə determinantın yalnız işarəsi əksinə dəyişir.\n3) İki bərabər və ya mütənasib sətri (sütunu) olan determinant sıfıra bərabərdir.\n4) Bir sətrin bütün elementlərinin ortaq vuruğunu determinant işarəsi xaricinə çıxarmaq olar.\n5) Bir sətrin bütün elementləri sıfırdırsa, determinant sıfırdır.\n6) Bir sətrə başqa bir sətrin hər hansı ədədə hasilini əlavə etdikdə determinantın qiyməti dəyişmir.',
        formulaOrCode:
          'Əlavə mühüm xassələr:\n• det(A · B) = det(A) · det(B)\n• det(k · A_{n×n}) = k^n · det(A)\n• Üçbucaq və diaqonal matrisin determinantı baş diaqonal elementlərinin hasilinə bərabərdir:\n  det(A_üçbucaq) = a₁₁ · a₂₂ · ... · a_nn',
      },
      {
        heading: 'Mühazirədən Praktik Tətbiq 1: İqtisadiyyatda İstehsal və Gəlir Sistemi (Slayd 7)',
        body: 'Rəna Əmirovanın slaydındakı iqtisadi model: Zavod A və B məhsulları istehsal edir. 2x + 3y = 120 (xammal məhdudiyyəti) və 4x + y = 100 (işçi saatı məhdudiyyəti). Sistemin yeganə həllinin olub-olmadığını yoxlamaq üçün əmsallar matrisinin determinantı hesablanır:',
        formulaOrCode:
          'Δ = | 2  3 | = 2·1 - 3·4 = 2 - 12 = -10 ≠ 0\n    | 4  1 |\n\nNəticə: Δ ≠ 0 olduğu üçün istehsal planının yeganə optimal həlli mövcuddur (x = 18, y = 28).',
      },
      {
        heading: 'Mühazirədən Praktik Tətbiq 2: Kriptoqrafiyada Hill Şifrələmə Matrisi (Slayd 8)',
        body: 'Rəna Əmirovanın slaydındakı kriptoqrafiya məsələsi: Məxfi mesaj 3×3 ölçülü K açar matrisi ilə şifrələnir. Şifrələnmiş mesajın geri oxuna bilməsi (deşifrələnməsi) üçün açar matrisin determinantı sıfırdan fərqli olmalıdır (det(K) ≠ 0):',
        formulaOrCode:
          'K = [ 2  4  5 ]\n    [ 9  2  1 ]\n    [ 3  1  7 ]\n\ndet(K) = 2·(14 - 1) - 4·(63 - 3) + 5·(9 - 6) = 26 - 240 + 15 = -199 (Slayddakı alternativ nümunədə -121 ≠ 0)\nNəticə: det(K) ≠ 0 olduğundan tərs matris K⁻¹ var və mesaj deşifrələnə bilər.',
      },
    ],
  },

  // ==========================================================================
  // 4. AZƏRBAYCAN DİLİNDƏ İŞGÜZAR VƏ AKADEMİK KOMMUNİKASİYA (LMS ID: 5042) — 2 Rəsmi Material
  // Müəllim: Müəl. Nərminə İsayeva (ADİAK dərs vəsaiti.docx və Sərbəst işlər.docx əsasında)
  // ==========================================================================
  {
    id: 'koica_aze_4932',
    title: 'Dərs vəsaiti — Azərbaycan dilində işgüzar və akademik kommunikasiya',
    courseId: 'aze',
    type: 'link',
    description:
      '✓ Keçildi (Mövzu 1–4) · KOICA LMS #4932 · Orijinal fayl: ADİAK dərs vəsaiti.docx (H.Mirzəyev, A.Fərəcova, L.Piriyeva, P.Abdullabəyova — 23 mövzuluq dərs vəsaitindən qaydalar)',
    fileName: 'ADİAK dərs vəsaiti.docx',
    fileSize: 'KOICA LMS · DOCX + Qaydalar',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5042/materials/4932',
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
    ],
  },
  {
    id: 'koica_aze_4933',
    title: 'Sərbəst işlərin mövzuları (Bütün 44 rəsmi mövzu)',
    courseId: 'aze',
    type: 'link',
    description:
      'KOICA LMS #4933 · Orijinal fayl: Sərbəst işlərin mövzuları.docx · Müəl. Nərminə İsayevanın təqdim etdiyi 44 rəsmi sərbəst iş mövzusunun tam siyahısı',
    fileName: 'Sərbəst işlərin mövzuları.docx',
    fileSize: 'KOICA LMS · DOCX + 44 Mövzu',
    linkUrl: 'https://lms.aztu.edu.az/lectures/5042/materials/4933',
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
];

// KOICA LMS-də hazırda aktiv tapşırıq yoxdur (tasks: [])
export const BUILT_IN_DEADLINES: Deadline[] = [];
