
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, Linkedin, ShieldCheck, Flame, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ListSelectionPopover from "./ListSelectionPopover";
import { toast } from "sonner";

interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
  verified?: boolean;
  activeReplier?: boolean;
}

interface TeamEmployee {
  id: number;
  team: string;
  teamLogo: string;
  employees: Employee[];
}

interface TeamEmployeesProps {
  selectedTeam: TeamEmployee | null;
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
  onCloseEmployees?: () => void;
}

const TeamEmployees = ({
  selectedTeam,
  revealedEmails,
  revealedPhones,
  onRevealEmail,
  onRevealPhone,
  onCloseEmployees
}: TeamEmployeesProps) => {
  if (!selectedTeam) {
    return null;
  }

  const handleAddToList = (employee: Employee, listId: string, listName: string) => {
    toast.success(`Added ${employee.name} to ${listName}`, {
      description: "You can manage all your lists in the Lists section"
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden md:table-cell">LinkedIn</TableHead>
            <TableHead className="w-16 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!selectedTeam.employees || selectedTeam.employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                No employee data available for this team.
              </TableCell>
            </TableRow>
          ) : (
            selectedTeam.employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="font-medium flex items-center gap-1 text-sm">
                    {employee.name}
                    {employee.activeReplier && (
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
                <TableCell className="text-sm">{employee.position}</TableCell>
                <TableCell>
                  {employee.email ? (
                    revealedEmails[employee.email] ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono overflow-hidden text-ellipsis">{employee.email}</span>
                        {employee.verified && (
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
                          onClick={() => onRevealEmail(employee.email)}
                          className="h-6 text-xs px-2"
                        >
                          Reveal (2)
                        </Button>
                        {employee.verified && (
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
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground">Not available</span>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {employee.phone ? (
                    revealedPhones[employee.phone] ? (
                      <span className="text-xs font-mono">{employee.phone}</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onRevealPhone(employee.phone!)}
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
                  {employee.linkedin ? (
                    <a 
                      href={employee.linkedin} 
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
                <TableCell className="text-right">
                  <ListSelectionPopover
                    onAddToList={(_, listId, listName) => handleAddToList(employee, listId, listName)}
                    contact={employee}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamEmployees;
