import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CrmSidebar } from '@/components/CrmSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Menu, User, LogOut, Settings, HelpCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CrmLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const CrmLayout: React.FC<CrmLayoutProps> = ({ children, pageTitle }) => {
  const fullTitle = pageTitle ? `${pageTitle} | Sportbnk` : 'Sportbnk';
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content="Sportbnk - Sports Data Intelligence Platform" />
          </Helmet>
          
          <CrmSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Top Bar with Sidebar Toggle and Theme Toggle */}
            <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="flex items-center justify-between px-4 h-full">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors border border-border shadow-sm" />
                  {pageTitle && (
                    <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-blue-600 text-white font-semibold">
                            J
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem onClick={() => navigate('/crm/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/crm/integrations')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Integrations
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/crm/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* Ask Sportbnk AI Button */}
                  <Sheet open={aiChatOpen} onOpenChange={setAiChatOpen}>
                    <SheetTrigger asChild>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm h-9 text-sm">
                        <Bot className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-accent" />
                          Sportbnk AI Assistant
                        </SheetTitle>
                        <SheetDescription>
                          Ask me anything about your sports data. I can help you find teams, players, create lists, and more.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
                          <p className="mb-2">Try asking me:</p>
                          <ul className="space-y-1">
                            <li>• "Show Premier League clubs in London"</li>
                            <li>• "Find Heads of Recruitment in Championship"</li>
                            <li>• "Export Manchester United to a list"</li>
                          </ul>
                        </div>
                        <div className="mt-4">
                          <Input placeholder="Type your question..." className="w-full" />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-background">
              <div className="container mx-auto p-4 max-w-7xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default CrmLayout;