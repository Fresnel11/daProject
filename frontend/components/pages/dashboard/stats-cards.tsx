"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BookOpenCheck, 
  GraduationCap, 
  Star, 
  Users 
} from "lucide-react";
import { 
  attendanceStats, 
  gradeStats, 
  staffStats, 
  studentStats 
} from "@/lib/data/mock";
import { cn } from "@/lib/utils";

export function StatsCards() {
  const { t } = useTranslation();
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Students Card */}
      <StatsCard
        title={t("total_students")}
        value={studentStats.total.toString()}
        change={studentStats.trend}
        icon={<GraduationCap className="h-5 w-5" />}
      />
      
      {/* Total Staff Card */}
      <StatsCard
        title={t("total_staff")}
        value={staffStats.total.toString()}
        change={staffStats.trend}
        icon={<Users className="h-5 w-5" />}
      />
      
      {/* Attendance Rate Card */}
      <StatsCard
        title={t("attendance_rate")}
        value={`${attendanceStats.average}%`}
        change={attendanceStats.trend}
        icon={<BookOpenCheck className="h-5 w-5" />}
      />
      
      {/* Average Grade Card */}
      <StatsCard
        title={t("average_grade")}
        value={gradeStats.averageGrade}
        subValue={`${gradeStats.averagePercentage}%`}
        change={gradeStats.trend}
        icon={<Star className="h-5 w-5" />}
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  subValue?: string;
  change: number;
  icon: React.ReactNode;
}

function StatsCard({ title, value, subValue, change, icon }: StatsCardProps) {
  const { t } = useTranslation();
  
  const isPositive = change > 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-primary/10 p-2 text-primary">
              {icon}
            </span>
            
            <div className={cn(
              "flex items-center text-sm font-medium",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {Math.abs(change)}%
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              {subValue && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {subValue}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.abs(change)}% {isPositive ? t("increase") : t("decrease")} {t("from_previous_period")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}