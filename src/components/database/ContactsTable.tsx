import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TeamProfile from "./TeamProfile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TeamData } from "@/types/teams";
import ListSelectionPopover from "./ListSelectionPopover";

interface ContactsTableProps {
  data: TeamData[];
  useCredits: (amount: number) => void;
  onTeamSelect?: (teamId: number) => void;
}

const ContactsTable = ({ data, useCredits, onTeamSelect }: ContactsTableProps) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof TeamData>("team");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSort = (field: keyof TeamData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    }
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue}`;
  };

  const handleViewProfile = (team: TeamData) => {
    setSelectedTeam(team);
    setProfileOpen(true);
  };
  
  const handleTeamClick = (team: TeamData) => {
    navigate(`/crm/teams/${team.id}`);
  };

  const handleViewOrganization = (team: TeamData) => {
    navigate(`/crm/teams/${team.id}`);
  };

  const handleAddToList = (team: TeamData, listId: string, listName: string) => {
    toast.success(`${team.team} added to list "${listName}"`);
  };

  const revealEmail = (email: string) => {
    if (revealedEmails[email]) return;
    
    useCredits(2);
    
    setRevealedEmails({
      ...revealedEmails,
      [email]: true
    });
  };
  
  const revealPhone = (phone: string) => {
    if (revealedPhones[phone]) return;
    
    useCredits(3);
    
    setRevealedPhones({
      ...revealedPhones,
      [phone]: true
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>
                <div className="flex items-center gap-1">
                  Organisation
                  {sortField === "team" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("sport")}>
                <div className="flex items-center gap-1">
                  Sport
                  {sortField === "sport" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("level")}>
                <div className="flex items-center gap-1">
                  Level
                  {sortField === "level" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("city")}>
                <div className="flex items-center gap-1">
                  City
                  {sortField === "city" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("country")}>
                <div className="flex items-center gap-1">
                  Country
                  {sortField === "country" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("revenue")}>
                <div className="flex items-center gap-1">
                  Revenue
                  {sortField === "revenue" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("employees")}>
                <div className="flex items-center gap-1">
                  Employees
                  {sortField === "employees" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  No results found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {team.logo && (
                        <img 
                          src={team.logo} 
                          alt={`${team.team} logo`}
                          className="w-8 h-8 object-contain rounded-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span 
                        className="font-medium text-blue-600 hover:underline cursor-pointer"
                        onClick={() => handleTeamClick(team)}
                      >
                        {team.team}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{team.sport}</TableCell>
                  <TableCell>{team.level}</TableCell>
                  <TableCell>{team.city}</TableCell>
                  <TableCell>{team.country}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatRevenue(team.revenue)}</TableCell>
                  <TableCell className="hidden md:table-cell">{team.employees}</TableCell>
                  <TableCell className="text-right">
                    <ListSelectionPopover
                      onAddToList={(contact, listId, listName) => handleAddToList(team, listId, listName)}
                      contact={team}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <TeamProfile 
        team={selectedTeam} 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
        revealedEmails={revealedEmails}
        revealedPhones={revealedPhones}
        onRevealEmail={revealEmail}
        onRevealPhone={revealPhone}
      />
    </Card>
  );
};

export default ContactsTable;
