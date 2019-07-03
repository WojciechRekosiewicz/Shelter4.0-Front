import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorComponent } from './error-pages/error/error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { RepositoryService } from './shared/services/repository.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { GuestGuardService } from './guards/guest-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    InternalServerComponent,
    ErrorComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'advert', loadChildren: "./advert/advert.module#AdvertModule" },
      { path: 'account', loadChildren: "./account/account.module#AccountModule" },
      { path: '404', component: NotFoundComponent },
      { path: '500', component: InternalServerComponent },
      { path: 'connection-error', component: ErrorComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full' }
    ]),
    NgxSpinnerModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    EnvironmentUrlService,
    RepositoryService,
    ErrorHandlerService,
    AuthGuardService,
    GuestGuardService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
