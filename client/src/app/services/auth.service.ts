import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  private isTokenExpired(refreshToken: string): boolean {
    const decodedToken = jwtDecode(refreshToken);
    // decodedToken.exp return seconds to convert it into milliseconds
    const expirationDate = decodedToken.exp! * 1000;
    return Date.now() >= expirationDate;
  }

  isAuthenticated(): boolean {
    const refreshToken = this.cookieService.get('refreshToken');
    if (!refreshToken) {
      return false;
    }
    return !this.isTokenExpired(refreshToken);
  }
}
