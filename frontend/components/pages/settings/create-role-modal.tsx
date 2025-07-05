"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (roleData: any) => void;
}

const permissionModules = [
  {
    id: "students",
    name: "Students",
    permissions: [
      { id: "students.view", name: "View Students", description: "View student profiles and information" },
      { id: "students.create", name: "Create Students", description: "Add new students to the system" },
      { id: "students.edit", name: "Edit Students", description: "Modify student information" },
      { id: "students.delete", name: "Delete Students", description: "Remove students from the system" },
      { id: "students.archive", name: "Archive Students", description: "Archive student records" },
    ]
  },
  {
    id: "staff",
    name: "Staff",
    permissions: [
      { id: "staff.view", name: "View Staff", description: "View staff profiles and information" },
      { id: "staff.create", name: "Create Staff", description: "Add new staff members" },
      { id: "staff.edit", name: "Edit Staff", description: "Modify staff information" },
      { id: "staff.delete", name: "Delete Staff", description: "Remove staff members" },
      { id: "staff.manage_roles", name: "Manage Roles", description: "Assign and modify staff roles" },
    ]
  },
  {
    id: "grades",
    name: "Grades",
    permissions: [
      { id: "grades.view", name: "View Grades", description: "View student grades and assessments" },
      { id: "grades.create", name: "Create Grades", description: "Add new grades and assessments" },
      { id: "grades.edit", name: "Edit Grades", description: "Modify existing grades" },
      { id: "grades.delete", name: "Delete Grades", description: "Remove grades and assessments" },
      { id: "grades.validate", name: "Validate Grades", description: "Approve and validate grade entries" },
    ]
  },
  {
    id: "attendance",
    name: "Attendance",
    permissions: [
      { id: "attendance.view", name: "View Attendance", description: "View attendance records" },
      { id: "attendance.mark", name: "Mark Attendance", description: "Record student attendance" },
      { id: "attendance.edit", name: "Edit Attendance", description: "Modify attendance records" },
      { id: "attendance.reports", name: "Attendance Reports", description: "Generate attendance reports" },
    ]
  },
  {
    id: "calendar",
    name: "Calendar",
    permissions: [
      { id: "calendar.view", name: "View Calendar", description: "View school calendar and events" },
      { id: "calendar.create", name: "Create Events", description: "Add new calendar events" },
      { id: "calendar.edit", name: "Edit Events", description: "Modify calendar events" },
      { id: "calendar.delete", name: "Delete Events", description: "Remove calendar events" },
    ]
  },
  {
    id: "reports",
    name: "Reports",
    permissions: [
      { id: "reports.view", name: "View Reports", description: "Access system reports" },
      { id: "reports.generate", name: "Generate Reports", description: "Create new reports" },
      { id: "reports.export", name: "Export Reports", description: "Export reports to various formats" },
      { id: "reports.schedule", name: "Schedule Reports", description: "Set up automated report generation" },
    ]
  },
  {
    id: "settings",
    name: "Settings",
    permissions: [
      { id: "settings.view", name: "View Settings", description: "View system settings" },
      { id: "settings.edit", name: "Edit Settings", description: "Modify system configuration" },
      { id: "settings.backup", name: "Backup Management", description: "Manage system backups" },
      { id: "settings.security", name: "Security Settings", description: "Configure security settings" },
    ]
  },
];

export function CreateRoleModal({ open, onOpenChange, onSave }: CreateRoleModalProps) {
  const { t } = useTranslation();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const formSchema = z.object({
    name: z.string().min(1, t("required_field")),
    description: z.string().min(1, t("required_field")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleModulePermissions = (moduleId: string, checked: boolean) => {
    const modulePermissions = permissionModules
      .find(m => m.id === moduleId)
      ?.permissions.map(p => p.id) || [];
    
    if (checked) {
      setSelectedPermissions(prev => Array.from(new Set([...prev, ...modulePermissions])));
    } else {
      setSelectedPermissions(prev => prev.filter(id => !modulePermissions.includes(id)));
    }
  };

  const isModuleFullySelected = (moduleId: string) => {
    const modulePermissions = permissionModules
      .find(m => m.id === moduleId)
      ?.permissions.map(p => p.id) || [];
    return modulePermissions.every(id => selectedPermissions.includes(id));
  };

  const isModulePartiallySelected = (moduleId: string) => {
    const modulePermissions = permissionModules
      .find(m => m.id === moduleId)
      ?.permissions.map(p => p.id) || [];
    return modulePermissions.some(id => selectedPermissions.includes(id)) && 
           !modulePermissions.every(id => selectedPermissions.includes(id));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      ...values,
      permissions: selectedPermissions,
    });
    form.reset();
    setSelectedPermissions([]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("create_new_role")}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("role_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_role_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter_role_description")}
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("permissions")}</h3>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {permissionModules.map((module) => (
                    <Card key={module.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={isModuleFullySelected(module.id)}
                            onCheckedChange={(checked) => 
                              toggleModulePermissions(module.id, checked as boolean)
                            }
                            className={isModulePartiallySelected(module.id) ? "data-[state=checked]:bg-orange-500" : ""}
                          />
                          <CardTitle className="text-base font-medium">
                            {module.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 gap-3">
                          {module.permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <Checkbox
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                                className="mt-0.5"
                              />
                              <div className="space-y-1">
                                <label className="text-sm font-medium cursor-pointer">
                                  {permission.name}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit">
                {t("create_role")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}