import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, X, Mail, Phone, Linkedin } from "lucide-react";

// Import team logos
import arsenalLogo from "@/assets/team-logos/arsenal.png";
import chelseaLogo from "@/assets/team-logos/chelsea.png";
import liverpoolLogo from "@/assets/team-logos/liverpool.png";
import manchesterUnitedLogo from "@/assets/team-logos/manchester-united.png";
import manchesterCityLogo from "@/assets/team-logos/manchester-city.png";
import tottenhamLogo from "@/assets/team-logos/tottenham.png";
import newcastleLogo from "@/assets/team-logos/newcastle.png";
import essexCricketLogo from "@/assets/team-logos/essex-cricket.png";
import surreyCricketLogo from "@/assets/team-logos/surrey-cricket.png";

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
  description: string;
  source?: string;
}

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  linkedin: string;
  department: string;
}

// Logo mapping function
const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal': arsenalLogo,
    'Chelsea': chelseaLogo,
    'Liverpool': liverpoolLogo,
    'Manchester United': manchesterUnitedLogo,
    'Manchester City': manchesterCityLogo,
    'Tottenham Hotspur': tottenhamLogo,
    'Newcastle United': newcastleLogo,
    'Essex CCC': essexCricketLogo,
    'Surrey County Cricket Club': surreyCricketLogo,
    'Real Madrid Basketball': manchesterUnitedLogo, // Fallback
    'Cork City FC': liverpoolLogo, // Fallback
    'Leinster Rugby': liverpoolLogo, // Fallback
  };
  return logoMap[teamName] || arsenalLogo; // Default fallback
};

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
    teamId: "manchester-united",
    description: "Official kit supplier tender for 2025-2030 seasons. Seeking premium sports apparel partner for first team, academy, and retail operations.",
    source: "UEFA Procurement Portal"
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
    teamId: "surrey-ccc",
    description: "Title sponsorship opportunity for 2024 County Championship campaign. Includes shirt branding, ground naming rights, and hospitality packages.",
    source: "ECB Commercial Network"
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
    description: "Advanced recovery technology procurement for player wellness center. Seeking cryotherapy, compression therapy, and sports science equipment suppliers.",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "leinster-rugby",
    source: "Irish Rugby Union"
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
    teamId: "cork-city-fc",
    description: "Grassroots development grant from FAI Community Football Programme. Funding for youth academy infrastructure and coaching development.",
    source: "Football Association of Ireland"
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
    teamId: "real-madrid-basketball",
    description: "Performance Analyst position for first team operations. Analytics expertise in player performance, game strategy, and opponent scouting required.",
    source: "EuroLeague Career Portal"
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
    teamId: "arsenal",
    description: "Emirates Stadium sound system upgrade tender. Next-generation audio technology for enhanced matchday experience and commercial events.",
    source: "Premier League Suppliers Network"
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
    teamId: "essex-ccc",
    description: "Training ground sponsorship at Cloudy Bay Oval. Includes facility naming rights, coaching clinic branding, and digital marketing opportunities.",
    source: "County Cricket Partnership"
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
    teamId: "liverpool",
    description: "Anfield pitch maintenance equipment procurement. Specialized turf management systems for optimal playing surface throughout the season.",
    source: "Grounds Management Association"
  }
];

