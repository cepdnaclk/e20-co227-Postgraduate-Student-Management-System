import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned-examiners-to-admin',
  templateUrl: './assigned-examiners-to-admin.component.html',
  styleUrls: ['./assigned-examiners-to-admin.component.css']
})
export class AssignedExaminersToAdminComponent {

  constructor(private http: HttpClient) {}

  // Define the data structure to align with backend response
  tableData: Array<{ 
    regNumber: string,
    registrationNumber: string,
    nameWithInitials: string,
    title: string,
    examiners: string[] // List of examiners' full names
  }> = [];

  searchText: string = '';  // For searching functionality

  // Load the assigned examiners on component initialization
  ngOnInit(): void {
    scrollTo(0, 0); // Scroll to the top of the page
    this.getAssignedExaminers(); // Fetch assigned examiners
  }

  // Fetch assigned examiners from the backend
  getAssignedExaminers(): void {
    this.http.get<Array<{ regNumber: string,registrationNumber: string, nameWithInitials: string, title: string, examiners: string[] }>>('http://localhost:8080/report-submissions-examiners')
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

