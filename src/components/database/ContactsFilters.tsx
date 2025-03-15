
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface ContactsFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ContactsFilters = ({ onFilterChange }: ContactsFiltersProps) => {
  const [filters, setFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
    country: "all",
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
      country: "all",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1 text-base font-medium">
          <Filter className="h-4 w-4" />
          Filter by
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-8 px-2 text-sm text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="position" className="text-sm">Position</Label>
          <Select 
            value={filters.position} 
            onValueChange={(value) => handleFilterChange("position", value)}
          >
            <SelectTrigger id="position" className="h-9 text-sm">
              <SelectValue placeholder="All positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All positions</SelectItem>
              <SelectItem value="Marketing Director">Marketing Director</SelectItem>
              <SelectItem value="Operations Director">Operations Director</SelectItem>
              <SelectItem value="PR Director">PR Director</SelectItem>
              <SelectItem value="Team Manager">Team Manager</SelectItem>
              <SelectItem value="Digital Strategy Director">Digital Strategy</SelectItem>
              <SelectItem value="Fan Relations Manager">Fan Relations</SelectItem>
              <SelectItem value="Business Development">Business Dev</SelectItem>
              <SelectItem value="Sponsorship Director">Sponsorship</SelectItem>
              <SelectItem value="Commercial Director">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="team" className="text-sm">Team</Label>
          <Select 
            value={filters.team} 
            onValueChange={(value) => handleFilterChange("team", value)}
          >
            <SelectTrigger id="team" className="h-9 text-sm">
              <SelectValue placeholder="All teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All teams</SelectItem>
              <SelectItem value="Manchester United">Man United</SelectItem>
              <SelectItem value="LA Lakers">LA Lakers</SelectItem>
              <SelectItem value="Boston Red Sox">Boston Red Sox</SelectItem>
              <SelectItem value="Real Madrid">Real Madrid</SelectItem>
              <SelectItem value="Liverpool FC">Liverpool FC</SelectItem>
              <SelectItem value="Chicago Bulls">Chicago Bulls</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sport" className="text-sm">Sport</Label>
          <Select 
            value={filters.sport} 
            onValueChange={(value) => handleFilterChange("sport", value)}
          >
            <SelectTrigger id="sport" className="h-9 text-sm">
              <SelectValue placeholder="All sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sports</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Baseball">Baseball</SelectItem>
              <SelectItem value="Rugby">Rugby</SelectItem>
              <SelectItem value="Australian Football">Australian</SelectItem>
              <SelectItem value="Multiple">Multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm">Country</Label>
          <Select 
            value={filters.country} 
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger id="country" className="h-9 text-sm">
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              <SelectItem value="United Kingdom">UK</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ContactsFilters;
