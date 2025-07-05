'use client';

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  BarChart3, 
  ClipboardList, 
  BookOpen, 
  Shield,
  Smartphone,
  Globe
} from "lucide-react";

export function FeaturesSection() {
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: Users,
      title: t("student_management"),
      description: t("student_management_desc"),
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Calendar,
      title: t("schedule_management"),
      description: t("schedule_management_desc"),
      color: "from-green-500 to-green-600",
    },
    {
      icon: BarChart3,
      title: t("grade_tracking"),
      description: t("grade_tracking_desc"),
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: ClipboardList,
      title: t("attendance_monitoring"),
      description: t("attendance_monitoring_desc"),
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: BookOpen,
      title: t("curriculum_planning"),
      description: t("curriculum_planning_desc"),
      color: "from-red-500 to-red-600",
    },
    {
      icon: Shield,
      title: t("secure_platform"),
      description: t("secure_platform_desc"),
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Smartphone,
      title: t("mobile_friendly"),
      description: t("mobile_friendly_desc"),
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Globe,
      title: t("multilingual_support"),
      description: t("multilingual_support_desc"),
      color: "from-teal-500 to-teal-600",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 gradient-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-bounce-in">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            {t("why_choose_us")}
          </div>
          
          <h2 className="text-section-title animate-fade-in-up">
            {t("powerful_features")}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animate-stagger-1">
            {t("features_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`feature-card group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                visibleCards.includes(index) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0'
              }`}
              data-index={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-card-title mt-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up animate-stagger-2">
          <p className="text-lg text-muted-foreground mb-6">
            {t("ready_to_experience")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{t("setup_in_minutes")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{t("no_technical_knowledge")}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{t("24_7_support")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}