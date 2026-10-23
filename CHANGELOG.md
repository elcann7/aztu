# AzTU 6326A2 — Dəyişikliklər Tarixçəsi (Changelog)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının versiya inkişafını, əlavə edilmiş funksiyaları və xəta düzəlişlərini xronoloji ardıcıllıqla qeyd edir.

---

## [1.30.0] — 2026-10-24

### ⚡ Dərslikvari Dərs Öyrənmənin Yığışdırılması & Yüksək Faydalı İş Mühitinə Keçid
- **Artıq "Dərs Öyrənmə" Balastının Yığışdırılması (`CourseShellView.tsx`, `MaterialsView.tsx`)**:
  - İstifadəçinin strateji təklifi əsasında (*"insanlar bura girib dərs öyrənməz"*) süni dərslikvari dərslər (`MathLearningView`, `PhysicsLearningView` və kütləvi `StudyNotesList` qayda blokları) fənn portallarından tamamilə çıxarıldı.
  - Fənn açıldıqda tələbə artıq yüzlərlə sətirlik nəzəriyyə divarı ilə deyil, birbaşa **Materiallar və Rəsmi PDF-lər** ilə qarşılaşır.
  - Bütün 6 fənn üçün vahid və aydın 6-tablı struktur quruldu:
    1. 📁 **Materiallar (`materials`)**: Rəsmi Cloudflare R2 PDF mühazirələri, kitablar və slaydlar.
    2. 📖 **15 Həftəlik Plan (`syllabus`)**: Hər həftənin rəsmi tədris mövzuları və kollokvium hədəfləri.
    3. ⏰ **Tapşırıqlar (`assignments`)**: Laboratoriya və sərbəst iş deadline-ları.
    4. 📅 **Cədvəl & Məlumat (`overview`)**: Həftəlik dərs saatları, auditoriya/korpus otaqları və müəllim heyəti.
    5. 📝 **Qrup Qeydləri (`notes`)**: Dərs zamanı müəllimin şifahi tapşırıqları.
    6. 💬 **Sual-Cavab (`qa`)**: Akademik problemlərin qrupdaxili müzakirəsi.
- **Performans və Yüngülləşmə**:
  - `CourseShellView` JavaScript paket ölçüsü **161.04 kB-dan 34.68 kB-a (təxminən 5 dəfə)** endirildi.
  - CSS ölçüsü **29.82 kB-dan 11.58 kB-a** azaldıldı.
  - Material kartlarında sənədi oxumaq düyməsi (`PDF Oxu`) birbaşa təmiz PDF Viewer açır, əvvəlki süni konspektlər aradan qaldırıldı.

---

## [1.29.0] — 2026-10-23

### 📐 Qlobal KaTeX Riyazi Render Mühərriki & Xam LaTeX Stringlərinin Aradan Qaldırılması
- **Vahid KaTeX Riyazi Render Mühərriki (`src/components/common/TeXFormula.tsx` & `.css`)**:
  - İstifadəçinin rəyi və ekran görüntüsü (`media_1792783659951_01ddb2a6.png`) əsasında saytın müxtəlif yerlərində (fənn mühazirələri, qaydalar, düstur lüğəti, addım-addım həllər) qalan xam LaTeX kodlarının görünməsi problemi kökündən həll edildi.
  - `toTeX()` və `toTeXInline()` avtomatik normalizatoru vasitəsilə həm xam LaTeX simvolları (`\lim`, `\in`, `\Delta`), həm də Unikod riyazi işarələri (`∈`, `⊆`, `⇔`, `⇒`, `→`, `lim(x→x₀−0)`, `Δ`, `²`, `x₀`, `L₁`) dərslik səviyyəsində təmiz KaTeX formulalarına çevrildi.
  - `isPythonCode()` detektoru vasitəsilə proqramlaşdırma dərslərindəki Python kod blokları düsturlardan ayrıldı, sintaksis və kopyalama düyməsi ilə təmin edildi.
  - `TeXFormulaBlock`, `TeXInline` və `TeXMathText` komponentləri vasitəsilə düstur kartları, simvol cədvəli açarları və həll addımları vahid tipografik standarta gətirildi.
- **Tələbə Dərs Kartlarının Yenilənməsi (`src/components/app/StudyNoteCard.tsx` & `.css`)**:
  - Mavi rəngli əsas düstur blokunda (`study-note-formula-wrapper`) xam `<pre>` mətni əvəzinə sətir-sətir ayrılmış, etiketli və şərhləri səliqəli KaTeX riyazi bloku tətbiq edildi.
  - Düstur lüğətindəki simvol açarları (`study-note-symbol-key`) KaTeX inline renderi ilə əvəzləndi (`C(x₀)`, `\Delta x = x - x₀`, `\Delta y = f(x₀ + \Delta x) - f(x₀)`).
  - Addım-addım həll siyahısında (`study-note-steps-box`) və nümunələrdə inline riyazi ifadələr (`L₁ = f(x₀ - 0)`, `L₂ = f(x₀ + 0)`) avtomatik müəyyən edilərək vizual render olundu.
- **Əsas Səhifə və İş Mühiti Teorem Renderləri (`FeatureDeepDives.tsx`, `WorkspacePreview.tsx`)**:
  - Əsas səhifədəki Veyerştras və I görkəmli limit teorem qutusunda (sətir 328) xam LaTeX kodu KaTeX ekran rejimi ilə əvəzləndi.
  - Linear iş mühiti önizləməsindəki `formula.tex` qutusunda xam kod əvəzinə gözoxşayan KaTeX riyazi qrafikası aktivləşdirildi.
- **Püşkatma Modulunun İnteqrasiyası (`ColloquiumDrawView.tsx`)**:
  - Təkrarlanan yerli KaTeX render funksiyası aradan qaldırılaraq ümumi `TeXFormula` moduluna bağlandı, yüngülləşdirildi və tip xətaları aradan qaldırıldı.

---

## [1.28.0] — 2026-10-23

### 🔐 Canlı İstehsalat (Production) Giriş və Qeydiyyatın Bərpası & Supabase İkitərəfli Sinxronizasiya
- **Fail-Safe Timeout Wrapper (`withTimeout`) İnteqrasiyası (`AuthContext.tsx`)**:
  - İstifadəçinin rəyi əsasında canlı saytda qeydiyyatların yazılmaması və Google/Gmail girişində yaranan donma/bug problemi aradan qaldırıldı.
  - Supabase-ə edilən bütün şəbəkə sorğuları (`select`, `count`, `upsert`, `update`) təhlükəsiz timeout (1500-2500ms) ilə mühafizə olundu. Supabase layihəsi fasilədə (paused) olsa və ya şəbəkə geciksə belə sistem çöküb dayanmır, dərhal lokal yaddaş ehtiyatına keçir.
- **İkitərəfli Sinxronizasiya (Two-Way Cloud & Local Storage Sync)**:
  - İstənilən cihazda və ya brauzerdə qeydiyyatdan keçmiş tələbələr `initializeAuth` zamanı avtomatik olaraq Supabase `profiles` və lokal yaddaş arasında qarşılıqlı sinxronlaşdırılır.
  - Qeydiyyat və giriş zamanı istifadəçi məlumatları həm yerli keşə, həm də Supabase `profiles` cədvəlinə yazılır.
- **Google GIS və Giriş Düyməsinin Dayanıqlılığı (`LoginPage.tsx`, `RegisterPage.tsx`)**:
  - Google iframe düyməsinin gecikməsi və ya One-Tap bildirişinin brauzer tərəfindən rədd edilməsi halında `isGsiRendered` vəziyyəti ilə hər zaman aktiv, kliklənən rəsmi Google düyməsi və 6326A2 modalı təmin edildi.
  - Google avatar şəkli (`pictureUrl`) qeydiyyat zamanı profilə qüsursuz köçürülür.
- **Supabase İcazələri və Sxem Təminatı (`supabase/migrations/20261023_allow_profile_auth_sync.sql`)**:
  - Anon və authenticated rollarına `profiles` cədvəlini oxumaq və 6326A2 kodu ilə qeydiyyatdan keçmək üçün RLS siyasətləri formalaşdırıldı.
  - `check_max_students_limit` trigger-i vasitəsilə 30 tələbəlik təməl təhlükəsizlik kvotası bazada qorunub saxlanıldı.

---

## [1.27.0] — 2026-10-23

### 🎰 Mexaniki unprompted.cool Baraban Animasiyası, KaTeX Riyazi Render və 80 Sual Bazası
- **KaTeX Rəsmi Riyazi Formatlama İnteqrasiyası (`ColloquiumDrawView.tsx` & `.css`, `katex`)**:
  - İstifadəçinin rəyi əsasında (`media_1792782192280_52536892.png`) xam LaTeX kod stringlərinin (`\lim_{x \to x_0} ... \forall \varepsilon ...`) birbaşa görünməsi problemi tamamilə aradan qaldırıldı.
  - `katex` mühərriki və `katex/dist/katex.min.css` inteqrasiya edilərək bütün düsturlar, limitlər, matrislər və qanunlar üçün `TeXFormula` komponenti yaradıldı. İfadələr universitet dərslikləri səviyyəsində, mərkəzləşdirilmiş və oxunaqlı riyazi simvollarla render edilir.
- **unprompted.cool Üslublu Həqiqi Mexaniki Baraban (Slot Drum) Animasiyası**:
  - Əvvəlki statik mətn dəyişməsi və 2 saniyəlik donma/gecikmə tamamilə aradan qaldırıldı.
  - Hər 3 slot üçün şaquli baraban pəncərəsi (`.slot-drum-viewport`, `.slot-drum-strip`) və daxili 18 pilləli mövzu zolağı quruldu.
  - Fırlanma zamanı sürətli şaquli hərəkət, ritmik mexaniki çıqqıltılar (`playTickSound`) və ritmik ardıcıl kilidlənmə tətbiq edildi:
    - 1-ci Slot (Nəzəriyyə): 1.0s-də mexaniki zərbə ilə kilidlənir (`playReelLockSound`).
    - 2-ci Slot (Misal 1): 1.4s-də kilidlənir (`playReelLockSound`).
    - 3-cü Slot (Misal 2): 1.8s-də tamamlanma akkordu ilə kilidlənir (`playTicketCompleteSound`).
    - 2.15s-də gecikmədən dərhal sualların həlli mərhələsinə keçid edilir.
