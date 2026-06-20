import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Job } from '../components/types';

interface SavedJobsContextValue {
  savedJobs: Job[];
  isSaved: (jobId: string) => boolean;
  toggleSave: (job: Job) => void;
  clearAll: () => void;
}

const SavedJobsContext = createContext<SavedJobsContextValue | null>(null);

const STORAGE_KEY = 'arbeitph_saved_jobs';

export function SavedJobsProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<Job[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
  }, [savedJobs]);

  const isSaved = useCallback((jobId: string) => savedJobs.some(j => j.id === jobId), [savedJobs]);

  const toggleSave = useCallback((job: Job) => {
    setSavedJobs(prev =>
      prev.some(j => j.id === job.id) ? prev.filter(j => j.id !== job.id) : [job, ...prev]
    );
  }, []);

  const clearAll = useCallback(() => setSavedJobs([]), []);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, isSaved, toggleSave, clearAll }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used inside SavedJobsProvider');
  return ctx;
}
