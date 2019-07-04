import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModalComponent } from './shared/modals/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Shelter Web Application';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
    window.location.reload();
  }
}
