import { Injectable, signal } from '@angular/core';
import { CurrentUser } from '../model/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataSharingService {
  private userInfo = signal<CurrentUser | undefined>(undefined);

  setLoginUserData(info: CurrentUser) {
    this.userInfo.set(info);
  }

  getLoginData() {
    return this.userInfo();
  }
}