- **80 Ədədlik Geniş Sual və Mövzu Bankı (`src/data/colloquiumQuestions.ts`)**:
  - Püşkatmanın zəngin və müxtəlif görünməsi üçün 4 fənnin hər biri üzrə sual bazası 10 nəzəriyyə + 10 praktiki misala (fənn üzrə 20, cəmi 80 sual) çatdırıldı:
    - **Riyazi analiz - 1**: Veyerştras Teoremi, Heyne və Koşi limitləri, Görkəmli limitlər, Ekvivalent kiçilənlər, Kəsilməzlik və qırılmalar, Bolsano-Koşi, Roll və Laqranj, Lopital qaydası və s.
    - **Xətti cəbr və analitik həndəsə**: Kramer qaydası, Tərs matris, Determinant xassələri, Vektor hasilləri, Qauss üsulu, Matris ranqı və s.
    - **Fizika - 1**: Nyuton qanunları və impuls, Şteyner teoremi, Termodinamikanın I qanunu və izo-proseslər, Mail müstəvi dinamikası, Qeyri-elastiki toqquşma və s.
    - **Proqramlaşdırmanın əsasları - 1 (Python)**: Yaddaş modeli (Mutable/Immutable), Big-O asimptotik mürəkkəblik, Rekursiya və Call Stack, Diaqonal cəmi, İkili axtarış və s.

---

## [1.26.0] — 2026-10-23

### 🎨 Qara-Ağ Ziddiyyətinin Aradan Qaldırılması & Yumşaq Slate Tünd Tema Harmoniyası
- **Mütləq Qara Void `#000000` / `#08090a`-ın Yumşaq Kömür-Slate Rəngləri ilə Əvəzlənməsi (`src/styles/tokens.css`)**:
  - İstifadəçinin rəyi əsasında ("qara cox qaradir sanki 0000 secilibdir") gözü yoran və dərinliyi olmayan OLED qara rəng aradan qaldırıldı.
  - Linear və GitHub Dark standartlarına uyğun yumşaq, dərin və rahat slate-charcoal palitrası tətbiq edildi:
    - `--bg-app: #0f1117` (Əsas fon)
    - `--bg-surface: #181b26` (Kart və pəncərə səthləri)
    - `--bg-subtle: #141722` (Alt bloklar və daxili qutular)
    - `--bg-sidebar: #13151e` (Yan menyu paneli)
    - `--border-default: rgba(255, 255, 255, 0.10)` (Zərif monoxrom haşiyələr)
- **Tətbiqdaxili Bütün Ağ Kağız Kartlarının Tamamilə Tünd Temaya Uyğunlaşdırılması**:
  - İstifadəçinin şikayət etdiyi "qara agg bir birine girib" xətası həll edildi: tətbiqdaxili görünüşlərdəki hardcoded `#ffffff` və `#f8fafc` fonları və `#0f172a` tünd mətnləri təmizlənərək vahid tokenlərə bağlandı:
    - `CalculatorView.css`: Bütün 6 fənn kartı, KPI xülasə qutusu, qaib izləyicisi və çevirici qutuları zərif tünd slate kartlarına çevrildi.
    - `ViewsCommon.css`: Qrup qeydləri xronologiyası, sual-cavab lövhəsi, rəy qutuları, sorğular, material cədvəli və deadline təqvimi harmonizə edildi (46 ədəd ağ fon təmizləndi).
    - `CourseShellView.css`: 15 həftəlik sillabus yol xəritəsi, dərs cədvəli otaq kartları, material sıraları və qiymət həbləri tünd dizayn sisteminə keçirildi.
    - `StudyNoteCard.css`: "0-dan öyrədən" dərslik kartları, düstur blokları, həll addımları və simvol lüğəti tündləşdirildi.
    - `MathLearning.css` & `PhysicsLearning.css`: Ali riyaziyyat və fizika dərsləri, teorem sübutları, interaktiv testlər və laboratoriya nəzəriyyəsi kartları vahid dizayna keçirildi.
    - `PythonSandboxView.css`: Kod redaktoru, çıxış terminalı, alətlər paneli və təklif həbləri harmonizə edildi.
    - `ProfileModal.css`: Tələbə profili pəncərəsi, avatar seçimləri və kilidli sahələr (Locked Identity toxunulmaz saxlanılaraq) tünd dizayna uyğunlaşdırıldı.
    - `GlobalSearch.css` & `DiscussionPanel.css`: Qlobal axtarış nəticələri və müzakirə şərhləri tünd səthlərə keçirildi.
    - `Sidebar.css` & `LoginPage.css`: Mobil menyu düyməsi və Google ilk qeydiyyat təhlükəsizlik modalı zərif tünd kartlara çevrildi.
- **Vizual Təsdiq və Yoxlama**:
  - Bütün əsas səhifələr (Kalkulyator, Kolloqvium sınağı, Materiallar bazası, Deadline-lar və Riyazi analiz fənn portalı) Playwright ilə test edilərək ekran görüntüləri ilə təsdiqləndi. Ağ kart parıltısı və göz yoruculuğu tamamilə aradan qaldırıldı.

---

## [1.25.0] — 2026-10-23

### 🎲 unprompted.cool Üslublu Kolloqvium Püşkatma və İmtahan Sınaq Sistemi
- **unprompted.cool Mexaniki Püşkatma Çarxı & Web Audio API SFX (`ColloquiumDrawView.tsx` & `.css`, `soundEffects.ts`)**:
  - Brauzerin daxili `AudioContext` mühərriki ilə heç bir xarici `.mp3`/`.wav` faylından asılı olmadan 100% oflayn və sıfır gecikməli sintetik mexaniki çıqqıltı səsləri (`playTickSound`), fırlanma yavaşıması, slot kilidlənmə zərbəsi (`playReelLockSound`), bilet tamamlanma akkordu (`playTicketCompleteSound`) və fanfar (`playSubmitFanfare`) yaradıldı.
  - Səs səviyyəsinin tənzimlənməsi / söndürülməsi üçün yuxarı paneldə dinamik SFX düyməsi əlavə edildi.
  - 3 ardıcıl slotlu çarx animasiyası:
    - **Slot 1**: Açıq Nəzəri Mövzu (4.0 Bal)
    - **Slot 2**: Praktiki Misal / Məsələ 1 (3.0 Bal)
    - **Slot 3**: Praktiki Misal / Məsələ 2 (3.0 Bal)
  - `unprompted.cool` üslubunda mərkəzi parlaq və kəhrəba işıqlı **"Bilet Çək (Püşk At)"** düyməsi.
- **Rəsmi Kolloqvium Sual Bazası (`src/data/colloquiumQuestions.ts`)**:
  - AzTU rəsmi KOICA LMS və müəllim sillabuslarına uyğun sual bankı:
    - **Riyazi analiz-1**: Veyerştras Teoremi, Heyne və Koşi limitləri, Ekvivalent sonsuz kiçilənlər, İkinci görkəmli limit.
    - **Xətti cəbr**: Determinant xassələri, Kramer qaydası, Tərs matris qurulması.
    - **Fizika-1**: Nyutonun ikinci qanunu, İmpulsun saxlanması, Mail müstəvi dinamikası, Qeyri-elastiki toqquşma.
    - **Proqramlaşdırma-1 (Python)**: Yaddaş modeli (Mutable/Immutable), Diaqonal cəmi, O(N log N) unikal sıralama.
  - Gələcəkdə yeni rəsmi sualların birbaşa və asanlıqla bazaya əlavə edilməsi üçün modular TypeScript interfeysləri (`ColloquiumQuestion`, `ColloquiumTicket`).
- **İmtahan Taymeri və Hibrid Qiymətləndirmə**:
  - **İkili Rejim**: ⏱️ *Real Kolloqvium (45 dəqiqəlik canlı geri sayım)* və ya 🧘 *Sərbəst Məşq (Limitsiz vaxt)*.
  - Tələbə cavabları yazdıqdan sonra "Bileti Tamamla və Rəsmi Meyarları Gör" düyməsi ilə:
    - Rəsmi dərslik isbatı və addım-addım həll vərəqi açılır.
    - Müəllim meyarlarına görə (10 bal sistemi: 4 + 3 + 3) tələbə öz balını təyin edə və zəif nöqtələrini dərhal görə bilir.
- **Naviqasiya İnteqrasiyası**:
  - `Sidebar.tsx`: "ALƏTLƏR VƏ BAZA" bölməsinə "Kolloqvium Sınağı" (`/app/colloquium`) keçidi əlavə edildi.
  - `AppShell.tsx`: Yüngül React `lazy` yüklənməsi ilə `/app/colloquium` və `/app/colloquium-draw` marşrutlarına bağlandı.

---

## [1.24.0] — 2026-10-20

### 🚀 Qələbəlik Bento Qutusunun Ləğvi & Linear Editorial Feature Spotlights Keçidi
- **Qələbəlik 2x2 Bento Şəbəkəsinin Tamamilə Sökülməsi (`FeatureDeepDives.tsx` & `.css`)**:
  - İstifadəçinin rəyi əsasında (`media_1792440862707_75327499.png`) sıxılmış, qarışıq widget təəssüratı yaradan 2x2 qutu şəbəkəsi (gün tabları, axtarış paneli, test variantları və `+/-` kalkulyatoru) tamamilə ləğv edildi.
