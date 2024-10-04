import { Component, computed, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule,RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  sideNavCollapsed = input<boolean>(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '40' : '100'));
  menuItem = signal<MenuItem[]>([
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
}
