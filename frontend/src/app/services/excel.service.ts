import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  getExcelData(apiEndpoint: string): Observable<Blob> {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.post(apiEndpoint, null, {
      responseType: 'blob',
      headers: headers
    });
  }
}
