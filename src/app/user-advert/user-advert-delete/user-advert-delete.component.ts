import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Advert } from './../../_interfaces/advert.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-advert-delete',
  templateUrl: './user-advert-delete.component.html',
  styleUrls: ['./user-advert-delete.component.css']
})
export class UserAdvertDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public advert: Advert;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAdvertById();
  }

  private getAdvertById() {
    let advertId: string = this.activeRoute.snapshot.params['id'];
    let advertByIdUrl: string = `api/adverts/${advertId}`;

    this.repository.getData(advertByIdUrl)
      .subscribe(res => {
        this.advert = res as Advert;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
  }

  public deleteAdvert() {
    let deleteUrl: string = `api/adverts/${this.advert.advertId}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error) => {
          console.log(error);
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }
}
