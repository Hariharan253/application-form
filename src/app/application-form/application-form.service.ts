import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, of, map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ApplicationForm } from './application-form.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {

  private applicationForm: ApplicationForm = {
    "id": "0",
    name: "hari",
    age: 21,
    address: "add",
    email: "email",
    phone: "adf"
  }
  private applicationFormReviewSubject = new BehaviorSubject<ApplicationForm | boolean>(false);

  private isFormSubmittedSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) { }

  postApplicationFormForReview(applicationFormData: ApplicationForm) {
    this.applicationForm = applicationFormData;
    this.applicationFormReviewSubject.next(applicationFormData);
    this.router.navigate(['/review']);
  }

  getApplicationFormForReview() {
    return this.applicationFormReviewSubject.asObservable();    
  }

  postApplicationFormToDB(applicationFormData: ApplicationForm) {
    this.http.post<{message: string, applicationFormData: ApplicationForm}>("http://application-form-env.eba-ypsj7biv.ap-south-1.elasticbeanstalk.com/api/application-form/post", applicationFormData)
      .subscribe((response) => {
        console.log(response.applicationFormData);
        this.applicationForm = null;
        this.applicationFormReviewSubject.next(false);
        this.isFormSubmittedSubject.next(true); //to indigaate the form is POSTED in DB
        this.router.navigate(['/success-on-create']);
      },(error) => {
        console.log(error);
        window.alert("Error Occured, reload page");
        this.applicationFormReviewSubject.next(false);
        this.applicationForm = null;
      })
  }

  getisFormSubmittedSubject() {
    return this.isFormSubmittedSubject.asObservable();
  }

}
