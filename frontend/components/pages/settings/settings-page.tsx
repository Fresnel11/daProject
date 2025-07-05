"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { SystemSettings } from "@/components/pages/settings/system-settings";
import { RoleManagement } from "@/components/pages/settings/role-management";
import { UserManagement } from "@/components/pages/settings/user-management";
import { SecuritySettings } from "@/components/pages/settings/security-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Users, Lock } from "lucide-react";

export function SettingsPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <PageTitle
        title={t("advanced_settings")}
        subtitle={t("manage_system_configuration_and_user_roles")}
      />

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("system_settings")}
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t("role_management")}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t("user_management")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            {t("security")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="system" className="space-y-6">
          <SystemSettings />
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6">
          <RoleManagement />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}