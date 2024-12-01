import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { staff } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StaffmemberService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  loadStaffMember(email: string): Observable<staff> {
    return this.http.get<staff>(`${this.apiUrl}/load/staff/${email}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Handle staff member not found
          return throwError('Staff member not found');
        }
        return throwError(error);
      })
    );
  }
  
}
