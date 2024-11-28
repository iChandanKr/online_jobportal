import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-bulk-insert',
  standalone: true,
  imports: [MatFormField,MatLabel,MatSelect,MatOption],
  templateUrl: './bulk-insert.component.html',
  styleUrl: './bulk-insert.component.css'
})
export class BulkInsertComponent {
  selectedFileFormat: string = 'XLSX';
  fileFormats: string[] = ['XLSX', 'CSV'];

}
