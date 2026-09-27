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
      '✓ Keçildi (1-ci həftə) · KOICA LMS #3824 · Orijinal fayl: YENİ-qr.6326 a1,a2-1-İRƏLİLƏMƏ və FIRLANMA HƏRƏKƏTİ..pptx (0-dan izahlı qaydalar, düstur lüğəti, həll nümunələri və R2 PDF-i)',
    fileName: 'koica-muh1-dinamika.pdf',
    fileSize: '3.6 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh1-dinamika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:03.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Kinematika: Sürət və Təcil Törəmə ilə Necə Tapılır? (Slayd 2–7)',
        intuition:
          'Məktəbdə sürəti sadəcə S/t kimi öyrənirdik, çünki sürət sabit idi. Universitet fizikasında isə cismin sürəti hər saniyə dəyişir! Ona görə də cismin koordinatının zamana görə 1-ci törəməsi bizə ani sürəti (v), 2-ci törəməsi isə ani təcili (a) verir. Əgər maşın döngəyə girirsə, onun iki təcili yaranır: qaz/əyləc pedalı sürətin qiymətini dəyişir (toxunan təcil a_τ), sükanı döndərmək isə sürətin istiqamətini dəyişir (normal/mərkəzəqaçma təcili a_n).',
        body: 'Cismin fəzada yeri x(t), y(t), z(t) tənlikləri ilə verilir. Ani sürət tapmaq üçün koordinatdan zamana görə törəmə alırıq. Əyrilxətli hərəkətdə tam təcil (a) iki perpendikulyar hissədən ibarətdir: toxunan təcil (a_τ) və normal təcil (a_n). Fırlanma hərəkətində isə adi məsafəni dönmə bucağı (φ), adi sürəti isə bucaq sürəti (ω) əvəz edir.',
        formulaOrCode:
          'v(t) = dx/dt   (ani sürət — koordinatın 1-ci törəməsi)\na_τ = dv/dt    (toxunan təcil — sürətin 1-ci törəməsi)\na_n = v² / R   (normal təcil — əyrilik radiusundan asılıdır)\na_tam = √(a_τ² + a_n²)   (tam təcil — Pifaqor teoremi ilə)\nFırlanma əlaqəsi: ω = dφ/dt,   ε = dω/dt,   v = ω · R,   a_n = ω² · R',
        symbols: [
          'x(t), r(t) — cismin t anındakı koordinatı və ya radius-vektoru (metr, m)',
          'v(t) = dx/dt — ani xətti sürət: koordinatın zamana görə törəməsi (m/san)',
          'a_τ = dv/dt — toxunan (tangensial) təcil: sürətin neçə m/san artıb-azaldığını göstərir (m/san²)',
          'a_n = v²/R — normal (mərkəzəqaçma) təcil: döngədə istiqamətin nə qədər kəskin dəyişdiyini göstərir (m/san²)',
          'R — əyrinin (və ya çevrənin) radiusu (m)',
          'φ (fi) — dönmə bucağı (radian, rad); ω (omeqa) — bucaq sürəti (rad/san); ε (epsilon) — bucaq təcili (rad/san²)',
        ],
        steps: [
          'Məsələdə x(t) və ya φ(t) tənliyi verilibsə, t-yə görə 1 dəfə törəmə alıb v(t) və ya ω(t) sürətini tap.',
          'Aldığın sürət ifadəsindən t-yə görə daha 1 dəfə törəmə alıb a_τ(t) (və ya ε) təcilini tap.',
          'Verilmiş t zamanını aparıb v və a_τ ifadələrində yerinə yaz.',
          'Əyrilik radiusu R verilibsə, a_n = v²/R hesabla, sonra tam təcili a = √(a_τ² + a_n²) düsturu ilə tap.',
        ],
        example:
          'Məsələ: Maddi nöqtə R = 2 m radiuslu çevrə üzrə s(t) = 3t² + 2t (m) qanunu ilə hərəkət edir. t = 1 san anında onun sürətini, toxunan, normal və tam təcilini tapın.\n\nAddım 1 (Sürət): v(t) = ds/dt = (3t² + 2t)′ = 6t + 2.\nt = 1 san olduqda: v(1) = 6·1 + 2 = 8 m/san.\n\nAddım 2 (Toxunan təcil): a_τ = dv/dt = (6t + 2)′ = 6 m/san².\n\nAddım 3 (Normal təcil): a_n = v² / R = 8² / 2 = 64 / 2 = 32 m/san².\n\nAddım 4 (Tam təcil): a_tam = √(a_τ² + a_n²) = √(6² + 32²) = √(36 + 1024) = √1060 ≈ 32.56 m/san².',
        warning:
          'Çevrə üzrə bərabərsürətli hərəkətdə (v = const) təcilin sıfır olduğunu düşünmə! v sabit olduqda yalnız a_τ = 0 olur, amma istiqamət dəyişdiyi üçün a_n = v²/R həmişə sıfırdan fərqlidir.',
      },
      {
        heading: '2. Nyuton Qanunları, İmpuls və İmpulsun Saxlanması (Slayd 8–14)',
        intuition:
          'İmpuls (p = m·v) cismin "hərəkət miqdarıdır" — yəni hərəkətdə olan cismi saxlamağın nə qədər çətin olduğunu göstərir. Ağır yük maşını yavaş getsə də (m böyükdür), güllə yüngül olsa da çox sürətli getdiyi üçün (v böyükdür) böyük impulsa malikdir. Nyutonun II qanunu əslində deyir ki: cismə qüvvə tətbiq etdikdə onun impulsu dəyişir (F = dp/dt).',
        body: 'Sükunətdə olan və ya düzxətli bərabərsürətli hərəkət edən hesablama sisteminə inersial sistem deyilir. Nyutonun II qanununa görə əvəzləyici qüvvə impulsun zamana görə törəməsinə bərabərdir. Əgər sistemə kənardan qüvvə təsir etmirsə (qapalı sistemdirsə), cisimlər bir-biri ilə toqquşsa belə onların impulslarının vektorial cəmi dəyişməz qalır.',
        formulaOrCode:
          'p = m · v   (cismin impulsu)\nF = dp/dt = m · a   (Nyutonun II qanununun diferensial forması)\nF · Δt = Δp = m·v₂ - m·v₁   (Qüvvə impulsu = Cisim impulsunun dəyişməsi)\nm₁·v₁ + m₂·v₂ = m₁·v₁′ + m₂·v₂′   (İmpulsun saxlanması qanunu)',
        symbols: [
          'p — impuls vektoru (kq·m/san)',
          'm — cismin kütləsi (kq)',
          'F — əvəzləyici qüvvə (Nyuton, N)',
          'dp/dt — impulsun zamana görə dəyişmə sürəti (törəməsi)',
          'v₁, v₂ — toqquşmadan əvvəlki sürətlər; v₁′, v₂′ — toqquşmadan sonrakı sürətlər',
        ],
        steps: [
          'Toqquşma məsələlərində əvvəlcə OX oxu seç (sağa doğru hərəkəti "+", sola doğru hərəkəti "−" götür).',
          'Toqquşmadan əvvəlki ümumi impulsu yaz: P_əvvəl = m₁v₁ + m₂v₂ (əks gedənin qarşısına mənfi qoy).',
          'Əgər cisimlər toqquşub yapışırsa (qeyri-elastik toqquşma), sonrakı impulsu (m₁ + m₂)·u kimi yaz və P_əvvəl = P_sonra bərabərliyindən u-nu tap.',
        ],
        example:
          'Məsələ: m₁ = 2 kq kütləli kürə v₁ = 5 m/san sürətlə sağa hərəkət edərək, qarşıdan v₂ = 3 m/san sürətlə sola gələn m₂ = 2 kq kütləli kürə ilə mütləq qeyri-elastik toqquşur (yapışırlar). Onların birlikdə son sürətini tapın.\n\nHəlli:\n1) OX oxunu sağa yönəldək: v₁ = +5 m/san, qarşıdan gəldiyi üçün v₂ = -3 m/san.\n2) İmpulsun saxlanması: m₁v₁ + m₂v₂ = (m₁ + m₂)·u\n3) 2·5 + 2·(-3) = (2 + 2)·u  ⇒  10 - 6 = 4u  ⇒  4 = 4u  ⇒  u = 1 m/san (sağa).',
        warning:
          'İmpuls vektorial kəmiyyətdir! Qarşı-qarşıya gələn iki cismin impulslarını toplayanda əks istiqamətdə gələn cismin sürətini mütləq MƏNFİ (-) işarəsi ilə götürməlisən.',
      },
      {
        heading: '3. Mexaniki İş, Güc, Kinetik və Potensial Enerji (Slayd 15–22)',
        intuition:
          'Fizikada "iş görmək" üçün qüvvə cismi yerindən tərpətməlidir. Əgər ağır şkafı bütün gücünlə itələyirsən, amma o yerindən tərpənmirsə (s = 0), mexaniki iş sıfırdır! Əgər qüvvə yol boyu dəyişirsə (məsələn, yayı dartdıqca dartmaq çətinləşir), onda işi adi vurma ilə yox, inteqralla hesablayırıq.',
        body: 'Sabit qüvvənin işi A = F·s·cos(α), dəyişən qüvvənin işi isə A = ∫ F(x) dx inteqralı ilə tapılır. Yalnız başlanğıc və son nöqtədən asılı olub yolun formasından asılı olmayan qüvvələrə konservativ qüvvələr (ağırlıq, elastiklik, elektrostatik qüvvə) deyilir. Konservativ qüvvə potensial enerjinin əks işarəli törəməsinə (qradientinə) bərabərdir.',
        formulaOrCode:
          'A = F · s · cos(α)   (sabit qüvvənin işi)   |   A = ∫(x₁..x₂) F(x) dx   (dəyişən qüvvənin işi)\nP = dA/dt = F · v · cos(α)   (ani güc)\nE_k = m·v² / 2   (irəliləmə kinetik enerjisi)\nE_p(ağırlıq) = m·g·h,   E_p(yay) = k·x² / 2,   F_x = -dE_p / dx\nTam enerjinin saxlanması: E_k1 + E_p1 = E_k2 + E_p2 = const',
        symbols: [
          'A — mexaniki iş (Coul, C); P — güc (Vatt, Vt)',
          'α — qüvvə vektoru ilə hərəkət istiqaməti arasındakı bucaq',
          'E_k — kinetik enerji (hərəkət enerjisi, C); E_p — potensial enerji (vəziyyət enerjisi, C)',
          'k — yayın sərtlik əmsalı (N/m); x — yayın uzanması və ya sıxılması (m)',
          'F_x = -dE_p/dx — potensial enerjidən koordinata görə törəmə alıb qarşısına "-" qoyduqda qüvvə alınır',
        ],
        steps: [
          'Əgər məsələdə E_p(x) potensial enerji funksiyası verilib qüvvə soruşulursa: x-ə görə törəmə al və işarəsini əksinə dəyiş (F_x = -dE_p/dx).',
          'Əgər F(x) dəyişən qüvvəsi verilib x₁-dən x₂-yə iş soruşulursa: F(x)-dən x₁..x₂ sərhədlərində müəyyən inteqral al.',
        ],
        example:
          'Məsələ: Cismə təsir edən potensial enerji E_p(x) = 4x² - 12x (C) qanunu ilə verilib. x = 2 m nöqtəsində cismə təsir edən qüvvəni və tarazlıq nöqtəsini tapın.\n\nHəlli:\n1) Qüvvə düsturu: F_x = -dE_p/dx = -(4x² - 12x)′ = -(8x - 12) = -8x + 12.\n2) x = 2 m nöqtəsində qüvvə: F_x(2) = -8·2 + 12 = -16 + 12 = -4 N.\n3) Tarazlıq nöqtəsində qüvvə sıfır olur (F_x = 0): -8x + 12 = 0 ⇒ x = 1.5 m.',
        warning:
          'Qüvvə hərəkətə perpendikulyardırsa (α = 90°), cos(90°) = 0 olduğu üçün həmin qüvvənin gördüyü iş SIFIRDIR (məsələn, üfüqi yolda ağırlıq və dayaq reaksiya qüvvəsi iş görmür).',
      },
      {
        heading: '4. Bərk Cismin Fırlanma Dinamikası, Ətalət Momenti və Şteyner Teoremi (Slayd 23–33)',
        intuition:
          'İrəliləmə hərəkətində cismin "tənbəllik" ölçüsü onun kütləsidir (m) — ağır cismi itələmək çətindir. Fırlanma hərəkətində isə təkcə kütlə yox, həmin kütlənin fırlanma oxundan nə qədər uzaqda yerləşdiyi də rol oynayır! Buna Ətalət Momenti (I = m·r²) deyilir. Məsələn, fiqurlu konkisürən qollarını yana açanda r böyüyür deyə I artır və o yavaş fırlanır; qollarını sinəsinə sıxanda r kiçilir, I azalır və o ildırım sürəti ilə fırlanır!',
        body: 'Fırlanma hərəkətində qüvvəni Qüvvə Momenti (M = F·d), kütləni Ətalət Momenti (I), Nyutonun II qanununu (F = m·a) isə fırlanmanın əsas tənliyi (M = I·ε) əvəz edir. Əgər fırlanma oxu cismin mərkəzindən yox, mərkəzdən d məsafədə kənardan keçirsə, Hüygens–Şteyner teoremi ilə mərkəzi ətalət momentinin üzərinə m·d² əlavə edirik.',
        formulaOrCode:
          'M = F · R · sin(α)   (qüvvə momenti, N·m)\nI = Σ m_i · r_i²   (nöqtəvi kütlələrin ətalət momenti, kq·m²)\nHüygens–Şteyner teoremi: I = I_mərkəz + m · d²\nStandart cisimlərin mərkəzi ətalət momentləri:\n• Nazik halqa / çənbər: I_c = m·R²\n• Bütöv disk / silindr: I_c = (1/2)·m·R²\n• Bütöv kürə: I_c = (2/5)·m·R²\n• Düz çubuq (ortasından): I_c = (1/12)·m·l²   |   (ucundan): I = (1/3)·m·l²\nFırlanma dinamikası: M = I · ε   |   İmpuls momenti: L = I · ω = const\nDiyirlənən təkərin tam kinetik enerjisi: E_k = m·v²/2 + I·ω²/2',
        symbols: [
          'M — fırladıcı qüvvə momenti (N·m)',
          'I — ətalət momenti: cismin fırlanmaya qarşı ətalət ölçüsü (kq·m²)',
          'I_c — cismin kütlə mərkəzindən keçən oxa nəzərən ətalət momenti',
          'd — yeni fırlanma oxu ilə kütlə mərkəzi arasındakı məsafə (m)',
          'L = I·ω — fırlanan cismin impuls momenti (xarici moment yoxdursa L dəyişmir)',
        ],
        steps: [
          'Cismin növünü müəyyən et (halqadır, bütöv diskdir, kürədir, yoxsa çubuqdur) və onun mərkəzi I_c düsturunu götür.',
          'Ox mərkəzdən keçirsə elə I = I_c qalır; əgər ox kənara d qədər sürüşübsə, Şteyner teoremi ilə I = I_c + m·d² hesabla.',
          'Diyirlənən cismin enerjisini taparkən həm irəliləmə (mv²/2), həm də fırlanma (Iω²/2) enerjisini topla və ω = v/R əvəzləməsini yerinə qoy.',
        ],
        example:
          'Məsələ: Kütləsi m = 4 kq, radiusu R = 0.5 m olan bütöv disk üfüqi səth üzrə sürüşmədən v = 3 m/san sürətlə diyirlənir. Onun tam kinetik enerjisini tapın.\n\nHəlli:\n1) Bütöv diskin ətalət momenti: I = (1/2)mR².\n2) Tam kinetik enerji: E_k = mv²/2 + Iω²/2.\n3) Sürüşmədən diyirləndiyi üçün ω = v/R. Onda Iω²/2 = (1/2)·((1/2)mR²)·(v/R)² = (1/4)mv².\n4) Yekun düstur: E_k = mv²/2 + mv²/4 = (3/4)mv² = (3/4) · 4 · 3² = 3 · 9 = 27 Coul.',
        warning:
          'Diyirlənən cismin (məsələn, təkərin və ya kürənin) kinetik enerjisini tapanda təkcə mv²/2 yazmaq imtahanda ən çox edilən səhvdir! Diyirlənən cisim həm irəliləyir, həm də fırlanır, ona görə mütləq Iω²/2 həddini də əlavə etməlisən.',
      },
    ],
  },
  {
    id: 'koica_phys_3825',
    title: 'Mühazirə-2: Molekulyar Fizika və Termodinamikanın əsasları (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #3825 · Orijinal fayl: YENİ-qr.6326a1,a2 - 2-Molekulyar Fizika və Termodinamikanın əsasları.pptx (0-dan izahlı qaydalar, düstur lüğəti, həll nümunələri və R2 PDF-i)',
    fileName: 'koica-muh2-termodinamika.pdf',
    fileSize: '1.9 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh2-termodinamika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:29:49.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. İdeal Qaz Qanunları, Molekulların 3 Xarakterik Sürəti və Barometrik Düstur (Slayd 2–12)',
        intuition:
          'Qabın içindəki qaz milyardlarla kiçik kürəcikdən (molekuldan) ibarətdir. Bu molekullar qabın divarlarına çırpılaraq Təzyiq (p) yaradır. Qazı qızdırdıqda (T artdıqda) molekullar daha sürətlə qaçır. Amma bütün molekulların sürəti eyni deyil — bəziləri toqquşub yavaşlayır, bəziləri sürətlənir. Ona görə də fizikada molekulların sürətini 3 cür ölçürük: ən çox rast gəlinən sürət (v_eht), orta hesab sürət (<v>) və enerjini təyin edən orta kvadratik sürət (v_kv).',
        body: 'İdeal qazın halı Mendeleyev–Klapeyron tənliyi (pV = νRT) ilə təsvir olunur. Maksvell paylanmasına görə molekulların sürətləri arasında həmişə v_eht < <v> < v_kv münasibəti doğrudur. Yerdən h hündürlüyə qalxdıqca atmosfer təzyiqinin azalması isə Barometrik düsturla hesablanır.',
        formulaOrCode:
          'p = n · k · T = (1/3) · n · m₀ · v_kv²   (MKN əsas tənliyi)\np · V = (m / M) · R · T = ν · R · T   (Mendeleyev–Klapeyron tənliyi)\nMolekulların 3 sürəti:\n1) Ən ehtimallı sürət:   v_eht = √(2RT / M)\n2) Orta ədədi sürət:     <v>   = √(8RT / (πM)) ≈ 1.13 · v_eht\n3) Orta kvadratik sürət: v_kv  = √(3RT / M)    ≈ 1.22 · v_eht\nBarometrik düstur: p(h) = p₀ · e^(-M·g·h / (R·T))',
        symbols: [
          'p — qazın təzyiqi (Paskal, Pa); V — həcm (m³); T — mütləq temperatur (Kelvin: T = t°C + 273)',
          'ν = m/M — maddə miqdarı (mol); m — qazın kütləsi (kq); M — molyar kütlə (kq/mol)',
          'R = 8.31 C/(mol·K) — universal qaz sabiti; k = 1.38×10⁻²³ C/K — Bolsman sabiti',
          'n = N/V — konsentrasiya (1 m³ həcmdəki molekulların sayı)',
          'm₀ — bir molekulun kütləsi (kq); h — hündürlük (m)',
        ],
        steps: [
          'Məsələdə temperatur Selsi (°C) ilə verilibsə, DƏRHAL üzərinə 273 gələrək Kelvinə (K) çevir!',
          'Molyar kütlə qram/mol verilibsə (məsələn, O₂ üçün 32 q/mol), onu 10⁻³-ə vurub kq/mol-a çevir (M = 0.032 kq/mol).',
          'Hansı sürət soruşulursa (ehtimallı → kökün altında 2, orta → 8/π, kvadratik → 3) uyğun düsturda yerinə yaz.',
        ],
        example:
          'Məsələ: t = 27°C temperaturda oksigen qazı (M = 32 q/mol = 0.032 kq/mol) molekullarının ən ehtimallı və orta kvadratik sürətini tapın (R = 8.31 C/(mol·K)).\n\nHəlli:\n1) Temperaturu Kelvinə çevirək: T = 27 + 273 = 300 K.\n2) Ən ehtimallı sürət: v_eht = √(2·R·T / M) = √(2 · 8.31 · 300 / 0.032) = √(4986 / 0.032) = √155812.5 ≈ 394.7 m/san.\n3) Orta kvadratik sürət: v_kv = √(3·R·T / M) = √(3 · 8.31 · 300 / 0.032) = √233718.75 ≈ 483.4 m/san.',
        warning:
          'Düsturlarda M molyar kütləni heç vaxt qramla (məs. 32) qoyma! BS vahidlər sistemində M mütləq kq/mol ilə (0.032) yazılmalıdır, əks halda cavabın ~31.6 dəfə səhv çıxacaq.',
      },
      {
        heading: '2. Sərbəstlik Dərəcələri (i), Daxili Enerji və İstilik Tutumları (Slayd 13–18)',
        intuition:
          'Sərbəstlik dərəcəsi (i) molekulun fəzada neçə müstəqil üsulla hərəkət edə bildiyini göstərir. Tək kürəcik (biratomlu qaz: He, Ne, Ar) yalnız 3 istiqamətdə (sağa-sola, irəli-geri, yuxarı-aşağı) gedə bilir, ona görə i = 3. İki kürəcikdən ibarət qantel (ikiatomlu qaz: H₂, O₂, N₂, hava) həm 3 istiqamətdə gedir, həm də 2 ox ətrafında fırlanır, ona görə i = 3 + 2 = 5. Üç və daha çox atomlu qeyri-xətti molekul (H₂O, CH₄) isə 3 ox ətrafında da fırlandığı üçün i = 3 + 3 = 6 olur!',
        body: 'Bolsmanın enerjinin bərabər paylanması teoreminə görə hər bir sərbəstlik dərəcəsinə orta hesabla (1/2)kT enerji düşür. Buradan qazın daxili enerjisi (U), sabit həcmdəki molyar istilik tutumu (C_V), sabit təzyiqdəki molyar istilik tutumu (C_P) və adiabat göstəricisi (γ) birbaşa i ədədi ilə tapılır.',
        formulaOrCode:
          'Bir molekulun orta enerjisi: <ε> = (i / 2) · k · T\nQazın daxili enerjisi: U = (i / 2) · ν · R · T = (i / 2) · p · V\nMolyar istilik tutumları:\n• C_V = (i / 2) · R   (sabit həcmdə)\n• C_P = C_V + R = ((i + 2) / 2) · R   (sabit təzyiqdə — Mayer düsturu)\nAdiabat göstəricisi (Puasson əmsalı): γ = C_P / C_V = (i + 2) / i',
        symbols: [
          'i — molekulun sərbəstlik dərəcələrinin sayı: biratomlu (He, Ar) → i = 3; ikiatomlu (O₂, N₂, hava) → i = 5; çoxatomlu (H₂O, CO₂ qeyri-xətti) → i = 6',
          'U — qazın daxili enerjisi (Coul, C)',
          'C_V — sabit həcmdə 1 mol qazı 1 K qızdırmaq üçün lazım olan istilik (C/(mol·K))',
          'C_P — sabit təzyiqdə 1 mol qazı 1 K qızdırmaq üçün lazım olan istilik (C/(mol·K))',
          'γ (qamma) — adiabat göstəricisi (biratomlu üçün 5/3 ≈ 1.67, ikiatomlu/hava üçün 7/5 = 1.40, çoxatomlu üçün 8/6 ≈ 1.33)',
        ],
        steps: [
          'Əvvəlcə məsələdə verilən qazın neçə atomlu olduğunu müəyyən et və i-ni yaz (məsələn, azot N₂ və ya hava deyirsə i = 5).',
          'C_V = (i/2)R, C_P = ((i+2)/2)R və γ = (i+2)/i düsturlarında i-ni yerinə qoy.',
        ],
        example:
          'Məsələ: ν = 2 mol ikiatomlu qazın (məsələn, oksigen O₂) temperaturu ΔT = 50 K artırıldıqda onun daxili enerjisinin dəyişməsini (ΔU) və adiabat göstəricisini (γ) tapın.\n\nHəlli:\n1) Oksigen (O₂) ikiatomlu olduğu üçün i = 5.\n2) ΔU = (i/2)·ν·R·ΔT = (5/2) · 2 · 8.31 · 50 = 5 · 415.5 = 2077.5 Coul.\n3) Adiabat göstəricisi: γ = (i + 2) / i = (5 + 2) / 5 = 7 / 5 = 1.4.',
        warning:
          'Məsələdə "hava" deyildikdə onun tərkibinin 99%-i N₂ və O₂ (ikiatomlu qazlar) olduğundan həmişə i = 5 və γ = 1.4 götürülür!',
      },
      {
        heading: '3. Termodinamikanın I və II Qanunları, 4 Proses, Karno Tsikli və Entropiya (Slayd 19–29)',
        intuition:
          'Termodinamikanın I qanunu sadəcə enerjinin saxlanmasıdır: qaza verdiyin istilik (Q) iki yerə xərclənir — qazın özünü qızdırmağa (daxili enerjini artırmağa, ΔU) və qazın genişlənərək porşeni itələməsinə (iş görməyə, A). Karno tsikli isə istilik mühərrikinin (məsələn, avtomobil mühərrikinin) aldığı istiliyin maksimum neçə faizini faydalı işə çevirə biləcəyini (FİƏ, η) göstərir.',
        body: 'Hər bir izoprosesdə bir parametr sabit qalır: izoxorda V=const (iş görülmür: A=0), izobarda p=const, izotermikdə T=const (daxili enerji dəyişmir: ΔU=0), adiabatik prosesdə isə kənardan istilik verilmir və alınmır (Q=0, Puasson tənliyi: pV^γ = const). Entropiya (S) sistemin nizamsızlıq ölçüsüdür.',
        formulaOrCode:
          'Termodinamikanın I qanunu: Q = ΔU + A   (diferensial formada: δQ = dU + p·dV)\n1) İzoxor (V = const):     A = 0,               Q = ΔU = (i/2)νRΔT\n2) İzobar (p = const):     A = p·ΔV = νRΔT,     Q = ((i+2)/2)νRΔT\n3) İzotermik (T = const):  ΔU = 0,              Q = A = νRT · ln(V₂ / V₁)\n4) Adiabatik (Q = 0):      p·V^γ = const,       A = -ΔU = (p₁V₁ - p₂V₂) / (γ - 1)\nKarno tsiklinin FİƏ-si:    η = (Q₁ - Q₂) / Q₁ = 1 - T₂ / T₁\nEntropiya dəyişməsi:       dS = δQ / T,         S = k · ln(W) (Bolsman düsturu)',
        symbols: [
          'Q — qaza verilən istilik miqdarı (C); ΔU — daxili enerjinin dəyişməsi (C); A — qazın gördüyü iş (C)',
          'T₁ — qızdırıcının temperaturu (K); T₂ — soyuducunun temperaturu (K); η (eta) — faydalı iş əmsalı',
          'Q₁ — qızdırıcıdan alınan istilik; Q₂ — soyuducuya verilən istilik',
          'S — entropiya (C/K); W — termodinamik ehtimal (mikrohalların sayı)',
        ],
        steps: [
          'Məsələdə hansı prosesin getdiyini tap (izoxor → A=0; izotermik → ΔU=0; adiabatik → Q=0; izobar → hər üçü var).',
          'Karno mühərriki məsələlərində T₁ və T₂-ni mütləq Kelvinə çevirib η = 1 - T₂/T₁ hesabla.',
        ],
        example:
          'Məsələ: İdeal istilik maşatında qızdırıcının temperaturu t₁ = 127°C, soyuducunun temperaturu t₂ = 27°C-dir. Mühərrik qızdırıcıdan Q₁ = 40 kC istilik alırsa, onun FİƏ-sini və gördüyü faydalı işi tapın.\n\nHəlli:\n1) Temperaturları Kelvinə çevirək: T₁ = 127 + 273 = 400 K; T₂ = 27 + 273 = 300 K.\n2) FİƏ: η = 1 - T₂ / T₁ = 1 - 300 / 400 = 1 - 0.75 = 0.25 (yəni 25%).\n3) Faydalı iş: A = η · Q₁ = 0.25 · 40 kC = 10 kC.',
        warning:
          'İzobar prosesdə qaza verilən Q istiliyinin hansı hissəsinin işə (A) sərf olunduğu soruşulanda: A / Q = νRΔT / (((i+2)/2)νRΔT) = 2 / (i + 2) qısa düsturundan istifadə et!',
      },
    ],
  },
  {
    id: 'koica_phys_3826',
    title: 'Mühazirə-3: Elektrostatika (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3826 · Orijinal fayl: YENİ-qr.6326a1,a2-3--ELEKTROSTATİKA.pptx (0-dan izahlı qaydalar, düstur lüğəti, həll nümunələri və R2 PDF-i)',
    fileName: 'koica-muh3-elektrostatika.pdf',
    fileSize: '5.0 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh3-elektrostatika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:30:56.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Kulon Qanunu, Sahə İntensivliyi (E) və Qauss Teoremi (Slayd 2–23)',
        intuition:
          'İki elektrik yükü bir-birinə toxunmadan necə təsir edir? Çünki hər bir yük öz ətrafında gözəgörünməz "Elektrik Sahəsi" yaradır. Sahənin gücü hər nöqtədə İntensivlik (E) adlanır — bu, həmin nöqtəyə qoyulmuş +1 Kulonluq sınaq yükünə təsir edən qüvvədir (E = F/q₀). Qauss teoremi isə deyir ki: hər hansı qapalı qutunun səthindən çıxan elektrik sahə xətlərinin ümumi sayı (seli) sadəcə qutunun içindəki yüklərin cəmindən asılıdır!',
        body: 'Nöqtəvi yüklər arasındakı qüvvə Kulon qanunu ilə tapılır. Əgər yük nöqtəvi deyilsə (məsələn, uzun tel, böyük lövhə və ya kürədirsə), onun yaratdığı E sahəsi Ostroqradski–Qauss teoremi ilə hesablanır.',
        formulaOrCode:
          'F = k · |q₁ · q₂| / (ε · r²),   burada k = 1 / (4πε₀) = 9×10⁹ N·m²/Kl²\nE = F / q₀ = k · |q| / (ε · r²)   (nöqtəvi yükün sahə intensivliyi, V/m)\nQauss teoremi: Φ_E = ∮ E · dS = (Σ q_daxili) / (ε₀ · ε)\nSimmetrik cisimlərin sahə intensivliyi:\n• Sonsuz yüklü müstəvi (lövhə): E = σ / (2 · ε₀ · ε)\n• İki əks yüklü paralel lövhə arası (kondensator): E = σ / (ε₀ · ε)\n• Sonsuz yüklü tel / silindr: E = λ / (2π · ε₀ · ε · r)\n• Yüklü kürə: içərisində (r < R) E = 0; xaricində (r ≥ R) E = k·q / (ε·r²)',
        symbols: [
          'q₁, q₂ — elektrik yükləri (Kulon, Kl); r — yüklər arasındakı məsafə (m)',
          'ε₀ = 8.85×10⁻¹² F/m — elektrik sabiti; ε — mühitin dielektrik nüfuzluğu (vakuum/hava üçün ε = 1)',
          'E — elektrik sahəsinin intensivliyi (N/Kl və ya V/m)',
          'λ = q/l — xətti yük sıxlığı (Kl/m); σ = q/S — səthi yük sıxlığı (Kl/m²); ρ = q/V — həcmi yük sıxlığı (Kl/m³)',
        ],
        steps: [
          'Yüklər mikrokulon (μKl) və ya nanokulon (nKl) verilibsə, 10⁻⁶ və ya 10⁻⁹-a vuraraq Kulona çevir.',
          'Birdən çox yük varsa, hər yükün həmin nöqtədə yaratdığı E₁, E₂ vektorlarını ayrı-ayrılıqda tap və istiqamətlərinə görə topla (superpozisiya prinsipi).',
        ],
        example:
          'Məsələ: Vakuumda (ε = 1) q = 4 nKl = 4×10⁻⁹ Kl nöqtəvi yükdən r = 0.2 m məsafədə elektrik sahəsinin intensivliyini tapın.\n\nHəlli:\nE = k · q / r² = (9×10⁹ · 4×10⁻⁹) / (0.2)² = 36 / 0.04 = 900 V/m.',
        warning:
          'Metal kürənin (və ya istənilən naqilin) daxilində elektrostatik sahə intensivliyi həmişə SIFIRDIR (E_daxili = 0), çünki bütün yüklər naqilin xarici səthinə yığılır!',
      },
      {
        heading: '2. Potensial (φ), Gərginlik (U), Kondensatorun Tutumu və Enerjisi (Slayd 24–40)',
        intuition:
          'İntensivlik (E) sahənin qüvvə xarakteristikasıdırsa, Potensial (φ) sahənin enerji xarakteristikasıdır (1 Kl yükün həmin nöqtədəki potensial enerjisi: φ = W_p / q). İki nöqtə arasındakı potensiallar fərqi Gərginlik (U = φ₁ - φ₂) adlanır — məhz bu fərq yükləri hərəkətə gətirir. Kondensator isə elektrik yükünü və enerjisini toplamaq üçün iki paralel metal lövhədən düzəldilmiş qurğudur.',
        body: 'Elektrostatik sahədə yükün hərəkəti zamanı görülən iş A = q(φ₁ - φ₂) = qU düsturu ilə tapılır. Bircins sahədə intensivlik gərginliklə E = U/d kimi əlaqələnir. Kondensatorun tutumu onun yükündən və ya gərginliyindən ASILI DEYİL, yalnız həndəsi ölçülərindən (lövhələrin S sahəsindən və d məsafəsindən) asılıdır.',
        formulaOrCode:
          'φ = W_p / q = k · q / (ε · r),   U = φ₁ - φ₂,   A = q · (φ₁ - φ₂) = q · U\nBircins sahədə: E = U / d   |   Ümumi halda: E_x = -dφ / dx\nKondensatorun tutumu: C = q / U = ε₀ · ε · S / d   (Farad, F)\nBirləşmələr: Paralel → C_üm = C₁ + C₂ ;   Ardıcıl → 1/C_üm = 1/C₁ + 1/C₂\nKondensatorun enerjisi: W = C·U² / 2 = q² / (2C) = q·U / 2\nSahənin enerji sıxlığı (1 m³ həcmdəki enerji): w = (1/2) · ε₀ · ε · E²',
        symbols: [
          'φ (fi) — potensial (Volt, V); U = φ₁ - φ₂ — potensiallar fərqi / gərginlik (V)',
          'C — elektrik tutumu (Farad, F; 1 μF = 10⁻⁶ F, 1 pF = 10⁻¹² F)',
          'S — kondensator lövhəsinin sahəsi (m²); d — lövhələr arasındakı məsafə (m)',
          'W — kondensatorun tam enerjisi (Coul, C); w — vahid həcmdəki enerji sıxlığı (C/m³)',
        ],
        steps: [
          'Kondensator məsələlərində əvvəlcə yoxla: kondensator mənbəyə qoşulu qalıb (onda U = const), yoxsa yüklənib mənbədən ayrılıb (onda q = const).',
          'U = const olduqda W = CU²/2 düsturunu, q = const olduqda isə W = q²/(2C) düsturunu işlət!',
        ],
        example:
          'Məsələ: Tutumu C = 20 μF = 20×10⁻⁶ F olan kondensator U = 100 V gərginliyə qədər yüklənmişdir. Onun topladığı yükü və enerjini tapın.\n\nHəlli:\n1) Yük: q = C · U = 20×10⁻⁶ · 100 = 2×10⁻³ Kl = 2 mKl.\n2) Enerji: W = C · U² / 2 = (20×10⁻⁶ · 100²) / 2 = 10×10⁻⁶ · 10000 = 0.1 Coul.',
        warning:
          'Kondensatorların birləşməsi müqavimətlərin TƏRSİNƏDİR! Paralel birləşdikdə tutumlar birbaşa toplanır (C = C₁ + C₂), ardıcıl birləşdikdə isə tərs qiymətləri toplanır (1/C = 1/C₁ + 1/C₂).',
      },
    ],
  },
  {
    id: 'koica_phys_3827',
    title: 'Mühazirə-4: Sabit elektrik cərəyanı (Ali Fizika)',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #3827 · Orijinal fayl: YENİ-qr.6326 a1,a2 -4--SABİT ELEKTRİK CƏRƏYANI.pptx (0-dan izahlı qaydalar, düstur lüğəti, həll nümunələri və R2 PDF-i)',
    fileName: 'koica-muh4-sabit-cereyan.pdf',
    fileSize: '4.3 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh4-sabit-cereyan.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-17T20:31:45.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Cərəyan Şiddəti (I), Cərəyan Sıxlığı (j), Müqavimət və Om Qanunları (Slayd 2–18)',
        intuition:
          'Elektrik cərəyanını su borusundan axan su kimi təsəvvür et: Gərginlik (U) suyu itələyən nasosun təzyiqidir, Cərəyan şiddəti (I) borudan saniyədə keçən suyun miqdarıdır, Müqavimət (R) isə borunun darlığıdır — boru nə qədər uzundursa (l) keçmək çətinləşir, nə qədər genişdirsə (S) keçmək asanlaşır (R = ρ·l/S). Universitetdə əlavə olaraq "diferensial Om qanunu" (j = γ·E) keçirilir: bu, bütöv naqil üçün yox, naqilin içindəki tək bir nöqtə üçün yazılmış Om qanunudur!',
        body: 'Naqilin en kəsiyindən vahid zamanda keçən yükə cərəyan şiddəti (I = dq/dt), vahid en kəsiyi sahəsinə düşən cərəyan şiddətinə isə cərəyan sıxlığı (j = I/S) deyilir. Om qanunu həm dövrə hissəsi üçün (I = U/R), həm tam qapalı dövrə üçün (I = ε/(R+r)), həm də diferensial (nöqtəvi) formada (j = γE) yazılır.',
        formulaOrCode:
          'I = dq / dt   (dəyişən cərəyan üçün),   I = q / t   (sabit cərəyan üçün, Amper, A)\nj = I / S = n · e · v_dreyf   (cərəyan sıxlığı, A/m²)\nNaqilin müqaviməti: R = ρ · l / S,   ρ(T) = ρ₀ · (1 + α·t)\nOm qanunları:\n1) Dövrə hissəsi üçün:      I = U / R\n2) Tam dövrə üçün:          I = ε / (R + r)\n3) Diferensial Om qanunu:   j = γ · E = E / ρ   (burada γ = 1/ρ xüsusi keçiricilikdir)',
        symbols: [
          'I — cərəyan şiddəti (Amper, A); j — cərəyan sıxlığı: 1 m² kəsikdən keçən cərəyan (A/m²)',
          'R — naqilin müqaviməti (Om, Ω); r — cərəyan mənbəyinin daxili müqaviməti (Ω)',
          'ρ (ro) — xüsusi müqavimət (Ω·m); γ = 1/ρ — xüsusi keçiricilik (Sm/m)',
          'l — naqilin uzunluğu (m); S — en kəsiyinin sahəsi (m²)',
          'ε — mənbəyin Elektrik Hərəkət Qüvvəsi — EHQ (Volt, V)',
        ],
        steps: [
          'Tam dövrə məsələsində xarici R və daxili r müqavimətləri toplayıb I = ε / (R + r) ilə dövrədəki cərəyanı tap.',
          'Mənbənin sıxaclarındakı gərginlik soruşularsa: U = I · R = ε - I · r düsturu ilə hesabla.',
        ],
        example:
          'Məsələ: EHQ-si ε = 12 V, daxili müqaviməti r = 1 Ω olan batareyaya R = 5 Ω xarici müqavimət qoşulmuşdur. Dövrədəki cərəyan şiddətini və xarici gərginliyi tapın.\n\nHəlli:\n1) Tam dövrə üçün Om qanunu: I = ε / (R + r) = 12 / (5 + 1) = 12 / 6 = 2 A.\n2) Xarici dövrədəki gərginlik: U = I · R = 2 · 5 = 10 V (qalan 2 V batareyanın daxilində düşür).',
        warning:
          'İnteqral Om qanunu (I = U/R) ilə diferensial Om qanununu (j = γE = E/ρ) qarışdırma! İmtahanda "Om qanununun diferensial forması" soruşulduqda mütləq j = γ·E yazılmalıdır.',
      },
      {
        heading: '2. Coul–Lens Qanunu və Budaqlanmış Dövrələr üçün Kirxhof Qaydaları (Slayd 19–31)',
        intuition:
          'Telefon və ya noutbuk işləyəndə niyə qızır? Çünki hərəkət edən elektronlar metalın atomları ilə toqquşub öz enerjilərini istiliyə çevirir — buna Coul–Lens qanunu deyilir. Bəs dövrə tək halqadan yox, çoxlu budaqlardan (tor şəklində) ibarətdirsə nə edirik? Onda Kirxhofun 2 sadə qaydasını işlədirik: 1) Düyünə nə qədər cərəyan girirsə, o qədər də çıxmalıdır; 2) Qapalı halqa boyu gərginlik düşgülərinin cəmi həmin halqadakı batareyaların EHQ-ləri cəminə bərabərdir.',
        body: 'Cərəyanın işi A = IUt, ayrılan istilik miqdarı Q = I²Rt (diferensial formada: vahid həcmdə ayrılan istilik gücü w = γE² = ρj²). Budaqlanmış dövrələri həll etmək üçün Kirxhofun I (düyün) və II (kontur) qaydalarından tənliklər sistemi qurulur.',
        formulaOrCode:
          'Cərəyanın işi və gücü: A = I · U · t,   P = I · U = I² · R = U² / R\nCoul–Lens qanunu (inteqral): Q = I² · R · t\nCoul–Lens qanunu (diferensial): w_ist = j · E = γ · E² = ρ · j²   (Vt/m³)\nKirxhofun I qaydası (düyün üçün):   Σ I_girən = Σ I_çıxan   (və ya Σ I_k = 0)\nKirxhofun II qaydası (kontur üçün): Σ (I_k · R_k) = Σ ε_k',
        symbols: [
          'Q — naqildə ayrılan istilik miqdarı (Coul, C); t — zaman (san)',
          'w_ist — vahid zamanda 1 m³ həcmdə ayrılan istilik gücü (Vt/m³)',
          'Σ I_k = 0 — düyün nöqtəsində görüşən cərəyanların cəbri cəmi',
          'Σ(I_k · R_k) — qapalı konturdakı gərginlik düşgülərinin cəbri cəmi',
        ],
        steps: [
          'Düyün nöqtəsinə daxil olan cərəyanları "+", çıxan cərəyanları "−" işarəsi ilə götürüb 0-a bərabər et.',
          'Kontur üçün dolanma istiqaməti (məsələn, saat əqrəbi) seç: dolanma ilə eyni gedən cərəyan və EHQ-ləri "+", əks gedənləri "−" yaz.',
        ],
        example:
          'Məsələ: Düyün nöqtəsinə I₁ = 3 A və I₂ = 5 A cərəyanları daxil olur, I₃ = 2 A və I₄ cərəyanları isə düyündən çıxır. I₄ cərəyanını tapın.\n\nHəlli:\nKirxhofun I qaydasına görə: I₁ + I₂ = I₃ + I₄  ⇒  3 + 5 = 2 + I₄  ⇒  I₄ = 6 A.',
        warning:
          'Ardıcıl birləşmədə bütün naqillərdə I eynidir, ona görə istiliyi Q = I²Rt ilə müqayisə et (R böyük olan çox qızır). Paralel birləşmədə isə U eynidir, ona görə Q = (U²/R)t ilə müqayisə et (R kiçik olan çox qızır!).',
      },
    ],
  },
  {
    id: 'koica_phys_muh5_8',
    title: 'Mühazirə 5–8: Elektromaqnetizm, Rəqslər, Dalğa Optikası, Kvant və Nüvə Fizikası (Ali Fizika Konspekti)',
    courseId: 'phys',
    type: 'file',
    description:
      'Semestrin II yarısı və Yekun İmtahan Mövzuları · Maqnit sahəsi, Rəqslər, İnterferensiya/Difraksiya, Fotoeffekt, Şrödinger tənliyi və Atom/Nüvə fizikası (0-dan izahlı qaydalar və R2 PDF-i)',
    fileName: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-20T12:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mühazirə 5: Maqnit Sahəsi, Elektromaqnit İnduksiyası və Rəqslər',
        intuition:
          'Sükunətdə olan yük yalnız elektrik sahəsi yaradır, amma yük hərəkət edəndə (cərəyan axanda) ətrafında həm də Maqnit Sahəsi (B) yaranır! Tərsi də doğrudur (Faradey kəşfi): əgər sarğacın içindən keçən maqnit sahəsini dəyişsən (maqnit yaxınlaşdırıb-uzaqlaşdırsan), sarğacda öz-özünə elektrik cərəyanı yaranır (ε_i = -dΦ/dt). Elektrik stansiyalarındakı bütün generatorlar məhz bu düsturla işləyir!',
        body: 'Cərəyanlı naqilə maqnit sahəsində Amper qüvvəsi (F_A = IBl sin α), tək hərəkət edən yükə isə Lorens qüvvəsi (F_L = qvB sin α) təsir edir. Maqnit selinin dəyişməsi induksiya EHQ-si yaradır. Mexaniki və elektromaqnit rəqsləri isə eyni ikitərtibli diferensial tənliklə təsvir olunur.',
        formulaOrCode:
          'Amper qüvvəsi: F_A = I · B · l · sin(α)   |   Lorens qüvvəsi: F_L = |q| · v · B · sin(α)\nMaqnit seli: Φ = B · S · cos(α) (Veber, Vb)   |   Faradey qanunu: ε_i = -dΦ / dt\nSarğacın maqnit enerjisi: W_m = L · I² / 2\nHarmonik rəqs tənliyi: d²x/dt² + ω₀²·x = 0  ⇒  x(t) = A · cos(ω₀t + φ₀)\nMəxsusi tezliklər: Yaylı: ω₀ = √(k/m) ;  Riyazi rəqqas: ω₀ = √(g/l) ;  Kontur (Tomson): T = 2π√(LC)\nSönən rəqs: x(t) = A₀ · e^(-βt) · cos(ωt + φ₀),   loqarifmik dekrement: δ = β·T = (1/n)·ln(A_k / A_{k+n})',
        symbols: [
          'B — maqnit induksiyası (Tesla, Tl); Φ — maqnit seli (Veber, Vb)',
          'L — sarğacın induktivliyi (Henri, Hn); C — kondensatorun tutumu (F)',
          'A — rəqsin amplitudu (maksimal uzaqlaşma, m); ω₀ — məxsusi dairəvi tezlik (rad/san)',
          'β — sönmə əmsalı (1/san); δ — loqarifmik sönmə dekrementi',
        ],
        steps: [
          'Φ(t) maqnit seli tənliyi verilib ε_i soruşulursa: Φ(t)-dən zamana görə törəmə al və işarəni dəyiş.',
          'Rəqs tənliyi x(t) = A cos(ωt + φ₀) verilibsə: cos-un qarşısındakı ədəd amplituddur (A), t-nin əmsalı dairəvi tezlikdir (ω), period isə T = 2π/ω düsturu ilə tapılır.',
        ],
        example:
          'Məsələ: Konturdan keçən maqnit seli Φ(t) = 6t² - 4t + 1 (Vb) qanunu ilə dəyişir. t = 2 san anında yaranan induksiya EHQ-sini tapın.\n\nHəlli:\n1) Faradey qanunu: ε_i = -dΦ/dt = -(6t² - 4t + 1)′ = -(12t - 4) = -12t + 4.\n2) t = 2 san qoyduqda: ε_i(2) = -12·2 + 4 = -20 V (modulu 20 V).',
        warning:
          'Lorens qüvvəsi həmişə sürətə perpendikulyar olduğu üçün (F_L ⊥ v) maqnit sahəsi yüklü zərrəciyin üzərində İŞ GÖRMÜR və onun kinetik enerjisini dəyişmir (yalnız trayektoriyanı əyərək çevrə üzrə fırladır: R = mv/(qB)).',
      },
      {
        heading: '2. Mühazirə 6: Dalğa Optikası — İnterferensiya, Difraksiya və Polyarizasiya',
        intuition:
          'İşıq həm də dalğadır! İki işıq dalğası görüşəndə bəzi yerlərdə bir-birini gücləndirir (işıqlı zolaq — maksimum), bəzi yerlərdə isə bir-birini söndürür (qaranlıq zolaq — minimum). Buna İnterferensiya deyilir (məsələn, sabun köpüyünün və ya suya dağılmış benzinin əlvan rənglərdə parlaması). İşığın çox dar yarıqdan keçərkən maneənin arxasına əyilməsinə isə Difraksiya deyilir.',
        body: 'İki koherent dalğanın görüşmə nəticəsi onların optik yollar fərqindən (Δ = n₂L₂ - n₁L₁) asılıdır: Δ tam sayda dalğa uzunluğuna (mλ) bərabərdirsə maksimum, tək sayda yarımdalğaya ((2m+1)λ/2) bərabərdirsə minimum alınır.',
        formulaOrCode:
          'Optik yollar fərqi: Δ = n₂·L₂ - n₁·L₁\nİnterferensiya maksimumu (işıqlı): Δ = m · λ          (m = 0, 1, 2, ...)\nİnterferensiya minimumu (qaranlıq): Δ = (2m + 1) · λ/2\nNyuton halqalarının radiusu (əks olunan işıqda qaranlıq): r_k = √(k · λ · R)\nDifraksiya qəfəsi: d · sin(φ) = m · λ   (burada d = 1 / N₀ qəfəs sabitidir)\nMalyus qanunu (polyarizasiya): I = I₀ · cos²(α)   |   Brüster qanunu: tg(i_B) = n₂₁',
        symbols: [
          'λ (lyambda) — işığın dalğa uzunluğu (metr; 1 nm = 10⁻⁹ m)',
          'n — mühitin sındırma əmsalı; Δ — optik yollar fərqi (m)',
          'd — difraksiya qəfəsinin periodu (qonşu yarıqlar arası məsafə, m); φ — difraksiya bucağı',
          'm (və ya k) — maksimumun tərtib nömrəsi (0, 1, 2...)',
          'I₀ — polyarizator üzərinə düşən xətti polyarlaşmış işığın intensivliyi; α — optik oxlar arasındakı bucaq',
        ],
        steps: [
          'Difraksiya qəfəsində 1 mm-də N₀ cizgi verilibsə, əvvəlcə qəfəs sabitini d = 1 mm / N₀ = 10⁻³ / N₀ (metr) tap.',
          'Sonra d · sin(φ) = m · λ düsturundan soruşulan kəmiyyəti hesabla (ən böyük tərtib üçün sin(φ) ≤ 1 götür: m_max = ⌊d/λ⌋).',
        ],
        example:
          'Məsələ: Periodu d = 2×10⁻⁶ m olan difraksiya qəfəsinə normal düşən işığın 1-ci tərtib maksimumu (m = 1) φ = 30° bucaq altında müşahidə olunur. İşığın dalğa uzunluğunu tapın.\n\nHəlli:\nd · sin(φ) = m · λ  ⇒  λ = d · sin(30°) / 1 = 2×10⁻⁶ · 0.5 = 10⁻⁶ m = 1000 nm.',
        warning:
          'Təbii işıq birinci polyarizatordan keçəndə onun intensivliyi tən yarıya düşür (I₀ = I_təbii / 2), yalnız bundan sonra ikinci analizatordan keçərkən Malyus qanunu (I = I₀ cos²α = (1/2)I_təbii cos²α) tətbiq olunur!',
      },
      {
        heading: '3. Mühazirə 7–8: Kvant Fizikası (Fotoeffekt, De-Broyl) və Atom/Nüvə Fizikası',
        intuition:
          'İşıq dalğa kimi yayılır, amma maddəyə dəyəndə özünü kiçik enerji paketləri — Fotonlar (ε = hν) kimi aparır! Metalın üzərinə işıq düşəndə bir foton öz enerjisini metalın içindəki elektrona verir: bu enerjinin bir hissəsi elektronu metaldan qoparmağa (çıxış işinə, A_çıx), qalanı isə elektronun uçub getməsinə (kinetik enerjiyə, E_k) sərf olunur. Bu, Eynşteynin Fotoeffekt qanunudur!',
        body: 'Plank hipotezinə görə fotonun enerjisi ε = hν = hc/λ, impulsu p = h/λ-dır. Eynşteyn tənliyi fotoeffekti, Bor postulatları hidrogen spektrini, kütlə defekti (Δm) və radioaktiv parçalanma qanunu isə nüvə fizikasını izah edir.',
        formulaOrCode:
          'Fotonun enerjisi və impulsu: ε = h · ν = h · c / λ,   p = h / λ\nEynşteynin fotoeffekt tənliyi: h · ν = A_çıxış + m·v_max² / 2 = A_çıxış + e · U_saxlayıcı\nDe-Broyl dalğa uzunluğu: λ = h / (m · v)\nHidrogen atomunun enerji səviyyələri: E_n = -13.6 eV / n²   (n = 1, 2, 3...)\nNüvənin kütlə defekti və rabitə enerjisi: Δm = Z·m_p + (A - Z)·m_n - M_nüvə,   E_rab = Δm · c²\nRadioaktiv parçalanma qanunu: N(t) = N₀ · 2^(-t / T) = N₀ · e^(-λt)',
        symbols: [
          'h = 6.63×10⁻³⁴ C·san — Plank sabiti; c = 3×10⁸ m/san — işıq sürəti; ν (nyu) — tezlik (Hs)',
          'A_çıxış — elektronun metaldan çıxış işi (C və ya eV; 1 eV = 1.6×10⁻¹⁹ C)',
          'U_saxlayıcı — fotoelektronları dayandıran saxlayıcı gərginlik (V)',
          'Z — nüvədəki protonların sayı (sıra nömrəsi); A — kütlə ədədi (proton + neytron); N = A - Z — neytron sayı',
          'T — yarımparçalanma periodu (nüvələrin yarısının parçalandığı müddət)',
        ],
        steps: [
          'Fotoeffekt məsələlərində enerjilər elektron-volt (eV) ilə verilibsə, hν = A_çıx + E_k düsturunu birbaşa eV ilə hesablaya bilərsən.',
          'Radioaktiv parçalanmada t müddətindən sonra qalan nüvələrin sayını N = N₀ / 2^(t/T) düsturu ilə, parçalanan nüvələrin sayını isə ΔN = N₀ - N ilə tap.',
        ],
        example:
          'Məsələ: Metalın üzərinə enerjisi ε = 5 eV olan fotonlar düşür. Elektronun metaldan çıxış işi A_çıx = 2 eV olarsa, qopan fotoelektronların maksimal kinetik enerjisini və saxlayıcı gərginliyi tapın.\n\nHəlli:\n1) Eynşteyn tənliyi: E_k(max) = ε - A_çıx = 5 eV - 2 eV = 3 eV.\n2) Saxlayıcı gərginlik: e·U_s = 3 eV ⇒ U_s = 3 V.',
        warning:
          'İşığın intensivliyini (parlaqlığını) artırdıqda qopan elektronların sürəti (E_k) ARTMAZ, yalnız saniyədə qopan elektronların sayı (doyma cərəyanı) artar! Sürət yalnız işığın tezliyindən (ν) asılıdır.',
      },
    ],
  },
  {
    id: 'koica_phys_4798',
    title: 'Lab N 1. Diskin və həlqənin ətalət momentinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      '✓ Cari Laboratoriya · KOICA LMS #4798 · Orijinal fayl: DİSKİN ƏTALƏT MOMENTİNİN TƏYİNİ.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab1-disk-etalet.pdf',
    fileSize: '0.4 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab1-disk-etalet.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:27:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №1: Bu təcrübədə nə edirik və necə hesablayırıq? (0-dan izah)',
        intuition:
          'Məqsədimiz dəmir diskin və həlqənin fırlanmaya qarşı ətalətini (I) iki üsulla tapıb tutuşdurmaqdır: 1) Xətkeş və tərəzi ilə ölçüb nəzəri düsturla hesablamaq; 2) İpin ucuna yük bağlayıb diski fırlatmaq və kompüterdəki bucaq təcilindən (α) təcrübi ətalət momentini tapmaq.',
        body: 'Şkivə sarınmış ipin ucundan m kütləli yük asıb buraxdıqda yük aşağı düşür və diski α bucaq təcili ilə fırladır. Kompüter ekranındakı ω(t) qrafikinin meyli bizə α bucaq təcilini verir.',
        formulaOrCode:
          '1) Təcrübi düstur (ipdəki yük və təcildən):\n   I_təcrübi = m · r · (g - r · α) / α\n2) Nəzəri düsturlar (tərəzi və ştangenpərgar ölçülərindən):\n   I_disk(nəzəri)  = (1/2) · M_disk · R²\n   I_həlqə(nəzəri) = (1/2) · M_həlqə · (R₁² + R₂²)',
        symbols: [
          'm — ipin ucundan asılan kiçik yükün kütləsi (kq); r — ipin sarındığı kiçik şkivin radiusu (m)',
          'α (alfa) — kompüter qrafikindən oxunan bucaq təcili (rad/san²); g = 9.81 m/san²',
          'M_disk, M_həlqə — diskin və həlqənin öz kütləsi (kq)',
          'R — diskin radiusu (m); R₁ və R₂ — həlqənin daxili və xarici radiusları (m)',
        ],
        steps: [
          'Tərəzi ilə diskin M_disk kütləsini, ştangenpərgarla R = D/2 radiusunu ölçüb I_nəzəri = 0.5·M·R² hesabla.',
          'Yükü buraxıb kompüterdə ω(t) düz xəttinin meylindən α bucaq təcilini qeyd et.',
          'I_təcrübi = m·r·(g - r·α)/α düsturu ilə təcrübi qiyməti tap və nəzəri qiymətlə müqayisə et.',
        ],
        example:
          'Nümunə: Diskin kütləsi M = 1.2 kq, radiusu R = 0.1 m olarsa:\nI_disk(nəzəri) = (1/2) · 1.2 · (0.1)² = 0.6 · 0.01 = 0.006 kq·m².',
      },
    ],
  },
  {
    id: 'koica_phys_4799',
    title: 'Lab. N 2. “Qazların molyar istilik tutumları nisbətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4799 · Orijinal fayl: QAZIN İSTİLİK TUTUMLARI.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab2-qaz-istilik.pdf',
    fileSize: '0.5 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab2-qaz-istilik.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:28:39.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №2: Hava üçün γ = C_P / C_V əmsalını necə tapırıq? (0-dan izah)',
        intuition:
          'Ağzı bağlı şüşə silindrin içindəki porşeni əlimizlə bir az aşağı basıb buraxsaq, içəridəki hava yay kimi sıxılıb-açılaraq porşeni yuxarı-aşağı rəqs etdirəcək. Bu rəqslər çox sürətli getdiyi üçün istilik kənara çıxa bilmir (adiabatik proses gedir). Porşenin rəqs periodunu (T) ölçməklə havanın adiabat göstəricisini (γ ≈ 1.4) tapırıq!',
        body: 'Adiabatik sıxılmada P·V^γ = const qanunundan porşenin rəqs periodu T = 2π√(mV/(γPS²)) çıxarılır. Buradan γ kəmiyyəti təyin edilir.',
        formulaOrCode:
          'Rəqs periodu: T = 2π · √(m · V / (γ · P · S²))\nİşçi hesablama düsturu: γ = C_P / C_V = (4 · π² · m · V) / (S² · P · T²)\nHava üçün nəzəri qiymət: γ_nəzəri = 7 / 5 = 1.40',
        symbols: [
          'γ = C_P / C_V — qazın molyar istilik tutumları nisbəti (adiabat göstəricisi)',
          'm — rəqs edən porşenin kütləsi (kq); S — silindrin en kəsiyinin sahəsi (m²)',
          'V = S · h — silindrdəki havanın həcmi (m³); P — atmosfer təzyiqi (~10⁵ Pa)',
          'T — bir tam rəqsin periodu (san)',
        ],
        steps: [
          'Porşeni müxtəlif h hündürlüklərində (9 sm, 8 sm ... 1 sm) saxlayıb rəqs periodu T-ni ölç.',
          'V = S·h həcmini və T periodunu işçi düsturda yerinə qoyub γ qiymətini hesabla və 1.40 ilə müqayisə et.',
        ],
      },
    ],
  },
  {
    id: 'koica_phys_4801',
    title: 'Lab. N3. “Naqillərin xüsusi müqavimətinin təyini”',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4801 · Orijinal fayl: NİXROM MƏFTİLİN XÜSUSİ.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab3-nixrom-muqavimet.pdf',
    fileSize: '0.2 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab3-nixrom-muqavimet.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:29:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №3: Nixrom məftilin xüsusi müqavimətini (ρ) necə ölçürük?',
        intuition:
          'Məftilin müqaviməti onun uzunluğundan və qalınlığından asılıdır (R = ρ·l/S). Amma məftilin hazırlandığı maddənin öz xassəsi olan "xüsusi müqavimət" (ρ) yalnız maddənin növündən (nixrom olmasından) asılıdır. Biz voltmetrlə U-nu, ampermetrlə I-ni, mikrometrlə məftilin d qalınlığını, xətkeşlə l uzunluğunu ölçüb ρ-nu tapırıq.',
        body: 'Om qanununa görə R = U/I və dairəvi məftilin kəsik sahəsi S = πd²/4 olduğundan, bu ikisini R = ρ·l/S düsturunda birləşdiririk.',
        formulaOrCode:
          'S = π · d² / 4,   R = U / I\nİşçi düstur: ρ = R · S / l = (π · d² · U) / (4 · l · I)\nNisbi xəta: ε_ρ = ΔU/U + ΔI/I + Δl/l + 2·(Δd/d)',
        symbols: [
          'ρ (ro) — nixromun xüsusi müqaviməti (≈ 1.1×10⁻⁶ Ω·m)',
          'd — məftilin mikrometrlə ölçülən diametri (m); l — məftilin aktiv uzunluğu (m)',
          'U — voltmetrin göstərişi (V); I — ampermetrin göstərişi (A)',
        ],
        steps: [
          'Mikrometrlə məftilin d diametrini ölç (millimetri 10⁻³-ə vurub metrə çevir).',
          'Xətkeşlə l uzunluğunu, cihazlardan U və I-ni oxu və ρ = πd²U/(4lI) düsturunda yerinə yaz.',
        ],
      },
    ],
  },
  {
    id: 'koica_phys_4802',
    title: 'Lab №4. Yerin maqnit sahəsinin induksiyasının üfüqi, şaquli toplananlarının və tam qiymətinin təyini.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4802 · Orijinal fayl: YERİN MAQNİT SAHƏSİNİN İNDUKSİYASININ ÜFÜQİ,.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab4-yer-maqnit.pdf',
    fileSize: '0.4 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab4-yer-maqnit.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:32:33.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №4: Yerin maqnit sahəsini və meyl bucağını necə ölçürük?',
        intuition:
          'Yer kürəsi nəhəng bir maqnitdir. Amma Yerin maqnit xətləri yer səthinə tam paralel deyil — müəyyən bir θ bucağı (maqnit meyl bucağı) altında yerə doğru əyilib. Ona görə də Yerin B_tam maqnit sahəsinin həm üfüqi (kompasın göstərdiyi B_üfüqi), həm də şaquli (B_şaquli) toplananı var.',
        body: 'Maqnit sensorunu əvvəlcə üfüqi müstəvidə fırladaraq B_üfüqi toplananını, sonra şaquli müstəvidə fırladaraq B_tam qiymətini ölçürük və düzbucaqlı üçbucaq həndəsəsi ilə θ meyl bucağını tapırıq.',
        formulaOrCode:
          'B_üfüqi = B_tam · cos(θ),   B_şaquli = B_tam · sin(θ)\nθ = arccos(B_üfüqi / B_tam),   B_tam = √(B_üfüqi² + B_şaquli²)',
        symbols: [
          'B_tam — Yerin tam maqnit induksiya vektoru (Qaus və ya mikroTesla)',
          'B_üfüqi, B_şaquli — maqnit sahəsinin üfüqi və şaquli toplananları',
          'θ (teta) — maqnit meyl bucağı (dərəcə)',
        ],
      },
    ],
  },
  {
    id: 'koica_phys_4804',
    title: 'Lab№5 Sönən elektromaqnit rəqslərinin öyrənilməsi.',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4804 · Orijinal fayl: RƏQS KONTURUNDA SÖNƏN ELEKTROMAQNİT RƏQSLƏRİNİN tədqiqi.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab5-sonen-reqsler.pdf',
    fileSize: '0.6 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab5-sonen-reqsler.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:33:46.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №5: RLC konturunda sönən rəqslər, Dekrement və Keyfiyyətlilik',
        intuition:
          'Kondensator (C) və sarğacdan (L) ibarət dövrədə elektrik yükü irəli-geri rəqs edir. Amma naqillərin R müqaviməti enerjini istiliyə çevirdiyi üçün rəqsin hündürlüyü (amplitudu) get-gedə azalır və sönür. Ossilloqraf ekranında qonşu təpələrin hündürlüklərini (U_k) ölçərək rəqsin nə qədər tez söndüyünü (loqarifmik dekrement δ) tapırıq.',
        body: 'n sayda perioddan sonra gərginlik amplitudu U_k-dan U_{k+n}-ə düşürsə, loqarifmik sönmə dekrementi δ = (1/n)ln(U_k/U_{k+n}), konturun keyfiyyətliliyi isə Q = π/δ düsturu ilə hesablanır.',
        formulaOrCode:
          'Loqarifmik dekrement: δ = (1 / n) · ln(U_k / U_{k+n}) = R · √(C / L) · π\nKonturun keyfiyyətliliyi: Q = π / δ = (1 / R) · √(L / C)\nBöhran müqaviməti (rəqsin tam kəsildiyi hədd): R_böhran = 2 · √(L / C)',
        symbols: [
          'U_k — k-cı rəqs təpəsinin (pikinin) ekrandakı hündürlüyü (damalarla və ya Voltla)',
          'U_{k+n} — n period sonrakı rəqs təpəsinin hündürlüyü',
          'δ (delta) — loqarifmik sönmə dekrementi; Q — konturun keyfiyyətlilik əmsalı',
          'L — sarğacın induktivliyi (Hn); C — kondensatorun tutumu (F); R — müqavimət (Ω)',
        ],
      },
    ],
  },
  {
    id: 'koica_phys_4805',
    title: 'Lab. N6. İşığın interferensiyası. Nyuton halqaları vasitəsilə işığın dalğa uzunluğunun təyini',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4805 · Orijinal fayl: İşıgın interferensiyası.Nyuton halqaları vasitəsilə işıgın dalfa uzunlugunun təyini..docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab6-nyuton-halqalari.pdf',
    fileSize: '0.7 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab6-nyuton-halqalari.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:39:10.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №6: Nyuton halqaları ilə işığın dalğa uzunluğunu (λ) necə tapırıq?',
        intuition:
          'Altı düz şüşənin üstünə altı bir az qabarıq linza qoyduqda, onların arasında nazik hava qatı qalır. Yuxarıdan işıq saldıqda, hava qatının alt və üst səthindən qayıdan şüalar toqquşub iç-içə işıqlı və qaranlıq dairələr — "Nyuton halqaları" yaradır. Mikroskopla bu halqaların radiuslarını ölçüb işığın dalğa uzunluğunu (λ) hesablayırıq!',
        body: 'Əyrilik radiusu R olan linzada k-cı qaranlıq halqanın radiusu r_k = √(k·λ·R) olur. İki müxtəlif (m-ci və k-cı) qaranlıq halqanın radiuslarını (və ya diametrlərini) ölçməklə λ tapılır.',
        formulaOrCode:
          'k-cı qaranlıq halqanın radiusu: r_k = √(k · λ · R)\nİşığın dalğa uzunluğu (radiuslarla):    λ = (r_m² - r_k²) / ((m - k) · R)\nİşığın dalğa uzunluğu (diametrlərlə):  λ = (D_m² - D_k²) / (4 · (m - k) · R)',
        symbols: [
          'λ — işığın dalğa uzunluğu (m; qırmızı işıq üçün ~650 nm, yaşıl üçün ~530 nm)',
          'R — linzanın əyrilik radiusu (m, qurğunun pasportunda verilir)',
          'm, k — seçilmiş iki qaranlıq halqanın sıra nömrələri (məsələn, m = 5, k = 2)',
          'r_m, r_k — həmin halqaların radiusları; D_m, D_k — diametrləri (m)',
        ],
      },
    ],
  },
  {
    id: 'koica_phys_4806',
    title: 'Lab. N8. Atom spektrinin öyrənilməsi',
    courseId: 'phys',
    type: 'file',
    description:
      'KOICA LMS #4806 · Orijinal fayl: ATOM SPEKTİRLƏRİNİN OYRƏNİLMƏSİ.docx (0-dan izahlı laboratoriya bələdçisi və R2 PDF-i)',
    fileName: 'koica-lab8-atom-spektri.pdf',
    fileSize: '0.9 MB · PDF + Lab İzahı',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/koica-lab8-atom-spektri.pdf`,
    authorId: 'system_aztu',
    authorName: 'Sürəyya Məmmədova',
    createdAt: '2026-09-19T22:40:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: 'Laboratoriya №8: Hidrogenin Balmer xətlərindən Ridberq sabitini (R) necə tapırıq?',
        intuition:
          'Hidrogen qazı olan borudan yüksək gərginlik buraxdıqda, atomların içindəki elektronlar yuxarı enerji pillələrinə (m = 3, 4, 5) qalxır və dərhal 2-ci pilləyə (n = 2) düşərkən rəngli işıq (qırmızı, mavi-yaşıl, bənövşəyi xətlər) şüalandırır. Spektrometrlə bu rənglərin dalğa uzunluğunu (λ) ölçüb Ridberq sabitini hesablayırıq.',
        body: 'Görünən oblastdakı Balmer seriyası üçün Bor–Ridberq düsturu 1/λ = R·(1/2² - 1/m²) şəklindədir.',
        formulaOrCode:
          'Balmer–Ridberq düsturu: 1 / λ = R · (1 / 2² - 1 / m²)   (burada m = 3, 4, 5, 6)\nRidberq sabitinin hesablanması: R = 4 · m² / (λ · (m² - 4)) ≈ 1.097 × 10⁷ m⁻¹',
        symbols: [
          'λ — spektrometrdə ölçülən spektr xəttinin dalğa uzunluğu (m)',
          'n = 2 — görünən işıq (Balmer seriyası) üçün aşağı enerji səviyyəsi',
          'm — yuxarı enerji səviyyəsinin nömrəsi: qırmızı H_α xətti üçün m = 3, mavi-yaşıl H_β üçün m = 4, bənövşəyi H_γ üçün m = 5',
          'R — Ridberq sabiti (m⁻¹)',
        ],
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
      'KOICA LMS #6677 · Orijinal fayl: F.M.Əzimov Pythonda proqramlaşdırmanın əsasları.pdf · Bütün semestr üzrə əsas dərslik (0-dan izahlı bələdçi + PDF)',
    fileName: 'prog-derslik-ezimov.pdf',
    fileSize: '2.2 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/prog-derslik-ezimov.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-22T23:04:50.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Python-a 0-dan Giriş: Dəyişən nədir və Python-da kod necə yazılır?',
        intuition:
          'Dəyişəni (variable) üzərinə ad yazılmış bir qutu kimi təsəvvür et: məsələn, x = 15 yazdıqda yaddaşda 15 ədədini saxlayıb adına "x" deyirik. Digər dillərdən (C++, Java) fərqli olaraq Python-da əvvəlcədən "bu qutuya tam ədəd qoyacağam" (int x) deməyə ehtiyac yoxdur — Python qutunun içinə nə qoysan tipini özü başa düşür! Həmçinin Python-da nöqtəli vergül (;) və fiqurlu mötərizə ({}) yoxdur; hansı sətirlərin hansı bloka aid olduğunu sətir başındakı 4 boşluq (Tab) müəyyən edir.',
        body: 'Dos. Fizuli Əzimovun bu dərsliyi semestr boyu keçəcəyimiz bütün 15 mühazirəni əhatə edir. Python-da hər bir məlumatın öz tipi (Verilənlər Tipi) var və bu tipləri bilmək proqramlaşdırmanın təməlidir.',
        formulaOrCode:
          'x = 15              # int     -> Tam ədəd\ny = 3.14            # float   -> Kəsr (həqiqi) ədəd\nz = 3 + 5j          # complex -> Kompleks ədəd\ns = "AzTU 6326A2"   # str     -> Mətn (sətir)\nb = True            # bool    -> Məntiqi tip (Doğru / Yalan)\narr = [10, 20, 30]  # list    -> Dəyişdirilə bilən siyahı\ntup = (10, 20, 30)  # tuple   -> Dəyişdirilə bilməyən kortej\nst = {10, 20, 30}   # set     -> Təkrarsız elementlər çoxluğu\nd = {"ad": "Elcan"} # dict    -> Açar:Qiymət lüğəti',
        symbols: [
          '= (tək bərabər) — mənimsəmə operatoru: sağdakı qiyməti hesablayıb soldakı dəyişənə yazır',
          '== (qoşa bərabər) — müqayisə operatoru: iki tərəfin bərabər olub-olmadığını yoxlayır (True/False)',
          '# (diyez) — şərh işarəsi: Python bu işarədən sonra yazılanları oxumur (izah üçündür)',
          'type(x) — x dəyişəninin hansı tipdə olduğunu ekrana çıxaran funksiya',
        ],
        steps: [
          'İstifadəçidən məlumat almaq üçün input() funksiyasını yaz.',
          'Əgər ədəd daxil edilirsə, onu int(input()) və ya float(input()) ilə ədədə çevir.',
          'Hesablamanı aparıb nəticəni print() funksiyası ilə ekrana çıxar.',
        ],
        example:
          '# İstifadəçidən iki ədəd alıb cəmini tapan ən sadə proqram:\na = int(input("Birinci ədədi daxil et: "))   # Məsələn: 12\nb = int(input("İkinci ədədi daxil et: "))    # Məsələn: 8\ncem = a + b\nprint("Cəm =", cem)                          # Ekrana çıxır: Cəm = 20',
        warning:
          'input() funksiyası klaviaturadan nə yazsan onu MƏTN (str) kimi qəbul edir! Əgər int() yazmadan "12" + "8" toplasan, Python onları ədəd kimi yox, yanaşı mətn kimi birləşdirib "128" çıxaracaq!',
      },
    ],
  },
  {
    id: 'koica_prog_8403',
    title: 'M-1. Proqramlaşdırmaya giriş. Alqoritm anlayışı. Python proqramlaşdırma dili ilə tanışlıq.',
    courseId: 'prog',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #8403 · Orijinal fayl: M1.pptx (0-dan izahlı qaydalar və PDF-i)',
    fileName: 'm1.pdf',
    fileSize: '1.6 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m1.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:10:46.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Alqoritm nədir? Kompilyator və İnterpretator nə iş görür? (Slayd 2–9)',
        intuition:
          'Kompüterin prosessoru yalnız 0 və 1-ləri (maşın kodunu) başa düşür. Biz isə kodu insan dilinə yaxın olan Python və ya C++ dilində yazırıq. Bəs kompüter bizim yazdığımızı necə anlayır? Orada tərcüməçi proqram — "Translyator" işə düşür! Translyatorun 2 növü var: Kompilyator (məsələn, C++) bütün kitabı əvvəldən axıra tərcümə edib hazır .exe faylı verir; İnterpretator (məsələn, Python) isə sinxron tərcüməçi kimi kodu sətir-sətir oxuyub həmin andaca icra edir.',
        body: 'Alqoritm — qarşıya qoyulmuş məsələni həll etmək üçün sonlu sayda dəqiq addımlar ardıcıllığıdır. Proqramlaşdırma dilləri 4 nəslə bölünür: 1) Maşın kodları (0 və 1); 2) Assembler; 3) Yüksək səviyyəli dillər (Fortran, Pascal, C); 4) Obyekt-yönümlü müasir dillər (Python, C++, Java, C#). Python 1991-ci ildə Qvido van Rossum tərəfindən yaradılıb.',
        formulaOrCode:
          'Kompilyator (C, C++, Pascal):   Mənbə kodu (.cpp) ──[Bütöv Tərcümə]──► Maşın kodu (.exe)\nİnterpretator (Python, PHP):    Mənbə kodu (.py)  ──[Sətir-sətir Oxuma]──► Birbaşa İcra',
        symbols: [
          'Alqoritm — məsələnin həllinə aparan dəqiq, sonlu təlimatlar ardıcıllığı',
          'Translyator — proqramlaşdırma dilini maşın koduna (0 və 1-lərə) çevirən proqram',
          'Kompilyator — kodu bütövlükdə maşın dilinə çevirib .exe yaradan translyator',
          'İnterpretator — kodu sətir-sətir oxuyub dərhal yerinə yetirən translyator (Python)',
        ],
        warning:
          'Kollokviumda ən çox düşən sual: "Python kompilyatordur, yoxsa interpretator?" Cavab: Python İNTERPRETATOR tipli dildir (sətir-sətir icra olunur).',
      },
      {
        heading: '2. Python IDLE Mühitinin 2 İş Rejimi: İnteraktiv və Proqram Rejimi (Slayd 13–21)',
        intuition:
          'Python-u kompüterə yazanda onunla birlikdə IDLE adlı proqram gəlir. IDLE-ni açanda ekranda >>> işarəsi görünür — bu, kalkulyator kimi işləyən "İnteraktiv rejimdir": nə yazsan Enter basan kimi cavabı verir, amma bağlayanda silinir. Böyük proqram yazmaq üçün isə File -> New File (Ctrl+N) basıb təmiz vərəq açırıq — bu, "Proqram (Redaktor) rejimidir". Orada kodu yazıb .py faylı kimi yadda saxlayırıq və F5 basaraq işə salırıq.',
        body: 'İnteraktiv rejimdə print() yazmadan da hesab ifadəsinin nəticəsi ekrana çıxır. Proqram (.py) rejimində isə nəticəni ekranda görmək üçün mütləq print() funksiyası yazılmalıdır.',
        formulaOrCode:
          '# 1) İnteraktiv rejim (>>> dəvət sətri var, Enter basan kimi cavab çıxır):\n>>> 2 + 3 * 2\n8\n>>> (2 + 3) * 2\n10\n\n# 2) Proqram rejimi (Ctrl+N ilə açılır, Ctrl+S ilə saxlanılır, F5 ilə işə düşür):\nprint("Salam, AzTU 6326A2!")\nprint(2 + 3 * 2)',
        steps: [
          'Kiçik bir düsturu tez yoxlamaq istəyirsənsə, birbaşa >>> qarşısında yazıb Enter bas.',
          'Ev tapşırığı və ya laboratoriya kodu yazırsansa: Ctrl+N bas → kodu yaz → Ctrl+S ilə yadda saxla → F5 basıb çalışdır.',
        ],
      },
    ],
  },
  {
    id: 'koica_prog_8404',
    title: 'M-2,3. Ədədi və məntiqi tipli verilənlər və onlar üzərində əməllər. Məntiqi operatorlar. Ədədi tipli verilənlər üçün riyazi funksiyalar.',
    courseId: 'prog',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #8404 · Orijinal fayl: M2-3.pptx (0-dan izahlı qaydalar, mənfi ədədlərin bölünməsi və PDF-i)',
    fileName: 'm2-3.pdf',
    fileSize: '2.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m2-3.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:12:32.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Ədədi Tiplər (int, float, complex) və 7 Hesab Əməli (Slayd 3–10)',
        intuition:
          'Python-da 3 növ ədəd var: tam ədəd (int: 5, -12), nöqtəli kəsr ədəd (float: 3.14, 1.2e3 = 1200.0) və kompleks ədəd (complex: 3+5j). Hesab əməllərində tələbələrin ən çox çaşdığı 3 bölmə işarəsi var: adi bölmə (/) həmişə kəsr qaytarır; qoşa xətt (//) bölmənin yalnız TAM hissəsini götürür; faiz işarəsi (%) isə bölmədən qalan QALIĞI tapır!',
        body: 'Müsbət ədədlərdə tam bölmə və qalıq çox sadədir (17 // 5 = 3, 17 % 5 = 2). Lakin MƏNFİ ədədlərdə Python // əməlini həmişə SOLA (kiçik tam ədədə doğru) yuvarlaqlaşdırır, qalığı isə r = a - (a // b) * b düsturu ilə hesablayır.',
        formulaOrCode:
          'a + b    # Toplama:           7 + 2  -> 9\na - b    # Çıxma:             7 - 2  -> 5\na * b    # Vurma:             7 * 2  -> 14\na / b    # Adi bölmə (float): 7 / 2  -> 3.5   (8 / 2 -> 4.0)\na ** b   # Qüvvət:            2 ** 3 -> 8     (9 ** 0.5 -> 3.0)\na // b   # Tam bölmə:         7 // 2 -> 3     |  -7 // 2 -> -4\na % b    # Qalıq:             7 % 2  -> 1     |  -9 % 4  -> 3   |  9 % -4 -> -3',
        symbols: [
          '/ — adi bölmə (cavabı həmişə nöqtəli float tipində verir: 6 / 2 = 3.0)',
          '// — tam bölmə: nəticəni ədəd oxunda özündən soldakı ən yaxın tam ədədə yuvarlaqlaşdırır',
          '% — qalığı tapma: r = a - (a // b) * b (qalığın işarəsi həmişə bölənin işarəsi ilə eyni olur!)',
          '** — qüvvətə yüksəltmə (sağdan sola hesablanır: 2 ** 3 ** 2 = 2 ** 9 = 512)',
          '1.2e3 — eksponensial yazılış: 1.2 × 10³ = 1200.0; 1.2e-3 = 1.2 × 10⁻³ = 0.0012',
        ],
        steps: [
          'Mənfi ədədin tam bölünməsi soruşulanda (məsələn, -9 // 4): əvvəlcə adi böl (-9 / 4 = -2.25).',
          'Ədəd oxunda -2.25-dən SOLDA (daha kiçik) dayanan tam ədədi götür: bu -2 deyil, -3-dür! Deməli -9 // 4 = -3.',
          'Qalığı tapmaq üçün (-9 % 4): r = a - (a // b) * b = -9 - (-3) * 4 = -9 + 12 = 3.',
        ],
        example:
          'İmtahan sualı: -17 // 5 və -17 % 5 ifadələrinin qiymətini tapın.\n\nAddım 1: -17 / 5 = -3.4.\nAddım 2: -3.4-dən kiçik (soldakı) ən yaxın tam ədəd -4-dür ⇒ -17 // 5 = -4.\nAddım 3: Qalıq = -17 - (-4) * 5 = -17 + 20 = 3 ⇒ -17 % 5 = 3.\n\nBəs 17 // -5 və 17 % -5 nədir?\nAddım 1: 17 / -5 = -3.4 ⇒ tam hissə yenə -4-dür (17 // -5 = -4).\nAddım 2: Qalıq = 17 - (-4) * (-5) = 17 - 20 = -3 (17 % -5 = -3).',
        warning:
          'Kollokviumda mənfi ədədin qalığını tapanda kalkulyator kimi -17 % 5 = -2 YAZMA! Python-da bölən müsbətdirsə (+5), qalıq da mütləq müsbət (+3) çıxır!',
      },
      {
        heading: '2. Standart Riyazi Funksiyalar və Say Sistemləri (bin, oct, hex, int) (Slayd 11–14)',
        intuition:
          'Bəzi riyazi əməllər üçün heç bir kitabxana (import math) qoşmağa ehtiyac yoxdur — onlar Python-un öz içində hazır gəlir (abs, round, divmod, pow, max, min). Həmçinin kompüter mühəndisliyində ədədləri ikilik (0b), səkkizlik (0o) və onaltılıq (0x) say sistemlərinə çevirmək üçün bin(), oct(), hex() funksiyaları işlədilir.',
        body: 'divmod(a, b) funksiyası eyni anda həm tam bölməni, həm də qalığı (a//b, a%b) qaytarır. int("sətir", əsas) isə istənilən say sistemindəki ədədi onluq say sisteminə çevirir.',
        formulaOrCode:
          'abs(-15)          # 15 (mütləq qiymət / modul)\nround(2.567, 2)   # 2.57 (vergüldən sonra 2 rəqəmə qədər yuvarlaqlaşdırır)\ndivmod(19, 4)     # (4, 3) -> çünki 19 // 4 = 4 və 19 % 4 = 3\npow(2, 4, 3)      # 1      -> (2 ** 4) % 3 = 16 % 3 = 1\n\n# Say sistemləri:\nbin(19)           # "0b10011" (19-un ikilik yazılışı)\noct(19)           # "0o23"    (19-un səkkizlik yazılışı)\nhex(19)           # "0x13"    (19-un onaltılıq yazılışı)\nint("10011", 2)   # 19        (ikilik "10011"-i onluğa çevirir)',
        symbols: [
          '0b... — ikilik (binary, əsas 2) say sistemi prefiksi',
          '0o... — səkkizlik (octal, əsas 8) say sistemi prefiksi',
          '0x... — onaltılıq (hexadecimal, əsas 16: 0..9 və a=10, b=11, c=12, d=13, e=14, f=15) prefiksi',
        ],
      },
      {
        heading: '3. Məntiqi Operatorlar (not, and, or) və Bit Əməliyyatları (&, |, ^, ~, <<, >>) (Slayd 16–25)',
        intuition:
          'Məntiqi operatorlar (and, or, not) şərtləri birləşdirir (True və ya False qaytarır). Bit əməliyyatları isə ədədləri əvvəlcə beyində ikilik 0 və 1-lərə çevirir, sonra alt-alta sütunlarla bit-bit hesablayır! Məsələn, << 2 əməliyyatı ikilik ədədin sonuna 2 dənə sıfır əlavə edir ki, bu da ədədi 2² = 4-ə vurmaq deməkdir.',
        body: 'Məntiqi əməllərdə icra ardıcıllığı: əvvəlcə not, sonra and, ən sonda or yerinə yetirilir. Bit əməliyyatlarında isə hər bir bit cütü üzərində: & (hər ikisi 1-dirsə 1), | (ən azı biri 1-dirsə 1), ^ (fərqlidirlərsə 1, eynidirlərsə 0) qaydası işləyir.',
        formulaOrCode:
          '# Məntiqi operatorlar:\nnot True          # False\nTrue and False    # False (and: hər ikisi True olmalıdır)\nTrue or False     # True  (or:  biri True olsa kifayətdir)\n\n# Bit əməliyyatları (19 = 10011₂ və 11 = 01011₂ üzərində):\n19 & 11   # 3    (10011 & 01011 = 00011₂ = 3)\n19 | 11   # 27   (10011 | 01011 = 11011₂ = 27)\n19 ^ 11   # 24   (10011 ^ 01011 = 11000₂ = 24)\n~19       # -20  (Düstur: ~x = -(x + 1))\n11 << 2   # 44   (Sola sürüşdürmə:  x << k = x * (2 ** k) = 11 * 4 = 44)\n51 >> 2   # 12   (Sağa sürüşdürmə: x >> k = x // (2 ** k) = 51 // 4 = 12)',
        symbols: [
          '& (Bitwise AND) — hər iki bit 1 olduqda 1, qalan hallarda 0 verir',
          '| (Bitwise OR) — bitlərdən ən azı biri 1 olduqda 1 verir',
          '^ (Bitwise XOR) — bitlər fərqli olduqda (1 və 0) 1, eyni olduqda (1-1 və ya 0-0) 0 verir',
          '~x (Bitwise NOT) — bitin inkarı: həmişə -(x + 1) bərabərliyi ilə tapılır',
          'x << k — x ədədini 2^k-ya vurur; x >> k — x ədədini 2^k-ya tam bölür',
        ],
        steps: [
          'İmtahanda 19 ^ 11 kimi sual düşəndə: 19-u ikilikdə yaz (16+2+1 → 10011), altına 11-i yaz (8+2+1 → 01011).',
          'Sütun üzrə müqayisə et: eyni rəqəmlərin altına 0, fərqli rəqəmlərin altına 1 yaz → 11000₂ = 16 + 8 = 24.',
        ],
      },
    ],
  },
  {
    id: 'koica_prog_8405',
    title: 'M4. Sətir tipli verilənlər və onlar üzərində əməllər. Sətirlər üçün funksiya və metodlar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8405 · Orijinal fayl: M4.pptx (0-dan izahlı sətirlər, kəsiklər və metodlar + PDF)',
    fileName: 'm4.pdf',
    fileSize: '2.4 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m4.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:13:32.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Sətir (str) nədir, İndeksləmə və Kəsiklər (Slicing: s[baş:son:addım]) necə işləyir?',
        intuition:
          'Sətir (str) dırnaq içində yazılan hərflərin nömrələnmiş qatarıdır. Qatarın vaqonları soldan sağa 0-dan başlayaraq nömrələnir (0, 1, 2...), sağdan sola isə mənfi ədədlərlə (-1 sonuncu hərfdir, -2 sondan ikincidir). Sətirlər DƏYİŞMƏZDİR (immutable) — yəni s[0] = "B" yazıb tək bir hərfi yerində dəyişə bilməzsən, yalnız yeni sətir düzəldə bilərsən.',
        body: 'Sətirdən parça kəsmək üçün s[start : stop : step] yazılışı işlədilir. Burada start daxildir, amma stop indeksli hərf DAXİL DEYİL (stop-dan bir əvvəlki hərfə qədər götürür).',
        formulaOrCode:
          's = "Proqram"\n# İndekslər:  P(0)  r(1)  o(2)  q(3)  r(4)  a(5)  m(6)\n# Mənfi:     -7    -6    -5    -4    -3    -2    -1\n\ns[0]        # "P"       (ilk hərf)\ns[-1]       # "m"       (sonuncu hərf)\ns[1:4]      # "roq"     (1, 2 və 3-cü indekslər; 4 daxil deyil!)\ns[:3]       # "Pro"     (əvvəldən 3-cü indeksə qədər)\ns[3:]       # "qram"    (3-cü indeksdən axıra qədər)\ns[::2]      # "Porm"    (əvvəldən axıra 2-2 addımla)\ns[::-1]     # "marqorP" (sətri tərsinə çevirir!)',
        symbols: [
          'len(s) — sətirdəki simvolların ümumi sayını (uzunluğunu) tapır',
          'ord("A") — hərfin kompüterin Unicode cədvəlindəki ədədi kodunu verir (məs: ord("A") = 65)',
          'chr(65) — ədədi kodu yenidən hərfə çevirir (chr(65) = "A")',
          's[::-1] — addım -1 olduğu üçün sətri sağdan sola oxuyub tərsinə çevirir',
        ],
      },
      {
        heading: '2. Ən Çox İşlənən Sətir Metodları (split, join, find, replace, strip) (Slayd 11–27)',
        intuition:
          'Metod sətrin özünə nöqtə ilə qoşulan hazır komandadır (məsələn, s.upper() bütün hərfləri böyüdür). İmtahanda və məsələlərdə ən çox 5 metod lazım olur: strip() kənardakı boşluqları təmizləyir, split() cümləni sözlər siyahısına bölür, join() siyahını yenidən cümlə kimi birləşdirir, find() axtarılan sözün yerini tapır, replace() isə köhnə sözü yenisi ilə əvəz edir.',
        body: 'Diqqət: Sətir dəyişməz olduğu üçün heç bir metod ilkin s sətrini dəyişmir, həmişə YENİ sətir qaytarır. Ona görə nəticəni yadda saxlamaq üçün s = s.replace(...) yazmaq lazımdır.',
        formulaOrCode:
          's = "  AzTU 6326a2 qrupu  "\ns.strip()                    # "AzTU 6326a2 qrupu" (kənar boşluqları silir)\ns.upper()                    # "  AZTU 6326A2 QRUPU  "\ns.lower()                    # "  aztu 6326a2 qrupu  "\n"alma,armud,nar".split(",")  # ["alma", "armud", "nar"] (vergüllə parçalayır)\n"-".join(["2026", "09", "28"]) # "2026-09-28" (tire ilə birləşdirir)\n"abrakadabra".count("a")     # 5 ("a" hərfi neçə dəfə işlənib)\n"abrakadabra".find("bra")    # 1 (ilk "bra" hansı indeksdən başlayır; tapmasa -1)\n"abrakadabra".replace("a", "O", 2) # "ObrOkadabra" (ilk 2 dənə "a"-nı "O" edir)',
        warning:
          's.find("x") hərfi tapmayanda -1 qaytarır (xəta vermir), amma s.index("x") hərfi tapmayanda proqramı ValueError xətası ilə dayandırır!',
      },
    ],
  },
  {
    id: 'koica_prog_8407',
    title: 'M-5,6. Siyahılar(list), kortejlər(tuple) və onlar üçün funksiya və metodlar. Lüğətlər(dict), çoxluqlar(set) və onlar üçün funksiya və metodlar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8407 · Orijinal fayl: M5-6.pptx (0-dan izahlı list, tuple, set, dict fərqləri və PDF-i)',
    fileName: 'm5-6.pdf',
    fileSize: '2.0 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m5-6.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:16:58.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. 4 Kolleksiya Tipinin Sadə Müqayisəsi: list, tuple, set, dict nə vaxt işlədilir?',
        intuition:
          'Çoxlu məlumatı bir dəyişəndə saxlamaq üçün 4 qabımız var:\n1) list [1, 2, 3] — adi alış-veriş siyahısıdır: istədiyin vaxt yeni element əlavə edə, silə və ya dəyişə bilərsən.\n2) tuple (1, 2, 3) — möhürlənmiş siyahıdır: yaradılandan sonra içindəki heç nəyi dəyişmək və ya silmək OLMAZ.\n3) set {1, 2, 3} — riyaziyyatdakı çoxluqdur: içində eyni element təkrarlana bilməz (təkrarları avtomatik silir) və sıra nömrəsi (indeksi) yoxdur.\n4) dict {"ad": "Elcan", "bal": 98} — lüğət və ya telefon kitabçasıdır: məlumatı nömrə ilə yox, AÇAR sözlə (məs. d["ad"]) axtarıb tapırsan.',
        body: 'Siyahılar (list), çoxluqlar (set) və lüğətlər (dict) dəyişdirilə bilən (mutable), kortejlər (tuple) və sətirlər (str) isə dəyişməz (immutable) tiplərdir.',
        formulaOrCode:
          '# 1) Siyahı (list) metodları:\narr = [10, 20, 30]\narr.append(40)       # Sona 40 əlavə edir -> [10, 20, 30, 40]\narr.insert(1, 15)    # 1-ci indeksə 15 qoyur -> [10, 15, 20, 30, 40]\nsilinen = arr.pop(2) # 2-ci indeksdəki (20) elementi silib qaytarır\narr.remove(30)       # Qiyməti 30 olan elementi silir\narr.sort()           # Kiçikdən böyüyə sıralayır\n\n# 2) Çoxluq (set) əməliyyatları:\nA = {1, 2, 3};  B = {3, 4, 5}\nA | B   # Birləşmə: {1, 2, 3, 4, 5}\nA & B   # Kəsişmə:  {3}\nA - B   # Fərq:     {1, 2}\n\n# 3) Lüğət (dict):\ntelebe = {"ad": "Elcan", "kurs": 1}\ntelebe["qrup"] = "6326A2"         # Yeni açar:qiymət əlavə edir\nprint(telebe.get("bal", 100))     # "bal" açarı yoxdursa xəta vermir, 100 qaytarır',
        warning:
          'Boş çoxluq yaratmaq üçün s = {} YAZMA! Python-da {} boş LÜĞƏT (dict) yaradır. Boş çoxluq yalnız s = set() ilə yaradılır. Tək elementli kortejdə isə vergül mütləqdir: t = (5,).',
      },
    ],
  },
  {
    id: 'koica_prog_8408',
    title: 'M-7. Tarix-zaman tipli verilənlər. Verilənlərin tiplərinin çevrilməsi.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8408 · Orijinal fayl: M7.pptx (0-dan izahlı tarix/zaman və tip çevrilmələri + PDF)',
    fileName: 'm7.pdf',
    fileSize: '1.9 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m7.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:17:34.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Tarix və Zamanla İşləmək (datetime, timedelta) və Tip Çevrilmələri (Slayd 2–28)',
        intuition:
          'Proqramda "bu gündən 15 gün sonra hansı tarix olacaq?" və ya "iki tarix arasında neçə gün keçib?" kimi hesablamalar üçün datetime modulunu qoşuruq. Orada timedelta sinfi tarixin üzərinə gün/saat gəlməyə və ya çıxmağa imkan verir.',
        body: 'strftime() tarixi istədiyimiz formatda mətnə çevirir (%d — gün, %m — ay, %Y — 4 rəqəmli il, %H:%M — saat:dəqiqə), strptime() isə əksinə, mətni tarix obyektinə çevirir.',
        formulaOrCode:
          'from datetime import date, datetime, timedelta\n\nbugun = date(2026, 9, 28)\nsonra = bugun + timedelta(days=10)        # 2026-10-08 (10 gün sonra)\nprint(bugun.strftime("%d.%m.%Y"))         # "28.09.2026"\n\n# Tip çevrilmələri:\nint("45")         # 45 (mətndən tam ədədə)\nint(3.99)         # 3  (kəsr hissəni kəsib atır!)\nstr(123)          # "123"\nlist("AzTU")      # ["A", "z", "T", "U"]\nset([1, 2, 2, 3]) # {1, 2, 3} (təkrarları silmək üçün ən sürətli üsul!)',
      },
    ],
  },
  {
    id: 'koica_prog_8410',
    title: 'M-8. Mənimsəmə və şərh komandaları. Giriş-çıxış komandaları. Mövqeli formatlaşdırma üsulları.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8410 · Orijinal fayl: M8.pptx (0-dan izahlı input, print, sep, end və f-sətirlər + PDF)',
    fileName: 'm8.pdf',
    fileSize: '1.6 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m8.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:19:25.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Çoxlu Mənimsəmə, print(sep, end) və f-Sətirlərlə Formatlaşdırma (Slayd 2–23)',
        intuition:
          'Python-da iki dəyişənin qiymətini yerini dəyişmək üçün 3-cü dəyişənə ehtiyac yoxdur: sadəcə a, b = b, a yazırsan! Ekrana məlumat çıxaranda isə ən rahat üsul dırnağın əvvəlinə f hərfi qoymaqdır (f-sətir): onda fiqurlu mötərizə {dəyişən} içində nə yazsan qiyməti birbaşa cümlənin içinə yerləşir.',
        body: 'print() funksiyasında sep parametri vergüllə ayrılmış sözlərin arasına nə qoyulacağını (susmaya görə boşluq), end parametri isə sətrin sonunda nə qoyulacağını (susmaya görə yeni sətir \\n) təyin edir.',
        formulaOrCode:
          '# 1) Bir sətirdə boşluqla verilmiş 2 ədədi oxumaq:\na, b = map(int, input().split())\n\n# 2) İki dəyişənin yerini dəyişmək:\na, b = b, a\n\n# 3) sep və end parametrləri:\nprint("AzTU", "6326A2", sep=" - ", end="!\\n")   # Çıxış: AzTU - 6326A2!\n\n# 4) f-sətirlə kəsr ədədi yuvarlaqlaşdırıb çıxarmaq:\npi = 3.1415926\nprint(f"Pi ədədi təqribən {pi:.2f}-dir.")       # Çıxış: Pi ədədi təqribən 3.14-dir.',
        symbols: [
          'sep="..." — print içindəki elementlərin arasına qoyulan ayırıcı',
          'end="..." — print bitdikdən sonra sonda qoyulan simvol',
          '{x:.2f} — x həqiqi ədədini nöqtədən sonra 2 rəqəm dəqiqliklə göstərir',
          '{n:05d} — tam ədədi 5 rəqəmli yerə yazır, əvvəlini sıfırla doldurur (məs: 42 → 00042)',
        ],
      },
    ],
  },
  {
    id: 'koica_prog_8412',
    title: 'M-9. Şərt komandası.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8412 · Orijinal fayl: M9.pptx (0-dan izahlı if / elif / else budaqlanması + PDF)',
    fileName: 'm9.pdf',
    fileSize: '0.9 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m9.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:20:43.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Budaqlanma: if, elif və else Necə İşləyir? (Slayd 2–14)',
        intuition:
          'Proqram yolayrıcına çatanda qərar verməlidir: "Əgər (if) bal 91-dən böyükdürsə A yaz, əks halda əgər (elif) 81-dən böyükdürsə B yaz, heç biri deyilsə (else) digər qiyməti yaz". Python yuxarıdan aşağıya şərtləri yoxlayır və İLK doğru çıxan budağı icra edib qalanlarını ötürür.',
        body: 'if və elif sətrinin sonunda mütləq qoşa nöqtə (:) qoyulur və növbəti sətir 4 boşluq (Tab) sağdan yazılır.',
        formulaOrCode:
          'bal = int(input("Balınızı daxil edin: "))\n\nif bal >= 91:\n    qiymet = "A (Əla)"\nelif bal >= 81:\n    qiymet = "B (Çox yaxşı)"\nelif bal >= 71:\n    qiymet = "C (Yaxşı)"\nelif bal >= 51:\n    qiymet = "D/E (Kafi)"\nelse:\n    qiymet = "F (Kəsilmə)"\n\nprint("Sizin nəticəniz:", qiymet)\n\n# Qısa (bir sətirlik) yazılış:\nstatus = "Keçdi" if bal >= 51 else "Kəsildi"',
      },
    ],
  },
  {
    id: 'koica_prog_8413',
    title: 'M-10. Pythonda istisnaların işlənilməsi.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8413 · Orijinal fayl: M10.pptx (0-dan izahlı try / except xəta tutma mexanizmi + PDF)',
    fileName: 'm10.pdf',
    fileSize: '0.9 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m10.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:21:35.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Proqramın Çökməsinin Qarşısını Necə Alırıq? (try / except / else / finally)',
        intuition:
          'Təsəvvür et ki, proqram istifadəçidən ədəd istəyib 100-ü həmin ədədə bölür. Əgər istifadəçi səhvən 0 və ya hərf yazsa, proqram qırmızı xəta verib çökəcək! Bunun qarşısını almaq üçün təhlükəli kodu try: ("yoxla") blokunun içinə qoyuruq. Xəta baş verərsə, proqram çökmür, sakitcə except: ("xəta olarsa") blokuna keçib istifadəçiyə mədəni xəbərdarlıq göstərir.',
        body: 'Ən çox rast gəlinən xətalar: ZeroDivisionError (sıfıra bölmə), ValueError (mətni ədədə çevirə bilməmə, məs: int("abc")), IndexError (siyahıda olmayan indeksə müraciət), KeyError (lüğətdə olmayan açar).',
        formulaOrCode:
          'try:\n    a = int(input("Ədəd daxil et: "))\n    netice = 100 / a\nexcept ValueError:\n    print("Xəta: Zəhmət olmasa hərf yox, tam ədəd yazın!")\nexcept ZeroDivisionError:\n    print("Xəta: Sıfıra bölmək olmaz!")\nelse:\n    print("Heç bir xəta olmadı! Cavab:", netice)\nfinally:\n    print("Bu sətir hər bir halda (xəta olsa da, olmasa da) icra edilir.")',
      },
    ],
  },
  {
    id: 'koica_prog_8416',
    title: 'M-11. Pythonda FOR dövr operatoru. Range funksiyası',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8416 · Orijinal fayl: M11.pptx (0-dan izahlı for dövrü və range() funksiyası + PDF)',
    fileName: 'm11.pdf',
    fileSize: '1.0 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m11.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:22:59.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. FOR Dövrü və range(başlanğıc, son, addım) Necə İşləyir? (Slayd 2–14)',
        intuition:
          'Eyni işi 100 dəfə təkrar etmək lazım olanda kodu 100 dəfə alt-alta yazmırıq — onu for dövrünün içinə salırıq! range(1, 6) funksiyası 1-dən 5-ə qədər (6 daxil deyil!) ədədləri növbə ilə i dəyişəninə verir və dövrün içindəki kod hər ədəd üçün bir dəfə işləyir.',
        body: 'Dövrün içində break komandası dövrü dərhal dayandırıb çölə çıxır; continue komandası isə yalnız cari addımı ötürüb növbəti ədədə keçir.',
        formulaOrCode:
          '# 1-dən n-ə qədər bütün ədədlərin cəmini və hasilini (faktorialı) tapmaq:\nn = 5\ncem = 0\nhasil = 1\n\nfor i in range(1, n + 1):   # i növbə ilə 1, 2, 3, 4, 5 alır\n    cem += i\n    hasil *= i\n\nprint("1..5 cəmi =", cem)      # 15\nprint("5! faktorial =", hasil) # 120',
        symbols: [
          'range(5) — 0, 1, 2, 3, 4 ədədlərini verir (0-dan başlayır, 5 daxil deyil)',
          'range(2, 10, 2) — 2, 4, 6, 8 ədədlərini verir (2-dən başlayır, 2-2 artır, 10 daxil deyil)',
          'range(5, 0, -1) — 5, 4, 3, 2, 1 (geriyə doğru sayır)',
          'break — dövrü tamamilə dayandırır; continue — növbəti addıma tullanır',
        ],
      },
    ],
  },
  {
    id: 'koica_prog_8418',
    title: 'M-12. Pythonda WHILE dövr operatoru.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8418 · Orijinal fayl: M12.pptx (0-dan izahlı while dövrü, rəqəmlərə ayırma və ƏBOB + PDF)',
    fileName: 'm12.pdf',
    fileSize: '0.7 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m12.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:40:24.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. WHILE (Şərtli Dövr) Nə Vaxt İşlədilir? Ədədi Rəqəmlərinə Ayırma Alqoritmi',
        intuition:
          'Addımların sayı əvvəlcədən bəlli olanda for işlədirik. Bəs addımların sayını əvvəlcədən bilmiriksə? Məsələn, "istifadəçinin yazdığı ədədin rəqəmləri cəmini tap" — ədəd 3 rəqəmli də ola bilər, 10 rəqəmli də! Bu halda while n > 0: ("n sıfırdan böyük olduğu müddətcə təkrarla") dövründən istifadə edirik.',
        body: 'İstənilən n tam ədədinin sonuncu rəqəmini qoparmaq üçün n % 10, sonuncu rəqəmi silib ədədi kiçiltmək üçün isə n = n // 10 əməliyyatı aparılır.',
        formulaOrCode:
          '# Verilmiş ədədin rəqəmləri cəmini və tərsini tapan universal şablon:\nn = int(input("Ədəd daxil et: "))   # Məsələn: 472\ncem = 0\nters = 0\n\nwhile n > 0:\n    son_reqem = n % 10              # 472 % 10 -> 2 (sonra 7, sonra 4)\n    cem = cem + son_reqem\n    ters = ters * 10 + son_reqem\n    n = n // 10                     # 472 // 10 -> 47 (sonra 4, sonra 0)\n\nprint("Rəqəmləri cəmi:", cem)       # 13\nprint("Ədədin tərsi:", ters)        # 274',
        warning:
          'while dövrünün içində şərti dəyişən sətir (məsələn, n = n // 10 və ya i += 1) yazmağı unutsan, proqram SONSUZ DÖVRƏ (infinite loop) düşüb donacaq!',
      },
    ],
  },
  {
    id: 'koica_prog_8419',
    title: 'M-13. Pythonda proseduralar və funksiyalar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8419 · Orijinal fayl: M13.pptx (0-dan izahlı def funksiyaları, return və lambda + PDF)',
    fileName: 'm13.pdf',
    fileSize: '1.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m13.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:41:50.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Öz Funksiyamızı Necə Yaradırıq? (def və return) (Slayd 2–16)',
        intuition:
          'Funksiya kiçik bir zavoddur: sən ona xammal (arqumentlər) verirsən, o içəridə hesablama aparıb return komandası ilə sənə hazır məhsul (nəticə) qaytarır. Bir dəfə def ilə funksiya yazdıqdan sonra onu proqramın istənilən yerində adını çəkməklə dəfələrlə işlədə bilərsən.',
        body: 'Funksiya def funksiya_adi(parametrlər): ilə elan olunur. Qiymət qaytaran altproqrama funksiya (return var), sadəcə ekrana nəsə çap edib qiymət qaytarmayan (None qaytaran) altproqrama isə prosedur deyilir.',
        formulaOrCode:
          'def sahə_hesabla(en, uzunluq=10):\n    s = en * uzunluq\n    return s\n\n# Funksiyanın çağırılması:\nk1 = sahə_hesabla(5, 8)   # en=5, uzunluq=8 -> 40\nk2 = sahə_hesabla(5)      # uzunluq verilmədiyi üçün susmaya görə 10 götürülür -> 50\n\n# Kiçik birsətirlik anonim (lambda) funksiya:\nkvadrat = lambda x: x ** 2\nprint(kvadrat(6))         # 36',
      },
    ],
  },
  {
    id: 'koica_prog_8420',
    title: 'M-14. Pythonda modullar.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8420 · Orijinal fayl: M14.pptx (0-dan izahlı math, random modulları və PDF-i)',
    fileName: 'm14.pdf',
    fileSize: '1.7 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m14.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:43:20.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. math və random Modullarının Ən Vacib Funksiyaları (Slayd 2–25)',
        intuition:
          'Modul — başqalarının (və ya sənin) əvvəlcədən yazıb saxladığı hazır funksiyalar qutusudur. Məsələn, kvadrat kök, sinus, loqarifm və ya faktorial tapmaq üçün import math yazırıq; təsadüfi ədədlər seçmək üçün isə import random yazırıq.',
        body: 'Modulu proqrama qoşmağın 2 əsas yolu var: 1) import math (onda funksiyanı math.sqrt(16) kimi çağırırıq); 2) from math import sqrt, ceil (onda birbaşa sqrt(16) yazırıq).',
        formulaOrCode:
          'import math\nimport random\n\nmath.sqrt(25)        # 5.0 (kvadrat kök)\nmath.ceil(4.1)       # 5   (yuxarı tam ədədə yuvarlaqlaşdırır)\nmath.floor(4.9)      # 4   (aşağı tam ədədə yuvarlaqlaşdırır)\nmath.factorial(5)    # 120 (5! = 1*2*3*4*5)\nmath.gcd(24, 36)     # 12  (ƏBOB)\n\nrandom.randint(1, 6) # 1 ilə 6 arasında (hər ikisi daxil!) təsadüfi tam ədəd (zər)\nrandom.choice(["A", "B", "C"]) # Siyahıdan təsadüfi bir element seçir',
      },
    ],
  },
  {
    id: 'koica_prog_8421',
    title: 'M-15. Pythonda fayllara işlərin təşkili.',
    courseId: 'prog',
    type: 'file',
    description:
      'KOICA LMS #8421 · Orijinal fayl: M15.pptx (0-dan izahlı fayl oxuma/yazma, JSON və EXE + PDF)',
    fileName: 'm15.pdf',
    fileSize: '1.6 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/prog/m15.pdf',
    authorId: 'system_aztu',
    authorName: 'Fizuli Əzimov',
    createdAt: '2026-09-25T20:44:16.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Fayllarla İş (open, with, "r", "w", "a") və JSON (Slayd 2–21)',
        intuition:
          'Adi dəyişənlərdəki məlumatlar proqram bağlanan kimi RAM-dan silinir. Məlumatı diskdə daimi saxlamaq üçün onu fayla yazırıq! with open(...) as f: yazılışı faylı açır və işimiz bitən kimi onu avtomatik bağlayır.',
        body: 'Fayl açma rejimləri: "w" (write) — fayla sıfırdan yazır (köhnə məlumatı silir); "a" (append) — köhnə məlumatı silmədən sonuna əlavə edir; "r" (read) — faylı oxumaq üçün açır.',
        formulaOrCode:
          '# 1) Fayla mətn yazmaq ("w" rejimi):\nwith open("qeyd.txt", "w", encoding="utf-8") as f:\n    f.write("Salam, AzTU 6326A2!\\n")\n\n# 2) Fayldan mətni oxumaq ("r" rejimi):\nwith open("qeyd.txt", "r", encoding="utf-8") as f:\n    metn = f.read()\n    print(metn)',
      },
    ],
  },

  // ==========================================================================
  // 3. XƏTTİ CƏBR VƏ ANALİTİK HƏNDƏSƏ (LMS ID: 5040 · 6326a2_if-61119y)
  // Müəllimlər: Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov (Cloudflare R2 PDF + 0-dan İzahlı Qaydalar)
  // ==========================================================================
  {
    id: 'koica_alg_4234',
    title: 'Xətti cəbr (Mühazirə 1): Matris cəbri, növləri və matris əməliyyatları (Ali Riyaziyyat)',
    courseId: 'algebra',
    type: 'file',
    description:
      '✓ Keçildi (1-ci həftə) · KOICA LMS #4234 · Orijinal fayl: dərs Müh1.pptx (0-dan izahlı matris qaydaları, addım-addım vurma nümunəsi və R2 PDF-i)',
    fileName: 'muhazire-01.pdf',
    fileSize: '4.5 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-01.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Rəna Əmirova',
    createdAt: '2026-09-18T14:08:38.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Matris Nədir? Sətir, Sütun, Baş Diaqonal və Matrisin Növləri (Slayd 3–7)',
        intuition:
          'Matris qorxulu bir şey deyil — sadəcə ədədlərin mötərizə içində səliqəli cədvəl (Excel cədvəli kimi) şəklində yazılışıdır! Üfüqi sıralara SƏTİR (m), şaquli sıralara isə SÜTUN (n) deyilir. Əgər cədvəlin 2 sətri və 3 sütunu varsa, buna "2×3 ölçülü matris" deyirik (həmişə əvvəlcə sətir, sonra sütun deyilir!). Sətir və sütunların sayı bərabərdirsə (məsələn, 3×3), buna Kvadrat Matris deyilir.',
        body: 'Kvadrat matrisdə sol yuxarı küncdən sağ aşağı küncə gedən xəttə Baş Diaqonal (a₁₁, a₂₂, a₃₃) deyilir. Baş diaqonaldakı ədədlərin cəminə matrisin İzi — Tr(A) deyilir. Matrisin sətirlərini sütunlarla yerini dəyişdikdə Transponirə olunmuş matris (A^T) alınır.',
        formulaOrCode:
          'A = [ a₁₁  a₁₂  a₁₃ ]     Kvadrat matrisin izi (baş diaqonal cəmi):\n    [ a₂₁  a₂₂  a₂₃ ]     Tr(A) = a₁₁ + a₂₂ + a₃₃\n    [ a₃₁  a₃₂  a₃₃ ]\n\nVahid matris (E — adi ədədlərdəki "1" rəqəminin matris qarşılığı):\nE = [ 1  0  0 ]     Transponirə (sətir ↔ sütun):\n    [ 0  1  0 ]     Əgər A = [ 1  2  3 ] olarsa,  A^T = [ 1  4 ]\n    [ 0  0  1 ]              [ 4  5  6 ]                [ 2  5 ]\n                                                        [ 3  6 ]',
        symbols: [
          'A_{m×n} — m dənə sətri (üfüqi) və n dənə sütunu (şaquli) olan matris',
          'a_{ij} — i-ci sətir ilə j-ci sütunun kəsişməsində dayanan ədəd (məs: a₂₃ = 2-ci sətir, 3-cü sütundakı ədəd)',
          'E (və ya I) — Vahid matris: baş diaqonalı 1-lərdən, qalan bütün yerləri 0-dan ibarət olan kvadrat matris',
          'O — Sıfır matris: bütün elementləri 0 olan matris',
          'A^T — Transponirə olunmuş matris: 1-ci sətri 1-ci sütun, 2-ci sətri 2-ci sütun kimi yazmaqla alınır',
          'Tr(A) — Matrisin izi (Trace): yalnız baş diaqonaldakı (a₁₁ + a₂₂ + ...) ədədlərin cəmi',
        ],
        steps: [
          'a_ij elementini tapmaq üçün birinci indeksə (i) baxıb həmin sətri seç, ikinci indeksə (j) baxıb həmin sütunu seç.',
          'A^T (transponirə) tapmaq üçün A-nın 1-ci sətrini götürüb şaquli olaraq 1-ci sütuna yaz, 2-ci sətrini 2-ci sütuna yaz.',
        ],
        example:
          'Məsələ: A = [ 4  -1   7 ] matrisi üçün a₁₃, a₂₂ elementlərini, Tr(A) izini və A^T matrisini tapın.\n            [ 2   5   0 ]\n            [ 3   8  -2 ]\n\nHəlli:\n1) a₁₃ (1-ci sətir, 3-cü sütun) = 7;  a₂₂ (2-ci sətir, 2-ci sütun) = 5.\n2) Matrisin izi (baş diaqonal cəmi): Tr(A) = 4 + 5 + (-2) = 7.\n3) Transponirə A^T (sətirləri sütun edirik):\n   A^T = [  4   2   3 ]\n         [ -1   5   8 ]\n         [  7   0  -2 ]',
        warning:
          'a₂₃ ilə a₃₂-ni qarışdırma! Birinci rəqəm həmişə SƏTRİ, ikinci rəqəm həmişə SÜTUNU göstərir.',
      },
      {
        heading: '2. Matrislərin Toplanması, Ədədə Vurulması və Bir-birinə Vurulması (A · B) (Slayd 8–21)',
        intuition:
          'Matrisləri toplamaq və ədədə vurmaq çox asandır: eyni yerdə dayanan ədədləri bir-biri ilə toplayırsan, ədədə vuranda isə içəridəki BÜTÜN ədədləri həmin ədədə vurursan. Əsas diqqət tələb edən əməl iki matrisin bir-birinə vurulmasıdır (A · B): burada "SƏTİR × SÜTUN" qaydası işləyir! Yəni sol matrisin sətrini götürüb sağ matrisin sütununun üstünə qoyursan, uyğun ədədləri bir-birinə vurub toplayırsan.',
        body: 'İki matrisi yalnız o vaxt toplamaq olar ki, onların ölçüləri eyni olsun. A_(m×n) matrisini B_(n×p) matrisinə vurmaq üçün isə A-nın SÜTUN sayı (n) B-nin SƏTİR sayına (n) bərabər olmalıdır! Alınan C = A·B matrisinin ölçüsü m×p olur.',
        formulaOrCode:
          '1) Toplanma: [ a  b ] + [ e  f ] = [ a+e  b+f ]\n             [ c  d ]   [ g  h ]   [ c+g  d+h ]\n\n2) Ədədə vurulma: k · [ a  b ] = [ k·a  k·b ]\n                      [ c  d ]   [ k·c  k·d ]\n\n3) Matrisin matrisə vurulması ("Sətir × Sütun" qaydası):\n   [ a₁₁  a₁₂ ] · [ b₁₁  b₁₂ ] = [ a₁₁b₁₁ + a₁₂b₂₁    a₁₁b₁₂ + a₁₂b₂₂ ]\n   [ a₂₁  a₂₂ ]   [ b₂₁  b₂₂ ]   [ a₂₁b₁₁ + a₂₂b₂₁    a₂₁b₁₂ + a₂₂b₂₂ ]',
        symbols: [
          'A_{m×n} · B_{n×p} = C_{m×p} — ortadakı n-lər eyni olmalıdır, kənardakı m×p yeni matrisin ölçüsü olur',
          'A · B ≠ B · A — matrislərin vurulmasında yerdəyişmə qanunu YOXDUR (sıra çox önəmlidir!)',
          'A · E = E · A = A — istənilən matrisi vahid matrisə (E) vurduqda özü alınır',
        ],
        steps: [
          'Əvvəlcə yoxla: 1-ci matrisin sütun sayı 2-ci matrisin sətir sayına bərabərdirmi?',
          'c₁₁-i tapmaq üçün: A-nın 1-ci sətrindəki ədədləri B-nin 1-ci sütunundakı ədədlərə sırayla vurub topla.',
          'c₁₂-ni tapmaq üçün: A-nın 1-ci sətrini B-nin 2-ci sütununa vurub topla.',
          'c₂₁ və c₂₂ üçün eyni qaydanı A-nın 2-ci sətri ilə təkrarla.',
        ],
        example:
          'Məsələ: A = [ 1  2 ] və B = [ 5  6 ] matrislərinin A · B hasilini tapın.\n            [ 3  4 ]        [ 7  8 ]\n\nAddım-addım həlli:\n• 1-ci sətir × 1-ci sütun: c₁₁ = 1·5 + 2·7 = 5 + 14 = 19\n• 1-ci sətir × 2-ci sütun: c₁₂ = 1·6 + 2·8 = 6 + 16 = 22\n• 2-ci sətir × 1-ci sütun: c₂₁ = 3·5 + 4·7 = 15 + 28 = 43\n• 2-ci sətir × 2-ci sütun: c₂₂ = 3·6 + 4·8 = 18 + 32 = 50\n\nCavab: A · B = [ 19  22 ]\n               [ 43  50 ]',
        warning:
          'Matrisləri vurarkən əsla toplamadakı kimi eyni yerdə duran ədədləri birbaşa bir-birinə vurma (1·5, 2·6 YANLIŞDIR)! Həmişə "Sətir × Sütun" qaydası ilə vurub topla.',
      },
    ],
  },
  {
    id: 'koica_alg_4236',
    title: 'Xətti cəbr müh2 (Mühazirə 2): n-Tərtibli Determinantlar, Permutasiyalar və Xassələr',
    courseId: 'algebra',
    type: 'file',
    description:
      '✓ Keçildi (2-ci həftə) · KOICA LMS #4236 · Orijinal fayl: dərs Müh2.pptx (0-dan izahlı 2×2 və 3×3 determinant hesablanması və R2 PDF-i)',
    fileName: 'muhazire-02.pdf',
    fileSize: '2.2 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-02.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Rəna Əmirova',
    createdAt: '2026-09-18T14:11:30.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Determinant Nədir? 2×2 və 3×3 Determinantları Necə Hesablayırıq? (Slayd 1–5)',
        intuition:
          'Matris ədədlər cədvəlidir, Determinant (det A və ya Δ) isə yalnız KVADRAT matrisdən xüsusi qayda ilə hesablanan TƏK BİR ƏDƏDDİR! Bu ədəd bizə matrisin tərsinin olub-olmadığını və tənliklər sisteminin yeganə həllinin olub-olmadığını göstərir. 2×2 matrisdə determinantı tapmaq üçün sadəcə çarpaz vurub çıxırıq (Baş diaqonal − Köməkçi diaqonal).',
        body: '2-tərtibli determinant çarpaz hasillərin fərqinə bərabərdir. 3-tərtibli determinantı hesablamağın ən rahat yolu isə "Sütun Köçürmə (Sarrus)" üsuludur: ilk 2 sütunu determinantın sağına yenidən yazıb 3 düz diaqonalı "+" ilə, 3 əks diaqonalı "−" ilə toplayırıq.',
        formulaOrCode:
          '1) 2×2 Determinant (Çarpaz vurub çıxırıq):\n   | a  b | = a·d - b·c\n   | c  d |\n\n2) 3×3 Determinant (Üçbucaqlar / Sarrus qaydası):\n   | a₁₁  a₁₂  a₁₃ |\n   | a₂₁  a₂₂  a₂₃ | = (a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂) - (a₁₃a₂₂a₃₁ + a₁₁a₂₃a₃₂ + a₁₂a₂₁a₃₃)\n   | a₃₁  a₃₂  a₃₃ |',
        symbols: [
          'det(A) və ya |A| və ya Δ (delta) — A kvadrat matrisinin determinantı (nəticəsi bir ədəddir)',
          'a·d — baş diaqonal elementlərinin hasili (sol yuxarıdan sağ aşağıya: "+")',
          'b·c — köməkçi diaqonal elementlərinin hasili (sağ yuxarıdan sol aşağıya: "−")',
        ],
        steps: [
          '2×2 determinant üçün: sol yuxarı ədədi sağ aşağı ədədə vur, bundan sağ yuxarı ilə sol aşağının hasilini çıx.',
          '3×3 determinant üçün (Sarrus üsulu): 1-ci və 2-ci sütunu cədvəlin sağ tərəfinə təkrar yaz.',
          'Sol yuxarıdan sağ aşağıya gedən 3 paralel xətt üzrə ədədləri bir-birinə vurub topla (Mötərizə 1).',
          'Sağ yuxarıdan sol aşağıya gedən 3 paralel xətt üzrə ədədləri bir-birinə vurub topla (Mötərizə 2) və Mötərizə 1-dən Mötərizə 2-ni çıx.',
        ],
        example:
          'Nümunə 1 (2×2): | 5  3 | = 5·4 - 3·2 = 20 - 6 = 14.\n                | 2  4 |\n\nNümunə 2 (3×3): Δ = | 1  2  3 |\n                    | 0  4  1 |\n                    | 2  1  5 |\n\nSarrus üsulu ilə:\n• Baş diaqonallar (+): (1·4·5) + (2·1·2) + (3·0·1) = 20 + 4 + 0 = 24.\n• Əks diaqonallar (−): (3·4·2) + (1·1·1) + (2·0·5) = 24 + 1 + 0 = 25.\n• Cavab: Δ = 24 - 25 = -1.',
        warning:
          'Matris ədədə vurulanda bütün ədədlər vurulur, amma DETERMINANTDA k ədədi yalnız BİR sətirdən (və ya bir sütundan) mötərizə xaricinə çıxır! Ona görə n×n matris üçün det(k·A) = k^n · det(A) olur.',
      },
      {
        heading: '2. Determinantın Hesablamanı 10 Dəfə Sürətləndirən 5 Xassəsi (Slayd 5–8)',
        intuition:
          'Bəzən 3×3 və ya 4×4 determinantı uzun-uzadı hesablamağa heç ehtiyac olmur! Məsələn, bir sətirdəki bütün ədədlər 0-dırsa və ya iki sətir bir-birinin eynisidirsə, hesablamadan birbaşa "Cavab 0-dır!" deyə bilərsən. Əgər diaqonaldan aşağıdakı bütün ədədlər 0-dırsa (Üçbucaq matris), onda cavab sadəcə baş diaqonaldakı ədədlərin hasilidir!',
        body: 'Determinantın əsas xassələri böyük tərtibli determinantları sıfırlar yaratmaqla (Qauss üsulu ilə) saniyələr içində hesablamağa imkan verir.',
        formulaOrCode:
          '1) det(A^T) = det(A)   (Sətirlə sütunu dəyişəndə determinant dəyişmir)\n2) İki sətrin yerini dəyişdikdə determinantın İŞARƏSİ əksinə dəyişir (-Δ)\n3) İki sətri bərabər (və ya mütənasib) olan determinant = 0\n4) Üçbucaq matrisin determinantı = Baş diaqonal elementlərinin hasili (a₁₁ · a₂₂ · ... · a_nn)\n5) Hasilin determinantı: det(A · B) = det(A) · det(B)\n6) Bir sətrə başqa sətrin hər hansı ədədə hasilini əlavə etdikdə determinant DƏYİŞMİR!',
        example:
          'Məsələ: A və B 3×3 ölçülü matrislərdir, det(A) = 2 və det(B) = -3. det(A·B) və det(2A)-nı tapın.\n\nHəlli:\n1) det(A·B) = det(A) · det(B) = 2 · (-3) = -6.\n2) A matrisi 3×3 (n = 3) olduğu üçün: det(2A) = 2³ · det(A) = 8 · 2 = 16.',
      },
    ],
  },
  {
    id: 'uni_alg_m3_m6',
    title: 'Xətti cəbr (Mühazirə 3–6): Minor, Cəbri Tamamlayıcı, Laplas Teoremi, Tərs Matris və Matrisin Ranqı',
    courseId: 'algebra',
    type: 'file',
    description:
      'I Kollokvium və Semestr Mövzuları (Mühazirə 3–6) · Minor, Kofaktor, Tərs matris (A⁻¹) və Matrisin Ranqının 0-dan addım-addım izahı + R2 PDF',
    fileName: 'muhazire-03-06-laplas-ters-matris-ranq.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-03-06-laplas-ters-matris-ranq.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov',
    createdAt: '2026-09-21T10:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mühazirə 3: Minor (M_ij), Cəbri Tamamlayıcı (A_ij) və Laplas Ayrılışı Nədir?',
        intuition:
          'Təsəvvür et ki, 3×3 matrisdə bir ədədin üstünə barmağını qoyursan və həmin ədədin yerləşdiyi sətri və sütunu tamamilə silirsən. Yerdə kiçik bir 2×2 determinant qalır — bax həmin qalan determinant bu ədədin MİNORU (M_ij) adlanır! Əgər həmin minorun qarşısına şahmat taxtası qaydası ilə (+ və ya −) işarə qoysaq, buna CƏBRİ TAMAMLAYICI (A_ij) deyilir.',
        body: 'i-ci sətir və j-ci sütunun kəsişməsindəki elementin cəbri tamamlayıcısı A_ij = (-1)^(i+j) · M_ij düsturu ilə tapılır: əgər i + j cütdürsə işarə dəyişmir (+M_ij), təkdirsə işarə əksinə dəyişir (-M_ij). Laplas teoreminə görə, bir sətirdəki hər ədədi öz cəbri tamamlayıcısına vurub toplasaq, determinantın özünü (Δ) alarıq!',
        formulaOrCode:
          'Cəbri tamamlayıcı: A_ij = (-1)^(i+j) · M_ij\n\nŞahmat işarələr cədvəli (3×3 üçün):\n[ +  -  + ]\n[ -  +  - ]\n[ +  -  + ]\n\nLaplas ayrılışı (1-ci sətir üzrə):\ndet(A) = a₁₁·A₁₁ + a₁₂·A₁₂ + a₁₃·A₁₃',
        symbols: [
          'M_{ij} (Minor) — i-ci sətri və j-ci sütunu sildikdən sonra qalan determinant',
          'A_{ij} (Cəbri tamamlayıcı) — minorun (-1)^(i+j) işarəsi ilə vurulmuş halı',
        ],
        steps: [
          'M_{23} tapmaq tələb olunursa: 2-ci sətrin və 3-cü sütunun üstündən xətt çək.',
          'Qalan 4 ədəddən ibarət 2×2 determinantı çarpaz vurub hesabla → bu M_{23}-dür.',
          'A_{23} tapmaq üçün: indeksləri topla (2 + 3 = 5, tək ədəddir), deməli M_{23}-ün işarəsini əksinə dəyiş: A_{23} = -M_{23}.',
        ],
        example:
          'Məsələ: A = [ 1  2  3 ] matrisində a₂₃ = 6 elementinin M₂₃ minorunu və A₂₃ cəbri tamamlayıcısını tapın.\n            [ 4  5  6 ]\n            [ 7  8  0 ]\n\nHəlli:\n1) 2-ci sətri [4 5 6] və 3-cü sütunu [3; 6; 0] silirik.\n2) Qalan 2×2 determinant: M₂₃ = | 1  2 | = 1·8 - 2·7 = 8 - 14 = -6.\n                               | 7  8 |\n3) İndekslər cəmi: 2 + 3 = 5 (tək olduğu üçün qarşısına "-" qoyuruq):\n   A₂₃ = (-1)^(2+3) · M₂₃ = -(-6) = +6.',
        warning:
          'Bir sətrin ədədlərini ÖZ cəbri tamamlayıcılarına vurub topladıqda det(A) alınır, amma BAŞQA sətrin cəbri tamamlayıcılarına vurub topladıqda cavab həmişə 0 olur!',
      },
      {
        heading: '2. Mühazirə 4: Tərs Matris (A⁻¹) Necə Tapılır və Matris Tənlikləri (AX = B)',
        intuition:
          'Adi ədədlərdə 5-in tərsi 1/5-dir, çünki 5 · (1/5) = 1 edir. Matrislərdə isə bölmə əməli YOXDUR! Bölməni əvəz etmək üçün Tərs Matrisdən (A⁻¹) istifadə edirik: A matrisini öz tərsi olan A⁻¹-ə vurduqda Vahid matris (E) alınır: A · A⁻¹ = E. Tərs matris yalnız determinant sıfırdan fərqli olduqda (det A ≠ 0) mövcuddur!',
        body: '2×2 matrisin tərsini 10 saniyəyə tapmaq üçün qızıl qayda var: baş diaqonaldakı 2 ədədin yerini dəyiş, digər 2 ədədin isə işarəsini dəyiş və qarşıda 1/det(A) yaz! 3×3 matrisdə isə bütün A_ij cəbri tamamlayıcıları tapıb transponirə edirik.',
        formulaOrCode:
          'Ümumi düstur (det(A) ≠ 0 olduqda):\nA⁻¹ = (1 / det(A)) · [ A₁₁  A₂₁  A₃₁ ]   (Diqqət: indekslər transponirə olunub!)\n                     [ A₁₂  A₂₂  A₃₂ ]\n                     [ A₁₃  A₂₃  A₃₃ ]\n\n2×2 Matris üçün Sürətli Düstur:\nƏgər A = [ a  b ] olarsa,  A⁻¹ = (1 / (ad - bc)) · [  d  -b ]\n         [ c  d ]                                  [ -c   a ]\n\nMatris tənliklərinin həlli:\n• A · X = B  ⇒  X = A⁻¹ · B   (A soldadırsa, A⁻¹ də soldan vurulur)\n• X · A = B  ⇒  X = B · A⁻¹   (A sağdadırsa, A⁻¹ də sağdan vurulur!)',
        steps: [
          'Əvvəlcə det(A)-nı hesabla. Əgər det(A) = 0 çıxsa, dayan: "Matris cırlaşandır, tərsi yoxdur" yaz.',
          '2×2 matrisdirsə: baş diaqonal elementlərinin yerini dəyiş (a ↔ d), köməkçi diaqonalın işarəsini dəyiş (-b, -c) və 1/det(A)-ya vur.',
          '3×3 matrisdirsə: 9 dənə A_ij cəbri tamamlayıcını tap, sətirləri sütun kimi düz (transponirə et) və 1/det(A)-ya vur.',
        ],
        example:
          'Məsələ: A = [ 3  5 ] matrisinin tərsini (A⁻¹) tapın.\n            [ 1  2 ]\n\nHəlli:\n1) Determinantı tapaq: det(A) = 3·2 - 5·1 = 6 - 5 = 1 (≠ 0, tərsi var).\n2) Baş diaqonalın (3 və 2) yerini dəyişirik, digərlərinin (5 və 1) işarəsini dəyişirik:\n   A⁻¹ = (1 / 1) · [  2  -5 ] = [  2  -5 ].\n                   [ -1   3 ]   [ -1   3 ]\n3) Yoxlama: [ 3  5 ] · [  2  -5 ] = [ 6-5  -15+15 ] = [ 1  0 ] = E (Doğrudur!).\n            [ 1  2 ]   [ -1   3 ]   [ 2-2   -5+6  ]   [ 0  1 ]',
        warning:
          'X · A = B tənliyini həll edəndə X = A⁻¹ · B YAZMA! Matris vurulmasında sıra önəmli olduğu üçün A sağdadırsa, A⁻¹ də sağdan vurulmalıdır: X = B · A⁻¹.',
      },
      {
        heading: '3. Mühazirə 5–6: Matrisin Ranqı (rank A) Nədir və Qauss Üsulu ilə Necə Tapılır?',
        intuition:
          'Matrisin ranqı (r və ya rank A) həmin matrisdə neçə dənə "həqiqi, müstəqil məlumat sətri" olduğunu göstərir. Bəzən matrisdə 3 sətir olur, amma 3-cü sətir sadəcə 1-ci sətrin 2 qatıdır (təkrardır). Elementar çevirmələrlə (bir sətri ədədə vurub digərindən çıxmaqla) matrisi pilləkən şəklinə salırıq: sonda tamamilə sıfırlardan ibarət olmayan neçə sətir qalsa, matrisin RANQI həmin saydır!',
        body: 'Matrisin sıfırdan fərqli ən böyük kvadrat minorunun tərtibinə də onun ranqı deyilir. Praktikada ranqı tapmağın ən asan yolu sətir çevirmələri ilə baş diaqonaldan aşağıda sıfırlar yaratmaqdır (Pilləvari şəkil).',
        formulaOrCode:
          'Pilləvari matris nümunəsi:\n[ 2   4   1   5 ]   ← 1-ci sıfırsız sətir\n[ 0   3  -2   7 ]   ← 2-ci sıfırsız sətir\n[ 0   0   0   0 ]   ← Tam sıfır sətri (sayılmır!)\nSıfırdan fərqli 2 sətir qaldığı üçün: rank(A) = 2.',
        steps: [
          '1-ci sətri saxla. 1-ci sətri elə ədədə vurub 2-ci və 3-cü sətirdən çıx ki, 1-ci sütunda aşağıdakı ədədlər 0 olsun.',
          'Sonra 2-ci sətrin köməyi ilə 3-cü sətrin 2-ci həddini də 0 et (pilləkən düzəlt).',
          'Tamamilə sıfır olan [0 0 ... 0] sətirlərini tullayıb, qalan sıfırsız sətirləri say → bu ədəd rank(A)-dır!',
        ],
      },
    ],
  },
  {
    id: 'uni_alg_m7_m14',
    title: 'Xətti cəbr (Mühazirə 7–14): XCTS (Kramer, Qauss, Kroneker–Kapelli), Məxsusi Ədədlər və Analitik Həndəsə',
    courseId: 'algebra',
    type: 'file',
    description:
      'Semestr və İmtahan Mövzuları (Mühazirə 7–14) · Tənliklər sisteminin Kramer və Qauss üsulu ilə 0-dan həlli, Məxsusi ədədlər və Vektor həndəsəsi + R2 PDF',
    fileName: 'muhazire-07-14-xcts-kramer-qauss-mexsusi.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/algebra/muhazire-07-14-xcts-kramer-qauss-mexsusi.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov',
    createdAt: '2026-09-22T10:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mühazirə 7–8: Xətti Tənliklər Sisteminin Kramer Qaydası ilə Həlli (0-dan İzah)',
        intuition:
          'Məktəbdə 2 və ya 3 dəyişənli tənliklər sistemini əvəzetmə ilə həll edirdik, bu isə çox vaxt aparırdı. Universitetdə Kramer qaydası ilə istənilən sistemi sadəcə determinantları bir-birinə bölməklə həll edirik: əvvəlcə əsas əmsallardan Δ determinantını tapırıq, sonra bərabərlikdən sağdakı cavab sütununu növbə ilə 1-ci sütunun yerinə qoyub Δ₁-i, 2-ci sütunun yerinə qoyub Δ₂-ni tapırıq və bölürük: x₁ = Δ₁ / Δ, x₂ = Δ₂ / Δ!',
        body: 'Kroneker–Kapelli teoreminə görə sistemin həlli yalnız rank(A) = rank(A|B) olduqda var. Əgər əsas determinant Δ ≠ 0 olarsa, sistemin yeganə həlli var və Kramer düsturları ilə tapılır.',
        formulaOrCode:
          'Sistem:  { a₁₁x₁ + a₁₂x₂ = b₁\n         { a₂₁x₁ + a₂₂x₂ = b₂\n\nƏsas determinant:       Δ  = | a₁₁  a₁₂ | ≠ 0\n                             | a₂₁  a₂₂ |\n\n1-ci sütunu b ilə əvəz: Δ₁ = | b₁   a₁₂ |     2-ci sütunu b ilə əvəz: Δ₂ = | a₁₁  b₁ |\n                             | b₂   a₂₂ |                                  | a₂₁  b₂ |\n\nKramer düsturları:      x₁ = Δ₁ / Δ,          x₂ = Δ₂ / Δ',
        symbols: [
          'Δ (delta) — məchulların qarşısındakı əmsallardan düzəlmiş əsas determinant',
          'Δ₁ — əsas determinantda 1-ci sütunu silib yerinə bərabərlikdən sağdakı sərbəst hədləri (b₁, b₂) yazmaqla alınan determinant',
          'Δ₂ — əsas determinantda 2-ci sütunu silib yerinə sərbəst hədləri yazmaqla alınan determinant',
        ],
        steps: [
          'Məchulların (x₁, x₂) əmsallarından Δ determinantını qur və hesabla.',
          '1-ci sütunu sağ tərəfdəki ədədlərlə əvəz edib Δ₁-i hesabla.',
          '2-ci sütunu sağ tərəfdəki ədədlərlə əvəz edib Δ₂-ni hesabla.',
          'x₁ = Δ₁ / Δ və x₂ = Δ₂ / Δ bölməsini yerinə yetir.',
        ],
        example:
          'Məsələ: { 2x₁ + 3x₂ = 8  sistemini Kramer üsulu ilə həll edin.\n        { 1x₁ - 2x₂ = -3\n\nHəlli:\n1) Əsas determinant: Δ = | 2   3 | = 2·(-2) - 3·1 = -4 - 3 = -7.\n                         | 1  -2 |\n2) 1-ci sütuna [8; -3] yazaq: Δ₁ = |  8   3 | = 8·(-2) - 3·(-3) = -16 + 9 = -7.\n                                   | -3  -2 |\n3) 2-ci sütuna [8; -3] yazaq: Δ₂ = | 2   8 | = 2·(-3) - 8·1 = -6 - 8 = -14.\n                                   | 1  -3 |\n4) Köklər: x₁ = Δ₁ / Δ = -7 / -7 = 1;   x₂ = Δ₂ / Δ = -14 / -7 = 2.',
      },
      {
        heading: '2. Mühazirə 10–14: Məxsusi Ədədlər (λ) və Vektor Həndəsəsi (Skalyar/Vektorial Hasil)',
        intuition:
          'Məxsusi ədədlər (λ — lambda) matrisin "gizli gücləridir". Onları tapmaq üçün sadəcə baş diaqonaldakı ədədlərdən λ çıxıb determinantı 0-a bərabər edirsən: det(A - λE) = 0. Vektor həndəsəsində isə iki vektorun skalyar hasili (a·b) bizə onlar arasındakı bucağı (xüsusən perpendikulyarlığı: a·b = 0), vektorial hasili (a×b) isə paralelopiped və üçbucağın sahəsini verir.',
        body: 'Kvadrat A matrisinin məxsusi ədədləri det(A - λE) = 0 xarakteristik tənliyinin kökləridir. İki düzülüş xassəsi həmişə ödənir: məxsusi ədədlərin cəmi matrisin izinə (λ₁ + λ₂ = Tr A), hasili isə determinantına (λ₁ · λ₂ = det A) bərabərdir!',
        formulaOrCode:
          '1) Məxsusi ədədlər tənliyi (2×2 üçün):\n   | a₁₁ - λ     a₁₂   | = 0  ⇒  λ² - Tr(A)·λ + det(A) = 0\n   |   a₂₁     a₂₂ - λ |\n\n2) Vektorların skalyar hasili: a · b = a_x·b_x + a_y·b_y + a_z·b_z = |a|·|b|·cos(φ)\n   Perpendikulyarlıq şərti (φ = 90°): a · b = 0\n\n3) Nöqtədən (x₀, y₀, z₀) Ax + By + Cz + D = 0 müstəvisinə məsafə:\n   d = |A·x₀ + B·y₀ + C·z₀ + D| / √(A² + B² + C²)',
        example:
          'Məsələ: A = [ 4  1 ] matrisinin məxsusi ədədlərini (λ₁, λ₂) tapın.\n            [ 2  3 ]\n\nHəlli:\nBaş diaqonaldan λ çıxıb determinantı 0-a bərabər edirik:\n| 4-λ   1  | = (4 - λ)(3 - λ) - 1·2 = λ² - 7λ + 12 - 2 = λ² - 7λ + 10 = 0.\n|  2   3-λ |\nKökləri: λ₁ = 2, λ₂ = 5. (Yoxlama: λ₁ + λ₂ = 2 + 5 = 7 = Tr(A) — doğrudur!).',
      },
    ],
  },

  // ==========================================================================
  // 4. RİYAZİ ANALİZ - 1 (LMS ID: 5039 · 6326a2_if-61115y_riyazi analiz - 1)
  // Müəllimlər: Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı (Cloudflare R2 PDF + 0-dan İzahlı Universitet Qaydaları)
  // ==========================================================================
  {
    id: 'uni_math_m1_m5',
    title: 'Riyazi analiz - 1 (Mühazirə 1–5): Çoxluqlar, Supremum, Ardıcıllıq və Funksiya Limiti, Kəsilməzlik',
    courseId: 'math',
    type: 'file',
    description:
      '✓ Keçildi (1–3-cü həftələr) və I Kollokvium Bazası · Çoxluqlar, Supremum/İnfimum, Limitlərin 0-dan hesablanması, Görkəmli limitlər və Kəsilməzlik (Cloudflare R2 PDF + 0-dan İzahlı Qaydalar)',
    fileName: 'riyazi-analiz-m1-m5-kollokvium1.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m1-m5-kollokvium1.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    createdAt: '2026-09-18T09:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Riyazi İşarələrin Lüğəti (∀, ∃, ∈, ⊆) və Supremum / İnfimum Nədir?',
        intuition:
          'Universitet riyaziyyatında uzun cümlələr yazmamaq üçün qısa işarələrdən istifadə olunur: tərs A hərfi (∀) sadəcə "hər bir / istənilən" deməkdir, tərs E hərfi (∃) isə "elə bir ... tapılır ki / var ki" deməkdir! Supremum (sup) və İnfimum (inf) isə adi maksimum və minimumun daha ağıllı formasıdır: məsələn, (0, 5) açıq intervalında 5-in özü çoxluğa daxil olmadığı üçün bu çoxluğun "maksimumu" yoxdur, amma ədədlər 5-ə sonsuz yaxınlaşdığı üçün onun ən kiçik yuxarı sərhədi — SUPREMUMU 5-dir (sup = 5), İNFİMUMU isə 0-dır (inf = 0)!',
        body: 'Yuxarıdan məhdud çoxluğun bütün yuxarı sərhədləri içərisində ən kiçiyinə onun Supremumu (sup E = M), aşağı sərhədləri içərisində ən böyüyünə isə İnfimumu (inf E = m) deyilir.',
        formulaOrCode:
          'Supremum tərifi: M = sup E  ⇔  1) ∀x ∈ E üçün x ≤ M  (M yuxarı sərhəddir)\n                               2) ∀ε > 0 üçün ∃x ∈ E : x > M - ε  (M-dən kiçik sərhəd yoxdur)\n\nİnfimum tərifi:  m = inf E  ⇔  1) ∀x ∈ E üçün x ≥ m  (m aşağı sərhəddir)\n                               2) ∀ε > 0 üçün ∃x ∈ E : x < m + ε  (m-dən böyük sərhəd yoxdur)',
        symbols: [
          '∀ — "Hər bir" və ya "İstənilən" (ingiliscə All sözünün baş hərfindən)',
          '∃ — "Var" və ya "Elə bir ... tapılır ki" (ingiliscə Exists sözünün baş hərfindən)',
          'x ∈ E — "x ədədi E çoxluğunun elementidir (içindədir)"',
          'A ⊆ B — "A çoxluğu B-nin altçoxluğudur (A-dakı hər şey B-də də var)"',
          'ε (epsilon) — istənilən qədər kiçik müsbət ədəd (məsələn, 0.0001)',
          'sup E — ən dəqiq (ən kiçik) yuxarı sərhəd; inf E — ən dəqiq (ən böyük) aşağı sərhəd',
        ],
        steps: [
          'Verilmiş çoxluğun elementlərinə n = 1, 2, 3, ... və n → ∞ qiymətləri verərək ədədlərin hansı aralıqda dəyişdiyini tap.',
          'Ən böyük (və ya sağdakı limit) sərhədi sup E, ən kiçik (və ya soldakı limit) sərhədi inf E götür.',
          'Əgər həmin sərhəd çoxluğun öz içində varsa, o həm də max (və ya min) olur; içində yoxdursa (yalnız limitdirsə), max/min yoxdur deyirik.',
        ],
        example:
          'Məsələ: E = { 1/n : n ∈ ℕ } = { 1, 1/2, 1/3, 1/4, ... } çoxluğunun sup, inf, max və min qiymətlərini tapın.\n\nHəlli:\n1) n = 1 olduqda ən böyük ədəd 1 alınır və 1 ∈ E olduğundan: sup E = 1 və max E = 1.\n2) n böyüdükcə (1/100, 1/1000...) ədədlər 0-a yaxınlaşır, amma heç vaxt 0 olmur (0 ∉ E).\n3) Ona görə ən dəqiq aşağı sərhəd: inf E = 0, lakin min E YOXDUR!',
        warning:
          'Kvantorlu cümləni inkar edəndə ∀ işarəsi ∃-yə, ∃ işarəsi isə ∀-yə çevrilir! Məsələn, "∀x > 0" inkarı "∃x ≤ 0" olur.',
      },
      {
        heading: '2. Ardıcıllığın Limiti (n → ∞) Necə Hesablanır? 3 Qızıl Qayda',
        intuition:
          'Ardıcıllığın limiti "n sonsuz böyüdükdə (n = 1000, 1000000...) x_n ifadəsi hansı ədədə yaxınlaşır?" sualının cavabıdır. Əsas sirr budur: 1 rəqəmini sonsuz böyük n-ə böldükdə (1/n) cavab 0-a çevrilir! Kəsr şəklində verilmiş limitlərdə isə sadəcə surət və məxrəcdəki ƏN BÖYÜK DƏRƏCƏLİ n-ə baxırıq!',
        body: 'lim(n→∞) x_n = a o deməkdir ki, n kifayət qədər böyük nömrədən (N) başlayaraq x_n ilə a arasındakı məsafə (|x_n - a|) istənilən ε-dan kiçik olur. Praktiki misallarda ∞/∞ qeyri-müəyyənliyini açmaq üçün ən yüksək dərəcə qaydası və ya II Görkəmli Limit (e ədədi) işlədilir.',
        formulaOrCode:
          'Qayda 1 (Polinomların nisbəti — n → ∞ olduqda):\n• Surətin dərəcəsi = Məxrəcin dərəcəsi  ⇒  Cavab = Baş əmsalların nisbəti\n• Surətin dərəcəsi < Məxrəcin dərəcəsi  ⇒  Cavab = 0\n• Surətin dərəcəsi > Məxrəcin dərəcəsi  ⇒  Cavab = ∞\n\nQayda 2 (Eyler ədədi — 1^∞ qeyri-müəyyənliyi):\nlim(n→∞) (1 + 1/n)^n = e ≈ 2.718   |   Ümumi hal: lim(n→∞) (1 + k/n)^(m·n) = e^(k·m)',
        symbols: [
          'n → ∞ — n nömrəsinin sonsuzluğa yaxınlaşması',
          'e ≈ 2.71828 — natural loqarifmin (ln) əsası olan Eyler sabiti',
          '∞ / ∞, 0 / 0, 1^∞, ∞ - ∞ — birbaşa cavabı bilinməyən və sadələşdirmə tələb edən qeyri-müəyyənliklər',
        ],
        steps: [
          'Kəsr limitdə (n → ∞) surətdəki və məxrəcdəki ən böyük qüvvətli həddi tap (qalan kiçik dərəcəli hədləri zehnində sil).',
          'Qalan ən böyük dərəcəli hədləri ixtisar et və əmsalları bir-birinə böl.',
          'Əgər mötərizə üzərində n qüvvəti varsa və mötərizənin içi 1-ə yaxınlaşırsa (1^∞), ifadəni (1 + α)^β şəklinə salıb e^(lim α·β) düsturunu tətbiq et.',
        ],
        example:
          'Misal 1: lim(n→∞) (6n² - 5n + 1) / (2n² + 4n - 3)\nHəlli: Surətdə də ən böyük dərəcə n²-dir (əmsalı 6), məxrəcdə də n²-dir (əmsalı 2). Cavab = 6 / 2 = 3!\n\nMisal 2: lim(n→∞) (1 + 3/n)^(4n)\nHəlli: Düstura görə k = 3, m = 4 olduğundan: Cavab = e^(3 · 4) = e¹².',
      },
      {
        heading: '3. Funksiyanın Limiti (x → x₀) və I Görkəmli Limit (Ekvivalentlik Cədvəli)',
        intuition:
          'x → 0 olduqda sin(x), tg(x), ln(1+x), e^x - 1 kimi funksiyalar özlərini elə x-in özü kimi aparırlar! Yəni limitdə x → 0 yazanda vurma və bölmə zamanı sin(5x) görüb yerinə birbaşa 5x yaza bilərsən, tg(3x) yerinə birbaşa 3x yaza bilərsən! Bu üsul 1 səhifəlik misalı 5 saniyəyə həll edir.',
        body: 'x → a nöqtəsində 0/0 qeyri-müəyyənliyi yarandıqda: 1) Çoxhədlidirsə vuruqlara ayırıb (x - a)-nı ixtisar edirik; 2) Kök varsa qoşmasına vururuq; 3) Triqonometrik və ya loqarifmikdirsə (x → 0 olduqda) ekvivalent sonsuz kiçilənlərlə əvəz edirik.',
        formulaOrCode:
          'I Görkəmli Limit:  lim(x→0) (sin x) / x = 1\n\nx → 0 olduqda Sürətli Ekvivalentlik Cədvəli (vurma və bölmədə birbaşa əvəz et!):\n• sin(kx) ≈ kx          • tg(kx) ≈ kx           • arcsin(kx) ≈ kx       • arctg(kx) ≈ kx\n• e^(kx) - 1 ≈ kx       • ln(1 + kx) ≈ kx       • 1 - cos(kx) ≈ (kx)² / 2',
        steps: [
          'Əvvəlcə x-in yaxınlaşdığı ədədi ifadədə yerinə qoy. Əgər 0/0 alınmırsa, elə aldığın ədəd cavabdır!',
          'Əgər x → 0 olduqda 0/0 alınırsa, cədvəldəki funksiyaları öz ekvivalentləri ilə əvəz edib x-ləri ixtisar et.',
        ],
        example:
          'Misal 1: lim(x→0) sin(6x) / tg(2x)\nHəlli: x → 0 üçün sin(6x) ≈ 6x və tg(2x) ≈ 2x. Onda: lim (6x / 2x) = 6 / 2 = 3.\n\nMisal 2: lim(x→0) (1 - cos(4x)) / x²\nHəlli: Cədvələ görə 1 - cos(4x) ≈ (4x)² / 2 = 16x² / 2 = 8x². Onda: 8x² / x² = 8.',
        warning:
          '1 - cos(x) ifadəsini x ilə əvəz ETMƏ! 1 - cos(x) həmişə x² / 2 ilə əvəz olunur!',
      },
      {
        heading: '4. Funksiyanın Kəsilməzliyi və Kəsilmə Nöqtələrinin Növləri (I və II növ)',
        intuition:
          'Kəsilməz funksiya o deməkdir ki, onun qrafikini qələmi kağızdan ayırmadan çəkmək olur! Əgər hansısa x₀ nöqtəsində qrafik qırılırsa (məsələn, məxrəc sıfıra çevrilirsə), həmin nöqtəyə Kəsilmə Nöqtəsi deyilir. Biz həmin nöqtəyə soldan (x₀ - 0) və sağdan (x₀ + 0) yaxınlaşaraq limit tapırıq.',
        body: 'Əgər həm sol limit, həm də sağ limit sonlu ədədlərdirsə, bu I NÖV kəsilmədir (sol = sağ olarsa "aradan qaldırıla bilən", sol ≠ sağ olarsa "sonlu sıçrayışlı"). Əgər limitlərdən heç olmasa biri ±∞ çıxırsa və ya yoxdursa, bu II NÖV kəsilmədir.',
        formulaOrCode:
          'Kəsilməzlik şərti: lim(x→x₀-0) f(x) = lim(x→x₀+0) f(x) = f(x₀)\n\nSıçrayış: Δ = | f(x₀ + 0) - f(x₀ - 0) |\n• Sol və sağ limit sonlu və bərabərdir   ⇒ I növ (aradan qaldırıla bilən)\n• Sol və sağ limit sonlu, amma fərqlidir ⇒ I növ (sıçrayışlı)\n• Limitlərdən biri ∞-dur və ya yoxdur    ⇒ II növ kəsilmə',
      },
    ],
  },
  {
    id: 'uni_math_m6_m15',
    title: 'Riyazi analiz - 1 (Mühazirə 6–15): Törəmə, Diferensial, Laqranj/Lopital, Teylor Düsturu və İnteqral',
    courseId: 'math',
    type: 'file',
    description:
      'Semestr və Yekun İmtahan Mövzuları (Mühazirə 6–15) · Törəmə, Lopital qaydası, Teylor düsturu və İnteqralın 0-dan izahı (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'riyazi-analiz-m6-m15-toreme-inteqral.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m6-m15-toreme-inteqral.pdf',
    authorId: 'system_aztu',
    authorName: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    createdAt: '2026-09-20T09:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Törəmə Nədir, Necə Alınır və Lopital Qaydası ilə Limit Necə Tapılır?',
        intuition:
          'Törəmə f′(x) funksiyanın nə qədər sürətlə dəyişdiyini (qrafikin həmin nöqtədəki meylini) göstərir. Törəmə həm də limit tapmaq üçün ən güclü silahdır (Lopital qaydası): əgər kəsr limitdə 0/0 və ya ∞/∞ alınırsa, surətin ayrıca törəməsini, məxrəcin də ayrıca törəməsini alıb x-i yerinə qoyursan — cavab dərhal çıxır!',
        body: 'Əsas törəmə cədvəli, hasilin/nisbətin törəməsi və Bernulli–Lopital qaydası:',
        formulaOrCode:
          'Əsas Törəmələr:\n(c)′ = 0,   (x^n)′ = n·x^(n-1),   (e^x)′ = e^x,   (ln x)′ = 1/x\n(sin x)′ = cos x,   (cos x)′ = -sin x,   (tg x)′ = 1/cos²x,   (arctg x)′ = 1/(1+x²)\n\nƏməl qaydaları:\n(u · v)′ = u′·v + u·v′   |   (u / v)′ = (u′·v - u·v′) / v²\n\nLopital Qaydası (0/0 və ya ∞/∞ olduqda):\nlim(x→a) [ f(x) / g(x) ] = lim(x→a) [ f′(x) / g′(x) ]',
        example:
          'Məsələ: lim(x→2) (x³ - 8) / (x² - 4) limitini Lopital qaydası ilə tapın.\n\nHəlli:\n1) x = 2 qoyduqda (8 - 8) / (4 - 4) = 0 / 0 alınır.\n2) Surətin törəməsi: (x³ - 8)′ = 3x²;  Məxrəcin törəməsi: (x² - 4)′ = 2x.\n3) x = 2 yerinə qoyuruq: (3 · 2²) / (2 · 2) = 12 / 4 = 3.',
        warning:
          'Lopital qaydasında kəsrin törəməsi düsturunu (u′v - uv′)/v² İŞLƏTMƏ! Surətin törəməsini ayrıca surətdə, məxrəcin törəməsini ayrıca məxrəcdə yaz.',
      },
      {
        heading: '2. Teylor–Makloren Düsturu və İnteqral Hesabı (Qeyri-müəyyən və Müəyyən İnteqral)',
        intuition:
          'İnteqral törəmənin TƏRSİDİR! Törəmədə "x²-nın törəməsi nədir?" deyib 2x tapırdıqsa, inteqralda "hansı funksiyanın törəməsi 2x-dir?" deyib x² + C tapırıq! Müəyyən inteqral (∫_a^b f(x)dx) isə həndəsi olaraq f(x) əyrisinin altında qalan fiqurun SAHƏSİNİ hesablayır.',
        body: 'İbtidai funksiya F(x) tapıldıqdan sonra müəyyən inteqral Nyuton–Leybnis düsturu ilə hesablanır: əvvəlcə yuxarı sərhədi (b), sonra aşağı sərhədi (a) qoyub bir-birindən çıxırıq: F(b) - F(a).',
        formulaOrCode:
          'Əsas İnteqrallar:\n∫ x^n dx = x^(n+1) / (n + 1) + C   (n ≠ -1)\n∫ (1/x) dx = ln|x| + C,   ∫ e^x dx = e^x + C\n∫ sin x dx = -cos x + C,  ∫ cos x dx = sin x + C\n\nHissə-hissə inteqrallama: ∫ u dv = u·v - ∫ v du\nNyuton–Leybnis düsturu:   ∫(a..b) f(x) dx = F(b) - F(a)',
        example:
          'Məsələ: ∫(0..2) (3x² + 4x) dx müəyyən inteqralını hesablayın.\n\nHəlli:\n1) İbtidai funksiyanı tapaq: F(x) = 3·(x³/3) + 4·(x²/2) = x³ + 2x².\n2) Yuxarı sərhədi (x = 2) qoyaq: F(2) = 2³ + 2·(2²) = 8 + 8 = 16.\n3) Aşağı sərhədi (x = 0) qoyaq: F(0) = 0.\n4) Fərqi: F(2) - F(0) = 16 - 0 = 16.',
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
      '✓ Keçildi (Mövzu 1–4) · KOICA LMS #4932 · Orijinal fayl: ADİAK dərs vəsaiti.docx (0-dan izahlı seminar/kollokvium qaydaları və PDF-i)',
    fileName: 'adiak-ders-vesaiti.pdf',
    fileSize: '2.3 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/aze/adiak-ders-vesaiti.pdf',
    authorId: 'system_aztu',
    authorName: 'Nərminə İsayeva',
    createdAt: '2026-09-20T10:28:29.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Mövzu 1: Kommunikasiya Nədir? Ünsiyyətin 3 Tərəfi və 3 Qızıl Sual',
        intuition:
          'Seminar dərsində müəllim ilk olaraq soruşur: "Ünsiyyət (kommunikasiya) nədir və onun neçə tərəfi var?". Yadda saxlamaq çox sadədir: biz kiminləsə danışanda 1) Məlumat ötürürük (Kommunikativ tərəf), 2) Birlikdə hərəkət/əməkdaşlıq edirik (İnteraktiv tərəf), 3) Qarşı tərəfin xasiyyətini və hissini duyuruq (Perseptiv tərəf).',
        body: '“Kommunikasiya” latınca “communicatio” (əlaqələndirmə, ünsiyyət) deməkdir. Hər hansı işgüzar çıxışdan əvvəl natiq özünə 3 əsas sual verməlidir: 1) KİM İLƏ danışmalı? (auditoriyanı tanımaq); 2) NƏ danışmalı? (məzmun və faktlar); 3) NECƏ danışmalı? (üslub və səs tonu).',
        formulaOrCode:
          'Ünsiyyətin 3 ayrılmaz tərəfi:\n1) Kommunikativ tərəf  — İnformasiya mübadiləsi (məlumat almaq və ötürmək)\n2) İnteraktiv tərəf    — Qarşılıqlı fəaliyyət (birgə iş və davranışın tənzimlənməsi)\n3) Perseptiv tərəf     — Qarşılıqlı qavrayış (həmsöhbəti anlamaq və empatiya)\n\nNitqdə statistik rəqəmlərdən istifadənin 4 qaydası:\n• Rəqəmləri həddindən artıq çox işlətməmək (dinləyicini yormamaq);\n• Böyük kəsr rəqəmləri yuvarlaqlaşdıraraq ("təxminən", "təqribən") demək;\n• Rəqəmləri tanış ölçülərlə müqayisəli şəkildə izah etmək;\n• Böyük cədvəlləri şifahi oxumaq əvəzinə ekranda qrafik/diaqramla göstərmək.',
      },
      {
        heading: '2. Mövzu 2: Rəsmi-İşgüzar Üslubun 3 Alt Üslubu və Rəsmi vs İşgüzar Sənədlərin Fərqi',
        intuition:
          'Tələbələrin imtahanda ən çox çaşdığı sual: "Rəsmi sənədlə İşgüzar sənədin fərqi nədir?". Çox sadə: RƏSMİ sənədləri dövlət başçısı, parlament və ya nazirlik qəbul edir (Qanun, Fərman, Sərəncam). İŞGÜZAR sənədləri isə biz vətəndaşlar və işçilər gündəlik işimizdə yazırıq (Ərizə, CV, Tərcümeyi-hal, İzahat, Arayış, Akt, Protokol)!',
        body: 'Rəsmi-işgüzar üslubda obrazlı sözlər, məcazlar və emosionallıq olmur; hər şey dəqiq, yığcam və standart şablonla yazılır.',
        formulaOrCode:
          'Rəsmi-işgüzar üslubun 3 alt üslubu:\n1) Qanunvericilik (xüsusi rəsmi) — Konstitusiya, Qanun, Fərman, Sərəncam, Qərar\n2) Diplomatik alt üslub          — Beynəlxalq müqavilə, Nota, Bəyanat, Memorandum\n3) İşgüzar (kargüzarlıq/dəftərxana) — Ərizə, Tərcümeyi-hal, Arayış, Akt, Protokol, İzahat',
        example:
          'Ərizənin Düzgün Yazılış Şablonu (Yadda saxla!):\n1) Vərəqin sağ yuxarı küncündə: Kimə və kimdən (məs: AzTU-nun rektoru ... cənablarına, 6326A2 qrup tələbəsi ... tərəfindən).\n2) Sətrin ortasında böyük hərflə: ƏRİZƏ.\n3) Abzasdan qısa məzmun ("Xahiş edirəm mənə ... icazə verəsiniz").\n4) Sol aşağıda tarix, sağ aşağıda şəxsi imza.',
      },
      {
        heading: '3. Mövzu 3–4: Müzakirə Mədəniyyətinin və Müsbət İmicin (Özünütəsdiqin) 6 Qaydası',
        intuition:
          'İş görüşməsində və ya təqdimatda ilk 30–60 saniyə ərzində qarşı tərəfdə yaranan təəssürat həlledicidir. Müzakirə zamanı isə əsas qayda "şəxsiyyəti yox, fikri tənqid etmək" və həmsöhbətin sözünü kəsmədən dinləməkdir.',
        body: 'Dərs vəsaitində verilən müzakirə və özünütəsdiq qaydaları:',
        formulaOrCode:
          'Müzakirə mədəniyyətinin 6 qaydası:\n1) Müzakirənin məqsədini əvvəlcədən dəqiq müəyyənləşdirmək;\n2) Qarşı tərəfin sözünü kəsmədən axıra qədər dinləmək;\n3) Şəxsiyyəti deyil, yalnız arqumenti tənqid etmək;\n4) Faktlara və məntiqə əsaslanmaq;\n5) Ortaq məxrəcə (konsensusa) gəlməyə çalışmaq;\n6) Nitq etiketi və subordinasiya (vəzifə/yaş) normalarına əməl etmək.\n\nMüsbət imic yaratmağın 6 qaydası:\n1) Səmimi təbəssüm və göz təması (vizual kontakt);\n2) Məkana uyğun səliqəli işgüzar geyim (dress-kod);\n3) Düz qamət və təmkinli jestlər;\n4) Aydın diksiya və sakit, inamlı səs tonu;\n5) Həmsöhbətə adı ilə müraciət etmək;\n6) Bacarıqlarını şişirtmədən, real faktlarla təqdim etmək.',
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
  // Müəllim: Müəl. Dilarə Həmidova (Cloudflare R2 PDF + 0-dan İzahlı Akademik İngilis Dili Qaydaları)
  // ==========================================================================
  {
    id: 'uni_eng_xdiak',
    title: 'XDİAK — Academic & Technical Communication in English for Computer Engineering',
    courseId: 'eng',
    type: 'file',
    description:
      'Universitet Səviyyəli Akademik və İşgüzar İngilis Dili Konspekti · Sadə dillə izahlı Formal vs Informal lüğət, IMRaD məqalə şablonu və Rəsmi E-mail yazılışı (Cloudflare R2 PDF + Qaydalar)',
    fileName: 'xdiak-academic-english-cs.pdf',
    fileSize: '0.1 MB · PDF + 0-dan İzahlı Qaydalar',
    fileMime: 'application/pdf',
    linkUrl: 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/eng/xdiak-academic-english-cs.pdf',
    authorId: 'system_aztu',
    authorName: 'Müəl. Dilarə Həmidova',
    createdAt: '2026-09-20T11:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Akademik İngilis Dili Nədir? Gündəlik Sözləri Elmi Sözlərlə Necə Əvəz Edirik?',
        intuition:
          'Universitetdə ingilis dilində məqalə, hesabat və ya rəsmi məktub yazarkən gündəlik danışıq sözlərindən ("get", "look into", "a lot of") və qısaldılmış formalardan ("don\'t", "can\'t") istifadə etmək OLMAZ! Onların yerinə rəsmi akademik feillər və məchul növ (Passive Voice) işlədilir.',
        body: 'İmtahanda və yazı işlərində ən çox lazım olan Gündəlik (Informal) → Akademik (Formal) söz əvəzləmələri:',
        formulaOrCode:
          'find out  → determine / ascertain   (müəyyən etmək)\nlook into → investigate / examine   (araşdırmaq)\nset up    → configure / establish   (quraşdırmaq / yaratmaq)\ngo up     → increase / escalate     (artmaq)\ngo down   → decrease / diminish     (azalmaq)\nshow      → demonstrate / illustrate (nümayiş etdirmək)\nneed      → require                 (tələb etmək)\nuse       → utilize                 (istifadə etmək)',
        symbols: [
          'Nominalization (İsimləşmə) — hərəkəti feillə yox, isimlə ifadə etmək (məs: "we analyzed" → "the analysis of")',
          'Hedging (Ehtiyatlı iddia) — 100% kəskin danışmamaq üçün "may", "suggests", "indicates" sözlərini işlətmək',
          'Passive Voice (Məchul növ) — "I tested the code" əvəzinə "The algorithm was evaluated" yazmaq',
        ],
      },
      {
        heading: '2. Elmi Məqalənin IMRaD Strukturu və Rəsmi E-mail Şablonu',
        intuition:
          'Bütün dünyada mühəndislik məqalələri IMRaD adlı 4 hissədən ibarət olur: 1) Introduction (Mövzu nədir və hansı problem var?), 2) Methodology (Problemi hansı üsulla həll etdik?), 3) Results (Hansı rəqəmləri və qrafikləri aldıq?), 4) Discussion (Bu nəticələr nə deməkdir?).',
        body: 'Professor və ya şirkətə rəsmi e-mail yazarkən və ya qrafik təsvir edərkən hazır akademik şablonlardan istifadə et:',
        formulaOrCode:
          'Rəsmi Akademik E-mail Şablonu:\n1) Müraciət (Salutation):  Dear Professor [Soyad],  /  Dear Hiring Manager,\n2) Giriş (Opening):        I am writing in reference to the Computer Engineering project...\n3) Əsas hissə (Request):   Could you please clarify the submission requirements for...\n4) Yekun (Closing):        Thank you in advance for your time and consideration.\n5) İmza (Sign-off):        Sincerely, / Kind regards,\n                           [Ad Soyad], Group 6326A2',
      },
    ],
  },
];

// KOICA LMS-də hazırda aktiv tapşırıq yoxdur (tasks: [])
export const BUILT_IN_DEADLINES: Deadline[] = [];
