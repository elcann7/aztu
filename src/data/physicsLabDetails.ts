import type { PhysicsExplanation } from './physicsLessonDetails';

export interface PhysicsLabDetail {
  theory: PhysicsExplanation[];
  detailedSteps: string[];
  calculations: string[];
}

// Derived from the teacher's six matching manuals and the additional nichrome
// manual. No apparatus-specific procedure is invented for LMS laboratory 1.
export const PHYSICS_LAB_DETAILS: Record<string, PhysicsLabDetail> = {
  inertia: {
    theory: [
      { title: 'Nə ölçülür?', text: 'Fırlanma ətalət momenti kütlənin oxdan paylanmasını göstərir. Eyni kütləli halqanın kütləsi kənara daha yaxın olduğu üçün momenti diskin momentindən böyükdür. Qurğuda asılmış yük şkivi fırladır; yükün düzxətli təcili a=rα, burada r şkivin radiusu, α qrafikdən alınan bucaq təcilidir. Yükə mg aşağı, ipin gərilməsi F yuxarı təsir edir. Sürtünməni nəzərə almadıqda F=m(g−rα), moment Fr və fırlanan sistemin I-si Fr/α-dır.', formula: 'I_təcrübə=m(g−rα)r/α;  I_disk=m_dR²/2;  I_həlqə=m_h(R_x²+R_i²)/2' },
      { title: 'Ayrı hissələri necə çıxırıq?', text: 'Sensor və şkiv özü də ətalətə malikdir. Əvvəl tək şkiv, sonra şkiv+disk, sonda şkiv+disk+həlqə ölçülür. Diskin momenti ikinci və birinci ölçünün fərqi, həlqəninki üçüncü və ikinci ölçünün fərqidir. Təlimatda tək şkiv üçün 5 q, disk mərhələsi üçün 20 q asılmış yük işlədilir; hər mərhələdə faktiki asılmış kütləni düsturda ayrıca götür. İdeal modeldə ipin kütləsi, oxun sürtünməsi və hava müqaviməti nəzərə alınmır; fərqin mümkün səbəbləri bunlardır.' },
    ],
    detailedSteps: ['Disk, həlqə və şkivin kütlələrini tərəzi ilə, xarici və daxili radiuslarını ştangenpərgarla ölç; nəticələri SI vahidlərinə çevir.', 'Fırlanma sensorunu interfeysin 1 və 2-ci kanallarına qoş, Data Studio-da bucaq sürəti–zaman qrafikini aç. İpin şkivdə sürüşmədiyini yoxla.', 'Tək şkivə təlimatda göstərilən 5 q yükü as, burax və ω(t) xəttinin meylindən α₁-ni tap.', 'Diski yerləşdir, təlimatdakı 20 q asılmış yüklə ölçməni təkrar et və α₂-ni yaz.', 'Həlqəni diskin üzərinə yerləşdirib üçüncü ölçməni apar; hər mərhələdə eyni kütlə və radius qeydinin qarışmadığını yoxla.'],
    calculations: ['Hər üç quruluş üçün uyğun yük kütləsi m, şkiv radiusu r və ölçülən α ilə I=m(g−rα)r/α hesabla.', 'I_disk,təc=I_şkiv+disk−I_şkiv; I_həlqə,təc=I_şkiv+disk+həlqə−I_şkiv+disk.', 'Ölçülən kütlə və radiuslarla disk və qalın həlqə üçün nəzəri I-ni hesabla. Nisbi fərqi |I_təc−I_nəz|/I_nəz·100% şəklində ver.'],
  },
  'heat-capacity': {
    theory: [
      { title: 'Adiabatik əmsalın mənası', text: 'γ=Cₚ/Cᵥ qazın sabit təzyiq və sabit həcm istilik tutumlarının nisbətidir. Sürətli, kiçik porşen rəqslərində istilik mübadiləsi az olduğundan qaz təqribən adiabatik sıxılır və genişlənir. Tarazlıq ətrafında təzyiq dəyişməsi qaytarıcı qüvvə yaradır, sistem harmonik rəqqas kimi rəqs edir. Hava əsasən ikiatomlu qazlardan ibarət olduğundan adi temperaturda nəzəri yaxınlaşma γ≈1,4-dür; təcrübə nəticəsi bundan saparsa sızma, sürtünmə və period ölçməsi yoxlanmalıdır.', formula: 'γ=Cₚ/Cᵥ;  pV^γ≈sabit;  T_rəqs=2π√(m/k_eff)' },
      { title: 'Qrafik niyə düz xətdir?', text: 'Silindrdə qazın həcmi V=S(h+h₀) kimi yazılır; S porşenin en kəsiyi, h şkaladan oxunan hündürlük, h₀ əlavə boş həcmin uyğun hündürlüyüdür. Kiçik adiabatik dəyişmədə effektiv yay sabiti k_eff≈γpS²/V-dir. Bu səbəbdən h ilə periodun kvadratı T² arasında xətti əlaqə yaranır. p porşenin tarazlığındakı mütləq qaz təzyiqidir; qurğunun şərtinə görə atmosfer təzyiqi və porşenin ağırlığı nəzərə alınır. Qrafikin meyli s=Δh/Δ(T²) ölçülür.', formula: 'T²≈4π²m(h+h₀)/(γpS);  γ≈4π²ms/(pS)' },
    ],
    detailedSteps: ['Təzyiq sensorunu silindrə və interfeysə bağla; açıq hava çıxışındakı borucuğun sıxacını bağla. Qurğu üzərində porşenin kütləsi m və en kəsiyi S-ni qeyd et.', 'Porşeni 9 sm səviyyəsinə qaldırıb vintlə saxla, proqramda “İstilik tutumları nisbəti” qrafikini aç və ölçməni başlat.', 'Vinti azca boşalt, porşenin kiçik rəqslərinin təzyiq qrafikini yaz. Məsələn, 5 ardıcıl pik arasındakı müddəti 4 perioda böl; tək pik aralığına nisbətən daha dəqiq nəticə al.', 'Porşenin hündürlüyünü 8, 7, …, 1 sm seçərək hər səviyyədə h və T-ni cədvələ yaz. Atmosfer təzyiqini barometrlə ölç.'],
    calculations: ['Hər sətrə T² əlavə et və h-ni şaquli, T²-ni üfüqi oxda göstərərək ən yaxşı düz xətti çək; meyl s=Δh/Δ(T²)-ni tap.', 'm, S, p və s-ni uyğun SI vahidlərinə çevirib γ≈4π²ms/(pS) hesabla; p üçün qurğunun tarazlıq təzyiqini işlət.', 'Nəticəni hava üçün təqribi 1,4 ilə müqayisə et. Qrafikdən alınan h₀, qeyri-xəttilik və təkrarlanan periodların yayılması haqqında qeyd yaz.'],
  },
  'earth-field': {
    theory: [
      { title: 'Sahənin toplananları', text: 'Yerin maqnit sahəsi yerə paralel üfüqi B_h və şaquli B_v toplananlara ayrılır. Tam qiymət B bu vektorların həndəsi cəmidir. Maqnit meyl bucağı i sahə vektoru ilə üfüq arasındakı bucaqdır. Üfüqi fırlanmada sensorun sahə ilə düzləndiyi qrafik piki B_h-ni, şaquli fırlanmada ən böyük qiymət tam B-ni verir. Sensorun ofseti və yaxınlıqdakı dəmir əşyalar ölçməni dəyişə bilər.', formula: 'B²=B_h²+B_v²;  B_v=√(B²−B_h²);  i=arccos(B_h/B)' },
    ],
    detailedSteps: ['Maqnit sensoru və fırlanma sensorunu interfeysə qoş, ətrafdakı maqnit və iri dəmir əşyaları uzaqlaşdır, sensoru sıfırla.', 'Sensoru üfüqi müstəvidə tam 360° yavaş fırlat. Qrafikdə bir dövrün pikini seçib B_h-ni yaz; eyni dövrü təkrar ölç.', 'Sensoru şaquli müstəviyə keçir və tam 360° fırlat. Pik qiymətdən B-ni yaz; oxları qarışdırmamaq üçün istiqamətləri qeyd et.'],
    calculations: ['B_v=√(B²−B_h²) və i=arccos(B_h/B) hesabla; ekvivalent olaraq tan i=B_v/B_h.', 'B≥B_h şərtini yoxla. Təkrarlar arasında fərq böyükdürsə sensor sıfırlaması, metal əşyalar və fırlanma müstəvisini yenidən yoxla.'],
  },
  'damped-circuit': {
    theory: [
      { title: 'RLC konturunda sönmə', text: 'Kondensatorun yükü q, sarğacın induktivliyi L, tutum C və toplam müqavimət R olduqda sərbəst konturun tənliyi Lq″+Rq′+q/C=0-dır. Zəif sönmədə amplitud A₀e^(−βt) kimi azalır, β=R/(2L). Rəqs tezliyi ω_d=√(1/LC−β²), period T=2π/ω_d-dir. R artdıqca sönmə sürətlənir; R=2√(L/C) ideal kritik həddə rəqs yox olur. Real qurğuda sarğacın daxili müqavimətini də toplam R-yə daxil et.', formula: 'β=R/(2L);  ω_d=√(1/LC−β²);  R_kritik=2√(L/C)' },
      { title: 'Amplitudlardan keyfiyyətlik', text: 'Ossilloqramda bir neçə period aralı iki eyni işarəli maksimum A_k və A_{k+n} götür. Loqarifmik dekrement δ=ln(A_k/A_{k+n})/n-dir; bir periodda amplitudun azalmasını göstərir. β=δ/T, relaksasiya vaxtı τ=1/β-dir. Zəif sönmədə keyfiyyətlik Q≈π/δ olur; böyük Q enerjinin daha yavaş itdiyini bildirir. Eyni cür pikləri müqayisə etmək vacibdir: müsbət maksimumla mənfi minimumu birbaşa bölmə.', formula: 'δ=(1/n)ln(A_k/A_{k+n});  β=δ/T;  τ=1/β;  Q≈π/δ' },
    ],
    detailedSteps: ['Sarğac, kondensator və müqavimətlər mağazası ilə konturu təlimat sxeminə görə qur, ossilloqrafı və siqnal generatorunu qoş.', 'Başlanğıc R üçün sönən ossilloqramı sabit görünüşə gətir. Eyni işarəli bir neçə pik və onların zamanlarını cədvəldə qeyd et.', 'R-ni mərhələlərlə artır, hər dəfə yeni amplitud və periodu ölç. Rəqsin aperiodik boşalmaya çevrildiyi həddi qeyd et.', 'Müxtəlif R-lər üçün qrafikləri saxla; ölçülən amplitudların təxminən eksponensial azalıb-azalmadığını yoxla.'],
    calculations: ['T-ni iki uzaq pik arasındakı vaxtı aradakı period sayına bölərək tap.', 'δ, β, τ və zəif sönmə varsa Q-ni düsturlarla hesabla; R, L, C-dən alınan nəzəri β və ω_d ilə müqayisə et.', 'Müşahidə olunan aperiodik həddi R_kritik=2√(L/C) ilə tutuşdur; toplam R-yə sarğacın müqavimətinin daxil olduğunu qeyd et.'],
  },
  'newton-rings': {
    theory: [
      { title: 'Halqaların yaranması', text: 'Müstəvi-qabarıq linza şüşə lövhəyə toxunanda arada kənara doğru qalınlaşan hava təbəqəsi qalır. Təbəqənin iki sərhədindən qayıdan şüalar interferensiya edir. Şüşə sərhədindən qayıtmada əlavə π faza çevrilməsi olduğundan qayıdan işıqda mərkəz qaranlıq, keçən işıqda işıqlıdır. Təlimatda linzanın əyrilik radiusu R=37 m göstərilir. Qaranlıq m-ci halqa üçün r_m²=mλR; eyni tipli iki halqanın kvadrat radius fərqi λ-ni verir.', formula: 'r_m²=mλR;  λ=(r_{m+k}²−r_m²)/(kR)' },
      { title: 'Niyə iki halqa seçilir?', text: 'Mərkəzin yeri və linza ilə lövhənin tam toxunmaması ayrı-ayrı radiusa sistematik xəta verə bilər. Uzaq iki eyni tip halqanın radiuslarının kvadrat fərqini götürmək bu təsirin bir hissəsini azaldır. Diametr ölçürsənsə r=D/2 olduğundan məxrəcdə 4 də olmalıdır. m və m+k halqalarının hər ikisi qaranlıq və ya hər ikisi işıqlı seçilir; fərqli tipli halqalar üçün eyni düstur tətbiq olunmur.', formula: 'λ=(D_{m+k}²−D_m²)/(4kR)' },
    ],
    detailedSteps: ['İşıq mənbəyini və monoxromatik filtri qur, yarımşəffaf lövhənin bucağını okulyarda halqalar aydın görünənədək nizamla.', 'Mərkəzi və qaranlıq halqaların sıra nömrələrini müəyyən et. Mikrometrin sıfırını qeyd et; mümkün olsa hər halqanın iki əks kənarını oxuyub diametrini tap.', 'Bir neçə fərqli m və m+k cütü üçün ölçməni təkrar et. Başqa filtrə keçsən nəticələri ayrıca cədvəldə saxla.'],
    calculations: ['Hər halqa cütü üçün λ=(D_{m+k}²−D_m²)/(4kR) hesabla; R-ni və D-ni metrə çevir.', 'λ qiymətlərinin ortasını və yayılmasını hesabla. Görünən işıq üçün alınan nəticənin təxminən 400–700 nm aralığında olub-olmadığını yoxla.', 'Qeyri-dəqiq mərkəz, halqaların bulanıqlığı, mikrometr oxunuşu və əyrilik radiusunun qeyri-müəyyənliyini xəta mənbəyi kimi göstər.'],
  },
  'atomic-spectra': {
    theory: [
      { title: 'Balmer xətləri və Ridberq sabiti', text: 'Hidrogen atomunda yüksək enerji səviyyəsindən n=2 səviyyəsinə keçid görünən Balmer xətlərini verir. Məsələn n=3→2 Hα, n=4→2 Hβ, n=5→2 Hγ və n=6→2 Hδ adlanır. Hər xəttin dalğa uzunluğundan R_H=(1/λ)/(1/2²−1/n²) hesablana bilər. Dalğa uzunluğunu nanometrdən metrə çevirməsən R_H səhv vahiddə çıxar. Təlimatda monoxromatorlu I üsul və difraksiya qəfəsli II üsul ayrıca verilir.', formula: '1/λ=R_H(1/2²−1/n²);  R_H≈1,097·10⁷ m⁻¹' },
      { title: 'Difraksiya qəfəsi ilə ölçmə', text: 'Qəfəs periodu d, m-ci tərtib maksimumun bucağı θ və dalğa uzunluğu λ üçün d sinθ=mλ-dir. II üsulda əvvəl natriumun təqribən 589,6 nm sarı xətti ilə d kalibrlənir; sonra eyni qəfəslə helium, civə və hidrogen xətlərinin θ-ləri ölçülür. Birinci və ikinci tərtibləri qarışdırma. Müəllim təlimatında natrium dubleti 589 və 589,6 nm kimi göstərilir, qurğu onları ayırmadığı üçün 589,6 nm bir xətt kimi qəbul olunur.', formula: 'd=mλ_Na/sinθ_Na;  λ_naməlum=d sinθ/m' },
    ],
    detailedSteps: ['I üsul: hidrogen borusunu qidalanma blokuna qoş, monoxromator yarığını bərabər işıqlandır və Hα, Hβ, Hγ, Hδ xətlərinin baraban göstəricilərini yaz.', 'Monoxromatorun dərəcələnmə qrafikindən hər xəttin λ-sını oxu. Təlimatın hesablamalarına uyğun hər biri üçün R_H və orta qiyməti tap.', 'II üsul tətbiq edilirsə, əvvəl natrium lampası və difraksiya qəfəsini qur; birinci və ikinci tərtib maksimumların bucaqlarını ölç və d-ni kalibrlə.', 'Sonra helium, civə və hidrogen lampalarını bir-bir qoş. Hər lampada xəttin rəngini, tərtibini və bucağını qeyd et; təlimatdakı sensor həssaslığı və yarıq ayarlarını lampaya uyğun dəyiş.', 'Civə lampası işləyərkən ona birbaşa baxma; cihazın optik müşahidə yolundan istifadə et.'],
    calculations: ['I üsulda hər Balmer xətti üçün R_H hesabla, orta qiyməti və etalonla nisbi fərqi yaz.', 'II üsulda natriumdan d-ni tap, sonra hər xətt üçün λ=d sinθ/m hesabla. Məlum etalon xətlərlə nisbi fərqi |λ_təc−λ_etalon|/λ_etalon·100% şəklində ver.', 'Hidrogen üçün alınan λ-lərdən Ridberq sabitini ayrıca çıxara bilərsən; təlimatda əlavə olaraq elektron kütləsi və birinci Bor orbitinin radiusunun hesabı da göstərilir.'],
  },
  nichrome: {
    theory: [
      { title: 'Xüsusi müqavimət', text: 'Eyni temperaturda bircins silindrik naqil üçün R=ρℓ/S, S=πd²/4-dür. ρ materialın xüsusi müqaviməti olub vahidi Ω·m-dir; R isə Ω ilə ölçülür. Gərginlik U, cərəyan I və uzunluq ℓ ölçülürsə R=U/I və ρ=Uπd²/(4Iℓ) alınır. Məftil isinərsə müqavimət dəyişə bilər, buna görə ölçmələrdə cərəyanı və vaxtı uyğun saxla.', formula: 'R=U/I=ρℓ/S;  S=πd²/4;  ρ=Uπd²/(4Iℓ)' },
    ],
    detailedSteps: ['Mikrometrlə məftilin müxtəlif yerlərində diametri ən azı üç dəfə ölç; orta d-ni və ölçmələrin yayılmasını yaz.', 'Təlimat sxemində ampermetri ardıcıl, voltmetri ölçülən hissəyə paralel qoş. U və I-dən R-ni tap.', 'Sürüşkən kontaktla naqilin ən azı 10 müxtəlif uzunluğunu seç; hər biri üçün ℓ, U, I və R-ni cədvələ yaz.', 'R(ℓ) qrafikini çək və nöqtələrin düz xəttə nə qədər uyğun gəldiyini yoxla.'],
    calculations: ['Hər ölçmədən ρ=Rπd²/(4ℓ) hesabla və orta qiymətini tap.', 'Qrafikin meyli s=ΔR/Δℓ isə ρ=sπd²/4 olur. Qrafikdən və ayrı ölçmələrdən alınan qiymətləri müqayisə et.', 'Diametr kvadratla daxil olduğundan d xətası nəticəyə güclü təsir edir; mümkün kontakt müqavimətini və məftilin isinməsini də müzakirə et.'],
  },
};
