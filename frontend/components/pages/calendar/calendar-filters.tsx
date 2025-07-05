"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarFilters as CalendarFiltersType } from "@/lib/types/calendar";
import { Search, X } from "lucide-react";
import { EVENT_CATEGORIES, EVENT_CLASSES } from "@/lib/constants/calendar";

interface CalendarFiltersProps {
  filters: CalendarFiltersType;
  onFiltersChange: (filters: CalendarFiltersType) => void;
}

export function CalendarFilters({ filters, onFiltersChange }: CalendarFiltersProps) {
  const { t } = useTranslation();

  const updateFilters = (updates: Partial<CalendarFiltersType>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleClass = (className: string) => {
    const newClasses = filters.classes.includes(className)
      ? filters.classes.filter(c => c !== className)
      : [...filters.classes, className];
    updateFilters({ classes: newClasses });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      categories: [],
      classes: [],
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.categories.length > 0 || filters.classes.length > 0;

  return (
    <Card className="animate-fade-in-down">
      <CardContent className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search_events")}
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("event_categories")}</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_CATEGORIES.map((category) => (
              <Badge
                key={category.id}
                variant={filters.categories.includes(category.id) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="mr-1">{category.icon}</span>
                {t(category.label)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("classes")}</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_CLASSES.map((className) => (
              <Badge
                key={className}
                variant={filters.classes.includes(className) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleClass(className)}
              >
                {className}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-2 h-4 w-4" />
              {t("clear_filters")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}