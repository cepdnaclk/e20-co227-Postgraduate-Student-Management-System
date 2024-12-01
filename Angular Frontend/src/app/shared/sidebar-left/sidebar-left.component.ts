import { Component, Input } from '@angular/core';
import { UserRoleService } from '../../afterlog/services/user-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css']
})
export class SidebarLeftComponent {

  @Input() mode: 'beforeLog' | 'afterLog' = 'afterLog';

  constructor(
    private router: Router, 
    private userRoleService: UserRoleService){
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
    }

  isDropdownActive: boolean = false;
  dropdown1: boolean = false;
  dropdown2: boolean = false;
  dropdown3: boolean = false;
  dropdown4: boolean = false;

  userRole: string | null = null;

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

  isDashboardActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/admin-dashboard' ||
           currentUrl === '/afterlog/student-dashboard' ||
           currentUrl === '/afterlog/supervisor-examiner-dashboard' ||
           currentUrl === '/afterlog/supervisor-dashboard' ||
           currentUrl === '/afterlog/examiner-dashboard';
  }

  navigateToEditProfile() {

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

  isEditProfileActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/edit-profile-for-staff' ||
           currentUrl === '/afterlog/edit-profile'
  }

  navigateToAllNotifications(){
    this.router.navigate(['/afterlog/all-notifications']);
  }

  isAllNotificationActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/all-notifications'
  }

  navigateToEmails(){
    this.router.navigate(['/afterlog/emails-page']);
  }
  isEmailsActive(): boolean {
    const currentUrl = this.router.url;

    // Check if the current URL matches any of the dashboard URLs
    return currentUrl === '/afterlog/emails-page'
  }

}
