import { response } from 'express';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PostJobService } from '../../../../services/post-job.service';
import { Skill } from '../../../../model/skill.model';
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
    applicationDeadline: new FormControl('', [Validators.required]),
    maxSalary: new FormControl('', [Validators.required]),
    minSalary: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
  });
  skills = signal<Skill[]>([]);
  private postJobService = inject(PostJobService);
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
  }

  onReset() {
    this.jobForm.reset();
  }
}
