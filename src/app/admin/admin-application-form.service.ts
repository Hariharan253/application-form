import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApplicationFormService {

  constructor(private http: HttpClient) { }

  getUsers(offset: number, limit: number) {
    this.http.get<{}>(`http://localhost:3000/api/admin/application-form?offset=${offset}&limit=${limit}`)
      .subscribe(response => {
        console.log(response);
      });
  }

}
