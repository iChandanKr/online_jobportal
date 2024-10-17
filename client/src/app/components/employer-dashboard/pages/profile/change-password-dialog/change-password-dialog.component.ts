import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UpdatePasswordService } from '../../../../../services/update-password.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
function comparePasswords(
  controlName1: string,
  controlName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    if (val1 && val2 && val1 !== val2) {
      return { valuesNotEqual: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  public dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
  private updatePasswordService = inject(UpdatePasswordService);
  private toaster = inject(ToastrService);
  passwordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: comparePasswords('newPassword', 'confirmPassword'),
    }
  );

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const formValues = this.passwordForm.value;
      if (
        formValues.password &&
        formValues.newPassword &&
        formValues.confirmPassword
      ) {
        this.updatePasswordService
          .updatePassword({
            password: formValues.password,
            newPassword: formValues.newPassword,
            confirmPassword: formValues.confirmPassword,
          })
          .subscribe({
            next: (res) => {
              this.toaster.success(res.message, 'Success');
            },
            error: (err) => {
              console.log(err.message);
              this.toaster.error(err.error.message, 'Error');
            },
          });
      }

      this.dialogRef.close();
    }
  }
}
