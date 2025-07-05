"use client";

import { useTranslation } from "@/lib/i18n/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { AddEventModal } from "./add-event-modal";
import { ConfirmationModal } from "@/components/pages/students/confirmation-modal";

interface EventSidebarProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
}

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Parent-Teacher Meeting",
    start: "2025-03-15T10:00:00",
    end: "2025-03-15T11:30:00",
    description: "Meeting with parents to discuss student progress",
    type: "event",
    color: "chart-1",
  },
  {
    id: "2",
    title: "Staff Meeting",
    start: "2025-03-15",
    allDay: true,
    description: "Monthly staff meeting",
    type: "event",
    color: "chart-2",
  },
];

export function EventSidebar({ open, onClose, date }: EventSidebarProps) {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDelete = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting event:", selectedEvent?.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-[400px]">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>
              {date && format(date, "MMMM d, yyyy")}
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            {mockEvents.length > 0 ? (
              <div className="space-y-4 pt-8">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(event)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        {event.allDay
                          ? t("all_day")
                          : `${format(new Date(event.start), "h:mm a")} - ${format(
                              new Date(event.end),
                              "h:mm a"
                            )}`}
                      </p>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  {t("no_events")}
                </p>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <AddEventModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        selectedDate={date}
      />

      <ConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        title={t("delete_event")}
        description={t("delete_event_confirmation")}
        actionLabel={t("delete")}
      />
    </>
  );
}