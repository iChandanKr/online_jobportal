import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JobsService } from '../../../../services/jobs.service';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { query, response } from 'express';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'

export interface Job {
  title: string;
  location: string;
  role: string;
  minSalary: number;
  maxSalary: number;
}

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'location', 'role', 'minSalary', 'maxSalary', 'actions'];
  datasource = new MatTableDataSource<Job>([]);
  pageSize = 5;
  pageIndex = 0;
  totalRecords = 0;
  sortOrder = '';
  searchQuery = '';
  private searchSubject: Subject<string> = new Subject<string>()
  constructor(private jobsservice: JobsService, private router: Router,private dialog:MatDialog) { }

  ngOnInit() {
    this.getJobs();
    this.searchSubject.pipe(debounceTime(300)).subscribe(query => {
      this.searchQuery = query;
      this.pageIndex = 0;
      this.getJobs()
    })
  }

  getJobs() {
    this.jobsservice.getJobs(this.searchQuery, this.sortOrder, this.pageIndex + 1, this.pageSize).subscribe((response: any) => {
      this.totalRecords = response.data.count;
      this.datasource.data = response.data.rows;  
    });
  }

  sortData(sort: Sort) {
    this.sortOrder = sort.direction ? `${sort.direction === 'desc' ? '-' : ''}${sort.active}` : '';
    this.getJobs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchSubject.next(filterValue);
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getJobs();
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalRecords) {
      this.pageIndex++;
      this.getJobs();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onEdit(jobId: string) {

  }

  onDelete(jobId: string) {
    // console.log(jobId);
    const dialogRef=this.dialog.open(MatDialogModule,{
      width:'250px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?'
      }
    })
    this.jobsservice.deleteJob(jobId).subscribe(
      response=>{
        this.getJobs()
      },
      error => {
        
        console.error('Error deleting job:', error);
      }
    )
    
  }
}
