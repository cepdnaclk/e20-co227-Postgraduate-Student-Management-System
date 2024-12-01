import { AfterViewInit, Component, ElementRef, Renderer2,  } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import { NewEvent } from '../../../models/new-event';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css'
})
export class SidebarRightComponent implements AfterViewInit {

  newEvent: NewEvent = {
    id: '',
    name: '',
    description: '',
    type: '',
    color: '',
    startDate: '',
    endDate: ''
  };

  userRole: string | null = null;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private calendarService: CalendarService,
    private userRoleService: UserRoleService) { 
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
    }

  ngAfterViewInit(): void {
    this.initializeSidebar();

    $('#sidebar-calendar').evoCalendar({
      'theme': "Royal Navy",
      'eventDisplayDefault': false,
      'sidebarToggler': false,
      'sidebarDisplayDefault': false,
      'eventListToggler': false
    });

    // Initial load of events
    this.loadCalendarEvents();

    // Subscribe to the last created event
    this.calendarService.lastCreatedEvent$.subscribe(event => {
      if (event) {
        this.addEventToCalendar(event);
      }
    });

  }

  // Navigate to the calendar from the sidebar
  navigateToCalendar(): void {

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/afterlog/admin-dashboard']).then(() => {
        window.scrollTo(0, 950);
      });
    } else if (this.userRole === 'STUDENT') {
      this.router.navigate(['/afterlog/student-dashboard']).then(() => {
        window.scrollTo(0, 300);
      });
    } else if (this.userRole === 'SUPERVISOR-EXAMINER') {
      this.router.navigate(['/afterlog/supervisor-examiner-dashboard']).then(() => {
        window.scrollTo(0, 300);
      });
    } else if (this.userRole === 'SUPERVISOR') {
      this.router.navigate(['/afterlog/supervisor-dashboard']).then(() => {
        window.scrollTo(0, 300);
      });
    } else if (this.userRole === 'EXAMINER') {
      this.router.navigate(['/afterlog/examiner-dashboard']).then(() => {
        window.scrollTo(0, 300);
      });
    } else {
      console.error('Unknown role:', this.userRole);
    }
  }

  initializeSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('#rightSidebar');
    const hideSidebarBtn = this.el.nativeElement.querySelector('#hideSidebarBtn');
    const showSidebarBtn = this.el.nativeElement.querySelector('#showSidebarBtn');

    // Set initial state based on localStorage
    const savedState = localStorage.getItem('sidebarState');

    // if (window.innerWidth > 800) {

    if (savedState === 'full') {
        this.renderer.addClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'block');
      
    } else {
        // Default to 'reduced' if no state is saved
        this.renderer.removeClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'none');
    }

    this.renderer.listen(hideSidebarBtn, 'click', () => {
        console.log('Hide button clicked');
        this.renderer.addClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'block');
        localStorage.setItem('sidebarState', 'full');
        this.dispatchResizeEvent('full');
    });

    this.renderer.listen(showSidebarBtn, 'click', () => {
        console.log('Show button clicked');
        this.renderer.removeClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'none');
        localStorage.setItem('sidebarState', 'reduced');
        this.dispatchResizeEvent('reduced');
    });
  }

  private dispatchResizeEvent(size: 'full' | 'reduced'): void {
    const event = new CustomEvent('middleContentResize', { detail: size });
    window.dispatchEvent(event);
  }

  // Load calendar Events
  loadCalendarEvents() {
    this.calendarService.getUserEvents().subscribe(events => {
      const calendarEvents = events.map(event => ({
        id: event.id,
        name: event.name,
        date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
        description: event.description,
        type: event.type,
        color: event.color
      }));  
      $('#sidebar-calendar').evoCalendar('addCalendarEvent', calendarEvents);
    });
  }

  // Method to add a single event to the calendar
  addEventToCalendar(event: NewEvent) {
    $('#sidebar-calendar').evoCalendar('addCalendarEvent', {
      id: event.id,
      name: event.name,
      date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
      description: event.description,
      type: event.type,
      color: event.color
    });
  }
}

