import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { AdvertCreateModel } from './../../_interfaces/advert-create.model';

@Component({
  selector: 'app-advert-create',
  templateUrl: './advert-create.component.html',
  styleUrls: ['./advert-create.component.css']
})
export class AdvertCreateComponent implements OnInit {
  public pageTitle: string = 'Create advert';
  public errorMessage: string = '';
  public advertForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.advertForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(10)]),
      shortDescription: new FormControl('', [Validators.required, Validators.maxLength(70), Validators.minLength(10)]),
      longDescription: new FormControl('', [Validators.required, Validators.maxLength(450), Validators.minLength(30)]),
      imageUrl: new FormControl('', [Validators.required, Validators.pattern(urlReg)])
    });
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

  public createAdvert(advertFormValue) {
    if (this.advertForm.valid) {
      this.executeAdvertCreation(advertFormValue);
    }
  }

  private executeAdvertCreation(advertFormValue) {
    let advert: AdvertCreateModel = {
      title: advertFormValue.title,
      shortDescription: advertFormValue.shortDescription,
      longDescription: advertFormValue.longDescription,
      imageUrl: advertFormValue.imageUrl
    }

    let apiUrl = 'api/adverts/create';
    this.repository.create(apiUrl, advert)
      .subscribe(res => {
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
