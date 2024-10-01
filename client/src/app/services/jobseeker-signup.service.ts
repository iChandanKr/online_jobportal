import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import type { JobSeeker } from "../../app/model/jobseeker.model";
@Injectable({
  providedIn: "root",
})
export class JobseekerSignupService {
  constructor(private httpClient: HttpClient) {}

  signupJobseeker(body: JobSeeker) {
    return this.registerJobseeker(
      "http://localhost:3000/api/v1/users/register-jobseeker",
      body
    );
  }

  private registerJobseeker(url: string, body: JobSeeker) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      // Authorization: "Bearer your-token-here",
    });
    return this.httpClient.post(url, body, { headers });
  }
}
