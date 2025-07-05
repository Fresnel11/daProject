'use client';

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { GraduationCap } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SchoolSphere</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              {t("footer_description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold">{t("quick_links")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("how_it_works")}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("testimonials")}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("login")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">{t("support")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("help_center")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("contact_us")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SchoolSphere. {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}