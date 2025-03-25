
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
import { Eye, MessageSquare, Plus, UserPlus, CheckCircle, Trash } from "lucide-react";
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
  isSavedList?: boolean;
}

const ContactsView = ({
  data,
  revealedEmails,
  revealedPhones,
  onRevealEmail,
  onRevealPhone,
  onViewTeam,
  onAddToList,
  onRemoveFromList,
  isSavedList = false
}: ContactsViewProps) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[180px] min-w-[180px]">Name</TableHead>
            <TableHead className="w-[150px] min-w-[150px]">Position</TableHead>
            <TableHead className="w-[140px] min-w-[140px]">Team</TableHead>
            <TableHead className="w-[140px] min-w-[140px]">Email</TableHead>
            <TableHead className="w-[140px] min-w-[140px]">Phone</TableHead>
            <TableHead className="text-right w-[100px] min-w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col max-w-[180px]">
                  <div className="flex items-start gap-1 flex-wrap">
                    <span className="break-words inline-block">{contact.name}</span>
                    <div className="flex gap-1 flex-nowrap shrink-0">
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
                      className="text-xs text-blue-600 hover:underline truncate"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[150px]">
                  <span className="whitespace-normal break-words text-sm">{contact.position}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 max-w-[140px]">
                  {contact.teamLogo && (
                    <img 
                      src={contact.teamLogo} 
                      alt={`${contact.team} logo`} 
                      className="w-6 h-6 object-contain rounded shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="whitespace-normal break-words text-sm">{contact.team}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[140px]">
                  {contact.email ? (
                    revealedEmails[contact.email] ? (
                      <span className="text-gray-600 break-words text-sm">{contact.email}</span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRevealEmail(contact.email)}
                        className="text-xs h-7 w-full text-left justify-start overflow-hidden"
                      >
                        <Eye className="h-3 w-3 mr-1 shrink-0" /> 
                        <span className="truncate">{contact.email}</span>
                      </Button>
                    )
                  ) : (
                    <span className="text-gray-400 italic text-xs">Not available</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[140px]">
                  {contact.phone ? (
                    revealedPhones[contact.phone] ? (
                      <span className="text-gray-600 break-words text-sm">{contact.phone}</span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRevealPhone(contact.phone)}
                        className="text-xs h-7 w-full text-left justify-start overflow-hidden"
                      >
                        <Eye className="h-3 w-3 mr-1 shrink-0" /> 
                        <span className="truncate">{contact.phone}</span>
                      </Button>
                    )
                  ) : (
                    <span className="text-gray-400 italic text-xs">Not available</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {!isSavedList ? (
                    <>
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
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFromList(contact.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
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
