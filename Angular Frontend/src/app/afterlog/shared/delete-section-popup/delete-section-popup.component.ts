import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-section-popup',
  templateUrl: './delete-section-popup.component.html',
  styleUrl: './delete-section-popup.component.css'
})
export class DeleteSectionPopupComponent {

  @Input() id: number = 0;
  @Input() buttonName: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient, private collapsibleSectionService: CollapsibleSectionService) {}

  ngOnInit(): void {
  }

  // Close the modal
  closeDeleteSectionPopup(): void {
    this.close.emit();
  }

  // Method to handle section deletion
  deleteSection(): void {
    this.collapsibleSectionService.deleteSection(this.id).subscribe({
      next: () => {
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Section deleted successfully.</b>',
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
        // Optionally, you can emit an event or call a function to update the view
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting section', err);
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>An error occurred while deleting the section.</b>',
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
    
  }

}
