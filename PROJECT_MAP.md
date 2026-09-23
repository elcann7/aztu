# AzTU 6326A2 — Layihə və Kod Bazası Xəritəsi (Project Map)

Bu sənəd **AzTU 6326A2** layihəsindəki hər bir faylın, qovluğun, komponentin və xidmətin dəqiq məqsədini və yerini göstərir.

> ⚠️ **QEYD**: Bütün kodu tək-tək axtarmaq əvəzinə, bu cədvələ baxaraq hansı funksiyanın və ya stilin harada yerləşdiyini dərhal müəyyən edin!

---

## 🗺️ Fayl və Qovluq Bələdçisi

### 1. Kök Fayllar (Root Configuration)
| Fayl | Növü | Təyinatı |
| :--- | :--- | :--- |
| [`AGENTS.md`](./AGENTS.md) | Markdown | **AI Köməkçilər və Tərtibatçılar üçün Əsas Qaydalar** (Kodu oxumamaq, hər dəyişikliyi MD-yə yazmaq) |
| [`README.md`](./README.md) | Markdown | Layihənin rəsmi təqdimatı, canlı linklər, xüsusiyyətlər və sürətli başlanğıc |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Markdown | SPA arxitekturası, React Context vəziyyət idarəetməsi və React Portal dialoq sistemi |
| [`FEATURES.md`](./FEATURES.md) | Markdown | Bütün 12 modulun funksional izahatı |
| [`DATA_MODELS.md`](./DATA_MODELS.md) | Markdown | Bütün TypeScript interfeysləri, ER diaqramı və localStorage yaddaş açarları |
| [`SECURITY.md`](./SECURITY.md) | Markdown | 30 tələbə kvotası, SHA-256 duzlanmış heşləmə və tələbə şəxsiyyətinin toxunulmazlığı |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Markdown | Vercel SPA rewrite konfiqurasiyası və Google Cloud Console sazlamaları |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Markdown | Qrup tələbələri üçün kodlaşdırma və commit standartları |
| [`CHANGELOG.md`](./CHANGELOG.md) | Markdown | Layihənin bütün inkişaf addımları və versiya tarixçəsi |
| [`PROJECT_MAP.md`](./PROJECT_MAP.md) | Markdown | **Bu sənəd** — Kod bazasının tam xəritəsi |
| [`supabase/schema.sql`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/supabase/schema.sql) | SQL | **Supabase PostgreSQL Sxemi**: Cədvəllər, 30 nəfərlik limit tətikçisi, RLS qaydaları və Realtime yayımı |
| [`vercel.json`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/vercel.json) | JSON | Vercel `/api` funksiyalarını saxlayan və qalan SPA marşrutlarını `index.html`-ə yönləndirən qaydalar |
| `tsconfig.api.json` | JSON | Vercel API funksiyasının ayrıca TypeScript yoxlaması |
| [`.env`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/.env) | Env | `VITE_GOOGLE_CLIENT_ID` Google OAuth Client ID |
| [`index.html`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/index.html) | HTML | Əsas HTML sənədi, Google Identity Services script teqi |
| [`package.json`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/package.json) | JSON | Asılılıqlar və build skriptləri (`npm run dev`, `npm run build`) |
| [`vite.config.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/vite.config.ts) | TS | Vite konfiqurasiyası və React plagini |

---

### 2. Giriş Nöqtəsi və Marşrutlaşdırma (`src/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/main.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/main.tsx) | React 19 tətbiqinin `document.getElementById('root')`-a render nöqtəsi |
| [`src/App.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/App.tsx) | Əsas marşrut idarəedici (`AppContent`), marşrut qoruyucuları (`route guards`) və kontekst provayderləri |
| [`src/App.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/App.css) | Əsas səhifə maketi və təməl CSS sinifləri |

---

