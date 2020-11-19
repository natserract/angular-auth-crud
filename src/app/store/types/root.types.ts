import { EmployeesState, EmployeeState } from './employee.type';

export interface AppStateTypes {
  employees: EmployeesState;
  byIdEmployee: EmployeeState;
}
