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
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FilterPipe } from './advert-list/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdvertReserveComponent } from './advert-reserve/advert-reserve.component';



@NgModule({
  declarations: [
    AdvertListComponent,
    AdvertDetailsComponent,
    AdvertCreateComponent,
    AdvertUpdateComponent,
    AdvertDeleteComponent,
    AdvertReserveComponent,
    FilterPipe
    ],
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
   // BrowserModule,
    RouterModule.forChild([
      { path: 'list', component: AdvertListComponent },
      { path: 'details/:id', component: AdvertDetailsComponent },
      { path: 'create', component: AdvertCreateComponent, canActivate: [AuthGuardService] },
      { path: 'update/:id', component: AdvertUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'delete/:id', component: AdvertDeleteComponent, canActivate: [AuthGuardService] },
      { path: 'reserve/:id', component: AdvertReserveComponent, canActivate: [AuthGuardService] }
    ])
  ]
})
export class AdvertModule { }
