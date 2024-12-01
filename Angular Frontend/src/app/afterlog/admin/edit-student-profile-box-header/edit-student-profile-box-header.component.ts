import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../models/student';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student-profile-box-header',
  templateUrl: './edit-student-profile-box-header.component.html',
  styleUrl: './edit-student-profile-box-header.component.css'
})
export class EditStudentProfileBoxHeaderComponent {

  @Input() regNumber: string | null = null;
  @Input() nameWithInitials: string | null = null;
  @Input() programOfStudy: string | null = null;
  @Input() registeredDate: Date | undefined = undefined;
  @Input() status: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() studentUpdated = new EventEmitter<Student>();

  student: Student = {
    regNumber: '',
    registrationNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: '',
    registeredDate: undefined
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.student.nameWithInitials = this.nameWithInitials ?? '';
    this.student.programOfStudy = this.programOfStudy ?? '';
    this.student.status = this.status ?? '';
    this.student.registeredDate = this.registeredDate ?? undefined;
    this.student.registrationNumber =  this.regNumber ?? '';
    console.log('date', this.student.registeredDate);
  }

  onSubmit() {
    const updatedFields = {
      nameWithInitials: this.student.nameWithInitials,
      status: this.student.status,
      registeredDate: this.student.registeredDate ,// Assume you added this to the model
      registrationNumber: this.student.registrationNumber
    };
  
    // Define the URL for the API request
    const url = `http://localhost:8080/editDetailsByAdmin/${this.regNumber}`;
  
    // Send the updated fields to the backend using the HTTP POST method
    this.http.post(url, updatedFields, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' // Specify that the response type is plain text
    }).subscribe({
      next: (response) => {
        // Log the plain text response
        console.log('Profile updated successfully:', response);
        this.closeEditProfileHeader();

        // Emit the updated student data to the parent component
        this.studentUpdated.emit(this.student);

        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Profile updated successfully.</b>',
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
      error: (err) => {
        // Handle any errors that occur
        console.error('Error updating profile:', err);
      }
    });
  }
  

  closeEditProfileHeader(): void {
    this.close.emit();
  }
}
