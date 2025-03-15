
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CrmSidebar from "./CrmSidebar";
import { Toaster } from "@/components/ui/sonner";

const CrmLayout = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to home page if not authenticated
      navigate("/");
    }
  }, [navigate]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <CrmSidebar />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default CrmLayout;
