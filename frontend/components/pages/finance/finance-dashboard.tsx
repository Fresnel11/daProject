"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Users,
  FileText,
  CreditCard,
  Bell,
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
  LineChart,
  Line,
} from "recharts";

const mockFinancialData = {
  totalRevenue: 2450000,
  monthlyRevenue: 245000,
  pendingPayments: 125000,
  overduePayments: 45000,
  collectionRate: 92,
  totalStudents: 1250,
  paidStudents: 1150,
  pendingStudents: 75,
  overdueStudents: 25,
};

const mockRevenueData = [
  { month: "Jan", revenue: 220000, target: 250000 },
  { month: "Feb", revenue: 235000, target: 250000 },
  { month: "Mar", revenue: 245000, target: 250000 },
  { month: "Apr", revenue: 240000, target: 250000 },
  { month: "May", revenue: 255000, target: 250000 },
  { month: "Jun", revenue: 245000, target: 250000 },
];

const mockPaymentTypes = [
  { name: "Tuition", value: 1800000, color: "hsl(var(--chart-1))" },
  { name: "Registration", value: 350000, color: "hsl(var(--chart-2))" },
  { name: "Canteen", value: 180000, color: "hsl(var(--chart-3))" },
  { name: "Uniforms", value: 85000, color: "hsl(var(--chart-4))" },
  { name: "Activities", value: 35000, color: "hsl(var(--chart-5))" },
];

const mockRecentTransactions = [
  {
    id: "1",
    studentName: "Alice Johnson",
    class: "6th Grade A",
    type: "Tuition",
    amount: 45000,
    status: "paid",
    date: "2025-02-20",
    method: "Bank Transfer",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    class: "5th Grade B",
    type: "Canteen",
    amount: 15000,
    status: "pending",
    date: "2025-02-19",
    method: "Mobile Money",
  },
  {
    id: "3",
    studentName: "Charlie Brown",
    class: "7th Grade A",
    type: "Registration",
    amount: 25000,
    status: "overdue",
    date: "2025-02-15",
    method: "Cash",
  },
];

export function FinanceDashboard() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
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
                  {t("total_revenue")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(mockFinancialData.totalRevenue)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12%</span>
              <span className="text-sm text-muted-foreground ml-1">{t("vs_last_month")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("pending_payments")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(mockFinancialData.pendingPayments)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">
                {mockFinancialData.pendingStudents} {t("students")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("overdue_payments")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(mockFinancialData.overduePayments)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">
                {mockFinancialData.overdueStudents} {t("students")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("collection_rate")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockFinancialData.collectionRate}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={mockFinancialData.collectionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trends */}
        <Card className="animate-fade-in-up animate-stagger-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("revenue_trends")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    tick={{ fill: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))" }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                    }}
                    formatter={(value) => [formatCurrency(value as number), ""]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Types Distribution */}
        <Card className="animate-fade-in-up animate-stagger-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {t("payment_types_distribution")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPaymentTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {mockPaymentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "hsl(var(--popover))" : "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      color: isDark ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                    }}
                    formatter={(value) => [formatCurrency(value as number), ""]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="animate-fade-in-up animate-stagger-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t("recent_transactions")}
            </CardTitle>
            <Button variant="outline" size="sm">
              {t("view_all")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.class} • {transaction.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(transaction.status)}>
                      {t(transaction.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
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
              <CreditCard className="h-6 w-6" />
              {t("record_payment")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              {t("generate_invoice")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="h-6 w-6" />
              {t("send_reminders")}
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              {t("view_debtors")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}