import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostJobService } from '../../../../services/post-job.service';
import { Skill } from '../../../../model/skill.model';
import { error, log } from 'console';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

const currentTime = new Date().toISOString();
@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent implements OnInit {
  jobForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    industryName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    skillId: new FormControl([], [Validators.required]),
    applicationDeadline: new FormControl(currentTime, [Validators.required]),
    maxSalary: new FormControl(0, [Validators.required]),
    minSalary: new FormControl(0, [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
  });
  jobId: string | null = null;
  currentTime = signal(new Date().toISOString);
  private postJobService = inject(PostJobService);
  private toaster = inject(ToastrService);
  private activeRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    // console.log('[Inside On Init post job component]');
    this.activeRoute.paramMap.subscribe(params => {
      this.jobId = params.get('id')

    })

    if (this.jobId) {
      this.postJobService.getJob(this.jobId).subscribe(
        response => {
          response.data.applicationDeadline = this.formatDateForInput(response.data.applicationDeadline);
          this.populateForm(response?.data)
        },
        error => {
          this.toaster.error('Failed to load the job details!', 'Error')
        }
      )
    }
  }
  populateForm(job: any) {
    this.jobForm.patchValue({
      title: job.title,
      description: job.description,
      role: job.role,
      industryName: job.industryName,
      location: job.location,
      city: job.city,
      skillId: job.skillId,
      applicationDeadline: job.applicationDeadline,
      maxSalary: job.maxSalary,
      minSalary: job.minSalary,
      jobType: job.jobType,
      shift: job.shift,
      companyName:job.companyName
    });
  }
  skills = computed(() => this.postJobService.skills());
  onSubmit() {
    if (this.jobForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
  
    const jobData = this.jobForm.value;
  
    if (this.jobId) {
      this.postJobService.updateJob(this.jobId, jobData).subscribe({
        next: (response) => {
          this.toaster.success('Job updated successfully', 'Success', {
            timeOut: 1500,
          });
          this.jobForm.reset(); 
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'Error', {
            timeOut: 1500,
          });
        },
      });
    } else {
      this.postJobService.postJob(jobData).subscribe({
        next: (response) => {
          this.toaster.success('Job created successfully', 'Success', {
            timeOut: 1500,
          });
          this.jobForm.reset(); 
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'Error', {
            timeOut: 1500,
          });
        },
      });
    }
  }
  

  onReset() {
    this.jobForm.reset();
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Convert to 'YYYY-MM-DDTHH:MM'
  }
}
