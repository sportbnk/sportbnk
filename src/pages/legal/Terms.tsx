
import PageLayout from "@/components/PageLayout";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <PageLayout pageTitle="Terms & Conditions">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <FileText className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Terms & Conditions
              </h1>
              <p className="text-gray-600">Last updated: June 1, 2023</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Sportbnk. These Terms and Conditions ("Terms") govern your access to and use of the Sportbnk platform, including any content, functionality, and services offered on or through sportbnk.com (the "Platform").
              </p>
              
              <h2>2. Acceptance of the Terms</h2>
              <p>
                By accessing or using the Platform, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree to these Terms, you must not access or use the Platform.
              </p>
              
              <h2>3. Changes to the Terms</h2>
              <p>
                We may revise these Terms at any time by amending this page. Please check this page from time to time to take notice of any changes we made, as they are binding on you.
              </p>
              
              <h2>4. Accessing the Platform</h2>
              <p>
                We do not guarantee that the Platform, or any content on it, will always be available or be uninterrupted. We may suspend, withdraw, discontinue, or change all or any part of the Platform without notice. We will not be liable to you if for any reason the Platform is unavailable at any time or for any period.
              </p>
              
              <h2>5. Account Registration</h2>
              <p>
                You may need to register for an account to access certain features of the Platform. When you register, you must provide accurate and complete information. You are solely responsible for the security of your account and for all activity that occurs under your account.
              </p>
              
              <h2>6. Intellectual Property Rights</h2>
              <p>
                The Platform and its entire contents, features, and functionality are owned by Sportbnk, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              
              <h2>7. User Content</h2>
              <p>
                You retain ownership of any content you submit, post, or display on or through the Platform. By submitting, posting, or displaying content on or through the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
              </p>
              
              <h2>8. Prohibited Uses</h2>
              <p>
                You may use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform:
              </p>
              <ul>
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
                <li>To impersonate or attempt to impersonate Sportbnk, a Sportbnk employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Platform</li>
              </ul>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                In no event will Sportbnk, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, including direct, indirect, special, incidental, or consequential damages, arising out of or in connection with your use, or inability to use, the Platform, including but not limited to any reliance placed on the Platform.
              </p>
              
              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the state of Delaware, without regard to its conflict of law provisions.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at: legal@sportbnk.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
