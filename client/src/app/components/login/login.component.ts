import { Component, effect } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log('Logged info',this.loginForm.value);
      this.loginService.loginByRole(this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/employer']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
      effect(() => this.loginService.isLogin.set(true));

      console.log(
        this.loginService.isLogin(),
        'lskdflskdjflsdkfjlskdfslkdfjls'
      );
    }
  }
}
