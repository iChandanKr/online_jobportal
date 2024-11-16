import { Component, inject, OnInit, signal } from '@angular/core';
import { JobsService } from '../../../../services/jobs.service';

@Component({
  selector: 'app-open-jobs',
  standalone: true,
  imports: [],
  templateUrl: './open-jobs.component.html',
  styleUrl: './open-jobs.component.css'
})
export class OpenJobsComponent implements OnInit {
 private jobService = inject(JobsService);
 openJobs = signal<number>(0);
ngOnInit(): void {
this.jobService.openJobsOfEmployer().subscribe({
  next:(res)=>{
    this.openJobs.set(res.data);
    this.jobService.openJobs.set(res.data);


  }
})
}
}
