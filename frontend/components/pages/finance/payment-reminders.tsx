"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Send, 
  Search, 
  Mail, 
  MessageSquare, 
  Printer,
  Clock,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockOverduePayments = [
  {
    id: "1",
    studentName: "Charlie Brown",
    studentId: "STU003",
    class: "7th Grade A",
    parentEmail: "sarah.brown@email.com",
    parentPhone: "+225 07 12 34 56 78",
    feeType: "Registration",
    amount: 25000,
    dueDate: "2025-02-10",
    daysPastDue: 10,
    lastReminderSent: null,
    reminderCount: 0,
  },
  {
    id: "2",
    studentName: "Eva Martinez",
    studentId: "STU005",
    class: "5th Grade A",
    parentEmail: "carlos.martinez@email.com",
    parentPhone: "+225 05 98 76 54 32",
    feeType: "Tuition",
    amount: 45000,
    dueDate: "2025-02-05",
    daysPastDue: 15,
    lastReminderSent: "2025-02-12",
    reminderCount: 1,
  },
  {
    id: "3",
    studentName: "Frank Wilson",
    studentId: "STU006",
    class: "8th Grade B",
    parentEmail: "linda.wilson@email.com",
    parentPhone: "+225 01 23 45 67 89",
    feeType: "Canteen",
    amount: 15000,
    dueDate: "2025-01-30",
    daysPastDue: 21,
    lastReminderSent: "2025-02-15",
    reminderCount: 2,
  },
];

export function PaymentReminders() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [reminderType, setReminderType] = useState("email");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysPastDueColor = (days: number) => {
    if (days <= 7) return "text-yellow-600";
    if (days <= 14) return "text-orange-600";
    return "text-red-600";
  };

  const getReminderCountColor = (count: number) => {
    if (count === 0) return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    if (count <= 2) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  const filteredPayments = mockOverduePayments.filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAllStudents = () => {
    if (selectedStudents.length === filteredPayments.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredPayments.map(p => p.id));
    }
  };

  const sendBulkReminders = () => {
    console.log(`Sending ${reminderType} reminders to:`, selectedStudents);
    // Simulate sending reminders
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_students")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          
          <Select value={reminderType} onValueChange={setReminderType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("reminder_type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </div>
              </SelectItem>
              <SelectItem value="sms">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {t("sms")}
                </div>
              </SelectItem>
              <SelectItem value="print">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  {t("print")}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedStudents.length > 0 && (
            <Button onClick={sendBulkReminders}>
              <Send className="mr-2 h-4 w-4" />
              {t("send_reminders")} ({selectedStudents.length})
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("overdue_payments")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {mockOverduePayments.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_overdue_amount")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(mockOverduePayments.reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("avg_days_overdue")}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(mockOverduePayments.reduce((sum, p) => sum + p.daysPastDue, 0) / mockOverduePayments.length)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("reminders_sent")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockOverduePayments.reduce((sum, p) => sum + p.reminderCount, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Payments Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t("overdue_payments_list")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedStudents.length === filteredPayments.length}
                onCheckedChange={selectAllStudents}
              />
              <span className="text-sm text-muted-foreground">
                {t("select_all")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>{t("student")}</TableHead>
                  <TableHead>{t("class")}</TableHead>
                  <TableHead>{t("contact")}</TableHead>
                  <TableHead>{t("fee_type")}</TableHead>
                  <TableHead className="text-right">{t("amount")}</TableHead>
                  <TableHead>{t("due_date")}</TableHead>
                  <TableHead className="text-center">{t("days_overdue")}</TableHead>
                  <TableHead className="text-center">{t("reminders_sent")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(payment.id)}
                        onCheckedChange={() => toggleStudentSelection(payment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.studentName}</p>
                        <p className="text-sm text-muted-foreground">{payment.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{payment.parentEmail}</p>
                        <p className="text-muted-foreground">{payment.parentPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(payment.feeType.toLowerCase())}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-red-600 font-medium">
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn("font-semibold", getDaysPastDueColor(payment.daysPastDue))}>
                        {payment.daysPastDue} {t("days")}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-1">
                        <Badge className={cn("font-normal", getReminderCountColor(payment.reminderCount))}>
                          {payment.reminderCount}
                        </Badge>
                        {payment.lastReminderSent && (
                          <p className="text-xs text-muted-foreground">
                            {t("last")}: {new Date(payment.lastReminderSent).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Printer className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}