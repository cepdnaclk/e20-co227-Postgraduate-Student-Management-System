import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRoleService } from '../../../services/user-role.service';
import { VivaService } from '../../../../services/viva.service';

@Component({
  selector: 'app-viva-page',
  templateUrl: './viva-page.component.html',
  styleUrl: './viva-page.component.css'
})
export class VivaPageComponent {
  //vivaDate: any;
  vivaDate: string = ''; // Example value
  setvivaDate: { date: string; time: string } = { date: '', time: '' };
  title: string = '';
  comments: string = ''; // Example value
  
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vivaService: VivaService,
    private userRoleService: UserRoleService) { 
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
    }

  id: number = 0;
  isCommmented: boolean = false;
  isDateFixed: boolean = false;

  ngOnInit(): void {
    scrollTo(0, 0);
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);

    // Fetch existing submission details if available
    this.vivaService.getVivaDetails(this.id).subscribe(details => {
      if (details) {
        this.title = details.title || '';
        this.comments = details.comments || '';
        this.vivaDate = details.vivaDate ? this.formatDate(details.vivaDate) : ''; // Format vivaDate
      }

       // Check if comments or viva date exist and set isCommented to true
       if ( details.vivaDate) {
        this.isDateFixed = true;  // Set isCommented to true if data exists
      }
    });

  }

  onSubmit(){
    if (this.setvivaDate.date && this.setvivaDate.time) {
      const deadline = new Date(`${this.setvivaDate.date}T${this.setvivaDate.time}`);

      // Call the service to send both deadline and opendate to the backend
      this.vivaService.setDeadline(this.id, deadline)
        .subscribe(response => {
          this.vivaDate = deadline.toLocaleString();  // Display the new deadline
          // Recalculate the time remaining after setting the new deadline
          alert(response);
        }, error => {
          alert('Error setting deadline.');
        });

        this.isDateFixed = true;
    }

  this.isCommmented = true;

  // Submit comments
  if (this.comments) {
    this.vivaService.submitComments(this.id, this.comments).subscribe(() => {
      this.isCommmented = true;
      alert('Comments submitted successfully.');
    }, error => {
      alert('Error submitting comments.');
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
}
