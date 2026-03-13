import { useEffect, useRef, useState } from "react";
import parisImg from "@/assets/paris.jpg";
import tokyoImg from "@/assets/tokyo.jpg";
import baliImg from "@/assets/bali.jpg";
import santoriniImg from "@/assets/santorini.jpg";
import newyorkImg from "@/assets/newyork.jpg";
import switzerlandImg from "@/assets/switzerland.jpg";

const destinations = [
  { name: "Paris", country: "France", image: parisImg, days: "5 days" },
  { name: "Tokyo", country: "Japan", image: tokyoImg, days: "7 days" },
  { name: "Bali", country: "Indonesia", image: baliImg, days: "6 days" },
  { name: "Santorini", country: "Greece", image: santoriniImg, days: "4 days" },
  { name: "New York", country: "USA", image: newyorkImg, days: "5 days" },
  { name: "Switzerland", country: "Europe", image: switzerlandImg, days: "6 days" },
];

const Destinations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Popular destinations
          </h2>
          <p className="mt-3 text-muted-foreground">Get inspired by trending trips</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <div
              key={d.name}
              className={`group cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-lift transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-background">
                <h3 className="font-heading font-semibold text-foreground">{d.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {d.country} · {d.days}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
