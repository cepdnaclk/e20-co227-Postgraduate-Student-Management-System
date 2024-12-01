import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VivaService {

  
  private apiUrl = 'http://localhost:8080'; // Update with your actual backend API URL

  constructor(private http: HttpClient) {}

  setDeadline(vivaId: number, deadline: Date): Observable<any> {
    const params = { 
      deadline: deadline.toISOString(),  // Convert to ISO format
    };
    return this.http.post(`${this.apiUrl}/setVivaDate/${vivaId}`, null, { params, responseType: 'text' });
  }

  getVivaDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/viva/getVivaDetails/${id}`);
  }

  // New method to submit comments
  submitComments(vivaId: number, comments: string): Observable<any> {
    const body = { comments };
    return this.http.post(`${this.apiUrl}/viva/submitComments/${vivaId}`, body, { responseType: 'text' });
  }
}
