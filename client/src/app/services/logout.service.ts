import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/users/logout';
  private httpClient = inject(HttpClient);
  logoutUser() {
    return this.httpClient.post(this.apiUrl, {}, {
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
