"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  Send, 
  Settings, 
  Eye,
  Users,
  Calendar,
  GraduationCap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ReportCardGeneratorProps {
  selectedClass: string;
  selectedPeriod: string;
  selectedStudent: string;
}

const mockStudentData = [
  {
    id: "1",
    name: "Alice Johnson",
    class: "6th Grade A",
    subjects: [
      { name: "Mathematics", grade: 16.5, coefficient: 4, teacher: "Mr. Smith" },
      { name: "English", grade: 15.0, coefficient: 3, teacher: "Ms. Brown" },
      { name: "Science", grade: 17.0, coefficient: 3, teacher: "Dr. Wilson" },
      { name: "History", grade: 14.5, coefficient: 2, teacher: "Mrs. Davis" },
    ],
    overall: 15.8,
    rank: 2,
    totalStudents: 25,
    attendance: 95,
    behavior: "Excellent",
  },
  {
    id: "2",
    name: "Bob Smith",
    class: "6th Grade A",
    subjects: [
      { name: "Mathematics", grade: 18.0, coefficient: 4, teacher: "Mr. Smith" },
      { name: "English", grade: 16.5, coefficient: 3, teacher: "Ms. Brown" },
      { name: "Science", grade: 17.5, coefficient: 3, teacher: "Dr. Wilson" },
      { name: "History", grade: 16.0, coefficient: 2, teacher: "Mrs. Davis" },
    ],
    overall: 17.2,
    rank: 1,
    totalStudents: 25,
    attendance: 98,
    behavior: "Excellent",
  },
];

export function ReportCardGenerator({
  selectedClass,
  selectedPeriod,
  selectedStudent,
}: ReportCardGeneratorProps) {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "Lincoln Elementary School",
    schoolLogo: "",
    schoolYear: "2024-2025",
    principalName: "Dr. Sarah Johnson",
    includeSignature: true,
    includeComments: true,
    includeAttendance: true,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const intervals = [20, 40, 60, 80, 100];
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress(progress);
    }

    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600 dark:text-green-400";
    if (grade >= 14) return "text-blue-600 dark:text-blue-400";
    if (grade >= 12) return "text-yellow-600 dark:text-yellow-400";
    if (grade >= 10) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const studentsToGenerate = selectedStudent === "all" 
    ? mockStudentData 
    : mockStudentData.filter(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      {/* Generation Controls */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t("report_card_generation")}
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  {t("settings_reports")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("report_card_settings")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="schoolName">{t("school_name")}</Label>
                    <Input
                      id="schoolName"
                      value={schoolSettings.schoolName}
                      onChange={(e) => setSchoolSettings(prev => ({
                        ...prev,
                        schoolName: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolYear">{t("school_year")}</Label>
                    <Input
                      id="schoolYear"
                      value={schoolSettings.schoolYear}
                      onChange={(e) => setSchoolSettings(prev => ({
                        ...prev,
                        schoolYear: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="principalName">{t("principal_name")}</Label>
                    <Input
                      id="principalName"
                      value={schoolSettings.principalName}
                      onChange={(e) => setSchoolSettings(prev => ({
                        ...prev,
                        principalName: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeSignature">{t("include_signature")}</Label>
                      <Switch
                        id="includeSignature"
                        checked={schoolSettings.includeSignature}
                        onCheckedChange={(checked) => setSchoolSettings(prev => ({
                          ...prev,
                          includeSignature: checked
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeComments">{t("include_comments")}</Label>
                      <Switch
                        id="includeComments"
                        checked={schoolSettings.includeComments}
                        onCheckedChange={(checked) => setSchoolSettings(prev => ({
                          ...prev,
                          includeComments: checked
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeAttendance">{t("include_attendance")}</Label>
                      <Switch
                        id="includeAttendance"
                        checked={schoolSettings.includeAttendance}
                        onCheckedChange={(checked) => setSchoolSettings(prev => ({
                          ...prev,
                          includeAttendance: checked
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {studentsToGenerate.length} {t("students")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedPeriod}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedClass}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                {t("preview")}
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <div className="spinner mr-2" />
                    {t("generating")}
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    {t("generate_pdf")}
                  </>
                )}
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-sm">
                <span>{t("generating_report_cards")}</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Preview Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {studentsToGenerate.map((student, index) => (
          <Card key={student.id} className={`animate-fade-in-up animate-stagger-${index + 1}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.class}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {student.overall}/20
                  </div>
                  <Badge variant="outline">
                    #{student.rank}/{student.totalStudents}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Subjects */}
                <div>
                  <h4 className="font-medium mb-2">{t("subjects")}</h4>
                  <div className="space-y-2">
                    {student.subjects.map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            (×{subject.coefficient})
                          </span>
                        </div>
                        <span className={`font-semibold ${getGradeColor(subject.grade)}`}>
                          {subject.grade}/20
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">{t("attendance_reports")}</span>
                    <div className="font-semibold">{student.attendance}%</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t("behavior")}</span>
                    <div className="font-semibold">{student.behavior}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="mr-2 h-3 w-3" />
                    {t("preview")}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    {t("download")}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Send className="mr-2 h-3 w-3" />
                    {t("send")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}