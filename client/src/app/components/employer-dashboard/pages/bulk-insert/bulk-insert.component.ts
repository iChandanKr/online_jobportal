import { error } from 'console';
import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { JobsService } from '../../../../services/jobs.service';
import { ToastrService } from 'ngx-toastr';

interface ErrorRow {
  row: number;
  errors: string[];
}
@Component({
  selector: 'app-bulk-insert',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatButtonModule],
  templateUrl: './bulk-insert.component.html',
  styleUrl: './bulk-insert.component.css',
})
export class BulkInsertComponent {
  private jobService = inject(JobsService);
  private toaster = inject(ToastrService);
  selectedFileFormat: string = 'CSV';
  fileFormats: string[] = ['XLSX', 'CSV'];
  errorMessage: string | null = null;
  isFileSelected = signal<boolean>(false);
  selectedFile: File | null = null;
  isValidate = signal<boolean>(false);
  errorArray: ErrorRow[] = [];

  onFileSelected(event: any) {
    const file = event?.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop();
      if (fileExtension === 'csv' || fileExtension === 'xls') {
        this.isFileSelected.set(true);
        this.selectedFile = file;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Please select a .csv or .xls file only';
        this.isFileSelected.set(false);
        this.selectedFile = null;
      }
    } else {
      this.isFileSelected.set(false);
      this.errorMessage = null;
      this.selectedFile = null;
    }
  }

  onUpload() {
    if (this.isFileSelected() && this.selectedFile) {
      this.jobService.bulkValiateJobPosts(this.selectedFile).subscribe({
        next: (res) => {
          this.toaster.success(res.data, 'Success');
          this.isValidate.set(true);
        },
        error: (err) => {
          console.log(err.error.message)
          if (Array.isArray(err.error.message)) {
            err.error.message.map((msg: ErrorRow) => {
              this.errorArray.push({ row: msg.row, errors: msg.errors });
            });
          }

          this.toaster.error(err.error.message, 'Error');
        },
        complete: () => {

          this.selectedFile = null;
          this.isFileSelected.set(false);

        },
      });
    }
  }

  onInsert() {
    if (this.isValidate()) {
      this.jobService.bulkInsertJobs().subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'Success');
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'Error');
        },
        complete: () => {
          this.isValidate.set(false);
        },
      });
    }
  }
}
