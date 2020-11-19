import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EmployeeComponent } from './employee.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { UpdateEmployeeResolver } from './pages/update-employee/update-employee.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      reuse: true
    }
  },
  {
    path: 'new',
    component: NewEmployeeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'update/:id',
    component: UpdateEmployeeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: {
      detailEmployee: UpdateEmployeeResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
