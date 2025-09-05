import PageLayout from '@/components/PageLayout';
import { Shield } from 'lucide-react';

const OptOut = () => {
  return (
    <PageLayout 
      pageTitle="Opt-Out & Removal Policy"
      metaDescription="Learn how to opt out and remove your data from Sportbnk's platform. Your privacy rights and our commitment to data protection."
      metaKeywords="opt out, data removal, privacy rights, GDPR, data protection, Sportbnk"
    >
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-sportbnk-green mb-6" />
            <h1 className="text-4xl font-bold text-sportbnk-navy mb-4">Opt-Out & Removal Policy</h1>
            <p className="text-gray-600">Last updated: September 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              Sportbnk is committed to respecting your privacy and data rights. If your information appears on our platform and you would like to have it removed, you have the right to opt out at any time.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">1. What Does Opt-Out Mean?</h2>
              <p className="text-gray-700 mb-4">
                Opting out means that your personal or professional information will no longer be displayed, shared, or made accessible through the Sportbnk platform. Once your request is processed, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Remove your details from our live database.</li>
                <li>Suppress your profile to ensure it is not re-added in future updates.</li>
                <li>Confirm completion of your request via email.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">2. How to Request Removal</h2>
              <p className="text-gray-700 mb-4">
                To exercise your right to opt out, please contact us using one of the following methods:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-2">📧 <strong>Email:</strong> info@sportbnk.com</p>
                <p className="text-gray-700">📮 <strong>Post:</strong> Sportbnk Ltd, 19 Northland Avenue, Londonderry, Northern Ireland, BT48 7JN</p>
              </div>
              <p className="text-gray-700 mb-4">When contacting us, please include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your full name.</li>
                <li>The organisation or role you are associated with (to help us locate your record).</li>
                <li>The email address or phone number you believe is listed.</li>
                <li>Proof of identity (we may ask for verification to protect against fraudulent requests).</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">3. Processing Time</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We will acknowledge your request within 7 working days.</li>
                <li>Removal will normally be completed within 30 days of verification.</li>
                <li>In rare cases where we are legally required to retain some data (e.g., for compliance), we will inform you of the reason.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">4. Your Rights</h2>
              <p className="text-gray-700">
                This opt-out is part of your broader rights under data protection law, including the right to access, rectify, or erase your personal data. For more information, please see our <a href="/legal/privacy" className="text-sportbnk-green hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <div className="bg-sportbnk-green/10 border border-sportbnk-green/20 rounded-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-sportbnk-navy mb-3">Need Help?</h3>
              <p className="text-gray-700">
                If you have any questions about this opt-out policy or need assistance with your request, please don't hesitate to contact us at <a href="mailto:info@sportbnk.com" className="text-sportbnk-green hover:underline">info@sportbnk.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default OptOut;