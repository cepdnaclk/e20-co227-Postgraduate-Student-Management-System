import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrolledStudent } from '../../models/enrolled-studnet';

@Injectable({
  providedIn: 'root'
})
export class EnrolledStudentService {

  private apiUrl = 'http://localhost:8080/enrolledstu'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<EnrolledStudent[]> {
    return this.http.get<EnrolledStudent[]>(this.apiUrl);
  }

  // New method to fetch a student by ID
  getStudentById(id: number): Observable<EnrolledStudent> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EnrolledStudent>(url);
  }

  // New method to update a student
  updateStudent(studentId: number ,updatedStudent: Partial<EnrolledStudent>): Observable<EnrolledStudent> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.put<EnrolledStudent>(url, updatedStudent);
  }
}
