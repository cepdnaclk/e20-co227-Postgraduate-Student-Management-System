import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback, FeedbackService } from '../../../services/feedback.service';
import { UserRoleService } from '../../../services/user-role.service';
import { FileService } from '../../../../services/file.service';
import { Examiner, ExaminerService } from '../../../services/examiner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css'
})
export class FeedbackPageComponent implements OnInit{

  userRole: string | null = null;
  userIdId : number = 0;
  
  id: number = 0;
  feedbackBody: string = '';
  selectedFile: File | null = null;
  submissionId: number = 0;
  examinerId: number = 0;
  

  @Input() mode: 'feedbackReciever-Supervisor' | 'feedbackProvider-Supervisor' | 'feedback-Examiner' = 'feedback-Examiner';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private fileService: FileService,
    private userRoleService: UserRoleService) { 
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
      this.userRoleService.userIdId$.subscribe(userIdId => {
        this.userIdId = userIdId || 0;
        this.examinerId = this.userIdId;
      });
    }


  ngOnInit(): void {
    scrollTo(0, 0);
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);

    // Set submissionId and examinerId after values are available
    this.submissionId = this.id;
    this.examinerId = this.userIdId;

    this.loadFeedbacks();
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle form submission for Examiner
  submitExaminerFeedback(): void {
    console.log('Submission ID:', this.submissionId, 'Examiner ID:', this.examinerId);
    if (this.selectedFile && this.feedbackBody) {
      this.feedbackService.updateExaminerFeedback(this.submissionId, this.examinerId, this.feedbackBody, this.selectedFile)
        .subscribe({
          next: () => {
            console.log('Feedback updated successfully');
            Swal.fire({
              html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Feedback updated successfully.</b>',
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
            console.error('Error updating feedback:', error);
          }
        });
    } else {
      alert('Please provide feedback and a file.');
    }
  }

  editExaminerFeedback(): void {
    this.editFeedback = true;
  }

  // Handle form submission for Supervisor
  submitSupervisorFeedback(): void {
    if (this.selectedFile && this.feedbackBody) {
      this.feedbackService.updateSupervisorFeedback(this.submissionId, this.feedbackBody, this.selectedFile)
        .subscribe({
          next: () => {
            console.log('Feedback updated successfully');
            Swal.fire({
              html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Feedback updated successfully.</b>',
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
            console.error('Error updating feedback:', error);
          }
        });
    } else {
      alert('Please provide feedback and a file.');
    }
  }

  editFeedback: boolean = false;
  editSupervisorFeedback(): void {
    this.editFeedback = true;
  }

  feedbackList: Feedback[] = [];
  loadFeedbacks(): void {
    this.feedbackService.getFeedbackBySubmissionId(this.id).subscribe(
      (data) => {
        this.feedbackList = data;
        // Log each feedback's body and file name
        this.feedbackList.forEach(feedback => {
          console.log('Feedback Body:', feedback.body);
          console.log('File Name:', feedback.fileName);
          console.log('Examiner Id: ' , feedback.examiner.id)
        });
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  // examiner : Examiner = {
  //   fullName: '',
  //   id: 0,
  //   email: '',
  // }

  // examinerFeedback: Feedback = {
  //   id: 0,
  //   body: '',
  //   fileName: '',
  //   originalFileName: '',
  //   examiner: this.examiner
  // } ;
  // loadExaminerFeedback(): void {
  //   console.log('Submission ID:', this.id, 'Examiner ID:', this.examinerId);
  //   this.feedbackService.getFeedbackBySubmissionIdAndExaminerId(this.id, this.examinerId).subscribe(
  //     (data) => {
  //       this.examinerFeedback = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching examiner feedback:', error);
  //     }
  //   );
  // }

  // Method to view the file in a new tab
  viewFile(fileName: string) {
    this.fileService.viewFile(fileName).subscribe((file: Blob) => {
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      window.open(fileURL);
    }, error => {
      console.error('Error while viewing the file', error);
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

  handleExaminersAssigned(){
    this.loadFeedbacks();
  }
  
}
