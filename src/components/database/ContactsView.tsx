
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Plus, UserPlus, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ListSelectionPopover from "./ListSelectionPopover";

interface ContactsViewProps {
  data: any[];
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
  onViewTeam: (teamId: number) => void;
  onAddToList: (contact: any, listId: number, listName: string) => void;
  onRemoveFromList: (contactId: number) => void;
}

const ContactsView = ({
  data,
  revealedEmails,
  revealedPhones,
  onRevealEmail,
  onRevealPhone,
  onViewTeam,
  onAddToList,
  onRemoveFromList
}: ContactsViewProps) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <div className="flex items-start gap-1">
                    <span className="break-words">{contact.name}</span>
                    <div className="flex gap-1">
                      {contact.verified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified contact</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      
                      {contact.activeReplier && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <MessageSquare className="h-4 w-4 text-green-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Active replier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  {contact.linkedin && (
                    <a 
                      href={contact.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[120px]">
                  <span className="whitespace-normal break-words">{contact.position}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {contact.teamLogo && (
                    <img 
                      src={contact.teamLogo} 
                      alt={`${contact.team} logo`} 
                      className="w-6 h-6 object-contain rounded"
                    />
                  )}
                  <div className="max-w-[100px]">
                    <span className="whitespace-normal break-words">{contact.team}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {contact.email ? (
                  revealedEmails[contact.email] ? (
                    <span className="text-gray-600">{contact.email}</span>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onRevealEmail(contact.email)}
                      className="text-xs h-7"
                    >
                      <Eye className="h-3 w-3 mr-1" /> {contact.email}
                    </Button>
                  )
                ) : (
                  <span className="text-gray-400 italic text-xs">Not available</span>
                )}
              </TableCell>
              <TableCell>
                {contact.phone ? (
                  revealedPhones[contact.phone] ? (
                    <span className="text-gray-600">{contact.phone}</span>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onRevealPhone(contact.phone)}
                      className="text-xs h-7"
                    >
                      <Eye className="h-3 w-3 mr-1" /> {contact.phone}
                    </Button>
                  )
                ) : (
                  <span className="text-gray-400 italic text-xs">Not available</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewTeam(contact.teamId)}
                    className="h-8 w-8"
                  >
                    <UserPlus className="h-4 w-4 text-gray-500" />
                  </Button>
                  <ListSelectionPopover 
                    contact={contact}
                    onAddToList={onAddToList}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {data.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No contacts found matching your filters.
        </div>
      )}
    </div>
  );
};

export default ContactsView;
