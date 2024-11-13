import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe, NgFor } from '@angular/common';
import { PostJobService } from '../../../../services/post-job.service';
import { Skill } from '../../../../model/skill.model';
import { log } from 'console';
import { UpdateJobseekerService } from '../../../../services/update-jobseeker.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobseeker-profile',
  standalone: true,
  imports: [
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  jobSeekerProfileForm!: FormGroup;
  educationDetailsForm!: FormGroup;
  skillsForm!: FormGroup;
  allSkills!: Skill[];
  currentSelectedSkill: string = ''
  filteredSkills!: Observable<Skill[]>;
  selectedSkills: Skill[] = [];
  skillAutocomplete = new FormControl('');
  isEducationDataAvailable: boolean = false;
  hasExistingSkills: boolean = false;
  constructor(private fb: FormBuilder, private postJobService: PostJobService,
    private updateJobseekerService: UpdateJobseekerService, private toaster: ToastrService) { }

  ngOnInit() {
    this.jobSeekerProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      dob: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),
      country: new FormControl('', [Validators.required]),
    });

    this.educationDetailsForm = this.fb.group({
      tenthMarksPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      tenthPassingYear: ['', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
      twelfthMarksPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      twelfthPassingYear: ['', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
      ugStream: ['', [Validators.required, Validators.maxLength(200)]],
      ugBranch: ['', [Validators.required, Validators.maxLength(200)]],
      ugCGPA: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      ugPassingYear: ['', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
      pgStream: ['', [Validators.maxLength(200)]],
      pgPassingYear: ['', [Validators.min(1990), Validators.max(new Date().getFullYear())]],
    });
    this.skillsForm = this.fb.group({
      selectedSkill: [''],
      skillAutocomplete: this.skillAutocomplete
    });
    this.filteredSkills = this.skillsForm.get('skillAutocomplete')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.skillName;
        return name ? this._filter(name) : this.allSkills?.slice();
      })
    );


   
    this.populateJobSeekerProfile();

  }

  onTabChange(event:MatTabChangeEvent){
    if(event.index===0){
      this.populateJobSeekerProfile();
    }
    else if(event.index===1){
      this.populateEducationDetails();
    }
    else if(event.index===2){
      this.populateSkills();
      this.postJobService.fetchExistingSkills().subscribe({
        next: data => {
          this.allSkills = data
          this.setupFilteredSkills();
        },
        error: err => {
          console.log(err);
  
        }
      })
    }
  }

  private populateJobSeekerProfile() {
    this.updateJobseekerService.getJobseeker().subscribe({
      next: data => {
        const jobseekerFetchedData = data
        this.jobSeekerProfileForm.patchValue({
          firstName: jobseekerFetchedData.firstName,
          lastName: jobseekerFetchedData.lastName,
          email: jobseekerFetchedData.email,
          contact: jobseekerFetchedData.contact,
          dob: new Date(jobseekerFetchedData.dob),
          city: jobseekerFetchedData.city,
          state: jobseekerFetchedData.state,
          pinCode: jobseekerFetchedData.pinCode,
          country: jobseekerFetchedData.country
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private populateEducationDetails() {
    this.updateJobseekerService.getEducationDetails().subscribe({
      next: data => {
        const educationFetchData = data;

        if (educationFetchData) {
          this.isEducationDataAvailable = true;
          this.educationDetailsForm.patchValue({
            tenthMarksPercent: educationFetchData.tenthMarksPercent,
            tenthPassingYear: educationFetchData.tenthPassingYear,
            twelfthMarksPercent: educationFetchData.twelfthMarksPercent,
            twelfthPassingYear: educationFetchData.twelfthPassingYear,
            ugStream: educationFetchData.ugStream,
            ugBranch: educationFetchData.ugBranch,
            ugCGPA: educationFetchData.ugCGPA,
            ugPassingYear: educationFetchData.ugPassingYear,
            pgStream: educationFetchData.pgStream,
            pgPassingYear: educationFetchData.pgPassingYear
          });
        } else {
          // If no data, set the flag to false
          this.isEducationDataAvailable = false;
        }

      },
      error: err => {
        console.log(err);
        this.isEducationDataAvailable = false;
      }
    });
  }

  private populateSkills() {
    this.updateJobseekerService.getSkillsJobseeker().subscribe({
      next: (data) => {
        const skillsFetchedData = data;
        this.selectedSkills = skillsFetchedData;
        this.hasExistingSkills = skillsFetchedData && skillsFetchedData.length > 0

        const skillNames = skillsFetchedData.map((skill: any) => skill.skillName);
        this.skillsForm.patchValue({
          selectedSkill: skillNames
        });
      },
      error: (err) => {
        console.log('Error fetching skills', err);
        this.hasExistingSkills = false;
      }
    });
  }

  private setupFilteredSkills() {
    this.filteredSkills = this.skillAutocomplete.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSkills(value))
    );
  }

  private filterSkills(value: string | Skill | null): Skill[] {
    if (!value) return this.allSkills;

    const searchValue = typeof value === 'string' ? value : value.skillName;
    const filterValue = searchValue.toLowerCase();


    return this.allSkills.filter(skill =>
      skill.skillName.toLowerCase().includes(filterValue) &&
      !this.selectedSkills.some(selected => selected.id === skill.id)
    );
  }

  private _filter(value: string): Skill[] {
    const filterValue = value.toLowerCase();
    // Filter available skills that aren't already selected
    return this.allSkills
      .filter(skill =>
        skill.skillName.toLowerCase().includes(filterValue) &&
        !this.selectedSkills.some(selected => selected.id === skill.id)
      );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      // Find the skill object from allSkills
      const skillToAdd = this.allSkills.find(skill =>
        skill.skillName.toLowerCase() === value.toLowerCase() &&
        !this.selectedSkills.some(selected => selected.id === skill.id)
      );

      if (skillToAdd) {
        this.selectedSkills.push(skillToAdd);
      }
    }

    event.chipInput!.clear();
    this.skillsForm.get('skillAutocomplete')!.setValue(null);
  }

  remove(skillToRemove: Skill): void {
    const index = this.selectedSkills.findIndex(skill => skill.id === skillToRemove.id);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedSkill = event.option.value as Skill;
    if (!this.selectedSkills.some(skill => skill.id === selectedSkill.id)) {
      this.selectedSkills.push(selectedSkill);
      console.log(this.selectedSkills);

    }
    this.skillsForm.get('skillAutocomplete')!.setValue(null);
  }

  displayFn(skill: Skill): string {
    return skill ? skill.skillName : '';
  }

  onSubmitSkills() {
    if (this.selectedSkills.length > 0) {
      const skillsPayload = {
        skills: this.selectedSkills.map(skill => skill.id)
      };
      // const skillsPayload = this.selectedSkills.map(skill => skill.id);
      // console.log(skillsPayload);


      if (!this.hasExistingSkills) {

        this.updateJobseekerService.addSkillsJobseeker(skillsPayload).subscribe({
          next: (response) => {
            this.toaster.success('Skills added successfully');
            console.log('Skills saved successfully', response);
            this.hasExistingSkills = true;
          },
          error: (err) => {
            this.toaster.error('Error adding skills');
            console.log('Error adding skills', err);

          }
        })
      }

      else {
        this.updateJobseekerService.updateSkillsJobseeker(skillsPayload).subscribe({
          next: (response) => {
            this.toaster.success('Skills updated successfully');
            console.log('Skills updated successfully', response);

          },
          error: (err) => {
            this.toaster.error('Error updating skills');
            console.log('Error updating skills', err);
          }
        })
      }

    }
  }

  onSubmitProfile() {
    if (this.jobSeekerProfileForm.value) {
      const data = this.jobSeekerProfileForm.value;
      this.updateJobseekerService.updateJobseeker(data).subscribe({
        next: (response) => {
          this.toaster.success('Profile updated successfully')
          console.log('Profile updated successfully', response);
        },
        error: (err) => {
          this.toaster.error('Error updating profile')
          console.log('Error updating profile', err);

        }
      })
    }
  }

  onSubmitEducation() {
    const data = this.educationDetailsForm.value;
    const pgPassingYear = data.pgPassingYear ? data.pgPassingYear : null;
    const pgStream = data.pgStream ? data.pgStream : null
    const payload = { ...data, pgPassingYear, pgStream }

    if (this.isEducationDataAvailable) {
      this.updateJobseekerService.updateEducationDetails(payload).subscribe({
        next: (response) => {
          this.toaster.success('Education Details updated successfully');
          console.log('Education Details updated successfully', response);
          this.isEducationDataAvailable = true;
        },
        error: (err) => {
          this.toaster.error('Error updating education details')
          console.log('Error updating education details', err);
        }
      });
    } else {
      this.updateJobseekerService.addEducationDetails(payload).subscribe({
        next: (response) => {
          this.toaster.success('Education Details added successfully');
          console.log("Education details added successfully!", response);
          this.isEducationDataAvailable = true;
        },
        error: (err) => {
          this.toaster.error('Error adding education details')
          console.log("Error in adding education details", err);
        }
      });
    }
  }

}
