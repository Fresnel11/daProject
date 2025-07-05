export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    category: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    location?: string;
    organizer?: string;
    classes: string[];
    color: string;
    reminder?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ViewMode = 'month' | 'week' | 'day';
  
  export interface CalendarFilters {
    searchTerm: string;
    categories: string[];
    classes: string[];
  }
  
  export interface EventCategory {
    id: string;
    label: string;
    icon: string;
    color: string;
  }