
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

const CrmSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to home page
    navigate("/");
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
    <Sidebar collapsible="none" className="border-r min-h-screen h-screen">
      <SidebarHeader className="p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/fe95d116-e43a-4e1e-9439-b2fee1207d72.png" 
            alt="SportBnk Logo" 
            className="h-8 w-auto"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1 flex flex-col justify-between min-h-0">
        <SidebarGroup className="p-2 flex-shrink-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === "/crm/teams"}
                  className="w-full justify-start h-12"
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
                  className="w-full justify-start h-12"
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
                  className="w-full justify-start h-12"
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
        
        <SidebarFooter className="p-2 border-t flex-shrink-0 mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleProfileClick}
                    className="w-full justify-start h-12"
                  >
                    <User className="h-5 w-5 mr-3" />
                    My Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleSettingsClick}
                    className="w-full justify-start h-12"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
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
