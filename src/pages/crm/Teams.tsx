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
import brentfordLogo from "@/assets/team-logos/brentford.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import nottinghamForestLogo from "@/assets/team-logos/nottingham-forest.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";
import leicesterLogo from "@/assets/team-logos/leicester.png";
import burnleyLogo from "@/assets/team-logos/burnley.png";
import sheffieldUnitedLogo from "@/assets/team-logos/sheffield-united.png";
// EFL Championship logos
import leedsUnitedLogo from "@/assets/team-logos/leeds-united.png";
import lutonTownLogo from "@/assets/team-logos/luton-town.png";
import middlesbroughLogo from "@/assets/team-logos/middlesbrough.png";
import norwichCityLogo from "@/assets/team-logos/norwich-city.png";
import cardiffCityLogo from "@/assets/team-logos/cardiff-city.png";
import hullCityLogo from "@/assets/team-logos/hull-city.png";
import stokeCityLogo from "@/assets/team-logos/stoke-city.png";
import coventryCityLogo from "@/assets/team-logos/coventry-city.png";
import bristolCityLogo from "@/assets/team-logos/bristol-city.png";
import queensParkRangersLogo from "@/assets/team-logos/queens-park-rangers.png";
import swanseaCityLogo from "@/assets/team-logos/swansea-city.png";
import millwallLogo from "@/assets/team-logos/millwall.png";
import prestonNorthEndLogo from "@/assets/team-logos/preston-north-end.png";
import blackburnRoversLogo from "@/assets/team-logos/blackburn-rovers.png";
import oxfordUnitedLogo from "@/assets/team-logos/oxford-united.png";
import sheffieldWednesdayLogo from "@/assets/team-logos/sheffield-wednesday.png";
import watfordLogo from "@/assets/team-logos/watford.png";
import westBromwichAlbionLogo from "@/assets/team-logos/west-bromwich-albion.png";
import plymouthArgyleLogo from "@/assets/team-logos/plymouth-argyle.png";
import sunderlandLogo from "@/assets/team-logos/sunderland.png";
import ipswichTownLogo from "@/assets/team-logos/ipswich-town.png";
// EFL League One logos
import portsmouthLogo from "@/assets/team-logos/portsmouth.png";
import derbyCountyLogo from "@/assets/team-logos/derby-county.png";
import boltonWanderersLogo from "@/assets/team-logos/bolton-wanderers.png";
import blackpoolLogo from "@/assets/team-logos/blackpool.png";
import birminghamCityLogo from "@/assets/team-logos/birmingham-city.png";
import huddersfieldTownLogo from "@/assets/team-logos/huddersfield-town.png";
import wrexhamLogo from "@/assets/team-logos/wrexham.png";
import stockportCountyLogo from "@/assets/team-logos/stockport-county.png";
import lincolnCityLogo from "@/assets/team-logos/lincoln-city.png";
import barnsleyLogo from "@/assets/team-logos/barnsley.png";
import rotherhamUnitedLogo from "@/assets/team-logos/rotherham-united.png";
import charltonAthleticLogo from "@/assets/team-logos/charlton-athletic.png";
import exeterCityLogo from "@/assets/team-logos/exeter-city.png";
import leytonOrientLogo from "@/assets/team-logos/leyton-orient.png";
import peterboroughUnitedLogo from "@/assets/team-logos/peterborough-united.png";
import wiganAthleticLogo from "@/assets/team-logos/wigan-athletic.png";
import stevenageLogo from "@/assets/team-logos/stevenage.png";
import bristolRoversLogo from "@/assets/team-logos/bristol-rovers.png";
import shrewsburyTownLogo from "@/assets/team-logos/shrewsbury-town.png";
import northamptonTownLogo from "@/assets/team-logos/northampton-town.png";
import cambridgeUnitedLogo from "@/assets/team-logos/cambridge-united.png";
import crawleyTownLogo from "@/assets/team-logos/crawley-town.png";
import burtonAlbionLogo from "@/assets/team-logos/burton-albion.png";
import readingLogo from "@/assets/team-logos/reading.png";
// EFL League Two logos
import afcWimbledonLogo from "@/assets/team-logos/afc-wimbledon.png";
import accringtonStanleyLogo from "@/assets/team-logos/accrington-stanley.png";
import barrowLogo from "@/assets/team-logos/barrow.png";
import bradfordCityLogo from "@/assets/team-logos/bradford-city.png";
import bromleyLogo from "@/assets/team-logos/bromley.png";
import cheltenhamTownLogo from "@/assets/team-logos/cheltenham-town.png";
import chesterfieldLogo from "@/assets/team-logos/chesterfield.png";
import colchesterUnitedLogo from "@/assets/team-logos/colchester-united.png";
import creweAlexandraLogo from "@/assets/team-logos/crewe-alexandra.png";
import doncasterRoversLogo from "@/assets/team-logos/doncaster-rovers.png";
import fleetwoodTownLogo from "@/assets/team-logos/fleetwood-town.png";
import gillinghamLogo from "@/assets/team-logos/gillingham.png";
import grimsbyTownLogo from "@/assets/team-logos/grimsby-town.png";
import harrogateTownLogo from "@/assets/team-logos/harrogate-town.png";
import mkDonsLogo from "@/assets/team-logos/mk-dons.png";
import morecambeLogo from "@/assets/team-logos/morecambe.png";
import newportCountyLogo from "@/assets/team-logos/newport-county.png";
import nottsCountyLogo from "@/assets/team-logos/notts-county.png";
import portValeLogo from "@/assets/team-logos/port-vale.png";
import salfordCityLogo from "@/assets/team-logos/salford-city.png";
import swindonTownLogo from "@/assets/team-logos/swindon-town.png";
import tranmereRoversLogo from "@/assets/team-logos/tranmere-rovers.png";
import walsallLogo from "@/assets/team-logos/walsall.png";
import carlisleUnitedLogo from "@/assets/team-logos/carlisle-united.png";

