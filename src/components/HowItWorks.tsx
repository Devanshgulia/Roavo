import { MapPin, SlidersHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: MapPin,
    title: "Enter your destination",
    description: "Type any city, country, or region — we'll handle the rest.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customize preferences",
    description: "Set your budget, travel style, dates, and interests.",
  },
  {
    icon: Sparkles,
    title: "Get your AI itinerary",
    description: "Receive a complete day-by-day plan in seconds.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 section-padding bg-card">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          How it works
        </h2>
        <p className="mt-3 text-muted-foreground">Three steps to your dream trip</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`flex flex-col items-center text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
