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
    contact: new FormControl(this.employerDetails()?.email || '', [
      Validators.required,
    ]),
    DOB: new FormControl('', [Validators.required]),
    password: new FormControl('****', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    companyIndustry: new FormControl('', [Validators.required]),
    companyEmail: new FormControl('', [Validators.required]),
    companyContact: new FormControl('', [Validators.required]),
    totalEmployees: new FormControl(1, [Validators.required]),
    foundedDate: new FormControl('', [Validators.required]),
    branchName: new FormControl('', [Validators.required]),
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl('', [Validators.required]),
    companyCity: new FormControl('', [Validators.required]),
    companyState: new FormControl('', [Validators.required]),
    companyPincode: new FormControl('', [Validators.required]),
    companyCountry: new FormControl('', [Validators.required]),
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
        contact: details.contact,
        city: details.city,
        state: details.state,
        pincode: details.pinCode,
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
