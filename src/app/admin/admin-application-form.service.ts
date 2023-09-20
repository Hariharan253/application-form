import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import * as XLSX from 'xlsx';


import { ApplicationForm } from '../application-form/application-form.model';
import { environment } from 'src/environments/environment.development';

export interface ApplicationFormResponse {
    _id?: string;
    name: string;
    age: number;
    address: string;
    email_address: string;
    phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminApplicationFormService {

  constructor(private http: HttpClient, private router: Router) { }

  users: ApplicationForm[];
  usersSub = new BehaviorSubject<boolean | {applicationForm: ApplicationForm[], count: number, offset: number}>(false);

  user: ApplicationForm;
  private userSub = new BehaviorSubject<boolean | ApplicationForm>(false);

  public currentOffset = 0;
  public currentPage = 0;

  getUsers(offset: number, limit: number) {    
    this.http.get<{users: ApplicationFormResponse[], count: number, message: string, offset: number}>(`${environment.apiURL}/api/admin/application-form?offset=${offset}&limit=${limit}`)
      .pipe(map((response) => {        
        const applicationUsers =  response.users.map((item, index) => {
          return {
            "id": item._id,
            "position": index + 1,
            "name": item.name,
            "age": item.age,
            "address": item.address,
            "email": item.email_address,
            "phone": item.phone,
          }
        });

        return {applicationForm: applicationUsers, count: response.count, offset: response.offset}

      }))
      .subscribe((response: {applicationForm: ApplicationForm[], count: number, offset: number}) => {        
        this.users = response.applicationForm;
        this.usersSub.next({applicationForm: this.users, count: response.count, offset: response.offset});
      });
  }

  getUsersSub() {
    return this.usersSub.asObservable();
  }

  getUserApplicationFormById(id: string) {
    console.log("Id: ", id);
    this.http.get<{message: string, isFound: boolean, userApplicationForm: ApplicationFormResponse}>(`${environment.apiURL}/api/admin/application-form/get-application-form-by-id/${id}`)
    .pipe(map(response => {
      return {
        id: response.userApplicationForm._id,
        name: response.userApplicationForm.name,
        age: response.userApplicationForm.age,
        address: response.userApplicationForm.address, 
        email: response.userApplicationForm.email_address, 
        phone: response.userApplicationForm.phone
      };
    }))
    .subscribe((response: ApplicationForm) => {
      this.user = response;
      this.userSub.next(this.user);
      // this.getUserSub().
    });
  }

  public getUserSub() {
    return this.userSub.asObservable();
  }

  updateUserFormById(formId: string, applicationFormData: ApplicationForm, offset: number) {
    this.http.put<{message: string}>(`${environment.apiURL}/api/admin/update/application-form/${formId}`, applicationFormData)
    .subscribe((response) => {
      console.log('response: ', response);
      // const navigationExtras: NavigationExtras = {
      //   queryParams: {offset: offset}
      // };
      // this.router.navigate([`/admin/dashboard`], navigationExtras);
       this.router.navigate([`/admin/dashboard`]);
      
    });
  }

  deleteApplicationFormById(formId: string, offset: number) {
    this.http.delete<{message: string, isDeleted: boolean}>(`${environment.apiURL}/api/admin/delete/application-form/${formId}`)
    .subscribe((response) => {      
      if(response.isDeleted === true) {
        this.getUsers(offset, 10);
      }
    })
  }

  generateExcel(data: any[], fileName: string): void {
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelBuffer, fileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }



}