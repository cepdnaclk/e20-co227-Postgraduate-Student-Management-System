import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Examiner {
  fullName: string;
  id: number;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class ExaminerService {

  constructor(private http: HttpClient) {}

  getAssignedExaminers(submissionId: number): Observable<Examiner[]> {
    return this.http.get<Examiner[]>(`http://localhost:8080/getAssignedExaminers/${submissionId}`);
  }
}
