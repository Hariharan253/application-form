import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean-application-form';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.autoLogin();
  }
}
