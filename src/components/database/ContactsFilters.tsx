import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface ContactsFiltersProps {
  onFilterChange: (filters: any) => void;
  showTeamFilters?: boolean;
  totalResults?: number;
}

const ContactsFilters = ({ onFilterChange, showTeamFilters = false, totalResults = 0 }: ContactsFiltersProps) => {
  const [filters, setFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      position: "all",
      team: "all",
      sport: "all",
      level: "all",
      country: "all",
      city: "all",
      revenue: "all",
      employees: "all"
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-6 px-2 text-xs text-muted-foreground"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        {totalResults} result{totalResults !== 1 ? 's' : ''} found
      </div>

      {showTeamFilters && (
        <>
          <div className="space-y-1">
            <Label htmlFor="country" className="text-xs">Country</Label>
            <Select 
              value={filters.country} 
              onValueChange={(value) => handleFilterChange("country", value)}
            >
              <SelectTrigger id="country" className="h-8 text-xs">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All countries</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="city" className="text-xs">City</Label>
            <Select 
              value={filters.city} 
              onValueChange={(value) => handleFilterChange("city", value)}
            >
              <SelectTrigger id="city" className="h-8 text-xs">
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Manchester">Manchester</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Madrid">Madrid</SelectItem>
                <SelectItem value="Munich">Munich</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="sport" className="text-xs">Sport</Label>
            <Select 
              value={filters.sport} 
              onValueChange={(value) => handleFilterChange("sport", value)}
            >
              <SelectTrigger id="sport" className="h-8 text-xs">
                <SelectValue placeholder="All sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Baseball">Baseball</SelectItem>
                <SelectItem value="Rugby">Rugby</SelectItem>
                <SelectItem value="Golf">Golf</SelectItem>
                <SelectItem value="Ski">Ski</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="level" className="text-xs">Level</Label>
            <Select 
              value={filters.level} 
              onValueChange={(value) => handleFilterChange("level", value)}
            >
              <SelectTrigger id="level" className="h-8 text-xs">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Amateur">Amateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="revenue" className="text-xs">Revenue</Label>
            <Select 
              value={filters.revenue} 
              onValueChange={(value) => handleFilterChange("revenue", value)}
            >
              <SelectTrigger id="revenue" className="h-8 text-xs">
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

          <div className="space-y-1">
            <Label htmlFor="employees" className="text-xs">Employees</Label>
            <Select 
              value={filters.employees} 
              onValueChange={(value) => handleFilterChange("employees", value)}
            >
              <SelectTrigger id="employees" className="h-8 text-xs">
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
        </>
      )}

      {!showTeamFilters && (
        <>
          <div className="space-y-1">
            <Label htmlFor="position" className="text-xs">Position</Label>
            <Select 
              value={filters.position} 
              onValueChange={(value) => handleFilterChange("position", value)}
            >
              <SelectTrigger id="position" className="h-8 text-xs">
                <SelectValue placeholder="All positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All positions</SelectItem>
                <SelectItem value="Marketing Director">Marketing Director</SelectItem>
                <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                <SelectItem value="Head Coach">Head Coach</SelectItem>
                <SelectItem value="Commercial Director">Commercial Director</SelectItem>
                <SelectItem value="PR Director">PR Director</SelectItem>
                <SelectItem value="Digital Strategy Director">Digital Strategy Director</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="team" className="text-xs">Team</Label>
            <Select 
              value={filters.team} 
              onValueChange={(value) => handleFilterChange("team", value)}
            >
              <SelectTrigger id="team" className="h-8 text-xs">
                <SelectValue placeholder="All teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teams</SelectItem>
                <SelectItem value="Manchester United">Manchester United</SelectItem>
                <SelectItem value="LA Lakers">LA Lakers</SelectItem>
                <SelectItem value="Real Madrid">Real Madrid</SelectItem>
                <SelectItem value="Chicago Bulls">Chicago Bulls</SelectItem>
                <SelectItem value="Boston Red Sox">Boston Red Sox</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactsFilters;
