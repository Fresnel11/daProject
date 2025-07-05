"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent, ViewMode, CalendarFilters } from '@/lib/types/calendar';

interface CalendarStore {
  events: CalendarEvent[];
  currentDate: Date;
  viewMode: ViewMode;
  filters: CalendarFilters;
  
  // Actions
  setCurrentDate: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
  setFilters: (filters: CalendarFilters) => void;
  addEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  loadEvents: () => void;
}

// Mock data for demonstration
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Parent-Teacher Conference',
    description: 'Annual parent-teacher conference for all classes',
    category: 'meeting',
    startDate: new Date(2025, 2, 15, 9, 0),
    endDate: new Date(2025, 2, 15, 17, 0),
    allDay: false,
    location: 'Main Hall',
    organizer: 'Administration',
    classes: ['All Classes'],
    color: '#3b82f6',
    reminder: '60',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Mathematics Exam - Grade 6',
    description: 'Final mathematics examination for 6th grade students',
    category: 'exam',
    startDate: new Date(2025, 2, 18, 8, 0),
    endDate: new Date(2025, 2, 18, 10, 0),
    allDay: false,
    location: 'Classroom A',
    organizer: 'Mr. Johnson',
    classes: ['6ème'],
    color: '#ef4444',
    reminder: '30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Spring Break',
    description: 'School holiday - Spring break',
    category: 'holiday',
    startDate: new Date(2025, 2, 20),
    endDate: new Date(2025, 2, 27),
    allDay: true,
    location: '',
    organizer: 'Administration',
    classes: ['All Classes'],
    color: '#10b981',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Science Fair',
    description: 'Annual science fair presentation',
    category: 'cultural',
    startDate: new Date(2025, 2, 22, 10, 0),
    endDate: new Date(2025, 2, 22, 15, 0),
    allDay: false,
    location: 'Gymnasium',
    organizer: 'Science Department',
    classes: ['CM1', 'CM2', '6ème', '5ème'],
    color: '#8b5cf6',
    reminder: '120',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      events: [],
      currentDate: new Date(),
      viewMode: 'month',
      filters: {
        searchTerm: '',
        categories: [],
        classes: [],
      },

      setCurrentDate: (date) => set({ currentDate: date }),
      
      setViewMode: (mode) => set({ viewMode: mode }),
      
      setFilters: (filters) => set({ filters }),

      addEvent: async (eventData) => {
        const newEvent: CalendarEvent = {
          ...eventData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          events: [...state.events, newEvent],
        }));
      },

      updateEvent: async (id, updates) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...updates, updatedAt: new Date() }
              : event
          ),
        }));
      },

      deleteEvent: async (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },

      loadEvents: () => {
        const { events } = get();
        if (events.length === 0) {
          set({ events: mockEvents });
        }
      },
    }),
    {
      name: 'calendar-store',
      partialize: (state) => ({ events: state.events }),
    }
  )
);