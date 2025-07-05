'use client';

import { useTranslation } from "@/lib/i18n/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: t("principal"),
      school: "Riverside Elementary",
      content: t("testimonial_1"),
      avatar: "/avatars/sarah.jpg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: t("teacher"),
      school: "Lincoln High School",
      content: t("testimonial_2"),
      avatar: "/avatars/michael.jpg",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: t("administrator"),
      school: "Oakwood Academy",
      content: t("testimonial_3"),
      avatar: "/avatars/emily.jpg",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("what_educators_say")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials_description")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.school}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}