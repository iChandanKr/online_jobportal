import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { WidgetComponent } from '../../widget/widget.component';
import { DashboardService } from '../../../../services/dashboard.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  store = inject(DashboardService);
  chart = viewChild.required<ElementRef>('chart');
  months = signal<string[]>([]);
  jobCount = signal<number[]>([]);
  chart_month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  ngOnInit(): void {
    this.store.fetchJobsPerMonth().subscribe({
      next: (res) => {
        this.months.set(res.data.months);
        this.jobCount.set(res.data.jobCount);
        new Chart(this.chart().nativeElement, {
          type: 'line',
          data: {
            labels: this.chart_month,
            // labels: this.months(),
            datasets: [
              {
                label: 'Jobs',
                data: this.monthVsJobPosts(this.jobCount(), this.months()),
                // data: this.jobCount(),
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgb(255,99,132,0.5)',
                fill: 'start',
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0.4,
              },
            },
          },
        });
      },
    });
  }

  monthVsJobPosts(jobPosts: number[], months: string[]) {
    const arr: number[] = [];
    for (let i of this.chart_month) {
      if (months.includes(i)) {
        const index = months.indexOf(i);
        arr.push(+jobPosts[index]);
      } else {
        arr.push(0);
      }
    }
    return arr;
  }
}
