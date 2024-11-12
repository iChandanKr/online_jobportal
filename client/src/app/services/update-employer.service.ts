import { Injectable, inject } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { type EmployerResponse } from '../model/employer.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UpdateEmployerService {
  private readonly getEmployerUrl = API_URLS.fetchEmployer;
  private readonly updateEmployerUrl = API_URLS.updateEmployer;
  private readonly searchApplicantUrl = API_URLS.searchApplicant;
  private employerDetailsSubject = new BehaviorSubject<EmployerResponse|null>(null);
  employerDetails$ = this.employerDetailsSubject.asObservable();
  private httpClient = inject(HttpClient);

  // getEmployerDetails() {
  //   return this.httpClient.get<{ data: EmployerResponse }>(
  //     this.getEmployerUrl,
  //     { withCredentials: true }
  //   );
  // }

  getEmployerDetails(): Observable<EmployerResponse|null> {
    // Check if employer details are already fetched
    if (!this.employerDetailsSubject.value) {
      this.httpClient
        .get<{ data: EmployerResponse }>(this.getEmployerUrl, { withCredentials: true })
        .subscribe((response) => {
          // Store the fetched data in the BehaviorSubject
          this.employerDetailsSubject.next(response.data);
        });
    }
    // Return the Observable to subscribers
    return this.employerDetails$;
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

  searchApplicant(search: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('search', search)
    return this.httpClient.get(this.searchApplicantUrl, { params, withCredentials: true });
  }

  constructor() { }
}
