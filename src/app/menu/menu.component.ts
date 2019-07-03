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
    this.updateUserId();
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.isLoggedIn = false;
    window.location.reload();
  }
}
