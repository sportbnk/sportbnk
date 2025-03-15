
import PageLayout from "@/components/PageLayout";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <PageLayout 
      pageTitle="Privacy Policy"
      metaDescription="SportsBnk's Privacy Policy outlines how we collect, use, and protect your data. Learn about our commitment to data security and privacy in the sports intelligence platform."
      metaKeywords="sports data privacy, GDPR compliance, CCPA compliance, sports data security, data protection policy, sports intelligence privacy"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-600">Last updated: June 1, 2023</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Sportbnk ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our sports intelligence platform.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, information we obtain automatically when you use our Platform, and information from third-party sources.
              </p>
              <h3>2.1 Information You Provide to Us</h3>
              <p>
                We collect information you provide when you register for an account, update your profile, use interactive features, fill out forms, participate in surveys, or otherwise communicate with us.
              </p>
              <h3>2.2 Automatically Collected Information</h3>
              <p>
                When you access or use our Platform, we automatically collect certain information, including:
              </p>
              <ul>
                <li>Device information (such as your IP address, browser type, and operating system)</li>
                <li>Usage information (such as pages viewed, time spent on the Platform, and links clicked)</li>
                <li>Location information (such as general location derived from IP address)</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our Platform</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Personalize your experience on our Platform</li>
              </ul>
              
              <h2>4. Sharing of Information</h2>
              <p>
                We may share the information we collect in various ways, including:
              </p>
              <ul>
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Sportbnk or others</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              </ul>
              
              <h2>5. Data Retention</h2>
              <p>
                We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.
              </p>
              
              <h2>6. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict use of your personal information.
              </p>
              
              <h2>7. Changes to this Privacy Policy</h2>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: privacy@sportbnk.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
