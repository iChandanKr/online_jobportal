import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobseekerProfile, type Education } from '../model/jobseeker.model';
import { type JobSeekerDetails } from '../model/jobseeker.model';
import { type Skill } from '../model/skill.model';
import { type Applications } from '../model/applications.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateJobseekerService {
  private readonly getEducationDetailsUrl = API_URLS.getEducationDetails;
  private readonly getJobseekerUrl = API_URLS.getJobseeker;
  private readonly updateJobseekerUrl = API_URLS.updateJobseeker;
  private readonly updateEducationDetailsUrl = API_URLS.updateEducationDetails;
  private readonly addEducationDetailsUrl = API_URLS.addEducationDetails;
  private readonly addSkills = API_URLS.addSkills;
  private readonly getSkills = API_URLS.getSkills;
  private readonly updateSkills = API_URLS.updateSkills;
  private readonly jobseekerProfileUrl = API_URLS.jobseekerCompleteProfile;
  private readonly getAllApplicationsJobseeker=API_URLS.getAllApplicationsJobseeker;

  constructor(private httpClient: HttpClient) {}

  getEducationDetails(): Observable<any> {
    return this.httpClient.get<{
      status: string;
      message: string;
      data: Education;
    }>(this.getEducationDetailsUrl, { withCredentials: true });
  }

  getJobseeker(): Observable<any> {
    return this.httpClient.get<{
      status: string;
      message: string;
      data: JobSeekerDetails;
    }>(this.getJobseekerUrl, { withCredentials: true });
  }

  updateJobseeker(JobSeekerDetails: any) {
    return this.httpClient.put<{
      status: string;
      message: string;
      data: object;
    }>(this.updateJobseekerUrl, JobSeekerDetails, {
      // headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  updateEducationDetails(educationDetails: any) {
    return this.httpClient.put<{
      status: string;
      message: string;
      data: object;
    }>(this.updateEducationDetailsUrl, educationDetails, {
      withCredentials: true,
    });
  }

  addEducationDetails(educationDetails: any): Observable<any> {
    return this.httpClient.post<{
      status: string;
      message: string;
      data: object;
    }>(this.addEducationDetailsUrl, educationDetails, {
      withCredentials: true,
    });
  }

  addSkillsJobseeker(skills: any): Observable<any> {
    return this.httpClient.post<{
      status: string;
      message: string;
      data: object;
    }>(this.addSkills, skills, {
      withCredentials: true,
    });
  }

  getSkillsJobseeker(): Observable<any> {
    return this.httpClient.get<{
      status: string;
      message: string;
      data: Skill;
    }>(this.getSkills, { withCredentials: true });
  }

  updateSkillsJobseeker(skills: any): Observable<any> {
    return this.httpClient.put<{
      status: string;
      message: string;
      data: object;
    }>(this.updateSkills, skills, { withCredentials: true });
  }
  getJobseekerCompleteProfile(id: string) {
    const profileUrl = `${this.jobseekerProfileUrl}/${id}`;
  return  this.httpClient.get<{
      status: string;
      message: string;
      data: jobseekerProfile;
    }>(profileUrl, { withCredentials: true });
  }

  getAllApplications():Observable<any>{
    return this.httpClient.get<{
      status: string; 
    message: string; 
    data: Applications[] 
    }>(this.getAllApplicationsJobseeker,{withCredentials:true})
  }
}
