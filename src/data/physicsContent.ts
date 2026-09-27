import { PHYSICS_LESSON_DETAILS } from './physicsLessonDetails';
import type { PhysicsExplanation } from './physicsLessonDetails';
import { PHYSICS_LAB_DETAILS } from './physicsLabDetails';

export interface PhysicsTopic {
  id: string;
  title: string;
  outline: string[];
  sourceFile?: string;
  pdfUrl?: string;
  presentationNumber?: number;
  explanations?: PhysicsExplanation[];
  checkQuestions?: string[];
}

export interface PhysicsLab {
  id: string;
  title: string;
  sourceFile?: string;
  pdfUrl?: string;
  objective?: string;
  equipment?: string;
  steps?: string[];
  result?: string;
  theory?: PhysicsExplanation[];
  detailedSteps?: string[];
  calculations?: string[];
}

const PHYSICS_PDF_BASE_URL = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/physics';

// Order and titles come from the student's current LMS screenshots (September 2026).
// Topics 1–4 follow the attached teacher presentations. Topics 5–8 use only the
// LMS outline and are clearly identified as independent study notes in the UI.
export const PHYSICS_TOPICS: PhysicsTopic[] = [
  {
    id: 'mechanics',
    title: 'İrəliləmə və fırlanma hərəkətinin dinamikası',
    outline: ['Nyuton qanunları, qüvvələr və impulsun saxlanması', 'Qüvvə momenti, ətalət momenti və impuls momenti', 'Mexaniki iş, güc, kinetik və potensial enerji', 'Enerjinin saxlanması və fırlanan cismin enerjisi'],
    sourceFile: 'YENİ-qr.6326 a1,a2-1-İRƏLİLƏMƏ və FIRLANMA HƏRƏKƏTİ..pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh1-dinamika.pdf`,
    presentationNumber: 1,
    explanations: [
      { title: '1. İnersial sistem və hərəkətin təsviri', text: 'Mexaniki hərəkəti həmişə seçilmiş hesablama sisteminə görə təsvir edirik. Sükunətdə olan və ya düzxətli bərabərsürətli hərəkət edən sistem inersial hesablama sistemi sayılır. Təqdimatda bərabərsürətli lift və avtomobil nümunələri verilir. Qalileyin nisbilik prinsipinə görə mexanikanın qanunları bütün inersial sistemlərdə eyni formadadır. Lakin cismin sürəti və impulsu seçilən sistemdən asılı ola bilər; təcil və qüvvə isə klassik mexanikada bu keçiddə dəyişmir. Buna görə “cisim hərəkət edir” deməzdən əvvəl onun nəyə nəzərən hərəkət etdiyini dəqiqləşdirmək lazımdır.', formula: 'v(t) = dr/dt;  a(t) = dv/dt = d²r/dt² = a_τ τ + (v²/R) n' },
      { title: '2. Qüvvə, kütlə və Nyuton qanunları', text: 'Qüvvə cisimlərin qarşılıqlı təsirini göstərən vektor kəmiyyətdir: təsir cismin sürətini, istiqamətini və ya formasını dəyişə bilər. Kütlə cismin ətalət ölçüsüdür; eyni qüvvə böyük kütləni daha az təcilləndirir. Nyutonun I qanunu xarici təsir yoxdursa cismin sükunət və ya düzxətli bərabərsürətli hərəkət halını saxladığını bildirir. II qanun impulsun zamana görə törəməsini əvəzləyici qüvvə ilə əlaqələndirir. III qanuna görə iki cismin bir-birinə təsir qüvvələri qiymətcə bərabər, istiqamətcə əksdir və müxtəlif cisimlərə tətbiq olunur.', formula: 'dp/dt = ΣF;  m(d²r/dt²) = ΣF;  F₁₂ = −F₂₁' },
      { title: '3. Təbiətdə və mexanikada qüvvələr', text: 'Mühazirə qravitasiya, elektromaqnit, güclü və zəif qarşılıqlı təsirləri ayırır. Mexaniki məsələlərdə ağırlıq qüvvəsi qravitasiyadan, elastiklik və sürtünmə isə maddənin elektromaqnit qarşılıqlı təsirindən yaranır. Elastik deformasiya zamanı Huk qanunu həm mütləq uzanma (F = -kx), həm də mexaniki gərginlik və Yunq modulu (σ = E·ε) ilə ifadə olunur.', formula: 'F_qrav = −G(m₁m₂/r²)e_r;  σ = F/S = E·(Δl/l);  F_el = −kx' },
      { title: '4. İmpuls, daxili və xarici qüvvələr', text: 'İmpuls kütlə ilə sürətin hasilidir və sürət istiqamətində yönəlir. Sistemin daxilindəki cisimlərin qarşılıqlı təsiri daxili, kənar cismin təsiri xarici qüvvə sayılır. Xarici qüvvələrin yekun impulsu sıfırdırsa sistemin tam impulsu saxlanır və kütlə mərkəzi sabit sürətlə hərəkət edir.', formula: 'p = mv;  ∫ F(t)dt = Δp;  ΣF_xar = 0 ⇒ P = Σmᵢvᵢ = const' },
      { title: '5. Xətti və bucaq kəmiyyətləri', text: 'İrəliləmə hərəkətində mövqe, sürət və təcil işlədilir; sabit ox ətrafında fırlanmada bunların qarşılığı bucaq (φ), bucaq sürəti (ω = dφ/dt) və bucaq təcilidir (ε = dω/dt = d²φ/dt²). Xətti sürət vektoru bucaq sürəti ilə radius-vektorun vektorial hasilinə bərabərdir.', formula: 'v = [ω × r];  v = ωR;  a_τ = εR;  a_n = ω²R' },
      { title: '6. Qüvvə momenti və ətalət momenti', text: 'Qüvvə momenti M = [r × F] vektorial hasili ilə təyin olunur. Fırlanmadakı ətalət ölçüsü ətalət momentidir (I = ∫ r² dm). Kütlə mərkəzindən keçən oxa paralel və ondan d məsafədə yerləşən ixtiyari oxa nəzərən ətalət momenti Hüygens–Şteyner teoremi ilə tapılır.', formula: 'M = [r × F];  I_z = Σmᵢrᵢ² = ∫ r² dm;  I = I_c + md²' },
      { title: '7. Fırlanma dinamikası və impuls momenti', text: 'Sabit oxa nəzərən fırlanma dinamikasının əsas tənliyi M_z = I_z·ε = I_z(d²φ/dt²) şəklindədir. Xarici qüvvə momentlərinin cəmi sıfır olarsa, sistemin tam impuls momenti L = Iω sabit qalır.', formula: 'dL/dt = ΣM_xar;  M_z = I_z·ε;  L_z = I_z·ω = const' },
      { title: '8. Mexaniki iş və güc', text: 'Dəyişən F(r) qüvvəsinin əyrilxətli L yolu üzrə gördüyü iş xətti inteqralla hesablanır. Ani güc işin zamana görə törəməsi olub qüvvə və sürət vektorlarının skalyar hasilinə bərabərdir.', formula: 'A₁₂ = ∫(L) F·dr;  P = dA/dt = (F · v);  dA_fır = M_z dφ' },
      { title: '9. Kinetik və potensial enerji, Qradient əlaqəsi', text: 'Konservativ sahədə qapalı kontur üzrə iş sıfırdır (∮ F·dr = 0) və qüvvə vektoru potensial enerjinin əks işarəli qradientinə bərabərdir: F = −grad(E_p). Həm irəliləmə, həm də fırlanma hərəkəti edən bərk cismin tam kinetik enerjisi kütlə mərkəzinin irəliləmə enerjisi ilə fırlanma enerjisinin cəmidir.', formula: 'F = −grad(E_p);  E_k = mv_c²/2 + I_cω²/2;  E_p(yay) = kx²/2' },
      { title: '10. Enerjinin saxlanması və tətbiq sərhədi', text: 'Yalnız konservativ qüvvələr təsir etdikdə tam mexaniki enerji E = E_k + E_p sabit qalır. Qeyri-konservativ (disipativ) qüvvələr olduqda tam mexaniki enerjinin dəyişməsi həmin qüvvələrin işinə bərabərdir.', formula: 'Δ(E_k + E_p) = A_qeyri_konservativ' },
    ],
    checkQuestions: ['İrəliləmə hərəkətində kütləyə uyğun fırlanma kəmiyyəti hansıdır və Hüygens–Şteyner teoremi necə yazılır?', 'Konservativ sahədə F qüvvə vektoru ilə E_p potensial enerjisi arasında hansı diferensial (qradient) əlaqə var?', 'Diyirlənən bütöv diskin tam kinetik enerjisi necə hesablanır?'],
  },
  {
    id: 'thermodynamics',
    title: 'Molekulyar fizika və termodinamikanın əsasları',
    outline: ['Molekulyar-kinetik nəzəriyyənin əsas müddəaları', 'Maksvell sürət paylanması, barometrik düstur və Bolsman paylanması', 'Sərbəstlik dərəcələri və daxili enerji', 'Termodinamikanın I və II qanunları, izoproseslər, adiabatik proses və entropiya'],
    sourceFile: 'YENİ-qr.6326a1,a2 - 2-Molekulyar Fizika və Termodinamikanın əsasları.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh2-termodinamika.pdf`,
    presentationNumber: 2,
    explanations: [
      { title: '1. Molekulyar-kinetik nəzəriyyənin əsas tənliyi və Mendeleyev–Klapeyron tənliyi', text: 'İdeal qazın təzyiqi molekulların irəliləmə hərəkətinin orta kvadratik sürəti və orta kinetik enerjisi ilə mütənasibdir.', formula: 'p = (1/3)nm₀<v²> = (2/3)n<ε_ir> = nkT;  pV = (m/M)RT = νRT' },
      { title: '2. Maksvell sürət paylanması funksiyası və xarakterik sürətlər', text: 'Termodinamik tarazlıqda olan qaz molekullarının sürətlərə görə paylanması Maksvell paylanma funksiyası ilə təsvir olunur.', formula: 'f(v) = 4π(m₀/(2πkT))^(3/2) v² exp(−m₀v²/(2kT));  v_eht = √(2RT/M) < <v> = √(8RT/πM) < v_kv = √(3RT/M)' },
      { title: '3. Barometrik düstur və Bolsman paylanması', text: 'Potensial sahədə (məsələn, bircins ağırlıq sahəsində) hissəciklərin konsentrasiyası potensial enerjidən eksponensial asılı olaraq paylanır.', formula: 'p(h) = p₀ exp(−Mgh/(RT));  n(r) = n₀ exp(−E_p(r)/(kT))' },
      { title: '4. Sərbəstlik dərəcələri (i), Bolsmanın bərabər paylanma teoremi və Mayer düsturu', text: 'Hər bir irəliləmə və fırlanma sərbəstlik dərəcəsinə orta hesabla (1/2)kT enerji düşür. Biratomlu qaz üçün i=3, ikiatomlu sərt molekul üçün i=5, çoxatomlu qeyri-xətti molekul üçün i=6.', formula: 'U = (i/2)νRT;  C_V = (i/2)R;  C_P = ((i+2)/2)R;  C_P − C_V = R;  γ = C_P/C_V = (i+2)/i' },
      { title: '5. Termodinamikanın I qanununun diferensial forması və izoproseslər', text: 'δQ elementar istilik miqdarı daxili enerjinin dU tam diferensialına və δA = p dV elementar həcm işinə sərf olunur.', formula: 'δQ = dU + p dV;  A_izoterm = νRT ln(V₂/V₁);  A_izobar = pΔV = νRΔT' },
      { title: '6. Adiabatik proses (Puasson tənliyi), Karno tsikli və Entropiya', text: 'İstilik mübadiləsi olmayan (δQ = 0) prosesdə pV^γ = const. Dönən Karno tsiklinin FİƏ-si η = 1 − T₂/T₁, entropiya dəyişməsi isə dS = δQ_dönən / T və S = k ln W (Bolsman düsturu) ilə təyin edilir.', formula: 'pV^γ = const;  TV^(γ−1) = const;  A_adiabat = (p₁V₁ − p₂V₂)/(γ − 1);  dS ≥ δQ/T;  S = k ln W' },
    ],
    checkQuestions: ['Maksvell paylanmasında ən ehtimallı, orta ədədi və orta kvadratik sürətlər bir-birindən necə fərqlənir?', 'Puasson tənliyi (pV^γ = const) Termodinamikanın I qanunundan necə çıxarılır?', 'Entropiyanın termodinamik (Klauzius) və statistik (Bolsman) tərifləri nədir?'],
  },
  {
    id: 'electrostatics',
    title: 'Elektrostatika, dielektriklər və naqillər',
    outline: ['Kulon qanunu və elektrik sahəsinin intensivliyi', 'Qauss teoremi, elektrostatik iş və potensial', 'Dipol və dielektrikin polyarlaşması', 'Naqillər, elektrik tutumu və kondensatorlar'],
    sourceFile: 'YENİ-qr.6326a1,a2-3--ELEKTROSTATİKA.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh3-elektrostatika.pdf`,
    presentationNumber: 3,
    explanations: [
      { title: '1. Kulon qanununun vektorial forması, yük sıxlıqları və superpozisiya prinsipi', text: 'Kəsilməz paylanmış yüklərin yaratdığı sahə xətti (λ = dq/dl), səthi (σ = dq/dS) və ya həcmi (ρ = dq/dV) yük sıxlığı üzrə inteqrallamaqla hesablanır.', formula: 'F₁₂ = (1/(4πε₀ε)) (q₁q₂/r³) r;  E = ∫ (1/(4πε₀ε)) (dq/r³) r;  E = ΣEᵢ' },
      { title: '2. Ostroqradski–Qauss teoremi və elektrik sürüşmə vektoru (D)', text: 'Qapalı səthdən keçən D = ε₀εE elektrik sürüşmə vektoru seli həmin səthin daxilindəki sərbəst yüklərin cəbri cəminə bərabərdir.', formula: '∮(S) D·dS = Σq_sərbəst;  div D = ρ;  D = ε₀E + P = ε₀εE' },
      { title: '3. Elektrostatik sahənin potensiallığı, sirkulyasiya və qradient', text: 'Elektrostatik sahədə intensivlik vektorunun qapalı kontur üzrə sirkulyasiyası sıfırdır (∮ E·dl = 0) və E vektoru potensialın əks işarəli qradientinə bərabərdir.', formula: '∮(L) E·dl = 0;  φ₁ − φ₂ = ∫(1→2) E·dl;  E = −grad φ = −∇φ' },
      { title: '4. Elektrik tutumu, kondensatorlar və elektrostatik sahənin enerji sıxlığı', text: 'Müstəvi, silindrik və kürəvi kondensatorların tutumu, eləcə də elektrik sahəsinin həcmi enerji sıxlığı (w_e = dW/dV):', formula: 'C_müst = ε₀εS/d;  W = CU²/2 = q²/(2C);  w_e = (1/2)ε₀εE² = (E·D)/2' },
    ],
    checkQuestions: ['Ostroqradski–Qauss teoreminin inteqral və diferensial formaları necə yazılır?', 'Elektrostatik sahənin potensial xarakterli olması sirkulyasiya inteqralı ilə necə ifadə olunur?', 'Elektrostatik sahənin həcmi enerji sıxlığı düsturu necədir?'],
  },
  {
    id: 'current-magnetism',
    title: 'Sabit cərəyan, maqnit sahəsi və induksiya',
    outline: ['Cərəyan, elektrik hərəkət qüvvəsi və Om qanunu (inteqral və diferensial)', 'Coul–Lens qanunu, Kirxhof qaydaları və klassik elektron nəzəriyyəsi', 'Maqnit sahəsi, Bio–Savar–Laplas, Amper və Lorens qüvvələri', 'Faradey induksiyası, öz-özünə induksiya və Maksvell tənlikləri'],
    sourceFile: 'YENİ-qr.6326 a1,a2 -4--SABİT ELEKTRİK CƏRƏYANI.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh4-sabit-cereyan.pdf`,
    presentationNumber: 4,
    explanations: [
      { title: '1. Cərəyan şiddəti, cərəyan sıxlığı vektoru (j) və kəsilməzlik tənliyi', text: 'İxtiyari S səthindən keçən cərəyan şiddəti j cərəyan sıxlığı vektorunun səth inteqralına bərabərdir.', formula: 'I = dq/dt = ∫(S) j·dS;  j = n·e·<v>;  div j + ∂ρ/∂t = 0' },
      { title: '2. Om və Coul–Lens qanunlarının inteqral və diferensial formaları', text: 'Lokal (diferensial) Om qanunu j = γ(E + E_kən), diferensial Coul–Lens qanunu isə vahid həcmdə ayrılan istilik gücünü w = γE² ifadə edir.', formula: 'I = (φ₁ − φ₂ + ε₁₂)/R;  j = γ(E + E_kən) = (1/ρ)(E + E_kən);  w_ist = j·E = γE² = ρj²' },
      { title: '3. Budaqlanmış dövrələr üçün Kirxhof qaydaları və Drude–Lorens nəzəriyyəsi', text: 'Düyün qaydası ΣI_k = 0 və kontur qaydası Σ(I_k R_k) = Σε_k. Klassik elektron nəzəriyyəsində xüsusi keçiricilik sərbəst yol uzunluğu <λ> ilə ifadə olunur.', formula: 'ΣI_k = 0;  Σ(I_k R_k) = Σε_k;  γ = (n e² <λ>) / (2 m_e <u_ist>)' },
      { title: '4. Bio–Savar–Laplas qanunu, Tam cərəyan qanunu və Faradey–Maksvell induksiyası', text: 'Cərəyan elementinin maqnit induksiyası dB, B vektorunun sirkulyasiyası və elektromaqnit induksiya qanunu:', formula: 'dB = (μ₀μ/4π) [I dl × r]/r³;  ∮ B·dl = μ₀μ ΣI_k;  F_L = qE + q[v × B];  ε_i = −dΦ/dt' },
    ],
    checkQuestions: ['Om və Coul–Lens qanunlarının diferensial formaları necə yazılır?', 'Bio–Savar–Laplas qanunu və tam cərəyan qanunu (Amper sirkulyasiya teoremi) nəyi ifadə edir?', 'Qeyri-bircins dövrə hissəsi üçün ümumiləşmiş Om qanunu necədir?'],
  },
  {
    id: 'oscillations',
    title: 'Mexaniki və elektromaqnit rəqsləri və dalğaları',
    outline: ['Harmonik rəqslərin diferensial tənliyi və enerjisi', 'Sönən və məcburi rəqslər, loqarifmik dekrement və rezonans', 'RLC rəqs konturu, Tomson düsturu və konturun keyfiyyətliliyi', 'Dalğa tənliyi, faza/qrup sürəti və Умов–Poyntinq vektoru'],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 5,
    explanations: [
      { title: '1. Sərbəst harmonik rəqslərin diferensial tənliyi (Yaylı, Riyazi və Fiziki rəqqas)', text: 'Sürtünməsiz sistemdə tarazlıq vəziyyətindən kiçik meyllərdə hərəkət ikitərtibli bircins xətti diferensial tənliklə təsvir olunur. Fiziki rəqqasın gətirilmiş uzunluğu L_gət = I / (md) kimi təyin edilir.', formula: 'd²x/dt² + ω₀²x = 0 ⇒ x(t) = A cos(ω₀t + φ₀);  ω₀(yay) = √(k/m);  ω₀(fiz) = √(mgd/I)' },
      { title: '2. Sönən mexaniki və elektromaqnit rəqsləri, Loqarifmik dekrement və Keyfiyyətlilik', text: 'Müqavimət qüvvəsi F_m = −r·v (və ya RLC konturunda aktiv R müqaviməti) olduqda amplitud eksponensial qanunla azalır: A(t) = A₀ exp(−βt). Sönmə əmsalı β = r/(2m) (elektromaqnit konturunda β = R/(2L)), məxsusi tezlik isə ω = √(ω₀² − β²)-dir.', formula: 'd²x/dt² + 2β(dx/dt) + ω₀²x = 0;  x(t) = A₀e^(−βt)cos(ωt + φ₀);  δ = βT = (1/n)ln(A_k/A_{k+n});  Q = π/δ' },
      { title: '3. Məcburi rəqslər, Amplitud-tezlik xarakteristikası və Rezonans', text: 'Xarici periodik F(t) = F₀ cos(Ωt) qüvvəsinin təsiri altında qərarlaşmış rəqslərin amplitudu Ω = ω_rez = √(ω₀² − 2β²) tezliyində maksimuma (rezonansa) çatır.', formula: 'd²x/dt² + 2β(dx/dt) + ω₀²x = (F₀/m)cos(Ωt);  A(Ω) = (F₀/m) / √((ω₀² − Ω²)² + 4β²Ω²)' },
      { title: '4. Dalğa tənliyi (Dalamber tənliyi) və Elektromaqnit dalğalarının enerji axını (Poyntinq vektoru)', text: 'Elastik və elektromaqnit dalğalarının fəzada yayılması ikitərtibli xüsusi törəməli Dalamber dalğa tənliyi ilə təsvir olunur. Elektromaqnit dalğasının enerji axını sıxlığı Poyntinq vektoru S = [E × H] ilə müəyyən edilir.', formula: '∂²ξ/∂t² = v² (∂²ξ/∂x² + ∂²ξ/∂y² + ∂²ξ/∂z²);  ξ(x,t) = A cos(ωt − kx);  k = 2π/λ;  S = [E × H]' },
    ],
    checkQuestions: ['Sönən rəqslərin diferensial tənliyi və onun həlli necə yazılır?', 'Loqarifmik sönmə dekrementi (δ) ilə konturun keyfiyyətliliyi (Q) arasında hansı əlaqə var?', 'Məcburi rəqslərdə rezonans tezliyi məxsusi ω₀ tezliyindən nə qədər fərqlənir?'],
  },
  {
    id: 'optics',
    title: 'Dalğa optikası',
    outline: ['Koherent dalğaların interferensiyası, optik yollar fərqi və Nyuton halqaları', 'Hüygens–Frenel prinsipi, Frenel zonaları və Fraunhoffer difraksiyası (difraksiya qəfəsi)', 'İşığın dispersiyası (normal və anomal) və Rentgen şüalarının Vulf–Breqq difraksiyası', 'İşığın polyarlaşması, Malyus və Brüster qanunları, qoşa şüasındırma'],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 6,
    explanations: [
      { title: '1. Koherentlik, Optik yollar fərqi və Nazik təbəqələrdə / Nyuton halqalarında interferensiya', text: 'Eyni tezlikli və fazalar fərqi zamandan asılı olmayan (koherent) iki dalğa toplandıqda yekun intensivlik optik yollar fərqi Δ = n₂L₂ − n₁L₁ (fazalar fərqi δ = 2πΔ/λ) ilə təyin olunur. Nazik təbəqədə Δ = 2d√(n² − sin²i) ± λ/2. Nyuton halqalarında (Lab №6) əyrilik radiusu R olan linza üçün qaranlıq halqaların radiusu r_k = √(kλR)-dir.', formula: 'I = I₁ + I₂ + 2√(I₁I₂)cos(2πΔ/λ);  Δ_max = ±mλ;  Δ_min = ±(2m+1)λ/2;  r_k(qaranlıq) = √(kλR)' },
      { title: '2. Hüygens–Frenel prinsipi, Bir yarıqdan və Difraksiya qəfəsindən Fraunhoffer difraksiyası', text: 'Sabit d = a + b periodlu difraksiya qəfəsində baş maksimumlar d·sin(φ) = ±mλ şərtini ödəyir. Qəfəsin ayırdetmə qabiliyyəti R = λ/Δλ = m·N (N — ümumi cizgilər sayı) düsturu ilə tapılır.', formula: 'd · sin φ = ±m · λ  (m = 0, 1, 2, ...);  R = λ / Δλ = m · N;  Vulf–Breqq: 2d sin θ = mλ' },
      { title: '3. İşığın polyarlaşması: Malyus qanunu və Dielektrik səthindən qayıtmada Brüster qanunu', text: 'Təbii işıq polyarizatordan keçdikdə xətti polyarlaşmış işığa çevrilir (I₀ = (1/2)I_təbii). Analizatordan keçən intensivlik Malyus qanununa tabedir. İşıq Brüster bucağı (tg i_B = n₂₁) altında düşdükdə əks olunan şüa tam xətti polyarlaşır və sınan şüa ilə 90° bucaq əmələ gətirir.', formula: 'I = I₀ cos²α  (Malyus qanunu);  tg(i_B) = n₂₁,  i_B + r = π/2  (Brüster qanunu)' },
    ],
    checkQuestions: ['Nyuton halqaları təcrübəsində mərkəzi ləkənin əks olunan işıqda qaranlıq olmasının fiziki səbəbi nədir?', 'Difraksiya qəfəsinin baş maksimum şərti və ayırdetmə qabiliyyəti necə hesablanır?', 'Brüster bucağı altında düşən işıqda əks olunan və sınan şüalar arasındakı bucaq nəyə bərabərdir?'],
  },
  {
    id: 'quantum',
    title: 'Kvant fizikasının elementləri',
    outline: ['Mütləq qara cismin şüalanması: Kirxhof, Stefan–Bolsman, Vin və Plank qanunları', 'Fotonun enerjisi/impulsu, Xarici fotoeffekt (Eynşteyn tənliyi) və Kompton effekti', 'De-Broyl dalğaları və Heyzenberqin qeyri-müəyyənlik münasibətləri', 'Dalğa funksiyasının (ψ) statistik mənası və Stasionar Şrödinger tənliyi'],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 7,
    explanations: [
      { title: '1. İstilik şüalanması qanunları və Plankın kvant hipotezi', text: 'Mütləq qara cismin inteqral şüalanma qabiliyyəti mütləq temperaturun 4-cü dərəcəsi ilə mütənasibdir (Stefan–Bolsman), maksimum şüalanmaya uyğun dalğa uzunluğu isə temperaturla tərs mütənasibdir (Vin yerdəyişmə qanunu). Plank "ultrabənövşəyi fəlakəti" aradan qaldırmaq üçün enerjinin ε = hν kvantları ilə şüalandığını postulat kimi qəbul etdi.', formula: 'R_e = σT⁴;  λ_max · T = b;  r_(ν,T) = (2πν²/c²) · hν / (exp(hν/(kT)) − 1)' },
      { title: '2. Korpuskulyar optika: Xarici fotoeffekt və Kompton səpilməsi', text: 'Foton ε = hν = ℏω enerjisinə və p = h/λ = ℏk impulsuna malik kvant zərrəciyidir. Xarici fotoeffektdə udulan fotonun enerjisi elektronun çıxış işinə və maksimal kinetik enerjisinə sərf olunur. Kompton effektində fotonun sərbəst elektrondan elastik səpilməsi zamanı dalğa uzunluğu Δλ qədər artır.', formula: 'hν = A_çıx + mv_max²/2 = A_çıx + eU_sax;  ν_min = A_çıx/h;  Δλ = (h/(m₀c))(1 − cos θ)' },
      { title: '3. De-Broyl dalğaları, Heyzenberq qeyri-müəyyənlik prinsipi və Şrödinger tənliyi', text: 'Hər bir p impulslu mikrozərrəciyə λ = h/p uzunluqlu De-Broyl dalğası uyğun gəlir. Mikrozərrəciyin koordinatı və impulsu eyni zamanda ixtiyari dəqiqliklə təyin edilə bilməz (Heyzenberq). Zərrəciyin halı ψ(r,t) dalğa funksiyası ilə təsvir edilir (|ψ|² dV — ehtimal sıxlığı).', formula: 'λ = h/p = h/√(2mE_k);  Δx·Δp_x ≥ ℏ/2;  ΔE·Δt ≥ ℏ/2;  −(ℏ²/2m)∇²ψ + U(r)ψ = Eψ' },
    ],
    checkQuestions: ['Eynşteynin fotoeffekt tənliyinə əsasən fotoeffektin qırmızı sərhədi və saxlayıcı potensiallar fərqi nədən asılıdır?', 'Kompton səpilməsində dalğa uzunluğunun dəyişməsi (Δλ) səpilmə bucağından necə asılıdır?', 'Stasionar Şrödinger tənliyi və |ψ(x,y,z)|² kəmiyyətinin fiziki mənası nədir?'],
  },
  {
    id: 'atom-nucleus',
    title: 'Atom və nüvə fizikasının elementləri',
    outline: ['Rezerford modeli, Bor postulatları və Hidrogen atomunun spektral seriyaları (Lab №8)', 'Kvant ədədləri (n, l, m_l, m_s) və Pauli prinsipi', 'Atom nüvəsinin tərkibi, kütlə defekti və rabitə enerjisi', 'Radioaktiv parçalanma qanunu, yarımparçalanma periodu və nüvə reaksiyaları'],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 8,
    explanations: [
      { title: '1. Bor postulatları və Hidrogen atomunun xətti spektrləri (Layman, Balmer, Paşen)', text: 'Borun I postulatına görə stasionar orbitlərdə elektronun impuls momenti kvantlanır: mvr_n = nℏ (n = 1, 2, ...). II postulata görə elektron m-ci orbitdən n-ci orbitə keçdikdə hν = E_m − E_n enerjili foton şüalanır. Hidrogen atomunda E_n = −13.6 eV / n².', formula: 'mvr_n = nℏ;  1/λ = R · (1/n² − 1/m²)  (n=1 Layman, n=2 Balmer, n=3 Paşen);  R ≈ 1.097×10⁷ m⁻¹' },
      { title: '2. Atom nüvəsinin kütlə defekti, rabitə enerjisi və Radioaktiv parçalanma qanunu', text: 'Z proton və N = A − Z neytrondan ibarət nüvənin sükunət kütləsi ayrı-ayrı nuklonların kütlələri cəmindən Δm qədər kiçikdir (kütlə defekti). Radioaktiv nüvələrin zamana görə azalması eksponensial qanuna tabedir.', formula: 'Δm = Zm_p + (A − Z)m_n − M_nüvə;  E_rab = Δm·c²;  N(t) = N₀e^(−λt);  T_(1/2) = ln(2)/λ;  A = |dN/dt| = λN' },
    ],
    checkQuestions: ['Hidrogen atomunda Balmer seriyasının dalğa uzunluqları hansı düsturla hesablanır?', 'Atom nüvəsinin kütlə defekti və xüsusi rabitə enerjisi nədir?', 'Radioaktiv parçalanma sabiti (λ) ilə yarımparçalanma periodu (T₁/₂) arasındakı əlaqə necə çıxarılır?'],
  },
];

