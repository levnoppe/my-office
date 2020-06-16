import {NgModule} from '@angular/core';
import { FeedComponent } from './feed.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '',
        component: FeedComponent,
        canActivate: [AuthGuard],}
    ]),
    SharedModule
  ],
  exports: [
    FeedComponent
  ],
  providers: [

  ]
})

export class FeedModule {

}
