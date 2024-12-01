import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-deadlines-to-examiners',
  templateUrl: './set-deadlines-to-examiners.component.html',
  styleUrl: './set-deadlines-to-examiners.component.css'
})
export class SetDeadlinesToExaminersComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deadlineSet = new EventEmitter<string>();

  assignedExaminers: Array<{ id: number, fullName: string }> = [];
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };

  constructor(private http: HttpClient,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.loadAssignedExaminers();
  }

  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time && this.id!=null) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
    
      // Call the service to send both deadline and opendate to the backend
      this.submissionService.setDeadlineToExaminers(this.id, deadline)
        .subscribe(response => {
          this.dueDate = this.formatDate(deadline.toISOString());
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
          // Emit the formatted deadline to the parent component
          this.deadlineSet.emit(this.dueDate);
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

  // Close the modal
  closeSetDeadlinesForExaminers(): void {
    this.close.emit();
  }
}
