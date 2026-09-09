'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, Clock, MapPin, DollarSign, 
  Loader2, CheckCircle, AlertCircle, ArrowRight, Plus, Minus, 
  Edit, Maximize2, Minimize2, X, MessageSquare
} from 'lucide-react';
import { StructuredItinerary } from '@/types/travel';
import ItineraryChangeNotification from './ItineraryChangeNotification';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  changes?: {
    type: 'modification' | 'addition' | 'removal';
    description: string;
    affectedDays?: number[];
    before?: string;
    after?: string;
    activityName?: string;
  }[];
  requiresConfirmation?: boolean;
}

interface TravelAssistantChatProps {
  itinerary: StructuredItinerary;
  onItineraryUpdate: (updatedItinerary: StructuredItinerary) => void;
  userPreferences?: {
    budget: string;
    travelStyle: string;
    interests: string[];
    travelers: number;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export default function TravelAssistantChat({ 
  itinerary, 
  onItineraryUpdate, 
  userPreferences,
  isOpen,
  onToggle 
}: TravelAssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI Travel Concierge. I can help refine your trip to ${itinerary.destinations.map(d => d.name).join(' & ')}. You can ask me to re-balance days, swap activities, find budget alternatives, or add specific spots!`,
      timestamp: new Date().toISOString(),
      suggestions: [
        "Make my itinerary less busy",
        "Add more cultural activities",
        "Help me save money",
        "Suggest top local food spots"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{
    itinerary: StructuredItinerary;
    changes: {
      type: 'modification' | 'addition' | 'removal';
      description: string;
      affectedDays?: number[];
      before?: string;
      after?: string;
      activityName?: string;
    }[];
  } | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState<{
    message: string;
    changes: {
      type: 'modification' | 'addition' | 'removal';
      description: string;
      affectedDays?: number[];
      before?: string;
      after?: string;
      activityName?: string;
    }[];
  }>({ message: '', changes: [] });
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          itinerary,
          chatHistory: messages,
          userPreferences
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        suggestions: data.suggestions,
        changes: data.changes,
        requiresConfirmation: data.requiresConfirmation
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.updatedItinerary) {
        if (data.requiresConfirmation) {
          setPendingChanges({
            itinerary: data.updatedItinerary,
            changes: data.changes || []
          });
        } else {
          onItineraryUpdate(data.updatedItinerary);
          
          setTimeout(() => {
            const confirmationMessage: ChatMessage = {
              role: 'assistant',
              content: "✅ Your itinerary has been updated! The changes are now reflected in your trip plan.",
              timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, confirmationMessage]);
            
            setNotificationData({
              message: "Your itinerary has been successfully updated!",
              changes: data.changes || []
            });
            setShowNotification(true);
          }, 500);
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or rephrase your request.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const confirmChanges = () => {
    if (pendingChanges) {
      try {
        onItineraryUpdate(pendingChanges.itinerary);
        
        setNotificationData({
          message: "Your itinerary has been successfully updated!",
          changes: pendingChanges.changes
        });
        setShowNotification(true);
        setPendingChanges(null);
        
        const confirmationMessage: ChatMessage = {
          role: 'assistant',
          content: "✅ Perfect! I've applied all the changes to your itinerary. Your trip plan has been updated.",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, confirmationMessage]);
        setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.error("Error applying itinerary changes:", error);
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: "I'm sorry, I encountered an error while applying the changes. Please try again.",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
        setTimeout(scrollToBottom, 100);
      }
    }
  };

  const rejectChanges = () => {
    setPendingChanges(null);
    const rejectionMessage: ChatMessage = {
      role: 'assistant',
      content: "No problem! Your original itinerary remains unchanged. Feel free to ask for different modifications.",
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, rejectionMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-xl shadow-teal-600/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 z-50 flex items-center gap-2 group"
        aria-label="Open AI Concierge"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
        <Bot className="w-5 h-5" />
        <span className="text-sm font-semibold pr-1 hidden sm:inline">Ask AI Copilot</span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 
                flex flex-col z-50 overflow-hidden transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-[calc(100vw-2rem)] sm:w-[650px] h-[700px]' : 'w-[calc(100vw-2rem)] sm:w-[420px] h-[580px]'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm">AI Travel Concierge</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[11px] text-teal-100">Live trip modifier & local advice</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
              message.role === 'user' 
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 shadow-sm'
            }`}>
              <div className="flex items-start gap-2">
                {message.role === 'assistant' && (
                  <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-[10px] mt-1.5 ${message.role === 'user' ? 'text-teal-100' : 'text-slate-400'}`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
                {message.role === 'user' && (
                  <User className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                )}
              </div>

              {/* Suggestions */}
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Quick Prompts:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-[11px] bg-slate-50 dark:bg-slate-700 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-600 px-2.5 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Pending Confirmation Block */}
        {pendingChanges && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2 text-amber-900 dark:text-amber-200 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Confirm Modifications</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-800 dark:text-amber-300 mb-3">
              {pendingChanges.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="mt-0.5">•</span>
                  <span>{c.description}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button
                onClick={confirmChanges}
                className="flex-1 py-1.5 px-3 rounded-lg bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Apply</span>
              </button>
              <button
                onClick={rejectChanges}
                className="py-1.5 px-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-teal-600 dark:text-teal-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Consulting AI model...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a change (e.g. 'Swap Day 2 museum for a boat tour')..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ItineraryChangeNotification
        isVisible={showNotification}
        message={notificationData.message}
        changes={notificationData.changes}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}