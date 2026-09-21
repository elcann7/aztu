# AzTU 6326A2 — AI Köməkçilər və Tərtibatçılar üçün Əsas Qaydalar (AGENTS.md)

Bu sənəd bu repozitoriyada işləyən istənilən **AI Agent (Antigravity, Cursor, Copilot və s.)** və proqramçılar üçün **məcburi və dəyişdirilməz qaydaları** təyin edir.

---

## ⚡ QAYDA 1: BÜTÜN KODU OXUMAYIN — ƏVVƏLCƏ `.md` FAYLLARINI OXUYUN

Sizə hər hansı bir tapşırıq (yeni funksiya, xəta həlli, dizayn dəyişikliyi və s.) tapşırıldıqda:
1. **Bütün kod bazasını fayl-fayl axtarmaq və oxumaq QƏTİ QADAĞANDIR.**
2. Əvəzində dərhal müvafiq `.md` sənədini oxuyun:
   - Faylın və funksiyanın yerini tapmaq üçün 👉 [`PROJECT_MAP.md`](./PROJECT_MAP.md)
   - Sistemin arxitekturası və portal dialoqları üçün 👉 [`ARCHITECTURE.md`](./ARCHITECTURE.md)
   - Mövcud funksiyalar və UI modulları üçün 👉 [`FEATURES.md`](./FEATURES.md)
   - Verilənlər bazası və tiplər üçün 👉 [`DATA_MODELS.md`](./DATA_MODELS.md)
   - Təhlükəsizlik, 30 nəfərlik limit və qrup kodu üçün 👉 [`SECURITY.md`](./SECURITY.md)
   - Yerləşdirmə və Vercel sazlamaları üçün 👉 [`DEPLOYMENT.md`](./DEPLOYMENT.md)
   - Layihənin ümumi təqdimatı üçün 👉 [`README.md`](./README.md)
   - Versiya tarixçəsi üçün 👉 [`CHANGELOG.md`](./CHANGELOG.md)

---

## 📝 QAYDA 2: HƏR DƏFƏ NƏ İSƏ EDƏNDƏ MÜTLƏQ `.md` FAYLLARINA YAZIN

Layihədə **hər hansı bir dəyişiklik** edildikdə (yeni komponent, xəta düzəlişi, yeni sahə, stil dəyişikliyi və s.):
1. Müvafiq `.md` faylları **dərhal və mütləq** yenilənməlidir!
2. **Xüsusilə:**
   - [`CHANGELOG.md`](./CHANGELOG.md) — Görülən işin tarixi, versiyası və xülasəsi qeyd olunmalıdır.
   - [`PROJECT_MAP.md`](./PROJECT_MAP.md) — Yeni fayl yaradılıbsa və ya faylın strukturu dəyişibsə xəritəyə əlavə edilməlidir.
   - [`FEATURES.md`](./FEATURES.md) — Yeni funksionallıq və ya UI elementi əlavə edildikdə sənədləşdirilməlidir.
   - [`DATA_MODELS.md`](./DATA_MODELS.md) — Hər hansı TypeScript interfeysi və ya `localStorage` açarı dəyişibsə yenilənməlidir.
   - [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Memarlıq dəyişikliyi olarsa qeyd edilməlidir.
3. Sənədləşməsi yenilənməyən heç bir kod dəyişikliyi tamamlanmış hesab olunmur!

---

## 🔒 QAYDA 3: TOXUNULMAZ VƏ DƏYİŞDİRİLMƏZ TƏHLÜKƏSİZLİK QANUNLARI

Aşağıdakı 4 qanun layihənin təməl sütunudur və heç vaxt zəiflədilə və ya silinə bilməz:

1. **Maksimum 30 Tələbə Kvotası (`MAX_STUDENTS_LIMIT = 30`)**:
   - `AuthContext.tsx` daxilində daimi yoxlanılır. Limit dolduqda qeydiyyat bloklanmalıdır. Kənar şəxslərin girişinə qadağadır.
2. **Qrup Təhlükəsizlik Kodu (`GROUP_SECURITY_CODE = '6326A2'`)**:
   - Hesab açarkən və ya ilk dəfə Google ilə daxil olduqda bu kod mütləq tələb olunmalıdır.
3. **Təsdiqlənmiş Tələbə Şəxsiyyətinin Toxunulmazlığı (LOCKED IDENTITY)**:
   - Tələbənin `firstName` (Adı), `lastName` (Soyadı) və `group` (`6326A2`) məlumatları redaktə pəncərəsində (`ProfileModal.tsx`) kilidli qalmalıdır. Profil yeniləmələrində bu sahələrin dəyişdirilməsi qadağandır.
4. **Modalların React Portal ilə Mount Edilməsi**:
   - Bütün modallar (`Modal.tsx`, `ProfileModal.tsx`) mütləq `createPortal(..., document.body)` ilə birbaşa `<body>`-yə mount olunmalıdır. Konteyner transform animasiyalarının modalları kəsməsinə və arxa fonu sıxmasına qətiyyən yol verilməməlidir.

---

## 🗺️ Tez Bələdçi (Quick Lookup)

| Nə etmək istəyirsiniz? | Haraya baxmalı və nəyi redaktə etməlisiniz? |
| :--- | :--- |
| **Giriş / Qeydiyyat / Google Auth** | `src/pages/auth/LoginPage.tsx`, `RegisterPage.tsx`, `src/services/googleAuth.ts`, `src/context/AuthContext.tsx` |
| **Tələbə Profili və Şəkil** | `src/components/app/modals/ProfileModal.tsx` & `.css`, `src/context/AuthContext.tsx` |
| **Sol Menyu / Naviqasiya** | `src/components/app/Sidebar.tsx` & `.css` |
| **Yuxarı Panel / Axtarış** | `src/components/app/TopBar.tsx` & `.css` |
| **Əsas İş Mühiti Layout** | `src/components/app/AppShell.tsx` & `.css` |
| **Qrup Qeydləri** | `src/components/app/views/NotesView.tsx` & `src/components/app/modals/CreateNoteModal.tsx` |
| **Sual-Cavab Forumu** | `src/components/app/views/QAView.tsx` & `src/components/app/modals/CreateQuestionModal.tsx` |
| **Qrup Sorğuları** | `src/components/app/views/PollsView.tsx` & `src/components/app/modals/CreatePollModal.tsx` |
| **Materiallar** | `src/components/app/views/MaterialsView.tsx` & `src/components/app/modals/CreateMaterialModal.tsx` |
| **Deadline-lar** | `src/components/app/views/DeadlinesView.tsx` & `src/components/app/modals/CreateDeadlineModal.tsx` |
| **Fənn Portalları** | `src/components/app/CourseShellView.tsx` & `.css` |
| **Python Sandbox** | `src/components/app/views/PythonSandboxView.tsx` & `src/services/pythonRunner.ts` |
| **Ümumi Modallar Bazası** | `src/components/common/Modal.tsx` & `Modal.css` |
| **Qlobal Stillər & Rənglər** | `src/styles/global.css` |
| **Verilənlər və CRUD** | `src/services/db.ts` & `src/context/DatabaseContext.tsx` |
| **Marşrutlaşdırma** | `src/context/RouterContext.tsx` & `vercel.json` |

---

## 🔄 Hər Dəyişiklikdən Sonra İcra Proseduru:
1. `npm run build` ilə TypeScript və yığma xətalarını yoxlayın (0 errors).
2. [`CHANGELOG.md`](./CHANGELOG.md) faylına son dəyişikliyi qeyd edin.
3. Əgər funksiya və ya model dəyişibsə, müvafiq `.md` faylını yeniləyin.
4. Git commit və push edin:
   ```bash
   git add .
   git commit -m "..."
   git push origin main
   ```
5. Canlı Vercel mühitinə deploy edin.
