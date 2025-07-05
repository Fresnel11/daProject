"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  MoreHorizontal, 
  Edit, 
  Eye,
  UserCheck,
  Users,
  Send,
  Search,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockReRegistrations = [
  {
    id: "1",
    studentId: "STU001",
    firstName: "Alice",
    lastName: "Johnson",
    currentLevel: "CP2",
    proposedLevel: "CE1",
    parentName: "Marie Johnson",
    parentEmail: "marie.johnson@email.com",
    status: "completed",
    lastYear: "2024-2025",
    nextYear: "2025-2026",
    autoProgression: true,
    fees: {
      reregistration: 30,
      uniform: 0,
      books: 120,
      total: 150
    },
    paymentStatus: "paid",
    submissionDate: "2025-02-12"
  },
  {
    id: "2",
    studentId: "STU002",
    firstName: "Bob",
    lastName: "Smith",
    currentLevel: "CE1",
    proposedLevel: "CE2",
    parentName: "John Smith",
    parentEmail: "john.smith@email.com",
    status: "pending",
    lastYear: "2024-2025",
    nextYear: "2025-2026",
    autoProgression: true,
    fees: {
      reregistration: 30,
      uniform: 75,
      books: 120,
      total: 225
    },
    paymentStatus: "pending",
    submissionDate: "2025-02-10"
  },
  {
    id: "3",
    studentId: "STU003",
    firstName: "Charlie",
    lastName: "Brown",
    currentLevel: "CM2",
    proposedLevel: "6ème",
    parentName: "Sarah Brown",
    parentEmail: "sarah.brown@email.com",
    status: "review_required",
    lastYear: "2024-2025",
    nextYear: "2025-2026",
    autoProgression: false,
    fees: {
      reregistration: 30,
      uniform: 75,
      books: 150,
      total: 255
    },
    paymentStatus: "pending",
    submissionDate: "2025-02-08",
    reviewReason: "Level transition requires approval"
  },
];

export function ReRegistrations() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "review_required": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "not_started": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-3 w-3" />;
      case "pending": return <Clock className="h-3 w-3" />;
      case "review_required": return <AlertCircle className="h-3 w-3" />;
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

  const filteredStudents = mockReRegistrations.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesLevel = levelFilter === "all" || student.currentLevel === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for students:`, selectedStudents);
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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="completed">{t("completed")}</SelectItem>
              <SelectItem value="review_required">{t("review_required")}</SelectItem>
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
          <div className="flex items-center gap-2">
            <Switch
              checked={bulkMode}
              onCheckedChange={setBulkMode}
            />
            <span className="text-sm">{t("bulk_mode")}</span>
          </div>
          <Button variant="outline" size="sm">
            <Send className="mr-2 h-4 w-4" />
            {t("send_invitations")}
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {bulkMode && selectedStudents.length > 0 && (
        <Card className="animate-fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedStudents.length} {t("students_selected")}
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => handleBulkAction("approve")}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t("approve_selected")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("send_reminder")}>
                  <Send className="mr-2 h-4 w-4" />
                  {t("send_reminders")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedStudents([])}>
                  {t("clear_selection")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_re_registrations")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockReRegistrations.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("completed")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {mockReRegistrations.filter(s => s.status === "completed").length}
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
                  {t("pending")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockReRegistrations.filter(s => s.status === "pending").length}
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
                  {t("needs_review")}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockReRegistrations.filter(s => s.status === "review_required").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Re-registrations Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("student_re_registrations")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {bulkMode && <TableHead className="w-12"></TableHead>}
                  <TableHead>{t("student_name")}</TableHead>
                  <TableHead>{t("current_level")}</TableHead>
                  <TableHead>{t("proposed_level")}</TableHead>
                  <TableHead>{t("parent_contact")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead className="text-center">{t("payment")}</TableHead>
                  <TableHead>{t("submission_date")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    {bulkMode && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                    )}
                    <TableCell className="font-medium">
                      <div>
                        <div>{student.firstName} {student.lastName}</div>
                        <div className="text-xs text-muted-foreground">ID: {student.studentId}</div>
                        {student.status === "review_required" && student.reviewReason && (
                          <div className="text-xs text-orange-600 mt-1">
                            {student.reviewReason}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.currentLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{student.proposedLevel}</Badge>
                        {student.autoProgression && (
                          <Badge variant="outline" className="text-xs">
                            {t("auto")}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{student.parentName}</div>
                        <div className="text-muted-foreground">{student.parentEmail}</div>
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
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              {t("approve")}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            {t("send_reminder")}
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
    </div>
  );
}