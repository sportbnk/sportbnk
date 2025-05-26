
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
    <Sidebar>
      <SidebarHeader className="p-3">
        {/* Empty header or minimal branding if needed */}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={location.pathname.includes("/database") || location.pathname.includes("/crm/database")}
                  tooltip="Discover"
                >
                  <span>Discover</span>
                </SidebarMenuButton>
                <SidebarMenu className="ml-4 mt-2">
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === "/crm/teams"}
                    >
                      <Link to="/crm/teams">
                        <Users className="h-4 w-4 mr-2" />
                        Organisations
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === "/crm/people"}
                    >
                      <Link to="/crm/people">
                        <User className="h-4 w-4 mr-2" />
                        People
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === "/database/lists"}
                    >
                      <Link to="/database/lists">
                        <List className="h-4 w-4 mr-2" />
                        Lists
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleProfileClick}>
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSettingsClick}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CrmSidebar;
