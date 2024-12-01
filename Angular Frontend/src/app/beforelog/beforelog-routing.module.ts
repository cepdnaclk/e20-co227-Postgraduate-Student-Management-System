import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PasswordManagerComponent } from './password-manager/password-manager.component';
import { BeforelogMainComponent } from './beforelog-main/beforelog-main.component';
import { MphilPhdResearchComponent } from '../shared/details/mphil-phd-research/mphil-phd-research.component';
const routes: Routes = [

  {
    path: '',
    component: BeforelogMainComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'enroll', component: EnrollComponent },
      { path: 'password-manager', component: PasswordManagerComponent },


      { path: 'mphil-phd-research', component: MphilPhdResearchComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeforelogRoutingModule { }
