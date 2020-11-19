import { ActionReducer, createReducer } from '@ngrx/store';
import { EmployeeActionStatus, EmployeeData, EmployeeState, EmployeesState } from '../types/employee.type';
import { EmployeeByIdActions, EmployeesActions } from '../actions/employee.action';


// All Employees
const employeesInitialState: EmployeesState = {
    data: [],
    pending: false,
    error: null
};

export const EmployeesReducer: ActionReducer<EmployeesState, EmployeesActions> =
    (state: EmployeesState = employeesInitialState, action: EmployeesActions): EmployeesState => {
        switch (action.type) {
            case EmployeeActionStatus.LOAD_EMPLOYEES: {
                return {
                    ...state,
                    pending: true
                }
            }
            case EmployeeActionStatus.LOAD_EMPLOYEES_FAIL: {
                return {
                    ...state,
                    pending: false,
                    error: action.payload.error
                };
            }
            case EmployeeActionStatus.LOAD_EMPLOYEES_SUCCESS: {
                return {
                    ...state,
                    data: action.payload.data,
                    pending: false
                };
            }
            case EmployeeActionStatus.CREATE_EMPLOYEE: {
                return {
                    ...state,
                    pending: false
                };
            }
            case EmployeeActionStatus.DELETE_EMPLOYEE: {
                return {
                    ...state,
                    pending: false
                };
            }
            default:
                return state;
        }
    };



// Employee By ID
const employeeByIdInitialState: EmployeeState = {
    data: null,
    pending: false,
    error: null
};

export const EmployeeByIdReducer: ActionReducer<EmployeeState, EmployeeByIdActions> =
    (state: EmployeeState = employeeByIdInitialState, action: EmployeeByIdActions): EmployeeState => {
        switch (action.type) {
            case EmployeeActionStatus.LOAD_EMPLOYEE: {
                return {
                    ...state,
                    pending: true
                }
            }
            case EmployeeActionStatus.LOAD_EMPLOYEE_FAIL: {
                return {
                    ...state,
                    pending: false,
                    error: action.payload.error
                };
            }
            case EmployeeActionStatus.LOAD_EMPLOYEE_SUCCESS: {
                return {
                    ...state,
                    data: action.payload.data,
                    pending: false
                };
            }
            default:
                return state;
        }
    };

