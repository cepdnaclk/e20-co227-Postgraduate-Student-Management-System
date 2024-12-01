import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

interface UploadedFile {
  fileName: string;
  originalFileName: string;
  fileSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiUrl = 'http://localhost:8080'; // Update with your actual backend API URL

  constructor(private http: HttpClient) {}

  setDeadline(submissionId: number, deadline: Date, opendate: Date): Observable<any> {
    const params = { 
      deadline: deadline.toISOString(),  // Convert to ISO format
      opendate: opendate.toISOString()   // Convert to ISO format
    };
    return this.http.post(`${this.apiUrl}/setDeadline/${submissionId}`, null, { params, responseType: 'text' });
  }

  getSubmissionDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/submissions/getSubmissionDetails/${id}`);
  }



  uploadFiles(formData: FormData, tileId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/complete-assignment/${tileId}`, formData, {
      responseType: 'text' // This forces Angular to treat the response as plain text
    });
  }

  uploadFilesbyAdmin(formData: FormData, tileId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/files/upload/${tileId}`, formData, {
      responseType: 'text' // This forces Angular to treat the response as plain text
    });
  }
  
//   getUploadedFiles(submissionId: number): Observable<{ name: string; size: number }[]> {
//     return this.http.get<{ name: string; size: number }[]>(`/api/submissions/${submissionId}/files`);
// }

  getUploadedFiles(tileId: number): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>(`${this.apiUrl}/submissions/uploaded/${tileId}`)
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

   // Delete a file based on the submission ID and file name
   deleteFile(submissionId: number): Observable<any> {
    const url = `${this.apiUrl}/submissions/delete/submittedFiles/${submissionId}`;
    return this.http.delete(url, { responseType: 'text' }) // Response type text for simplicity
      .pipe(catchError(this.handleError));
  }

  //Set deadline to examiners to review the subitted reports
  setDeadlineToExaminers(submissionId: number, deadline: Date): Observable<any> {
    const params = { 
      deadline: deadline.toISOString(),  // Convert to ISO format
    };
    return this.http.post(`${this.apiUrl}/setDeadlineToReview/${submissionId}`, null, { params, responseType: 'text' });
  }

  
}
