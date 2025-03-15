
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CrmSidebar from "./CrmSidebar";
import { Toaster } from "@/components/ui/sonner";
import CreditDisplay from "@/components/database/CreditDisplay";

const CrmLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <CrmSidebar />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <CreditDisplay credits={456} />
          </div>
          <Outlet />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default CrmLayout;
