"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  Eye,
  Settings
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const mockDashboardData = {
  totalRegistrations: 1247,
  newStudents: 342,
  reRegistrations: 905,
  pendingApplications: 67,
  completedApplications: 1180,
  rejectedApplications: 23,
  totalCapacity: 1500,
  availableSpots: 253,
};

const mockClassData = [
  { level: "CP1", registered: 28, capacity: 30, status: "warning" },
  { level: "CP2", registered: 30, capacity: 30, status: "full" },
  { level: "CE1", registered: 25, capacity: 30, status: "available" },
  { level: "CE2", registered: 29, capacity: 30, status: "warning" },
  { level: "CM1", registered: 27, capacity: 30, status: "available" },
  { level: "CM2", registered: 30, capacity: 30, status: "full" },
  { level: "6ème", registered: 32, capacity: 35, status: "available" },
  { level: "5ème", registered: 34, capacity: 35, status: "warning" },
];

const mockRegistrationTrends = [
  { month: "Jan", newStudents: 45, reRegistrations: 120 },
  { month: "Feb", newStudents: 67, reRegistrations: 180 },
  { month: "Mar", newStudents: 89, reRegistrations: 220 },
  { month: "Apr", newStudents: 78, reRegistrations: 195 },
  { month: "May", newStudents: 63, reRegistrations: 190 },
];

const mockStatusDistribution = [
  { name: "Completed", value: 1180, color: "hsl(var(--chart-2))" },
  { name: "Pending", value: 67, color: "hsl(var(--chart-4))" },
  { name: "Rejected", value: 23, color: "hsl(var(--chart-1))" },
];

export function RegistrationDashboard() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "full": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "available": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "full": return <AlertTriangle className="h-4 w-4" />;
      case "warning": return <Clock className="h-4 w-4" />;
      case "available": return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_registrations")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockDashboardData.totalRegistrations.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                value={(mockDashboardData.totalRegistrations / mockDashboardData.totalCapacity) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {mockDashboardData.availableSpots} {t("spots_remaining")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("new_students")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockDashboardData.newStudents}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12%</span>
              <span className="text-sm text-muted-foreground ml-1">{t("vs_last_year")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("re_registrations")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDashboardData.reRegistrations}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+8%</span>
              <span className="text-sm text-muted-foreground ml-1">{t("vs_last_year")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("pending_applications")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockDashboardData.pendingApplications}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-3 w-3 mr-1" />
                {t("review_pending")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Class Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Registration Trends */}
        <Card className="animate-fade-in-up animate-stagger-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("registration_trends")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockRegistrationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="newStudents" name={t("new_students")} fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="reRegistrations" name={t("re_registrations")} fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Application Status Distribution */}
        <Card className="animate-fade-in-up animate-stagger-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("application_status")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {mockStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Capacity Overview */}
      <Card className="animate-fade-in-up animate-stagger-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t("class_capacity_overview")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                {t("export_report")}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t("download_data")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockClassData.map((classInfo, index) => (
              <div
                key={classInfo.level}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md animate-fade-in-up animate-stagger-${index + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{classInfo.level}</h3>
                  <Badge className={getStatusColor(classInfo.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(classInfo.status)}
                      {t(classInfo.status)}
                    </div>
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("registered")}</span>
                    <span className="font-medium">{classInfo.registered}/{classInfo.capacity}</span>
                  </div>
                  <Progress 
                    value={(classInfo.registered / classInfo.capacity) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{classInfo.capacity - classInfo.registered} {t("spots_left")}</span>
                    <span>{Math.round((classInfo.registered / classInfo.capacity) * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="animate-fade-in-up animate-stagger-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("quick_actions")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              {t("add_new_student")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UserCheck className="h-6 w-6" />
              {t("process_re_registration")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              {t("generate_reports")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              {t("campaign_settings")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}