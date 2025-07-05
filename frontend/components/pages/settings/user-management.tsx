"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Search, 
  MoreHorizontal, 
  Edit, 
  Shield, 
  UserX,
  Users,
  UserCheck,
  Clock,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@school.com",
    role: "Super Administrator",
    status: "active",
    lastLogin: "2024-02-20T10:30:00Z",
    createdAt: "2024-01-01",
    avatar: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@school.com",
    role: "Principal",
    status: "active",
    lastLogin: "2024-02-19T15:45:00Z",
    createdAt: "2024-01-15",
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@school.com",
    role: "Teacher",
    status: "active",
    lastLogin: "2024-02-20T08:15:00Z",
    createdAt: "2024-01-20",
    avatar: "MB",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@school.com",
    role: "Secretary",
    status: "inactive",
    lastLogin: "2024-02-15T12:00:00Z",
    createdAt: "2024-02-01",
    avatar: "ED",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@school.com",
    role: "Teacher",
    status: "pending",
    lastLogin: "",
    createdAt: "2024-02-18",
    avatar: "DW",
  },
];

const roles = [
  "Super Administrator",
  "Principal", 
  "Teacher",
  "Secretary",
  "Parent",
];

export function UserManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <UserCheck className="h-3 w-3" />;
      case "inactive": return <UserX className="h-3 w-3" />;
      case "pending": return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Administrator": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Principal": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Teacher": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Secretary": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Parent": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive") => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_users")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filter_by_role")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_roles")}</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("filter_by_status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_statuses")}</SelectItem>
              <SelectItem value="active">{t("active_students")}</SelectItem>
              <SelectItem value="inactive">{t("inactive")}</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_users")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {users.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("active_users")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === "active").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("pending_users")}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {users.filter(u => u.status === "pending").length}
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
                  {t("administrators")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role.includes("Administrator") || u.role === "Principal").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("user_accounts")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("user")}</TableHead>
                  <TableHead>{t("email")}</TableHead>
                  <TableHead className="text-center">{t("role")}</TableHead>
                  <TableHead className="text-center">{t("status")}</TableHead>
                  <TableHead>{t("last_login")}</TableHead>
                  <TableHead>{t("created_date")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-center">
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                        disabled={user.role === "Super Administrator"}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue>
                            <Badge className={cn("font-normal", getRoleColor(user.role))}>
                              {user.role}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getStatusColor(user.status))}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(user.status)}
                          {t(user.status)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? (
                        <div className="text-sm">
                          {new Date(user.lastLogin).toLocaleDateString()}
                          <div className="text-xs text-muted-foreground">
                            {new Date(user.lastLogin).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{t("never")}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
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
                            <Edit className="mr-2 h-4 w-4" />
                            {t("edit_user")}
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "inactive")}
                              disabled={user.role === "Super Administrator"}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              {t("deactivate")}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "active")}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              {t("activate")}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            {t("reset_password")}
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