import { response } from 'express';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostJobService } from '../../../../services/post-job.service';
import { Skill } from '../../../../model/skill.model';
import { timeout } from 'rxjs';

const currentTime = new Date().toISOString();
console.log(currentTime);
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
  });
  skills = signal<Skill[]>([]);
  currentTime = signal(new Date().toISOString);
  private postJobService = inject(PostJobService);
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    this.postJobService.fetchExistingSkills().subscribe({
      next: (response) => {
        this.skills.set(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmit() {
    if (this.jobForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
    console.log(this.jobForm);
    this.postJobService.postJob(this.jobForm.value).subscribe({
      next: (response) => {
        this.jobForm.reset();

        this.toaster.success(response.message, 'success', {
          timeOut: 1500,
        });
      },
      error: (err) => {
        this.toaster.error(err.message, 'error', {
          timeOut: 1500,
        });
      },
    });
  }

  onReset() {
    this.jobForm.reset();
  }
}
