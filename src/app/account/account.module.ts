import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module'

import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegisterComponent } from './account-register/account-register.component';

@NgModule({
  declarations: [AccountLoginComponent, AccountRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: AccountLoginComponent },
      { path: 'register', component: AccountRegisterComponent }
    ])
  ]
})
export class AccountModule { }