// Official KOICA LMS Physics Labs
export const PHYSICS_LABS: PhysicsLab[] = [
  { id: 'momentum', title: 'İmpulsun saxlanması qanununun yoxlanılması' },
  {
    id: 'inertia', title: 'Lab N 1. Diskin və həlqənin ətalət momentinin təyini',
    sourceFile: 'DİSKİN ƏTALƏT MOMENTİNİN TƏYİNİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab1-disk-etalet.pdf`,
    objective: 'Disk və həlqənin ətalət momentlərini təcrübədə ölçüb nəzəri qiymətlərlə müqayisə etmək.',
    equipment: 'Fırlanma sensoru, disk və həlqə, müxtəlif yüklər, tərəzi, ştangenpərgar və interfeys.',
    steps: ['Diskin, həlqənin və şkivin kütlə və radiuslarını ölç.', 'Asılmış yük ilə fırlanmanı başlat; bucaq sürəti–zaman qrafikinin meylindən bucaq təcilini tap.', 'Şkiv, disk və həlqə üçün ətalət momentlərini ayrı-ayrılıqda hesabla; nəzəri və təcrübi nəticələri müqayisə et.'],
    result: 'Hesabatda ölçülər, bucaq sürəti qrafiki, nəzəri və təcrübi ətalət momentləri, kənara çıxma göstərilir.',
  },
  {
    id: 'heat-capacity', title: 'Lab N 2. Qazların molyar istilik tutumları nisbətinin təyini',
    sourceFile: 'QAZIN İSTİLİK TUTUMLARI.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab2-qaz-istilik.pdf`,
    objective: 'Hava üçün adiabatik prosesi araşdırıb Cₚ/Cᵥ nisbətini təyin etmək.',
    equipment: 'İstilik maşını, porşen, təzyiq sensoru, interfeys və kompüter.',
    steps: ['Porşeni 9 sm hündürlükdə saxlayıb təzyiq rəqslərinin periodunu ölç.', 'Hündürlüyü 1 sm addımlarla 8 sm-dən 1 sm-ə endirərək periodları qeyd et.', 'h ilə T² arasındakı qrafiki qur; meyldən istilik tutumları nisbətini hesablayıb ideal qiymətlə müqayisə et.'],
    result: 'Hesabatda h və period ölçüləri, h(T²) qrafiki və alınan Cₚ/Cᵥ qiyməti göstərilir.',
  },
  {
    id: 'nichrome', title: 'Lab N 3. Naqillərin (nixrom məftilin) xüsusi müqavimətinin təyini',
    sourceFile: 'NİXROM MƏFTİLİN XÜSUSİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab3-nixrom-muqavimet.pdf`,
    objective: 'Om qanununa əsasən nixrom naqilin xüsusi elektrik müqavimətini (ρ = R·S/l) təyin etmək.',
    equipment: 'Nixrom naqil, müqavimət ölçmə qurğusu, ampermetr, voltmetr, ştangenpərgar və mikrometr.',
    steps: ['Məftilin diametrini bir neçə nöqtədə ölçərək en kəsiyinin sahəsini (S = πd²/4) hesabla.', 'Müxtəlif uzunluqlarda gərginlik və cərəyanı ölçərək müqaviməti (R = U/I) tap.', 'ρ = πd²U / (4lI) düsturu ilə xüsusi müqaviməti və ölçmə xətasını təyin et.'],
    result: 'Hesabatda naqilin həndəsi ölçüləri, U və I qiymətləri, xüsusi müqavimətin orta qiyməti və xətası göstərilir.',
  },
  {
    id: 'earth-field', title: 'Lab №4. Yerin maqnit sahəsinin toplananlarının təyini',
    sourceFile: 'YERİN MAQNİT SAHƏSİNİN İNDUKSİYASININ ÜFÜQİ,.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab4-yer-maqnit.pdf`,
    objective: 'Maqnit induksiyasının üfüqi toplananını, tam qiymətini və maqnit meyl bucağını müəyyən etmək.',
    equipment: 'Maqnit sahəsi və fırlanma sensorları, maqnit əqrəbi, Qauss kamerası, interfeys və kompüter.',
    steps: ['Sensoru hazırlayıb üfüqi müstəvidə döndər; qrafikin pikindən üfüqi toplananı oxu.', 'Sensoru şaquli müstəvidə döndərərək tam induksiyanı ölç.', 'Üfüqi və tam qiymətlərdən maqnit meyl bucağını hesabla.'],
    result: 'Hesabatda hər iki qrafik, sahənin üfüqi və tam qiymətləri, meyl bucağı verilir.',
  },
  {
    id: 'damped-circuit', title: 'Lab №5. Sönən elektromaqnit rəqslərinin öyrənilməsi',
    sourceFile: 'RƏQS KONTURUNDA SÖNƏN ELEKTROMAQNİT RƏQSLƏRİNİN tədqiqi.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab5-sonen-reqsler.pdf`,
    objective: 'Sönən rəqsləri ossilloqrafda müşahidə edib loqarifmik dekrementi və konturun keyfiyyətliyini təyin etmək.',
    equipment: 'Ossilloqraf, induktiv sarğac, kondensator, müqavimətlər mağazası və səs generatoru.',
    steps: ['Rəqs konturunu qur və ossilloqrafda sönən rəqslərin şəklini al.', 'Müqaviməti artıraraq aperiodik boşalmaya keçid həddini qeyd et.', 'Bir neçə period üzrə amplitudları ölç; loqarifmik dekrementi və keyfiyyətliyi tapıb nəzəri qiymətlərlə müqayisə et.'],
    result: 'Hesabatda ossilloqram, amplitud və müqavimət ölçüləri, sönmə göstəriciləri göstərilir.',
  },
  {
    id: 'newton-rings', title: 'Lab N 6. Nyuton halqaları ilə işığın dalğa uzunluğunun təyini',
    sourceFile: 'İşıgın interferensiyası.Nyuton halqaları vasitəsilə işıgın dalfa uzunlugunun təyini..docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab6-nyuton-halqalari.pdf`,
    objective: 'İşığın interferensiyasını müşahidə edib Nyuton halqalarının radiuslarından dalğa uzunluğunu təyin etmək.',
    equipment: 'İşıq mənbəyi, monoxromatik filtr, müstəvi qabarıq linza və şüşə lövhə, mikrometrik okulyar.',
    steps: ['Qurğunu işıqlandır və okulyarda halqaları aydın görənədək nizamla.', 'Bir neçə ardıcıl halqanın radiusunu mikrometrik vintlə ölç və cədvələ yaz.', 'Təlimatdakı düsturla dalğa uzunluğunu hesabla; təkrarlardan orta qiymət və xətanı tap.'],
    result: 'Hesabatda halqaların ölçüləri, hesablanan dalğa uzunluğu, orta qiymət və ölçmə xətası yer alır.',
  },
  {
    id: 'atomic-spectra', title: 'Lab N 8. Atom spektrinin öyrənilməsi',
    sourceFile: 'ATOM SPEKTİRLƏRİNİN OYRƏNİLMƏSİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab8-atom-spektri.pdf`,
    objective: 'Hidrogenin görünən spektrini ölçüb Ridberq sabitini hesablamaq; təlimatın ikinci üsulunda digər lampaların spektrlərini müqayisə etmək.',
    equipment: 'Hidrogen qaz boşalma borusu, monoxromator və qidalanma bloku; ikinci üsulda spektrofotometr və atom lampaları.',
    steps: ['Hidrogen borusunu qoşub monoxromatorda Balmer xətlərinin mövqelərini qeyd et.', 'Xətlərdən dalğa uzunluqlarını və hər xətt üçün Ridberq sabitini hesablayıb orta qiymət al.', 'İkinci üsul tətbiq edilərsə, natriumla qəfəs sabitini tap, helium və digər lampaların xətlərini etalonlarla müqayisə et.'],
    result: 'Hesabatda spektr xətləri, dalğa uzunluqları, Ridberq sabitinin qiymətləri və istifadə olunan üsula uyğun müqayisələr göstərilir.',
  },
];

