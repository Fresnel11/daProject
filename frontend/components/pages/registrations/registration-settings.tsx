"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Save, Upload, Download, Settings } from "lucide-react";

export function RegistrationSettings() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    // General Settings
    schoolName: z.string().min(1, t("required_field")),
    schoolLogo: z.string().optional(),
    academicYear: z.string().min(1, t("required_field")),
    registrationOpenDate: z.string().min(1, t("required_field")),
    registrationCloseDate: z.string().min(1, t("required_field")),
    
    // Notification Settings
    enableEmailNotifications: z.boolean(),
    enableSMSNotifications: z.boolean(),
    notificationEmail: z.string().email().optional(),
    reminderDaysBefore: z.string(),
    
    // Document Requirements
    requireBirthCertificate: z.boolean(),
    requireVaccinationRecord: z.boolean(),
    requirePhoto: z.boolean(),
    requirePreviousSchoolReport: z.boolean(),
    requireMedicalCertificate: z.boolean(),
    
    // Payment Settings
    enableOnlinePayment: z.boolean(),
    paymentDeadlineDays: z.string(),
    latePaymentFee: z.string(),
    
    // Auto-progression Settings
    enableAutoProgression: z.boolean(),
    requireApprovalForLevelJump: z.boolean(),
    
    // Communication Templates
    welcomeEmailTemplate: z.string().optional(),
    reminderEmailTemplate: z.string().optional(),
    approvalEmailTemplate: z.string().optional(),
    rejectionEmailTemplate: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "École Primaire Saint-Martin",
      schoolLogo: "",
      academicYear: "2025-2026",
      registrationOpenDate: "2025-03-01",
      registrationCloseDate: "2025-06-30",
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      notificationEmail: "admin@school.edu",
      reminderDaysBefore: "7",
      requireBirthCertificate: true,
      requireVaccinationRecord: true,
      requirePhoto: true,
      requirePreviousSchoolReport: false,
      requireMedicalCertificate: false,
      enableOnlinePayment: true,
      paymentDeadlineDays: "30",
      latePaymentFee: "10",
      enableAutoProgression: true,
      requireApprovalForLevelJump: true,
      welcomeEmailTemplate: "",
      reminderEmailTemplate: "",
      approvalEmailTemplate: "",
      rejectionEmailTemplate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Saving settings:", values);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* General Settings */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("general_settings")}
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
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("academic_year")}</FormLabel>
                      <FormControl>
                        <Input placeholder="2025-2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="registrationOpenDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("registration_open_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationCloseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("registration_close_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
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
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="animate-fade-in-up animate-stagger-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("notification_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="enableEmailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("email_notifications")}</FormLabel>
                        <FormDescription>
                          {t("send_email_notifications_to_parents")}
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
                  name="enableSMSNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("sms_notifications")}</FormLabel>
                        <FormDescription>
                          {t("send_sms_notifications_to_parents")}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="notificationEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("notification_email")}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t("enter_notification_email")} {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("email_for_admin_notifications")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reminderDaysBefore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("reminder_days_before")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_days")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">3 {t("days")}</SelectItem>
                          <SelectItem value="7">7 {t("days")}</SelectItem>
                          <SelectItem value="14">14 {t("days")}</SelectItem>
                          <SelectItem value="30">30 {t("days")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Requirements */}
          <Card className="animate-fade-in-up animate-stagger-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("document_requirements")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="requireBirthCertificate"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("birth_certificate")}</FormLabel>
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
                  name="requireVaccinationRecord"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("vaccination_record")}</FormLabel>
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
                  name="requirePhoto"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("student_photo")}</FormLabel>
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
                  name="requirePreviousSchoolReport"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("previous_school_report")}</FormLabel>
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
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="animate-fade-in-up animate-stagger-3">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("payment_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableOnlinePayment"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>{t("enable_online_payment")}</FormLabel>
                      <FormDescription>
                        {t("allow_parents_to_pay_online")}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="paymentDeadlineDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("payment_deadline_days")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("days_after_registration_to_pay")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latePaymentFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("late_payment_fee")} (€)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("additional_fee_for_late_payment")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Auto-progression Settings */}
          <Card className="animate-fade-in-up animate-stagger-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("auto_progression_settings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableAutoProgression"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>{t("enable_auto_progression")}</FormLabel>
                      <FormDescription>
                        {t("automatically_advance_students_next_level")}
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
                name="requireApprovalForLevelJump"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>{t("require_approval_level_jump")}</FormLabel>
                      <FormDescription>
                        {t("require_manual_approval_for_level_jumps")}
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

          {/* Email Templates */}
          <Card className="animate-fade-in-up animate-stagger-5">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("email_templates")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="welcomeEmailTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("welcome_email_template")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter_welcome_email_template")}
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("email_sent_when_registration_approved")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminderEmailTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reminder_email_template")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter_reminder_email_template")}
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("email_sent_as_reminder")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-2 animate-fade-in-up animate-stagger-6">
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {t("export_settings")}
            </Button>
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