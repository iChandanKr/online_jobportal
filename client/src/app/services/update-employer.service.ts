import { Injectable, inject } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { type EmployerResponse } from '../model/employer.model';
@Injectable({
  providedIn: 'root',
})
export class UpdateEmployerService {
  private readonly getEmployerUrl = API_URLS.fetchEmployer;
  private httpClient = inject(HttpClient);
  getEmployerDetails() {
    return this.httpClient.get<{ data: EmployerResponse }>(
      this.getEmployerUrl,
      { withCredentials: true }
    );
  }
  constructor() {}
}
