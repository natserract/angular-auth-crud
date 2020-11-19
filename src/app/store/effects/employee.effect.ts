import { Injectable } from '@angular/core';
import { Effect, ofType, createEffect, Actions } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap, tap, concatMap, first, retry, last, take } from 'rxjs/operators';

import { EmployeeActionStatus } from '../types/employee.type';
import {
    LoadEmployeesSuccess,
    LoadEmployeesFail,
    LoadEmployeeByIdSuccess,
    LoadEmployeeByIdFail,
    CreateEmployee,
    DeleteEmployee,
    UpdateEmployee
} from '../actions/employee.action';
import { EmployeeService } from '../../modules/employee/employee.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class EmployeeEffects {
    constructor(
        private employeeService: EmployeeService,
        private actions: Actions,
    ) { }

    @Effect()
    loadEmployees$ = this.actions.pipe(
        ofType<LoadEmployeesSuccess>(EmployeeActionStatus.LOAD_EMPLOYEES_SUCCESS),
        mergeMap((action) => {
            return this.employeeService.getEmployees(action.payload.payloadParam).pipe(
                map(result => {
                    return new LoadEmployeesSuccess({
                        data: result,
                        payloadParam: action.payload.payloadParam
                    });
                }),
                catchError(err => of(new LoadEmployeesFail({
                    error: err
                })))
            );
        }),
        take(1)
    );

    @Effect()
    loadEmployeeById$ = this.actions.pipe(
        ofType<LoadEmployeeByIdSuccess>(EmployeeActionStatus.LOAD_EMPLOYEE_SUCCESS),
        first(),
        mergeMap((action) => {
            return this.employeeService.getEmployeeById(action.payload.payloadId).pipe(
                map(result => {
                    return new LoadEmployeeByIdSuccess({
                        data: result,
                        payloadId: action.payload.payloadId
                    });
                }),
                catchError(err => of(new LoadEmployeesFail({
                    error: err
                })))
            );
        }));

    @Effect()
    createEmployee$ = this.actions.pipe(
        ofType<CreateEmployee>(EmployeeActionStatus.CREATE_EMPLOYEE),
        first(),
        mergeMap((action) => {
            return this.employeeService.addNewEmployee(action.payload.body).pipe(
                map(() => {
                    return new CreateEmployee({
                        body: action.payload.body
                    });
                }),
                tap(() => {
                    alert('Employee berhasil dibuat');
                    window.location.href = '/employee';
                })
            );
        }));

    @Effect()
    updateEmployee$ = this.actions.pipe(
        ofType<UpdateEmployee>(EmployeeActionStatus.UPDATE_EMPLOYEE),
        first(),
        mergeMap((action) => {
            return this.employeeService.updateEmployee(action.payload.id, action.payload.body).pipe(
                map(() => {
                    return new UpdateEmployee({
                        id: action.payload.id,
                        body: action.payload.body
                    });
                }),
                tap(() => {
                    alert('Employee berhasil diupdate');
                    window.location.href = '/employee';
                })
            );
        }));

    @Effect()
    deleteEmployee$ = this.actions.pipe(
        ofType<DeleteEmployee>(EmployeeActionStatus.DELETE_EMPLOYEE),
        first(),
        mergeMap((action) => {
            return this.employeeService.deleteEmployee(action.payload.payloadId).pipe(
                map((res) => {
                    return new DeleteEmployee({
                        payloadId: action.payload.payloadId
                    });
                }),
                tap(() => {
                    alert('Data berhasil dihapus');
                    window.location.href = '/employee';
                })
            );
        }));
}
