import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsDialogComponent } from '../job-details-dialog/job-details-dialog.component';
import { JobsService } from '../../../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-open-jobcard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, MatButtonModule],
  templateUrl: './open-jobcard.component.html',
  styleUrl: './open-jobcard.component.css',
})
export class OpenJobcardComponent {
  private jobService = inject(JobsService);
  private toaster = inject(ToastrService);
  dialog = inject(MatDialog);
  job = input.required<{
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
  }>();

  private router = inject(Router);
  onApply(id: string) {
    this.jobService.applyJob(id).subscribe({
      next: (res) => {
        this.toaster.success(res.message, 'Success');
      },
      error: (err) => {
        console.log(err.error.message);
        this.toaster.error(err.error.message, 'Error');
      },
    });
  }

  onViewDetails(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(JobDetailsDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        jobDetails: this.job,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
