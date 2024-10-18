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
import { CustomValidators } from '../../utils/customValidators';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
// function isPasswordMatch(
//   controlName1: string,
//   controlName2: string
// ): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const val1 = control.get(controlName1);
//     const val2 = control.get(controlName2);
//     if (!val1 || !val2) {
//       return null;
//     }
//     if (val2.errors && !val2.errors['valuesNotEqual']) {
//       return null;
//     }

//     if (val1?.value === val2?.value) {
//       val2.setErrors(null);
//       return null;
//     }
//     val2.setErrors({ valuesNotEqual: true });
//     return { valuesNotEqual: true };
//   };
// }
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
    private jobSeekerSignupService: JobseekerSignupService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, CustomValidators.noSpaceAllowed]],
        lastName: ['', [Validators.required, CustomValidators.noSpaceAllowed]],
        email: ['', [Validators.required, CustomValidators.validEmail]],
        dob: ['', [Validators.required, CustomValidators.validDOB]],
        contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        city: ['', Validators.required],
        pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        state: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validators: CustomValidators.passwordsMatch }
    );
  }

  onSubmit() {
    console.log(this.signupForm.valid);
    console.log(this.signupForm.value);

    if (this.signupForm.invalid) {
      return;
    }

    console.log('Signup details:', this.signupForm.value);
    this.jobSeekerSignupService
      .signupJobseeker(this.signupForm.value)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/employer']);

          this.signupForm.reset();
        },
        error: (er) => {
          console.log(er);
        },
      });
  }
}
