
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

interface BillingInfoProps {
  billingData: {
    plan: string;
    price: string;
    nextBillingDate: string;
    paymentMethod: string;
    invoices: Invoice[];
  };
}

const BillingInfo = ({ billingData }: BillingInfoProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Plan</h3>
                <p className="text-lg font-medium">{billingData.plan}</p>
                <p className="text-sm text-muted-foreground">{billingData.price}</p>
                <p className="text-sm text-muted-foreground">Next billing on {billingData.nextBillingDate}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                <div className="flex items-center mt-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <p>{billingData.paymentMethod}</p>
                </div>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" size="sm">Update Card</Button>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Billing History</h2>
        </div>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingData.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      invoice.status === "Paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default BillingInfo;
