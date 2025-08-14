import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Terminal, Book, Shield, Zap, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Api = () => {
  return (
    <PageLayout 
      pageTitle="SportsBnk API"
      metaDescription="Integrate sports data directly into your applications with SportsBnk's comprehensive REST API. Access real-time sports organizations, teams, and professional data programmatically."
      metaKeywords="sports API, REST API, sports data integration, developer API, sports organizations API, teams data API, real-time sports data, sports database API"
    >
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-sportbnk-green/10 rounded-lg mb-4">
                <Code className="h-8 w-8 text-sportbnk-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Powerful Sports Data API
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Integrate comprehensive sports industry data directly into your applications with our robust REST API. 
                Access real-time information about sports organizations, teams, and professionals programmatically.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>RESTful API endpoints with JSON responses</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Real-time data synchronization</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Comprehensive API documentation</p>
                </div>
                <div className="flex items-start">
                  <span className="text-sportbnk-green mr-2 font-bold text-lg">✓</span>
                  <p>Flexible rate limits and scalable pricing</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" asChild>
                  <Link to="/free-trial">Start Free Trial</Link>
                </Button>
                <Button variant="outline" className="border-sportbnk-green text-sportbnk-green hover:bg-sportbnk-green hover:text-white" asChild>
                  <Link to="/book-demo">View Documentation</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="/lovable-uploads/c506ab85-1e88-47f8-941f-cb182443bf55.png" 
                alt="API Integration" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-sportbnk-navy mb-12 text-center">
            API Features & Capabilities
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Database className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Comprehensive Data Access
                </CardTitle>
                <CardDescription>
                  Access detailed information about sports organizations, teams, employees, and industry professionals.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Zap className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Real-time Updates
                </CardTitle>
                <CardDescription>
                  Get the latest data with real-time synchronization and webhook notifications for data changes.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Shield className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Secure & Compliant
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security with GDPR and CCPA compliance. API keys and OAuth 2.0 authentication.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Terminal className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Developer Friendly
                </CardTitle>
                <CardDescription>
                  RESTful design with intuitive endpoints, comprehensive documentation, and SDKs for popular languages.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Book className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Rich Documentation
                </CardTitle>
                <CardDescription>
                  Interactive API documentation with code examples, tutorials, and comprehensive guides.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="inline-block p-2 bg-sportbnk-green/10 rounded-lg mb-2 w-fit">
                  <Code className="h-6 w-6 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Multiple Integrations
                </CardTitle>
                <CardDescription>
                  Easy integration with popular platforms, CRMs, and development frameworks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">API Endpoints</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our API provides access to comprehensive sports industry data through intuitive endpoints.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-sportbnk-navy">Organizations</CardTitle>
                <CardDescription>Access sports organizations and teams data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
                  <div className="text-green-600">GET</div>
                  <div className="text-gray-800">/api/v1/organizations</div>
                  <div className="text-green-600 mt-2">GET</div>
                  <div className="text-gray-800">/api/v1/organizations/{'{id}'}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-sportbnk-navy">Teams</CardTitle>
                <CardDescription>Retrieve team information and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
                  <div className="text-green-600">GET</div>
                  <div className="text-gray-800">/api/v1/teams</div>
                  <div className="text-green-600 mt-2">GET</div>
                  <div className="text-gray-800">/api/v1/teams/{'{id}'}/employees</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-sportbnk-navy">Contacts</CardTitle>
                <CardDescription>Access professional contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
                  <div className="text-green-600">GET</div>
                  <div className="text-gray-800">/api/v1/contacts</div>
                  <div className="text-blue-600 mt-2">POST</div>
                  <div className="text-gray-800">/api/v1/contacts/search</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-sportbnk-navy">Sports</CardTitle>
                <CardDescription>Browse sports categories and classifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
                  <div className="text-green-600">GET</div>
                  <div className="text-gray-800">/api/v1/sports</div>
                  <div className="text-green-600 mt-2">GET</div>
                  <div className="text-gray-800">/api/v1/sports/{'{id}'}/teams</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-sportbnk-lightGrey">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sportbnk-navy mb-4">Getting Started</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start integrating sports data into your applications in minutes with our simple API.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto mb-4 bg-sportbnk-green/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-sportbnk-green font-bold text-xl">1</span>
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">Sign Up & Get API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create your account and get instant access to your API key through our developer dashboard.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto mb-4 bg-sportbnk-green/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-sportbnk-green font-bold text-xl">2</span>
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">Explore Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our comprehensive API documentation with interactive examples and code snippets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm text-center">
              <CardHeader>
                <div className="mx-auto mb-4 bg-sportbnk-green/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-sportbnk-green font-bold text-xl">3</span>
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">Start Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Make your first API call and start building amazing sports applications with our data.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 text-white text-lg px-8 py-3" asChild>
              <Link to="/free-trial">Get Started with API</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Api;