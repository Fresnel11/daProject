"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Save, Upload, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function SystemSettings() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    schoolName: z.string().min(1, t("required_field")),
    schoolLogo: z.string().optional(),
    schoolYear: z.string().min(1, t("required_field")),
    educationalSystem: z.string().min(1, t("required_field")),
    defaultLanguage: z.string().min(1, t("required_field")),
    defaultTheme: z.string().min(1, t("required_field")),
    timezone: z.string().min(1, t("required_field")),
    currency: z.string().min(1, t("required_field")),
    maxStudentsPerClass: z.string().min(1, t("required_field")),
    dateFormat: z.string().min(1, t("required_field")),
    timeFormat: z.string().min(1, t("required_field")),
    enableNotifications: z.boolean(),
    enableAutoBackup: z.boolean(),
    enableMaintenanceMode: z.boolean(),
    enableRegistrations: z.boolean(),
    enableGradeEntry: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "École Primaire Saint-Martin",
      schoolLogo: "",
      schoolYear: "2024-2025",
      educationalSystem: "classic",
      defaultLanguage: "fr",
      defaultTheme: "system",
      timezone: "Europe/Paris",
      currency: "EUR",
      maxStudentsPerClass: "30",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      enableNotifications: true,
      enableAutoBackup: true,
      enableMaintenanceMode: false,
      enableRegistrations: true,
      enableGradeEntry: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Saving system settings:", values);
    toast.success(t("settings_saved_successfully"));
    setIsLoading(false);
  }

  const educationalSystems = [
    { value: "classic", label: t("classic_system") },
    { value: "cycle", label: t("cycle_system") },
    { value: "trimester", label: t("trimester_system") },
    { value: "semester", label: t("semester_system") },
  ];

  const currencies = [
    { value: "EUR", label: "Euro (€)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "XOF", label: "CFA Franc BCEAO (CFA)" },
    { value: "XAF", label: "CFA Franc BEAC (FCFA)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
  ];

  const timezones = [
    { value: "Europe/Paris", label: "Europe/Paris (GMT+1)" },
    { value: "Africa/Abidjan", label: "Africa/Abidjan (GMT+0)" },
    { value: "Africa/Douala", label: "Africa/Douala (GMT+1)" },
    { value: "America/New_York", label: "America/New_York (GMT-5)" },
    { value: "America/Toronto", label: "America/Toronto (GMT-5)" },
  ];

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* School Information */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("school_information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("school_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("enter_school_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("active_school_year")}</FormLabel>
                      <FormControl>
                        <Input placeholder="2024-2025" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("current_academic_year")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="schoolLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("school_logo")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input placeholder={t("logo_url_or_upload")} {...field} />
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          {t("upload")}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="educationalSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("educational_system")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_educational_system")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationalSystems.map((system) => (
                          <SelectItem key={system.value} value={system.value}>
                            {system.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Localization Settings */}
          <Card className="animate-fade-in-up animate-stagger-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("localization_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="defaultLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("default_language")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_language")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultTheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("default_theme")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_theme")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">{t("light")}</SelectItem>
                          <SelectItem value="dark">{t("dark")}</SelectItem>
                          <SelectItem value="system">{t("system")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("timezone")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_timezone")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("currency")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_currency")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dateFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("date_format")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_date_format")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("time_format")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_time_format")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="24h">24 {t("hours")}</SelectItem>
                          <SelectItem value="12h">12 {t("hours")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxStudentsPerClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("max_students_per_class")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Features */}
          <Card className="animate-fade-in-up animate-stagger-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("system_features")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_notifications")}</FormLabel>
                        <FormDescription>
                          {t("enable_system_notifications")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableAutoBackup"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_auto_backup")}</FormLabel>
                        <FormDescription>
                          {t("automatic_daily_backups")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableRegistrations"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_registrations")}</FormLabel>
                        <FormDescription>
                          {t("allow_new_student_registrations")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableGradeEntry"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_grade_entry")}</FormLabel>
                        <FormDescription>
                          {t("allow_teachers_to_enter_grades")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="enableMaintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                    <div className="space-y-0.5">
                      <FormLabel className="text-orange-800 dark:text-orange-200">
                        {t("maintenance_mode")}
                      </FormLabel>
                      <FormDescription className="text-orange-700 dark:text-orange-300">
                        {t("enable_maintenance_mode_warning")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center animate-fade-in-up animate-stagger-3">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {t("export_settings")}
              </Button>
              <Button type="button" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("reset_to_defaults")}
              </Button>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="spinner" />
                  <span>{t("saving")}</span>
                </div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t("save_settings")}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}