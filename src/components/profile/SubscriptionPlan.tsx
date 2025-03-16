
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, CreditCard, Package } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SubscriptionPlanProps {
  subscriptionData: {
    plan: string;
    status: string;
    startDate: string;
    nextRenewalDate: string;
    features: string[];
    creditUsage: number;
    creditTotal: number;
  };
}

const SubscriptionPlan = ({ subscriptionData }: SubscriptionPlanProps) => {
  const creditPercentage = Math.round((subscriptionData.creditUsage / subscriptionData.creditTotal) * 100);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center">
                  <Package className="h-6 w-6 text-sportbnk-green mr-2" />
                  <h3 className="text-xl font-medium">{subscriptionData.plan} Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {subscriptionData.status} • Since {subscriptionData.startDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Cancel Plan</Button>
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90">Upgrade Plan</Button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Your plan renews on {subscriptionData.nextRenewalDate}
              </p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-sportbnk-green" />
                <span className="text-sm">Auto-renewal is enabled</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium mb-2">Plan Features</h4>
                <ul className="space-y-2">
                  {subscriptionData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-sportbnk-green mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Credit Usage</h4>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>{subscriptionData.creditUsage} / {subscriptionData.creditTotal} Credits Used</span>
                    <span className="text-sportbnk-green">{creditPercentage}%</span>
                  </div>
                  <Progress value={creditPercentage} className="h-2 mb-4" />
                  
                  {creditPercentage > 80 && (
                    <div className="flex items-center text-yellow-600 text-sm mt-2">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>Your credits are running low</span>
                    </div>
                  )}
                  
                  <Button className="w-full mt-4 bg-sportbnk-green hover:bg-sportbnk-green/90">
                    Buy More Credits
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
