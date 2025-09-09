import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Building2,
  Users,
  List,
  Search,
  LogOut,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const crmNavItems = [
  { title: 'Organisations', url: '/crm/teams', icon: Building2 },
  { title: 'People', url: '/crm/people', icon: Users },
  { title: 'Lists', url: '/crm/lists', icon: List },
  { title: 'Search', url: '/crm/search', icon: Search },
];

const bottomNavItems = [
  { title: 'Profile', url: '/crm/profile', icon: User },
  { title: 'Settings', url: '/crm/settings', icon: Settings },
];

export function CrmSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = crmNavItems.some((item) => isActive(item.url));

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className={cn("border-r", !open ? "w-16" : "w-64")}>
      <div className="flex items-center gap-2 p-4 border-b">
        <img 
          src="/lovable-uploads/49b40e55-1e07-40a4-929b-470e2e85125d.png" 
          alt="SportBnk Logo" 
          className={cn("transition-all", !open ? "h-8 w-8" : "h-10")}
        />
        {open && (
          <div className="flex flex-col">
            <span className="font-semibold text-lg">SportBnk</span>
            <span className="text-xs text-muted-foreground">CRM Dashboard</span>
          </div>
        )}
      </div>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>Database</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crmNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="border-t p-4 space-y-2">
        {/* Profile and Settings */}
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground",
              !open && "justify-center"
            )}
          >
            <item.icon className="h-4 w-4" />
            {open && <span className="text-sm">{item.title}</span>}
          </NavLink>
        ))}
        
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start gap-3",
            !open && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4" />
          {open && <span>Sign Out</span>}
        </Button>
      </div>
    </Sidebar>
  );
}