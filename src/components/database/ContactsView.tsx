
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
import { Eye, ArrowDown, ArrowUp, Mail, Phone, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Contact {
  id: number;
  name: string;
  position: string;
  team: string;
  teamId: number;
  sport: string;
  email: string;
  phone?: string;
  linkedin?: string;
  teamLogo: string;
}

interface ContactsViewProps {
  data: Contact[];
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
  onViewTeam: (teamId: number) => void;
}

const ContactsView = ({ 
  data, 
  revealedEmails, 
  revealedPhones, 
  onRevealEmail, 
  onRevealPhone, 
  onViewTeam 
}: ContactsViewProps) => {
  const [sortField, setSortField] = useState<keyof Contact>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Contact) => {
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

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1">
                  Contact
                  {sortField === "name" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("position")}>
                <div className="flex items-center gap-1">
                  Position
                  {sortField === "position" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>
                <div className="flex items-center gap-1">
                  Team
                  {sortField === "team" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("sport")}>
                <div className="flex items-center gap-1">
                  Sport
                  {sortField === "sport" && (
                    sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">LinkedIn</TableHead>
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
              sortedData.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="font-medium">{contact.name}</div>
                  </TableCell>
                  <TableCell>{contact.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewTeam(contact.teamId)}>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={contact.teamLogo} alt={contact.team} />
                        <AvatarFallback>{contact.team.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-blue-600 hover:underline">{contact.team}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{contact.sport}</TableCell>
                  <TableCell>
                    {revealedEmails[contact.email] ? (
                      <span className="text-sm font-mono">{contact.email.replace(/\*/g, (match, offset) => contact.email.split('@')[0][offset])}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onRevealEmail(contact.email)}
                          className="h-7 text-xs"
                        >
                          Reveal (2 credits)
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {contact.phone ? (
                      revealedPhones[contact.phone] ? (
                        <span className="text-sm font-mono">{contact.phone}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRevealPhone(contact.phone!)}
                            className="h-7 text-xs"
                          >
                            Reveal (3 credits)
                          </Button>
                        </div>
                      )
                    ) : (
                      <span className="text-muted-foreground">Not available</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {contact.linkedin ? (
                      <a 
                        href={contact.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-blue-700 hover:underline"
                      >
                        <Linkedin className="h-4 w-4" /> Profile
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not available</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewTeam(contact.teamId)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContactsView;
