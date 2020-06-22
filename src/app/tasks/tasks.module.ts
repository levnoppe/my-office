import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { TasksComponent } from './tasks.component';
import {AuthGuard} from '../auth/auth.guard';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CategoryItemComponent } from './category-item/category-item.component';
import { TaskItemComponent } from './task-item/task-item.component';

@NgModule({
  declarations: [
    TasksComponent,
    DialogModalComponent,
    CategoryItemComponent,
    TaskItemComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TasksComponent,
        canActivate: [AuthGuard],
      }
    ]),
    SharedModule
  ],
  exports: [
    TasksComponent,
    DialogModalComponent,
    CategoryItemComponent
  ],
  providers: [

  ]
})

export class TasksModule {

}
