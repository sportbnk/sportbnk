import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ListSelectionPopover from "@/components/database/ListSelectionPopover";

interface TeamEmployeesProps {
  teamId: string;
}

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  role?: string;
  avatar_url?: string;
}

const TeamEmployees = ({ teamId }: TeamEmployeesProps) => {
  const { toast } = useToast();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["team-employees", teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("team_id", teamId);

      if (error) {
        console.error("Error fetching team employees:", error);
        throw error;
      }

      return data as Contact[];
    },
  });

  const handleRevealContact = async (
    contactId: string,
    field: "email" | "phone" | "linkedin"
  ) => {
    try {
      // This would normally involve credit checking and user authentication
      toast({
        title: "Contact Revealed",
        description: `${field} details revealed for this contact.`,
      });
    } catch (error) {
      console.error("Error revealing contact:", error);
      toast({
        title: "Error",
        description: "Failed to reveal contact details",
        variant: "destructive",
      });
    }
  };

  const handleAddToList = (contact: any, listId: string, listName: string) => {
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to ${listName}`,
    });
  };

  if (isLoading) {
    return <p>Loading employees...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Employees</CardTitle>
        <CardDescription>
          A list of all employees currently assigned to this team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>LinkedIn</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={employee.avatar_url} />
                      <AvatarFallback>{employee.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{employee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{employee.role || "-"}</TableCell>
                <TableCell>
                  {employee.email ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevealContact(employee.id, "email")}
                      className="flex items-center space-x-1"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{employee.email}</span>
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {employee.phone ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevealContact(employee.id, "phone")}
                      className="flex items-center space-x-1"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{employee.phone}</span>
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {employee.linkedin ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevealContact(employee.id, "linkedin")}
                      className="flex items-center space-x-1"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">View Profile</span>
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <ListSelectionPopover
                    contact={{
                      id: employee.id,
                      name: employee.name,
                      email: employee.email,
                      phone: employee.phone,
                      position: employee.role,
                      team: "", // Team name not directly available here
                      teamId: teamId,
                      linkedin: employee.linkedin,
                      verified: false,
                      activeReplier: false,
                    }}
                    onAddToList={handleAddToList}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeamEmployees;
