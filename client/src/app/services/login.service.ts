import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/users/login';
  constructor(private httpClient: HttpClient) {}

  loginByRole(body: Login): Observable<any> {
    return this.httpClient.post(this.apiUrl, body, {
      headers: this.getHeaders(),
    });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json',
    });
  }
}
