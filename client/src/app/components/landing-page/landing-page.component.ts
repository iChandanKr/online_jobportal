import { type OpenJob } from './../../model/job.model';
import { Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobsService } from '../../services/jobs.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    JobCardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  openJobs = signal<OpenJob[]>([]);
  private router = inject(Router);
  private jobService = inject(JobsService);
  searchString = new FormControl('');

  ngOnInit(): void {
    this.jobService.getJobOpenings().subscribe({
      next: (res) => {
        this.openJobs.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.searchString.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (res) => {
          this.onSearch(res as string);
        },
      });
  }
  onLogin() {
    this.router.navigate(['login']);
  }
  onSearch(input: string) {

    this.jobService.getJobOpenings(input).subscribe({
      next: (res) => {
        this.openJobs.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // onInput()
  onJobseekerRegister() {
    this.router.navigate(['signup']);
  }
  onEmployerRegister() {
    this.router.navigate(['employersignup']);
  }
}
