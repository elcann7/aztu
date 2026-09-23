import React, { useEffect, useState } from 'react';
import './AppShell.css';
import { useRouter } from '../../context/RouterContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DashboardView } from './DashboardView';
import { CourseShellView } from './CourseShellView';
import { MaterialsView } from './views/MaterialsView';
import { NotesView } from './views/NotesView';
import { DeadlinesView } from './views/DeadlinesView';
import { PollsView } from './views/PollsView';
import { QAView } from './views/QAView';
import { PythonSandboxView } from './views/PythonSandboxView';
import { WaterSimulationView } from './views/WaterSimulationView';
import { ProfileModal } from './modals/ProfileModal';
import { Modal } from '../common/Modal';
import { GlobalSearch } from './GlobalSearch';
import { CreateNoteModal } from './modals/CreateNoteModal';
import { CreateMaterialModal } from './modals/CreateMaterialModal';
import { CreateQuestionModal } from './modals/CreateQuestionModal';

export const AppShell: React.FC = () => {
  const { currentPath } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickShareOpen, setIsQuickShareOpen] = useState(false);
  const [shareType, setShareType] = useState<'note' | 'material' | 'question' | null>(null);

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
  let pageTitle = 'Əsas';
  let activeContent: React.ReactNode = <DashboardView />;

  if (currentPath === '/app/sandbox') {
    pageTitle = 'Python Sandbox';
    activeContent = <PythonSandboxView />;
  } else if (currentPath === '/app/water') {
    pageTitle = 'Su Simülasyonu';
    activeContent = <WaterSimulationView />;
  } else if (currentPath.startsWith('/app/courses/')) {
    const slug = currentPath.replace('/app/courses/', '');
    const titles: Record<string, string> = {
      'math-analysis': 'Riyazi analiz',
      physics: 'Fizika',
      programming: 'Proqramlaşdırma',
      english: 'İngilis dili',
    };
    pageTitle = titles[slug] || 'Fənn';
    activeContent = <CourseShellView key={slug} courseSlug={slug} />;
  } else if (currentPath === '/app/notes') {
    pageTitle = 'Qrup qeydləri';
    activeContent = <NotesView />;
  } else if (currentPath === '/app/qa') {
    pageTitle = 'Sual-Cavab';
    activeContent = <QAView />;
  } else if (currentPath === '/app/polls') {
    pageTitle = 'Sorğular';
    activeContent = <PollsView />;
  } else if (currentPath === '/app/materials') {
    pageTitle = 'Materiallar';
    activeContent = <MaterialsView />;
  } else if (currentPath === '/app/deadlines') {
    pageTitle = 'Deadline-lar';
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
      <Modal isOpen={isQuickShareOpen} onClose={() => setIsQuickShareOpen(false)} title="Qrupla paylaş">
        <div className="quick-share-options">
          {[
            ['note', 'Qeyd yaz', 'Dərsdə öyrəndiyinizi paylaşın'],
            ['material', 'Fayl və ya şəkil paylaş', 'Telefondan şəkil, PDF və ya link əlavə edin'],
            ['question', 'Sual ver', 'Qrup yoldaşlarınızdan kömək istəyin'],
          ].map(([type, title, description]) => (
            <button key={type} type="button" onClick={() => { setIsQuickShareOpen(false); setShareType(type as 'note' | 'material' | 'question'); }}>
              <strong>{title}</strong><span>{description}</span>
            </button>
          ))}
        </div>
      </Modal>
      <CreateNoteModal isOpen={shareType === 'note'} onClose={() => setShareType(null)} />
      <CreateMaterialModal isOpen={shareType === 'material'} onClose={() => setShareType(null)} />
      <CreateQuestionModal isOpen={shareType === 'question'} onClose={() => setShareType(null)} />
    </div>
  );
};
