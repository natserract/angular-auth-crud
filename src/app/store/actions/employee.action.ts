import {
    Action
} from '@ngrx/store';
import { AddEmployeeTemp, EmployeeTemp } from 'src/app/modules/employee/employee.model';

import { EmployeeActionStatus, EmployeeData } from '../types/employee.type';

// All Employees
export class LoadEmployees implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEES;
}

export class LoadEmployeesSuccess implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEES_SUCCESS;
    constructor(readonly payload: {
        data?: EmployeeData[],
        payloadParam: EmployeeTemp
    }) { }
}

export class LoadEmployeesFail implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEES_FAIL;
    constructor(readonly payload: {
        error: Error | any;
    }) { }
}

export class CreateEmployee implements Action {
    readonly type = EmployeeActionStatus.CREATE_EMPLOYEE;
    constructor(readonly payload: {
        body: AddEmployeeTemp;
    }) { }
}

export class UpdateEmployee implements Action {
    readonly type = EmployeeActionStatus.CREATE_EMPLOYEE;
    constructor(readonly payload: {
        id: string | number;
        body: AddEmployeeTemp;
    }) { }
}

export class DeleteEmployee implements Action {
    readonly type = EmployeeActionStatus.DELETE_EMPLOYEE;
    constructor(readonly payload: {
        payloadId: string | number;
    }) { }
}

export type EmployeesActions =
    | LoadEmployees
    | LoadEmployeesSuccess
    | LoadEmployeesFail
    | CreateEmployee
    | DeleteEmployee
    | UpdateEmployee;


// Employee by id
export class LoadEmployeeById implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEE;
}

export class LoadEmployeeByIdSuccess implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEE_SUCCESS;
    constructor(readonly payload: {
        data: EmployeeData,
        payloadId: string | number
    }) { }
}

export class LoadEmployeeByIdFail implements Action {
    readonly type = EmployeeActionStatus.LOAD_EMPLOYEE_FAIL;
    constructor(readonly payload: {
        error: Error | any;
    }) { }
}

export type EmployeeByIdActions =
    | LoadEmployeeById
    | LoadEmployeeByIdSuccess
    | LoadEmployeeByIdFail;
