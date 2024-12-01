import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/files';


  constructor(private http: HttpClient) { }


  getFileMetadata(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // downloadFile(id: number): Observable<Blob> {
  //   return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  // }

  downloadFileFromEnrolldStu(fileName: string) {
    const token = localStorage.getItem('authToken'); // Get the JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/download/${fileName}`, {
      headers: headers,
      responseType: 'blob' as 'json' // The response type is 'blob' since it's a file download
    });
  }
  
  uploadFiles(formData: FormData, tileId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload/${tileId}`, formData, {
      responseType: 'text' // This forces Angular to treat the response as plain text
    });
  }


  
  downloadFile(fileName: string) {
    const token = localStorage.getItem('authToken'); // Get the JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/download/${fileName}`, {
      headers: headers,
      responseType: 'blob' as 'json' // The response type is 'blob' since it's a file download
    });
  }

  viewFile(fileName: string) {
    const token = localStorage.getItem('authToken'); // Get the JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.baseUrl}/view/${fileName}`, {
      headers: headers,
      responseType: 'blob' // Correctly specify that the response type is 'blob'
    });
  }
  

  



  // downloadFile(id: number): Observable<Blob> {
  //   const token = localStorage.getItem('authToken'); // Retrieve JWT token from localStorage
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get(`${this.baseUrl}/download/${id}`, {
  //     headers: headers,
  //     responseType: 'blob'
  //   }).pipe(
  //     map((response: Blob) => {
  //       // Here you can manipulate the Blob if needed before returning it
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Customize this based on your application's error handling strategy
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

