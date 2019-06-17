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
  public advert: Advert;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getAdvertDetails()
  }

  getAdvertDetails() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/adverts/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.advert = res as Advert;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public returnBack() {
    let listUrl: string = '/advert/list'
    this.router.navigate([listUrl]);
  }
}
