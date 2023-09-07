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

  public applicationFormDataArray: any[];

  constructor(private applicationFormService: ApplicationFormService) {}

  ngOnInit(): void {
    this.applicationFormDataSub = this.applicationFormService.getApplicationFormForReview()
      .subscribe((applicationFormData: ApplicationForm) => {
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
  }

  ngOnDestroy(): void {
    this.applicationFormDataSub.unsubscribe();
  }

}
