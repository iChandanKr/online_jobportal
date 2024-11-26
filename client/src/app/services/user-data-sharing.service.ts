import { inject, Injectable, signal } from '@angular/core';
import { CurrentUser } from '../model/loginResponse.model';
import { API_URLS } from '../constants/api-urls';
import { HttpClient } from '@angular/common/http';
import { type User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataSharingService {
  private readonly getAllUsersUrl = API_URLS.getAllUsers;
  private readonly deleteUsersUrl = API_URLS.deleteUser;
  private userInfo = signal<CurrentUser | undefined>(undefined);
  private httpClient = inject(HttpClient);

  setLoginUserData(info: CurrentUser) {
    this.userInfo.set(info);
  }

  getLoginData() {
    return this.userInfo();
  }

  getAllUsrs(
    search?: string,
    sort?: string,
    role?: string,
    status?: string,
    page?: number,
    limit?: number
  ) {
    let queryStr = '';
    if (search) {
      queryStr += `search=${search}&`;
    }
    if (sort) {
      queryStr += `sort=${sort}&`;
    }
    if (role) {
      queryStr += `role=${role}&`;
    }
    if (status) {
      queryStr += `status=${status}&`;
    }
    if (page) {
      queryStr += `page=${page}&`;
    }
    if (limit) {
      queryStr += `limit=${limit}&`;
    }
    // Remove the trailing '&' if queryStr is not empty
    if (queryStr) {
      queryStr = queryStr.slice(0, -1);
    }
    const finalApiUrl = `${this.getAllUsersUrl}?${queryStr}`;
    return this.httpClient.get<{
      status: string;
      msg: string;
      data: { count: number; rows: User[] };
    }>(finalApiUrl, { withCredentials: true });
  }

  deleteUsers(userIds: string[]) {
    return this.httpClient.request<{ status: string; message: string }>(
      'DELETE',
      this.deleteUsersUrl,
      {
        body: { userIds },
        withCredentials: true,
      }
    );
  }
}
