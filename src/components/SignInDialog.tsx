
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

interface SignInDialogProps {
  className?: string;
  triggerClassName?: string;
}

export function SignInDialog({ className, triggerClassName }: SignInDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // This would connect to your AWS backend in the future
    console.log("Sign in attempt with:", values);
    
    // Simulate API call - Demo login for free trial access
    setTimeout(() => {
      // Store demo user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        name: "Demo User",
        email: values.email,
        isAuthenticated: true,
        isFreeTrial: true,
      }));
      
      setIsLoading(false);
      setIsOpen(false);
      
      toast.success("Successfully signed in", {
        description: "Welcome back to SportsBnk!",
      });
      
      // Redirect to CRM dashboard
      navigate("/crm/people");
    }, 1500);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={`bg-white border border-sportbnk-green text-sportbnk-navy hover:bg-sportbnk-lightGrey ${triggerClassName}`}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sportbnk-navy">Sign in to SportsBnk</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sportbnk-navy">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input placeholder="you@example.com" className="pl-10" {...field} />
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
                        <Input type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="text-right">
                <a href="#" className="text-sportbnk-green hover:underline">
                  Forgot password?
                </a>
              </FormDescription>
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Card>
        <div className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/pricing" className="text-sportbnk-green hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
