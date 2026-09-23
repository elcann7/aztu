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
    sourceFile: '20260917_202902_6aac154ea9e27.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/muhazire-01.pdf`,
    presentationNumber: 1,
    explanations: [
      { title: '1. İnersial sistem və hərəkətin təsviri', text: 'Mexaniki hərəkəti həmişə seçilmiş hesablama sisteminə görə təsvir edirik. Sükunətdə olan və ya düzxətli bərabərsürətli hərəkət edən sistem inersial hesablama sistemi sayılır. Təqdimatda bərabərsürətli lift və avtomobil nümunələri verilir. Qalileyin nisbilik prinsipinə görə mexanikanın qanunları bütün inersial sistemlərdə eyni formadadır. Lakin cismin sürəti və impulsu seçilən sistemdən asılı ola bilər; təcil və qüvvə isə klassik mexanikada bu keçiddə dəyişmir. Buna görə “cisim hərəkət edir” deməzdən əvvəl onun nəyə nəzərən hərəkət etdiyini dəqiqləşdirmək lazımdır.' },
      { title: '2. Qüvvə, kütlə və Nyuton qanunları', text: 'Qüvvə cisimlərin qarşılıqlı təsirini göstərən vektor kəmiyyətdir: təsir cismin sürətini, istiqamətini və ya formasını dəyişə bilər. Kütlə cismin ətalət ölçüsüdür; eyni qüvvə böyük kütləni daha az təcilləndirir. Nyutonun I qanunu xarici təsir yoxdursa cismin sükunət və ya düzxətli bərabərsürətli hərəkət halını saxladığını bildirir. II qanun əvəzləyici qüvvəni təcillə əlaqələndirir. III qanuna görə iki cismin bir-birinə təsir qüvvələri qiymətcə bərabər, istiqamətcə əksdir və müxtəlif cisimlərə tətbiq olunur. Məsələn, 2 kq cismə 6 N yekun qüvvə təsir etsə, təcil 3 m/s² olar.', formula: 'ΣF = ma;  F₁₂ = −F₂₁' },
      { title: '3. Təbiətdə və mexanikada qüvvələr', text: 'Mühazirə qravitasiya, elektromaqnit, güclü və zəif qarşılıqlı təsirləri ayırır. Mexaniki məsələlərdə ağırlıq qüvvəsi qravitasiyadan, elastiklik və sürtünmə isə maddənin elektromaqnit qarşılıqlı təsirindən yaranır. Sərbəst cisim diaqramı qurarkən əvvəlcə cismə həqiqətən təsir edən bütün qüvvələri göstərmək, sonra oxlar üzrə proyeksiyalarını toplamaq lazımdır. Sürtünmə hərəkətə və ya sürüşmə meylinə qarşı yönəlir; onun işi adətən mexaniki enerjini azaldır. Elastik yayda bərpaedici qüvvə deformasiyaya əks istiqamətlidir.', formula: 'Fₐ = mg;  Fᵧₐᵧ = −kx' },
      { title: '4. İmpuls, daxili və xarici qüvvələr', text: 'İmpuls kütlə ilə sürətin hasilidir və sürət istiqamətində yönəlir. Sistemin daxilindəki cisimlərin qarşılıqlı təsiri daxili, kənar cismin təsiri xarici qüvvə sayılır. Toqquşmada ayrı-ayrı cisimlərin impulsu dəyişə bilər, amma daxili qüvvələr Nyutonun III qanununa uyğun cütlərlə bir-birini kompensasiya edir. Xarici qüvvələrin yekun impulsu sıfırdırsa sistemin tam impulsu saxlanır. Bu qanunu işlədərkən əvvəl sistem sərhədini seçmək, sonra toqquşmadan əvvəlki və sonrakı vektor impulsları eyni ox üzrə yazmaq lazımdır. Məsələn, iki araba bir-birini itələdikdə onların əks istiqamətli impuls dəyişmələrinin cəmi sıfır ola bilər.', formula: 'p = mv;  Σp(əvvəl) = Σp(sonra)  (xarici impuls yoxdursa)' },
      { title: '5. Xətti və bucaq kəmiyyətləri', text: 'İrəliləmə hərəkətində mövqe, sürət və təcil işlədilir; sabit ox ətrafında fırlanmada bunların qarşılığı bucaq, bucaq sürəti və bucaq təcilidir. Bərk cismin bütün nöqtələrinin dönmə bucağı eyni olsa da, oxdan uzaq nöqtələrin xətti sürəti daha böyükdür. Məsələn, fırlanan diskin kənarındakı nöqtə mərkəzə yaxın nöqtədən eyni zamanda daha uzun yol keçir. Toxunan istiqamətli təcil bucaq təcilindən, mərkəzə yönələn normal təcil isə bucaq sürətindən asılıdır. Bu əlaqələr xətti hərəkət düsturlarını fırlanma məsələlərinə çevirməyə imkan verir.', formula: 'v = ωr;  aₜ = αr;  aₙ = ω²r' },
      { title: '6. Qüvvə momenti və ətalət momenti', text: 'Qüvvənin fırladıcı təsiri təkcə onun qiymətindən deyil, tətbiq nöqtəsinin oxa məsafəsindən və qüvvənin istiqamətindən də asılıdır. Qüvvə qolu oxdan qüvvənin təsir xəttinə qədər perpendikulyar məsafədir. Eyni qüvvə qapını dəstəyindən itələyəndə daha asan fırladır. Fırlanmadakı ətalət ölçüsü ətalət momentidir: kütlə oxdan nə qədər uzaqda paylanıbsa, cismi fırlatmaq və ya sürətini dəyişmək bir o qədər çətinləşir. Həlqənin kütləsi diskə nisbətən kənarda daha çox toplandığından eyni kütlə və xarici radius üçün onun mərkəzi oxa nəzərən ətalət momenti daha böyükdür. Paralel ox üçün Hüygens–Şteyner teoremi tətbiq olunur.', formula: 'M = rF sinφ = Fd;  I = Σmᵢrᵢ²;  I = Iₘ + md²' },
      { title: '7. Fırlanma dinamikası və impuls momenti', text: 'İrəliləmədə yekun qüvvə təcili yaratdığı kimi, sabit ox ətrafında fırlanmada yekun qüvvə momenti bucaq təcilini yaradır. Sabit oxa görə impuls momenti ətalət momenti ilə bucaq sürətinin hasilidir. Xarici qüvvə momentlərinin cəmi sıfır olarsa sistemin ümumi impuls momenti dəyişmir. Fiqurlu konkisürən qollarını bədəninə yığanda ətalət momenti azalır və impuls momenti sabit qaldığı üçün bucaq sürəti artır. Təqdimatın bir slaydında impuls momenti “I × bucaq təcili” kimi səhv yazılıb; düzgün ifadə “I × bucaq sürəti”dir. Bucaq təcili isə fırlanma dinamikası tənliyində iştirak edir.', formula: 'ΣM = Iα;  L = Iω;  ΣM_xarici = dL/dt' },
      { title: '8. Mexaniki iş və güc', text: 'Qüvvə cismi yerini dəyişdirəndə iş görə bilər. Sabit qüvvənin işi qüvvə ilə yerdəyişmə arasındakı bucaqdan asılıdır: eyni istiqamətdə müsbət, əks istiqamətdə mənfi, perpendikulyar olduqda sıfırdır. Ona görə üfüqi hərəkətdə ağırlıq qüvvəsinin işi sıfır, sürtünmənin işi isə mənfi ola bilər. Dəyişən qüvvə üçün yolu kiçik hissələrə ayırıb elementar işləri toplamaq, yəni inteqrallamaq lazımdır. Güc görülən işin sürətini bildirir. Fırlanmada analoji olaraq kiçik bucaq yerdəyişməsində qüvvə momentinin işi hesablanır.', formula: 'A = Fs cosφ;  P = dA/dt;  dA = M dθ' },
      { title: '9. Kinetik və potensial enerji', text: 'Kinetik enerji cismin hərəkətindən asılıdır. Nyutonun II qanunundan alınan iş–enerji teoreminə görə bütün qüvvələrin yekun işi kinetik enerjinin dəyişməsinə bərabərdir. Fırlanan bərk cismin də kinetik enerjisi var; o, ətalət momenti və bucaq sürətinin kvadratı ilə müəyyən edilir. Potensial enerji isə konservativ qüvvənin vəziyyətlə bağlı enerjisidir: Yer səthinə yaxın ağırlıq sahəsində hündürlük, yay üçün deformasiya ilə dəyişir. Konservativ qüvvənin gördüyü iş potensial enerjinin azalmasına bərabərdir. Bu əlaqə düşən cismin potensial enerjisinin necə kinetik enerjiyə çevrildiyini izah edir.', formula: 'K = mv²/2;  K_fırlanma = Iω²/2;  U_ağırlıq = mgh;  U_yay = kx²/2' },
      { title: '10. Enerjinin saxlanması və tətbiq sərhədi', text: 'Sistemdə yalnız konservativ qüvvələr iş görürsə mexaniki enerji K + U sabit qalır. Real sistemdə sürtünmə və müqavimət mexaniki enerjinin bir hissəsini istiliyə çevirir; bu halda mexaniki enerji azalır, ümumi enerji isə saxlanır. Hesablamada əvvəl başlanğıc və son vəziyyəti seçmək, sıfır potensial enerji səviyyəsini göstərmək və kənar qüvvələrin işini ayrıca nəzərə almaq lazımdır. Məsələn, sürtünməsiz maili müstəvidə aşağı enən cismin mgh azalması kinetik enerjinin artmasına çevrilir. Fırlanan cisimdə isə son kinetik enerji həm mərkəzin irəliləmə enerjisini, həm də fırlanma enerjisini əhatə edə bilər.', formula: 'K₁ + U₁ = K₂ + U₂  (yalnız konservativ qüvvələr)' },
    ],
    checkQuestions: ['İrəliləmə hərəkətində kütləyə uyğun fırlanma kəmiyyəti hansıdır?', 'İmpulsun saxlanması qanunu hansı şərtdə tətbiq edilir?', 'Konservativ və qeyri-konservativ qüvvələr necə fərqlənir?'],
  },
  {
    id: 'thermodynamics',
    title: 'Molekulyar fizika və termodinamikanın əsasları',
    outline: ['Molekulyar-kinetik nəzəriyyənin əsas müddəaları', 'Maksvell sürət paylanması, barometrik düstur və Bolsman paylanması', 'Sərbəstlik dərəcələri və daxili enerji', 'Termodinamikanın I qanunu, izoproseslər və adiabatik proses'],
    sourceFile: '20260917_202948_6aac157c73451.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/muhazire-02.pdf`,
    presentationNumber: 2,
    explanations: [
      { title: '1. Molekulyar-kinetik nəzəriyyənin əsasları', text: 'Maddə atom və molekullardan ibarətdir; zərrəciklər fasiləsiz nizamsız istilik hərəkəti edir və bir-birinə təsir göstərir. Diffuziya, Broun hərəkəti və buxarlanma bu təsəvvürü izah edən müşahidələrdəndir. İdeal qaz modelində molekulların ölçüsü nəzərə alınmır, aralarındakı cazibə yox sayılır, toqquşmalar elastik götürülür. Model real qazın hər vəziyyətini əvəz etmir, amma aşağı təzyiqdə çox hadisəni sadə düsturlarla anlamağa kömək edir.' },
      { title: '2. Təzyiq, temperatur və molekul enerjisi', text: 'Qazın qab divarına göstərdiyi təzyiq molekulların toqquşmalarında divara verdiyi impulsların cəmindən yaranır. Təqdimat mikroskopik hərəkətlə makroskopik təzyiq arasında əlaqəni bu yolla qurur. n vahid həcmdə molekul sayıdır, T mütləq temperatur, k isə Bolsman sabitidir. Temperatur artdıqda molekulların orta hərəkət enerjisi artır; eyni konsentrasiyada təzyiq də yüksəlir. İdeal qaz tənliyindən istifadə edərkən temperaturu Kelvinlə götürmək lazımdır.', formula: 'p = nkT;  pV = νRT' },
      { title: '3. Maksvell sürət paylanması', text: 'Qazdakı bütün molekullar eyni sürətlə hərəkət etmir. Maksvell paylanması müəyyən sürət intervalına düşən molekulların payını göstərir. Çox kiçik və çox böyük sürətlər az, ən ehtimallı sürətə yaxın qiymətlər isə daha çox rast gəlinir. Temperatur yüksəldikdə paylanma əyrisi daha böyük sürətlərə doğru sürüşür və genişlənir. Ən ehtimallı, orta ədədi və orta kvadratik sürət fərqli kəmiyyətlərdir; orta kvadratik sürət bunların içində ən böyükdür. Qrafikin altında qalan ümumi sahə bütün molekulların payına, yəni 1-ə uyğundur.' },
      { title: '4. Barometrik düstur və Bolsman paylanması', text: 'Atmosferdə iki təsir yarışır: cazibə molekulları aşağı çəkir, istilik hərəkəti isə onların fəzaya yayılmasına səbəb olur. Buna görə sabit temperatur fərziyyəsində hündürlük artdıqca qazın təzyiqi və konsentrasiyası eksponensial azalır. Ağır molekullar üçün azalma daha sürətlidir; temperatur yüksəldikdə paylanma daha bərabər olur. Barometrik düstur hündürlüyə görə təzyiqi, Bolsman paylanması isə potensial enerjiyə görə hissəcik konsentrasiyasını təsvir edir. Bunlar ideal tarazlıq modelləridir; real atmosferdə temperaturun hündürlük üzrə dəyişməsi ayrıca nəzərə alınır.', formula: 'p(h) = p₀e^(−Mgh/RT);  n(h) = n₀e^(−mgh/kT)' },
      { title: '5. Sərbəstlik dərəcələri və daxili enerji', text: 'Molekulun sərbəstlik dərəcələri onun müstəqil hərəkət imkanlarıdır: irəliləmə, uyğun hallarda fırlanma və rəqs. Enerjinin bərabər paylanması prinsipinə əsasən klassik tarazlıqda hər kvadratik sərbəstlik dərəcəsinə orta hesabla kT/2 enerji düşür. İdeal qazın daxili enerjisi molekulların mikroskopik enerjilərinin cəmidir və verilən modeldə temperaturdan asılıdır. Biratomlu qaz üçün üç irəliləmə sərbəstlik dərəcəsi götürülür. İstilik tutumu qazı qızdırmağa nə qədər enerji lazım olduğunu göstərir; sabit təzyiqdə qaz həm qızır, həm də genişlənmə işi görür.', formula: 'U = (i/2)νRT;  Cₚ − Cᵥ = R  (ideal qaz)' },
      { title: '6. Termodinamikanın I qanunu və izoproseslər', text: 'Termodinamikanın I qanunu verilən istiliyin daxili enerjini dəyişməyə və qazın gördüyü işə sərf olunduğunu bildirir. İzoxorik prosesdə həcm dəyişmir, buna görə qazın işi sıfırdır. İzotermik ideal qaz prosesində temperatur və daxili enerji dəyişməsi sıfır olur; alınan istilik işə çevrilir. İzobarik prosesdə təzyiq sabitdir və genişlənmə işi pΔV-yə bərabərdir. İstilik, iş və daxili enerji vəziyyətə eyni cür bağlı deyil: daxili enerji hal kəmiyyəti, istilik və iş isə proses boyunca enerji ötürülməsidir.', formula: 'Q = ΔU + A;  A_izobar = pΔV' },
      { title: '7. Adiabatik proses', text: 'Adiabatik prosesdə mühitlə istilik mübadiləsi yoxdur; qaz iş gördükdə bu iş daxili enerjisinin azalması hesabına baş verir və temperatur düşür. Qaz sıxılarsa əksinə temperatur arta bilər. Adiabatik halı izotermik hal ilə qarışdırmaq olmaz: birincidə Q = 0, ikincidə T sabitdir. Təqdimatda Puasson tənliyi bu prosesin təzyiq və həcm əlaqəsini verir. Buradakı γ sabit təzyiq və sabit həcm molyar istilik tutumlarının nisbətidir; laboratoriya işində də bu nisbət ölçülür.', formula: 'Q = 0;  ΔU = −A;  pV^γ = sabit;  γ = Cₚ/Cᵥ' },
    ],
    checkQuestions: ['İdeal qazın təzyiqi ilə molekulların istilik hərəkəti arasında hansı əlaqə var?', 'Hansı izoprosesdə qaz iş görmür?', 'Bolsman paylanması nəyi təsvir edir?'],
  },
  {
    id: 'electrostatics',
    title: 'Elektrostatika, dielektriklər və naqillər',
    outline: ['Kulon qanunu və elektrik sahəsinin intensivliyi', 'Qauss teoremi, elektrostatik iş və potensial', 'Dipol və dielektrikin polyarlaşması', 'Naqillər, elektrik tutumu və kondensatorlar'],
    sourceFile: '20260917_203055_6aac15bfd0301.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/muhazire-03-elektrostatika.pdf`,
    presentationNumber: 5,
    explanations: [
      { title: '1. Elektrik yükü və saxlanma qanunu', text: 'Elektrostatika sükunətdəki və ya çox yavaş hərəkət edən yüklərin təsirini öyrənir. Müsbət və mənfi yüklər var: eyni işarəlilər itələnir, müxtəlif işarəlilər cəzb olunur. Yük kvantlanır, yəni elementar yükün tam misilləri şəklində ölçülür. Qapalı sistemdə yüklərin cəbri cəmi dəyişmir; sürtünmə və toxunma yükləri yaratmır, cisimlər arasında köçürür. Yük həcmə, səthə və ya xətt boyunca paylandıqda uyğun sıxlıqlardan istifadə edilir.', formula: 'Σq = sabit  (qapalı sistem)' },
      { title: '2. Kulon qanunu və mühitin təsiri', text: 'Vakuumda iki nöqtəvi yükün qarşılıqlı təsirinin böyüklüyü yüklərin hasili ilə düz, aralarındakı məsafənin kvadratı ilə tərs mütənasibdir. Qüvvə yükləri birləşdirən xətt boyunca yönəlir; onun cazibə və ya itələmə olması yüklərin işarəsindən asılıdır. Dielektrik mühitdə eyni yüklərin qarşılıqlı təsiri zəifləyə bilər və bu zəifləmə nisbi dielektrik nüfuzluğu ilə xarakterizə olunur. Məsələləri həll edərkən məsafəni iki yükün mərkəzi arasında götürmək və istiqaməti ayrıca göstərmək lazımdır.', formula: '|F| = (1/4πε₀εᵣ)|q₁q₂|/r²' },
      { title: '3. Elektrik sahəsi və superpozisiya', text: 'Yük ətrafında elektrik sahəsi yaradır və digər yüklərə bu sahə vasitəsilə təsir göstərir. Sahənin intensivliyi verilən nöqtədə kiçik müsbət sınaq yükünə düşən qüvvədir; istiqaməti də həmin qüvvənin istiqamətidir. Müsbət yükün sahə xətləri yükdən çıxır, mənfi yükün xətləri yükə yönəlir. Bir neçə yükün yaratdığı sahəni tapmaq üçün intensivlikləri skalyar deyil, vektor kimi toplamaq lazımdır. Sahə xətlərinin daha sıx olması daha böyük intensivliyi göstərir.', formula: 'E = F/qₛ;  E_yekun = ΣEᵢ' },
      { title: '4. Elektrik seli və Qauss teoremi', text: 'Elektrik seli sahənin seçilmiş səthdən nə qədər keçdiyini ifadə edir. Qauss teoreminə görə qapalı səthdən keçən ümumi sel yalnız onun daxilindəki xalis yüklə müəyyən edilir. Səthin xaricindəki yüklər lokal sahəni dəyişdirsə də, qapalı səth üzrə onların xalis seli sıfır olur. Teorem xüsusən sferik, silindrik və müstəvi simmetriyalı yüklərdə sahəni hesablamağı asanlaşdırır. Qapalı səth seçərkən simmetriyaya uyğun səth götürmək lazımdır.', formula: '∮E·dS = q_daxili/ε₀  (vakuum)' },
      { title: '5. İş, potensial və ekvipotensial səth', text: 'Elektrostatik qüvvənin işi başlanğıc və son nöqtələrdən asılıdır, yolun formasından asılı deyil; buna görə sahə konservativdir. Potensial verilən nöqtədə vahid müsbət yükə düşən potensial enerjidir. İntensivlik sahənin qüvvə, potensial isə enerji xarakteristikasıdır. Müsbət yük sahə istiqamətində hərəkət edəndə potensial azalır. Bütün nöqtələrində potensial eyni olan səth ekvipotensialdır; bu səth boyunca sahə iş görmür. Sahənin intensivliyi potensialın ən sürətli azaldığı istiqamətə yönəlir.', formula: 'φ = U/q;  A₁₂ = q(φ₁ − φ₂);  E = −grad φ' },
      { title: '6. Elektrik dipolu', text: 'Bərabər böyüklüklü əks işarəli iki yük bir-birindən kiçik məsafədə yerləşəndə elektrik dipolu alınır. Dipolun momenti yükün böyüklüyü və yüklər arasındakı məsafə ilə təyin olunur, istiqaməti mənfi yükdən müsbət yükə doğrudur. Xarici elektrik sahəsi dipola fırladıcı təsir göstərə bilər; sahə ilə dipol momenti eyni istiqamətə yaxınlaşmağa çalışır. Bu anlayış dielektrik molekullarının xarici sahədə necə düzülməsini anlamaq üçün əsasdır.', formula: 'p_dipol = qℓ;  M = p_dipol × E' },
      { title: '7. Dielektriklər və polyarlaşma', text: 'Dielektrikdə sərbəst yükdaşıyıcılar keçiriciyə nisbətən çox azdır. Xarici sahə müsbət və mənfi yüklərin mərkəzlərini bir qədər ayırır, yaxud hazır dipolları istiqamətləndirir; buna polyarlaşma deyilir. Yaranan bağlı yüklər xarici sahəyə qarşı sahə yaradır və material daxilində yekun sahəni dəyişir. Təqdimat dielektrik nüfuzluğu və elektrik induksiya vektoru ilə bu təsiri təsvir edir. Kondensator lövhələri arasına dielektrik qoyulanda onun tutumu arta bilər.', formula: 'D = ε₀E + P' },
      { title: '8. Naqillər, kondensator və sahə enerjisi', text: 'Elektrostatik tarazlıqda ideal naqilin içində elektrik sahəsi sıfırdır və artıq yük səthdə toplanır. Elektrik tutumu naqilin verilən potensialda nə qədər yük saxlaya bildiyini göstərir. İki keçiricidən ibarət kondensatorun tutumu lövhələrin quruluşuna və aradakı mühitə bağlıdır. Kondensator yüklənəndə elektrik sahəsində enerji toplanır; bu enerji dövrədə sonradan iş görə bilər. Hesablamada C = Q/U əlaqəsini tətbiq edərkən U-nun iki lövhə arasındakı potensiallar fərqi olduğunu nəzərə almaq lazımdır.', formula: 'C = Q/U;  W = CU²/2' },
    ],
    checkQuestions: ['Elektrik sahəsinin intensivliyi ilə potensialı nəyi xarakterizə edir?', 'Dielektrikin polyarlaşması nə deməkdir?', 'Qauss teoremi hansı qapalı səth üçün tətbiq edilir?'],
  },
  {
    id: 'current-magnetism',
    title: 'Sabit cərəyan, maqnit sahəsi və induksiya',
    outline: ['Cərəyan, elektrik hərəkət qüvvəsi və Om qanunu', 'Coul–Lens qanunu və Kirxhof qaydaları', 'Maqnit sahəsi, Bio–Savar–Laplas, Amper və Lorens qüvvələri', 'Faradey induksiyası, öz-özünə induksiya və Maksvell tənlikləri'],
    sourceFile: '20260917_203144_6aac15f05770d.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/muhazire-04.pdf`,
    presentationNumber: 4,
    explanations: [
      { title: '1. Cərəyan və cərəyan sıxlığı', text: 'Elektrik cərəyanı yüklərin istiqamətlənmiş hərəkətidir. Onun davamlı olması üçün sərbəst yükdaşıyıcılar, onları hərəkət etdirən elektrik sahəsi və qapalı dövrə lazımdır. Şərti cərəyan istiqaməti müsbət yüklərin hərəkətinə görə seçilir; metal naqildə elektronlar əks istiqamətdə gedir. Cərəyan şiddəti vahid zamanda kəsikdən keçən yükdür, ampermetr dövrəyə ardıcıl qoşulur. Cərəyan sıxlığı isə vahid en kəsik sahəsinə düşən cərəyanı təsvir edir. Yükün saxlanması qanunu cərəyanın kəsilməzlik tənliyinin əsasını təşkil edir.', formula: 'I = Δq/Δt;  j = I/S  (bircins paylanma)' },
      { title: '2. Mənbə, elektrik hərəkət qüvvəsi və gərginlik', text: 'Yüklər yalnız elektrostatik qüvvənin təsiri ilə qapalı dövrədə fasiləsiz fırlana bilməz: mənbə daxilində onları aşağı potensialdan yuxarı potensiala daşıyan qeyri-elektrostatik qüvvə lazımdır. Batareyada bu təsir kimyəvi, generatorda mexaniki, fotoelementdə işıq mənşəli ola bilər. Mənbənin elektrik hərəkət qüvvəsi vahid yükə düşən kənar qüvvə işidir. Dövrə hissəsində gərginlik isə vahid yükə düşən ümumi işlə əlaqəlidir. Mənbə və işlədici arasındakı bu fərqi görmədən tam dövrə məsələlərini düzgün qurmaq çətindir.', formula: 'ε = A_kənar/q;  U = A/q' },
      { title: '3. Om qanunu və müqavimət', text: 'Mənbə olmayan bircins naqil hissəsində cərəyan şiddəti gərginliklə düz, müqavimətlə tərs mütənasibdir. Silindrik naqilin müqaviməti uzunluq artdıqca artır, en kəsiyi böyüdükcə azalır; maddənin təsiri xüsusi müqavimətlə verilir. Metalların müqaviməti temperatur yüksəldikcə adətən artır. Tam qapalı dövrədə mənbənin daxili müqaviməti də nəzərə alınmalıdır; xarici müqavimət çox kiçilərsə qısaqapanma cərəyanı böyük ola bilər. Xüsusi müqavimət təlimatındakı R–uzunluq qrafiki məhz bu əlaqəyə əsaslanır.', formula: 'I = U/R;  R = ρℓ/S;  I_tam = ε/(R + r)' },
      { title: '4. Cərəyanın işi, gücü və Coul–Lens qanunu', text: 'Cərəyan yükü hərəkət etdirərək enerji ötürür. Saf metal naqildə elektrik işi əsasən istiliyə çevrilir; Coul–Lens qanunu ayrılan istiliyin cərəyanın kvadratı, müqavimət və zamanla necə dəyişdiyini göstərir. Güc vahid zamanda görülən işdir. Eyni gərginlikdə müqavimət azaldıqda cərəyan böyüyür və uyğun şəraitdə qızma riski arta bilər. Hesablama zamanı hansı kəmiyyətlərin sabit qaldığını qeyd etmək vacibdir; U, I və R düsturlarının hamısını hər vəziyyətdə eyni qaydada tətbiq etmək olmaz.', formula: 'A = UIt;  P = UI;  Q = I²Rt' },
      { title: '5. Kirxhof qaydaları', text: 'Budaqlanmış dövrədə tək bir Om düsturu kifayət etməyə bilər. Kirxhofun düyün qaydası yükün saxlanmasını ifadə edir: düyünə daxil olan cərəyanların cəmi çıxanların cəminə bərabərdir. Kontur qaydası qapalı dövrə boyunca gərginlik dəyişmələri ilə mənbələrin elektrik hərəkət qüvvələrini əlaqələndirir. Əvvəl cərəyan istiqamətlərini sərbəst seçmək, sonra işarələri bu seçimə görə ardıcıl yazmaq lazımdır. Hesablanan cərəyan mənfi çıxarsa real istiqamət seçilənin əksinədir.', formula: 'ΣI_daxil = ΣI_çıxış;  ΣIR = Σε  (kontur işarələrinə görə)' },
      { title: '6. Maqnit sahəsi və yüklərə təsiri', text: 'Hərəkət edən yüklər və cərəyanlar maqnit sahəsi yaradır. Sahənin istiqaməti maqnit induksiya vektoru B ilə göstərilir. Bio–Savar–Laplas qanunu cərəyan elementlərinin yaratdığı sahəni toplamağa imkan verir. Maqnit sahəsi hərəkət edən yüklərə Lorens qüvvəsi, cərəyanlı naqilə Amper qüvvəsi ilə təsir edir. Bu qüvvələrin istiqaməti vektor hasilinə bağlıdır və sürətə perpendikulyar olduqda zərrəciyin sürətinin qiymətini birbaşa dəyişmir, əsasən istiqamətini dəyişir. Yerin maqnit sahəsi laboratoriyasında B-nin toplananları ölçülür.', formula: 'F_L = q(v × B);  F_A = I(ℓ × B)' },
      { title: '7. Maqnit seli və Faradey induksiyası', text: 'Maqnit seli səthdən keçən maqnit sahəsini xarakterizə edir və sahə, səth sahəsi, həmçinin aralarındakı bucaqdan asılıdır. Konturdan keçən sel zamanla dəyişəndə induksiya elektrik hərəkət qüvvəsi yaranır. Mənfi işarə Lens qaydasını göstərir: induksiya cərəyanının yaratdığı təsir selin dəyişməsinə qarşı yönəlir. Selin dəyişməsi maqnitin hərəkətindən, dövrənin fırlanmasından və ya sahənin özünün dəyişməsindən yarana bilər. Generatorların iş prinsipi bu hadisəyə əsaslanır.', formula: 'Φ = BS cosθ;  ε_ind = −dΦ/dt' },
      { title: '8. Öz-özünə induksiya və Maksvell baxışı', text: 'Cərəyan dəyişəndə onun yaratdığı maqnit seli də dəyişir və həmin dövrənin özündə dəyişməyə qarşı elektrik hərəkət qüvvəsi yaranır; buna öz-özünə induksiya deyilir. İki yaxın sarğacda birində dəyişən cərəyan digərini də təsirləndirə bilər; bu qarşılıqlı induksiyadır. Maksvell tənlikləri elektrik və maqnit sahələrini vahid elektromaqnit sahəsi kimi təsvir edir: dəyişən maqnit sahəsi elektrik sahəsi, dəyişən elektrik sahəsi isə maqnit sahəsi ilə bağlıdır. Bu əlaqələr elektromaqnit dalğalarının izahına aparır.', formula: 'ε_öz = −L dI/dt' },
    ],
    checkQuestions: ['Ampermetr dövrəyə necə qoşulur?', 'Kirxhofun düyün qaydası hansı saxlanma qanununu ifadə edir?', 'Faradey qanununda mənfi işarə nəyi göstərir?'],
  },
  {
    id: 'oscillations',
    title: 'Mexaniki və elektromaqnit rəqsləri və dalğaları',
    outline: ['Harmonik rəqs və onun sürəti, təcili, enerjisi', 'Rəqs konturu və elektromaqnit rəqsləri', 'Mexaniki dalğalar, yayılma sürəti, dalğa uzunluğu və tezlik', 'Elektromaqnit dalğaları və enerji axını'],
  },
  {
    id: 'optics',
    title: 'Dalğa optikası',
    outline: ['İşığın interferensiyası və koherentlik', 'Frenel və Fraunhofer difraksiyası, difraksiya qəfəsi', 'Dispersiya və Rentgen şüalarının difraksiyası', 'Polyarlaşma, Malyus və Brüster qanunları'],
  },
  {
    id: 'quantum',
    title: 'Kvant fizikasının elementləri',
    outline: ['İstilik şüalanması və Plank düsturu', 'Fotonun enerjisi, impulsu və fotoeffekt', 'De Broyl fərziyyəsi və qeyri-müəyyənlik prinsipi', 'Dalğa funksiyası və stasionar hal üçün Şredinger tənliyi'],
  },
  {
    id: 'atom-nucleus',
    title: 'Atom və nüvə fizikasının elementləri',
    outline: ['Rezerford atom modeli və Bor postulatları', 'Atom nüvəsinin quruluşu', 'Kütlə defekti və rabitə enerjisi', 'Nüvə qüvvələri'],
  },
];

