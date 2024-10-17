import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  private readonly updatePasswordURL = API_URLS.updatePassword;
  private httpClient = inject(HttpClient);
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
  updatePassword(body: {
    password: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.httpClient.patch<{ message: string; status: string; data: {} }>(
      this.updatePasswordURL,
      body,
      {
        headers: this.getHeaders(),
        withCredentials: true,
      }
    );
  }
}
