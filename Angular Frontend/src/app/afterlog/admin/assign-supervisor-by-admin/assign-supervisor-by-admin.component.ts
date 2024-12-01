import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-supervisor-by-admin',
  templateUrl: './assign-supervisor-by-admin.component.html',
  styleUrl: './assign-supervisor-by-admin.component.css'
})
export class AssignSupervisorByAdminComponent implements OnInit{

  @Input() regNumber: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() supervisorAssigned = new EventEmitter<string>();

  constructor(private http: HttpClient){}

  tableData: Array<{ id: number, fullName: string, email:string, noOfSupervisees:number }> = [];

  searchText: string = '';
  
  //To load Supervisors 
  loadSupervisors(regNumber : string | null) {
  this.http.get<Array<{ id: number, fullName: string, email: string, noOfSupervisees: number }>>(`http://localhost:8080/supervisors/${regNumber}`)
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
    this.loadSupervisors(this.regNumber);
  }

  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.noOfSupervisees.toString().toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }

  closeAssignSupervisorByAdmin(): void {
    this.close.emit();
  }

  selectedSupervisor: any;
  isLoading: boolean = false;


  assignSupervisor(): void {

    if (this.selectedSupervisor) {

      this.isLoading = true;

      const url = `http://localhost:8080/assignSupervisor/${this.regNumber}`;
      this.http.post(url, null, { 
        params: { supervisorId: this.selectedSupervisor.id }, 
        responseType: 'text' // Expect a plain text response
      }).subscribe({
        next: (response) => {
          console.log('Supervisor assigned successfully:', response);
          this.isLoading = false;
          Swal.fire({
            // title: 'Enrollment successful!',
            // text: 'Supervisor assigned successfully.',
            html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Supervisor assigned successfully.</b>',
            timer: 2000,
            position: 'top',
            customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-text-class'
            },
            background: '#fff',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            showConfirmButton: false
          });
          
          // Emit the supervisor's name after a successful assignment
          this.supervisorAssigned.emit(this.selectedSupervisor.fullName); // Emit the selected supervisor's name

          // Close the assignment dialog
          this.closeAssignSupervisorByAdmin();
        },
        error: (error) => {
          console.error('Error assigning supervisor:', error);
          this.isLoading = false;
          Swal.fire({
            html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error assigning supervisor.</b>',
            timer: 2000,
            position: 'top',
            customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-text-class'
            },
            background: '#fff',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            showConfirmButton: false
          });
        },
      });
    } else {
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>Please select a supervisor.</b>',
        timer: 2000,
        position: 'top',
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          htmlContainer: 'custom-text-class'
        },
        background: '#fff',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        showConfirmButton: false
      });
    }
  }

}
