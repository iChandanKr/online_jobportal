import { Component, inject, OnInit, signal, computed } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostJobService } from '../../../../services/post-job.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    skillId: new FormControl<string[]>([], [Validators.required]),
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
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  dropDownOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.jobId = params.get('id');
    });

    if (this.jobId) {
      this.postJobService.getJob(this.jobId).subscribe(
        (response) => {
          response.data.applicationDeadline = this.formatDateForInput(
            response.data.applicationDeadline
          );
          this.populateForm(response?.data);
        },
        (error) => {
          this.toaster.error('Failed to load the job details!', 'Error');
        }
      );
    }
  }
  toggleDropdown() {
    this.dropDownOpen.set(!this.dropDownOpen());
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
      companyName: job.companyName,
    });
  }
  skills = computed(() => this.postJobService.skills());
  selectedSkillIds = signal<any>([]);
  selectedSkillsName = signal<string[]>([]);

  private subscription = this.jobForm.get('skillId')?.valueChanges.subscribe({
    next: (skills) => {
      this.selectedSkillIds.set(skills);
      this.selectedSkillsName.set(
        this.skills()
          .filter((skill) => this.selectedSkillIds()?.includes(skill.id))
          .map((skill) => skill.skillName)
      );
    },
  });

  isSelected(skillId: string): boolean {
    const selectedSkills = this.jobForm.get('skillId')?.value || [];
    return selectedSkills.includes(skillId);
  }

  toggleSelection(skillId: string) {
    const selectedSkills = this.jobForm.get('skillId')?.value || [];
    const index = selectedSkills.indexOf(skillId);

    if (index === -1) {
      selectedSkills.push(skillId);
    } else {
      selectedSkills.splice(index, 1);
    }
    this.jobForm.get('skillId')?.setValue(selectedSkills);
  }

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
          this.router.navigate(['/employer/jobs']);
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
          this.router.navigate(['/employer/jobs']);

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
    this.router.navigate(['/employer/dashboard']);
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Convert to 'YYYY-MM-DDTHH:MM'
  }
}
