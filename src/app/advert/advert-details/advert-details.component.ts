import { Component, OnInit } from '@angular/core';
import { Advert } from './../../_interfaces/advert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-adver-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {
  pageTitle = 'Advert Detail';
  advert: Advert;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getAdvert(id);
   // this.getAdvertDetails(id);
  }

  //getAdvertDetails(id: number) {
  // // let id: string = this.activeRoute.snapshot.params['id'];
  //  let apiUrl: string = `api/adverts/${id}`;

  //  this.repository.getData(apiUrl)
  //    .subscribe(res => {
  //      this.advert = res as Advert;
  //    },
  //      (error) => {
  //        this.errorHandler.handleError(error);
  //        this.errorMessage = this.errorHandler.errorMessage;
  //      })
  //}


  getAdvert(id: number) {

    let apiUrl: string = `api/adverts/${id}`;
    this.repository.getData(apiUrl).subscribe(
      advert => this.onAdvertRetrieved(<any> advert),
      error => this.errorMessage = <any>error);
  }

  onAdvertRetrieved(advert: Advert): void {
    this.advert = advert;

    if (this.advert) {
      this.pageTitle = `Product Detail: ${this.advert.title}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }


  private getUserId() {
    let jwtToken = localStorage.getItem('jwt');

    if (jwtToken != null) {
      let decodedJwtJsonData = window.atob(jwtToken.split('.')[1]);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      return decodedJwtData.id;
    }
  }


  public canReserve() {
    let userId = this.getUserId();
    if (userId == null) {
      return false;
    }
    else {
      return userId != this.advert.authorId;
    }
  }

  reserveAdvert() {
  }

  public returnBack() {
    let listUrl: string = '/advert/list'
    this.router.navigate([listUrl]);
  }
}
