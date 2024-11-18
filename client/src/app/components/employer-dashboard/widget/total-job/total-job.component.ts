import {
  Component,
  computed,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { JobsService } from '../../../../services/jobs.service';
import { log } from 'console';

@Component({
  selector: 'app-total-job',
  standalone: true,
  imports: [],
  templateUrl: './total-job.component.html',
  styleUrl: './total-job.component.css',
})
export class TotalJobComponent {
  private jobservice = inject(JobsService);

  totalJob=computed(()=>this.jobservice.alljobs())
}
