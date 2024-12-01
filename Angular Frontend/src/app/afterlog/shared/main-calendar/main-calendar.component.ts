// import { AfterViewInit, Component } from '@angular/core';
// import { CalendarService } from '../../../services/calendar.service';
// declare var $: any; // Declare jQuery
// import { Event } from '../../../models/event';

// @Component({
//   selector: 'app-main-calendar',
//   templateUrl: './main-calendar.component.html',
//   styleUrl: './main-calendar.component.css'
// })
// export class MainCalendarComponent implements AfterViewInit {
//   constructor(private calendarService: CalendarService) {}

//   ngAfterViewInit(): void {
//     this.calendarService.getUserEvents().subscribe(events => {
//       const calendarEvents = events.map((event: Event) => ({
//         id: event.id,
//         name: event.name,
//         // date: event.startDate,
//         date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
//         description: event.description,
//         type: event.type,
//         color: event.color,
//         everyYear: event.everyYear
//       }));

//       $('#main-calendar').evoCalendar({
//         theme: "Royal Navy",
//         eventDisplayDefault: true,
//         sidebarToggler: true,
//         sidebarDisplayDefault: false,
//         eventListToggler: true,
//         calendarEvents
//       });
//     });
//   }
// }

  // ngAfterViewInit(): void {
  //   $('#main-calendar').evoCalendar({
  //     'theme': "Royal Navy",
  //     'eventDisplayDefault': true,
  //     'sidebarToggler': true,
  //     'sidebarDisplayDefault': false,
  //     'eventListToggler': true,

      // calendarEvents: [
      // {
      //     id: 'bHay68s', // Event's ID (required)
      //     name: "New Year", // Event name (required)
      //     date: "January/1/2020", // Event date (required)
      //     description: "Happy New Year!", // Event description (optional)
      //     type: "holiday", // Event type (required)
      //     everyYear: true // Same event every year (optional)
      // },
      // {
      //     name: "Vacation Leave",
      //     badge: "02/13 - 02/15", // Event badge (optional)
      //     date: ["February/13/2020", "February/15/2020"], // Date range
      //     description: "Vacation leave for 3 days.", // Event description (optional)
      //     type: "event",
      //     color: "#63d867" // Event custom color (optional)
      // },
      // {
      //     name: "Project Presentation",
      //     date: "July/15/2024", // Date
      //     description: "Second Year Project presentation", // Event description (optional)
      //     type: "event",
      //     color: "red" // Event custom color (optional)
      // }
      // ]
  //   });
  // }
  

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import { NewEvent } from '../../../models/new-event';
import Swal from 'sweetalert2';
declare var $: any; // Declare jQuery


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrl: './main-calendar.component.css'
})
export class MainCalendarComponent implements OnInit {

  newEvent: NewEvent = {
    id: '',
    name: '',
    description: '',
    type: '',
    color: '',
    startDate: '',
    endDate: ''
  };

  // Variable to store the last selected event
  public lastSelectedEventId: string | null = null;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    $('#main-calendar').evoCalendar({
      theme: "Royal Navy",
      eventDisplayDefault: true,
      sidebarToggler: true,
      sidebarDisplayDefault: false,
      eventListToggler: true
    });

    // Initial load of events
    this.loadCalendarEvents();

    // Subscribe to real-time events
    // this.calendarService.events$.subscribe(events => {
    //   this.updateCalendarEvents(events);
    // });

    // Subscribe to the last created event
    this.calendarService.lastCreatedEvent$.subscribe(event => {
      if (event) {
        this.addEventToCalendar(event);
      }
    });

    // Attach event listener for 'selectEvent'
    $('#main-calendar').on('selectEvent', (_event: any, activeEvent: any) => {
      console.log('Selected event:', activeEvent);
      this.lastSelectedEventId = activeEvent.id;
    });
  }


  // Create Calendar Event
  isCreateCalendarEventOpen = false;
  openCreateCalendarEvent(): void{
    this.isCreateCalendarEventOpen = true;
  }
  closeCreateCalendarEvent(): void{
    this.isCreateCalendarEventOpen = false;
  }
  // updateCalendarEvents(events: NewEvent[]) {
  //   if (!events || events.length === 0) {
  //     console.error("No events to update.");
  //     return;
  //   }
  
  //   // Clear previous events
  //   $('#main-calendar').evoCalendar('removeCalendarEvent', 'all');

  //   //Fetch all current event IDs to remove
  //   const currentEvents: any[] = $('#main-calendar').evoCalendar('getActiveEvents');

  //   if (currentEvents && currentEvents.length > 0) {
  //     const eventIdsToRemove = currentEvents.map(event => event.id);
  //     $('#main-calendar').evoCalendar('removeCalendarEvent', eventIdsToRemove);
  //   }
    
  //   const calendarEvents = events.map((event: NewEvent) => ({
  //     id: event.id.toString(),
  //     name: event.name,
  //     date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
  //     description: event.description,
  //     type: event.type,
  //     color: event.color
  //   }));
  
  //   console.log('Formatted Eventssss:', calendarEvents);
  //   $('#main-calendar').evoCalendar('removeCalendarEvent', 'all');
  
  //   // Add the new events to the calendar
  //   $('#main-calendar').evoCalendar('addCalendarEvent', calendarEvents);
  // }


  // Method to add a single event to the calendar
  addEventToCalendar(event: NewEvent) {
    $('#main-calendar').evoCalendar('addCalendarEvent', {
      id: event.id,
      name: event.name,
      date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
      description: event.description,
      type: event.type,
      color: event.color
    });
  }
  
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
  
      $('#main-calendar').evoCalendar('addCalendarEvent', calendarEvents);
    });
  }
  
  // loadCalendarEvents() {
  //   this.calendarService.getUserEvents().subscribe(); // Fetch events from the server
  // }

  // Method to delete the last selected event
  deleteLastSelectedEvent() {
    if (this.lastSelectedEventId) {
      this.deleteEvent(this.lastSelectedEventId);
    } else {
      Swal.fire({
        html: '<i class="fas fa-circle-info" style="font-size: 30px; color: blue; margin-bottom: 8px;"></i><br> <b>No event selected for deletion.</b>',
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

  // Method to delete an event
  deleteEvent(eventId: string) {
    this.calendarService.deleteEvent(eventId).subscribe({
      next: () => {
        // Remove the event from EvoCalendar
        $('#main-calendar').evoCalendar('removeCalendarEvent', eventId);

        // Update the event list
        // this.events = this.events.filter(event => event.id !== eventId);
      },
      error: (error) => {
        console.error('Error deleting event:', error);
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error deleting event.</b>',
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
    });
  }
}

