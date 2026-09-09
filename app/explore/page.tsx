'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Globe, Sparkles, ArrowLeft, Loader2, Search, Compass, Plane } from 'lucide-react';
import { getDestImageWFallback } from '@/lib/utils/unsplash';

interface Destination {
  name: string;
  country: string;
  description: string;
  mainAttraction: string;
  weather: string;
  imageKeywords: string;
  imageUrl?: string;
}

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [season, setSeason] = useState('Season');
  const [month, setMonth] = useState('This Month');
  const [loadingImages, setLoadingImages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const filterTags = ['All', 'Cultural', 'Nature', 'Beaches', 'Culinary', 'Adventure', 'Urban'];

  useEffect(() => {
    const fetchInitialDestinations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/trending-destinations');
        const data = await response.json();
        
        if (data.season) setSeason(data.season);
        if (data.month) setMonth(data.month);
        
        const destinationsWithImages = await addImageUrlsToDestinations(data.destinations || []);
        setDestinations(destinationsWithImages);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialDestinations();
  }, []);

  const fetchMoreDestinations = async () => {
    if (isLoading || loadingImages) return;
    
    setLoadingImages(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`/api/trending-destinations?page=${nextPage}&count=8`);
      const data = await response.json();
      
      if (data.destinations && data.destinations.length > 0) {
        const newDestinationsWithImages = await addImageUrlsToDestinations(data.destinations);
        setDestinations(prev => [...prev, ...newDestinationsWithImages]);
        setCurrentPage(nextPage);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more destinations:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const addImageUrlsToDestinations = async (destinationsToProcess: Destination[]) => {
    return Promise.all(
      destinationsToProcess.map(async (destination) => {
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
  };

  const encodeDestination = (destination: Destination) => {
    return encodeURIComponent(JSON.stringify({
      name: `${destination.name}, ${destination.country}`,
      description: destination.description
    }));
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch = 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.mainAttraction.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedTag === 'All') return matchesSearch;
      
      const textToSearch = `${dest.description} ${dest.mainAttraction} ${dest.imageKeywords}`.toLowerCase();
      const matchesTag = textToSearch.includes(selectedTag.toLowerCase());
      
      return matchesSearch && matchesTag;
    });
  }, [destinations, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen pb-24">
      {/* Top Banner Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/70 dark:border-slate-800/80 bg-gradient-to-b from-teal-500/5 via-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold border border-teal-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated for {month} • {season}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Explore Trending Destinations
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Discover top global hotspots with peak seasonal weather, iconic attractions, and ready-to-customize AI trip itineraries.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, country, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 shadow-sm"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-8">
            <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No destinations found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Try adjusting your search keywords or choosing &quot;All&quot; categories.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
              className="btn-secondary !py-2 !px-4 !text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDestinations.map((destination, index) => (
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

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

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

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={fetchMoreDestinations}
                  disabled={loadingImages}
                  className="btn-primary !py-3 !px-8 !text-sm group"
                >
                  {loadingImages ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Loading more destinations...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                      <span>Discover More Destinations</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}