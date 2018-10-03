import { Component } from '@angular/core';

import { AuthGuardService } from './auth-guard.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mentors App';

  constructor(
    private loginService: LoginService
  ) { }

  isUserLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

  currentUserName() {
    return this.loginService.currentUserName();
  }

  logOut() {
    return this.loginService.logOut();
  }



}
