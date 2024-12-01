import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { AuthServiceService } from '../../../services/auth-service.service';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import { LoadingTile, Section, Tile } from '../../../models/section.model';
import { UserRoleService } from '../../services/user-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile-to-admin',
  templateUrl: './student-profile-to-admin.component.html',
  styleUrls: ['./student-profile-to-admin.component.css']
})
export class StudentProfileToAdminComponent implements OnInit {

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

  section: Section={
    id: 0,
    buttonName: '',
    tiles: []
  }

  tile: Tile = {
    type: '',
    title: ''
  }

  loadingTile: LoadingTile = {
    id: 0,
    type: '',
    title: ''
  }

  regNumber: string | null = null;
  supervisorName: string = '';
  hasSupervisor: boolean = false;
  activeTab: string = 'tab1';

  sections: { buttonName: string, tiles: { type: string, title: string }[] }[] = [];
  loadingSections: { id: number, buttonName: string, loadingTiles: { id: number, type: string, title: string }[] }[] = [];

  userRole: string | null = null; // Assuming you get the user role from some service

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthServiceService,
    private collapsibleSectionService: CollapsibleSectionService,
    private userRoleService: UserRoleService
  ) {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    // scrollTo(0, 0);

    this.regNumber = this.route.snapshot.paramMap.get('regNumber');
    console.log('Retrieved regNumber from route params:', this.regNumber);

    // Retrieve activeTab from localStorage if it exists
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      this.activeTab = storedTab;
    } else {
      this.activeTab = 'tab1'; // Set default tab
    }
    
    if (this.regNumber) {
      console.log('Loading student profile for regNumber:', this.regNumber);
      this.loadStudentProfile(this.regNumber);
      this.loadSections(this.regNumber, this.activeTab);
      this.loadSupervisorName(this.regNumber);
    } else {
      console.warn('No regNumber found in route parameters.');
    }
  }

  // Load student profile data from the backend
  loadStudentProfile(regNumber: string): void {
    console.log('Making HTTP GET request to load student profile for regNumber:', regNumber);
    
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


  // Load Sections data of a student from the backend
  loadSections(regNumber: string , activeTab: string): void {
    console.log('Active Tab' + activeTab);
    this.collapsibleSectionService.getSections(regNumber, activeTab).subscribe({
      next: (data) => {
        this.loadingSections = data.map(section => ({
          id: section.id,
          buttonName: section.buttonName, // Adjust these field names according to your backend response
          loadingTiles: section.tiles.map((tile: LoadingTile) => ({
            id: tile.id, // Adjust these field names according to your backend response
            type: tile.type, // Adjust these field names according to your backend response
            title: tile.title
          }))
        }));

        // Populate sections with the same data, adjusting the structure if necessary
        this.sections = this.loadingSections.map(loadingSection => ({
          id: loadingSection.id,
          buttonName: loadingSection.buttonName,
          tiles: loadingSection.loadingTiles.map(loadingTile => ({
            type: loadingTile.type,
            title: loadingTile.title
          }))
        }));

        console.log('Sections loaded successfully', this.loadingSections);
      },
      error: (error) => {
        console.error('Error loading sections', error);
      }
    });
  }

  loadSupervisorName(regNumber: string) {
    this.http.get<string>(`http://localhost:8080/supervisor/students/${regNumber}/supervisor`, { responseType: 'text' as 'json' })
      .subscribe({
        next: (supervisorName) => {
          this.supervisorName = supervisorName;
          this.hasSupervisor = true;
        },
        error: (error) => {
          if (error.status === 404) {
            this.supervisorName = "No supervisor assigned";
            this.hasSupervisor = false;
          } else {
            console.error('Error fetching supervisor name', error);
          }
        },
        complete: () => {
          console.log('Supervisor name fetching complete');
        }
      });
  }
  
  


  isModalOpen = false;
  // sections: { buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }[] = [
  //   {
  //     buttonName: 'General2',
  //     tiles: [
  //       { type: 'forum', title: 'Forum 2', routerLink: '/afterlog/feedback-page' },
  //       { type: 'submission', title: 'Submission 2', routerLink: '/afterlog/assignment-submission' }
  //     ]
  //   }
  // ];

  openModal(): void {
    if(this.hasSupervisor){
      this.isModalOpen = true;
    }
    else{
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>Please assign a supervisor.</b>',
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

  closeModal(): void {
    this.isModalOpen = false;
  }

  addNewSection(newSection: { buttonName: string, tiles: { type: string, title: string }[] }): void {
    this.sections.push(newSection);
    this.closeModal();
  }


  isAssignSupervisorByAdminOpen = false;
  openAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = true;
  }
  closeAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = false;
  }
  // Method to handle the event when a supervisor is assigned
  onSupervisorAssigned(newSupervisorName: string): void {
    this.supervisorName = newSupervisorName;
    this.hasSupervisor = true; // Set hasSupervisor to true if a supervisor is assigned
  }

  // Tabs
  selectTab(tab: string) {
    this.activeTab = tab;

    // Store the activeTab in localStorage
    localStorage.setItem('activeTab', this.activeTab);

    if (this.regNumber) {
      this.loadSections(this.regNumber, this.activeTab);
    } else {
      console.error('Registration number is null.');
    }
  }

  // Edit Student Profile header
  isEditStudentProfileBoxHeaderOpen = false;
  openEditStudentProfileBoxHeader(): void {
    this.isEditStudentProfileBoxHeaderOpen = true;
  }
  closeEditStudentProfileBoxHeader(): void {
    this.isEditStudentProfileBoxHeaderOpen = false;
  }
  // Update student details in real time
  updateStudentDetails(updatedStudent: Student): void {
    this.student = updatedStudent; // Update the student data in the parent component
    this.closeEditStudentProfileBoxHeader(); // Close the edit box
  }


// Helper function to format the date
formatDate(date: Date | string | undefined): string {
  if (!date) {
    return ''; // Return an empty string or a placeholder if the date is undefined
  }

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };

  return parsedDate.toLocaleString('en-US', options);
}


}
