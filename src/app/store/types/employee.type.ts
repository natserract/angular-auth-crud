
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EmployeeTemp } from 'src/app/modules/employee/employee.model';

export interface EmployeesState  {
    data: EmployeeData[];
    pending: boolean;
    error?: Error | any;
}

export interface EmployeeState  {
    data: EmployeeData;
    pending: boolean;
    error?: Error | any;
}

export interface EmployeeData {
    id?: number;
    nip: number;
    full_name: string;
    nick_name: string;
    birth_date: Date;
    address: string;
    phone: string;
    email: string;
    mobile: string;
}

export enum EmployeeActionStatus {
    LOAD_EMPLOYEES = '@@LOAD_EMPLOYEES',
    LOAD_EMPLOYEES_SUCCESS = '@@LOAD_EMPLOYEES_SUCCESS',
    LOAD_EMPLOYEES_FAIL = '@@LOAD_EMPLOYEES_FAIL',
    LOAD_EMPLOYEE = '@@LOAD_EMPLOYEE',
    LOAD_EMPLOYEE_SUCCESS = '@@LOAD_EMPLOYEE_SUCCESS',
    LOAD_EMPLOYEE_FAIL = '@@LOAD_EMPLOYEE_FAIL',
    CREATE_EMPLOYEE = '@@CREATE_EMPLOYEE',
    DELETE_EMPLOYEE = '@@DELETE_EMPLOYEE',
    UPDATE_EMPLOYEE = '@@UPDATE EMPLOYEE'
}
