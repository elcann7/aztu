# AzTU 6326A2 — Yerləşdirmə və Əməliyyat Bələdçisi (Deployment Guide)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının **Vercel** və **GitHub** üzərində istehsalat (production) mühitinə yerləşdirilməsi, domen sazlamaları və konfiqurasiya qaydalarını təsvir edir.

---

## 🌐 İstehsalat Parametrləri

- **Canlı İstehsalat URL-i**: [https://aztu-ebon.vercel.app](https://aztu-ebon.vercel.app)
- **GitHub Repozitoriyası**: [https://github.com/elcann7/aztu](https://github.com/elcann7/aztu)
- **Əsas İstehsalat Qolu**: `main`
- **AI server açarı**: `GEMINI_API_KEY` yalnız Vercel Production mühitində Secret kimi saxlanır; `VITE_` prefiksi ilə istifadə edilməməlidir.
- **Fizika PDF-ləri**: 11 PDF Novcept-in mövcud Cloudflare R2 bucket-ində `aztu/physics/` altında saxlanır. `physicsContent.ts` birbaşa ictimai CDN linklərini istifadə edir; deploy zamanı PDF-lər Vercel paketinə daxil edilmir. Hazırkı klient əsaslı giriş bu URL-ləri qorumaq üçün server yoxlaması etmir.

---

## 1. SPA 404 Yönləndirmə Sazlaması (`vercel.json`)

Vite ilə yaradılan Single Page Application (SPA) arxitekturasında istifadəçi birbaşa daxili səhifəyə daxil olduqda (məsələn: `https://aztu-ebon.vercel.app/app/notes`) və ya səhifəni yenilədikdə (F5), veb-server həmin faylı tapmadığı üçün `404 Not Found` xətası qaytara bilər.

Bunun qarşısını almaq və AI API funksiyasını SPA yönləndirməsindən ayırmaq üçün kök qovluqda [`vercel.json`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/vercel.json) faylı tətbiq olunmuşdur:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Bu sazlama sayəsində istənilən URL dərhal `index.html`-ə yönəlir və klient tərəfli `RouterContext` marşrutu qüsursuz emal edir.

---

## 2. Ətraf Mühit Dəyişənləri (Environment Variables)

Platformanın işləməsi üçün aşağıdakı dəyişən tələb olunur:

| Dəyişən Adı | Məqsədi | Nümunə Dəyər |
| :--- | :--- | :--- |
| `VITE_GOOGLE_CLIENT_ID` | Google Identity Services OAuth 2.0 Client ID | `1094028904596-...apps.googleusercontent.com` |
| `GEMINI_API_KEY` | Riyaziyyat mühazirələrinin AI söhbəti üçün server açarı | Vercel Secret; klient bundle-a daxil edilmir |

Lokal AI yoxlaması üçün `vercel dev --listen 3000` serverini açarla başladın və ayrıca Vite serverini `AZTU_API_PROXY=http://localhost:3000` dəyişəni ilə başladın. Vite `/api` sorğularını Vercel funksiyasına ötürür; açar heç vaxt `VITE_` prefiksli dəyişəndə saxlanmır.

### Vercel Panelində Əlavə Edilməsi:
1. [Vercel Dashboard](https://vercel.com)-a daxil olun.
2. `aztu` layihəsini seçin.
3. **Settings** -> **Environment Variables** bölməsinə keçin.
4. `VITE_GOOGLE_CLIENT_ID` açarını və dəyərini daxil edib **Save** edin.

---

## 3. Google Cloud Console Sazlaması

Google düyməsinin və One-Tap girişinin domen üzərində xətasız işləməsi üçün Google Cloud Console-da icazələr verilməlidir:

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials)-a daxil olun.
2. Mövcud **OAuth 2.0 Client ID**-nizi seçin.
3. **Authorized JavaScript origins** (Səlahiyyətli JavaScript mənbələri) bölməsinə əlavə edin:
   - `https://aztu-ebon.vercel.app`
   - `http://localhost:5173`
   - `http://127.0.0.1:5173`
4. **Authorized redirect URIs** bölməsinə əlavə edin:
   - `https://aztu-ebon.vercel.app`
5. **Save** düyməsini sıxın.

---

## 4. Əllə Yerləşdirmə (Manual Deployment CLI)

### 4.1. GitHub-a Dəyişiklikləri Göndərmək
```bash
git add .
git commit -m "feat: layihə yenilənməsi"
git push origin main
```

### 4.2. Vercel CLI ilə Canlı Versiyanı Yeniləmək
Əgər Vercel tokeniniz varsa, terminal vasitəsilə birbaşa yerləşdirmə edə bilərsiniz:
```bash
# Windows CMD üçün:
cmd /c "npx vercel deploy --prod -y --token=SIZIN_VERCEL_TOKENINIZ"
```

---

## 5. İstehsalat Qurulması (Build Verification)

Hər hansı bir yerləşdirmədən əvvəl lokal olaraq build prosesini yoxlamaq tövsiyə olunur:

```bash
npm run build
```

Gözlənilən çıxış:
```
vite building client environment for production...
✓ 1928 modules transformed.
dist/index.html                  ~1.15 kB
dist/assets/index-*.css          ~100 kB
dist/assets/index-*.js           ~409 kB
✓ built in < 1s
```
Xətasız tamamlandıqda sistem istehsalat üçün tam hazır hesab olunur.
