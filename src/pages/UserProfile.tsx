
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import CompanyInfo from "@/components/profile/CompanyInfo";
import BillingInfo from "@/components/profile/BillingInfo";
import SubscriptionPlan from "@/components/profile/SubscriptionPlan";
import { toast } from "@/hooks/use-toast";

type TabType = "personal" | "company" | "billing" | "subscription";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // Mock user data - in a real app, this would come from an API or context
  const userData = {
    name: "Jared Wilson",
    email: "jared.wilson@example.com",
    phone: "+1 (555) 123-4567",
    role: "Sales Manager",
    avatarUrl: "",
    company: {
      name: "TechSales Corp",
      position: "Head of Sales",
      website: "www.techsalescorp.com",
      size: "50-100",
      industry: "Software",
      address: "123 Business Ave, San Francisco, CA 94107"
    },
    billing: {
      plan: "Premium",
      price: "$99/month",
      nextBillingDate: "April 15, 2025",
      paymentMethod: "Visa ending in 4242",
      invoices: [
        { id: "INV-2025-001", date: "Mar 15, 2025", amount: "$99.00", status: "Paid" },
        { id: "INV-2025-002", date: "Feb 15, 2025", amount: "$99.00", status: "Paid" },
        { id: "INV-2025-003", date: "Jan 15, 2025", amount: "$99.00", status: "Paid" }
      ]
    },
    subscription: {
      plan: "Premium",
      status: "Active",
      startDate: "Jan 15, 2025",
      nextRenewalDate: "Apr 15, 2025",
      features: ["1,000 Credits", "10,000 Contacts", "Unlimited Teams", "Email Integration", "Priority Support"],
      creditUsage: 456,
      creditTotal: 1000
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleProfileUpdate = (data: any) => {
    console.log("Profile updated:", data);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  return (
    <PageLayout>
      <Helmet>
        <title>User Profile | SportBNK</title>
      </Helmet>
      <div className="container mx-auto py-8 max-w-5xl">
        <ProfileHeader name={userData.name} email={userData.email} role={userData.role} />
        
        <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="mt-6 bg-white p-6 rounded-lg border">
          {activeTab === "personal" && (
            <PersonalInfo userData={userData} onUpdate={handleProfileUpdate} />
          )}
          
          {activeTab === "company" && (
            <CompanyInfo companyData={userData.company} onUpdate={handleProfileUpdate} />
          )}
          
          {activeTab === "billing" && (
            <BillingInfo billingData={userData.billing} />
          )}
          
          {activeTab === "subscription" && (
            <SubscriptionPlan subscriptionData={userData.subscription} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
