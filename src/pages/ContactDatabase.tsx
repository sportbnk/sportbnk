
import React, { useState } from "react";
import ContactsView from "@/components/database/ContactsView";
import { toast } from "sonner";

// Mock data for testing
const dummyData = [
  {
    id: 1,
    name: "John Smith",
    position: "Marketing Director",
    team: "Forest Green Rovers FC",
    teamId: 2,
    sport: "Football",
    email: "j.smith@fgr.co.uk",
    phone: "+44123456789",
    linkedin: "https://linkedin.com/in/johnsmith",
    teamLogo: "https://placehold.co/100x100?text=FGR",
    verified: true,
    activeReplier: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Operations Manager",
    team: "Aberavon Rugby",
    teamId: 1,
    sport: "Rugby",
    email: "s.johnson@aberavonrugby.co.uk",
    teamLogo: "https://placehold.co/100x100?text=AR",
    verified: true
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Head Coach",
    team: "ZAG SKIS",
    teamId: 3,
    sport: "Ski",
    email: "m.chen@zagskis.com",
    phone: "+33612345678",
    teamLogo: "https://placehold.co/100x100?text=ZAG",
    activeReplier: true
  }
];

const ContactDatabase = () => {
  // State for revealed emails and phones
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [savedList, setSavedList] = useState<Array<typeof dummyData[0]>>([]);

  // Handler for revealing emails
  const handleRevealEmail = (email: string) => {
    // In a real app, this would make an API call to spend credits
    // and reveal the email address
    setRevealedEmails({
      ...revealedEmails,
      [email]: true
    });
    toast.success("Email revealed! 2 credits used.");
  };

  // Handler for revealing phone numbers
  const handleRevealPhone = (phone: string) => {
    setRevealedPhones({
      ...revealedPhones,
      [phone]: true
    });
    toast.success("Phone revealed! 3 credits used.");
  };

  // Handler for viewing team details
  const handleViewTeam = (teamId: number) => {
    toast.info(`Viewing team ID: ${teamId}`);
    // In a real app, this would navigate to the team's profile page
  };

  // Handler for adding a contact to a list
  const handleAddToList = (contact: typeof dummyData[0]) => {
    const isAlreadyInList = savedList.some(item => item.id === contact.id);
    
    if (!isAlreadyInList) {
      setSavedList([...savedList, contact]);
      toast.success(`${contact.name} added to your list!`);
    } else {
      toast.error(`${contact.name} is already in your list!`);
    }
  };

  // Handler for removing a contact from a list
  const handleRemoveFromList = (contactId: number) => {
    setSavedList(savedList.filter(contact => contact.id !== contactId));
    toast.info("Contact removed from your list.");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teams & Contacts</h1>
      <ContactsView 
        data={dummyData}
        revealedEmails={revealedEmails}
        revealedPhones={revealedPhones}
        onRevealEmail={handleRevealEmail}
        onRevealPhone={handleRevealPhone}
        onViewTeam={handleViewTeam}
        onAddToList={handleAddToList}
        onRemoveFromList={handleRemoveFromList}
      />
    </div>
  );
};

export default ContactDatabase;
