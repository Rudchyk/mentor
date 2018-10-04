import { Component } from '@angular/core';

import { LoginService } from './login.service';
import { AreYouSureService } from './are-you-sure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mentors App';

  constructor(
    private loginService: LoginService,
    private areYouSureService: AreYouSureService
  ) { }

  isUserLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

  currentUserName() {
    return this.loginService.currentUserName();
  }

  logOut() {
    this.areYouSureService.afterClosed(() => {
      this.loginService.logOut();
    });
  }



}
