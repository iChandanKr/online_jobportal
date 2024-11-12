import { Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { type jobseekerProfile, type Education } from '../model/jobseeker.model';
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
  private readonly getSkillsUrl = API_URLS.getSkills;
  private readonly updateSkills = API_URLS.updateSkills;
  private readonly jobseekerProfileUrl = API_URLS.jobseekerCompleteProfile;
  private readonly getAllApplicationsJobseeker = API_URLS.getAllApplicationsJobseeker;
  private applicationsSubject = new BehaviorSubject<Applications[] | null>(null);
  applications$ = this.applicationsSubject.asObservable();
  private jobSeekerSubject = new BehaviorSubject<JobSeekerDetails[] | null>(null);
  jobSeekerProfile$ = this.jobSeekerSubject.asObservable();
  private educationDetailsSubject = new BehaviorSubject<Education[] | null>(null);
  educationDetails$ = this.educationDetailsSubject.asObservable();
  private skillsSubject = new BehaviorSubject<Skill[] | null>(null);
  skills$ = this.skillsSubject.asObservable();


  constructor(private httpClient: HttpClient) { }

  getEducationDetails(): Observable<any> {
    if (!this.educationDetailsSubject.value) {
      this.httpClient.get<{ status: string; message: string; data: Education[] }>(this.getEducationDetailsUrl, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.educationDetailsSubject.next(response.data);
          },
          error: (err) => {
            console.error('Failed to fetch education details', err);
          },
        });
    }
    return this.educationDetails$;
  }

  getJobseeker(): Observable<any> {
    if (!this.jobSeekerSubject.value) {
      console.log("hello");

      this.httpClient.get<{ status: string; message: string; data: JobSeekerDetails[] }>(this.getJobseekerUrl, { withCredentials: true })
        .subscribe({
          next: (response) => {
            console.log(response);

            this.jobSeekerSubject.next(response.data);
          },
          error: (err) => {
            console.error('Failed to fetch job seeker data', err);
          },
        });
    }
    return this.jobSeekerProfile$;
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
    if (!this.skillsSubject.value) {
      this.httpClient.get<{ status: string; message: string; data: Skill[] }>(this.getSkillsUrl, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.skillsSubject.next(response.data);
          },
          error: (err) => {
            console.error('Failed to fetch skills data', err);
          },
        });
    }
    return this.skills$;
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
    return this.httpClient.get<{
      status: string;
      message: string;
      data: jobseekerProfile;
    }>(profileUrl, { withCredentials: true });
  }


  getAllApplications(): Observable<any> {
    if (!this.applicationsSubject.value) {
      this.httpClient
        .get<{ status: string; message: string; data: Applications[] }>(this.getAllApplicationsJobseeker, {
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            this.applicationsSubject.next(response.data);
          },
          error: (err) => {
            console.error('Failed to fetch applications', err);
          },
        });
    }
    return this.applications$;
  }
}
