/**
 * AzTU 6326A2 — Kolloqvium İmtahan Biletləri və Sual Bankı
 * Hər fənn üçün 1 Açıq Nəzəri Mövzu İzahı + 2 Praktiki Misal/Məsələ.
 * Gələcəkdə yeni rəsmi kolloqvium sualları bu fayla asanlıqla əlavə olunur.
 */

export type QuestionType = 'open_theory' | 'practical_problem';

export interface RubricItem {
  criterion: string;
  points: number;
}

export interface ColloquiumQuestion {
  id: string;
  courseSlug: 'math-analysis' | 'linear-algebra' | 'physics' | 'programming';
  type: QuestionType;
  topic: string;
  title: string;
  question: string;
  formulaTeX?: string;
  maxScore: number;
  inputPlaceholder: string;
  rubric: RubricItem[];
  officialSolution: {
    title: string;
    steps: string[];
    finalAnswer?: string;
    keyTakeaway: string;
  };
}

export interface ColloquiumTicket {
  ticketId: string;
  ticketNumber: string;
  courseSlug: string;
  courseName: string;
  drawnAt: string;
  theoryQuestion: ColloquiumQuestion;
  problem1: ColloquiumQuestion;
  problem2: ColloquiumQuestion;
  totalMaxScore: number;
}

export const COURSE_NAMES: Record<string, string> = {
  'math-analysis': 'Riyazi analiz - 1',
  'linear-algebra': 'Xətti cəbr və analitik həndəsə',
  physics: 'Fizika - 1',
  programming: 'Proqramlaşdırmanın əsasları - 1',
};

