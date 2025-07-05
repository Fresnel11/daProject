"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

interface GradesSummaryProps {
  selectedClass: string;
  selectedSubject: string;
  selectedPeriod: string;
}

const mockClassStats = {
  totalStudents: 25,
  averageGrade: 15.2,
  passRate: 88,
  excellenceRate: 32,
  classAverage: 15.2,
  subjectAverages: [
    { subject: "Mathematics", average: 14.8, students: 25 },
    { subject: "English", average: 15.6, students: 25 },
    { subject: "Science", average: 15.0, students: 25 },
    { subject: "History", average: 16.2, students: 25 },
  ],
  gradeDistribution: [
    { range: "18-20", count: 8, percentage: 32 },
    { range: "16-18", count: 7, percentage: 28 },
    { range: "14-16", count: 6, percentage: 24 },
    { range: "12-14", count: 3, percentage: 12 },
    { range: "0-12", count: 1, percentage: 4 },
  ],
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function GradesSummary({
  selectedClass,
  selectedSubject,
  selectedPeriod,
}: GradesSummaryProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("class_average")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockClassStats.classAverage}/20
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">📊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("pass_rate")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockClassStats.passRate}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("excellence_rate")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockClassStats.excellenceRate}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_students")}
                </p>
                <p className="text-2xl font-bold">
                  {mockClassStats.totalStudents}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 font-bold">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Subject Averages */}
        <Card className="animate-fade-in-up animate-stagger-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("subject_averages")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockClassStats.subjectAverages}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    domain={[0, 20]}
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="animate-fade-in-up animate-stagger-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("grade_distribution")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockClassStats.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="range"
                  >
                    {mockClassStats.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      {/* Detailed Subject Performance */}
      <Card className="animate-fade-in-up animate-stagger-3">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("detailed_performance")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClassStats.subjectAverages.map((subject, index) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {subject.average}/20
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {subject.students} {t("students")}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(subject.average / 20) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}