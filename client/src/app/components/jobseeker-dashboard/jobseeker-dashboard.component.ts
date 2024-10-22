import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from '../employer-dashboard/custom-sidenav/custom-sidenav.component';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterOutlet
  ],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrl: './jobseeker-dashboard.component.css'
})
export class JobseekerDashboardComponent {
  constructor(private router:Router,private logoutService:LogoutService){}
  collapsed=new BehaviorSubject<boolean>(true)

  get sideNavWidth(){
    return this.collapsed.getValue()?'65px':'250px'
  }

  toggleCollapse() {
    this.collapsed.next(!this.collapsed.getValue());
  }

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
      }
    });
  }
}