export const COLLOQUIUM_QUESTIONS: ColloquiumQuestion[] = [
  // ==========================================
  // 1. RİYAZİ ANALİZ - 1
  // ==========================================
  {
    id: 'mat-th-1',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Veyerştras Teoremi və Limitlər',
    title: 'Monoton və Məhdud Ardıcıllığın Limiti Haqqında Veyerştras Teoremi',
    question:
      'Monoton artan (və ya azalan) və yuxarıdan (aşağıdan) məhdud ardıcıllığın sonlu limitə malik olması haqqında Veyerştras teoremini tam şəkildə ifadə edin, dəqiq yuxarı sərhəd (supremum) anlayışını izah edin və teoremin isbat addımlarını sözlə şərh edin.',
    formulaTeX: '\\forall n \\in \\mathbb{N}: \\, x_n \\le x_{n+1} \\le M \\implies \\exists \\lim_{n \\to \\infty} x_n = \\sup \\{x_n\\}',
    maxScore: 4,
    inputPlaceholder:
      'Teoremin dəqiq tərifini, ardıcıllığın monotonluq və məhdudluq şərtlərini, supremumun 2 əsas xassəsini və isbatın məntiqi ardıcıllığını qeyd edin...',
    rubric: [
      { criterion: 'Teoremin tam riyazi şərtinin və hökmünün düzgün ifadəsi', points: 1 },
      { criterion: 'Dəqiq yuxarı sərhəd (supremum, S) anlayışının və xassələrinin izahı', points: 1 },
      { criterion: 'İsbat addımları: ixtiyari ε > 0 üçün S-ε həddindən böyük həddin tapılması', points: 1 },
      { criterion: 'Monotonluq sayəsində bütün sonrakı hədlərin ε-qonşuluğuna düşməsinin əsaslandırılması', points: 1 },
    ],
    officialSolution: {
      title: 'Veyerştras Teoreminin Rəsmi İzahı və İsbatı',
      steps: [
        'Şərt: Fərz edək ki, {xₙ} ardıcıllığı monoton artandır (hər n üçün xₙ₊₁ ≥ xₙ) və yuxarıdan məhduddur (elə M ədədi var ki, ∀n üçün xₙ ≤ M).',
        'Supremumun seçilməsi: Çoxluq yuxarıdan məhdud olduğundan, həqiqi ədədlərin kəsilməzliyi (Dedekind/Kantor) aksiyomuna əsasən onun dəqiq yuxarı sərhədi mövcuddur: S = sup{xₙ}.',
        'Supremum xassəsi: İxtiyari ε > 0 götürək. S dəqiq yuxarı sərhəd olduğundan, S - ε artıq yuxarı sərhəd ola bilməz. Deməli, elə bir N nömrəsi tapılar ki, x_N > S - ε olar.',
        'Monotonluğun tətbiqi: {xₙ} artan olduğundan, bütün n > N nömrələri üçün xₙ ≥ x_N > S - ε ödənilir. Digər tərəfdən, S yuxarı sərhəd olduğundan həmişə xₙ ≤ S < S + ε.',
        'Yekun nəticə: Beləliklə, bütün n > N üçün S - ε < xₙ < S + ε, yəni |xₙ - S| < ε bərabərsizliyi ödənir. Bu isə limitin tərifinə görə lim(n→∞) xₙ = S olduğunu tam isbat edir.',
      ],
      keyTakeaway: 'Hər bir monoton artan və yuxarıdan məhdud ardıcıllıq mütləq yığılır və onun limiti məhz onun dəqiq yuxarı sərhədinə (supremumuna) bərabərdir.',
    },
  },
  {
    id: 'mat-th-2',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Limitlərin Ekvivalentliyi',
    title: 'Funksiyanın Nöqtədə Limiti: Heyne və Koşi Tərifləri',
    question:
      'Funksiyanın x₀ nöqtəsində A sonlu limitinə malik olmasının "dildə ardıcıllıqlar" (Heyne) və "dildə ε-δ" (Koşi) təriflərini dəqiq yazın. Bu iki tərifin ekvivalentliyinin məntiqi mahiyyətini izah edin.',
    formulaTeX: '\\lim_{x \\to x_0} f(x) = A \\iff \\forall \\varepsilon > 0, \\, \\exists \\delta > 0: \\, 0 < |x - x_0| < \\delta \\implies |f(x) - A| < \\varepsilon',
    maxScore: 4,
    inputPlaceholder:
      'Koşi (ε-δ) tərifini, Heyne (ardıcıllıqlar) tərifini və funksiyanın nöqtədə kəsilməzliyi ilə əlaqəsini sözlə şərh edin...',
    rubric: [
      { criterion: 'Koşi tərifinin (ε-δ qonşuluğu) riyazi dəqiqliklə yazılması', points: 1.5 },
      { criterion: 'Heyne tərifinin (ixtiyari x_n → x₀ ardıcıllığı üçün f(x_n) → A) izahı', points: 1.5 },
      { criterion: 'Təriflərin ekvivalentliyinin və praktikada tətbiq sahələrinin göstərilməsi', points: 1 },
    ],
    officialSolution: {
      title: 'Heyne və Koşi Təriflərinin Müqayisəsi',
      steps: [
        'Koşi tərifi: İxtiyari ε > 0 üçün elə bir δ > 0 tapmaq mümkündür ki, x arqumenti 0 < |x - x₀| < δ şərtini ödədikdə, funksiyanın qiyməti |f(x) - A| < ε bərabərsizliyini ödəsin.',
        'Heyne tərifi: x₀-a yığılan və hədləri x₀-dan fərqli olan ixtiyari {xₙ} ardıcıllığı üçün funksiya qiymətlərinin {f(xₙ)} ardıcıllığı A ədədinə yığılmalıdır.',
        'Məntiqi ekvivalentlik: Koşi tərifi həndəsi və qonşuluq intuisiyasını, Heyne tərifi isə ardıcıllıqlar nəzəriyyəsinin güclü aparatını analizə cəlb etməyə imkan verir.',
      ],
      keyTakeaway: 'Limitin varlığını isbat etmək üçün adətən Koşi tərifindən, limitin olmadığını göstərmək üçün isə müxtəlif limitlərə yığılan iki Heyne ardıcıllığı qurmaqdan istifadə edilir.',
    },
  },
  {
    id: 'mat-pr-1',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'Görkəmli Limitlər',
    title: 'Ekvivalent Sonsuz Kiçilənlər ilə Limitin Hesablanması',
    question:
      'Aşağıdakı limiti ekvivalent sonsuz kiçilənlərin əvəzlənməsi qaydası və ya 1-ci görkəmli limitdən istifadə edərək addım-addım hesablayın:',
    formulaTeX: '\\lim_{x \\to 0} \\frac{\\sin(5x)}{\\ln(1 + 2x)}',
    maxScore: 3,
    inputPlaceholder: 'x → 0 olduqda istifadə etdiyiniz ekvivalentlikləri və ardıcıl ixtisar addımlarını yazın...',
    rubric: [
      { criterion: '0/0 qeyri-müəyyənliyinin qeyd edilməsi', points: 0.5 },
      { criterion: 'sin(5x) ~ 5x və ln(1+2x) ~ 2x ekvivalentliklərinin əsaslandırılması', points: 1.5 },
      { criterion: 'Doğru yekun cavabın (5/2 və ya 2.5) tapılması', points: 1 },
    ],
    officialSolution: {
      title: 'Həll Metodu və Cavab',
      steps: [
        'x = 0 qoyduqda sin(0) = 0 və ln(1) = 0 olduğundan [0/0] qeyri-müəyyənliyi yaranır.',
        'x → 0 olduqda məlum ekvivalentliklər: sin(α) ~ α və ln(1 + β) ~ β.',
        'Burada α = 5x və β = 2x olduğundan: sin(5x) ~ 5x və ln(1 + 2x) ~ 2x.',
        'Kəsrə tətbiq etdikdə: lim(x→0) [sin(5x) / ln(1+2x)] = lim(x→0) [5x / 2x].',
        'x ≠ 0 olduğundan x-lər ixtisar olunur və limit 5/2 = 2.5 alınır.',
      ],
      finalAnswer: '5/2 (və ya 2.5)',
      keyTakeaway: 'Hasil və nisbət daxilində sonsuz kiçilənləri onların baş hissələri ilə əvəz etmək limiti 1 sətirdə tapmağa imkan verir.',
    },
  },
  {
    id: 'mat-pr-2',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'İkinci Görkəmli Limit',
    title: '1^∞ Qeyri-müəyyənliyinin e Əsasına Gətirilməsi',
    question:
      'Aşağıdakı limiti ikinci görkəmli limit qaydasına əsasən addım-addım həll edin:',
    formulaTeX: '\\lim_{x \\to \\infty} \\left( \\frac{x + 3}{x - 1} \\right)^{2x + 1}',
    maxScore: 3,
    inputPlaceholder: 'Tam hissənin ayrılması, 1^∞ qeyri-müəyyənliyinin e dərəcəsinə çevrilməsi və yekun cavab...',
    rubric: [
      { criterion: '1^∞ qeyri-müəyyənliyinin aşkar olunması', points: 0.5 },
      { criterion: 'Mötərizə daxilində 1 + α(x) şəklində tam hissənin ayrılması: 1 + 4/(x-1)', points: 1 },
      { criterion: 'İkinci görkəmli limitin tərsinin qüvvətə gətirilməsi və dərəcə limitinin hesablanması', points: 1 },
      { criterion: 'Düzgün yekun cavab: e^8', points: 0.5 },
    ],
    officialSolution: {
      title: 'İkinci Görkəmli Limitə Gətirmə Həlli',
      steps: [
        'x → ∞ olduqda (x+3)/(x-1) → 1 və dərəcə (2x+1) → ∞ olduğundan [1^∞] qeyri-müəyyənliyi alınır.',
        'Kəsri 1 + α(x) şəklinə gətirək: (x + 3) / (x - 1) = (x - 1 + 4) / (x - 1) = 1 + 4 / (x - 1).',
        'İkinci görkəmli limit qaydası: lim (1 + 1/u)^u = e (u → ∞). Burada u = (x - 1)/4.',
        'Qüvvəti çevirək: (2x + 1) = [ (x - 1)/4 ] * [ 4 * (2x + 1) / (x - 1) ].',
        'Dərəcənin limitini hesablayaq: lim(x→∞) [ 4(2x + 1) / (x - 1) ] = lim(x→∞) [ (8x + 4) / (x - 1) ] = 8.',
        'Nəticə olaraq bütöv ifadə e^8 ədədinə bərabər olur.',
      ],
      finalAnswer: 'e^8',
      keyTakeaway: 'Hər bir [1^∞] tipli limit e^(lim [f(x)-1]*g(x)) universal düsturu ilə dərhal həll olunur.',
    },
  },

  // ==========================================
  // 2. XƏTTİ CƏBR VƏ ANALİTİK HƏNDƏSƏ
  // ==========================================
  {
    id: 'alg-th-1',
    courseSlug: 'linear-algebra',
    type: 'open_theory',
    topic: 'Determinant Xassələri',
    title: 'Determinantın Əsas Xassələri və Cəbri Tamamlayıcılar',
    question:
      'Determinantın sətir və sütun əməliyyatları üzrə ən azı 4 əsas xassəsini ifadə edin (məsələn, sətirlərin yerdəyişməsi, ortaq vuruğun çıxarılması, xətti asılılıq). Matris elementinin minoru və cəbri tamamlayıcısı anlayışlarını izah edin.',
    formulaTeX: 'A_{ij} = (-1)^{i+j} M_{ij}, \\quad \\det(A) = \\sum_{j=1}^{n} a_{ij} A_{ij}',
    maxScore: 4,
    inputPlaceholder:
      'Determinantın 4 xassəsini, minor və cəbri tamamlayıcının fərqini və sətir üzrə ayrılış düyməsini sözlə yazın...',
    rubric: [
      { criterion: 'Determinantın 4 əsas xassəsinin dəqiq ifadə edilməsi', points: 1.5 },
      { criterion: 'Minor (M_ij) və Cəbri tamamlayıcı (A_ij) arasındakı (-1)^(i+j) işarə fərqinin izahı', points: 1.5 },
      { criterion: 'Determinantın ixtiyari sətir və ya sütun üzrə ayrılış düsturunun yazılması', points: 1 },
    ],
    officialSolution: {
      title: 'Determinant Xassələri və Ayrılış Teoremi',
      steps: [
        'Xassə 1: İki sətrin yerini dəyişdikdə determinantın yalnız işarəsi əksinə dəyişir.',
        'Xassə 2: Hər hansı sətrin bütün elementlərinin ortaq vuruğunu determinant işarəsi xaricinə çıxarmaq olar.',
        'Xassə 3: İki eyni və ya mütənasib sətri olan determinant 0-a bərabərdir.',
        'Xassə 4: Bir sətrin elementlərinə başqa sətrin k saylı mislini əlavə etdikdə determinantın qiyməti dəyişmir.',
        'Minor və Cəbri Tamamlayıcı: M_ij — i-ci sətir və j-ci sütun silindikdən sonra qalan (n-1)-tərtibli determinantdır. A_ij = (-1)^(i+j) * M_ij isə həmin elementin cəbri tamamlayıcısı adlanır.',
      ],
      keyTakeaway: 'Determinantı hesablamağın ən sürətli yolu sətir çevirmələri ilə bir sətirdə maksimum sıfırlar almaq və həmin sətir üzrə ayrılış etməkdir.',
    },
  },
  {
    id: 'alg-pr-1',
    courseSlug: 'linear-algebra',
    type: 'practical_problem',
    topic: 'Kramer Qaydası',
    title: 'Xətti Tənliklər Sisteminin Kramer Üsulu ilə Həlli',
    question:
      'Aşağıdakı 2-məchullu xətti tənliklər sistemini Kramer qaydası ilə (əsas və köməkçi determinantları hesablamaqla) həll edin:',
    formulaTeX: '\\begin{cases} 2x + 3y = 8 \\\\ 5x - y = 3 \\end{cases}',
    maxScore: 3,
    inputPlaceholder: 'Δ, Δx, Δy determinantlarının hesablanması və x, y qiymətləri...',
    rubric: [
      { criterion: 'Əsas determinantın tapılması: Δ = 2*(-1) - 3*5 = -17', points: 1 },
      { criterion: 'Köməkçi determinantların tapılması: Δx = -17, Δy = -34', points: 1 },
      { criterion: 'Doğru həll cütünün tapılması: x = 1, y = 2', points: 1 },
    ],
    officialSolution: {
      title: 'Kramer Sistemi ilə Həll Addımları',
      steps: [
        'Əsas determinant: Δ = | 2   3 | / | 5  -1 | = (2)(-1) - (3)(5) = -2 - 15 = -17 ≠ 0 (Yeganə həll var).',
        'x üçün determinant: Δx = | 8   3 | / | 3  -1 | = (8)(-1) - (3)(3) = -8 - 9 = -17.',
        'y üçün determinant: Δy = | 2   8 | / | 5   3 | = (2)(3) - (8)(5) = 6 - 40 = -34.',
        'Məchulların tapılması: x = Δx / Δ = -17 / -17 = 1.',
        'y = Δy / Δ = -34 / -17 = 2.',
      ],
      finalAnswer: 'x = 1, y = 2  (Həll cütü: (1, 2))',
      keyTakeaway: 'Əgər əsas determinant Δ ≠ 0 olarsa, sistemin Kramer qaydası ilə həmişə yeganə həlli mövcuddur.',
    },
  },
  {
    id: 'alg-pr-2',
    courseSlug: 'linear-algebra',
    type: 'practical_problem',
    topic: 'Tərs Matris',
    title: '2x2 Matrisin Tərsinin Tapılması',
    question:
      'Verilmiş A matrisinin determinantını yoxlayın və onun tərs matrisini (A⁻¹) qurun:',
    formulaTeX: 'A = \\begin{pmatrix} 4 & 7 \\\\ 1 & 2 \\end{pmatrix}',
    maxScore: 3,
    inputPlaceholder: 'det(A), cəbri tamamlayıcılar matrisi və A^-1 nəticəsi...',
    rubric: [
      { criterion: 'det(A) = 4*2 - 7*1 = 1 tapılması və tərsin mövcudluğunun qeyd edilməsi', points: 1 },
      { criterion: 'Transponirə edilmiş cəbri tamamlayıcılar matrisinin düzgün qurulması', points: 1 },
      { criterion: 'Doğru A⁻¹ matrisinin yazılması: [[2, -7], [-1, 4]]', points: 1 },
    ],
    officialSolution: {
      title: 'Tərs Matrisin Qurulması',
      steps: [
        'Determinantı hesablayaq: det(A) = 4*2 - 7*1 = 8 - 7 = 1 ≠ 0. det(A) ≠ 0 olduğundan A matrisi qeyri-məxsusidir və tərs matrisi var.',
        '2x2 matrisi üçün qısa tərs düsturu: [[a, b], [c, d]]⁻¹ = (1/det) * [[d, -b], [-c, a]].',
        'Baş diaqonal elementlərinin yerini dəyişirik: 4 və 2 çevrilir 2 və 4.',
        'Yan diaqonal elementlərinin işarəsini əksinə çeviririk: 7 və 1 çevrilir -7 və -1.',
        'det(A) = 1 olduğundan matris birbaşa: [[2, -7], [-1, 4]] alınır.',
      ],
      finalAnswer: 'A⁻¹ = [[2, -7], [-1, 4]]',
      keyTakeaway: 'Yoxlama: A * A⁻¹ = [[4*2 + 7*(-1), 4*(-7) + 7*4], [1*2 + 2*(-1), 1*(-7) + 2*4]] = [[1, 0], [0, 1]] = E.',
    },
  },

  // ==========================================
  // 3. FİZİKA - 1
  // ==========================================
  {
    id: 'phy-th-1',
    courseSlug: 'physics',
    type: 'open_theory',
    topic: 'Dinamikanın Əsas Qanunları',
    title: 'Nyutonun İkinci Qanunu və Qapalı Sistemdə İmpulsun Saxlanması',
    question:
      'Nyutonun ikinci qanununun diferensial formasını (qüvvə və impuls əlaqəsi) yazın. Qapalı sistem anlayışını və xarici qüvvələrin əvəzləyicisi sıfır olduqda tam impulsun saxlanması qanununu fiziki mənası ilə şərh edin.',
    formulaTeX: '\\vec{F} = \\frac{d\\vec{p}}{dt}, \\quad \\sum \\vec{F}_{xarici} = 0 \\implies \\vec{P} = \\sum m_i \\vec{v}_i = \\text{const}',
    maxScore: 4,
    inputPlaceholder:
      'Nyutonun 2-ci qanununu impuls dəyişməsi ilə izah edin, qapalı sistemi tərif edin və impulsun saxlanmasını yazın...',
    rubric: [
      { criterion: 'Nyutonun 2-ci qanununun F = dp/dt şəklində dəqiq yazılışı və izahı', points: 1.5 },
      { criterion: 'Qapalı sistemin tərifi (yalnız daxili qüvvələrin qarşılıqlı təsiri)', points: 1 },
      { criterion: 'İmpulsun saxlanması qanununun vektor şəkildə ifadəsi və reaktiv hərəkət nümunəsi', points: 1.5 },
    ],
    officialSolution: {
      title: 'İmpuls və Dinamika Qanununun Əsaslandırılması',
      steps: [
        'Diferensial forma: Cismə təsir edən əvəzləyici qüvvə onun impulsunun zamana görə birinci tərtib törəməsinə bərabərdir: F = dp/dt.',
        'Kütlə sabit olduqda: p = m*v olduğundan dp/dt = m*(dv/dt) = m*a düsturuna gəlir.',
        'Qapalı sistem: Kənar cisimlərlə qarşılıqlı təsirdə olmayan və ya kənar qüvvələrin vektorial cəmi sıfır olan sistem qapalı sistem adlanır.',
        'Saxlanma qanunu: Əgər F_xarici = 0 olarsa, dP/dt = 0 olur. Törəməsi sıfır olan kəmiyyət isə zamana görə sabitdir: P = const.',
      ],
      keyTakeaway: 'İmpulsun saxlanması qanunu fəzanın bircinsliyinin (fəzada bütün nöqtələrin fiziki cəhətdən eyni hüquqlu olmasının) birbaşa nəticəsidir.',
    },
  },
  {
    id: 'phy-pr-1',
    courseSlug: 'physics',
    type: 'practical_problem',
    topic: 'Kinetik Enerji və İmpuls',
    title: 'Mütləq Qeyri-Elastiki Toqquşmada Enerji İtkisi',
    question:
      'Kütləsi m₁ = 2 kq olan cisim v₁ = 6 m/san sürətlə sükunətdə olan (v₂ = 0) m₂ = 4 kq kütləli cismə doğru hərəkət edərək onunla mütləq qeyri-elastiki toqquşur. Toqquşmadan sonrakı ortaq sürəti və ayrılan istilik miqdarını (itirilən mexaniki enerjini) hesablayın.',
    formulaTeX: 'm_1 v_1 = (m_1 + m_2) u, \\quad Q = E_{k1} - E_{k2}',
    maxScore: 3,
    inputPlaceholder: 'Ortaq sürət u və ayrılan istilik Q addım-addım hesablansın...',
    rubric: [
      { criterion: 'İmpulsun saxlanması ilə ortaq sürətin tapılması: u = 2 m/san', points: 1 },
      { criterion: 'Başlanğıc kinetik enerjinin hesablanması: E_k1 = 36 C', points: 1 },
      { criterion: 'Son enerji və ayrılan istilik miqdarının düzgün tapılması: Q = 24 C', points: 1 },
    ],
    officialSolution: {
      title: 'Qeyri-Elastiki Toqquşma Hesablaması',
      steps: [
        'İmpulsun saxlanması: m₁*v₁ + m₂*v₂ = (m₁ + m₂)*u. Verilənləri yerinə yazaq: 2*6 + 0 = (2 + 4)*u => 12 = 6u => u = 2 m/san.',
        'Başlanğıc kinetik enerji: E₁ = (m₁ * v₁²) / 2 = (2 * 36) / 2 = 36 C.',
        'Toqquşmadan sonrakı tam kinetik enerji: E₂ = ((m₁ + m₂) * u²) / 2 = (6 * 4) / 2 = 12 C.',
        'İtirilən mexaniki enerji (istiliyə çevrilən hissə): Q = E₁ - E₂ = 36 - 12 = 24 C.',
      ],
      finalAnswer: 'Ortaq sürət: u = 2 m/san, Ayrılan istilik: Q = 24 Coul',
      keyTakeaway: 'Mütləq qeyri-elastiki toqquşmada impuls həmişə qorunur, lakin mexaniki enerjinin bir hissəsi daxili enerjiyə (deformasiya və istiliyə) çevrilir.',
    },
  },
  {
    id: 'phy-pr-2',
    courseSlug: 'physics',
    type: 'practical_problem',
    topic: 'Mail Müstəvi Dinamikası',
    title: 'Sürtünməli Mail Müstəvidə Təcilin Tapılması',
    question:
      'Üfüqlə α = 30° bucaq əmələ gətirən mail müstəvi üzərində sürüşən cismin sürtünmə əmsalı μ = 0.2-dir. Cismin aşağıya doğru hərəkət təcilini hesablayın (g = 10 m/san², sin30° = 0.5, cos30° ≈ 0.866).',
    formulaTeX: 'a = g (\\sin\\alpha - \\mu \\cos\\alpha)',
    maxScore: 3,
    inputPlaceholder: 'Nyutonun 2-ci qanununun proyeksiyaları və təcil a-nın qiyməti...',
    rubric: [
      { criterion: 'Ağırlıq və sürtünmə qüvvələrinin oxlar üzrə proyeksiyalarının yazılması', points: 1 },
      { criterion: 'a = g(sinα - μ*cosα) düsturunun çıxarılışı', points: 1 },
      { criterion: 'Doğru ədədi cavabın hesablanması: a ≈ 3.27 m/san²', points: 1 },
    ],
    officialSolution: {
      title: 'Mail Müstəvi Üzrə Hərəkət Təcili',
      steps: [
        'Mail müstəviyə paralel ox üzrə qüvvələr: F_x = m*g*sinα - F_sürt = m*a.',
        'Müstəviyə perpendikulyar ox üzrə: N = m*g*cosα.',
        'Sürüşmə sürtünmə qüvvəsi: F_sürt = μ * N = μ * m * g * cosα.',
        'Tənliyi a üçün açaq: m*a = m*g*sinα - μ*m*g*cosα => a = g*(sinα - μ*cosα).',
        'Rəqəmləri qoyaq: a = 10 * (0.5 - 0.2 * 0.866) = 10 * (0.5 - 0.1732) = 10 * 0.3268 ≈ 3.27 m/san².',
      ],
      finalAnswer: 'a ≈ 3.27 m/san²',
      keyTakeaway: 'Mail müstəvidə təcil cismin kütləsindən asılı deyil; yalnız bucaqdan, sürtünmə əmsalından və qravitasiyadan asılıdır.',
    },
  },

  // ==========================================
  // 4. PROQRAMLAŞDIRMANIN ƏSASLARI - 1 (PYTHON)
  // ==========================================
  {
    id: 'prg-th-1',
    courseSlug: 'programming',
    type: 'open_theory',
    topic: 'Yaddaş Strukturu və Obyektlər',
    title: 'Pythonda Dəyişənlər: Mutable və Immutable Tiplər, Yaddaş Referansları',
    question:
      'Pythonda "hər şey obyektdir" fəlsəfəsini, dəyişənlərin yaddaş ünvanı (id() funksiyası), mutable (dəyişdirilə bilən) və immutable (dəyişdirilə bilməyən) tiplər arasındakı fərqləri kod nümunəsi ilə izah edin. Niyə funksiyaya arqument kimi `def foo(arr=[])` yazmaq təhlükəlidir?',
    formulaTeX: '\\text{id}(x) == \\text{id}(y) \\implies x \\text{ is } y',
    maxScore: 4,
    inputPlaceholder:
      'Mutable/Immutable tiplərin siyahısını, yaddaş referansı məntiqini və default arqument xətasını izah edin...',
    rubric: [
      { criterion: 'Immutable tiplərin (int, float, str, tuple) və Mutable tiplərin (list, dict, set) düzgün göstərilməsi', points: 1.5 },
      { criterion: 'Yaddaş ünvanı dəyişimi: a = a + 1 vs list.append() fərqinin izahı', points: 1.5 },
      { criterion: 'Default parametr xətasının (def f(lst=[])) yaddaşda təkrar istifadə riskinin göstərilməsi', points: 1 },
    ],
    officialSolution: {
      title: 'Python Yaddaş Modeli və Obyektlər',
      steps: [
        'Dəyişən mexanizmi: Pythonda dəyişən dəyərin özünü yox, onun yaddaşdakı ünvanına istinadını (reference) saxlayır.',
        'Immutable tiplər: int, float, str, tuple, frozenset, bool. Dəyər dəyişdikdə köhnə obyekt dəyişmir, yaddaşda tam yeni obyekt yaranır və dəyişən yeni ünvana yönəlir.',
        'Mutable tiplər: list, dict, set. Obyektin daxili elementləri dəyişdirildikdə onun yaddaş ünvanı (id) eyni qalır (in-place modification).',
        'Təhlükəli default parametr: `def f(arr=[])` yazıldıqda boş list funksiya elan olunanda YALNIZ BİR DƏFƏ yaranır. Hər çağırışda eyni list istifadə olunur və əvvəlki çağırışların qalıqları toplanır. Düzgün yol: `def f(arr=None): if arr is None: arr = []` yazmaqdır.',
      ],
      keyTakeaway: 'Dəyişdirilə bilən (mutable) tiplərin kopyasını çıxararkən mütləq `copy()` və ya `deepcopy()` istifadə edilməlidir.',
    },
  },
  {
    id: 'prg-pr-1',
    courseSlug: 'programming',
    type: 'practical_problem',
    topic: 'Alqoritmlər və Listlər',
    title: 'Python ilə Unikal Sıralanmış Siyahının Yaradılması',
    question:
      'Verilmiş qarışıq siyahıdan təkrar elementləri çıxaran, qalan elementləri artan sıra ilə qaytaran Python funksiyasını ən optimal üsulla yazın və onun vaxt mürəkkəbliyini (Big-O) qeyd edin:',
    formulaTeX: '\\text{Giriş: } [4, 1, 2, 4, 3, 2, 5, 1] \\implies \\text{Çıxış: } [1, 2, 3, 4, 5]',
    maxScore: 3,
    inputPlaceholder: 'def unikal_sirala(arr): funksiya kodunu və mürəkkəblik izahını qeyd edin...',
    rubric: [
      { criterion: 'Təkrarların silinməsi üçün set() və ya unikal filtrin istifadəsi', points: 1 },
      { criterion: 'Artan sıra ilə çeşidləmə (sorted() və ya sort()) tətbiqi', points: 1 },
      { criterion: 'Zaman mürəkkəbliyinin (O(N log N)) düzgün əsaslandırılması', points: 1 },
    ],
    officialSolution: {
      title: 'Optimal Həll Kodu',
      steps: [
        'Python Kodu:\n```python\ndef unikal_sirala(arr):\n    # 1. set() vasitəsilə təkrarları O(N) zamanda silirik\n    unikal = set(arr)\n    # 2. Timsort (sorted) vasitəsilə O(K log K) zamanda sıralayırıq\n    return sorted(unikal)\n```',
        'Alternativ həll (sıranı qorumaq üçün): `list(dict.fromkeys(arr))` istifadə edilə bilər.',
        'Mürəkkəblik təhlili: set() qurulması O(N), çeşidləmə isə O(K log K) tələb edir (burada K unikal elementlərin sayıdır, K ≤ N). Yekun mürəkkəblik: O(N log N).',
      ],
      finalAnswer: 'sorted(set(arr)) -> Zaman mürəkkəbliyi: O(N log N)',
      keyTakeaway: 'set() əməliyyatı heş cədvəli əsasında işlədiyi üçün daxilolmanı O(1) orta zamanda təmin edir.',
    },
  },
  {
    id: 'prg-pr-2',
    courseSlug: 'programming',
    type: 'practical_problem',
    topic: 'Matris Əməliyyatları',
    title: 'Kvadrat Matrisin Əsas və Köməkçi Diaqonal Cəmi',
    question:
      'N×N ölçülü kvadrat matris verilmişdir. Matrisin əsas və köməkçi diaqonalındakı elementlərin cəmini hesablayan Python funksiyasını tək dövr (O(N)) ilə yazın:',
    formulaTeX: 'S = \\sum_{i=0}^{N-1} M[i][i] + \\sum_{i=0}^{N-1} M[i][N-1-i]',
    maxScore: 3,
    inputPlaceholder: 'def diaqonallar_cemi(matrix): funksiyası və tək dövr ilə indeks izahı...',
    rubric: [
      { criterion: 'Əsas diaqonal indeksinin M[i][i] kimi düzgün təyini', points: 1 },
      { criterion: 'Köməkçi diaqonal indeksinin M[i][n - 1 - i] kimi düzgün təyini', points: 1 },
      { criterion: 'Tək dövr (O(N)) ilə cəmin tapılması (tək ölçüdə mərkəz elementin 2 dəfə toplanmasının idarəsi)', points: 1 },
    ],
    officialSolution: {
      title: 'O(N) Matris Diaqonalları Alqoritmi',
      steps: [
        'Python Kodu:\n```python\ndef diaqonallar_cemi(matrix):\n    n = len(matrix)\n    esas_cem = 0\n    komekci_cem = 0\n    \n    for i in range(n):\n        esas_cem += matrix[i][i]\n        komekci_cem += matrix[i][n - 1 - i]\n        \n    return esas_cem, komekci_cem\n```',
        'Təhlil: İkiqat iç-içə dövr (O(N²)) yerinə i indeksini 0-dan n-1-ə qədər dəyişərək hər iki diaqonalı tək dövrdə O(N) zamanda toplayırıq.',
      ],
      finalAnswer: 'esas_cem = sum(matrix[i][i]), komekci_cem = sum(matrix[i][n-1-i])',
      keyTakeaway: 'İndeks riyaziyyatı ilə n×n matris diaqonallarını gəzmək üçün O(N²) deyil, cəmi O(N) addım kifayətdir.',
    },
  },
];

