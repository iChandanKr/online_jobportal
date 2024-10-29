import { type AllApplicants } from './../../../../model/jobseeker.model';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { JobsService } from '../../../../services/jobs.service';
import { type Applicant } from '../../../../model/jobseeker.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatCheckboxModule,
    TitleCasePipe,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  private jobService = inject(JobsService);
  jobId = input.required<string>();
  datasource = signal<Applicant[] | AllApplicants[]>([]);
  allApplicants = signal<boolean>(false);
  private toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'appliedOn',
    'status',
  ];
  selection = new SelectionModel<Applicant>(true, []);
  ngOnInit(): void {
    if (this.jobId()) {
      this.fetchJobApplicants();
    } else {
      this.jobService.getAllApplicantsOfEmployer().subscribe({
        next: (res) => {
          this.datasource.set(res.data);
          this.allApplicants.set(true);
          this.columnDetails();
        },
      });
    }
  }
  fetchJobApplicants() {
    this.jobService.getApplicantsOfJob(this.jobId()).subscribe({
      next: (res) => {
        this.datasource.set(res.data);
      },
    });
  }
  columnDetails() {
    this.allApplicants() === false
      ? (this.displayedColumns = [
          'select',
          'firstName',
          'lastName',
          'email',
          'appliedOn',
          'status',
        ])
      : (this.displayedColumns = ['firstName', 'lastName', 'email', 'city']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource().length;
    return numSelected == numRows;
  }
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource().forEach((row) =>
          this.selection.select(row as Applicant)
        );
  }

  getSelectedApplicants(): Applicant[] {
    return this.selection.selected;
  }

  handleSelectedApplicants() {
    const selectedApplicants = this.getSelectedApplicants();
    console.log('[selected applicants]', selectedApplicants);
  }

  isAnyItemSelected(): boolean {
    return this.selection.selected.length > 0;
  }

  onAccept() {
    const selectedApplicants = this.getSelectedApplicants();
    const selectedApplications = selectedApplicants.map(
      (applicant: Applicant) => {
        return {
          userId: applicant.id,
          status: 'accepted',
          jobId: this.jobId(),
        };
      }
    );
    this.jobService.updateApplicationStatus(selectedApplications).subscribe({
      next: (res) => {
        this.fetchJobApplicants();
        this.toaster.success(res.message, 'Success');
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'Error');
      },
    });
  }
  onReject() {
    const selectedApplicants = this.getSelectedApplicants();
    const selectedApplications = selectedApplicants.map(
      (applicant: Applicant) => {
        return {
          userId: applicant.id,
          status: 'rejected',
          jobId: this.jobId(),
        };
      }
    );
    console.log(selectedApplications);
    this.jobService.updateApplicationStatus(selectedApplications).subscribe({
      next: (res) => {
        this.fetchJobApplicants();
        this.toaster.success(res.message, 'Success');
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'Error');
      },
    });
  }
}