// Logo mapping function
const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    // Premier League
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
    'Brentford': brentfordLogo,
    'Crystal Palace': crystalPalaceLogo,
    'Everton': evertonLogo,
    'Fulham': fulhamLogo,
    'Bournemouth': bournemouthLogo,
    'Nottingham Forest': nottinghamForestLogo,
    'Wolverhampton Wanderers': wolvesLogo,
    'Leicester City': leicesterLogo,
    'Burnley': burnleyLogo,
    'Sheffield United': sheffieldUnitedLogo,
    // EFL Championship
    'Leeds United': leedsUnitedLogo,
    'Luton Town': lutonTownLogo,
    'Middlesbrough': middlesbroughLogo,
    'Norwich City': norwichCityLogo,
    'Cardiff City': cardiffCityLogo,
    'Hull City': hullCityLogo,
    'Stoke City': stokeCityLogo,
    'Coventry City': coventryCityLogo,
    'Bristol City': bristolCityLogo,
    'Queens Park Rangers': queensParkRangersLogo,
    'Swansea City': swanseaCityLogo,
    'Millwall': millwallLogo,
    'Preston North End': prestonNorthEndLogo,
    'Blackburn Rovers': blackburnRoversLogo,
    'Oxford United': oxfordUnitedLogo,
    'Sheffield Wednesday': sheffieldWednesdayLogo,
    'Watford': watfordLogo,
    'West Bromwich Albion': westBromwichAlbionLogo,
    'Plymouth Argyle': plymouthArgyleLogo,
    'Sunderland': sunderlandLogo,
    'Ipswich Town': ipswichTownLogo,
    // EFL League One
    'Portsmouth': portsmouthLogo,
    'Derby County': derbyCountyLogo,
    'Bolton Wanderers': boltonWanderersLogo,
    'Blackpool': blackpoolLogo,
    'Birmingham City': birminghamCityLogo,
    'Huddersfield Town': huddersfieldTownLogo,
    'Wrexham': wrexhamLogo,
    'Stockport County': stockportCountyLogo,
    'Lincoln City': lincolnCityLogo,
    'Barnsley': barnsleyLogo,
    'Rotherham United': rotherhamUnitedLogo,
    'Charlton Athletic': charltonAthleticLogo,
    'Exeter City': exeterCityLogo,
    'Leyton Orient': leytonOrientLogo,
    'Peterborough United': peterboroughUnitedLogo,
    'Wigan Athletic': wiganAthleticLogo,
    'Stevenage': stevenageLogo,
    'Bristol Rovers': bristolRoversLogo,
    'Shrewsbury Town': shrewsburyTownLogo,
    'Northampton Town': northamptonTownLogo,
    'Cambridge United': cambridgeUnitedLogo,
    'Crawley Town': crawleyTownLogo,
    'Burton Albion': burtonAlbionLogo,
    'Reading': readingLogo,
    // EFL League Two
    'AFC Wimbledon': afcWimbledonLogo,
    'Accrington Stanley': accringtonStanleyLogo,
    'Barrow': barrowLogo,
    'Bradford City': bradfordCityLogo,
    'Bromley': bromleyLogo,
    'Cheltenham Town': cheltenhamTownLogo,
    'Chesterfield': chesterfieldLogo,
    'Colchester United': colchesterUnitedLogo,
    'Crewe Alexandra': creweAlexandraLogo,
    'Doncaster Rovers': doncasterRoversLogo,
    'Fleetwood Town': fleetwoodTownLogo,
    'Gillingham': gillinghamLogo,
    'Grimsby Town': grimsbyTownLogo,
    'Harrogate Town': harrogateTownLogo,
    'MK Dons': mkDonsLogo,
    'Morecambe': morecambeLogo,
    'Newport County': newportCountyLogo,
    'Notts County': nottsCountyLogo,
    'Port Vale': portValeLogo,
    'Salford City': salfordCityLogo,
    'Swindon Town': swindonTownLogo,
    'Tranmere Rovers': tranmereRoversLogo,
    'Walsall': walsallLogo,
    'Carlisle United': carlisleUnitedLogo,
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