"use client";

import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/lib/types/calendar";
import { EVENT_CATEGORIES } from "@/lib/constants/calendar";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Edit,
  Trash2,
  Bell,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export function EventDetailsModal({
  open,
  onOpenChange,
  event,
  onEdit,
  onDelete,
}: EventDetailsModalProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const dateLocale = locale === "fr" ? fr : enUS;

  if (!event) return null;

  const category = EVENT_CATEGORIES.find(cat => cat.id === event.category);
  
  const formatEventDate = () => {
    if (event.allDay) {
      if (event.startDate.toDateString() === event.endDate.toDateString()) {
        return format(event.startDate, "EEEE, MMMM d, yyyy", { locale: dateLocale });
      } else {
        return `${format(event.startDate, "MMM d", { locale: dateLocale })} - ${format(event.endDate, "MMM d, yyyy", { locale: dateLocale })}`;
      }
    } else {
      if (event.startDate.toDateString() === event.endDate.toDateString()) {
        return `${format(event.startDate, "EEEE, MMMM d, yyyy", { locale: dateLocale })} • ${format(event.startDate, "HH:mm", { locale: dateLocale })} - ${format(event.endDate, "HH:mm", { locale: dateLocale })}`;
      } else {
        return `${format(event.startDate, "MMM d, HH:mm", { locale: dateLocale })} - ${format(event.endDate, "MMM d, HH:mm yyyy", { locale: dateLocale })}`;
      }
    }
  };

  const getReminderText = () => {
    if (!event.reminder) return t("no_reminder");
    const minutes = parseInt(event.reminder);
    if (minutes === 0) return t("at_event_time");
    if (minutes < 60) return t("minutes_before", { count: minutes });
    if (minutes < 1440) return t("hours_before", { count: Math.floor(minutes / 60) });
    return t("days_before", { count: Math.floor(minutes / 1440) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold pr-8">
                {event.title}
              </DialogTitle>
              {category && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 w-fit"
                  style={{ backgroundColor: `${event.color}20`, color: event.color }}
                >
                  <span>{category.icon}</span>
                  {t(category.label)}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Time */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{formatEventDate()}</p>
              {event.allDay && (
                <p className="text-sm text-muted-foreground">{t("all_day_event")}</p>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("location")}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          )}

          {/* Organizer */}
          {event.organizer && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("organizer")}</p>
                <p className="text-sm text-muted-foreground">{event.organizer}</p>
              </div>
            </div>
          )}

          {/* Classes */}
          {event.classes.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("concerned_classes")}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.classes.map((className) => (
                    <Badge key={className} variant="outline" className="text-xs">
                      {className}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reminder */}
          {event.reminder && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("reminder")}</p>
                <p className="text-sm text-muted-foreground">{getReminderText()}</p>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="space-y-2">
              <p className="font-medium">{t("description")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t("delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("delete_event")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("delete_event_confirmation", { title: event.title })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(event.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={() => onEdit(event)} size="sm">
            <Edit className="mr-2 h-4 w-4" />
            {t("edit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}