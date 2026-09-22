import { useCallback, useEffect, useState } from 'react';

export type BookmarkKind = 'note' | 'material' | 'question';

const keyFor = (userId: string) => `aztu_6326a2_bookmarks_${userId}`;

export const useBookmarks = (userId?: string) => {
  const [saved, setSaved] = useState<string[]>(() => {
    if (!userId) return [];
    try { return JSON.parse(localStorage.getItem(keyFor(userId)) || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (!userId) return;
    const reload = () => {
      try { setSaved(JSON.parse(localStorage.getItem(keyFor(userId)) || '[]')); }
      catch { setSaved([]); }
    };
    window.addEventListener('storage', reload);
    return () => window.removeEventListener('storage', reload);
  }, [userId]);

  const isSaved = useCallback((kind: BookmarkKind, id: string) => saved.includes(`${kind}:${id}`), [saved]);
  const toggle = useCallback((kind: BookmarkKind, id: string) => {
    if (!userId) return;
    const value = `${kind}:${id}`;
    setSaved((previous) => {
      const next = previous.includes(value) ? previous.filter((item) => item !== value) : [...previous, value];
      localStorage.setItem(keyFor(userId), JSON.stringify(next));
      return next;
    });
  }, [userId]);

  return { isSaved, toggle };
};
