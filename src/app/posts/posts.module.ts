import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import {AuthGuard} from '../auth/auth.guard';
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostItemComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PostsComponent,
        canActivate: [AuthGuard],
      }
    ]),
    SharedModule
  ],
  exports: [
    PostsComponent
  ],
  providers: [

  ]
})

export class PostsModule {

}
