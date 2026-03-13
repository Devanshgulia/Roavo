import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Ready to plan your next adventure?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Join thousands of travelers who plan smarter with AI. It's free, fast, and fun.
        </p>
        <button className="mt-8 bg-primary text-primary-foreground font-semibold text-base px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          Start Planning Your Trip
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
