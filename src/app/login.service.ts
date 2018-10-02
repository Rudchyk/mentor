import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn = false;
  private currentUser: string;

  constructor(
    private router: Router
  ) { }

  login(username, password) {
     if (password === 'admin') {
      this.currentUser = username;
      this.isLoggedIn = true;
      this.router.navigate(['/admin']);
    } else {
      this.isLoggedIn = false;
    }
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }
  currentUserName() {
    return this.currentUser;
  }
}
