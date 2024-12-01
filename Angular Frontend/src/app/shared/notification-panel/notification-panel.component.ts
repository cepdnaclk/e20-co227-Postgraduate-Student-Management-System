import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {
  notifications: any[] = []; // Stores parsed notification objects

  constructor(private webSocketService: WebsocketService, private notificationService: NotificationService) {}

  ngOnInit() {
    // Fetch unread notifications from the database and parse them into an array
    this.notificationService.getUnreadNotifications().subscribe(unreadNotifications => {
      this.notifications = this.parseNotifications(unreadNotifications);
      console.log(this.notifications);
    });

    // Subscribe to real-time notifications from WebSocket and append them to the notifications array
    this.webSocketService.getNotifications().subscribe(notification => {
      console.log("in- notification service");
      const parsedNotification = this.parseNotification(notification); // Parse incoming text notification
      this.notifications.push(parsedNotification); // Append the parsed notification to the array
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

  // Method to parse a single string notification into an object (from WebSocket)
  parseNotification(notification: string): any {
    // Example: If notifications are sent as JSON strings
    try {
      return JSON.parse(notification);
    } catch (error) {
      console.error("Error parsing notification: ", error);
      return null;
    }
  }

  // Mark a notification as read
  markNotificationAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe(
      () => {
        // On success, remove the notification from the array or mark it as read
        this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }
}
