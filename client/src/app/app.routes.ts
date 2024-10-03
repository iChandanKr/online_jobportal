import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployerSignupComponent } from './components/employer-signup/employer-signup.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'employersignup',
    component: EmployerSignupComponent,
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashboardComponent,
  },
];
