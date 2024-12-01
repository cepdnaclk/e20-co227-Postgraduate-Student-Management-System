import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptor } from './services/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    RouterModule,
    SweetAlert2Module.forRoot()
    
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]) // Use the functional interceptor
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