- **Linear-ın Orijinal Editorial Feature Spotlights Arxitekturasının Qurulması**:
  - `linear.app`-ın rəsmi dərin imkanlar səhifəsi təhlil edilərək 4 geniş, nəfəs alan və tək məqsədli tətbiq pəncərəsi yaradıldı:
    1. **Spotlight 1 (`#schedule` · Semestr Planı və Dərs Axını)**:
       - 2-sütunlu editorial başlıq (Sol: 44px qalın `Semestr Planı və Dərs Axını.`, Sağ: izahat mətni).
       - Linear Cycle pəncərəsi: Göy canlı nöqtə, `Payız Semestri 2026/27 · 5-ci Tədris Həftəsi`, sağda `32% Tamamlandı (Həftə 5 / 15)`.
       - Qradiyent proqres zolağı və Linear Issue sətirləri (`MAT-101`, `PRG-201`, `XAR-301`), `İndi Davam Edir` sarı canlı indikatoru.
    2. **Spotlight 2 (`#colloquium` · Kolloqvium İntuisiyası & İsbatlar)**:
       - Linear Code Inspector pəncərəsi: `teorem_veyerstras.tex` fayl başlığı, yaşıl `Dos. N.Şıxəliyev Təsdiqi` möhürü.
       - Monoxrom LaTeX formula mühiti və 3 geniş nömrələnmiş təhlil kartı (`01 Ardıcıllığın Monotonluğu`, `02 Yuxarıdan Məhdudluq`, `03 Veyerştras Teoremi`).
    3. **Spotlight 3 (`#attendance` · Ağıllı Davamiyyət & Forma-1 Monitoru)**:
       - Linear 3-Sütunlu Analitika vitrini:
         - Sütun 1: `13 saat` (`15 saatlıq 25% limitindən cəmi 2 saat qaib qeydə alınıb`, yaşıl status nişanı).
         - Sütun 2: `10 / 10` (`Maksimum Forma-1 imtahan öncəsi balı tam qorunur`, `Maksimum Bal Qüvvədədir`).
         - Sütun 3: `Uyğundur` (`Boloniya qaydası üzrə kəsr riski mövcud deyil`, bənövşəyi status nişanı).
    4. **Spotlight 4 (`#vault` · Sinxron R2 Arxiv Şəbəkəsi)**:
       - Linear Issue Table: Fənn materialları cədvəli (`KOD`, `VƏSAİTİN ADI`, `MÜƏLLİM`, `HƏCM`, `ƏMƏLİYYAT`), göy issue nişanları (`MAT-03`, `PRG-01`, `CEB-02`, `FIZ-01`, `AZE-01`) və birbaşa təhlükəsiz yükləmə/baxış düymələri.
    5. **Monumental Pre-Footer Kartı (`#about`)**:
       - Mərkəzləşdirilmiş monumental kart: *"AzTU 6326A2 üçün quruldu. Bu gün daxil olun."*, daxili zərif relyef və ağ oval düymə.
- **Dizayn və Kod Yoxlanışı**:
  - `npm run build` ilə 0 xəta təsdiqləndi.
  - Headless Chrome vasitəsilə 5 bölmənin də real ekran görüntüləri çəkilib vizual dəqiqlik təsdiqləndi.

---

## [1.23.0] — 2026-10-20
- **Linear Hero Pəncərəsi & Perspektiv Pedestal (`WorkspacePreview.tsx` & `.css`)**:
  - Tətbiq vitrini Linear-ın 3-sütunlu rəsmi masaüstü tərtibatına çevrildi:
    1. **Sol Sütun (Linear Sidebar)**: `AzTU · 6326A2`, `Pulse (Fəaliyyət)`, `Cədvəl`, `R2 Arxiv` və aktiv fənn siyahısı.
    2. **Mərkəzi Issue Sahəsi**: `MAT-101 / Riyazi analiz - 1`, `I Kolloqvium: Veyerştras Teoremi, Monotonluq və Görkəmli Limitlər`, `formula.tex` LaTeX kodu, təsdiqlənmiş PDF vəsiqəsi və fəaliyyət tarixi (`Dos. Nizami Şıxəliyev`).
    3. **Sağ Sütun (Linear Signature Properties Panel)**: Status (`● Aktiv Hazırlıq`), Prioritet (`Kolloqvium (Yüksək)`), Müəllim avatarı, Auditoriya (`1-506`), Forma-1 balı (`10 Bal`), Qaib limiti (`2/15 saat`) və kolloqvium geri sayımı.
  - Pəncərənin altında Linear-ın perspektivli zərif döşəmə refleksi və ambient işıq dumani (`.workspace-pedestal-light` & `.workspace-pedestal-surface`) quruldu.
- **İzometrik Arxitektura Sxemləri (`FIG 0.1`, `FIG 0.2`, `FIG 0.3` · `FeatureDeepDives.tsx` & `.css`)**:
  - `linear.app`-dan ilhamlanaraq xüsusi SVG vektor xətləri ilə çəkilmiş 3D izometrik sxemlər əlavə edildi:
    - `FIG 0.1: Sinxron R2 Arxiv Şəbəkəsi` (izometrik qatlı kub və lazer məlumat şüaları).
    - `FIG 0.2: Boloniya Davamiyyət Prosessoru` (izometrik hədd kəsimi və pilləli metrika sütunları).
    - `FIG 0.3: Kolloqvium İntuisiyası & Sınaq` (izometrik imtahan vərəqi və yaşıl təsdiq möhürü).
  - İki tonlu editorial başlıq: *"Yeni nəsil akademik iş mühiti."* (qalın ağ) + izahat (sakit gümüşü boz).
- **Fakültə və Tərəfdaşlıq Zolağı (Institutional Ribbon)**:
  - Linear-ın şirkət loqoları zolağı üslubunda monoxrom rəsmi tərəfdaş zolağı: `AzTU`, `6326A2`, `ECTS Boloniya`, `Cloudflare R2`, `KOICA LMS`, `Python 3.12`.
- **Yuxarı Naviqasiya & Başlıq (`Header.tsx`, `Hero.tsx`)**:
  - Linear-ın həndəsi loqo markı, naviqasiya keçidləri, `|` şaquli ayırıcı və 13px oval həb düyməsi (`border-radius: 9999px`).
  - Hero başlığı: *"Universitet təhsili üçün vahid sistem."* sıx `letter-spacing: -0.04em` ilə.

---

## [1.22.0] — 2026-10-19

### 🔍 Linear & Raycast Canlı Ekran Müqayisəsi və Təmiz Monoxrom Standartlaşdırması
- **Canlı Ekran Görüntülərinin Çıxarılması (`linear.app` & `raycast.com`)**:
  - Headless Chrome və Chrome DevTools Protocol vasitəsilə `linear.app`, `raycast.com` və `localhost:5174` səhifələrinin real ekran görüntüləri (Hero, Bento, Komanda Palitrası) çəkildi və yan-yana müqayisə edildi.
  - Vizual fərqlər sənədləşdirildi: tipografiya iyerarxiyası, pill düymələr (`border-radius: 9999px`), `inner-bevel` relyefləri və monoxrom etiketlər.
- **Ağ Ekran və Asılı Qalma Xətasının Aradan Qaldırılması**:
  - `AuthContext.tsx`: Universitet şəbəkəsində / IP bloklanması zamanı Supabase profil sorğusunun ilişib qalmasının qarşısını almaq üçün 1500ms `Promise.race` taymout mexanizmi əlavə edildi.
  - `App.tsx`: İctimai Landing səhifəsinin autentifikasiya yüklənməsi ilə bloklanması dayandırıldı; yüklənmə indikatorunun fonu `#fcfcfd`-dən Linear `#08090a`-ya dəyişdirildi.
  - `index.html`: `color-scheme` və `class` "dark" olaraq təyin edildi.
- **Neon Elementlərin Tamamilə Silinməsi**:
  - Parlaq sarı düstur qutuları, rəngli ikon qutuları və kəskin neon çərçivələr Linear-ın rəsmi istehsalat CSS tokenləri ilə monoxrom slate rənglərinə keçirildi.

---

## [1.21.0] — 2026-10-19

### ⚡ Senior 12-Sütunlu Bento Grid & İnteraktiv Mikro-UI İnqilabı (Linear + Raycast + Brilliant.org)
- **Köhnə Şablonların Ləğvi (`FeatureDeepDives.tsx` & `.css`)**:
  - 2015-ci il üslublu, ardıcıl 5 təkrar ziqzaq (sol mətn / sağ kart) sıralaması tamamilə silindi.
  - Əvəzində Linear, Raycast və Brilliant.org arxitekturasından deşifrə edilmiş 12-sütunlu asimmetrik **Bento Grid** sistemi quruldu.
- **Canlı İnteraktiv Mikro-UI Modulları**:
  1. **Bento 1 (7 Sütun · Linear Style)**: *Həftəlik Dərs Cədvəli & Auditoriyalar* — `B.e.`-dən `C.`-yə kimi 5 günlük interaktiv keçid düymələri, real dərs saatları (`09:00 - 10:20`), otaqlar (`5-205`, `6-508`), Mühazirə/Seminar/Laboratoriya nişanları və canlı növbəti dərs indikatoru.
  2. **Bento 2 (5 Sütun · Raycast Style)**: *⌘K Komanda Palitrası Simulyatoru* — Real axtarış inputu, `⌘K`, `↵`, `ESC` qısayolları və klikləndikdə anında Raycast bildirişi verən əmrlər ("Riyazi analiz kolloqvium sualları", "Python mühazirə paketi", "Qaib limiti").
  3. **Bento 3 (6 Sütun · Brilliant.org Style)**: *I Kolloqvium İntuisiya & Sınaq Bloku* — Çoxseçimli interaktiv test (1-ci görkəmli limit $\lim_{x \to 0} \frac{\sin 5x}{x}$, Matris determinantı $2^3 \det(A)$, Python list slicing), real-vaxt yaşıl/qırmızı animasiya, ətraflı riyazi isbat pəncərəsi və "Növbəti sual" keçidi.
  4. **Bento 4 (6 Sütun · Canlı Kalkulyator)**: *25% Qaib Limiti & Forma-1 Monitoru* — 60 və 45 saatlıq fənlər üçün `+ / -` düymələri ilə buraxılmış saatların dəyişdirilməsi, dinamik rənglənən faiz tərəqqi şkalası (Yaşıl / Narıncı / Qırmızı Kəsr) və avtomatik hesablanan davamiyyət balı.
  5. **Bento 5 (12 Sütun · Linear Vault)**: *Cloudflare R2 Akademik Arxiv & Müəllim Qeydləri* — Fənn filtrləri ilə 33 rəsmi material cədvəli, birbaşa "Aç" simulyasiyası və sağ tərəfdə rəsmi müəllim xəbərdarlıqları lövhəsi (Dos. Nizami Şıxəliyev, Dos. Fizuli Əzimov, Dos. Rəna Əmirova).
  6. **Bento 6 (12 Sütun · Obsidian Glow CTA)**: *Son Zərif Qapalı Şəbəkə Kartı* — Qaranlıq radial obsidian relyefi, canlı pulsasiya və birbaşa qrup qeydiyyat/giriş düymələri.
- **İlkin Baxışın Obsidian Uyğunlaşdırılması (`WorkspacePreview.css`)**:
  - Bütün sərt kodlanmış ağ (`#ffffff`, `#fbfcfd`, `#f8fafc`) fonlar `var(--bg-canvas)`, `var(--bg-surface)` və `var(--bg-sidebar)` ilə əvəzləndi.
  - macOS pəncərə nəzarət düymələri (qırmızı, sarı, yaşıl) və kart daxili kənar relyefləri (`var(--inner-bevel)`) tətbiq edildi.
- **TypeScript & Build Yoxlanışı**: `npm run build` 0 xəta ilə uğurla icra olundu.

