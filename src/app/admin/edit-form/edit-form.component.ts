import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AdminApplicationFormService } from '../admin-application-form.service';
import { ApplicationForm } from 'src/app/application-form/application-form.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit, OnDestroy {
  isLoading = false;

  applicationFormData: ApplicationForm;

  idParam = '';
  offset = 0;

  constructor(
    private adminApplicationFormService: AdminApplicationFormService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.idParam = this.route.snapshot.paramMap.get('id');
    this.offset = this.route.snapshot.queryParams['offset'];
    this.adminApplicationFormService.getUserApplicationFormById(this.idParam);
    this.adminApplicationFormService.getUserSub().subscribe((response: any) => {
      if(response === false) {
        return;
      }
      this.isLoading = false;
      this.applicationFormData = response;      
      console.log("Entered Here");
    });
  }

  ngOnDestroy(): void {
    
  }

  onUpdateApplication(formData: NgForm) {
    console.log(formData.value);
    this.applicationFormData = {
      id: this.idParam,
      name: formData.value.name,
      address: formData.value.address,
      email: formData.value.email,
      age: formData.value.age,
      phone: formData.value.phone
    }
    this.adminApplicationFormService.updateUserFormById(this.idParam, this.applicationFormData, this.offset);
    // this.router.navigate(['/admin/dashboard']);
    
  }

}
