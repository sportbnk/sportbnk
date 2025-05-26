
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { 
  List, 
  CreditCard,
  Users,
  User,
  ArrowUpCircle,
} from "lucide-react";
import AccountBadge from "./AccountBadge";
import { Button } from "@/components/ui/button";

const CrmSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarRail />
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
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/crm/teams"}
                    >
                      <Link to="/crm/teams">
                        <Users className="h-4 w-4 mr-2" />
                        Organisations
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/crm/people"}
                    >
                      <Link to="/crm/people">
                        <User className="h-4 w-4 mr-2" />
                        People
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/database/lists"}
                    >
                      <Link to="/database/lists">
                        <List className="h-4 w-4 mr-2" />
                        Lists
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <Button className="w-full mb-4 bg-sportbnk-navy hover:bg-sportbnk-navy/90 flex items-center justify-center">
              <ArrowUpCircle className="h-4 w-4 mr-2" /> Upgrade
            </Button>
            <div className="mb-2">
              <CreditCard className="h-4 w-4 text-sportbnk-green inline-block mr-1" />
              <span className="text-sm">456 Credits Left</span>
            </div>
            <AccountBadge 
              name="Jared Wilson" 
              email="jared.wilson@example.com" 
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CrmSidebar;
