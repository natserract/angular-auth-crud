import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadEmployeeByIdSuccess } from 'src/app/store/actions/employee.action';
import { AppStateTypes } from 'src/app/store/types/root.types';
import { EmployeeService } from '../../employee.service';

@Injectable()
export class UpdateEmployeeResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private store$: Store<AppStateTypes>,
        private injector: Injector
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const idParam = route.params.id;

        return this.injector.get(EmployeeService).getEmployeeById(idParam).pipe(
            map(res => {
                return res;
            }),
            catchError(() => this.router.navigateByUrl('/employee'))
        );
    }
}

