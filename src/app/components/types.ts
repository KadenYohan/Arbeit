export type Page = 'home' | 'list' | 'detail';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  jobType: string[];
  employmentType: string; // [ア・パ], [社員], etc.
  salary: { type: string; min: number; max: number; note?: string };
  schedule: string[];
  scheduleNote?: string;
  location: string;
  nearestStation: string[];
  features: string[];
  ageGroupSlider: number; // 1-5 (teenage to 50s)
  genderRatioSlider: number; // 1-5 (male to female)
  workStyleSlider: number; // 1-5 (by myself to large group)
  workplaceVibeSlider: number; // 1-5 (quiet to lively)
  workTypeSlider: number; // 1-5 (desk to standing)
  customerInteractionSlider: number; // 1-5 (none to always)
  externalInteractionSlider: number; // 1-5 (limited to frequent)
  priorKnowledgeSlider: number; // 1-5 (not needed to required)
  applicationBarometer: number; // 1-5
  slotsLeft?: number;
  isNew: boolean;
  isFeatured: boolean;
  isUrgent: boolean;
  category: string;
  categoryIcon: string;
  description: string;
  jobDescription: string;
  workStartDate: string;
  employmentPeriod: string;
  holidays: string;
  requirements: string;
  benefits: string;
  happyBonus?: string;
  recommendedPoints: string[];
  applicationDest: string;
  howToApply: string;
  companyInfo: {
    name: string;
    businessDetails: string;
    url?: string;
  };
  photoPlaceholder?: string;
  district: string;
  districtNum: number;
  totalHired: string;
  postedDate: string;
}

export interface District {
  id: string;
  name: string;
  cities: string[];
  color: string;
  hoverColor: string;
  jobCount: number;
  num: number;
}

export interface TrainLine {
  id: string;
  name: string;
  color: string;
  status: 'operational' | 'under-construction';
  stations: string[];
  path: string; // SVG path string for the polyline
}

export interface SearchFilters {
  area: string[];
  stations: string[];
  jobType: string[];
  payType: string;
  minPay: string;
  schedule: string[];
  workPeriod: string[];
  features: string[];
  freeWord: string;
}
