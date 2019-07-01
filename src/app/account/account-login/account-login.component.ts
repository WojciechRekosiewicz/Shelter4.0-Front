import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { LoginModel } from './../../_interfaces/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  public errorMessage: string = '';
  public invalidLogin: boolean;
  public loginForm: FormGroup;


  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    if (token != null) this.router.navigate(['/advert/list']);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(7)])
    });
  }

  public validateControl(controlName: string) {
    if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.loginForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public loginUser(loginFormValue) {
    if (this.loginForm.valid) {
      this.executeLoginOperation(loginFormValue);
    }
  }

  private executeLoginOperation(loginFormValue) {
    let user: LoginModel = {
      email: loginFormValue.email,
      password: loginFormValue.password
    }

    let apiUrl = 'api/identity/login';
    this.repository.login(apiUrl, user)
      .subscribe(response => {
        $('#successModal').modal();

        this.handleLogin((<any>response).token, (<any>response).refreshToken);
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
          this.invalidLogin = true;
        })
      )
  }

  private handleLogin(jwtToken, refreshToken) {
    localStorage.setItem("jwt", jwtToken);
    localStorage.setItem("refreshToken", refreshToken);
    this.invalidLogin = false;
  }


  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
  }

  public redirectWithPageReload() {
    this.redirectToAdvertList();
    window.location.reload();
  }
}
