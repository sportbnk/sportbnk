
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CrmSidebar from "./CrmSidebar";
import { Toaster } from "@/components/ui/sonner";

const CrmLayout = () => {
  const navigate = useNavigate();
  
  // Remove the authentication check temporarily for debugging
  // This will let us test the layout without getting redirected
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <CrmSidebar />
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default CrmLayout;
