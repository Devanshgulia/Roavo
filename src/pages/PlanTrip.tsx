import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PlanTrip = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-5xl mx-auto section-padding">
        <section className="space-y-6">
          <div>
            <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-3">
              Plan your next adventure
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Start crafting your perfect itinerary
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Tell Roavo where you&apos;re going, when you&apos;re traveling, and what you love to do.
              We&apos;ll build a smart, day-by-day plan tailored to you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
            <div className="space-y-4 glass-panel p-6 rounded-2xl border border-border">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Tokyo, Japan"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. 12–18 June 2026"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Travel style</label>
                <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60">
                  <option>Balanced – a bit of everything</option>
                  <option>Chilled – slow and relaxed</option>
                  <option>Packed – see as much as possible</option>
                  <option>Family friendly</option>
                  <option>Nightlife & food focused</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Things you love</label>
                <textarea
                  rows={4}
                  placeholder="Museums, hidden cafes, bookstores, nature walks..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 resize-none"
                />
              </div>

              <button className="w-full md:w-auto bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                Generate itinerary
              </button>
            </div>

            <aside className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-border">
                <h2 className="font-heading text-base font-semibold mb-2">How Roavo plans for you</h2>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Balances travel time, opening hours, and your energy levels.</li>
                  <li>• Suggests must‑see spots plus local hidden gems.</li>
                  <li>• Adapts instantly when your dates or preferences change.</li>
                </ul>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-border">
                <h3 className="font-heading text-sm font-semibold mb-1">Coming soon</h3>
                <p className="text-xs text-muted-foreground">
                  This is an early preview of the planning experience. Soon you&apos;ll be able to see a full
                  timeline, map view, and live editing powered by Roavo AI.
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

