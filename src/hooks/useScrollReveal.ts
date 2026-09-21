import { useEffect } from 'react';

/**
 * Context-aware scroll reveal observer.
 * Tailored transitions per section structure rather than a single generic animation.
 * Respects prefers-reduced-motion completely.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.querySelectorAll(
        '.reveal-fade, .reveal-up, .reveal-window, .reveal-card, .reveal-stagger, .reveal-rows, .feature-mockup-card'
      ).forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const elements = document.querySelectorAll(
      '.reveal-fade, .reveal-up, .reveal-window, .reveal-card, .reveal-stagger, .reveal-rows, .feature-mockup-card'
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}

