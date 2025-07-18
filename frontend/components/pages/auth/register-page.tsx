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
import { useForm } from "react-hook-form";
import { useSchoolStore } from "@/lib/stores/school-store";

export function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const schoolStore = useSchoolStore();
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [schoolEmailExists, setSchoolEmailExists] = useState(false);
  const [checkingSchoolEmail, setCheckingSchoolEmail] = useState(false);
  const [schoolPhoneExists, setSchoolPhoneExists] = useState(false);
  const [checkingSchoolPhone, setCheckingSchoolPhone] = useState(false);
  const [schoolWebsiteExists, setSchoolWebsiteExists] = useState(false);
  const [checkingSchoolWebsite, setCheckingSchoolWebsite] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [directorPhoneExists, setDirectorPhoneExists] = useState(false);
  const [checkingDirectorPhone, setCheckingDirectorPhone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalSteps = 4;

  const form = useForm({
    defaultValues: {
      directorFirstName: "",
      directorLastName: "",
      directorEmail: "",
      directorPhone: "",
      directorPassword: "",
      confirmDirectorPassword: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      website: "",
      description: "",
      registrationNumber: "",
      taxNumber: "",
      schoolType: "",
      estimatedEnrollment: "",
    },
    mode: 'onBlur',
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

  // Ajout de la vérification d'email lors du blur
  async function handleDirectorEmailBlur(email: string) {
    if (!email) {
      setEmailExists(false);
      return;
    }
    setCheckingEmail(true);
    const exists = await schoolStore.checkEmailExists(email);
    setEmailExists(exists);
    setCheckingEmail(false);
  }

  // Vérification des mots de passe lors du blur sur le champ de confirmation
  function handleConfirmPasswordBlur(confirmPassword: string, password: string) {
    setPasswordsMatch(confirmPassword === password);
  }

  async function handleSchoolEmailBlur(email: string) {
    if (!email) {
      setSchoolEmailExists(false);
      return;
    }
    setCheckingSchoolEmail(true);
    const exists = await schoolStore.checkSchoolEmailExists(email);
    setSchoolEmailExists(exists);
    setCheckingSchoolEmail(false);
  }

  async function handleSchoolPhoneBlur(phone: string) {
    if (!phone) {
      setSchoolPhoneExists(false);
      return;
    }
    setCheckingSchoolPhone(true);
    const exists = await schoolStore.checkSchoolPhoneExists(phone);
    setSchoolPhoneExists(exists);
    setCheckingSchoolPhone(false);
  }

  async function handleSchoolWebsiteBlur(website: string) {
    if (!website) {
      setSchoolWebsiteExists(false);
      return;
    }
    setCheckingSchoolWebsite(true);
    const exists = await schoolStore.checkSchoolWebsiteExists(website);
    setSchoolWebsiteExists(exists);
    setCheckingSchoolWebsite(false);
  }

  async function handleDirectorPhoneBlur(phone: string) {
    // Si le numéro du directeur est le même que celui de l'école, on autorise
    if (phone === form.getValues("phone")) {
      setDirectorPhoneExists(false);
      return;
    }
    if (!phone) {
      setDirectorPhoneExists(false);
      return;
    }
    setCheckingDirectorPhone(true);
    const exists = await schoolStore.checkDirectorPhoneExists(phone);
    setDirectorPhoneExists(exists);
    setCheckingDirectorPhone(false);
  }

  async function onSubmit(values: any) {
    if (currentStep < totalSteps) {
      // Bloque la progression si l'email existe déjà, si les mots de passe ne correspondent pas, si l'email, le téléphone ou le site web de l'école existe déjà, ou si le numéro du directeur existe déjà
      if (currentStep === 1 && (emailExists || !passwordsMatch || directorPhoneExists)) return;
      if (currentStep === 2 && (schoolEmailExists || schoolPhoneExists || schoolWebsiteExists)) return;
      setSlideDirection('right');
      setCurrentStep(currentStep + 1);
      return;
    }
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      website: values.website,
      description: values.description,
      registrationNumber: values.registrationNumber,
      taxNumber: values.taxNumber,
      schoolType: values.schoolType,
      estimatedEnrollment: values.estimatedEnrollment,
      directorFirstName: values.directorFirstName,
      directorLastName: values.directorLastName,
      directorEmail: values.directorEmail,
      directorPhone: values.directorPhone,
      directorPassword: values.directorPassword,
    };
    console.log('Payload envoyé au backend:', payload);
    await schoolStore.registerSchool(payload, () => router.push('/account-pending'));
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
        return t("school_admin_information"); // à ajouter dans les traductions
      case 4:
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
        return t("school_admin_info_subtitle"); // à ajouter dans les traductions
      case 4:
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
                          name="directorFirstName"
                          rules={{
                            required: t("first_name_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ\s\-']+$/,
                              message: t("invalid_first_name"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("first_name")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ\s\-']+"
                                  placeholder={t("enter_first_name") + " (Directeur)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorLastName"
                          rules={{
                            required: t("last_name_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ\s\-']+$/,
                              message: t("invalid_last_name"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("last_name")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ\s\-']+"
                                  placeholder={t("enter_last_name") + " (Directeur)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorEmail"
                          rules={{
                            required: t("email_required"),
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: t("invalid_email"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("email")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  autoComplete="email"
                                  placeholder={t("enter_email") + " (Directeur)"}
                                  className="form-input"
                                  {...field}
                                  onBlur={async (e) => {
                                    field.onBlur?.();
                                    await handleDirectorEmailBlur(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {checkingEmail && (
                                <div className="text-gray-500 text-sm mt-1">{t("checking_email") || "Vérification en cours..."}</div>
                              )}
                              {emailExists && !checkingEmail && (
                                <div className="text-red-500 dark:text-red-500 text-sm mt-1">{t("email_already_exists") || "Cet email existe déjà."}</div>
                              )}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorPhone"
                          rules={{
                            required: t("phone_required"),
                            pattern: {
                              value: /^[0-9+\s\-]{8,20}$/,
                              message: t("invalid_phone"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("phone_number")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="numeric"
                                  pattern="[0-9+\s\-]{8,20}"
                                  placeholder={t("enter_phone") + " (Directeur)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s\-]/g, "");
                                    field.onChange(e);
                                  }}
                                  onBlur={async (e) => {
                                    field.onBlur?.();
                                    await handleDirectorPhoneBlur(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {checkingDirectorPhone && (
                                <div className="text-gray-500 text-sm mt-1">{t("checking_phone") || "Vérification en cours..."}</div>
                              )}
                              {directorPhoneExists && !checkingDirectorPhone && (
                                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{t("director_phone_already_exists") || "Ce numéro de téléphone est déjà utilisé."}</div>
                              )}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorPassword"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("password")}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    placeholder={t("enter_password") + " (Directeur)"}
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
                          name="confirmDirectorPassword"
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("confirm_password")}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t("confirm_password") + " (Directeur)"}
                                  type="password"
                                  className="form-input"
                                  {...field} 
                                  onBlur={(e) => {
                                    field.onBlur?.();
                                    handleConfirmPasswordBlur(e.target.value, form.getValues("directorPassword"));
                                  }}
                                />
                              </FormControl>
                              {!passwordsMatch && (
                                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{t("passwords_do_not_match") || "Les mots de passe ne correspondent pas."}</div>
                              )}
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
                          name="name"
                          rules={{
                            required: t("school_name_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ0-9\s\-']+$/,
                              message: t("invalid_school_name"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("school_name")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ0-9\s\-']+"
                                  placeholder={t("enter_school_name") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ0-9\s\-']/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          rules={{
                            required: t("email_required"),
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: t("invalid_email"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("email")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  autoComplete="email"
                                  placeholder={t("enter_email") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onBlur={async (e) => {
                                    field.onBlur?.();
                                    await handleSchoolEmailBlur(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {checkingSchoolEmail && (
                                <div className="text-gray-500 text-sm mt-1">{t("checking_email") || "Vérification en cours..."}</div>
                              )}
                              {schoolEmailExists && !checkingSchoolEmail && (
                                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{t("school_email_already_exists") || "Cet email d'école existe déjà."}</div>
                              )}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          rules={{
                            required: t("phone_required"),
                            pattern: {
                              value: /^[0-9+\s\-]{8,20}$/,
                              message: t("invalid_phone"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("phone_number")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  inputMode="numeric"
                                  pattern="[0-9+\s\-]{8,20}"
                                  placeholder={t("enter_phone") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s\-]/g, "");
                                    field.onChange(e);
                                  }}
                                  onBlur={async (e) => {
                                    field.onBlur?.();
                                    await handleSchoolPhoneBlur(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {checkingSchoolPhone && (
                                <div className="text-gray-500 text-sm mt-1">{t("checking_phone") || "Vérification en cours..."}</div>
                              )}
                              {schoolPhoneExists && !checkingSchoolPhone && (
                                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{t("school_phone_already_exists") || "Ce numéro d'école existe déjà."}</div>
                              )}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="website"
                          rules={{
                            required: t("website_required"),
                            pattern: {
                              value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/\S*)?$/,
                              message: t("invalid_website"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("website")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="url"
                                  pattern="https?://.+"
                                  placeholder={t("enter_website") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    // On laisse l'utilisateur saisir, la validation se fait sur blur/submit
                                    field.onChange(e);
                                  }}
                                  onBlur={async (e) => {
                                    field.onBlur?.();
                                    await handleSchoolWebsiteBlur(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {checkingSchoolWebsite && (
                                <div className="text-gray-500 text-sm mt-1">{t("checking_website") || "Vérification en cours..."}</div>
                              )}
                              {schoolWebsiteExists && !checkingSchoolWebsite && (
                                <div className="text-red-500 dark:text-red-300 text-sm mt-1">{t("school_website_already_exists") || "Ce site web d'école existe déjà."}</div>
                              )}
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          rules={{
                            required: t("address_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ0-9\s\-',.]+$/,
                              message: t("invalid_address"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("address")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ0-9\s\-',.]+"
                                  placeholder={t("enter_address") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ0-9\s\-',.]/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          rules={{
                            required: t("city_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ\s\-']+$/,
                              message: t("invalid_city"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("city")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ\s\-']+"
                                  placeholder={t("enter_city") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          rules={{
                            required: t("country_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ\s\-']+$/,
                              message: t("invalid_country"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("country")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ\s\-']+"
                                  placeholder={t("enter_country") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ\s\-']/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          rules={{
                            required: t("zip_required"),
                            pattern: {
                              value: /^[A-Za-z0-9\s\-]+$/,
                              message: t("invalid_zip"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("zip_code")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-z0-9\s\-]+"
                                  placeholder={t("enter_zip") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z0-9\s\-]/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="description"
                          rules={{
                            required: t("description_required"),
                            pattern: {
                              value: /^[A-Za-zÀ-ÿ0-9\s\-',.]+$/,
                              message: t("invalid_description"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field lg:col-span-2">
                              <FormLabel className="form-label text-base">
                                {t("description")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-zÀ-ÿ0-9\s\-',.]+"
                                  placeholder={t("enter_description") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ0-9\s\-',.]/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="registrationNumber"
                          rules={{
                            required: t("registration_number_required"),
                            pattern: {
                              value: /^[A-Za-z0-9\s\-]+$/,
                              message: t("invalid_registration_number"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("registration_number")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-z0-9\s\-]+"
                                  placeholder={t("enter_registration_number") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z0-9\s\-]/g, "");
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="taxNumber"
                          rules={{
                            required: t("tax_number_required"),
                            pattern: {
                              value: /^[A-Za-z0-9\s\-]+$/,
                              message: t("invalid_tax_number"),
                            },
                          }}
                          render={({ field }) => (
                            <FormItem className="form-field">
                              <FormLabel className="form-label text-base">
                                {t("tax_number")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  pattern="[A-Za-z0-9\s\-]+"
                                  placeholder={t("enter_tax_number") + " (École)"}
                                  className="form-input"
                                  {...field}
                                  onInput={e => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z0-9\s\-]/g, "");
                                    field.onChange(e);
                                  }}
                                />
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
                      </div>
                    )}

{currentStep === 4 && (
  <div className="space-y-8 transition-all duration-300">
    {/* Header Section with Success Icon */}
    <div className="text-center p-8 rounded-2xl border transition-all duration-300
      dark:bg-gradient-to-br dark:from-primary/10 dark:to-primary/20 dark:border-primary/30
      bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20
      backdrop-blur-sm">
      <div className="w-16 h-16 bg-green-500 hover:bg-green-600 transition-colors duration-300 
        rounded-full flex items-center justify-center mx-auto mb-4
        shadow-lg shadow-green-500/20 animate-fade-in">
        <Check className="w-8 h-8 text-white animate-bounce-subtle" />
      </div>
      <h3 className="text-2xl font-bold mb-2 transition-colors duration-300
        dark:text-gray-100 text-gray-900">
        {t("almost_done")}
      </h3>
      <p className="transition-colors duration-300
        dark:text-gray-400 text-gray-600">
        {t("review_information_message")}
      </p>
    </div>

    {/* Information Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Personal Information Card */}
      <div className="rounded-xl transition-all duration-300 
        dark:bg-gray-800/50 bg-white
        dark:border-gray-700 border border-primary/10
        dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] shadow-lg
        backdrop-blur-sm p-6 hover:transform hover:scale-[1.02]">
        <h4 className="font-semibold text-lg mb-4 transition-colors duration-300
          dark:text-primary-400 text-primary">
          {t("personal_information")}
        </h4>
        <ul className="space-y-3 text-left">
          {[
            { label: t("first_name"), value: form.getValues("directorFirstName") },
            { label: t("last_name"), value: form.getValues("directorLastName") },
            { label: t("email"), value: form.getValues("directorEmail") },
            { label: t("phone_number"), value: form.getValues("directorPhone") }
          ].map((item, index) => (
            <li key={index} className="transition-colors duration-300
              dark:text-gray-300 text-gray-700 flex items-center gap-2">
              <span className="font-medium transition-colors duration-300
                dark:text-gray-200 text-gray-900">
                {item.label}:
              </span>
              <span className="break-all">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* School Information Card */}
      <div className="rounded-xl transition-all duration-300
        dark:bg-gray-800/50 bg-white
        dark:border-gray-700 border border-primary/10
        dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] shadow-lg
        backdrop-blur-sm p-6 hover:transform hover:scale-[1.02]">
        <h4 className="font-semibold text-lg mb-4 transition-colors duration-300
          dark:text-primary-400 text-primary">
          {t("school_information")}
        </h4>
        <ul className="space-y-3 text-left">
          {[
            { label: t("school_name"), value: form.getValues("name") },
            { label: t("email"), value: form.getValues("email") },
            { label: t("phone_number"), value: form.getValues("phone") },
            { label: t("website"), value: form.getValues("website") },
            { label: t("address"), value: form.getValues("address") },
            { label: t("city"), value: form.getValues("city") },
            { label: t("country"), value: form.getValues("country") },
            { label: t("zip_code"), value: form.getValues("postalCode") }
          ].map((item, index) => (
            <li key={index} className="transition-colors duration-300
              dark:text-gray-300 text-gray-700 flex items-center gap-2">
              <span className="font-medium transition-colors duration-300
                dark:text-gray-200 text-gray-900">
                {item.label}:
              </span>
              <span className="break-all">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Admin Information Card - Full Width */}
      <div className="rounded-xl md:col-span-2 transition-all duration-300
        dark:bg-gray-800/50 bg-white
        dark:border-gray-700 border border-primary/10
        dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] shadow-lg
        backdrop-blur-sm p-6 hover:transform hover:scale-[1.02]">
        <h4 className="font-semibold text-lg mb-4 transition-colors duration-300
          dark:text-primary-400 text-primary">
          {t("school_admin_information")}
        </h4>
        <ul className="space-y-3 text-left">
          {[
            { label: t("description"), value: form.getValues("description") },
            { label: t("registration_number"), value: form.getValues("registrationNumber") },
            { label: t("tax_number"), value: form.getValues("taxNumber") },
            { 
              label: t("school_type"), 
              value: schoolTypes.find(st => st.value === form.getValues("schoolType"))?.label || "" 
            },
            { 
              label: t("estimated_enrollment"), 
              value: enrollmentRanges.find(er => er.value === form.getValues("estimatedEnrollment"))?.label || "" 
            }
          ].map((item, index) => (
            <li key={index} className="transition-colors duration-300
              dark:text-gray-300 text-gray-700 flex items-center gap-2">
              <span className="font-medium transition-colors duration-300
                dark:text-gray-200 text-gray-900">
                {item.label}:
              </span>
              <span className="break-all">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer Message */}
    <div className="text-center mt-8">
      <p className="text-sm transition-colors duration-300
        dark:text-gray-400 text-gray-600">
        {t("please_verify_information") || "Veuillez vérifier que toutes les informations sont correctes avant de créer le compte."}
      </p>
    </div>
  </div>
)}

<style jsx>{`
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 2s infinite;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`}</style>
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
                      className={`form-button flex-1 ${((schoolStore.loading || (currentStep === 1 && (emailExists || !passwordsMatch || directorPhoneExists)) || (currentStep === 2 && (schoolEmailExists || schoolPhoneExists || schoolWebsiteExists))) ? 'cursor-not-allowed' : '')}`}
                      disabled={schoolStore.loading || (currentStep === 1 && (emailExists || !passwordsMatch || directorPhoneExists)) || (currentStep === 2 && (schoolEmailExists || schoolPhoneExists || schoolWebsiteExists))}
                    >
                      {schoolStore.loading ? (
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
                  {schoolStore.error && (
                    <div className="text-red-500 dark:text-red-300 text-center font-semibold py-2">
                      {schoolStore.error}
                    </div>
                  )}
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

// Ajout du composant ReviewInformation directement dans ce fichier
