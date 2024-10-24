import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
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
  constructor(private fb: FormBuilder, private postJobService: PostJobService) { }

  ngOnInit() {
    this.jobSeekerProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      country: ['', [Validators.required]],
    });

    this.educationDetailsForm = this.fb.group({
      tenthMarksPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      tenthPassingYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      twelfthMarksPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      twelfthPassingYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      ugStream: ['', [Validators.required, Validators.maxLength(200)]],
      ugBranch: ['', [Validators.required, Validators.maxLength(200)]],
      ugCGPA: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      ugPassingYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      pgStream: ['', [Validators.maxLength(200)]],
      pgPassingYear: ['', [Validators.min(1900), Validators.max(new Date().getFullYear())]],
    });
    this.skillsForm = this.fb.group({
      selectedSkill: [''],
      skillAutocomplete:this.skillAutocomplete
    });
    this.filteredSkills = this.skillsForm.get('skillAutocomplete')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.skillName;
        return name ? this._filter(name) : this.allSkills?.slice();
      })
    );


    this.postJobService.fetchExistingSkills().subscribe({
      next: data => {
        this.allSkills = data.data
        this.setupFilteredSkills();
      },
      error: err => {
        console.log(err);

      }
    })
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
      // Create the payload with selected skills
      // const skillsPayload = {
      //   skills: this.selectedSkills.map(skill => ({
      //     skillId: skill.id,
      //     skillName: skill.skillName
      //   }))
      // };
      const skillsPayload = this.selectedSkills.map(skill => skill.id);
      console.log(skillsPayload);
      
  
      // Add your API call here
      // this.postJobService.saveJobSeekerSkills(skillsPayload).subscribe({
      //   next: (response) => {
      //     // Show success message
      //     console.log('Skills saved successfully', response);
      //     // You might want to show a snackbar or alert here
      //   },
      //   error: (error) => {
      //     console.error('Error saving skills', error);
      //     // Handle error appropriately
      //   }
      // });
    }
  }
}
