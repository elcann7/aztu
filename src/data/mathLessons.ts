export interface MathRule {
  title: string;
  intuition?: string;
  explanation: string;
  formula?: string;
  symbols?: string[];
  steps?: string[];
  example?: string;
  warning?: string;
}

export interface MathQuestion {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  correct: number;
  explanation: string;
}

export interface MathLesson {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  pdfUrl?: string;
  goals: string[];
  rules: MathRule[];
  workedExample: { prompt: string; steps: string[]; conclusion: string };
  proofTask: { prompt: string; hint: string; solution: string[] };
  commonMistake: string;
  questions: MathQuestion[];
  aiContext: string;
}

const MATH_PDF_M1_M5 = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m1-m5-kollokvium1.pdf';
const MATH_PDF_M6_M15 = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/azazi-analiz-m6-m15-toreme-inteqral.pdf'.replace('azazi', 'aztu/math/riyazi');

export const MATH_LESSONS: MathLesson[] = [
  {
    id: 'sets-and-logic',
    title: 'Çoxluqlar nəzəriyyəsi, İnikaslar və Riyazi məntiqin dili',
    subtitle: '0-dan izah: ∈ və ⊆ fərqi, De Morqan qanunları, Biyektiv inikaslar və ∀ / ∃ kvantorları',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      '∈ (elementdir) ilə ⊆ (altçoxluqdur) işarəsini və P(A) qüvvət çoxluğunu 0-dan fərqləndirmək',
      'İnyektiv, süryektiv və biyektiv inikasları sadə məntiqlə müəyyən etmək',
      '∀ (hər bir) və ∃ (elə bir var ki) kvantorlu mülahizələrin inkarını qurmaq',
    ],
    rules: [
      {
        title: '1. Çoxluq, Altçoxluq (⊆) və Qüvvət Çoxluğu P(A)',
        intuition:
          'Çoxluğu içində əşyalar olan bir qutu kimi təsəvvür et. Əgər "alma qutunun içindədir" deyirsənsə, bu ∈ (elementdir) işarəsidir. Əgər "balaca qutudakı hər şey böyük qutuda da var" deyirsənsə, bu ⊆ (altçoxluqdur) işarəsidir. Qutudakı əşyalardan düzəldə biləcəyin bütün mümkün kiçik bağlamaların siyahısına isə Qüvvət Çoxluğu P(A) deyilir.',
        explanation:
          'x ∈ A yazılışı x-in A çoxluğunun tək bir elementi olduğunu, A ⊆ B isə A-dakı hər bir elementin həm də B-yə daxil olduğunu göstərir. İki çoxluq yalnız bir-birinin altçoxluğu olduqda bərabərdir (A = B ⇔ A ⊆ B və B ⊆ A). n elementli sonlu A çoxluğunun bütün altçoxluqlarının sayı 2ⁿ-ə bərabərdir.',
        formula:
          'Altçoxluq:         A ⊆ B  ⇔  ∀x (x ∈ A ⇒ x ∈ B)\nÇoxluq bərabərliyi: A = B  ⇔  (A ⊆ B) ∧ (B ⊆ A)\nQüvvət çoxluğu:    P(A) = { B : B ⊆ A },    |P(A)| = 2^|A|',
        symbols: [
          'x ∈ A — "x elementi A çoxluğuna daxildir" (x∉A — daxil deyil)',
          'A ⊆ B — "A çoxluğu B-nin altçoxluğudur" (A-nın hər elementi B-də var)',
          '∅ — boş çoxluq (içində heç bir element olmayan çoxluq; ∅ hər bir çoxluğun altçoxluğudur: ∅ ⊆ A)',
          'P(A) və ya 2^A — A çoxluğunun bütün altçoxluqlarından ibarət ailə (bulean)',
        ],
        steps: [
          'Verilən yazılışda soldakı obyekt tək elementdirsə ∈, fiqurlu mötərizəli çoxluqdursa ⊆ işlədilməlidir.',
          'P(A)-nı yazarkən əvvəlcə boş çoxluğu ∅, sonra 1-elementli, 2-elementli altçoxluqları və sonda A-nın özünü yaz.',
          'Altçoxluqların sayını yoxlamaq üçün 2ⁿ düsturunu hesabla.',
        ],
        example:
          'A = {1, 2} çoxluğu üçün:\n• 1 ∈ A (doğrudur, 1 elementdir), {1} ⊆ A (doğrudur, {1} altçoxluqdur).\n• Bütün altçoxluqlar: P(A) = { ∅, {1}, {2}, {1, 2} } — cəmi 2² = 4 altçoxluq.',
        warning:
          '1 ∈ A doğrudur, amma {1} ∈ A YALNIŞDIR! Çünki {1} element deyil, altçoxluqdur ({1} ⊆ A və ya {1} ∈ P(A) yazılmalıdır).',
      },
      {
        title: '2. Çoxluqlar üzərində Əməllər və De Morqan Qanunları',
        intuition:
          'İki dost qrupunu düşün: Birləşmə (∪) "hər iki qrupdakı bütün uşaqları bir yerə yığ" deməkdir. Kəsişmə (∩) "yalnız hər iki qrupda ortaq olanları seç" deməkdir. Fərq (A \\ B) "A-da olub B-də olmayanları saxla" deməkdir. De Morqan qanunu isə deyir ki, "birləşmədən kənarda qalanlar" elə "həm A-dan kənarda, həm də B-dən kənarda qalanların kəsişməsi"dir.',
        explanation:
          'Birləşmə (A ∪ B), kəsişmə (A ∩ B), fərq (A \\ B) və simmetrik fərq (A Δ B) çoxluqlar cəbrinin əsas əməlləridir. Universal U çoxluğuna nəzərən tamamlayıcı (Aᶜ = U \\ A) götürdükdə birləşmə kəsişməyə, kəsişmə isə birləşməyə çevrilir.',
        formula:
          'A ∪ B = {x : x ∈ A ∨ x ∈ B};     A ∩ B = {x : x ∈ A ∧ x ∈ B}\nA \\ B = {x : x ∈ A ∧ x ∉ B};     A Δ B = (A \\ B) ∪ (B \\ A) = (A ∪ B) \\ (A ∩ B)\nDe Morqan qanunları:  (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ;     (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',
        symbols: [
          '∪ — birləşmə ("və ya" — ∨ məntiqi bağlayıcısına uyğundur)',
          '∩ — kəsişmə ("və" — ∧ məntiqi bağlayıcısına uyğundur)',
          'A \\ B — A ilə B-nin fərqi (yalnız A-ya aid olanlar)',
          'A Δ B — simmetrik fərq (yalnız birinə aid olub ortaq olmayanlar)',
          'Aᶜ (və ya Ā) — A-nın universal U çoxluğuna tamamlayıcısı (U \\ A)',
        ],
        steps: [
          'A ∪ B taparkən hər iki çoxluğun elementlərini təkrarsız birləşdir.',
          'A ∩ B taparkən yalnız hər ikisində eyni vaxtda görünən elementləri götür.',
          '(A ∪ B)ᶜ və ya (A ∩ B)ᶜ soruşulduqda De Morqan qaydası ilə mötərizəni aç və ∪ ilə ∩-nin yerini dəyiş.',
        ],
        example:
          'U = {1, 2, 3, 4, 5}, A = {1, 2, 3}, B = {2, 3, 4} olarsa:\n• A ∪ B = {1, 2, 3, 4},  A ∩ B = {2, 3}\n• A \\ B = {1},  B \\ A = {4},  A Δ B = {1, 4}\n• (A ∪ B)ᶜ = {5};  Aᶜ = {4, 5}, Bᶜ = {1, 5} ⇒ Aᶜ ∩ Bᶜ = {5}.',
        warning:
          'De Morqan qanununda tamamlayıcı işarəsini paylayarkən ortadakı əməli dəyişməyi unutma: (A ∩ B)ᶜ = Aᶜ ∩ Bᶜ DEYİL, Aᶜ ∪ Bᶜ-dir!',
      },
      {
        title: '3. İnikaslar (Funksiyalar): İnyektiv, Süryektiv, Biyektiv və Tərs Funksiya',
        intuition:
          'X çoxluğunu "tələbələr", Y çoxluğunu "oturacaqlar" kimi düşün:\n• İnyektiv (1–1): Hər tələbə fərqli oturacaqda oturub (heç bir oturacaqda 2 nəfər yoxdur).\n• Süryektiv (örtdük): Boş oturacaq qalmayıb (bütün oturacaqlar tutulub).\n• Biyektiv: Həm hər kəs tək oturub, həm də boş yer qalmayıb (tələbələrlə oturacaqlar arasında tam 1-ə-1 uyğunluq var). Yalnız bu halda tərs funksiya (f⁻¹) var!',
        explanation:
          'f : X → Y inikası inyektivdir, əgər fərqli arqumentlərə fərqli qiymətlər uyğundur (f(x₁) = f(x₂) ⇒ x₁ = x₂). Süryektivdir, əgər Y-dəki hər bir y elementi üçün ən azı bir x ∈ X tapılır ki, f(x) = y olsun. Həm inyektiv, həm də süryektiv olan inikas biyektiv adlanır və yalnız biyektiv inikasın tərsi (f⁻¹ : Y → X) mövcuddur.',
        formula:
          'İnyektivlik:  ∀x₁, x₂ ∈ X,  f(x₁) = f(x₂)  ⇒  x₁ = x₂\nSüryektivlik: ∀y ∈ Y,  ∃x ∈ X :  f(x) = y   (yəni Im(f) = Y)\nBiyektivlik:  İnyektiv + Süryektiv  ⇔  ∃ f⁻¹ : Y → X',
        symbols: [
          'f : X → Y — X təyin oblastından Y qiymətlər çoxluğuna təsir edən funksiya',
          'Im(f) və ya E(f) — funksiyanın faktiki aldığı qiymətlər çoxluğu',
          'f⁻¹ — tərs funksiya (y-i yenidən x-ə qaytaran qayda)',
        ],
        steps: [
          'İnyektivliyi yoxlamaq üçün f(x₁) = f(x₂) tənliyini yaz; əgər yeganə həll x₁ = x₂ çıxırsa, funksiya inyektivdir.',
          'Süryektivliyi yoxlamaq üçün y = f(x) tənliyini x-ə görə həll et; əgər hər y ∈ Y üçün x ∈ X tapılırsa, süryektivdir.',
          'Tərs funksiyanı tapmaq üçün y = f(x) ifadəsindən x-i y ilə ifadə et, sonra x və y-in yerini dəyiş.',
        ],
        example:
          '• f : ℝ → ℝ, f(x) = 2x + 3 funksiyası biyektivdir; tərsi f⁻¹(x) = (x − 3)/2.\n• g : ℝ → ℝ, g(x) = x² nə inyektivdir (çünki g(−2) = g(2) = 4), nə də süryektivdir (mənfi ədədlər alınmır). Amma g : [0, +∞) → [0, +∞) kimi götürsək, biyektiv olar və tərsi √x olar!',
        warning:
          'Eyni düstur təyin və qiymətlər çoxluğundan asılı olaraq biyektiv ola və ya olmaya bilər — həmişə f : X → Y yazılışındakı X və Y çoxluqlarına bax!',
      },
      {
        title: '4. Riyazi Məntiq Kvantorları (∀ və ∃) və Mülahizələrin İnkarı',
        intuition:
          'Universitet riyaziyyatında uzun cümlələr əvəzinə iki qısa işarə işlədilir:\n• ∀ (tərs A — "All"): "Hər bir / İstənilən" deməkdir.\n• ∃ (tərs E — "Exists"): "Elə bir ... var ki / Tapılır ki" deməkdir.\n"Qrupdakı HƏR BİR tələbə imtahandan keçdi" (∀) cümləsini təkzib (inkar) etmək üçün nə kifayətdir? "ELƏ BİR tələbə var ki (∃), imtahandan keçmədi"! Yəni inkar edəndə ∀ işarəsi ∃-yə, ∃ işarəsi isə ∀-yə çevrilir.',
        explanation:
          'Kvantorlu mülahizənin inkarını (¬) qurarkən bütün ∀ kvantorları ∃ ilə, bütün ∃ kvantorları isə ∀ ilə əvəz olunur, sonda gələn şərt isə öz əksinə çevrilir.',
        formula:
          '¬( ∀x ∈ X : P(x) )   ⇔   ∃x ∈ X : ¬P(x)\n¬( ∃x ∈ X : P(x) )   ⇔   ∀x ∈ X : ¬P(x)\n¬( P ⇒ Q )           ⇔   P ∧ ¬Q',
        symbols: [
          '∀ — ümumilik kvantoru ("hər bir", "istənilən", "bütün")',
          '∃ — varlıq kvantoru ("elə bir ... var ki", "ən azı bir")',
          '¬ — məntiqi inkar ("deyil");  ∧ — "və";  ∨ — "və ya";  ⇒ — "əgər ... onda"',
        ],
        steps: [
          'Soldan sağa hər bir ∀ işarəsini ∃ ilə, hər bir ∃ işarəsini ∀ ilə əvəz et.',
          'Kvantorların altındakı şərti (məsələn, ε > 0) dəyişmə! Yalnız iki nöqtədən (:) sonrakı əsas hökmün işarəsini əksinə çevir (< isə ≥ et, = isə ≠ et).',
        ],
        example:
          'Mülahizə: "∀ε > 0, ∃N ∈ ℕ : ∀n > N ⇒ |x_n − a| < ε" (ardıcıllığın limiti a-dır).\nİnkarı (a limit deyil): "∃ε > 0, ∀N ∈ ℕ : ∃n > N və |x_n − a| ≥ ε".',
        warning:
          '"∀x ∈ A, x > 0" cümləsinin inkarı "∀x ∈ A, x ≤ 0" DEYİL! Doğru inkarı: "∃x ∈ A : x ≤ 0" (ən azı bir element müsbət deyil).',
      },
    ],
    workedExample: {
      prompt: 'U={1,2,3,4,5}, A={1,2,4}, B={2,3,4}. (A∪B)ᶜ və Aᶜ∩Bᶜ tapın.',
      steps: [
        'A∪B={1,2,3,4}.',
        'U-da qalıb birləşmədə olmayan yeganə element 5-dir: (A∪B)ᶜ={5}.',
        'Aᶜ={3,5}, Bᶜ={1,5}; onların kəsişməsi {5}-dir.',
      ],
      conclusion: 'Hər iki tərəf {5}-dir; De Morqan qanunu bu nümunədə təsdiqləndi.',
    },
    proofTask: {
      prompt: 'Element üsulu ilə A∩(B∪C)=(A∩B)∪(A∩C) bərabərliyini isbat et.',
      hint: 'İxtiyari x götür və “x soldadır” fikrini ∧, ∨ ilə aç.',
      solution: [
        'x∈A∩(B∪C) ⇔ x∈A ∧ (x∈B ∨ x∈C).',
        'Məntiqin paylama qanununa görə bu, (x∈A ∧ x∈B) ∨ (x∈A ∧ x∈C) ilə eynidir.',
        'Bu isə x∈(A∩B)∪(A∩C) deməkdir. İxtiyari x üçün ekvivalentlik olduğundan çoxluqlar bərabərdir.',
      ],
    },
    commonMistake: '∅ ⊆ A həmişə doğrudur, amma ∅ ∈ A yalnız A-nın elementləri arasında ayrıca ∅ varsa doğrudur.',
    questions: [
      { id: 's1', prompt: 'A={1,2}. Hansı ifadə doğrudur?', choices: ['{1} ∈ A', '1 ⊆ A', '{1} ⊆ A', '3 ∈ A'], correct: 2, explanation: '{1} A-nın altçoxluğudur; 1 isə elementdir.' },
      { id: 's2', prompt: 'A={1,2}, B={2,3}. A∖B nədir?', choices: ['{1}', '{2}', '{3}', '{1,3}'], correct: 0, explanation: 'A-da olub B-də olmayan element yalnız 1-dir.' },
      { id: 's3', prompt: 'U={1,2,3}, A={1,3}. Aᶜ nədir?', choices: ['{1,3}', '{2}', '∅', '{1,2,3}'], correct: 1, explanation: 'Tamamlayıcı U daxilində A-dan kənarda qalan elementlərdir.' },
      { id: 's4', prompt: '∀x∈A, x>0 cümləsinin inkarı hansıdır?', choices: ['∀x∈A, x≤0', '∃x∈A, x≤0', '∃x∈A, x>0', 'A=∅'], correct: 1, explanation: '“Hər biri”nin inkarı “ən azı biri deyil” olur.' },
      { id: 's5', prompt: '|A|=3 olarsa |P(A)| neçədir?', choices: ['3', '6', '8', '9'], correct: 2, explanation: 'Hər element altçoxluğa daxil ola və ya olmaya bilər: 2³=8.' },
      { id: 's6', prompt: '(A∩B)ᶜ nəyə bərabərdir?', choices: ['Aᶜ∩Bᶜ', 'A∪B', 'Aᶜ∪Bᶜ', 'A∖B'], correct: 2, explanation: 'De Morqan qanununa görə kəsişmənin tamamlayıcısı tamamlayıcıların birləşməsidir.' },
    ],
    aiContext: 'Mövzu: çoxluqlar, ∈/⊆, boş çoxluq, birləşmə, kəsişmə, fərq, tamamlayıcı, De Morqan, qüvvət çoxluğu, Dekart hasili, inyektiv/süryektiv/biyektiv inikaslar, ∀ və ∃ kvantorları, inkar.',
  },
  {
    id: 'real-numbers',
    title: 'Həqiqi ədədlər meydanı (ℝ), Arximed prinsipi və ε-ətraflar',
    subtitle: '0-dan izah: ℚ və ℝ fərqi, modul bərabərsizlikləri, ε-ətraf və Arximed / Kantor aksiomları',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      'Rasional ədədlərin (ℚ) niyə "deşikli" olduğunu və ℝ-in tamlığını başa düşmək',
      'Modul bərabərsizliyi və ε-ətraf / deşilmiş ε-ətraf anlayışlarını 0-dan qurmaq',
      'Arximed prinsipini və Kantorun daxil olmuş parçalar teoremini tətbiq etmək',
    ],
    rules: [
      {
        title: '1. Rasional Ədədlərin (ℚ) Natamamlığı və Həqiqi Ədədlər (ℝ)',
        intuition:
          'Rasional ədədlər (ℚ) kəsr şəklində yazıla bilən ədədlərdir (1/2, −3/4, 5). Ədəd oxuna yalnız rasional ədədləri düzsək, oxda sonsuz sayda "mikroskopik deşiklər" qalır — məsələn, tərəfi 1 olan kvadratın diaqonalı √2 heç bir p/q kəsrinə bərabər deyil! İrrasional ədədlər (√2, π, e) bu deşikləri doldurur və bütöv, kəsilməz Həqiqi Ədədlər oxunu (ℝ) yaradır.',
        explanation:
          'ℕ (natural) ⊂ ℤ (tam) ⊂ ℚ (rasional) ⊂ ℝ (həqiqi). ℚ çoxluğu hesabi sonsuzdur və tam deyil (x² = 2 tənliyinin ℚ-də həlli yoxdur). ℝ isə kəsilməz (tam) nizamlanmış Arximed meydanıdır. İstənilən iki fərqli a < b həqiqi ədədi arasında sonsuz sayda həm rasional, həm də irrasional ədəd var.',
        formula:
          'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ\nSıxlıq xassəsi:  ∀a, b ∈ ℝ (a < b)  ⇒  ∃q ∈ ℚ, ∃α ∈ ℝ\\ℚ :  a < q < b  və  a < α < b',
        symbols: [
          'ℕ = {1, 2, 3, ...} — natural ədədlər çoxluğu',
          'ℤ = {..., −2, −1, 0, 1, 2, ...} — tam ədədlər çoxluğu',
          'ℚ = {p/q : p ∈ ℤ, q ∈ ℕ} — rasional ədədlər çoxluğu',
          'ℝ \\ ℚ — irrasional ədədlər (sonsuz dövrü olmayan onluq kəsrlər: √2, π, e)',
        ],
        steps: [
          'Ədədin rasional olub-olmadığını bilmək üçün onun dövrü onluq kəsr və ya adi p/q kəsri kimi yazılıb-yazılmadığını yoxla.',
          'Tam kvadrat olmayan natural ədədlərin kökləri (√2, √3, √5) və π, e ədədləri həmişə irrasionaldır (ℝ \\ ℚ).',
        ],
        example:
          '• 0.333... = 1/3 ∈ ℚ (rasionaldır).\n• √2 ≈ 1.41421356... ∈ ℝ \\ ℚ (irrasionaldır, amma həqiqi ədəddir: √2 ∈ ℝ).',
        warning:
          'İmtahanda "hər bir həqiqi ədəd rasionaldır" fikri YALNIŞDIR, amma "hər bir rasional ədəd həqiqi ədəddir" (ℚ ⊂ ℝ) fikri DOĞRUDUR!',
      },
      {
        title: '2. Nöqtənin ε-Ətrafı və Deşilmiş ε-Ətrafı',
        intuition:
          'Riyazi analizdə "x ədədi x₀-a çox yaxındır" sözünü dəqiq yazmaq üçün ε-ətraf (epsilon-ətraf) anlayışı işlədilir. ε (epsilon) çox kiçik müsbət addımdır (məsələn, 0.1). x₀ nöqtəsindən sağa və sola ε qədər gedəndə alınan (x₀ − ε, x₀ + ε) açıq intervalına x₀-ın ε-ətrafı deyilir. Əgər tən ortadakı x₀ nöqtəsinin özünü həmin intervaldan çıxarıb atsaq ("deşsək"), buna deşilmiş ε-ətraf deyilir.',
        explanation:
          'Mərkəzi x₀, radiusu ε > 0 olan açıq (x₀ − ε, x₀ + ε) intervalına x₀ nöqtəsinin ε-ətrafı deyilir və U_ε(x₀) kimi işarə olunur. x₀ nöqtəsinin özünü çıxardıqda alınan U°_ε(x₀) = U_ε(x₀) \\ {x₀} çoxluğuna deşilmiş ε-ətraf deyilir.',
        formula:
          'Adi ε-ətraf:      U_ε(x₀) = (x₀ − ε, x₀ + ε) = { x ∈ ℝ : |x − x₀| < ε }\nDeşilmiş ε-ətraf: U°_ε(x₀) = (x₀ − ε, x₀) ∪ (x₀, x₀ + ε) = { x ∈ ℝ : 0 < |x − x₀| < ε }',
        symbols: [
          'x₀ — ətrafın mərkəzi nöqtəsi',
          'ε (epsilon) — ətrafın radiusu (həmişə ε > 0 götürülür)',
          '|x − x₀| — ədəd oxunda x ilə x₀ arasındakı həndəsi məsafə',
          '0 < |x − x₀| — məsafə sıfırdan böyükdür, yəni x ≠ x₀ (mərkəz nöqtə deşilib!)',
        ],
        steps: [
          '|x − x₀| < ε bərabərsizliyini açmaq üçün −ε < x − x₀ < ε yaz.',
          'Hər tərəfə x₀ əlavə et: x₀ − ε < x < x₀ + ε.',
          'Əgər 0 < |x − x₀| < ε yazılıbsa, cavabdan x₀ nöqtəsini çıxar: (x₀ − ε, x₀) ∪ (x₀, x₀ + ε).',
        ],
        example:
          'x₀ = 2 nöqtəsinin ε = 0.5 ətrafı:\n• U_0.5(2) = (2 − 0.5, 2 + 0.5) = (1.5, 2.5).\n• Deşilmiş ətrafı: U°_0.5(2) = (1.5, 2) ∪ (2, 2.5).',
        warning:
          'Funksiya limitində (x → x₀) həmişə DEŞİLMİŞ ətraf (0 < |x − x₀| < δ) götürülür, çünki x₀ nöqtəsinin özündə funksiya təyin olunmaya da bilər!',
      },
      {
        title: '3. Mütləq Qiymət (Modul) və Üçbucaq Bərabərsizliyi',
        intuition:
          'Ədədin modulu |x| onun 0-dan olan məsafəsidir (məsafə heç vaxt mənfi olmur). Üçbucaq bərabərsizliyi isə deyir ki, iki ədədin cəminin modulu onların ayrı-ayrı modulları cəmindən böyük ola bilməz — eyni işarəli olanda bərabər olur, əks işarəli olanda isə bir-birini azaldır.',
        explanation:
          'Limit və kəsilməzlik isbatlarında mürəkkəb ifadələri yuxarıdan qiymətləndirmək üçün ikitərəfli üçbucaq bərabərsizliyi əsas alətdir.',
        formula:
          '||x| − |y||  ≤  |x ± y|  ≤  |x| + |y|\n|x| < a  ⇔  −a < x < a;     |x| > a  ⇔  x < −a  və ya  x > a   (a > 0)',
        symbols: [
          '|x| — x ≥ 0 olduqda x, x < 0 olduqda −x',
          '|x − y| — ədəd oxunda x və y nöqtələri arasındakı məsafə',
        ],
        steps: [
          'İfadəni yuxarıdan böyütmək (≤) lazım olduqda |A + B| ≤ |A| + |B| istifadə et.',
          'İfadəni aşağıdan kiçiltmək (≥) lazım olduqda |A − B| ≥ ||A| − |B|| istifadə et.',
        ],
        example:
          'Əgər |x − 2| < 0.5 olarsa, |x|-i yuxarıdan qiymətləndirək:\n|x| = |(x − 2) + 2| ≤ |x − 2| + |2| < 0.5 + 2 = 2.5.',
        warning:
          '|x − y| ≤ |x| − |y| YAZMAQ OLMAZ! Fərqin də modulu modullar cəmindən kiçik-bərabərdir: |x − y| ≤ |x| + |y|.',
      },
      {
        title: '4. Arximed Prinsipi və Kantorun Daxil Olmuş Parçalar Teoremi',
        intuition:
          'Arximed prinsipi deyir ki, əlində nə qədər kiçik addım (ε) olursa olsun, həmin addımı kifayət qədər çox (n dəfə) təkrarlasan, istənilən nəhəng ədədi keçə bilərsən (başqa sözlə, 1/n kəsri n böyüdükcə istənilən ε > 0-dan kiçik olur). Kantor teoremi isə "matryoşka" kimidir: bir-birinin içində yerləşən qapalı [a_n, b_n] parçalarını sonsuz kiçiltsən, onların hamısının içində qalan ən azı bir ortaq nöqtə mütləq var.',
        explanation:
          'Arximed prinsipi: İstənilən ε > 0 üçün elə n ∈ ℕ var ki, 1/n < ε. Kantor teoremi: Bir-birinə daxil olmuş [a₁, b₁] ⊃ [a₂, b₂] ⊃ ... qapalı parçalar sisteminin kəsişməsi boş deyil; əgər parçaların uzunluğu lim(b_n − a_n) = 0 olarsa, kəsişmə yeganə c ∈ ℝ nöqtəsindən ibarətdir.',
        formula:
          'Arximed prinsipi: ∀ε > 0,  ∃n ∈ ℕ :  1 / n < ε\nKantor teoremi:   [a₁, b₁] ⊃ [a₂, b₂] ⊃ ...  və  (b_n − a_n) → 0   ⇒   ⋂(n=1..∞) [a_n, b_n] = {c}',
        symbols: [
          '[a_n, b_n] — ucları daxil olan qapalı parça',
          'b_n − a_n — n-ci parçanın uzunluğu',
          '⋂ — bütün parçaların sonsuz kəsişməsi (hamısına eyni vaxtda aid olan nöqtələr)',
        ],
        steps: [
          'Verilmiş ε üçün 1/n < ε bərabərsizliyindən n > 1/ε tap.',
          'Parçalar sisteminin kəsişməsini taparkən sol ucların limitini (lim a_n) və sağ ucların limitini (lim b_n) hesabla.',
        ],
        example:
          '• Qapalı [0, 1/n] parçalarının kəsişməsi: ⋂ [0, 1/n] = {0} (0 hər bir parçaya daxildir).\n• Açıq (0, 1/n) intervallarının kəsişməsi isə BOŞDUR: ⋂ (0, 1/n) = ∅, çünki 0 daxil deyil, hər hansı x > 0 üçün isə Arximed prinsipinə görə elə n var ki, 1/n < x olur!',
        warning:
          'Kantor teoremi yalnız QAPALI [a_n, b_n] parçaları üçün doğrudur; açıq (a_n, b_n) intervallarında kəsişmə boş (∅) ola bilər!',
      },
    ],
    workedExample: {
      prompt: 'A={x∈ℝ : |x−2|<0.5}. A-nı interval kimi yazın və iki yuxarı sərhəd göstərin.',
      steps: [
        '|x−2|<0.5 ⇔ −0.5<x−2<0.5.',
        'Hər tərəfə 2 əlavə edirik: 1.5<x<2.5.',
        'A=(1.5,2.5); 2.5 və 3 yuxarı sərhədlərdir.',
      ],
      conclusion: '2.5 yuxarı sərhəddir, amma A-ya daxil deyil.',
    },
    proofTask: {
      prompt: 'ε>0 olduqda |x−a|<ε ⇔ a−ε<x<a+ε olduğunu göstər.',
      hint: '|t|<ε tərifini −ε<t<ε şəklində yaz.',
      solution: [
        '|x−a|<ε ⇔ −ε<x−a<ε.',
        'Hər tərəfə a əlavə etdikdə a−ε<x<a+ε alınır.',
        'Hər addım geri çevrilə bildiyinə görə bu, ekvivalentlikdir.',
      ],
    },
    commonMistake: '“Yuxarı sərhəd” ilə “ən böyük element” fərqlidir: (0,1)-in yuxarı sərhədi 1-dir, lakin maksimumu yoxdur.',
    questions: [
      { id: 'r1', prompt: '√2 haqqında hansı fikir doğrudur?', choices: ['ℚ-dədir', 'ℝ-dədir, ℚ-də deyil', 'ℤ-dədir', 'ℝ-də deyil'], correct: 1, explanation: '√2 irrasional həqiqi ədəddir.' },
      { id: 'r2', prompt: 'x∈(1,3] nə deməkdir?', choices: ['1≤x<3', '1<x≤3', '1<x<3', '1≤x≤3'], correct: 1, explanation: 'Sol mötərizə ucu çıxarır, sağ kvadrat mötərizə ucu daxil edir.' },
      { id: 'r3', prompt: '|x−2|<0.5 həll çoxluğu hansıdır?', choices: ['[1.5,2.5]', '(1.5,2.5)', '(−0.5,0.5)', '(2,2.5)'], correct: 1, explanation: '2 ətrafında radiusu 0.5 olan açıq interval alınır.' },
      { id: 'r4', prompt: 'A=(0,1) üçün hansı ədəd yuxarı sərhəddir?', choices: ['0', '0.5', '1', '−1'], correct: 2, explanation: 'A-nın bütün elementləri 1-dən kiçikdir.' },
      { id: 'r5', prompt: 'A=[−2,4) üçün aşağı sərhəd hansı ola bilər?', choices: ['−1', '0', '−2', '5'], correct: 2, explanation: '−2 A-nın hər elementindən kiçik və ya ona bərabərdir.' },
      { id: 'r6', prompt: 'M yuxarı sərhəddirsə, hansı ifadə mütləq doğrudur?', choices: ['M∈A', '∀a∈A, a≤M', 'M=max A', 'A sonludur'], correct: 1, explanation: 'Yuxarı sərhədin tərifi budur; M-in A-ya daxil olması tələb edilmir.' },
    ],
    aiContext: 'Mövzu: ℕ, ℤ, ℚ, ℝ; sıralı sahə, rasional/irrasional ədədlər, Arximed prinsipi, Kantor teoremi, deşilmiş ε-qonşuluğu, yuxarı/aşağı sərhəd və sərhədlilik.',
  },
  {
    id: 'supremum-infimum',
    title: 'Supremum, İnfimum və Həqiqi Ədədlərin Tamlıq Aksiomu',
    subtitle: '0-dan izah: sup A və inf A nədir, max/min-dən nə fərqi var və ε-meyarı necə işləyir?',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      'sup A (dəqiq yuxarı sərhəd) ilə max A (ən böyük element) arasındakı fərqi tam anlamaq',
      'inf A (dəqiq aşağı sərhəd) və min A-nı istənilən çoxluq üçün tapmaq',
      'ε-meyarı ilə supremum və infimumu analitik əsaslandırmaq',
    ],
    rules: [
      {
        title: '1. Supremum (sup A) — Ən Kiçik Yuxarı Sərhəd',
        intuition:
          'A = (0, 1) açıq intervalına baxaq: buradakı ədədlər 0.9, 0.99, 0.9999... kimi 1-ə sonsuz yaxınlaşır, amma 1-in özü qutunun içində YOXDUR. Ona görə "bu çoxluğun ən böyük ədədi (max) hansıdır?" desək, cavab: YOXDUR! Bəs "bu çoxluğun dirəndiyi tavan (dəqiq yuxarı sərhəd) neçədir?" desək, cavab: 1-dir! Bax həmin "tavan" ədədinə SUPREMUM (sup A) deyilir.',
        explanation:
          'A ⊆ ℝ çoxluğunun bütün yuxarı sərhədləri içərisində ən kiçiyinə A-nın dəqiq yuxarı sərhədi (supremumu) deyilir və s = sup A kimi yazılır. Analitik olaraq bu iki şərt deməkdir: 1) A-nın hər bir elementi s-dən kiçik və ya bərabərdir; 2) s-dən nə qədər kiçik ε > 0 çıxsaq (s − ε), A-nın içində həmin həddi keçən ən azı bir a elementi tapılır.',
        formula:
          's = sup A   ⇔   1) ∀a ∈ A : a ≤ s     və     2) ∀ε > 0, ∃a ∈ A : a > s − ε',
        symbols: [
          'sup A — A çoxluğunun dəqiq yuxarı sərhədi (ən kiçik yuxarı sərhəd)',
          's − ε — tavan sərhədindən çox kiçik ε qədər aşağı düşdükdə alınan hədd',
          'max A — A-nın özünə daxil olan ən böyük element (yalnız sup A ∈ A olduqda mövcuddur!)',
        ],
        steps: [
          'Çoxluğun sağ ucunun hansı ədədə yaxınlaşdığını və ya çatdığını tap — bu, sup A-dır.',
          'Həmin ədədin A çoxluğunun özünə daxil olub-olmadığını yoxla: daxildirsə max A = sup A, daxil deyilsə max A yoxdur.',
        ],
        example:
          '• A = (0, 5) üçün sup A = 5, amma 5 ∉ A olduğu üçün max A yoxdur.\n• B = (0, 5] üçün sup B = 5 və 5 ∈ B olduğu üçün max B = 5.',
        warning:
          'Tələbələrin ən çox qarışdırdığı məqam: sup A həmişə A çoxluğunun elementi olmaq məcburiyyətində DEYİL, amma max A mütləq A-nın elementi olmalıdır!',
      },
      {
        title: '2. İnfimum (inf A) — Ən Böyük Aşağı Sərhəd',
        intuition:
          'Supremum otağın "tavanı" idisə, İnfimum (inf A) otağın "döşəməsi"dir: çoxluğun elementlərinin aşağıdan dirəndiyi ən böyük aşağı sərhəddir. Əgər həmin döşəmə nöqtəsi çoxluğun özünə daxildirsə, o həm də minimum (min A) olur.',
        explanation:
          'A çoxluğunun bütün aşağı sərhədləri içərisində ən böyüyünə onun dəqiq aşağı sərhədi (infimumu) deyilir və t = inf A kimi yazılır.',
        formula:
          't = inf A   ⇔   1) ∀a ∈ A : a ≥ t     və     2) ∀ε > 0, ∃a ∈ A : a < t + ε',
        symbols: [
          'inf A — A çoxluğunun dəqiq aşağı sərhədi (ən böyük aşağı sərhəd)',
          'min A — A-nın özünə daxil olan ən kiçik element (yalnız inf A ∈ A olduqda mövcuddur)',
        ],
        steps: [
          'Çoxluğun ən kiçik qiymətlərinin hansı həddə dirəndiyini tap — bu, inf A-dır.',
          'Həmin ədəd çoxluqda varsa min A = inf A yaz, yoxdursa "min A yoxdur" yaz.',
        ],
        example:
          'A = { 1/n : n ∈ ℕ } = { 1, 1/2, 1/3, 1/4, ... } çoxluğu üçün:\n• Ən böyük element n=1-də alınır: sup A = max A = 1.\n• n böyüdükcə kəsrlər 0-a yaxınlaşır, amma heç vaxt 0 olmur: inf A = 0, min A isə YOXDUR!',
        warning:
          '{1/n} çoxluğunda inf A = 0-dır, lakin heç bir natural n üçün 1/n = 0 olmadığından 0 ∉ A və min A yoxdur!',
      },
      {
        title: '3. Həqiqi Ədədlərin Kəsilməzlik (Tamlıq / Dedekind–Veyyerştrass) Aksiomu',
        intuition:
          'Niyə ℝ-də "deşik" yoxdur? Tamlıq aksiomu deyir ki, ℝ-də yuxarıdan divarla məhdudlaşdırılmış istənilən boş olmayan çoxluğun MÜTLƏQ dəqiq yuxarı sərhədi (supremumu) ℝ-in öz içində var! Rasional ədədlərdə (ℚ) isə bu belə deyil (kəsrlər √2-yə dirənir, amma √2 rasional deyil).',
        explanation:
          'Həqiqi ədədlər çoxluğunun boş olmayan və yuxarıdan məhdud olan hər bir A ⊂ ℝ altçoxluğunun ℝ-də sonlu supremumu (sup A ∈ ℝ) var; aşağıdan məhdud olan hər bir altçoxluğunun isə ℝ-də sonlu infimumu (inf A ∈ ℝ) var.',
        formula:
          '(A ⊂ ℝ,  A ≠ ∅,  ∃M ∈ ℝ : ∀a ∈ A, a ≤ M)   ⇒   ∃! s = sup A ∈ ℝ',
        symbols: [
          'A ≠ ∅ — çoxluq boş deyil (ən azı bir elementi var)',
          '∃! — "yeganə olaraq elə bir ... var ki"',
        ],
        steps: [
          'Çoxluğun boş olmadığını (A ≠ ∅) yoxla.',
          'Yuxarıdan məhdud olduğunu (bütün hədlərin müəyyən M ədədindən kiçik olduğunu) göstər.',
          'Tamlıq aksiomuna görə sonlu sup A-nın mövcud olduğunu nəticə kimi yaz.',
        ],
        example:
          'A = { x ∈ ℚ : x > 0 və x² < 2 } çoxluğu yuxarıdan məhduddur. Onun ℝ-də supremumu sup A = √2-dir (ℚ daxilində isə supremumu yoxdur).',
        warning:
          'Əgər çoxluq yuxarıdan məhdud deyilsə (məsələn, A = [0, +∞)), onun sonlu supremumu yoxdur (şərti olaraq sup A = +∞ yazılır).',
      },
    ],
    workedExample: {
      prompt: 'A={1−1/n : n∈ℕ, n≥1}. sup A, inf A, max A və min A-nı tapın.',
      steps: [
        'n=1,2,3,... üçün elementlər 0, 1/2, 2/3, 3/4, ... olur.',
        'Hər element 1-dən kiçikdir; deməli 1 yuxarı sərhəddir. n→∞ olduqda 1−1/n→1 olduğundan sup A = 1, amma 1∉A (max A yoxdur).',
        'n=1 olduqda 0 alınır və 0∈A hər elementdən kiçikdir: inf A = min A = 0.',
      ],
      conclusion: 'sup A=1, max A yoxdur; inf A=min A=0.',
    },
    proofTask: {
      prompt: 'A=(0,1) üçün sup A=1 olduğunu tərif və ε meyarı ilə isbat et.',
      hint: 'Əvvəl 1-in yuxarı sərhəd olduğunu göstər; sonra istənilən ε>0 üçün 1−ε ilə 1 arasında A-dan bir element seç.',
      solution: [
        'Hər a∈(0,1) üçün a<1, deməli 1 yuxarı sərhəddir.',
        'İxtiyari ε>0 götür. δ=min(ε,1)/2 və a=1−δ seç. Onda 0<a<1 və a>1−ε.',
        'Beləliklə 1-dən kiçik heç bir ədəd yuxarı sərhəd ola bilməz; sup A=1.',
      ],
    },
    commonMistake: 'sup A həmişə A-ya daxil olmur. Həmçinin boş və ya yuxarıdan qeyri-sərhədli A üçün ℝ daxilində sonlu sup A təyin edilmir.',
    questions: [
      { id: 'b1', prompt: 'A=(0,1) üçün hansı doğrudur?', choices: ['sup A=1, max A yoxdur', 'sup A=max A=1', 'sup A=0', 'inf A=1'], correct: 0, explanation: '1 sərhəddir, lakin A-ya daxil deyil.' },
      { id: 'b2', prompt: 'A=[0,1) üçün inf A və min A nədir?', choices: ['Hər ikisi yoxdur', 'Hər ikisi 0-dır', 'inf A=1', 'min A=1'], correct: 1, explanation: '0 A-ya daxildir və ən kiçik elementdir.' },
      { id: 'b3', prompt: 's=sup A üçün ε meyarı hansıdır?', choices: ['∀ε>0, ∃a∈A: a>s−ε', '∃ε>0, ∀a∈A: a>s+ε', 's∈A mütləqdir', 'A sonludur'], correct: 0, explanation: 'A-nın elementləri s-ə istənilən qədər aşağıdan yaxınlaşır.' },
      { id: 'b4', prompt: 'A={1−1/n : n≥1} üçün maksimum varmı?', choices: ['Bəli, 0', 'Bəli, 1', 'Xeyr', 'Bəli, 1/2'], correct: 2, explanation: 'Hər elementdən daha böyüyü var, lakin 1 heç vaxt alınmır.' },
      { id: 'b5', prompt: 'ℝ-in tamlıq aksiomu nə deyir?', choices: ['Hər çoxluğun maksimumu var', 'Hər boş olmayan, yuxarıdan sərhədli altçoxluğun supremumu var', 'Bütün həqiqi ədədlər rasionaldır', 'Hər çoxluq sonludur'], correct: 1, explanation: 'Tamlıq məhz ən kiçik yuxarı sərhədin mövcudluğunu təmin edir.' },
      { id: 'b6', prompt: 'A=(−∞,2] üçün hansı doğrudur?', choices: ['sup A=2, max A=2', 'inf A=−∞ real ədəddir', 'A aşağıdan sərhədlidir', 'sup A yoxdur'], correct: 0, explanation: '2 A-ya daxildir və ən böyük elementdir. A-nın ℝ-də aşağı sərhədi yoxdur.' },
    ],
    aiContext: 'Mövzu: yuxarı/aşağı sərhəd, supremum və infimum, max/min fərqi, ε-xarakterizasiya, ℝ-in tamlıq aksiomu.',
  },
  {
    id: 'sequences-limits',
    title: 'Ədədi ardıcıllıqlar, Koşi (ε–N) limiti, Veyyerştrass teoremi və e ədədi',
    subtitle: '0-dan izah: ε–N tərifi nə deməkdir, iki polis teoremi, monotonluq və 2-ci görkəmli limit (e)',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      'Ardıcıllıq limitinin ε–N tərifini əzbərləmədən məntiqlə qurmaq və N(ε) tapmaq',
      'İki polis (sıxılmış ardıcıllıq) və Veyyerştrass teoremlərini tətbiq etmək',
      'Eyler ədədi e = lim(1 + 1/n)ⁿ ilə bağlı limitləri sürətlə hesablamaq',
    ],
    rules: [
      {
        title: '1. Ardıcıllığın Koşi (ε–N) Mənada Limiti',
        intuition:
          'Ardıcıllıq nömrələnmiş sonsuz ədədlər sırasıdır: x₁, x₂, x₃, ..., x_n, ... "Bu ardıcıllığın limiti a-dır" nə deməkdir? Təsəvvür et ki, a ədədi hədəfdir, ε (epsilon) isə sənin seçdiyin çox kiçik xəta payıdır (məsələn, 0.001). Əgər müəyyən bir N-ci addımdan sonra gələn BÜTÜN hədlər (x_{N+1}, x_{N+2}, ...) hədəfdən ε-dan daha az fərqlənirsə, onda a ədədi limitdir!',
        explanation:
          'a ədədinə (x_n) ardıcıllığının limiti deyilir, əgər istənilən ε > 0 üçün elə N(ε) ∈ ℕ nömrəsi tapılarsa ki, n > N(ε) şərtini ödəyən bütün hədlər üçün |x_n − a| < ε bərabərsizliyi doğru olsun. Yığılan hər bir ardıcıllıq məhduddur və onun limiti yeganədir.',
        formula:
          'lim(n→∞) x_n = a   ⇔   ∀ε > 0,  ∃N(ε) ∈ ℕ :  ∀n > N(ε)  ⇒  |x_n − a| < ε',
        symbols: [
          'x_n — ardıcıllığın n-ci (ümumi) həddi',
          'a — ardıcıllığın yaxınlaşdığı sonlu limit ədədi',
          'ε > 0 — ixtiyari kiçik müsbət ədəd (yaxınlıq ölçüsü)',
          'N(ε) — ε-dan asılı olan sıra nömrəsi (bu nömrədən sonrakı bütün hədlər ε-dəhlizinə düşür)',
        ],
        steps: [
          '|x_n − a| fərqini yaz, ortaq məxrəcə gətirib sadələşdir.',
          'Alınan ifadəni < ε götür və bərabərsizliyi n-ə görə həll et (n > g(ε) tap).',
          'N(ε) = [g(ε)] (tam hissə) götür.',
        ],
        example:
          'lim(n→∞) (2n + 1)/(n + 3) = 2 olduğunu ε–N tərifi ilə göstərək:\n1) |(2n + 1)/(n + 3) − 2| = |2n + 1 − 2n − 6| / (n + 3) = 5 / (n + 3).\n2) 5 / (n + 3) < ε  ⇔  n + 3 > 5/ε  ⇔  n > 5/ε − 3.\n3) N(ε) = [5/ε − 3] götürsək, tərif ödənir (məsələn, ε = 0.1 üçün N = 47).',
        warning:
          'Hər bir yığılan ardıcıllıq məhduddur, amma HƏR MƏHDUD ARDICILLIQ YIĞILMIR! Məsələn, x_n = (−1)ⁿ ardıcıllığı −1 ilə +1 arasında məhduddur, amma bir nöqtədə dayanmadığı üçün limiti yoxdur!',
      },
      {
        title: '2. Sıxılmış Ardıcıllıq (İki Polis) Teoremi və Sonsuz Kiçilənlər',
        intuition:
          'İki polis (x_n və z_n) ortadakı vətəndaşı (y_n) iki tərəfdən tutub aparır: x_n ≤ y_n ≤ z_n. Əgər hər iki polis eyni a qapısına gedirsə (lim x_n = lim z_n = a), ortadakı y_n də məcburən həmin a qapısına gedəcək!',
        explanation:
          'Əgər x_n ≤ y_n ≤ z_n olarsa və lim x_n = lim z_n = a olarsa, onda lim y_n = a olur. Həmçinin sonsuz kiçilən (lim α_n = 0) ardıcıllığın məhdud ardıcıllığa (məsələn, sin n, cos n, (−1)ⁿ) hasili həmişə 0-a bərabərdir.',
        formula:
          '(x_n ≤ y_n ≤ z_n  və  lim x_n = lim z_n = a)   ⇒   lim(n→∞) y_n = a\n(lim α_n = 0  və  |b_n| ≤ M)   ⇒   lim(n→∞) (α_n · b_n) = 0',
        symbols: [
          'x_n, z_n — aşağıdan və yuxarıdan sıxan sadə ardıcıllıqlar',
          'α_n — sonsuz kiçilən ardıcıllıq (lim α_n = 0)',
        ],
        steps: [
          'Tərkibində sin(n), cos(n) olan ifadədə −1 ≤ sin(n) ≤ 1 yaz.',
          'ⁿ√(aⁿ + bⁿ) tipli misallarda ən böyük əsası (məsələn, b > a olduqda bⁿ-i) seç: bⁿ < aⁿ + bⁿ < 2·bⁿ yaz və n-ci dərəcədən kök al.',
        ],
        example:
          '• lim(n→∞) sin(n)/n = 0, çünki −1/n ≤ sin(n)/n ≤ 1/n və ±1/n → 0.\n• lim(n→∞) ⁿ√(3ⁿ + 7ⁿ) = 7, çünki 7 < ⁿ√(3ⁿ + 7ⁿ) < 7·ⁿ√2 və ⁿ√2 → 1.',
        warning:
          'ⁿ√(a₁ⁿ + a₂ⁿ + ... + a_kⁿ) tipli limitin cavabı həmişə içəridəki ƏN BÖYÜK əsasa (max a_i) bərabərdir!',
      },
      {
        title: '3. Veyyerştrass Teoremi və Eyler Ədədi e (İkinci Görkəmli Limit)',
        intuition:
          'Əgər pilləkənlə yalnız YUXARI qalxırsansa (monoton artırsansa), amma başının üstündə TAVAN varsa (yuxarıdan məhdudsansa), sonsuzluğa gedə bilməzsən — mütləq tavanın altında müəyyən bir hündürlükdə dayanacaqsan (yığılacaqsan). Məhz bu qaydaya görə (1 + 1/n)ⁿ ardıcıllığı artaraq e ≈ 2.71828... ədədinə yığılır.',
        explanation:
          'Veyyerştrass teoremi: Monoton (azalan və ya artan) və məhdud olan hər bir ardıcıllıq yığılır. Xüsusi halda x_n = (1 + 1/n)ⁿ ardıcıllığı monoton artır və 2 ≤ x_n < 3 olduğundan e ədədinə yığılır.',
        formula:
          'lim(n→∞) (1 + 1/n)ⁿ = e ≈ 2.71828...\nPratiki düstur:  lim(n→∞) (1 + k / n)^(m · n) = e^(k · m)',
        symbols: [
          'e ≈ 2.718281828... — Eyler ədədi (natural loqarifmin əsası: ln e = 1)',
          '1^∞ — bu düsturun tətbiq olunduğu qeyri-müəyyənlik növü',
        ],
        steps: [
          'Mötərizənin içindəki kəsri "1 + α_n" şəklinə gətir (bunun üçün surətdə məxrəci ayır).',
          'Mötərizənin içindəki (expression − 1) hissəsini qüvvət üstünə vur və limitini tap; alınan ədəd e-nin qüvvəti olacaq.',
        ],
        example:
          'lim(n→∞) ((n + 3) / (n − 1))^(2n) limitini tapaq:\n1) Kəsri ayıraq: (n + 3)/(n − 1) = 1 + 4/(n − 1).\n2) Qüvvəti hesablayaq: lim [ 4/(n − 1) · 2n ] = lim [ 8n / (n − 1) ] = 8.\n3) Cavab: e⁸.',
        warning:
          'Əvvəlcə mötərizənin içinin həqiqətən 1-ə yaxınlaşdığını yoxla! Əgər mötərizənin içi 1-dən fərqli ədədə (məsələn, 1/2-yə) yaxınlaşırsa, burada e ədədi YOXDUR ((1/2)^∞ = 0 olur)!',
      },
      {
        title: '4. Bolsano–Veyyerştrass Lemması və Koşi Fundamental Meyarı',
        intuition:
          'Koşi meyarı soruşur: "Bəs limitin (a ədədinin) neçə olduğunu bilmədən ardıcıllığın yığıldığını necə yoxlayaq?" Cavab: Əgər ardıcıllığın hədləri uzaqlarda bir-birinə sonsuz sıxlaşırsa (|x_{n+p} − x_n| < ε), deməli onlar mütləq hansısa nöqtəyə yığılırlar! Belə ardıcıllığa fundamental ardıcıllıq deyilir.',
        explanation:
          'Bolsano–Veyyerştrass: Hər bir məhdud ardıcıllıqdan yığılan alt-ardıcıllıq ayırmaq olar. Koşi meyarı: Həqiqi ədədi ardıcıllığın yığılması üçün zəruri və kafi şərt onun fundamental olmasıdır.',
        formula:
          'Fundamental ardıcıllıq:  ∀ε > 0, ∃N ∈ ℕ : ∀n > N, ∀p ∈ ℕ  ⇒  |x_{n+p} − x_n| < ε',
        symbols: [
          'x_{n_k} — ardıcıllıqdan seçilmiş alt-ardıcıllıq (məsələn, cüt nömrəli x_{2k} hədləri)',
          '|x_{n+p} − x_n| — n-ci hədlə ondan p addım sonrakı həddin fərqi',
        ],
        steps: [
          'Ardıcıllığın dağıldığını göstərmək üçün iki fərqli alt-ardıcıllıq (məsələn, n=2k və n=2k−1) götürüb limitlərinin fərqli olduğunu göstər.',
          'Cəm şəklində verilən ardıcıllığın dağıldığını göstərmək üçün x_{2n} − x_n fərqinin 0-a getmədiyini yoxla.',
        ],
        example:
          'Harmonik cəm x_n = 1 + 1/2 + 1/3 + ... + 1/n üçün:\nx_{2n} − x_n = 1/(n+1) + 1/(n+2) + ... + 1/(2n) ≥ n · (1/2n) = 1/2.\nFərq 0-a yaxınlaşmadığı üçün ardıcıllıq fundamental deyil və +∞-a dağılır!',
        warning:
          'Sadəcə qonşu hədlərin fərqinin sıfıra getməsi (x_{n+1} − x_n → 0) yığılma üçün KİFAYƏT DEYİL (harmonik cəmdə 1/(n+1) → 0 olsa da, cəm sonsuzluğa gedir)!',
      },
    ],
    workedExample: {
      prompt: 'Tərifdən (ε–N) istifadə edərək lim(n→∞) (3n − 1)/(n + 2) = 3 olduğunu isbat edin və ε = 0.01 üçün N tapın.',
      steps: [
        'Fərqin modulunu sadələşdirək: |(3n − 1)/(n + 2) − 3| = |3n − 1 − 3n − 6| / (n + 2) = 7 / (n + 2).',
        '7 / (n + 2) < ε bərabərsizliyini n-ə görə həll edək: n + 2 > 7/ε ⇔ n > 7/ε − 2.',
        'N(ε) = [7/ε − 2] (tam hissə) götürsək, ∀n > N(ε) üçün bərabərsizlik ödənir. ε = 0.01 üçün n > 700 − 2 = 698, yəni N = 698.',
      ],
      conclusion: 'Beləliklə, n ≥ 699 olduqda hədlərin 3-dən fərqi 0.01-dən kiçik olur.',
    },
    proofTask: {
      prompt: 'Sıxılmış ardıcıllıq teoremi ilə lim(n→∞) ⁿ√(3ⁿ + 5ⁿ) = 5 olduğunu isbat edin.',
      hint: '5ⁿ < 3ⁿ + 5ⁿ < 2·5ⁿ ikitərəfli qiymətləndirməsindən n-ci dərəcədən kök alın.',
      solution: [
        'Hər bir n ∈ ℕ üçün 5ⁿ < 3ⁿ + 5ⁿ < 5ⁿ + 5ⁿ = 2 · 5ⁿ doğrudur.',
        'Hər tərəfdən n-ci dərəcədən kök alsaq: 5 < ⁿ√(3ⁿ + 5ⁿ) < 5 · ⁿ√2.',
        'lim(n→∞) ⁿ√2 = 1 olduğundan sağ tərəfin limiti 5·1 = 5-dir. Sıxılmış ardıcıllıq teoreminə görə axtarılan limit 5-ə bərabərdir.',
      ],
    },
    commonMistake: '“Hər bir məhdud ardıcıllıq yığılır” fikri YALNIŞDIR: məsələn, x_n = (-1)ⁿ məhduddur (|x_n| = 1), lakin iki xüsusi limiti (-1 və 1) olduğu üçün dağılır. Yalnız MONOTON və məhdud ardıcıllıq mütləq yığılır!',
    questions: [
      { id: 'seq1', prompt: 'Yığılan (x_n) ardıcıllığı haqqında hansı hökm həmişə doğrudur?', choices: ['Həmişə monotondur', 'Həmişə məhduddur və limiti yeganədir', 'Həmişə müsbət hədlidir', 'Yalnız tam ədədlərdən ibarətdir'], correct: 1, explanation: 'Hər bir yığılan ardıcıllıq məhduddur və onun yalnız bir limiti ola bilər.' },
      { id: 'seq2', prompt: 'lim(n→∞) (1 − 3/n)^(4n) limiti nəyə bərabərdir?', choices: ['e⁻¹²', 'e¹²', 'e⁻³', '1'], correct: 0, explanation: 'II görkəmli limitə görə lim(1 + (-3)/n)^(4n) = e^(-3·4) = e⁻¹².' },
      { id: 'seq3', prompt: 'lim(n→∞) ⁿ√(2ⁿ + 7ⁿ) limitini tapın:', choices: ['2', '9', '7', '∞'], correct: 2, explanation: '7 < ⁿ√(2ⁿ + 7ⁿ) < 7·ⁿ√2 olduğundan iki polis teoreminə görə limit 7-dir.' },
      { id: 'seq4', prompt: 'Veyyerştrass teoreminə görə ardıcıllığın sonlu limitə yığılması üçün kafi şərt hansıdır?', choices: ['Yalnız məhdud olması', 'Yalnız monoton olması', 'Həm monoton, həm də məhdud olması', 'Hədlərinin sıfırdan fərqli olması'], correct: 2, explanation: 'Monoton və məhdud olan hər bir həqiqi ədədi ardıcıllıq yığılır.' },
      { id: 'seq5', prompt: 'x_n = (-1)ⁿ ardıcıllığının yuxarı (lim sup) və aşağı (lim inf) limitləri nədir?', choices: ['Hər ikisi 0', 'lim sup = 1, lim inf = −1', 'Yoxdur', 'lim sup = ∞, lim inf = −∞'], correct: 1, explanation: 'Cüt nömrəli alt-ardıcıllıq 1-ə, tək nömrəli isə -1-ə yığılır.' },
    ],
    aiContext: 'Mövzu: ədədi ardıcıllıqlar, Koşi ε-N limiti, yığılan ardıcıllıqların xassələri, iki polis teoremi, Veyyerştrass teoremi, Eyler ədədi e, Bolsano-Veyyerştrass lemması və Koşi fundamental meyarı.',
  },
  {
    id: 'function-limits',
    title: 'Funksiyanın limiti (Koşi və Heyne), Görkəmli limitlər və Landau simvolları (O, o)',
    subtitle: '0-dan izah: ε–δ tərifi, I və II görkəmli limitlər və ekvivalent sonsuz kiçilənlər cədvəli (~)',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      'Funksiyanın nöqtədə limitinin Koşi (ε–δ) və Heyne təriflərini və birtərəfli limitləri anlamaq',
      'I və II görkəmli limitləri və onlardan çıxan düsturları tətbiq etmək',
      'Ekvivalent sonsuz kiçilənlər cədvəli ilə 0/0 limitlərini 5 saniyəyə həll etmək',
    ],
    rules: [
      {
        title: '1. Funksiyanın Limitinin Koşi (ε–δ), Heyne və Birtərəfli Limit Tərifləri',
        intuition:
          'x dəyişəni x₀ nöqtəsinə soldan və sağdan yaxınlaşarkən (x = x₀ olmasa belə!) f(x)-in qiyməti A ədədinə istənilən qədər yaxınlaşırsa, A ədədinə limit deyilir. ε–δ tərifi bunu dəqiq deyir: "f(x)-in A-dan fərqinin ε-dan kiçik olması üçün x-i x₀-a δ (delta) məsafəsindən daha yaxın seçmək kifayətdir".',
        explanation:
          'Koşi tərifi: ∀ε > 0 üçün elə δ(ε) > 0 var ki, 0 < |x − x₀| < δ olduqda |f(x) − A| < ε. Funksiyanın x₀ nöqtəsində limitinin varlığı üçün zəruri və kafi şərt sol limitin (x → x₀ − 0) və sağ limitin (x → x₀ + 0) sonlu olub bir-birinə bərabər olmasıdır.',
        formula:
          'Koşi (ε–δ):  ∀ε > 0, ∃δ > 0 :  0 < |x − x₀| < δ  ⇒  |f(x) − A| < ε\nMeyar:       lim(x→x₀) f(x) = A   ⇔   f(x₀ − 0) = f(x₀ + 0) = A',
        symbols: [
          '0 < |x − x₀| < δ — x nöqtəsi x₀-dan fərqlidir (x ≠ x₀), amma ona δ-dan yaxındır',
          'f(x₀ − 0) — sol limit (x soldan, yəni x < x₀ qalaraq x₀-a yaxınlaşır)',
          'f(x₀ + 0) — sağ limit (x sağdan, yəni x > x₀ qalaraq x₀-a yaxınlaşır)',
        ],
        steps: [
          'Modul |...| və ya parçalı funksiya verildikdə həmişə əvvəlcə sol (x → x₀−0) və sağ (x → x₀+0) limitləri ayrı-ayrılıqda hesabla.',
          'Əgər sol və sağ limit bərabərdirsə, həmin ədədi ümumi limit kimi yaz; fərqlidirsə "limit yoxdur" yaz.',
        ],
        example:
          'f(x) = |x| / x funksiyası üçün x → 0-da:\n• Sol limit (x < 0): |x| = −x olduğundan (−x)/x = −1.\n• Sağ limit (x > 0): |x| = x olduğundan x/x = +1.\n−1 ≠ +1 olduğu üçün x = 0-da ümumi limit YOXDUR!',
        warning:
          'Limitin olması üçün f(x₀)-ın təyin olunması şərt DEYİL! Məsələn, (x²−4)/(x−2) funksiyası x=2-də təyin olunmayıb, amma x→2-də limiti 4-dür.',
      },
      {
        title: '2. Birinci və İkinci Görkəmli Limitlər',
        intuition:
          '1) Çok kiçik bucaqlarda (u → 0 rad) sin(u) ilə u bucağının özü demək olar ki, bərabərdir — ona görə onların nisbəti 1-ə yaxınlaşır (I Görkəmli Limit).\n2) (1 + kiçik ədəd)^(1 / həmin kiçik ədəd) şəklindəki ifadə isə həmişə e ≈ 2.718 ədədinə yaxınlaşır (II Görkəmli Limit).',
        explanation:
          'Triqonometrik 0/0 qeyri-müəyyənlikləri I görkəmli limitlə, üstlü 1^∞ qeyri-müəyyənlikləri isə II görkəmli limitlə açılır.',
        formula:
          'I Görkəmli Limit:   lim(u→0) [ sin(u) / u ] = 1\nII Görkəmli Limit:  lim(u→0) (1 + u)^(1/u) = e;     lim(x→∞) (1 + 1/x)^x = e\nSürətli düstur (1^∞ üçün):  lim [u(x)]^[v(x)] = e^{ lim [ (u(x) − 1) · v(x) ] }',
        symbols: [
          'u(x) → 0 — sıfıra yaxınlaşan ixtiyari ifadə (bucaq radianla ölçülür!)',
          '1^∞ — əsası 1-ə, qüvvəti sonsuzluğa yaxınlaşan qeyri-müəyyənlik',
        ],
        steps: [
          'sin(kx)/mx tipli misalda sin-in arqumentinə vurub-böl: cavab k/m olur.',
          '[u(x)]^[v(x)] ifadəsində u→1 və v→∞ olduqda birbaşa e^{ lim (u − 1)·v } düsturunu tətbiq et.',
        ],
        example:
          '• lim(x→0) sin(7x) / sin(3x) = 7/3.\n• lim(x→0) (1 + 4x)^(3/x) = e^{ lim (4x · 3/x) } = e¹².',
        warning:
          'lim(x→∞) (sin x)/x = 1 DEYİL! Çünki x → ∞ olduqda sin(x) [−1, 1] arasında rəqs edir, məxrəc isə böyüyür: cavab 0-dır!',
      },
      {
        title: '3. Ekvivalent Sonsuz Kiçilənlər Cədvəli (~) və Landau Simvolu o(...)',
        intuition:
          'u → 0 olduqda mürəkkəb funksiyalar (sin u, ln(1+u), e^u − 1, 1 − cos u) öz sadə "əkiz qardaşları" kimi davranır. Vurma və bölmə zamanı çətin funksiyanı silib yerinə onun sadə ekvivalentini yazırsan və misal dərhal həll olunur!',
        explanation:
          'u → 0 olduqda α(u)/β(u) → 1 olarsa, α və β ekvivalent sonsuz kiçilənlər adlanır (α ~ β). α(u)/β(u) → 0 olarsa, α = o(β) yazılır (α, β-dan daha yüksək tərtibli kiçiləndir). Vurma və bölmədə vuruqları ekvivalentləri ilə əvəz etmək olar.',
        formula:
          'u → 0 olduqda QIZIL EKVİVALENTLİKLƏR CƏDVƏLİ:\n• sin u ~ u          • tg u ~ u           • arcsin u ~ u        • arctg u ~ u\n• ln(1 + u) ~ u      • e^u − 1 ~ u        • a^u − 1 ~ u · ln a\n• 1 − cos u ~ u² / 2                      • (1 + u)^α − 1 ~ α · u',
        symbols: [
          '~ — ekvivalentlik işarəsi (nisbətlərinin limiti 1-dir)',
          'o(xⁿ) — xⁿ-dən daha sürətlə sıfıra gedən qalıq (məsələn, x³ ifadəsi x²-a nəzərən o(x²)-dır)',
        ],
        steps: [
          'x → 0 limitində surət və məxrəcdəki hər bir vuruğu cədvəldəki ekvivalenti ilə əvəz et.',
          '1 − cos(kx) gördükdə dərhal (kx)² / 2 = k²x² / 2 yaz.',
          'x-ləri ixtisar et və əmsalların nisbətini hesabla.',
        ],
        example:
          'lim(x→0) [ ln(1 + 3x²) · sin(2x) ] / [ (1 − cos 4x) · arctg x ]\nHəlli:\n• Surət: ln(1+3x²) ~ 3x²,  sin(2x) ~ 2x  ⇒  3x² · 2x = 6x³.\n• Məxrəc: 1 − cos(4x) ~ (4x)²/2 = 8x²,  arctg x ~ x  ⇒  8x² · x = 8x³.\n• Nisbət: 6x³ / 8x³ = 6/8 = 3/4.',
        warning:
          'Ekvivalentlə əvəzetməni YALNIZ VURMA VƏ BÖLMƏDƏ etmək olar! Toplama və çıxmada baş hədlər islah olunursa (məsələn, sin x − tg x), sadə ekvivalentlik yazmaq QƏTİ QADAĞANDIR (Teylor açılışı yazılmalıdır)!',
      },
    ],
    workedExample: {
      prompt: 'lim(x→0) [ln(1 + 3x²) · sin(2x)] / [(1 − cos(4x)) · arctg(x)] limitini ekvivalent sonsuz kiçilənlərlə hesablayın.',
      steps: [
        'x → 0 olduqda hər bir vuruğu öz ekvivalenti ilə əvəz edək: ln(1 + 3x²) ~ 3x², sin(2x) ~ 2x.',
        'Məxrəcdə: 1 − cos(4x) ~ (4x)² / 2 = 8x² və arctg(x) ~ x.',
        'Nisbəti sadələşdirək: lim(x→0) (3x² · 2x) / (8x² · x) = 6x³ / 8x³ = 6/8 = 3/4.',
      ],
      conclusion: 'Cavab: 3/4 = 0.75.',
    },
    proofTask: {
      prompt: '1 − cos x ~ x²/2 (x → 0) ekvivalentliyini I görkəmli limit vasitəsilə isbat edin.',
      hint: '1 − cos x = 2 sin²(x/2) yarım arqument düsturundan istifadə edin.',
      solution: [
        'lim(x→0) (1 − cos x) / (x²/2) = lim(x→0) [2 sin²(x/2)] / (x²/2) = lim(x→0) [sin(x/2) / (x/2)]².',
        't = x/2 → 0 əvəzləməsi və I görkəmli limitə görə lim(t→0) (sin t / t) = 1.',
        'Deməli, limit 1² = 1-ə bərabərdir, yəni 1 − cos x ~ x²/2.',
      ],
    },
    commonMistake: 'Cəm və ya fərqdə ekvivalentlə əvəzləmə etmək ən kobud imtahan səhvidir: məsələn, lim(x→0) (sin x − x)/x³ ifadəsində sin x yerinə x yazmaq olmaz, sin x = x − x³/6 + o(x³) yazılmalıdır (cavab: -1/6).',
    questions: [
      { id: 'fl1', prompt: 'x → 0 olduqda 1 − cos(2x) hansı ifadəyə ekvivalentdir?', choices: ['2x', '2x²', '4x²', 'x²/2'], correct: 1, explanation: '1 − cos u ~ u²/2 olduğundan u = 2x üçün (2x)²/2 = 2x².' },
      { id: 'fl2', prompt: 'lim(x→0) (e^(3x) − 1) / ln(1 + 6x) limitini tapın:', choices: ['1/2', '2', '3', '0'], correct: 0, explanation: 'Surət ~ 3x, məxrəc ~ 6x olduğundan 3x / 6x = 1/2.' },
      { id: 'fl3', prompt: 'lim(x→0) (sin x − x) / x³ limiti nəyə bərabərdir?', choices: ['0', '−1/6', '1/6', '1'], correct: 1, explanation: 'sin x = x − x³/6 + o(x³) olduğundan (−x³/6)/x³ → −1/6.' },
      { id: 'fl4', prompt: 'f(x) funksiyasının x₀ nöqtəsində sonlu limitinin varlığı üçün zəruri və kafi şərt nədir?', choices: ['f(x₀) təyin olunmalıdır', 'Sol və sağ limitlər sonlu olub bir-birinə bərabər olmalıdır', 'f(x) monoton olmalıdır', 'f(x₀) = 0 olmalıdır'], correct: 1, explanation: 'lim(x→x₀−0) f(x) = lim(x→x₀+0) f(x) = A.' },
      { id: 'fl5', prompt: 'α(x) = o(x²) yazılışı x → 0 olduqda nə deməkdir?', choices: ['lim(α(x)/x²) = 1', 'lim(α(x)/x²) = 0', 'lim(α(x)/x) = ∞', 'α(x) = x²'], correct: 1, explanation: 'Kiçik o simvolu α(x)-in x²-a nəzərən daha yüksək tərtibli sonsuz kiçilən olduğunu (nisbətin limitinin 0 olduğunu) göstərir.' },
    ],
    aiContext: 'Mövzu: funksiyanın Koşi (ε-δ) və Heyne limiti, birtərəfli limitlər, I və II görkəmli limitlər, Landau simvolları (O, o) və ekvivalent sonsuz kiçilənlər.',
  },
  {
    id: 'continuity-theorems',
    title: 'Funksiyanın kəsilməzliyi, Kəsilmə nöqtələri və Parçada Qlobal Teoremlər',
    subtitle: '0-dan izah: I və II növ kəsilmə nöqtələri, Bolsano–Koşi, Veyyerştrass və Kantor teoremləri',
    duration: '22 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: [
      'Kəsilmə nöqtələrini I növ (aradan qaldırıla bilən və sıçrayışlı) və II növə ayırmaq',
      'Bolsano–Koşi və Veyyerştrass teoremlərinin həndəsi mənasını anlamaq',
      'Adi kəsilməzliklə müntəzəm kəsilməzliyi (Kantor teoremi) fərqləndirmək',
    ],
    rules: [
      {
        title: '1. Funksiyanın Nöqtədə Kəsilməzliyinin 3 Ekvivalent Şərti',
        intuition:
          'Sadə dillə: funksiyanın qrafikini x₀ nöqtəsindən keçərkən QƏLƏMİ KAĞIZDAN QALDIRMADAN çəkə bilirsənsə, funksiya həmin nöqtədə kəsilməzdir! Bunun üçün x₀ nöqtəsində həm sol limit, həm sağ limit, həm də funksiyanın öz f(x₀) qiyməti bir-birinə bərabər olmalıdır.',
        explanation:
          'f(x) funksiyası x₀ nöqtəsində kəsilməzdir, əgər: 1) x₀ nöqtəsində təyin olunub; 2) sonlu sol və sağ limitləri bərabərdir; 3) həmin limit f(x₀)-a bərabərdir. Ekvivalent olaraq, arqumentin sonsuz kiçik Δx → 0 artımına funksiyanın sonsuz kiçik Δy → 0 artımı uyğun gəlir.',
        formula:
          'f ∈ C(x₀)   ⇔   lim(x→x₀−0) f(x) = lim(x→x₀+0) f(x) = f(x₀)   ⇔   lim(Δx→0) Δy = 0',
        symbols: [
          'C(x₀) — x₀ nöqtəsində kəsilməz funksiyalar sinfi',
          'Δx = x − x₀ — arqumentin artımı',
          'Δy = f(x₀ + Δx) − f(x₀) — funksiyanın artımı',
        ],
        steps: [
          'Sol limiti L₁ = f(x₀ − 0) və sağ limiti L₂ = f(x₀ + 0) hesabla.',
          'Funksiyanın nöqtədəki qiymətini f(x₀) tap.',
          'Əgər L₁ = L₂ = f(x₀) (sonlu ədəd) olarsa, funksiya kəsilməzdir!',
        ],
        example:
          'Bütün elementar funksiyalar (çoxhədlilər, sin x, cos x, e^x, ln x) öz təyin oblastlarının hər bir nöqtəsində kəsilməzdir.',
        warning:
          'Kəsr funksiyalar yalnız məxrəci sıfıra çevirən nöqtələrdə kəsilir!',
      },
      {
        title: '2. Kəsilmə Nöqtələrinin Təsnifatı (I Növ və II Növ)',
        intuition:
          'Əgər qrafik x₀ nöqtəsində qırılırsa, bu qırılmanın 3 mümkün səbəbi var:\n1) İynə ucu boyda "deşik" var (sol və sağ limit eynidir, sadəcə nöqtənin özü boşdur) — bu, I növ aradan qaldırıla bilən kəsilmədir.\n2) Qrafik pilləkən kimi birdən sıçrayır (sol və sağ limit sonludur, amma fərqlidir) — bu, I növ sıçrayışlı kəsilmədir.\n3) Qrafik sonsuzluğa (±∞) uçur və ya dəli kimi titrəyir — bu, II növ kəsilmədir!',
        explanation:
          '• I növ kəsilmə: Həm sol f(x₀−0), həm də sağ f(x₀+0) limitləri SONLU ədədlərdir (L₁ = L₂ ≠ f(x₀) olduqda aradan qaldırıla bilən; L₁ ≠ L₂ olduqda sonlu sıçrayışlı).\n• II növ kəsilmə: Birtərəfli limitlərdən heç olmasa biri sonsuzluqdur (±∞) və ya mövcud deyil.',
        formula:
          'I növ sıçrayış:   d = | f(x₀ + 0) − f(x₀ − 0) |\nII növ şərti:     f(x₀ − 0) = ±∞   və ya   f(x₀ + 0) = ±∞   və ya   limit yoxdur',
        symbols: [
          'L₁ = f(x₀ − 0) — sol limit',
          'L₂ = f(x₀ + 0) — sağ limit',
          'd — sıçrayışın qiyməti',
        ],
        steps: [
          'Kəsilmə nöqtəsində sol (L₁) və sağ (L₂) limitləri hesabla.',
          'Hər ikisi sonludursa → I növ yaz (bərabərdirsə "aradan qaldırıla bilən", fərqlidirsə "sıçrayışlı").',
          'Heç olmasa biri ±∞ çıxırsa (məsələn, 1/0 və ya e^(+∞)) → dərhal II növ yaz!',
        ],
        example:
          '• f(x) = (sin x)/x (x=0-da): L₁ = L₂ = 1 (sonlu və bərabər) ⇒ I növ aradan qaldırıla bilən kəsilmə.\n• f(x) = |x|/x (x=0-da): L₁ = −1, L₂ = +1 ⇒ I növ sıçrayışlı kəsilmə (sıçrayış = 2).\n• f(x) = e^(1/(x−2)) (x=2-də): L₁ = e^(−∞) = 0, L₂ = e^(+∞) = +∞ ⇒ II növ kəsilmə.',
        warning:
          'e^(1/x) tipli misallarda x → −0 və x → +0 fərqinə diqqət et: 1/(−0) = −∞ olduğundan e^(−∞) = 0 (sonlu!), amma 1/(+0) = +∞ olduğundan e^(+∞) = +∞ (sonsuz!) olur — bir tərəf sonsuz olduğu üçün yenə də II növ kəsilmədir!',
      },
      {
        title: '3. Parçada Kəsilməz Funksiyaların Qlobal Teoremləri (Bolsano–Koşi, Veyyerştrass, Kantor)',
        intuition:
          'Qapalı [a, b] parçasında qələmi kağızdan qaldırmadan qrafik çəkirsən:\n• Bolsano–Koşi: Əgər a-da suyun altındasansa (f(a) < 0), b-də isə suyun üstünə çıxmısansa (f(b) > 0), yolda mütləq su səthini (f(c) = 0) kəsib keçmisən!\n• Veyyerştrass: Qapalı parçada kəsilməz qrafik sonsuzluğa qaça bilməz — onun mütləq ən hündür zirvəsi (max) və ən çökək dərəsi (min) var!\n• Kantor: Qapalı parçada kəsilməz funksiya həm də müntəzəm kəsilməzdir.',
        explanation:
          'f ∈ C[a, b] (qapalı və məhdud parçada kəsilməz) olduqda:\n1) Bolsano–Koşi I teoremi: f(a)·f(b) < 0 ⇒ ∃c ∈ (a, b) : f(c) = 0.\n2) Veyyerştrass I və II teoremləri: f funksiyası [a, b]-də məhduddur və öz dəqiq aşağı (m = min f) və dəqiq yuxarı (M = max f) qiymətlərinə çatır.\n3) Kantor teoremi: [a, b] parçasında kəsilməz funksiya həmin parçada müntəzəm kəsilməzdir.',
        formula:
          'Bolsano–Koşi:  f ∈ C[a, b]  və  f(a) · f(b) < 0   ⇒   ∃c ∈ (a, b) : f(c) = 0\nVeyyerştrass:  f ∈ C[a, b]   ⇒   ∃x₁, x₂ ∈ [a, b] :  f(x₁) = min f,  f(x₂) = max f',
        symbols: [
          'C[a, b] — ucları daxil olan [a, b] parçasında kəsilməz funksiyalar çoxluğu',
          'f(a) · f(b) < 0 — parçanın uclarında funksiya əks işarəli qiymətlər alır',
        ],
        steps: [
          'Tənliyin (a, b) intervalında kökü olduğunu göstərmək üçün bütün hədləri sola keçirib f(x) = 0 yaz.',
          'f(a) və f(b)-ni hesabla; əgər biri mənfi, biri müsbətdirsə, Bolsano–Koşi teoreminə görə (a, b)-də kök var.',
        ],
        example:
          'x⁵ + x − 1 = 0 tənliyinin (0, 1) intervalında həqiqi kökü varmı?\nHəlli: f(x) = x⁵ + x − 1 funksiyası [0, 1]-də kəsilməzdir. f(0) = −1 < 0 və f(1) = 1 > 0. İşarələr əks olduğu üçün (0, 1)-də ən azı bir c kökü var!',
        warning:
          'Bu üç teorem yalnız QAPALI [a, b] parçası üçün doğrudur! Açıq (0, 1) intervalında f(x) = 1/x kəsilməzdir, amma nə məhduddur, nə maksimumu var, nə də müntəzəm kəsilməzdir!',
      },
    ],
    workedExample: {
      prompt: 'f(x) = e^(1/(x−2)) funksiyasının x₀ = 2 nöqtəsində kəsilmə növünü təyin edin.',
      steps: [
        'Sol limiti hesablayaq: x → 2 − 0 olduqda x − 2 → −0, deməli 1/(x − 2) → −∞ və lim(x→2−0) e^(1/(x−2)) = e^(−∞) = 0.',
        'Sağ limiti hesablayaq: x → 2 + 0 olduqda x − 2 → +0, deməli 1/(x − 2) → +∞ və lim(x→2+0) e^(1/(x−2)) = e^(+∞) = +∞.',
        'Sağ limit sonsuz (+∞) olduğu üçün x₀ = 2 nöqtəsi II növ kəsilmə nöqtəsidir.',
      ],
      conclusion: 'x₀ = 2 nöqtəsi II növ (sonsuz) kəsilmə nöqtəsidir.',
    },
    proofTask: {
      prompt: 'İstənilən tək dərəcəli P(x) = x^(2n+1) + a_{2n}x^(2n) + ... + a₀ çoxhədlisinin ℝ-də ən azı bir həqiqi kökünün olduğunu Bolsano–Koşi teoremi ilə isbat edin.',
      hint: 'x → −∞ və x → +∞ olduqda P(x)-in işarəsini müəyyənləşdirin.',
      solution: [
        'lim(x→−∞) P(x) = −∞ olduğundan elə A < 0 var ki, P(A) < 0.',
        'lim(x→+∞) P(x) = +∞ olduğundan elə B > 0 var ki, P(B) > 0.',
        'P(x) çoxhədlisi [A, B] parçasında kəsilməzdir və P(A)·P(B) < 0 şərti ödənir. Bolsano–Koşi teoreminə görə ∃c ∈ (A, B) : P(c) = 0.',
      ],
    },
    commonMistake: 'Veyyerştrass və Kantor teoremləri yalnız QAPALI və MƏHDUD [a, b] parçası üçün doğrudur; açıq (a, b) intervalında kəsilməz funksiya qeyri-məhdud ola bilər (məsələn, (0, 1)-də f(x) = 1/x).',
    questions: [
      { id: 'ct1', prompt: 'f(x) = |x|/x funksiyasının x = 0 nöqtəsində kəsilmə növü hansıdır?', choices: ['Kəsilməzdir', 'I növ aradan qaldırıla bilən', 'I növ sonlu sıçrayışlı (sıçrayış = 2)', 'II növ kəsilmə'], correct: 2, explanation: 'Sol limit -1, sağ limit +1 olduğundan sonlu sıçrayışlı I növ kəsilmədir (sıçrayış = 1 - (-1) = 2).' },
      { id: 'ct2', prompt: 'f(x) = (x² − 9)/(x − 3) funksiyasının x = 3 nöqtəsində kəsilməsini aradan qaldırmaq üçün f(3) nəyə bərabər götürülməlidir?', choices: ['0', '3', '6', '9'], correct: 2, explanation: 'lim(x→3) (x+3) = 6 olduğundan f(3) = 6 təyin edildikdə funksiya kəsilməz olur.' },
      { id: 'ct3', prompt: 'f(x) = cos(1/x) funksiyasının x = 0 nöqtəsi hansı növ kəsilmə nöqtəsidir?', choices: ['I növ sıçrayışlı', 'I növ aradan qaldırıla bilən', 'II növ kəsilmə', 'Kəsilməz nöqtədir'], correct: 2, explanation: 'x → 0 olduqda nə sol, nə də sağ limit mövcud deyil, ona görə II növ kəsilmədir.' },
      { id: 'ct4', prompt: 'Kantor teoreminə görə hansı funksiya göstərilən çoxluqda müntəzəm kəsilməzdir?', choices: ['1/x funksiyası (0, 1)-də', 'sin(1/x) funksiyası (0, 1)-də', 'x² funksiyası (−∞, +∞)-da', 'ln(x) funksiyası [1, 10] parçasında'], correct: 3, explanation: '[1, 10] qapalı parçada kəsilməz olan ln(x) funksiyası Kantor teoreminə görə həmin parçada müntəzəm kəsilməzdir.' },
    ],
    aiContext: 'Mövzu: funksiyanın nöqtədə və parçada kəsilməzliyi, I və II növ kəsilmə nöqtələri, Bolsano-Koşi, Veyyerştrass və Kantor teoremləri.',
  },
  {
    id: 'derivatives-differentials',
    title: 'Törəmə və Diferensial, Birinci Diferensialın İnvariantlığı və Leybnis Düsturu',
    subtitle: '0-dan izah: törəmənin mənası, loqarifmik/parametrik/qeyri-aşkar törəmə və Leybnis düsturu',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M6_M15,
    goals: [
      'Törəmənin və diferensialın (dy = f′(x)dx) həndəsi və fiziki mənasını 0-dan anlamaq',
      'Mürəkkəb, parametrik, qeyri-aşkar və u(x)^v(x) tipli funksiyaların törəməsini tapmaq',
      'Hasil üçün n-ci tərtib Leybnis düsturunu tətbiq etmək',
    ],
    rules: [
      {
        title: '1. Törəmə, Diferensial və Kəsilməzliklə Əlaqə',
        intuition:
          'Törəmə f′(x₀) funksiyanın dəyişmə sürətidir (həndəsi olaraq əyriyə çəkilən toxunanın meyl əmsalı k = tg α). Diferensial dy = f′(x₀)dx isə əyrini toxunan düz xətlə əvəz etdikdə alınan sadə xətti artımdır. Əgər qrafikdə "iti bucaq" varsa (məsələn, y = |x|-də x=0 nöqtəsi), orada qrafik kəsilməz olsa da, vahid bir toxunan çəkmək mümkün olmadığı üçün TÖRƏMƏ YOXDUR!',
        explanation:
          'Arqumentin Δx → 0 artımında funksiyanın Δy artımının Δx-ə nisbətinin sonlu limiti funksiyanın törəməsi adlanır. Diferensiallanan hər bir funksiya kəsilməzdir, lakin tərsi doğru deyil.',
        formula:
          'Törəmə:      f′(x₀) = lim(Δx→0) [ f(x₀ + Δx) − f(x₀) ] / Δx\nDiferensial: dy = f′(x) · dx;     Təqribi hesablama: f(x₀ + Δx) ≈ f(x₀) + f′(x₀) · Δx\nToxunan tənliyi:  y − f(x₀) = f′(x₀) · (x − x₀)',
        symbols: [
          'f′(x₀) = dy/dx — funksiyanın x₀ nöqtəsində birinci tərtib törəməsi',
          'dy — funksiyanın diferensialı (artımın baş xətti hissəsi)',
          'dx = Δx — müstəqil dəyişənin diferensialı',
        ],
        steps: [
          'Təqribi hesablama məsələsində verilən ədədi x₀ + Δx kimi ayır (x₀ rahat hesablanan ədəd, Δx kiçik fərq).',
          'f(x₀) və f′(x₀)-ı hesablayıb f(x₀) + f′(x₀)·Δx düsturunda yerinə yaz.',
        ],
        example:
          '√(4.08) ədədini diferensialla təqribi hesablayaq:\nf(x) = √x,  x₀ = 4,  Δx = 0.08.\nf(4) = 2,  f′(x) = 1/(2√x) ⇒ f′(4) = 1/4 = 0.25.\n√(4.08) ≈ 2 + 0.25 · 0.08 = 2.02.',
        warning:
          '"Funksiya kəsilməzdirsə, törəməsi var" fikri YALNIŞDIR! Əks nümunə: f(x) = |x| funksiyası x=0-da kəsilməzdir, amma sol törəməsi −1, sağ törəməsi +1 olduğu üçün törəməsi yoxdur.',
      },
      {
        title: '2. Parametrik, Qeyri-Aşkar və Loqarifmik Törəmə (u(x)^v(x))',
        intuition:
          'Bəzən x və y həm əsasda, həm də qüvvət üstündə olur (məsələn, y = x^x) və ya x(t), y(t) kimi üçüncü t parametri ilə verilir. Bu zaman xüsusi çevirmə qaydalarından istifadə edirik.',
        explanation:
          '1) Üstlü-qüvvət funksiyası y = u(x)^v(x): hər iki tərəfi ln-ləyib törəmə alırıq.\n2) Parametrik funksiya x = x(t), y = y(t): y-in t-yə görə törəməsini x-in t-yə görə törəməsinə bölürük.\n3) Qeyri-aşkar F(x, y) = 0 funksiyası: x-ə görə xüsusi törəməni y-ə görə xüsusi törəməyə bölüb qarşısına mənfi qoyuruq.',
        formula:
          'Loqarifmik:  y = u^v  ⇒  y′ = u^v · [ v′ · ln u + v · (u′ / u) ]\nParametrik:  y′_x = y′_t / x′_t;     y″_{xx} = (y′_x)′_t / x′_t\nQeyri-aşkar: F(x, y) = 0  ⇒  y′_x = − F′_x / F′_y',
        symbols: [
          'y′_t və x′_t — y və x funksiyalarının t parametrinə görə adi törəmələri',
          'F′_x — y-i sabit ədəd kimi saxlayıb F-dən yalnız x-ə görə alınan törəmə',
          'F′_y — x-i sabit ədəd kimi saxlayıb F-dən yalnız y-ə görə alınan törəmə',
        ],
        steps: [
          'y = u(x)^v(x) gördükdə ln y = v(x) · ln u(x) yaz, hər tərəfdən törəmə al: y′/y = (v · ln u)′, sonra y-ə vur.',
          'Parametrik ikinci törəmə y″_{xx} taparkən birincinin törəməsini t-yə görə alıb YENİDƏN x′_t-yə bölməyi unutma!',
        ],
        example:
          'y = x^(sin x) funksiyasının törəməsini tapaq:\n1) ln y = sin(x) · ln(x).\n2) y′ / y = cos(x) · ln(x) + sin(x) / x.\n3) y′ = x^(sin x) · [ cos(x) ln(x) + sin(x)/x ].',
        warning:
          'Parametrik funksiyada y″_{xx} = y″_{tt} / x″_{tt} YAZMAQ ƏN KOBUD SƏHVDİR! Doğru düstur: y″_{xx} = (y′_x)′_t / x′_t.',
      },
      {
        title: '3. Yüksək Tərtibli Törəmələr və Hasil Üçün Leybnis Düsturu',
        intuition:
          'İki funksiyanın hasilinin (məsələn, x² · e^(3x)) 20-ci törəməsini 20 dəfə ard-arda törəmə almaqla tapmaq saatlarla vaxt aparar. Leybnis düsturu bunu Nyuton binomu kimi bir sətirdə açır — çoxhədlinin törəməsi 3-cü addımdan sonra 0 olduğu üçün cəmdə cəmi 3 hədd qalır!',
        explanation:
          'u(x) və v(x) funksiyalarının hasilinin n-ci tərtib törəməsi Leybnis düsturu ilə hesablanır.',
        formula:
          '(u · v)^(n) = Σ(k=0..n) C(n, k) · u^(n−k) · v^(k)\nburada  C(n, k) = n! / (k! · (n − k)!)\n(e^(ax))^(n) = aⁿ e^(ax);   (sin x)^(n) = sin(x + nπ/2);   (cos x)^(n) = cos(x + nπ/2)',
        symbols: [
          'u^(n−k) — u funksiyasının (n−k)-cı tərtib törəməsi (u^(0) = u özüdür)',
          'v^(k) — v funksiyasının k-cı tərtib törəməsi (çoxhədlini həmişə v seçirik!)',
          'C(n, 0) = 1,  C(n, 1) = n,  C(n, 2) = n(n − 1) / 2',
        ],
        steps: [
          'Çoxhədlini (məsələn, x²) həmişə v(x) seç ki, k = 3-dən başlayaraq v^(k) = 0 olsun.',
          'Digər funksiyanı (e^(ax), sin x, cos x) u(x) seç və onun n, n−1, n−2 tərtibli törəmələrini yaz.',
          'k = 0, 1, 2 hədlərini topla.',
        ],
        example:
          'y = x² · e^x funksiyasının 10-cu törəməsi:\nu = e^x (bütün törəmələri e^x-dir),  v = x² (v′ = 2x, v″ = 2, v‴ = 0).\ny^(10) = 1 · e^x · x² + 10 · e^x · (2x) + 45 · e^x · 2 = e^x · (x² + 20x + 90).',
        warning:
          'Leybnis düsturunda k = 0 həddində v-nin törəməsi deyil, v funksiyasının ÖZÜ (v^(0) = v) yazılır!',
      },
    ],
    workedExample: {
      prompt: 'Leybnis düsturundan istifadə edərək y = x² · e^(3x) funksiyasının 20-ci tərtib törəməsini — y^(20)(x)-i tapın.',
      steps: [
        'u = e^(3x) və v = x² seçək, çünki v = x² funksiyasının 3-cü və daha yüksək törəmələri sıfıra bərabərdir (v′ = 2x, v″ = 2, v‴ = 0).',
        'Leybnis cəmində yalnız k = 0, 1, 2 hədləri qalır: y^(20) = C(20,0) u^(20) v + C(20,1) u^(19) v′ + C(20,2) u^(18) v″.',
        'u^(m) = 3^m e^(3x) və C(20,1) = 20, C(20,2) = 190 olduğundan: y^(20) = 3²⁰ e^(3x) x² + 20 · 3¹⁹ e^(3x) (2x) + 190 · 3¹⁸ e^(3x) · 2.',
      ],
      conclusion: 'y^(20)(x) = 3¹⁸ · e^(3x) · (9x² + 120x + 380).',
    },
    proofTask: {
      prompt: 'x₀ nöqtəsində diferensiallanan hər bir f(x) funksiyasının həmin nöqtədə kəsilməz olduğunu isbat edin.',
      hint: 'Δy = f′(x₀)Δx + o(Δx) yazılışında Δx → 0 limitinə keçin.',
      solution: [
        'f funksiyası x₀-da diferensiallanan olduğundan Δy = f(x₀ + Δx) − f(x₀) = f′(x₀)·Δx + α(Δx)·Δx, burada lim(Δx→0) α(Δx) = 0.',
        'Δx → 0 olduqda lim Δy = f′(x₀)·0 + 0·0 = 0.',
        'lim(Δx→0) Δy = 0 şərti isə məhz f funksiyasının x₀ nöqtəsində kəsilməzliyinin tərifidir.',
      ],
    },
    commonMistake: '(u^v)′ törəməsini taparkən yalnız qüvvət (v·u^(v−1)·u′) və ya yalnız üstlü (u^v·ln u·v′) qaydasını yazmaq yanlışdır — hər iki həddin CƏMİ götürülməlidir!',
    questions: [
      { id: 'dd1', prompt: 'f(x) = |x − 2| funksiyası x = 2 nöqtəsində hansı xassəyə malikdir?', choices: ['Həm kəsilməzdir, həm də diferensiallanandır', 'Kəsilməzdir, lakin törəməsi yoxdur (bucaq nöqtəsidir)', 'Kəsiləndir', 'Törəməsi 0-a bərabərdir'], correct: 1, explanation: 'Sol törəmə -1, sağ törəmə +1 olduğu üçün x=2-də törəmə yoxdur, lakin funksiya kəsilməzdir.' },
      { id: 'dd2', prompt: 'y = sin(x) funksiyasının 100-cü tərtib törəməsi y^(100)(x) nəyə bərabərdir?', choices: ['sin(x)', '−sin(x)', 'cos(x)', '−cos(x)'], correct: 0, explanation: '(sin x)^(100) = sin(x + 100·π/2) = sin(x + 50π) = sin(x).' },
      { id: 'dd3', prompt: 'x(t) = t², y(t) = t³ parametrik funksiyası üçün t = 2 nöqtəsində y′_x törəməsini tapın:', choices: ['3/2', '3', '6', '12'], correct: 1, explanation: 'y′_x = y′_t / x′_t = 3t² / (2t) = (3/2)t. t = 2 olduqda 3.' },
      { id: 'dd4', prompt: 'y = x² · e^x funksiyasının n-ci tərtib törəməsində (Leybnis düsturu) e^x vuruğunun qarşısındakı çoxhədli nədir?', choices: ['x² + 2nx + n(n−1)', 'x² + nx', '2x + n', 'x²'], correct: 0, explanation: 'C(n,0)x² + C(n,1)(2x) + C(n,2)(2) = x² + 2nx + n(n−1).' },
    ],
    aiContext: 'Mövzu: törəmə və diferensial, diferensiallanma meyarı, tərs və parametrik funksiyanın törəməsi, loqarifmik törəmə, yüksək tərtibli törəmələr və Leybnis düsturu.',
  },
  {
    id: 'mean-value-taylor',
    title: 'Diferensial hesabının əsas teoremləri (Ferma, Roll, Laqranj, Koşi), Lopital və Teylor düsturu',
    subtitle: '0-dan izah: Orta qiymət teoremləri, Bernulli–Lopital qaydası və Makloren açılışları',
    duration: '28 dəq',
    pdfUrl: MATH_PDF_M6_M15,
    goals: [
      'Ferma, Roll və Laqranj teoremlərinin fiziki və həndəsi mənasını 0-dan anlamaq',
      'Bernulli–Lopital qaydası ilə 0/0 və ∞/∞ limitlərini açmaq',
      '5 əsas funksiyanın Makloren (Teylor) açılışını yazmaq və çətin limitlərdə tətbiq etmək',
    ],
    rules: [
      {
        title: '1. Ferma, Roll və Laqranj (Sonlu Artımlar) Teoremləri',
        intuition:
          'Avtomobillə Bakıdan Gəncəyə gedirsən və yol boyu orta sürətin 90 km/saat olub. Laqranj teoremi deyir ki, yolun hansısa c anında spidometrin əqrəbi DƏQİQ 90 km/saatı göstərib! Roll teoremi isə xüsusi haldır: əgər eyni yüksəklikdən çıxıb yenə həmin yüksəkliyə qayıtmısansa (f(a) = f(b)), yolda ən azı bir zirvə və ya çökəklikdə üfüqi toxunan (f′(c) = 0) olub.',
        explanation:
          '1) Ferma: Daxili ekstremum nöqtəsində törəmə varsa, f′(x₀) = 0.\n2) Roll: f ∈ C[a,b], f ∈ D(a,b) və f(a) = f(b) ⇒ ∃c ∈ (a,b) : f′(c) = 0.\n3) Laqranj: f ∈ C[a,b], f ∈ D(a,b) ⇒ ∃c ∈ (a,b) : f(b) − f(a) = f′(c)(b − a).',
        formula:
          'Roll teoremi:    f(a) = f(b)   ⇒   ∃c ∈ (a, b) :  f′(c) = 0\nLaqranj teoremi: [ f(b) − f(a) ] / (b − a) = f′(c),   c ∈ (a, b)\nKoşi teoremi:    [ f(b) − f(a) ] / [ g(b) − g(a) ] = f′(c) / g′(c)',
        symbols: [
          '[f(b) − f(a)] / (b − a) — parçada orta dəyişmə sürəti (vətərin bucaq əmsalı)',
          'f′(c) — c daxili nöqtəsində ani dəyişmə sürəti (toxunanın bucaq əmsalı)',
        ],
        steps: [
          'Laqranj nöqtəsini (c) tapmaq üçün əvvəlcə [f(b) − f(a)] / (b − a) ədədini hesabla.',
          'f′(c) törəməsini həmin ədədə bərabər götür və tənlikdən c ∈ (a, b) nöqtəsini tap.',
        ],
        example:
          'f(x) = x² funksiyası üçün [1, 3] parçasında Laqranj nöqtəsini tapaq:\n[f(3) − f(1)] / (3 − 1) = (9 − 1)/2 = 4.\nf′(c) = 2c = 4  ⇒  c = 2 ∈ (1, 3).',
        warning:
          'Roll və Laqranj teoremlərinin ödənməsi üçün funksiya (a, b) intervalının BÜTÜN nöqtələrində diferensiallanan olmalıdır (bucaq nöqtəsi varsa teorem pozula bilər)!',
      },
      {
        title: '2. Bernulli–Lopital Qaydası (0/0 və ∞/∞ Qeyri-müəyyənliklərinin Açılışı)',
        intuition:
          'Kəsrin həm surəti, həm də məxrəci sıfıra (0/0) və ya sonsuzluğa (∞/∞) gedəndə hansının daha sürətli getdiyini bilmək üçün surətin və məxrəcin AYRI-AYRILIQDA törəməsini alırıq!',
        explanation:
          'x → a (və ya x → ∞) olduqda f(x)/g(x) nisbəti 0/0 və ya ∞/∞ qeyri-müəyyənliyi verirsə və törəmələrin nisbətinin limiti varsa, onda lim [f(x)/g(x)] = lim [f′(x)/g′(x)].',
        formula:
          'lim(x→a) [ f(x) / g(x) ] = [ 0/0  və ya  ∞/∞ ] = lim(x→a) [ f′(x) / g′(x) ]\n0 · ∞ gətirilməsi:   f(x) · g(x) = f(x) / [ 1 / g(x) ]',
        symbols: [
          'f′(x) / g′(x) — surətin törəməsinin məxrəcin törəməsinə nisbəti (nisbətin törəməsi DEYİL!)',
        ],
        steps: [
          'İfadənin 0/0 və ya ∞/∞ olduğunu yoxla.',
          'Surətin ayrıca törəməsini surətə, məxrəcin ayrıca törəməsini məxrəcə yaz.',
          'Yenə 0/0 qalırsa, Lopital qaydasını ikinci dəfə tətbiq et.',
        ],
        example:
          'lim(x→0) (e^(2x) − 1 − 2x) / x² = [0/0]\n1-ci Lopital: lim(x→0) (2e^(2x) − 2) / (2x) = [0/0]\n2-ci Lopital: lim(x→0) (4e^(2x)) / 2 = 4/2 = 2.',
        warning:
          'Lopital qaydasında (f/g)′ = (f′g − fg′)/g² DÜSTURUNU İŞLƏTMƏ! Surətdən ayrıca, məxrəcdən ayrıca törəmə alınır: f′(x) / g′(x).',
      },
      {
        title: '3. Teylor və Makloren (x₀ = 0) Düsturları',
        intuition:
          'İstənilən mürəkkəb funksiyanı (e^x, sin x, cos x, ln(1+x)) x = 0 nöqtəsi ətrafında adi dərəcəli çoxhədli (1 + x + x²/2 + ...) kimi yaza bilərik! Xüsusən cəm və fərqdə baş hədlər islah olunanda Makloren açılışı ən güclü silahdır.',
        explanation:
          'n dəfə diferensiallanan f(x) funksiyasının x₀ = 0 ətrafında Peano qalıqlı Teylor (Makloren) ayrılışı:',
        formula:
          'e^x       = 1 + x + x²/2! + x³/3! + ... + xⁿ/n! + o(xⁿ)\nsin x     = x − x³/3! + x⁵/5! − ...   (tək dərəcələr, növbəli işarə)\ncos x     = 1 − x²/2! + x⁴/4! − ...   (cüt dərəcələr, növbəli işarə)\nln(1 + x) = x − x²/2 + x³/3 − x⁴/4 + ... (faktorial YOXDUR!)\n(1 + x)^α = 1 + αx + [α(α − 1)/2!]x² + ...',
        symbols: [
          'n! = 1 · 2 · 3 · ... · n (məsələn: 2! = 2, 3! = 6, 4! = 24, 5! = 120)',
          'o(xⁿ) — Peano qalıq həddi (xⁿ-dən yüksək dərəcəli kiçik hədlər)',
        ],
        steps: [
          'Məxrəcdə xⁿ varsa, surətdəki funksiyaları o(xⁿ) dəqiqliyinə qədər Makloren düsturu ilə aç.',
          'İslah olunan hədləri sil, qalan baş həddi xⁿ-ə böl.',
        ],
        example:
          'lim(x→0) (sin x − x + x³/6) / x⁵:\nsin x = x − x³/6 + x⁵/120 + o(x⁵) yazsaq:\nSurət = (x − x³/6 + x⁵/120) − x + x³/6 = x⁵/120 + o(x⁵).\nCavab: 1/120.',
        warning:
          'e^x, sin x, cos x açılışlarında məxrəcdə FAKTORİAL (n!) var, amma ln(1+x) açılışında faktorial YOXDUR (sadəcə x − x²/2 + x³/3 − ...)!',
      },
    ],
    workedExample: {
      prompt: 'Makloren açılışından istifadə edərək lim(x→0) [cos(x) − e^(−x²/2)] / x⁴ limitini hesablayın.',
      steps: [
        'Məxrəc x⁴ olduğu üçün surətdəki funksiyaları o(x⁴) dəqiqliyi ilə Makloren düsturuna ayıraq.',
        'cos(x) = 1 − x²/2! + x⁴/4! + o(x⁴) = 1 − x²/2 + x⁴/24 + o(x⁴).',
        'e^(−x²/2) = 1 + (−x²/2) + (−x²/2)² / 2! + o(x⁴) = 1 − x²/2 + x⁴/8 + o(x⁴).',
        'Fərqi tapaq: cos(x) − e^(−x²/2) = (1/24 − 1/8)x⁴ + o(x⁴) = −(1/12)x⁴ + o(x⁴). x⁴-ə böldükdə limit −1/12 alınır.',
      ],
      conclusion: 'Cavab: −1/12.',
    },
    proofTask: {
      prompt: 'Laqranjın sonlu artımlar teoremindən istifadə edərək bütün a, b ∈ ℝ üçün |sin b − sin a| ≤ |b − a| bərabərsizliyini isbat edin.',
      hint: 'f(x) = sin x funksiyasına [a, b] parçasında Laqranj teoremini tətbiq edin.',
      solution: [
        'a = b olduqda bərabərlik aydındır. a < b olduqda f(x) = sin x funksiyası [a, b]-də kəsilməz və (a, b)-də diferensiallanandır.',
        'Laqranj teoreminə görə ∃c ∈ (a, b) : sin b − sin a = (sin c)′ · (b − a) = cos(c) · (b − a).',
        'Hər tərəfdən modul aldıqda |cos c| ≤ 1 olduğundan |sin b − sin a| = |cos c| · |b − a| ≤ |b − a|.',
      ],
    },
    commonMistake: 'Lopital qaydasını tətbiq etməzdən əvvəl ifadənin həqiqətən 0/0 və ya ∞/∞ qeyri-müəyyənliyi olduğunu yoxlamaq MƏCBURİDİR; həmçinin lim(x→∞) (x + sin x)/x = 1 limitində törəmələrin nisbəti (1 + cos x)/1 rəqs etdiyindən Lopital qaydası tətbiq edilə bilməz!',
    questions: [
      { id: 'mv1', prompt: '[a, b] parçasında kəsilməz, (a, b)-də diferensiallanan funksiya üçün f(b) − f(a) = f′(c)(b − a) bərabərliyi hansı teoremdir?', choices: ['Roll teoremi', 'Laqranj (sonlu artımlar) teoremi', 'Koşi teoremi', 'Veyyerştrass teoremi'], correct: 1, explanation: 'Bu, Laqranjın sonlu artımlar teoremidir (f(a)=f(b) xüsusi halı isə Roll teoremidir).' },
      { id: 'mv2', prompt: 'sin(x) funksiyasının x = 0 ətrafında 3-cü tərtib Makloren çoxhədlisi hansıdır?', choices: ['1 − x²/2', 'x − x³/6', 'x + x³/6', 'x − x²/2 + x³/3'], correct: 1, explanation: 'sin x = x − x³/3! + o(x³) = x − x³/6 + o(x³).' },
      { id: 'mv3', prompt: 'lim(x→0) (e^x − 1 − x) / x² limitini tapın:', choices: ['0', '1/2', '1', '2'], correct: 1, explanation: 'e^x = 1 + x + x²/2 + o(x²) olduğundan surət x²/2 + o(x²) olur və limit 1/2-dir.' },
      { id: 'mv4', prompt: 'lim(x→+0) x^x limiti nəyə bərabərdir?', choices: ['0', '1', 'e', '∞'], correct: 1, explanation: 'x^x = e^(x ln x). lim(x→+0) (x ln x) = 0 olduğundan e⁰ = 1.' },
    ],
    aiContext: 'Mövzu: Ferma, Roll, Laqranj və Koşi teoremləri, Bernulli-Lopital qaydası, Peano və Laqranj qalıqlı Teylor-Makloren düsturu.',
  },
];

export const getMathLesson = (id: string) => MATH_LESSONS.find((lesson) => lesson.id === id);
