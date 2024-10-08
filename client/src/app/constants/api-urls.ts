import { environment } from '../../environments/environment.development';

export const API_URLS = {
  login: `${environment.apiUrl}/users/login`,
  logout: `${environment.apiUrl}/users/logout`,
  registerEmployer: `${environment.apiUrl}/users/register-employer`,
  registerJobseeker: `${environment.apiUrl}/users/register-jobseeker`,
  auth: `${environment.apiUrl}/users/auth/check`,
};
