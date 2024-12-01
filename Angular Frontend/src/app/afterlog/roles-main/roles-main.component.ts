import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-roles-main',
  templateUrl: './roles-main.component.html',
  styleUrl: './roles-main.component.css'
})
export class RolesMainComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  @HostListener('window:middleContentResize', ['$event'])
  onResizeEvent(event: CustomEvent): void {
    this.adjustContentSize(event.detail);
  }

  adjustContentSize(size: 'full' | 'reduced' = 'reduced'): void {
    const content = document.querySelector('.middle-content');
    if (size === 'full') {
      this.renderer.addClass(content, 'full-width');
      this.renderer.removeClass(content, 'reduced-width');
    } else {
      this.renderer.addClass(content, 'reduced-width');
      this.renderer.removeClass(content, 'full-width');
    }
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
      const element = document.querySelector('.middle-content');
      
      this.renderer.addClass(element, 'full-width');
      this.renderer.removeClass(element, 'reduced-width');
      
  }

  applyReducedWidthStyles(): void {
      // Apply styles for reduced-width
      const element = document.querySelector('.middle-content');
    
      this.renderer.addClass(element, 'reduced-width');
      this.renderer.removeClass(element, 'full-width');

  }
}
