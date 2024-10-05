import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { employer } from '../model/employer.model';
@Injectable({
  providedIn: 'root',
})
export class EmployerSignupService {
  constructor(private httpClient: HttpClient) {}

  signupEmployer(body: employer) {
    return this.registerEmployer(
      'http://localhost:3000/api/v1/users/register-employer',
      body
    );
  }

  registerEmployer(url: string, body: employer) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(url, body, { headers, withCredentials: true });
  }
}
