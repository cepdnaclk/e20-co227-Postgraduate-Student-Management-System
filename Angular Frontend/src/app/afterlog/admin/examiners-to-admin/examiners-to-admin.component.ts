import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-examiners-to-admin',
  templateUrl: './examiners-to-admin.component.html',
  styleUrl: './examiners-to-admin.component.css'
})
export class ExaminersToAdminComponent implements OnInit {

  constructor(private http: HttpClient){}

  tableData: Array<{ id: number,noOfSubmissions: number, fullName: string, department:string, email:string }> = [];


  searchText: string = '';
  // tableData: Array<{ column1: string, column2: string, column3: string, column4: string, column5: string }> = [
  //   { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None', column5: '' },
  //   { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular', column5: '' },
  //   { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3', column5: 'More Data 3' },
  //   // Add more data as needed
  // ];

  loadExaminers() {
    this.http.get<Array<{ id: number,noOfSubmissions: number, fullName: string, department:string, email:string }>>('http://localhost:8080/examinersToAdmin')
      .subscribe({
        next: (data) => {
          this.tableData = data;
        },
        error: (error) => {
          console.error('Error loading supervisor data', error);
        },
        complete: () => {
          console.log('Examiner data loading complete');
        }
      });
    }

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadExaminers();
  }

  get filteredData() {
    return this.tableData.filter(row =>
      (row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) || '' ) ||
      (row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (row.department.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (row.email.toLowerCase().includes(this.searchText.toLowerCase()) || '')
    );
  }
}
