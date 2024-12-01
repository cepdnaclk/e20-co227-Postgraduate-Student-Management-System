import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../../../models/student';
import { UserRoleService } from '../../services/user-role.service';
import { ProfilePictureService } from '../../services/profile-picture.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{
  userIdId: number | null = null;
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userRoleService: UserRoleService,
    private profilePictureService: ProfilePictureService) {}

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadUserData();
    const userIdId = this.userRoleService.getUserIdId();
    if (userIdId !== null) {
      this.userIdId = userIdId;
      this.loadProfilePicture(this.userIdId);
      console.log('User ID:', this.userIdId);
    } else {
      console.log('User ID is null');
      // Handle the case when id is null, if needed
    }
    
  }

  navigateToPasswordChange(){
    this.router.navigate(['/afterlog/password-change']);
  }

  student: Student = {
    regNumber: '',
    registrationNumber: '',
    nameWithInitials: '',
    contactNumber: '',
    email: '',
    address: '',
    university: '',
    programOfStudy: '',
    status: '',
    registeredDate: undefined
}

  loadUserData() {
    const token = localStorage.getItem; // Replace with actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Student>('http://localhost:8080/profile-student', { headers })
      .subscribe(
        (studentData) => {
          this.student = studentData;
        },
        (error) => {
          console.error('Error loading user data:', error);
        }
      );
  }
 
  onEditProfileSubmit() {
    const userId = this.userRoleService.getUserId();
    //To have edit option
    if (userId !== null) {
      this.userId = userId;
      /////////////
      // Update the non-disabled fields
      const updateData = {
        nameWithInitials: this.student.nameWithInitials,
        contactNumber: this.student.contactNumber,
        email: this.student.email,
      };

      this.http.put(`http://localhost:8080/profile/student/update/${this.userId}`, updateData)
        .subscribe(
          response => {
            console.log('Profile updated successfully:', response);
          },
          error => {
            console.error('Error updating profile:', error);
          }
        );
      } else {
        console.log('User ID is null');
    }

    // Handle form submission logic here
    if (this.deletePictureChecked) {
      this.deleteProfilePicture();
    } else {
      console.log('Profile picture deletion is not checked.');
    }

    if (this.userIdId !== null) {
      this.loadProfilePicture(this.userIdId);
    }
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && this.userIdId !== null) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      
      this.http.post(`http://localhost:8080/profile/updatePicture/${this.userIdId}`, formData)
        .subscribe(response => {
          console.log('Profile picture uploaded successfully', response);
          this.loadUserData(); // Reload user data to reflect changes
        }, error => {
          console.error('Error uploading profile picture', error);
        });
    }
  }

  profilePictureUrl: string | null = null;
  isThereProfilePicture: boolean = false;

  loadProfilePicture(userId: number) {
    this.http.get(`http://localhost:8080/profile/picture/${userId}`, { responseType: 'blob' })
      .subscribe(
        (response) => {
            // Create a URL for the image blob
            const url = window.URL.createObjectURL(response);
            this.profilePictureUrl = url;
            this.isThereProfilePicture = true;
            this.profilePictureService.notifyProfilePictureUpdated(true);
        },
        (error) => {
            console.error('Error loading profile picture:', error);
            // this.profilePictureUrl = 'fa fa-circle-user';
            this.isThereProfilePicture = false;
            this.profilePictureService.notifyProfilePictureUpdated(false);
        }
      );
  }

deletePictureChecked: boolean = false;

deleteProfilePicture(): void {
  if (this.deletePictureChecked) {
    if (this.userIdId !== null) {
      this.http.delete<string>(`http://localhost:8080/profile/picture/delete/${this.userIdId}`).subscribe(
        (response) => {
          console.log(response);  // Success message
          // this.profilePictureUrl = 'path-to-default-image.jpg';
          this.isThereProfilePicture = false;

        },
        (error) => {
          console.error('Error deleting profile picture:', error);
        }
      );
    } else {
      console.error('User ID is null, cannot delete profile picture.');
    }
  } else {
    console.error('Checkbox not checked, cannot delete profile picture.');
  }
}
  
}
