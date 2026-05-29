// User type definitions
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "SEEKER" | "EMPLOYER" | "ADMIN" | "SUPERADMIN";
  status: "PENDING" | "ACTIVE" | "SUSPENDED";
  phone?: string;
  avatarUrl?: string;
  emailVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeekerProfile {
  id: string;
  userId: string;
  homeCity: string;
  bio?: string;
  skills?: string[];
  availability?: string;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  companyCity: string;
  companySize: "1-10" | "11-50" | "51-200" | "200+";
  description?: string;
  logoUrl?: string;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  message?: string;
  status: "RECEIVED" | "UNDER_REVIEW" | "INTERVIEW" | "HIRED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}
