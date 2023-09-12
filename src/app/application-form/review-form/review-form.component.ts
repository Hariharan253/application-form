import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationForm } from '../application-form.model';
import { Subscription } from 'rxjs';
import { ApplicationFormService } from '../application-form.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  public applicationFormData: ApplicationForm;

  public applicationFormDataSub: Subscription;

  public applicationFormDataArray: any[] = [];

  public isFormSubmittedSub: Subscription;
  public isFormSubmitted = false;

  public isLoading = false;

  constructor(private applicationFormService: ApplicationFormService) {}

  ngOnInit(): void {
    this.applicationFormDataSub = this.applicationFormService.getApplicationFormForReview()
      .subscribe((applicationFormData: any) => {
        if(applicationFormData == false)
          return;
        console.log('apply form: ', applicationFormData);
        this.applicationFormData = applicationFormData;
        this.applicationFormDataArray = Object.entries(applicationFormData).map(([key, value], index) => ({
          "key": key,
          "val": value,
          "ind": index 
        }));

        this.applicationFormDataArray.shift();
        console.log(this.applicationFormDataArray);
      });

    this.isFormSubmittedSub = this.applicationFormService.getisFormSubmittedSubject()
      .subscribe((isFormSubmitted) => {
        this.isLoading = false;
        console.log('form submitted: ', isFormSubmitted);
        this.isFormSubmitted = isFormSubmitted;
        
      })  
  }

  onSubmitReviewForm() {
    this.isLoading = true;
    this.applicationFormService.postApplicationFormToDB(this.applicationFormData);
  }

  ngOnDestroy(): void {
    this.applicationFormDataSub.unsubscribe();
    this.isFormSubmittedSub.unsubscribe();
  }

}
