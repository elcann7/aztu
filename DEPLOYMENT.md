# AzTU 6326A2 — Yerləşdirmə və Əməliyyat Bələdçisi (Deployment Guide)

> **1.16.0 keçid bloklayıcısı:** AzTU Supabase layihəsinin canlı sxemi yoxlanıb. İstifadəçinin göstərişi ilə şəkilli profil saxlanılıb, digər 4 profil və 3 köhnə Auth hesabı silinib. Vercel Production mühitinə qrup kodu və yalnız saxlanılan profilin e-poçtu əlavə edilib. Paylaşılmış legacy `service_role` açarı istifadəçinin açıq göstərişi ilə müvəqqəti `SUPABASE_SECRET_KEY` dəyişəninə əlavə edilib; canlı keçiddən sonra yeni `sb_secret_...` ilə əvəz olunmalı və köhnə açar deaktiv edilməlidir. Köhnə imtiyazlı funksiyaların birbaşa çağırışı artıq bağlanıb. Supabase Google provider sazlanmadan, `supabase/migrations/20260928152552_secure_group_access.sql` miqrasiyası ilə canlı allow/deny testləri tamamlanmadan yeni tətbiqi yerləşdirməyin. Köhnə canlı RLS siyasətləri hələ açıqdır.

## 1.16.0 yerləşdirmə ardıcıllığı

1. AzTU Supabase layihəsinə giriş açın və `profiles`, `storage.objects`, `pg_policies` vəziyyətini yoxlayın; bazanın ehtiyat nüsxəsini alın.
2. Supabase Auth Google provider-ində Google Web Client ID və Client Secret-i qurun; girişin aktiv olduğunu yoxlayın. Şəkilli köhnə profilin Google girişi bu addımdan asılıdır.
3. `SUPABASE_SECRET_KEY`, `AZTU_GROUP_SECURITY_CODE=6326A2` və yalnız təsdiqli tələbə ünvanlarından ibarət `AZTU_ALLOWED_EMAILS` Vercel Production-da olmalıdır. Yeni `sb_secret_...` açarı alındıqda müvəqqəti legacy açarı həmin dəyişəndə əvəz edin və legacy açarı deaktiv edin. Supabase Auth-da **Confirm email** və işlək SMTP tələb olunur. Server `mailer_autoconfirm` aktivdirsə parol qeydiyyatını və bağlanmasını rədd edir. Gizli açar heç vaxt `VITE_` prefiksi ilə klientə verilməməlidir.
4. `supabase/migrations/20260928152552_secure_group_access.sql` miqrasiyasını tətbiq edib yeni frontend/API-ni dərhal yerləşdirin. Miqrasiya `auth.users` üzərindəki köhnə `on_auth_user_created` trigger-ini ləğv edir; keçid zamanı köhnə tətbiqin qrup əməliyyatları müvəqqəti işləməyə bilər.
5. `anon` rolunun qrup cədvəllərini oxuya/yaza bilmədiyini, üzvün yalnız öz profilini yenilədiyini, 31-ci paralel qeydiyyatın rədd edildiyini, material bucket-inin özəl olduğunu, Google və e-poçt girişini, profil yeniləməsini, paylaşımı, Realtime-ı, imzalı fayl keçidini və AI API-ni yoxlayın.

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasının **Vercel** və **GitHub** üzərində istehsalat (production) mühitinə yerləşdirilməsi, domen sazlamaları və konfiqurasiya qaydalarını təsvir edir.

---

## 🌐 İstehsalat Parametrləri

- **Canlı İstehsalat URL-i**: [https://aztu-ebon.vercel.app](https://aztu-ebon.vercel.app)
- **GitHub Repozitoriyası**: [https://github.com/elcann7/aztu](https://github.com/elcann7/aztu)
- **Əsas İstehsalat Qolu**: `main`
- **AI server açarı**: `GEMINI_API_KEY` yalnız Vercel Production mühitində Secret kimi saxlanır; `VITE_` prefiksi ilə istifadə edilməməlidir.
- **Giriş server açarı**: `SUPABASE_SECRET_KEY` yalnız Vercel server funksiyalarında saxlanır; `AZTU_GROUP_SECURITY_CODE` qeydiyyat endpoint-i üçün tələb olunur. Paylaşılmış legacy `service_role` açarı canlı keçid tamamlanandan sonra deaktiv edilməlidir.
- **Tələbə siyahısı**: `AZTU_ALLOWED_EMAILS` serverdə icazəli ünvanları saxlayır. Bu dəyişən olmadan yeni profil bağlanmır; köhnə profillər də e-poçt sahibi təsdiqlənənədək bağlı qalır.
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
