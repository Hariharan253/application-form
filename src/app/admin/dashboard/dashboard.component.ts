import { Component, OnInit } from '@angular/core';
import { AdminApplicationFormService } from '../admin-application-form.service';
import { ApplicationForm } from 'src/app/application-form/application-form.model';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private Users: ApplicationForm[] = [];
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-email', 'demo-phone', 'demo-age', 'demo-address', 'demo-edit', 'demo-delete'];
  public dataSource = [];

  public isLoading = false;
  public currentPage = 0;
  public currentOffset = 0;
  public count = 0;
  public paginationValue = 10;

  constructor(private adminApplicationFormService: AdminApplicationFormService) {}

  ngOnInit(): void {
     this.currentPage = 0;
     this.count = 0;
     this.adminApplicationFormService.getUsers(this.currentOffset, 10);
     this.adminApplicationFormService.getUsersSub()
     .subscribe((applicationForm: any) => {       
       if(applicationForm === false) {
        this.isLoading = true;
        return;
      }
      else {
        this.isLoading = false;
        this.Users = applicationForm.applicationForm;
        const editAndDeleteIcon = {"edit": "Edit", "delete": "Delete"};
        this.dataSource = this.Users.map((item) => ({...item, ...editAndDeleteIcon}));
        // this.currentPage += 1;
        this.currentOffset = applicationForm.offset; //set offset from API response
        this.count = applicationForm.count;
        
      }
     });
  }

  onPrevPage() {
    if((this.currentPage - 1) < 0)
      return;
    this.isLoading = true;
    this.adminApplicationFormService.getUsers(this.currentOffset - this.paginationValue, this.paginationValue);
    this.currentPage -= 1;
  }

  onNextPage() {
    if(this.count - this.currentOffset >= 0 ) {
      this.isLoading = true;
      this.adminApplicationFormService.getUsers(this.currentOffset + this.paginationValue, this.paginationValue);
      this.currentPage += 1;
      
    }
  }

  onDeleteApplicationForm(id: string) {    
    this.isLoading = true;
    this.adminApplicationFormService.deleteApplicationFormById(id, this.currentOffset);
  }
}
