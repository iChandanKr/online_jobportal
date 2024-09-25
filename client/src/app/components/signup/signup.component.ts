import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.signupForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dob: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],

    })
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log('Signup details:',this.signupForm.value);
      this.signupForm.reset()
    }

  }

  }




