import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmployeeModule } from './employee/employee.module';
import { LoginModule } from './login/login.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    EmployeeModule,
    LoginModule
  ]
})
export class ModModule { }
