import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl =  'http://localhost:8080/notifications';

  // BehaviorSubject to store the unread count
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUnreadCount();
  }

  //Fetch unread notifications fron the backend
  getUnreadNotifications(): Observable<string> {
    return this.http.get(this.apiUrl + '/unread', { responseType: 'text' });
}


  //Fetch unread notifications fron the backend
  getUnreadNotificationsforPage(): Observable<string> {
    return this.http.get(this.apiUrl + '/forPage', { responseType: 'text' });
}

  // Fetch the count of unread notifications from the backend
  getUnreadNotificationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/unread/count`);
  }

  // Mark a specific notification as read
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/markAsRead/${notificationId}`, null).pipe(  // Backend expects PUT to update notification status

      tap(() => {
        //Decrease the unread count by 1
        this.decrementUnreadCount();
      })
    );
  }

  // Method to update the unread count from the backend
  private loadUnreadCount(): void {
    this.getUnreadNotificationCount().subscribe(count => {
      this.unreadCountSubject.next(count);
    });
  }

  // Method to decrement the unread count
  private decrementUnreadCount(): void {
    const currentCount = this.unreadCountSubject.value;
    this.unreadCountSubject.next(currentCount > 0 ? currentCount - 1 : 0);
  }
}
