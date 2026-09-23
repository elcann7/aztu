export interface PhysicsTopic {
  id: string;
  title: string;
  outline: string[];
  sourceFile?: string;
  presentationNumber?: number;
  explanations?: { title: string; text: string; formula?: string }[];
  checkQuestions?: string[];
}

export interface PhysicsLab {
  id: string;
  title: string;
  sourceFile?: string;
  objective?: string;
  equipment?: string;
  steps?: string[];
  result?: string;
}

// Order and titles come from the student's current LMS screenshots (September 2026).
// Explanations summarize only the attached teacher presentations and lab manuals.
export const PHYSICS_TOPICS: PhysicsTopic[] = [
  {
    id: 'mechanics',
    title: 'İrəliləmə və fırlanma hərəkətinin dinamikası',
    outline: ['Nyuton qanunları, qüvvələr və impulsun saxlanması', 'Qüvvə momenti, ətalət momenti və impuls momenti', 'Mexaniki iş, güc, kinetik və potensial enerji', 'Enerjinin saxlanması və fırlanan cismin enerjisi'],
    sourceFile: '20260917_202902_6aac154ea9e27.pptx',
    presentationNumber: 1,
    explanations: [
      { title: 'İmpuls və qapalı sistem', text: 'Təqdimatda impuls cismin kütləsi ilə sürətinin hasili kimi verilir. İstiqaməti sürətin istiqamətidir. Xarici qüvvələrin yekun təsiri olmadıqda sistemin ümumi impulsu dəyişmir.', formula: 'p = mv;  Σp = sabit (qapalı sistem)' },
      { title: 'Fırlanma hərəkəti', text: 'Fırlanmada cismin nöqtələri eyni bucaq yerdəyişməsinə, bucaq sürətinə və bucaq təcilinə malik olur. Qüvvənin fırladıcı təsiri qüvvə momenti, fırlanmaya qarşı ətalət isə ətalət momenti ilə xarakterizə edilir.', formula: 'M = r × F;  L = Iω' },
      { title: 'İş və enerji', text: 'Qüvvənin işi qüvvə ilə yerdəyişmə arasındakı bucaqdan asılıdır. Təqdimat kinetik və potensial enerjini ayırır, konservativ qüvvələr olan sistemdə mexaniki enerjinin saxlanmasını izah edir.', formula: 'A = Fs cos α' },
    ],
    checkQuestions: ['İrəliləmə hərəkətində kütləyə uyğun fırlanma kəmiyyəti hansıdır?', 'İmpulsun saxlanması qanunu hansı şərtdə tətbiq edilir?', 'Konservativ və qeyri-konservativ qüvvələr necə fərqlənir?'],
  },
  {
    id: 'thermodynamics',
    title: 'Molekulyar fizika və termodinamikanın əsasları',
    outline: ['Molekulyar-kinetik nəzəriyyənin əsas müddəaları', 'Maksvell sürət paylanması, barometrik düstur və Bolsman paylanması', 'Sərbəstlik dərəcələri və daxili enerji', 'Termodinamikanın I qanunu, izoproseslər və adiabatik proses'],
    sourceFile: '20260917_202948_6aac157c73451.pptx',
    presentationNumber: 2,
    explanations: [
      { title: 'Molekulyar-kinetik baxış', text: 'Maddələr atom və molekullardan qurulur; onlar fasiləsiz nizamsız istilik hərəkətindədir və bir-birinə təsir edir. Təqdimat qaz təzyiqini molekulların qab divarları ilə toqquşması ilə əlaqələndirir.' },
      { title: 'Sürət və hündürlük üzrə paylanma', text: 'Qaz molekullarının sürətləri eyni deyil; Maksvell paylanması müxtəlif sürətlərə malik molekulların payını təsvir edir. Cazibə sahəsində hündürlük artdıqca qazın təzyiqi və konsentrasiyası azalır; təqdimat bunu barometrik düstur və Bolsman paylanması ilə izah edir.', formula: 'p = nkT' },
      { title: 'İstilik və iş', text: 'Təqdimat daxili enerjini sərbəstlik dərəcələri ilə əlaqələndirir. Termodinamikanın I qanunu verilən istiliyin daxili enerjinin dəyişməsinə və sistemin gördüyü işə necə bölündüyünü göstərir. İzoxorik, izotermik, izobarik və adiabatik proseslər ayrıca müqayisə edilir.', formula: 'Q = ΔU + A' },
    ],
    checkQuestions: ['İdeal qazın təzyiqi ilə molekulların istilik hərəkəti arasında hansı əlaqə var?', 'Hansı izoprosesdə qaz iş görmür?', 'Bolsman paylanması nəyi təsvir edir?'],
  },
  {
    id: 'electrostatics',
    title: 'Elektrostatika, dielektriklər və naqillər',
    outline: ['Kulon qanunu və elektrik sahəsinin intensivliyi', 'Qauss teoremi, elektrostatik iş və potensial', 'Dipol və dielektrikin polyarlaşması', 'Naqillər, elektrik tutumu və kondensatorlar'],
    sourceFile: '20260917_203055_6aac15bfd0301.pptx',
    presentationNumber: 5,
    explanations: [
      { title: 'Yüklər və elektrik sahəsi', text: 'Təqdimat nöqtəvi yüklərin qarşılıqlı təsirini Kulon qanunu ilə izah edir. Elektrik sahəsinin intensivliyi müsbət sınaq yükünə təsir edən qüvvə ilə müəyyən edilir; çoxlu yükün sahəsi superpozisiya prinsipi ilə tapılır.', formula: 'E = F/q₀' },
      { title: 'Potensial və Qauss teoremi', text: 'Elektrik sahəsinin intensivliyi qüvvə, potensialı isə enerji xarakteristikasıdır. Qauss teoremi qapalı səthdən keçən elektrik selini səthin daxilindəki yüklə əlaqələndirir.' },
      { title: 'Dielektrik və kondensator', text: 'Xarici sahədə dielektrikin müsbət və mənfi yükləri nisbi yerini dəyişir və material polyarlaşır. Təqdimat bu hadisəni elektrik tutumu, kondensator və sahənin enerjisi ilə əlaqələndirir.' },
    ],
    checkQuestions: ['Elektrik sahəsinin intensivliyi ilə potensialı nəyi xarakterizə edir?', 'Dielektrikin polyarlaşması nə deməkdir?', 'Qauss teoremi hansı qapalı səth üçün tətbiq edilir?'],
  },
  {
    id: 'current-magnetism',
    title: 'Sabit cərəyan, maqnit sahəsi və induksiya',
    outline: ['Cərəyan, elektrik hərəkət qüvvəsi və Om qanunu', 'Coul–Lens qanunu və Kirxhof qaydaları', 'Maqnit sahəsi, Bio–Savar–Laplas, Amper və Lorens qüvvələri', 'Faradey induksiyası, öz-özünə induksiya və Maksvell tənlikləri'],
    sourceFile: '20260917_203144_6aac15f05770d.pptx',
    presentationNumber: 4,
    explanations: [
      { title: 'Sabit cərəyan və dövrə', text: 'Cərəyan şiddəti vahid zamanda kəsikdən keçən yüklə əlaqəlidir və ampermetrlə ölçülür. Təqdimat elektrik hərəkət qüvvəsini, dövrə hissəsi üçün Om qanununu, müqavimətin temperaturdan asılılığını və cərəyanın gücünü izah edir.', formula: 'I = U/R' },
      { title: 'Kirxhof qaydaları', text: 'Düyünə daxil olan və çıxan cərəyanların cəbri cəmi sıfırdır. Qapalı konturda gərginlik düşgülərinin cəbri cəmi həmin konturdakı elektrik hərəkət qüvvələrinin cəminə bərabərdir.' },
      { title: 'Maqnit seli və induksiya', text: 'Təqdimatda maqnit sahəsinin mənbələri və cərəyanla əlaqəsi verilir. Qapalı konturdan keçən maqnit seli dəyişəndə induksiya elektrik hərəkət qüvvəsi yaranır; onun istiqaməti dəyişməyə qarşı yönəlir.', formula: 'εᵢ = −dΦ/dt' },
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
    objective: 'Disk və həlqənin ətalət momentlərini təcrübədə ölçüb nəzəri qiymətlərlə müqayisə etmək.',
    equipment: 'Fırlanma sensoru, disk və həlqə, müxtəlif yüklər, tərəzi, ştangenpərgar və interfeys.',
    steps: ['Diskin, həlqənin və şkivin kütlə və radiuslarını ölç.', 'Asılmış yük ilə fırlanmanı başlat; bucaq sürəti–zaman qrafikinin meylindən bucaq təcilini tap.', 'Şkiv, disk və həlqə üçün ətalət momentlərini ayrı-ayrılıqda hesabla; nəzəri və təcrübi nəticələri müqayisə et.'],
    result: 'Hesabatda ölçülər, bucaq sürəti qrafiki, nəzəri və təcrübi ətalət momentləri, kənara çıxma göstərilir.',
  },
  {
    id: 'heat-capacity', title: 'Qazların molyar istilik tutumları nisbətinin təyini',
    sourceFile: '20260919_222838_6aaed4566d32d.docx',
    objective: 'Hava üçün adiabatik prosesi araşdırıb Cₚ/Cᵥ nisbətini təyin etmək.',
    equipment: 'İstilik maşını, porşen, təzyiq sensoru, interfeys və kompüter.',
    steps: ['Porşeni 9 sm hündürlükdə saxlayıb təzyiq rəqslərinin periodunu ölç.', 'Hündürlüyü 1 sm addımlarla 8 sm-dən 1 sm-ə endirərək periodları qeyd et.', 'h ilə T² arasındakı qrafiki qur; meyldən istilik tutumları nisbətini hesablayıb ideal qiymətlə müqayisə et.'],
    result: 'Hesabatda h və period ölçüləri, h(T²) qrafiki və alınan Cₚ/Cᵥ qiyməti göstərilir.',
  },
  {
    id: 'earth-field', title: 'Yerin maqnit sahəsinin toplananlarının təyini',
    sourceFile: '20260919_223232_6aaed540a8b26.docx',
    objective: 'Maqnit induksiyasının üfüqi toplananını, tam qiymətini və maqnit meyl bucağını müəyyən etmək.',
    equipment: 'Maqnit sahəsi və fırlanma sensorları, maqnit əqrəbi, Qauss kamerası, interfeys və kompüter.',
    steps: ['Sensoru hazırlayıb üfüqi müstəvidə döndər; qrafikin pikindən üfüqi toplananı oxu.', 'Sensoru şaquli müstəvidə döndərərək tam induksiyanı ölç.', 'Üfüqi və tam qiymətlərdən maqnit meyl bucağını hesabla.'],
    result: 'Hesabatda hər iki qrafik, sahənin üfüqi və tam qiymətləri, meyl bucağı verilir.',
  },
  {
    id: 'damped-circuit', title: 'Sönən elektromaqnit rəqslərinin öyrənilməsi',
    sourceFile: '20260919_223345_6aaed589a9057.docx',
    objective: 'Sönən rəqsləri ossilloqrafda müşahidə edib loqarifmik dekrementi və konturun keyfiyyətliyini təyin etmək.',
    equipment: 'Ossilloqraf, induktiv sarğac, kondensator, müqavimətlər mağazası və səs generatoru.',
    steps: ['Rəqs konturunu qur və ossilloqrafda sönən rəqslərin şəklini al.', 'Müqaviməti artıraraq aperiodik boşalmaya keçid həddini qeyd et.', 'Bir neçə period üzrə amplitudları ölç; loqarifmik dekrementi və keyfiyyətliyi tapıb nəzəri qiymətlərlə müqayisə et.'],
    result: 'Hesabatda ossilloqram, amplitud və müqavimət ölçüləri, sönmə göstəriciləri göstərilir.',
  },
  {
    id: 'newton-rings', title: 'Nyuton halqaları ilə işığın dalğa uzunluğunun təyini',
    sourceFile: '20260919_223909_6aaed6cd1cb0e.docx',
    objective: 'İşığın interferensiyasını müşahidə edib Nyuton halqalarının radiuslarından dalğa uzunluğunu təyin etmək.',
    equipment: 'İşıq mənbəyi, monoxromatik filtr, müstəvi qabarıq linza və şüşə lövhə, mikrometrik okulyar.',
    steps: ['Qurğunu işıqlandır və okulyarda halqaları aydın görənədək nizamla.', 'Bir neçə ardıcıl halqanın radiusunu mikrometrik vintlə ölç və cədvələ yaz.', 'Təlimatdakı düsturla dalğa uzunluğunu hesabla; təkrarlardan orta qiymət və xətanı tap.'],
    result: 'Hesabatda halqaların ölçüləri, hesablanan dalğa uzunluğu, orta qiymət və ölçmə xətası yer alır.',
  },
  {
    id: 'atomic-spectra', title: 'Atom spektrinin öyrənilməsi',
    sourceFile: '20260919_224015_6aaed70f46cb3.docx',
    objective: 'Hidrogenin görünən spektrini ölçüb Ridberq sabitini hesablamaq; təlimatın ikinci üsulunda digər lampaların spektrlərini müqayisə etmək.',
    equipment: 'Hidrogen qaz boşalma borusu, monoxromator və qidalanma bloku; ikinci üsulda spektrofotometr və atom lampaları.',
    steps: ['Hidrogen borusunu qoşub monoxromatorda Balmer xətlərinin mövqelərini qeyd et.', 'Xətlərdən dalğa uzunluqlarını və hər xətt üçün Ridberq sabitini hesablayıb orta qiymət al.', 'İkinci üsul tətbiq edilərsə, natriumla qəfəs sabitini tap, helium və digər lampaların xətlərini etalonlarla müqayisə et.'],
    result: 'Hesabatda spektr xətləri, dalğa uzunluqları, Ridberq sabitinin qiymətləri və istifadə olunan üsula uyğun müqayisələr göstərilir.',
  },
];

export const PHYSICS_EXTRA_LAB: PhysicsLab = {
  id: 'nichrome', title: 'Nixrom məftilin xüsusi müqavimətinin təyini',
  sourceFile: '20260919_222929_6aaed4894a774.docx',
  objective: 'Naqilin xüsusi müqavimətini ölçmək; bu iş hazırkı LMS-in nömrələnmiş 7 laboratoriyası arasında görünmür.',
  equipment: 'Nixrom naqil, müqavimət ölçmə qurğusu, ştangenpərgar və mikrometr.',
  steps: ['Məftilin diametrini bir neçə nöqtədə ölçərək en kəsiyinin bircinsliyini yoxla.', 'Müxtəlif uzunluqlarda gərginlik və cərəyanı ölçərək müqaviməti hesabla.', 'R ilə uzunluq qrafikindən xüsusi müqaviməti və ölçmə xətasını təyin et.'],
};
