import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigateByUrl('/');
                }
                if (request.method === 'POST' || request.method === 'PUT') {
                    if (request.url.startsWith(environment.API_URL)) {
                        this.handleBackend(err);
                    }
                }

                return throwError(err);
            })
        );
    }

    private handleBackend(err: HttpErrorResponse) {
        if (err && (err.error.detail || err.error.message)) {
            if (err.error.detail && err.error.detail.errorMsg) {
                alert(err.error.detail.errorMsg);
            } else {
                alert(err.error.message);
            }
        } else {
            alert('Terjadi kesalahan pada server!');
        }
    }
}
