import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

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
  private applicationFormReviewSubject = new Subject<ApplicationForm>();

  constructor(private router: Router) { }

  postApplicationFormForReview(applicationFormData: ApplicationForm) {
    this.applicationForm = applicationFormData;
    this.applicationFormReviewSubject.next(applicationFormData);
    this.router.navigate(['/review'])
  }

  getApplicationFormForReview() {
    return this.applicationFormReviewSubject.asObservable();
    return of(this.applicationForm);
  }

}
