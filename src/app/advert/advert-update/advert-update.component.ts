import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Advert } from './../../_interfaces/advert.model';

@Component({
  selector: 'app-advert-update',
  templateUrl: './advert-update.component.html',
  styleUrls: ['./advert-update.component.css']
})
export class AdvertUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public successMessage: string = '';
  public advert: Advert;
  public advertForm: FormGroup;


  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.advertForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(10)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(70), Validators.minLength(10)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(450), Validators.minLength(30)]),
      imageUrl: new FormControl('', [Validators.required])
    });

    this.getAdvertById();
  }

  private getAdvertById() {
    let advertId: string = this.activeRoute.snapshot.params['id'];

    let advertByIdUrl: string = `api/adverts/${advertId}`;

    this.repository.getData(advertByIdUrl)
      .subscribe(res => {
        this.advert = res as Advert;
        this.advertForm.patchValue(this.advert);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public validateControl(controlName: string) {
    if (this.advertForm.controls[controlName].invalid && this.advertForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.advertForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
  }

  public updateAdvert(advertFormValue) {
    if (this.advertForm.valid) {
      this.executeAdvertUpdate(advertFormValue);
    }
  }

  private executeAdvertUpdate(advertFormValue) {

    this.advert.title = advertFormValue.title;
    this.advert.imageUrl = advertFormValue.imageUrl;
    this.advert.shortDescription = advertFormValue.shortDescription;
    this.advert.longDescription = advertFormValue.longDescription;

    let apiUrl = `api/adverts/${this.advert.advertId}`;
    this.repository.update(apiUrl, this.advert)
      .subscribe(res => {
        this.successMessage = res['message'];
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToAdvertList() {
    this.router.navigate(['/advert/list']);
  }
}
