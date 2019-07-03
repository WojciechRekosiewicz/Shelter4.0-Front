import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private isLoggedIn: boolean = false;
  private userName: string = '';

  constructor() { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("jwt") != null;
    this.updateUserData();
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.isLoggedIn = false;
    window.location.reload();
  }

  public updateUserData() {
    let jwtToken = localStorage.getItem('jwt');

    if (jwtToken != null) {
      let decodedJwtJsonData = window.atob(jwtToken.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.userName = decodedJwtData.sub;
    }
  }
}
