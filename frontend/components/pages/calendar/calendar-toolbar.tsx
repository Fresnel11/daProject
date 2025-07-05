"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewMode } from "@/lib/types/calendar";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Calendar,
  Grid3X3,
  List,
  Clock,
} from "lucide-react";
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";

interface CalendarToolbarProps {
  currentDate: Date;
  viewMode: ViewMode;
  onDateChange: (date: Date) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateEvent: () => void;
  onToggleFilters: () => void;
  filtersOpen: boolean;
}

export function CalendarToolbar({
  currentDate,
  viewMode,
  onDateChange,
  onViewModeChange,
  onCreateEvent,
  onToggleFilters,
  filtersOpen,
}: CalendarToolbarProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const dateLocale = locale === "fr" ? fr : enUS;

  const navigatePrevious = () => {
    switch (viewMode) {
      case 'month':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(subDays(currentDate, 1));
        break;
    }
  };

  const navigateNext = () => {
    switch (viewMode) {
      case 'month':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
        onDateChange(addDays(currentDate, 1));
        break;
    }
  };

  const navigateToday = () => {
    onDateChange(new Date());
  };

  const getDateTitle = () => {
    switch (viewMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: dateLocale });
      case 'week':
        return format(currentDate, 'MMM yyyy', { locale: dateLocale });
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy', { locale: dateLocale });
      default:
        return format(currentDate, 'MMMM yyyy', { locale: dateLocale });
    }
  };

  const viewModeIcons = {
    month: Grid3X3,
    week: List,
    day: Clock,
  };

  return (
    <div className="space-y-4">
      {/* Main Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section - Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToday}
            className="animate-fade-in-left"
          >
            {t("today")}
          </Button>
          
          <div className="flex items-center gap-1 animate-fade-in-left animate-stagger-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigatePrevious}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-xl font-semibold capitalize animate-fade-in-left animate-stagger-2">
            {getDateTitle()}
          </h2>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant={filtersOpen ? "default" : "outline"}
            size="sm"
            onClick={onToggleFilters}
            className="animate-fade-in-right animate-stagger-1"
          >
            <Filter className="mr-2 h-4 w-4" />
            {t("filters")}
          </Button>

          <Select value={viewMode} onValueChange={(value: ViewMode) => onViewModeChange(value)}>
            <SelectTrigger className="w-[120px] animate-fade-in-right animate-stagger-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(viewModeIcons).map(([mode, Icon]) => (
                <SelectItem key={mode} value={mode}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {t(mode)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={onCreateEvent}
            className="animate-fade-in-right animate-stagger-3"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("new_event")}
          </Button>
        </div>
      </div>
    </div>
  );
}