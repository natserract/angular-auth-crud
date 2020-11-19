import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// tslint:disable
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  get(path: string, options: any): Observable<any> {
    return this.http.get(path, options);
  }

  getWParams(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, {params});
  }

  post(path: string, body: any, options: any): Observable<any> {
    return this.http.post(path, body, options).pipe(
      catchError(this.errorHandler)
    );
  }

  put(path: string, body: any, options: any): Observable<any> {
    return this.http.put(path, body, options).pipe(
      catchError(this.errorHandler)
    );;
  }

  delete(path: string, options: any): Observable<any> {
    return this.http.delete(path, options).pipe(
      catchError(this.errorHandler)
    );
  }
}
