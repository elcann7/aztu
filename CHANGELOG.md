# AzTU 6326A2 — Dəyişikliklər Tarixçəsi (Changelog)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının versiya inkişafını, əlavə edilmiş funksiyaları və xəta düzəlişlərini xronoloji ardıcıllıqla qeyd edir.

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
