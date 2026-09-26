import type { Material, Deadline } from '../services/db';

const PHYSICS_PDF_BASE = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/physics';

export const BUILT_IN_MATERIALS: Material[] = [
  // ==========================================================================
  // 1. FİZİKA (İf-20403y) — 4 Rəsmi Mühazirə PDF + 7 Rəsmi Laboratoriya PDF
  // ==========================================================================
  {
    id: 'builtin_phys_lec_1',
    title: 'Mühazirə 1: İrəliləmə və fırlanma hərəkətinin dinamikası (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Nyuton qanunları, impulsun saxlanması, qüvvə və ətalət momenti, mexaniki iş, güc və enerjinin saxlanması qanunu üzrə müəllim təqdimatı.',
    fileName: 'muhazire-01.pdf',
    fileSize: '7.0 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-01.pdf`,
    authorId: 'system_aztu',
    authorName: 'Dos. Sürəyya Məmmədova',
    createdAt: '2026-09-17T16:30:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lec_2',
    title: 'Mühazirə 2: Molekulyar fizika və termodinamikanın əsasları (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'MKN əsasları, Maksvell və Bolsman paylanmaları, barometrik düstur, sərbəstlik dərəcələri, Termodinamikanın I qanunu və adiabatik proses.',
    fileName: 'muhazire-02.pdf',
    fileSize: '2.2 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-02.pdf`,
    authorId: 'system_aztu',
    authorName: 'Dos. Sürəyya Məmmədova',
    createdAt: '2026-09-18T10:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lec_3',
    title: 'Mühazirə 3: Elektrostatika, dielektriklər və naqillər (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Kulon qanunu, elektrik sahəsinin intensivliyi, Qauss teoremi, potensial, dipol, dielektriklərin polyarlaşması və kondensatorların tutumu.',
    fileName: 'muhazire-03-elektrostatika.pdf',
    fileSize: '13.8 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-03-elektrostatika.pdf`,
    authorId: 'system_aztu',
    authorName: 'Dos. Sürəyya Məmmədova',
    createdAt: '2026-09-19T11:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lec_4',
    title: 'Mühazirə 4: Sabit cərəyan, maqnit sahəsi və elektromaqnit induksiyası (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Om və Coul–Lens qanunları, Kirxhof qaydaları, Bio–Savar–Laplas qanunu, Amper və Lorens qüvvələri, Faradey induksiyası və Maksvell tənlikləri.',
    fileName: 'muhazire-04.pdf',
    fileSize: '6.3 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/muhazire-04.pdf`,
    authorId: 'system_aztu',
    authorName: 'Dos. Sürəyya Məmmədova',
    createdAt: '2026-09-20T12:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_2',
    title: 'Laboratoriya №2: Diskin və həlqənin ətalət momentinin təyini (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Fırlanma sensoru ilə bucaq təcilinin ölçülməsi, şkiv, disk və həlqənin ətalət momentlərinin təcrübi və nəzəri hesablanması təlimatı.',
    fileName: 'laboratoriya-02.pdf',
    fileSize: '1.1 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-02.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T09:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_3',
    title: 'Laboratoriya №3: Qazların molyar istilik tutumları nisbətinin (Cp/Cv) təyini (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Hava üçün adiabatik prosesin araşdırılması, porşen rəqslərinin periodunun ölçülməsi və Puasson əmsalının (γ = Cp/Cv) təyini.',
    fileName: 'laboratoriya-03.pdf',
    fileSize: '261 KB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-03.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T09:30:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_4',
    title: 'Laboratoriya №4: Yerin maqnit sahəsinin toplananlarının təyini (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Maqnit induksiyasının üfüqi toplananının, tam qiymətinin və maqnit meyl bucağının sensor vasitəsilə təyini.',
    fileName: 'laboratoriya-04.pdf',
    fileSize: '279 KB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-04.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T10:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_5',
    title: 'Laboratoriya №5: Sönən elektromaqnit rəqslərinin öyrənilməsi (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Rəqs konturunda sönən rəqslərin ossilloqrafda müşahidəsi, loqarifmik dekrementin və konturun keyfiyyətliyinin hesablanması.',
    fileName: 'laboratoriya-05.pdf',
    fileSize: '1.5 MB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-05.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T10:30:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_6',
    title: 'Laboratoriya №6: Nyuton halqaları ilə işığın dalğa uzunluğunun təyini (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'İşığın interferensiyası, Nyuton halqalarının radiuslarının mikrometrik okulyarla ölçülməsi və dalğa uzunluğunun hesablanması.',
    fileName: 'laboratoriya-06.pdf',
    fileSize: '345 KB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-06.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T11:00:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_7',
    title: 'Laboratoriya №7: Atom spektrinin öyrənilməsi və Ridberq sabiti (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Hidrogenin Balmer spektr xətlərinin monoxromatorla ölçülməsi, dalğa uzunluqlarının və Ridberq sabitinin təyini.',
    fileName: 'laboratoriya-07.pdf',
    fileSize: '703 KB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/laboratoriya-07.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T11:30:00.000Z',
    isBuiltIn: true,
  },
  {
    id: 'builtin_phys_lab_extra',
    title: 'Əlavə Təlimat: Nixrom məftilin xüsusi müqavimətinin təyini (PDF)',
    courseId: 'phys',
    type: 'file',
    description:
      'Silindrik naqilin müqavimətinin uzunluqdan asılılığının (R = ρl/S) araşdırılması və xüsusi müqavimətin təyini üzrə əlavə təlimat.',
    fileName: 'elave-nixrom.pdf',
    fileSize: '69 KB',
    fileMime: 'application/pdf',
    linkUrl: `${PHYSICS_PDF_BASE}/elave-nixrom.pdf`,
    authorId: 'system_aztu',
    authorName: 'Fizika Kafedrası (Lab)',
    createdAt: '2026-09-21T12:00:00.000Z',
    isBuiltIn: true,
  },

  // ==========================================================================
  // 2. PROQRAMLAŞDIRMANIN ƏSASLARI-1 (İf-61125y · 8 Kredit · 75 Saat)
  // ==========================================================================
  {
    id: 'builtin_prog_lec_1_3',
    title: 'Mühazirə və Seminar Konspekti (Həftə 1–5): Alqoritmlər, Python Tipləri və Şərt Operatorları',
    courseId: 'prog',
    type: 'file',
    description:
      'Dos. Fizuli Əzimov və Müəl. Ayxan Həsənovun dərsləri üzrə I Kollokviuma düşən əsas mövzular: blok-sxemlər, dəyişənlər, riyazi operatorlar və if/elif/else budaqlanmaları.',
    fileName: 'proqramlasdirma_hefte_1_5_konspekt.py',
    fileSize: '48 KB',
    fileMime: 'text/x-python',
    authorId: 'system_aztu',
    authorName: 'Dos. Fizuli Əzimov / Müəl. Ayxan Həsənov',
    createdAt: '2026-09-24T14:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Alqoritmin xassələri və blok-sxem elementləri',
        body: 'Alqoritm qarşıya qoyulmuş məsələnin həlli üçün sonlu sayda ardıcıl addımlar toplusudur. Əsas xassələri: müəyyənlik (determinik), kütləvilik, nəticəlilik və diskretlik. Blok-sxemdə oval (başlanğıc/son), paraleloqram (giriş/çıxış), düzbucaqlı (hesablama/mənimsətmə) və romb (şərtin yoxlanması) fiqurlarından istifadə olunur.',
      },
      {
        heading: '2. Python-da əsas verilənlər tipləri və əməliyyatlar',
        body: 'Tam ədədlər (int), həqiqi ədədlər (float), sətirlər (str) və məntiqi tip (bool). Tam bölmə (//), qalıq tapma (%) və qüvvətə yüksəltmə (**) operatorları laboratoriya məsələlərində ən çox istifadə olunan əməliyyatlardır.',
        formulaOrCode: `# 3 rəqəmli ədədin rəqəmləri cəmi və hasilinin tapılması
n = int(input("3 rəqəmli ədəd daxil edin: "))
yuzluk = n // 100
onluq = (n // 10) % 10
teklik = n % 10
print("Rəqəmləri cəmi:", yuzluk + onluq + teklik)
print("Rəqəmləri hasili:", yuzluk * onluq * teklik)`,
      },
      {
        heading: '3. Budaqlanan alqoritmlər (if / elif / else)',
        body: 'Şərt operatorları mürəkkəb məntiqi ifadələri (and, or, not) yoxlayaraq proqramın icra istiqamətini dəyişir. Kvadrat tənliyin diskriminant vasitəsilə həlli və parçalar üzrə funksiya hesablanması 1-ci kollokviumun əsas suallarıdır.',
        formulaOrCode: `import math
a, b, c = 1, -5, 6
D = b**2 - 4*a*c
if D > 0:
    x1 = (-b - math.sqrt(D)) / (2*a)
    x2 = (-b + math.sqrt(D)) / (2*a)
    print(f"İki həqiqi kök: x1={x1:.2f}, x2={x2:.2f}")
elif D == 0:
    print(f"Tək kök: x={-b / (2*a):.2f}")
else:
    print("Həqiqi kök yoxdur")`,
      },
    ],
  },
  {
    id: 'builtin_prog_lab_pack',
    title: 'Laboratoriya Kod Paketi (Müəl. Şəbnəm İsgəndərli): Dövrlər (for/while), Siyahılar və Funksiyalar',
    courseId: 'prog',
    type: 'file',
    description:
      '6326A2 1-ci və 2-ci altqruplar üçün laboratoriya dərslərində tələb olunan hazır Python həll nümunələri: ədədi sıralar, sadə ədədlər, massiv (list) emalı və rekursiya.',
    fileName: 'cs101_laboratoriya_helleri.py',
    fileSize: '64 KB',
    fileMime: 'text/x-python',
    authorId: 'system_aztu',
    authorName: 'Müəl. Şəbnəm İsgəndərli',
    createdAt: '2026-09-25T10:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Dövr operatorları (for və while) ilə sıra cəmləri',
        body: 'Verilmiş N hədd üçün Taylor sırası və ya faktorial cəmlərinin hesablanması zamanı həddi hər dəfə yenidən hesablamaq əvəzinə əvvəlki həddən istifadə etmək həm sürəti artırır, həm də kodun təmizliyini qoruyur.',
        formulaOrCode: `# S = 1! + 2! + 3! + ... + n! cəminin tapılması
n = 6
cem = 0
fakt = 1
for i in range(1, n + 1):
    fakt *= i
    cem += fakt
print(f"1!-dən {n}!-a qədər cəm: {cem}")`,
      },
      {
        heading: '2. Birölçülü siyahılarda (list) minimum, maksimum və çeşidləmə',
        body: 'Laboratoriya işlərində hazır min()/max() funksiyaları ilə yanaşı alqoritmik axtarış (indekslərlə müqayisə) tələb olunur.',
        formulaOrCode: `arr = [14, -3, 27, 8, -11, 42, 5]
min_val = arr[0]
max_val = arr[0]
musbet_cem = 0

for x in arr:
    if x < min_val:
        min_val = x
    if x > max_val:
        max_val = x
    if x > 0:
        musbet_cem += x

print(f"Min: {min_val}, Max: {max_val}, Müsbətlərin cəmi: {musbet_cem}")`,
      },
    ],
  },

  // ==========================================================================
  // 3. RİYAZİ ANALİZ - 1 (İf-61115y · 7 Kredit · 75 Saat)
  // ==========================================================================
  {
    id: 'builtin_math_lec_1_4',
    title: 'Mühazirə Konspekti və Teoremlər: Çoxluqlar, Supremum/İnfimum, Ardıcıllıq və Görkəmli Limitlər',
    courseId: 'math',
    type: 'file',
    description:
      'Dos. Nizami Şıxəliyevin mühazirələri və Müəl. Şamil Talıblının seminarları üzrə əsas təriflər, Bolsano-Veyerştrass teoremi, I və II görkəmli limitlər və sonsuz kiçilənlərin ekvivalentliyi.',
    fileName: 'riyazi_analiz_1_konspekt_düsturlar.md',
    fileSize: '92 KB',
    fileMime: 'text/markdown',
    authorId: 'system_aztu',
    authorName: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    createdAt: '2026-09-24T16:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Dəqiq yuxarı (sup X) və dəqiq aşağı (inf X) sərhədlər',
        body: 'Boş olmayan və yuxarıdan məhdud hər bir həqiqi ədədlər çoxluğunun ən kiçik yuxarı sərhədi (supremumu), aşağıdan məhdud çoxluğun isə ən böyük aşağı sərhədi (infimumu) var. M = sup X olması üçün: 1) ∀x ∈ X üçün x ≤ M; 2) ∀ε > 0 üçün elə x_ε ∈ X tapılır ki, x_ε > M − ε.',
        formulaOrCode: 'U_ε(a) = (a − ε, a + ε)   |x − a| < ε',
      },
      {
        heading: '2. Ardıcıllığın limiti və Koşi meyarı',
        body: 'Əgər istənilən ε > 0 üçün elə N(ε) nömrəsi varsa ki, n > N şərtini ödəyən bütün hədlər üçün |x_n − a| < ε bərabərsizliyi ödənirsə, a ədədinə {x_n} ardıcıllığının limiti deyilir. Monoton və məhdud hər bir ardıcıllıq yığılandır (Veyerştrass teoremi).',
        formulaOrCode: 'lim (n→∞) (1 + 1/n)^n = e ≈ 2.718281828...',
      },
      {
        heading: '3. Görkəmli limitlər və ekvivalent sonsuz kiçilənlər (x → 0)',
        body: 'Seminar və kollokviumda 0/0 və 1^∞ qeyri-müəyyənliklərini sürətli açmaq üçün ekvivalentlik cədvəli:',
        formulaOrCode: `1) lim(x→0) [sin(x) / x] = 1
2) lim(x→0) [(1 + x)^(1/x)] = e
3) x → 0 olduqda ekvivalent əvəzləmələr:
   sin(x) ~ x,   tg(x) ~ x,   arcsin(x) ~ x
   1 − cos(x) ~ x² / 2
   ln(1 + x) ~ x,   e^x − 1 ~ x,   (1 + x)^α − 1 ~ α·x`,
      },
    ],
  },

  // ==========================================================================
  // 4. XƏTTİ CƏBR (İf-61119y · 4 Kredit · 45 Saat)
  // ==========================================================================
  {
    id: 'builtin_alg_matrices',
    title: 'Mühazirə və Seminar Bələdçisi: Matrislər, Determinantlar, Tərs Matris və Kramer/Qauss Üsulu',
    courseId: 'algebra',
    type: 'file',
    description:
      'Dos. Rəna Əmirova və Müəl. Çingiz Ələkbərovun dərsləri üzrə 2-ci və 3-cü tərtib determinantların hesablanması, cəbri tamamlayıcılar, tərs matris (A⁻¹) və xətti tənliklər sisteminin həlli.',
    fileName: 'xetti_cebr_matris_determinant_kramer.md',
    fileSize: '74 KB',
    fileMime: 'text/markdown',
    authorId: 'system_aztu',
    authorName: 'Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov',
    createdAt: '2026-09-24T17:30:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. İkinci və üçüncü tərtib determinantlar (Üçbucaq və Sarrus qaydası)',
        body: 'Kvadrat matrisin determinantı (Δ və ya det A) yalnız n×n ölçülü matrislər üçün təyin olunur. Determinant sıfırdan fərqli olduqda (det A ≠ 0) matris cırlaşmamış adlanır və onun tərs matrisi mövcuddur.',
        formulaOrCode: `| a₁₁  a₁₂ |
| a₂₁  a₂₂ | = a₁₁·a₂₂ − a₁₂·a₂₁

Laplas ayrılışı (i-ci sətir üzrə):
det(A) = a_i1·A_i1 + a_i2·A_i2 + ... + a_in·A_in
burada A_ij = (−1)^(i+j) · M_ij (cəbri tamamlayıcı)`,
      },
      {
        heading: '2. Tərs matrisin tapılması və Kramer qaydası',
        body: 'A·X = B xətti tənliklər sistemində əsas determinant Δ ≠ 0 olarsa, sistemin yeganə həlli var və x_k = Δ_k / Δ düsturu ilə tapılır (Kramer qaydası).',
        formulaOrCode: `A⁻¹ = (1 / det(A)) · adj(A)
x₁ = Δ₁ / Δ,   x₂ = Δ₂ / Δ,   x₃ = Δ₃ / Δ   (Δ ≠ 0)`,
      },
      {
        heading: '3. Matrisin ranqı və Kroneker–Kapelli teoremi',
        body: 'Xətti tənliklər sisteminin uyuşan (həlli olan) olması üçün zəruri və kafi şərt əsas matrisin ranqının genişlənmiş matrisin ranqına bərabər olmasıdır: rang(A) = rang(A|B). Əgər rang(A) = rang(A|B) = n (məchulların sayı) olarsa yeganə həll, < n olarsa sonsuz sayda həll var.',
      },
    ],
  },

  // ==========================================================================
  // 5. ADİAK — AZƏRBAYCAN DİLİ (Üf-71706y · 4 Kredit · 45 Saat)
  // ==========================================================================
  {
    id: 'builtin_aze_academic_guide',
    title: 'Mühazirə və Seminar Konspekti: Akademik Kommunikasiya, Ədəbi Dilin Normaları və Rəsmi-İşgüzar Üslub',
    courseId: 'aze',
    type: 'file',
    description:
      'Müəl. Nərminə İsayevanın dərsləri üzrə kollokvium və seminar mövzuları: fonetik, leksik və qrammatik normalar, akademik yazı prinsipləri, ərizə, tərcümeyi-hal, arayış və protokol tərtibi.',
    fileName: 'adiak_akademik_kommunikasiya_konspekt.md',
    fileSize: '56 KB',
    fileMime: 'text/markdown',
    authorId: 'system_aztu',
    authorName: 'Müəl. Nərminə İsayeva',
    createdAt: '2026-09-23T15:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Ədəbi dilin normaları (Fonetik, Leksik, Qrammatik)',
        body: '1) Fonetik norma: sözün orfoqrafik (yazılış) və orfoepik (tələffüz) qaydalarla düzgün işlədilməsi, ahəng qanunu və vurğu. 2) Leksik norma: sözün öz həqiqi və məcazi mənasında dəqiq seçilməsi, terminlərin yerində işlədilməsi, varvarizm və şablonlardan qaçılması. 3) Qrammatik norma: şəkilçilərin ardıcıllığı (kök + leksik + qrammatik), mübtəda ilə xəbərin şəxsə və kəmiyyətə görə uzlaşması, cümlədə söz sırası.',
      },
      {
        heading: '2. Akademik kommunikasiya və elmi üslubun xüsusiyyətləri',
        body: 'Elmi və akademik üslubun əsas göstəriciləri: məntiqilik, ardıcıllıq, obyektivlik, dəqiqlik və terminoloji sıxlıq. Akademik mətnin struktur hissələri: Başlıq, Xülasə (Annotasiya), Açar sözlər, Giriş, Əsas hissə (metodologiya və təhlil), Nəticə və İstifadə olunmuş ədəbiyyat siyahısı.',
      },
      {
        heading: '3. Rəsmi-işgüzar sənədlərin tərtibi qaydaları',
        body: 'Əməli yazı nümunələri: Ərizə (müraciət edilən orqan/şəxs, məzmun, imza və tarix), Tərcümeyi-hal / CV, İzahat, Arayış, Akt və Protokol. Bu sənədlərdə obrazlı ifadələr işlədilmir, standart qəliblərdən istifadə olunur.',
      },
    ],
  },

  // ==========================================================================
  // 6. XDİAK — İNGİLİS DİLİ (ENG-101 · 4 Kredit · 45 Saat)
  // ==========================================================================
  {
    id: 'builtin_eng_academic_pack',
    title: 'Academic & Business Communication Pack: Formal Emails, Essay Structure & Technical IT Vocabulary',
    courseId: 'eng',
    type: 'file',
    description:
      'Müəl. Dilarə Həmidovanın dərsləri üzrə rəsmi e-poçt şablonları, akademik paraqraf strukturu (Topic Sentence / Supporting Details), bağlayıcılar (Linking Words) və Kompüter Mühəndisliyi terminləri.',
    fileName: 'xdiak_eng101_academic_communication_pack.md',
    fileSize: '62 KB',
    fileMime: 'text/markdown',
    authorId: 'system_aztu',
    authorName: 'Müəl. Dilarə Həmidova',
    createdAt: '2026-09-23T16:00:00.000Z',
    isBuiltIn: true,
    studyNotes: [
      {
        heading: '1. Formal Academic & Business Email Structure',
        body: 'Akademik və işgüzar məktublarda qısaldılmış formalardan (gonna, wanna, ASAP) istifadə edilmir. Standart struktur: 1) Salutation: "Dear Professor [Last Name]," və ya "Dear Sir or Madam,"; 2) Opening line: "I am writing to inquire about / submit..."; 3) Body paragraph: aydın və konkret məzmun; 4) Closing: "I look forward to hearing from you. Sincerely / Best regards, [Full Name] (Group 6326A2)".',
      },
      {
        heading: '2. Academic Paragraph & Essay Connectors (Linking Words)',
        body: 'Akademik yazıda fikirləri əlaqələndirmək üçün keçid ifadələri (Transition Signals):',
        formulaOrCode: `• Addition (Əlavə etmə): Furthermore, Moreover, In addition, Additionally
• Contrast (Qarşılaşdırma): However, Nevertheless, On the other hand, Whereas
• Cause & Effect (Səbəb-nəticə): Consequently, Therefore, As a result, Due to
• Conclusion (Yekun): In conclusion, To summarize, Overall, Taking everything into account`,
      },
      {
        heading: '3. Computer Engineering & Academic Presentation Signposting',
        body: 'Təqdimat (Presentation) zamanı istifadə olunan rəsmi qəliblər: "Today I would like to present...", "Let us begin by looking at...", "Moving on to the next point...", "To sum up the main findings...".',
      },
    ],
  },
];

