import { Brain, Wallet, Map, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Brain,
    title: "Smart AI Itinerary",
    description: "Our AI plans optimal routes, timings, and hidden gems for every day of your trip.",
  },
  {
    icon: Wallet,
    title: "Budget Planning",
    description: "Set your budget and get cost-aware suggestions for flights, stays, and activities.",
  },
  {
    icon: Map,
    title: "Map Integration",
    description: "See your full itinerary on an interactive map with walking and transit directions.",
  },
  {
    icon: Share2,
    title: "Save & Share Trips",
    description: "Export your plans, share with travel companions, or save for later.",
  },
];

const Features = () => {
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Everything you need to travel smarter
          </h2>
          <p className="mt-3 text-muted-foreground">Powerful features, zero complexity</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`bg-background rounded-2xl p-7 shadow-soft transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
