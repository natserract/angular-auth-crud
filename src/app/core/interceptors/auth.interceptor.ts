import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authSecurity: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.startsWith(environment.API_URL);
    if (isApiUrl && this.authSecurity.getAccessToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authSecurity.getAccessToken()}`
        }
      });
      return next.handle(req).pipe();
    } else {
      return next.handle(req).pipe();
    }
  }

}
