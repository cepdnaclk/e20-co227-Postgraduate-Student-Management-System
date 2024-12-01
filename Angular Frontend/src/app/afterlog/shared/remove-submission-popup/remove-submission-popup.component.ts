import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';

@Component({
  selector: 'app-remove-submission-popup',
  templateUrl: './remove-submission-popup.component.html',
  styleUrls: ['./remove-submission-popup.component.css']
})
export class RemoveSubmissionPopupComponent {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private http: HttpClient, private submissionService: SubmissionService) {}

  ngOnInit(): void {
  }

  // Close the modal
  closeRemoveSubmissionPopup(): void {
    this.close.emit();
  }

  // Method to handle file deletion
  removeFiles(): void {
    if (this.id !== null) {
      this.submissionService.deleteFile(this.id).subscribe({
        next: () => {
          this.remove.emit();
          this.closeRemoveSubmissionPopup();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
        }
      });
    }
  }
}
