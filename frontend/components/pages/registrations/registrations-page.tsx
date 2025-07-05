"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { RegistrationDashboard } from "@/components/pages/registrations/registration-dashboard";
import { CampaignManagement } from "@/components/pages/registrations/campaign-management";
import { StudentRegistrations } from "@/components/pages/registrations/student-registrations";
import { ReRegistrations } from "@/components/pages/registrations/re-registrations";
import { RegistrationSettings } from "@/components/pages/registrations/registration-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Users, UserCheck, BarChart3 } from "lucide-react";

export function RegistrationsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("registration_management")}
          subtitle={t("manage_student_registrations_campaigns")}
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            {t("campaign_settings")}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("new_campaign")}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t("dashboard")}
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("campaigns")}
          </TabsTrigger>
          <TabsTrigger value="new-students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t("new_students")}
          </TabsTrigger>
          <TabsTrigger value="re-registrations" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            {t("re_registrations")}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("settings")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <RegistrationDashboard />
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6">
          <CampaignManagement />
        </TabsContent>
        
        <TabsContent value="new-students" className="space-y-6">
          <StudentRegistrations />
        </TabsContent>
        
        <TabsContent value="re-registrations" className="space-y-6">
          <ReRegistrations />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <RegistrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}