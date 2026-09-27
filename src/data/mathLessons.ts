export interface MathRule {
  title: string;
  explanation: string;
  formula?: string;
  example?: string;
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
const MATH_PDF_M6_M15 = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/math/riyazi-analiz-m6-m15-toreme-inteqral.pdf';

export const MATH_LESSONS: MathLesson[] = [
  {
    id: 'sets-and-logic',
    title: 'Çoxluqlar nəzəriyyəsi, İnikaslar və Riyazi məntiqin dili',
    subtitle: 'Biyektiv inikaslar, De Morqan qanunları, Dekart hasil və predikat kvantorları',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['∈ ilə ⊆ işarəsini və P(A) qüvvət çoxluğunu fərqləndirmək', 'İnyektiv, süryektiv və biyektiv inikasları müəyyən etmək', '∀ və ∃ kvantorlu mülahizələrin inkarını qurmaq'],
    rules: [
      {
        title: 'Çoxluq, altçoxluq və Qüvvət çoxluğu (Bulean)',
        explanation: 'x ∈ A element mənsubiyyətini, A ⊆ B isə A-nın hər bir elementinin B-yə daxil olduğunu bildirir. A = B ⇔ A ⊆ B ∧ B ⊆ A. A çoxluğunun bütün altçoxluqları ailəsinə onun qüvvət çoxluğu (buleanı) P(A) və ya 2^A deyilir.',
        formula: 'A ⊆ B ⇔ ∀x (x ∈ A ⇒ x ∈ B);   |P(A)| = 2^|A|',
        example: 'A = {1, 2} üçün 1 ∈ A, {1} ⊆ A, {1} ∈ P(A), amma {1} ∈ A deyil.',
      },
      {
        title: 'Çoxluqlar cəbri, Simmetrik fərq və De Morqan dualizm qanunları',
        explanation: 'Birləşmə (A ∪ B), kəsişmə (A ∩ B), fərq (A \\ B) və simmetrik fərq A Δ B = (A \\ B) ∪ (B \\ A). Universal U çoxluğuna nəzərən tamamlayıcı götürüldükdə birləşmə və kəsişmə dual olaraq yer dəyişir.',
        formula: '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ;   (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ;   A Δ B = (A ∪ B) \\ (A ∩ B)',
        example: 'U={1,2,3,4}, A={1,2}, B={2,3}: A∪B={1,2,3}, A∩B={2}, AΔB={1,3}, Aᶜ={3,4}.',
      },
      {
        title: 'İnikasların təsnifatı: İnyektivlik, Süryektivlik, Biyektivlik və Tərs Funksiya',
        explanation: 'f : X → Y inikası inyektivdir (1–1), əgər f(x₁) = f(x₂) ⇒ x₁ = x₂. Süryektivdir (örtdük), əgər ∀y ∈ Y, ∃x ∈ X : f(x) = y (Im f = Y). Həm inyektiv, həm də süryektiv olan inikas biyektiv adlanır. f⁻¹ : Y → X tərs inikasının varlığı üçün zəruri və kafi şərt f-in biyektiv olmasıdır.',
        formula: 'f biyektivdir ⇔ (∀x₁,x₂∈X: f(x₁)=f(x₂) ⇒ x₁=x₂) ∧ (∀y∈Y, ∃x∈X: f(x)=y)',
        example: 'f(x) = x³ funksiyası ℝ → ℝ-də biyektivdir; g(x) = x² isə ℝ → ℝ-də nə inyektivdir (g(-1)=g(1)), nə də süryektiv.',
      },
      {
        title: 'Ümumilik (∀) və Varlıq (∃) kvantorları, Mürəkkəb mülahizələrin inkarı',
        explanation: 'Kvantorlu mülahizəni inkar etdikdə ∀ kvantoru ∃ ilə, ∃ kvantoru ∀ ilə əvəz olunur, şərt isə öz inkarına keçir. İplikasiyanın inkarı: ¬(P ⇒ Q) ⇔ P ∧ ¬Q.',
        formula: '¬(∀x ∈ X, P(x)) ⇔ ∃x ∈ X : ¬P(x);   ¬(∃x ∈ X, P(x)) ⇔ ∀x ∈ X : ¬P(x)',
        example: '∀ε>0, ∃δ>0 : P(ε,δ) mülahizəsinin inkarı: ∃ε>0, ∀δ>0 : ¬P(ε,δ).',
      },
    ],
    workedExample: {
      prompt: 'U={1,2,3,4,5}, A={1,2,4}, B={2,3,4}. (A∪B)ᶜ və Aᶜ∩Bᶜ tapın.',
      steps: ['A∪B={1,2,3,4}.', 'U-da qalıb birləşmədə olmayan yeganə element 5-dir: (A∪B)ᶜ={5}.', 'Aᶜ={3,5}, Bᶜ={1,5}; onların kəsişməsi {5}-dir.'],
      conclusion: 'Hər iki tərəf {5}-dir; De Morqan qanunu bu nümunədə təsdiqləndi.',
    },
    proofTask: {
      prompt: 'Element üsulu ilə A∩(B∪C)=(A∩B)∪(A∩C) bərabərliyini isbat et.',
      hint: 'İxtiyari x götür və “x soldadır” fikrini ∧, ∨ ilə aç.',
      solution: ['x∈A∩(B∪C) ⇔ x∈A ∧ (x∈B ∨ x∈C).', 'Məntiqin paylama qanununa görə bu, (x∈A ∧ x∈B) ∨ (x∈A ∧ x∈C) ilə eynidir.', 'Bu isə x∈(A∩B)∪(A∩C) deməkdir. İxtiyari x üçün ekvivalentlik olduğundan çoxluqlar bərabərdir.'],
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
    aiContext: 'Mövzu: çoxluqlar, ∈/⊆, boş çoxluq, birləşmə, kəsişmə, fərq, tamamlayıcı, De Morqan, qüvvət çoxluğu, Dekart hasili, inyektiv/süryektiv/biyektiv inikaslar, ∀ və ∃ kvantorları, inkar. Universitet səviyyəsində tərif, əks nümunə və qısa isbatla izah et.',
  },
  {
    id: 'real-numbers',
    title: 'Həqiqi ədədlər meydanı (ℝ), Arximed prinsipi və ε-ətraflar',
    subtitle: 'ℚ və ℝ, mütləq qiymət (modul) bərabərsizlikləri, Arximed və Kantor aksiomları',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['ℚ-nün natamamlığını və ℝ-in tam nizamlanmış meydan olduğunu əsaslandırmaq', 'Üçbucaq bərabərsizliyi və deşilməmiş/deşilmiş ε-ətraflarla işləmək', 'Arximed prinsipini və Kantorun daxil olmuş parçalar teoremini tətbiq etmək'],
    rules: [
      {
        title: 'Rasional ədədlərin natamamlığı və Həqiqi ədədlər meydanı (ℝ)',
        explanation: 'ℚ = {p/q : p∈ℤ, q∈ℕ} hesabi sonsuz çoxluqdur və özündə "kəsiklər" saxlayır (məsələn, x² = 2 tənliyinin ℚ-də kökü yoxdur). ℝ isə kəsilməz (tam) nizamlanmış Arximed meydanıdır və kontinual gücə malikdir.',
        formula: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ;   ∀a, b ∈ ℝ (a < b) ⇒ ∃q ∈ ℚ, ∃α ∈ ℝ\\ℚ : a < q < b və a < α < b',
        example: 'İstənilən iki həqiqi ədəd arasında sonsuz sayda həm rasional, həm də irrasional ədəd yerləşir (ℚ və ℝ\\ℚ çoxluqları ℝ-də sıxdır).',
      },
      {
        title: 'Nöqtənin ε-ətrafı və Deşilmiş ε-ətrafı',
        explanation: 'x₀ nöqtəsinin ε-ətrafı mərkəzi x₀, radiusu ε > 0 olan U_ε(x₀) = (x₀ − ε, x₀ + ε) açıq intervalıdır. x₀ nöqtəsinin özünü atdıqda alınan U°_ε(x₀) = U_ε(x₀) \\ {x₀} çoxluğuna deşilmiş ε-ətraf deyilir (funksiya limitinin tərifində əsas anlayışdır).',
        formula: 'U_ε(x₀) = {x ∈ ℝ : |x − x₀| < ε};   U°_ε(x₀) = {x ∈ ℝ : 0 < |x − x₀| < ε}',
        example: 'U°_0.5(2) = (1.5, 2) ∪ (2, 2.5).',
      },
      {
        title: 'Mütləq qiymət (Modul) və İkitərəfli Üçbucaq Bərabərsizliyi',
        explanation: 'Limit və kəsilməzlik isbatlarında qiymətləndirmə aparmaq üçün modulun ikitərəfli üçbucaq bərabərsizliyi əsas alətdir.',
        formula: '||x| − |y|| ≤ |x ± y| ≤ |x| + |y|;   |x − a| < ε ⇔ a − ε < x < a + ε',
        example: '|x − 2| < 0.5 olduqda |x| = |(x − 2) + 2| ≤ |x − 2| + 2 < 2.5.',
      },
      {
        title: 'Arximed Prinsipi və Kantorun Daxil Olmuş Parçalar Teoremi',
        explanation: 'Arximed prinsipi: ∀x ∈ ℝ və ∀h > 0 üçün elə n ∈ ℕ var ki, n·h > x (xüsusi halda 1/n < ε). Kantor teoremi: Bir-birinə daxil olmuş [a₁, b₁] ⊃ [a₂, b₂] ⊃ ... ⊃ [a_n, b_n] ⊃ ... parçalar sisteminin kəsişməsi boş deyil; əgər lim(b_n − a_n) = 0 olarsa, kəsişmə yeganə c ∈ ℝ nöqtəsindən ibarətdir.',
        formula: '∀ε > 0, ∃n ∈ ℕ : 1/n < ε;   ∩(n=1..∞) [a_n, b_n] = {c}',
        example: 'I_n = [0, 1/n] yarımaçıq (0, 1/n] intervalları üçün ∩(0, 1/n] = ∅ (çünki uclar bağlı deyil!), lakin qapalı [0, 1/n] parçaları üçün ∩[0, 1/n] = {0}.',
      },
    ],
    workedExample: {
      prompt: 'A={x∈ℝ : |x−2|<0.5}. A-nı interval kimi yazın və iki yuxarı sərhəd göstərin.',
      steps: ['|x−2|<0.5 ⇔ −0.5<x−2<0.5.', 'Hər tərəfə 2 əlavə edirik: 1.5<x<2.5.', 'A=(1.5,2.5); 2.5 və 3 yuxarı sərhədlərdir.'],
      conclusion: '2.5 yuxarı sərhəddir, amma A-ya daxil deyil.',
    },
    proofTask: {
      prompt: 'ε>0 olduqda |x−a|<ε ⇔ a−ε<x<a+ε olduğunu göstər.',
      hint: '|t|<ε tərifini −ε<t<ε şəklində yaz.',
      solution: ['|x−a|<ε ⇔ −ε<x−a<ε.', 'Hər tərəfə a əlavə etdikdə a−ε<x<a+ε alınır.', 'Hər addım geri çevrilə bildiyinə görə bu, ekvivalentlikdir.'],
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
    subtitle: 'Dəqiq yuxarı/aşağı sərhədlər, maksimumdan fərq və analitik ε-meyarı',
    duration: '20 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['sup A ilə max A-nı fərqləndirmək', 'inf A üçün analoji arqument qurmaq', 'ε meyarı ilə supremumu əsaslandırmaq'],
    rules: [
      {
        title: 'Supremum: ən kiçik yuxarı sərhəd',
        explanation: 's=sup A olduqda s yuxarı sərhəddir və s-dən kiçik heç bir ədəd yuxarı sərhəd ola bilməz. A boş deyilsə və yuxarıdan sərhədlidirsə, ℝ-in tamlığı belə s-in mövcudluğunu təmin edir.',
        formula: 's=sup A ⇔ [∀a∈A, a≤s] ∧ [∀ε>0, ∃a∈A : s−ε<a]',
        example: 'A=(0,1) üçün sup A=1; 1∉A olduğuna görə max A yoxdur.',
      },
      {
        title: 'İnfimum: ən böyük aşağı sərhəd',
        explanation: 't=inf A olduqda t aşağı sərhəddir və t-dən böyük heç bir ədəd aşağı sərhəd ola bilməz. A boş deyilsə və aşağıdan sərhədlidirsə, infimum ℝ-də mövcuddur.',
        formula: 't=inf A ⇔ [∀a∈A, t≤a] ∧ [∀ε>0, ∃a∈A : a<t+ε]',
        example: 'A=(0,1) üçün inf A=0; 0∉A olduğuna görə min A yoxdur.',
      },
      {
        title: 'Maksimum və minimumla əlaqə',
        explanation: 'Maksimum A-nın özünə daxil olan ən böyük elementdir. Əgər max A varsa, o, sup A-ya bərabərdir; tərsi həmişə doğru deyil. Minimum üçün də analoji qayda işləyir.',
        formula: 'max A varsa: max A = sup A;   min A varsa: min A = inf A',
        example: 'A=[0,1) üçün inf A=min A=0, sup A=1, max A yoxdur.',
      },
      {
        title: 'Həqiqi ədədlərin tamlıq xassəsi',
        explanation: 'ℝ-də hər boş olmayan, yuxarıdan sərhədli altçoxluğun supremumu vardır. ℚ üçün bu xassə pozulur: {q∈ℚ : q²<2, q>0} çoxluğunun ℚ daxilində supremumu yoxdur; ℝ-də supremum √2-dir.',
        formula: 'A⊆ℝ, A≠∅, A yuxarıdan sərhədli ⇒ sup A∈ℝ',
      },
    ],
    workedExample: {
      prompt: 'A={1−1/n : n∈ℕ, n≥1}. sup A, inf A, max A və min A-nı tapın.',
      steps: ['n=1,2,3,... üçün elementlər 0, 1/2, 2/3, ... olur.', 'Hər element 1-dən kiçikdir; deməli 1 yuxarı sərhəddir.', 'Hər ε>0 üçün n>1/ε seçdikdə 1−1/n>1−ε. Buna görə 1 ən kiçik yuxarı sərhəddir.', '0 çoxluğa daxildir və hər elementdən kiçikdir.'],
      conclusion: 'sup A=1, max A yoxdur; inf A=min A=0.',
    },
    proofTask: {
      prompt: 'A=(0,1) üçün sup A=1 olduğunu tərif və ε meyarı ilə isbat et.',
      hint: 'Əvvəl 1-in yuxarı sərhəd olduğunu göstər; sonra istənilən ε>0 üçün 1−ε ilə 1 arasında A-dan bir element seç.',
      solution: ['Hər a∈(0,1) üçün a<1, deməli 1 yuxarı sərhəddir.', 'İxtiyari ε>0 götür. δ=min(ε,1)/2 və a=1−δ seç. Onda 0<a<1 və a>1−ε.', 'Beləliklə 1-dən kiçik heç bir ədəd yuxarı sərhəd ola bilməz; sup A=1.'],
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
    aiContext: 'Mövzu: yuxarı/aşağı sərhəd, supremum və infimum, max/min fərqi, ε-xarakterizasiya, ℝ-in tamlıq aksiomu, ℚ-də √2 nümunəsi.',
  },
  {
    id: 'sequences-limits',
    title: 'Ədədi ardıcıllıqlar, Koşi (ε–N) limiti, Veyyerştrass teoremi və e ədədi',
    subtitle: 'Yığılan ardıcıllıqlar, İki polis teoremi, Monotonluq, Bolsano–Veyyerştrass və Fundamental (Koşi) meyar',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['Ardıcıllıq limitini ε–N tərifi ilə isbat etmək', 'Sıxılmış ardıcıllıq və Veyyerştrass teoremlərini tətbiq etmək', 'Eyler ədədini (e) və Koşi fundamental ardıcıllıq meyarını əsaslandırmaq'],
    rules: [
      {
        title: 'Ardıcıllığın Koşi (ε–N) mənada limiti və Yığılan ardıcıllıqların xassələri',
        explanation: 'a ədədinə (x_n) ardıcıllığının limiti deyilir, əgər istənilən ε > 0 üçün elə N(ε) ∈ ℕ nömrəsi varsa ki, n > N(ε) şərtini ödəyən bütün hədlər üçün |x_n − a| < ε olsun. Yığılan hər bir ardıcıllığın limiti yeganədir və həmin ardıcıllıq məhduddur (∃M > 0 : ∀n, |x_n| ≤ M).',
        formula: 'lim(n→∞) x_n = a  ⇔  ∀ε > 0, ∃N(ε) ∈ ℕ : ∀n > N(ε) ⇒ |x_n − a| < ε',
        example: 'lim(n→∞) (2n + 1)/(n + 3) = 2, çünki |(2n+1)/(n+3) − 2| = 5/(n+3) < ε ⇔ n > 5/ε − 3.',
      },
      {
        title: 'Sıxılmış Ardıcıllıq (Polis / İki Milis) Teoremi və Sonsuz Kiçilənlər',
        explanation: 'Əgər müəyyən n₀ nömrəsindən başlayaraq x_n ≤ y_n ≤ z_n bərabərsizliyi ödənirsə və lim x_n = lim z_n = a olarsa, onda (y_n) ardıcıllığı da yığılır və lim y_n = a olur. Həmçinin sonsuz kiçilən (lim α_n = 0) ardıcıllığın məhdud ardıcıllığa hasili sonsuz kiçiləndir.',
        formula: '(∀n ≥ n₀ : x_n ≤ y_n ≤ z_n) ∧ (lim x_n = lim z_n = a)  ⇒  lim(n→∞) y_n = a',
        example: 'lim(n→∞) sin(n)/n = 0, çünki −1/n ≤ sin(n)/n ≤ 1/n və ±1/n → 0.',
      },
      {
        title: 'Monoton Ardıcıllıqlar haqqında Veyyerştrass Teoremi və Eyler Ədədi (e)',
        explanation: 'Azalmayan (x_n ≤ x_{n+1}) və yuxarıdan məhdud hər bir ardıcıllıq sonlu limitə yığılır və lim x_n = sup{x_n}. Artmayan və aşağıdan məhdud ardıcıllıq isə inf{x_n}-ə yığılır. Xüsusi halda x_n = (1 + 1/n)^n ardıcıllığı Nyuton binomuna görə ciddi artır və 2 ≤ x_n < 3 olduğundan e ədədinə yığılır.',
        formula: 'lim(n→∞) (1 + 1/n)^n = e ≈ 2.718281828...;   lim(n→∞) (1 + k/n)^(m·n) = e^(k·m)',
        example: 'lim(n→∞) ((n + 3)/(n − 1))^(2n) = lim (1 + 4/(n − 1))^(2n) = e^(4·2) = e⁸.',
      },
      {
        title: 'Bolsano–Veyyerştrass Lemması, Yuxarı/Aşağı Limit və Koşi Fundamental Meyarı',
        explanation: 'Bolsano–Veyyerştrass: Hər bir məhdud ardıcıllıqdan yığılan (x_{n_k}) alt-ardıcıllığı ayırmaq olar. Koşi meyarı: (x_n) ardıcıllığının ℝ-də yığılması üçün zəruri və kafi şərt onun fundamental (Koşi ardıcıllığı) olmasıdır.',
        formula: '(x_n) fundamentaldır ⇔ ∀ε > 0, ∃N(ε) ∈ ℕ : ∀n > N(ε), ∀p ∈ ℕ ⇒ |x_{n+p} − x_n| < ε',
        example: 'Harmonik x_n = 1 + 1/2 + ... + 1/n ardıcıllığı üçün x_{2n} − x_n = 1/(n+1) + ... + 1/(2n) ≥ n·(1/2n) = 1/2 ⇒ fundamental deyil (dağılır!).',
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
    subtitle: 'ε–δ və ardıcıllıq tərifləri, I və II görkəmli limitlər, ekvivalent sonsuz kiçilənlər cədvəli',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['Koşi (ε–δ) və Heyne təriflərinin ekvivalentliyini tətbiq etmək', 'I və II görkəmli limitlərdən çıxan 6 əsas nəticəni bilmək', 'Landau simvolları (o, O) və ekvivalent sonsuz kiçilənlərlə limit hesablamaq'],
    rules: [
      {
        title: 'Funksiyanın Nöqtədə Limitinin Koşi (ε–δ) və Heyne (Ardıcıllıq) Tərifləri',
        explanation: 'Koşi tərifi: ∀ε > 0 üçün elə δ(ε) > 0 var ki, 0 < |x − x₀| < δ şərtini ödəyən bütün x ∈ D(f) üçün |f(x) − A| < ε. Heyne tərifi: x₀-dan fərqli və x₀-a yığılan istənilən (x_n) ardıcıllığı üçün f(x_n) → A. Bu iki tərif tam ekvivalentdir (Heyne tərifi limitin olmadığını göstərmək üçün çox əlverişlidir).',
        formula: 'lim(x→x₀) f(x) = A  ⇔  lim(x→x₀−0) f(x) = lim(x→x₀+0) f(x) = A',
        example: 'f(x) = sin(1/x) funksiyasının x → 0-da limiti yoxdur: x_n = 1/(πn) → 0 üçün sin(πn) = 0, lakin x′_n = 1/(π/2 + 2πn) → 0 üçün sin(...) = 1.',
      },
      {
        title: 'Birinci və İkinci Görkəmli Limitlər və Onların Fundamental Nəticələri',
        explanation: 'Triqonometrik və üstlü-loqarifmik qeyri-müəyyənliklərin (0/0 və 1^∞) açılmasında baza teoremlərdir.',
        formula: 'I: lim(x→0) (sin x)/x = 1;   II: lim(x→0) (1 + x)^(1/x) = e\nNəticələr (x→0): ln(1+x)/x → 1;  (e^x − 1)/x → 1;  (a^x − 1)/x → ln a;  ((1+x)^α − 1)/x → α',
        example: 'lim(x→0) (e^(5x) − 1) / sin(2x) = lim (5x) / (2x) = 5/2 = 2.5.',
      },
      {
        title: 'Sonsuz Kiçilənlərin Müqayisəsi, Landau Simvolları (o, O) və Ekvivalentlik (~)',
        explanation: 'x → x₀ olduqda α(x) → 0 və β(x) → 0 olarsa: 1) lim(α/β) = 0 olduqda α(x) = o(β(x)) (α, β-ya nəzərən yüksək tərtibli sonsuz kiçiləndir); 2) lim(α/β) = 1 olduqda α(x) ~ β(x) (ekvivalent sonsuz kiçilənlərdir).',
        formula: 'α(x) ~ β(x)  ⇔  lim(α(x)/β(x)) = 1  ⇔  α(x) = β(x) + o(β(x))',
        example: 'x → 0 olduqda: sin u ~ u,  tg u ~ u,  arcsin u ~ u,  arctg u ~ u,  1 − cos u ~ u²/2,  ln(1+u) ~ u,  e^u − 1 ~ u,  (1+u)^α − 1 ~ αu.',
      },
      {
        title: 'Ekvivalent Sonsuz Kiçilənlərlə Əvəzetmə Teoremi və Cəmdə Tətbiq Sərhədi',
        explanation: 'Teorem: İki sonsuz kiçilənin nisbətinin (və ya hasilinin) limitini hesablayarkən onları ekvivalent sonsuz kiçilənlərlə əvəz etmək olar: α ~ α₁ və β ~ β₁ ⇒ lim(α/β) = lim(α₁/β₁). DİQQƏT: Cəm və fərq daxilində baş hədlər islah olunursa, sadə ekvivalentlik tətbiq etmək OLMAZ (o(x^n) qalıqlı Teylor açılışı yazılmalıdır)!',
        formula: 'Nümunə (cəmdə baş hədd islahı): sin x − tg x = (x − x³/6 + o(x³)) − (x + x³/3 + o(x³)) = −x³/2 + o(x³) ~ −x³/2',
        example: 'lim(x→0) (sin x − tg x) / x³ = −1/2 (sadəcə sin x ~ x və tg x ~ x yazsaydıq 0/x³ səhvi alınardı!).',
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
    subtitle: 'I və II növ kəsilmələr, Bolsano–Koşi, Veyyerştrass və Kantor (müntəzəm kəsilməzlik) teoremləri',
    duration: '22 dəq',
    pdfUrl: MATH_PDF_M1_M5,
    goals: ['Kəsilmə nöqtələrini I növ (aradan qaldırıla bilən, sıçrayış) və II növə ayırmaq', 'Bolsano–Koşi və Veyyerştrass teoremlərini tənlik köklərinə və ekstremuma tətbiq etmək', 'Adi kəsilməzliklə müntəzəm kəsilməzliyi (Kantor teoremi) fərqləndirmək'],
    rules: [
      {
        title: 'Nöqtədə Kəsilməzliyin 3 Ekvivalent Tərifi',
        explanation: 'x₀ ∈ D(f) nöqtəsində f funksiyası kəsilməzdir, əgər: 1) lim(x→x₀) f(x) = f(x₀); 2) Sol və sağ limitlər funksiyanın nöqtədəki qiymətinə bərabərdir: f(x₀−0) = f(x₀+0) = f(x₀); 3) Artım dilində: arqumentin sonsuz kiçik Δx → 0 artımına funksiyanın sonsuz kiçik Δy = f(x₀+Δx) − f(x₀) → 0 artımı uyğun gəlir.',
        formula: 'f ∈ C(x₀)  ⇔  f(x₀ − 0) = f(x₀ + 0) = f(x₀)  ⇔  lim(Δx→0) Δy = 0',
        example: 'Bütün elementar funksiyalar (çoxhədlilər, rasional, üstlü, loqarifmik, triqonometrik) öz təyin oblastlarında kəsilməzdir.',
      },
      {
        title: 'Kəsilmə Nöqtələrinin Təsnifatı (I növ və II növ)',
        explanation: 'Əgər x₀ nöqtəsində kəsilməzlik şərti pozularsa, x₀ kəsilmə nöqtəsidir:\n• I növ kəsilmə: sonlu f(x₀−0) və f(x₀+0) birtərəfli limitlərinin hər ikisi mövcuddur. Əgər f(x₀−0) = f(x₀+0) ≠ f(x₀) olarsa — aradan qaldırıla bilən kəsilmə; əgər f(x₀−0) ≠ f(x₀+0) olarsa — sonlu sıçrayışlı kəsilmə (sıçrayış: d = |f(x₀+0) − f(x₀−0)|).\n• II növ kəsilmə: birtərəfli limitlərdən heç olmasa biri yoxdur və ya sonsuzluğa (±∞) bərabərdir.',
        formula: 'Sıçrayış: Δ = f(x₀ + 0) − f(x₀ − 0)',
        example: 'f(x) = (sin x)/x üçün x=0 aradan qaldırıla bilən I növ; f(x) = sgn(x) üçün x=0 sıçrayışı 2 olan I növ; f(x) = e^(1/x) üçün x=0 II növ kəsilmə nöqtəsidir.',
      },
      {
        title: 'Bolsano–Koşi (Aralıq Qiymətlər) və Veyyerştrass (Məhdudluq və Ekstremum) Teoremləri',
        explanation: 'Əgər f(x) funksiyası qapalı və məhdud [a, b] parçasında kəsilməzdirsə (f ∈ C[a, b]):\n• Bolsano–Koşi I: f(a)·f(b) < 0 olarsa, ∃c ∈ (a, b) : f(c) = 0.\n• Bolsano–Koşi II: f funksiya f(a) ilə f(b) arasındakı bütün aralıq qiymətləri alır.\n• Veyyerştrass I və II: f funksiyası [a, b]-də məhduddur və özünün dəqiq aşağı (m = min f) və dəqiq yuxarı (M = max f) sərhədlərinə həmin parçanın nöqtələrində çatır.',
        formula: 'f ∈ C[a, b]  ⇒  f([a, b]) = [m, M],   burada m = min_{[a,b]} f(x),  M = max_{[a,b]} f(x)',
        example: 'x⁵ + x − 1 = 0 tənliyinin (0, 1) intervalında həqiqi kökü var, çünki f(0) = −1 < 0 və f(1) = 1 > 0.',
      },
      {
        title: 'Müntəzəm Kəsilməzlik və Kantor Teoremi',
        explanation: 'X çoxluğunda müntəzəm kəsilməzlikdə δ ədədi x nöqtəsindən asılı olmayıb yalnız ε-dan asılı seçilir: ∀ε>0, ∃δ(ε)>0 : ∀x′, x″ ∈ X, |x′ − x″| < δ ⇒ |f(x′) − f(x″)| < ε. Kantor teoremi: Qapalı [a, b] parçasında kəsilməz olan hər bir funksiya həmin parçada müntəzəm kəsilməzdir.',
        formula: 'f ∈ C[a, b]  ⇒  f funksiyası [a, b]-də müntəzəm kəsilməzdir',
        example: 'f(x) = 1/x funksiyası açıq (0, 1) intervalında kəsilməzdir, lakin müntəzəm kəsilməz DEYİL (0 ətrafında artım qeyri-məhdud böyüyür).',
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
    subtitle: 'Diferensiallanma meyarı, tərs/parametrik/loqarifmik törəmə və yüksək tərtibli törəmələr',
    duration: '25 dəq',
    pdfUrl: MATH_PDF_M6_M15,
    goals: ['Diferensiallanma ilə kəsilməzlik arasındakı əlaqəni əsaslandırmaq', 'Mürəkkəb, tərs, parametrik və üstlü-qüvvət funksiyalarının törəməsini tapmaq', 'Hasil üçün n-ci tərtib Leybnis düsturunu tətbiq etmək'],
    rules: [
      {
        title: 'Törəmə, Diferensiallanma və Birinci Tərtib Diferensialın İnvariantlığı',
        explanation: 'f funksiyası x₀ nöqtəsində diferensiallanandır ⇔ Δy = A·Δx + o(Δx) (Δx → 0). Burada A = f′(x₀) funksiyanın törəməsi, dy = f′(x₀)dx isə artımın baş xətti hissəsi — birinci tərtib diferensialıdır. Diferensiallanan hər bir funksiya kəsilməzdir, lakin tərsi doğru deyil (məsələn, y = |x| x=0-da kəsilməzdir, amma f′_-(0) = −1 ≠ f′_+(0) = +1).',
        formula: 'f′(x₀) = lim(Δx→0) [f(x₀+Δx) − f(x₀)]/Δx;   dy = f′(u)du  (1-ci diferensialın formasının invariantlığı)',
        example: 'Təقribi hesablama: f(x₀ + Δx) ≈ f(x₀) + f′(x₀)·Δx.',
      },
      {
        title: 'Tərs, Parametrik, Qeyri-Aşkar və Loqarifmik Törəmə Qaydaları',
        explanation: '1) Tərs funksiya: (f⁻¹)′(y₀) = 1 / f′(x₀).\n2) Parametrik funksiya (x = x(t), y = y(t)): y′_x = y′_t / x′_t və y″_{xx} = (y′_x)′_t / x′_t.\n3) Qeyri-aşkar funksiya F(x, y) = 0: y′_x = −F′_x / F′_y.\n4) Üstlü-qüvvət funksiyası y = u(x)^v(x) = e^(v ln u): loqarifmik törəmə ilə (ln y)′ = y′/y.',
        formula: '(u^v)′ = v · u^(v−1) · u′ + u^v · ln(u) · v′;   y″_{xx} = (x′_t y″_{tt} − y′_t x″_{tt}) / (x′_t)³',
        example: 'y = x^x (x > 0) ⇒ ln y = x ln x ⇒ y′/y = ln x + 1 ⇒ y′ = x^x (ln x + 1).',
      },
      {
        title: 'Yüksək Tərtibli Törəmələr və Hasil Üçün Leybnis Düsturu',
        explanation: 'İki n dəfə diferensiallanan u(x) və v(x) funksiyalarının hasilinin n-ci tərtib törəməsi Nyuton binomuna bənzər Leybnis düsturu ilə hesablanır. İkinci tərtib diferensial d²y = f″(x)dx² yalnız x müstəqil dəyişən olduqda invariantdır (u mürəkkəb funksiya olduqda d²y = f″(u)du² + f′(u)d²u).',
        formula: '(u · v)^(n) = Σ(k=0..n) C(n, k) · u^(n−k) · v^(k),   burada C(n, k) = n! / (k!(n−k)!)',
        example: '(e^(ax))^(n) = aⁿ e^(ax);   (sin x)^(n) = sin(x + nπ/2);   (cos x)^(n) = cos(x + nπ/2);   (ln(1+x))^(n) = (-1)^(n−1) (n−1)! / (1+x)ⁿ.',
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
    subtitle: 'Sonlu artımlar teoremi, qeyri-müəyyənliklərin açılışı, Peano və Laqranj qalıqlı Teylor–Makloren ayrılışı',
    duration: '28 dəq',
    pdfUrl: MATH_PDF_M6_M15,
    goals: ['Ferma, Roll, Laqranj və Koşi orta qiymət teoremlərini əlaqələndirmək', '7 növ qeyri-müəyyənliyi Bernulli–Lopital qaydası və Teylor düsturu ilə açmaq', 'Peano və Laqranj qalıq hədli Makloren açılışlarını yazmaq'],
    rules: [
      {
        title: 'Ferma Lemması, Roll, Laqranj (Sonlu Artımlar) və Koşi Teoremləri',
        explanation: '1) Ferma: (a, b) intervalının daxili ekstremum nöqtəsində törəmə varsa, f′(x₀) = 0.\n2) Roll: f ∈ C[a,b], f ∈ D(a,b) və f(a) = f(b) ⇒ ∃c ∈ (a,b) : f′(c) = 0.\n3) Laqranj: f ∈ C[a,b], f ∈ D(a,b) ⇒ ∃c ∈ (a,b) : f(b) − f(a) = f′(c)(b − a). Nəticə: ∀x ∈ (a,b) üçün f′(x) = 0 ⇔ f(x) = const.\n4) Koşi: [f(b) − f(a)] / [g(b) − g(a)] = f′(c) / g′(c).',
        formula: 'Laqranj: [f(b) − f(a)] / (b − a) = f′(c);   Koşi: [f(b) − f(a)] / [g(b) − g(a)] = f′(c) / g′(c)',
        example: 'Laqranj teoremi ilə bərabərsizlik isbatı: x > 0 üçün [0, x] parçasında ln(1+t) funksiyasına görə x/(1+x) < ln(1+x) < x.',
      },
      {
        title: 'Bernulli–Lopital Qaydası və Digər Qeyri-müəyyənliklərin (0·∞, ∞−∞, 1^∞, 0⁰, ∞⁰) Gətirilməsi',
        explanation: 'Koşi teoremindən çıxan Lopital qaydasına görə x → a (və ya x → ∞) olduqda f(x)/g(x) nisbəti 0/0 və ya ∞/∞ qeyri-müəyyənliyi verirsə və lim(f′(x)/g′(x)) mövcuddursa, onda lim(f(x)/g(x)) = lim(f′(x)/g′(x)). 0·∞ ifadəsi f/(1/g) şəklinə, u^v tipli üstlü qeyri-müəyyənliklər isə e^(v ln u) çevirməsi ilə 0/0 və ya ∞/∞ şəklinə gətirilir.',
        formula: 'lim(x→a) [f(x) / g(x)] = [0/0 və ya ∞/∞] = lim(x→a) [f′(x) / g′(x)]',
        example: 'x > 0 üçün lim(x→+0) x·ln(x) = lim(x→+0) ln(x) / (1/x) = [−∞/+∞] = lim (1/x) / (−1/x²) = lim(−x) = 0.',
      },
      {
        title: 'Peano və Laqranj Qalıq Hədli Teylor və Makloren (x₀ = 0) Düsturları',
        explanation: 'n dəfə diferensiallanan f(x) funksiyası x₀ ətrafında dərəcəsi ≤ n olan yeganə Teylor çoxhədlisi P_n(x) ilə approksimasiya olunur. Lokal asimptotikada Peano qalığı R_n(x) = o((x−x₀)ⁿ), qlobal xəta qiymətləndirməsində isə Laqranj qalığı R_n(x) = [f^(n+1)(c)/(n+1)!](x−x₀)^(n+1) istifadə edilir.',
        formula: 'e^x = 1 + x + x²/2! + x³/3! + ... + xⁿ/n! + o(xⁿ)\nsin x = x − x³/3! + x⁵/5! − ...;   cos x = 1 − x²/2! + x⁴/4! − ...\nln(1+x) = x − x²/2 + x³/3 − ...;   (1+x)^α = 1 + αx + α(α−1)x²/2! + ...',
        example: 'cos x − e^(−x²/2) = (1 − x²/2 + x⁴/24 + o(x⁴)) − (1 − x²/2 + x⁴/8 + o(x⁴)) = −x⁴/12 + o(x⁴).',
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
