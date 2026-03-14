import { useEffect, useMemo, useState } from "react";

export type TripDetails = {
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  budget: string;
  people: string;
  interests: string[];
};

const defaultTripDetails: TripDetails = {
  destination: "",
  startDate: "",
  endDate: "",
  days: 0,
  budget: "",
  people: "",
  interests: [],
};

const computeDays = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 0;
  }
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
};

export const useTripForm = (initial?: Partial<TripDetails>) => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    ...defaultTripDetails,
    ...initial,
  });

  useEffect(() => {
    const days = computeDays(tripDetails.startDate, tripDetails.endDate);
    setTripDetails((prev) => ({ ...prev, days }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripDetails.startDate, tripDetails.endDate]);

  const setField = <K extends keyof TripDetails>(key: K, value: TripDetails[K]) => {
    setTripDetails((prev) => ({ ...prev, [key]: value }));
  };

  const setDates = (startDate: string, endDate: string) => {
    setTripDetails((prev) => ({ ...prev, startDate, endDate }));
  };

  const toggleInterest = (interest: string) => {
    setTripDetails((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const canGenerate = useMemo(() => {
    return Boolean(tripDetails.destination && tripDetails.startDate && tripDetails.endDate);
  }, [tripDetails.destination, tripDetails.startDate, tripDetails.endDate]);

  return {
    tripDetails,
    setField,
    setDates,
    toggleInterest,
    canGenerate,
  };
};

