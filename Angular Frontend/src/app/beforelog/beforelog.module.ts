import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeforelogRoutingModule } from './beforelog-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { EnrollService } from './enroll/enroll.service';
import { FormsModule } from '@angular/forms';
import { PasswordManagerComponent } from './password-manager/password-manager.component';
import { BeforelogMainComponent } from './beforelog-main/beforelog-main.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    EnrollComponent,
    WelcomeComponent,
    PasswordManagerComponent,
    BeforelogMainComponent
  ],
  imports: [
    CommonModule,
    BeforelogRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [EnrollService]
})
export class BeforelogModule { }