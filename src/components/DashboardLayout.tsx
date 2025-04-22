
import { ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
