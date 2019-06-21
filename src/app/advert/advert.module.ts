import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module'
import { AuthGuardService } from './../guards/auth-guard.service';

import { AdvertListComponent } from './advert-list/advert-list.component';
import { AdvertDetailsComponent } from './advert-details/advert-details.component';
import { AdvertCreateComponent } from './advert-create/advert-create.component';
import { AdvertUpdateComponent } from './advert-update/advert-update.component';
import { AdvertDeleteComponent } from './advert-delete/advert-delete.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AdvertListComponent,
    AdvertDetailsComponent,
    AdvertCreateComponent,
    AdvertUpdateComponent,
    AdvertDeleteComponent,
    //FilterPipe
    ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  //  FormsModule,
   // BrowserModule,
    RouterModule.forChild([
      { path: 'list', component: AdvertListComponent },
      { path: 'details/:id', component: AdvertDetailsComponent },
      { path: 'create', component: AdvertCreateComponent, canActivate: [AuthGuardService] },
      { path: 'update/:id', component: AdvertUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'delete/:id', component: AdvertDeleteComponent, canActivate: [AuthGuardService] }
    ])
  ]
})
export class AdvertModule { }
