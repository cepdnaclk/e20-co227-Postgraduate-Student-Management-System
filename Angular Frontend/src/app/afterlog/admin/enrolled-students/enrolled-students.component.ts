import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FileService } from '../../../services/file.service';
import { EnrolledStudentService } from '../../services/enrolled-student.service';
import { EnrolledStudent } from '../../../models/enrolled-studnet';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrolled-students',
  templateUrl: './enrolled-students.component.html',
  styleUrl: './enrolled-students.component.css'
})
export class EnrolledStudentsComponent implements OnInit{

  constructor( private http:HttpClient, private fileService : FileService , private enrolledStudentService: EnrolledStudentService, private cdr: ChangeDetectorRef) {}

  tableData: Array<{ 
    id: number,
    nameWithInitials: string, 
    fullName: string, 
    contactNumber: string, 
    email:string, 
    address: string, 
    university: string, 
    fromDate: string, 
    toDate: string,
    degree: string,
    field: string,
    attachementFile: string,
    attachementFileOriginalName: string,
    classPass: string,
    publications: string,
    programOfStudy: string,
    status: string,
  }> = [];

  searchText: string = '';

  // loadStudents() {
  //   this.http.get<Array<{    
  //     id: number,
  //     nameWithInitials: string, 
  //     fullName: string, 
  //     contactNumber: string, 
  //     email:string, 
  //     address: string, 
  //     university: string, 
  //     fromDate: string, 
  //     toDate: string,
  //     degree: string,
  //     attachementFile: string,
  //     attachementFileOriginalName: string,
  //     field: string,
  //     classPass: string,
  //     publications: string,
  //     programOfStudy: string,
  //     status: string}>>('http://localhost:8080/enrolledstu')
  //     .subscribe({
  //       next: (data) => {
  //         this.tableData = data;
  //       },
  //       error: (error) => {
  //         console.error('Error loading student data', error);
  //       },
  //       complete: () => {
  //         console.log('Student data loading complete');
  //       }
  //     });
  // }

  students: EnrolledStudent[] = [];

  loadStudents(): void {
    this.enrolledStudentService.getAllStudents().subscribe(
      (data: EnrolledStudent[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadStudents();
  }


  get filteredData() {
    return this.students.filter(student =>
      (student.id?.toString().toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.status?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.registrationNumber?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.nameWithInitials?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.fullName?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.contactNumber?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.email?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.address?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
      (student.registrationStatus?.toLowerCase().includes(this.searchText.toLowerCase()) || '')
    );
  }


  isLoading: boolean = false;
  updateStatus(studentId: number, status: string, alertText: string): void {
    Swal.fire({
      html: '<b>Edit Student details before continue.</b>',
      position: 'top',
      customClass: {
        popup: 'custom1-popup-class',
        title: 'custom-title-class',
        htmlContainer: 'custom-text-class'
      },
      background: '#fff',
      backdrop: 'rgba(0, 0, 0, 0.4)',
      showConfirmButton: true, // Shows confirm button
      confirmButtonText: alertText, // Custom text for confirm button
      showCancelButton: true, // Shows cancel button
      cancelButtonText: 'Cancel', // Custom text for cancel button
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic for confirm button (Save)
        this.isLoading = true;

        const params = new HttpParams().set('action', status); // Set the 'action' parameter
    
        this.http.post(`http://localhost:8080/handleApproval/${studentId}`, {}, { params, responseType: 'text' })
          .subscribe({
            next: (response: string) => {
              this.isLoading = false;
              Swal.fire({
                html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Approval email sent successfully.</b>',
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

              // Update student status in the table data
              const student = this.students.find(s => s.id === studentId);
              if (student) {
                student.registrationStatus = status; // Update the status
              }
            },
            error: (error) => {
              let errorMessage = 'An unknown error occurred';
              if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
              } else {
                // Server-side error
                errorMessage = `Error ${error.status}: ${error.message}`;
              }
              this.isLoading = false;
              Swal.fire({
                html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error approving student.</b>',
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
          });
          console.log("Load again.");
          this.loadStudents();

      } else if (result.isDismissed) {
        // Logic for cancel button
        console.log('Cancelled: No changes');
      }
    });
    
  }


//To download the uploaded file
  download(uniqueFileName: string, originalFileName: string) {
    this.fileService.downloadFileFromEnrolldStu(uniqueFileName).subscribe(response => {
      const blob = new Blob([response as Blob], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = originalFileName; // Set the original file name for the downloaded file
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('File download failed', error);
    });
  }

  isEnrolledStudentsDetailsPopupOpen: boolean = false;
  selectedStudentId: number | null = null;
  selectedMode: string = '';
  openEnrolledStudentsDetailsPopup(studentId: number, mode: string) {
    this.selectedStudentId = studentId;
    this.selectedMode = mode;
    this.isEnrolledStudentsDetailsPopupOpen = true;
  }
  closeEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = false;
  }

  handleStudentUpdate() {
    this.loadStudents();
  }
  
}
