"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { UserNav } from "@/components/user-nav";
import { useTranslation } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur transition-all duration-200",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={t("toggle_sidebar")}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search - Desktop */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("search")}
            className="w-[200px] pl-8 lg:w-[280px]"
          />
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label={t("search")}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <UserNav />
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 p-4 md:hidden">
          <div className="relative w-full max-w-md">
            <Input
              autoFocus
              type="search"
              placeholder={t("search")}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}