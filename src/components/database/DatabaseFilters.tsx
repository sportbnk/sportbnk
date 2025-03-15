
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface DatabaseFiltersProps {
  onFilterChange: (filters: any) => void;
}

const DatabaseFilters = ({ onFilterChange }: DatabaseFiltersProps) => {
  const [filters, setFilters] = useState({
    sport: "",
    level: "",
    country: "",
    revenue: "",
    employees: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      sport: "",
      level: "",
      country: "",
      revenue: "",
      employees: ""
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 px-2 text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select 
            value={filters.sport} 
            onValueChange={(value) => handleFilterChange("sport", value)}
          >
            <SelectTrigger id="sport">
              <SelectValue placeholder="All sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All sports</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Baseball">Baseball</SelectItem>
              <SelectItem value="Rugby">Rugby</SelectItem>
              <SelectItem value="Australian Football">Australian Football</SelectItem>
              <SelectItem value="Multiple">Multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select 
            value={filters.level} 
            onValueChange={(value) => handleFilterChange("level", value)}
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All levels</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Amateur">Amateur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select 
            value={filters.country} 
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All countries</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue">Annual Revenue</Label>
          <Select 
            value={filters.revenue} 
            onValueChange={(value) => handleFilterChange("revenue", value)}
          >
            <SelectTrigger id="revenue">
              <SelectValue placeholder="All revenues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All revenues</SelectItem>
              <SelectItem value="less1m">Less than $1M</SelectItem>
              <SelectItem value="1m-10m">$1M - $10M</SelectItem>
              <SelectItem value="10m-50m">$10M - $50M</SelectItem>
              <SelectItem value="more50m">More than $50M</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Employees</Label>
          <Select 
            value={filters.employees} 
            onValueChange={(value) => handleFilterChange("employees", value)}
          >
            <SelectTrigger id="employees">
              <SelectValue placeholder="All sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All sizes</SelectItem>
              <SelectItem value="less50">Less than 50</SelectItem>
              <SelectItem value="50-200">50 - 200</SelectItem>
              <SelectItem value="200-1000">200 - 1000</SelectItem>
              <SelectItem value="more1000">More than 1000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseFilters;
