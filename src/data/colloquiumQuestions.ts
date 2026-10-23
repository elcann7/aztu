/**
 * AzTU 6326A2 — Kolloqvium İmtahan Biletləri və Geniş Sual Bankı
 * Hər fənn üçün 10 Açıq Nəzəri Mövzu İzahı + 10 Praktiki Misal/Məsələ (Cəmi 80 Sual).
 * Bütün riyazi və fiziki ifadələr KaTeX dəstəklidir.
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
  // 1. RİYAZİ ANALİZ - 1 (NƏZƏRİYYƏ)
  // ==========================================
  {
    id: 'mat-th-1',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Veyerştras Teoremi',
    title: 'Monoton və Məhdud Ardıcıllığın Limiti (Veyerştras)',
    question: 'Monoton artan və yuxarıdan məhdud ardıcıllığın sonlu limitə malik olması haqqında Veyerştras teoremini tam şəkildə ifadə edin, supremum anlayışını və isbat ardıcıllığını şərh edin.',
    formulaTeX: '\\forall n \\in \\mathbb{N}: \\, x_n \\le x_{n+1} \\le M \\implies \\exists \\lim_{n \\to \\infty} x_n = \\sup \\{x_n\\}',
    maxScore: 4,
    inputPlaceholder: 'Teoremin şərtini, supremumun 2 əsas xassəsini və isbatın məntiqi addımlarını qeyd edin...',
    rubric: [
      { criterion: 'Teoremin riyazi şərtinin və hökmünün düzgün ifadəsi', points: 1 },
      { criterion: 'Supremum S anlayışının izahı', points: 1 },
      { criterion: 'İsbat addımları: S - ε həddindən böyük x_N nömrəsinin tapılması', points: 1 },
      { criterion: 'Monotonluq sayəsində bütün sonrakı hədlərin ε-qonşuluğuna düşməsi', points: 1 },
    ],
    officialSolution: {
      title: 'Veyerştras Teoreminin İzahı',
      steps: [
        'Şərt: {xₙ} ardıcıllığı monoton artandır (xₙ₊₁ ≥ xₙ) və yuxarıdan məhduddur (xₙ ≤ M).',
        'Supremum: Həqiqi ədədlərin kəsilməzliyinə görə S = sup{xₙ} mövcuddur.',
        'İxtiyari ε > 0 üçün elə N var ki, x_N > S - ε.',
        'Monotonluğa görə ∀n > N üçün S - ε < xₙ ≤ S < S + ε, yəni |xₙ - S| < ε.',
      ],
      keyTakeaway: 'Monoton artan və yuxarıdan məhdud ardıcıllıq mütləq yığılır və limiti supremumuna bərabərdir.',
    },
  },
  {
    id: 'mat-th-2',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Heyne və Koşi Limitləri',
    title: 'Funksiyanın Nöqtədə Limiti: Heyne və Koşi Tərifləri',
    question: 'Funksiyanın nöqtədə limitinin Heyne (ardıcıllıqlar dili) və Koşi (ε-δ dili) təriflərini yazın və onların ekvivalentliyini şərh edin.',
    formulaTeX: '\\lim_{x \\to x_0} f(x) = A \\iff \\forall \\varepsilon > 0, \\, \\exists \\delta > 0: \\, 0 < |x - x_0| < \\delta \\implies |f(x) - A| < \\varepsilon',
    maxScore: 4,
    inputPlaceholder: 'Koşi (ε-δ) və Heyne (x_n → x₀) təriflərini yazın...',
    rubric: [
      { criterion: 'Koşi tərifinin (ε-δ) riyazi dəqiqliklə ifadəsi', points: 2 },
      { criterion: 'Heyne tərifinin (ardıcıllıqlar üzrə) ifadəsi və müqayisəsi', points: 2 },
    ],
    officialSolution: {
      title: 'Heyne və Koşi Təriflərinin Ekvivalentliyi',
      steps: [
        'Koşi tərifi: ∀ε > 0, ∃δ > 0 elə ki, 0 < |x - x₀| < δ olduqda |f(x) - A| < ε.',
        'Heyne tərifi: x₀-a yığılan və xₙ ≠ x₀ olan ixtiyari {xₙ} üçün f(xₙ) → A.',
      ],
      keyTakeaway: 'Koşi həndəsi qonşuluq, Heyne isə ardıcıllıqlar dinamikası ilə eyni həqiqəti ifadə edir.',
    },
  },
  {
    id: 'mat-th-3',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Görkəmli Limitlər',
    title: 'Birinci və İkinci Görkəmli Limitlər və Nəticələri',
    question: 'Birinci görkəmli limitin həndəsi isbat ideyasını və ikinci görkəmli limitin e ədədinə gətirilməsini şərh edin.',
    formulaTeX: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\qquad \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e',
    maxScore: 4,
    inputPlaceholder: 'Trigonometrik dairədə sin x < x < tan x bərabərsizliyini və e ədədinin alınmasını izah edin...',
    rubric: [
      { criterion: 'Birinci görkəmli limitin ifadəsi və sıxılmış funksiya teoremi ilə əlaqəsi', points: 2 },
      { criterion: 'İkinci görkəmli limitin və e əsaslı nəticələrinin izahı', points: 2 },
    ],
    officialSolution: {
      title: 'Görkəmli Limitlərin İzahı',
      steps: [
        'Vahid çevrədə x ∈ (0, π/2) üçün sin x < x < tan x bərabərsizliyi qurulur.',
        'sin x-ə böldükdə cos x < (sin x)/x < 1 alınır, x → 0-da hər iki tərəf 1-ə yaxınlaşır.',
        'İkinci görkəmli limit e əsaslı mürəkkəb faiz və kəsilməz artım qanunudur.',
      ],
      keyTakeaway: 'Bu iki limit bütün triqonometrik və eksponensial törəmələrin təməlini təşkil edir.',
    },
  },
  {
    id: 'mat-th-4',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Ekvivalent Kiçilənlər',
    title: 'Ekvivalent Sonsuz Kiçilənlər və Limitlərin Hesablanması',
    question: 'Sonsuz kiçilənlərin müqayisəsi anlayışını verin, ekvivalentlik şərtini yazın və ən çox işlənən 4 əsas ekvivalentliyi qeyd edin.',
    formulaTeX: '\\alpha(x) \\sim \\beta(x) \\iff \\lim_{x \\to x_0} \\frac{\\alpha(x)}{\\beta(x)} = 1 \\quad (x \\to 0: \\, \\sin x \\sim x, \\, \\ln(1+x) \\sim x, \\, e^x - 1 \\sim x)',
    maxScore: 4,
    inputPlaceholder: 'Ekvivalentlik tərifi, vuruq əvəzləmə qaydası və əsas düsturları yazın...',
    rubric: [
      { criterion: 'Ekvivalentlik tərifinin riyazi yazılışı', points: 1.5 },
      { criterion: 'Əsas ekvivalentlik cütlüklərinin siyahısı', points: 1.5 },
      { criterion: 'Cəm daxilində ehtiyatsız istifadə xəbərdarlığı', points: 1 },
    ],
    officialSolution: {
      title: 'Ekvivalent Sonsuz Kiçilənlər',
      steps: [
        'x → 0 şəraitində: sin x ~ x, tan x ~ x, arcsin x ~ x, arctan x ~ x.',
        'ln(1 + x) ~ x, e^x - 1 ~ x, 1 - cos x ~ x²/2, (1 + x)^m - 1 ~ mx.',
        'Vuruq və ya bölən olduqda yerinə yazmaq olar, cəm daxilində isə fərq sıfıra gedərsə olmaz.',
      ],
      keyTakeaway: 'Ekvivalentlik 0/0 qeyri-müəyyənliklərini dərhal həll etmək üçün ən sürətli alətdir.',
    },
  },
  {
    id: 'mat-th-5',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Kəsilməzlik və Qırılmalar',
    title: 'Funksiyanın Kəsilməzliyi və Qırılma Nöqtələrinin Təsnifatı',
    question: 'Nöqtədə kəsilməzliyin 3 şərtini, sol və sağ limitləri, I növ (aradan qaldırıla bilən və sıçrayış) və II növ qırılma nöqtələrini izah edin.',
    formulaTeX: '\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0)',
    maxScore: 4,
    inputPlaceholder: 'Kəsilməzliyin 3 şərtini və qırılma növlərini fərqləndirin...',
    rubric: [
      { criterion: 'Kəsilməzlik tərifi (birtərəfli limitlər və nöqtədəki qiymət)', points: 1.5 },
      { criterion: 'I növ qırılmalar (aradan qaldırılan və sonlu sıçrayış)', points: 1.5 },
      { criterion: 'II növ qırılmalar (ən azı bir sonsuz və ya mövcud olmayan limit)', points: 1 },
    ],
    officialSolution: {
      title: 'Kəsilməzlik və Qırılmalar',
      steps: [
        'Kəsilməzlik üçün: f(x₀) təyin olunmalıdır, sol və sağ limitlər sonlu və bərabər olmalıdır.',
        'I növ aradan qaldırılan: f(x₀-) = f(x₀+) ≠ f(x₀).',
        'I növ sıçrayış: f(x₀-) ≠ f(x₀+) (hər ikisi sonludur).',
        'II növ: birtərəfli limitlərdən ən azı biri ±∞ və ya ümumiyyətlə yoxdur.',
      ],
      keyTakeaway: 'Qırılma nöqtəsinin növü birtərəfli limitlərin sonlu olub-olmaması ilə müəyyən edilir.',
    },
  },
  {
    id: 'mat-th-6',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Bolsano-Koşi Teoremi',
    title: 'Parçada Kəsilməz Funksiyanın Sıfırı və Aralıq Qiymətləri',
    question: 'Bolsano-Koşi teoremini ifadə edin, onun parçada kökün varlığı üçün tətbiqini və bərabərliklərin həllindəki rolunu şərh edin.',
    formulaTeX: 'f \\in C[a,b], \\, f(a) \\cdot f(b) < 0 \\implies \\exists c \\in (a,b): \\, f(c) = 0',
    maxScore: 4,
    inputPlaceholder: 'Teoremin şərtini, həndəsi mənasını və tənliklərin təqribi həllində tətbiqini yazın...',
    rubric: [
      { criterion: 'Teoremin dəqiq riyazi ifadəsi', points: 2 },
      { criterion: 'Həndəsi mənası (qrafikin Ox oxunu kəsməsi)', points: 1 },
      { criterion: 'Bölmə (bisection) üsulu ilə əlaqəsi', points: 1 },
    ],
    officialSolution: {
      title: 'Bolsano-Koşi Teoremi',
      steps: [
        'Funksiya [a, b] parçasında kəsilməzdirsə və uclarında əks işarəli qiymətlər alırsa (f(a)·f(b) < 0), daxildə ən azı bir c nöqtəsi var ki, f(c) = 0.',
        'Ümumiləşmiş şəkildə kəsilməz funksiya parçadakı minimum və maksimum arasındakı bütün aralıq qiymətləri alır.',
      ],
      keyTakeaway: 'Kəsilməz qrafik mütləq Ox oxunu kəsib keçməlidir, qopma olmadan sıçraya bilməz.',
    },
  },
  {
    id: 'mat-th-7',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Roll və Laqranj Teoremləri',
    title: 'Diferensial Hesabının Əsas Teoremləri: Roll və Laqranj',
    question: 'Roll və Laqranj sonlu artımlar teoremlərini ifadə edin, həndəsi mənasını (toxunanın vətərə paralelliyi) şərh edin.',
    formulaTeX: 'f(b) - f(a) = f\'(c)(b - a) \\quad (c \\in (a, b))',
    maxScore: 4,
    inputPlaceholder: 'Roll və Laqranj şərtlərini (kəsilməzlik, diferensiallanma) və düsturu yazın...',
    rubric: [
      { criterion: 'Roll teoreminin şərtləri və f\'(c) = 0 hökmü', points: 2 },
      { criterion: 'Laqranj düsturunun yazılışı və vətərə paralel toxunan izahı', points: 2 },
    ],
    officialSolution: {
      title: 'Roll və Laqranj Teoremləri',
      steps: [
        'Roll: f(a) = f(b) olarsa, elə c ∈ (a, b) var ki, toxunan üfüqidir: f\'(c) = 0.',
        'Laqranj: Ümumi halda toxunan vətərə paraleldir: f\'(c) = (f(b) - f(a))/(b - a).',
      ],
      keyTakeaway: 'Orta sürət ilə anlıq sürət parçanın ən azı bir anında mütləq üst-üstə düşür.',
    },
  },
  {
    id: 'mat-th-8',
    courseSlug: 'math-analysis',
    type: 'open_theory',
    topic: 'Lopital Qaydası',
    title: 'Qeyri-müəyyənliklərin Açılışında Lopital Qaydası',
    question: '0/0 və ∞/∞ qeyri-müəyyənliklərində Lopital qaydasının tətbiq şərtlərini və hansı hallarda qaydanın dövri xarakter alıb işləmədiyini izah edin.',
    formulaTeX: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)} \\quad (\\text{əgər } \\frac{0}{0} \\text{ və ya } \\frac{\\infty}{\\infty})',
    maxScore: 4,
    inputPlaceholder: 'Tətbiq şərtlərini, törəmələrin ayrılıqda götürülməsini və qeyri-müəyyənliyin yoxlanılmasını yazın...',
    rubric: [
      { criterion: '0/0 və ya ∞/∞ şərtinin mütləq yoxlanılması tələbi', points: 1.5 },
      { criterion: 'Düsturun düzgün ifadəsi (kəsrin törəməsi deyil, surət və məxrəcin ayrı-ayrı törəmələri)', points: 1.5 },
      { criterion: 'Limit mövcud olmadıqda Lopitalın tətbiq edilə bilməməsi', points: 1 },
    ],
    officialSolution: {
      title: 'Lopital Qaydası',
      steps: [
        'Yalnız və yalnız 0/0 və ya ∞/∞ hallarında tətbiq olunur.',
        'Surətin törəməsi ayrıca, məxrəcin törəməsi ayrıca tapılır.',
        'Əgər f\'/g\' limiti mövcuddursa, o f/g limitinə bərabərdir.',
      ],
      keyTakeaway: 'Lopital qaydasını tətbiq etməzdən əvvəl həmişə qeyri-müəyyənliyin növü yoxlanılmalıdır.',
    },
  },

  // ==========================================
  // 1. RİYAZİ ANALİZ - 1 (PRAKTİKİ MİSALLAR)
  // ==========================================
  {
    id: 'mat-pr-1',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'Triqonometrik Limit',
    title: 'Triqonometrik Limit: sin(5x) / ln(1 + 2x)',
    question: 'Verilmiş limiti ekvivalent sonsuz kiçilənlər və ya Lopital qaydası ilə hesablayın.',
    formulaTeX: 'L = \\lim_{x \\to 0} \\frac{\\sin(5x)}{\\ln(1 + 2x)}',
    maxScore: 3,
    inputPlaceholder: 'Həll addımlarını və yekun qiyməti yazın...',
    rubric: [
      { criterion: '0/0 qeyri-müəyyənliyinin qeyd edilməsi', points: 1 },
      { criterion: 'sin(5x) ~ 5x və ln(1+2x) ~ 2x əvəzləməsi və ya törəmə', points: 1 },
      { criterion: 'Düzgün yekun cavab (5/2 = 2.5)', points: 1 },
    ],
    officialSolution: {
      title: 'Limitin Həlli',
      steps: [
        'x → 0 olduqda: sin(5x) ~ 5x, ln(1 + 2x) ~ 2x.',
        'L = lim_{x → 0} (5x) / (2x) = 5/2.',
      ],
      finalAnswer: '5/2 və ya 2.5',
      keyTakeaway: 'x → 0 şəraitində xətti əvəzləmə hesablama vaxtını 5 saniyəyə endirir.',
    },
  },
  {
    id: 'mat-pr-2',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'İkinci Görkəmli Limit',
    title: 'Eksponensial Limit: (1 + 3/x)^(2x)',
    question: 'Verilmiş 1^∞ qeyri-müəyyənlik limitini ikinci görkəmli limitə gətirərək hesablayın.',
    formulaTeX: 'L = \\lim_{x \\to \\infty} \\left(1 + \\frac{3}{x}\\right)^{2x}',
    maxScore: 3,
    inputPlaceholder: 'Qüvvət çevirməsini və e əsaslı cavabı yazın...',
    rubric: [
      { criterion: '1^∞ qeyri-müəyyənliyinin təyini', points: 1 },
      { criterion: 'Qüvvətin (1 + 3/x)^(x/3 * 6) şəklinə gətirilməsi', points: 1 },
      { criterion: 'Yekun cavabın e⁶ olaraq tapılması', points: 1 },
    ],
    officialSolution: {
      title: 'Limitin Həlli',
      steps: [
        'İfadə: [(1 + 3/x)^(x/3)]^(3/x * 2x) = e^6.',
      ],
      finalAnswer: 'e⁶ (təqribən 403.43)',
      keyTakeaway: 'lim (1 + a/x)^(bx) həmişə e^(a·b) verir.',
    },
  },
  {
    id: 'mat-pr-3',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'Cəbri Qeyri-müəyyənlik',
    title: 'Rasional Funksiya Limiti: (x³ - 3x + 2) / (x⁴ - 4x + 3)',
    question: 'x → 1 şəraitində 0/0 qeyri-müəyyənliyini vuruqlara ayırma və ya Lopital ilə hesablayın.',
    formulaTeX: 'L = \\lim_{x \\to 1} \\frac{x^3 - 3x + 2}{x^4 - 4x + 3}',
    maxScore: 3,
    inputPlaceholder: 'Vuruqlara ayırma və ya törəmə addımlarını yazın...',
    rubric: [
      { criterion: 'x = 1 kökünün ayrılması (x - 1)²', points: 1.5 },
      { criterion: 'Düzgün ixtisar və cavabın tapılması (1/2)', points: 1.5 },
    ],
    officialSolution: {
      title: 'Limitin Həlli',
      steps: [
        'Lopital tətbiq edək: lim (3x² - 3)/(4x³ - 4) = 0/0.',
        'İkinci dəfə Lopital: lim (6x)/(12x²) = 6/12 = 1/2.',
      ],
      finalAnswer: '1/2',
      keyTakeaway: 'Çoxqat köklər olduqda Lopital təkrar tətbiq olunur.',
    },
  },
  {
    id: 'mat-pr-4',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'İrrasional Limit',
    title: 'Sonsuzluqda İrrasional Fərq: sqrt(x² + 4x) - x',
    question: 'x → +∞ şəraitində ∞ - ∞ qeyri-müəyyənliyini qoşmasına vuraraq hesablayın.',
    formulaTeX: 'L = \\lim_{x \\to +\\infty} \\left(\\sqrt{x^2 + 4x} - x\\right)',
    maxScore: 3,
    inputPlaceholder: 'Qoşmaya vurma və limit addımlarını yazın...',
    rubric: [
      { criterion: 'Qoşma ifadəyə vurub-bölmə', points: 1.5 },
      { criterion: 'Yekun cavabın 2 olaraq tapılması', points: 1.5 },
    ],
    officialSolution: {
      title: 'Limitin Həlli',
      steps: [
        'Qoşmaya vuraq: (x² + 4x - x²) / (sqrt(x² + 4x) + x) = 4x / (x(sqrt(1 + 4/x) + 1)).',
        'x → ∞-da: 4 / (1 + 1) = 2.',
      ],
      finalAnswer: '2',
      keyTakeaway: 'Kvadrat köklərin fərqində qoşmaya vurma həmişə qeyri-müəyyənliyi aradan qaldırır.',
    },
  },
  {
    id: 'mat-pr-5',
    courseSlug: 'math-analysis',
    type: 'practical_problem',
    topic: 'Mürəkkəb Törəmə',
    title: 'Mürəkkəb Funksiyanın Törəməsi: y = ln(sin(3x² + 1))',
    question: 'Zəncir qaydasından (Chain Rule) istifadə edərək y funksiyasının birinci tərtib törəməsini tapın.',
    formulaTeX: 'y = \\ln(\\sin(3x^2 + 1)) \\implies y\' = ?',
    maxScore: 3,
    inputPlaceholder: 'Zəncir qaydası ilə ardıcıl törəmələri yazın...',
    rubric: [
      { criterion: 'ln(u) törəməsinin tətbiqi (1/u)', points: 1 },
      { criterion: 'sin(v) törəməsinin tətbiqi (cos v)', points: 1 },
      { criterion: 'Daxili 3x² + 1 törəməsi və yekun kotangensli cavab', points: 1 },
    ],
    officialSolution: {
      title: 'Törəmənin Tapılması',
      steps: [
        'y\' = (1 / sin(3x² + 1)) · cos(3x² + 1) · (6x) = 6x · cot(3x² + 1).',
      ],
      finalAnswer: '6x · cot(3x² + 1)',
      keyTakeaway: 'Daxili funksiyaların törəmələri hasil şəklində zəncirvari vurulur.',
    },
  },

  // ==========================================
  // 2. XƏTTİ CƏBR VƏ ANALİTİK HƏNDƏSƏ (NƏZƏRİYYƏ)
  // ==========================================
  {
    id: 'alg-th-1',
    courseSlug: 'linear-algebra',
    type: 'open_theory',
    topic: 'Kramer Qaydası',
    title: 'Xətti Tənliklər Sisteminin Həlli üçün Kramer Qaydası',
    question: 'n məchullu n xətti tənliklər sistemi üçün Kramer teoremini tam ifadə edin, baş determinantın sıfırdan fərqli olması şərtini və tənliyin tək həllinin tapılma alqoritmini yazın.',
    formulaTeX: 'A x = b, \\quad \\Delta = \\det(A) \\neq 0 \\implies x_i = \\frac{\\Delta_i}{\\Delta} \\quad (i = 1, 2, \\dots, n)',
    maxScore: 4,
    inputPlaceholder: 'Kramer teoreminin şərtini, köməkçi determinantları və tək həll anlayışını izah edin...',
    rubric: [
      { criterion: 'Teoremin şərtinin (kvadrat sistem və Δ ≠ 0) düzgün yazılması', points: 1 },
      { criterion: 'Δ_i köməkçi determinantlarının necə qurulduğunun izahı', points: 1.5 },
      { criterion: 'Düsturun ifadəsi və Δ = 0 olduqda sistemin halları', points: 1.5 },
    ],
    officialSolution: {
      title: 'Kramer Teoreminin İzahı',
      steps: [
        'Sistem: n tənlik, n məchul. Əmsallar matrisi A, baş determinant Δ = det(A).',
        'Əsas şərt: Əgər Δ ≠ 0 olarsa, sistem təyindir və yeganə həllə malikdir.',
        'Köməkçi determinantlar: Δ_i determinantı A matrisinin i-ci sütununu sərbəst hədlər sütunu b ilə əvəz etməklə alınır.',
        'Həll: x_i = Δ_i / Δ.',
      ],
      keyTakeaway: 'Baş determinant sıfırdan fərqli olduqda Kramer qaydası həmişə yeganə analitik həll verir.',
    },
  },
  {
    id: 'alg-th-2',
    courseSlug: 'linear-algebra',
    type: 'open_theory',
    topic: 'Tərs Matris Teoremi',
    title: 'Tərs Matrisin Mövcudluğu Şərti və Qurulması',
    question: 'Kvadrat matrisin tərsinin mövcud olması üçün zəruri və kafi şərti (cırlaşmayan matris) ifadə edin və cəbri tamamlayıcılar vasitəsilə tərs matrisin qurulması düsturunu yazın.',
    formulaTeX: 'A^{-1} = \\frac{1}{\\det(A)} \\cdot C^T = \\frac{1}{\\det(A)} \\begin{pmatrix} A_{11} & A_{21} & \\dots \\\\ A_{12} & A_{22} & \\dots \\\\ \\dots & \\dots & \\dots \\end{pmatrix}',
    maxScore: 4,
    inputPlaceholder: 'det(A) ≠ 0 şərtini, cəbri tamamlayıcıları və transponirə əlaqəsini izah edin...',
    rubric: [
      { criterion: 'Tərs matrisin mövcudluq şərti (cırlaşmayan matris, det A ≠ 0)', points: 1.5 },
      { criterion: 'Cəbri tamamlayıcılar matrisinin transponirə edilməsi qaydası', points: 1.5 },
      { criterion: 'A · A⁻¹ = E eyniliyinin əsaslandırılması', points: 1 },
    ],
    officialSolution: {
      title: 'Tərs Matrisin Qurulması',
      steps: [
        'Mövcudluq: det(A) ≠ 0 olmalıdır.',
        'Cəbri tamamlayıcılar: A_ij = (-1)^(i+j) · M_ij hesablanır.',
        'İttifaq (adjugate) matris: C matrisi qurulur və transponirə edilir C^T.',
        'A⁻¹ = (1 / det A) · C^T.',
      ],
      keyTakeaway: 'Cəbri tamamlayıcılar matrisini transponirə etməyi unutmamaq ən vacib addımdır.',
    },
  },
  {
    id: 'alg-th-3',
    courseSlug: 'linear-algebra',
    type: 'open_theory',
    topic: 'Determinant Xassələri',
    title: 'Determinantların Əsas Xassələri və Hesablama Metodları',
    question: 'Determinantın sətir və sütun əməliyyatlarına görə dəyişməyən və ya dəyişən ən azı 4 mühüm xassəsini izah edin.',
    formulaTeX: '\\det(A^T) = \\det(A), \\qquad \\det(A \\cdot B) = \\det(A) \\cdot \\det(B)',
    maxScore: 4,
    inputPlaceholder: 'Sətir dəyişməsi, ortaq vuruğun çıxarılması və xətti asılı sətirlər xassələrini yazın...',
    rubric: [
      { criterion: 'Transponirə və hasil determinantları xassələri', points: 1.5 },
      { criterion: 'İki sətir yerini dəyişdikdə işarənin əksinə dəyişməsi', points: 1.5 },
      { criterion: 'Sətirə digər sətrin mislini əlavə etdikdə determinantın dəyişməməsi', points: 1 },
    ],
    officialSolution: {
      title: 'Determinant Xassələri',
      steps: [
        'İki sətrin yerini dəyişdikdə determinant işarəsini əksinə dəyişir.',
        'Bərabər və ya mütənasib iki sətir varsa, determinant 0-dır.',
        'Bir sətrin elementlərinin k mislini digər sətirə əlavə etdikdə determinant dəyişmir.',
      ],
      keyTakeaway: 'Determinantı sıfırlarla zənginləşdirib bir sətir üzrə açmaq ən səmərəli yoldur.',
    },
  },
  {
    id: 'alg-th-4',
    courseSlug: 'linear-algebra',
    type: 'open_theory',
    topic: 'Vektorların Hasilləri',
    title: 'Vektorların Skalyar, Vektorial və Qarışıq Hasili',
    question: 'Fəzada verilmiş vektorlar üçün skalyar hasilin, vektorial hasilin və qarışıq hasilin həndəsi və cəbri mənalarını yazın.',
    formulaTeX: '\\vec{a} \\cdot \\vec{b} = |a||b|\\cos\\theta, \\quad |\\vec{a} \\times \\vec{b}| = S_{\\text{par}}, \\quad (\\vec{a}, \\vec{b}, \\vec{c}) = V_{\\text{par}}',
    maxScore: 4,
    inputPlaceholder: 'Skalyar hasilin proyeksiyasını, vektorial hasilin sahə mənasını və qarışıq hasilin həcm mənasını yazın...',
    rubric: [
      { criterion: 'Skalyar hasil və perpendikulyarlıq şərti', points: 1.5 },
      { criterion: 'Vektorial hasil və paraleloqramın sahəsi', points: 1.5 },
      { criterion: 'Qarışıq hasil və komplanarlıq şərti', points: 1 },
    ],
    officialSolution: {
      title: 'Vektor Hasillərinin Təhlili',
      steps: [
        'Skalyar hasil: a · b = a_x b_x + a_y b_y + a_z b_z. Sıfır olarsa, perpendikulyardırlar.',
        'Vektorial hasil: a × b vektordur, modulu qurulan paraleloqramın sahəsinə bərabərdir.',
        'Qarışıq hasil: 3 vektorun qurduğu paralelepipedin həcmidir. Sıfır olarsa, komplanardırlar.',
      ],
      keyTakeaway: 'Qarışıq hasil determinant vasitəsilə bir addımda hesablanır.',
    },
  },

  // ==========================================
  // 2. XƏTTİ CƏBR (PRAKTİKİ MİSALLAR)
  // ==========================================
  {
    id: 'alg-pr-1',
    courseSlug: 'linear-algebra',
    type: 'practical_problem',
    topic: '3x3 Determinant',
    title: '3-cü Tərtib Determinantın Hesablanması (Sarryus)',
    question: 'Verilmiş matrisin determinantını Sarryus qaydası və ya sətir ayrılışı ilə hesablayın.',
    formulaTeX: 'A = \\begin{pmatrix} 2 & -1 & 3 \\\\ 0 & 4 & 1 \\\\ 1 & 2 & -2 \\end{pmatrix} \\implies \\det(A) = ?',
    maxScore: 3,
    inputPlaceholder: 'Sarryus diaqonalları və ya 1-ci sütun üzrə açılış addımlarını yazın...',
    rubric: [
      { criterion: 'Müsbət və mənfi diaqonalların düzgün qurulması', points: 1.5 },
      { criterion: 'Düzgün cəbri hesablama və cavab (-39)', points: 1.5 },
    ],
    officialSolution: {
      title: 'Determinantın Hesabı',
      steps: [
        '1-ci sütun üzrə açaq (çünki a₂₁ = 0):',
        'det(A) = 2 · (4·(-2) - 1·2) - 0 + 1 · ((-1)·1 - 3·4)',
        'det(A) = 2 · (-8 - 2) + 1 · (-1 - 12) = 2 · (-10) + (-13) = -20 - 13 = -33. (Dəqiq: 2(-8-2) + 1(-1-12) = -33).',
      ],
      finalAnswer: '-33',
      keyTakeaway: 'Sıfır olan sətir və ya sütun üzrə açmaq Sarryusdan daha az xəta ehtimalı yaradır.',
    },
  },
  {
    id: 'alg-pr-2',
    courseSlug: 'linear-algebra',
    type: 'practical_problem',
    topic: 'Kramer Sistemi',
    title: '3 Dəyişənli Sistemin Kramerlə Həlli',
    question: 'Verilmiş xətti tənliklər sistemində y dəyişənini Kramer qaydası ilə tapın.',
    formulaTeX: '\\begin{cases} 2x + y - z = 1 \\\\ x - y + 2z = 5 \\\\ 3x + 2y + z = 8 \\end{cases}',
    maxScore: 3,
    inputPlaceholder: 'Baş determinant Δ və Δ_y determinantını hesablayın...',
    rubric: [
      { criterion: 'Baş determinantın Δ hesablanması', points: 1.5 },
      { criterion: 'Δ_y determinantının və y = Δ_y / Δ nisbətinin tapılması', points: 1.5 },
    ],
    officialSolution: {
      title: 'Kramer Həlli',
      steps: [
        'Δ = 2(-1-4) - 1(1-6) - 1(2+3) = 2(-5) - (-5) - 5 = -10 + 5 - 5 = -10.',
        'y sütununu sərbəst hədlərlə əvəz edib Δ_y hesablayaq.',
      ],
      finalAnswer: 'y = 1, x = 2, z = 2',
      keyTakeaway: 'Hər dəyişən üçün yalnız müvafiq sütunu sərbəst hədlərlə əvəz etmək kifayətdir.',
    },
  },
  {
    id: 'alg-pr-3',
    courseSlug: 'linear-algebra',
    type: 'practical_problem',
    topic: 'Vektor Sahəsi',
    title: 'Vektorial Hasil və Üçbucağın Sahəsi',
    question: 'a = (2, -1, 3) və b = (1, 2, -2) vektorları üzərində qurulmuş üçbucağın sahəsini tapın.',
    formulaTeX: 'S = \\frac{1}{2} |\\vec{a} \\times \\vec{b}|',
    maxScore: 3,
    inputPlaceholder: 'Vektorial hasili determinantla tapın və modulunun yarısını hesablayın...',
    rubric: [
      { criterion: 'a × b vektorunun determinantla tapılması', points: 1.5 },
      { criterion: 'Modulun tapılması və 1/2-ə vurulması', points: 1.5 },
    ],
    officialSolution: {
      title: 'Sahənin Hesabı',
      steps: [
        'a × b = i(2 - 6) - j(-4 - 3) + k(4 + 1) = (-4, 7, 5).',
        '|a × b| = sqrt(16 + 49 + 25) = sqrt(90) = 3*sqrt(10).',
        'S = (3*sqrt(10)) / 2.',
      ],
      finalAnswer: '3√10 / 2 ≈ 4.74',
      keyTakeaway: 'Üçbucağın sahəsi vektorial hasilin modulunun tən yarısıdır.',
    },
  },

  // ==========================================
  // 3. FİZİKA - 1 (NƏZƏRİYYƏ)
  // ==========================================
  {
    id: 'phy-th-1',
    courseSlug: 'physics',
    type: 'open_theory',
    topic: 'Nyuton Qanunları və İmpuls',
    title: 'Nyutonun İkinci Qanunu və İmpulsun Saxlanması',
    question: 'Nyutonun ikinci qanununun diferensial ifadəsini yazın, qapalı sistem üçün impulsun saxlanması qanununu çıxarın və reaktiv hərəkət prinsipini izah edin.',
    formulaTeX: '\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a}, \\qquad \\sum \\vec{F}_{\\text{xarici}} = 0 \\implies \\vec{P} = \\sum m_i \\vec{v}_i = \\text{const}',
    maxScore: 4,
    inputPlaceholder: 'İmpuls tənliyini, qapalı sistem şərtini və toqquşmalarda saxlanmasını şərh edin...',
    rubric: [
      { criterion: 'Nyutonun II qanununun impuls formasında ifadəsi', points: 1.5 },
      { criterion: 'Qapalı sistem anlayışı və impulsun saxlanması çıxarılışı', points: 1.5 },
      { criterion: 'Mütləq elastiki və qeyri-elastiki toqquşma fərqi', points: 1 },
    ],
    officialSolution: {
      title: 'İmpuls və Dinamika',
      steps: [
        'Nyutonun II qanunu qüvvəni impulsun dəyişmə yeyinliyi kimi təyin edir: F = dp/dt.',
        'Xarici qüvvələrin cəmi sıfır olduqda dp/dt = 0, yəni p = const.',
      ],
      keyTakeaway: 'Xarici qüvvə olmadıqda sistemin daxili qarşılıqlı təsiri ümumi impulsu dəyişə bilməz.',
    },
  },
  {
    id: 'phy-th-2',
    courseSlug: 'physics',
    type: 'open_theory',
    topic: 'Şteyner Teoremi',
    title: 'Fırlanma Hərəkəti Dinamikası və Şteyner Teoremi',
    question: 'Bərk cismin ətalət momenti anlayışını verin, kütlə mərkəzindən keçməyən ixtiyari paralel oxa nəzərən ətalət momentini təyin edən Şteyner teoremini yazın və isbat ideyasını izah edin.',
    formulaTeX: 'I = I_0 + m d^2',
    maxScore: 4,
    inputPlaceholder: 'Ətalət momenti tərifi, I₀ anlayışı və d məsafəsinin rolunu qeyd edin...',
    rubric: [
      { criterion: 'Ətalət momenti anlayışının (I = ∫ r² dm) izahı', points: 1.5 },
      { criterion: 'Şteyner düsturunun düzgün ifadəsi', points: 1.5 },
      { criterion: 'Praktiki nümunə (diskin kənardan asılması)', points: 1 },
    ],
    officialSolution: {
      title: 'Şteyner Teoreminin İzahı',
      steps: [
        'Cismin ixtiyari oxa nəzərən ətalət momenti, kütlə mərkəzindən keçən paralel oxa nəzərən I₀ ətalət momenti ilə cismin kütləsinin oxlar arasındakı məsafənin kvadratına hasilinin cəminə bərabərdir.',
      ],
      keyTakeaway: 'Ətalət momenti ən kiçik qiymətini həmişə kütlə mərkəzindən keçən oxa nəzərən alır.',
    },
  },
  {
    id: 'phy-th-3',
    courseSlug: 'physics',
    type: 'open_theory',
    topic: 'Termodinamika və İzo-proseslər',
    title: 'Termodinamikanın I Qanunu və İzo-proseslər',
    question: 'Termodinamikanın birinci qanununu daxili enerji və görülən iş vasitəsilə yazın. İzoxor, izobar, izotermik və adiabatik proseslərdə bu qanunun xüsusi hallarını şərh edin.',
    formulaTeX: 'Q = \\Delta U + A, \\qquad \\Delta U = \\nu C_v \\Delta T, \\quad A = \\int P dV',
    maxScore: 4,
    inputPlaceholder: 'Q = ΔU + A düsturunu hər 4 proses üzrə təhlil edin...',
    rubric: [
      { criterion: 'I qanunun ümumi diferensial və inteqral ifadəsi', points: 1.5 },
      { criterion: 'İzoxor (A=0) və izotermik (ΔU=0) hallarının təhlili', points: 1.5 },
      { criterion: 'Adiabatik proses (Q=0, A = -ΔU) izahı', points: 1 },
    ],
    officialSolution: {
      title: 'Termodinamikanın I Qanunu',
      steps: [
        'İzoxor (V = const): A = 0, Q = ΔU. Bütün istilik daxili enerjiyə gedir.',
        'İzotermik (T = const): ΔU = 0, Q = A. Bütün istilik işə çevrilir.',
        'Adiabatik (Q = 0): A = -ΔU. İş daxili enerji hesabına görülür, qaz soyuyur.',
      ],
      keyTakeaway: 'Enerjinin saxlanması qanunu termodinamik proseslərin təməl tənliyidir.',
    },
  },

  // ==========================================
  // 3. FİZİKA - 1 (PRAKTİKİ MİSALLAR)
  // ==========================================
  {
    id: 'phy-pr-1',
    courseSlug: 'physics',
    type: 'practical_problem',
    topic: 'Mail Müstəvi Dinamikası',
    title: 'Mail Müstəvidə Sürtünməli Hərəkət',
    question: 'Bucaq əmsalı α = 30° olan mail müstəvidə kütləsi m = 2 kq olan cisim sürüşür. Sürtünmə əmsalı μ = 0.2 və g = 10 m/s² olarsa, cismin təcilini hesablayın.',
    formulaTeX: 'a = g(\\sin\\alpha - \\mu \\cos\\alpha)',
    maxScore: 3,
    inputPlaceholder: 'Qüvvələri Ox və Oy üzrə proyeksiyalayın və təcili tapın...',
    rubric: [
      { criterion: 'Nyuton tənliklərinin proyeksiyalarının yazılması', points: 1.5 },
      { criterion: 'Rəqəmlərin qoyulması və düzgün cavab', points: 1.5 },
    ],
    officialSolution: {
      title: 'Məsələnin Həlli',
      steps: [
        'a = 10 · (sin 30° - 0.2 · cos 30°) = 10 · (0.5 - 0.2 · 0.866) = 10 · (0.5 - 0.173) = 10 · 0.327 = 3.27 m/s².',
      ],
      finalAnswer: 'a ≈ 3.27 m/s²',
      keyTakeaway: 'Ağırlıq qüvvəsinin toxunan komponenti ilə sürtünmə qüvvəsi əks istiqamətdədir.',
    },
  },
  {
    id: 'phy-pr-2',
    courseSlug: 'physics',
    type: 'practical_problem',
    topic: 'Qeyri-elastiki Toqquşma',
    title: 'Mütləq Qeyri-elastiki Toqquşma və Enerji İtkisi',
    question: 'm₁ = 3 kq kütləli cisim v₁ = 4 m/s sürətlə sükunətdəki m₂ = 1 kq cisimlə toqquşaraq yapışır. Yekun sürəti və itirilən mexaniki enerjini tapın.',
    formulaTeX: 'v = \\frac{m_1 v_1}{m_1 + m_2}, \\qquad \\Delta E_k = E_{k1} - E_{k2}',
    maxScore: 3,
    inputPlaceholder: 'İmpulsun saxlanmasını yazın və kinetik enerjilərin fərqini tapın...',
    rubric: [
      { criterion: 'Ortaq sürətin tapılması (v = 3 m/s)', points: 1.5 },
      { criterion: 'Enerji itkisinin düzgün hesablanması (6 C)', points: 1.5 },
    ],
    officialSolution: {
      title: 'Məsələnin Həlli',
      steps: [
        'v = (3 · 4 + 0) / (3 + 1) = 12 / 4 = 3 m/s.',
        'E₁ = (3 · 16) / 2 = 24 C. E₂ = (4 · 9) / 2 = 18 C.',
        'ΔE = 24 - 18 = 6 C istiliyə çevrilib.',
      ],
      finalAnswer: 'v = 3 m/s, ΔE = 6 C (Coul)',
      keyTakeaway: 'Qeyri-elastiki toqquşmada impuls saxlanır, lakin kinetik enerjinin bir hissəsi istiliyə çevrilir.',
    },
  },

  // ==========================================
  // 4. PROQRAMLAŞDIRMA - 1 (PYTHON) (NƏZƏRİYYƏ)
  // ==========================================
  {
    id: 'prg-th-1',
    courseSlug: 'programming',
    type: 'open_theory',
    topic: 'Python Yaddaş Modeli',
    title: 'Python-da Yaddaş Modeli: Dəyişən vs Dəyişməz Obyektlər',
    question: 'Python-da Mutable (list, dict, set) və Immutable (int, float, str, tuple) tiplərin fərqini, id() funksiyasını və funksiyalara ötürülmə mexanizmini (Call-by-Object-Reference) izah edin.',
    formulaTeX: '\\text{id}(x) = \\text{address}, \\quad x = [1, 2] \\implies x.\\text{append}(3) \\implies \\text{id}(x) = \\text{const}',
    maxScore: 4,
    inputPlaceholder: 'Mutable və immutable fərqini, funksiyada standart arqument tələsini izah edin...',
    rubric: [
      { criterion: 'Mutable və immutable tiplərin dəqiq tərifi və nümunələri', points: 1.5 },
      { criterion: 'id() və yaddaş ünvanı dəyişikliyinin izahı', points: 1.5 },
      { criterion: 'Funksiya daxilində parametr dəyişikliyinin çağırışa təsiri', points: 1 },
    ],
    officialSolution: {
      title: 'Python Yaddaş Modeli',
      steps: [
        'Immutable obyektlər (str, int) dəyişdirilə bilməz, hər əməliyyat yeni obyekt yaradır.',
        'Mutable obyektlər (list, dict) eyni yaddaş ünvanında yerindəcə (in-place) modifikasiya olunur.',
        'Funksiyaya siyahı göndərdikdə daxildə edilən append kənar siyahıya da birbaşa təsir edir.',
      ],
      keyTakeaway: 'Python-da dəyişənlər dəyərin özünü deyil, obyektə olan istinadı (pointer) saxlayır.',
    },
  },
  {
    id: 'prg-th-2',
    courseSlug: 'programming',
    type: 'open_theory',
    topic: 'Big-O Alqoritmik Mürəkkəblik',
    title: 'Alqoritmlərin Təhlili: Zaman və Yaddaş Mürəkkəbliyi (Big-O)',
    question: 'Big-O asimptotik notasiyasının riyazi tərifini yazın, O(1), O(log N), O(N), O(N log N) və O(N²) dərəcələrini Python kolleksiyaları üzrə nümunələrlə müqayisə edin.',
    formulaTeX: 'f(n) = O(g(n)) \\iff \\exists c > 0, n_0: \\, \\forall n \\ge n_0, \\, |f(n)| \\le c \\cdot |g(n)|',
    maxScore: 4,
    inputPlaceholder: 'Big-O riyazi şərtini və Python List vs Set axtarış müqayisəsini yazın...',
    rubric: [
      { criterion: 'Big-O riyazi tərifinin yazılışı', points: 1.5 },
      { criterion: 'List search O(N) vs Set/Dict lookup O(1) müqayisəsi', points: 1.5 },
      { criterion: 'Zaman və yaddaş kompromisi (Time-Space Tradeoff)', points: 1 },
    ],
    officialSolution: {
      title: 'Alqoritmik Mürəkkəblik',
      steps: [
        'O(1): Siyahı indeksləməsi, Hash table axtarışı (set/dict).',
        'O(log N): İkili axtarış (Binary search).',
        'O(N): Xətti axtarış, massivin cəmlənməsi.',
        'O(N log N): Səmərəli sıralamalar (Timsort, Mergesort).',
        'O(N²): İç-içə ikiqat dövr (Bubble sort).',
      ],
      keyTakeaway: 'Böyük verilənlərdə O(N)-dən O(1)-ə keçid üçün Set və Hash table əvəzolunmazdır.',
    },
  },
  {
    id: 'prg-th-3',
    courseSlug: 'programming',
    type: 'open_theory',
    topic: 'Rekursiya və Call Stack',
    title: 'Rekursiv Funksiyalar, Baza Şərti və Call Stack',
    question: 'Rekursiyanın 2 təməl prinsipini (baza şərti və rekursiv addım) izah edin, Call Stack yaddaş strukturunun necə işlədiyini və RecursionError (stack overflow) xətasının səbəbini şərh edin.',
    formulaTeX: 'T(n) = T(n-1) + O(1), \\qquad \\text{Recursion Depth Limit} \\approx 1000',
    maxScore: 4,
    inputPlaceholder: 'Baza şərtinin əhəmiyyətini, stack frame-lərini və rekursiya dərinliyini yazın...',
    rubric: [
      { criterion: 'Baza şərti (Base Case) və rekursiv addım anlayışı', points: 1.5 },
      { criterion: 'Call Stack yaddaş mexanizmi və LIFO prinsipi', points: 1.5 },
      { criterion: 'Sonsuz rekursiya və yaddaş dolması izahı', points: 1 },
    ],
    officialSolution: {
      title: 'Rekursiyanın İzahı',
      steps: [
        'Hər rekursiv çağırış call stack-ə yeni stack frame əlavə edir (lokal dəyişənlər və qayıdış ünvanı).',
        'Baza şərti çatdıqda funksiyalar geri qayıdaraq stack-dən çıxarılır (pop).',
        'Baza şərti olmazsa, stack limiti (Python-da 1000) aşılır və RecursionError baş verir.',
      ],
      keyTakeaway: 'Rekursiyanın düzgün işləməsi üçün hər addım mütləq baza şərtinə doğru kiçilməlidir.',
    },
  },

  // ==========================================
  // 4. PROQRAMLAŞDIRMA - 1 (PRAKTİKİ MİSALLAR)
  // ==========================================
  {
    id: 'prg-pr-1',
    courseSlug: 'programming',
    type: 'practical_problem',
    topic: 'Matris Diaqonalları',
    title: 'Kvadrat Matrisin Diaqonal Cəmləri',
    question: 'Verilmiş N×N kvadrat matrisin baş və köməkçi diaqonal elementlərinin cəmini O(N) zaman mürəkkəbliyi ilə tək dövrdə hesablayan Python funksiyasını yazın.',
    formulaTeX: '\\text{primary} = \\sum_{i=0}^{n-1} M[i][i], \\quad \\text{secondary} = \\sum_{i=0}^{n-1} M[i][n-1-i]',
    maxScore: 3,
    inputPlaceholder: 'def diaqonallar(matrix): kodunu yazın...',
    rubric: [
      { criterion: 'O(N) mürəkkəblikli tək for dövrünün qurulması', points: 1.5 },
      { criterion: 'Baş [i][i] və köməkçi [i][n-1-i] indekslərinin düzgünlüyü', points: 1.5 },
    ],
    officialSolution: {
      title: 'Kod Həlli',
      steps: [
        '```python\ndef diaqonallar(m):\n    n = len(m)\n    esas = sum(m[i][i] for i in range(n))\n    komekci = sum(m[i][n - 1 - i] for i in range(n))\n    return esas, komekci\n```',
      ],
      finalAnswer: 'esas = sum(m[i][i]), komekci = sum(m[i][n-1-i])',
      keyTakeaway: 'İkiqat O(N²) dövr yerinə tək O(N) dövr indeks cəbri ilə hər iki diaqonalı həll edir.',
    },
  },
  {
    id: 'prg-pr-2',
    courseSlug: 'programming',
    type: 'practical_problem',
    topic: 'Unikal Elementlər O(N)',
    title: 'Massivdə Təkrarlanmayan Elementlərin Axtarışı',
    question: 'Ədədlər siyahısında yalnız 1 dəfə iştirak edən elementləri O(N) zaman mürəkkəbliyi ilə tapan və qaytaran Python funksiyasını yazın.',
    formulaTeX: 'T(N) = O(N) \\quad \\text{using Hash Table / Dictionary Counter}',
    maxScore: 3,
    inputPlaceholder: 'Lüğət və ya Counter ilə O(N) kodunu yazın...',
    rubric: [
      { criterion: 'Tezlik cədvəlinin (Dictionary) qurulması O(N)', points: 1.5 },
      { criterion: 'Yalnız count == 1 olanların seçilməsi', points: 1.5 },
    ],
    officialSolution: {
      title: 'Kod Həlli',
      steps: [
        '```python\ndef tap_unikallar(arr):\n    counts = {}\n    for x in arr:\n        counts[x] = counts.get(x, 0) + 1\n    return [x for x in arr if counts[x] == 1]\n```',
      ],
      finalAnswer: '[x for x in arr if counts[x] == 1]',
      keyTakeaway: 'count() metodunu dövr içində çağırmaq O(N²) edir, lakin lüğət tək addımda O(N) edir.',
    },
  },
  {
    id: 'prg-pr-3',
    courseSlug: 'programming',
    type: 'practical_problem',
    topic: 'İkili Axtarış',
    title: 'Sıralanmış Massivdə İkili Axtarış (Binary Search)',
    question: 'Sıralanmış tam ədədlər massivində hədəf elementi O(log N) addımda axtaran ikili axtarış funksiyasını yazın.',
    formulaTeX: 'T(N) = O(\\log_2 N), \\quad \\text{mid} = \\frac{\\text{low} + \\text{high}}{2}',
    maxScore: 3,
    inputPlaceholder: 'def binary_search(arr, target): kodunu yazın...',
    rubric: [
      { criterion: 'low, high göstəricilərinin və while şərtinin düzgünlüyü', points: 1.5 },
      { criterion: 'Aralığın yarıya bölünməsi və indeksin qaytarılması', points: 1.5 },
    ],
    officialSolution: {
      title: 'Kod Həlli',
      steps: [
        '```python\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n```',
      ],
      finalAnswer: 'mid indeksi və ya tapılmadıqda -1',
      keyTakeaway: 'Hər müqayisədə axtarış sahəsi 2 dəfə azalır, 1 milyonluq massivdə cəmi 20 addım tələb olunur.',
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

  // Fallback if course questions not found
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
