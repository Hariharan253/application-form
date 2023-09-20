import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUserIsAuthenticatedSub()
      .subscribe(userIsAuthenticated => {
        this.userIsAuthenticated = userIsAuthenticated;
      })
  }

  onLogout() {
    this.adminService.logout();
    // this.userIsAuthenticated = false;
  }

  ngOnDestroy(): void {    
  }
}
