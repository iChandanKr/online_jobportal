export interface Job {
  title: string;
  description: string;
  role: string;
  location: string;
  city: string;
  industryName: string;
  skillId: string[];
  minSalary: string | undefined;
  maxSalary: string | undefined;
  applicationDeadline: string;
  jobType: string;
  shift: string;
}

export interface JobResponse {
  status: string;
  message: string;
  data: Job;
}
