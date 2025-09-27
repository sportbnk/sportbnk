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

// Logo mapping function (simplified for demo)
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
      setSports((sportsResponse.data || []).filter(sport => sport.name.toLowerCase() !== 'rugby'));
      setCountries((countriesResponse.data || []).filter(country => !country.name.toLowerCase().includes('multi')));
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

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(team => team.level === selectedLevel);
    }

    setFilteredTeams(filtered);
  }, [teams, searchQuery, selectedSport, selectedCountry, selectedCity, selectedLevel]);
  
  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedSport, selectedCountry, selectedCity, selectedLevel]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSelectedCountry('all');
    setSelectedCity('all');
    setSelectedLevel('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedSport !== 'all' || 
                           selectedCountry !== 'all' || selectedCity !== 'all' || 
                           selectedLevel !== 'all';

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
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
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
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-background border-border h-8 text-xs">
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
                Showing {startIndex + 1}-{Math.min(endIndex, filteredTeams.length)} of {filteredTeams.length} organisations
                {totalPages > 1 && (
                  <span className="block mt-1">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
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
                {paginatedTeams.length === 0 ? (
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
                  paginatedTeams.map((team) => (
                    <TableRow 
                      key={team.id} 
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {team.sport?.name ? (
                          <Badge variant="secondary" className="font-medium">
                            {team.sport.name}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {team.level || 'Professional'}
                        </Badge>
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
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to list functionality
                            }}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext 
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;