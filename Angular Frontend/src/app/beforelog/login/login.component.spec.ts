import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserRoleService } from '../../afterlog/services/user-role.service';
import { WebsocketService } from '../../services/websocket.service';
import { LoginComponent } from './login.component';
import * as jwtUtils from '../../utils/jwt-utils.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthServiceService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userRoleServiceSpy: jasmine.SpyObj<UserRoleService>;
  let websocketServiceSpy: jasmine.SpyObj<WebsocketService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthServiceService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const userRoleServiceMock = jasmine.createSpyObj('UserRoleService', ['setUserRole', 'setUserId', 'setUserIdId']);
    const websocketServiceMock = jasmine.createSpyObj('WebsocketService', ['reconnectWithNewToken']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: UserRoleService, useValue: userRoleServiceMock },
        { provide: WebsocketService, useValue: websocketServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthServiceService) as jasmine.SpyObj<AuthServiceService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userRoleServiceSpy = TestBed.inject(UserRoleService) as jasmine.SpyObj<UserRoleService>;
    websocketServiceSpy = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow form submission if form is invalid', () => {
    component.username = '';
    component.password = '';
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should display error messages if username or password is invalid', () => {
    component.username = 'us'; // too short
    component.password = '123'; // too short
    fixture.detectChanges();

    const usernameError = fixture.nativeElement.querySelector('.error-message small');
    expect(usernameError.textContent).toContain('Username must be at least 4 characters long.');

    const passwordError = fixture.nativeElement.querySelector('.error-message small:nth-of-type(2)');
    expect(passwordError.textContent).toContain('Password must be at least 6 characters long.');
  });

  it('should call login and navigate to admin dashboard on successful login for ADMIN', () => {
    const mockJwt = 'mock.jwt.token';
    const mockDecodedToken = {
      roles: [{ authority: 'ADMIN' }],
      sub: 'user123',
      userId: '123'
    };
  
    // Mock the decodeJwt function from jwt-utils.service
    spyOn(jwtUtils, 'decodeJwt').and.returnValue(mockDecodedToken);
    authServiceSpy.login.and.returnValue(of(mockJwt));
  
    component.username = 'admin';
    component.password = 'password123';
    component.onSubmit();
  
    expect(authServiceSpy.login).toHaveBeenCalledWith('admin', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/afterlog/admin-dashboard']);
    expect(userRoleServiceSpy.setUserRole).toHaveBeenCalledWith('ADMIN');
    expect(userRoleServiceSpy.setUserId).toHaveBeenCalledWith('user123');
    expect(userRoleServiceSpy.setUserIdId).toHaveBeenCalledWith(12);
    expect(websocketServiceSpy.reconnectWithNewToken).toHaveBeenCalled();
  });

  it('should display error message on login failure', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.username = 'wrongUser';
    component.password = 'wrongPassword';
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('wrongUser', 'wrongPassword');
    expect(component.errorMessage).toBe('Invalid username or password.');
  });

  it('should navigate to student dashboard on successful login for STUDENT', () => {
    const mockJwt = 'mock.jwt.token';
    spyOn(jwtUtils, 'decodeJwt').and.returnValue({
      roles: [{ authority: 'STUDENT' }],
      sub: 'student123',
      userId: '456'
    });
    authServiceSpy.login.and.returnValue(of(mockJwt));

    component.username = 'student';
    component.password = 'password123';
    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/afterlog/student-dashboard']);
    expect(userRoleServiceSpy.setUserRole).toHaveBeenCalledWith('STUDENT');
  });

  it('should show and hide password when toggled', () => {
    const passwordField = fixture.nativeElement.querySelector('#password');
    const toggleIcon = fixture.nativeElement.querySelector('.toggle-password-icon');

    // Default is hidden
    expect(passwordField.type).toBe('password');

    toggleIcon.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    expect(passwordField.type).toBe('text');

    toggleIcon.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();
    expect(passwordField.type).toBe('password');
  });
});

