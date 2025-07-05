"use client";

import { useTranslation } from "@/lib/i18n/client";
import { GraduationCap } from "lucide-react";

export function Logo() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-2 transition-all duration-200 hover:opacity-80">
      <GraduationCap className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">SchoolSphere</span>
    </div>
  );
}