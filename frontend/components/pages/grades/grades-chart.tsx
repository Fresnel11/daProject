"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GradesChartProps {
  selectedClass: string;
  selectedSubject: string;
  selectedPeriod: string;
}

// Mock data for the chart
const mockGradesData = [
  { month: "Sep", average: 85, highest: 95, lowest: 75 },
  { month: "Oct", average: 82, highest: 94, lowest: 70 },
  { month: "Nov", average: 88, highest: 98, lowest: 78 },
  { month: "Dec", average: 86, highest: 96, lowest: 76 },
  { month: "Jan", average: 84, highest: 94, lowest: 74 },
  { month: "Feb", average: 89, highest: 99, lowest: 79 },
];

export function GradesChart({
  selectedClass,
  selectedSubject,
  selectedPeriod,
}: GradesChartProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const textColor = isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))";
  const gridColor = isDark ? "hsl(var(--border))" : "hsl(var(--border))";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          {t("grade_evolution")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockGradesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke={textColor}
                tick={{ fill: textColor }}
              />
              <YAxis
                stroke={textColor}
                tick={{ fill: textColor }}
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
              <Line
                type="monotone"
                dataKey="highest"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lowest"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}