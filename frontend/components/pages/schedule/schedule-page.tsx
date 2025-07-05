"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { Calendar } from "@/components/pages/schedule/calendar";
import { EventSidebar } from "@/components/pages/schedule/event-sidebar";
import { AddEventModal } from "@/components/pages/schedule/add-event-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SchedulePage() {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDateClick = (date: Date) => {
    setSelectedEventDate(date);
    setIsSidebarOpen(true);
  };
  
  const handleDateDoubleClick = (date: Date) => {
    setSelectedDate(date);
    setIsAddModalOpen(true);
  };
  
  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("schedule")}
          subtitle={t("manage_schedule")}
        />
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("add_event")}
        </Button>
      </div>
      
      <div className="relative">
        <Calendar
          onDateSelect={handleDateSelect}
          onDateClick={handleDateClick}
          onDateDoubleClick={handleDateDoubleClick}
        />
        
        <EventSidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          date={selectedEventDate}
        />
      </div>
      
      <AddEventModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        selectedDate={selectedDate}
      />
    </div>
  );
}