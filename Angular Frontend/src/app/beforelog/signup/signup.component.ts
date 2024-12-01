import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { NgForm } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router , private signupService : SignupService) {}

  navigateToLogin() {
    this.router.navigate(['beforelog/login']);
  }

  signupData = {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  };
  errorMessage: string = '';

  
  onSubmit(form: NgForm) {
    this.signupService.signup(this.signupData).subscribe({
      next: (response) => {
        //alert('Signup successful! Redirecting to login page...');
        this.router.navigate(['beforelog/login']); // Programmatically navigate to login pag
      },
      error: (error) => {
        console.error('Signup error:', error.message);
        if (error.status === 409) {
          Swal.fire({
            html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>Username already exists. Please choose another.</b>',
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
        } else {
          NONE_TYPE
        }
      }
    });

    if (form.invalid) {
      this.errorMessage = 'Fill all the fields';
    } else if (form.value.password !== form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.errorMessage = '';
      console.log('Form Submitted', form.value);
    }
  }
}

