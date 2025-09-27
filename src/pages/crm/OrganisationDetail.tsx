import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Calendar,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Plus,
  UserPlus
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
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import brentfordLogo from "@/assets/team-logos/brentford.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import ipswichLogo from "@/assets/team-logos/ipswich-town.png";
import leicesterLogo from "@/assets/team-logos/leicester.png";
import nottinghamForestLogo from "@/assets/team-logos/nottingham-forest.png";
import southamptonLogo from "@/assets/team-logos/west-ham.png"; // Using as placeholder
import westHamLogo from "@/assets/team-logos/west-ham.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";

interface Organisation {
  id: string;
  name: string;
  type: string;
  sport: string;
  league: string;
  location: string;
  country: string;
  foundedYear: number;
  employees: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  stadium?: string;
  capacity?: number;
  manager?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  linkedin?: string;
  joinedDate: string;
  isKeyContact: boolean;
}

// Mock data for Premier League teams
const organisationsData: Record<string, Organisation> = {
  '1': {
    id: '1',
    name: 'Arsenal FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1886,
    employees: '500-1000',
    website: 'https://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    phone: '+44 20 7619 5003',
    description: 'Arsenal Football Club is a professional football club based in Islington, London, England. The club plays in the Premier League, the top flight of English football. The club has won 13 league titles, a record 14 FA Cups, two League Cups, 16 FA Community Shields, one European Cup Winners\' Cup, and one Inter-Cities Fairs Cup.',
    stadium: 'Emirates Stadium',
    capacity: 60704,
    manager: 'Mikel Arteta',
    socialMedia: {
      twitter: 'https://twitter.com/Arsenal',
      facebook: 'https://facebook.com/Arsenal',
      instagram: 'https://instagram.com/arsenal',
      linkedin: 'https://linkedin.com/company/arsenal-football-club',
      youtube: 'https://youtube.com/user/ArsenalTour'
    }
  },
  '6': {
    id: '6',
    name: 'Chelsea FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1905,
    employees: '500-1000',
    website: 'https://www.chelseafc.com',
    email: 'info@chelseafc.com',
    phone: '+44 871 984 1955',
    description: 'Chelsea Football Club is an English professional football club based in Fulham, West London. Founded in 1905, they play their home games at Stamford Bridge. The club competes in the Premier League and has won six league titles, eight FA Cups, five League Cups, and two UEFA Champions League titles.',
    stadium: 'Stamford Bridge',
    capacity: 40341,
    manager: 'Mauricio Pochettino',
    socialMedia: {
      twitter: 'https://twitter.com/ChelseaFC',
      facebook: 'https://facebook.com/ChelseaFC',
      instagram: 'https://instagram.com/chelseafc',
      linkedin: 'https://linkedin.com/company/chelsea-football-club',
      youtube: 'https://youtube.com/user/chelseafc'
    }
  },
  '12': {
    id: '12',
    name: 'Liverpool FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Liverpool',
    country: 'England',
    foundedYear: 1892,
    employees: '1000+',
    website: 'https://www.liverpoolfc.com',
    email: 'info@liverpoolfc.com',
    phone: '+44 151 263 2361',
    description: 'Liverpool Football Club is a professional football club based in Liverpool, England. The club competes in the Premier League and is one of the most successful clubs in English football history, having won 19 league titles, 8 FA Cups, 10 League Cups, and 6 European Cups.',
    stadium: 'Anfield',
    capacity: 61276,
    manager: 'Jürgen Klopp',
    socialMedia: {
      twitter: 'https://twitter.com/LFC',
      facebook: 'https://facebook.com/LiverpoolFC',
      instagram: 'https://instagram.com/liverpoolfc',
      linkedin: 'https://linkedin.com/company/liverpool-football-club',
      youtube: 'https://youtube.com/user/LiverpoolFC'
    }
  },
  '14': {
    id: '14',
    name: 'Manchester United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Manchester',
    country: 'England',
    foundedYear: 1878,
    employees: '1000+',
    website: 'https://www.manutd.com',
    email: 'info@manutd.com',
    phone: '+44 161 868 8000',
    description: 'Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England. The club competes in the Premier League and is one of the most successful clubs in English football, having won 20 league titles, 12 FA Cups, and 3 European Cups.',
    stadium: 'Old Trafford',
    capacity: 74310,
    manager: 'Erik ten Hag',
    socialMedia: {
      twitter: 'https://twitter.com/ManUtd',
      facebook: 'https://facebook.com/ManchesterUnited',
      instagram: 'https://instagram.com/manchesterunited',
      linkedin: 'https://linkedin.com/company/manchester-united',
      youtube: 'https://youtube.com/user/manutd'
    }
  }
};

