import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { StaffmemberService } from '../../services/staffmember.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-staff-members-by-admin',
  templateUrl: './add-staff-members-by-admin.component.html',
  styleUrl: './add-staff-members-by-admin.component.css'
})
export class AddStaffMembersByAdminComponent {

  @Output() close = new EventEmitter<void>();

  staffMember = {
    name: '',
    email: '',
    roles: [] as string[]
  };

  isStaffMemberChecked: boolean = false;

  constructor(private http: HttpClient,
    private staffMemberService : StaffmemberService
  ) {}

  // Function to handle checkbox changes
  onCheckboxChange(event: any) {
    const role = event.target.value; // Role is a string (e.g., 'SUPERVISOR', 'EXAMINER')
  
    if (event.target.checked) {
      // Add the role to the staffMember's roles array if it's not already present
      if (!this.staffMember.roles.includes(role)) {
        this.staffMember.roles.push(role);
      }
    } else {
      // Remove the role from the staffMember's roles array
      const index = this.staffMember.roles.indexOf(role);
      if (index > -1) {
        this.staffMember.roles.splice(index, 1);
      }
    }
  }
  
  // Function to handle form submission
  onSubmit() {
    const params = new HttpParams()
      .set('name', this.staffMember.name)
      .set('email', this.staffMember.email)
      .set('role', this.staffMember.roles.join(','));
   
      this.http.post('http://localhost:8080/addStaffMembers', params, { responseType: 'text' }).subscribe({
      next: (response) => {
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Staff member added successfully!</b>',
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
        this.closeAddStaffMembersByAdmin();
        // Reset the form fields
        this.staffMember = { name: '', email: '', roles: [] };
      },
      error: (error) => {
        console.error('Error adding staff member:', error);
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error adding staff member.</b>',
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
   

  closeAddStaffMembersByAdmin(): void {
    this.close.emit();
  }

// Function to check if the staff member already exists
  onCheckPresentStaffMember() {
    // Call the service to check if the staff member exists
    this.staffMemberService.loadStaffMember(this.staffMember.email).subscribe({
      next: (staff) => {
        // If the staff member exists, update the form fields
        this.staffMember = staff;
        this.isStaffMemberChecked = true;
        console.log('Staff member exists:', staff);
      },
      error: (error) => {
        // If the staff member does not exist, reset the form but keep the email
        this.isStaffMemberChecked = true;  // Show the form for adding new staff
        console.error('Staff member not found:', error);
        this.resetForm();
      }
    });
  }

  // Function to reset the form fields
  resetForm() {
    this.staffMember = { name: '', email:this.staffMember.email, roles: [] };
  }


}


// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Component, EventEmitter, Output } from '@angular/core';
// import { StaffmemberService } from '../../services/staffmember.service';

// @Component({
//   selector: 'app-add-staff-members-by-admin',
//   templateUrl: './add-staff-members-by-admin.component.html',
//   styleUrls: ['./add-staff-members-by-admin.component.css']
// })
// export class AddStaffMembersByAdminComponent {

//   @Output() close = new EventEmitter<void>();

//   staffMember = {
//     name: '',
//     email: '',
//     roles: [] as string[]
//   };

//   isStaffMemberChecked: boolean = false;

//   constructor(private http: HttpClient,
//               private staffMemberService: StaffmemberService) {}

//   // Function to handle checkbox changes
//   onCheckboxChange(event: any) {
//     const role = event.target.value; // Role is a string (e.g., 'SUPERVISOR', 'EXAMINER')

//     if (event.target.checked) {
//       // Add the role to the staffMember's roles array if it's not already present
//       if (!this.staffMember.roles.includes(role)) {
//         this.staffMember.roles.push(role);
//       }
//     } else {
//       // Remove the role from the staffMember's roles array
//       const index = this.staffMember.roles.indexOf(role);
//       if (index > -1) {
//         this.staffMember.roles.splice(index, 1);
//       }
//     }
//   }

//   // Function to handle form submission
//   onSubmit() {
//     const params = new HttpParams()
//       .set('name', this.staffMember.name)
//       .set('email', this.staffMember.email)
//       .set('role', this.staffMember.roles.join(','));

//     this.http.post('http://localhost:8080/addStaffMembers', params).subscribe({
//       next: (response) => {
//         console.log('Staff member added successfully:', response);
//         alert('Staff member added successfully!');
//         this.closeAddStaffMembersByAdmin();
//         // Reset the form fields
//         this.resetForm();
//       },
//       error: (error) => {
//         console.error('Error adding staff member:', error);
//         alert('Error adding staff member: ' + error.message);
//       }
//     });
//   }

//   // Check if the staff member already exists
//   onCheckPresentStaffMember() {
//     this.staffMemberService.loadStaffMember(this.staffMember.email).subscribe({
//       next: (staff) => {
//         this.staffMember = staff;
//         this.isStaffMemberChecked = true;
//         console.log('Staff member exists:', staff);
//       },
//       error: (error) => {
//         this.isStaffMemberChecked = false;
//         console.log('Staff member not found:', error);
//         // Reset form if no staff member is found
//         this.resetForm();
//       }
//     });
//   }

//   // Function to reset the form fields
//   resetForm() {
//     this.staffMember = { name: '', email: '', roles: [] };
//     this.isStaffMemberChecked = false;
//   }

//   closeAddStaffMembersByAdmin(): void {
//     this.close.emit();
//   }
// }

