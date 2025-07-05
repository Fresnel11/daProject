"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceData } from "@/lib/data/mock";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AttendanceChart() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const textColor = isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))";
  const gridColor = isDark ? "hsl(var(--border))" : "hsl(var(--border))";
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {t("attendance_overview")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attendanceData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={{ stroke: gridColor }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={{ stroke: gridColor }}
                axisLine={{ stroke: gridColor }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  color: textColor,
                }}
              />
              <Legend />
              <Bar
                dataKey="present"
                name={t("present")}
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="absent"
                name={t("absent")}
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="late"
                name={t("late")}
                fill="hsl(var(--chart-4))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}