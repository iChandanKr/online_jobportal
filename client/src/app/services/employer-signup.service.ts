import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { employer } from '../model/employer.model';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class EmployerSignupService {
  constructor(private httpClient: HttpClient) {}

  signupEmployer(body: employer) {
    return this.registerEmployer(API_URLS.registerEmployer, body);
  }

  private registerEmployer(url: string, body: employer) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(url, body, { headers, withCredentials: true });
  }
}
