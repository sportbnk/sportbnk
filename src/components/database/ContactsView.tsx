
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, Linkedin, ArrowDown, ArrowUp, Plus, Trash, ShieldCheck, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import ListSelectionPopover from "./ListSelectionPopover";

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
  verified?: boolean;
  activeReplier?: boolean;
}

interface ContactsViewProps {
  data: Contact[];
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
  onViewTeam: (teamId: number) => void;
  onAddToList?: (contact: Contact, listId: number, listName: string) => void;
  onRemoveFromList?: (contactId: number) => void;
  isSavedList?: boolean;
}

const ContactsView = ({ 
  data = [], 
  revealedEmails = {}, 
  revealedPhones = {}, 
  onRevealEmail, 
  onRevealPhone, 
  onViewTeam,
  onAddToList,
  onRemoveFromList,
  isSavedList = false
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

  // Add a safety check to ensure data is an array
  const sortedData = Array.isArray(data) 
    ? [...data].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : [];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full table-fixed">
            <TableHeader className="bg-sportbnk-navy">
              <TableRow>
                <TableHead className="cursor-pointer text-white w-[12%]" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Contact
                    {sortField === "name" && (
                      sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-white w-[19%]" onClick={() => handleSort("position")}>
                  <div className="flex items-center gap-1">
                    Position
                    {sortField === "position" && (
                      sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-white w-[15%]" onClick={() => handleSort("team")}>
                  <div className="flex items-center gap-1">
                    Team
                    {sortField === "team" && (
                      sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell text-white w-[10%]" onClick={() => handleSort("sport")}>
                  <div className="flex items-center gap-1">
                    Sport
                    {sortField === "sport" && (
                      sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-white w-[16%]">Email</TableHead>
                <TableHead className="hidden md:table-cell text-white w-[15%]">Phone</TableHead>
                <TableHead className="hidden md:table-cell text-white w-[7%]">LinkedIn</TableHead>
                <TableHead className="text-white w-[6%]">
                  {isSavedList ? "Remove" : "Add to List"}
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    {isSavedList ? "Your list is empty. Add contacts to create your export list." : "No results found. Try adjusting your filters."}
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="whitespace-nowrap">
                      <div className="font-medium flex items-center gap-1 text-sm">
                        {contact.name}
                        {contact.activeReplier && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Flame className="h-4 w-4 text-orange-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Active replier - high response rate</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap pr-1">{contact.position}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => onViewTeam(contact.teamId)}>
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={contact.teamLogo} alt={contact.team} />
                          <AvatarFallback>{contact.team.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-blue-600 hover:underline">{contact.team}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{contact.sport}</TableCell>
                    <TableCell>
                      {revealedEmails[contact.email] ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-mono overflow-hidden text-ellipsis">{contact.email.replace(/\*/g, (match, offset) => contact.email.split('@')[0][offset])}</span>
                          {contact.verified && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <ShieldCheck className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Verified email address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRevealEmail(contact.email)}
                            className="h-6 text-xs px-2"
                          >
                            Reveal (2)
                          </Button>
                          {contact.verified && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <ShieldCheck className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Verified email address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {contact.phone ? (
                        revealedPhones[contact.phone] ? (
                          <span className="text-xs font-mono">{contact.phone}</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onRevealPhone(contact.phone!)}
                              className="h-6 text-xs px-2"
                            >
                              Reveal (3)
                            </Button>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">Not available</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {contact.linkedin ? (
                        <a 
                          href={contact.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-blue-700 hover:underline"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {isSavedList ? (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onRemoveFromList && onRemoveFromList(contact.id)}
                          className="text-red-500 hover:text-red-700 p-0 h-auto"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      ) : (
                        onAddToList ? (
                          <ListSelectionPopover 
                            contact={contact}
                            onAddToList={onAddToList}
                          />
                        ) : (
                          <Link to="/crm/lists">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-sportbnk-green hover:text-sportbnk-green/90 p-0 h-auto"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </Link>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsView;
