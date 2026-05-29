// Metro Manila Districts and Cities
export const DISTRICTS = [
  { id: 1, name: "District 1 — Manila", shortName: "Manila" },
  { id: 2, name: "District 2 — Inner East", shortName: "Inner East" },
  { id: 3, name: "District 3 — North", shortName: "North" },
  { id: 4, name: "District 4 — South", shortName: "South" },
] as const;

export const CITIES: Record<number, string[]> = {
  1: ["Manila", "San Juan", "Mandaluyong"],
  2: ["Quezon City", "Marikina", "Pasig"],
  3: ["Caloocan", "Malabon", "Navotas", "Valenzuela"],
  4: ["Makati", "Taguig", "Pasay", "Parañaque", "Las Piñas", "Muntinlupa"],
};

// Job Categories (10 categories for MVP)
export const CATEGORIES = [
  { id: "food-beverage", name: "Food & Beverage", icon: "coffee" },
  { id: "retail-sales", name: "Retail & Sales", icon: "shopping-bag" },
  { id: "admin-office", name: "Admin & Office", icon: "briefcase" },
  { id: "education", name: "Education", icon: "book-open" },
  { id: "events", name: "Events", icon: "calendar" },
  { id: "logistics", name: "Logistics", icon: "truck" },
  { id: "healthcare", name: "Healthcare", icon: "heart" },
  { id: "it-tech", name: "IT & Tech", icon: "monitor" },
  { id: "beauty-wellness", name: "Beauty & Wellness", icon: "sparkles" },
  { id: "customer-service", name: "Customer Service", icon: "headphones" },
] as const;

// Feature Tags for Job Listings
export const FEATURE_TAGS = [
  { id: "no-experience", label: "No Experience OK" },
  { id: "students-ok", label: "Students OK" },
  { id: "uniform-provided", label: "Uniform Provided" },
  { id: "immediate-start", label: "Immediate Start" },
  { id: "transportation-allowance", label: "Transportation Allowance" },
  { id: "meal-allowance", label: "Meal Allowance" },
  { id: "weekly-pay", label: "Weekly Pay OK" },
  { id: "daily-pay", label: "Daily Pay" },
  { id: "flexible-hours", label: "Flexible Hours" },
  { id: "night-shift", label: "Night Shift OK" },
  { id: "tattoos-ok", label: "Tattoos OK" },
  { id: "no-resume", label: "No Resume Needed" },
] as const;

// Transit Lines (Operational Only in MVP)
export const TRANSIT_LINES = [
  { id: "mrt-3", name: "MRT-3", type: "rail", isOperational: true },
  { id: "lrt-1", name: "LRT-1", type: "rail", isOperational: true },
  { id: "lrt-2", name: "LRT-2", type: "rail", isOperational: true },
  {
    id: "edsa-carousel",
    name: "EDSA Bus Carousel",
    type: "bus",
    isOperational: true,
  },
  { id: "bgc-bus", name: "BGC Bus", type: "bus", isOperational: true },
  { id: "makati-bus", name: "Makati Ayala Bus", type: "bus", isOperational: true },
  { id: "pitx", name: "PITX", type: "terminal", isOperational: true },
] as const;

// Pay Types
export const PAY_TYPES = [
  { id: "hourly", label: "Hourly" },
  { id: "daily", label: "Daily" },
  { id: "monthly", label: "Monthly" },
] as const;

// Application Status
export const APPLICATION_STATUS = [
  { id: "RECEIVED", label: "Received", color: "gray" },
  { id: "UNDER_REVIEW", label: "Under Review", color: "blue" },
  { id: "INTERVIEW", label: "Interview", color: "amber" },
  { id: "HIRED", label: "Hired", color: "green" },
  { id: "REJECTED", label: "Rejected", color: "red" },
] as const;

// Job Listing Status
export const LISTING_STATUS = [
  { id: "PENDING", label: "Pending", color: "gray" },
  { id: "ACTIVE", label: "Active", color: "green" },
  { id: "EXPIRED", label: "Expired", color: "red" },
  { id: "DEACTIVATED", label: "Deactivated", color: "darkgray" },
] as const;

// User Roles
export const USER_ROLES = ["SEEKER", "EMPLOYER", "ADMIN", "SUPERADMIN"] as const;

// Schedule Options
export const SCHEDULE_OPTIONS = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "mornings", label: "Mornings" },
  { id: "afternoons", label: "Afternoons" },
  { id: "evenings", label: "Evenings" },
  { id: "flexible", label: "Flexible" },
] as const;

// Pay Minimums for Filter
export const PAY_MINIMUMS = [
  { value: 0, label: "Any" },
  { value: 50, label: "₱50+" },
  { value: 75, label: "₱75+" },
  { value: 100, label: "₱100+" },
  { value: 125, label: "₱125+" },
] as const;
