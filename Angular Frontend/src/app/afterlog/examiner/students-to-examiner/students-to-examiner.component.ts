import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-students-to-examiner',
  templateUrl: './students-to-examiner.component.html',
  styleUrl: './students-to-examiner.component.css'
})
export class StudentsToExaminerComponent {
  userIdId: number | null = null;

  constructor(private router: Router,
              private http: HttpClient,
              private userRoleService: UserRoleService
  ) {}

  // Load the assigned examiners on component initialization
  ngOnInit(): void {
    scrollTo(0, 0); // Scroll to the top of the page
    const userIdId = this.userRoleService.getUserIdId();
    if (userIdId !== null) {
      this.userIdId = userIdId;
      this.getAssignedExaminers(this.userIdId);
      console.log('User ID:', this.userIdId);
    } else {
      console.log('User ID is null');
      // Handle the case when id is null, if needed
    }
  }

    // Fetch assigned examiners from the backend
    getAssignedExaminers(userId: number): void {
      this.http.get<Array<{ regNumber: string,registrationNumber: string, nameWithInitials: string,id: number, title: string, submissionStatus:string, deadlineToReview: Date }>>(`http://localhost:8080/getAllSubmissions-examiner/${userId}`)
        .subscribe(data => {
          this.tableData = data;
          console.log(this.tableData);
        }, error => {
          console.error('Error fetching assigned examiners', error);
        });
    }
  

  searchText: string = '';
  // tableData: Array<{ column1: string, column2: string, column3: string, column4: string, column5: string }> = [
  //   { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None', column5: 'Yes' },
  //   { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular', column5: 'No' },
  //   { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3', column5: 'More data' }
  //   // Add more data as needed
  // ];

  tableData: Array<{ 
    regNumber: string,
    registrationNumber: string,
    nameWithInitials: string,
    id:number,
    title: string,
    submissionStatus: string,
    deadlineToReview: Date
  }> = [];

// Filter data based on the search input
get filteredData() {
  return this.tableData.filter(row =>
    row.regNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
    row.title.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

  // navigateToStudentProfileToExaminer(){
  //   this.router.navigate(['afterlog/student-profile-to-examiner']);
  // }
}
