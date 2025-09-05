
import PageLayout from "@/components/PageLayout";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <PageLayout 
      pageTitle="Privacy Policy"
      metaDescription="SportsBnk's Privacy Policy outlines how we collect, use, and protect your data. Learn about our commitment to data security and privacy in the sports intelligence platform."
      metaKeywords="sports data privacy, GDPR compliance, CCPA compliance, sports data security, data protection policy, sports intelligence privacy"
    >
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-sportbnk-green mb-6" />
            <h1 className="text-4xl font-bold text-sportbnk-navy mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: September 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-6">
                Sportbnk ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our sports intelligence platform.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, information we obtain automatically when you use our Platform, and information from third-party sources.
              </p>
              
              <div className="ml-4 mb-6">
                <h3 className="text-xl font-medium text-sportbnk-navy mb-3">2.1 Information You Provide to Us</h3>
                <p className="text-gray-700 mb-4">
                  We collect information you provide when you register for an account, update your profile, use interactive features, fill out forms, participate in surveys, or otherwise communicate with us.
                </p>
                
                <h3 className="text-xl font-medium text-sportbnk-navy mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  When you access or use our Platform, we automatically collect certain information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Device information (such as your IP address, browser type, and operating system)</li>
                  <li>Usage information (such as pages viewed, time spent on the Platform, and links clicked)</li>
                  <li>Location information (such as general location derived from IP address)</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Provide, maintain, and improve our Platform</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Personalize your experience on our Platform</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">4. Sharing of Information</h2>
              <p className="text-gray-700 mb-4">
                We may share the information we collect in various ways, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Sportbnk or others</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">5. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-6">
                Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict use of your personal information.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">7. Changes to this Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">8. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:info@sportbnk.com" className="text-sportbnk-green hover:underline">info@sportbnk.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Privacy;
