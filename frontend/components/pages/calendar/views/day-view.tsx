"use client";

import { useTranslation } from "@/lib/i18n/client";
import { CalendarEvent } from "@/lib/types/calendar";
import {
  format,
  addHours,
  startOfDay,
  isSameDay,
} from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface DayViewProps {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
  onDragStart: (event: CalendarEvent) => void;
}

export function DayView({
  events,
  currentDate,
  onEventClick,
  onEventEdit,
  onDateClick,
  onDragStart,
}: DayViewProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const dateLocale = locale === "fr" ? fr : enUS;

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      if (event.allDay) return false;
      
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const slotStart = addHours(startOfDay(currentDate), hour);
      const slotEnd = addHours(startOfDay(currentDate), hour + 1);
      
      return eventStart < slotEnd && eventEnd > slotStart &&
             isSameDay(eventStart, currentDate);
    });
  };

  const getAllDayEvents = () => {
    return events.filter(event => {
      if (!event.allDay) return false;
      return isSameDay(new Date(event.startDate), currentDate);
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
            "text-sm p-2 rounded mb-2 cursor-pointer transition-all hover:opacity-80",
            snapshot.isDragging && "shadow-lg rotate-1 scale-105"
          )}
          style={{
            backgroundColor: `${event.color}20`,
            borderLeft: `4px solid ${event.color}`,
            ...provided.draggableProps.style,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
          onMouseDown={() => onDragStart(event)}
        >
          <div className="font-medium" style={{ color: event.color }}>
            {event.title}
          </div>
          {!event.allDay && (
            <div className="text-muted-foreground text-xs">
              {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
            </div>
          )}
          {event.location && (
            <div className="text-muted-foreground text-xs">
              📍 {event.location}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <h3 className="text-lg font-semibold">
          {format(currentDate, "EEEE, MMMM d, yyyy", { locale: dateLocale })}
        </h3>
      </div>

      {/* All-day events */}
      <div className="border-b min-h-[80px]">
        <div className="p-3">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {t("all_day")}
          </div>
          <Droppable droppableId={`${format(currentDate, "yyyy-MM-dd")}-allday`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "min-h-[40px] cursor-pointer transition-colors hover:bg-accent/50 rounded p-2",
                  snapshot.isDraggedOver && "bg-primary/10"
                )}
                onClick={() => onDateClick(currentDate)}
              >
                {getAllDayEvents().map((event, index) => (
                  <EventItem key={event.id} event={event} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {/* Time slots */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-12 gap-0">
          {/* Time column */}
          <div className="col-span-2 border-r">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b p-2 text-sm text-muted-foreground bg-muted/20 flex items-start"
              >
                {format(addHours(startOfDay(new Date()), hour), "HH:mm")}
              </div>
            ))}
          </div>

          {/* Events column */}
          <div className="col-span-10">
            {hours.map((hour) => {
              const hourEvents = getEventsForHour(hour);
              const slotKey = `${format(currentDate, "yyyy-MM-dd")}-${hour}`;
              
              return (
                <Droppable key={slotKey} droppableId={slotKey}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "h-20 border-b p-2 cursor-pointer transition-colors hover:bg-accent/50",
                        snapshot.isDraggedOver && "bg-primary/10"
                      )}
                      onClick={() => onDateClick(addHours(startOfDay(currentDate), hour))}
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
        </div>
      </div>
    </div>
  );
}