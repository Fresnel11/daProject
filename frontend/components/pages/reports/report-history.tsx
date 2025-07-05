"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Eye, 
  Send, 
  Search,
  Filter,
  Calendar,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockReportHistory = [
  {
    id: "1",
    period: "Semester 1",
    class: "6th Grade A",
    studentsCount: 25,
    generatedDate: "2024-01-15",
    generatedBy: "Mrs. Johnson",
    status: "completed",
    downloadCount: 12,
  },
  {
    id: "2",
    period: "Quarter 2",
    class: "7th Grade B",
    studentsCount: 23,
    generatedDate: "2024-01-10",
    generatedBy: "Mr. Smith",
    status: "completed",
    downloadCount: 8,
  },
  {
    id: "3",
    period: "Quarter 1",
    class: "8th Grade A",
    studentsCount: 27,
    generatedDate: "2024-01-05",
    generatedBy: "Dr. Wilson",
    status: "pending",
    downloadCount: 0,
  },
];

export function ReportHistory() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(mockReportHistory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {t("report_generation_history")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search_reports")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  {t("filter")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{t("all_periods")}</DropdownMenuItem>
                <DropdownMenuItem>{t("semester_1")}</DropdownMenuItem>
                <DropdownMenuItem>{t("semester_2")}</DropdownMenuItem>
                <DropdownMenuItem>{t("quarter_1")}</DropdownMenuItem>
                <DropdownMenuItem>{t("quarter_2")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("period")}</TableHead>
                <TableHead>{t("class")}</TableHead>
                <TableHead className="text-center">{t("students")}</TableHead>
                <TableHead>{t("generated_date")}</TableHead>
                <TableHead>{t("generated_by")}</TableHead>
                <TableHead className="text-center">{t("status")}</TableHead>
                <TableHead className="text-center">{t("downloads")}</TableHead>
                <TableHead className="text-center">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {report.period}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {report.class}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">
                      {report.studentsCount}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(report.status)}>
                      {t(report.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {report.downloadCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        disabled={report.status !== "completed"}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        disabled={report.status !== "completed"}
                      >
                        <Send className="h-3 w-3" />
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
  );
}