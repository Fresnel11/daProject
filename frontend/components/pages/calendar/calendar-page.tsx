"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { PageTitle } from "@/components/ui/page-title";
import { CalendarView } from "@/components/pages/calendar/calendar-view";
import { CalendarToolbar } from "@/components/pages/calendar/calendar-toolbar";
import { EventModal } from "@/components/pages/calendar/event-modal";
import { EventDetailsModal } from "@/components/pages/calendar/event-details-modal";
import { CalendarFilters } from "@/components/pages/calendar/calendar-filters";
import { useCalendarStore } from "@/lib/stores/calendar-store";
import { CalendarEvent, ViewMode } from "@/lib/types/calendar";
import { toast } from "sonner";

export function CalendarPage() {
  const { t } = useTranslation();
  const {
    events,
    currentDate,
    viewMode,
    filters,
    setCurrentDate,
    setViewMode,
    setFilters,
    addEvent,
    updateEvent,
    deleteEvent,
    loadEvents,
  } = useCalendarStore();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleCreateEvent = (date?: Date) => {
    setSelectedEvent(null);
    setSelectedDate(date || new Date());
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setIsEventModalOpen(true);
  };

  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleSaveEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventData);
        toast.success(t("event_updated_successfully"));
      } else {
        await addEvent(eventData as Omit<CalendarEvent, 'id'>);
        toast.success(t("event_created_successfully"));
      }
      setIsEventModalOpen(false);
    } catch (error) {
      toast.error(t("error_saving_event"));
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      toast.success(t("event_deleted_successfully"));
      setIsDetailsModalOpen(false);
    } catch (error) {
      toast.error(t("error_deleting_event"));
    }
  };

  const handleEventDrop = async (eventId: string, newStart: Date, newEnd?: Date) => {
    try {
      const updates: Partial<CalendarEvent> = {
        startDate: newStart,
        endDate: newEnd || newStart,
      };
      await updateEvent(eventId, updates);
      toast.success(t("event_moved_successfully"));
    } catch (error) {
      toast.error(t("error_moving_event"));
    }
  };

  const handleEventResize = async (eventId: string, newStart: Date, newEnd: Date) => {
    try {
      const updates: Partial<CalendarEvent> = {
        startDate: newStart,
        endDate: newEnd,
      };
      await updateEvent(eventId, updates);
      toast.success(t("event_resized_successfully"));
    } catch (error) {
      toast.error(t("error_resizing_event"));
    }
  };

  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageTitle
          title={t("school_calendar")}
          subtitle={t("manage_school_events_and_activities")}
        />
      </div>

      <div className="space-y-4">
        <CalendarToolbar
          currentDate={currentDate}
          viewMode={viewMode}
          onDateChange={setCurrentDate}
          onViewModeChange={setViewMode}
          onCreateEvent={() => handleCreateEvent()}
          onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
          filtersOpen={isFiltersOpen}
        />

        {isFiltersOpen && (
          <div className="animate-fade-in-down">
            <CalendarFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}

        <div className="animate-fade-in-up animate-stagger-1">
          <CalendarView
            events={events}
            currentDate={currentDate}
            viewMode={viewMode}
            filters={filters}
            onEventClick={handleViewEvent}
            onEventEdit={handleEditEvent}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onDateClick={handleCreateEvent}
          />
        </div>
      </div>

      <EventModal
        open={isEventModalOpen}
        onOpenChange={setIsEventModalOpen}
        event={selectedEvent}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
      />

      <EventDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        event={selectedEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}