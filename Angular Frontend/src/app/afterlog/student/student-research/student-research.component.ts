import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import { LoadingTile, Section, Tile } from '../../../models/section.model';
import { Student } from '../../../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-student-research',
  templateUrl: './student-research.component.html',
  styleUrl: './student-research.component.css'
})
export class StudentResearchComponent implements OnInit{

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

  loadingTile: LoadingTile = {
    id: 0,
    type: '',
    title: ''
  }

  activeTab: string = 'tab1';
  loadingSections: { buttonName: string, loadingTiles: { id: number, type: string, title: string }[] }[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private collapsibleSectionService: CollapsibleSectionService,
    private userRoleService : UserRoleService){
      this.userRoleService.userId$.subscribe(id => {
        this.userId = id;
      });
    }

  userId: string | null = null; // Variable of the user ID & Initialize
  supervisorName: string = '';
  
  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    scrollTo(0, 0);

    // Retrieve activeTab from localStorage if it exists
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      this.activeTab = storedTab;
    } else {
      this.activeTab = 'tab1'; // Set default tab
    }

    if (this.userId) {
      this.loadStudentProfile(this.userId);
      this.loadSupervisorName(this.userId);
      this.loadSections(this.userId, this.activeTab);
    } else {
      console.warn('No regNumber found in route parameters.');
    }
  }

  // Tabs
  selectTab(tab: string) {
    this.activeTab = tab;

    // Store the activeTab in localStorage
    localStorage.setItem('activeTab', this.activeTab);

    if (this.userId) {
      this.loadSections(this.userId, this.activeTab);
    } else {
      console.error('Registration number is null.');
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

  // Load Supervisor Name
  loadSupervisorName(regNumber: string) {
    this.http.get<string>(`http://localhost:8080/supervisor/students/${regNumber}/supervisor`, { responseType: 'text' as 'json' })
      .subscribe({
        next: (supervisorName) => {
          this.supervisorName = supervisorName;
        },
        error: (error) => {
          if (error.status === 404) {
            this.supervisorName = "No supervisor assigned";
          } else {
            console.error('Error fetching supervisor name', error);
          }
        },
        complete: () => {
          console.log('Supervisor name fetching complete');
        }
      });
  }

  // Load Sections data of a student from the backend
  loadSections(regNumber: string , activeTab: string): void {

    this.collapsibleSectionService.getSections(regNumber, activeTab).subscribe({
      next: (data) => {
        this.loadingSections = data.map(section => ({
          buttonName: section.buttonName, // Adjust these field names according to your backend response
          loadingTiles: section.tiles.map((tile: LoadingTile) => ({
            id: tile.id, // Adjust these field names according to your backend response
            type: tile.type, // Adjust these field names according to your backend response
            title: tile.title
          }))
        }));
        console.log('Sections loaded successfully', this.loadingSections);
      },
      error: (error) => {
        console.error('Error loading sections', error);
      }
    });
  }
}
