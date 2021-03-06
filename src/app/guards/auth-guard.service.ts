import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RefreshTokenModel } from 'src/app/_interfaces/refreshToken.model';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private repository: RepositoryService, private errorHandler: ErrorHandlerService) {
  }

  canActivate() {
    var token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    localStorage.clear();
    window.location.reload();
    this.router.navigate(["/account/login"]);
    return false;
  }


}
