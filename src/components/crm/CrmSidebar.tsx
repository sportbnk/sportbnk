
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Building2,
  Users,
  List,
  UserRound,
  Calendar,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Handshake,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const CrmSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { open, setOpen } = useSidebar();
  
  // Handle logout with proper Supabase signout
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      // Use window.location.href for a complete page refresh to ensure clean state
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
      // Even if signOut fails, redirect to home page
      window.location.href = "/";
    }
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    navigate("/crm/profile");
  };
  
  // Handle settings navigation
  const handleSettingsClick = () => {
    navigate("/crm/settings");
  };

  // Check if path is active
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">"
      <SidebarHeader className="p-3 border-b border-border/50 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-1">
            {open ? (
              <img 
                src="/lovable-uploads/49be807e-9d72-4739-9501-f3a01f68b03a.png" 
                alt="Sportbnk Logo" 
                className="h-8 w-auto transition-opacity duration-200"
              />
            ) : (
              <img 
                src="/lovable-uploads/49be807e-9d72-4739-9501-f3a01f68b03a.png" 
                alt="Sportbnk Logo" 
                className="h-6 w-6 transition-opacity duration-200"
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="h-6 w-6 p-0 hover:bg-gray-100 transition-all duration-200 absolute right-2"
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 bg-background">
        {/* DATABASE Section */}
        <SidebarGroup className="px-2 py-2">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-3 transition-opacity duration-200">
              DATABASE
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/teams")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/teams") 
                      ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  } ${!open ? "justify-center" : ""}`}
                  tooltip={!open ? "Organisations" : undefined}
                >
                  <Link to="/crm/teams" className="flex items-center">
                    <Building2 className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                    {open && <span className="transition-opacity duration-200">Organisations</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/people")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/people") 
                      ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  } ${!open ? "justify-center" : ""}`}
                  tooltip={!open ? "People" : undefined}
                >
                  <Link to="/crm/people" className="flex items-center">
                    <Users className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                    {open && <span className="transition-opacity duration-200">People</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/database/lists")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/database/lists") 
                      ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  } ${!open ? "justify-center" : ""}`}
                  tooltip={!open ? "Lists" : undefined}
                >
                  <Link to="/database/lists" className="flex items-center">
                    <List className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                    {open && <span className="transition-opacity duration-200">Lists</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-3" />

        {/* CRM INTEGRATIONS Section */}
        <SidebarGroup className="px-2 py-2">
          {open && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-3 transition-opacity duration-200">
              CRM INTEGRATIONS
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/integrations")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/integrations") 
                      ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  } ${!open ? "justify-center" : ""}`}
                  tooltip={!open ? "CRM & Sales Tools" : undefined}
                >
                  <Link to="/crm/integrations" className="flex items-center">
                    <UserRound className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                    {open && <span className="transition-opacity duration-200">CRM & Sales Tools</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarSeparator className="mx-3" />
          
          {/* Theme Toggle - positioned above profile */}
          <div className="p-2 border-b border-border/50">
            <ThemeToggle />
          </div>
          
          <SidebarFooter className="p-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleProfileClick}
                      className={`w-full h-9 px-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center ${
                        !open ? "justify-center" : "justify-start"
                      }`}
                      tooltip={!open ? "My Profile" : undefined}
                    >
                      <User className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                      {open && <span className="transition-opacity duration-200">My Profile</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleSettingsClick}
                      className={`w-full h-9 px-2 rounded-lg transition-all duration-200 text-foreground hover:bg-muted hover:text-foreground flex items-center ${
                        !open ? "justify-center" : "justify-start"
                      }`}
                      tooltip={!open ? "Settings" : undefined}
                    >
                      <Settings className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                      {open && <span className="transition-opacity duration-200">Settings</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleLogout}
                      className={`w-full h-9 px-2 rounded-lg transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center ${
                        !open ? "justify-center" : "justify-start"
                      }`}
                      tooltip={!open ? "Log Out" : undefined}
                    >
                      <LogOut className={`h-4 w-4 ${open ? "mr-3" : ""} transition-all duration-200`} />
                      {open && <span className="transition-opacity duration-200">Log Out</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default CrmSidebar;
