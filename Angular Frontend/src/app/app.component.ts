import { Component, HostListener } from '@angular/core';
import { InactivityService } from './services/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private inactivityService: InactivityService) {
    // InactivityService starts automatically when the app is loaded
  }

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    if (!sessionStorage.getItem('isReloading')) {
      // If the sessionStorage flag is not set, this is a tab/window close, so we clear localStorage
      localStorage.clear();
    }
    // Remove the flag, in case it exists
    sessionStorage.removeItem('isReloading');
  }

  @HostListener('window:unload', ['$event'])
  setReloadFlag(event: any) {
    // Set a flag in sessionStorage to indicate the page is reloading
    sessionStorage.setItem('isReloading', 'true');
  }

}
