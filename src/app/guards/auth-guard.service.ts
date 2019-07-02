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

    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      else {
        this.refreshToken();
      }
    }
  }

  private refreshToken() {
    let url = 'api/identity/refresh';
    let refreshTokenModel: RefreshTokenModel = {
      token: localStorage.getItem('jwt'),
      refreshToken: localStorage.getItem('refreshToken')
    };

    this.repository.refreshToken(url, refreshTokenModel)
      .subscribe(res => {
        localStorage.setItem('jwt', res['token']);
        localStorage.setItem('refreshToken', res['refreshToken']);
        console.log("AuthGuard: successfully refreshed token.");
      },
        (error) => {
          this.errorHandler.handleError(error);
          window.location.reload();
          localStorage.clear();
          console.log("AuthGuard: token has not been refreshed.");
        }
    )
  }
}
