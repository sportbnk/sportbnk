
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Form schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const FreeTrial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // This would connect to AWS Cognito/Amplify in the future
    console.log("Free trial signup:", values);
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify({
        name: values.fullName,
        email: values.email,
        isAuthenticated: true,
        isFreeTrial: true,
      }));
      
      toast.success("Free trial activated", {
        description: "Your 14-day free trial has been activated. Welcome to SportsBnk!",
        duration: 5000,
      });
      
      // Redirect to the CRM dashboard
      navigate("/crm/people");
    }, 1500);
  }

  return (
    <PageLayout pageTitle="Start Your Free Trial">
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-sportbnk-navy mb-4">
                Start Your Free Trial
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Get full access to SportsBnk's basic features for 14 days. No credit card required.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sportbnk-green flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">Access to basic Discover tool filters</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sportbnk-green flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">Limited data enrichment with Boost</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sportbnk-green flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">5 searches per day</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-sportbnk-green flex items-center justify-center mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="ml-3 text-gray-600">Export up to 50 contacts per month</span>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="shadow-lg border border-gray-200">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center text-sportbnk-navy">
                    Create Your Account
                  </CardTitle>
                  <CardDescription className="text-center">
                    Sign up to start your 14-day free trial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sportbnk-navy">Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input placeholder="John Smith" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sportbnk-navy">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input 
                                  placeholder="you@company.com" 
                                  type="email" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sportbnk-navy">Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input 
                                  type="password" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Start Free Trial"}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-center pt-4 pb-6">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/" className="text-sportbnk-green hover:underline font-medium">
                      Sign In
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FreeTrial;
