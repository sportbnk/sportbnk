
import PageLayout from "@/components/PageLayout";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <PageLayout 
      pageTitle="Terms & Conditions"
      metaDescription="Terms and Conditions for Sportbnk's sports intelligence platform. Learn about your rights and responsibilities when using our services."
      metaKeywords="terms of service, legal terms, user agreement, Sportbnk terms, platform usage"
    >
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-sportbnk-green mb-6" />
            <h1 className="text-4xl font-bold text-sportbnk-navy mb-4">Terms & Conditions</h1>
            <p className="text-gray-600">Last updated: September 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-6">
                Welcome to Sportbnk. These Terms and Conditions ("Terms") govern your access to and use of the Sportbnk platform, including any content, functionality, and services offered on or through sportbnk.com (the "Platform").
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">2. Acceptance of the Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing or using the Platform, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree to these Terms, you must not access or use the Platform.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">3. Changes to the Terms</h2>
              <p className="text-gray-700 mb-6">
                We may revise these Terms at any time by amending this page. Please check this page from time to time to take notice of any changes we made, as they are binding on you.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">4. Accessing the Platform</h2>
              <p className="text-gray-700 mb-6">
                We do not guarantee that the Platform, or any content on it, will always be available or be uninterrupted. We may suspend, withdraw, discontinue, or change all or any part of the Platform without notice. We will not be liable to you if for any reason the Platform is unavailable at any time or for any period.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">5. Account Registration</h2>
              <p className="text-gray-700 mb-6">
                You may need to register for an account to access certain features of the Platform. When you register, you must provide accurate and complete information. You are solely responsible for the security of your account and for all activity that occurs under your account.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-6">
                The Platform and its entire contents, features, and functionality are owned by Sportbnk, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">7. User Content</h2>
              <p className="text-gray-700 mb-6">
                You retain ownership of any content you submit, post, or display on or through the Platform. By submitting, posting, or displaying content on or through the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
                <li>To impersonate or attempt to impersonate Sportbnk, a Sportbnk employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Platform</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                In no event will Sportbnk, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, including direct, indirect, special, incidental, or consequential damages, arising out of or in connection with your use, or inability to use, the Platform, including but not limited to any reliance placed on the Platform.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">10. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the state of Delaware, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at: <a href="mailto:info@sportbnk.com" className="text-sportbnk-green hover:underline">info@sportbnk.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Terms;
