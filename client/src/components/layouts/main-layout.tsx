import { ReactNode } from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { useChat } from '../../store/chat';
import { useEffect } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
  const { receiver } = useChat();

  useEffect(() => {
    if (receiver) {
      document.title = receiver.username;
    } else {
      document.title = 'NX Chat';
    }

    return () => {
      document.title = 'NX Chat';
    };
  }, [receiver]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 max-h-screen">{children}</div>
    </SidebarProvider>
  );
}

export default MainLayout;
