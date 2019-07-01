import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module'
import { AuthGuardService } from './../guards/auth-guard.service';


import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserAdvertListComponent } from './user-advert-list/user-advert-list.component';
import { UserAdvertDetailsComponent } from './user-advert-details/user-advert-details.component';
//import { UserAdvertCreateComponent } from './user-advert-create/user-advert-create.component';
import { UserAdvertUpdateComponent } from './user-advert-update/user-advert-update.component';
import { UserAdvertDeleteComponent } from './user-advert-delete/user-advert-delete.component';
import { UserFilterPipe } from './user-advert-list/user-filter.pipe';



@NgModule({
  declarations: [
    UserAdvertListComponent,
    UserAdvertDetailsComponent,
   // UserAdvertCreateComponent,
    UserAdvertUpdateComponent,
    UserAdvertDeleteComponent,
    UserFilterPipe
    ],
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
   // BrowserModule,
    RouterModule.forChild([
      { path: 'userlist', component: UserAdvertListComponent },
      { path: 'userdetails/:id', component: UserAdvertDetailsComponent },
     // { path: 'u/create', component: UserAdvertCreateComponent, canActivate: [AuthGuardService] },
      { path: 'userupdate/:id', component: UserAdvertUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'userdelete/:id', component: UserAdvertDeleteComponent, canActivate: [AuthGuardService] }
    ])
  ]
})
export class UserAdvertModule { }
