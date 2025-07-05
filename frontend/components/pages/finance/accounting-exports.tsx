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
  Download, 
  FileText, 
  Calendar,
  Filter,
  Eye,
  Trash,
  Plus,
  Search,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { ExportDataModal } from "@/components/pages/finance/export-data-modal";
import { cn } from "@/lib/utils";

const mockExports = [
  {
    id: "1",
    name: "February 2025 Financial Report",
    type: "monthly_report",
    format: "PDF",
    period: "February 2025",
    generatedDate: "2025-02-20",
    fileSize: "2.4 MB",
    status: "completed",
    downloadCount: 3,
  },
  {
    id: "2",
    name: "Q1 2025 Accounting Export",
    type: "quarterly_export",
    format: "Excel",
    period: "Q1 2025",
    generatedDate: "2025-02-18",
    fileSize: "1.8 MB",
    status: "completed",
    downloadCount: 1,
  },
  {
    id: "3",
    name: "Student Payment History",
    type: "payment_history",
    format: "CSV",
    period: "January 2025",
    generatedDate: "2025-02-15",
    fileSize: "3.2 MB",
    status: "completed",
    downloadCount: 5,
  },
  {
    id: "4",
    name: "Annual Financial Report 2024",
    type: "annual_report",
    format: "PDF",
    period: "2024",
    generatedDate: "2025-02-10",
    fileSize: "5.1 MB",
    status: "completed",
    downloadCount: 8,
  },
  {
    id: "5",
    name: "March 2025 Revenue Analysis",
    type: "monthly_report",
    format: "Excel",
    period: "March 2025",
    generatedDate: "2025-02-25",
    fileSize: "1.2 MB",
    status: "processing",
    downloadCount: 0,
  },
];

const exportTypes = [
  { id: "all", name: "Tous les types" },
  { id: "monthly_report", name: "Rapport mensuel" },
  { id: "quarterly_export", name: "Export trimestriel" },
  { id: "annual_report", name: "Rapport annuel" },
  { id: "payment_history", name: "Historique des paiements" },
  { id: "student_finances", name: "Finances étudiantes" },
];

const exportFormats = [
  { id: "all", name: "Tous les formats" },
  { id: "PDF", name: "PDF" },
  { id: "Excel", name: "Excel" },
  { id: "CSV", name: "CSV" },
  { id: "JSON", name: "JSON" },
];

export function AccountingExports() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [exports, setExports] = useState(mockExports);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "failed": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredExports = exports.filter(exportItem => {
    const matchesSearch = 
      exportItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exportItem.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || exportItem.type === typeFilter;
    const matchesFormat = formatFilter === "all" || exportItem.format === formatFilter;
    const matchesStatus = statusFilter === "all" || exportItem.status === statusFilter;
    
    return matchesSearch && matchesType && matchesFormat && matchesStatus;
  });

  const handleCreateExport = (exportData: any) => {
    const newExport = {
      id: Date.now().toString(),
      name: exportData.name,
      type: exportData.type,
      format: exportData.format,
      period: `${new Date(exportData.startDate).toLocaleDateString()} - ${new Date(exportData.endDate).toLocaleDateString()}`,
      generatedDate: new Date().toISOString().split('T')[0],
      fileSize: "Calculating...",
      status: "processing",
      downloadCount: 0,
    };
    
    setExports([newExport, ...exports]);
    
    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setExports(prev => prev.map(exp => 
        exp.id === newExport.id 
          ? { ...exp, status: "completed", fileSize: "2.1 MB" }
          : exp
      ));
    }, 3000);
  };

  const handleDeleteExport = (exportId: string) => {
    setExports(exports.filter(exp => exp.id !== exportId));
  };

  const handleDownload = (exportItem: any) => {
    // Simulate download
    console.log(`Downloading ${exportItem.name}`);
    setExports(prev => prev.map(exp => 
      exp.id === exportItem.id 
        ? { ...exp, downloadCount: exp.downloadCount + 1 }
        : exp
    ));
  };

  const totalExports = exports.length;
  const completedExports = exports.filter(exp => exp.status === "completed").length;
  const totalDownloads = exports.reduce((sum, exp) => sum + exp.downloadCount, 0);
  const totalFileSize = exports
    .filter(exp => exp.status === "completed")
    .reduce((sum, exp) => sum + parseFloat(exp.fileSize.split(' ')[0]), 0);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_exports")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("type")} />
            </SelectTrigger>
            <SelectContent>
              {exportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("format")} />
            </SelectTrigger>
            <SelectContent>
              {exportFormats.map((format) => (
                <SelectItem key={format.id} value={format.id}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="completed">{t("completed")}</SelectItem>
              <SelectItem value="processing">{t("processing")}</SelectItem>
              <SelectItem value="failed">{t("failed")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setIsExportModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("create_export")}
        </Button>
      </div>

      {/* Export Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_exports")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {totalExports}
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
                  {t("completed_exports")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {completedExports}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_downloads")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalDownloads}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_size")}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalFileSize.toFixed(1)} MB
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exports Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("export_history")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("export_name")}</TableHead>
                  <TableHead>{t("type")}</TableHead>
                  <TableHead>{t("format")}</TableHead>
                  <TableHead>{t("period")}</TableHead>
                  <TableHead>{t("generated_date")}</TableHead>
                  <TableHead className="text-center">{t("file_size")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead className="text-center">{t("downloads")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExports.map((exportItem) => (
                  <TableRow key={exportItem.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {exportItem.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {exportTypes.find(t => t.id === exportItem.type)?.name || exportItem.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {exportItem.format}
                      </Badge>
                    </TableCell>
                    <TableCell>{exportItem.period}</TableCell>
                    <TableCell>
                      {new Date(exportItem.generatedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {exportItem.fileSize}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(exportItem.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(exportItem.status)}
                          {t(exportItem.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">
                        {exportItem.downloadCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {exportItem.status === "completed" && (
                            <DropdownMenuItem
                              onClick={() => handleDownload(exportItem)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {t("download")}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              // View export details
                              console.log("View export details:", exportItem);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view_details")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteExport(exportItem.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            {t("delete")}
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

      {/* Export Modal */}
      <ExportDataModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        onExport={handleCreateExport}
      />
    </div>
  );
}