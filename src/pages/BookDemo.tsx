
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BookDemo = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request submitted:', formData);
    toast({
      title: "Demo Request Submitted",
      description: "We'll be in touch with you shortly to confirm your demo.",
    });
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    });
  };

  return (
    <PageLayout pageTitle="Join Waitlist">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column - Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-6">Join Our Waitlist</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and one of our experts will get in touch to schedule a personalized
              demonstration of our platform tailored to your specific needs.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="john@company.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="Your Company" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+1 (123) 456-7890" 
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <div className="relative">
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                    />
                    <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <div className="relative">
                    <Input 
                      id="time" 
                      name="time" 
                      type="time" 
                      value={formData.time} 
                      onChange={handleChange} 
                    />
                    <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us about your specific needs or questions..." 
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Request Demo
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
          
          {/* Right column - Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-10">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-4">Why Join Our Waitlist?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-1">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">Tailored to Your Needs</h4>
                    <p className="text-gray-600">See exactly how our platform can address your specific challenges.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-1">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">Expert Guidance</h4>
                    <p className="text-gray-600">Our sports data specialists will walk you through all features.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-1">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">ROI Calculation</h4>
                    <p className="text-gray-600">We'll help you understand the potential return on investment.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-sportbnk-lightGrey rounded-lg p-6">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-4">What Our Clients Say</h3>
              <blockquote className="italic text-gray-600 mb-4">
                "The personalized demo showed us exactly how to leverage Sportbnk for our specific needs. Within weeks, we saw a 40% increase in qualified leads."
              </blockquote>
              <p className="font-semibold text-sportbnk-navy">— Marketing Director, Premier Sports Agency</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookDemo;
