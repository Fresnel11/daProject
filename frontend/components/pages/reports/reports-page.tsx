"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { ReportFilters } from "@/components/pages/reports/report-filters";
import { ReportCardGenerator } from "@/components/pages/reports/report-card-generator";
import { ReportHistory } from "@/components/pages/reports/report-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ReportsPage() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester-1");
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <PageTitle
        title={t("report_cards")}
        subtitle={t("generate_and_manage_report_cards")}
      />
      
      <ReportFilters
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">{t("generate_reports")}</TabsTrigger>
          <TabsTrigger value="history">{t("report_history")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="space-y-6">
          <ReportCardGenerator
            selectedClass={selectedClass}
            selectedPeriod={selectedPeriod}
            selectedStudent={selectedStudent}
          />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <ReportHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}