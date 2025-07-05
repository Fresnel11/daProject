"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card } from "@/components/ui/card";
import Select from "react-select";

interface ReportFiltersProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
}

const classes = [
  { id: "all", name: "All Classes" },
  { id: "6th-a", name: "6th Grade A" },
  { id: "6th-b", name: "6th Grade B" },
  { id: "7th-a", name: "7th Grade A" },
  { id: "7th-b", name: "7th Grade B" },
  { id: "8th-a", name: "8th Grade A" },
];

const periods = [
  { id: "quarter-1", name: "Quarter 1" },
  { id: "quarter-2", name: "Quarter 2" },
  { id: "quarter-3", name: "Quarter 3" },
  { id: "quarter-4", name: "Quarter 4" },
  { id: "semester-1", name: "Semester 1" },
  { id: "semester-2", name: "Semester 2" },
  { id: "year", name: "Full Year" },
];

const students = [
  { id: "all", name: "All Students" },
  { id: "alice-johnson", name: "Alice Johnson" },
  { id: "bob-smith", name: "Bob Smith" },
  { id: "charlie-brown", name: "Charlie Brown" },
  { id: "diana-prince", name: "Diana Prince" },
];

export function ReportFilters({
  selectedClass,
  setSelectedClass,
  selectedPeriod,
  setSelectedPeriod,
  selectedStudent,
  setSelectedStudent,
}: ReportFiltersProps) {
  const { t } = useTranslation();

  // Préparer les options pour react-select
  const classOptions = classes.filter(cls => !!cls.id).map(cls => ({ value: cls.id, label: cls.name }));
  const periodOptions = periods.filter(period => !!period.id).map(period => ({ value: period.id, label: period.name }));
  const studentOptions = students.filter(student => !!student.id).map(student => ({ value: student.id, label: student.name }));

  return (
    <Card className="p-4 animate-fade-in-up">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {t("class")}
          </label>
          <Select
            options={classOptions}
            value={classOptions.find(o => o.value === selectedClass) || null}
            onChange={option => setSelectedClass(option ? option.value : "")}
            placeholder={t("select_class")}
            isClearable
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {t("period")}
          </label>
          <Select
            options={periodOptions}
            value={periodOptions.find(o => o.value === selectedPeriod) || null}
            onChange={option => setSelectedPeriod(option ? option.value : "")}
            placeholder={t("select_period")}
            isClearable
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            {t("student")}
          </label>
          <Select
            options={studentOptions}
            value={studentOptions.find(o => o.value === selectedStudent) || null}
            onChange={option => setSelectedStudent(option ? option.value : "")}
            placeholder={t("select_student")}
            isClearable
          />
        </div>
      </div>
    </Card>
  );
}