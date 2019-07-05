import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { RefreshTokenModel } from '../../_interfaces/refreshToken.model';
import { Observable } from 'rxjs';

@Injectable()
export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public create(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public update(route: string, body) {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public delete(route: string) {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public register(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public login(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  public refreshToken(route: string, body): Observable<RefreshTokenModel> {
    return this.http.post<RefreshTokenModel>(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeaders());
  }

  private generateHeaders() {
    let token = localStorage.getItem("jwt");

    return {
      headers: new HttpHeaders({ "Authorization": "Bearer " + token, 'Content-Type': 'application/json' })
    }
  }
}
