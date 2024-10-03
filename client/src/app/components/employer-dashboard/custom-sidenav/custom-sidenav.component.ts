import { Component, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule,MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  menuItem = signal<MenuItem[]>([
    {
      icon: 'add',
      label: 'post jobs',
      route: 'person',
    },
    {
      icon: 'work',
      label: 'jobs',
      route: 'jobs',
    },
    {
      icon: 'person',
      label: 'profile',
      route: 'profile',
    },
    {
      icon: 'check_circle',
      label: 'Applications',
      route: 'applications',
    },
  ]);
}
