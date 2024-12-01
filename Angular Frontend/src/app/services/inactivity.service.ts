import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private inactivityTimeLimit: number = 3 * 60 * 60 * 1000; // 3 hours
  private activityEvents: string[] = ['mousemove', 'click', 'keypress', 'touchstart'];
  private inactivityTimer: any;

  constructor(private router: Router) {
    this.startInactivityTimer();
    this.setupActivityListeners();
  }

  // Step 2: Reset timer whenever there's user activity
  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => this.logout(), this.inactivityTimeLimit);
  }

  // Step 3: Setup event listeners for user activity
  private setupActivityListeners() {
    this.activityEvents.forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  // Step 4: Start the inactivity timer when the app is initialized
  private startInactivityTimer() {
    this.resetInactivityTimer(); // Start timer right away
  }

  // Step 5: Handle user logout after inactivity
  private logout() {
    // alert('Session expired due to inactivity. You will be logged out.');
    // Clear session storage or local storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/beforelog/login']);
  }
}
