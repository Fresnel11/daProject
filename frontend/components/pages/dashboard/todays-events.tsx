"use client";

import { useTranslation } from "@/lib/i18n/client";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin } from "lucide-react";
import { todaysEvents } from "@/lib/data/mock";

export function TodaysEvents() {
  const { t } = useTranslation();
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {t("events_today")}
          </CardTitle>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Calendar className="h-4 w-4" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4">
            {todaysEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border bg-card p-3 transition-all hover:bg-accent/50"
              >
                <h4 className="font-medium">{event.title}</h4>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>{event.time}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3.5 w-3.5" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="ghost" size="sm" className="w-full">
          {t("view_all")}
        </Button>
      </CardFooter>
    </Card>
  );
}