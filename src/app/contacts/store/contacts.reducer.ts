import * as ContactsActions from './contacts.actions';
import {Contact} from '../RandomUserApi/randomUserApi.model';
import * as PostsActions from '../../posts/store/posts.actions';


export interface State {
  contacts: Contact[];
  loading: boolean;
  contactsError: string;
}

const initialState: State = {
  contacts: [],
  loading: false,
  contactsError: null,
};

export function contactsReducer(state = initialState, action: ContactsActions.ContactsActions) {
  let id;
  let addedContact;

  switch (action.type) {
    case ContactsActions.SAVE_CONTACT:
      id = 'newContact';
      addedContact = {...action.payload, id};
      return {
        ...state,
        contacts: [...state.contacts, addedContact]
      };

    case ContactsActions.GET_KEY:
      const newIndex = state.contacts.map(e => e.id).indexOf('newContact');
      id = action.payload;
      addedContact = {...state.contacts[newIndex], id};
      const updContact = {
        ...state.contacts[newIndex],
        ...addedContact
      };
      const updContacts = [...state.contacts];
      updContacts[newIndex] = updContact;
      return {
        ...state,
        contacts: updContacts
      };

    case ContactsActions.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          return contact.id !== action.payload;
        })
      };
    case ContactsActions.LOAD_CONTACTS:
      return {
        ...state,
        contacts: [...action.payload],
        loading: false
      };
    case ContactsActions.FETCH_CONTACTS:
      return {
        ...state,
        loading: true
      };
    case ContactsActions.CONTACTS_ERROR:
      return {
        ...state,
        contacts: null,
        contactsError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
