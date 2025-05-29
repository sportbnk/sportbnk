import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User, Phone, Briefcase, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, signUp, signIn, resendVerification } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'signin');

  // Sign In Form
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Sign Up Form
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    job_title: '',
    phone: '',
  });

  // Handle URL hash parameters for email confirmation
  useEffect(() => {
    const handleHashParams = async () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        if (accessToken && refreshToken && type === 'signup') {
          try {
            setIsLoading(true);
            
            // Set the session with the tokens from the URL
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              console.error('Error setting session:', error);
              setError('Failed to verify email. Please try again.');
              return;
            }

            if (data.user) {
              toast.success('Email verified successfully! Welcome to SportsBnk!');
              // Clear the hash from URL
              window.history.replaceState(null, '', window.location.pathname);
              // Redirect to main app
              navigate('/crm/people');
            }
          } catch (err) {
            console.error('Error handling email confirmation:', err);
            setError('Failed to verify email. Please try again.');
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    handleHashParams();
  }, [navigate]);

  useEffect(() => {
    if (user && user.email_confirmed_at) {
      navigate('/crm/people');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        if (error.message === 'Email not confirmed') {
          setError('Please verify your email address before signing in.');
          setMessage('Check your email for a verification link, or resend verification below.');
        } else if (error.message === 'Invalid login credentials') {
          setError('Invalid email or password. Please check your credentials.');
        } else {
          setError(error.message);
        }
        return;
      }

      if (data.user && !data.user.email_confirmed_at) {
        setError('Please verify your email address before signing in.');
        setMessage('Check your email for a verification link, or resend verification below.');
        return;
      }

      toast.success('Successfully signed in!');
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(signUpData.email, signUpData.password, {
        name: signUpData.name,
        job_title: signUpData.job_title,
        phone: signUpData.phone,
      });

      if (error) {
        if (error.message === 'User already registered') {
          setError('An account with this email already exists. Please sign in instead.');
        } else {
          setError(error.message);
        }
        return;
      }

      setMessage('Please check your email for a verification link to complete your registration.');
      toast.success('Registration successful! Please verify your email.');
      
      // Clear form
      setSignUpData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        job_title: '',
        phone: '',
      });
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!signInData.email && !signUpData.email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    const email = signInData.email || signUpData.email;

    try {
      const { error } = await resendVerification(email);
      if (error) {
        setError(error.message);
      } else {
        setMessage('Verification email sent! Please check your inbox.');
        toast.success('Verification email sent!');
      }
    } catch (err: any) {
      setError('Failed to resend verification email. Please try again.');
      console.error('Resend verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state during email verification
  if (isLoading && window.location.hash.includes('access_token')) {
    return (
      <PageLayout>
        <div className="min-h-screen pt-32 pb-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sportbnk-green mb-4"></div>
                <p className="text-center text-gray-600">Verifying your email...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Sign In | SportsBnk</title>
      </Helmet>
      
      <div className="min-h-screen pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-sportbnk-navy">
                Welcome to SportsBnk
              </CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert className="mt-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>

                  {error && error.includes('verify') && (
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        className="w-full"
                      >
                        Resend Verification Email
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Smith"
                          className="pl-10"
                          value={signUpData.name}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-job-title">Job Title</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-job-title"
                          type="text"
                          placeholder="Marketing Manager"
                          className="pl-10"
                          value={signUpData.job_title}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, job_title: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          value={signUpData.phone}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          id="signup-confirm-password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Auth;
