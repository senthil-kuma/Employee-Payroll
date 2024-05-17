import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

import { EmployeeListComponent } from './employee-list.component';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { SkillComponent } from '../skill/skill.component';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [EmployeeListComponent, SearchPipe,SkillComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MdbRippleModule,
    MdbDropdownModule,
    NgOptionHighlightModule,
    NgSelectModule,

    RouterModule.forChild([{ path: '', component: EmployeeListComponent }]),
  ],
})
export class EmployeeListModule {}
