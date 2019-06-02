import { AlertService } from './alert.service';
import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

// import { Observable } from 'rxjs';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TokenService } from './token.service';
import { Events } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private toastService: ToastService,
    private alertService: AlertService,
    public events: Events
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    this.events.publish('showProgressBar');

    const token = this.tokenService.getAuthToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const _req = req.clone({
      setHeaders: headersConfig
      // withCredentials: true
    });

    return next.handle(_req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event->', event);
          this.events.publish('hideProgressBar');
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // console.error(error);
        let errorMessage: string;
        if (error.error.msg) {
          // unexpected joi error from server
          errorMessage = error.error.msg[0].message;
        } else if (error.error.message) {
          // controlled error from server
          errorMessage = error.error.message;
          if (error.error.token === null) {
            this.alertService.presentAlertDeathLogout(
              'Your key has expired. You need to login again.'
            );
          }
          // this.events.publish('hideProgressBar');
          // this.router.navigate(['/login']);
        } else {
          // machine cannot reach server
          errorMessage = 'Cannot reach server, check interconnection';
        }
        this.events.publish('hideProgressBar');
        this.toastService.presentToast(errorMessage);
        return throwError(error);
      })
    );
  }
}
