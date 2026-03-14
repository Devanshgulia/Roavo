import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TripDetails, useTripForm } from "@/hooks/useTripForm";

const INTEREST_OPTIONS = [
  "Adventure",
  "Food",
  "Culture",
  "Nature",
  "Shopping",
  "Nightlife",
  "Relaxation",
  "Photography",
  "Historical Sites",
];

const PlanTrip = () => {
  const location = useLocation();
  const initialState = (location.state as Partial<TripDetails> | null) || undefined;

  const { tripDetails, setField, setDates, toggleInterest } = useTripForm(initialState);

  return (
    <div className="min-h-screen bg-background animate-in fade-in-50">
      <Navbar />
      <main className="pt-24 pb-16 max-w-5xl mx-auto section-padding">
        <section className="space-y-6">
          <div>
            <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-3">
              Plan your next adventure
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Fine-tune your trip details
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Review your destination, dates, and preferences. Roavo will use these to build a smart,
              day-by-day itinerary tailored exactly to how you like to travel.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
            <div className="space-y-4 glass-panel p-6 rounded-2xl border border-border">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Destination</label>
                  <input
                    type="text"
                    value={tripDetails.destination}
                    onChange={(e) => setField("destination", e.target.value)}
                    placeholder="e.g. Paris, Bali, Tokyo"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Budget</label>
                  <select
                    value={tripDetails.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  >
                    <option value="">Select budget</option>
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Start Date</label>
                  <input
                    type="date"
                    value={tripDetails.startDate}
                    onChange={(e) => setDates(e.target.value, tripDetails.endDate)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">End Date</label>
                  <input
                    type="date"
                    value={tripDetails.endDate}
                    onChange={(e) => setDates(tripDetails.startDate, e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Number of Days</label>
                  <input
                    type="number"
                    min={0}
                    value={tripDetails.days || ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setField("days", Number.isNaN(value) ? 0 : value);
                    }}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Number of People</label>
                  <select
                    value={tripDetails.people}
                    onChange={(e) => setField("people", e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  >
                    <option value="">Who&apos;s traveling?</option>
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="friends">Friends</option>
                    <option value="family">Family</option>
                    <option value="group">Group</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Interests</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const id = `interest-${interest.toLowerCase().replace(/\s+/g, "-")}`;
                    const checked = tripDetails.interests.includes(interest);
                    return (
                      <label
                        key={interest}
                        htmlFor={id}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                          checked
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleInterest(interest)}
                          className="hidden"
                        />
                        <span className="truncate">{interest}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button className="w-full md:w-auto bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                Continue to AI itinerary
              </button>
            </div>

            <aside className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-border">
                <h2 className="font-heading text-base font-semibold mb-2">Trip summary</h2>
                <p className="text-sm text-muted-foreground">
                  {tripDetails.destination
                    ? `Planning a ${tripDetails.days || "flexible"}-day trip to ${tripDetails.destination}.`
                    : "Set your destination and dates to see a quick summary of your trip."}
                </p>
                <ul className="mt-3 text-xs text-muted-foreground space-y-1.5">
                  <li>
                    <span className="font-medium text-foreground">Dates:</span>{" "}
                    {tripDetails.startDate && tripDetails.endDate
                      ? `${tripDetails.startDate} → ${tripDetails.endDate}`
                      : "Choose your dates"}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Budget:</span>{" "}
                    {tripDetails.budget ? tripDetails.budget : "Select a budget level"}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">People:</span>{" "}
                    {tripDetails.people ? tripDetails.people : "Who&apos;s coming with you?"}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Interests:</span>{" "}
                    {tripDetails.interests.length > 0
                      ? tripDetails.interests.join(", ")
                      : "Pick a few things you enjoy"}
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-border">
                <h3 className="font-heading text-sm font-semibold mb-1">What happens next</h3>
                <p className="text-xs text-muted-foreground">
                  Once you confirm these details, Roavo will generate a draft itinerary with suggested activities,
                  neighborhoods to stay in, and a balanced daily schedule. You&apos;ll be able to tweak everything
                  before saving your final plan.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlanTrip;