// Mock employees data
const employeesData: Record<string, Employee[]> = {
  '1': [
    {
      id: 'e1',
      name: 'Richard Garlick',
      position: 'Managing Director',
      department: 'Executive',
      email: 'r.garlick@arsenal.co.uk',
      phone: '+44 20 7619 5001',
      linkedin: 'https://linkedin.com/in/richardgarlick',
      joinedDate: 'Jan 2022',
      isKeyContact: true
    },
    {
      id: 'e2',
      name: 'Peter Silverstone',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'p.silverstone@arsenal.co.uk',
      phone: '+44 20 7619 5002',
      linkedin: 'https://linkedin.com/in/petersilverstone',
      joinedDate: 'Mar 2021',
      isKeyContact: true
    },
    {
      id: 'e3',
      name: 'Mark Gonella',
      position: 'Communications Director',
      department: 'Marketing',
      email: 'm.gonella@arsenal.co.uk',
      phone: '+44 20 7619 5003',
      joinedDate: 'Jun 2020',
      isKeyContact: false
    },
    {
      id: 'e4',
      name: 'Catherine Davies',
      position: 'Head of Partnerships',
      department: 'Commercial',
      email: 'c.davies@arsenal.co.uk',
      phone: '+44 20 7619 5004',
      linkedin: 'https://linkedin.com/in/catherinedavies',
      joinedDate: 'Sep 2019',
      isKeyContact: true
    },
    {
      id: 'e5',
      name: 'Tim Lewis',
      position: 'Operations Director',
      department: 'Operations',
      email: 't.lewis@arsenal.co.uk',
      phone: '+44 20 7619 5005',
      joinedDate: 'Feb 2020',
      isKeyContact: false
    }
  ],
  '6': [
    {
      id: 'e6',
      name: 'Chris Jurasek',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'c.jurasek@chelseafc.com',
      phone: '+44 871 984 1901',
      linkedin: 'https://linkedin.com/in/chrisjurasek',
      joinedDate: 'Aug 2023',
      isKeyContact: true
    },
    {
      id: 'e7',
      name: 'David Barnard',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.barnard@chelseafc.com',
      phone: '+44 871 984 1902',
      joinedDate: 'Jan 2021',
      isKeyContact: true
    },
    {
      id: 'e8',
      name: 'Steve Atkins',
      position: 'Communications Director',
      department: 'Marketing',
      email: 's.atkins@chelseafc.com',
      phone: '+44 871 984 1903',
      linkedin: 'https://linkedin.com/in/steveatkins',
      joinedDate: 'May 2018',
      isKeyContact: false
    }
  ],
  '12': [
    {
      id: 'e9',
      name: 'Billy Hogan',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'b.hogan@liverpoolfc.com',
      phone: '+44 151 263 2301',
      linkedin: 'https://linkedin.com/in/billyhogan',
      joinedDate: 'Sep 2020',
      isKeyContact: true
    },
    {
      id: 'e10',
      name: 'Drew Crisp',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.crisp@liverpoolfc.com',
      phone: '+44 151 263 2302',
      joinedDate: 'Mar 2019',
      isKeyContact: true
    },
    {
      id: 'e11',
      name: 'Matt McCann',
      position: 'Communications Director',
      department: 'Marketing',
      email: 'm.mccann@liverpoolfc.com',
      phone: '+44 151 263 2303',
      linkedin: 'https://linkedin.com/in/mattmccann',
      joinedDate: 'Jul 2017',
      isKeyContact: false
    }
  ],
  '14': [
    {
      id: 'e12',
      name: 'Omar Berrada',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'o.berrada@manutd.com',
      phone: '+44 161 868 8001',
      linkedin: 'https://linkedin.com/in/omarberrada',
      joinedDate: 'Jan 2024',
      isKeyContact: true
    },
    {
      id: 'e13',
      name: 'Collette Roche',
      position: 'Chief Operating Officer',
      department: 'Operations',
      email: 'c.roche@manutd.com',
      phone: '+44 161 868 8002',
      joinedDate: 'Nov 2019',
      isKeyContact: true
    },
    {
      id: 'e14',
      name: 'Victoria Timpson',
      position: 'Chief Communications Officer',
      department: 'Marketing',
      email: 'v.timpson@manutd.com',
      phone: '+44 161 868 8003',
      linkedin: 'https://linkedin.com/in/victoriatimpson',
      joinedDate: 'Jun 2021',
      isKeyContact: false
    }
  ]
};

