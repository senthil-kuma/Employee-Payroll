import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';



import { EmployeeListComponent } from './employee-list.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MdbRippleModule,
    MdbDropdownModule,
    

    
    RouterModule.forChild([{ path: '', component: EmployeeListComponent }]),
  ],
})
export class EmployeeListModule {}