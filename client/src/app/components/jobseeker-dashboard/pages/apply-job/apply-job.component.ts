import { Component, inject, OnInit, signal } from '@angular/core';
import { OpenJobcardComponent } from './open-jobcard/open-jobcard.component';
import { JobsService } from '../../../../services/jobs.service';
import { type OpenJob } from '../../../../model/job.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    OpenJobcardComponent,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css',
})
export class ApplyJobComponent implements OnInit {
  openJobs = signal<OpenJob[]>([]);

  private jobService = inject(JobsService);
  searchString = new FormControl('');

  ngOnInit(): void {
    this.jobService.getAllJobsUserCanApply().subscribe({
      next: (res) => {
        this.openJobs.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.searchString.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (res) => {
          this.onSearch(res as string);
        },
      });
  }

  onSearch(input: string) {
    this.jobService.getAllJobsUserCanApply(input).subscribe({
      next: (res) => {
        this.openJobs.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
