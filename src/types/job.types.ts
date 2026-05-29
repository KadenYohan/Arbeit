// Job type definitions
export interface Job {
  id: string;
  title: string;
  companyName: string;
  category: string;
  subCategory?: string;
  payType: "hourly" | "daily" | "monthly";
  payMin: number;
  payMax: number;
  scheduleDays: string[];
  shiftFrom: string;
  shiftTo: string;
  slotsAvailable: number;
  workSetup: "on-site" | "hybrid";
  district: number;
  city: string;
  streetAddress: string;
  nearestStation?: string;
  featureTags: string[];
  requirementsNotes?: string;
  description: string;
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "DEACTIVATED";
  createdAt: string;
  updatedAt: string;
  employerId: string;
  viewCount: number;
  isFeatured: boolean;
}

export interface JobCard {
  id: string;
  title: string;
  companyName: string;
  category: string;
  payType: "hourly" | "daily" | "monthly";
  payMin: number;
  payMax: number;
  scheduleDays: string[];
  shiftFrom: string;
  shiftTo: string;
  city: string;
  nearestStation?: string;
  featureTags: string[];
  createdAt: string;
  isNew: boolean;
  isSaved?: boolean;
}

export interface JobFilters {
  district?: number;
  city?: string;
  category?: string;
  payType?: string;
  payMin?: number;
  schedule?: string[];
  featureTags?: string[];
  q?: string;
  page?: number;
  limit?: number;
}
