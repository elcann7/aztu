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
  goals: string[];
  rules: MathRule[];
  workedExample: { prompt: string; steps: string[]; conclusion: string };
  proofTask: { prompt: string; hint: string; solution: string[] };
  commonMistake: string;
  questions: MathQuestion[];
  aiContext: string;
}

// These are original study notes based on the topics the student reported, not an official AzTU transcript.
export const MATH_LESSONS: MathLesson[] = [
  {
    id: 'sets-and-logic',
    title: 'Çoxluqlar və riyazi məntiqin dili',
    subtitle: 'Element, altçoxluq, əməliyyatlar və kvantorlar',
    duration: '15 dəq',
    goals: ['∈ ilə ⊆ işarəsini fərqləndirmək', 'Çoxluq əməliyyatlarını hesablamaq', '∀ və ∃ ilə verilən fikirləri oxumaq'],
    rules: [
      {
        title: 'Çoxluq, element və altçoxluq',
        explanation: 'x ∈ A o deməkdir ki, x çoxluğun elementidir. A ⊆ B isə A-nın hər elementinin B-yə daxil olduğunu bildirir. Boş çoxluq ∅ hər çoxluğun altçoxluğudur. Elementlə altçoxluğu eyniləşdirməyin.',
        formula: 'A ⊆ B ⇔ ∀x (x ∈ A ⇒ x ∈ B)',
        example: 'A = {1, 2} üçün 1 ∈ A, {1} ⊆ A, amma {1} ∈ A deyil.',
      },
      {
        title: 'Birləşmə, kəsişmə, fərq və tamamlayıcı',
        explanation: 'A ∪ B ən azı birində olan, A ∩ B hər ikisində olan elementlərdir. A ∖ B A-da olub B-də olmayanlardır. Universal U çoxluğu seçiləndə Aᶜ = U ∖ A tamamlayıcıdır.',
        formula: 'x ∈ A ∩ B ⇔ (x ∈ A) ∧ (x ∈ B)',
        example: 'U={1,2,3,4}, A={1,2}, B={2,3}: A∪B={1,2,3}, A∩B={2}, Aᶜ={3,4}.',
      },
      {
        title: 'De Morqan qanunları',
        explanation: 'Tamamlayıcı götürüləndə birləşmə kəsişməyə, kəsişmə birləşməyə çevrilir. Bu qayda yalnız əvvəlcə U müəyyən edildikdə mənalıdır.',
        formula: '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ;   (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',
      },
      {
        title: '∀, ∃, qüvvət çoxluğu və Dekart hasili',
        explanation: '“Tərs A” kimi görünən ∀ işarəsi “hər bir” deməkdir; Aᶜ ilə eyni deyil. ∃ “elə bir ... var” deməkdir. P(A) A-nın bütün altçoxluqlarıdır; A×B sıralı cütlərdən ibarətdir.',
        formula: 'A={a,b} ⇒ P(A)={∅,{a},{b},{a,b}};   |P(A)|=2^|A|',
        example: '∀x∈A, x>0 fikrini inkar etmək: ∃x∈A elə ki, x≤0.',
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
    aiContext: 'Mövzu: çoxluqlar, ∈/⊆, boş çoxluq, birləşmə, kəsişmə, fərq, tamamlayıcı, De Morqan, qüvvət çoxluğu, Dekart hasili, ∀ və ∃ kvantorları, inkar. Universitet səviyyəsində tərif, əks nümunə və qısa isbatla izah et.',
  },
  {
    id: 'real-numbers',
    title: 'Həqiqi ədədlər və interval anlayışı',
    subtitle: 'ℚ, ℝ, modul, sıralama və sərhədlilik',
    duration: '14 dəq',
    goals: ['ℚ və ℝ arasındakı fərqi izah etmək', 'İnterval işarələrini düzgün oxumaq', 'Yuxarı və aşağı sərhədi müəyyənləşdirmək'],
    rules: [
      {
        title: 'Rasional və həqiqi ədədlər',
        explanation: 'ℚ={p/q : p∈ℤ, q∈ℤ∖{0}} rasional ədədlərdir. ℝ həm rasional, həm də irrasional ədədləri ehtiva edən sıralı sahədir. √2 ∈ ℝ, lakin √2 ∉ ℚ. Analizdə vacib əlavə xassə tamlıqdır.',
        formula: 'ℕ ⊆ ℤ ⊆ ℚ ⊂ ℝ',
        example: 'x²=2 tənliyinin ℚ-də həlli yoxdur, ℝ-də isə ±√2 var.',
      },
      {
        title: 'İntervallar və qonşuluq',
        explanation: '(a,b) ucları daxil etmir, [a,b] hər ikisini daxil edir. (a,b] yalnız b-ni daxil edir. a nöqtəsinin ε-qonşuluğu müsbət ε üçün (a−ε,a+ε)-dir.',
        formula: 'x ∈ (a,b) ⇔ a < x < b;   x ∈ [a,b] ⇔ a ≤ x ≤ b',
        example: '1 ∉ (1,3), amma 1 ∈ [1,3).',
      },
      {
        title: 'Modul və məsafə',
        explanation: '|x| ədədin sıfırdan məsafəsidir; |x−a| isə x ilə a arasındakı məsafədir. |x−a|<ε bərabərsizliyi ε-qonşuluğunu təsvir edir.',
        formula: '|x−a| < ε ⇔ a−ε < x < a+ε;   |x+y| ≤ |x|+|y|',
        example: '|x−2|<0.5 ⇔ 1.5<x<2.5.',
      },
      {
        title: 'Yuxarı və aşağı sərhəd',
        explanation: 'M ədədi A⊆ℝ üçün yuxarı sərhəddirsə, A-nın hər elementi M-dən böyük deyil. m aşağı sərhəddirsə, A-nın hər elementi m-dən kiçik deyil. Sərhədin özü A-ya daxil olmaq məcburiyyətində deyil.',
        formula: 'M yuxarı sərhəd ⇔ ∀a∈A, a≤M;   m aşağı sərhəd ⇔ ∀a∈A, m≤a',
        example: 'A=(0,1) üçün 1 və 2 yuxarı sərhəddir; 0 və −1 aşağı sərhəddir.',
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
    aiContext: 'Mövzu: ℕ, ℤ, ℚ, ℝ; sıralı sahə, rasional/irrasional ədədlər, interval növləri, modul, ε-qonşuluğu, yuxarı/aşağı sərhəd və sərhədlilik. Ardıcıllıq limitləri və törəmə mövzusuna keçmə.',
  },
  {
    id: 'supremum-infimum',
    title: 'Supremum, infimum və tamlıq',
    subtitle: 'Dəqiq sərhəd, maksimumdan fərq və ε meyarı',
    duration: '18 dəq',
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
    aiContext: 'Mövzu: yuxarı/aşağı sərhəd, supremum və infimum, max/min fərqi, ε-xarakterizasiya, ℝ-in tamlıq aksiomu, ℚ-də √2 nümunəsi. Lazım gəlsə çoxluq və interval təriflərinə qayıt. Limit və törəməni ayrıca mövzu kimi öyrətmə.',
  },
];

export const getMathLesson = (id: string) => MATH_LESSONS.find((lesson) => lesson.id === id);
