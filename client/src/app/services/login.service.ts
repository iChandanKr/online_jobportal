import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { type LoginResponse } from '../model/loginResponse.model';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = API_URLS.login;
  constructor(private httpClient: HttpClient) {}

  loginByRole(body: Login): Observable<HttpResponse<LoginResponse>> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, body, {
      headers: this.getHeaders(),
      withCredentials: true,
      observe: 'response',
    });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
}
