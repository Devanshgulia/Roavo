'use client';

import { useState } from 'react';
import { BookingLink, BookingLinks } from '@/types/travel';
import { Hotel, Plane, Car, Ticket, ExternalLink, ChevronDown, Sparkles } from 'lucide-react';

interface BookingLinksDisplayProps {
  bookingLinks: BookingLinks;
  destination: string;
}

export default function BookingLinksDisplay({ bookingLinks, destination }: BookingLinksDisplayProps) {
  const [expandedSections, setExpandedSections] = useState({
    hotels: true,
    flights: true,
    cars: false,
    activities: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const getSectionIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case 'hotels': return <Hotel className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'flights': return <Plane className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'cars': return <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'activities': return <Ticket className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    }
  };

  const renderBookingSection = (
    title: string,
    links: BookingLink[] | undefined,
    sectionKey: string,
    description: string
  ) => {
    if (!links || links.length === 0) return null;

    const isExpanded = expandedSections[sectionKey as keyof typeof expandedSections];

    return (
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 transition-all">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-6 py-4.5 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-sm">
              {getSectionIcon(sectionKey)}
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal">
                  {links.length} {links.length === 1 ? 'option' : 'options'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-teal-600 dark:text-teal-400' : ''}`}
          />
        </button>

        {isExpanded && (
          <div className="p-5 bg-white/50 dark:bg-slate-950/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 hover:border-teal-500/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        {link.platform}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                      {link.description}
                    </p>

                    {link.features && link.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {link.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 text-[11px] font-medium border border-teal-200/50 dark:border-teal-800/50"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center text-white bg-slate-900 dark:bg-slate-800 hover:bg-teal-600 dark:hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Check Live Availability</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!bookingLinks || Object.keys(bookingLinks).length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2 border border-teal-200/60 dark:border-teal-800/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Booking Gateway</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Real-Time Booking Links {destination ? `for ${destination}` : ''}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-1">
          Lock in your preferred hotels, flights, and experiences with one-click direct links.
        </p>
      </div>

      <div className="space-y-4">
        {renderBookingSection(
          'Hotels & Accommodations',
          bookingLinks.hotels,
          'hotels',
          'Curated stays matching your comfort level'
        )}
        
        {renderBookingSection(
          'Flight Search & Routes',
          bookingLinks.flights,
          'flights',
          'Compare flights and schedule trackers'
        )}
        
        {renderBookingSection(
          'Car Rentals & Transit',
          bookingLinks.cars,
          'cars',
          'Find flexible car rentals and transit passes'
        )}
        
        {renderBookingSection(
          'Tours & Guided Experiences',
          bookingLinks.activities,
          'activities',
          'Skip-the-line tickets and guided local excursions'
        )}
      </div>
    </div>
  );
}