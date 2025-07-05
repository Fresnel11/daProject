"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gradeDistribution } from "@/lib/data/mock";
import { useTheme } from "next-themes";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function GradeDistributionChart() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {t("grade_distribution")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="students"
                nameKey="grade"
                label={({ grade }) => grade}
                labelLine={false}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                }}
                formatter={(value, name) => [value, `Grade ${name}`]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}