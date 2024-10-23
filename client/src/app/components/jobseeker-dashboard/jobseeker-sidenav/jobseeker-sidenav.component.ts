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
  selector: 'app-jobseeker-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './jobseeker-sidenav.component.html',
  styleUrl: './jobseeker-sidenav.component.css'
})
export class JobseekerSidenavComponent {
  sideNavCollapsed = input<boolean>(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '40' : '100'));
  menuItem = signal<MenuItem[]>([

    {
      icon: 'add',
      label: 'Apply Jobs',
      route: 'apply-job',
    },
    {
      icon: 'person',
      label: 'Profile',
      route: 'profile',
    },
    {
      icon: 'check_circle',
      label: 'Job Applications',
      route: 'job-applications',
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

