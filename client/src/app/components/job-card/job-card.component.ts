import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatButtonModule, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job!: {
    id: string;
    title: string;
    companyName: string;
    type: string;
    role: string;
    minSalary: number;
    maxSalary: number;
    location: string;
    category: string;
    applyTill: string;
    city: string;
  };
  private router = inject(Router);
  onLogin() {
    this.router.navigate(['login']);
  }

  onRegister() {
    this.router.navigate(['signup']);
  }
}
