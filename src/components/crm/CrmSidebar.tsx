
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
} from "@/components/ui/sidebar";
import { 
  Building2,
  Users,
  List,
  UserRound,
  Phone,
  Calendar,
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

  // Check if path is active
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar collapsible="none" className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-50">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/49be807e-9d72-4739-9501-f3a01f68b03a.png" 
            alt="Sportbnk Logo" 
            className="h-10 w-auto"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 bg-white">
        {/* DATABASE Section */}
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">
            DATABASE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/teams")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/teams") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/crm/teams">
                    <Building2 className="h-4 w-4 mr-3" />
                    Organisations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/people")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/people") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/crm/people">
                    <Users className="h-4 w-4 mr-3" />
                    People
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/database/lists")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/database/lists") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/database/lists">
                    <List className="h-4 w-4 mr-3" />
                    Lists
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-4" />

        {/* CRM Section */}
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-3">
            CRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/leads")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/leads") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/crm/leads">
                    <UserRound className="h-4 w-4 mr-3" />
                    Leads
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/calls")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/calls") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/crm/calls">
                    <Phone className="h-4 w-4 mr-3" />
                    Calls
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive("/crm/meetings")}
                  className={`w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 ${
                    isActive("/crm/meetings") 
                      ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link to="/crm/meetings">
                    <Calendar className="h-4 w-4 mr-3" />
                    Meetings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarSeparator className="mx-4" />
          <SidebarFooter className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleProfileClick}
                      className="w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <User className="h-4 w-4 mr-3" />
                      My Profile
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleSettingsClick}
                      className="w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleLogout}
                      className="w-full justify-start h-9 px-3 rounded-lg transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Log Out
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
