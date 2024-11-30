import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserDataSharingService } from '../../../../../services/user-data-sharing.service';
import { type UserRes } from '../../../../../model/user.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
})
export class ProfileDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ProfileDialogComponent>);
  pincodePattern = '^[0-9]{6}$';
  contactNumberPattern = '^[0-9]{10}$';
  data = inject(MAT_DIALOG_DATA);
  datepipe = inject(DatePipe);
  userData = signal<UserRes | {}>({});
  private toaster = inject(ToastrService);
  private userService = inject(UserDataSharingService);
  userProfile = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required),
    contact: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(this.contactNumberPattern),
    ]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern(this.pincodePattern),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.userService.findUser(this.data?.id).subscribe({
      next: (res) => {
        this.userData.set(res.data);
        if (Object.keys(this.userData()).length > 0) {
          this.populateData(this.userData());
        }
      },
      error: (err) => {
        this.toaster.error(err.error.message, 'Error');
      },
    });
  }

  onDateChange(event: any) {
    const formattedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(event.value, formattedDate);
    this.userProfile.get('dob')?.setValue(formattedDate);
    console.log(this.userProfile.get('dob')?.value);
  }

  onCancel() {
    this.dialogRef.close();
  }

  populateData(details: any) {
    this.userProfile.patchValue({
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      contact: details.contact,
      pincode: details.pinCode,
      dob: details.dob,
      city: details.city,
      state: details.state,
      country: details.country,
    });
  }

  onSubmit() {
    if (!this.userProfile.valid) {
      return;
    }
    console.log(this.userProfile.value)
    this.userService
      .updateUser(this.data?.id, { ...this.userProfile.value })
      .subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'Success');
          console.log(res.data);
          this.userProfile.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'Error');
        },
      });
  }
}
