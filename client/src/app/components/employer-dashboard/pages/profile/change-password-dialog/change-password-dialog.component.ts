import { Component, inject, input } from '@angular/core';
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
function comparePasswords(
  controlName1: string,
  controlName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    if (val1 && val2 && val1 !== val2) {
      console.log('inside error');

      return { valuesNotEqual: true };
    }
    console.log('not error')
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
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  public dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
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
      // console.log(formValues);
      this.dialogRef.close();
    }
  }
}
