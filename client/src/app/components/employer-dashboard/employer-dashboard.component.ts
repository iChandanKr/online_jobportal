import { Component, computed, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import {MatTooltipModule} from '@angular/material/tooltip';
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
    MatTooltipModule
  ],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css',
})
export class EmployerDashboardComponent {
  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
