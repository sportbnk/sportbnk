import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import BillingInfo from "@/components/profile/BillingInfo";
import SubscriptionPlan from "@/components/profile/SubscriptionPlan";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type TabType = "personal" | "billing" | "subscription";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  job_title?: string;
  avatarUrl?: string;
  billing?: {
    plan: string;
    price: string;
    nextBillingDate: string;
    paymentMethod: string;
    invoices: Array<{
      id: string;
      date: string;
      amount: string;
      status: string;
    }>;
  };
  subscription?: {
    plan: string;
    status: string;
    startDate: string;
    nextRenewalDate: string;
    features: string[];
    creditUsage: number;
    creditTotal: number;
  };
}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        // Create user data object from auth user metadata
        const fullUserData: UserData = {
          name: user.user_metadata?.name || user.email?.split('@')[0] || "User",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
          job_title: user.user_metadata?.job_title || "",
          role: "User",
          avatarUrl: user.user_metadata?.avatar_url || "",
          billing: {
            plan: "Free Trial",
            price: "$0/month",
            nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            paymentMethod: "None",
            invoices: []
          },
          subscription: {
            plan: "Free Trial",
            status: "Active",
            startDate: new Date(user.created_at || Date.now()).toLocaleDateString(),
            nextRenewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            features: ["5 searches per day", "Limited data enrichment", "Basic filters", "Export up to 50 contacts"],
            creditUsage: 0,
            creditTotal: 50
          }
        };
        
        setUserData(fullUserData);
      } catch (e) {
        console.error("Failed to fetch user data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleProfileUpdate = async (data: any) => {
    if (!userData || !user) return;
    
    try {
      // For now, just update local state since profiles table may not exist
      const updatedUserData = { ...userData, ...data };
      setUserData(updatedUserData);
      
      toast.success("Profile updated", {
        description: "Your profile information has been updated successfully."
      });
    } catch (e) {
      console.error("Failed to update profile", e);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8 pt-32 max-w-5xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sportbnk-green"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!userData || !user) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8 pt-32 max-w-5xl">
          <div className="flex justify-center items-center h-64">
            <p>Unable to load profile. Please sign in.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>User Profile | SportsBnk</title>
      </Helmet>
      <div className="container mx-auto py-8 pt-32 max-w-5xl">
        <ProfileHeader 
          name={userData.name} 
          email={userData.email} 
          role={userData.role || ""} 
        />
        
        <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="mt-6 bg-white p-6 rounded-lg border">
          {activeTab === "personal" && (
            <PersonalInfo userData={userData} onUpdate={handleProfileUpdate} />
          )}
          
          {activeTab === "billing" && (
            <BillingInfo billingData={userData.billing || {
              plan: "Free Trial",
              price: "$0/month",
              nextBillingDate: "",
              paymentMethod: "None",
              invoices: []
            }} />
          )}
          
          {activeTab === "subscription" && (
            <SubscriptionPlan subscriptionData={userData.subscription || {
              plan: "Free Trial",
              status: "Active",
              startDate: "",
              nextRenewalDate: "",
              features: [],
              creditUsage: 0,
              creditTotal: 0
            }} />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
