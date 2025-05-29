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
import { Eye, MessageSquare, Plus, UserPlus, CheckCircle, Trash, Mail, Phone, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ListSelectionPopover from "./ListSelectionPopover";

interface ContactsViewProps {
  data: any[];
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  revealedLinkedins?: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
  onRevealLinkedin?: (linkedin: string) => void;
  onViewTeam: (teamId: number) => void;
  onAddToList: (contact: any, listId: string, listName: string) => void;
  onRemoveFromList?: (contactId: string) => void;
  isSavedList?: boolean;
}

const ContactsView = ({
  data,
  revealedEmails,
  revealedPhones,
  revealedLinkedins = {},
  onRevealEmail,
  onRevealPhone,
  onRevealLinkedin = () => {},
  onViewTeam,
  onAddToList,
  onRemoveFromList = () => {},
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
            <TableHead className="w-[140px] min-w-[140px]">LinkedIn</TableHead>
            <TableHead className="text-right w-[100px] min-w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => {
            // Debug logging for credits
            console.log('Contact:', contact.name, {
              email_credits_consumed: contact.email_credits_consumed,
              phone_credits_consumed: contact.phone_credits_consumed,
              linkedin_credits_consumed: contact.linkedin_credits_consumed
            });
            
            return (
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
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[150px]">
                    <span className="whitespace-normal break-words text-sm">{contact.position}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[140px]">
                    <span className="whitespace-normal break-words text-sm">{contact.team}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[140px]">
                    {contact.email ? (
                      (contact.email_credits_consumed === 0) ? (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs font-mono overflow-hidden text-ellipsis">{contact.email}</span>
                        </div>
                      ) : revealedEmails[contact.email] ? (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs font-mono overflow-hidden text-ellipsis">{contact.email}</span>
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
                            Reveal ({contact.email_credits_consumed || 1})
                          </Button>
                        </div>
                      )
                    ) : (
                      <span className="text-gray-400 italic text-xs">Not available</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[140px]">
                    {contact.phone ? (
                      (contact.phone_credits_consumed === 0) ? (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs font-mono">{contact.phone}</span>
                        </div>
                      ) : revealedPhones[contact.phone] ? (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs font-mono">{contact.phone}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRevealPhone(contact.phone)}
                            className="h-6 text-xs px-2"
                          >
                            Reveal ({contact.phone_credits_consumed || 2})
                          </Button>
                        </div>
                      )
                    ) : (
                      <span className="text-gray-400 italic text-xs">Not available</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[140px]">
                    {contact.linkedin ? (
                      (contact.linkedin_credits_consumed === 0) ? (
                        <a 
                          href={contact.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-blue-700 hover:underline"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      ) : revealedLinkedins[contact.linkedin] ? (
                        <a 
                          href={contact.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-blue-700 hover:underline"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Linkedin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onRevealLinkedin(contact.linkedin)}
                            className="h-6 text-xs px-2"
                          >
                            Reveal ({contact.linkedin_credits_consumed || 0})
                          </Button>
                        </div>
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
            );
          })}
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
