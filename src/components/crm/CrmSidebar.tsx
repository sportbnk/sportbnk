
import React, { useState } from "react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { 
  UserPlus, 
  List, 
  MessageSquare, 
  DollarSign,
  Mail,
  PhoneCall,
  Calendar,
  CheckSquare,
  SearchIcon,
  CreditCard,
  Users,
  User,
  ArrowUpCircle,
  LogOut
} from "lucide-react";
import { Input } from "@/components/ui/input";
import AccountBadge from "./AccountBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CrmSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handler for search submissions
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Log the search term
      console.log('Searching for:', searchTerm);
      
      // Determine search context based on current page
      let searchContext = '';
      if (location.pathname.includes('/teams')) {
        searchContext = 'teams';
      } else if (location.pathname.includes('/people')) {
        searchContext = 'people';
      } else {
        searchContext = 'all';
      }
      
      // Show a toast with the search term
      toast.info(`Searching for "${searchTerm}" in ${searchContext}`);
      
      // Navigate to search results page with search term and context
      navigate(`/crm/search?q=${encodeURIComponent(searchTerm.trim())}&context=${searchContext}`);
      
      // Clear the search term after submission
      setSearchTerm('');
    }
  };
  
  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-sportbnk-green">Welcome Back!</h2>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search teams or people..." 
            className="pl-8 h-9 bg-background focus-visible:ring-sportbnk-green" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Changed Prospects to Discover */}
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
                        Teams
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
              
              {/* Engage menu with submenu items */}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Engage</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/database/emails"}
                    >
                      <Link to="/database/emails">
                        <Mail className="h-4 w-4 mr-2" />
                        Emails
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/database/calls"}
                    >
                      <Link to="/database/calls">
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Calls
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              
              {/* Deals menu with submenu items */}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Deals</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/database/meetings"}
                    >
                      <Link to="/database/meetings">
                        <Calendar className="h-4 w-4 mr-2" />
                        Meetings
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === "/database/tasks"}
                    >
                      <Link to="/database/tasks">
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Tasks
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
