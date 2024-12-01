import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { decodeJwt } from '../../utils/jwt-utils.service';
import { UserRoleService } from '../../afterlog/services/user-role.service';
import { WebsocketService } from '../../services/websocket.service';


interface DecodedToken {
  exp: number;
  iat: number;
  userId: number;
  roles: { authority: string }[]; // Update based on actual structure
  [key: string]: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private userRoleService: UserRoleService,
    private webSocketService: WebsocketService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: string) => {
  
        localStorage.setItem('jwt', response);
  
        try {
          const decodedToken: DecodedToken = decodeJwt(response);
          const roles = (decodedToken.roles || []).map(role => role.authority); // Extract the authority
          
          const userId = decodedToken['sub']; // Assume the user ID is in the 'sub' field
          this.userRoleService.setUserId(userId);
          console.log("user Name: ", userId);

          const userIdId= decodedToken['userId'];
          this.userRoleService.setUserIdId(userIdId);
          console.log("user Id: ", userIdId);

          console.log(roles);
  
          if (roles.includes('ADMIN')) {
            this.userRoleService.setUserRole('ADMIN');
            this.router.navigate(['/afterlog/admin-dashboard']);

          } else if (roles.includes('STUDENT')) {
            this.userRoleService.setUserRole('STUDENT');
            this.router.navigate(['/afterlog/student-dashboard']);

          } else if (roles.includes('SUPERVISOR') && roles.includes('EXAMINER')) {
            this.userRoleService.setUserRole('SUPERVISOR-EXAMINER');
            this.router.navigate(['/afterlog/supervisor-examiner-dashboard']);

          } else if (roles.includes('SUPERVISOR')) {
            this.userRoleService.setUserRole('SUPERVISOR');
            this.router.navigate(['/afterlog/supervisor-dashboard']);

          } else if (roles.includes('EXAMINER')) {
            this.userRoleService.setUserRole('EXAMINER');
            this.router.navigate(['/afterlog/examiner-dashboard']);

          } else {
            this.router.navigate(['/beforelog/login']);
          }

           // Reinitialize the WebSocket connection with the new token
           this.webSocketService.reconnectWithNewToken();
           
        } catch (error) {
          console.error('Failed to decode token:', error);
          this.router.navigate(['/beforelog/login']);
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password.'; // Set error message
      }
    );  
  }

  navigateToSignup() {
    this.router.navigate(['/beforelog/signup']);
  }

  navigateToPasswordChange() {
    this.router.navigate(['/beforelog/password-manager']);
  }

  // Show password on mousedown
  showPassword() {
    this.isPasswordVisible = true;
  }

  // Hide password on mouseup or mouseleave
  hidePassword() {
    this.isPasswordVisible = false;
  }
}



