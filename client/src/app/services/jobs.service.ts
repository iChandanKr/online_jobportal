import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-urls';
import { type JobResponse } from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly apiUrl = API_URLS.getJobs;
  private readonly deleteJobUrl = API_URLS.deleteJob;
  private readonly jobOpeningUrl = API_URLS.jobOpenings;
  private readonly jobWithSkillUrl = API_URLS.getJobWithSkills;
  queryStr = signal('');
  constructor(private httpClient: HttpClient) {}

  getJobs(
    search?: string,
    sort?: string,
    page?: number,
    limit?: number
  ): Observable<any> {
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
    return this.httpClient.get(this.apiUrl, { params, withCredentials: true });
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

  getJobWithSkills(id: string): Observable<any> {
    const url = `${this.jobWithSkillUrl}/${id}`;
    return this.httpClient.get<{
      status: string;
      message: string;
      data: object;
    }>(url);
  }
}
