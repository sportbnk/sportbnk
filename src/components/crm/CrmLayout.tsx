
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CrmSidebar from "./CrmSidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";

const CrmLayout = () => {
  const navigate = useNavigate();
  
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full bg-background overflow-hidden">
          <CrmSidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </div>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default CrmLayout;
