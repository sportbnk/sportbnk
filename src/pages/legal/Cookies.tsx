
import PageLayout from "@/components/PageLayout";
import { Helmet } from "react-helmet-async";

const Cookies = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Cookies Policy | Sportbnk</title>
        <meta name="description" content="Learn about how Sportbnk uses cookies and similar technologies." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 pt-32 max-w-4xl">
        <h1 className="text-3xl font-bold text-sportbnk-navy mb-8">Cookies Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2 className="text-xl font-semibold text-sportbnk-navy mt-8 mb-4">What are cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>

          <h2 className="text-xl font-semibold text-sportbnk-navy mt-8 mb-4">How we use cookies</h2>
          <p className="mb-4">
            Sportbnk uses cookies for a variety of purposes, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Essential cookies: These are necessary for the website to function properly.</li>
            <li className="mb-2">Performance cookies: These help us understand how visitors interact with our website.</li>
            <li className="mb-2">Functionality cookies: These remember your preferences and enable enhanced features.</li>
            <li className="mb-2">Targeting cookies: These deliver advertisements relevant to your interests.</li>
          </ul>

          <h2 className="text-xl font-semibold text-sportbnk-navy mt-8 mb-4">Managing cookies</h2>
          <p className="mb-4">
            Most web browsers allow you to manage your cookie preferences. You can:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Delete cookies from your device</li>
            <li className="mb-2">Block cookies by activating settings on your browser</li>
            <li className="mb-2">Set your browser to alert you when cookies are being set</li>
          </ul>
          <p className="mb-4">
            Please note that if you choose to block or delete cookies, some features of our website may not function correctly.
          </p>

          <h2 className="text-xl font-semibold text-sportbnk-navy mt-8 mb-4">Changes to our cookies policy</h2>
          <p className="mb-4">
            We may update our cookies policy from time to time. Any changes will be posted on this page.
          </p>

          <h2 className="text-xl font-semibold text-sportbnk-navy mt-8 mb-4">Contact us</h2>
          <p className="mb-4">
            If you have any questions about our cookies policy, please contact us at privacy@sportbnk.com.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cookies;
