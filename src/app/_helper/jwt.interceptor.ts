import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const isApiUrl = request.url.startsWith(environment.api_endpoint);
    if (currentUser && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser}`,
        },
      });
      console.log(request);
    }

    return next.handle(request);
  }
}
