import { Injectable, inject } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmployerService {
  private readonly getEmployerUrl = API_URLS.fetchEmployer;
  private httpClient = inject(HttpClient);
  getEmployerDetails() {
    return this.httpClient.get<{data:any}>(this.getEmployerUrl, { withCredentials: true })
    .pipe(map((response) => {
      
    }));
  }
  constructor() {}
}
