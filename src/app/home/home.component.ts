import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertShort } from '../_interfaces/advert-short.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  adverts: AdvertShort[] = [];
  errorMessage: any;
  //constructor() { }

  //ngOnInit() {
  //  this.homeText = "WELCOME TO ACCOUNT-OWNER APPLICATION";
  //}

  constructor(private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.homeText = "WELCOME TO ACCOUNT-OWNER APPLICATION";
    // this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    // this.updateUserId();


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

      },
      error => this.errorMessage = <any>error
    );

  }
}
