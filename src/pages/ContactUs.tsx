
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond to your inquiry shortly.",
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <PageLayout pageTitle="Contact Us">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column - Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-sportbnk-navy mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our products or services? Fill out the form below and our team will get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Please provide details about your inquiry..." 
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                Send Message
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
          
          {/* Right column - Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl font-bold text-sportbnk-navy mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-2">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">Email</h4>
                    <p className="text-gray-600">info@sportbnk.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-2">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">Phone</h4>
                    <p className="text-gray-600">+44 7935 969611</p>
                    <p className="text-gray-600">Mon-Fri, 9:00 AM - 6:00 PM GMT</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-sportbnk-green rounded-full p-2">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sportbnk-navy">Office</h4>
                    <p className="text-gray-600">The Amp, 11, Ebrington Square</p>
                    <p className="text-gray-600">Derry, Londonderry BT47 6FA</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-sportbnk-lightGrey rounded-lg p-6">
              <h3 className="text-xl font-bold text-sportbnk-navy mb-4">Frequently Asked Questions</h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-sportbnk-navy">How quickly will I receive a response?</h4>
                  <p className="text-gray-600">We aim to respond to all inquiries within 24 business hours.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-sportbnk-navy">Do you offer custom solutions?</h4>
                  <p className="text-gray-600">Yes, our Enterprise plans can be tailored to your specific needs. Contact us for details.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
