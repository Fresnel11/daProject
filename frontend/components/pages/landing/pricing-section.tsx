'use client';

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("starter_plan"),
      price: t("starter_price"),
      description: t("starter_description"),
      features: [
        t("up_to_students").replace("{{count}}", "100"),
        t("basic_features"),
        t("email_support"),
        t("mobile_app"),
      ],
      popular: false,
    },
    {
      name: t("professional_plan"),
      price: t("professional_price"),
      description: t("professional_description"),
      features: [
        t("up_to_students").replace("{{count}}", "500"),
        t("advanced_features"),
        t("priority_support"),
        t("custom_reports"),
        t("api_access"),
      ],
      popular: true,
    },
    {
      name: t("enterprise_plan"),
      price: t("enterprise_price"),
      description: t("enterprise_description"),
      features: [
        t("unlimited_students"),
        t("all_features"),
        t("dedicated_support"),
        t("custom_integrations"),
        t("training_included"),
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("simple_pricing")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing_description")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 shadow-lg ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-full">
                    {t("most_popular")}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{t("month")}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/register">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {t("get_started")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}