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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface GradeEntryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClass: string;
  selectedSubject: string;
  selectedPeriod: string;
}

const students = [
  { id: "alice-johnson", name: "Alice Johnson" },
  { id: "bob-smith", name: "Bob Smith" },
  { id: "charlie-brown", name: "Charlie Brown" },
  { id: "diana-prince", name: "Diana Prince" },
];

const assessmentTypes = [
  { id: "exam", name: "Exam" },
  { id: "homework", name: "Homework" },
  { id: "quiz", name: "Quiz" },
  { id: "project", name: "Project" },
  { id: "presentation", name: "Presentation" },
];

export function GradeEntryModal({
  open,
  onOpenChange,
  selectedClass,
  selectedSubject,
  selectedPeriod,
}: GradeEntryModalProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    student: z.string().min(1, t("required_field")),
    assessmentName: z.string().min(1, t("required_field")),
    assessmentType: z.string().min(1, t("required_field")),
    grade: z.string().min(1, t("required_field")),
    maxScore: z.string().min(1, t("required_field")),
    coefficient: z.string().min(1, t("required_field")),
    comments: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: "",
      assessmentName: "",
      assessmentType: "",
      grade: "",
      maxScore: "20",
      coefficient: "1",
      comments: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Grade entry:", values);
    onOpenChange(false);
    form.reset();
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t("add_grade_entry")}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("student")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_student")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assessmentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("assessment_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_assessment_name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assessmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("assessment_type")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assessmentTypes.filter(type => !!type.id).map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("grade_obtained")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.5"
                        min="0"
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("max_score")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coefficient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("coefficient")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        step="0.5"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("comments")} ({t("optional")})</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enter_comments")}
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="spinner" />
                    <span>{t("saving")}</span>
                  </div>
                ) : (
                  t("save_grade")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}