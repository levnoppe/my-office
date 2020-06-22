import {ActionReducerMap} from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShared from '../shared/store/shared.reducer';
import * as fromContacts from '../contacts/store/contacts.reducer';
import * as fromPosts from '../posts/store/posts.reducer';
import * as fromTasks from '../tasks/store/tasks.reducer';

export interface AppState {
  auth: fromAuth.State;
  shared: fromShared.State;
  contacts: fromContacts.State;
  posts: fromPosts.State;
  tasks: fromTasks.State;
  taskCategories: fromTasks.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  shared: fromShared.sharedReducer,
  contacts: fromContacts.contactsReducer,
  posts: fromPosts.postsReducer,
  tasks: fromTasks.tasksReducer,
  taskCategories: fromTasks.tasksReducer
};


