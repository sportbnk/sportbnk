
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreditDisplayProps {
  credits: number;
}

const CreditDisplay = ({ credits }: CreditDisplayProps) => {
  return (
    <Card className="border-sportbnk-green">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-sportbnk-green" />
          <span className="text-lg font-semibold">{credits} Credits</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Clock className="h-4 w-4 mr-1" />
            Usage History
          </Button>
          <Button size="sm" className="h-9 bg-sportbnk-green hover:bg-sportbnk-green/90">
            Buy More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDisplay;
