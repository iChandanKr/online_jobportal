import { Component, inject, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsDialogComponent } from '../job-details-dialog/job-details-dialog.component';

@Component({
  selector: 'app-open-jobcard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, MatButtonModule],
  templateUrl: './open-jobcard.component.html',
  styleUrl: './open-jobcard.component.css',
})
export class OpenJobcardComponent {
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
  onApply() {}

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
