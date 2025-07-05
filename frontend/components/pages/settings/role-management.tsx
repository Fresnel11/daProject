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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash, 
  Eye,
  Search,
  Shield,
  Users,
  AlertTriangle
} from "lucide-react";
import { CreateRoleModal } from "@/components/pages/settings/create-role-modal";
import { EditRoleModal } from "@/components/pages/settings/edit-role-modal";
import { RoleDetailsModal } from "@/components/pages/settings/role-details-modal";
import { ConfirmationModal } from "@/components/pages/students/confirmation-modal";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Administrator",
    description: "Full system access with all permissions",
    userCount: 1,
    permissions: ["*"],
    isSystem: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Principal",
    description: "School principal with administrative access",
    userCount: 2,
    permissions: ["students.*", "staff.*", "grades.*", "reports.*", "calendar.*"],
    isSystem: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-10",
  },
  {
    id: "3",
    name: "Teacher",
    description: "Teaching staff with grade and attendance management",
    userCount: 15,
    permissions: ["students.view", "grades.*", "attendance.*", "calendar.view"],
    isSystem: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-02-05",
  },
  {
    id: "4",
    name: "Secretary",
    description: "Administrative support with limited access",
    userCount: 3,
    permissions: ["students.view", "students.edit", "registrations.*", "calendar.view"],
    isSystem: false,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-15",
  },
  {
    id: "5",
    name: "Parent",
    description: "Parent access to view their children's information",
    userCount: 245,
    permissions: ["students.view_own", "grades.view_own", "attendance.view_own"],
    isSystem: false,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-20",
  },
];

export function RoleManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRole = (roleData: Partial<Role>) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name || "",
      description: roleData.description || "",
      userCount: 0,
      permissions: roleData.permissions || [],
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRoles([...roles, newRole]);
    setIsCreateModalOpen(false);
  };

  const handleEditRole = (roleData: Partial<Role>) => {
    if (!selectedRole) return;
    
    setRoles(roles.map(role => 
      role.id === selectedRole.id 
        ? { ...role, ...roleData, updatedAt: new Date().toISOString().split('T')[0] }
        : role
    ));
    setIsEditModalOpen(false);
  };

  const handleCloneRole = (role: Role) => {
    const clonedRole: Role = {
      ...role,
      id: Date.now().toString(),
      name: `${role.name} (Copy)`,
      userCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRoles([...roles, clonedRole]);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    setRoles(roles.filter(role => role.id !== selectedRole.id));
    setIsDeleteModalOpen(false);
    setSelectedRole(null);
  };

  const getRoleTypeColor = (role: Role) => {
    if (role.isSystem) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    if (role.userCount > 50) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (role.userCount > 10) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const getPermissionLevel = (permissions: string[]) => {
    if (permissions.includes("*")) return t("full_access");
    if (permissions.length > 10) return t("high_access");
    if (permissions.length > 5) return t("medium_access");
    return t("limited_access");
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search_roles")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
        </div>
        
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("create_role")}
        </Button>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up animate-stagger-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_roles")}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {roles.length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("system_roles")}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {roles.filter(r => r.isSystem).length}
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
                  {t("custom_roles")}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {roles.filter(r => !r.isSystem).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Edit className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("total_users")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card className="animate-fade-in-up animate-stagger-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("roles_and_permissions")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("role_name")}</TableHead>
                  <TableHead>{t("description")}</TableHead>
                  <TableHead className="text-center">{t("users")}</TableHead>
                  <TableHead className="text-center">{t("permissions")}</TableHead>
                  <TableHead className="text-center">{t("type")}</TableHead>
                  <TableHead>{t("last_updated")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {role.name}
                        {role.isSystem && (
                          <Badge variant="destructive" className="text-xs">
                            {t("system")}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground truncate">
                        {role.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">
                        {role.userCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">
                        {getPermissionLevel(role.permissions)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getRoleTypeColor(role))}>
                        {role.isSystem ? t("system") : t("custom")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(role.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRole(role);
                              setIsDetailsModalOpen(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {t("view_details")}
                          </DropdownMenuItem>
                          {!role.isSystem && (
                            <>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRole(role);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                {t("edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCloneRole(role)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                {t("clone")}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedRole(role);
                                  setIsDeleteModalOpen(true);
                                }}
                                disabled={role.userCount > 0}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                {t("delete")}
                              </DropdownMenuItem>
                            </>
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

      {/* Modals */}
      <CreateRoleModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleCreateRole}
      />

      <EditRoleModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        role={selectedRole}
        onSave={handleEditRole}
      />

      <RoleDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        role={selectedRole}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteRole}
        title={t("delete_role")}
        description={`${t("delete_role_confirmation")} "${selectedRole?.name}"?`}
        actionLabel={t("delete")}
      />
    </div>
  );
}