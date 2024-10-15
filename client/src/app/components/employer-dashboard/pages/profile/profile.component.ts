import { Component, inject, OnInit, signal } from '@angular/core';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateEmployerService } from '../../../../services/update-employer.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  dialog = inject(MatDialog);
  employerDetails = signal({});
  private updateEmployerService = inject(UpdateEmployerService);
  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    personal_details: this.formBuilder.group({
      firstName: [this.employerDetails(), Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      DOB: ['', Validators.required],
      password: ['', Validators.required],
    }),
  });
  ngOnInit(): void {
    this.updateEmployerService.getEmployerDetails().subscribe({
      next: (response) => {
        console.log(response);
        
        console.log(this.employerDetails());
      },
    });
  }
  openChangePasswordDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // console.log(enterAnimationDuration,exitAnimationDuration)
    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed');
    });
  }
}