### 3. Vəziyyət İdarəetməsi (`src/context/`)
| Fayl | Məsuliyyəti |
| :--- | :--- |
| [`src/context/AuthContext.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/context/AuthContext.tsx) | **Tələbə Girişi və Təhlükəsizlik**: 30 tələbə kvotası (həm brauzerdə, həm canlı Supabase triggerində), `6326A2` qrup kodu, Web Crypto SHA-256 + Salt heşləmə, Google GIS login, dondurulmuş şəxsiyyət sahələri (`firstName`, `lastName`, `group`), Supabase `profiles` cədvəli ilə ikiistiqamətli sinxronizasiya. |
| [`src/context/DatabaseContext.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/context/DatabaseContext.tsx) | **Verilənlər Bazasının İdarə Edilməsi**: Canlı Supabase PostgreSQL və Realtime (`supabase.channel('public:aztu_realtime_workspace')`) inteqrasiyası, akademik materiallar üçün Supabase Storage bulud fayl saxlancı, qeydlər, sual-cavablar, sorğular, səslər və deadline-lar üçün CRUD metodları, şəbəkə kəsildikdə dərhal yerli IndexedDB/LocalStorage ehtiyat nüsxəsinə keçid. |
| [`src/context/RouterContext.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/context/RouterContext.tsx) | **Xüsusi SPA Router**: `window.history.pushState` və `popstate` əsaslı yüngül marşrutlaşdırıcı, `useRouter` hook-u və `<Link>` komponenti. |

---

### 4. Səhifələr (`src/pages/auth/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/pages/auth/LoginPage.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/pages/auth/LoginPage.tsx) | Giriş səhifəsi: Rəsmi Google GIS düyməsi, e-poçt/şifrə formu, qrup kodu təsdiqi |
| [`src/pages/auth/LoginPage.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/pages/auth/LoginPage.css) | Giriş səhifəsinin stilləri, kart maketi və Google dialoq stilləri |
| [`src/pages/auth/RegisterPage.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/pages/auth/RegisterPage.tsx) | Qeydiyyat səhifəsi: 30 nəfərlik limit xəbərdarlığı, qrup kodu (`6326A2`) tələbi, Google ilə qeydiyyat |
| [`src/pages/auth/RegisterPage.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/pages/auth/RegisterPage.css) | Qeydiyyat səhifəsinin vizual tərtibatı |

---

### 5. Əsas Vahid İş Sahəsi (`src/components/app/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/components/app/AppShell.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/AppShell.tsx) | Vahid iş sahəsinin əsas şeli: `Sidebar`, `TopBar`, dinamik görünüş və `ProfileModal` |
| [`src/components/app/AppShell.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/AppShell.css) | İş mühitinin flexbox və viewport hündürlük stilləri |
| `src/components/app/GlobalSearch.tsx` & `.css` | Qeyd, material və sual üzrə ümumi axtarış, filtr və nəticəyə keçid |
| `src/components/app/DiscussionPanel.tsx` & `.css` | Qeyd və material altında şərh, düzəliş təklifi və qəbul edilmiş versiyalar |
| [`src/components/app/Sidebar.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/Sidebar.tsx) | Sol naviqasiya paneli: 4 fənn keçidi, 5 iş modulu, çıxış düyməsi və tələbə kartı |
| [`src/components/app/Sidebar.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/Sidebar.css) | Sidebar stilləri və mobil çekməce (drawer) media sorğuları (`<= 768px`) |
| [`src/components/app/TopBar.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/TopBar.tsx) | Yuxarı panel: Səhifə başlığı, qlobal axtarış sahəsi (`⌘K`), mobil menyu açarı və profil avatarı |
| [`src/components/app/TopBar.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/TopBar.css) | TopBar stilləri |
| [`src/components/app/DashboardView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/DashboardView.tsx) | Əsas iş lövhəsi: Tələbəyə salamlama, 4 əsas statistika kartı, günün cədvəli və elanlar |
| [`src/components/app/DashboardView.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/DashboardView.css) | Dashboard stilləri |
| [`src/components/app/CourseShellView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/CourseShellView.tsx) | Fənn portalı: Riyazi analiz və fizika üçün ilkin mövzu siyahısı, digər fənlər üçün ümumi görünüş, materiallar və qrup bölmələri |
| [`src/components/app/CourseShellView.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/CourseShellView.css) | Fənn portalı stilləri |
| `src/components/app/MathLearningView.tsx` & `MathLearning.css` | Nömrələnmiş mühazirə siyahısı, dərs seçimi, dörd daxili bölmə və geri/növbəti keçidləri |
| `src/components/app/PhysicsLearningView.tsx` & `PhysicsLearning.css` | LMS-ə uyğun fizika mövzuları, laboratoriya seçimi, müəllim materiallarının xülasəsi və mənbə qeydləri |
| `src/components/app/MathPractice.tsx` | Mövzu testləri və brauzerdə ən yaxşı nəticə |
| `src/components/app/MathProofChallenge.tsx` | Yazılı isbat cəhdi, ipucu və nümunə həll |
| `src/components/app/MathLabs.tsx` | Seçilmiş dərsə uyğun Ven, ε-qonşuluğu və ya sərhəd simulyasiyası |
| `src/components/app/MathTutorChat.tsx` | Hər mühazirənin altındakı AI söhbəti |

---

### 6. Modullar və Görünüşlər (`src/components/app/views/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/components/app/views/NotesView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/NotesView.tsx) | **Qrup Qeydləri**: Mühazirə ipucları zaman xətti, "Müəllim dedi", kateqoriyalar, nisbi tarix qruplaşması |
| [`src/components/app/views/MaterialsView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/MaterialsView.tsx) | **Akademik Materiallar**: Dərsliklər, laboratoriya faylları və slaydlar kataloqu |
| [`src/components/app/views/DeadlinesView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/DeadlinesView.tsx) | **Deadline İzləyicisi**: İmtahan və laboratoriya təhvil tarixləri, geri sayım sayğacı |
| [`src/components/app/views/QAView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/QAView.tsx) | **Sual-Cavab Forumu**: Suallar, cavablar, "Həll edildi" nişanı və səsvermə (Upvote) |
| [`src/components/app/views/PollsView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/PollsView.tsx) | **Qrup Sorğuları**: Qrupdaxili demokratik səsvermə və real-vaxt faiz qrafikləri |
| [`src/components/app/views/PythonSandboxView.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/PythonSandboxView.tsx) | **Python Sandbox**: Brauzerdaxili Python kod redaktoru, icra konsolu və nümunələr |
| [`src/components/app/views/PythonSandboxView.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/PythonSandboxView.css) | Python Sandbox stilləri və konsol tərtibatı |
| [`src/components/app/views/WaterSimulationView.tsx`](./src/components/app/views/WaterSimulationView.tsx) | İnteraktiv su laboratoriyası: dalğa səthi, damla/engel/silgi alətləri, hava rejimləri, fizika sürgüləri, pauza və PNG ixracı |
| [`src/components/app/views/WaterSimulationView.css`](./src/components/app/views/WaterSimulationView.css) | Su laboratoriyasının responsiv səhnə və idarəetmə paneli stilləri |
| [`src/components/app/views/ViewsCommon.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/views/ViewsCommon.css) | Qeydlər, Materiallar, Deadline, QA və Sorğu modulları üçün vahid akademik dizayn sistemi |

---

### 7. Dialoqlar və Modallar (`src/components/app/modals/` və `common/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/components/common/Modal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/common/Modal.tsx) | **Baza Portal Modalı**: `ReactDOM.createPortal(..., document.body)` ilə birbaşa `<body>`-yə mount olunan təməl dialoq |
| [`src/components/common/Modal.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/common/Modal.css) | Təhlükəsiz flex mərkəzləmə (`margin: auto`), `z-index: 99999` tam ekran örtüyü və scroll idarəsi |
| [`src/components/app/modals/ProfileModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/ProfileModal.tsx) | **Tələbə Profili Modalı**: Şəkil yükləmə, emoji avatarlar, kilidlənmiş ad/soyad/qrup, tələbə məlumatları, sabit alt panel |
| [`src/components/app/modals/ProfileModal.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/ProfileModal.css) | Tələbə profilinin stilləri, avatar seçicisi və sabitləşdirilmiş alt düymələr paneli |
| [`src/components/app/modals/CreateNoteModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/CreateNoteModal.tsx) | Yeni qrup qeydi əlavə etmə dialoqu |
| [`src/components/app/modals/CreateMaterialModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/CreateMaterialModal.tsx) | Yeni dərs materialı əlavə etmə dialoqu |
| [`src/components/app/modals/CreateDeadlineModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/CreateDeadlineModal.tsx) | Yeni tapşırıq / deadline əlavə etmə dialoqu |
| [`src/components/app/modals/CreatePollModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/CreatePollModal.tsx) | Yeni qrup sorğusu açma dialoqu |
| [`src/components/app/modals/CreateQuestionModal.tsx`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/components/app/modals/CreateQuestionModal.tsx) | Yeni akademik sual vermə dialoqu |

---

### 8. Xidmətlər və Resurslar (`src/services/`, `src/data/`, `src/styles/`)
| Fayl | Təsviri |
| :--- | :--- |
| [`src/services/googleAuth.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/services/googleAuth.ts) | Google Identity Services API klient skripti, Client ID idarəsi və JWT deşifrələyici |
| [`src/services/supabase.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/services/supabase.ts) | **Supabase Klienti**: Realtime və PostgreSQL bulud əlaqəsi, oflayn ehtiyat mexanizmi |
| [`src/services/db.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/services/db.ts) | Bütün məlumat strukturlarının saxlanması, oxunması və tip definisiyaları |
| `src/services/discussion.ts` | Müzakirə mövzusu ID-si və düzəliş/versiya işarələri |
| `src/hooks/useBookmarks.ts` | Tələbənin brauzerdə saxladığı paylaşımların idarəsi |
| `src/hooks/useSearchFocus.ts` | Ümumi axtarışdan konkret paylaşım kartına keçid |
| [`src/services/pythonRunner.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/services/pythonRunner.ts) | Python kodlarının brauzerdə təhlili və icra simulyatoru |
| [`src/services/waterSimulation.ts`](./src/services/waterSimulation.ts) | 2D sönümlü dalğa sahəsi, əks etdirən maneələr, damla impulsları və Canvas səth işıqlandırması |
| [`src/data/mockData.ts`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/data/mockData.ts) | **Rəsmi Dərs Cədvəli və Təqvim**: Rəsmi AzTU 6326A2 həftəlik cədvəli (`WEEKLY_SCHEDULE`), semestr təqvimi və geri sayım (`SEMESTER_CONFIG`), 15 həftəlik fənn sillabusları (`COURSE_SYLLABUS`) və real müəllim məlumatları |
| `src/data/mathLessons.ts` | Hazırda keçilən riyazi analiz mövzularının qaydaları, testləri və AI konteksti |
| `src/data/physicsContent.ts` | LMS-in 8 fizika mövzusu, 7 laboratoriyası və ayrıca nixrom təlimatı üçün mənbə əsaslı statik məzmun |
| `api/lecture-chat.ts` | Gemini 3.1 Flash-Lite üçün server funksiyası; mövzu seçimi və sorğu limitləri |
| [`src/styles/global.css`](file:///c:/Users/Tech%20Evo%20Computers/Desktop/Layihələr/AzTu/src/styles/global.css) | Qlobal CSS dəyişənləri (rənglər, şriftlər, spacing, radiuslar, animasiyalar) |