export const BUILT_IN_DEADLINES: Deadline[] = [
  {
    id: 'builtin_dl_prog_lab1',
    title: 'Proqramlaşdırma-1: Laboratoriya İşi №1–2 (Xətti və budaqlanan alqoritmlər)',
    courseId: 'prog',
    description:
      'Müəl. Şəbnəm İsgəndərli və Müəl. Ayxan Həsənov: Python-da dəyişənlər, riyazi ifadələr və if/elif/else şərt operatorları üzrə laboratoriya kodlarının təhvili.',
    dueDate: '2026-10-02',
    dueTime: '13:30',
    points: 10,
    isCompleted: false,
    authorId: 'system_aztu',
    authorName: 'Kompüter Mühəndisliyi Kafedrası',
    createdAt: '2026-09-20T09:00:00.000Z',
  },
  {
    id: 'builtin_dl_phys_lab2',
    title: 'Fizika: Laboratoriya №2 (Diskin və həlqənin ətalət momentinin təyini) hesabatı',
    courseId: 'phys',
    description:
      'Ölçmə cədvəli, bucaq təcili hesablamaları və nəzəri/təcrübi ətalət momentlərinin müqayisəli dəftər hesabatı.',
    dueDate: '2026-10-06',
    dueTime: '12:00',
    points: 10,
    isCompleted: false,
    authorId: 'system_aztu',
    authorName: 'Dos. Sürəyya Məmmədova',
    createdAt: '2026-09-20T10:00:00.000Z',
  },
  {
    id: 'builtin_dl_math_sem',
    title: 'Riyazi analiz-1: Çoxluqlar, Supremum/İnfimum və Ardıcıllıq limiti seminar yoxlaması',
    courseId: 'math',
    description:
      'Müəl. Şamil Talıblı: 1–4-cü həftə mövzuları üzrə lövhədə və dəftərdə məsələ həlləri (Forma-1: 30 ballıq seminar bazası).',
    dueDate: '2026-10-09',
    dueTime: '10:30',
    points: 10,
    isCompleted: false,
    authorId: 'system_aztu',
    authorName: 'Müəl. Şamil Talıblı',
    createdAt: '2026-09-20T11:00:00.000Z',
  },
  {
    id: 'builtin_dl_alg_hw1',
    title: 'Xətti cəbr: Sərbəst İş №1 — Determinantlar və Kramer qaydası ilə XTS həlli',
    courseId: 'algebra',
    description:
      'Müəl. Çingiz Ələkbərov: 3-cü tərtib determinantların Sarrus və Laplas üsulu ilə hesablanması və Kramer düsturları.',
    dueDate: '2026-10-14',
    dueTime: '13:30',
    points: 10,
    isCompleted: false,
    authorId: 'system_aztu',
    authorName: 'Müəl. Çingiz Ələkbərov',
    createdAt: '2026-09-20T12:00:00.000Z',
  },
  {
    id: 'builtin_dl_kol1_all',
    title: 'I Kollokvium Həftəsi (Bütün 6 Fənn üzrə 1–5-ci həftə mövzularının qiymətləndirilməsi)',
    courseId: 'prog',
    description:
      '6-cı tədris həftəsi (19–24 Oktyabr): KOICA/LMS-də 10 ballıq şkala üzrə I Kollokvium imtahanları.',
    dueDate: '2026-10-19',
    dueTime: '09:00',
    points: 10,
    isCompleted: false,
    authorId: 'system_aztu',
    authorName: 'AzTU 6326A2 Dekanlıq Cədvəli',
    createdAt: '2026-09-20T13:00:00.000Z',
  },
];
