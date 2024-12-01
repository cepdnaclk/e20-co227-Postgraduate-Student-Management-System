import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examiner } from './examiner.service';


export interface Feedback {
  id: number;
  body: string;
  fileName: string;
  originalFileName: string;
  examiner: Examiner;
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  private apiUrl = 'http://localhost:8080/feedbacks';
 
  constructor(private http: HttpClient) { }

  // Method to get feedbacks by submission ID
  getFeedbackBySubmissionId(submissionId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/submission/${submissionId}`);
  }

  // Examiner-Method to update feedback with a file and body based on submission ID and examiner ID
  updateExaminerFeedback(submissionId: number, examinerId: number, body: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('body', body);
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/submission/${submissionId}/examiner/update/${examinerId}`, formData);
  }

  // Supervisor-Method to update feedback with a file and body based on submission ID
  updateSupervisorFeedback(submissionId: number, body: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('body', body);
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/supervisorSubmission/${submissionId}`, formData);
  }

  //To load the feedbacks related to the submission and the examiner 
  // getFeedbackBySubmissionIdAndExaminerId(submissionId: number, examinerId: number): Observable<Feedback> {
  //   return this.http.get<Feedback>(`${this.apiUrl}/submission/${submissionId}/examiner/${examinerId}`);
  // }
}
