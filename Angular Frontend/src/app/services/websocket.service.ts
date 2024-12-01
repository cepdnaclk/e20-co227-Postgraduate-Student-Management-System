// import { Injectable } from '@angular/core';
// import { StompService, StompState } from '@stomp/ng2-stompjs';
// import { StompConfig } from '@stomp/ng2-stompjs';
// import SockJS from 'sockjs-client';
// import { AuthServiceService } from './auth-service.service';
// import { filter, Observable, map} from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {

//   private stompService: StompService;

//   constructor(private authService: AuthServiceService) {
//     const token = this.authService.getToken(); // Retrieve the token from local storage or service

//     const stompConfig: StompConfig = {
//       url: () => {
//         // Pass the JWT token as a query parameter
//         return new SockJS(`http://localhost:8080/ws?token=${token}`);
//       },
//       headers: {
//         // Alternatively, you can pass it as a custom header (depends on backend handling)
//         Authorization: `Bearer ${token}`
//       },
//       heartbeat_in: 0,
//       heartbeat_out: 20000,
//       reconnect_delay: 5000,
//       debug: true,
//     };

//     this.stompService = new StompService(stompConfig);
//     this.connect()
//   }

//   // Example method to subscribe to a topic
//   public subscribeToTopic(topic: string) {
//     this.stompService.subscribe(topic).subscribe((message) => {
//       console.log(message.body);
//     });
//   }

// ////////////////////////////////
//    // Subscribe to a topic with dynamic handling based on the topic
//    public subscribeToTopic_(topic: string): Observable<any> {
//     return this.stompService.subscribe(topic).pipe(
//       map((message: { body: string; }) => JSON.parse(message.body))
//     );
//   }


//   // Centralized method for notifications
//   public getNotifications(): Observable<any> {
//     return this.subscribeToTopic_('/user/topic/notifications').pipe(
//       filter(notification => !!notification) // Only pass on valid notifications
//     );
//   }
// ///////////////////////////////////////

//   // Connect method
//   public connect() {
//     this.stompService.initAndConnect();
//   }
// }
import { Injectable } from '@angular/core';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/ng2-stompjs';
import SockJS from 'sockjs-client';
import { AuthServiceService } from './auth-service.service';
import { filter, Observable, map, of, Subject } from 'rxjs';
import { first, switchMap, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompService!: StompService;
  private stompConfig!: StompConfig;
  public connectionEstablished$ = new Subject<void>();  // Observable that emits when connection is established

  constructor(private authService: AuthServiceService) {
    this.initializeWebSocketConnection();
  }

  // Initialize or reinitialize the WebSocket connection with the latest token
  private initializeWebSocketConnection() {
    const token = this.authService.getToken(); // Retrieve the token from local storage or service

    this.stompConfig = {
      url: () => {
        // Pass the JWT token as a query parameter
        return new SockJS(`http://localhost:8080/ws?token=${token}`);
      },
      headers: {
        // Alternatively, pass the token as a custom header
        Authorization: `Bearer ${token}`
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true,
    };

    this.stompService = new StompService(this.stompConfig);
    this.connect(); // Automatically connect after initialization
  }

  // Subscribe to a topic with dynamic handling based on the topic
  public subscribeToTopic_(topic: string): Observable<any> {
    return this.connectionEstablished$.pipe(
      first(), // Only proceed after the connection is established
      delay(1000), // Add a 1-second delay to ensure connection is established
      switchMap(() => this.stompService.subscribe(topic)),
      map((message: { body: string }) => JSON.parse(message.body)),
      catchError((error) => {
        console.error(`Failed to subscribe to topic ${topic}:`, error);
        return of(null); // Return a null observable on error to prevent further issues
      })
    );
  }

  // Centralized method for notifications as text type
  public getNotifications(): Observable<string> {
    return this.subscribeToTopic_('/user/topic/notifications').pipe(
      map((message: any) => message.body as string)
    );
  }

  // Connect
  public connect() {
    console.log("WebSocket connecting...");
    this.stompService.initAndConnect();

    this.stompService.state.pipe(
      filter(state => state === StompState.CONNECTED), // Wait for connection to be established
      first() // Emit only the first successful connection event
    ).subscribe(() => {
      console.log("WebSocket connected.");
      this.connectionEstablished$.next();  // Notify observers that the connection is established
    });
  }

  // Reconnect the WebSocket with a new token after login or token refresh
  public reconnectWithNewToken() {
    this.disconnect().then(() => {
      this.initializeWebSocketConnection();
    });
  }

  // Ensure disconnection before reconnecting
  private disconnect(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.stompService.connected()) {
        this.stompService.disconnect();

        // Listen for the state to become CLOSED
        this.stompService.state.pipe(
          filter(state => state === StompState.CLOSED),
          first()
        ).subscribe(() => {
          console.log("WebSocket disconnected.");
          resolve();
        });
      } else {
        resolve(); // If not connected, resolve immediatel
      }
    });
  }
}
