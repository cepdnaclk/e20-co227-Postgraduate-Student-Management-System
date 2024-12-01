import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnrolledStudentService } from '../../services/enrolled-student.service';
import { EnrolledStudent } from '../../../models/enrolled-studnet';
import { FileService } from '../../../services/file.service';
import Swal from 'sweetalert2';
import { Student } from '../../../models/student';


@Component({
  selector: 'app-enrolled-students-details-popup',
  templateUrl: './enrolled-students-details-popup.component.html',
  styleUrls: ['./enrolled-students-details-popup.component.css'] // Corrected property name
})
export class EnrolledStudentsDetailsPopupComponent implements OnInit {
  student: EnrolledStudent | undefined;
  errorMessage: string | undefined;
  isLoading: boolean = false; // Added loading state

  @Input() studentId: number | null = null;
  @Input() mode: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();

  constructor(
    private enrolledStudentService: EnrolledStudentService,
    private fileService : FileService
  ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  onSubmit() {
    // Check if student.id is present before trying to update
    if (this.student && this.student.id) {

      // Create an object with only the updated fields
      const updatedStudent: Partial<EnrolledStudent> = {
        registrationNumber: this.student.registrationNumber,
        nameWithInitials: this.student.nameWithInitials,
        fullName: this.student.fullName,
        email: this.student.email,
        contactNumber: this.student.contactNumber,
        status: this.student.status,
        registeredDate: this.student.registeredDate,
      };
        this.enrolledStudentService.updateStudent(this.student.id, updatedStudent).subscribe({
            next: (data) => {
                // Update local student reference with the returned data
                this.student = data;
                Swal.fire({
                  html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Student details updated successfully!</b>',
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
                this.closeEnrolledStudentsDetailsPopup();
                this.update.emit();
            },
            error: (error) => {
                console.error('Error updating student:', error);
                Swal.fire({
                  html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error updating student Details.</b>',
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
    } else {
        Swal.fire({
          html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>Student ID is missing, cannot update.</b>',
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


  getStudent(): void {
    if (this.studentId !== null) {
      this.isLoading = true; // Start loading
      this.enrolledStudentService.getStudentById(this.studentId).subscribe(
        (data: EnrolledStudent) => {
          this.student = data;
          this.isLoading = false; // End loading
        },
        (error) => {
          console.error('Error fetching student:', error);
          this.errorMessage = 'Student not found or an error occurred.';
          this.isLoading = false; // End loading
        }
      );
    } else {
      this.errorMessage = 'Invalid student ID.';
    }
  }

  closePopup() {
    this.close.emit();
  }

  // These methods seem to control the popup state, ensure they are used appropriately
  isEnrolledStudentsDetailsPopupOpen: boolean = false;

  openEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = true;
  }

  closeEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = false;
    this.closePopup();
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
}
