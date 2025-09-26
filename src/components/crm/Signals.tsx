import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, User } from "lucide-react";

interface Signal {
  id: string;
  sport: string;
  sportIcon: string;
  clubName: string;
  competition: string;
  region: string;
  signalType: "Tender" | "Sponsorship" | "Funding" | "Hiring" | "Procurement";
  budget: string;
  datePosted: string;
  urgency: "New" | "Expiring Soon" | "Normal";
  teamId?: string;
}

const mockSignals: Signal[] = [
  {
    id: "1",
    sport: "Football",
    sportIcon: "⚽",
    clubName: "Manchester United",
    competition: "Premier League",
    region: "UK",
    signalType: "Tender",
    budget: "£1.2M",
    datePosted: "3 days ago",
    urgency: "Normal",
    teamId: "manchester-united"
  },
  {
    id: "2",
    sport: "Cricket",
    sportIcon: "🏏",
    clubName: "Surrey County Cricket Club",
    competition: "England Cricket",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£250k",
    datePosted: "Today",
    urgency: "New",
    teamId: "surrey-ccc"
  },
  {
    id: "3",
    sport: "Rugby",
    sportIcon: "🏉",
    clubName: "Leinster Rugby",
    competition: "Pro14",
    region: "Ireland",
    signalType: "Procurement",
    budget: "£75k",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "leinster-rugby"
  },
  {
    id: "4",
    sport: "Football",
    sportIcon: "⚽",
    clubName: "Cork City FC",
    competition: "League of Ireland",
    region: "Ireland",
    signalType: "Funding",
    budget: "£20k",
    datePosted: "2 days ago",
    urgency: "Normal",
    teamId: "cork-city-fc"
  },
  {
    id: "5",
    sport: "Basketball",
    sportIcon: "🏀",
    clubName: "Real Madrid Basketball",
    competition: "EuroLeague",
    region: "Spain",
    signalType: "Hiring",
    budget: "€60k",
    datePosted: "5 days ago",
    urgency: "Expiring Soon",
    teamId: "real-madrid-basketball"
  },
  {
    id: "6",
    sport: "Football",
    sportIcon: "⚽",
    clubName: "Arsenal",
    competition: "Premier League",
    region: "UK",
    signalType: "Tender",
    budget: "£2.5M",
    datePosted: "1 day ago",
    urgency: "New",
    teamId: "arsenal"
  },
  {
    id: "7",
    sport: "Cricket",
    sportIcon: "🏏",
    clubName: "Essex CCC",
    competition: "County Championship",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£180k",
    datePosted: "4 days ago",
    urgency: "Normal",
    teamId: "essex-ccc"
  },
  {
    id: "8",
    sport: "Football",
    sportIcon: "⚽",
    clubName: "Liverpool",
    competition: "Premier League",
    region: "UK",
    signalType: "Procurement",
    budget: "£500k",
    datePosted: "6 days ago",
    urgency: "Expiring Soon",
    teamId: "liverpool"
  }
];

const Signals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedGeography, setSelectedGeography] = useState<string>("all");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("all");

  const filteredSignals = mockSignals.filter(signal => {
    const matchesSearch = signal.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.signalType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === "all" || signal.sport === selectedSport;
    const matchesGeography = selectedGeography === "all" || signal.region === selectedGeography;
    const matchesSignalType = selectedSignalType === "all" || signal.signalType === selectedSignalType;
    
    return matchesSearch && matchesSport && matchesGeography && matchesSignalType;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "New": return "bg-green-100 text-green-800 border-green-200";
      case "Expiring Soon": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getSignalTypeColor = (type: string) => {
    switch (type) {
      case "Tender": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Sponsorship": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Funding": return "bg-green-100 text-green-800 border-green-200";
      case "Hiring": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Procurement": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold" style={{ color: '#0b1a51' }}>
              Sportbnk
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search signals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Profile Icon */}
          <Avatar className="h-9 w-9">
            <AvatarFallback style={{ backgroundColor: '#0b1a51', color: 'white' }}>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Filters Row */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
          
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Cricket">Cricket</SelectItem>
              <SelectItem value="Rugby">Rugby</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="low">Under £100k</SelectItem>
              <SelectItem value="medium">£100k - £1M</SelectItem>
              <SelectItem value="high">Over £1M</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedGeography} onValueChange={setSelectedGeography}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Geography" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Ireland">Ireland</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSignalType} onValueChange={setSelectedSignalType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Signal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Tender">Tender</SelectItem>
              <SelectItem value="Sponsorship">Sponsorship</SelectItem>
              <SelectItem value="Funding">Funding</SelectItem>
              <SelectItem value="Hiring">Hiring</SelectItem>
              <SelectItem value="Procurement">Procurement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Signals Feed */}
      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredSignals.map((signal) => (
            <Card key={signal.id} className="hover:shadow-lg transition-shadow border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Sport Icon */}
                  <div className="text-3xl flex-shrink-0 mt-1">
                    {signal.sportIcon}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    {/* Club Name & Competition */}
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold" style={{ color: '#0b1a51' }}>
                        {signal.clubName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {signal.competition} – {signal.region}
                      </p>
                    </div>

                    {/* Signal Type & Budget */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-gray-700">Signal:</span>
                      <Badge variant="outline" className={getSignalTypeColor(signal.signalType)}>
                        {signal.signalType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">
                          {signal.signalType === "Hiring" ? "Salary:" : "Budget:"}
                        </span>
                        <span className="text-lg font-bold ml-2" style={{ color: '#03cd7b' }}>
                          {signal.budget}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Posted: {signal.datePosted}</span>
                        {signal.urgency !== "Normal" && (
                          <Badge variant="outline" className={getUrgencyColor(signal.urgency)}>
                            {signal.urgency}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex-shrink-0">
                    <Button 
                      className="text-white font-medium"
                      style={{ backgroundColor: '#03cd7b' }}
                    >
                      Reveal Contacts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSignals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No signals found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signals;