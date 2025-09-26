import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Users, Mail, Phone, Building2, Plus, Filter, Download } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  position: string;
  organization: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  lastContact: Date;
  source: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Commercial Director",
    organization: "Arsenal",
    department: "Commercial",
    email: "s.johnson@arsenal.com",
    phone: "+44 20 7619 5003",
    location: "London, UK",
    lastContact: new Date("2024-09-20"),
    source: "LinkedIn"
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Head of Marketing",
    organization: "Manchester United",
    department: "Marketing",
    email: "m.chen@manutd.com",
    phone: "+44 161 868 8000",
    location: "Manchester, UK",
    lastContact: new Date("2024-09-18"),
    source: "Website"
  },
  {
    id: "3",
    name: "Emma Williams",
    position: "Technology Director",
    organization: "Liverpool",
    department: "Technology",
    email: "e.williams@liverpoolfc.com",
    phone: "+44 151 263 2361",
    location: "Liverpool, UK",
    lastContact: new Date("2024-09-15"),
    source: "Conference"
  },
  {
    id: "4",
    name: "James Rodriguez",
    position: "Partnership Manager",
    organization: "Chelsea",
    department: "Partnerships",
    email: "j.rodriguez@chelseafc.com",
    phone: "+44 20 7385 5545",
    location: "London, UK",
    lastContact: new Date("2024-09-12"),
    source: "Referral"
  },
  {
    id: "5",
    name: "Sophie Taylor",
    position: "Digital Innovation Lead",
    organization: "Tottenham Hotspur",
    department: "Innovation",
    email: "s.taylor@tottenhamhotspur.com",
    phone: "+44 20 8365 5000",
    location: "London, UK",
    lastContact: new Date("2024-09-10"),
    source: "Event"
  }
];

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("all");

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || contact.department === selectedDepartment;
    const matchesOrganization = selectedOrganization === "all" || contact.organization === selectedOrganization;
    
    return matchesSearch && matchesDepartment && matchesOrganization;
  });

  const departments = Array.from(new Set(mockContacts.map(contact => contact.department)));
  const organizations = Array.from(new Set(mockContacts.map(contact => contact.organization)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground">Manage your professional contacts in sports industry</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContacts.length}</div>
            <p className="text-xs text-muted-foreground">Active contacts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">Unique organizations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Different departments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contacts ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{contact.organization}</Badge>
                  </TableCell>
                  <TableCell>{contact.department}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {contact.lastContact.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{contact.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Email
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsList;