import { environment } from '../../environments/environment.development';

export const API_URLS = {
  login: `${environment.apiUrl}/users/login`,
  logout: `${environment.apiUrl}/users/logout`,
  registerEmployer: `${environment.apiUrl}/users/register-employer`,
  registerJobseeker: `${environment.apiUrl}/users/register-jobseeker`,
  auth: `${environment.apiUrl}/users/auth/check`,
  fetchSkills: `${environment.apiUrl}/skills/getAllSkills`,
  postJob: `${environment.apiUrl}/job/add-jobpost`,
  fetchEmployer: `${environment.apiUrl}/users/employer`,
  getJobs: `${environment.apiUrl}/job/jobs`,
  updateEmployer: `${environment.apiUrl}/users/update-employer`,
  updatePassword: `${environment.apiUrl}/users/password-update`,
  jobOpenings: `${environment.apiUrl}/job/jobs-opening`,
  deleteJob: `${environment.apiUrl}/job/delete-job`,
  updateJob: `${environment.apiUrl}/job/update-job`,
  getJobById: `${environment.apiUrl}/job/getJob`,
  getJobWithSkills: `${environment.apiUrl}/job/job-details`,
  jobsUserCanApply: `${environment.apiUrl}/job/jobs-userCanApply`,
  applyJob: `${environment.apiUrl}/job/apply-job`,
};
