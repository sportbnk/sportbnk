
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, ArrowDown, ArrowUp, Download, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import TeamProfile from "./TeamProfile";

interface Contact {
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

interface TeamData {
  id: number;
  team: string;
  sport: string;
  level: string;
  city: string;
  country: string;
  revenue: number;
  employees: number;
  contacts: Contact[];
  logo: string;
  description: string;
  founded: number;
  website: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface ContactsTableProps {
  data: TeamData[];
  useCredits: (amount: number) => void;
}

const ContactsTable = ({ data, useCredits }: ContactsTableProps) => {
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

  const handleViewContacts = (team: TeamData) => {
    setSelectedTeam(team);
  };

  const handleViewProfile = (team: TeamData) => {
    setSelectedTeam(team);
    setProfileOpen(true);
  };

  const revealEmail = (email: string) => {
    // Check if already revealed
    if (revealedEmails[email]) return;
    
    // Use 2 credits per email reveal
    useCredits(2);
    
    setRevealedEmails({
      ...revealedEmails,
      [email]: true
    });
    
    toast.success("Email revealed! 2 credits used.");
  };
  
  const revealPhone = (phone: string) => {
    // Check if already revealed
    if (revealedPhones[phone]) return;
    
    // Use 3 credits per phone reveal
    useCredits(3);
    
    setRevealedPhones({
      ...revealedPhones,
      [phone]: true
    });
    
    toast.success("Phone number revealed! 3 credits used.");
  };

  const exportCSV = () => {
    toast.success("Contact data exported! 5 credits used.");
    useCredits(5);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>
                <div className="flex items-center gap-1">
                  Team
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
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("city")}>
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
              <TableHead>Actions</TableHead>
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
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleViewProfile(team)}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={team.logo} alt={team.team} />
                        <AvatarFallback>{team.team.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-blue-600 hover:underline">{team.team}</span>
                    </div>
                  </TableCell>
                  <TableCell>{team.sport}</TableCell>
                  <TableCell>{team.level}</TableCell>
                  <TableCell className="hidden md:table-cell">{team.city}</TableCell>
                  <TableCell>{team.country}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatRevenue(team.revenue)}</TableCell>
                  <TableCell className="hidden md:table-cell">{team.employees}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewProfile(team)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewContacts(team)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Contacts at {team.team}</DialogTitle>
                            <DialogDescription>
                              Key decision makers and contacts
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {team.contacts.map((contact, index) => (
                              <div key={index} className="border rounded-md p-4">
                                <h4 className="font-semibold">{contact.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{contact.position}</p>
                                {revealedEmails[contact.email] ? (
                                  <p className="text-sm font-mono bg-muted p-1 rounded">{contact.email.replace(/\*/g, (match, offset) => contact.email.split('@')[0][offset])}</p>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-mono bg-muted p-1 rounded">{contact.email}</p>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => revealEmail(contact.email)}
                                    >
                                      Reveal (2 credits)
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))}
                            <Button 
                              className="w-full mt-2" 
                              variant="default"
                              onClick={exportCSV}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Export to CSV (5 credits)
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
