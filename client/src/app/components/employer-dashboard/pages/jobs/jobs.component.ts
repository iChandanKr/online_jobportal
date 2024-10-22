import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JobsService } from '../../../../services/jobs.service';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  @ViewChild('confirmDialog')confirmDialog!:TemplateRef<any>
  dialogData = {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this item?'
  };
  private dialogRef: MatDialogRef<any> | null = null;
  displayedColumns: string[] = ['title', 'location', 'role', 'minSalary', 'maxSalary', 'actions'];
  datasource = new MatTableDataSource<Job>([]);
  pageSize = 5;
  pageIndex = 0;
  totalRecords = 0;
  sortOrder = '';
  searchQuery = '';
  private searchSubject: Subject<string> = new Subject<string>();
  private jobIdToDelete!: string;
  private currentDialog: MatDialogRef<any> | null = null;
  constructor(private jobsservice: JobsService, private router: Router,private dialog:MatDialog,private snackbar:MatSnackBar) { }

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
    this.router.navigate(['/employer/post-job',jobId])
    
  }

  onDelete(jobId: string) {
    this.jobIdToDelete = jobId;
    this.currentDialog = this.dialog.open(this.confirmDialog, {
      width: '300px',
      disableClose: false
    });

    this.currentDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteJob();
      }
    });
  }

  private deleteJob() {
    this.jobsservice.deleteJob(this.jobIdToDelete).subscribe({
      next: () => {
        this.getJobs();
        this.snackbar.open('Job Deleted Successfully!','Close',{
          duration:3000,
        })
      },
      error: (error) => {
        console.error('Error deleting job:', error);
        this.snackbar.open('Error Deleting the job!','Close',{
          duration:3000,
        })
      }
    });
  }

  onYesClick() {
    this.currentDialog?.close(true);
  }

  onNoClick() {
    this.currentDialog?.close(false);
  }

 


}
