import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './auth.guard';
import { EmployeeGuard } from './auth2.guard';
import { AdminGuard } from './auth1.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'employee-list',
    loadChildren: () =>
      import('./employee-list/employee-list.module').then(
        (m) => m.EmployeeListModule
      ),
    // canActivate:[AdminGuard]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    // canActivate:[EmployeeGuard]
  },
  {
    path: 'login',
    // canActivate :[AuthGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
