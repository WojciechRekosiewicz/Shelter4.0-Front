import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module'
import { GuestGuardService } from './../guards/guest-guard.service';

import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegisterComponent } from './account-register/account-register.component';

@NgModule({
  declarations: [AccountLoginComponent, AccountRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: AccountLoginComponent, canActivate: [GuestGuardService] },
      { path: 'register', component: AccountRegisterComponent, canActivate: [GuestGuardService] }
    ])
  ]
})
export class AccountModule { }
