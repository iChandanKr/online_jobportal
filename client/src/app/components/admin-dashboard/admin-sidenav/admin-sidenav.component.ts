import { Component, computed, inject, input, signal } from '@angular/core';
import { MenuItem } from '../../employer-dashboard/custom-sidenav/custom-sidenav.component';
import { UserDataSharingService } from '../../../services/user-data-sharing.service';
import { CurrentUser } from '../../../model/loginResponse.model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.css',
})
export class AdminSidenavComponent {
  sideNavCollapsed = input<boolean>(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '40' : '100'));
  menuItem = signal<MenuItem[]>([
    {
      icon: 'group',
      label: 'Users',
      route: 'users',
    },
  ]);
  public userDataSharingService = inject(UserDataSharingService);
  user = signal<CurrentUser | undefined>(undefined);
  fullName = signal('');
  ngOnInit(): void {
    this.user.set(this.userDataSharingService.getLoginData());
    const userName = computed(
      () => this.user()?.firstName + ' ' + this.user()?.lastName
    );
    const persistentName = localStorage.getItem('userFullName');

    if (!persistentName) {
      localStorage.setItem('userFullName', userName());
    }
    persistentName
      ? this.fullName.set(persistentName)
      : this.fullName.set(userName());
  }
}
