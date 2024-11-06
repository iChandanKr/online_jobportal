import { Component, OnInit } from '@angular/core';
import { Applications } from '../../../../model/applications.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UpdateJobseekerService } from '../../../../services/update-jobseeker.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [MatTableModule],
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
    'jobType'
  ];
  datasource = new MatTableDataSource<Applications>([]);

  constructor(private jobseekerService: UpdateJobseekerService) { }

  ngOnInit() {
    this.getAllApplications();
  }

  getAllApplications() {
    this.jobseekerService.getAllApplications().subscribe({
      next: (res) => {

        this.datasource.data = res.data.JobPosts;
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
      }
    });
  }
}
