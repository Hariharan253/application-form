import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './application-form/create-form/create-form.component';
import { ReviewFormComponent } from './application-form/review-form/review-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { DetailPageComponent } from './admin/detail-page/detail-page.component';
import { SuccessOnCreateComponent } from './application-form/success-on-create/success-on-create.component';
import { SignupComponent } from './admin/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/create', pathMatch: 'full'},
  {path: 'create', component: CreateFormComponent},
  {path: 'review', component: ReviewFormComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'admin/signup/12092023', component: SignupComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/detail', component: DetailPageComponent},
  {path: 'success-on-create', component: SuccessOnCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
