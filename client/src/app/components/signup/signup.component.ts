import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobseekerSignupService } from '../../../app/services/jobseeker-signup.service';
function isPasswordMatch(
  controlName1: string,
  controlName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val1 = control.get(controlName1);
    const val2 = control.get(controlName2);
    if (!val1 || !val2) {
      return null;
    }
    if (val2.errors && !val2.errors['valuesNotEqual']) {
      return null;
    }

    if (val1?.value === val2?.value) {
      val2.setErrors(null);
      return null;
    }
    val2.setErrors({ valuesNotEqual: true });
    return { valuesNotEqual: true };
  };
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private jobSeekerSignupService: JobseekerSignupService
  ) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        city: ['', Validators.required],
        pinCode: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validators: isPasswordMatch('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.log('hello');
      return;
    }

    console.log('Signup details:', this.signupForm.value);
    this.jobSeekerSignupService
      .signupJobseeker(this.signupForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (er) => {
          console.log(er);
        },
      });
    this.signupForm.reset();
  }
}
