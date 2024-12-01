import { Component } from '@angular/core';
import { ProfilePictureService } from '../../afterlog/services/profile-picture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent {

  constructor(private profileService:ProfilePictureService) { }
  
  isUserChecked: boolean = false;

  user = {
    password: '',
    email: ''
  };

  onCheckPresentUser() {
    this.profileService.searchUser(this.user.email).subscribe({
      next: (userExists: boolean) => {
        if (userExists) {
          this.isUserChecked = true;
        } else {
          this.isUserChecked = false;
          Swal.fire({
            html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>No user found with the provided email.</b>',
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
    });
  }

  onSubmit() {
    // Call the service to change the password
    this.profileService.changePassword(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Password changed successfully:', response);
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Password changed successfully!</b>',
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
        // Reset the form or navigate away
      },
      error: (error) => {
        // window.alert('An error occurred while changing the password');
        console.error(error);
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Password changed successfully!</b>',
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
