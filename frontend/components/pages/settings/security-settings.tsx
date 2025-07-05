"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { 
  Save, 
  Shield, 
  Key, 
  Clock, 
  AlertTriangle,
  Download,
  RefreshCw,
  Eye,
  Lock
} from "lucide-react";
import { toast } from "sonner";

export function SecuritySettings() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    passwordMinLength: z.string().min(1, t("required_field")),
    passwordRequireUppercase: z.boolean(),
    passwordRequireLowercase: z.boolean(),
    passwordRequireNumbers: z.boolean(),
    passwordRequireSymbols: z.boolean(),
    sessionTimeout: z.string().min(1, t("required_field")),
    maxLoginAttempts: z.string().min(1, t("required_field")),
    lockoutDuration: z.string().min(1, t("required_field")),
    enableTwoFactor: z.boolean(),
    enablePasswordExpiry: z.boolean(),
    passwordExpiryDays: z.string().min(1, t("required_field")),
    enableAuditLog: z.boolean(),
    enableLoginNotifications: z.boolean(),
    allowedIpRanges: z.string().optional(),
    enableMaintenanceMode: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordMinLength: "8",
      passwordRequireUppercase: true,
      passwordRequireLowercase: true,
      passwordRequireNumbers: true,
      passwordRequireSymbols: false,
      sessionTimeout: "480",
      maxLoginAttempts: "5",
      lockoutDuration: "30",
      enableTwoFactor: false,
      enablePasswordExpiry: false,
      passwordExpiryDays: "90",
      enableAuditLog: true,
      enableLoginNotifications: true,
      allowedIpRanges: "",
      enableMaintenanceMode: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Saving security settings:", values);
    toast.success(t("security_settings_saved"));
    setIsLoading(false);
  }

  const mockSecurityEvents = [
    {
      id: "1",
      type: "login_success",
      user: "john.smith@school.com",
      timestamp: "2024-02-20T10:30:00Z",
      ip: "192.168.1.100",
      severity: "info",
    },
    {
      id: "2",
      type: "login_failed",
      user: "unknown@example.com",
      timestamp: "2024-02-20T09:15:00Z",
      ip: "203.0.113.45",
      severity: "warning",
    },
    {
      id: "3",
      type: "password_changed",
      user: "sarah.j@school.com",
      timestamp: "2024-02-19T16:45:00Z",
      ip: "192.168.1.105",
      severity: "info",
    },
    {
      id: "4",
      type: "role_changed",
      user: "admin@school.com",
      timestamp: "2024-02-19T14:20:00Z",
      ip: "192.168.1.101",
      severity: "high",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "info": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login_success": return <Shield className="h-4 w-4 text-green-500" />;
      case "login_failed": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "password_changed": return <Key className="h-4 w-4 text-blue-500" />;
      case "role_changed": return <RefreshCw className="h-4 w-4 text-orange-500" />;
      default: return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Password Policy */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-5 w-5" />
                {t("password_policy")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passwordMinLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("minimum_password_length")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="6" max="20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="passwordRequireUppercase"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>{t("require_uppercase")}</FormLabel>
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
                    name="passwordRequireLowercase"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>{t("require_lowercase")}</FormLabel>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passwordRequireNumbers"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("require_numbers")}</FormLabel>
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
                  name="passwordRequireSymbols"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("require_symbols")}</FormLabel>
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
                  name="enablePasswordExpiry"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_password_expiry")}</FormLabel>
                        <FormDescription>
                          {t("force_password_change_periodically")}
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

                {form.watch("enablePasswordExpiry") && (
                  <FormField
                    control={form.control}
                    name="passwordExpiryDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("password_expiry_days")}</FormLabel>
                        <FormControl>
                          <Input type="number" min="30" max="365" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session & Login Security */}
          <Card className="animate-fade-in-up animate-stagger-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t("session_login_security")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="sessionTimeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("session_timeout_minutes")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="15" max="1440" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("auto_logout_after_inactivity")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxLoginAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("max_login_attempts")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="3" max="10" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("attempts_before_lockout")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lockoutDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("lockout_duration_minutes")}</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" max="1440" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("account_lockout_duration")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="enableTwoFactor"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("enable_two_factor_auth")}</FormLabel>
                        <FormDescription>
                          {t("require_2fa_for_admin_accounts")}
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
                  name="enableLoginNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>{t("login_notifications")}</FormLabel>
                        <FormDescription>
                          {t("notify_users_of_login_activity")}
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
                name="allowedIpRanges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("allowed_ip_ranges")} ({t("optional")})</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="192.168.1.0/24, 10.0.0.0/8"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {t("restrict_access_to_ip_ranges")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Audit & Monitoring */}
          <Card className="animate-fade-in-up animate-stagger-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t("audit_monitoring")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableAuditLog"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>{t("enable_audit_logging")}</FormLabel>
                      <FormDescription>
                        {t("log_all_user_actions_and_changes")}
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
          <div className="flex justify-end items-center gap-2 animate-fade-in-up animate-stagger-3">
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {t("export_security_log")}
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

      {/* Recent Security Events */}
      <Card className="animate-fade-in-up animate-stagger-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("recent_security_events")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSecurityEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div>
                    <p className="text-sm font-medium">
                      {t(event.type)} - {event.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()} • IP: {event.ip}
                    </p>
                  </div>
                </div>
                <Badge className={getSeverityColor(event.severity)}>
                  {t(event.severity)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}