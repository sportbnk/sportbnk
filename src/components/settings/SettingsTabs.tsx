
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Bell, 
  Shield, 
  Code, 
  Link2 
} from "lucide-react";

type SettingsTabType = "general" | "notifications" | "security" | "api" | "integrations";

interface SettingsTabsProps {
  activeTab: SettingsTabType;
  onTabChange: (tab: SettingsTabType) => void;
}

const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as SettingsTabType)} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
        <TabsTrigger value="general" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">General</span>
          <span className="sm:hidden">General</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
          <span className="sm:hidden">Alerts</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Security</span>
          <span className="sm:hidden">Security</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline">API Access</span>
          <span className="sm:hidden">API</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex items-center gap-2">
          <Link2 className="h-4 w-4" />
          <span className="hidden sm:inline">Integrations</span>
          <span className="sm:hidden">Connect</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsTabs;
