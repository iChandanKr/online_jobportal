import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JobsService } from '../../../../services/jobs.service';
import { type Applicant } from '../../../../model/jobseeker.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  private jobService = inject(JobsService);
  jobId = signal('89c97246-5a0a-4050-9098-1a1078b42133');
  applicants = signal<Applicant[] | undefined>(undefined);
  datasource = signal<Applicant[]>([]);

  ngOnInit(): void {
    this.jobService.getApplicantsOfJob(this.jobId()).subscribe({
      next: (res) => {
        this.applicants.set(res.data);
        this.datasource.set(res.data);
        console.log(this.datasource(), this.applicants());
      },
    });
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'appliedOn'];
}
