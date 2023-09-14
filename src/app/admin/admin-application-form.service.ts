import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationForm } from '../application-form/application-form.model';
import { BehaviorSubject, map } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  users: ApplicationForm[];
  usersSub = new BehaviorSubject<boolean | {applicationForm: ApplicationForm[], count: number, offset: number}>(false);

  getUsers(offset: number, limit: number) {    
    this.http.get<{users: ApplicationFormResponse[], count: number, message: string, offset: number}>(`http://localhost:3000/api/admin/application-form?offset=${offset}&limit=${limit}`)
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

  deleteApplicationFormById(formId: string, offset: number) {
    this.http.delete<{message: string, isDeleted: boolean}>(`http://localhost:3000/api/admin/delete/application-form/${formId}`)
    .subscribe((response) => {      
      if(response.isDeleted === true) {
        this.getUsers(offset, 10);
      }
    })
  }

}