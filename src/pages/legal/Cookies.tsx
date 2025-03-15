
import PageLayout from "@/components/PageLayout";
import { Cookie } from "lucide-react";

const Cookies = () => {
  return (
    <PageLayout 
      pageTitle="Cookie Policy"
      metaDescription="SportsBnk's Cookie Policy explains how we use cookies and similar technologies on our sports intelligence platform."
      metaKeywords="cookies policy, website cookies, tracking cookies, sports data cookies, cookie consent"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Cookie className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Cookie Policy
              </h1>
              <p className="text-gray-600">Last updated: June 1, 2023</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                This Cookie Policy explains how Sportbnk ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2>2. What are cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <h2>3. Why do we use cookies?</h2>
              <p>
                We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.
              </p>
              
              <h2>4. Types of cookies we use</h2>
              <p>
                The specific types of cookies served through our Website and the purposes they perform include:
              </p>
              <ul>
                <li><strong>Essential cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
                <li><strong>Performance cookies:</strong> These cookies collect information about how visitors use our Website, for instance which pages visitors go to most often. We use this information to improve our Website.</li>
                <li><strong>Functionality cookies:</strong> These cookies allow us to remember choices you make when you use our Website, such as remembering your login details or language preference.</li>
                <li><strong>Targeting cookies:</strong> These cookies record your visit to our Website, the pages you have visited and the links you have followed. We will use this information to make our Website and the advertising displayed on it more relevant to your interests.</li>
              </ul>
              
              <h2>5. How to control cookies</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>
              
              <h2>6. How often will we update this Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              
              <h2>7. Contact us</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at privacy@sportbnk.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Cookies;
