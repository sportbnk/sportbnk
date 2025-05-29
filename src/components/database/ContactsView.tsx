
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Phone, Mail, Linkedin, Building2, UserCheck, CheckCircle } from "lucide-react";
import ListSelectionPopover from "./ListSelectionPopover";

interface Contact {
  id: number | string;
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
  onAddToList: (contact: Contact, listId: string, listName: string) => void;
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
  const maskEmail = (email: string) => {
    if (revealedEmails[email]) return email;
    const [username, domain] = email.split('@');
    const maskedUsername = username.substring(0, 2) + '*'.repeat(Math.max(0, username.length - 2));
    return `${maskedUsername}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (revealedPhones[phone]) return phone;
    const cleanPhone = phone.replace(/\s+/g, '');
    if (cleanPhone.length <= 4) return phone;
    return cleanPhone.substring(0, 3) + '*'.repeat(Math.max(0, cleanPhone.length - 6)) + cleanPhone.slice(-3);
  };

  return (
    <div className="space-y-3 p-4">
      {data.map((contact) => (
        <Card key={contact.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <img 
                    src={contact.teamLogo} 
                    alt={contact.team} 
                    className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    {contact.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    )}
                    {contact.activeReplier && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{contact.position}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="h-3 w-3" />
                    <button 
                      onClick={() => onViewTeam(contact.teamId)}
                      className="hover:text-sportbnk-green hover:underline"
                    >
                      {contact.team}
                    </button>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="text-xs">
                      {contact.sport}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{maskEmail(contact.email)}</span>
                    {!revealedEmails[contact.email] && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRevealEmail(contact.email)}
                        className="text-sportbnk-green hover:text-sportbnk-green/90 p-0 h-auto ml-1"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {contact.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{maskPhone(contact.phone)}</span>
                      {!revealedPhones[contact.phone] && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRevealPhone(contact.phone!)}
                          className="text-sportbnk-green hover:text-sportbnk-green/90 p-0 h-auto ml-1"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {contact.linkedin && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-500 hover:text-blue-600 p-0 h-auto"
                      onClick={() => window.open(contact.linkedin, '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <ListSelectionPopover
                  contact={contact}
                  onAddToList={onAddToList}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No contacts found</p>
        </div>
      )}
    </div>
  );
};

export default ContactsView;
