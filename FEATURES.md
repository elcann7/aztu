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
- **Tələbəyə Fərdi Salamlama**: Giriş etmiş tələbənin adı və qrup məlumatı.
- **Statistika Kartları**:
  - Aktiv qrup qeydlərinin sayı.
  - Yaxınlaşan təcili deadline-lar.
  - Cavab gözləyən suallar.
  - Əlçatan dərs materialları.
- **Günün Dərs Cədvəli**: Günün mühazirə və laboratoriya saatları, auditoriya və müəllim məlumatları.
- **Təcili Elanlar**: Növbədənkənar dərslər və ya universitet xəbərləri.

---

## 5. Fənn Portalları (Course Shells)
Platforma 4 əsas fənn üçün ixtisaslaşmış səhifələrə malikdir:
1. **Riyazi analiz (MATH-101)** — 6 kredit
2. **Fizika (PHYS-102)** — 6 kredit
3. **Proqramlaşdırma (CS-101)** — 6 kredit
4. **İngilis dili (ENG-101)** — 4 kredit

Hər bir fənn portalında:
- Fənnin kodu, kredit sayı və rəsmi adı.
- Müəllimin adı və əlaqə e-poçtu.
- **Həftəlik Mühazirə Modulları**: Hər həftənin mövzusu, təqdimatları və laboratoriya təlimatları.
- Fənnə aid qeydlər, deadline-lar və materiallar arasında sürətli keçid.

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

## 9. Akademik Materiallar (File Browser)
- Dərsliklər, PDF təqdimatlar, laboratoriya rəhbərlikləri və keçmiş imtahan sualları.
- **Fayl Tipləri**: PDF, DOCX, ZIP, PPTX və Kod faylları.
- Fənlər və material tipləri üzrə təmiz filtrasiya.
- Birbaşa yükləmə (Download) və fayl ölçüsü göstəricisi.

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
- Xüsusilə **CS-101 (Proqramlaşdırma)** fənni üçün yaradılmış brauzerdaxili Python redaktoru.
- Tələbə kodu yazır və birbaşa brauzerdə icra edir.
- Çıxış konsolu (Stdout / Stderr) vasitəsilə nəticə və xətaların izlənilməsi.
- Hazır nümunə kodlar (Alqoritmlər, riyazi hesablamalar).

---

## 12. Naviqasiya və Qlobal Axtarış
- **Masaüstü Rejimi**: Sol tərəfdə 240px genişliyində daimi görünən naviqasiya paneli (Sidebar).
- **Mobil Rejim**: Kiçik ekranlarda yuxarı menyu düyməsi (Hamburger) ilə açılan mobil çekməce.
- **Qlobal Axtarış UI**: Yuxarı paneldə mühazirə, qeyd və tapşırıqlar üçün axtarış sahəsi (`⌘K` / `Ctrl+K`).
- **Bir Toxunuşla Profil**: TopBar-ın sağ küncündəki avatar klikləndikdə Tələbə Profili dərhal açılır.
