"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarEvent } from "@/lib/types/calendar";
import { EVENT_CATEGORIES, EVENT_CLASSES } from "@/lib/constants/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { X, Plus } from "lucide-react";

interface EventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null;
  selectedDate?: Date | null;
  onSave: (event: Partial<CalendarEvent>) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  allDay: z.boolean(),
  location: z.string().optional(),
  organizer: z.string().optional(),
  classes: z.array(z.string()),
  color: z.string().min(1, "Color is required"),
  reminder: z.string().optional(),
});

export function EventModal({
  open,
  onOpenChange,
  event,
  selectedDate,
  onSave,
}: EventModalProps) {
  const { t } = useTranslation();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      allDay: false,
      location: "",
      organizer: "",
      classes: [],
      color: "#3b82f6",
      reminder: "",
    },
  });

  const allDay = form.watch("allDay");

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        description: event.description || "",
        category: event.category,
        startDate: format(event.startDate, "yyyy-MM-dd"),
        endDate: format(event.endDate, "yyyy-MM-dd"),
        startTime: event.allDay ? "" : format(event.startDate, "HH:mm"),
        endTime: event.allDay ? "" : format(event.endDate, "HH:mm"),
        allDay: event.allDay,
        location: event.location || "",
        organizer: event.organizer || "",
        classes: event.classes,
        color: event.color,
        reminder: event.reminder || "",
      });
      setSelectedClasses(event.classes);
    } else if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      form.reset({
        title: "",
        description: "",
        category: "",
        startDate: dateStr,
        endDate: dateStr,
        startTime: "09:00",
        endTime: "10:00",
        allDay: false,
        location: "",
        organizer: "",
        classes: [],
        color: "#3b82f6",
        reminder: "",
      });
      setSelectedClasses([]);
    }
  }, [event, selectedDate, form]);

  const handleAddClass = (className: string) => {
    if (!selectedClasses.includes(className)) {
      const newClasses = [...selectedClasses, className];
      setSelectedClasses(newClasses);
      form.setValue("classes", newClasses);
    }
  };

  const handleRemoveClass = (className: string) => {
    const newClasses = selectedClasses.filter(c => c !== className);
    setSelectedClasses(newClasses);
    form.setValue("classes", newClasses);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const startDateTime = new Date(`${values.startDate}T${values.startTime || "00:00"}`);
    const endDateTime = new Date(`${values.endDate}T${values.endTime || "23:59"}`);

    const eventData: Partial<CalendarEvent> = {
      title: values.title,
      description: values.description,
      category: values.category,
      startDate: startDateTime,
      endDate: endDateTime,
      allDay: values.allDay,
      location: values.location,
      organizer: values.organizer,
      classes: values.classes,
      color: values.color,
      reminder: values.reminder,
    };

    onSave(eventData);
  }

  const selectedCategory = EVENT_CATEGORIES.find(cat => cat.id === form.watch("category"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {event ? t("edit_event") : t("create_new_event")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("event_title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_event_title")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")} ({t("optional")})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("enter_event_description")}
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("category")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_category")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EVENT_CATEGORIES.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                {t(category.label)}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("color")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input type="color" className="w-16 h-10" {...field} />
                          <div
                            className="w-10 h-10 rounded border"
                            style={{ backgroundColor: field.value }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="allDay"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>{t("all_day_event")}</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("start_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("end_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!allDay && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("start_time")}</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("end_time")}</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("location")} ({t("optional")})</FormLabel>
                      <FormControl>
                        <Input placeholder={t("enter_location")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("organizer")} ({t("optional")})</FormLabel>
                      <FormControl>
                        <Input placeholder={t("enter_organizer")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Classes */}
              <div className="space-y-2">
                <FormLabel>{t("concerned_classes")} ({t("optional")})</FormLabel>
                <Select onValueChange={handleAddClass}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("add_class")} />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_CLASSES.filter(cls => !selectedClasses.includes(cls)).map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedClasses.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedClasses.map((className) => (
                      <Badge key={className} variant="secondary" className="flex items-center gap-1">
                        {className}
                        <button
                          type="button"
                          onClick={() => handleRemoveClass(className)}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="reminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("reminder")} ({t("optional")})</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_reminder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">{t("no_reminder")}</SelectItem>
                        <SelectItem value="0">{t("at_event_time")}</SelectItem>
                        <SelectItem value="5">{t("5_minutes_before")}</SelectItem>
                        <SelectItem value="10">{t("10_minutes_before")}</SelectItem>
                        <SelectItem value="15">{t("15_minutes_before")}</SelectItem>
                        <SelectItem value="30">{t("30_minutes_before")}</SelectItem>
                        <SelectItem value="60">{t("1_hour_before")}</SelectItem>
                        <SelectItem value="1440">{t("1_day_before")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit">
                {event ? t("update_event") : t("create_event")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}