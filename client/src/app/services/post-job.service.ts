import { inject, Injectable, signal } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { type Skill } from '../model/skill.model';
import { JobResponse } from '../model/job.model';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { log } from 'console';

@Injectable({ providedIn: 'root' })
export class PostJobService {
  private readonly skillUrl = API_URLS.fetchSkills;
  private readonly postJobUrl = API_URLS.postJob;
  private readonly getJobById=API_URLS.getJobById;
  skills = signal<Skill[]>([]);
  private httpClient = inject(HttpClient);
  fetchExistingSkills() {
    return this.httpClient.get<{ data: Skill[] }>(this.skillUrl);
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
  postJob(body: any) {
    return this.httpClient.post<JobResponse>(this.postJobUrl, body, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  getJob(jobId: string): Observable<JobResponse> {
    const url = `${this.getJobById}/${jobId}`; 
    return this.httpClient.get<JobResponse>(url, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }
}
