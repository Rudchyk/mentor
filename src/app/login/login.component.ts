import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [this.passwordValidator, Validators.required]]
    });
  }

  loginAction() {
    this.loginService
      .login(this.loginForm.value.username, this.loginForm.value.password);
  }

  passwordValidator(control) {
    if (control.value.indexOf('admin') === 0) {
      return null;
    } else {
      return {
        passworkMask: true
      };
    }
  }

  passwordSuggestionError() {
    const password = this.loginForm.controls.password;
    return password.invalid && !password.errors.required && password.errors.passworkMask;
  }

  fieldRequiredError(type) {
    const field = this.loginForm.controls[type];
    return field.invalid && field.errors.required;
  }

}
