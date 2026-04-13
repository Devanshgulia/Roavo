'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Plane, Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const pathname = usePathname();
  const showPlanningBadge = pathname === '/planner';
  const [isLoaded, setIsLoaded] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="glass border-b border-white/20 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className={`transition-all duration-500 ease-out ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden">
              <img src="/logo.png" alt="Roavo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-display text-gradient-primary">Roavo</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium -mt-1">your journey starts here</p>
            </div>
          </div>
        </Link>
        <nav className={`flex items-center space-x-6 transition-all duration-500 ease-out delay-150 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {showPlanningBadge ? (
            <div className="flex items-center px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded-full border border-teal-200 dark:border-teal-700/50">
              <Plane className="w-4 h-4 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-teal-700 dark:text-teal-300 font-medium text-sm">Planning Your Trip</span>
            </div>
          ) : (
            <Link href="/planner" className="btn-primary">
              Start Planning
            </Link>
          )}
          <a
            href="https://github.com/Devanshgulia/Roavo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center hover:scale-105 transition-transform"
          >
            <Globe className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isLoaded && theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
} 