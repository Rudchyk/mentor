import { Component } from '@angular/core';

import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mentors App';

  constructor(
    private authGuardService: AuthGuardService,
  ) { }

  isLoggedIn() {
    return this.authGuardService.canActivate();
  }

  currentUserName() {
    return this.authGuardService.currentUser();
  }

}
