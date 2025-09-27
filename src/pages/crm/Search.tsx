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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Building2, 
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
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import brentfordLogo from "@/assets/team-logos/brentford.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import newcastleLogo from "@/assets/team-logos/newcastle-united.png";
import nottinghamLogo from "@/assets/team-logos/nottingham-forest.png";
import westHamLogo from "@/assets/team-logos/west-ham.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import burnleyLogo from "@/assets/team-logos/burnley.png";
import lutonLogo from "@/assets/team-logos/luton-town.png";
import sheffieldLogo from "@/assets/team-logos/sheffield-united.png";

// Logo mapping function
const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal': arsenalLogo,
    'Chelsea': chelseaLogo,
    'Liverpool': liverpoolLogo,
    'Manchester United': manchesterUnitedLogo,
    'Manchester City': manchesterCityLogo,
    'Tottenham Hotspur': tottenhamLogo,
    'Aston Villa': astonVillaLogo,
    'Brentford': brentfordLogo,
    'Brighton & Hove Albion': brightonLogo,
    'Crystal Palace': crystalPalaceLogo,
    'Everton': evertonLogo,
    'Fulham': fulhamLogo,
    'Newcastle United': newcastleLogo,
    'Nottingham Forest': nottinghamLogo,
    'West Ham United': westHamLogo,
    'Wolverhampton Wanderers': wolvesLogo,
    'AFC Bournemouth': bournemouthLogo,
    'Burnley': burnleyLogo,
    'Luton Town': lutonLogo,
    'Sheffield United': sheffieldLogo,
  };
  
  return logoMap[teamName] || null;
};

const Discover = () => {
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
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 50;

  // Get unique levels from teams
  const levels = [...new Set(teams.map(team => team.level).filter(Boolean))];
  
  // Calculate pagination values
  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: teamsData, error: teamsError } = await supabase
          .from('teams')
          .select('*');
        if (teamsError) {
          throw teamsError;
        }
        setTeams(teamsData || []);
        setFilteredTeams(teamsData || []);

        const { data: sportsData, error: sportsError } = await supabase
          .from('sports')
          .select('*');
        if (sportsError) {
          throw sportsError;
        }
        setSports(sportsData || []);

        const { data: countriesData, error: countriesError } = await supabase
          .from('countries')
          .select('*');
        if (countriesError) {
          throw countriesError;
        }
        setCountries(countriesData || []);

        const { data: citiesData, error: citiesError } = await supabase
          .from('cities')
          .select('*');
        if (citiesError) {
          throw citiesError;
        }
        setCities(citiesData || []);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter teams
  useEffect(() => {
    let newFilteredTeams = [...teams];

    if (searchQuery) {
      newFilteredTeams = newFilteredTeams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSport !== 'all') {
      newFilteredTeams = newFilteredTeams.filter(team => team.sport_id === parseInt(selectedSport));
    }

    if (selectedCountry !== 'all') {
      newFilteredTeams = newFilteredTeams.filter(team => team.country_id === parseInt(selectedCountry));
    }

    if (selectedCity !== 'all') {
      newFilteredTeams = newFilteredTeams.filter(team => team.city_id === parseInt(selectedCity));
    }

    if (selectedLevel !== 'all' && selectedLevel) {
      newFilteredTeams = newFilteredTeams.filter(team => team.level === selectedLevel);
    }

    setFilteredTeams(newFilteredTeams);
    setCurrentPage(1); // Reset to first page when filters change
  }, [teams, searchQuery, selectedSport, selectedCountry, selectedCity, selectedLevel]);

  return (
    <div className="flex gap-4 h-full">
      {/* Left Sidebar - Filters */}
      <div className="w-64 flex-shrink-0">
        <Card className="shadow-sm border-border sticky top-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Filter className="h-4 w-4 text-primary" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  {sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id.toString()}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                setSearchQuery('');
                setSelectedSport('all');
                setSelectedCountry('all');
                setSelectedCity('all');
                setSelectedLevel('all');
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Discover</h1>
            <p className="text-muted-foreground text-sm">
              Discover and explore sports organizations in your database
            </p>
          </div>
          <Button size="sm" className="shadow-sm h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add to List
          </Button>
        </div>

        {/* Results Table */}
        <Card className="shadow-sm border-border">
          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Organisation</TableHead>
                  <TableHead className="font-semibold">Sport</TableHead>
                  <TableHead className="font-semibold">Level</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Skeleton loading state
                  [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-[200px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-[80px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedTeams.length > 0 ? (
                  // Actual data rows
                  paginatedTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getTeamLogo(team.name) && (
                            <img
                              src={getTeamLogo(team.name)}
                              alt={`${team.name} Logo`}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          {team.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {sports.find((sport) => sport.id === team.sport_id)?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{team.level || 'N/A'}</TableCell>
                      <TableCell>
                        {countries.find((country) => country.id === team.country_id)?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {cities.find((city) => city.id === team.city_id)?.name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => navigate(`/crm/teams/${team.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // No results found
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No teams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Discover;