export const PHYSICS_EXTRA_LAB: PhysicsLab = {
  id: 'nichrome', title: 'Lab N 3. Naqillərin (nixrom məftilin) xüsusi müqavimətinin təyini',
  sourceFile: 'NİXROM MƏFTİLİN XÜSUSİ.docx',
  pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab3-nixrom-muqavimet.pdf`,
  objective: 'Naqilin xüsusi müqavimətini ölçmək.',
  equipment: 'Nixrom naqil, müqavimət ölçmə qurğusu, ştangenpərgar və mikrometr.',
  steps: ['Məftilin diametrini bir neçə nöqtədə ölçərək en kəsiyinin bircinsliyini yoxla.', 'Müxtəlif uzunluqlarda gərginlik və cərəyanı ölçərək müqaviməti hesabla.', 'R ilə uzunluq qrafikindən xüsusi müqaviməti və ölçmə xətasını təyin et.'],
};

for (const topic of PHYSICS_TOPICS) {
  const details = PHYSICS_LESSON_DETAILS[topic.id];
  if (details) topic.explanations = [...(topic.explanations ?? []), ...details];
}

for (const lab of [...PHYSICS_LABS, PHYSICS_EXTRA_LAB]) {
  const details = PHYSICS_LAB_DETAILS[lab.id];
  if (details) Object.assign(lab, details);
}
