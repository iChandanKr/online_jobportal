import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { JobSeeker } from '../../app/model/jobseeker.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class JobseekerSignupService {
  private readonly apiUrl =
    'http://localhost:3000/api/v1/users/register-jobseeker';
  constructor(private httpClient: HttpClient) {}

  signupJobseeker(body: JobSeeker): Observable<any> {
    return this.httpClient.post(this.apiUrl, body,{
      headers: this.getHeaders(),
      withCredentials:true,
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',

    });
  }

}
