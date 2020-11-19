import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmployeeByIdReducer, EmployeesReducer } from './reducers/employee.reducer';
import { environment } from 'src/environments/environment';
import { EmployeeEffects } from './effects/employee.effect';
import { ActionReducerMap } from '@ngrx/store';

// Combine all reducers
export const RootReducer: ActionReducerMap<any, any> = {
  employees: EmployeesReducer,
  byIdEmployee: EmployeeByIdReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(RootReducer),
    EffectsModule.forRoot([
      EmployeeEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
      logOnly: environment.production
    })
  ]
})
export class AppStoreModule { }
