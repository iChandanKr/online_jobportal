import { Injectable, signal } from '@angular/core';
import { type Widget } from '../model/dashboard.model';
import { TotalJobComponent } from '../components/employer-dashboard/widget/total-job/total-job.component';
import { OpenJobsComponent } from '../components/employer-dashboard/widget/open-jobs/open-jobs.component';
import { ClosedJobsComponent } from '../components/employer-dashboard/widget/closed-jobs/closed-jobs.component';

@Injectable()
export class DashboardService {
  constructor() {}

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Jobs',
      content: TotalJobComponent,
    },
    {
      id: 2,
      label: 'Open Jobs',
      content: OpenJobsComponent,
      color: '#008000',
      backgroundColor: '#000401',
    },
    {
      id: 3,
      label: 'Closed Jobs',
      content: ClosedJobsComponent,
      color: '#F5004F',
      backgroundColor:'#FFEEAD'
    },
  ]);
}
