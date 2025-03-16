
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactsView from "@/components/database/ContactsView";
import { Download, Trash } from "lucide-react";
import { toast } from "sonner";

// Dummy data for saved contacts
const dummyContacts = [
  {
    id: 1,
    name: "John Smith",
    position: "Marketing Director",
    team: "Manchester United",
    teamId: 1,
    sport: "Football",
    email: "j.s******@manutd.com",
    phone: "+44 77** *** ***",
    linkedin: "https://linkedin.com/in/johnsmith",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    verified: true,
    activeReplier: true
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Operations Director",
    team: "LA Lakers",
    teamId: 2,
    sport: "Basketball",
    email: "m.j******@lakers.com",
    phone: "+1 31*-***-****",
    linkedin: "https://linkedin.com/in/michaeljohnson",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    verified: true
  },
  {
    id: 8,
    name: "James Miller",
    position: "Sponsorship Director",
    team: "Real Madrid",
    teamId: 3,
    sport: "Football",
    email: "j.m*****@realmadrid.es",
    linkedin: "https://linkedin.com/in/jamesmiller",
    teamLogo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    verified: true,
    activeReplier: true
  }
];

// Dummy user lists structure
const dummyLists = [
  { id: 1, name: "My Contacts", contacts: dummyContacts },
  { id: 2, name: "Marketing Leads", contacts: [dummyContacts[0], dummyContacts[2]] },
  { id: 3, name: "Key Decision Makers", contacts: [dummyContacts[1]] }
];

const Lists = () => {
  const [lists, setLists] = useState(dummyLists);
  const [activeList, setActiveList] = useState(lists[0]);
  const [newListName, setNewListName] = useState("");
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  
  const createNewList = () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }
    
    const newList = {
      id: lists.length + 1,
      name: newListName,
      contacts: []
    };
    
    setLists([...lists, newList]);
    setActiveList(newList);
    setNewListName("");
    toast.success(`List "${newListName}" created`);
  };
  
  const deleteList = (listId: number) => {
    if (lists.length === 1) {
      toast.error("Cannot delete the only list");
      return;
    }
    
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
    
    if (activeList.id === listId) {
      setActiveList(updatedLists[0]);
    }
    
    toast.success("List deleted");
  };
  
  const removeContact = (contactId: number) => {
    const updatedList = {
      ...activeList,
      contacts: activeList.contacts.filter(contact => contact.id !== contactId)
    };
    
    setActiveList(updatedList);
    setLists(lists.map(list => list.id === activeList.id ? updatedList : list));
    toast.success("Contact removed from list");
  };
  
  const exportToCSV = () => {
    // Prepare data
    const header = [
      "Name",
      "Position",
      "Team",
      "Sport",
      "Email",
      "Phone",
      "LinkedIn"
    ].join(",");
    
    const rows = activeList.contacts.map(contact => {
      // For a real export, you would use the revealed data if available
      const email = revealedEmails[contact.email] 
        ? contact.email.replace(/\*/g, (match, offset) => contact.email.split('@')[0][offset])
        : contact.email;
        
      const phone = contact.phone && revealedPhones[contact.phone]
        ? contact.phone
        : (contact.phone || "N/A");
        
      return [
        contact.name,
        contact.position,
        contact.team,
        contact.sport,
        email,
        phone,
        contact.linkedin || "N/A"
      ].join(",");
    }).join("\n");
    
    // Create CSV content and download
    const csvContent = `${header}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeList.name}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${activeList.name} as CSV`);
  };
  
  const revealEmail = (email: string) => {
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };
  
  const revealPhone = (phone: string) => {
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };
  
  const viewTeam = (teamId: number) => {
    console.log("View team:", teamId);
  };
  
  return (
    <div className="container max-w-full px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sportbnk-navy">My Lists</h1>
        <Button 
          onClick={exportToCSV} 
          disabled={activeList.contacts.length === 0}
          className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 flex items-center gap-1"
        >
          <Download className="h-4 w-4" /> Export to CSV
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">My Lists</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex gap-2 items-center mb-4">
                <Input 
                  placeholder="New list name" 
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="text-sm"
                />
                <Button onClick={createNewList} size="sm" className="whitespace-nowrap bg-sportbnk-navy hover:bg-sportbnk-navy/90">
                  Create
                </Button>
              </div>
              
              <div className="space-y-1">
                {lists.map(list => (
                  <div 
                    key={list.id} 
                    className={`flex justify-between items-center p-2 rounded cursor-pointer ${activeList.id === list.id ? 'bg-sportbnk-navy text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveList(list)}
                  >
                    <div>
                      <span className="font-medium text-sm">{list.name}</span>
                      <p className="text-xs opacity-80">{list.contacts.length} contacts</p>
                    </div>
                    {lists.length > 1 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteList(list.id);
                        }}
                        className={`h-7 w-7 p-0 ${activeList.id === list.id ? 'text-white hover:text-white hover:bg-red-700' : 'text-red-500 hover:text-red-700'}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="shadow-md h-full">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{activeList.name}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {activeList.contacts.length} contacts
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ContactsView 
                data={activeList.contacts}
                revealedEmails={revealedEmails}
                revealedPhones={revealedPhones}
                onRevealEmail={revealEmail}
                onRevealPhone={revealPhone}
                onViewTeam={viewTeam}
                onRemoveFromList={removeContact}
                isSavedList={true}
              />
            </CardContent>
            {activeList.contacts.length > 0 && (
              <CardFooter className="justify-end py-3 px-4 border-t">
                <Button 
                  onClick={exportToCSV}
                  className="bg-sportbnk-navy hover:bg-sportbnk-navy/90 flex items-center gap-1"
                >
                  <Download className="h-4 w-4" /> Export to CSV
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lists;
