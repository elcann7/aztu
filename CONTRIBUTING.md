# AzTU 6326A2 — Töhfə Vermə Bələdçisi (Contribution Guidelines)

**AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının inkişafına töhfə vermək istəyən bütün qrup tələbələri və mühəndislər üçün bu bələdçi əsas qaydaları müəyyən edir.

---

## 🧭 Əsas Prinsiplər

1. **Kodu Oxumaq Əvəzinə `.md`-ləri Oxuyun**: Hər hansı işə başlamazdan əvvəl bütün kodu gəzmək əvəzinə [`PROJECT_MAP.md`](./PROJECT_MAP.md) və [`AGENTS.md`](./AGENTS.md) sənədlərini oxuyaraq hansı faylın harada olduğunu dəqiqləşdirin.
2. **Hər Dəyişikliyi Mütləq `.md` Fayllarına Yazın**: Layihədə edilən hər bir dəyişiklik, yeni funksiya və ya xəta düzəlişi dərhal [`CHANGELOG.md`](./CHANGELOG.md), [`PROJECT_MAP.md`](./PROJECT_MAP.md) və aidiyyəti olan digər sənədlərə yazılmalıdır. Sənədləşməsi yenilənməyən heç bir iş tamamlanmış qəbul edilmir!
3. **Akademik Dəqiqlik**: Bütün fənn adları, kodları və kreditləri AzTU-nun rəsmi tədris planına uyğun olmalıdır.
4. **Təhlükəsizlik Birinci Yerdə**: 30 tələbəlik kvota, `6326A2` qrup kodu və tələbə adlarının kilidlənməsi qaydaları heç vaxt pozulmamalıdır.
5. **Müasir Dizayn**: İnterfeys **Linear** və **21st.dev** minimalist estetikasını qorumalı, Tailwind əvəzinə Vanilla CSS dizayn tokenlərindən istifadə edilməlidir.

---

## 🛠 İnkişaf Qaydaları (Development Rules)

### 1. TypeScript və Kod Tərzi
- Bütün yeni komponentlər və xidmətlər üçün dəqiq TypeScript tipləri (`interface` / `type`) yazılmalıdır.
- `any` tipindən istifadə qadağandır.
- Funksional komponentlər və React 19 hook-ları üstün tutulur.

### 2. CSS və Stil Qaydaları
- Əlavə xarici CSS freymvorkları (Tailwind, Bootstrap) əlavə olunmamalıdır.
- Bütün rənglər, radiuslar və məsafələr [`global.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/styles/global.css) dəyişənlərindən götürülməlidir:
  - `var(--text-primary)`, `var(--text-muted)`
  - `var(--border-default)`, `var(--border-subtle)`
  - `var(--radius-xs)`, `var(--radius-md)`, `var(--radius-lg)`
- Modallar və açılan pəncərələr mütləq `createPortal(..., document.body)` ilə mount olunmalıdır.

---

## 🌿 Git Şaxələnmə və Commit Standartları

### 1. Şaxə (Branch) Adlandırması
Yeni funksiya və ya xəta həlli üçün məntiqli budaqlar yaradın:
- `feature/yeni-fen-bolmesi`
- `fix/modal-clipping-duzelisi`
- `docs/senedlesme-yenilenmesi`

### 2. Commit Mesaj Formatı (Conventional Commits)
Commit mesajlarınız aşağıdakı standart prefikslərlə başlamalıdır:
- `feat:` — Yeni funksionallıq əlavə edildikdə (məs: `feat: profil sekli yukleme imkani`)
- `fix:` — Mövcud xəta aradan qaldırıldıqda (məs: `fix: modal basliginin kesilmesi problemi`)
- `docs:` — Sənədləşmə dəyişiklikləri (məs: `docs: README faylinin yenilenmesi`)
- `style:` — Vizual görünüş və CSS tənzimləmələri
- `refactor:` — Funksionallığı dəyişmədən kodun təmizlənməsi

---

## 🧪 Yoxlama və Təsdiq (Verification)

Dəyişikliklərinizi `main` budağına birləşdirməzdən əvvəl mütləq lokal qurulmanı yoxlayın:

```bash
npm run build
```

Əgər TypeScript xətası (0 errors) və ya Vite yığma problemi yoxdursa, PR (Pull Request) aça bilərsiniz.

---

## 📬 Pull Request (PR) Qaydası

1. Repozitoriyanı fork edin və ya mövcud repoda yeni qol açın.
2. Dəyişikliklərinizi səliqəli commitlərlə qeyd edin.
3. `main` qoluna doğru Pull Request göndərin və dəyişiklikləri qısaca izah edin.
4. Qrup layihə rəhbərinin təsdiqindən sonra kod canlı versiyaya inteqrasiya olunacaq.
