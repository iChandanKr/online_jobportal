import { Component, OnInit } from '@angular/core';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

export interface Job {
  title: string;
  location: string;
  role: string;
  minSalary: number;
  maxSalary: number;
}

const JOB_DATA: Job[] = [
  { title: 'Software Engineer', location: 'Remote', role: 'Developer', minSalary: 80000, maxSalary: 120000 },
  { title: 'UI Designer', location: 'San Francisco', role: 'Designer', minSalary: 60000, maxSalary: 90000 },
  { title: 'Data Scientist', location: 'New York', role: 'Analyst', minSalary: 95000, maxSalary: 130000 },
];

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    MatPaginator,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  displayedColumns:string[]=['title','location','role','minSalary','maxSalary','actions']
  datasource=new MatTableDataSource<Job>(JOB_DATA)
  ngOnInit() {
    
  }

  onEdit(job: Job) {
    console.log('Edit job', job);
  }

  onDelete(job: Job) {
    console.log('Delete job', job);
  }

}
