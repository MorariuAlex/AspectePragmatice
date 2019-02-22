import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {onErrorResumeNext, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {ErrorSnackbarComponent} from '../components/error-snackbar/error-snackbar.component';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    return next.handle(request).pipe(
      tap(x => x, e => {
        this.snackBar.openFromComponent(
          ErrorSnackbarComponent,
          {
            verticalPosition: 'top',
            panelClass: ['bg-white'],
            data: e
          });
      }),
      onErrorResumeNext()
    );
  }
}
