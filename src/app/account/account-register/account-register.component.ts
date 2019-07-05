import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';

import { RegisterModel } from './../../_interfaces/register.model';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {
  public pageTitle: string = 'Register';
  public errorMessage: string = '';
  public registerForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(7)]),
      passwordRepeat: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(7)])
    });
  }

  public validateControl(controlName: string) {
    if (this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public validatePassword(controlName: string) {
    return this.registerForm.get('password').value.localeCompare(this.registerForm.get('passwordRepeat').value) != 0 && this.registerForm.controls[controlName].touched;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.registerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public registerUser(registerFormValue) {
    if (this.registerForm.valid) {
      this.executeRegisterOperation(registerFormValue);
    }
  }

  private executeRegisterOperation(registerFormValue) {
    let user: RegisterModel = {
      username: registerFormValue.username,
      email: registerFormValue.email,
      password: registerFormValue.password
    }

    let apiUrl = 'api/identity/register';
    this.repository.register(apiUrl, user)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
  }
}
