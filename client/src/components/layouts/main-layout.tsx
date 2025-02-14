import { ReactNode } from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>{children}</div>
    </SidebarProvider>
  );
}

export default MainLayout;
