import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './application-form/create-form/create-form.component';
import { ReviewFormComponent } from './application-form/review-form/review-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { DetailPageComponent } from './admin/detail-page/detail-page.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'create', component: CreateFormComponent},
  {path: 'review', component: ReviewFormComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/detail', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
