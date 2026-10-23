/**
 * AZTU 6326A2 — RİYAZİ ANALİZ-1 DƏRSLİK VƏ İZAHLAR PORTALI
 * İnteraktiv axtarış, ScrollSpy, KaTeX və Rejim İdarəetməsi (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initQuickSearch();
  initScrollSpy();
  initSmoothScroll();
  initKaTeX();
});

// KaTeX Avtomatik Riyazi Tərtibat
function initKaTeX() {
  function render() {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  // Dərhal render etməyə çalış
  render();

  // Əgər script hələ yüklənirsə, load hadisəsini gözlə
  window.addEventListener('load', render);
}

// 1. Rejim Dəyişdirici (Kağız / Qrafit)
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('aztu_math_theme') || 'paper';

  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = 'Kağız Rejimi';
  } else {
    document.body.removeAttribute('data-theme');
    toggleBtn.textContent = 'Qrafit Rejimi';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('aztu_math_theme', 'paper');
      toggleBtn.textContent = 'Qrafit Rejimi';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('aztu_math_theme', 'dark');
      toggleBtn.textContent = 'Kağız Rejimi';
    }
  });
}

// 2. Canlı Sürətli Axtarış
function initQuickSearch() {
  const searchInput = document.getElementById('quickSearch');
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    navItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// 3. ScrollSpy (Oxuduqca solda aktiv bölmənin avtomatik işıqlanması)
function initScrollSpy() {
  const sections = document.querySelectorAll('.doc-section');
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

// 4. Hamar Keçid (Smooth Scrolling)
function initSmoothScroll() {
  document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, null, targetId);
      }
    });
  });
}
