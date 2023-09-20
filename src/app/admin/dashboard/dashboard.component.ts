import { Component, OnInit } from '@angular/core';
import { AdminApplicationFormService } from '../admin-application-form.service';
import { ApplicationForm } from 'src/app/application-form/application-form.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';



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

  constructor(private adminApplicationFormService: AdminApplicationFormService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //  console.log();
     this.currentOffset = this.adminApplicationFormService.currentOffset;
     this.currentPage = this.adminApplicationFormService.currentPage; 
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
        this.adminApplicationFormService.currentOffset = applicationForm.offset; //set offset from API response
        this.currentOffset = this.adminApplicationFormService.currentOffset; 
        this.count = applicationForm.count;
        
      }
     });
  }

  onPrevPage() {
    if((this.currentPage - 1) < 0)
      return;
    this.isLoading = true;
    this.adminApplicationFormService.getUsers(this.currentOffset - this.paginationValue, this.paginationValue);
    this.adminApplicationFormService.currentPage -= 1;
    this.currentPage = this.adminApplicationFormService.currentPage;
  }

  onNextPage() {
    if(this.count - this.currentOffset >= 0 ) {
      this.isLoading = true;
      this.adminApplicationFormService.getUsers(this.currentOffset + this.paginationValue, this.paginationValue);
      this.adminApplicationFormService.currentPage += 1;
    this.currentPage = this.adminApplicationFormService.currentPage;
      
    }
  }

  onDeleteApplicationForm(id: string) {    
    this.isLoading = true;
    this.adminApplicationFormService.deleteApplicationFormById(id, this.currentOffset);
  }

  onEditApplicationForm(id: string) {

    const navigationExtras: NavigationExtras = {
      queryParams: {offset: this.currentOffset}
    }

    this.router.navigate([`/admin/edit-form/${id}`], navigationExtras);
  }

  onDownloadCSV() {
    const data = [
      { Name: 'John Doe', Age: 30 },
      { Name: 'Jane Smith', Age: 25 },
      { Name: 'Mike Johnson', Age: 35 }
    ];
    const modifiedUser = this.Users.map(item => {
      const {id, position, ...rest} = item;
      return {s_no: position, ...rest};
    })
    this.adminApplicationFormService.generateExcel(modifiedUser, 'candidates_detail.xlsx');
  }
}
