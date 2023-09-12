import { Injectable } from '@angular/core';
import { AdminUser } from './admin-user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  private userIsAuthenticated: boolean = false;
  private userIsAuthenticatedSub = new BehaviorSubject<boolean>(false);

  private userId: string;
  private userIdSub = new BehaviorSubject<string>("");


  signup(userData: AdminUser) {
    this.http.post('http://localhost:3000/api/auth/signup', {email: userData.email, password: userData.password})
      .subscribe(response => {
        console.log("Signup Res: ", response);
        this.login(userData);
    });
  }

  login(userData: AdminUser) {
    this.http.post<{message: string, token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/auth/login', {email: userData.email, password: userData.password})
    .subscribe(response => {
      console.log("Login Res: ", response);
      this.setAuthTimer(response);
      this.setUser(response);

      this.router.navigate(['/create']);
      
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

  }

}
