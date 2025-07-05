'use client';

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Settings, Rocket } from "lucide-react";

export function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      title: t("step_1_title"),
      description: t("step_1_description"),
      step: "01",
    },
    {
      icon: Settings,
      title: t("step_2_title"),
      description: t("step_2_description"),
      step: "02",
    },
    {
      icon: Rocket,
      title: t("step_3_title"),
      description: t("step_3_description"),
      step: "03",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("how_it_works")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("how_it_works_description")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="relative">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-bold text-secondary-foreground">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-4 text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}