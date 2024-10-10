import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly apiUrl = API_URLS.logout;
  private httpClient = inject(HttpClient);
  logoutUser() {
    return this.httpClient.post(
      this.apiUrl,
      {},
      {
        headers: this.getHeaders(),
        withCredentials: true,
      }
    );
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
}
