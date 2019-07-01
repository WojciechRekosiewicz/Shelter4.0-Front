import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module'
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuardService } from './../guards/auth-guard.service';

import { AdvertListComponent } from './advert-list/advert-list.component';
import { AdvertDetailsComponent } from './advert-details/advert-details.component';
import { AdvertCreateComponent } from './advert-create/advert-create.component';
import { AdvertUpdateComponent } from './advert-update/advert-update.component';
import { AdvertDeleteComponent } from './advert-delete/advert-delete.component';


@NgModule({
  declarations: [AdvertListComponent, AdvertDetailsComponent, AdvertCreateComponent, AdvertUpdateComponent, AdvertDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
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
