import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { JobSeeker } from '../../app/model/jobseeker.model';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class JobseekerSignupService {
  private readonly apiUrl = API_URLS.registerJobseeker;
  constructor(private httpClient: HttpClient) {}

  signupJobseeker(body: JobSeeker): Observable<any> {
    return this.httpClient.post(this.apiUrl, body, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
}
