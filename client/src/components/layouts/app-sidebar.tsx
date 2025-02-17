import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from '../ui/sidebar';
import OnlineUsersList from './online-user-list';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import useSocket from '../../hooks/use-socket';

export function AppSidebar() {
  const { socket } = useSocket();
  const { onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login', {
      replace: true,
    });
    socket.disconnect();
    console.log('🚀 ~ handleLogout ~ socket:', socket);
  };

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <h1 className="text-2xl font-bold text-center">NX Chat</h1>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="py-4">
        <SidebarGroup>
          <OnlineUsersList />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Button onClick={handleLogout} className="" variant="destructive">
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
