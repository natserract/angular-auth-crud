import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeService } from './employee.service';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateEmployeeResolver } from './pages/update-employee/update-employee.resolver';

@NgModule({
  declarations: [EmployeeComponent, NewEmployeeComponent, UpdateEmployeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({
      warnOnNgModelWithFormControl: 'never'
    }),
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,

  ],
  exports: [EmployeeComponent, NewEmployeeComponent, UpdateEmployeeComponent],
  providers: [
    EmployeeService,
    UpdateEmployeeResolver
  ]
})
export class EmployeeModule { }
