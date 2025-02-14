import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from '../ui/sidebar';
import OnlineUsersList from './online-user-list';

export function AppSidebar() {
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
      <SidebarFooter />
    </Sidebar>
  );
}
