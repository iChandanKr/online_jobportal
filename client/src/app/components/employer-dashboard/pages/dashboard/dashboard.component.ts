import {
  Component,
  ElementRef,
  inject,
  OnInit,
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
  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['july','Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Jobs',
            data: [2,10, 34, 29, 40, 50, 5],
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
  }
}
