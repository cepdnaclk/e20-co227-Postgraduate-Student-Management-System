import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisors-to-admin',
  templateUrl: './supervisors-to-admin.component.html',
  styleUrl: './supervisors-to-admin.component.css'
})
export class SupervisorsToAdminComponent implements OnInit{

  constructor(private http: HttpClient){}

  tableData: Array<{ id: number, fullName: string, email:string, noOfSupervisees:number }> = [];

  searchText: string = '';
  // tableData: Array<{ column1: string, column2: string, column3: string, column4: string, column5: string }> = [
  //   { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None', column5: '' },
  //   { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular', column5: '' },
  //   { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3', column5: 'More Data 3' },
  //   // Add more data as needed
  // ];
  
  //To load Supervisors 
  loadSupervisors() {
  this.http.get<Array<{ id: number, fullName: string, email: string, noOfSupervisees: number }>>('http://localhost:8080/supervisorsToAdmin')
    .subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error loading supervisor data', error);
      },
      complete: () => {
        console.log('Supervisor data loading complete');
      }
    });
  }

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadSupervisors();
  }

  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.noOfSupervisees.toString().toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }
}
