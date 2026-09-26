# AzTU 6326A2 — Funksional Bələdçi (Features Guide)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasındakı bütün modulların, funksiyaların və imkanların ətraflı izahını təqdim edir.

---

## 📑 Modullar Cədvəli

| Modul | Təsviri | Giriş Yolu |
| :--- | :--- | :--- |
| [1. Əsas Təqdimat](#1-əsas-təqdimat-landing-page) | Qrupun rəsmi təqdimatı və üstünlükləri | `/` |
| [2. Giriş və Qeydiyyat](#2-giriş-və-qeydiyyat-autentifikasiya) | Google və E-poçt ilə təhlükəsiz giriş | `/login`, `/register` |
| [3. Tələbə Profili](#3-tələbə-profili-və-şəxsiyyət-idarəetməsi) | Təsdiqlənmiş şəxsiyyət və fərdi məlumatlar | Modal (İstənilən səhifədə) |
| [4. Əsas İş Lövhəsi](#4-əsas-iş-lövhəsi-dashboard) | Ümumi icmal, elanlar, dərs cədvəli | `/app` |
| [5. Fənn Portalları](#5-fənn-portalları-course-shells) | 4 əsas fənnin dərsləri və sillabusları | `/app/courses/:slug` |
| [6. Qrup Qeydləri](#6-qrup-qeydləri-notes-timeline) | Müəllim qeydləri və imtahan ipucları | `/app/notes` |
| [7. Sual-Cavab Forumu](#7-sual-cavab-forumu-qa) | Akademik problemlərin birgə həlli | `/app/qa` |
| [8. Qrup Sorğuları](#8-qrup-sorğuları-polls) | Qərarlar üçün demokratik səsvermə | `/app/polls` |
| [9. Akademik Materiallar](#9-akademik-materiallar-file-browser) | Dərsliklər, laboratoriya faylları və slaydlar | `/app/materials` |
| [10. Deadline İzləyicisi](#10-deadline-izləyicisi-tapşırıqlar) | İmtahan və laboratoriya tarixləri | `/app/deadlines` |
| [11. Python Sandbox](#11-python-sandbox-laboratoriya-mühiti) | Brauzerdaxili Python redaktoru və icraçı | `/app/sandbox` |
| Riyazi analiz mühazirələri | Qaydalar, test, isbat, AI və üç interaktiv laboratoriya | `/app/courses/math-analysis` |

---

## 1. Əsas Təqdimat (Landing Page)
- **Vizual Kimlik**: AzTU brendi, 6326A2 qrup simvolikası, sakit və müasir interfeys.
- **Hero Bölməsi**: Platformanın məqsədini izah edən geniş başlıq və "İş sahəsinə daxil ol" çağırışı.
- **Məhsulun İlkin Baxışı**: Platformanın daxili görünüşünü nümayiş etdirən interaktiv maket.
- **Xüsusiyyət Dərinliyi**: Mühazirə qeydləri, deadline izləməsi və materiallar bölmələrinə dair izahlı kartlar.

---

## 2. Giriş və Qeydiyyat (Autentifikasiya)
- **Google Identity Services (GIS) İnteqrasiyası**:
  - Rəsmi Google düyməsi və One-Tap qeydiyyat.
  - Tələbənin Google profilindəki ad, soyad və profil şəkli avtomatik oxunur.
- **E-poçt və Şifrə ilə Giriş**:
  - Universitet e-poçt ünvanı (`ad.soyad@aztu.edu.az`).
  - Web Crypto SHA-256 və duzlama (salting) ilə təhlükəsiz saxlanma.
- **Qrup Təhlükəsizlik Kodu (`6326A2`)**:
  - Hesab yaradarkən və ya Google ilə ilk dəfə daxil olarkən qrup kodu tələb edilir. Kənar şəxslərin qeydiyyatı bloklanır.
- **30 Tələbə Limiti**:
  - Sistemdə yalnız qrupun 30 tələbəsi üçün yer ayrılıb. Limit dolduqdan sonra qeydiyyat avtomatik deaktiv olunur.

---

## 3. Tələbə Profili və Şəxsiyyət İdarəetməsi
- **Dəyişdirilməz Tələbə İdentikliyi (LOCKED)**:
  - **Ad və Soyad**: Universitet qeydiyyatı ilə təsdiqlənir, tələbə tərəfindən saxtalaşdırıla bilməz.
  - **Qrup**: Həmişə `6326A2` olaraq kilidlənir.
  - **E-poçt**: Qeydiyyat e-poçtu rəsmi şəkildə qorunur.
- **Fərdi Məlumatlar (Dəyişdirilə bilən)**:
  - **Profil Şəkli**: Kompüterdən şəkil yükləmə (`image/*`), şəkli silmə və ya hazır akademik emojilərdən (👨‍💻, 👩‍💻, 🧑‍🎓, 🚀, ⚡, 🎓) avatar seçimi.
  - **Google Şəkli**: Google ilə daxil olduqda profil şəkli avtomatik sinxronlaşır.
  - **Tələbə Bilet Nömrəsi**: Tələbə kartının nömrəsi.
  - **İxtisas**: "Kompüter Mühəndisliyi" və s.
  - **Bio / Status**: Tələbənin qısa fəaliyyət qeydi.
  - **Əlaqə Məlumatları**: Telegram istifadəçi adı, telefon nömrəsi və GitHub profili.
- **Sabit Alt Panel**: Ekran hündürlüyündən asılı olmayaraq "Bağla" və "Yadda saxla" düymələri həmişə görünür və əlçatandır.

---

## 4. Əsas İş Lövhəsi (Dashboard)
- **Tələbəyə Fərdi Salamlama**: Giriş etmiş tələbənin adı və qrup məlumatı (6326A2 · Kompüter Mühəndisliyi).
- **Semestr İrəliləyişi və Qış İmtahan Hədəfi (Semester Tracker)**:
  - Dərslərin başlanğıcı (15 Sentyabr 2026) və cari tədris statusu (2-ci həftə, 2-ci gün).
  - 15 həftəlik tərəqqi şkalası (13.3% tamamlanıb).
  - İmtahan sessiyasına (5 Yanvar 2027) 105 günlük canlı geri sayım.
  - 3 Əsas Kollokvium Mərhələsi: I Kollokvium (Həftə 6: 20-24 Okt), II Kollokvium (Həftə 11: 24-28 Noy), III Kollokvium / Yekun (Həftə 14: 15-19 Dek).
- **İnteraktiv Həftəlik Dərs Cədvəli (Auditoriyalar və Dərslər)**:
  - 5 günlük tablar (Bazar ertəsi, Çərşənbə axşamı, Çərşənbə, Cümə axşamı, Cümə).
  - Cari gün (Çərşənbə axşamı) "Bugün" nişanı ilə avtomatik seçilir.
  - Dərs vaxtı (09:00 - 10:20, 10:30 - 11:50, 12:00 - 13:20), dərs növü nişanı (`M` Mühazirə, `S` Seminar, `L` Laboratoriya), fənn adı, tədris edən rəsmi müəllim, yarımqrup məlumatı və auditoriya nömrəsi (Aud. 6-504, 1-506, 6-408, 5-205, 5-312 və s.).
  - Birbaşa fənn səhifəsinə keçid düyməsi.
- **Akademik Fənlər Şəbəkəsi**: 6 fənnin hər biri üçün kredit, müəllim, material və tapşırıq sayğacları.
- **Bento İş Mühiti Paneli**:
  - Yaxınlaşan təcili deadline-lar.
  - Son qrup qeydləri ("Müəllim dedi", "İmtahan/Kollokvium", "Seminar").
  - Canlı qrup sorğusu və səsvermə faizləri.
  - Sual-Cavab forumu və qəbul edilmiş cavablar.
  - Son paylaşılan fayllar və endirmə imkanı.

---

## 5. Fənn Portalları (Course Shells)
Platforma 6 rəsmi universitet fənni üçün tam ixtisaslaşmış iş sahələrinə malikdir:
1. **Riyazi analiz-1 (`MATH-101`)** — 6 kredit (Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı)
2. **Xətti cəbr (`MATH-102`)** — 5 kredit (Dos. Rəna Əmirova)
3. **Fizika (`İF-20403y`)** — LMS-də 3 kredit, 30 saat (mühazirə müəllimi Sürəyya Məmmədova)
4. **Proqramlaşdırmanın əsasları-1 (`CS-101`)** — 6 kredit (Dos. Fizuli Əzimov / Müəl. Şəbnəm İsgəndərli / Müəl. Ayxan Həsənov)
5. **Xarici dildə işgüzar və akademik kommunikasiya -1 (`ENG-101`)** — 4 kredit (Müəl. Dilarə Həmidova)
6. **Azərbaycan dilində işgüzar və akademik kommunikasiya (`AZE-101`)** — 4 kredit (Müəl. Nərmin İsayeva)

Hər bir fənn portalında:
- Fənnin kodu, kredit sayı, kafedrası və rəsmi müəllim heyəti.
- **Fənn Dərs Cədvəli və Auditoriyalar**: Dərsin keçirildiyi günlər, saatlar, növü və otaqlar.
- **15 Həftəlik Tədris Proqramı və Sillabus**: Hər həftənin konkret mövzusu, tarixləri, kollokviumlar və imtahan hədəfləri.
- **Materiallar**: Mühazirə slaydları, kitablar və fayllar (Supabase Storage).
- **Qrup Qeydləri**: Fənnə aid müəllim tövsiyələri və qeydlər.
- **Tapşırıqlar**: Fənn üzrə laboratoriya və ev tapşırıqlarının izlənməsi.
- **Sual-Cavab**: Tələbələr arasında sual mübadiləsi.

---

## 6. Qrup Qeydləri (Notes Timeline)
- **Mühazirə İpucları**: Dərs zamanı müəllimin şifahi dediyi, slayd və kitablarda olmayan vacib məqamlar.
- **Kateqoriyalar**:
  - *Müəllim dedi* (Dərsdə xüsusi vurğulanan).
  - *İmtahan / Kollokvium* (İmtahana düşəcək sual tipləri).
  - *Seminar* (Seminar balları və tələblər).
  - *Ümumi* (Digər qeydlər).
- **Ağıllı Tarix Qruplaşması**:
  - `BUGÜN`
  - `DÜNƏN`
  - Tarix formatı (məsələn, `22 SENTYABR 2026`).
- **Müəllif Hüququ**: Yalnız qeydi paylaşan tələbə öz qeydini silə bilər.

---

## 7. Sual-Cavab Forumu (Q&A)
- Tələbələrin dərs tapşırıqları, kod xətaları və laboratoriyalarla bağlı sual açması.
- Cavab yazma və kod fraqmentləri paylaşma.
- **"Həll edildi" Nişanı**: Ən doğru cavab müəllif tərəfindən düzgün həll kimi işarələnir.
- **Upvote Sistemi**: Faydalı sual və cavabların səs qazanaraq önə çıxması.
- Fənnə və açar sözlərə görə axtarış.

---

## 8. Qrup Sorğuları (Polls)
- Qrup nümayəndəsi və ya tələbələr tərəfindən sorğu yaradılması.
- Çoxsaylı cavab variantları.
- Bir tələbənin tək səs hüququ (təkrar səsvermənin qarşısı alınır).
- **Canlı Faiz Qrafikləri**: Səslərin faiz nisbətində vizual göstəriciləri və səs verənlərin ümumi sayı.

---

## 9. Akademik Materiallar (File Browser & Cloud Storage)
- Dərsliklər, PDF təqdimatlar, laboratoriya rəhbərlikləri və keçmiş imtahan sualları.
- **Supabase Storage Bulud İnteqrasiyası**: Yüklənən fayllar birbaşa `materials` bulud qovluğuna ötürülür və bütün qrup tələbələri üçün ictimai URL vasitəsilə dərhal əlçatan olur.
- **Fayl Tipləri**: PDF, DOCX, ZIP, PPTX və Kod faylları.
- Fənlər və material tipləri üzrə təmiz filtrasiya.
- Birbaşa yükləmə (Download) və fayl ölçüsü göstəricisi.
- **Offline Ehtiyat**: Şəbəkə olmadıqda yerli IndexedDB yaddaşı işləməyə davam edir.

---

## 10. Deadline İzləyicisi (Tapşırıqlar)
- Kolloqviumlar, laboratoriya hesabatları və sərbəst işlərin son təhvil tarixləri.
- **Geri Sayım Sayğacı**: "3 gün qaldı", "Sabah son gündür", "Gecikir".
- **Prioritet Rəngləri**:
  - 🔴 **Yüksək** (Qırmızı): 48 saatdan az vaxt qalıb.
  - 🟡 **Orta** (Sarı): 1 həftə ərzində.
  - 🟢 **Aşağı** (Yaşıl): Vaxta kifayət qədər var.
- Tamamlanmış tapşırıqları "Bitdi" kimi işarələmə.

---

## 11. Python Sandbox (Laboratoriya Mühiti)
- Xüsusilə **CS-101 (Proqramlaşdırmanın əsasları-1)** fənni üçün yaradılmış brauzerdaxili tam funksional Python 3 mühiti.
- **WebAssembly Pyodide CPython**: Heç bir serverdən asılı olmadan, real Python 3.12 interpretatoru birbaşa tələbənin brauzerində icra olunur.
- **Pandas və NumPy Avtomatik Yükləməsi**: Müəl. Şəbnəm İsgəndərlinin proqramına uyğun olaraq, `import pandas` yazıldıqda sistem avtomatik olaraq WebAssembly Pandas və NumPy paketlərini yükləyir və tələbəyə Data Science mühiti təqdim edir.
- **İnteraktiv Daxili Terminal**: `input()` əmrini birbaşa terminal sətirindən qəbul edən, daxiletmə və nəticəni real vaxtda göstərən konsol.
- **AzTU CS-101 Hazır Laboratoriya və Seminar Şablonları**:
  - *Müəl. Ayxan Həsənov*: `int`, `float`, `str` tipləri, tip çevrilmələri və riyazi operatorlar (`//`, `%`, `**`) — Dünənki seminar praktikası.
  - *Giriş*: `print()` və `input()` nümunələri
  - *Lab 1*: Riyazi hesablamalar və `math` modulu
  - *Lab 2*: `if/elif/else` budaqlanma məntiqi və kvadrat tənlik
  - *Lab 3*: `for` və `while` dövrləri, faktorial və rəqəmlərin cəmi
  - *Lab 4*: Siyahılar (`list`), axtarış və statistik hesablamalar
  - *Lab 5*: İstifadəçi funksiyaları (`def`) və Fibonaççi ardıcıllığı
  - *Müəl. Şəbnəm İsgəndərli*: Pandas ilə Verilənlər Analizi (`pd.DataFrame`, sütun hesablamaları, `describe()`, filtrləmə).
- Təmizləmə, icra müddəti (ms) və xətaların (Traceback) anlaşıqlı təsviri.

---

## 12. Naviqasiya və Qlobal Axtarış
- **Masaüstü Rejimi**: Sol tərəfdə 240px genişliyində daimi görünən naviqasiya paneli (Sidebar).
- **Mobil Rejim**: Kiçik ekranlarda yuxarı menyu düyməsi (Hamburger) ilə açılan mobil çekməce.
- **İşlək Qlobal Axtarış**: Qeyd, sual və material üzrə axtarış; növə görə filtr; nəticəyə keçid; `Ctrl+K` / `Cmd+K`.
- **Sürətli Paylaşım**: Yuxarı paneldəki düymə qeyd, şəkil/fayl/link və sual formalarını açır.
- **Bir Toxunuşla Profil**: TopBar-ın sağ küncündəki avatar klikləndikdə Tələbə Profili dərhal açılır.

---

## 13. Canlı Çoxistifadəçili Real-vaxt Sinxronizasiyası (Supabase Realtime)
- **Avtomatik WebSocket Əlaqəsi**: Bütün 30 tələbə platformaya daxil olduqda `public:aztu_realtime_workspace` kanalına qoşulur.
- **Səhifəni Yeniləmədən Canlı Yenilənmə**:
  - Hər hansı tələbə yeni qeyd və ya mühazirə ipucu əlavə etdikdə digər tələbələrin lövhəsində anında görünür.
  - Sorğularda verilən hər bir səs qrafikləri digər tələbələrin ekranında canlı olaraq dəyişir.
  - Yeni tapşırıq və ya sual-cavab yazıldıqda bütün qrup xəbərdar olur.
- **Yerli Saxlama**: Lokal rejimdə LocalStorage / IndexedDB işləyir. Bulud konfiqurasiya olunubsa, yeni qeyd, sual, cavab və material yazısı server tərəfindən təsdiqlənəndən sonra uğurlu sayılır. Offline dəyişiklikləri avtomatik növbəyə alıb yenidən göndərmək hələ ayrıca işdir.

---

## 14. Paylaşım Altı Müzakirə və Birgə Qeydlər
- Qeyd və materialların altında həmin paylaşıma aid şərhlər yazılır; müzakirə adi sual siyahısını qarışdırmır.
- Tələbə qeydə düzəliş təklif edə bilər. Qeydi paylaşan şəxs təklifi qəbul etdikdə yeni mətn göstərilir, ilkin mətn və qəbul edilmiş düzəlişlər qalır.
- Qeyd, material və suallar `Yadda saxla` ilə cari tələbənin brauzerində ayrıca saxlanır və ümumi axtarışdan tapılır.
- Sual-cavabın çoxsətirli cavab sahəsində Python kod şablonu əlavə etmək və kodu Sandbox-a ötürmək olur.
- Bulud mövcud olduqda müzakirə əməliyyatı server cavabını gözləyir və xəta olduqda istifadəçiyə bildirir. Mövcud auth/RLS arxitekturasının məxfilik məhdudiyyəti ayrıca həll edilməlidir.

---

## Fizika üzrə mövzu və laboratoriya bələdçisi

- Fizika səhifəsi yığcam dərs seçimi ilə açılır; “Qrup” altında materiallar, qeydlər, tapşırıqlar və suallar, “Fənn haqqında” altında isə müəllim və kredit məlumatı yerləşir.
- Siyahıda yalnız işin nömrəsi və adı görünür. Dərs daxilində müəllim izahı önə çəkilir; tam plan, əlavə təlimat və mənbə qeydləri açılan hissələrdə saxlanır.
- Fizika portalı LMS-in 8 mühazirə mövzusunu və 7 laboratoriyasını nömrələnmiş seçim siyahısında açır. Mühazirə və laboratoriya arasında bir toxunuşla keçmək olur.
- İlk 4 mövzuda müəllimin təqdimatlarından hazırlanmış geniş dərs mətni, düsturların tətbiq şərtləri, hesab nümunələri, mövzu planı və özünü yoxlama sualları var. Qalan 4 mövzuda LMS planına əsaslanan müstəqil dərs mətni göstərilir və müəllim təqdimatının verilmədiyi açıq yazılır.
- 2–7-ci laboratoriyaların verilən Word təlimatları məqsəd, avadanlıq, nəzəri əsas, addım-addım ölçmə, hesablamalar və hesabat bölmələri ilə izah edilir. 1-ci laboratoriyanın ayrıca təlimatı yoxdur.
- Nixrom məftil üzrə əlavə müəllim təlimatı LMS-in hazırkı laboratoriya siyahısından kənarda göstərilir. Elektrostatika təqdimatındakı “Mühazirə 5” başlığı ilə LMS-dəki 3-cü mövzu fərqi qeyd olunur.
- PPTX və DOCX orijinalları qrup materialları bazasına yüklənmir; PDF çevrilmələri Novcept-in mövcud Cloudflare R2 saxlanmasında `aztu/physics/` altında yerləşir və hazırlanmış bələdçidən açılır.
- PDF-lər mətnin sonunda əlavə mənbə kimi açılır. Verilən 4 təqdimat və 7 laboratoriya təlimatı PDF.js ilə səhifə-səhifə oxunur və ayrıca pəncərədə də açıla bilir. İlk dörd mühazirənin mətnləri 15–18 açılan hissədən ibarətdir; 5–8-ci mövzuların standart fizika bələdçisi müəllimin gələcək təqdimatını əvəz edən rəsmi mənbə kimi göstərilmir.

İş sahəsinin sol menyusunda fənlər birbaşa görünür; qeydlər, suallar, sorğular, materiallar, son tarixlər və simulyatorlar “Qrup və alətlər” bölməsindən açılır.

## 15. Su Simulyasiyası (Fizika Laboratoriyası)
- `/app/water` marşrutunda 2D sönümlü dalğa tənliyi ilə real vaxtda su səthi işləyir; dalğalar çəkilən maneələrdən əks olunur və tədricən sönür.
- Damla, maneə çəkmə və silgi alətləri siçan və toxunma ilə istifadə olunur.
- Durgun, yağışlı və fırtınalı hazır rejimlər; dalğa sürəti, sönümləmə, fırça ölçüsü və yağış sıxlığı üçün sürgülər.
- Pauza/davam, səhnəni sıfırlama, FPS göstəricisi və PNG ixracı mövcuddur.
- Hesab məlumatı və verilənlər bazası ilə əlaqəsi yoxdur; laboratoriya vəziyyəti yalnız aktiv səhifənin yaddaşında saxlanılır.

---

## 16. Riyazi Analiz Mühazirələri, Praktika və AI
- Riyazi analiz portalı birbaşa “Dərslər” bölməsində açılır. “Mühazirə 1 — mövzu adı” formatında siyahıdan dərs seçilir; yeni mövzular eyni quruluşa əlavə edilir.
- Seçilən dərsin daxilində dörd bölmə var: **Qaydalar**, **Praktika**, **Laboratoriya**, **AI köməkçi**. Geri və növbəti mühazirə keçidləri var; bölmələrarası keçiddə yarımçıq test cavabları qorunur.
- Laboratoriyalar dərslərə görə ayrılıb: çoxluqlar üçün Ven diaqramı, həqiqi ədədlər üçün ε-qonşuluğu, supremum/infimum üçün sərhəd simulyasiyası.
- Riyazi analiz üçün təsdiqlənməmiş 15 həftəlik plan və ümumi laboratoriya tabı göstərilmir; dəqiq mövzular universitet kabinetindən alındıqca dərslərə əlavə oluna bilər.
- `Riyazi analiz-1` portalında üç ilkin mövzu: çoxluqlar və kvantorlar, həqiqi ədədlər və intervallar, supremum/infimum və tamlıq. Yalnız tələbənin keçildiyini bildirdiyi mövzular üçün köməkçi xülasədir.
- Hər mövzuda təriflər, formulalar, işlənmiş nümunə, altı izahlı test sualı və yazılı isbat məşqi var. Test nəticəsi istifadəçinin brauzerində saxlanır.
- İnteraktiv laboratoriyalar: sonlu çoxluqlarla Ven diaqramı, açıq/qapalı/ardıcıllıq çoxluğunun sərhədləri, həqiqi ədəd oxunda ε-qonşuluğu.
- Hər mühazirənin AI bölməsi yalnız həmin mövzuya bağlanan söhbətdir. Cavablar Vercel `/api/lecture-chat` funksiyası ilə `gemini-3.1-flash-lite` modelindən alınır. Son mesajlar bu tabın yaddaşında saxlanır və tələbə söhbəti təmizləyə bilir. AI cavabları köməkçi izahdır və müəllim qeydi deyil.

---

## 17. 6326A2 Qaib Limit, Giriş Balı və 30 ECTS GPA Kalkulyatoru
- `/app/calculator` marşrutunda və Əsas Lövhədə (`/app`) işləyən, başqa tələbələrin aktivliyindən asılı olmayan fərdi akademik izləyici.
- **Tam 30 ECTS Bologna Sistemi**: Proqramlaşdırma-1 (8 kr, Forma-2), Riyazi analiz-1 (7 kr, Forma-1), Xətti cəbr (4 kr, Forma-1), ADİAK (4 kr, Forma-1), XDİAK (4 kr, Forma-1) və Fizika (3 kr, Forma-2).
- **25% Qaib Həddi İzləyicisi**: Hər fənn üçün dərs saatına (`30/45/60/75/90 saat`) uyğun maksimum qaib cütü, qalan qaib haqqı və 10 ballıq şkala üzrə avtomatik davamiyyət balı.
- **Kollokvium Çeviricisi**: 10 ballıq şkaladakı 3 kollokvium və cari seminar ortalamasını birbaşa Forma-1 (30 bal) və Forma-2 (20 bal) şkalasına çevirir.
- **İmtahan Hədəf Cədvəli**: Cari giriş balına görə 51 (E), 71 (C - Təqaüd), 81 (B) və 91 (A - Əlaçı) almaq üçün imtahanda minimum neçə bal lazım olduğunu göstərir.

