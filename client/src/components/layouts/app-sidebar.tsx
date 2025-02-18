import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from '../ui/sidebar';
import OnlineUsersList from './online-user-list';
import { useAuth } from '../../store/auth';
import { Link, useNavigate } from 'react-router-dom';
import useSocket from '../../hooks/use-socket';
import { useChat } from '../../store/chat';

export function AppSidebar() {
  const { socket } = useSocket();
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const { setReceiver } = useChat();

  const handleLogout = () => {
    onLogout();
    navigate('/login', {
      replace: true,
    });
    socket.disconnect();
    setReceiver(undefined);
    console.log('🚀 ~ handleLogout ~ socket:', socket);
  };

  return (
    <Sidebar className="">
      <SidebarHeader>
        <Link
          onClick={() => {
            setOpenMobile(false);
            setReceiver(undefined);
          }}
          to="/"
          className="py-2 xl:py-4"
        >
          <h1 className="text-lg xl:text-2xl font-bold text-center">NX Chat</h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex-1 py-2">
        <SidebarGroup className="h-full">
          <OnlineUsersList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          className="!text-destructive hover:bg-destructive/20"
          variant="ghost"
        >
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
