import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as ContactsActions from './contacts.actions';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Contact} from '../RandomUserApi/randomUserApi.model';
import {HttpClient} from '@angular/common/http';

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
      return this.http
        .get<Contact[]>(
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
        action.payload);
    }),
    tap(() => {
      this.store.dispatch(new ContactsActions.FetchContacts());
    })
  );

  @Effect({dispatch: false})
  deleteContact = this.actions$.pipe(
    ofType(ContactsActions.DELETE_CONTACT),
    withLatestFrom(this.store.select('auth')),
    switchMap(([action, authState]) => {
      return this.http.delete(
        'https://my-office-1cd4e.firebaseio.com/contacts/' +
        action.payload.id +
        '.json'
      );
    }),
    tap(() => {
      this.store.dispatch(new ContactsActions.FetchContacts());
    })
  );
}

