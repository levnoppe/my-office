import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed',
    loadChildren: () => import('./feed/feed.module')
      .then(m => m.FeedModule)},
  { path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module')
      .then(m => m.ContactsModule)},
  { path: 'posts',
    loadChildren: () => import('./posts/posts.module')
      .then(m => m.PostsModule)},
  { path: 'profile',
    loadChildren: () => import('./profile/profile.module')
      .then(m => m.ProfileModule)},
  { path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module')
      .then(m => m.TasksModule)},
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
