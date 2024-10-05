import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployerSignupComponent } from './components/employer-signup/employer-signup.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { DashboardComponent } from './components/employer-dashboard/pages/dashboard/dashboard.component';
import { PostJobComponent } from './components/employer-dashboard/pages/post-job/post-job.component';
import { JobsComponent } from './components/employer-dashboard/pages/jobs/jobs.component';
import { ProfileComponent } from './components/employer-dashboard/pages/profile/profile.component';
import { ApplicationsComponent } from './components/employer-dashboard/pages/applications/applications.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
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
    path: 'employer',
    title: 'employer',
    component: EmployerDashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Employer-Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'post-job',
        title: 'Creat-Job',
        component: PostJobComponent,
      },
      {
        path: 'jobs',
        title: 'Jobs',
        component: JobsComponent,
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent,
      },
      {
        path: 'applications',
        title: 'Applications',
        component: ApplicationsComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
