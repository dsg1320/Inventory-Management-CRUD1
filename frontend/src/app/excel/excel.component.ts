import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { MatButtonModule,MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [MatButtonModule,MatIconButton],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.scss'
})
export class ExcelComponent {
  constructor(private excelService: ExcelService) {}

  onExportButtonClick() {
    const apiEndpoint = 'http://localhost:8080/api/v1/inventory/exportall';

    // Call the service to get the Excel data
    this.excelService.getExcelData(apiEndpoint).subscribe(
      (response: Blob) => {
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(response);

        // Create an anchor element and set its properties
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.xlsx'; // Default filename

        // Trigger the click event to open the "Save As" dialog
        link.click();

        // Clean up the URL to avoid memory leaks
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error fetching Excel data:', error);
      }
    );
  }
}
