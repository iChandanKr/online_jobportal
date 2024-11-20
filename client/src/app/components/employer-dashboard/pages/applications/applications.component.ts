import {
  type AllApplicants,
  type SearchApplicant,
} from './../../../../model/jobseeker.model';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { JobsService } from '../../../../services/jobs.service';
import { type Applicant } from '../../../../model/jobseeker.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { debounce, debounceTime, Subject } from 'rxjs';
import { UpdateEmployerService } from '../../../../services/update-employer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit {
  private jobService = inject(JobsService);
  jobId = input.required<string>();
  datasource = new MatTableDataSource<Applicant | AllApplicants>([]);
  allApplicants = signal<boolean>(false);
  private toaster = inject(ToastrService);
  displayedColumns!: string[];
  private searchSubject = new Subject<string>();
  selection = new SelectionModel<Applicant>(true, []);
  dialog = inject(MatDialog);
  searchQuery = '';
  pageSize = 5;
  pageIndex = 0;
  totalRecords = 0;
  sortOrder = '';
  pageSizeOptions = [5, 10, 20, 50];
  constructor(private employerService: UpdateEmployerService) { }
  ngOnInit(): void {
    if (this.jobId()) {
      this.fetchJobApplicants();
    } else {
      // this.getAllApplicants();
      this.getApplicants();
    }
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchQuery = query;
      this.getApplicants();
      // this.getApplicationsBySearch();
    });
  }

  getApplicants() {
    this.employerService.searchApplicant(this.searchQuery, this.sortOrder, this.pageIndex + 1, this.pageSize)
      .subscribe((response: any) => {

        this.totalRecords = response.data.count;
        const applicantWithJobs = response.data.rows.map((applicant: SearchApplicant) => ({
          ...applicant,
          appliedJobs: applicant.JobPosts
            ? applicant.JobPosts.map((post) => post.title).join(', ')
            : '',
        }))

        this.datasource.data = applicantWithJobs
        console.log(this.datasource.data);
        this.allApplicants.set(true)
        this.columnDetails()

      })

  }

  sortData(sort: Sort) {
    this.sortOrder = sort.direction
      ? `${sort.direction === 'desc' ? '-' : ''}${sort.active}`
      : '';
    this.getApplicants();
  }

  getAllApplicants() {
    this.jobService.getAllApplicantsOfEmployer().subscribe({
      next: (res) => {
        console.log(res);

        const applicantWithJobs = res?.map((applicant) => ({
          ...applicant,
          appliedJobs: applicant.JobPosts.map((post) => post.title).join(', '),
        }));

        this.datasource.data = applicantWithJobs || [];
        this.allApplicants.set(true);
        this.columnDetails();
      },
    });
  }

  fetchJobApplicants() {
    this.jobService.getApplicantsOfJob(this.jobId()).subscribe({
      next: (res) => {
        this.datasource.data = res.data
        this.columnDetails();
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
        'profile',
      ])
      : (this.displayedColumns = [
        'firstName',
        'lastName',
        'email',
        'city',
        'appliedJobs',
      ]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected == numRows;
  }
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach((row) =>
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
    this.selection.clear();
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
    this.selection.clear();

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

  onViewProfile(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: string
  ) {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id,
      },
    });
  }

  applySearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    //this.getApplicationsBySearch();
    this.searchSubject.next(searchValue);
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getApplicants();
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalRecords) {
      this.pageIndex++;
      this.getApplicants()
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.value;
    this.pageIndex = 0;
    this.getApplicants();
  }
}