---

## [1.20.0] — 2026-10-19

### 🎨 Linear + Raycast + Brilliant.org Qlobal Dizayn İnqilabı (Dark Obsidian UI)
- **Təhlil və Deşifrə (`/reverse-engineer-anything`)**:
  - `linear.app`, `raycast.com` və `brilliant.org` platformalarının canlı CSS fayllarından rəsmi rəng palitraları, tipoqrafika, şüşə (glassmorphism) və mikrodizayn xüsusiyyətləri çıxarıldı.
- **Qlobal Dizayn Sistemi (`tokens.css` & `global.css`)**:
  - Platforma tamamilə **Obsidian Dark** rejiminə keçirildi (`--bg-app: #08090c;`, `--bg-canvas: #0c0e13;`, `--bg-surface: #13161f;`, `--bg-sidebar: #0a0b10;`).
  - **Raycast Təbii Relyefi**: Bütün kartlara, düymələrə və dialoqlara fiziki dərinlik verən `--inner-bevel: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);` və zərif 1px kənar xətlər tətbiq edildi.
  - **Brend Vurğuları**: Linear Indigo (`#5e6ad2`), Raycast Coral (`#ff6363`) və Brilliant Gold/Emerald (`#f7c325` / `#10b981`) rəngləri inteqrasiya olundu.
- **İdarəetmə Paneli və Naviqasiya (`Sidebar.css`, `TopBar.css`, `AppShell.css`)**:
  - `TopBar`: Raycast komanda paneli estetikası, `backdrop-filter: blur(16px)`, `⌘K` axtarış pəncərəsi və şüşə örtük.
  - `Sidebar`: Zərif qaranlıq naviqasiya, qradiyent brend nişanı, aktiv fənn işarələri və profil kartı.
- **Dashboard və Bento İş Sahəsi (`DashboardView.css`)**:
  - Bütün açıq ağ kartlar dərin obsidian səthlərə çevrildi.
  - Dərs cədvəli: 5 günlük Raycast tipli seqmentli tablar, Mühazirə/Seminar/Laboratoriya vizual nişanları və otaq göstəriciləri.
  - Semestr tərəqqi şkalası və kollokvium/imtahan taymeri yeniləndi.
- **Giriş və Qeydiyyat (`LoginPage.css`, `RegisterPage.css`, `Modal.css`)**:
  - Şüşə örtüklü Raycast dialoqları və qaranlıq kart estetikası.
- `npm run build` uğurla tamamlandı (0 xəta).

---

## [1.19.1] — 2026-10-02

### Riyazi Analiz-1: 0-dan Pedoqoji İzahlar və Akademik Editorial Nəşr Redizaynı
- **Akademik Nəşriyyat / KaTeX Dizaynı**:
  - Sayt neon və süni AI qrafiklərindən təmizlənərək klassik **Paper & Ink / LaTeX Akademik Dərslik** formatına (`Newsreader` serif şrifti, arxiv kağızı palitrası `#fbf9f4`, dərin mürəkkəb rəngləri) keçirildi.
  - KaTeX horizontal kəsr xətləri (`\frac{...}{...}`) real dərslik xətləri ilə inteqrasiya edildi (bölmə işarəsi `/` aradan qaldırıldı).
- **Mövzuların 6-cı Sinif İntuisiyasından 0-dan Yenidən Yazılması**:
  - **§ 4**: İkinci görkəmli limitdən $\lim ( \frac{n+a}{n+b} )^n = e^{a-b}$ düsturunun addım-addım cəbri isbatı.
  - **§ 5**: Törəmə tərifi $f'(x_0) = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}$ və $(x^2)'=2x$ həndəsi və cəbri isbatı.
  - **§ 7**: Mürəkkəb funksiyalar (Matryoşka qutusu, şirə zavodu, velosiped zənciri analoqları, ovuc metodu və 9 ətraflı misal).
  - **§ 10**: Ardıcıllığın limiti ($\varepsilon-N$ tərifi) — sonsuz qatar, vaqonlar ($n$), pulun azalması, müəllimin şübhə/xəta hədəfi ($\varepsilon$), sərhəd şlaqbaumu ($N$) və $\frac{2n+1}{n+3} \to 2$ misalının əllə tapılması.
  - **§ 11**: Funksiyanın Koşi limiti ($\varepsilon-\delta$ tərifi) — Snayper və hədəf halqası ($\varepsilon$), əl titrəməsi/pəncərə ($\delta$), $0 < |x-x_0|$ fəlsəfəsi və $3x-1 \to 5$ lövhə isbatı.
  - **§ 12B**: Koşi və Dalamber Əlamətləri ("+1 qaydası" $a_{n+1}/a_n$, konfet qutusu analoqu, Koşinin radikal kök papağı $\sqrt[n]{a_n}$, fundamental ardıcıllıq və riyazi induksiya / determinant aydınlaşdırması).

---

## [1.19.0] — 2026-10-02

### Riyazi Analiz-1: Limit & Törəmə İnteraktiv Veb Laboratoriyası (math-lab)
- **Lokal İnteraktiv Tədris Studiyası (`math-lab/`)**:
  - Tələbə Elcan Səfərlinin seminar və imtahanlarda limitin Koşi isbatlarını ($\varepsilon-\delta$ və $\varepsilon-N$) və törəmə intuisiyasını tərəddüdsüz həll etməsi üçün lokal interaktiv studio (`http://localhost:3000`) istifadəyə verildi.
  - **1 kliklə Başlatma**: Kök qovluqda [`start-math-lab.cmd`](./start-math-lab.cmd) və [`math-lab/start.cmd`](./math-lab/start.cmd) yaradıldı.
  - **6 İnteraktiv Modul**:
    1. **$\varepsilon-\delta$ Funksiya Limiti**: 60fps Canvas qrafikası, dinamik $\varepsilon$ və $\delta$ slayderləri, kənaraçıxma detektoru (yaşıl/qırmızı), optimal $\delta$ avtomatik seçimi.
    2. **$\varepsilon-N$ Ardıcıllıq Limiti**: Diskret hədlər, $\forall n > N$ üçün zolaq daxilinə düşən nöqtələrin vizualizasiyası.
    3. **Törəmə İntuisiyası ($\Delta x \to 0$)**: Kəsən xəttin fırlanaraq toxunan xəttə çevrilməsi animasiyası.
    4. **Lövhə İsbat Ustası**: Təbaşir lövhəsi stili, ikipəncərəli (Qaralama analizi vs Rəsmi isbat) və lövhədə müəllimə deyiləcək sözlərin canlı skripti.
    5. **Düsturlar Kitabxanası**: Bütün orta məktəb və ali riyaziyyat limit və törəmə düsturları, canlı axtarış və nümunələr.
    6. **Özünü Yoxla**: İnteraktiv sınaq testi və izahlı nəticələr.

---

## [1.18.0] — 2026-09-30

### ADİAK 44 Rəsmi Sərbəst İş Mövzusunun Dəqiqləşdirilməsi və Mövzu №23 PowerPoint Təqdimatı
- **KOICA LMS #4933 (`Sərbəst işlərin mövzuları.pdf`) Hərfbəhərf Uyğunlaşdırma**:
  - [`src/data/courseMaterialsData.ts`](./src/data/courseMaterialsData.ts) daxilində `koica_aze_4933` materialının 44 mövzusu Müəl. Nərminə İsayevanın rəsmi PDF faylındakı dəqiq nömrələmə ilə (xüsusilə **Mövzu №23: «Elektron sənəd dövriyyəsinin tətbiqi, bu növ sənədlərin hazırlanması və icra qaydaları»**) yeniləndi.
- **Mövzu №23 Üzrə Təbii Tələbə PowerPoint (`.pptx`) Təqdimatı (`Elcan_Seferli_6326A2_Serbest_Is.pptx`)**:
  - İlk slaydda yalnız **Azərbaycan Texniki Universiteti**, mövzunun adı, **Tələbə: Səfərli Elcan** və **Qrup: 6326A2** yerləşdirilməklə 10 slaydlıq sadə, səliqəli və təbii tələbə təqdimatı hazırlandı.
  - Balanslı görünüş üçün 10 slayddan **5-nə** (**Slayd 2, 5, 7, 8, 9**) mövzuya uyğun təbii ofis fotoşəkilləri və praktiki sxem/nümunə təsvirləri əlavə olundu.

---

## [1.17.0] — 2026-09-30

### KOICA LMS Canlı Yeniləmə: ADİAK 22 Təqdimat PDF-i + Sərbəst İş (#1274), XDİAK (#5277 · 60 saat) və Fizika Lab Müəllimi
- **ADİAK (`5042` — `Üf-71706y`)**:
  - Müəl. Nərminə İsayevanın dünən axşam (`2026-09-29`) KOICA LMS-ə yüklədiyi **22 yeni rəsmi təqdimat PDF-i (`#9701`–`#9724` · `Məşğələ 1.pdf` – `Məşğələ 23.pdf`)** KOICA-dan çəkilərək Cloudflare R2-yə (`aztu/aze/mesgele-01.pdf` .. `mesgele-23.pdf`) yükləndi və [`courseMaterialsData.ts`](./src/data/courseMaterialsData.ts) daxilinə qaydaları ilə birlikdə əlavə edildi.
  - KOICA LMS-də açılmış ilk rəsmi tapşırıq — **Sərbəst iş (`#1274`, son tarix: `15.12.2026`, 10 bal)** [`courseMaterialsData.ts`](./src/data/courseMaterialsData.ts) (`BUILT_IN_DEADLINES`) və [`mockData.ts`](./src/data/mockData.ts) (`ASSIGNMENTS`) daxilinə əlavə olundu.
- **XDİAK — İngilis dili (`5277` — `itt (26) -e 4_üf-71801y(e)`)**:
  - Fənn rəsmi olaraq KOICA LMS-ə əlavə edildiyi üçün fənn kodu `Üf-71801y(e)`, dərs yükü **60 saat (həftədə 4 saat, 30 dərs, maksimum 7 qaib haqqı)** və Müəl. Dilarə Həmidovanın **15 rəsmi məşğələ mövzusu** (`Unit 1 A–E` .. `Unit 5 A–E` + `Literature Insights 1–3`) [`academicTracker.ts`](./src/services/academicTracker.ts), [`mockData.ts`](./src/data/mockData.ts) və [`courseMaterialsData.ts`](./src/data/courseMaterialsData.ts) fayllarına sinxronlaşdırıldı.
