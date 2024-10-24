import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { type JobDetailsRes } from '../../../../../model/job.model';
import { DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobsService } from '../../../../../services/jobs.service';
@Component({
  selector: 'app-job-details-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
  ],
  templateUrl: './job-details-dialog.component.html',
  styleUrl: './job-details-dialog.component.css',
})
export class JobDetailsDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  jobDetails = signal<JobDetailsRes | undefined>(undefined);
  public dialogRef = inject(MatDialogRef<JobDetailsDialogComponent>);
  private jobService = inject(JobsService);
  ngOnInit(): void {
    this.jobService.getJobWithSkills(this.data.jobDetails().id).subscribe({
      next: (res) => {
        this.jobDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
}
