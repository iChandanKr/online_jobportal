import { Component, OnInit } from '@angular/core';
import { Applications } from '../../../../model/applications.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UpdateJobseekerService } from '../../../../services/update-jobseeker.service';
import { MatCardModule } from '@angular/material/card';
import { debounce, debounceTime, Subject } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatSortModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatIconModule],
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'location',
    'role',
    'companyName',
    'city',
    'minSalary',
    'maxSalary',
    'jobType',
    'status'
  ];

  pageSize = 5;
  pageIndex = 0;
  totalRecords = 0;
  sortOrder = '';
  searchQuery = '';
  pageSizeOptions = [5, 10, 20, 50];
  datasource = new MatTableDataSource<Applications>([]);
  private searchSubject = new Subject<string>();


  constructor(private jobseekerService: UpdateJobseekerService) { }

  ngOnInit() {
    this.getAllApplications();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchQuery = query;
      this.pageIndex = 0
      this.getAllApplications();

    })
  }

  getAllApplications() {
    this.jobseekerService.getAllApplications(this.searchQuery,
      this.sortOrder,
      this.pageIndex + 1,
      this.pageSize).subscribe({
        next: (res) => {
          //  console.log(res?.JobPosts);

          console.log(res);
          this.totalRecords = res.data.count;
          console.log("totalrecords", this.totalRecords);

          const applications = res.data.rows.map((applicant: any) => {
            return {
              title: applicant.title,
              location: applicant.location,
              role: applicant.role,
              companyName: applicant.companyName,
              city: applicant.city,
              minSalary: applicant.minSalary,
              maxSalary: applicant.maxSalary,
              jobType: applicant.jobType,
              status: applicant.Applications[0].status

            }


          })
          this.datasource.data = applications
        },
        error: (err) => {
          console.error('Error fetching applications:', err);
        }
      });
  }
  applySearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase()
    this.searchSubject.next(searchValue)
  }

  sortData(sort: Sort) {
    this.sortOrder = sort.direction
      ? `${sort.direction === 'desc' ? '-' : ''}${sort.active}`
      : '';
    this.getAllApplications();
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalRecords) {
      this.pageIndex++;
      this.getAllApplications();
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getAllApplications();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.value;
    this.pageIndex = 0;
    this.getAllApplications();
  }
}

