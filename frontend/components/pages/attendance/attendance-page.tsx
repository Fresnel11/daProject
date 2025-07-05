"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { AttendanceOverview } from "@/components/pages/attendance/attendance-overview";
import { AttendanceTable } from "@/components/pages/attendance/attendance-table";
import { AttendanceFilters } from "@/components/pages/attendance/attendance-filters";

export function AttendancePage() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <PageTitle
        title={t("attendance")}
        subtitle={t("track_attendance")}
      />
      
      <AttendanceFilters
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      
      <AttendanceOverview
        selectedClass={selectedClass}
        selectedDate={selectedDate}
      />
      
      <AttendanceTable
        selectedClass={selectedClass}
        selectedDate={selectedDate}
      />
    </div>
  );
}