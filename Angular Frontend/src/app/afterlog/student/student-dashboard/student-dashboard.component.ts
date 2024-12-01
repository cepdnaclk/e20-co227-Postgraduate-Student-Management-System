import { Component, HostListener, Renderer2} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent{

  constructor(private router: Router, private renderer: Renderer2) {}

  navigateToStudentResearch(){
    this.router.navigate(['afterlog/student-research']);
  }

  navigateToStudentCourses(){
    this.router.navigate(['afterlog/student-courses']);
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

