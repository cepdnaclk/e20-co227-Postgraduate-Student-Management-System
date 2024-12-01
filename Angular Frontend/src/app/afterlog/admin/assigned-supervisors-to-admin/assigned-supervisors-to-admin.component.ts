import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned-supervisors-to-admin',
  templateUrl: './assigned-supervisors-to-admin.component.html',
  styleUrl: './assigned-supervisors-to-admin.component.css'
})
export class AssignedSupervisorsToAdminComponent {

  constructor(private http: HttpClient){}

  tableData: Array<{ 
    regNumber: string,
    registrationNumber: string,
    nameWithInitials: string, 
    supervisorFullName: string
  }> = [];

  searchText: string = '';

  ngOnInit(): void {
    this.getAssignedSupervisors();
    scrollTo(0,0);
  }

  getAssignedSupervisors(): void {
    this.http.get<Array<{ regNumber: string, registrationNumber: string, nameWithInitials: string, supervisorFullName: string }>>('http://localhost:8080/assignedSupervisors')
      .subscribe(data => {
        this.tableData = data;
      }, error => {
        console.error('Error fetching assigned supervisors', error);
      });
  }

  get filteredData() {
    return this.tableData.filter(row => 
      (row.regNumber ? row.regNumber.toString().toLowerCase() : '').includes(this.searchText.toLowerCase()) ||
      (row.registrationNumber ? row.registrationNumber.toLowerCase() : '').includes(this.searchText.toLowerCase()) ||
      (row.nameWithInitials ? row.nameWithInitials.toLowerCase() : '').includes(this.searchText.toLowerCase())
    );
  }
  
}