const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal FC': arsenalLogo,
    'Chelsea FC': chelseaLogo,
    'Liverpool FC': liverpoolLogo,
    'Manchester United FC': manchesterUnitedLogo,
    'Manchester City FC': manchesterCityLogo,
    'Tottenham Hotspur FC': tottenhamLogo,
    'Newcastle United FC': newcastleLogo,
    'Aston Villa FC': astonVillaLogo,
    'AFC Bournemouth': bournemouthLogo,
    'Brentford FC': brentfordLogo,
    'Brighton & Hove Albion FC': brightonLogo,
    'Crystal Palace FC': crystalPalaceLogo,
    'Everton FC': evertonLogo,
    'Fulham FC': fulhamLogo,
    'Ipswich Town FC': ipswichLogo,
    'Leicester City FC': leicesterLogo,
    'Nottingham Forest FC': nottinghamForestLogo,
    'Southampton FC': southamptonLogo,
    'West Ham United FC': westHamLogo,
    'Wolverhampton Wanderers FC': wolvesLogo
  };
  return logoMap[teamName] || arsenalLogo;
};

const OrganisationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addedToList, setAddedToList] = useState<string[]>([]);

  const organisation = id ? organisationsData[id] : null;
  const employees = id ? employeesData[id] || [] : [];

  if (!organisation) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Organisation Not Found</h2>
          <p className="text-gray-600 mb-4">The organisation you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/crm/discover')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discover
          </Button>
        </Card>
      </div>
    );
  }

  const handleAddEmployeeToList = (employee: Employee) => {
    setAddedToList([...addedToList, employee.id]);
    toast({
      title: "Added to List",
      description: `${employee.name} has been added to your contact list.`,
    });
  };

  const handleAddAllToList = () => {
    const newEmployeeIds = employees.map(emp => emp.id);
    setAddedToList([...addedToList, ...newEmployeeIds]);
    toast({
      title: "Added to List",
      description: `All ${employees.length} employees have been added to your contact list.`,
    });
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Commercial': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Operations': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-indigo-100 text-indigo-800',
      'Technology': 'bg-gray-100 text-gray-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'hover:bg-blue-50 hover:text-blue-600';
      case 'facebook':
        return 'hover:bg-blue-50 hover:text-blue-800';
      case 'instagram':
        return 'hover:bg-pink-50 hover:text-pink-600';
      case 'linkedin':
        return 'hover:bg-blue-50 hover:text-blue-700';
      case 'youtube':
        return 'hover:bg-red-50 hover:text-red-600';
      default:
        return 'hover:bg-gray-50 hover:text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/crm/discover')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discover
          </Button>
        </div>

        {/* Organization Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={getTeamLogo(organisation.name)} 
                  alt={`${organisation.name} logo`}
                  className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                />
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{organisation.name}</h1>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge className="bg-green-100 text-green-800">{organisation.type}</Badge>
                      <Badge variant="outline">{organisation.sport}</Badge>
                      <Badge variant="outline">{organisation.league}</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Founded {organisation.foundedYear}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{organisation.location}, {organisation.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{organisation.employees} employees</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stadium Info */}
                {organisation.stadium && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Stadium Information</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span><strong>Home:</strong> {organisation.stadium}</span>
                      {organisation.capacity && <span><strong>Capacity:</strong> {organisation.capacity.toLocaleString()}</span>}
                      {organisation.manager && <span><strong>Manager:</strong> {organisation.manager}</span>}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex items-center gap-6 mb-4">
                  {organisation.website && (
                    <a 
                      href={organisation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                  {organisation.email && (
                    <a 
                      href={`mailto:${organisation.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  )}
                  {organisation.phone && (
                    <a 
                      href={`tel:${organisation.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{organisation.phone}</span>
                    </a>
                  )}
                </div>

                {/* Social Media */}
                {organisation.socialMedia && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                    <div className="flex items-center gap-3">
                      {Object.entries(organisation.socialMedia).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border border-gray-200 transition-colors ${getSocialColor(platform)}`}
                          title={`Follow on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                        >
                          {getSocialIcon(platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {organisation.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About {organisation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{organisation.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Employees Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Key Employees ({employees.length})
                </CardTitle>
                <p className="text-gray-600 mt-1">Decision makers and key contacts at {organisation.name}</p>
              </div>
              <Button 
                onClick={handleAddAllToList}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
                disabled={employees.every(emp => addedToList.includes(emp.id))}
              >
                <UserPlus className="h-4 w-4" />
                Add All to List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      {employee.isKeyContact && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Key Contact
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <Badge className={`text-xs ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </Badge>
                      <p className="text-xs text-gray-500">Joined {employee.joinedDate}</p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline text-xs">
                          {employee.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <a href={`tel:${employee.phone}`} className="text-gray-600 text-xs">
                          {employee.phone}
                        </a>
                      </div>
                      {employee.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-3 w-3 text-gray-400" />
                          <a 
                            href={employee.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      onClick={() => handleAddEmployeeToList(employee)}
                      disabled={addedToList.includes(employee.id)}
                      className="w-full gap-2"
                    >
                      <Plus className="h-3 w-3" />
                      {addedToList.includes(employee.id) ? 'Added to List' : 'Add to List'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {employees.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Employee Data Available</h3>
                <p className="text-gray-600">Employee information for this organization is not currently available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationDetail;