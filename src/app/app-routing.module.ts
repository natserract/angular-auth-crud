import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee-routing.module').then(m => m.EmployeeRoutingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login-routing.module').then(m => m.LoginRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
