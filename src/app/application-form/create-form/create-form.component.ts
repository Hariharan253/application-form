import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import { ApplicationForm } from '../application-form.model';
import { ApplicationFormService } from '../application-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit, OnDestroy {
  public applicationFormData: ApplicationForm;

  public applicationFormDataSub: Subscription;

  constructor(private applicationFormService: ApplicationFormService) {}

  ngOnInit(): void {
    this.applicationFormDataSub = this.applicationFormService.getApplicationFormForReview().subscribe((applicationFormData: ApplicationForm) => {
      console.log("form Data: ", applicationFormData);
      this.applicationFormData = applicationFormData;
    });
  }

  onSaveApplication(formData: NgForm) {
    if(formData.invalid)
      return;
    const applicationFormData: ApplicationForm = {
      id: null,
      name: formData.value.name,
      age: formData.value.age,
      address: formData.value.address,
      email: formData.value.email,
      phone: formData.value.phone
    };
  
    this.applicationFormService.postApplicationFormForReview(applicationFormData);
    
  }

  ngOnDestroy(): void {
    this.applicationFormDataSub.unsubscribe();
  }

}
