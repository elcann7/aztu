import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }
      setCurrentPath(to);
      window.scrollTo(0, 0);
    }
  }, []);

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle special clicks (cmd/ctrl click, etc.)
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      if (onClick) onClick(e);
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
