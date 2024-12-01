import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoleService } from '../afterlog/services/user-role.service';
import { switchMap, tap } from 'rxjs/operators';
import { NewEvent } from '../models/new-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private eventsSubject = new BehaviorSubject<NewEvent[]>([]);
  public events$ = this.eventsSubject.asObservable(); // Expose as an observable for real-time updates

  private lastCreatedEventSubject = new BehaviorSubject<NewEvent | null>(null);
  public lastCreatedEvent$ = this.lastCreatedEventSubject.asObservable();

  constructor(private http: HttpClient, private userRoleService: UserRoleService) {}

  private apiUrl = 'http://localhost:8080';

  // Fetch events and update the BehaviorSubject
  getUserEvents(): Observable<NewEvent[]> {
    return this.userRoleService.userId$.pipe(
      switchMap(userId => {
        if (userId) {
          return this.http.get<NewEvent[]>(`${this.apiUrl}/events/${userId}`).pipe(
            tap(events => this.eventsSubject.next(events)) // Update the events in BehaviorSubject
          );
        } else {
          return [];
        }
      })
    );
  }

  // Create a new event and update BehaviorSubject
  createEvent(event: NewEvent): Observable<NewEvent> {
    return this.http.post<NewEvent>(`${this.apiUrl}/create-event`, event).pipe(
      tap(newEvent => {
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next([...currentEvents, newEvent]); // Add the new event to the existing events
        this.lastCreatedEventSubject.next(newEvent);
      })
    );
  }

  // Delete an event
  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-event/${eventId}`).pipe(
      tap(() => {
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next(currentEvents.filter(event => event.id !== eventId)); // Update the event list in the BehaviorSubject
      })
    );
  }

  // Delete an event and update BehaviorSubject
  // deleteEvent(eventId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/events/${eventId}`).pipe(
  //     tap(() => {
  //       const currentEvents = this.eventsSubject.value;
  //       this.eventsSubject.next(currentEvents.filter(event => event.id !== eventId)); // Remove the deleted event
  //     })
  //   );
  // }

  // constructor(private http: HttpClient , private userRoleService: UserRoleService) { }

  // private apiUrl = 'http://localhost:8080';

  // getUserEvents(): Observable<Event[]> {
  //   return this.userRoleService.userId$.pipe(
  //     switchMap(userId => {
  //       if (userId) {
  //         return this.http.get<Event[]>(`${this.apiUrl}/events/${userId}`);
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }

  // createEvent(event: Event): Observable<Event> {
  //   return this.http.post<Event>(this.apiUrl, event);
  // }

  // deleteEvent(eventId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  // }
}
