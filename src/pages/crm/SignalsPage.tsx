import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  User, 
  X, 
  Mail, 
  Phone, 
  Linkedin,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  UserPlus,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  matchedICPs?: string[];
}

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  linkedin: string;
  department: string;
  revealed: boolean;
  cost: number;
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
    'Real Madrid Basketball': manchesterUnitedLogo,
    'Cork City FC': liverpoolLogo,
    'Leinster Rugby': liverpoolLogo,
  };
  return logoMap[teamName] || arsenalLogo;
};

const mockSignals: Signal[] = [
  {
    id: "1",
    sport: "Football",
    clubName: "Manchester United",
    competition: "Premier League",
    region: "UK",
    signalType: "Tender",
    budget: "£1.2M",
    datePosted: "3 days ago",
    urgency: "Normal",
    teamId: "manchester-united",
    description: "Official kit supplier tender for 2025-2030 seasons. Seeking premium sports apparel partner for first team, academy, and retail operations.",
    source: "UEFA Procurement Portal",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  {
    id: "2",
    sport: "Cricket",
    clubName: "Surrey County Cricket Club",
    competition: "England Cricket",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£250k",
    datePosted: "Today",
    urgency: "New",
    teamId: "surrey-ccc",
    description: "Title sponsorship opportunity for 2024 County Championship campaign. Includes shirt branding, ground naming rights, and hospitality packages.",
    source: "ECB Commercial Network",
    matchedICPs: ["Technology Procurement Signals"]
  },
  {
    id: "3",
    sport: "Rugby",
    clubName: "Leinster Rugby",
    competition: "Pro14",
    region: "Ireland",
    signalType: "Procurement",
    budget: "£75k",
    description: "Advanced recovery technology procurement for player wellness center. Seeking cryotherapy, compression therapy, and sports science equipment suppliers.",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "leinster-rugby",
    source: "Irish Rugby Union",
    matchedICPs: ["Technology Procurement Signals"]
  },
  {
    id: "4",
    sport: "Football",
    clubName: "Arsenal",
    competition: "Premier League",
    region: "UK",
    signalType: "Tender",
    budget: "£2.5M",
    datePosted: "1 day ago",
    urgency: "New",
    teamId: "arsenal",
    description: "Emirates Stadium sound system upgrade tender. Next-generation audio technology for enhanced matchday experience and commercial events.",
    source: "Premier League Suppliers Network",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  {
    id: "5",
    sport: "Football",
    clubName: "Liverpool",
    competition: "Premier League",
    region: "UK",
    signalType: "Procurement",
    budget: "£500k",
    datePosted: "6 days ago",
    urgency: "Expiring Soon",
    teamId: "liverpool",
    description: "Anfield pitch maintenance equipment procurement. Specialized turf management systems for optimal playing surface throughout the season.",
    source: "Grounds Management Association",
    matchedICPs: ["High-Budget Premier League Clubs"]
  }
];

const SignalsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedGeography, setSelectedGeography] = useState<string>("all");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("all");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showContactsSidebar, setShowContactsSidebar] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState<string[]>([]);

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
          department: "Commercial",
          revealed: false,
          cost: 5
        },
        {
          id: "c2", 
          name: "David Martinez",
          position: "Head of Procurement",
          email: "d.martinez@manutd.com",
          phone: "+44 161 868 8001",
          linkedin: "https://linkedin.com/in/davidmartinez",
          department: "Operations",
          revealed: false,
          cost: 3
        },
        {
          id: "c3",
          name: "Emma Wilson",
          position: "Partnerships Manager",
          email: "e.wilson@manutd.com",
          phone: "+44 161 868 8002",
          linkedin: "https://linkedin.com/in/emmawilson",
          department: "Partnerships",
          revealed: false,
          cost: 4
        }
      ],
      "2": [
        {
          id: "c4",
          name: "James Thompson",
          position: "Marketing Director",
          email: "j.thompson@surreyccc.co.uk",
          phone: "+44 20 7719 4000",
          linkedin: "https://linkedin.com/in/jamesthompson",
          department: "Marketing",
          revealed: false,
          cost: 4
        },
        {
          id: "c5",
          name: "Rebecca Smith",
          position: "Sponsorship Manager", 
          email: "r.smith@surreyccc.co.uk",
          phone: "+44 20 7719 4001",
          linkedin: "https://linkedin.com/in/rebeccasmith",
          department: "Commercial",
          revealed: false,
          cost: 3
        }
      ]
    };
    
    return contactsMap[signalId] || [
      {
        id: "default1",
        name: "Michael Brown",
        position: "Commercial Manager",
        email: "***@club.com",
        phone: "+44 20 *** ****",
        linkedin: "https://linkedin.com/in/***",
        department: "Commercial",
        revealed: false,
        cost: 4
      },
      {
        id: "default2",
        name: "Lisa Davis",
        position: "Operations Director",
        email: "***@club.com", 
        phone: "+44 20 *** ****",
        linkedin: "https://linkedin.com/in/***",
        department: "Operations",
        revealed: false,
        cost: 5
      }
    ];
  };

  const handleRevealContacts = (signal: Signal) => {
    setSelectedSignal(signal);
    setShowContactsSidebar(true);
  };

  const handleRevealContact = (contactId: string) => {
    setRevealedContacts([...revealedContacts, contactId]);
    toast({
      title: "Contact Revealed",
      description: "Contact details have been revealed. 5 credits used.",
    });
  };

  const handleAddToList = (contact: Contact) => {
    toast({
      title: "Added to List",
      description: `${contact.name} has been added to your contact list.`,
    });
  };

  const handleEmailContact = (contact: Contact) => {
    if (!revealedContacts.includes(contact.id)) {
      toast({
        title: "Contact Not Revealed",
        description: "Please reveal the contact first to email them.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Email Draft Created",
      description: `Email draft created for ${contact.name}.`,
    });
  };

  const filteredSignals = mockSignals.filter(signal => {
    const matchesSearch = signal.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.signalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${showContactsSidebar ? 'mr-96' : ''}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Global Sports Signals Feed
              </h1>
              <p className="text-gray-600">Real-time opportunities across global sports organizations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredSignals.length} signals today
              </Badge>
              <Avatar className="h-9 w-9">
                <AvatarFallback style={{ backgroundColor: '#0b1a51', color: 'white' }}>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex gap-4 items-center flex-wrap">
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

            <div className="flex-1 max-w-md">
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
          </div>
        </div>

        {/* Signals Feed */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredSignals.map((signal) => (
              <Card key={signal.id} className="hover:shadow-lg transition-shadow border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Club Logo */}
                    <div className="flex-shrink-0">
                      <img 
                        src={getTeamLogo(signal.clubName)} 
                        alt={`${signal.clubName} logo`}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {signal.clubName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="h-4 w-4" />
                            <span>{signal.competition}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{signal.region}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getSignalTypeColor(signal.signalType)}>
                            {signal.signalType}
                          </Badge>
                          {signal.urgency !== "Normal" && (
                            <Badge variant="outline" className={getUrgencyColor(signal.urgency)}>
                              {signal.urgency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Matched ICPs */}
                      {signal.matchedICPs && signal.matchedICPs.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-green-700">Matches your ICPs:</span>
                            {signal.matchedICPs.map((icp, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                {icp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        {signal.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-lg font-bold text-green-600">
                              {signal.budget}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Posted {signal.datePosted}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
                          onClick={() => handleRevealContacts(signal)}
                        >
                          <Users className="h-4 w-4" />
                          Reveal Contacts
                        </Button>
                      </div>

                      {signal.source && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Source: {signal.source}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSignals.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No signals found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contacts Sidebar */}
      {showContactsSidebar && selectedSignal && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Key Contacts</h3>
                <p className="text-sm text-gray-600">{selectedSignal.clubName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactsSidebar(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Contacts List */}
            <div className="space-y-4">
              {getContactsForSignal(selectedSignal.id).map((contact) => {
                const isRevealed = revealedContacts.includes(contact.id);
                
                return (
                  <Card key={contact.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.position}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {contact.department}
                          </Badge>
                        </div>
                        {!isRevealed && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {contact.cost} credits
                          </Badge>
                        )}
                      </div>

                      {isRevealed ? (
                        <div className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-700">{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-4 w-4 text-gray-400" />
                              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                LinkedIn Profile
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAddToList(contact)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Add to List
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEmailContact(contact)}
                              className="flex-1 gap-1"
                            >
                              <Mail className="h-3 w-3" />
                              Email
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>***@{selectedSignal.clubName.toLowerCase().replace(/\s+/g, '')}.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>+44 *** *** ****</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-4 w-4" />
                              <span>LinkedIn Profile</span>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            onClick={() => handleRevealContact(contact.id)}
                            className="w-full bg-green-600 hover:bg-green-700 gap-2"
                          >
                            <UserPlus className="h-3 w-3" />
                            Reveal Contact ({contact.cost} credits)
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Credit Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                Credits are used to reveal contact details. Each contact costs 3-5 credits depending on seniority.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalsPage;