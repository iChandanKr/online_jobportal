import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  // @Input() jobTitle: string = '';
  // @Input() companyName: string = '';
  // @Input() jobRole: string = '';
  // @Input() minSalary: number = 0;
  // @Input() maxSalary: number = 0;
  // @Input() jobLocation: string = '';
  // @Input() jobCategory: string = '';

  @Input() job!: {
    title: string;
    companyName: string;
    role: string;
    minSalary: number;
    maxSalary: number;
    location: string;
    category: string;
  };
}
