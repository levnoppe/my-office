import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as ContactsActions from './contacts.actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Contact} from '../RandomUserApi/randomUserApi.model';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import * as PostsActions from '../../posts/store/posts.actions';

const handleError = (errorRes: any, store: Store) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(store.dispatch(new ContactsActions.ContactsError(errorMessage)));
  }
  errorMessage = 'My Contacts Error: ' +
                  errorRes.status +
                  ' ' +
                  errorRes.statusText +
                  '(' +
                  errorRes.error.error +
                  ')';
  return of(store.dispatch(new ContactsActions.ContactsError(errorMessage)));
};

const handleFetchError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new ContactsActions.ContactsError(errorMessage));
  }
  errorMessage = 'My Contacts Error: ' +
                  errorRes.status +
                  ' ' +
                  errorRes.statusText +
                  '(' +
                  errorRes.error.error +
                  ')';
  return of(new ContactsActions.ContactsError(errorMessage));
};

@Injectable()
export class ContactsEffects {


  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private actions$: Actions<ContactsActions.ContactsActions>) {
  }

  @Effect()
  fetchContacts = this.actions$.pipe(
    ofType(ContactsActions.FETCH_CONTACTS),
    switchMap(() => {
      return this.http.get<Contact[]>(
          'https://my-office-1cd4e.firebaseio.com/contacts.json'
        );
    }),
    map(contacts => {
      const contactsArray: Contact[] = [];
      for (const key in contacts) {
        if (contacts.hasOwnProperty(key)) {
          contactsArray.push({...contacts[key], id: key});
        }
      }
      return new ContactsActions.LoadContacts(contactsArray);
    }),
    catchError(errorRes => {
      return handleFetchError(errorRes);
    })
  );

  @Effect({dispatch: false})
  saveContact = this.actions$.pipe(
    ofType(ContactsActions.SAVE_CONTACT),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.post(
        'https://my-office-1cd4e.firebaseio.com/contacts.json?auth=' +
        authState.user.token,
        action.payload
      ).pipe(
        tap((res: {name}) => {
          this.store.dispatch(new ContactsActions.GetKey(res.name));
        }),
        catchError(errorRes => {
          return handleError(errorRes, this.store);
        })
      );
    }),
    // tap(() => {
    //   this.store.dispatch(new ContactsActions.FetchContacts());
    // })
  );

  @Effect({dispatch: false})
  deleteContact = this.actions$.pipe(
    ofType(ContactsActions.DELETE_CONTACT),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.delete(
        'https://my-office-1cd4e.firebaseio.com/contacts/' +
        action.payload +
        '.json'
      ).pipe(
        catchError(errorRes => {
          return handleError(errorRes, this.store);
        })
      );
    }),
    // tap(() => {
    //   this.store.dispatch(new ContactsActions.FetchContacts());
    // })
  );
}

