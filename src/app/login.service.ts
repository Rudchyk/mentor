import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn: boolean = this.isUserLoggedInFromSession();
  private currentUser: string = this.getCookie('currentUser') || '';

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  login(username, password) {
     if (password === 'admin') {
      this.setLoginData(true, username, '/admin');
    } else {
      this.isLoggedIn = false;
    }
  }

  setLoginData(logged: boolean, username: string, url: string) {
    this.isLoggedIn = logged;
    this.currentUser = username;
    this.putCookie('currentUser', username);
    this.putCookie('isLoggedIn', logged.toString());
    this.router.navigate([url]);
  }

  isUserLoggedInFromSession() {
    if (this.getCookie('isLoggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  currentUserName() {
    return this.currentUser;
  }

  logOut() {
    this.setLoginData(false, '', '/');
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  putCookie(key: string, value: string) {
    return this.cookieService.put(key, value);
  }

}
