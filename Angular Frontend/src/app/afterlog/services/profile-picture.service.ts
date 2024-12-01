import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  
  constructor(private http:HttpClient) { }

  private profilePictureUpdated = new Subject<boolean>();

  // Observable to be used in other components to listen for changes
  profilePictureUpdated$ = this.profilePictureUpdated.asObservable();

  // Method to emit the update signal
  notifyProfilePictureUpdated(isLoaded: boolean) {
    this.profilePictureUpdated.next(isLoaded);
  }

  searchUser(email: string): Observable<boolean> {
    const url = `http://localhost:8080/profile/search/${email}`;
    return this.http.get<boolean>(url).pipe
    (
      catchError(error => {
        // Handle error
        return throwError(() => new Error('An error occurred while searching for the user'));
      })
    )
    ;
  }
  
  changePassword(email: string, newPassword: string): Observable<any> {
    const url = `http://localhost:8080/profile/change-password`;
    const params = new HttpParams()
        .set('email', email)
        .set('newPassword', newPassword);
    
    return this.http.post(url, null, { params }).pipe(
        catchError(error => {
            // Handle error
            return throwError(() => new Error('An error occurred while changing the password'));
        })
    );
}

}
