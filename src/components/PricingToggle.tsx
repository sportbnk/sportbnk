
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (value: boolean) => void;
}

export function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Label htmlFor="pricing-toggle" className="text-gray-600 font-medium cursor-pointer">
        Monthly
      </Label>
      <Switch
        id="pricing-toggle"
        checked={isAnnual}
        onCheckedChange={onToggle}
        className={`${isAnnual ? 'bg-sportbnk-green' : 'bg-sportbnk-navy'}`}
      />
      <Label htmlFor="pricing-toggle" className="text-gray-600 font-medium cursor-pointer">
        Annually <span className="text-sportbnk-green font-semibold ml-1">Save 20%</span>
      </Label>
    </div>
  );
}
