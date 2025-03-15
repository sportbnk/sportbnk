
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X, MapPin } from "lucide-react";

interface DatabaseFiltersProps {
  onFilterChange: (filters: any) => void;
}

const DatabaseFilters = ({ onFilterChange }: DatabaseFiltersProps) => {
  const [filters, setFilters] = useState({
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
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
      sport: "all",
      level: "all",
      country: "all",
      city: "all",
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
              <SelectItem value="all">All sports</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Baseball">Baseball</SelectItem>
              <SelectItem value="Rugby">Rugby</SelectItem>
              <SelectItem value="Australian Football">Australian Football</SelectItem>
              <SelectItem value="Multiple">Multiple</SelectItem>
              <SelectItem value="Golf">Golf</SelectItem>
              <SelectItem value="Ski">Ski</SelectItem>
              <SelectItem value="Swimming">Swimming</SelectItem>
              <SelectItem value="Sailing">Sailing</SelectItem>
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
              <SelectItem value="all">All levels</SelectItem>
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
              <SelectItem value="all">All countries</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Italy">Italy</SelectItem>
              <SelectItem value="Ireland">Ireland</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> City
          </Label>
          <Select 
            value={filters.city} 
            onValueChange={(value) => handleFilterChange("city", value)}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>
              <SelectItem value="London">London</SelectItem>
              <SelectItem value="Manchester">Manchester</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles</SelectItem>
              <SelectItem value="Boston">Boston</SelectItem>
              <SelectItem value="Sydney">Sydney</SelectItem>
              <SelectItem value="Madrid">Madrid</SelectItem>
              <SelectItem value="Munich">Munich</SelectItem>
              <SelectItem value="Nottingham">Nottingham</SelectItem>
              <SelectItem value="Dublin">Dublin</SelectItem>
              <SelectItem value="Amsterdam">Amsterdam</SelectItem>
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
              <SelectItem value="all">All revenues</SelectItem>
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
              <SelectItem value="all">All sizes</SelectItem>
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
