import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  enrollStudent(studentData: any, attachments: File[],     studentIdDocument: File,
    birthCertificate: File): Observable<any> {
    const formData: FormData = new FormData();

    // Append student data (as JSON)
    formData.append('student', new Blob([JSON.stringify(studentData)], { type: 'application/json' }));

    // Append Student ID Document
    if (studentIdDocument) {
      formData.append('studentIdDocument', studentIdDocument, studentIdDocument.name);
    }

    // Append Birth Certificate
    if (birthCertificate) {
      formData.append('birthCertificate', birthCertificate, birthCertificate.name);
    }

    // Append multiple attachments
    attachments.forEach((file, index) => {
      formData.append('attachments', file);
    });

    // Send the POST request to the backend
    return this.http.post(`${this.baseUrl}/enroll`, formData);
  }
}




