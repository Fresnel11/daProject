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
  MoreHorizontal, 
  Eye, 
  Download,
  Send,
  Printer,
  FileText
} from "lucide-react";
import { GenerateInvoiceModal } from "@/components/pages/finance/generate-invoice-modal";
import { cn } from "@/lib/utils";

const mockInvoices = [
  {
    id: "INV-2025-001",
    studentName: "Alice Johnson",
    studentId: "STU001",
    class: "6th Grade A",
    feeType: "Tuition",
    period: "February 2025",
    amount: 45000,
    status: "paid",
    generatedDate: "2025-02-01",
    dueDate: "2025-02-15",
    paidDate: "2025-02-10",
  },
  {
    id: "INV-2025-002",
    studentName: "Bob Smith",
    studentId: "STU002",
    class: "5th Grade B",
    feeType: "Canteen",
    period: "February 2025",
    amount: 15000,
    status: "pending",
    generatedDate: "2025-02-01",
    dueDate: "2025-02-15",
    paidDate: null,
  },
  {
    id: "INV-2025-003",
    studentName: "Charlie Brown",
    studentId: "STU003",
    class: "7th Grade A",
    feeType: "Registration",
    period: "2025-2026",
    amount: 25000,
    status: "overdue",
    generatedDate: "2025-01-15",
    dueDate: "2025-02-10",
    paidDate: null,
  },
];

export function InvoiceGeneration() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

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

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_invoices")}
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
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="overdue">{t("overdue")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setIsGenerateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("generate_invoice")}
        </Button>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_invoices")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockInvoices.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("paid_invoices")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockInvoices.filter(i => i.status === "paid").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("pending_invoices")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockInvoices.filter(i => i.status === "pending").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("overdue_invoices")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {mockInvoices.filter(i => i.status === "overdue").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("invoice_list")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("invoice_number")}</TableHead>
                  <TableHead>{t("student")}</TableHead>
                  <TableHead>{t("class")}</TableHead>
                  <TableHead>{t("fee_type")}</TableHead>
                  <TableHead>{t("period")}</TableHead>
                  <TableHead className="text-right">{t("amount")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead>{t("generated_date")}</TableHead>
                  <TableHead>{t("due_date")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.studentName}</p>
                        <p className="text-sm text-muted-foreground">{invoice.studentId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.class}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(invoice.feeType.toLowerCase())}</Badge>
                    </TableCell>
                    <TableCell>{invoice.period}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(invoice.status))}>
                        {t(invoice.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.generatedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "text-sm",
                        invoice.status === "overdue" && "text-red-600 font-medium"
                      )}>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
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
                            {t("view_invoice")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            {t("download_pdf")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            {t("print")}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            {t("send_by_email")}
                          </DropdownMenuItem>
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

      <GenerateInvoiceModal
        open={isGenerateModalOpen}
        onOpenChange={setIsGenerateModalOpen}
      />
    </div>
  );
}