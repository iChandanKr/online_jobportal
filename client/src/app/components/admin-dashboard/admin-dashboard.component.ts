import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from '../employer-dashboard/custom-sidenav/custom-sidenav.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AdminSidenavComponent,
    RouterOutlet,
    MatTooltipModule,
    BreadcrumbComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  private logoutService = inject(LogoutService);
  private router = inject(Router);
  onLogout() {
    this.logoutService.logoutUser().subscribe({
      next: (data) => {
        if (localStorage.getItem('userFullName')) {
          localStorage.removeItem('userFullName');
        }
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
