"use client";

import { useTranslation } from "@/lib/i18n/client";
import { CalendarEvent } from "@/lib/types/calendar";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  addHours,
  startOfDay,
} from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface WeekViewProps {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  onDragStart: (event: CalendarEvent) => void;
}

export function WeekView({
  events,
  currentDate,
  onEventClick,
  onEventEdit,
  onDateClick,
  onDragStart,
}: WeekViewProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const dateLocale = locale === "fr" ? fr : enUS;

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      if (event.allDay) return false;
      
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const slotStart = addHours(startOfDay(day), hour);
      const slotEnd = addHours(startOfDay(day), hour + 1);
      
      return eventStart < slotEnd && eventEnd > slotStart &&
             eventStart.toDateString() === day.toDateString();
    });
  };

  const getAllDayEvents = (day: Date) => {
    return events.filter(event => {
      if (!event.allDay) return false;
      
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      
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
            snapshot.isDragging && "shadow-lg rotate-1 scale-105"
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
              {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header with days */}
      <div className="grid grid-cols-8 border-b bg-muted/30">
        <div className="p-3 border-r"></div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "p-3 text-center border-r last:border-r-0",
              isToday(day) && "bg-primary/10"
            )}
          >
            <div className="font-medium">
              {format(day, "EEE", { locale: dateLocale })}
            </div>
            <div
              className={cn(
                "text-sm",
                isToday(day) && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto mt-1"
              )}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* All-day events row */}
      <div className="grid grid-cols-8 border-b min-h-[60px]">
        <div className="p-2 border-r bg-muted/20 text-xs font-medium flex items-center">
          {t("all_day")}
        </div>
        {days.map((day) => {
          const allDayEvents = getAllDayEvents(day);
          const dayKey = `${format(day, "yyyy-MM-dd")}-allday`;
          
          return (
            <Droppable key={dayKey} droppableId={dayKey}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "p-2 border-r last:border-r-0 cursor-pointer transition-colors hover:bg-accent/50",
                    snapshot.isDraggedOver && "bg-primary/10"
                  )}
                  onClick={() => onDateClick(day)}
                >
                  {allDayEvents.map((event, index) => (
                    <EventItem key={event.id} event={event} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 border-b p-2 text-xs text-muted-foreground bg-muted/20"
              >
                {format(addHours(startOfDay(new Date()), hour), "HH:mm")}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <div key={day.toISOString()} className="border-r last:border-r-0">
              {hours.map((hour) => {
                const hourEvents = getEventsForDayAndHour(day, hour);
                const slotKey = `${format(day, "yyyy-MM-dd")}-${hour}`;
                
                return (
                  <Droppable key={slotKey} droppableId={slotKey}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          "h-16 border-b p-1 cursor-pointer transition-colors hover:bg-accent/50",
                          snapshot.isDraggedOver && "bg-primary/10"
                        )}
                        onClick={() => onDateClick(addHours(startOfDay(day), hour))}
                      >
                        {hourEvents.map((event, index) => (
                          <EventItem key={event.id} event={event} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}