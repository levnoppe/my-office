import {Actions, Effect, ofType} from '@ngrx/effects';
import * as PostsActions from '../store/posts.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Post} from '../post.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {of} from 'rxjs';

const handleError = (errorRes: any, store: Store) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(store.dispatch(new PostsActions.PostsError(errorMessage)));
  }
  errorMessage = 'My Contacts Error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(store.dispatch(new PostsActions.PostsError(errorMessage)));
};

const handleFetchError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new PostsActions.PostsError(errorMessage));
  }
  errorMessage = 'Loading posts error: ' +
    errorRes.status +
    ' ' +
    errorRes.statusText +
    '(' +
    errorRes.error.error +
    ')';
  return of(new PostsActions.PostsError(errorMessage));
};

@Injectable()
export class PostsEffects {
  @Effect()
  fetchPosts = this.actions$.pipe(
    ofType(PostsActions.FETCH_POSTS),
    switchMap(() => {
      return this.http
        .get<Post[]>(
          'https://my-office-1cd4e.firebaseio.com/posts.json'
        );
    }),
    map(posts => {
      const postsArray: Post[] = [];
      for (const key in posts) {
        if (posts.hasOwnProperty(key)) {
          postsArray.push({...posts[key], id: key});
        }
      }
      return new PostsActions.LoadPosts(postsArray);
    }),
    catchError(errorRes => {
      return handleFetchError(errorRes);
    })
  );

  @Effect({dispatch: false})
  addPost = this.actions$.pipe(
    ofType(PostsActions.ADD_POST),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      // var action.payload.in
      return this.http.post(
        'https://my-office-1cd4e.firebaseio.com/posts.json?auth=' +
        authState.user.token,
        action.payload);
    }),
    tap((res: {name}) => {
      this.store.dispatch(new PostsActions.GetKey(res.name));
    }),
    catchError(errorRes => {
      return handleError(errorRes, this.store);
    })
  );

  @Effect({dispatch: false})
  updatePost = this.actions$.pipe(
    ofType(PostsActions.UPDATE_POST),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.patch(
        'https://my-office-1cd4e.firebaseio.com/posts/' +
        action.payload.index +
        '.json',
        action.payload.newPost
      );
    }),
    catchError(errorRes => {
      return handleError(errorRes, this.store);
    })
  );

  @Effect({dispatch: false})
  deletePost = this.actions$.pipe(
    ofType(PostsActions.DELETE_POST),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.delete(
        'https://my-office-1cd4e.firebaseio.com/posts/' +
        action.payload +
        '.json'
      );
    }),
    catchError(errorRes => {
      return handleError(errorRes, this.store);
    })
  );

  constructor(private actions$: Actions<PostsActions.PostsActions>,
              private http: HttpClient,
              private store: Store<fromApp.AppState>){}
}
