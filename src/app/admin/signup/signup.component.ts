import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AdminUser } from '../admin-user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isLoading = false;

  constructor(private adminService: AdminService) {}

  onSubmit(formData: NgForm) {
    if(formData.invalid === true)
      return;
    
      const userData: AdminUser = {
        id: null,
        email: formData.value.email,
        password: formData.value.password
      };

      this.adminService.signup(userData);
  }

}
