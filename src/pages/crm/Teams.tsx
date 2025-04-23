import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import { useResponsiveContainer } from "@/hooks/use-responsive-container";
import { Plus } from "lucide-react";

const teamData = [
  // ... keep existing team data
];

const Teams = () => {
  const [credits, setCredits] = useState(456);
  const [activeFilters, setActiveFilters] = useState({
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });
  
  const { containerProps, hasHorizontalScroll } = useResponsiveContainer({
    enableScroll: true,
    minWidth: 768
  });
  
  const useCredits = (amount: number) => {
    setCredits(prev => Math.max(0, prev - amount));
  };
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    setActiveFilters(filters);
  };

  const filteredData = [...teamData].filter(team => {
    if (activeFilters.sport !== "all" && team.sport !== activeFilters.sport) {
      return false;
    }
    
    if (activeFilters.level !== "all" && team.level !== activeFilters.level) {
      return false;
    }
    
    if (activeFilters.country !== "all" && team.country !== activeFilters.country) {
      return false;
    }
    
    if (activeFilters.city !== "all" && team.city !== activeFilters.city) {
      return false;
    }
    
    if (activeFilters.revenue !== "all") {
      if (activeFilters.revenue === "less1m" && team.revenue >= 1000000) return false;
      if (activeFilters.revenue === "1m-10m" && (team.revenue < 1000000 || team.revenue > 10000000)) return false;
      if (activeFilters.revenue === "10m-50m" && (team.revenue < 10000000 || team.revenue > 50000000)) return false;
      if (activeFilters.revenue === "more50m" && team.revenue <= 50000000) return false;
    }
    
    if (activeFilters.employees !== "all") {
      if (activeFilters.employees === "less50" && team.employees >= 50) return false;
      if (activeFilters.employees === "50-200" && (team.employees < 50 || team.employees > 200)) return false;
      if (activeFilters.employees === "200-1000" && (team.employees < 200 || team.employees > 1000)) return false;
      if (activeFilters.employees === "more1000" && team.employees <= 1000) return false;
    }
    
    return true;
  });
  
  return (
    <div className="container mx-auto px-0">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-2xl font-bold text-sportbnk-navy">Sportbnk Database</h1>
        <Button size="icon" className="rounded-full bg-sportbnk-green hover:bg-sportbnk-green/90">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="md:col-span-1">
          <Card className="shadow-md mb-4">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ContactsFilters 
                onFilterChange={handleFilterChange} 
                showTeamFilters={true} 
                totalResults={filteredData.length}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-base">Credits</CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-2">
              <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
              <p className="text-xs text-muted-foreground">Credits remaining</p>
              <Button className="w-full mt-3 bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-sm">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <div {...containerProps}>
            <Card className="shadow-md h-full">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg">Organisations List</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ContactsTable 
                  data={filteredData}
                  useCredits={useCredits}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
