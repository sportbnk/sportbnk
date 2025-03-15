
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CrmSidebar from "./CrmSidebar";
import { Toaster } from "@/components/ui/sonner";
import CreditDisplay from "@/components/database/CreditDisplay";
import { Button } from "@/components/ui/button";

const CrmLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <CrmSidebar />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <Button className="w-full bg-sportbnk-navy hover:bg-sportbnk-navy/90 mb-3 text-base font-medium">
              Upgrade Account
            </Button>
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
