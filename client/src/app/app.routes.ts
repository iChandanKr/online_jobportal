import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmployerSignupComponent } from './components/employer-signup/employer-signup.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { DashboardComponent } from './components/employer-dashboard/pages/dashboard/dashboard.component';
import { PostJobComponent } from './components/employer-dashboard/pages/post-job/post-job.component';
import { JobsComponent } from './components/employer-dashboard/pages/jobs/jobs.component';
import { ProfileComponent } from './components/employer-dashboard/pages/profile/profile.component';
import { ApplicationsComponent } from './components/employer-dashboard/pages/applications/applications.component';
import { authGuard } from './guards/auth.guard';
import { JobseekerDashboardComponent } from './components/jobseeker-dashboard/jobseeker-dashboard.component';
import { ApplyJobComponent } from './components/jobseeker-dashboard/pages/apply-job/apply-job.component';
import { JobseekerProfileComponent } from './components/jobseeker-dashboard/pages/jobseeker-profile/jobseeker-profile.component';
import { JobApplicationsComponent } from './components/jobseeker-dashboard/pages/job-applications/job-applications.component';

export const routes: Routes = [
  // Landing Page
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  // Auth Routes
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { breadcrumb: 'Signup' },
  },
  {
    path: 'employersignup',
    component: EmployerSignupComponent,
    data: { breadcrumb: 'Employer Signup' },
  },
  // Employer Dashboard
  {
    path: 'employer',
    component: EmployerDashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Employer Dashboard' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Overview' },
      },
      {
        path: 'post-job',
        component: PostJobComponent,
        data: { breadcrumb: 'Post Job' },
      },
      {
        path: 'post-job/:id',
        component: PostJobComponent,
        data: { breadcrumb: 'Edit Job' },
      },
      {
        path: 'jobs',
        component: JobsComponent,
        data: { breadcrumb: 'Manage Jobs' },
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        data: { breadcrumb: 'Job Applications' },
      },
      {
        path: 'applications/:jobId',
        component: ApplicationsComponent,
        data: { breadcrumb: 'Application Details' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Profile Settings' },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  // Jobseeker Dashboard
  {
    path: 'jobseeker',
    component: JobseekerDashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Jobseeker Dashboard' },
    children: [
      {
        path: 'apply-job',
        component: ApplyJobComponent,
        data: { breadcrumb: 'Apply for Jobs' },
      },
      {
        path: 'profile',
        component: JobseekerProfileComponent,
        data: { breadcrumb: 'My Profile' },
      },
      {
        path: 'job-applications',
        component: JobApplicationsComponent,
        data: { breadcrumb: 'My Applications' },
      },
      {
        path: '',
        redirectTo: 'apply-job',
        pathMatch: 'full',
      },
    ],
  },
];
