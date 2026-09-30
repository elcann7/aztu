(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let speakerVisible = true;

  // DOM Elementləri
  const slideDots = document.getElementById('slideDots');
  const slideCounter = document.getElementById('slideCounter');
  const speakerDock = document.getElementById('speakerDock');
  const speakerText = document.getElementById('speakerText');
  const btnPrevSlide = document.getElementById('btnPrevSlide');
  const btnNextSlide = document.getElementById('btnNextSlide');
  const btnToggleSpeaker = document.getElementById('btnToggleSpeaker');
  const btnFullscreen = document.getElementById('btnFullscreen');

  // Görünüş rejimləri
  const modeButtons = Array.from(document.querySelectorAll('.mode-btn'));
  const viewSlides = document.getElementById('viewSlides');
  const viewSimulator = document.getElementById('viewSimulator');
  const viewSpeech = document.getElementById('viewSpeech');
  const btnJumpToSim = document.getElementById('btnJumpToSim');
  const btnBackToSlides = document.getElementById('btnBackToSlides');
  const btnBackFromSpeech = document.getElementById('btnBackFromSpeech');
  const allSpeechesList = document.getElementById('allSpeechesList');

  function setMode(mode) {
    modeButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    viewSlides.classList.toggle('active', mode === 'slides');
    viewSimulator.classList.toggle('active', mode === 'simulator');
    viewSpeech.classList.toggle('active', mode === 'speech');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  if (btnJumpToSim) {
    btnJumpToSim.addEventListener('click', () => setMode('simulator'));
  }
  if (btnBackToSlides) {
    btnBackToSlides.addEventListener('click', () => setMode('slides'));
  }
  if (btnBackFromSpeech) {
    btnBackFromSpeech.addEventListener('click', () => setMode('slides'));
  }

  // Nömrəli slayd düymələrinin yaradılması
  function initDots() {
    slideDots.innerHTML = '';
    slides.forEach((slide, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dot-btn' + (idx === 0 ? ' active' : '');
      btn.textContent = String(idx + 1).padStart(2, '0');
      btn.title = 'Slayd ' + (idx + 1);
      btn.addEventListener('click', () => goToSlide(idx));
      slideDots.appendChild(btn);
    });
  }

  // Bütün slaydların çıxış mətnini 3-cü bölməyə doldurmaq
  function populateFullSpeechList() {
    if (!allSpeechesList) return;
    allSpeechesList.innerHTML = '';
    slides.forEach((slide, idx) => {
      const item = document.createElement('div');
      item.className = 'speech-card-item';
      const titleEl = slide.querySelector('.inst-dept') || slide.querySelector('h2');
      const subtitle = titleEl ? titleEl.textContent.trim() : '';
      item.innerHTML =
        '<h4>Slayd ' +
        String(idx + 1).padStart(2, '0') +
        ': ' +
        subtitle +
        '</h4><p>' +
        (slide.dataset.speech || '') +
        '</p>';
      allSpeechesList.appendChild(item);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentIndex);
    });

    const dots = Array.from(slideDots.querySelectorAll('.dot-btn'));
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentIndex);
    });

    slideCounter.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    speakerText.textContent = slides[currentIndex].dataset.speech || '';
  }

  btnPrevSlide.addEventListener('click', () => goToSlide(currentIndex - 1));
  btnNextSlide.addEventListener('click', () => goToSlide(currentIndex + 1));

  btnToggleSpeaker.addEventListener('click', () => {
    speakerVisible = !speakerVisible;
    speakerDock.classList.toggle('hidden', !speakerVisible);
    btnToggleSpeaker.setAttribute('aria-pressed', String(speakerVisible));
    btnToggleSpeaker.textContent = speakerVisible
      ? '🎤 Spiker Nitqi: Açıq'
      : '🎤 Spiker Nitqi: Gizli';
  });

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Klaviatura ilə idarəetmə (← → Space)
  document.addEventListener('keydown', (e) => {
    if (!viewSlides.classList.contains('active')) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    }
  });

  // ========================================================================
  // CANLI ESD VƏ RƏQƏMSAL İMZA SİMULYATORU
  // ========================================================================
  const DOC_TEMPLATES = {
    serencam: {
      title: 'S Ə R Ə N C A M',
      num: 'SƏR-2026/6326-14',
      recipient: 'AzTU İTT fakültəsinin dekanlığına və struktur bölmələrinə',
      subject: 'Elektron sənəd dövriyyəsi sisteminin tətbiqi və icra intizamı barədə',
      body:
        'Universitet daxilində xidməti yazışmaların operativliyini artırmaq məqsədilə, Elmi Şuranın qərarına uyğun olaraq və bununla əlaqədar:\n' +
        '1. Bütün kafedra və şöbələrdə daxili arayış, xidməti qeyd və hesabatların elektron sənəd dövriyyəsi (ESD) sistemi üzərindən hazırlanması təmin edilsin.\n' +
        '2. Sənədlərin icra müddətinə nəzarət Ümumi şöbəyə tapşırılsın.'
    },
    xidmeti: {
      title: 'X İ D M Ə T İ   Q E Y D',
      num: 'XQ-2026/6326-89',
      recipient: 'Rəqəmsal Transformasiya və İT Şöbəsinin müdiri K.Əliyevə',
      subject: '6326A2 qrup auditoriyasında rəqəmsal təqdimat avadanlığının sazlanması barədə',
      body:
        'Hörmətli Kamran müəllim,\n' +
        '2026/2027-ci tədris ilinin payız semestrində 6326A2 qrupunda keçirilən məşğələ dərslərində elektron sənəd dövriyyəsi üzrə praktik təqdimatların nümayişi üçün 304 saylı auditoriyadakı şəbəkə çıxışının aktivləşdirilməsinə ehtiyac yaranmışdır.\n' +
        'Müvafiq texniki dəstəyin göstərilməsini xahiş edirəm.'
    },
    arayis: {
      title: 'A R A Y I Ş',
      num: 'AR-2026/6326-205',
      recipient: 'Tələb olunan rəsmi quruma təqdim edilmək üçün',
      subject: 'Tələbə statusunun elektron təsdiqi haqqında',
      body:
        'Verilir Səfərli Elcan tərəfindən ondan ötrü ki, o, həqiqətən Azərbaycan Texniki Universitetinin İnformasiya və telekommunikasiya texnologiyaları fakültəsinin I kurs, 6326A2 qrupunda əyani təhsil alır.\n' +
        'Arayış elektron sənəd dövriyyəsi (RSD) vasitəsilə təsdiqlənmişdir və QR-kodla yoxlanıla bilər.'
    },
    muqavile: {
      title: 'X İ D M Ə T   M Ü Q A V İ L Ə S İ',
      num: 'MÜQ-2026/6326-07',
      recipient: '«Rəqəmsal Həllər» MMC və AzTU İTT İnnovasiya Mərkəzi',
      subject: 'Elektron sənəd dövriyyəsi modulunun texniki dəstəklənməsi haqqında',
      body:
        '1. Müqavilənin predmeti: İcraçı Sifarişçinin daxili elektron sənəd dövriyyəsi sisteminin fasiləsiz işini təmin etməyi öhdəsinə götürür.\n' +
        '2. Tərəflərin öhdəlikləri və hesablaşma qaydası: Xidmət haqqı hər ayın sonunda elektron təhvil-təslim aktı əsasında ödənilir.\n' +
        '3. Müqavilə müddəti və hüquqi ünvanlar: Müqavilə rəqəmsal imzalandığı andan 1 (bir) il müddətinə qüvvədədir.'
    }
  };

  const simDocType = document.getElementById('simDocType');
  const simRecipient = document.getElementById('simRecipient');
  const simSubject = document.getElementById('simSubject');
  const simBody = document.getElementById('simBody');
  const simSigner = document.getElementById('simSigner');
  const simSignMethod = document.getElementById('simSignMethod');

  const btnStepVisa = document.getElementById('btnStepVisa');
  const btnStepSign = document.getElementById('btnStepSign');
  const btnTamperTest = document.getElementById('btnTamperTest');

  const outDocNum = document.getElementById('outDocNum');
  const outDocDate = document.getElementById('outDocDate');
  const outVisaStatus = document.getElementById('outVisaStatus');
  const outRecipient = document.getElementById('outRecipient');
  const outDocType = document.getElementById('outDocType');
  const outSubject = document.getElementById('outSubject');
  const outBody = document.getElementById('outBody');
  const outSigner = document.getElementById('outSigner');
  const outResolution = document.getElementById('outResolution');

  const sheetStatusBadge = document.getElementById('sheetStatusBadge');
  const digitalSeal = document.getElementById('digitalSeal');
  const sealTitle = document.getElementById('sealTitle');
  const sealHash = document.getElementById('sealHash');
  const sealTime = document.getElementById('sealTime');
  const pipelineNodes = Array.from(document.querySelectorAll('#simPipeline .sp-node'));

  let signedHash = null;
  let signedContentSnapshot = '';

  // Sadə deterministik SHA-256 bənzəri 64-simvollu kriptoqrafik heş generatoru
  function computeHashHex(text) {
    let h1 = 0xdeadbeef ^ text.length;
    let h2 = 0x41c6ce57 ^ text.length;
    let h3 = 0x9e3779b9 ^ text.length;
    let h4 = 0x85ebca6b ^ text.length;
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
      h3 = Math.imul(h3 ^ (ch << 3), 2246822519);
      h4 = Math.imul(h4 ^ (ch << 7), 3266489917);
    }
    const hex = (n) => (n >>> 0).toString(16).padStart(8, '0');
    return (
      hex(h1) +
      hex(h2) +
      hex(h3) +
      hex(h4) +
      hex(h1 ^ h3) +
      hex(h2 ^ h4) +
      hex(h1 + h2) +
      hex(h3 + h4)
    ).slice(0, 48);
  }

  function updatePipelineStage(maxStage, tampered) {
    pipelineNodes.forEach((node) => {
      const st = Number(node.dataset.stage);
      node.classList.remove('active', 'done', 'tampered');
      if (tampered && st >= 3) {
        node.classList.add('tampered');
      } else if (st < maxStage) {
        node.classList.add('done');
      } else if (st === maxStage) {
        node.classList.add('active');
      }
    });
  }

  function syncPreviewFromInputs() {
    const tpl = DOC_TEMPLATES[simDocType.value] || DOC_TEMPLATES.serencam;
    outDocType.textContent = tpl.title;
    outDocNum.textContent = tpl.num;
    outRecipient.textContent = simRecipient.value;
    outSubject.textContent = simSubject.value;
    outBody.textContent = simBody.value;
    outSigner.textContent = simSigner.value;

    const currentSnapshot = [
      simDocType.value,
      simRecipient.value,
      simSubject.value,
      simBody.value,
      simSigner.value
    ].join('|');

    if (signedHash && currentSnapshot !== signedContentSnapshot) {
      const newHash = computeHashHex(currentSnapshot);
      sheetStatusBadge.textContent = '⚠️ İMZA POZULUB (MÜDAXİLƏ AŞKARLANDI!)';
      sheetStatusBadge.className = 'sheet-status-badge tampered';
      digitalSeal.className = 'digital-seal invalid';
      sealTitle.textContent = '❌ RƏQƏMSAL İMZA ETİBARSIZDIR!';
      sealHash.textContent = 'Yeni Heş: ' + newHash.slice(0, 24) + '... (Orijinal ilə uyğun gəlmir!)';
      sealTime.textContent = 'İmzalanmış sənədin mətninə sonradan müdaxilə edilmişdir.';
      updatePipelineStage(3, true);
    }
  }

  simDocType.addEventListener('change', () => {
    const tpl = DOC_TEMPLATES[simDocType.value];
    if (tpl) {
      simRecipient.value = tpl.recipient;
      simSubject.value = tpl.subject;
      simBody.value = tpl.body;
    }
    signedHash = null;
    outVisaStatus.textContent = 'Gözləyir...';
    outResolution.hidden = true;
    sheetStatusBadge.textContent = 'LAYİHƏ (QARALAMA)';
    sheetStatusBadge.className = 'sheet-status-badge';
    digitalSeal.className = 'digital-seal';
    sealTitle.textContent = '⏳ RƏQƏMSAL İMZA GÖZLƏNİLİR';
    sealHash.textContent = 'SHA-256: Hesablanmayıb';
    sealTime.textContent = 'Sənədi imzalamaq üçün soldakı düyməni sıxın';
    btnTamperTest.disabled = true;
    updatePipelineStage(1, false);
    syncPreviewFromInputs();
  });

  [simRecipient, simSubject, simBody, simSigner].forEach((el) => {
    el.addEventListener('input', syncPreviewFromInputs);
  });

  btnStepVisa.addEventListener('click', () => {
    outVisaStatus.textContent = '✓ Hüquq və Ümumi şöbə tərəfindən vizalandı';
    sheetStatusBadge.textContent = 'VİZALANMIŞ LAYİHƏ (MƏRHƏLƏ 2)';
    sheetStatusBadge.className = 'sheet-status-badge';
    updatePipelineStage(2, false);
  });

  btnStepSign.addEventListener('click', () => {
    signedContentSnapshot = [
      simDocType.value,
      simRecipient.value,
      simSubject.value,
      simBody.value,
      simSigner.value
    ].join('|');
    signedHash = computeHashHex(signedContentSnapshot);

    const now = new Date();
    const dateStr = now.toLocaleDateString('az-AZ') + ' · ' + now.toTimeString().slice(0, 8);
    outDocDate.textContent = dateStr;
    outVisaStatus.textContent = '✓ Tam razılaşdırılıb (Viza №408)';
    outResolution.hidden = false;

    sheetStatusBadge.textContent = '✓ HÜQUQİ QÜVVƏLİ ELEKTRON SƏNƏD (İCRADADIR)';
    sheetStatusBadge.className = 'sheet-status-badge signed';

    digitalSeal.className = 'digital-seal valid';
    sealTitle.textContent = '🔏 ' + simSignMethod.value.toUpperCase() + ' İLƏ TƏSDİQLƏNDİ';
    sealHash.textContent = 'SHA-256: ' + signedHash.slice(0, 28) + '...';
    sealTime.textContent = 'Zaman möhürü: ' + dateStr + ' · Status: İcraya yönəldildi';

    btnTamperTest.disabled = false;
    updatePipelineStage(5, false);
  });

  btnTamperTest.addEventListener('click', () => {
    if (!signedHash) return;
    simBody.value = simBody.value + ' [Sonradan icazəsiz əlavə edilmiş cümlə]';
    syncPreviewFromInputs();
  });

  // İlkin yükləmə
  initDots();
  populateFullSpeechList();
  goToSlide(0);
  syncPreviewFromInputs();
})();
