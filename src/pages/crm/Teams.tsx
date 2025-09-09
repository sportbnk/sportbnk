import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Building2, 
  MapPin, 
  Globe2, 
  Users,
  DollarSign,
  Eye,
  Plus,
  Filter,
  X
} from 'lucide-react';
import { Team, Sport, Country, City } from '@/types/teams';
import { ExecutiveDataCollector } from '@/components/ExecutiveDataCollector';
import { ClubInfoCollector } from '@/components/ClubInfoCollector';

// Import team logos
import arsenalLogo from "@/assets/team-logos/arsenal.png";
import chelseaLogo from "@/assets/team-logos/chelsea.png";
import liverpoolLogo from "@/assets/team-logos/liverpool.png";
import manchesterUnitedLogo from "@/assets/team-logos/manchester-united.png";
import manchesterCityLogo from "@/assets/team-logos/manchester-city.png";
import tottenhamLogo from "@/assets/team-logos/tottenham.png";
import newcastleLogo from "@/assets/team-logos/newcastle.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import westHamLogo from "@/assets/team-logos/west-ham.png";

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
    'Brighton & Hove Albion': brightonLogo,
    'Aston Villa': astonVillaLogo,
    'West Ham United': westHamLogo,
  };
  
  return logoMap[teamName] || null;
};

const Teams = () => {
  const navigate = useNavigate();
  
  // State
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Get unique leagues and levels from teams
  const leagues = [...new Set(teams.map(team => team.league).filter(Boolean))];
  const levels = [...new Set(teams.map(team => team.level).filter(Boolean))];

  // Fetch data
  const fetchData = async () => {
    try {
      const [teamsResponse, sportsResponse, countriesResponse, citiesResponse] = await Promise.all([
        supabase
          .from('teams')
          .select(`
            *,
            sport:sports(*),
            city:cities(*),
            country:countries(*)
          `),
        supabase.from('sports').select('*'),
        supabase.from('countries').select('*'),
        supabase.from('cities').select('*')
      ]);

      if (teamsResponse.error) throw teamsResponse.error;
      if (sportsResponse.error) throw sportsResponse.error;
      if (countriesResponse.error) throw countriesResponse.error;
      if (citiesResponse.error) throw citiesResponse.error;

      setTeams(teamsResponse.data || []);
      setSports(sportsResponse.data || []);
      setCountries(countriesResponse.data || []);
      setCities(citiesResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter teams
  useEffect(() => {
    let filtered = teams;

    if (searchQuery) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.league?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSport !== 'all') {
      filtered = filtered.filter(team => team.sport_id === selectedSport);
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(team => team.country_id === selectedCountry);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(team => team.city_id === selectedCity);
    }

    if (selectedLeague !== 'all') {
      filtered = filtered.filter(team => team.league === selectedLeague);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(team => team.level === selectedLevel);
    }

    setFilteredTeams(filtered);
  }, [teams, searchQuery, selectedSport, selectedCountry, selectedCity, selectedLeague, selectedLevel]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSelectedCountry('all');
    setSelectedCity('all');
    setSelectedLeague('all');
    setSelectedLevel('all');
  };

  const hasActiveFilters = searchQuery || selectedSport !== 'all' || 
                           selectedCountry !== 'all' || selectedCity !== 'all' || 
                           selectedLeague !== 'all' || selectedLevel !== 'all';

  if (loading) {
    return (
      <div className="flex gap-6 h-full">
        {/* Sidebar Skeleton */}
        <div className="w-80 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full">
      {/* Left Sidebar - Filters */}
      <div className="w-64 flex-shrink-0">
        <Card className="shadow-sm border-border sticky top-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Filter className="h-4 w-4 text-primary" />
              Filters
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto h-6 px-2 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-background border-border h-8 text-xs"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Sport</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Sports</SelectItem>
                  {sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* League Filter */}
            {leagues.length > 0 && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">League</label>
                <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                  <SelectTrigger className="bg-background border-border h-8 text-xs">
                    <SelectValue placeholder="All Leagues" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map((league) => (
                      <SelectItem key={league} value={league}>
                        {league}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Country Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level Filter */}
            {levels.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-background border-border h-9">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Results Count */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Showing {filteredTeams.length} of {teams.length} organisations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Organisations</h1>
            <p className="text-muted-foreground text-sm">
              Manage and explore sports organizations in your database
            </p>
          </div>
          <Button size="sm" className="shadow-sm h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Organisation
          </Button>
        </div>

        {/* Executive Data Collector */}
        <div className="mb-6">
          <ExecutiveDataCollector />
          
          <ClubInfoCollector />
        </div>

        {/* Results Table */}
        <Card className="shadow-sm border-border">
          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Organisation</TableHead>
                  <TableHead className="font-semibold">Level</TableHead>
                  <TableHead className="font-semibold">League</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Building2 className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">No organisations found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your filters or search terms
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeams.map((team) => (
                    <TableRow 
                      key={team.id} 
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/crm/teams/${team.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {(() => {
                            const generatedLogo = getTeamLogo(team.name);
                            if (generatedLogo) {
                              return (
                                <img 
                                  src={generatedLogo} 
                                  alt={`${team.name} logo`}
                                  className="w-10 h-10 rounded-lg object-cover shadow-soft"
                                />
                              );
                            } else if (team.logo_url) {
                              return (
                                <img 
                                  src={team.logo_url} 
                                  alt={`${team.name} logo`}
                                  className="w-10 h-10 rounded-lg object-cover shadow-soft"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              );
                            } else {
                              return (
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shadow-soft">
                                  <Building2 className="h-5 w-5 text-muted-foreground" />
                                </div>
                              );
                            }
                          })()}
                          <div>
                            <p className="font-medium text-foreground">{team.name}</p>
                            {team.sport?.name && (
                              <p className="text-sm text-muted-foreground">{team.sport.name}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {team.level || 'Professional'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {team.league ? (
                          <Badge variant="secondary" className="font-medium">
                            {team.league}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground font-medium">
                          {team.country?.name || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground">
                          {team.city?.name || '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to list functionality
                            }}
                            className="h-8"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to List
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Teams;