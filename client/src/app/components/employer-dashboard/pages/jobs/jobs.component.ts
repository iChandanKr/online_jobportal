import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatIconModule,
    MatSortModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'location', 'role', 'minSalary', 'maxSalary', 'actions']
  datasource = new MatTableDataSource<Job>(JOB_DATA)
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event:Event){
    
  }

  onEdit(job: Job) {
    console.log('Edit job', job);
  }

  onDelete(job: Job) {
    console.log('Delete job', job);
  }

}
