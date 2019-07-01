import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorComponent } from './error-pages/error/error.component';



@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'advert', loadChildren: "./advert/advert.module#AdvertModule" },
      { path: 'user', loadChildren: "./user-advert/user-advert.module#UserAdvertModule" },
      { path: 'account', loadChildren: "./account/account.module#AccountModule" },
      { path: '404', component: NotFoundComponent },
      { path: '500', component: InternalServerComponent },
      { path: 'connection-error', component: ErrorComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
