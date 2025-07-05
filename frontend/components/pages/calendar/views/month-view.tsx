"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { CalendarEvent } from "@/lib/types/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthViewProps {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  onDragStart: (event: CalendarEvent) => void;
}

export function MonthView({
  events,
  currentDate,
  onEventClick,
  onEventEdit,
  onDateClick,
  onDragStart,
}: MonthViewProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const dateLocale = locale === "fr" ? fr : enUS;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, i + 1); // Monday = 1
    return format(date, "EEEE", { locale: dateLocale });
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      
      // Check if the day falls within the event's date range
      return day >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
             day <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
    });
  };

  const EventItem = ({ event, index }: { event: CalendarEvent; index: number }) => (
    <Draggable draggableId={event.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "text-xs p-1 rounded mb-1 cursor-pointer transition-all hover:opacity-80",
            snapshot.isDragging && "shadow-lg rotate-2 scale-105"
          )}
          style={{
            backgroundColor: `${event.color}20`,
            borderLeft: `3px solid ${event.color}`,
            ...provided.draggableProps.style,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
          onMouseDown={() => onDragStart(event)}
        >
          <div className="font-medium truncate" style={{ color: event.color }}>
            {event.title}
          </div>
          {!event.allDay && (
            <div className="text-muted-foreground">
              {format(event.startDate, "HH:mm")}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="p-3 text-center font-medium text-sm border-r last:border-r-0 bg-muted/30"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const visibleEvents = dayEvents.slice(0, 3);
          const hiddenEvents = dayEvents.slice(3);
          const dayKey = format(day, "yyyy-MM-dd");

          return (
            <Droppable key={dayKey} droppableId={dayKey}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "min-h-[120px] p-2 border-r border-b last:border-r-0 cursor-pointer transition-colors hover:bg-accent/50",
                    !isSameMonth(day, currentDate) && "bg-muted/20 text-muted-foreground",
                    isToday(day) && "bg-primary/5 border-primary/20",
                    snapshot.isDraggedOver && "bg-primary/10"
                  )}
                  onClick={() => onDateClick(day)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isToday(day) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {visibleEvents.map((event, index) => (
                      <EventItem key={event.id} event={event} index={index} />
                    ))}
                    
                    {hiddenEvents.length > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-full text-xs text-muted-foreground hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-3 w-3 mr-1" />
                            +{hiddenEvents.length} {t("more")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2" align="start">
                          <div className="space-y-1">
                            {hiddenEvents.map((event) => (
                              <div
                                key={event.id}
                                className="text-xs p-2 rounded cursor-pointer hover:bg-accent"
                                style={{
                                  backgroundColor: `${event.color}10`,
                                  borderLeft: `3px solid ${event.color}`,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEventClick(event);
                                }}
                              >
                                <div className="font-medium" style={{ color: event.color }}>
                                  {event.title}
                                </div>
                                {!event.allDay && (
                                  <div className="text-muted-foreground">
                                    {format(event.startDate, "HH:mm")}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </div>
  );
}