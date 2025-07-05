"use client";

import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shield, Users, Calendar, Check } from "lucide-react";

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

interface RoleDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}

const mockUsers = [
  { id: "1", name: "John Smith", email: "john.smith@school.com", avatar: "JS" },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@school.com", avatar: "SJ" },
  { id: "3", name: "Michael Brown", email: "michael.b@school.com", avatar: "MB" },
  { id: "4", name: "Emily Davis", email: "emily.d@school.com", avatar: "ED" },
  { id: "5", name: "David Wilson", email: "david.w@school.com", avatar: "DW" },
];

const permissionGroups = {
  "students": "Students Management",
  "staff": "Staff Management", 
  "grades": "Grades & Assessments",
  "attendance": "Attendance Tracking",
  "calendar": "Calendar & Events",
  "reports": "Reports & Analytics",
  "settings": "System Settings",
};

export function RoleDetailsModal({ open, onOpenChange, role }: RoleDetailsModalProps) {
  const { t } = useTranslation();

  if (!role) return null;

  const getPermissionsByGroup = () => {
    const grouped: Record<string, string[]> = {};
    
    role.permissions.forEach(permission => {
      if (permission === "*") {
        grouped["system"] = ["Full System Access"];
        return;
      }
      
      const [group] = permission.split(".");
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(permission);
    });
    
    return grouped;
  };

  const permissionsByGroup = getPermissionsByGroup();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {role.name}
            {role.isSystem && (
              <Badge variant="destructive" className="text-xs">
                {t("system")}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Role Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                {t("role_information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  {t("description")}
                </label>
                <p className="text-sm mt-1">{role.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t("created_date")}
                  </label>
                  <p className="text-sm mt-1">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t("last_updated")}
                  </label>
                  <p className="text-sm mt-1">
                    {new Date(role.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{role.userCount}</span>
                  <span className="text-sm text-muted-foreground">{t("users_assigned")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{role.permissions.length}</span>
                  <span className="text-sm text-muted-foreground">{t("permissions")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                {t("permissions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {Object.entries(permissionsByGroup).map(([group, permissions]) => (
                    <div key={group} className="space-y-2">
                      <h4 className="text-sm font-medium text-primary">
                        {permissionGroups[group as keyof typeof permissionGroups] || group}
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {permissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-500" />
                            <span className="text-muted-foreground">
                              {permission === "Full System Access" ? permission : permission.split('.').pop()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Assigned Users */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                {t("assigned_users")} ({role.userCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[150px]">
                <div className="space-y-3">
                  {mockUsers.slice(0, role.userCount).map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                  {role.userCount > 5 && (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      {t("and_more_users")} ({role.userCount - 5})
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}