import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertShort } from './../../_interfaces/advert-short.model';

@Component({
  selector: 'app-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.css']
})

export class AdvertListComponent implements OnInit {
  pageTitle = 'Advert List';
  public adverts: AdvertShort[] = [];
  public filteredAdverts: AdvertShort[] = [];
  public loading: boolean = true;
  public errorMessage: string = '';
  public userId: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAdverts = this.listFilter ? this.performFilter(this.listFilter) : this.adverts;
  }

  ngOnInit() {
    this.updateUserId();
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    let apiAddress: string = "api/adverts";

    this.repository.getData(apiAddress).subscribe(
      (response: any) => {
        this.adverts = response['result'] as AdvertShort[];
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
