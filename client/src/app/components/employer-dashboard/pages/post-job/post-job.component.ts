import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  jobForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    industryName: new FormControl('', [Validators.required]),
    jobLocation: new FormControl<'onsite' | 'remote'>('onsite', [
      Validators.required,
    ]),
    city: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
    applicationDeadline: new FormControl('', [Validators.required]),
    maxSalary: new FormControl('', [Validators.required]),
    minSalary: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    shift: new FormControl<'morning' | 'evening'>('morning', [
      Validators.required,
    ]),
  });

  onSubmit() {
    if (this.jobForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
    console.log(this.jobForm);
  }

  onReset() {
    this.jobForm.reset();
  }
}