- **Fizika (`5038` — `İf-20403y`) və Davamiyyət Yeniləməsi**:
  - KOICA LMS-də təyin edilmiş laboratoriya müəllimi **Müəl. Səyyarə Sadıqova (`Qrup #5155`)** və bütün fənlər üzrə yeni iştirak sayları (`Riyazi analiz: 5/38`, `ADİAK: 4/23`, `Proqramlaşdırma: 3/38`, `Xətti cəbr: 2/23`, `Fizika: 1/15`, `XDİAK: 0/30` — hamısı `0 qaib`, `100%`, `10 bal`) yeniləndi.
- **Giriş və Sessiya Bərpası (`AuthContext.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `DatabaseContext.tsx`)**:
  - Canlı bazada `auth_user_id` SQL miqrasiyası hələ tətbiq edilmədiyi üçün yarımçıq qalmış `18491e1` Auth dəyişikliyi aktiv işlək `profiles` + Google GIS + E-poçt/Şifrə (`localStorage` + Supabase `profiles`) axınına qaytarıldı; `elcanseferli09@gmail.com` hesabı üçün həm Google ilə birbaşa giriş, həm də e-poçt/şifrə ilə giriş aktivləşdirildi.

---

## [1.16.0] — 2026-09-28 (canlı keçid gözləyir)

### Giriş və qrup məlumatlarının serverdə qorunması, ilkin paketin kiçildilməsi
- Brauzer `localStorage` hesabı və sessiyası giriş mənbəyi olmaqdan çıxarıldı. E-poçt girişi Supabase Auth ilə, Google girişi isə Supabase-in yoxladığı ID tokenlə işləyir; əl ilə Google e-poçtu/adı yazılan yol silindi.
- `api/auth.ts` əlavə edildi: qrup kodu, təsdiqli e-poçt siyahısı və 30 nəfərlik kvota serverdə yoxlanır. Yeni parol hesabı e-poçt təsdiqindən sonra, köhnə profil isə həmin ünvanın doğrulanmış sahibi tərəfindən bağlanır; zəif köhnə heş giriş üçün qəbul edilmir.
- SQL miqrasiyası üzvlük/sahiblik RLS qaydaları, `auth_user_id` əlaqəsi, paralel qeydiyyat üçün seriallaşdırılmış kvota triggeri, köhnə parol heşi sütununun klientdən gizlədilməsi və özəl material faylları üçün Storage qaydaları yaradır. Müzakirə mövzusu yalnız mövcud paylaşımın deterministik ID-si ilə yaradıla bilər; qəbul edilmiş qeyd düzəlişini yalnız qeyd sahibi yaza bilər.
- Canlı sxemdə aşkar edilən `on_auth_user_created` trigger-i hər Auth hesabına avtomatik profil yaradırdı; miqrasiya onu ləğv edir ki, qrup kodu, təsdiqli e-poçt siyahısı və 30 nəfərlik yoxlama yalnız server üzvlük axınında işləsin.
- AI mühazirə API-si doğrulanmış qrup sessiyası tələb edir. `DatabaseContext` girişdən əvvəl bulud məlumatını oxumur və rədd edilmiş oxunuşu uğurlu saymır.
- Özəl Storage üçün yaradılan müddətli keçid bitəndə materialın yolu yenidən müəyyənləşdirilib yeni keçid alınır; bulud silinməsi rədd ediləndə material yerli görünüşdən silinmiş kimi göstərilmir.
- Səhifə və iş sahəsi bölmələri dinamik yüklənir: əsas JS paketi yerli build-də ~961 KB-dan ~447 KB-a düşdü.
- **Canlı tətbiq hələ köhnə versiyadadır:** SQL miqrasiyası və canlı RLS/Storage testləri bitməyib. Kod yalnız miqrasiya və server sazlamaları ilə birlikdə yerləşdirilməlidir.
- **Canlı keçid hazırlığı:** AzTU layihəsinə idarəetmə bağlantısı quruldu. İstifadəçinin göstərişinə əsasən profil şəkli olan `Elcan Seferli` profili saxlanıldı; digər 4 profil və onlara bağlı 3 köhnə Auth hesabı silindi, saxlanılan profil yenidən təsdiqləndi. Vercel Production-a `AZTU_GROUP_SECURITY_CODE` və yalnız saxlanılan e-poçtu ehtiva edən `AZTU_ALLOWED_EMAILS` əlavə edildi. İstifadəçinin sonrakı açıq göstərişi ilə paylaşılmış legacy `service_role` açarı müvəqqəti `SUPABASE_SECRET_KEY` dəyişəninə əlavə edildi; yeni `sb_secret_...` açarı ilə əvəz edilib köhnəsi deaktiv edilməlidir. Google provider, SQL miqrasiyası və canlı yoxlamalar hələ gözləyir.
- **Canlı kiçik təhlükəsizlik düzəlişi:** `20260928173419_legacy_rpc_hardening.sql` tətbiq edildi. `handle_new_user()` və `rls_auto_enable()` funksiyalarının `anon` və `authenticated` üçün birbaşa `EXECUTE` icazəsi ləğv olundu. İcazə sorğusu və Supabase təhlükəsizlik yoxlayıcısı bunu təsdiqlədi; köhnə Auth trigger-i hələ aktivdir və əsas keçidi gözləyir.

---

## [1.15.0] — 2026-09-28

### 0-dan Öyrədən Universitet Bələdçisi (`StudyNoteCard`), KOICA LMS Canlı Sinxronizasiyası və 33 Cloudflare R2 PDF İnteqrasiyası
- **Yeni Komponent (`StudyNoteCard.tsx` & `StudyNoteCard.css`)**: Mövzunu ilk dəfə görən 1-ci kurs tələbəsi üçün 7 bloklu pedaqoji kart sistemi yaradıldı:
  1. 💡 **Sadə dillə məntiq (0-dan izah — bu nədir və niyə lazımdır?)** (`intuition`)
  2. 📘 **Əsas Nəzəriyyə və Qayda** (`body`)
  3. 📐 **Əsas Düstur / Qayda / Sintaksis** (`formulaOrCode`)
  4. 🔤 **Düsturdakı Hərflərin və İşarələrin Mənası** (`symbols` — ikisütunlu simvol lüğəti)
  5. 🪜 **Məsələni Addım-Addım Necə Həll Edirik?** (`steps` — nömrələnmiş həll alqoritmi)
  6. ✏️ **Sıfırdan Həll Olunmuş Nümunə (Rəqəmlərlə / Kodla)** (`example`)
  7. ⚠️ **İmtahanda və Kollokviumda Diqqət Et!** (`warning`)
- **Bütün 6 Fənn Üzrə 0-dan İzahlı Qaydalar ([`courseMaterialsData.ts`](./src/data/courseMaterialsData.ts), [`mathLessons.ts`](./src/data/mathLessons.ts), [`physicsContent.ts`](./src/data/physicsContent.ts))**:
  - **Riyazi analiz - 1**: Həm 8 interaktiv mühazirə (`MathLearningView.tsx`), həm də M1–M15 konspektləri (`∈`/`⊆`, `∀`/`∃`, `sup`/`inf`, `ε–N` və `ε–δ` limitləri, I/II görkəmli limitlər, ekvivalent sonsuz kiçilənlər cədvəli, I/II növ kəsilmə, törəmə, Leybnis, Lopital, Makloren, inteqral) sıfırdan izahlarla yeniləndi.
  - **Fizika**: Köhnə sıx 18-hissəli akkordeon ləğv edildi; 8 mühazirə və 8 laboratoriya işi (`PhysicsLearningView.tsx`) 0-dan öyrədən `StudyNotesList` kartları, düstur lüğəti və rəqəmlərlə həll nümunələri ilə əvəzləndi.
  - **Xətti cəbr və analitik həndəsə**: Determinantlar, Sarrus və Laplas üsulları, tərs matris, Qauss və Kramer üsulları, matrisin ranqı, məxsusi ədədlər (`det(A − λI) = 0`), vektor hasilləri, düz xətt/müstəvi və ikitərtibli əyrilər 0-dan rəqəmlərlə həll olundu.
  - **Proqramlaşdırmanın əsasları-1**: Oqtay Ələkbərovun C/C++ dərsliyi və Fizuli Əzimovun M1–M15 Python təqdimatları 0-dan izahlı kod nümunələri ilə yazıldı.
  - **ADİAK və XDİAK**: Funksional üslublar, rəsmi-işgüzar sənəd şablonları (Ərizə, CV, Akt, Protokol), akademik yazı və B1–B2 İngilis dili qrammatika qaydaları 0-dan cədvəllərlə tərtib olundu.
- **KOICA LMS (`api-lms.aztu.edu.az`) Dəqiq Məlumatları və Cloudflare R2 PDF Bazası (33 PDF)**:
  - KOICA LMS-dəki bütün rəsmi PPTX/DOCX/PDF faylları PDF-ə çevrilərək Cloudflare R2 (`https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/...`) üzərinə yükləndi; xarici LMS düymələri yığışdırılaraq bütün faylların birbaşa saytın öz daxilində (`PhysicsPdfViewer`) açılması təmin edildi.
  - Saxta deadline-lar silindi (`BUILT_IN_DEADLINES = []`), rəsmi müəllim adları (`Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı` — Riyazi analiz-1, `Dos. Rəna Əmirova / Müəl. Çingiz Ələkbərov` — Xətti cəbr, `Müəl. Dilarə Həmidova` — XDİAK), sillabuslar və 100% davamiyyət (0 qaib) göstəriciləri KOICA LMS ilə tam uyğunlaşdırıldı.
- `npm run build` uğurla tamamlandı (0 xəta).

---

## [1.14.0] — 2026-09-26

### 6326A2 Qaib Limit, Giriş Balı və 30 ECTS GPA Kalkulyatoru + Rəsmi Materiallar Bazası
- **Yeni Modul (`/app/calculator`)**: [`CalculatorView.tsx`](./src/components/app/views/CalculatorView.tsx), [`CalculatorView.css`](./src/components/app/views/CalculatorView.css) və [`academicTracker.ts`](./src/services/academicTracker.ts) yaradıldı.
- **Rəsmi 30 ECTS Kredit, KOICA Saatları və Forma-1 / Forma-2 Düsturu**: 6 fənnin kreditləri və KOICA/LMS-dəki rəsmi saatları sabitləndi (`Proqramlaşdırma-1: 8 kr / 75 saat`, `Riyazi analiz-1: 7 kr / 75 saat`, `Xətti cəbr: 4 kr / 45 saat`, `ADİAK: 4 kr / 45 saat`, `XDİAK: 4 kr / 45 saat`, `Fizika: 3 kr / 30 saat` = 30 kredit, 315 akademik saat).
- **25% Qaib Həddi İzləyicisi (Saat Seçimisiz, Avtomatik)**: Hər fənnin öz rəsmi saatına görə maksimum qaib limiti (`75 saat → max 9 qaib`, `45 saat → max 5 qaib`, `30 saat → max 3 qaib`), qalan qaib haqqı və 10 ballıq şkala üzrə davamiyyət balı avtomatik hesablanır.
- **Rəsmi Materiallar və PDF Baza ([`courseMaterialsData.ts`](./src/data/courseMaterialsData.ts))**: Fizika üzrə **11 rəsmi mühazirə və laboratoriya PDF-i** + Proqramlaşdırma-1, Riyazi analiz-1, Xətti cəbr, ADİAK və XDİAK üzrə konspekt, düstur və kod paketləri (cəmi **16 rəsmi resurs** və **5 semestr tapşırığı/kollokviumu**) birbaşa bazaya daxil edildi. [`MaterialsView.tsx`](./src/components/app/views/MaterialsView.tsx) və [`CourseShellView.tsx`](./src/components/app/CourseShellView.tsx) daxilində səhifədən çıxmadan PDF və konspekt oxumaq üçün **"Oxu"** paneli əlavə olundu.
- **Mənasız Bölmələrin Təmizlənməsi**: İstifadə olunmayan `Su simulyasiyası` (`/app/water`), `Qrup qeydləri`, `Sual-Cavab` və `Sorğular` bölmələri yığışdırıldı.
- `npm run build` uğurla tamamlandı (0 xəta).

---

## [1.13.0] — 2026-09-23

### Fizika dərslərinin PDF-siz oxunması
- Dörd müəllim təqdimatı mövzu-mövzu yenidən tutuşduruldu; ilk dörd mühazirəyə Nyuton məsələləri, toqquşmalar, fırlanma və enerji, qaz prosesləri və real qaz, dielektrik və kondensator, qaz boşalması, vakuum cərəyanı, qarşılıqlı induksiya və digər çatışmayan anlayışlar üzrə geniş mətn və düsturlar əlavə edildi.
- Müəllim təqdimatı hələ verilməyən 5–8-ci LMS mövzuları üçün müstəqil öyrənmə mətni hazırlandı; sayt bunun müəllim materialı olmadığını açıq göstərir.
- Verilən 2–7-ci laboratoriya və əlavə nixrom təlimatı üçün nəzəri əsas, konkret ölçmə ardıcıllığı və nəticə hesablamaları yazıldı. 1-ci laboratoriyanın təlimatı olmadığı açıq qalır.
- Dərs mətni və laboratoriya hesablamaları PDF keçidindən əvvəl göstərilir; PDF istəyə görə əlavə mənbə kimi açılır.
- `npm run build` uğurla tamamlandı.

---

## [1.12.0] — 2026-09-23

### Fizika təqdimatlarının PDF-ləri və geniş konspektlər
- Verilən 4 müəllim təqdimatı və 7 laboratoriya təlimatı PDF-ə çevrilərək Novcept-in mövcud Cloudflare R2 bucket-inə `aztu/physics/` altında yükləndi və fizika mövzularına bağlandı. 1-ci LMS laboratoriyası üçün sənəd verilmədiyindən PDF göstərilmir; nixrom işi əlavə fayl kimi qalır.
- Birinci mühazirənin konspekti inersial sistem, Nyuton qanunları, qüvvələr, impuls, fırlanma kəmiyyətləri, qüvvə və ətalət momenti, impuls momenti, iş, enerji və saxlanma qanunu üzrə 10 geniş hissəyə bölündü. Digər 3 müəllim təqdimatı da mövzu planına uyğun genişləndirildi.
- Hissələr açılıb bağlanan oxu görünüşündədir; PDF-lər mövzu və laboratoriya daxilində oxunur, ayrıca pəncərədə açmaq seçimi də var. Təqdimatdakı impuls momenti düsturunun mətn xətası konspektdə düzgün ifadə ilə göstərilir.
- PDF səhifə sayları və nümunə səhifələr vizual yoxlandı; `npm run build` və `npm run lint` ilə kod yoxlandı.
- Daxili brauzerdə PDF iframe-i qara göründüyü üçün açılan panel PDF.js oxuyucusuna keçirildi; səhifə keçidləri və ayrıca açmaq keçidi əlavə olundu.

---

## [1.11.1] — 2026-09-23

### Fizika səhifəsinin sadələşdirilməsi
- Fizika səhifəsində təkrarlanan fənn başlığı və məlumat blokları yığışdırıldı; ilkin görünüşdə yalnız mühazirə və laboratoriya seçimi göstərilir.
- Qrup materialları, qeydlər, tapşırıqlar və suallar bir “Qrup” bölməsində toplandı. Fənn məlumatları ayrıca qısa görünüşə keçirildi.
- Mövzu və laboratoriya siyahılarındakı uzun alt mətnlər çıxarıldı. Dərs daxilində müəllim izahı önə çəkildi; tam plan, əlavə təlimat və mənbə qeydləri istəyə görə açılır.
- Bütün iş sahəsində sol menyunun ikincil resursları “Qrup və alətlər” açılan bölməsinə yığıldı; fənn kodları menyu siyahısından çıxarıldı.
- `npm run build` və `npm run lint` uğurludur (lintdə əvvəlki əlaqəsiz xəbərdarlıqlar qalır).

---

## [1.11.0] — 2026-09-23

### Fizika mövzuları və müəllim materialları
- Fizika portalı LMS-in cari 8 mühazirə mövzusu və 7 laboratoriya işi ilə açılır; hər bir mövzu ayrıca seçilir.
- Verilən 4 müəllim təqdimatından mövzuya uyğun qısa izahlar, əsas anlayışlar və özünü yoxlama sualları hazırlandı. Təqdimatı verilməyən mövzularda yalnız LMS planı göstərilir.
- Verilən 6 uyğun laboratoriya təlimatından məqsəd, avadanlıq, iş ardıcıllığı və hesabat göstəriciləri çıxarıldı. Birinci laboratoriyanın ayrıca təlimatının olmadığı açıq göstərilir; verilən əlavə nixrom təlimatı LMS siyahısından kənarda ayrıca göstərilir.
- Elektrostatika təqdimatının nömrəsi ilə LMS mövzu nömrəsi arasındakı fərq izah edilir. Fizika üçün uydurma 15 həftəlik plan, köhnə laboratoriya tapşırığı, tarix və müəllim qeydi çıxarıldı.
- LMS məlumatına uyğun fizika kredit sayı 3 və fənn qrupu identifikatoru `İF-20403y` kimi yeniləndi.
- `npm run build` və `npm run lint` ilə yoxlandı.

---

## [1.10.1] — 2026-09-23

### Riyazi analiz dərslərinin rahat seçimi
- Riyazi analiz portalı açılan kimi nömrələnmiş mühazirə siyahısı göstərilir; hər yeni mövzu siyahıya ayrıca dərs kimi əlavə oluna bilər.
- Hər mühazirədə qaydalar, praktika, mövzuya uyğun laboratoriya və AI köməkçi ayrı, aydın bölmələrdə yerləşdirildi.
- Mühazirələrə geri və növbəti dərsə keçid əlavə olundu. Bölmə dəyişəndə səhifə həmin bölmənin əvvəlinə gətirilir, yarımçıq test cavabları itmir.
- Riyazi analizdə ayrıca laboratoriya və təsdiqlənməmiş 15 həftəlik plan naviqasiyadan çıxarıldı; digər fənnlərin planı saxlanıldı.
- Masaüstü və mobil ölçülərdə dərs seçimi və mövzuya uyğun laboratoriyalar yoxlandı; `npm run build` uğurludur.

---

## [1.10.0] — 2026-09-23

### Riyazi analiz mühazirələri və interaktiv öyrənmə
- Tələbənin bildirdiyi keçilmiş mövzular əsasında çoxluqlar və məntiq, həqiqi ədədlər, sup/inf haqqında üç universitet səviyyəli mühazirə xülasəsi əlavə edildi. Bunlar müəllimin rəsmi konspekti kimi təqdim edilmir.
- Hər mühazirədə qaydalar, işlənmiş nümunə, altı cavabı izahlı sual və yazılı isbat məşqi var; ən yaxşı test nəticəsi həmin tələbənin brauzerində saxlanır.
- Çoxluq əməliyyatları, dəqiq sərhədlər və ε-qonşuluğu üçün üç interaktiv riyaziyyat laboratoriyası əlavə edildi.
- Hər mühazirənin altında mövzu ilə məhdud AI söhbəti yaradıldı. `gemini-3.1-flash-lite` Vercel funksiyası vasitəsilə çağırılır; API açarı yalnız server mühitində saxlanır.
- Riyazi analiz üçün cari həftə planı istifadəçinin bildirdiyi mövzulara uyğunlaşdırıldı. `npm run build` həm frontend, həm API TypeScript yoxlamasını əhatə edir.
- Vercel-in ayrıca API kompilyasiyası üçün modul importu və server mühiti tipi uyğunlaşdırıldı; `vercel build --target production` funksiyanı da uğurla yığır.
- Gemini bağlantısında müvəqqəti server xətası və ya əlaqə kəsilməsi zamanı API bir dəfə qısa fasilədən sonra sorğunu təkrarlayır.

---

## [1.9.1] — 2026-09-23

### Qrup yoldaşları üçün paylaşım və müzakirə
- TopBar-a mobil telefonda da görünən sürətli **Paylaş** düyməsi əlavə edildi: qeyd, fayl/şəkil/link və sual axınları bir yerdən açılır.
- Ümumi axtarış qeydlər, materiallar və suallar üzrə işləyir; növə görə filtr, `Ctrl/Cmd+K`, saxlanmış paylaşımlar və nəticəyə keçid var.
- Qeyd və materialların altında mövzuya bağlı müzakirə əlavə edildi. Müzakirə mövcud `questions` və `answers` cədvəllərində ayrıca işarələnir.
- Qeydə düzəliş təklif etmək və qeyd müəllifinin təklifi qəbul etməsi əlavə edildi. Qəbul edilmiş mətn və ilkin mətn tarixçədə görünür.
- Qeyd, material və sualları tələbəyə məxsus brauzer yaddaşında saxlamaq mümkündür.
- Python kod bloku olan cavabı bir kliklə Sandbox-da açmaq mümkündür.
- Cavab sahəsi çoxsətirli mətn və Python kod şablonu dəstəkləyir; axtarış nəticəsinə keçid aktiv filtrləri təmizləyir.
- Link materialları üçün yalnız düzgün `http`/`https` ünvanları buluda yazılmazdan əvvəl yoxlanılır.
- Yeni material, qeyd, sual və cavab üçün yerli və bulud ID-ləri eyniləşdirildi.
- Yeni qeyd, sual, cavab və material paylaşımı bulud cavabını gözləyir; yazı alınmadıqda uğur mesajı göstərilmir. Google ilə ilk qeydiyyatda qrup kodunun avtomatik ötürülməsi dayandırıldı.
- `npm run build` uğurludur. Canlı Supabase layihəsinə giriş olmadığı üçün məxfilik qaydaları və canlı mühit ayrıca yoxlanmalıdır.

---

## [1.9.0] — 2026-09-23

### 🌊 İnteraktiv Su Simulyasiyası
- Fizika dərsi üçün `/app/water` laboratoriyası və sol menyu keçidi əlavə edildi.
- Sönümlü 2D dalğa modeli, maneələrdən əks olunma, damla və silgi alətləri yaradıldı.
- Durgun, yağış və fırtına rejimləri, fizika sürgüləri, pauza, sıfırlama və PNG ixracı əlavə edildi.
- Responsiv idarəetmə paneli, canlı FPS göstəricisi və Canvas səth işıqlandırması hazırlandı.
- Lokal brauzer yoxlamalarının `.playwright-cli/` çıxışları Git izlənməsindən çıxarıldı.

---

## [1.8.2] — 2026-09-22

### 🐼 Müəl. Şəbnəm İsgəndərli (Pandas & Data Science) və Müəl. Ayxan Həsənov (Tiplər & Əməllər) İnteqrasiyası
- **Müəllim Tələblərinin Dəqiq Əks Etdirilməsi**:
  - **Müəl. Şəbnəm İsgəndərli (Laboratoriya)**: Tələbələrə elan etdiyi **Pandas** kitabxanası (Series, DataFrame, CSV oxuma, süzgəcləmə və statistika) 13-15-ci həftələrin laboratoriya sillabusuna və Pyodide şablonlarına əlavə edildi.
  - **Müəl. Ayxan Həsənov (Seminar)**: Dünənki seminarda keçilən `int`, `float`, `str`, tip çevrilmələri (`int()`, `float()`), riyazi operatorlar (`//`, `%`, `**`) Sandbox şablonu və mühazirə qeydi olaraq rəsmiləşdirildi.
- **Pyodide WebAssembly Mühitində Avtomatik Pandas & NumPy Dəstəyi**:
  - `pythonRunner.ts` mühərriki yeniləndi: Kod daxilində `import pandas` və ya `import numpy` aşkar edildikdə, Pyodide v0.26.2 WebAssembly pre-compiled paketləri avtomatik yükləyir və dərhal icra edir.
- **Python Sandbox Şablonlarının Genişləndirilməsi**:
  - `Müəl. Ayxan Həsənov: int, float & Tiplər (Dünənki seminar)` — Terminaldan `int()` və `float()` oxuma, bütün riyazi operatorların nümayişi.
  - `Müəl. Şəbnəm İsgəndərli: Pandas, Series & DataFrame` — 6326A2 qrupunun fənn balları ilə DataFrame qurulması, `describe()`, ortalama və `[df['Orta_Bal'] >= 85]` süzgəcləməsi.
- **Müəllim Sitatları (`GROUP_REMARKS`)**:
  - Müəl. Şəbnəm İsgəndərli və Müəl. Ayxan Həsənovun aktual tövsiyələri birbaşa portala və ana səhifəyə daxil edildi.

---

## [1.8.1] — 2026-09-22

### 🐍 Kompüter Elmləri Proqramlaşdırma Fənninin Tamamilə Python 3 Əsasında Yenilənməsi
- **100% Python Tədrisinə Keçid**: AzTU Kompüter Elmləri / Kompüter Mühəndisliyi 1-ci semestr rəsmi tədris planına əsasən C++ qalıqları təmizləndi və `CS-101: Proqramlaşdırmanın əsasları-1` fənni tamamilə **Python 3** proqramına uyğunlaşdırıldı.
- **15 Həftəlik Rəsmi Python Sillabusu (`COURSE_SYLLABUS.prog`)**:
  - Həftə 1: Python sintaksisi, icra mühiti, `print()` və `input()`.
  - Həftə 2 (Cari): Dəyişənlər, əsas tiplər (`int`, `float`, `str`, `bool`), tip çevrilmələri və riyazi operatorlar. (Seminar: Müəl. Ayxan Həsənov / Lab: Müəl. Şəbnəm İsgəndərli).
  - Həftə 3: Budaqlanan alqoritmlər (`if`, `elif`, `else`), məntiqi operatorlar (`and`, `or`, `not`).
  - Həftə 4: Dövri alqoritmlər (`while`, `break`, `continue`).
  - Həftə 5: `for` dövrü, `range()`, daxili dövrlər və cəm/hasil alqoritmləri.
  - Həftə 6: I Kollokvium və Sətirlər (`str`) nəzəriyyəsi.
  - Həftə 7: Sətirlərlə iş (indeksləmə, slicing, sətir metodları və f-string).
  - Həftə 8: Siyahılar (`list`, append, extend, insert, pop, remove).
  - Həftə 9: Siyahı alqoritmləri (xətti axtarış, min/max, Bubble sort, sort).
  - Həftə 10: Kortejlər (`tuple`) və Çoxluqlar (`set`).
  - Həftə 11: II Kollokvium və Lüğətlər (`dict`, key-value cütlükləri, metodlar).
  - Həftə 12: İstifadəçi funksiyaları (`def`, `*args`, `**kwargs`, `return`, `scope`).
  - Həftə 13: Fayllarla iş və Pandas kitabxanasına giriş (Series və DataFrame strukturları).
  - Həftə 14: III Kollokvium və Pandas ilə verilənlərin oxunması (`read_csv`), cədvəllərin təhlili.
  - Həftə 15: Pandas statistik təhlil layihəsi, istisnaların idarəsi (`try-except`) və Semestr Yekun İmtahana Hazırlıq.
- **Python Sandbox üçün AzTU CS-101 Laboratoriya Şablonları**:
  - `PythonSandboxView.tsx` studiyasına laboratoriya işlərini bir kliklə redaktora yükləyən şablon seçicisi inteqrasiya edildi.
- **Tapşırıqlar, Sorğular və Qeydlərin Uyğunlaşdırılması**:
  - `ASSIGNMENTS`: `Laboratoriya işi №1: Python Budaqlanma (if/elif/else)`
  - `GROUP_POLL`: `Python laboratoriyalarını hansı mühitdə yazaq?` (VS Code, PyCharm, Jupyter)
  - `GROUP_REMARKS`: Dos. Fizuli Əzimov, Müəl. Şəbnəm İsgəndərli və Müəl. Ayxan Həsənovun tövsiyələri.

---

## [1.8.0] — 2026-09-22

### 🎓 AzTU 6326A2 Rəsmi Dərs Cədvəli, Real Müəllimlər və 15 Həftəlik İmtahan Yol Xəritəsi
- **Bütün Saxta və Yeritutucu Müəllim Adlarının Əvəzlənməsi**: Tələbənin təqdim etdiyi rəsmi universitet cədvəli şəkli piksel-piksel oxundu və deşifrə edildi. Platformadakı bütün 6 fənn, kafedralar, kreditlər, müəllim heyəti və auditoriyalar 100% real məlumatlarla əvəz olundu.
- **Rəsmi 6 Fənn və Müəllim Heyəti**:
  - **Riyazi analiz-1** (`MATH-101`, 6 kredit, Ali Riyaziyyat kafedrası):
    - *Mühazirə*: Dos. Nizami Şıxəliyev (Bazar ertəsi 12:00 Aud. 1-506, Çərşənbə axşamı 12:00 Aud. 6-408)
    - *Seminar*: Müəl. Şamil Talıblı (Cümə 12:00 Aud. 6-408)
  - **Xətti cəbr** (`MATH-102`, 5 kredit, Ali Riyaziyyat kafedrası):
    - *Mühazirə*: Dos. Rəna Əmirova (Cümə axşamı 10:30 Aud. 3-308)
    - *Seminar*: Dos. Rəna Əmirova (Çərşənbə 10:30 Aud. 1-422)
  - **Fizika** (`PHYS-101`, 5 kredit, Mühəndislik fizikası və elektronika kafedrası):
    - *Mühazirə*: Dos. Sürəyya Məmmədova (Çərşənbə axşamı 12:00 Aud. 5-312)
    - *Laboratoriya*: Dos. Sürəyya Məmmədova (Bazar ertəsi 09:00 Aud. 5-205)
  - **Proqramlaşdırmanın əsasları-1** (`CS-101`, 6 kredit, Kompüter Mühəndisliyi kafedrası):
    - *Mühazirə*: Dos. Fizuli Əzimov (Çərşənbə 12:00 Aud. 6-408)
    - *Laboratoriya*: Müəl. Şəbnəm İsgəndərli (Çərşənbə axşamı 10:30 Aud. 6-504)
    - *Seminar*: Müəl. Ayxan Həsənov (Bazar ertəsi 09:00 Aud. 6-508)
  - **Xarici dildə işgüzar və akademik kommunikasiya -1** (`ENG-101`, 4 kredit, Xarici dillər kafedrası):
    - *Seminar*: Müəl. Dilarə Həmidova (Bazar ertəsi 10:30 Aud. 6-506, Cümə 10:30 Aud. 6-506)
  - **Azərbaycan dilində işgüzar və akademik kommunikasiya** (`AZE-101`, 4 kredit, Azərbaycan dili kafedrası):
    - *Mühazirə / Seminar*: Müəl. Nərmin İsayeva (Çərşənbə 10:30 Aud. 1-422, Cümə axşamı 12:00 Aud. 6-512)
- **Semestr İrəliləyişi və Qış İmtahan Hədəfi (Semester Tracker)**:
  - 15 Sentyabr 2026 dərslərin başlanğıcı və 22 Sentyabr 2026 (Çərşənbə axşamı — 2-ci Həftə, 2-ci Gün) dəqiq təqvim hesablama modeli quruldu.
  - 15 həftəlik tərəqqi şkalası (Hazırda: 13.3% tamamlanıb) və imtahan sessiyasına (5 Yanvar 2027) 105 günlük canlı geri sayım əlavə edildi.
  - 3 Əsas Kollokvium Mərhələsi xəritələndi:
    - *I Kollokvium*: 6-cı həftə (20–24 Oktyabr 2026) — 1–5-ci mövzular
    - *II Kollokvium*: 11-ci həftə (24–28 Noyabr 2026) — 6–10-cu mövzular
    - *III Kollokvium / Yekun Hesabat*: 14-cü həftə (15–19 Dekabr 2026) — 11–15-ci mövzular
- **İnteraktiv Həftəlik Dərs Cədvəli Vidceti (`DashboardView.tsx`)**:
  - Həftənin 5 günü (B.e., Ç.a., Çərş., C.a., Cümə) üçün interaktiv tablar yaradıldı; cari gün (Çərşənbə axşamı) "Bugün" işarəsi ilə avtomatik seçilir.
  - Dərs saatları (09:00 - 10:20, 10:30 - 11:50, 12:00 - 13:20), dərs növü vizual nişanları (`M`, `S`, `L`), fənn adı, tədris edən müəllim, yarımqrup məlumatı və auditoriya nömrəsi nümayiş olunur.
- **Fənn Portallarında 15 Həftəlik Tədris Proqramı və Auditoriyalar (`CourseShellView.tsx`)**:
  - Hər fənn üçün xüsusi həftəlik dərs qrafiki və auditoriyalar kartı əlavə edildi.
  - Yeni "15 Həftəlik Plan" tabı və hər fənn üçün həftəbəhəftə mövzular, kollokviumlar və imtahan hazırlıq planı inteqrasiya edildi.
- **Supabase Bulud Cədvəllərinin Sinxronizasiyası**: `courses` cədvəlindəki bütün köhnə saxta sətirlər silinib rəsmi 6 fənn və müəllim məlumatları ilə yeniləndi.

---

## [1.7.0] — 2026-09-22

### 🚀 Canlı Supabase Bulud Verilənlər Bazası və Real-vaxt Sinxronizasiyası
- **Canlı PostgreSQL İnteqrasiyası**: `DatabaseContext.tsx` və `AuthContext.tsx` tamamilə canlı Supabase layihəsinə (`wcjdduxtssltkjkslyit`) bağlandı.
- **Bütün 30 Tələbə Arasında Canlı Realtime Yayım**: `supabase.channel('public:aztu_realtime_workspace')` ilə qeydlər, tapşırıqlar, sorğular, səslər və sual-cavablar hər hansı tələbə tərəfindən əlavə edildikdə digər bütün tələbələrin ekranında dərhal (səhifəni yeniləmədən) yenilənir.
- **Akademik Materiallar üçün Bulud Fayl Saxlanması (Supabase Storage)**: `materials` ictimai yaddaş qovluğu yaradıldı və RLS qaydaları aktivləşdirildi. PDF və sənədlər birbaşa buluda yüklənir və bütün tələbələr üçün bir kliklə yüklənə biləndir.
- **Verilənlər Bazası Səviyyəsində 30 Nəfərlik Sərt Limit Tətikçisi**: PostgreSQL daxilində `check_max_students_limit()` triggeri quruldu — 30-cu tələbədən sonra hər hansı kənar qeydiyyat cəhdi bazadan birbaşa xəta ilə rədd edilir.
- **Hibrid Dözümlülük (Zero-Downtime Resilience)**: İnternet kəsildikdə və ya bulud əlaqəsi zəiflədikdə sistem dərhal yerli LocalStorage / IndexedDB mexanizminə keçir və tələbənin işi dayanmır.
- **Vercel İstehsalat Əlaqəsi**: Bütün mühit dəyişənləri (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GOOGLE_CLIENT_ID`) Vercel Production serverinə tətbiq edildi.

---

## [1.6.0] — 2026-09-22

### ⚡ Supabase və Real-vaxt Əlaqəsinin Hazırlanması
- **`@supabase/supabase-js`**: Rəsmi Supabase müştəri kitabxanası layihəyə quraşdırıldı.
- **`src/services/supabase.ts`**: Bulud açarları mövcud olduqda aktivləşən, açarlar olmadıqda isə LocalStorage ilə işləməyə davam edən (Zero-downtime fallback) xidmət quruldu.
- **`supabase/schema.sql`**: Bütün 10 cədvəl (`courses`, `profiles`, `notes`, `questions`, `answers`, `polls`, `poll_options`, `poll_votes`, `materials`, `deadlines`), 30 nəfərlik sərt kvota tətikçisi (`enforce_30_students_limit`), RLS təhlükəsizlik qaydaları və Realtime yayım konfiqurasiyası yazıldı.

---

## [1.5.0] — 2026-09-22

### 📚 Tam Sənədləşmə və Qaydalar Paketi
- **AGENTS.md**: AI köməkçilər və tərtibatçılar üçün məcburi qaydalar — kodu oxumaq əvəzinə MD-ləri oxumaq, hər dəyişikliyi mütləq MD sənədlərinə yazmaq və təhlükəsizlik qanunları.
- **PROJECT_MAP.md**: Bütün faylların, komponentlərin, hook-ların və stillərin 1-ə 1 dəqiq bələdçi xəritəsi.
- **README.md**: Layihənin rəsmi təqdimatı, canlı linklər, xüsusiyyətlər və sürətli başlanğıc bələdçisi.
- **ARCHITECTURE.md**: Client-Side SPA arxitekturası, React Context vəziyyət idarəetməsi və React Portal dialoq sistemi.
- **FEATURES.md**: Platformadakı bütün 12 modulun funksional izahatı.
- **DATA_MODELS.md**: Bütün TypeScript interfeysləri, ER diaqramı və localStorage yaddaş açarları.
- **SECURITY.md**: 30 tələbəlik kvota sistemi, SHA-256 duzlanmış heşləmə və tələbə şəxsiyyətinin toxunulmazlığı.
- **DEPLOYMENT.md**: Vercel SPA rewrite konfiqurasiyası və Google Cloud Console sazlamaları.
- **CONTRIBUTING.md**: Qrup tələbələri üçün kodlaşdırma və commit standartları.

---

## [1.4.0] — 2026-09-22

### 🐛 Xəta Həlli (Bugfix)
- **React Portal İnteqrasiyası**: `Modal.tsx` və `ProfileModal.tsx` komponentləri birbaşa `document.body`-yə mount olunan `ReactDOM.createPortal` ilə yeniləndi.
- **Containing Block Probleminin Aradan Qaldırılması**: `.view-content-flow` konteynerindəki animasiya və `transform` xüsusiyyətlərinin modalları ortadakı 1080px qutuya sıxması aradan qaldırıldı.
- **Flexbox Mərkəzləmə Təhlükəsizliyi**: `Modal.css` və `ProfileModal.css` daxilində `margin: auto` tətbiq edildi; kiçik ekranlarda modal başlığının və `X` düyməsinin ekranın yuxarısından kəsilməsi (top clipping) tamamilə həll olundu.
- **Bütöv Ekran Örtüyü (Backdrop)**: Qaranlıq fon (`rgba(15, 23, 42, 0.55)` + blur) bütün pəncərəni (Sidebar və TopBar daxil olmaqla) bərabər şəkildə örtür.
- **Sabit Profil Alt Paneli**: Tələbə profili modalında "Bağla" və "Yadda saxla" düymələri pəncərənin altında daimi görünən və əlçatan şəkildə sabitləndi.

---

## [1.3.0] — 2026-09-22

### ✨ Yeni Xüsusiyyətlər
- **Tələbə Profili Modalı (`ProfileModal.tsx`)**:
  - Şəkil yükləmə (`image/*`) və Base64 saxlanması.
  - Hazır akademik emoji avatarları (👨‍💻, 👩‍💻, 🧑‍🎓, 🚀, ⚡, 🎓).
  - Google hesabı ilə daxil olduqda profil şəklinin avtomatik tətbiqi.
  - Bio/Status, Tələbə bilet nömrəsi, İxtisas, Telegram, Telefon və GitHub linklərinin idarəsi.
- **Tələbə Şəxsiyyətinin Toxunulmazlığı**:
  - Ad, Soyad və Qrup sahələri rəsmi olaraq kilidləndi (`LOCKED`). Tələbə tərəfindən saxtalaşdırıla bilməz.

---

## [1.2.0] — 2026-09-21

### 🔒 Təhlükəsizlik və Kvota
- **30 Tələbə Limiti**: Qrup tələbələrinin sayı 30-a çatdıqda qeydiyyatın avtomatik bağlanması mexanizmi quruldu.
- **Qrup Təhlükəsizlik Kodu**: Qeydiyyat və Google ilə ilk girişdə `6326A2` kodunun yoxlanılması təmin edildi.
- **SPA 404 Rewrite**: `vercel.json` faylı yaradılaraq birbaşa URL daxiletmələrində və yenilənmələrdə (F5) 404 xətası aradan qaldırıldı.

---

## [1.1.0] — 2026-09-21

### 🔑 Autentifikasiya Yenilənməsi
- **Google Identity Services (GIS)**: Rəsmi Google düyməsi və One-Tap giriş imkanı əlavə edildi (`src/services/googleAuth.ts`).
- **Test Hesablarının Təmizlənməsi**: Giriş səhifəsindəki köhnə demo qeydiyyat qutusu silindi, real tələbə qeydiyyat axını quruldu.

---

## [1.0.0] — 2026-09-21

### 🚀 İlkin Buraxılış (Initial Release)
- Əsas təqdimat səhifəsi (Landing Page) və akademik brendinq.
- Vahid iş sahəsi şeli (`AppShell.tsx`, `Sidebar.tsx`, `TopBar.tsx`).
- 4 əsas fənn üçün ixtisaslaşmış səhifələr (Riyazi analiz, Fizika, Proqramlaşdırma, İngilis dili).
- Mühazirə qeydləri zaman xətti (`NotesView.tsx`).
- Sual-Cavab forumu (`QAView.tsx`).
- Demokratik qrup sorğuları (`PollsView.tsx`).
- Akademik dərs materialları kataloqu (`MaterialsView.tsx`).
- Deadline və tapşırıq sayğacı (`DeadlinesView.tsx`).
- Brauzerdaxili Python laboratoriya mühiti (`PythonSandboxView.tsx`).
- GitHub repozitoriyası (`elcann7/aztu`) və Vercel istehsalat yerləşdirilməsi.
