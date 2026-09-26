# AzTU 6326A2 — Dəyişikliklər Tarixçəsi (Changelog)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının versiya inkişafını, əlavə edilmiş funksiyaları və xəta düzəlişlərini xronoloji ardıcıllıqla qeyd edir.

---

## [1.14.0] — 2026-09-26

### 6326A2 Qaib Limit, Giriş Balı və 30 ECTS GPA Kalkulyatoru + Tək Oyunçulu (Single-Player) Transformasiya
- **Yeni Modul (`/app/calculator`)**: [`CalculatorView.tsx`](./src/components/app/views/CalculatorView.tsx), [`CalculatorView.css`](./src/components/app/views/CalculatorView.css) və [`academicTracker.ts`](./src/services/academicTracker.ts) yaradıldı.
- **Rəsmi 30 ECTS Kredit, KOICA Saatları və Forma-1 / Forma-2 Düsturu**: 6 fənnin kreditləri və KOICA/LMS-dəki rəsmi saatları sabitləndi (`Proqramlaşdırma-1: 8 kr / 75 saat`, `Riyazi analiz-1: 7 kr / 75 saat`, `Xətti cəbr: 4 kr / 45 saat`, `ADİAK: 4 kr / 45 saat`, `XDİAK: 4 kr / 45 saat`, `Fizika: 3 kr / 30 saat` = 30 kredit, 315 akademik saat).
- **25% Qaib Həddi İzləyicisi (Saat Seçimisiz, Avtomatik)**: Hər fənnin öz rəsmi saatına görə maksimum qaib limiti (`75 saat → max 9 qaib`, `45 saat → max 5 qaib`, `30 saat → max 3 qaib`), qalan qaib haqqı və 10 ballıq şkala üzrə davamiyyət balı avtomatik hesablanır.
- **Kollokvium və Seminar Çeviricisi**: 10 ballıq şkaladakı 3 kollokvium + seminar qiymətini dərhal Forma-1 (30 bal) və Forma-2 (20 bal) qarşılığına çevirən alət əlavə olundu.
- **Boş Sosial Bölmələrin Təmizlənməsi**: Başqa tələbələrin yazmasından asılı olub boş qalan `Qrup qeydləri`, `Sual-Cavab` və `Sorğular` bölmələri naviqasiyadan, fənn tablarından və Əsas Lövhədən çıxarıldı; əvəzində Əsas Lövhəyə canlı **Qaib & GPA İzləyicisi** və **İnteraktiv Laboratoriya Mərkəzi** yerləşdirildi.
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
