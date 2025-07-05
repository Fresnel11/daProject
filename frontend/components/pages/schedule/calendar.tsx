"use client";

import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTheme } from 'next-themes';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onDateClick: (date: Date) => void;
  onDateDoubleClick: (date: Date) => void;
}

// Mock events data
const events = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    start: '2025-03-15T10:00:00',
    end: '2025-03-15T11:30:00',
    backgroundColor: 'hsl(var(--chart-1))',
    borderColor: 'hsl(var(--chart-1))',
  },
  {
    id: '2',
    title: 'Staff Meeting',
    start: '2025-03-16',
    allDay: true,
    backgroundColor: 'hsl(var(--chart-2))',
    borderColor: 'hsl(var(--chart-2))',
  },
  {
    id: '3',
    title: 'School Assembly',
    start: '2025-03-17T09:00:00',
    end: '2025-03-17T10:00:00',
    backgroundColor: 'hsl(var(--chart-3))',
    borderColor: 'hsl(var(--chart-3))',
  },
];

export function Calendar({ onDateSelect, onDateClick, onDateDoubleClick }: CalendarProps) {
  const { theme } = useTheme();
  
  useEffect(() => {
    const root = document.documentElement;
    const calendar = document.querySelector('.fc');
    if (calendar) {
      calendar.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <div className="rounded-lg border bg-card">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={(info) => onDateSelect(info.start)}
        dateClick={(info) => onDateClick(info.date)}
        dateDoubleClick={(info) => onDateDoubleClick(info.date)}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="text-xs font-medium">{eventInfo.event.title}</div>
            {!eventInfo.event.allDay && (
              <div className="text-xs opacity-75">
                {eventInfo.timeText}
              </div>
            )}
          </div>
        )}
        className={theme === 'dark' ? 'fc-dark' : ''}
      />
    </div>
  );
}