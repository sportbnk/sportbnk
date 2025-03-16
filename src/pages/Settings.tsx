
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Helmet } from "react-helmet-async";
import SettingsTabs from "@/components/settings/SettingsTabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import ApiSettings from "@/components/settings/ApiSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import { Card, CardContent } from "@/components/ui/card";

type SettingsTabType = "general" | "notifications" | "security" | "api" | "integrations";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabType>("general");

  return (
    <PageLayout>
      <Helmet>
        <title>Settings | SportsBnk</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12 pt-32 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-6">
              {activeTab === "general" && <GeneralSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "api" && <ApiSettings />}
              {activeTab === "integrations" && <IntegrationSettings />}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Settings;
