import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollapsibleSectionService {

  private apiUrl = 'http://localhost:8080/sections';

  constructor(private http: HttpClient) {}

  // Save collapsible section
  saveSection(section: { regNumber: string | null; 
    buttonName: string; 
    activeTab: string | null;
    tiles: { type: string; title: string }[] }): Observable<any> {
    return this.http.post(this.apiUrl, section);
  }

  // Find collapsible section by id
  getSectionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Find all collapsible sections for specific tab and registration number
  getSections(regNumber: string , activeTab: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${regNumber}/${activeTab}`);
  }

  // Find all collapsible sections for examiners
  getSectionsForExaminers(regNumber: string , activeTab: string, examinerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/examiners/${regNumber}/${activeTab}/${examinerId}`);
  }

  // Update collapsible section by id
  updateSection(id: number, section: { regNumber: string | null; 
    buttonName: string; 
    activeTab: string | null;
    tiles: { type: string; title: string }[] }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, section);
  }
  
  // Delete collapsible section by id
  deleteSection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