// The first current LMS lab has no matching attached manual. The nichrome manual below
// is an extra document and is intentionally not inserted into the numbered LMS list.
export const PHYSICS_LABS: PhysicsLab[] = [
  { id: 'momentum', title: 'İmpulsun saxlanması qanununun yoxlanılması' },
  {
    id: 'inertia', title: 'Diskin və həlqənin ətalət momentinin təyini',
    sourceFile: '20260919_222742_6aaed41e4ac76.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-02.pdf`,
    objective: 'Disk və həlqənin ətalət momentlərini təcrübədə ölçüb nəzəri qiymətlərlə müqayisə etmək.',
    equipment: 'Fırlanma sensoru, disk və həlqə, müxtəlif yüklər, tərəzi, ştangenpərgar və interfeys.',
    steps: ['Diskin, həlqənin və şkivin kütlə və radiuslarını ölç.', 'Asılmış yük ilə fırlanmanı başlat; bucaq sürəti–zaman qrafikinin meylindən bucaq təcilini tap.', 'Şkiv, disk və həlqə üçün ətalət momentlərini ayrı-ayrılıqda hesabla; nəzəri və təcrübi nəticələri müqayisə et.'],
    result: 'Hesabatda ölçülər, bucaq sürəti qrafiki, nəzəri və təcrübi ətalət momentləri, kənara çıxma göstərilir.',
  },
  {
    id: 'heat-capacity', title: 'Qazların molyar istilik tutumları nisbətinin təyini',
    sourceFile: '20260919_222838_6aaed4566d32d.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-03.pdf`,
    objective: 'Hava üçün adiabatik prosesi araşdırıb Cₚ/Cᵥ nisbətini təyin etmək.',
    equipment: 'İstilik maşını, porşen, təzyiq sensoru, interfeys və kompüter.',
    steps: ['Porşeni 9 sm hündürlükdə saxlayıb təzyiq rəqslərinin periodunu ölç.', 'Hündürlüyü 1 sm addımlarla 8 sm-dən 1 sm-ə endirərək periodları qeyd et.', 'h ilə T² arasındakı qrafiki qur; meyldən istilik tutumları nisbətini hesablayıb ideal qiymətlə müqayisə et.'],
    result: 'Hesabatda h və period ölçüləri, h(T²) qrafiki və alınan Cₚ/Cᵥ qiyməti göstərilir.',
  },
  {
    id: 'earth-field', title: 'Yerin maqnit sahəsinin toplananlarının təyini',
    sourceFile: '20260919_223232_6aaed540a8b26.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-04.pdf`,
    objective: 'Maqnit induksiyasının üfüqi toplananını, tam qiymətini və maqnit meyl bucağını müəyyən etmək.',
    equipment: 'Maqnit sahəsi və fırlanma sensorları, maqnit əqrəbi, Qauss kamerası, interfeys və kompüter.',
    steps: ['Sensoru hazırlayıb üfüqi müstəvidə döndər; qrafikin pikindən üfüqi toplananı oxu.', 'Sensoru şaquli müstəvidə döndərərək tam induksiyanı ölç.', 'Üfüqi və tam qiymətlərdən maqnit meyl bucağını hesabla.'],
    result: 'Hesabatda hər iki qrafik, sahənin üfüqi və tam qiymətləri, meyl bucağı verilir.',
  },
  {
    id: 'damped-circuit', title: 'Sönən elektromaqnit rəqslərinin öyrənilməsi',
    sourceFile: '20260919_223345_6aaed589a9057.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-05.pdf`,
    objective: 'Sönən rəqsləri ossilloqrafda müşahidə edib loqarifmik dekrementi və konturun keyfiyyətliyini təyin etmək.',
    equipment: 'Ossilloqraf, induktiv sarğac, kondensator, müqavimətlər mağazası və səs generatoru.',
    steps: ['Rəqs konturunu qur və ossilloqrafda sönən rəqslərin şəklini al.', 'Müqaviməti artıraraq aperiodik boşalmaya keçid həddini qeyd et.', 'Bir neçə period üzrə amplitudları ölç; loqarifmik dekrementi və keyfiyyətliyi tapıb nəzəri qiymətlərlə müqayisə et.'],
    result: 'Hesabatda ossilloqram, amplitud və müqavimət ölçüləri, sönmə göstəriciləri göstərilir.',
  },
  {
    id: 'newton-rings', title: 'Nyuton halqaları ilə işığın dalğa uzunluğunun təyini',
    sourceFile: '20260919_223909_6aaed6cd1cb0e.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-06.pdf`,
    objective: 'İşığın interferensiyasını müşahidə edib Nyuton halqalarının radiuslarından dalğa uzunluğunu təyin etmək.',
    equipment: 'İşıq mənbəyi, monoxromatik filtr, müstəvi qabarıq linza və şüşə lövhə, mikrometrik okulyar.',
    steps: ['Qurğunu işıqlandır və okulyarda halqaları aydın görənədək nizamla.', 'Bir neçə ardıcıl halqanın radiusunu mikrometrik vintlə ölç və cədvələ yaz.', 'Təlimatdakı düsturla dalğa uzunluğunu hesabla; təkrarlardan orta qiymət və xətanı tap.'],
    result: 'Hesabatda halqaların ölçüləri, hesablanan dalğa uzunluğu, orta qiymət və ölçmə xətası yer alır.',
  },
  {
    id: 'atomic-spectra', title: 'Atom spektrinin öyrənilməsi',
    sourceFile: '20260919_224015_6aaed70f46cb3.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/laboratoriya-07.pdf`,
    objective: 'Hidrogenin görünən spektrini ölçüb Ridberq sabitini hesablamaq; təlimatın ikinci üsulunda digər lampaların spektrlərini müqayisə etmək.',
    equipment: 'Hidrogen qaz boşalma borusu, monoxromator və qidalanma bloku; ikinci üsulda spektrofotometr və atom lampaları.',
    steps: ['Hidrogen borusunu qoşub monoxromatorda Balmer xətlərinin mövqelərini qeyd et.', 'Xətlərdən dalğa uzunluqlarını və hər xətt üçün Ridberq sabitini hesablayıb orta qiymət al.', 'İkinci üsul tətbiq edilərsə, natriumla qəfəs sabitini tap, helium və digər lampaların xətlərini etalonlarla müqayisə et.'],
    result: 'Hesabatda spektr xətləri, dalğa uzunluqları, Ridberq sabitinin qiymətləri və istifadə olunan üsula uyğun müqayisələr göstərilir.',
  },
];

export const PHYSICS_EXTRA_LAB: PhysicsLab = {
  id: 'nichrome', title: 'Nixrom məftilin xüsusi müqavimətinin təyini',
  sourceFile: '20260919_222929_6aaed4894a774.docx',
  pdfUrl: `${PHYSICS_PDF_BASE_URL}/elave-nixrom.pdf`,
  objective: 'Naqilin xüsusi müqavimətini ölçmək; bu iş hazırkı LMS-in nömrələnmiş 7 laboratoriyası arasında görünmür.',
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
