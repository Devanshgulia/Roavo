'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Plane, MapPin, Heart, Shield, Star, Users, Sparkles, Globe, 
  ArrowRight, Compass, Calendar, CheckCircle2, ChevronRight,
  TrendingUp, Clock, Coffee, Camera
} from 'lucide-react';
import { getDestImageWFallback } from '@/lib/utils/unsplash';
import { useRouter } from 'next/navigation';

interface Destination {
  name: string;
  country: string;
  description: string;
  mainAttraction: string;
  weather: string;
  imageKeywords: string;
  imageUrl?: string;
}

export default function HomePage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [trendingDestinations, setTrendingDestinations] = useState<Destination[]>([]);
  const [season, setSeason] = useState<string>('Season');
  const [month, setMonth] = useState<string>('This Month');
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [quickPrompt, setQuickPrompt] = useState('');

  const samplePrompts = [
    "7 days in Tokyo & Kyoto on a foodie budget",
    "Romantic 5-day getaway to the Amalfi Coast",
    "Backpacking Southeast Asia for 14 days",
    "Weekend road trip through Swiss Alps"
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchTrendingDestinations = async () => {
      setIsLoadingDestinations(true);
      try {
        const response = await fetch('/api/trending-destinations');
        const data = await response.json();
        
        const destinationsWithImages = await Promise.all(
          (data?.destinations || []).map(async (destination: Destination) => {
            try {
              const imageUrl = await getDestImageWFallback({
                name: destination.name,
                country: destination.country,
                imageKeywords: destination.imageKeywords
              });
              return { ...destination, imageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${destination.name}:`, error);
              return destination;
            }
          })
        );
        
        setTrendingDestinations(destinationsWithImages);
        if (data.season) setSeason(data.season);
        if (data.month) setMonth(data.month);
      } catch (error) {
        console.error('Error fetching trending destinations:', error);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    fetchTrendingDestinations();
  }, []);

  const handleQuickPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) {
      router.push('/planner');
      return;
    }
    const encoded = encodeURIComponent(JSON.stringify({
      name: quickPrompt,
      description: quickPrompt
    }));
    router.push(`/planner?destination=${encoded}`);
  };

  const encodeDestination = (destination: Destination) => {
    return encodeURIComponent(JSON.stringify({
      name: `${destination.name}, ${destination.country}`,
      description: destination.description
    }));
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Intelligent Route Optimization",
      description: "Smart geographic clustering minimizes transit fatigue and maximizes your daily sightseeing time.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Paced Day Schedules",
      description: "Balanced morning, afternoon, and evening timelines with realistic durations and insider timing tips.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Dynamic Budget Intelligence",
      description: "Tailored cost breakdowns with splurge recommendations and real-time budget saving advice.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Live Booking Link Engine",
      description: "Instant direct connections to real hotel, flight, car rental, and attraction booking platforms.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Hidden Gems & Culture",
      description: "Discover authentic local bistros, scenic viewpoints, and off-the-beaten-path cultural experiences.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Interactive AI Co-Pilot",
      description: "Fine-tune your itinerary in real-time with an AI assistant that rebalances days and swaps activities instantly.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Share Your Vision",
      description: "Enter your target destinations, travel style, date flexibility, and unique interests."
    },
    {
      number: "02",
      title: "AI Crafts The Blueprint",
      description: "Our multi-agent planner curates activities, estimates budgets, and plots smart travel routes."
    },
    {
      number: "03",
      title: "Customize, Export & Travel",
      description: "Chat with the AI to refine plans, export clean PDFs, and click to book flights & stays."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient Glowing Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/15 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping"></span>
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Next-Generation AI Travel Planning</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Design Your Dream Journey in <span className="text-gradient-primary">Seconds</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Roavo crafts hyper-personalized, multi-day itineraries tailored to your pace, budget, and passions—with interactive maps, real booking links, and smart daily routes.
            </p>

            {/* Interactive Search / Prompt Box */}
            <form onSubmit={handleQuickPromptSubmit} className="max-w-2xl mx-auto mb-6">
              <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl sm:rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-teal-500/5 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 transition-all">
                <div className="flex items-center w-full px-3 py-2 sm:py-0">
                  <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={quickPrompt}
                    onChange={(e) => setQuickPrompt(e.target.value)}
                    placeholder="Where to? (e.g., 7 days in Switzerland & Italy on a budget)"
                    className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-primary shrink-0 mt-2 sm:mt-0 !py-3 !px-6 !text-sm"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  <span>Generate</span>
                </button>
              </div>
            </form>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-14 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Try asking:</span>
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setQuickPrompt(prompt)}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 dark:hover:text-teal-300 transition-colors border border-slate-200/60 dark:border-slate-700/60"
                >
                  &quot;{prompt}&quot;
                </button>
              ))}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/70 dark:border-slate-800/80 max-w-4xl mx-auto">
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">50k+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Trips Planned</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">120+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Global Destinations</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">4.9 / 5</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Traveler Satisfaction</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Free & Instant</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trending Destinations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3 border border-cyan-200/60 dark:border-cyan-800/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked for {month}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Trending Places to Visit <span className="text-gradient-primary">This {season}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Curated global destinations with optimal weather conditions, vibrant local events, and unforgettable seasonal vibes.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors group"
            >
              <span>Explore all destinations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoadingDestinations ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                  <div className="h-52 skeleton-shimmer"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-3/4 skeleton-shimmer rounded"></div>
                    <div className="h-4 w-full skeleton-shimmer rounded"></div>
                    <div className="h-10 w-full skeleton-shimmer rounded-xl mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group"
                >
                  <div className="h-52 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {destination.imageUrl ? (
                      <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-teal-500 opacity-60" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    
                    {/* Destination Name Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-teal-300">
                          {destination.country}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {destination.name}
                        </h3>
                      </div>
                      {destination.weather && (
                        <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                          {destination.weather.split(',')[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {destination.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="truncate">{destination.mainAttraction}</span>
                      </div>
                    </div>

                    <Link
                      href={`/planner?destination=${encodeDestination(destination)}`}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-slate-950 border border-teal-200 dark:border-teal-800/60 transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Plan Trip to {destination.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3 border border-teal-200/60 dark:border-teal-800/40">
              <Compass className="w-3.5 h-3.5" />
              <span>Effortless Planning Flow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              How Roavo Builds Your <span className="text-gradient-primary">Perfect Trip</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mt-3">
              Forget hours of fragmented tabs and spreadsheet chaos. Everything you need is synthesized in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300"
              >
                <div className="text-5xl font-black text-slate-200 dark:text-slate-800/80 mb-4 select-none group-hover:text-teal-500/20 transition-colors">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineered For Smarter, Smoother Travel
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base mt-3">
              Packed with features designed to take you from daydreaming to departure without stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.gradient} text-white flex items-center justify-center mb-5 shadow-md shadow-teal-500/10 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 p-8 sm:p-14 text-center text-white relative shadow-2xl shadow-teal-900/30 overflow-hidden">
          
          {/* Subtle Graphic background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-300/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Craft Your Next Epic Adventure?
            </h2>
            <p className="text-teal-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              No spreadsheets. No guesswork. Just your ideal trip, mapped and organized down to every coffee break and viewpoint.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/planner"
                className="w-full sm:w-auto px-8 py-4 bg-white text-teal-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Plane className="w-5 h-5" />
                <span>Start AI Trip Planner</span>
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-auto px-7 py-4 bg-teal-800/60 hover:bg-teal-800/80 text-white font-semibold rounded-full border border-teal-400/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Destinations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}