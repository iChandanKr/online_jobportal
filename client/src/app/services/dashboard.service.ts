import { inject, Injectable, signal } from '@angular/core';
import { type Widget } from '../model/dashboard.model';
import { TotalJobComponent } from '../components/employer-dashboard/widget/total-job/total-job.component';
import { OpenJobsComponent } from '../components/employer-dashboard/widget/open-jobs/open-jobs.component';
import { ClosedJobsComponent } from '../components/employer-dashboard/widget/closed-jobs/closed-jobs.component';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/api-urls';

@Injectable()
export class DashboardService {
  private httpClient = inject(HttpClient);
  private readonly jobsPerMonthUrl = API_URLS.jobsPerMonth;
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Open Jobs',
      content: OpenJobsComponent,
      color: '#008000',
      backgroundColor: '#FAF6E3',
    },
    {
      id: 2,
      label: 'Closed Jobs',
      content: ClosedJobsComponent,
      color: '#F5004F',
      backgroundColor: '#FFEEAD',
    },
    {
      id: 3,
      label: 'Total Jobs',
      content: TotalJobComponent,
    },
  ]);

  fetchJobsPerMonth() {
    return this.httpClient.get<{
      status: string;
      message: string;
      data: { months: string[]; jobCount: number[] };
    }>(this.jobsPerMonthUrl, { withCredentials: true });
  }
}
