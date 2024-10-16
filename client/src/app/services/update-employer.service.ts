import { Injectable, inject } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { type EmployerResponse } from '../model/employer.model';
@Injectable({
  providedIn: 'root',
})
export class UpdateEmployerService {
  private readonly getEmployerUrl = API_URLS.fetchEmployer;
  private readonly updateEmployerUrl = API_URLS.updateEmployer;
  private httpClient = inject(HttpClient);
  getEmployerDetails() {
    return this.httpClient.get<{ data: EmployerResponse }>(
      this.getEmployerUrl,
      { withCredentials: true }
    );
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
  updateEmployerDetails(employerData: any) {
    return this.httpClient.put<{
      status: string;
      message: string;
      data: object;
    }>(this.updateEmployerUrl, employerData, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  constructor() {}
}
