import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { RefreshTokenModel } from 'src/app/_interfaces/refreshToken.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private repository: RepositoryService, private errorHandler: ErrorHandlerService) {
  }

  canActivate()  {
    var token = localStorage.getItem("jwt");

    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      return this.refreshToken();
    }
    return false;
  }

  private async refreshToken() {
    let url = 'api/identity/refresh';
    let result: boolean = false;
    let refreshTokenModel: RefreshTokenModel = {
      token: localStorage.getItem('jwt'),
      refreshToken: localStorage.getItem('refreshToken')
    };

    let data = await this.repository.refreshToken(url, refreshTokenModel).toPromise()
      .catch((error) => {
        this.errorHandler.handleError(error);
        localStorage.clear();
      });

    if (data != undefined) {
      localStorage.setItem('jwt', data['token']);
      localStorage.setItem('refreshToken', data['refreshToken']);
      result = true;
    }

    return result;
  }
}
