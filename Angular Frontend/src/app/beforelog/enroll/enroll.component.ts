import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnrollService } from './enroll.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent {

  studentData = {
    nameWithInitials: '',
    fullName: '',
    contactNumber: '',
    email: '',
    address: '',
    publications: '',
    programOfStudy: '',
    educationalQualifications: [] as any[]
  };

  sections = [{
    university: '',
    fromDate: '',
    toDate: '',
    degree: '',
    field: '',
    selectedFile: null
  }];

  errorMessage: string = '';

    // New fields for Student ID and Birth Certificate
    studentIdDocument: File | null = null;
    birthCertificate: File | null = null;

  constructor(private enrollService: EnrollService) {}

  addSection() {
    this.sections.push({
      university: '',
      fromDate: '',
      toDate: '',
      degree: '',
      field: '',
      selectedFile: null
    });
  }

  removeSection() {
    if (this.sections.length > 1) {
      this.sections.pop();
    }
  }

  onFileChange(event: any, sectionIndex: number) {
    const file = event.target.files[0];
    this.sections[sectionIndex].selectedFile = file ? file : null;
  }

   // New methods to handle Student ID and Birth Certificate file changes
   onStudentIdChange(event: any) {
    const file = event.target.files[0];
    this.studentIdDocument = file ? file : null;
  }

  onBirthCertificateChange(event: any) {
    const file = event.target.files[0];
    this.birthCertificate = file ? file : null;
  }

  isLoading: boolean = false;
  onEnrollSubmit(form: NgForm) {
    this.errorMessage = ''; // Reset error message
    this.isLoading = true;

    if (!form.valid) {
      form.form.markAllAsTouched(); // Mark fields as touched
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.studentData.educationalQualifications = this.sections.map(section => ({
      university: section.university,
      fromDate: section.fromDate,
      toDate: section.toDate,
      degree: section.degree,
      field: section.field
    }));

    const attachments: File[] = this.sections
      .map(section => section.selectedFile)
      .filter(file => file !== null) as File[];

      // Ensure that Student ID and Birth Certificate are selected
    if (!this.studentIdDocument) {
      this.errorMessage = 'Student ID Document is required.';
      return;
    }

    if (!this.birthCertificate) {
      this.errorMessage = 'Birth Certificate is required.';
      return;
    }

    // console.log('Student Data:', this.studentData);
    // console.log('Attachments:', attachments);

    this.enrollService.enrollStudent(this.studentData, attachments, this.studentIdDocument,this.birthCertificate).subscribe({
      next: (response) => {
        console.log('Enrollment successful', response);
        this.isLoading = false;
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Enrollment successful.</b>',
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
        form.resetForm();
        this.studentData = {
          nameWithInitials: '',
          fullName: '',
          contactNumber: '',
          email: '',
          address: '',
          publications: '',
          programOfStudy: '',
          educationalQualifications: []
        };
        this.sections = [{
          university: '',
          fromDate: '',
          toDate: '',
          degree: '',
          field: '',
          selectedFile: null
        }];
        // Reset the new file fields
        this.studentIdDocument = null;
        this.birthCertificate = null;
      },
      error: (error) => {
        console.error('Enrollment failed', error);
        this.isLoading = false;
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error in Enrolling.</b>',
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
        this.errorMessage = error.message || 'Enrollment failed. Please try again.';
      }
    });
  }
}
