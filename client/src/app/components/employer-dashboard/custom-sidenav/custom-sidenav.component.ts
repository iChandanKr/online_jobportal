import { Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { type CurrentUser } from '../../../model/loginResponse.model';
import { UserDataSharingService } from '../../../services/user-data-sharing.service';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  sideNavCollapsed = input<boolean>(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '40' : '100'));

  employerMenuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'add',
      label: 'Post Jobs',
      route: 'post-job',
    },
    {
      icon: 'work',
      label: 'Jobs',
      route: 'jobs',
    },
    {
      icon: 'person',
      label: 'Profile',
      route: 'profile',
    },
    {
      icon: 'check_circle',
      label: 'Applications',
      route: 'applications',
    },
  ]);

  jobseekerMenuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'search',
      label: 'Search Jobs',
      route: 'post-job',
    },
    {
      icon: 'check_circle',
      label: 'My Applications',
      route: 'my-applications',
    },
    {
      icon: 'person',
      label: 'Profile',
      route: 'profile',
    },
  ]);
  menuItem = signal<MenuItem[]>([]);
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

    if (this.user()?.role === 'employer') {

      this.menuItem.set(this.employerMenuItems());
    } else if (this.user()?.role === 'jobseeker') {
      this.menuItem.set(this.jobseekerMenuItems());
    }
  }
}
