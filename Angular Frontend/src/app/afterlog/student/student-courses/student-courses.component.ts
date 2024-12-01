import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { UserRoleService } from '../../services/user-role.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent {

  student: Student = {
    registrationNumber: '',
    regNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: ''
  };

  userId: string | null = null;
  
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private userRoleService : UserRoleService){
      this.userRoleService.userId$.subscribe(id => {
        this.userId = id;
      });
    }
  

  ngOnInit(): void {
    scrollTo(0, 0);

    if (this.userId) {
      this.loadStudentProfile(this.userId);
    } else {
      console.warn('No regNumber found in route parameters.');
    }

  }

  // Load student profile data from the backend
  loadStudentProfile(regNumber: string): void {
    
    // Encode the regNumber to handle any special characters
    const encodedRegNumber = encodeURIComponent(regNumber);
  
    const token = this.authService.getToken(); // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get<Student>(`http://localhost:8080/studentProfileForAdmin/${encodedRegNumber}`, { headers })
      .subscribe({
        next: (data) => {
          console.log('Student data successfully retrieved:', data);
          this.student = data;
        },
        error: (error) => {
          console.error('Error loading student data:', error);
          switch (error.status) {
            case 401:
              console.error('Unauthorized access - check your token');
              break;
            case 403:
              console.error('Forbidden access - insufficient permissions');
              break;
            case 404:
              console.error('Student not found for regNumber:', regNumber);
              break;
            default:
              console.error('Unexpected error occurred:', error.message || error);
          }
        },
        complete: () => {
          console.log('Student data loading process complete.');
        }
      });
  }

}
