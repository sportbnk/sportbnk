import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, CreditCard, Crown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useCredits } from "@/contexts/CreditsContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import BillingInfo from "@/components/profile/BillingInfo";
import SubscriptionPlan from "@/components/profile/SubscriptionPlan";

type TabType = "personal" | "billing" | "subscription";

interface ProfileData {
  id: string;
  user_id: string;
  job_title: string | null;
  avatar_url: string | null;
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { credits, tier, refreshCredits } = useCredits();
  const fetchedRef = useRef(false);
  
  useEffect(() => {
    if (!user || fetchedRef.current) {
      if (!user) setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        console.log('CRM Profile: Fetching profile data once for user:', user.id);
        fetchedRef.current = true;
        
        // Fetch latest profile data from database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        console.log('CRM Profile: Profile data from database:', profile);

        if (error) {
          console.error('Error fetching profile:', error);
        }

        // Create user data object using latest data from profiles table
        const fullUserData: UserData = {
          name: user.user_metadata?.name || user.email?.split('@')[0] || "User",
          email: user.email || "",
          phone: user.phone || user.user_metadata?.phone || "",
          job_title: profile?.job_title || "",
          role: profile?.job_title || "User",
          avatarUrl: profile?.avatar_url || "",
          billing: {
            plan: tier === 'free' ? 'Free Trial' : tier.charAt(0).toUpperCase() + tier.slice(1),
            price: tier === 'free' ? '$0/month' : tier === 'standard' ? '$29/month' : '$99/month',
            nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            paymentMethod: tier === 'free' ? 'None' : 'Credit Card',
            invoices: []
          },
          subscription: {
            plan: tier === 'free' ? 'Free Trial' : tier.charAt(0).toUpperCase() + tier.slice(1),
            status: "Active",
            startDate: new Date(user.created_at || Date.now()).toLocaleDateString(),
            nextRenewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            features: tier === 'free' 
              ? ["5 searches per day", "Limited data enrichment", "Basic filters", "Export up to 50 contacts"]
              : tier === 'standard'
              ? ["50 searches per day", "Enhanced data enrichment", "Advanced filters", "Export up to 500 contacts"]
              : ["Unlimited searches", "Premium data enrichment", "All filters", "Unlimited exports"],
            creditUsage: Math.max(0, (tier === 'free' ? 50 : tier === 'standard' ? 500 : 2000) - credits),
            creditTotal: tier === 'free' ? 50 : tier === 'standard' ? 500 : 2000
          }
        };
        
        console.log('CRM Profile: Final user data object:', fullUserData);
        
        setUserData(fullUserData);
      } catch (e) {
        console.error("Failed to fetch user data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.id, credits, tier]); // Include credits and tier in dependencies

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
          job_title: data.role,
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
        job_title: data.role,
        role: data.role
      };
      setUserData(updatedUserData);
      
      // Refresh credits in case they changed
      await refreshCredits();
      
      toast.success("Profile updated", {
        description: "Your profile information has been updated successfully."
      });
    } catch (e) {
      console.error("Failed to update profile", e);
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarUpdate = (avatarUrl: string) => {
    if (userData) {
      setUserData({
        ...userData,
        avatarUrl
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!userData || !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <User className="h-8 w-8 text-gray-600" />
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <p>Unable to load profile. Please sign in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <User className="h-8 w-8 text-gray-600" />
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <ProfileHeader 
        name={userData.name} 
        email={userData.email} 
        role={userData.job_title || userData.role || ""} 
        avatarUrl={userData.avatarUrl}
      />
      
      <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="bg-white p-6 rounded-lg border">
        {activeTab === "personal" && (
          <PersonalInfo 
            userData={userData} 
            onUpdate={handleProfileUpdate}
            onAvatarUpdate={handleAvatarUpdate}
          />
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
  );
};

export default Profile;