import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-examiner-by-admin',
  templateUrl: './assign-examiner-by-admin.component.html',
  styleUrls: ['./assign-examiner-by-admin.component.css']
})
export class AssignExaminerByAdminComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() assignedExaminersChange = new EventEmitter<void>();

  tableData: Array<{ id: number, fullName: string, email: string, selected?: boolean }> = [];
  assignedExaminers: Array<{ id: number, fullName: string }> = []; // Store previously assigned examiners
  searchText: string = '';
  selectedExaminers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExaminers(this.id);
    this.loadAssignedExaminers(); // Load previously assigned examiners
  }

  // Load examiners from the backend
  loadExaminers(submissionId : number | null) {
    this.http.get<Array<{ id: number, fullName: string, email: string }>>(`http://localhost:8080/examiners/${submissionId}`)
      .subscribe({
        next: (data) => {
          this.tableData = data.map(examiner => ({
            ...examiner,
            selected: false
          }));
        },
        error: (error) => {
          console.error('Error loading examiners data', error);
        },
        complete: () => {
          console.log('Examiners data loading complete');
        }
      });
  }

  // Load previously assigned examiners
  loadAssignedExaminers() {
    if (this.id !== null) {
      const url = `http://localhost:8080/getAssignedExaminers/${this.id}`;
      this.http.get<Array<{ id: number, fullName: string }>>(url)
        .subscribe({
          next: (data) => {
            this.assignedExaminers = data;
          },
          error: (error) => {
            console.error('Error loading assigned examiners', error);
          },
          complete: () => {
            console.log('Assigned examiners data loading complete');
          }
        });
    }
  }

  // Filter the table data based on search input
  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Close the modal
  closeAssignExaminerByAdmin(): void {
    this.close.emit();
  }

  // Assign selected examiners
  assignExaminers(): void {
    if (this.id === null) {
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>Submission ID is missing.</b>',
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
      return;
    }

    // Collect selected examiners' IDs
    const selectedExaminerIds = this.tableData
      .filter(examiner => examiner.selected)
      .map(examiner => examiner.id);

    if (selectedExaminerIds.length === 0) {
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>No examiners selected.</b>',
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
      return;
    }

    const url = `http://localhost:8080/assignExaminers/${this.id}`;
    const params = new HttpParams().set('examinerIds', selectedExaminerIds.join(','));

    this.http.post(url, null, {
      params,
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Examiners assigned successfully.</b>',
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

        // Assuming `loadAssignedExaminers()` updates an `assignedExaminers` array
        // Emit the updated assignedExaminers array
        this.assignedExaminersChange.emit();

        this.loadAssignedExaminers(); // Reload the assigned examiners list
        this.closeAssignExaminerByAdmin();
      },
      error: (error) => {
        console.error('Error assigning examiners:', error);
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error assigning examiners.</b>',
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
  }
}


