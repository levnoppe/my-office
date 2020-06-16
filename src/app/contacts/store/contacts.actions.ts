import {Action} from '@ngrx/store';
import {Contact} from '../RandomUserApi/randomUserApi.model';

export const SAVE_CONTACT = '[Contacts] Save Contact';
export const LOAD_CONTACTS = '[Contacts] Load Contacts';
export const FETCH_CONTACTS = '[Contacts] Fetch Contacts';
export const DELETE_CONTACT = '[Contacts] Delete Contacts';

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

export class DeleteContact implements Action{
  readonly type = DELETE_CONTACT;

  constructor(public payload: Contact){}
}

export type ContactsActions =
  SaveContact
  | DeleteContact
  | FetchContacts
  | LoadContacts;