/**
 * Təsadüfi bilet generasiya edən funksiya
 * 1 Açıq Nəzəri Mövzu + 2 Fərqli Praktiki Misal seçir.
 */
export function drawColloquiumTicket(courseSlug: string): ColloquiumTicket {
  const courseQuestions = COLLOQUIUM_QUESTIONS.filter((q) => q.courseSlug === courseSlug);
  const theoryPool = courseQuestions.filter((q) => q.type === 'open_theory');
  const problemPool = courseQuestions.filter((q) => q.type === 'practical_problem');

  // Fallback if course not found
  const selectedTheory = theoryPool.length > 0
    ? theoryPool[Math.floor(Math.random() * theoryPool.length)]
    : COLLOQUIUM_QUESTIONS.find((q) => q.type === 'open_theory')!;

  // Pick 2 distinct practical problems
  const shuffledProblems = [...problemPool].sort(() => Math.random() - 0.5);
  const prob1 = shuffledProblems[0] || COLLOQUIUM_QUESTIONS.filter((q) => q.type === 'practical_problem')[0];
  const prob2 = shuffledProblems[1] || shuffledProblems[0];

  const randomNum = Math.floor(100 + Math.random() * 900);
  const ticketId = `ticket-${Date.now()}-${randomNum}`;
  const ticketNumber = `BİLET #${randomNum}`;

  return {
    ticketId,
    ticketNumber,
    courseSlug,
    courseName: COURSE_NAMES[courseSlug] || 'Ali Riyaziyyat',
    drawnAt: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
    theoryQuestion: selectedTheory,
    problem1: prob1,
    problem2: prob2,
    totalMaxScore: selectedTheory.maxScore + prob1.maxScore + prob2.maxScore, // 4 + 3 + 3 = 10 bal
  };
}
