import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examiner-dashboard',
  templateUrl: './examiner-dashboard.component.html',
  styleUrl: './examiner-dashboard.component.css'
})
export class ExaminerDashboardComponent {

  constructor(private router: Router, private renderer: Renderer2 ) {}

  navigateToStudents(){
    this.router.navigate(['afterlog/students-to-examiner']);
  }

  navigateToReportSubmission(){
    this.router.navigate(['#']);
  }

  // Cards
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
