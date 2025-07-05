'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/client";
import { ArrowRight, Play, Users, BookOpen, BarChart3, Calendar } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden gradient-bg-hero min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Content */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-bounce-in">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                  {t("trusted_by_schools")}
                </div>
              </div>
              
              <h1 className="text-hero animate-fade-in-up animate-stagger-1">
                {t("hero_title")}
                <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in-up animate-stagger-2">
                  {t("hero_title_highlight")}
                </span>
              </h1>
              
              <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animate-stagger-3">
                {t("hero_description")}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animate-stagger-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse-glow">
                    {t("get_started_free")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 rounded-xl border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                  <Play className="mr-2 h-5 w-5" />
                  {t("watch_demo")}
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground animate-fade-in-up animate-stagger-5">
                <div className="flex items-center justify-center lg:justify-start space-x-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {t("no_credit_card_required")}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {t("free_30_day_trial")}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up animate-stagger-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">{t("schools_trust_us")}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">{t("students_managed")}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">{t("uptime_guarantee")}</div>
                </div>
              </div>
            </div>

            {/* Right column - Visual */}
            <div className="relative animate-fade-in-right animate-stagger-2">
              <div className="relative">
                {/* Main dashboard mockup */}
                <div className="bg-card rounded-2xl shadow-2xl border border-border/50 p-6 backdrop-blur-sm animate-scale-in">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg animate-pulse" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl">
                        <Users className="h-6 w-6 text-primary mb-2" />
                        <div className="h-4 bg-primary/20 rounded mb-2" />
                        <div className="h-6 bg-primary/30 rounded w-16" />
                      </div>
                      <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl">
                        <BookOpen className="h-6 w-6 text-primary mb-2" />
                        <div className="h-4 bg-primary/20 rounded mb-2" />
                        <div className="h-6 bg-primary/30 rounded w-16" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-primary/30 rounded-full" />
                        <div className="h-2 bg-primary/20 rounded-full w-3/4" />
                        <div className="h-2 bg-primary/10 rounded-full w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg animate-bounce-in animate-stagger-3">
                  <Users className="h-6 w-6" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-3 rounded-xl shadow-lg animate-bounce-in animate-stagger-4">
                  <BarChart3 className="h-6 w-6" />
                </div>

                <div className="absolute top-1/2 -right-12 bg-green-500 text-white p-2 rounded-lg shadow-lg animate-bounce-in animate-stagger-5">
                  <div className="text-xs font-bold">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}