import { UserDataSharingService } from './../../services/user-data-sharing.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { type CurrentUser } from '../../model/loginResponse.model';
import { PostJobService } from '../../services/post-job.service';
import { log } from 'console';
@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    CustomSidenavComponent,
    MatTooltipModule,
  ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css',
})
export class EmployerDashboardComponent implements OnInit {
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  private logoutService = inject(LogoutService);
  private router = inject(Router);
  private postJobService = inject(PostJobService);

  ngOnInit(): void {
    this.postJobService.fetchExistingSkills().subscribe({
      next:res=>{
        // this.postJobService.skills.next(res.data);
        console.log("dashboard")
        this.postJobService.skills.set(res.data);
        console.log(this.postJobService.skills())
      },
      error: (err) => {
        console.log(err);
      },
    });

    // console.log('[Inside dashboard]',this.postJobService.existingSkills);
  }

  onLogout() {
    this.logoutService.logoutUser().subscribe({
      next: (data) => {
        console.log(data);
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
