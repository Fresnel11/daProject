import { EventCategory } from "@/lib/types/calendar";

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: "exam",
    label: "exam",
    icon: "📝",
    color: "#ef4444",
  },
  {
    id: "meeting",
    label: "meeting",
    icon: "👥",
    color: "#3b82f6",
  },
  {
    id: "cultural",
    label: "cultural_event",
    icon: "🎭",
    color: "#8b5cf6",
  },
  {
    id: "holiday",
    label: "holiday",
    icon: "🏖️",
    color: "#10b981",
  },
  {
    id: "trip",
    label: "field_trip",
    icon: "🚌",
    color: "#f59e0b",
  },
  {
    id: "sports",
    label: "sports_event",
    icon: "⚽",
    color: "#06b6d4",
  },
  {
    id: "conference",
    label: "conference",
    icon: "🎤",
    color: "#84cc16",
  },
  {
    id: "workshop",
    label: "workshop",
    icon: "🔧",
    color: "#f97316",
  },
  {
    id: "ceremony",
    label: "ceremony",
    icon: "🎓",
    color: "#ec4899",
  },
  {
    id: "other",
    label: "other",
    icon: "📅",
    color: "#6b7280",
  },
];

export const EVENT_CLASSES = [
  "CP1", "CP2", "CE1", "CE2", "CM1", "CM2",
  "6ème", "5ème", "4ème", "3ème",
  "2nde", "1ère", "Terminale",
  "All Classes"
];