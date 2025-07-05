'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, useTranslation } from "@/lib/i18n/client.tsx";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 transition-all duration-200 hover:bg-accent"
          aria-label={t("change_language")}
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={locale === "en" ? "bg-accent" : ""}
          onClick={() => setLocale("en")}
        >
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={locale === "fr" ? "bg-accent" : ""}
          onClick={() => setLocale("fr")}
        >
          {t("fr")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}