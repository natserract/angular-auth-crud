import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddEmployeeTemp, Employee, EmployeeTemp } from './employee.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { EmployeeData } from 'src/app/store/types/employee.type';


@Injectable()
export class EmployeeService {
  constructor(
    private injector: Injector,
    private router: Router
  ) {
  }

  // tslint:disable-next-line: ban-types
  getEmployees(body: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({}) };

    return this.injector.get(ApiService)
      .post(`${environment.API_URL}/api/demo/employee/page-search`, body, httpOptions);
  }

  getEmployeeById(id: string | number): Observable<EmployeeData> {
    const httpOptions = { headers: new HttpHeaders({}) };

    return this.injector.get(ApiService).get(`${environment.API_URL}/api/demo/employee/${id}`, httpOptions);
  }

  addNewEmployee(body: AddEmployeeTemp): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({}) };
    return this.injector.get(ApiService)
      .post(`${environment.API_URL}/api/demo/employee`, body, httpOptions);
  }

  deleteEmployee(id: string | number): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({}) };
    return this.injector.get(ApiService)
      .delete(`${environment.API_URL}/api/demo/employee/${id}`, httpOptions);
  }

  searchEmployee(params: Object): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({}) };

    return this.injector.get(ApiService)
      .post(`${environment.API_URL}/api/demo/employee/page-search`, params, httpOptions);
  }

  updateEmployee(id: string | number, body: AddEmployeeTemp): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({}) };
    return this.injector.get(ApiService)
      .put(`${environment.API_URL}/api/demo/employee/${id}`, body, httpOptions);
  }

  private getRowsData(res: any) {
    if (res) {
      return res.rows;
    }
  }

  private getData(res: any) {
    if (res) {
      return res.data;
    }
  }
}
