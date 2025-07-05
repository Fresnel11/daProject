"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface AttendanceOverviewProps {
  selectedClass: string;
  selectedDate: Date;
}

// Données simulées pour une semaine (7 jours avant la date sélectionnée)
const mockData = [
  { date: "2025-05-22", present: 80, absent: 15, late: 5 },
  { date: "2025-05-23", present: 82, absent: 12, late: 6 },
  { date: "2025-05-24", present: 85, absent: 10, late: 5 },
  { date: "2025-05-25", present: 78, absent: 16, late: 6 },
  { date: "2025-05-26", present: 83, absent: 13, late: 4 },
  { date: "2025-05-27", present: 86, absent: 10, late: 4 },
  { date: "2025-05-28", present: 85, absent: 10, late: 5 },
];

// Données simulées pour les mini-graphiques des quick stats
const quickStatData = {
  total_students: [35, 36, 37, 38, 38, 38, 38],
  attendance_rate: [80, 81, 83, 85, 84, 86, 85],
  absences: [6, 5, 4, 4, 5, 4, 4],
  late_arrivals: [3, 2, 2, 2, 3, 2, 2],
};

export function AttendanceOverview({
  selectedClass,
  selectedDate,
}: AttendanceOverviewProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            {t("attendance_summary")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "hsl(var(--muted))" : "hsl(var(--muted))"}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))"}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  }
                />
                <YAxis
                  stroke={isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))"}
                  label={{
                    value: t("percentage"),
                    angle: -90,
                    position: "insideLeft",
                    offset: -5,
                    fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                  }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  name={t("present")}
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  name={t("absent")}
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="late"
                  name={t("late")}
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle className="textOri-sm font-medium text-muted-foreground">
              {t("total_students")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-2xl font-bold">38</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quickStatData.total_students.map((v, i) => ({ x: i, y: v }))}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-green-500">+5.3%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("attendance_rate")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-2xl font-bold">85%</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quickStatData.attendance_rate.map((v, i) => ({ x: i, y: v }))}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-green-500">+2.1%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("absences")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-2xl font-bold">4</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quickStatData.absences.map((v, i) => ({ x: i, y: v }))}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-red-500">-10.0%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("late_arrivals")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <p className="text-2xl font-bold">2</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quickStatData.late_arrivals.map((v, i) => ({ x: i, y: v }))}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-medium text-red-500">-7.6%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}