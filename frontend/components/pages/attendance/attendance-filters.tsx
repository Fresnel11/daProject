"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceFiltersProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const classes = [
  { id: "all", name: "All Classes" },
  { id: "math-101", name: "Mathematics 101" },
  { id: "eng-201", name: "English 201" },
  { id: "sci-301", name: "Science 301" },
  { id: "his-101", name: "History 101" },
];

export function AttendanceFilters({
  selectedClass,
  setSelectedClass,
  selectedDate,
  setSelectedDate,
}: AttendanceFiltersProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="w-full sm:w-[240px]">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder={t("select_class")} />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[240px]",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>{t("pick_date")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
}