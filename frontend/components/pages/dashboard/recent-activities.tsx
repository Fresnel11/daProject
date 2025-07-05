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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { recentActivities } from "@/lib/data/mock";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n/client";

export function RecentActivities() {
  const { t } = useTranslation();
  const { locale } = useI18n();
  
  const dateLocale = locale === "fr" ? fr : enUS;
  
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          {t("recent_activities")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const timestamp = parseISO(activity.timestamp);
              const timeAgo = formatDistanceToNow(timestamp, {
                addSuffix: true,
                locale: dateLocale,
              });
              const fullDate = format(timestamp, "PPpp", { locale: dateLocale });
              
              return (
                <div key={activity.id} className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="text-xs">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action} {activity.resource}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                    <p
                      className="text-xs text-muted-foreground"
                      title={fullDate}
                    >
                      {timeAgo}
                    </p>
                  </div>
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