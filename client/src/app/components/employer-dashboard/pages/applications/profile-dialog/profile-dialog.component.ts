import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { type jobseekerProfile } from '../../../../../model/jobseeker.model';
import { UpdateJobseekerService } from '../../../../../services/update-jobseeker.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TitleCasePipe],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
})
export class ProfileDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  jobseekerProfile = signal<jobseekerProfile | undefined>(undefined);
  dialogRef = inject(MatDialogRef<ProfileDialogComponent>);
  private updateJobseekrService = inject(UpdateJobseekerService);
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    this.updateJobseekrService
      .getJobseekerCompleteProfile(this.data.id)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.jobseekerProfile.set(res.data);
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'Error');
        },
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
