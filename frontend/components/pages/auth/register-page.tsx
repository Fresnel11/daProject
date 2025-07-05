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
import { GraduationCap, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalSteps = 3;

  const personalInfoSchema = z.object({
    firstName: z.string().min(1, t("required_field")),
    lastName: z.string().min(1, t("required_field")),
    email: z.string().min(1, t("required_field")).email(t("invalid_email")),
    phone: z.string().min(1, t("required_field")),
    password: z.string().min(8, t("password_min_length")),
    confirmPassword: z.string().min(1, t("required_field")),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("passwords_dont_match"),
    path: ["confirmPassword"],
  });

  const schoolInfoSchema = z.object({
    schoolName: z.string().min(1, t("required_field")),
    schoolType: z.string().min(1, t("required_field")),
    address: z.string().min(1, t("required_field")),
    city: z.string().min(1, t("required_field")),
    state: z.string().min(1, t("required_field")),
    zipCode: z.string().min(1, t("required_field")),
    country: z.string().min(1, t("required_field")),
    estimatedEnrollment: z.string().min(1, t("required_field")),
  });

  const form = useForm<z.infer<typeof personalInfoSchema & typeof schoolInfoSchema>>({
    resolver: zodResolver(currentStep === 1 ? personalInfoSchema : schoolInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      schoolName: "",
      schoolType: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      estimatedEnrollment: "",
    },
  });

  const schoolTypes = [
    { value: "elementary", label: t("elementary_school") },
    { value: "middle", label: t("middle_school") },
    { value: "high", label: t("high_school") },
    { value: "university", label: t("university") },
    { value: "private", label: t("private_school") },
    { value: "charter", label: t("charter_school") },
  ];

  const enrollmentRanges = [
    { value: "1-50", label: "1-50 " + t("students") },
    { value: "51-100", label: "51-100 " + t("students") },
    { value: "101-500", label: "101-500 " + t("students") },
    { value: "501-1000", label: "501-1000 " + t("students") },
    { value: "1000+", label: "1000+ " + t("students") },
  ];

  async function onSubmit(values: any) {
    if (currentStep < totalSteps) {
      setSlideDirection('right');
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to dashboard
    router.push('/dashboard');
    
    setIsLoading(false);
  }

  const goBack = () => {
    setSlideDirection('left');
    setCurrentStep(currentStep - 1);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t("personal_information");
      case 2:
        return t("school_information");
      case 3:
        return t("review_confirm");
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return t("enter_personal_details");
      case 2:
        return t("school_info_subtitle");
      case 3:
        return t("review_information");
      default:
        return "";
    }
  };

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
        <div className={`w-full max-w-4xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Card className="form-container border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="animate-bounce-in">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in-down animate-stagger-1">
                {getStepTitle()}
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-3 animate-fade-in-down animate-stagger-2">
                {getStepSubtitle()}
              </p>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-4 mt-8 animate-fade-in animate-stagger-3">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`progress-step ${
                      i + 1 < currentStep ? 'completed' : 
                      i + 1 === currentStep ? 'active' : 'inactive'
                    }`}>
                      {i + 1 < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{i + 1}</span>
                      )}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className={`progress-line w-16 ${
                        i + 1 < currentStep ? 'completed' : 
                        i + 1 === currentStep ? 'active' : ''
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-4 animate-fade-in animate-stagger-4">
                {t("step")} {currentStep} {t("of")} {totalSteps}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className={`${
                    slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
                  }`}>
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("first_name")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_first_name")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("last_name")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_last_name")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("email")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_email")} type="email" className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("phone_number")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_phone")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="form-field">
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
                        
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("confirm_password")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("confirm_password")} 
                                  type="password"
                                  className="form-input"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="schoolName"
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("school_name")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_school_name")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="schoolType"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("school_type")}
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="form-input">
                                    <SelectValue placeholder={t("select_school_type")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {schoolTypes.filter(type => !!type.value).map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="estimatedEnrollment"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("estimated_enrollment")}
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="form-input">
                                    <SelectValue placeholder={t("select_enrollment")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {enrollmentRanges.filter(range => !!range.value).map((range) => (
                                    <SelectItem key={range.value} value={range.value}>
                                      {range.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("address")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_address")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("city")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_city")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("state")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_state")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("zip_code")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_zip")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("country")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("enter_country")} className="form-input" {...field} />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {t("almost_done")}
                          </h3>
                          <p className="text-muted-foreground">
                            {t("review_information_message")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    {currentStep > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={goBack}
                        className="flex-1 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        {t("back")}
                      </Button>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="form-button flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="spinner" />
                          <span>{t("creating_account")}</span>
                        </div>
                      ) : currentStep === totalSteps ? (
                        t("create_account")
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>{t("continue")}</span>
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              
              <div className="text-center">
                <p className="text-base text-muted-foreground">
                  {t("already_have_account")}{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 transition-colors duration-300 font-semibold hover:underline">
                    {t("sign_in")}
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