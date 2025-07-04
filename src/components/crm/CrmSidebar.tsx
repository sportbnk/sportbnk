
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  List, 
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";

const CrmSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  // Handle logout with proper Supabase signout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  // Handle settings navigation
  const handleSettingsClick = () => {
    navigate("/settings");
  };
  
  return (
    <Sidebar collapsible="none" className="border-r border-slate-200 h-screen flex-shrink-0 bg-white shadow-sm">
      <SidebarHeader className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/49b40e55-1e07-40a4-929b-470e2e85125d.png" 
            alt="SportBnk Logo" 
            className="h-12 w-auto"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 flex flex-col justify-between h-full bg-white">
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/crm/teams"}
                  className={`w-full justify-start h-12 px-4 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === "/crm/teams" 
                      ? "bg-sportbnk-green text-white shadow-md hover:bg-sportbnk-green/90" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-sportbnk-green border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Link to="/crm/teams">
                    <Users className="h-5 w-5 mr-3" />
                    Organisations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/crm/people"}
                  className={`w-full justify-start h-12 px-4 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === "/crm/people" 
                      ? "bg-sportbnk-green text-white shadow-md hover:bg-sportbnk-green/90" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-sportbnk-green border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Link to="/crm/people">
                    <User className="h-5 w-5 mr-3" />
                    People
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/database/lists"}
                  className={`w-full justify-start h-12 px-4 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === "/database/lists" 
                      ? "bg-sportbnk-green text-white shadow-md hover:bg-sportbnk-green/90" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-sportbnk-green border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Link to="/database/lists">
                    <List className="h-5 w-5 mr-3" />
                    Lists
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarFooter className="p-4 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleProfileClick}
                    className="w-full justify-start h-11 px-4 rounded-lg transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-sportbnk-green font-medium"
                  >
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleSettingsClick}
                    className="w-full justify-start h-11 px-4 rounded-lg transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-sportbnk-green font-medium"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="w-full justify-start h-11 px-4 rounded-lg transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium border border-transparent hover:border-red-200"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default CrmSidebar;
