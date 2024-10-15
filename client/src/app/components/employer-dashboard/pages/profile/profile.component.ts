import { Component, inject, OnInit, signal } from '@angular/core';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateEmployerService } from '../../../../services/update-employer.service';
import { type EmployerResponse } from '../../../../model/employer.model';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  dialog = inject(MatDialog);
  employerDetails = signal<EmployerResponse | undefined>(undefined);
  private updateEmployerService = inject(UpdateEmployerService);
  profileForm = new FormGroup({
    firstName: new FormControl(this.employerDetails()?.firstName || '', [
      Validators.required,
    ]),
    lastName: new FormControl(this.employerDetails()?.lastName || '', [
      Validators.required,
    ]),
    email: new FormControl(this.employerDetails()?.email || '', [
      Validators.required,
    ]),
    phone: new FormControl('', [Validators.required]),
    DOB: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.updateEmployerService.getEmployerDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.employerDetails.set(response.data);
        this.updateForm();
        console.log(this.employerDetails());
      },
    });
  }

  updateForm() {
    const details = this.employerDetails();
    if (details) {
      this.profileForm.patchValue({
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        DOB: details.dob,
      });
    }
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
