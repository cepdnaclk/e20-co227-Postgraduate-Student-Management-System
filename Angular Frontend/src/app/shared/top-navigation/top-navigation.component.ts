import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserRoleService } from '../../afterlog/services/user-role.service';
import { NotificationService } from '../../services/notification.service';
import { ProfilePictureService } from '../../afterlog/services/profile-picture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private userRoleService: UserRoleService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private profilePictureService: ProfilePictureService,
    private authService: AuthServiceService

  ) {}

  userRole: string | null = null; // Variable of the user Role & Initialize with null
  userId: string | null = null; // Variable of the user ID & Initialize
  userIdId: number | null = null; // Variable of the user ID & Initialize
  unreadCount: number = 0;

  @Input() mode: 'beforeLog' | 'login' | 'afterLog' = 'afterLog';

  ngOnInit(): void {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    this.userRoleService.userId$.subscribe(id => {
      this.userId = id;
    });
    this.loadUnreadNotifications();
    // Subscribe to unreadCount$ to get the latest count
    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    this.userRoleService.userIdId$.subscribe(idId => {
      this.userIdId = idId;
    });

    if (this.userIdId !== null) {
      this.loadProfilePicture(this.userIdId);
    }

    // Subscribe to listen for profile picture updates
    this.profilePictureService.profilePictureUpdated$.subscribe(isLoaded => {
      if (isLoaded) {
        if (this.userIdId !== null) {
          this.loadProfilePicture(this.userIdId);
        }
      } else {
        if (this.userIdId !== null) {
          this.loadProfilePicture(this.userIdId);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeNotificationPanel();
  }

  // Method to load unread notifications count
  loadUnreadNotifications(): void {
    this.notificationService.getUnreadNotificationCount().subscribe(count => {
      this.unreadCount = count;
    }, error => {
      console.error('Error fetching unread notification count', error);
    });
  }

  logout() {
    this.http.post('http://localhost:8080/logout', {}, { withCredentials: true }).subscribe({
      next: () => {

        // Use AuthService to clear the token
        this.authService.logout();
        // Clear role in the service
        this.userRoleService.clearUserRole();

        sessionStorage.clear();
        localStorage.clear();

        // Optional: Clear cookies if used
        this.clearCookies();

        // Redirect to login page
        this.router.navigate(['/beforelog/login']).then(() => {
          window.location.reload(); // Ensure the page reloads to enforce fresh state
        });

        // // Clear browser cache and navigate to login page
        // this.clearBrowserCacheAndRedirect();
      },
      error: (error) => {
        console.error('Logout failed:', error);
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Logout failed. Please try again.</b>',
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
      },
      complete: () => {
        console.log('Logout request completed.');
      }
    });
  }

  // Optional: Clear cookies if authentication uses them
  clearCookies() {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }

  // // Method to clear browser cache and redirect after logout
  // clearBrowserCacheAndRedirect() {
  //   sessionStorage.clear();
  //   localStorage.clear();

  //   // Replace history state to prevent back navigation
  //   window.history.replaceState({}, '', '/beforelog/login');
  //   this.router.navigate(['/beforelog/login']).then(() => {
  //     window.location.reload(); // Reload to enforce fresh navigation
  //   });
  // }


  navigateToLogin() {
    this.logout(); // Call logout when navigating to login
  }



  navigateToEnroll() {
    this.router.navigate(['/beforelog/enroll']);
  }

  isShowLeftNavBar = false;
  toggleLeftNavBar(){
    this.isShowLeftNavBar = !this.isShowLeftNavBar;
  }

  navigateToDashboard() {

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/afterlog/admin-dashboard']);
    } else if (this.userRole === 'STUDENT') {
      this.router.navigate(['/afterlog/student-dashboard']);
    } else if (this.userRole === 'SUPERVISOR-EXAMINER') {
      this.router.navigate(['/afterlog/supervisor-examiner-dashboard']);
    } else if (this.userRole === 'SUPERVISOR') {
      this.router.navigate(['/afterlog/supervisor-dashboard']);
    } else if (this.userRole === 'EXAMINER') {
      this.router.navigate(['/afterlog/examiner-dashboard']);
    } else {
      console.error('Unknown role:', this.userRole);
    }
  }

  navigateToHome() {
    this.router.navigate(['/beforelog/welcome']);
  }

  navigateToEditProfile() {

    console.log('User role:', this.userRole);
    console.log('User ID:', this.userId);

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else if (this.userRole === 'STUDENT') {
      this.router.navigate(['/afterlog/edit-profile']);
    } else if (this.userRole === 'SUPERVISOR-EXAMINER') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else if (this.userRole === 'SUPERVISOR') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else if (this.userRole === 'EXAMINER') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else {
      console.error('Unknown role:', this.userRole);
    }
  }

  navigateToEmails(){
    this.router.navigate(['/afterlog/emails-page']);
  }
  isEmailsActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/emails-page'
  }


  initializeNotificationPanel(): void {
    const notificationButton = document.getElementById('notificationButton');
    const notificationPanel = document.getElementById('notificationPanel');

    if (notificationButton && notificationPanel) {
      notificationButton.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', (event) => {
        const isClickInside = notificationPanel.contains(event.target as Node) || notificationButton.contains(event.target as Node);
        if (!isClickInside) {
          notificationPanel.style.display = 'none';
        }
      });
    }
  }

  // Sidebar when minimized
  isDropdownActive: boolean = false;
  dropdown1: boolean = false;
  dropdown2: boolean = false;
  dropdown3: boolean = false;
  dropdown4: boolean = false;

  toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  toggleDropdown1(): void {
    this.dropdown1 = !this.dropdown1;
  }
  toggleDropdown2(): void {
    this.dropdown2 = !this.dropdown2;
  }
  toggleDropdown3(): void {
    this.dropdown3 = !this.dropdown3;
  }
  toggleDropdown4(): void {
    this.dropdown4 = !this.dropdown4;
  }

  isDashboardActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/admin-dashboard' ||
           currentUrl === '/afterlog/student-dashboard' ||
           currentUrl === '/afterlog/supervisor-examiner-dashboard' ||
           currentUrl === '/afterlog/supervisor-dashboard' ||
           currentUrl === '/afterlog/examiner-dashboard';
  }


  isEditProfileActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/edit-profile-for-staff' ||
           currentUrl === '/afterlog/edit-profile'
  }

  // Handle Profile Picture
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
        },
        (error) => {
            console.error('Error loading profile picture:', error);
            // this.profilePictureUrl = 'fa fa-circle-user';
            this.isThereProfilePicture = false;
        }
      );
  }
}
