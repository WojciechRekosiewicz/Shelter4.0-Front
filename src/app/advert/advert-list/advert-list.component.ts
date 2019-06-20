import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

import { AdvertShort } from './../../_interfaces/advert-short.model';
import { Advert } from 'src/app/_interfaces/advert.model';


@Component({
  selector: 'app-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.css']
})
export class AdvertListComponent implements OnInit {
  pageTitle = 'Advert List';

  public errorMessage: string = '';
  public userId: string = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this.listFilter ? this.performFilter(this.listFilter) : this.adverts;
  }

  adverts: AdvertShort[] = [];
  filteredAdverts: AdvertShort[] = [];

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    this.updateUserId();


    let apiAddress: string = "api/adverts";
    //this.repository.getData(apiAddress)
    //  .subscribe(res => {
    //    this.adverts = res as AdvertShort[];
    //    this.filteredProducts = this.performFilter(this.listFilter);
    //  },
    //    (error) => {
    //      this.errorHandler.handleError(error);
    //      this.errorMessage = this.errorHandler.errorMessage;
    //    })

    this.repository.getData(apiAddress).subscribe(
      (adverts: any) => {
        this.adverts = adverts;
        this.filteredAdverts = this.performFilter(this.listFilter);
      },
      error => this.errorMessage = <any>error
    );


  
  }


  performFilter(filterBy: string): AdvertShort[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.adverts.filter((advert: AdvertShort) =>
      advert.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  //public getAllOwners() {
  //  let apiAddress: string = "api/adverts";
  //  this.repository.getData(apiAddress)
  //    .subscribe(res => {
  //      this.adverts = res as AdvertShort[];
  //    },
  //      (error) => {
  //        this.errorHandler.handleError(error);
  //        this.errorMessage = this.errorHandler.errorMessage;
  //      })
  //}

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

  public updateUserId() {
    let jwtToken = localStorage.getItem('jwt');

    if (jwtToken != null) {
      let decodedJwtJsonData = window.atob(jwtToken.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.userId = decodedJwtData.id;
    }
  }

  public isAuthorised(authorId) {
    return authorId == this.userId;
  }
}
