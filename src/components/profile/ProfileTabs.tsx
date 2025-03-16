
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, CreditCard, Package } from "lucide-react";

type TabType = "personal" | "company" | "billing" | "subscription";

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TabType)} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        <TabsTrigger value="personal" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Personal Info</span>
          <span className="sm:hidden">Personal</span>
        </TabsTrigger>
        <TabsTrigger value="company" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Company Info</span>
          <span className="sm:hidden">Company</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Billing Info</span>
          <span className="sm:hidden">Billing</span>
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Subscription</span>
          <span className="sm:hidden">Plan</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
