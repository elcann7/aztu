import type { MaterialStudySection } from '../services/db';
import { BUILT_IN_MATERIALS } from './courseMaterialsData';

export interface PhysicsTopic {
  id: string;
  title: string;
  outline: string[];
  sourceFile?: string;
  pdfUrl?: string;
  presentationNumber?: number;
  studyNotes: MaterialStudySection[];
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
  studyNotes: MaterialStudySection[];
}

const PHYSICS_PDF_BASE_URL = 'https://pub-40bab608394d42c2883a3de1b69e3d1f.r2.dev/aztu/physics';

const getPhysNotes = (id: string): MaterialStudySection[] =>
  BUILT_IN_MATERIALS.find((m) => m.id === id)?.studyNotes || [];

export const PHYSICS_TOPICS: PhysicsTopic[] = [
  {
    id: 'mechanics',
    title: 'İrəliləmə və fırlanma hərəkətinin dinamikası',
    outline: [
      'İnersial hesablama sistemi, sürət, təcil (tangensial və normal) və Nyuton qanunları',
      'İmpuls və İmpulsun saxlanması qanunu (qapalı sistemlər)',
      'Fırlanma hərəkəti: Qüvvə momenti, Ətalət momenti, Hüygens–Şteyner teoremi və İmpuls momenti',
      'Mexaniki iş, güc, tam mexaniki enerjinin saxlanması və diyirlənən cismin enerjisi',
    ],
    sourceFile: 'YENİ-qr.6326 a1,a2-1-İRƏLİLƏMƏ və FIRLANMA HƏRƏKƏTİ..pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh1-dinamika.pdf`,
    presentationNumber: 1,
    studyNotes: getPhysNotes('koica_phys_3824'),
    checkQuestions: [
      'İrəliləmə hərəkətindəki m kütləsinin fırlanma hərəkətindəki qarşılığı nədir və Hüygens–Şteyner teoremi nə vaxt işlədilir?',
      'Konservativ sahədə F qüvvə vektoru ilə E_p potensial enerjisi arasında hansı əlaqə var?',
      'Sürüşmədən diyirlənən bütöv diskin tam kinetik enerjisi nə üçün yalnız mv²/2 deyil, (3/4)mv²-dir?',
    ],
  },
  {
    id: 'thermodynamics',
    title: 'Molekulyar fizika və termodinamikanın əsasları',
    outline: [
      'Molekulyar-kinetik nəzəriyyənin əsas tənliyi və Mendeleyev–Klapeyron (ideal qaz) hal tənliyi',
      'Maksvell sürət paylanması, üç xarakterik sürət və Barometrik / Bolsman paylanması',
      'Molekulun sərbəstlik dərəcələri (i), daxili enerji və Mayer düsturu',
      'Termodinamikanın I və II qanunları, izoproseslərdə iş, Puasson tənliyi, Karno tsikli və Entropiya',
    ],
    sourceFile: 'YENİ-qr.6326a1,a2 - 2-Molekulyar Fizika və Termodinamikanın əsasları.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh2-termodinamika.pdf`,
    presentationNumber: 2,
    studyNotes: getPhysNotes('koica_phys_3825'),
    checkQuestions: [
      'Biratomlu (He), ikiatomlu (O₂) və çoxatomlu (CO₂) qazların sərbəstlik dərəcəsi (i) neçədir?',
      'Maksvell paylanmasında ən ehtimallı, orta ədədi və orta kvadratik sürətlərdən hansı ən böyükdür?',
      'İzoxorik, izobarik, izotermik və adiabatik proseslərdə qazın gördüyü iş necə hesablanır?',
    ],
  },
  {
    id: 'electrostatics',
    title: 'Elektrostatika, dielektriklər və naqillər',
    outline: [
      'Kulon qanunu, Elektrik sahəsinin intensivliyi (E) və Superpozisiya prinsipi',
      'Elektrik sürüşmə vektoru (D) və Ostroqradski–Qauss teoremi',
      'Elektrostatik sahənin potensiallığı, sirkulyasiya və potensial qradienti (E = −grad φ)',
      'Elektrik tutumu, müstəvi kondensator və elektrostatik sahənin həcmi enerji sıxlığı',
    ],
    sourceFile: 'YENİ-qr.6326a1,a2-3--ELEKTROSTATİKA.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh3-elektrostatika.pdf`,
    presentationNumber: 3,
    studyNotes: getPhysNotes('koica_phys_3826'),
    checkQuestions: [
      'Ostroqradski–Qauss teoremi sadə dillə nə deyir və simmetrik yüklərin sahəsini tapmağı necə asanlaşdırır?',
      'Elektrostatik sahədə yükü qapalı kontur üzrə hərəkət etdirdikdə görülən iş nəyə bərabərdir?',
      'Kondensatorun lövhələri arasındakı məsafə 2 dəfə azaldılarsa, onun tutumu necə dəyişər?',
    ],
  },
  {
    id: 'current-magnetism',
    title: 'Sabit cərəyan, maqnit sahəsi və induksiya',
    outline: [
      'Cərəyan şiddəti (I), cərəyan sıxlığı (j), Om və Coul–Lens qanunlarının inteqral və diferensial formaları',
      'Budaqlanmış dövrələr üçün Kirxhofun I (düyün) və II (kontur) qaydaları',
      'Maqnit sahəsi: Bio–Savar–Laplas qanunu, Amper və Lorens qüvvələri',
      'Faradeyin elektromaqnit induksiya qanunu, Lens qaydası və öz-özünə induksiya',
    ],
    sourceFile: 'YENİ-qr.6326 a1,a2 -4--SABİT ELEKTRİK CƏRƏYANI.pptx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh4-sabit-cereyan.pdf`,
    presentationNumber: 4,
    studyNotes: getPhysNotes('koica_phys_3827'),
    checkQuestions: [
      'Adi Om qanunu (I = U/R) ilə diferensial Om qanunu (j = γE) arasındakı əsas fərq nədir?',
      'Kirxhofun I və II qaydaları hansı fiziki saxlanma qanunlarına əsaslanır?',
      'Maqnit sahəsi sükunətdə olan yükə təsir edirmi? Lorens qüvvəsi nə üçün yeyinlik modulunu dəyişmir?',
    ],
  },
  {
    id: 'oscillations',
    title: 'Mexaniki və elektromaqnit rəqsləri və dalğaları',
    outline: [
      'Harmonik rəqslərin diferensial tənliyi, yaylı, riyazi və fiziki rəqqaslar',
      'Sönən rəqslər, sönmə əmsalı (β), loqarifmik dekrement (δ) və keyfiyyətlilik (Q)',
      'Məcburi rəqslər, rezonans tezliyi və RLC elektromaqnit rəqs konturu (Tomson düsturu)',
      'Dalğa tənliyi (Dalamber tənliyi) və elektromaqnit dalğalarının enerji axını (Poyntinq vektoru)',
    ],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 5,
    studyNotes: [
      ...getPhysNotes('koica_phys_muh5_8').slice(0, 1),
      {
        heading: '2. Məcburi Rəqslər, Rezonans və Dalğa Tənliyi (Dalamber Tənliyi)',
        intuition:
          'Yelləncəyi öz-özünə buraxanda o yavaş-yavaş dayanır (sönən rəqs). Amma sən onu hər dəfə tam vaxtında — yelləncəyin öz təbii tezliyinə uyğun tezliklə itələsən (məcburi rəqs), amplitud kəskin böyüyür. Bu hadisə REZONANS adlanır. Rəqsin mühitdə qonşu hissəciklərə ötürülərək yayılması isə DALĞADIR.',
        body:
          'Xarici periodik F(t) = F₀ cos(Ωt) qüvvəsinin təsiri ilə baş verən rəqslərə məcburi rəqslər deyilir. Xarici Ω tezliyi rezonans tezliyinə (ω_rez) yaxınlaşdıqda amplitud maksimuma çatır. Rəqsin fəzada v sürəti ilə yayılması isə ikitərtibli xüsusi törəməli Dalamber dalğa tənliyi ilə təsvir olunur.',
        formulaOrCode:
          'Rezonans tezliyi:   ω_rez = √(ω₀² − 2β²)\nMəcburi amplitud:   A(Ω) = (F₀/m) / √((ω₀² − Ω²)² + 4β²Ω²)\nQaçan dalğa:        ξ(x, t) = A · cos(ωt − kx),   burada  k = 2π / λ\nDalamber tənliyi:   ∂²ξ / ∂t² = v² · (∂²ξ / ∂x²)\nPoyntinq vektoru:   S = [E × H]   (elektromaqnit dalğasının enerji axını sıxlığı)',
        symbols: [
          'Ω — xarici məcburedici qüvvənin bucaq tezliyi (rad/san)',
          'ω₀ — sistemin öz məxsusi bucaq tezliyi, β — sönmə əmsalı (1/san)',
          'λ — dalğa uzunluğu (m): rəqsin 1 period (T) ərzində yayıldığı məsafə (λ = v · T)',
          'k = 2π/λ — dalğa ədədi (rad/m), v = λ · ν = ω / k — dalğanın faza sürəti (m/san)',
        ],
        steps: [
          'Qaçan dalğa tənliyi ξ(x, t) = A cos(ωt − kx) verildikdə t-nin əmsalı ω-nı, x-in əmsalı isə k-nı göstərir.',
          'Tezliyi ν = ω / (2π), dalğa uzunluğunu λ = 2π / k düsturu ilə tap.',
          'Dalğanın yayılma sürətini v = ω / k = λ · ν kimi hesabla.',
        ],
        example:
          'Məsələ: Dalğa tənliyi ξ(x, t) = 0.05 cos(200π·t − 4π·x) (m) şəklindədir. Dalğa uzunluğunu və yayılma sürətini tapın.\nHəlli:\n1) Tənlikdən ω = 200π rad/san və k = 4π m⁻¹.\n2) Dalğa uzunluğu: λ = 2π / k = 2π / (4π) = 0.5 m.\n3) Dalğanın sürəti: v = ω / k = 200π / (4π) = 50 m/san.',
        warning:
          'Sürtünmə (β > 0) olan sistemdə rezonans tezliyi ω_rez = √(ω₀² − 2β²) məxsusi ω₀ tezliyindən bir qədər KİÇİKDİR! Yalnız sürtünmə sıfıra yaxınlaşdıqda (β → 0) ω_rez = ω₀ olur.',
      },
    ],
    checkQuestions: [
      'Sönən rəqslərin diferensial tənliyi və amplitudun zamandan asılılıq düsturu necə yazılır?',
      'Loqarifmik sönmə dekrementi (δ) ilə rəqs konturunun keyfiyyətliliyi (Q) arasında hansı əlaqə var?',
      'Məcburi rəqslərdə rezonans tezliyi məxsusi ω₀ tezliyindən nə qədər fərqlənir?',
    ],
  },
  {
    id: 'optics',
    title: 'Dalğa optikası',
    outline: [
      'Koherent dalğaların interferensiyası, optik yollar fərqi (Δ) və maksimum/minimum şərtləri',
      'Nazik təbəqələrdə interferensiya və Nyuton halqaları (Lab №6)',
      'Hüygens–Frenel prinsipi, bir yarıqdan və Difraksiya qəfəsindən Fraunhoffer difraksiyası',
      'İşığın polyarlaşması: Malyus qanunu və dielektrik səthindən qayıtmada Brüster qanunu',
    ],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 6,
    studyNotes: getPhysNotes('koica_phys_muh5_8').slice(1, 2),
    checkQuestions: [
      'Nyuton halqaları təcrübəsində mərkəzi ləkənin əks olunan işıqda qaranlıq olmasının fiziki səbəbi nədir?',
      'Difraksiya qəfəsinin baş maksimum şərti (d sin φ = mλ) və ayırdetmə qabiliyyəti (R = mN) necə hesablanır?',
      'Brüster bucağı altında düşən işıqda əks olunan və sınan şüalar arasındakı bucaq neçə dərəcədir?',
    ],
  },
  {
    id: 'quantum',
    title: 'Kvant fizikasının elementləri',
    outline: [
      'İstilik şüalanması: Stefan–Bolsman, Vin yerdəyişmə qanunu və Plankın kvant hipotezi (ε = hν)',
      'Fotonun enerjisi və impulsu, Xarici fotoeffekt üçün Eynşteyn tənliyi və Kompton səpilməsi',
      'Korpuskulyar-dalğa dualizmi: De-Broyl dalğa uzunluğu (λ = h/p)',
      'Heyzenberqin qeyri-müəyyənlik münasibətləri və Stasionar Şrödinger tənliyi',
    ],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 7,
    studyNotes: getPhysNotes('koica_phys_muh5_8').slice(2, 3),
    checkQuestions: [
      'Eynşteynin fotoeffekt tənliyinə əsasən fotoeffektin qırmızı sərhədi nədən asılıdır?',
      'İşığın intensivliyini artırdıqda qoparılan fotoelektronların maksimal sürəti dəyişirmi?',
      'De-Broyl dalğa uzunluğu düsturu (λ = h/p) nəyi ifadə edir?',
    ],
  },
  {
    id: 'atom-nucleus',
    title: 'Atom və nüvə fizikasının elementləri',
    outline: [
      'Rezerford modeli, Bor postulatları və Hidrogen atomunun spektral seriyaları (Lab №8)',
      'Kvant ədədləri (n, l, m_l, m_s) və Pauli prinsipi',
      'Atom nüvəsinin tərkibi, kütlə defekti (Δm) və nüvənin rabitə enerjisi',
      'Radioaktiv parçalanma qanunu və yarımparçalanma periodu (T₁/₂)',
    ],
    sourceFile: 'koica-muh5-8-reqsler-optika-kvant-nuve.pdf',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-muh5-8-reqsler-optika-kvant-nuve.pdf`,
    presentationNumber: 8,
    studyNotes: getPhysNotes('koica_phys_muh5_8').slice(3, 4),
    checkQuestions: [
      'Hidrogen atomunda Balmer seriyasının (görünən işıq) dalğa uzunluqları hansı düsturla hesablanır?',
      'Atom nüvəsinin kütlə defekti (Δm) nədir və rabitə enerjisi ilə necə əlaqəlidir?',
      'Yarımparçalanma periodu T₁/₂ = 10 gün olan izotopun 30 gündən sonra neçə faizi parçalanmamış qalar?',
    ],
  },
];

export const PHYSICS_LABS: PhysicsLab[] = [
  {
    id: 'momentum',
    title: 'İmpulsun saxlanması qanununun yoxlanılması',
    objective: 'Qapalı sistemdə arabacıqların (və ya kürələrin) elastik və qeyri-elastik toqquşması zamanı tam impulsun saxlanmasını yoxlamaq.',
    equipment: 'Üfüqi hava relsi (və ya relsli arabacıqlar), fotovartalar (sürət sensorları), tərəzi və müxtəlif kütləli yüklər.',
    steps: [
      'Arabacıqların m₁ və m₂ kütlələrini tərəzidə ölç.',
      'Qeyri-elastik toqquşma: sükunətdəki (v₂ = 0) ikinci arabacığa birinci arabacığı v₁ sürəti ilə göndər; yapışdıqdan sonrakı ortaq u sürətini ölç.',
      'Toqquşmadan əvvəlki p₁ = m₁v₁ impulsu ilə toqquşmadan sonrakı p₂ = (m₁ + m₂)u impulsunu müqayisə et.',
    ],
    result: 'Hesabatda m₁, m₂, v₁, u ölçmələri, əvvəlki və sonrakı impulslar və nisbi xəta göstərilir.',
    studyNotes: [
      {
        heading: 'Laboratoriya İşi: İmpulsun Saxlanması Qanununun Təcrübi Yoxlanılması',
        intuition:
          'Üfüqi sürtünməsiz rels üzərində hərəkət edən arabacığa xarici üfüqi qüvvə təsir etmir (ağırlıq qüvvəsi ilə dayaq reaksiyası bir-birini tarazlaşdırır). Ona görə iki arabacıq toqquşduqda onların toqquşmadan əvvəlki ümumi impulsu toqquşmadan sonrakı ümumi impulsuna bərabər qalmalıdır.',
        body:
          'Təcrübədə iki növ toqquşma yoxlanılır:\n1) Mütləq qeyri-elastik toqquşma: arabacıqlar toqquşub bir-birinə yapışır və ortaq u sürəti ilə hərəkət edir.\n2) Mütləq elastik toqquşma: yaylı buferlə toqquşan arabacıqlar ayrılır; burada həm impuls, həm də mexaniki enerji saxlanır.',
        formulaOrCode:
          'Qeyri-elastik toqquşma (v₂ = 0 olduqda):\nm₁ · v₁ = (m₁ + m₂) · u   ⇒   u = (m₁ · v₁) / (m₁ + m₂)\n\nElastik toqquşma (v₂ = 0 olduqda):\nu₁ = ((m₁ − m₂) / (m₁ + m₂)) · v₁;     u₂ = (2m₁ / (m₁ + m₂)) · v₁',
        symbols: [
          'm₁, m₂ — birinci və ikinci arabacığın kütlələri (kq)',
          'v₁ — birinci arabacığın toqquşmadan əvvəlki sürəti (m/san)',
          'u — qeyri-elastik toqquşmadan sonra birləşmiş arabacıqların ortaq sürəti (m/san)',
        ],
        steps: [
          'Fotovartadan keçmə müddəti Δt və bayraqcığın eni l vasitəsilə sürətləri hesabla: v₁ = l / Δt₁, u = l / Δt₂.',
          'Toqquşmadan əvvəlki impulsu tap: P_əvvəl = m₁ · v₁.',
          'Toqquşmadan sonrakı impulsu tap: P_sonra = (m₁ + m₂) · u və nisbi fərqi ε = |P_əvvəl − P_sonra| / P_əvvəl · 100% hesabla.',
        ],
        example:
          'Nümunə: m₁ = 0.25 kq arabacıq v₁ = 0.8 m/san sürətlə sükunətdəki m₂ = 0.25 kq arabacığa yapışır.\n• P_əvvəl = 0.25 · 0.8 = 0.20 kq·m/san.\n• Ortaq sürət: u = 0.4 m/san ⇒ P_sonra = (0.25 + 0.25) · 0.4 = 0.20 kq·m/san (impuls saxlandı!).',
        warning:
          'Qeyri-elastik toqquşmada impuls saxlansa da, kinetik enerji SAXLANMIR! İtirilən ΔE_k = (1/2) · (m₁m₂/(m₁+m₂)) · v₁² enerjisi toqquşma zamanı istiliyə və deformasiyaya sərf olunur.',
      },
    ],
  },
  {
    id: 'inertia',
    title: 'Lab N 1. Diskin və həlqənin ətalət momentinin təyini',
    sourceFile: 'DİSKİN ƏTALƏT MOMENTİNİN TƏYİNİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab1-disk-etalet.pdf`,
    objective: 'Disk və həlqənin ətalət momentlərini təcrübədə ölçüb nəzəri qiymətlərlə müqayisə etmək.',
    equipment: 'Fırlanma sensoru, disk və həlqə, müxtəlif yüklər, tərəzi, ştangenpərgar və interfeys.',
    steps: [
      'Diskin, həlqənin və şkivin kütlə və radiuslarını ölç.',
      'Asılmış yük ilə fırlanmanı başlat; bucaq sürəti–zaman qrafikinin meylindən bucaq təcilini tap.',
      'Şkiv, disk və həlqə üçün ətalət momentlərini ayrı-ayrılıqda hesabla; nəzəri və təcrübi nəticələri müqayisə et.',
    ],
    result: 'Hesabatda ölçülər, bucaq sürəti qrafiki, nəzəri və təcrübi ətalət momentləri, kənara çıxma göstərilir.',
    studyNotes: getPhysNotes('koica_phys_3828'),
  },
  {
    id: 'heat-capacity',
    title: 'Lab N 2. Qazların molyar istilik tutumları nisbətinin təyini',
    sourceFile: 'QAZIN İSTİLİK TUTUMLARI.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab2-qaz-istilik.pdf`,
    objective: 'Hava üçün adiabatik prosesi araşdırıb γ = C_P / C_V nisbətini təyin etmək.',
    equipment: 'İstilik maşını, porşen, təzyiq sensoru, interfeys və kompüter.',
    steps: [
      'Porşeni 9 sm hündürlükdə saxlayıb təzyiq rəqslərinin periodunu ölç.',
      'Hündürlüyü 1 sm addımlarla 8 sm-dən 1 sm-ə endirərək periodları qeyd et.',
      'h ilə T² arasındakı qrafiki qur; meyldən istilik tutumları nisbətini hesablayıb ideal qiymətlə müqayisə et.',
    ],
    result: 'Hesabatda h və period ölçüləri, h(T²) qrafiki və alınan C_P / C_V qiyməti göstərilir.',
    studyNotes: getPhysNotes('koica_phys_3829'),
  },
  {
    id: 'nichrome',
    title: 'Lab N 3. Naqillərin (nixrom məftilin) xüsusi müqavimətinin təyini',
    sourceFile: 'NİXROM MƏFTİLİN XÜSUSİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab3-nixrom-muqavimet.pdf`,
    objective: 'Om qanununa əsasən nixrom naqilin xüsusi elektrik müqavimətini (ρ = R·S/l) təyin etmək.',
    equipment: 'Nixrom naqil, müqavimət ölçmə qurğusu, ampermetr, voltmetr, ştangenpərgar və mikrometr.',
    steps: [
      'Məftilin diametrini bir neçə nöqtədə ölçərək en kəsiyinin sahəsini (S = πd²/4) hesabla.',
      'Müxtəlif uzunluqlarda gərginlik və cərəyanı ölçərək müqaviməti (R = U/I) tap.',
      'ρ = πd²U / (4lI) düsturu ilə xüsusi müqaviməti və ölçmə xətasını təyin et.',
    ],
    result: 'Hesabatda naqilin həndəsi ölçüləri, U və I qiymətləri, xüsusi müqavimətin orta qiyməti və xətası göstərilir.',
    studyNotes: getPhysNotes('koica_phys_3830'),
  },
  {
    id: 'earth-field',
    title: 'Lab №4. Yerin maqnit sahəsinin toplananlarının təyini',
    sourceFile: 'YERİN MAQNİT SAHƏSİNİN İNDUKSİYASININ ÜFÜQİ,.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab4-yer-maqnit.pdf`,
    objective: 'Maqnit induksiyasının üfüqi toplananını, tam qiymətini və maqnit meyl bucağını müəyyən etmək.',
    equipment: 'Maqnit sahəsi və fırlanma sensorları, maqnit əqrəbi, Qauss kamerası, interfeys və kompüter.',
    steps: [
      'Sensoru hazırlayıb üfüqi müstəvidə döndər; qrafikin pikindən üfüqi toplananı oxu.',
      'Sensoru şaquli müstəvidə döndərərək tam induksiyanı ölç.',
      'Üfüqi və tam qiymətlərdən maqnit meyl bucağını hesabla.',
    ],
    result: 'Hesabatda hər iki qrafik, sahənin üfüqi və tam qiymətləri, meyl bucağı verilir.',
    studyNotes: getPhysNotes('koica_phys_3831'),
  },
  {
    id: 'damped-circuit',
    title: 'Lab №5. Sönən elektromaqnit rəqslərinin öyrənilməsi',
    sourceFile: 'RƏQS KONTURUNDA SÖNƏN ELEKTROMAQNİT RƏQSLƏRİNİN tədqiqi.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab5-sonen-reqsler.pdf`,
    objective: 'Sönən rəqsləri ossilloqrafda müşahidə edib loqarifmik dekrementi və konturun keyfiyyətliyini təyin etmək.',
    equipment: 'Ossilloqraf, induktiv sarğac, kondensator, müqavimətlər mağazası və səs generatoru.',
    steps: [
      'Rəqs konturunu qur və ossilloqrafda sönən rəqslərin şəklini al.',
      'Müqaviməti artıraraq aperiodik boşalmaya keçid həddini qeyd et.',
      'Bir neçə period üzrə amplitudları ölç; loqarifmik dekrementi və keyfiyyətliyi tapıb nəzəri qiymətlərlə müqayisə et.',
    ],
    result: 'Hesabatda ossilloqram, amplitud və müqavimət ölçüləri, sönmə göstəriciləri göstərilir.',
    studyNotes: getPhysNotes('koica_phys_3832'),
  },
  {
    id: 'newton-rings',
    title: 'Lab N 6. Nyuton halqaları ilə işığın dalğa uzunluğunun təyini',
    sourceFile: 'İşıgın interferensiyası.Nyuton halqaları vasitəsilə işıgın dalfa uzunlugunun təyini..docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab6-nyuton-halqalari.pdf`,
    objective: 'İşığın interferensiyasını müşahidə edib Nyuton halqalarının radiuslarından dalğa uzunluğunu təyin etmək.',
    equipment: 'İşıq mənbəyi, monoxromatik filtr, müstəvi qabarıq linza və şüşə lövhə, mikrometrik okulyar.',
    steps: [
      'Qurğunu işıqlandır və okulyarda halqaları aydın görənədək nizamla.',
      'Bir neçə ardıcıl halqanın radiusunu mikrometrik vintlə ölç və cədvələ yaz.',
      'Təlimatdakı düsturla dalğa uzunluğunu hesabla; təkrarlardan orta qiymət və xətanı tap.',
    ],
    result: 'Hesabatda halqaların ölçüləri, hesablanan dalğa uzunluğu, orta qiymət və ölçmə xətası yer alır.',
    studyNotes: getPhysNotes('koica_phys_3833'),
  },
  {
    id: 'atomic-spectra',
    title: 'Lab N 8. Atom spektrinin öyrənilməsi',
    sourceFile: 'ATOM SPEKTİRLƏRİNİN OYRƏNİLMƏSİ.docx',
    pdfUrl: `${PHYSICS_PDF_BASE_URL}/koica-lab8-atom-spektri.pdf`,
    objective: 'Hidrogenin görünən spektrini ölçüb Ridberq sabitini hesablamaq; təlimatın ikinci üsulunda digər lampaların spektrlərini müqayisə etmək.',
    equipment: 'Hidrogen qaz boşalma borusu, monoxromator və qidalanma bloku; ikinci üsulda spektrofotometr və atom lampaları.',
    steps: [
      'Hidrogen borusunu qoşub monoxromatorda Balmer xətlərinin mövqelərini qeyd et.',
      'Xətlərdən dalğa uzunluqlarını və hər xətt üçün Ridberq sabitini hesablayıb orta qiymət al.',
      'İkinci üsul tətbiq edilərsə, natriumla qəfəs sabitini tap, helium və digər lampaların xətlərini etalonlarla müqayisə et.',
    ],
    result: 'Hesabatda spektr xətləri, dalğa uzunluqları, Ridberq sabitinin qiymətləri və istifadə olunan üsula uyğun müqayisələr göstərilir.',
    studyNotes: getPhysNotes('koica_phys_3834'),
  },
];
