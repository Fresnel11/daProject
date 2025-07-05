'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "@/lib/i18n/client";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formSchema = z.object({
    email: z.string().min(1, t("required_field")).email(t("invalid_email")),
    password: z.string().min(1, t("required_field")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    router.push('/dashboard');
    
    setIsLoading(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg-hero">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            SchoolSphere
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link href="/" className="hidden sm:flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back_to_home")}
          </Link>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className={`w-full max-w-2xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Card className="form-container border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="animate-bounce-in">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in-down animate-stagger-1">
                {t("welcome_back")}
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-3 animate-fade-in-down animate-stagger-2">
                {t("login_subtitle")}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="form-field animate-fade-in-left animate-stagger-3">
                        <FormLabel className="form-label text-base">
                          {t("email_or_username")}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("enter_email_or_username")} 
                            type="email"
                            className="form-input"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="form-field animate-fade-in-right animate-stagger-4">
                        <FormLabel className="form-label text-base">
                          {t("password")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder={t("enter_password")} 
                              type={showPassword ? "text" : "password"}
                              className="form-input pr-12"
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10 transition-colors duration-300"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between animate-fade-in-up animate-stagger-5">
                    <Link 
                      href="#" 
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 hover:underline"
                    >
                      {t("forgot_password")}
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="form-button animate-fade-in-up animate-stagger-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="spinner" />
                        <span>{t("signing_in")}</span>
                      </div>
                    ) : (
                      t("sign_in")
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="text-center animate-fade-in-up animate-stagger-6">
                <p className="text-base text-muted-foreground">
                  {t("dont_have_account")}{" "}
                  <Link href="/register" className="text-primary hover:text-primary/80 transition-colors duration-300 font-semibold hover:underline">
                    {t("sign_up")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 SchoolSphere. {t("all_rights_reserved")}
        </p>
      </footer>
    </div>
  );
}