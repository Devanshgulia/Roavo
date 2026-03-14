import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, ArrowRight } from "lucide-react";
import { useTripForm } from "@/hooks/useTripForm";

const HeroSection = () => {
  const navigate = useNavigate();
  const { tripDetails, setField, setDates, canGenerate } = useTripForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canGenerate) return;
    navigate("/plan-trip", {
      state: {
        destination: tripDetails.destination,
        startDate: tripDetails.startDate,
        endDate: tripDetails.endDate,
        days: tripDetails.days,
      },
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-24 pb-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight animate-fade-up">
          Plan Your Perfect Trip{" "}
          <span className="text-primary">in Seconds</span> with AI
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up animate-fade-up-delay-1">
          Tell us where you want to go and we'll craft a personalized day-by-day
          itinerary — powered by AI, tailored to you.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-background rounded-2xl sm:rounded-full shadow-card border border-border flex flex-col sm:flex-row sm:items-center gap-3 p-3 max-w-2xl mx-auto animate-fade-up animate-fade-up-delay-2"
        >
          <div className="flex items-center gap-2 px-3 flex-1 min-w-0">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={tripDetails.destination}
              onChange={(e) => setField("destination", e.target.value)}
              placeholder="Where do you want to go? (Paris, Bali, Tokyo)"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:px-3 sm:border-l sm:border-border">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="date"
                value={tripDetails.startDate}
                onChange={(e) => setDates(e.target.value, tripDetails.endDate)}
                className="bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border rounded-full px-3 py-1.5"
              />
            </div>
            <span className="hidden sm:inline text-xs text-muted-foreground">to</span>
            <input
              type="date"
              value={tripDetails.endDate}
              onChange={(e) => setDates(tripDetails.startDate, e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border border-border rounded-full px-3 py-1.5"
            />
          </div>
          <button
            type="submit"
            disabled={!canGenerate}
            className="bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 shrink-0"
          >
            Generate
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground animate-fade-up animate-fade-up-delay-3">
          Free to use · No sign-up required · AI-powered
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
