"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye,
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { NewStudentModal } from "@/components/pages/registrations/new-student-modal";
import { cn } from "@/lib/utils";

const mockNewStudents = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dubois",
    dateOfBirth: "2015-03-15",
    requestedLevel: "CP1",
    parentName: "Jean Dubois",
    parentEmail: "jean.dubois@email.com",
    parentPhone: "06 12 34 56 78",
    status: "pending",
    submissionDate: "2025-02-10",
    documents: ["birth_certificate", "vaccination_record", "photo"],
    fees: {
      registration: 50,
      uniform: 75,
      books: 120,
      total: 245
    },
    paymentStatus: "pending"
  },
  {
    id: "2",
    firstName: "Lucas",
    lastName: "Martin",
    dateOfBirth: "2013-07-22",
    requestedLevel: "CE2",
    parentName: "Sophie Martin",
    parentEmail: "sophie.martin@email.com",
    parentPhone: "06 98 76 54 32",
    status: "approved",
    submissionDate: "2025-02-08",
    documents: ["birth_certificate", "vaccination_record", "photo", "previous_school_report"],
    fees: {
      registration: 50,
      uniform: 75,
      books: 120,
      total: 245
    },
    paymentStatus: "paid"
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Leroy",
    dateOfBirth: "2011-11-03",
    requestedLevel: "6ème",
    parentName: "Pierre Leroy",
    parentEmail: "pierre.leroy@email.com",
    parentPhone: "06 55 44 33 22",
    status: "rejected",
    submissionDate: "2025-02-05",
    documents: ["birth_certificate", "vaccination_record"],
    fees: {
      registration: 50,
      uniform: 75,
      books: 120,
      total: 245
    },
    paymentStatus: "pending",
    rejectionReason: "Incomplete documentation"
  },
];

export function StudentRegistrations() {
  const { t } = useTranslation();
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "draft": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-3 w-3" />;
      case "pending": return <Clock className="h-3 w-3" />;
      case "rejected": return <XCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredStudents = mockNewStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesLevel = levelFilter === "all" || student.requestedLevel === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="approved">{t("approved")}</SelectItem>
              <SelectItem value="rejected">{t("rejected")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("level")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_levels")}</SelectItem>
              <SelectItem value="CP1">CP1</SelectItem>
              <SelectItem value="CP2">CP2</SelectItem>
              <SelectItem value="CE1">CE1</SelectItem>
              <SelectItem value="CE2">CE2</SelectItem>
              <SelectItem value="CM1">CM1</SelectItem>
              <SelectItem value="CM2">CM2</SelectItem>
              <SelectItem value="6ème">6ème</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
          <Button onClick={() => setIsNewStudentModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("add_new_student")}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_applications")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockNewStudents.length}
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
                  {t("pending_review")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockNewStudents.filter(s => s.status === "pending").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("approved")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockNewStudents.filter(s => s.status === "approved").length}
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
                  {t("rejected")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {mockNewStudents.filter(s => s.status === "rejected").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("new_student_applications")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("student_name")}</TableHead>
                  <TableHead>{t("date_of_birth")}</TableHead>
                  <TableHead>{t("requested_level")}</TableHead>
                  <TableHead>{t("parent_contact")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead className="text-center">{t("documents")}</TableHead>
                  <TableHead className="text-center">{t("payment")}</TableHead>
                  <TableHead>{t("submission_date")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div>{student.firstName} {student.lastName}</div>
                        {student.status === "rejected" && student.rejectionReason && (
                          <div className="text-xs text-red-600 mt-1">
                            {student.rejectionReason}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.requestedLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{student.parentName}</div>
                        <div className="text-muted-foreground">{student.parentEmail}</div>
                        <div className="text-muted-foreground">{student.parentPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(student.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(student.status)}
                          {t(student.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm">
                        <div className="font-medium">{student.documents.length}/4</div>
                        <div className="text-muted-foreground">{t("documents")}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm">
                        <Badge className={cn("font-normal", getPaymentStatusColor(student.paymentStatus))}>
                          {t(student.paymentStatus)}
                        </Badge>
                        <div className="text-muted-foreground mt-1">
                          €{student.fees.total}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(student.submissionDate).toLocaleDateString()}
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("edit")}
                          </DropdownMenuItem>
                          {student.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {t("approve")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                {t("reject")}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-destructive">
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

      <NewStudentModal
        open={isNewStudentModalOpen}
        onOpenChange={setIsNewStudentModalOpen}
      />
    </div>
  );
}