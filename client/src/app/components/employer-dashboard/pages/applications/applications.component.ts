import { type AllApplicants } from './../../../../model/jobseeker.model';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { JobsService } from '../../../../services/jobs.service';
import { type Applicant } from '../../../../model/jobseeker.model';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatCheckboxModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  private jobService = inject(JobsService);
  jobId = input.required<string>();
  datasource = signal<Applicant[] | AllApplicants[]>([]);
  allApplicants = signal<boolean>(false);
  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'appliedOn',
  ];
  selection = new SelectionModel<Applicant>(true, []);
  ngOnInit(): void {
    if (this.jobId()) {
      this.jobService.getApplicantsOfJob(this.jobId()).subscribe({
        next: (res) => {
          this.datasource.set(res.data);
        },
      });
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

  columnDetails() {
    this.allApplicants() === false
      ? (this.displayedColumns = [
          'select',
          'firstName',
          'lastName',
          'email',
          'appliedOn',
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
}
