import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Building2,
  Users,
  List,
  User,
  Settings,
  LogOut,
  Bot,
  FileText,
  Zap,
  Target,
  Crown,
  Sparkles
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
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: 'Signals', url: '/crm/signals', icon: Zap },
  { title: 'My ICPs', url: '/crm/icps', icon: Target },
  { title: 'Contacts', url: '/crm/contacts', icon: Users },
  { title: 'Enrich', url: '/crm/enrich', icon: Sparkles },
  { title: 'Lists', url: '/crm/lists', icon: List },
];

const bottomNavItems = [
  { title: 'My Profile', url: '/crm/profile', icon: User },
  { title: 'Settings', url: '/crm/settings', icon: Settings },
];

export function CrmSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar 
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-300",
        open ? "w-64" : "w-18"
      )}
      collapsible="icon"
    >
      {/* Logo Section */}
      <div className={cn(
        "flex items-center gap-3 border-b border-sidebar-border",
        open ? "p-6" : "p-4 justify-center"
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/sportbnk-logo.jpeg" 
            alt="SportBnk Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        {open && (
          <div className="flex flex-col">
            <span className="font-bold text-lg text-sidebar-foreground">Sportbnk</span>
            <span className="text-xs text-sidebar-foreground/70">Sports Intelligence</span>
          </div>
        )}
      </div>

      <SidebarContent className="flex-1 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-6 mb-2">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn(open ? "px-3" : "px-1")}>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => cn(
                        "flex items-center rounded-lg transition-all duration-200 font-medium w-full",
                        open ? "gap-3 px-3 py-3" : "justify-center px-3 py-3",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Section */}
      <div className={cn(
        "border-t border-sidebar-border space-y-1",
        open ? "p-3" : "p-1"
      )}>
        {/* Upgrade Button */}
        <Button
          variant="default"
          size="sm"
          className={cn(
            "w-full font-medium bg-green-600 text-white hover:bg-green-700 mb-2",
            open ? "justify-start gap-3" : "justify-center px-3 py-3"
          )}
        >
          <Crown className="h-5 w-5" />
          {open && <span>Upgrade</span>}
        </Button>
        
        {/* Profile and Settings */}
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) => cn(
              "flex items-center rounded-lg transition-all duration-200 font-medium w-full",
              open ? "gap-3 px-3 py-3" : "justify-center px-3 py-3",
              isActive 
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {open && <span className="text-sm">{item.title}</span>}
          </NavLink>
        ))}
        
        {/* Sign Out */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            "w-full font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            open ? "justify-start gap-3" : "justify-center px-3 py-3"
          )}
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Log Out</span>}
        </Button>
      </div>
    </Sidebar>
  );
}