"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Printer,
  Download,
  Send
} from "lucide-react";
import { RecordPaymentModal } from "@/components/pages/finance/record-payment-modal";
import { cn } from "@/lib/utils";

const mockPayments = [
  {
    id: "1",
    studentName: "Alice Johnson",
    studentId: "STU001",
    class: "6th Grade A",
    feeType: "Tuition",
    period: "February 2025",
    amount: 45000,
    paidAmount: 45000,
    status: "paid",
    paymentDate: "2025-02-20",
    paymentMethod: "Bank Transfer",
    reference: "TXN001234",
    dueDate: "2025-02-15",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    studentId: "STU002",
    class: "5th Grade B",
    feeType: "Canteen",
    period: "February 2025",
    amount: 15000,
    paidAmount: 10000,
    status: "partial",
    paymentDate: "2025-02-19",
    paymentMethod: "Mobile Money",
    reference: "TXN001235",
    dueDate: "2025-02-15",
  },
  {
    id: "3",
    studentName: "Charlie Brown",
    studentId: "STU003",
    class: "7th Grade A",
    feeType: "Registration",
    period: "2025-2026",
    amount: 25000,
    paidAmount: 0,
    status: "overdue",
    paymentDate: null,
    paymentMethod: null,
    reference: null,
    dueDate: "2025-02-10",
  },
  {
    id: "4",
    studentName: "Diana Prince",
    studentId: "STU004",
    class: "8th Grade A",
    feeType: "Uniforms",
    period: "2025-2026",
    amount: 35000,
    paidAmount: 0,
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
    reference: null,
    dueDate: "2025-02-25",
  },
];

export function PaymentManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [feeTypeFilter, setFeeTypeFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "partial": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
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

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesFeeType = feeTypeFilter === "all" || payment.feeType === feeTypeFilter;
    const matchesClass = classFilter === "all" || payment.class === classFilter;
    
    return matchesSearch && matchesStatus && matchesFeeType && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_payments")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="paid">{t("paid")}</SelectItem>
              <SelectItem value="partial">{t("partial")}</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="overdue">{t("overdue")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={feeTypeFilter} onValueChange={setFeeTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("fee_type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_types")}</SelectItem>
              <SelectItem value="Tuition">{t("tuition")}</SelectItem>
              <SelectItem value="Registration">{t("registration_fee")}</SelectItem>
              <SelectItem value="Canteen">{t("canteen")}</SelectItem>
              <SelectItem value="Uniforms">{t("uniform")}</SelectItem>
              <SelectItem value="Activities">{t("activities")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("class")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_classes")}</SelectItem>
              <SelectItem value="5th Grade B">5th Grade B</SelectItem>
              <SelectItem value="6th Grade A">6th Grade A</SelectItem>
              <SelectItem value="7th Grade A">7th Grade A</SelectItem>
              <SelectItem value="8th Grade A">8th Grade A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
          <Button onClick={() => setIsRecordModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("record_payment")}
          </Button>
        </div>
      </div>

      {/* Payments Table */}
      <Card className="animate-fade-in-up animate-stagger-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("payment_records")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("student")}</TableHead>
                  <TableHead>{t("class")}</TableHead>
                  <TableHead>{t("fee_type")}</TableHead>
                  <TableHead>{t("period")}</TableHead>
                  <TableHead className="text-right">{t("amount")}</TableHead>
                  <TableHead className="text-right">{t("paid_amount")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead>{t("due_date")}</TableHead>
                  <TableHead>{t("payment_method")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.studentName}</p>
                        <p className="text-sm text-muted-foreground">{payment.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(payment.feeType.toLowerCase() === "registration" ? "registration_fee" : payment.feeType.toLowerCase() === "uniforms" ? "uniform" : payment.feeType.toLowerCase())}</Badge>
                    </TableCell>
                    <TableCell>{payment.period}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        <span className="font-medium">{formatCurrency(payment.paidAmount)}</span>
                        {payment.status === "partial" && (
                          <p className="text-xs text-muted-foreground">
                            {t("remaining")}: {formatCurrency(payment.amount - payment.paidAmount)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(payment.status))}>
                        {t(payment.status === "partial" ? "partial" : payment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "text-sm",
                        payment.status === "overdue" && "text-red-600 font-medium"
                      )}>
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {payment.paymentMethod ? (
                        <div>
                          <p className="text-sm">{payment.paymentMethod}</p>
                          {payment.reference && (
                            <p className="text-xs text-muted-foreground">{payment.reference}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view_details")}
                          </DropdownMenuItem>
                          {payment.status !== "paid" && (
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              {t("record_payment")}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            {t("print")}
                          </DropdownMenuItem>
                          {payment.status === "overdue" && (
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              {t("send_reminder")}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <RecordPaymentModal
        open={isRecordModalOpen}
        onOpenChange={setIsRecordModalOpen}
      />
    </div>
  );
}