import {ActionReducerMap} from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShared from '../shared/store/shared.reducer';
import * as fromContacts from '../contacts/store/contacts.reducer';
import * as fromPosts from '../posts/store/posts.reducer';

export interface AppState {
  auth: fromAuth.State;
  shared: fromShared.State;
  contacts: fromContacts.State;
  posts: fromPosts.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  shared: fromShared.sharedReducer,
  contacts: fromContacts.contactsReducer,
  posts: fromPosts.postsReducer
};


