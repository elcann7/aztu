import React, { useEffect, useState } from 'react';
import './AppShell.css';
import { useRouter } from '../../context/RouterContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DashboardView } from './DashboardView';
import { CourseShellView } from './CourseShellView';
import { MaterialsView } from './views/MaterialsView';
import { DeadlinesView } from './views/DeadlinesView';
import { PythonSandboxView } from './views/PythonSandboxView';
import { CalculatorView } from './views/CalculatorView';
import { ProfileModal } from './modals/ProfileModal';
import { Modal } from '../common/Modal';
import { GlobalSearch } from './GlobalSearch';
import { CreateMaterialModal } from './modals/CreateMaterialModal';
import { CreateDeadlineModal } from './modals/CreateDeadlineModal';

export const AppShell: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickShareOpen, setIsQuickShareOpen] = useState(false);
  const [shareType, setShareType] = useState<'material' | 'deadline' | null>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  // Compute active page title & view
  let pageTitle = 'Əsas Lövhə';
  let activeContent: React.ReactNode = <DashboardView />;

  if (currentPath === '/app/calculator') {
    pageTitle = 'Qaib və Bal Kalkulyatoru';
    activeContent = <CalculatorView />;
  } else if (currentPath === '/app/sandbox') {
    pageTitle = 'Python Sandbox';
    activeContent = <PythonSandboxView />;
  } else if (currentPath.startsWith('/app/courses/')) {
    const slug = currentPath.replace('/app/courses/', '');
    const titles: Record<string, string> = {
      'math-analysis': 'Riyazi analiz-1',
      'linear-algebra': 'Xətti cəbr',
      physics: 'Fizika',
      programming: 'Proqramlaşdırma-1',
      english: 'XDİAK (İngilis dili)',
      azerbaijani: 'ADİAK (Azərbaycan dili)',
    };
    pageTitle = titles[slug] || 'Fənn';
    activeContent = <CourseShellView key={slug} courseSlug={slug} />;
  } else if (currentPath === '/app/materials') {
    pageTitle = 'Materiallar və PDF Baza';
    activeContent = <MaterialsView />;
  } else if (currentPath === '/app/deadlines') {
    pageTitle = 'Kollokvium & Deadline-lar';
    activeContent = <DeadlinesView />;
  }

  return (
    <div className="workspace-app-layout">
      {/* 1. Left Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 2. Main Work Area */}
      <div className="workspace-viewport">
        {/* Compact TopBar */}
        <TopBar
          title={pageTitle}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenQuickShare={() => setIsQuickShareOpen(true)}
        />

        {/* Scrollable View Content */}
        <main className="workspace-content-body">
          {activeContent}
        </main>
      </div>

      {/* 3. Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Modal isOpen={isQuickShareOpen} onClose={() => setIsQuickShareOpen(false)} title="Sürətli Əməliyyatlar">
        <div className="quick-share-options">
          <button
            type="button"
            onClick={() => {
              setIsQuickShareOpen(false);
              navigate('/app/calculator');
            }}
          >
            <strong>Qaib və Bal Hesabla</strong>
            <span>6 fənn üzrə 25% qaib limitini, giriş balını və 30 ECTS GPA-nı yoxla</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsQuickShareOpen(false);
              setShareType('material');
            }}
          >
            <strong>Dərs materialı və ya PDF əlavə et</strong>
            <span>Mühazirə slaydı, laboratoriya faylı və ya faydalı link yüklə</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsQuickShareOpen(false);
              setShareType('deadline');
            }}
          >
            <strong>Kollokvium / Tapşırıq tarixi əlavə et</strong>
            <span>Yaxınlaşan sərbəst iş və ya laboratoriya təhvilini qeyd et</span>
          </button>
        </div>
      </Modal>
      <CreateMaterialModal isOpen={shareType === 'material'} onClose={() => setShareType(null)} />
      <CreateDeadlineModal isOpen={shareType === 'deadline'} onClose={() => setShareType(null)} />
    </div>
  );
};
