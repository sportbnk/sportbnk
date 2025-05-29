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

interface ProfileData {
  id: string;
  user_id: string;
  job_title: string | null;
  created_at: string;
  updated_at: string;
}

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
        // Get user profile from database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
        }

        // Create user data object using job_title from profiles table
        const fullUserData: UserData = {
          name: user.user_metadata?.name || user.email?.split('@')[0] || "User",
          email: user.email || "",
          phone: user.phone || user.user_metadata?.phone || "",
          job_title: profile?.job_title || "", // Use job_title from profiles table
          role: profile?.job_title || "User", // Use job_title as role too
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
      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          job_title: data.role, // Map the 'role' field from the form to 'job_title' in database
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
        return;
      }

      // Update local state
      const updatedUserData = { 
        ...userData, 
        ...data,
        job_title: data.role, // Ensure job_title is updated in local state
        role: data.role
      };
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
          role={userData.job_title || userData.role || ""} 
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
