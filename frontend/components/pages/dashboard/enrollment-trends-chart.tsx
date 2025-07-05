"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { enrollmentTrends } from "@/lib/data/mock";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function EnrollmentTrendsChart() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const textColor = isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))";
  const gridColor = isDark ? "hsl(var(--border))" : "hsl(var(--border))";
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {t("enrollment_trends")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={enrollmentTrends}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={{ stroke: gridColor }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={{ stroke: gridColor }}
                axisLine={{ stroke: gridColor }}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  color: textColor,
                }}
              />
              <Area
                type="monotone"
                dataKey="students"
                stroke="hsl(var(--chart-3))"
                fillOpacity={1}
                fill="url(#colorStudents)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}