
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export function CurrencySelector({ currency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 font-medium text-sm">Currency:</span>
      <Select value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="w-24 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="GBP">GBP (£)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
