import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.handleConnectionError(error);
    }
    if (error.status === 500 || error.status === 0) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error);
    }
    else if (error.status === 400) {
      this.handleOtherError(error);
    }
    else {
      this.handleConnectionError(error);
    }
  }

  private handleConnectionError(error: HttpErrorResponse) {
    this.errorMessage = "Connection error";
    this.router.navigate(['/connection-error']);
  }

  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    $('#errorModal').modal();
  }

  private createErrorMessage(error: HttpErrorResponse) {
    let resultErrorMessage = "";
    if (error.error) {
      try {
        resultErrorMessage = error.error.errors.join('\n');
      }
      catch (err) {

        let errorDict = error.error.errors;
        Object.keys(errorDict).forEach(k => resultErrorMessage += errorDict[k] + "\n");
        }
      }
    else {
      resultErrorMessage = error.status.toString();
    }

    this.errorMessage = resultErrorMessage;
  }
}
