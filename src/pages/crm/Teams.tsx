import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Building2, MapPin, Users, Globe, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Team, Sport, Country, City } from "@/types/teams";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterTeams();
  }, [teams, searchQuery, selectedSport, selectedCountry, selectedCity]);

  const fetchData = async () => {
    try {
      // Fetch teams with related data
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          sport:sports(*),
          city:cities(*),
          country:countries(*)
        `)
        .order('name');

      if (teamsError) throw teamsError;

      // Fetch filter options
      const [sportsResult, countriesResult, citiesResult] = await Promise.all([
        supabase.from('sports').select('*').order('name'),
        supabase.from('countries').select('*').order('name'),
        supabase.from('cities').select('*').order('name')
      ]);

      setTeams(teamsData || []);
      setSports(sportsResult.data || []);
      setCountries(countriesResult.data || []);
      setCities(citiesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTeams = () => {
    let filtered = teams;

    if (searchQuery) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.league?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.division?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSport) {
      filtered = filtered.filter(team => team.sport_id === selectedSport);
    }

    if (selectedCountry) {
      filtered = filtered.filter(team => team.country_id === selectedCountry);
    }

    if (selectedCity) {
      filtered = filtered.filter(team => team.city_id === selectedCity);
    }

    setFilteredTeams(filtered);
  };

  const handleTeamClick = (teamId: string) => {
    navigate(`/crm/teams/${teamId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4 pt-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teams</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger>
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Sports</SelectItem>
            {sports.map((sport) => (
              <SelectItem key={sport.id} value={sport.id}>
                {sport.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("");
            setSelectedSport("");
            setSelectedCountry("");
            setSelectedCity("");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card 
            key={team.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleTeamClick(team.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {team.name}
                  </CardTitle>
                  {team.sport && (
                    <Badge variant="secondary" className="mt-2">
                      {team.sport.name}
                    </Badge>
                  )}
                </div>
                {team.logo_url && (
                  <img 
                    src={team.logo_url} 
                    alt={`${team.name} logo`}
                    className="w-12 h-12 object-contain rounded"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.league && (
                  <div className="text-sm text-muted-foreground">
                    <strong>League:</strong> {team.league}
                    {team.division && ` (${team.division})`}
                  </div>
                )}
                
                {(team.city || team.country) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {team.city?.name}
                    {team.city?.name && team.country?.name && ', '}
                    {team.country?.name}
                  </div>
                )}

                {team.founded_year && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Founded:</strong> {team.founded_year}
                  </div>
                )}

                {team.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={team.website.startsWith('http') ? team.website : `https://${team.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-1 inline" />
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  View Details
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search criteria or clear the filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Teams;