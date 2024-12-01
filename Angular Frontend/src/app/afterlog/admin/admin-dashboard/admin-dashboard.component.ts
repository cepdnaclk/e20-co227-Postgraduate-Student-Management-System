
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(
    private router: Router,
    private renderer: Renderer2) {}


  navigateToEnrolledStudents(){
    this.router.navigate(['afterlog/enrolled-students']);
  }
  navigateToStudentsToAdmin(){
    this.router.navigate(['afterlog/students-to-admin']);
  }
  navigateToSupervisorsToAdmin(){
    this.router.navigate(['afterlog/supervisors-to-admin']);
  }
  navigateToExaminersToAdmin(){
    this.router.navigate(['afterlog/examiners-to-admin']);
  }
  navigateToAssignedSupervisorsToAdmin(){
    this.router.navigate(['afterlog/assigned-supervisors-to-admin']);
  }
  navigateToAssignedExaminersToAdmin(){
    this.router.navigate(['afterlog/assigned-examiners-to-admin']);
  }
  navigateToReportSubmissionsToAdmin(){
    this.router.navigate(['afterlog/report-submissions-to-admin']);
  }
  navigateToVivasToAdmin(){
    this.router.navigate(['afterlog/vivas-to-admin']);
  }

  

  // Add Staff Members By Admin
  isAddStaffMembersByAdminOpen = false;
  openAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = true;
  }
  closeAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = false;
  }

  // Cards according to the screen size
  @HostListener('window:middleContentResize', ['$event'])
  onResizeEvent(event: CustomEvent): void {
    this.adjustCardSize(event.detail);
  }

  adjustCardSize(size: 'full' | 'reduced' = 'reduced'): void {
    const elements = document.querySelectorAll('.card, .icon-container, .function-card, .function-icon-container');


    elements.forEach(element => {
    if (size === 'full') {
      this.renderer.addClass(element, 'full-width');
      this.renderer.removeClass(element, 'reduced-width');
    } else {
      this.renderer.addClass(element, 'reduced-width');
      this.renderer.removeClass(element, 'full-width');
    }
  });
  }


  ngOnInit(): void {
    const sidebarState = localStorage.getItem('sidebarState');

    if (sidebarState === 'full') {
        this.applyFullWidthStyles();
    } else {
        this.applyReducedWidthStyles();
    }
  }

  applyFullWidthStyles(): void {
      // Apply styles for full-width
      const elements = document.querySelectorAll('.card, .icon-container, .function-card, .function-icon-container');
      elements.forEach(element => {
          this.renderer.addClass(element, 'full-width');
          this.renderer.removeClass(element, 'reduced-width');
      });
  }

  applyReducedWidthStyles(): void {
      // Apply styles for reduced-width
      const elements = document.querySelectorAll('.card, .icon-container, .function-card, .function-icon-container');
      elements.forEach(element => {
          this.renderer.addClass(element, 'reduced-width');
          this.renderer.removeClass(element, 'full-width');
      });
  }

}
