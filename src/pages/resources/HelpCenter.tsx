
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Mail, Phone } from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I get started with Sportbnk?",
      answer: "Getting started is easy! Sign up for a free trial, choose your plan, and you'll have immediate access to our sports data platform. Our onboarding team will help guide you through the setup process."
    },
    {
      question: "What sports data do you provide?",
      answer: "We provide comprehensive data from 750k+ teams and 360k+ competitions across multiple sports including football, basketball, tennis, rugby, and many more. This includes player statistics, team performance, fixtures, results, and detailed analytics."
    },
    {
      question: "How can I integrate Sportbnk data into my application?",
      answer: "We offer robust APIs and SDKs that allow seamless integration into your existing systems. Our technical documentation provides detailed guides, and our support team can assist with custom integration requirements."
    },
    {
      question: "What are the different pricing plans available?",
      answer: "We offer flexible pricing plans to suit different needs - from individual developers to enterprise organizations. Visit our pricing page to see detailed plan comparisons and features included in each tier."
    },
    {
      question: "How accurate and up-to-date is your sports data?",
      answer: "Our data is sourced from reliable providers and updated in real-time. We maintain high accuracy standards with regular quality checks and provide data with timestamps so you know exactly when information was last updated."
    },
    {
      question: "Can I customize the data feeds for my specific needs?",
      answer: "Yes! Our Enterprise plans offer customizable data feeds. You can filter by specific leagues, teams, or data points that matter most to your application or business requirements."
    },
    {
      question: "What support do you offer for developers?",
      answer: "We provide comprehensive developer support including detailed API documentation, code examples, SDKs, and direct access to our technical support team. We also have a community WhatsApp group for quick questions."
    },
    {
      question: "How do I monitor my API usage and limits?",
      answer: "Your dashboard provides real-time monitoring of API calls, usage statistics, and remaining credits. You'll receive notifications before reaching your limits and can upgrade your plan as needed."
    },
    {
      question: "What happens if I exceed my API limits?",
      answer: "If you approach your limits, we'll notify you in advance. You can upgrade your plan or purchase additional credits. We don't immediately cut off access - we'll work with you to find the right solution."
    },
    {
      question: "Do you offer historical sports data?",
      answer: "Yes, we maintain extensive historical data going back several years for most sports and competitions. This includes past seasons, historical player statistics, and archived match data for trend analysis and research."
    }
  ];

  return (
    <PageLayout pageTitle="Help Center">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12">
                Find answers to the most common questions about using Sportbnk.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-sportbnk-navy hover:text-sportbnk-green">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Support Section */}
            <div className="bg-sportbnk-lightGrey rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-sportbnk-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of Sportbnk.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6">
                  <Mail className="h-8 w-8 text-sportbnk-green mx-auto mb-3" />
                  <h3 className="font-semibold text-sportbnk-navy mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-4">Get detailed help via email</p>
                  <p className="text-sm text-gray-500">support@sportbnk.com</p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <Phone className="h-8 w-8 text-sportbnk-green mx-auto mb-3" />
                  <h3 className="font-semibold text-sportbnk-navy mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-4">Speak directly with our team</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM GMT</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white">
                  Contact Support
                </Button>
                <Button variant="outline">
                  Join WhatsApp Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpCenter;
