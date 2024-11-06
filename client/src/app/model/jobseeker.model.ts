export interface JobSeeker {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface Education {
  id?: string;
  tenthMarksPercent: number;
  tenthPassingYear: number;
  twelfthMarksPercent: number;
  twelfthPassingYear: number;
  ugStream: string;
  ugBranch: string;
  ugCGPA: number;
  ugPassingYear: number;
  pgStream?: string;
  pgPassingYear?: number;
}

export interface JobSeekerDetails {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  appliedOn: Date;
  status: string;
  JobPosts:JobPost[];
}

export interface JobPost{
  title:string;
}

export interface AllApplicants {
  JobPosts: JobPost[];
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface skills {
  id: string;
  skillName: string;
}

export interface jobseekerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  contact: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  tenthMarksPercent: number;
  tenthPassingYear: number;
  twelfthMarksPercent: number;
  twelfthPassingYear: number;
  ugStream: string;
  ugBranch: string;
  ugCGPA: number;
  ugPassingYear: number;
  pgStream?: string;
  pgPassingYear?: number;
  skills: string[];
}
