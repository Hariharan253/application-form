import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatTableModule} from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './application-form/create-form/create-form.component';
import { ReviewFormComponent } from './application-form/review-form/review-form.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DetailPageComponent } from './admin/detail-page/detail-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminInterceptor } from './application-form/application-form-intereceptor';
import { ErrorInterceptor } from 'src/error-interceptor';
import { SuccessOnCreateComponent } from './application-form/success-on-create/success-on-create.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './admin/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    ReviewFormComponent,
    LoginComponent,
    DashboardComponent,
    DetailPageComponent,
    SuccessOnCreateComponent,
    HeaderComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    NgbModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
