"use client";

import { useTranslation } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Calendar,
  ClipboardList,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  UserPlus,
  DollarSign,
  School,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: t("students"),
      href: "/students",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: t("staff"),
      href: "/staff",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("registrations"),
      href: "/registrations",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      title: t("attendance"),
      href: "/attendance",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: t("grades"),
      href: "/grades",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: t("finance"),
      href: "/finance",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: t("calendar"),
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: t("reports"),
      href: "/reports",
      icon: <FileBarChart className="h-5 w-5" />,
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="mr-3 text-muted-foreground group-hover:text-foreground">
            {item.icon}
          </div>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}