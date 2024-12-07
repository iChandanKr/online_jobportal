import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';

interface ErrorRow {
  row: number;
  errors: string[] | string;
}

@Component({
  selector: 'app-bulk-insert',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, CommonModule],
  templateUrl: './bulk-insert.component.html',
  styleUrl: './bulk-insert.component.css',
})
export class BulkInsertComponent {
  private jobService = inject(JobsService);
  private toaster = inject(ToastrService);
  readonly FILE_FORMATS = ['XLSX', 'CSV'] as const;

  selectedFileFormat: string = 'CSV';
  fileFormats = this.FILE_FORMATS;

  errorMessage = signal<string | null>(null);
  isFileSelected = signal<boolean>(false);
  isValidate = signal<boolean>(false);

  selectedFile = signal<File | null>(null);
  errorArray = signal<ErrorRow[]>([]);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();

      const isValidExtension =
        (this.selectedFileFormat === 'CSV' && fileExtension === 'csv') ||
        (this.selectedFileFormat === 'XLSX' &&
          (fileExtension === 'xlsx' || fileExtension === 'xls'));

      if (isValidExtension) {
        this.isFileSelected.set(true);
        this.selectedFile.set(file);
        this.errorMessage.set(null);
      } else {
        this.isFileSelected.set(false);
        this.selectedFile.set(null);
        this.errorMessage.set(
          `Please select a .${this.selectedFileFormat.toLowerCase()} file only`
        );
      }
    } else {
      this.resetFileSelection();
    }
  }

  private resetFileSelection() {
    this.isFileSelected.set(false);
    this.selectedFile.set(null);
    this.errorMessage.set(null);
  }

  onUpload() {
    const file = this.selectedFile();
    if (this.isFileSelected() && file) {
      // Clear previous errors
      this.errorArray.set([]);

      this.jobService.bulkValiateJobPosts(file).subscribe({
        next: (res) => {
          this.toaster.success('CSV Verified successfully!');
          this.isValidate.set(true);
        },
        error: (err) => {
          console.log(err.error.message);

          if (Array.isArray(err.error.message)) {
            this.errorArray.set(
              err.error.message.map((msg: ErrorRow) => ({
                row: msg.row,
                errors: msg.errors,
              }))
            );
          } else {
            this.toaster.error(err.error.message, 'Error');
          }
        },
        complete: () => {
          this.resetFileSelection();
          this.isValidate();
        },
      });
    }
  }

  onInsert() {
    if (this.isValidate()) {
      this.jobService.bulkInsertJobs().subscribe({
        next: (res) => {
          // Success handling removed
          this.toaster.success('CSV inserted successfully!');
        },
        error: (err) => {
          // Error handling removed
        },
        complete: () => {
          this.isValidate.set(false);
        },
      });
    }
  }
}
