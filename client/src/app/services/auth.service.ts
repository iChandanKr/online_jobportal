import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { response } from 'express';
import { API_URLS } from '../constants/api-urls';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private authUrl = API_URLS.auth;
  isAuthenticated(): Observable<boolean> {
    return this.httpClient
      .get<{ authenticated: boolean; user: object }>(this.authUrl, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          return response.authenticated;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
}
