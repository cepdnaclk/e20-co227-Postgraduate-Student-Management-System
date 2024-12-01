import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
import { NewEvent } from '../../../models/new-event';
import Swal from 'sweetalert2';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-create-calendar-event',
  templateUrl: './create-calendar-event.component.html',
  styleUrl: './create-calendar-event.component.css'
})
export class CreateCalendarEventComponent {

  @Output() close = new EventEmitter<void>();

  event: NewEvent = {
    id: '',
    name: '',
    description: '',
    type: '',
    color: '',
    startDate: '',
    endDate: ''
  };

  constructor(private calendarService: CalendarService) {}

  onSubmit() {
    this.calendarService.createEvent(this.event).subscribe({
      next: (newEvent) => {
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Event added successfully!</b>',
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
        this.closeCreateCalendarEvent();
        this.event = { id: '', name: '', description: '', type: '', color: '', startDate: '', endDate: '' };
      },
      error: (error) => {
        Swal.fire({
          html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error adding event!</b>',
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

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }

  // @Output() close = new EventEmitter<void>();
  // @Output() eventCreated = new EventEmitter<void>();

  // event = {
  //   name: '',
  //   description: '',
  //   type: '',
  //   colour: '',
  //   startDate: '',
  //   endDate: '',
  //   //everyYear: '',
  // };

  // constructor(private http: HttpClient) {}


  // // Function to handle form submission
  // onSubmit() {
  //   const eventPayload = {
  //     name: this.event.name,
  //     description: this.event.description,
  //     type: this.event.type,
  //     colour: this.event.colour,
  //     startDate: this.event.startDate,
  //     endDate: this.event.endDate
  //   };

  //   this.http.post('http://localhost:8080/create-event', eventPayload, {
  //     headers: { 'Content-Type': 'application/json' }
  //   }).subscribe({
  //     next: (response) => {
  //       console.log('Event added successfully:', response);
  //       alert('Event added successfully!');

  //       // Emit event to notify parent component
  //       this.eventCreated.emit();

  //       this.closeCreateCalendarEvent();
  //       // Reset the form fields
  //       this.event = { name: '', description: '', type: '', colour: '', startDate: '', endDate: '' };
  //     },
  //     error: (error) => {
  //       console.error('Error adding event:', error);
  //       alert('Error adding event: ' + error.message);
  //     }
  //   });
  // }
  

  // closeCreateCalendarEvent(): void {
  //   this.close.emit();
  // }
}
