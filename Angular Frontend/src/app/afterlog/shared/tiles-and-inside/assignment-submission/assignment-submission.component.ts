
import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SubmissionService } from '../../../../services/submission.service';
import { TileIdService } from '../../../services/tile-id.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UploadedFile } from '../../../../models/uploaded-file';
import { FileService } from '../../../../services/file.service';
import { Examiner, ExaminerService } from '../../../services/examiner.service';
import { UserRoleService } from '../../../services/user-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {

  @Input() regNumber : string = '';
  @Output() openRemoveSubmissionPopupEvent = new EventEmitter<number>();

  userRole: string | null = null;
  userIdId : number = 0;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private fileService : FileService,
    private examinerService: ExaminerService,
    private http: HttpClient,
    private userRoleService: UserRoleService) {
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
      this.userRoleService.userIdId$.subscribe(userIdId => {
        this.userIdId = userIdId || 0;
      });
    }

  id: number = 0;
  isUploading: boolean = false;

  title: string = '';
  openedDate: string = ''; // Example value
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };
  submissionStatus: string = '';
  timeRemaining: string = '';
  lastModified: string = '';
  selectedFiles: File[] = [];

  ngOnInit(): void {
    scrollTo(0, 0);

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);
    this.loadUploadedFiles();

    // Fetch existing submission details if available
    this.submissionService.getSubmissionDetails(this.id).subscribe(details => {
      if (details) {
        this.title = details.title || '';
        this.openedDate = details.openedDate ? this.formatDate(details.openedDate) : ''; // Format openedDate
        this.dueDate = details.dueDate ? this.formatDate(details.dueDate) : ''; // Format dueDate

        // Calculate and set the remaining time
        this.timeRemaining = this.calculateTimeRemaining(details.dueDate);

        // Set the submission status based on the backend response
        this.submissionStatus = details.submissionStatus ? 'Submitted' : 'Not Submitted';
      }
    });

  }

  // Helper function to format the date
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  // Calculate the time remaining for the deadline
  calculateTimeRemaining(dueDateString: string): string {
    if (!dueDateString) {
      return "Deadline has not been set"; // Handle cases where dueDate is not set
    }

    const now = new Date();
    const dueDate = new Date(dueDateString);

    const timeDiff = dueDate.getTime() - now.getTime(); // Difference in milliseconds
    if (timeDiff <= 0) {
      return "Deadline has passed"; // Handle past deadlines
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} days and ${hours} hours remaining`;
  }


  // Method to set the deadline for Student Submissions
  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
      const opendate = new Date(); // Capture the current time

      // Call the service to send both deadline and opendate to the backend
      this.submissionService.setDeadline(this.id, deadline, opendate)
        .subscribe(response => {
          this.dueDate = deadline.toLocaleString();  // Display the new deadline
          this.openedDate= opendate.toLocaleString();
          // Recalculate the time remaining after setting the new deadline
          this.timeRemaining = this.calculateTimeRemaining(deadline.toISOString());
          Swal.fire({
            html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Deadline set successfully.</b>',
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
        }, error => {
          Swal.fire({
            html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error setting deadline.</b>',
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
        });
    }
  }

   // Separate function for file upload - For admin to upload the assignment task
   onFileUpload(): void {
    const formData = new FormData();
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => formData.append('files', file));
      this.submissionService.uploadFilesbyAdmin(formData, this.id)
        .subscribe(response => {
          Swal.fire({
            html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Files uploaded successfully!</b>',
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
        }, (error: HttpErrorResponse) => {
          Swal.fire({
            html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error uploading files.</b>',
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
        });
    } else {
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>No files selected.</b>',
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

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }


  // Many Files Upload -------------
  @ViewChild('fileInput') fileInput!: ElementRef;
  files: File[] = [];
  uploadedFiles: UploadedFile[] = []; 
  isDragging = false;
  uploadError: string | null = null;

  


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.addFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.addFiles(event.target.files);
      event.target.value = null;
    }
  }


  addFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && !this.files.some(f => f.name === file.name)) {
        this.files.push(file);
  
        // Transform File to UploadedFile
        const uploadedFile: UploadedFile = {
          fileName: file.name,
          originalFileName: file.name, // Assuming the original name is the same
          fileSize: file.size
        };
        this.uploadedFiles.push(uploadedFile);
      }
    }
  }
  


  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clearFiles() {
    this.files = [];
  }

  uploadFiles() {
    if (this.files.length === 0) return;

    // Simulate upload process
    console.log('Uploading files:', this.files);
    this.isUploading = true;
    this.uploadError = null;

    const formData = new FormData();
    this.files.forEach(file => formData.append('files', file));

    this.submissionService.uploadFiles(formData, this.id).subscribe({
      next: (response) => {
        this.clearFiles();
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>File(s) successfully uploaded.</b>',
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
      error: (error) => {
        this.uploadError = 'Failed to upload files. Please try again.';
        console.error('Upload error:', error);
      }
    });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  // End of Many Files Upload -------------


  // Method to load the uploaded files
  loadUploadedFiles(): void {
    this.submissionService.getUploadedFiles(this.id).subscribe(files => {
      this.uploadedFiles = files;
      console.log('files received');
      console.log(this.isUploading);
      this.isUploading = this.uploadedFiles.length > 0;
      if (this.uploadedFiles.length === 0) {
        this.isUploading = false;
      }
    }, (error) => {
      console.error('Failed to load uploaded files:', error);
    });
  }

  //To download the uploaded file
  download(uniqueFileName: string, originalFileName: string) {
    this.fileService.downloadFile(uniqueFileName).subscribe(response => {
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


  // Method to view the file in a new tab
  viewFile(fileName: string) {
    this.fileService.viewFile(fileName).subscribe((file: Blob) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, error => {
      console.error('Error while viewing the file', error);
    });
  }
  

  // Change deadline Mangage
  showError: boolean = false;

  onChangeDeadline() {
    if (!this.setDueDate.date || !this.setDueDate.time) {
      this.showError = true; // Show error message if inputs are not filled
    } else {
      this.showError = false; // Hide error message when inputs are valid
      // Logic to handle deadline change
      console.log('Deadline changed:', this.setDueDate);
    }
  }

  //To remove submissions
  isRemoveSubmissionPopupOpen = false;
  openRemoveSubmissionPopup(): void {
    this.openRemoveSubmissionPopupEvent.emit(this.id);
    this.isRemoveSubmissionPopupOpen = true;
  }
  closeRemoveSubmissionPopup(): void {
    this.isRemoveSubmissionPopupOpen = false;
  }
  // Get the Remove Submission Confirmation and change the content
  onFileRemoved(): void {
    console.log('Remove event received from child component.');
    this.isUploading = false;
    this.loadUploadedFiles();
  }
  
}

