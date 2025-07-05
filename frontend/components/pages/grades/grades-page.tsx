"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { GradesFilters } from "@/components/pages/grades/grades-filters";
import { GradesTable } from "@/components/pages/grades/grades-table";
import { GradesSummary } from "@/components/pages/grades/grades-summary";
import { GradeEntryModal } from "@/components/pages/grades/grade-entry-modal";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GradesPage() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester-1");
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("grade_management")}
          subtitle={t("manage_student_grades")}
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            {t("grade_history")}
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="mr-2 h-4 w-4" />
            {t("export_grades")}
          </Button>
          <Button onClick={() => setIsGradeModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("add_grade")}
          </Button>
        </div>
      </div>
      
      <GradesFilters
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      <Tabs defaultValue="entry" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entry">{t("grade_entry")}</TabsTrigger>
          <TabsTrigger value="summary">{t("summary")}</TabsTrigger>
          <TabsTrigger value="reports">{t("report_cards")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entry" className="space-y-6">
          <GradesTable
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            selectedPeriod={selectedPeriod}
            selectedStudent={selectedStudent}
          />
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-6">
          <GradesSummary
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            selectedPeriod={selectedPeriod}
          />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("report_cards_coming_soon")}</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <GradeEntryModal
        open={isGradeModalOpen}
        onOpenChange={setIsGradeModalOpen}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
}