import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DatabaseProvider } from './context/DatabaseContext';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AppShell } from './components/app/AppShell';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkspacePreview } from './components/WorkspacePreview';
import { FeatureDeepDives } from './components/FeatureDeepDives';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

// Landing Page (100% UNTOUCHED in design, layout, content, animations)
const LandingPage: React.FC = () => {
  useScrollReveal();

  return (
    <div className="app-layout">
      {/* 1. Header with 6326A2 logo, simplified nav links and auth */}
      <Header />

      {/* 2. Main Content Flow */}
      <main className="main-content">
        {/* Spacious, calm Hero */}
        <Hero />

        {/* Focused, simplified product preview */}
        <WorkspacePreview />

        {/* Distinct, single-idea feature sections */}
        <FeatureDeepDives />
      </main>

      {/* 3. Minimal Footer */}
      <Footer />
    </div>
  );
};

// Route Controller
const AppContent: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Protected route guard: /app requires authentication
      if (currentPath.startsWith('/app') && !isAuthenticated) {
        navigate('/login', { replace: true });
      }
      // If already logged in and visits auth pages, redirect to workspace
      if ((currentPath === '/login' || currentPath === '/register') && isAuthenticated) {
        navigate('/app', { replace: true });
      }
    }
  }, [currentPath, isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fcfcfd',
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            border: '2px solid #e2e5e9',
            borderTopColor: '#111418',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      </div>
    );
  }

  // 1. Login Page
  if (currentPath === '/login') {
    return <LoginPage />;
  }

  // 2. Register Page
  if (currentPath === '/register') {
    return <RegisterPage />;
  }

  // 3. Protected Workspace App Shell (/app and all subroutes)
  if (currentPath.startsWith('/app')) {
    if (!isAuthenticated) {
      return null;
    }
    return <AppShell />;
  }

  // 4. Landing Page (Default '/')
  return <LandingPage />;
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <AuthProvider>
        <DatabaseProvider>
          <AppContent />
        </DatabaseProvider>
      </AuthProvider>
    </RouterProvider>
  );
};

export default App;
