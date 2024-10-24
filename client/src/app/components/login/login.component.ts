import { Component, effect } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserDataSharingService } from '../../services/user-data-sharing.service';
import { CustomValidators } from '../../utils/customValidators';
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
    private router: Router,
    private userDataSharingService: UserDataSharingService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.validEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // remember: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      
      this.loginService.loginByRole(this.loginForm.value).subscribe({
        
        next: (response) => {
          const user = response.body?.data;
          
          if (user) {
            this.userDataSharingService.setLoginUserData(user);
          }
          this.toastr.success(response.body?.message, 'success');
          user?.role === 'employer'
            ? this.router.navigate(['/employer'])
            : this.router.navigate(['/jobseeker']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err.error.message);
          this.toastr.error(err.error.message, 'error');
        },
      });
    }
  }
}
