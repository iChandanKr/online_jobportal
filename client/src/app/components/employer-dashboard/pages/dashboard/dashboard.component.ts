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
  jobCount = signal<string[]>([]);
  ngOnInit(): void {
    this.store.fetchJobsPerMonth().subscribe({
      next: (res) => {
        this.months.set(res.data.months);
        this.jobCount.set(res.data.jobCount);
        new Chart(this.chart().nativeElement, {
          type: 'line',
          data: {
            // labels: [
            //   'Jan',
            //   'Feb',
            //   'March',
            //   'April',
            //   'May',
            //   'June',
            //   'July',
            //   'Aug',
            //   'Sep',
            //   'Oct',
            //   'Nov',
            //   'Dec',
            // ],
            labels: this.months(),
            datasets: [
              {
                label: 'Jobs',
                // data: ['2', '10', 34, 29, 40, 50, 5, 5, 8, 0, 34, 5],
                data: this.jobCount(),
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
}
