import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { AdminUser } from '../admin-user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

      this.adminService.login(userData);
  }
}
