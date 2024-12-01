import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplate } from '../../models/email-template';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private apiUrl = 'http://localhost:8080/emails';
 
  constructor(private http: HttpClient) { }

  //Load all the templates to edit (the existing and newly added templates) by admin
  getAllTemplates(userId: number): Observable<EmailTemplate[]> {
      return this.http.get<EmailTemplate[]>(`${this.apiUrl}/forAdmin/${userId}`);
  }


  getAllTemplatesForAUser(userId: number): Observable<EmailTemplate[]> {
    return this.http.get<EmailTemplate[]>(`${this.apiUrl}/forUser/${userId}`);
  }


  //To update all the templates by admin
  //To update the newly added templates by other staff members
  updateTemplate(id: number, template: EmailTemplate): Observable<EmailTemplate> {
      return this.http.put<EmailTemplate>(`${this.apiUrl}/${id}`, template);
  }

  //To load the a perticular template
  getTemplateById(id: number): Observable<EmailTemplate> {
    return this.http.get<EmailTemplate>(`${this.apiUrl}/${id}`);
  }

  //Add new templates by admin as well as the other staff members
  addNewTemplate(template: EmailTemplate): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/new`, template);
  }

  //Send emails to students via the student profile
  sendEmailsFromStudentProfile(template: EmailTemplate, regNumber: string ): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send/stu/${regNumber}`, template);
  } 

  //Send emails with the given set
  sendEmails(template: EmailTemplate, emails: string[]): Observable<EmailTemplate> {
    const payload = { template, emails };
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send`, payload);
  }
  

}
