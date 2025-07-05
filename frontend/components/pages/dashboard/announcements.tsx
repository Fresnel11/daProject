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
import { Badge } from "@/components/ui/badge";
import { recentAnnouncements } from "@/lib/data/mock";
import { format, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

export function Announcements() {
  const { t } = useTranslation();
  const { locale } = useI18n();
  
  const dateLocale = locale === "fr" ? fr : enUS;
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {t("announcements")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => {
              const date = parseISO(announcement.date);
              const formattedDate = format(date, "MMM d, yyyy", {
                locale: dateLocale,
              });
              
              return (
                <div
                  key={announcement.id}
                  className="rounded-lg border bg-card p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <PriorityBadge priority={announcement.priority} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
              );
            })}
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

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-normal",
        priority === "high" && "border-red-500 text-red-500",
        priority === "medium" && "border-yellow-500 text-yellow-500",
        priority === "low" && "border-green-500 text-green-500"
      )}
    >
      {priority}
    </Badge>
  );
}