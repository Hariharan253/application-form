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
import { AuthGuard } from './admin/auth.guard';
import { EditFormComponent } from './admin/edit-form/edit-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/create', pathMatch: 'full'},
  {path: 'create', component: CreateFormComponent},
  {path: 'review', component: ReviewFormComponent},
  {path: 'admin/signup/12092023', component: SignupComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin/detail', component: DetailPageComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit-form/:id', component: EditFormComponent, canActivate: [AuthGuard]},
  {path: 'success-on-create', component: SuccessOnCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
