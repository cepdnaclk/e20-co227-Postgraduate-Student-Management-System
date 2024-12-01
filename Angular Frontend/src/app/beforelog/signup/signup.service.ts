import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl = 'http://localhost:8080/signup'; // Backend URL

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any>  {
    return this.http.post(this.signupUrl, signupData, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Signup error:', error.message);
          return throwError(() => new Error('Signup failed. Please try again later.'));
        })
      );
  }
}


