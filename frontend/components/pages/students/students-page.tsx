"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { StudentsTable } from "@/components/pages/students/students-table";
import { AddStudentModal } from "@/components/pages/students/add-student-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function StudentsPage() {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("students")}
          subtitle={t("manage_students")}
        />
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_student")}
        </Button>
      </div>
      
      <StudentsTable />
      
      <AddStudentModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
}