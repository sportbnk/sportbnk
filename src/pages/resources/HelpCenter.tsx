
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Mail } from "lucide-react";

const HelpCenter = () => {
  const faqSections = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I get started with Sportbnk?",
          answer: "Simply create an account, choose your subscription plan, and you'll gain instant access to Sportbnk's platform, including real-time signals, data filters, and list-building tools."
        },
        {
          question: "Do you offer a free trial or demo?",
          answer: "Yes — we provide demos and trial access so you can explore the platform before committing to a plan. Contact our team to book your demo."
        },
        {
          question: "Who is Sportbnk designed for?",
          answer: "Sportbnk is built for suppliers, sponsors, agencies, and organisations looking to sell, market, or hire within the sports industry."
        }
      ]
    },
    {
      title: "Data & Signals",
      questions: [
        {
          question: "What types of data and signals do you provide?",
          answer: "We track real-time buying, hiring, and partnership signals, alongside verified contact details for sports organisations and decision-makers."
        },
        {
          question: "Which sports and regions do you currently cover?",
          answer: "Our MVP focuses on football and cricket in the UK, with rapid expansion planned across more sports and regions."
        },
        {
          question: "How often is your data updated?",
          answer: "Our system continuously updates through scraping, provider partnerships, and manual verification — ensuring data remains accurate and relevant."
        },
        {
          question: "Is the data verified and compliant with GDPR/CCPA?",
          answer: "Yes — every dataset is verified and meets global compliance standards, including GDPR and CCPA."
        },
        {
          question: "Do you provide historical data as well as real-time signals?",
          answer: "Yes — we maintain historical records to help identify trends and support long-term strategy."
        }
      ]
    },
    {
      title: "Features & Use Cases",
      questions: [
        {
          question: "How can Sportbnk help me drive sales, marketing, and hiring?",
          answer: "Sportbnk delivers the right signals at the right time — whether you're looking to close deals, target marketing campaigns, or connect with top talent."
        },
        {
          question: "Can I filter data to match my ideal customer profile (ICP)?",
          answer: "Absolutely — you can refine searches by sport, geography, organisation type, role, and more."
        },
        {
          question: "Can I build and export targeted lists?",
          answer: "Yes — create segmented lists and export them to CSV, or sync them with your CRM and marketing tools."
        }
      ]
    },
    {
      title: "Integrations & API",
      questions: [
        {
          question: "How do I integrate Sportbnk with my CRM or marketing tools?",
          answer: "Sportbnk supports CSV exports and direct API integrations with popular platforms like HubSpot, Salesforce, and Mailchimp."
        },
        {
          question: "What support do you offer for developers?",
          answer: "We provide full API documentation, usage guides, and technical support to help developers integrate Sportbnk quickly."
        },
        {
          question: "How do I monitor my API usage and limits?",
          answer: "You'll have a dashboard to track API calls, monitor limits, and upgrade your plan if needed."
        },
        {
          question: "What happens if I exceed my API limits?",
          answer: "You'll receive a notification, and you can either upgrade your plan or purchase additional credits."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      questions: [
        {
          question: "What subscription plans are available?",
          answer: "We offer tiered plans for different needs — from startups to enterprises. Pricing starts at £49/month, with enterprise packages available for larger organisations."
        },
        {
          question: "Do you offer custom enterprise solutions?",
          answer: "Yes — we provide tailored solutions for enterprise clients who require advanced features or large-scale data access."
        },
        {
          question: "Can I upgrade or downgrade my plan at any time?",
          answer: "Yes — our plans are flexible, and you can adjust them as your business grows."
        }
      ]
    },
    {
      title: "Support & Security",
      questions: [
        {
          question: "What kind of support do you provide?",
          answer: "Our support team offers email assistance, onboarding sessions, and dedicated account management for enterprise clients."
        },
        {
          question: "How secure is my data with Sportbnk?",
          answer: "We use enterprise-grade security and encryption standards to ensure your data is always safe and protected."
        }
      ]
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
              
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h3 className="text-xl font-bold text-sportbnk-navy mb-4">{section.title}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`section-${sectionIndex}-item-${index}`}>
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
              ))}
            </div>

            {/* Contact Support Section */}
            <div className="bg-sportbnk-lightGrey rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-sportbnk-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-sportbnk-navy mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of Sportbnk.
              </p>
              
              <div className="bg-white rounded-lg p-6 mb-8 max-w-md mx-auto">
                <Mail className="h-8 w-8 text-sportbnk-green mx-auto mb-3" />
                <h3 className="font-semibold text-sportbnk-navy mb-2">📧 Email Support</h3>
                <p className="text-gray-600 mb-4">info@sportbnk.com</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpCenter;
