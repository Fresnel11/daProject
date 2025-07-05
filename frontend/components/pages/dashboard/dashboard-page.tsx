"use client";

import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { StatsCards } from "@/components/pages/dashboard/stats-cards";
import { AttendanceChart } from "@/components/pages/dashboard/attendance-chart";
import { GradeDistributionChart } from "@/components/pages/dashboard/grade-distribution-chart";
import { EnrollmentTrendsChart } from "@/components/pages/dashboard/enrollment-trends-chart";
import { RecentActivities } from "@/components/pages/dashboard/recent-activities";
import { TodaysEvents } from "@/components/pages/dashboard/todays-events";
import { Announcements } from "@/components/pages/dashboard/announcements";

export function DashboardPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <PageTitle
        title={t("dashboard")}
        subtitle={`${t("welcome_back_dashboard")}, John Smith`}
      />
      
      <StatsCards />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AttendanceChart />
        <GradeDistributionChart />
        <EnrollmentTrendsChart />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <TodaysEvents />
        <Announcements />
        <RecentActivities />
      </div>
    </div>
  );
}