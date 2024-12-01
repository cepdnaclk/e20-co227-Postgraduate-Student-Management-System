import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.css'
})
export class AllNotificationsComponent implements OnInit {
  // notifications: any[] = []; 

  // constructor(private notificationService: NotificationService) {}

  // ngOnInit() {
  //   // Fetch unread notifications from the database and parse them into an array
  //   this.notificationService.getUnreadNotificationsforPage().subscribe(unreadNotifications => {
  //     this.notifications = this.parseNotifications(unreadNotifications);
  //     console.log(this.notifications);
  //   });
  // }

  //   // Method to parse a string into an array of notification objects (e.g., from JSON)
  //   parseNotifications(unreadNotifications: string): any[] {
  //     // Example: Assumes unreadNotifications is a JSON string
  //     try {
  //       return JSON.parse(unreadNotifications);
  //     } catch (error) {
  //       console.error("Error parsing unread notifications: ", error);
  //       return [];
  //     }
  //   }

  notifications: any[] = []; // Stores parsed notification objects

  constructor(private webSocketService: WebsocketService, private notificationService: NotificationService) {}

  ngOnInit() {
    // Fetch unread notifications from the database and parse them into an array
    this.notificationService.getUnreadNotificationsforPage().subscribe(unreadNotifications => {
      this.notifications = this.parseNotifications(unreadNotifications);
      console.log(this.notifications);
    });

  }

  // Method to parse a string into an array of notification objects (e.g., from JSON)
  parseNotifications(unreadNotifications: string): any[] {
    // Example: Assumes unreadNotifications is a JSON string
    try {
      return JSON.parse(unreadNotifications);
    } catch (error) {
      console.error("Error parsing unread notifications: ", error);
      return [];
    }
  }
  

}
