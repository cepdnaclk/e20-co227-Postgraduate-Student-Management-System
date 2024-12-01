import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-report-submissions-to-admin',
  templateUrl: './report-submissions-to-admin.component.html',
  styleUrl: './report-submissions-to-admin.component.css'
})
export class ReportSubmissionsToAdminComponent {

  constructor(private http: HttpClient){}

  // Define the data structure to align with backend response
tableData: Array<{ 
  regNumber: string,
  registrationNumber: string,
  nameWithInitials: string,
  id: number,
  title: string,
  deadline: string, // Assuming deadline is returned as an ISO string
  submissionStatus: boolean, // Assuming submissionStatus is a boolean
  examiners: string[] // List of examiners' full names
}> = [];

  searchText: string = '';

  ngOnInit(): void {
    scrollTo(0,0);
    this.getAssignedExaminers();
  }
  
  // Fetch assigned examiners from the backend
  getAssignedExaminers(): void {
    this.http.get<Array<{ 
      regNumber: string,
      registrationNumber: string,
      nameWithInitials: string,
      id: number,
      title: string,
      deadline: string, // Assuming deadline is an ISO string
      submissionStatus: boolean, // Assuming submissionStatus is a boolean
      examiners: string[]
    }>>('http://localhost:8080/report-submissions-examiners')
      .subscribe(data => {
        this.tableData = data;
        console.log(this.tableData);
      }, error => {
        console.error('Error fetching assigned examiners', error);
      });
  }


  // Filter data based on the search input
  get filteredData() {
    return this.tableData.filter(row =>
      row.regNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.examiners.some(examiner => examiner.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
}
