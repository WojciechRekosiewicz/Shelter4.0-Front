import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

import { AdvertShort } from './../../_interfaces/advert-short.model';


@Component({
  selector: 'app-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.css']
})
export class AdvertListComponent implements OnInit {
  public adverts: AdvertShort[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners() {
    let apiAddress: string = "api/adverts";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.adverts = res as AdvertShort[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getAdvertDetails(id) {
    let detailsUrl: string = `/advert/details/${id}`
    this.router.navigate([detailsUrl]);
  }


  public redirectToUpdatePage(id) {
    let updateUrl: string = `/advert/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(id) {
    let deleteUrl: string = `/advert/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }
}
