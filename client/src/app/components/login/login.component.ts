import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup,Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup

  constructor(private fb:FormBuilder){
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false], 
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log('Logged info',this.loginForm.value);
      this.loginForm.reset()
      
    }
  }

}
