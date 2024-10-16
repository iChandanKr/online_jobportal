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
import { ToastrService } from 'ngx-toastr';
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
  private toaster = inject(ToastrService);
  profileForm = new FormGroup({
    firstName: new FormControl(this.employerDetails()?.firstName || '', [
      Validators.required,
    ]),
    lastName: new FormControl(this.employerDetails()?.lastName || '', []),
    email: new FormControl(this.employerDetails()?.email || '', [
      Validators.required,
      Validators.email,
    ]),
    contact: new FormControl(this.employerDetails()?.contact || '', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    dob: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    country: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    companyIndustry: new FormControl('', [Validators.required]),
    companyEmail: new FormControl('', [Validators.required, Validators.email]),
    companyContact: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    totalEmployees: new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]),
    foundedDate: new FormControl('', [Validators.required]),
    branchName: new FormControl('', [Validators.required]),
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl('', [Validators.required]),
    companyCity: new FormControl('', [Validators.required]),
    companyState: new FormControl('', [Validators.required]),
    companyPincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    companyCountry: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.updateEmployerService.getEmployerDetails().subscribe({
      next: (response) => {
        // console.log(response);
        this.employerDetails.set(response.data);
        this.updateForm();
        // console.log(this.employerDetails());
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
        dob: details.dob,
        contact: details.contact,
        city: details.city,
        state: details.state,
        pinCode: details.pinCode,
        country: details.country,
        department: details.department,
        designation: details.designation,
        name: details.name,
        companyIndustry: details.companyIndustry,
        companyEmail: details.companyEmail,
        companyContact: details.companyContact,
        totalEmployees: details.totalEmployees,
        foundedDate: details.foundedDate,
        branchName: details.branchName,
        line1: details.line1,
        line2: details.line2,
        companyCity: details.companyCity,
        companyState: details.companyState,
        companyPincode: details.companyPincode,
        companyCountry: details.companyCountry,
      });
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
    if (this.profileForm.value) {
      const data = this.profileForm.value;
      this.updateEmployerService.updateEmployerDetails(data).subscribe({
        next: (res) => {
          localStorage.setItem(
            'userFullName',
            data.firstName! + ' ' + data.lastName!
          );
          this.toaster.success(res?.message, res?.status);
        },
        error: (err) => {
          this.toaster.success(err?.error.message, err?.error.status);
        },
      });
    }
  }

  onCancel() {
    window.location.reload();
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