const Signals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedGeography, setSelectedGeography] = useState<string>("all");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("all");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showContactsSidebar, setShowContactsSidebar] = useState(false);

  // Mock contacts data for each signal
  const getContactsForSignal = (signalId: string): Contact[] => {
    const contactsMap: Record<string, Contact[]> = {
      "1": [
        {
          id: "c1",
          name: "Sarah Johnson",
          position: "Commercial Director",
          email: "s.johnson@manutd.com",
          phone: "+44 161 868 8000",
          linkedin: "https://linkedin.com/in/sarahjohnson",
          department: "Commercial"
        },
        {
          id: "c2", 
          name: "David Martinez",
          position: "Head of Procurement",
          email: "d.martinez@manutd.com",
          phone: "+44 161 868 8001",
          linkedin: "https://linkedin.com/in/davidmartinez",
          department: "Operations"
        }
      ],
      "2": [
        {
          id: "c3",
          name: "Emma Thompson",
          position: "Marketing Director",
          email: "e.thompson@essexccc.co.uk",
          phone: "+44 20 7719 4000",
          linkedin: "https://linkedin.com/in/emmathompson",
          department: "Marketing"
        },
        {
          id: "c4",
          name: "James Wilson",
          position: "Partnership Manager", 
          email: "j.wilson@essexccc.co.uk",
          phone: "+44 20 7719 4001",
          linkedin: "https://linkedin.com/in/jameswilson",
          department: "Partnerships"
        }
      ]
      // Add more as needed
    };
    
    return contactsMap[signalId] || [
      {
        id: "default1",
        name: "Michael Brown",
        position: "Commercial Manager",
        email: "m.brown@club.com",
        phone: "+44 20 7000 0000",
        linkedin: "https://linkedin.com/in/michaelbrown",
        department: "Commercial"
      },
      {
        id: "default2",
        name: "Lisa Davis",
        position: "Operations Director",
        email: "l.davis@club.com", 
        phone: "+44 20 7000 0001",
        linkedin: "https://linkedin.com/in/lisadavis",
        department: "Operations"
      }
    ];
  };

  const handleRevealContacts = (signal: Signal) => {
    setSelectedSignal(signal);
    setShowContactsSidebar(true);
  };

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
                  {/* Club Logo & Sport Icon */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <img 
                      src={getTeamLogo(signal.clubName)} 
                      alt={`${signal.clubName} logo`}
                      className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                    />
                    <div className="text-2xl">
                      {signal.sportIcon}
                    </div>
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

                    {/* Signal Description */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {signal.description}
                      </p>
                      {signal.source && (
                        <p className="text-xs text-gray-500 mt-1">
                          Source: {signal.source}
                        </p>
                      )}
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
                      onClick={() => handleRevealContacts(signal)}
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

      {/* Contacts Sidebar */}
      {showContactsSidebar && selectedSignal && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: '#0b1a51' }}>
                  Key Contacts
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedSignal.clubName} - {selectedSignal.signalType}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactsSidebar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Signal Summary */}
            <Card className="mb-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={getTeamLogo(selectedSignal.clubName)} 
                    alt={`${selectedSignal.clubName} logo`}
                    className="w-8 h-8 object-contain rounded"
                  />
                  <div>
                    <p className="font-medium text-sm">{selectedSignal.clubName}</p>
                    <p className="text-xs text-gray-600">{selectedSignal.competition}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium" style={{ color: '#03cd7b' }}>
                    {selectedSignal.budget}
                  </p>
                  <p className="text-gray-600">Posted: {selectedSignal.datePosted}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contacts List */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Decision Makers</h4>
              {getContactsForSignal(selectedSignal.id).map((contact) => (
                <Card key={contact.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-gray-900">{contact.name}</h5>
                        <p className="text-sm text-gray-600">{contact.position}</p>
                        <p className="text-xs text-gray-500">{contact.department}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Key Contact
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Linkedin className="h-3 w-3 text-gray-400" />
                        <a 
                          href={contact.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1 text-xs">
                        Send Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Add to List
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="mt-6" style={{ backgroundColor: '#0b1a51' }}>
              <CardContent className="p-4 text-center">
                <h5 className="font-medium text-white mb-2">
                  Ready to Connect?
                </h5>
                <p className="text-sm text-gray-300 mb-4">
                  Start building relationships with these key stakeholders
                </p>
                <Button 
                  className="w-full text-sm"
                  style={{ backgroundColor: '#03cd7b' }}
                >
                  Create Outreach Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Overlay */}
      {showContactsSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowContactsSidebar(false)}
        />
      )}
    </div>
  );
};

export default Signals;