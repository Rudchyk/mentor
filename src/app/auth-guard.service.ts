import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private loginService: LoginService
  ) { }

  canActivate() {
    return of(this.loginService.isUserLoggedIn());
  }

}
