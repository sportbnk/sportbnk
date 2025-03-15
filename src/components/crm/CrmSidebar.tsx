
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { 
  Users, 
  List, 
  Mail, 
  Calendar, 
  CheckSquare, 
  PhoneCall, 
  CreditCard, 
  Plus, 
  SearchIcon 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import AccountBadge from "./AccountBadge";
import { Button } from "@/components/ui/button";

const CrmSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { title: "Teams & Contacts", icon: Users, path: "/database" },
    { title: "Lists", icon: List, path: "/database/lists" },
    { title: "Emails", icon: Mail, path: "/database/emails" },
    { title: "Meetings", icon: Calendar, path: "/database/meetings" },
    { title: "Tasks", icon: CheckSquare, path: "/database/tasks" },
    { title: "Calls", icon: PhoneCall, path: "/database/calls" },
  ];

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-sportbnk-green">SportBnk CRM</h2>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-8 h-9 bg-background focus-visible:ring-sportbnk-green" 
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90">
              <Plus className="h-4 w-4 mr-1" />
              Add New Contact
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
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
