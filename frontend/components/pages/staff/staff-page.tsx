"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { StaffTable } from "@/components/pages/staff/staff-table";
import { AddStaffModal } from "@/components/pages/staff/add-staff-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function StaffPage() {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("staff")}
          subtitle={t("manage_staff")}
        />
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_staff")}
        </Button>
      </div>
      
      <StaffTable />
      
      <AddStaffModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
}