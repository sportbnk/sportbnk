
import PageLayout from "@/components/PageLayout";
import { Cookie } from "lucide-react";

const Cookies = () => {
  return (
    <PageLayout 
      pageTitle="Cookies Policy"
      metaDescription="Learn about how Sportbnk uses cookies and similar technologies to enhance your experience on our platform."
      metaKeywords="cookies policy, website tracking, privacy preferences, data collection, browser settings"
    >
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Cookie className="mx-auto h-16 w-16 text-sportbnk-green mb-6" />
            <h1 className="text-4xl font-bold text-sportbnk-navy mb-4">Cookies Policy</h1>
            <p className="text-gray-600">Last updated: September 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">What are cookies?</h2>
              <p className="text-gray-700 mb-6">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">How we use cookies</h2>
              <p className="text-gray-700 mb-4">
                Sportbnk uses cookies for a variety of purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Essential cookies: These are necessary for the website to function properly</li>
                <li>Performance cookies: These help us understand how visitors interact with our website</li>
                <li>Functionality cookies: These remember your preferences and enable enhanced features</li>
                <li>Targeting cookies: These deliver advertisements relevant to your interests</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">Managing cookies</h2>
              <p className="text-gray-700 mb-4">
                Most web browsers allow you to manage your cookie preferences. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Delete cookies from your device</li>
                <li>Block cookies by activating settings on your browser</li>
                <li>Set your browser to alert you when cookies are being set</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Please note that if you choose to block or delete cookies, some features of our website may not function correctly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">Types of cookies we use</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-sportbnk-navy mb-2">Essential Cookies</h3>
                  <p className="text-gray-700">Required for the website to function properly and cannot be disabled.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-sportbnk-navy mb-2">Analytics Cookies</h3>
                  <p className="text-gray-700">Help us understand how users interact with our website to improve performance.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-sportbnk-navy mb-2">Preference Cookies</h3>
                  <p className="text-gray-700">Remember your settings and preferences for a better user experience.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">Changes to our cookies policy</h2>
              <p className="text-gray-700 mb-6">
                We may update our cookies policy from time to time. Any changes will be posted on this page and we will notify you of significant changes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-sportbnk-navy mb-4">Contact us</h2>
              <p className="text-gray-700">
                If you have any questions about our cookies policy, please contact us at <a href="mailto:info@sportbnk.com" className="text-sportbnk-green hover:underline">info@sportbnk.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Cookies;
