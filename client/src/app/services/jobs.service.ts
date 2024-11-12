import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URLS } from '../constants/api-urls';
import { type JobResponse } from '../model/job.model';
import { type AllApplicants, type Applicant } from '../model/jobseeker.model';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly apiUrl = API_URLS.getJobs;
  private readonly deleteJobUrl = API_URLS.deleteJob;
  private readonly jobOpeningUrl = API_URLS.jobOpenings;
  private readonly jobWithSkillUrl = API_URLS.getJobWithSkills;
  private readonly jobsUserCanApplyUrl = API_URLS.jobsUserCanApply;
  private readonly applyJobUrl = API_URLS.applyJob;
  private readonly fetchApplicants = API_URLS.fetchAllApplicantsOfJob;
  private readonly fetchAllApplicants = API_URLS.fetchAllApplicantOfEmployer;
  private readonly updateApplicationStatusUrl =
    API_URLS.updateApplicationStatus;
  queryStr = signal('');
  private applicantsSubject = new BehaviorSubject<AllApplicants[] | null>(null);
  private jobSubject = new BehaviorSubject<JobResponse[] | null>(null);
  private allJobsSubject=new BehaviorSubject<JobResponse[]|null>(null);
  constructor(private httpClient: HttpClient) { }

  get applicants$() {
    return this.applicantsSubject.asObservable();
  }

  get jobs$() {
    return this.jobSubject.asObservable(); 
  }

  getJobs(
    search?: string,
    sort?: string,
    page?: number,
    limit?: number
  ): Observable<JobResponse[] | null> {
    if (this.jobSubject.value) {
      return this.jobs$;
    } else {
      let params = new HttpParams();

      if (search) {
        params = params.set('search', search);
      }
      if (sort) {
        params = params.set('sort', sort);
      }
      if (page) {
        params = params.set('page', page.toString());
      }
      if (limit) {
        params = params.set('limit', limit.toString());
      }

      this.httpClient
        .get<JobResponse[]>(this.apiUrl, { params, withCredentials: true })
        .subscribe({
          next: (jobs) => this.jobSubject.next(jobs),
          error: (err) => console.error('Failed to fetch jobs', err),
        });

      return this.jobs$;
    }
  }

  deleteJob(jobId: string): Observable<any> {
    let params = new HttpParams().set('id', jobId);
    const url = `${this.deleteJobUrl}/${jobId}`;
    return this.httpClient.delete(url, {
      params,
      withCredentials: true,
    });
  }

  getJobOpenings(str: string = ''): Observable<any> {
    const queryString = `${this.jobOpeningUrl}?search=${str}`;
    return this.httpClient.get<JobResponse>(queryString);
  }

  getAllJobsUserCanApply(str: string = ''): Observable<any> {
    const queryString = `${this.jobsUserCanApplyUrl}?search=${str}`;

    return this.httpClient.get<JobResponse>(queryString, {
      withCredentials: true,
    });
  }

  getJobWithSkills(id: string): Observable<any> {
    const url = `${this.jobWithSkillUrl}/${id}`;
    return this.httpClient.get<{
      status: string;
      message: string;
      data: object;
    }>(url);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
  applyJob(jobId: string): Observable<any> {
    return this.httpClient.post<{
      status: string;
      message: string;
      data: object;
    }>(
      this.applyJobUrl,
      {
        jobId,
      },
      {
        headers: this.getHeaders(),
        withCredentials: true,
      }
    );
  }

  getApplicantsOfJob(id: string): Observable<any> {
    const apiUrl = `${this.fetchApplicants}/${id}`;
    return this.httpClient.get<{
      status: string;
      message: string;
      data: Applicant[];
    }>(apiUrl, { withCredentials: true });

  }

  getAllApplicantsOfEmployer() {
    if (!this.applicantsSubject.value) {
      this.httpClient
        .get<{ status: string; message: string; data: AllApplicants[] }>(
          this.fetchAllApplicants,
          { withCredentials: true }
        )
        .subscribe({
          next: (response) => {
            this.applicantsSubject.next(response.data);
          },
          error: (err) => {
            console.error('Failed to fetch applicants', err);
          },
        });
    }
    return this.applicants$;
  }


  updateApplicationStatus(
    payload: {
      userId: string;
      jobId: string;
      status: string;
    }[]
  ): Observable<any> {
    return this.httpClient.patch<{ status: string; message: string }>(
      this.updateApplicationStatusUrl,
      { payload },
      { headers: this.getHeaders(), withCredentials: true }
    );
  }
}
