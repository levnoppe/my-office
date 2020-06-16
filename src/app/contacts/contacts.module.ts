import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { ContactsComponent } from './contacts.component';
import {AuthGuard} from '../auth/auth.guard';

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
        canActivate: [AuthGuard],
      }
    ]),
    SharedModule
  ],
  exports: [
    ContactsComponent
  ],
  providers: [

  ]
})

export class ContactsModule {

}
