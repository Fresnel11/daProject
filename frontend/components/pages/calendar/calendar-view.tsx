"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card } from "@/components/ui/card";
import { CalendarEvent, ViewMode, CalendarFilters } from "@/lib/types/calendar";
import { MonthView } from "@/components/pages/calendar/views/month-view";
import { WeekView } from "@/components/pages/calendar/views/week-view";
import { DayView } from "@/components/pages/calendar/views/day-view";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

interface CalendarViewProps {
  events: CalendarEvent[];
  currentDate: Date;
  viewMode: ViewMode;
  filters: CalendarFilters;
  onEventClick: (event: CalendarEvent) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDrop: (eventId: string, newStart: Date, newEnd?: Date) => void;
  onEventResize: (eventId: string, newStart: Date, newEnd: Date) => void;
  onDateClick: (date: Date) => void;
}

export function CalendarView({
  events,
  currentDate,
  viewMode,
  filters,
  onEventClick,
  onEventEdit,
  onEventDrop,
  onEventResize,
  onDateClick,
}: CalendarViewProps) {
  const { t } = useTranslation();
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
      return false;
    }
    if (filters.classes.length > 0 && !event.classes.some(cls => filters.classes.includes(cls))) {
      return false;
    }
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.location?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination || !draggedEvent) return;

    const { destination } = result;
    const newDate = new Date(destination.droppableId);
    
    // Calculate new start and end dates
    const originalDuration = draggedEvent.endDate.getTime() - draggedEvent.startDate.getTime();
    const newStart = new Date(newDate);
    const newEnd = new Date(newDate.getTime() + originalDuration);

    onEventDrop(draggedEvent.id, newStart, newEnd);
    setDraggedEvent(null);
  }, [draggedEvent, onEventDrop]);

  const renderView = () => {
    const commonProps = {
      events: filteredEvents,
      currentDate,
      onEventClick,
      onEventEdit,
      onEventDrop,
      onEventResize,
      onDateClick,
      onDragStart: setDraggedEvent,
    };

    switch (viewMode) {
      case 'month':
        return <MonthView {...commonProps} />;
      case 'week':
        return <WeekView {...commonProps} />;
      case 'day':
        return <DayView {...commonProps} />;
      default:
        return <MonthView {...commonProps} />;
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="min-h-[600px]">
          {renderView()}
        </div>
      </DragDropContext>
    </Card>
  );
}