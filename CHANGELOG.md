# AzTU 6326A2 — Dəyişikliklər Tarixçəsi (Changelog)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının versiya inkişafını, əlavə edilmiş funksiyaları və xəta düzəlişlərini xronoloji ardıcıllıqla qeyd edir.

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
