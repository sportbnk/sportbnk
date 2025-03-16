
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import CompanyInfo from "@/components/profile/CompanyInfo";
import BillingInfo from "@/components/profile/BillingInfo";
import SubscriptionPlan from "@/components/profile/SubscriptionPlan";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type TabType = "personal" | "company" | "billing" | "subscription";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatarUrl?: string;
  company?: {
    name: string;
    position?: string;
    website?: string;
    size?: string;
    industry?: string;
    address?: string;
  };
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
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      // If no user is logged in, redirect to login
      navigate("/");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      
      // Create a full user object with default values for missing fields
      const fullUserData: UserData = {
        name: parsedUser.name || "User",
        email: parsedUser.email || "user@example.com",
        phone: parsedUser.phone || "",
        role: parsedUser.role || "Free Trial User",
        avatarUrl: parsedUser.avatarUrl || "",
        company: parsedUser.company || {
          name: "",
          position: "",
          website: "",
          size: "",
          industry: "",
          address: ""
        },
        billing: parsedUser.billing || {
          plan: parsedUser.isFreeTrial ? "Free Trial" : "Basic",
          price: parsedUser.isFreeTrial ? "$0/month" : "$49/month",
          nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          paymentMethod: "None",
          invoices: []
        },
        subscription: parsedUser.subscription || {
          plan: parsedUser.isFreeTrial ? "Free Trial" : "Basic",
          status: "Active",
          startDate: new Date().toLocaleDateString(),
          nextRenewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          features: parsedUser.isFreeTrial ? 
            ["5 searches per day", "Limited data enrichment", "Basic filters", "Export up to 50 contacts"] : 
            ["100 searches per day", "Standard data enrichment", "Advanced filters", "Export up to 1000 contacts"],
          creditUsage: 0,
          creditTotal: parsedUser.isFreeTrial ? 50 : 1000
        }
      };
      
      setUserData(fullUserData);
    } catch (e) {
      console.error("Failed to parse user data", e);
      // Create a default user object if parsing fails
      setUserData({
        name: "User",
        email: "user@example.com",
        role: "Free Trial User",
        company: {
          name: "",
          position: "",
          website: "",
          size: "",
          industry: "",
          address: ""
        },
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
          startDate: new Date().toLocaleDateString(),
          nextRenewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          features: ["5 searches per day", "Limited data enrichment", "Basic filters", "Export up to 50 contacts"],
          creditUsage: 0,
          creditTotal: 50
        }
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleProfileUpdate = (data: any) => {
    if (!userData) return;
    
    // Update the user data in state
    const updatedUserData = { ...userData, ...data };
    setUserData(updatedUserData);
    
    // Update the user data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const updatedStoredUser = { ...parsedUser, ...data };
        localStorage.setItem("user", JSON.stringify(updatedStoredUser));
      } catch (e) {
        console.error("Failed to update user data", e);
      }
    }
    
    toast.success("Profile updated", {
      description: "Your profile information has been updated successfully."
    });
  };

  const handleCompanyUpdate = (data: any) => {
    if (!userData) return;
    
    // Update the company data in state
    const updatedUserData = { 
      ...userData, 
      company: { ...userData.company, ...data } 
    };
    setUserData(updatedUserData);
    
    // Update the company data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const updatedStoredUser = { 
          ...parsedUser, 
          company: { ...parsedUser.company, ...data } 
        };
        localStorage.setItem("user", JSON.stringify(updatedStoredUser));
      } catch (e) {
        console.error("Failed to update company data", e);
      }
    }
    
    toast.success("Company information updated", {
      description: "Your company information has been updated successfully."
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8 max-w-5xl">
          <div className="flex justify-center items-center h-64">
            <p>Loading profile...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!userData) {
    return (
      <PageLayout>
        <div className="container mx-auto py-8 max-w-5xl">
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
      <div className="container mx-auto py-8 max-w-5xl">
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
          
          {activeTab === "company" && (
            <CompanyInfo companyData={userData.company || {}} onUpdate={handleCompanyUpdate} />
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
