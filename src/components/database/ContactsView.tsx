
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Phone, Mail, ExternalLink } from "lucide-react";
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
  return (
    <div className="space-y-4 p-4">
      {data.map((contact) => (
        <div key={contact.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <img 
                src={contact.teamLogo} 
                alt={contact.team} 
                className="w-12 h-12 object-contain rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{contact.name}</h3>
                  {contact.verified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                  {contact.activeReplier && (
                    <Badge variant="outline" className="text-xs text-green-600">Active Replier</Badge>
                  )}
                </div>
                <p className="text-gray-600">{contact.position}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 hover:text-blue-800"
                    onClick={() => onViewTeam(contact.teamId)}
                  >
                    {contact.team}
                  </Button>
                  <Badge variant="outline">{contact.sport}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ListSelectionPopover
                contact={contact}
                onAddToList={onAddToList}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              {revealedEmails[contact.email] ? (
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                  {contact.email}
                </a>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRevealEmail(contact.email)}
                  className="text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Reveal Email (2 credits)
                </Button>
              )}
            </div>
            
            {/* Phone */}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                {revealedPhones[contact.phone] ? (
                  <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                    {contact.phone}
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevealPhone(contact.phone)}
                    className="text-xs"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Reveal Phone (3 credits)
                  </Button>
                )}
              </div>
            )}
            
            {/* LinkedIn */}
            {contact.linkedin && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-400" />
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsView;
