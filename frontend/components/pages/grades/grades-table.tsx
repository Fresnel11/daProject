"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradesTableProps {
  selectedClass: string;
  selectedSubject: string;
  selectedPeriod: string;
  selectedStudent: string;
}

type Assessment = {
  id: string;
  name: string;
  type: "exam" | "homework" | "quiz" | "project";
  coefficient: number;
  maxScore: number;
};

type StudentGrade = {
  studentId: string;
  studentName: string;
  assessments: { [assessmentId: string]: number | null };
  average: number;
  rank: number;
};

const mockAssessments: Assessment[] = [
  { id: "1", name: "Midterm Exam", type: "exam", coefficient: 3, maxScore: 20 },
  { id: "2", name: "Homework 1", type: "homework", coefficient: 1, maxScore: 20 },
  { id: "3", name: "Quiz 1", type: "quiz", coefficient: 1, maxScore: 20 },
  { id: "4", name: "Final Project", type: "project", coefficient: 2, maxScore: 20 },
];

const mockStudentGrades: StudentGrade[] = [
  {
    studentId: "1",
    studentName: "Alice Johnson",
    assessments: { "1": 16, "2": 18, "3": 15, "4": 17 },
    average: 16.4,
    rank: 2,
  },
  {
    studentId: "2",
    studentName: "Bob Smith",
    assessments: { "1": 18, "2": 17, "3": 19, "4": 18 },
    average: 17.7,
    rank: 1,
  },
  {
    studentId: "3",
    studentName: "Charlie Brown",
    assessments: { "1": 14, "2": 16, "3": 13, "4": 15 },
    average: 14.6,
    rank: 3,
  },
];

export function GradesTable({
  selectedClass,
  selectedSubject,
  selectedPeriod,
  selectedStudent,
}: GradesTableProps) {
  const { t } = useTranslation();
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>(mockStudentGrades);

  const handleEditStart = (studentId: string, assessmentId: string, currentValue: number | null) => {
    setEditingCell(`${studentId}-${assessmentId}`);
    setEditValue(currentValue?.toString() || "");
  };

  const handleEditSave = (studentId: string, assessmentId: string) => {
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue)) {
      setStudentGrades(prev => 
        prev.map(student => 
          student.studentId === studentId
            ? {
                ...student,
                assessments: {
                  ...student.assessments,
                  [assessmentId]: newValue
                }
              }
            : student
        )
      );
    }
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const getTypeColor = (type: Assessment["type"]) => {
    switch (type) {
      case "exam": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "homework": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "quiz": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "project": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getGradeColor = (grade: number, maxScore: number) => {
    const percentage = (grade / maxScore) * 100;
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 80) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-400";
    if (percentage >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Card className="animate-fade-in-up animate-stagger-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {t("grade_entry_table")}
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {t("add_assessment")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t("student")}</TableHead>
                {mockAssessments.map((assessment) => (
                  <TableHead key={assessment.id} className="text-center min-w-[120px]">
                    <div className="space-y-1">
                      <div className="font-medium">{assessment.name}</div>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline" className={cn("text-xs", getTypeColor(assessment.type))}>
                          {t(assessment.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ×{assessment.coefficient}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        /{assessment.maxScore}
                      </div>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center">{t("average")}</TableHead>
                <TableHead className="text-center">{t("rank")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentGrades.map((student) => (
                <TableRow key={student.studentId} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {student.studentName}
                  </TableCell>
                  {mockAssessments.map((assessment) => {
                    const cellId = `${student.studentId}-${assessment.id}`;
                    const grade = student.assessments[assessment.id];
                    const isEditing = editingCell === cellId;

                    return (
                      <TableCell key={assessment.id} className="text-center">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-16 h-8 text-center"
                              min="0"
                              max={assessment.maxScore}
                              step="0.5"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditSave(student.studentId, assessment.id)}
                            >
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={handleEditCancel}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-center gap-2 cursor-pointer hover:bg-accent rounded p-1 group"
                            onClick={() => handleEditStart(student.studentId, assessment.id, grade)}
                          >
                            <span className={cn(
                              "font-medium",
                              grade ? getGradeColor(grade, assessment.maxScore) : "text-muted-foreground"
                            )}>
                              {grade !== null ? grade : "-"}
                            </span>
                            <Edit className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-center">
                    <span className={cn(
                      "font-semibold",
                      getGradeColor(student.average, 20)
                    )}>
                      {student.average.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-medium">
                      #{student.rank}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}