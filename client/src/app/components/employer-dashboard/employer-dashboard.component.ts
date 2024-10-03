import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from "./custom-sidenav/custom-sidenav.component";
@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, RouterOutlet, CustomSidenavComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css',
})
export class EmployerDashboardComponent {}
