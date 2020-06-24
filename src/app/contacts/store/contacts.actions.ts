import {Action} from '@ngrx/store';
import {Contact} from '../RandomUserApi/randomUserApi.model';

export const SAVE_CONTACT = '[Contacts] Save Contact';
export const GET_KEY = '[Contacts] Get Key';
export const LOAD_CONTACTS = '[Contacts] Load Contacts';
export const FETCH_CONTACTS = '[Contacts] Fetch Contacts';
export const DELETE_CONTACT = '[Contacts] Delete Contact';
export const CONTACTS_ERROR = '[Contacts] Contacts Error';

export class LoadContacts implements Action{
  readonly type = LOAD_CONTACTS;

  constructor(public payload: Contact[]){}
}

export class FetchContacts implements Action{
  readonly type = FETCH_CONTACTS;
}

export class SaveContact implements Action{
  readonly type = SAVE_CONTACT;

  constructor(public payload: Contact){}
}

export class GetKey implements Action{
  readonly type = GET_KEY;

  constructor(public payload: string){}
}

export class DeleteContact implements Action{
  readonly type = DELETE_CONTACT;

  constructor(public payload: string){}
}

export class ContactsError implements Action {
  readonly type = CONTACTS_ERROR;

  constructor(public payload: string ) {
  }
}

export type ContactsActions =
  SaveContact
  | GetKey
  | DeleteContact
  | FetchContacts
  | LoadContacts
  | ContactsError;
