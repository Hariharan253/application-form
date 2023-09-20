import { Injectable } from '@angular/core';
import { AdminUser } from './admin-user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  private userIsAuthenticated: boolean = false;
  private userIsAuthenticatedSub = new BehaviorSubject<boolean>(false);

  private userId: string;
  private userIdSub = new BehaviorSubject<string>("");

  private token: string;

  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  public getToken() {
    return this.token;
  }


  signup(userData: AdminUser) {
    this.http.post(`${environment.apiURL}/api/auth/signup`, {email: userData.email, password: userData.password})
      .subscribe(response => {
        console.log("Signup Res: ", response);
        this.login(userData);
    });
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if(token !== null) {
      this.token = token;
      this.userIsAuthenticated = true;
      this.userIsAuthenticatedSub.next(this.userIsAuthenticated);
    }
    else {
      this.logout();
    }
  }

  login(userData: AdminUser) {
    this.http.post<{message: string, token: string, expiresIn: number, userId: string}>(`${environment.apiURL}/api/auth/login`, {email: userData.email, password: userData.password})
    .subscribe(response => {
      console.log("Login Res: ", response);
      this.setAuthTimer(response);
      this.setUser(response);

      this.token = response.token;

      this.router.navigate(['/admin/dashboard']);
      
    })
  }

  setUser(loginResponse: {message: string, token: string, expiresIn: number, userId: string}) {
    this.userId = loginResponse.userId;
    this.userIdSub.next(this.userId);
    this.userIsAuthenticated = true;
    this.userIsAuthenticatedSub.next(this.userIsAuthenticated);
    this.setLocalStorage(loginResponse.token, loginResponse.expiresIn, loginResponse.userId);
  }

  setLocalStorage(token: string, expiresIn: number, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toString());
    localStorage.setItem('userId', userId);
  }

  getUserIsAuthenticatedSub() {
    return this.userIsAuthenticatedSub.asObservable();
  }

  getUserIdSub() {
    return this.userIdSub.asObservable();
  }

  setAuthTimer(loginResponse: {message: string, token: string, expiresIn: number, userId: string}) {

    setTimeout(() => {
      this.logout();
    }, loginResponse.expiresIn * 1000);
  }

  logout() {
    // console.log("Entered Logout");
    this.clearLocalStorage();
    this.userIsAuthenticated = false;
    this.userIsAuthenticatedSub.next(false);
    this.router.navigate(['admin/login']);
  }

  private clearLocalStorage() {
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiresIn');
    // localStorage.removeItem('userId');
  }


}
