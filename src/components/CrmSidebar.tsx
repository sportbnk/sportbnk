import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Building2,
  Users,
  List,
  User,
  Settings,
  HelpCircle,
  Bot,
  FileText,
  Zap,
  Target,
  Crown,
  Sparkles,
  CheckSquare,
  Calendar,
  Mail
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

const prospectingNavItems = [
  { title: 'Signals Feed', url: '/crm/signals', icon: Zap },
  { title: 'Discover', url: '/crm/discover', icon: Users },
  { title: 'My ICPs', url: '/crm/icps', icon: Target },
];

const leadsNavItems = [
  { title: 'Enrich', url: '/crm/enrich', icon: Sparkles },
  { title: 'My Contacts', url: '/crm/my-contacts', icon: User },
  { title: 'My Organisations', url: '/crm/my-organisations', icon: Building2 },
];

const pipelineNavItems = [
  { title: 'Tasks', url: '/crm/tasks', icon: CheckSquare },
  { title: 'Meetings', url: '/crm/meetings', icon: Calendar },
  { title: 'Emails', url: '/crm/emails', icon: Mail },
];

const bottomNavItems = [
  { title: 'Help', url: '/crm/help', icon: HelpCircle },
  { title: 'Upgrade', url: '/crm/upgrade', icon: Crown },
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
        {/* Prospecting Section */}
        {open && (
          <div className="px-6 pt-2 pb-[3px]">
            <h3 className="text-sidebar-foreground font-semibold text-sm uppercase tracking-wide">
              Prospecting
            </h3>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn(open ? "px-3" : "px-1")}>
              {prospectingNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => cn(
                        "flex items-center rounded-lg transition-all duration-200 font-medium w-full",
                        open ? "gap-3 px-3 py-2.5" : "justify-center px-3 py-2.5",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Leads Section */}
        {open && (
          <div className="px-6 pt-3 pb-[3px]">
            <h3 className="text-sidebar-foreground font-semibold text-sm uppercase tracking-wide">
              Leads
            </h3>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn(open ? "px-3" : "px-1")}>
              {leadsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => cn(
                        "flex items-center rounded-lg transition-all duration-200 font-medium w-full",
                        open ? "gap-3 px-3 py-2.5" : "justify-center px-3 py-2.5",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Deals Section */}
        {open && (
          <div className="px-6 pt-3 pb-1">
            <h3 className="text-sidebar-foreground font-semibold text-sm uppercase tracking-wide">
              Pipeline
            </h3>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn(open ? "px-3" : "px-1")}>
              {pipelineNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => cn(
                        "flex items-center rounded-lg transition-all duration-200 font-medium w-full",
                        open ? "gap-3 px-3 py-2.5" : "justify-center px-3 py-2.5",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span className="text-sm">{item.title}</span>}
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
        {/* Help and Upgrade */}
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
      </div>
    </Sidebar>
  );
}