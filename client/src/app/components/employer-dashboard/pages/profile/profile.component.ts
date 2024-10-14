import { Component, inject } from '@angular/core';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  dialog = inject(MatDialog);
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
