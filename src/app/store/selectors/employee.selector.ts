import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector
} from '@ngrx/store';

import { EmployeesState, EmployeeData } from '../types/employee.type';
import { AppStateTypes } from '../types/root.types';

const allEmployeesState = (State: AppStateTypes) => State;

export const SelectorLoadEmployees = createSelector(
    allEmployeesState,
    (state: AppStateTypes) => state.employees.pending
);

export const SelectorLoadEmployeesSuccess = createSelector(
    allEmployeesState,
    (state) => state.employees.data
);
