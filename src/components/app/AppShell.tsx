import React, { useState } from 'react';
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

export const AppShell: React.FC = () => {
  const { currentPath } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Compute active page title & view
  let pageTitle = 'Əsas';
  let activeContent: React.ReactNode = <DashboardView />;

  if (currentPath === '/app/sandbox') {
    pageTitle = 'Python Sandbox';
    activeContent = <PythonSandboxView />;
  } else if (currentPath.startsWith('/app/courses/')) {
    const slug = currentPath.replace('/app/courses/', '');
    const titles: Record<string, string> = {
      'math-analysis': 'Riyazi analiz',
      physics: 'Fizika',
      programming: 'Proqramlaşdırma',
      english: 'İngilis dili',
    };
    pageTitle = titles[slug] || 'Fənn';
    activeContent = <CourseShellView courseSlug={slug} />;
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
      />

      {/* 2. Main Work Area */}
      <div className="workspace-viewport">
        {/* Compact TopBar */}
        <TopBar
          title={pageTitle}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Scrollable View Content */}
        <main className="workspace-content-body">
          {activeContent}
        </main>
      </div>
    </div>
  );
};
