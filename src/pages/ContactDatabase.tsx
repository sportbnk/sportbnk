
import React from "react";
import ContactsView from "@/components/database/ContactsView";

const ContactDatabase = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teams & Contacts</h1>
      <ContactsView />
    </div>
  );
};

export default ContactDatabase;
