import { useEffect } from 'react';

export const useSearchFocus = (kind: 'note' | 'material' | 'question', itemIds: string[]) => {
  useEffect(() => {
    let highlightTimer: number | undefined;
    const focus = () => {
      const raw = sessionStorage.getItem('aztu_search_focus');
      if (!raw) return;
      try {
        const target = JSON.parse(raw) as { kind: string; id: string };
        if (target.kind !== kind || !itemIds.includes(target.id)) return;
        const element = document.getElementById(`search-${kind}-${target.id}`);
        if (!element) return;
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('search-focus-target');
        sessionStorage.removeItem('aztu_search_focus');
        window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(() => element.classList.remove('search-focus-target'), 2200);
      } catch {
        sessionStorage.removeItem('aztu_search_focus');
      }
    };
    focus();
    window.addEventListener('aztu-search-focus', focus);
    return () => {
      window.removeEventListener('aztu-search-focus', focus);
      window.clearTimeout(highlightTimer);
    };
  }, [kind, itemIds]);
};
