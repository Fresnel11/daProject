'use client';

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {t("ready_to_transform")}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {t("cta_description")}
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t("start_free_trial")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground bg-primary-foreground/10">
                {t("login_existing")}
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-primary-foreground/60">
            {t("no_setup_fees")}
          </div>
        </div>
      </div>
    </section>
  );
}