import { Component, inject, OnInit, signal } from '@angular/core';
import { JobsService } from '../../../../services/jobs.service';
import { log } from 'console';

@Component({
  selector: 'app-closed-jobs',
  standalone: true,
  imports: [],
  templateUrl: './closed-jobs.component.html',
  styleUrl: './closed-jobs.component.css',
})
export class ClosedJobsComponent implements OnInit {
  closedJobs = signal<number>(0);
  private jobService = inject(JobsService);
  ngOnInit(): void {
    this.jobService.closedJobsOfEmployer().subscribe({
      next: (res) => {
        this.closedJobs.set(res.data);
        this.jobService.closedJobs.set(res.data);
      },
    });

  }
}
