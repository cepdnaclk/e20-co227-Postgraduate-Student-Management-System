import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredUserRole());
  userRole$ = this.userRoleSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(this.getStoredUserId());
  userId$ = this.userIdSubject.asObservable();

  private userIdIdSubject = new BehaviorSubject<number | null>(this.getStoredUserIdId());
  userIdId$ = this.userIdIdSubject.asObservable();

  // Manage the User Role
  setUserRole(role: string) {
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.getValue();
  }

  // Manage the User Name
  setUserId(userId: string) {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return this.userIdSubject.getValue();
  }

  // Manage the User Id
  setUserIdId(userIdId: number) {
    this.userIdIdSubject.next(userIdId);
    localStorage.setItem('userIdId', userIdId.toString());
  }

  getUserIdId(): number | null {
    return this.userIdIdSubject.getValue();
  }

  // Clear the stored user role, userName and userId
  clearUserRole() {
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
    this.userIdIdSubject.next(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userIdId');
  }

  // Retrieve the stored user role from localStorage
  private getStoredUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Retrieve the stored userName from localStorage
  private getStoredUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Retrieve the stored userId from localStorage
  private getStoredUserIdId(): number | null {
    return parseInt(localStorage.getItem('userIdId') as string);
  }

}
