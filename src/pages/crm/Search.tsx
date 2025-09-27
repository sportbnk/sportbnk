import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users,
  ArrowRight
} from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover</h1>
          <p className="text-gray-600 text-lg">Explore organisations and people in Premier League football</p>
        </div>

        {/* Discovery Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Organisations Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crm/discover/organisations')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Organisations</CardTitle>
                  <p className="text-gray-600 text-sm">Discover Premier League football clubs</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Explore all 20 Premier League teams with detailed information including contact details, 
                  locations, and key organizational data.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">20 Premier League teams</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">Complete contact info</span>
                </div>
                <Button className="w-full mt-4" onClick={() => navigate('/crm/discover/organisations')}>
                  Explore Organisations
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* People Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crm/discover/people')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">People</CardTitle>
                  <p className="text-gray-600 text-sm">Find key contacts and decision makers</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Connect with executives, managers, and key personnel across Premier League 
                  organizations including CEOs, marketing directors, and more.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Key decision makers</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">Direct contact details</span>
                </div>
                <Button className="w-full mt-4" onClick={() => navigate('/crm/discover/people')}>
                  Explore People
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">20</div>
              <div className="text-sm text-gray-600">Premier League Teams</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">100+</div>
              <div className="text-sm text-gray-600">Key Contacts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Departments</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;